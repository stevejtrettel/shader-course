/**
 * The capture harness: mounts each figure exactly as the site would in a
 * headless browser, waits for the figure's own ready signal, and observes
 * the DOM — the <svg> is serialized (→ vector PDF still) and screenshotted
 * (→ light + dark posters). Nothing is declared: format, size, and the
 * module graph are all discovered by watching what actually happens.
 *
 * Robustness requirements implemented here (design/figure-system-notes.md):
 *  - staleness: cache key = hashes of every /figures/ file the page actually
 *    loaded, plus book.css (the palette) and HARNESS_VERSION
 *  - determinism: Math.random throws by name; the clock is frozen, so the
 *    boot frame is exactly t = 0
 *  - loud failure: throw/hang/no-svg is a named per-figure error; failures
 *    never leave a cache entry (write to tmp, rename on success)
 *  - performance: one persistent browser per call, pooled pages; system
 *    overhead per figure is logged, ≥250ms is an alarm
 *
 * Not yet built (named errors in the resolver until a real figure needs
 * them): print.js sequences, canvas figures, image figures.
 */

import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, renameSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

import { resolveFigure } from "../compiler/figure-resolve.js";

const HARNESS_VERSION = 2; // v2: stills are an ordered sequence (still-1.pdf, …)
const READY_TIMEOUT = 8000;

/** ids → Map id → {width, height, dir} with dir holding poster-light.png,
 *  poster-dark.png, still.pdf, meta.json. Throws on any figure failure. */
export async function captureFigures(root, ids) {
  const out = new Map();
  const misses = [];

  for (const id of ids) {
    const fig = resolveFigure(root, id);
    if (!fig) throw new Error(`figure "${id}": no figure exists under figures/ (expected ${id}.js or ${id}/index.js)`);
    const cached = readCache(root, id);
    if (cached) out.set(id, { ...cached, entry: fig.entry });
    else misses.push({ id, fig });
  }
  if (misses.length === 0) return out;

  const { chromium } = await import("playwright");
  const server = await serveFigureSources(root);
  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1400, height: 1000 } });
  await context.addInitScript(`
    Math.random = () => { throw new Error("Math.random at capture time — use toolkit/rng.js"); };
    Date.now = () => 1700000000000;
    performance.now = () => 0;
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => raf(() => cb(0)); // real frames, frozen timestamps
  `);

  // Each figure needs a fresh page (a reused page's module cache would hide
  // dependencies from the graph trace), so throughput comes from parallelism:
  // N workers, each cycling through pages against the one shared browser.
  const queue = [...misses];
  try {
    await Promise.all(
      Array.from({ length: Math.min(4, queue.length) }, async () => {
        while (queue.length) {
          const { id, fig } = queue.shift();
          const t0 = performance.now();
          out.set(id, await captureOne(root, context, server.port, id, fig));
          const ms = performance.now() - t0;
          console.log(`  captured ${id} (${ms.toFixed(0)}ms${ms > 250 ? " — over the 250ms alarm" : ""})`);
        }
      })
    );
  } finally {
    await browser.close();
    server.close();
  }
  return out;
}

async function captureOne(root, context, port, id, fig) {
  const page = await context.newPage();
  const loaded = new Set(); // repo-relative paths of everything the figure pulled in
  page.on("response", (res) => {
    const p = new URL(res.url()).pathname;
    if (p.startsWith("/figures/")) loaded.add(p.slice(1));
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  try {
    await page.goto(`http://localhost:${port}/__harness`);
    const ready = page.evaluate(async (entry) => {
      const stage = document.getElementById("stage");
      const mod = await import(entry);
      window.__handle = mod.default(stage);
      await window.__handle.ready;
      await new Promise((r) => requestAnimationFrame(r));
      const svg = stage.querySelector("svg");
      if (!svg) return null;
      return { width: +svg.getAttribute("width"), height: +svg.getAttribute("height") };
    }, fig.entry);
    const size = await Promise.race([
      ready,
      new Promise((_, rej) => setTimeout(() => rej(new Error("never signaled ready")), READY_TIMEOUT)),
    ]);
    if (errors.length) throw new Error(errors[0]);
    if (!size) throw new Error("no <svg> drawing surface found after ready (canvas capture is not built yet)");

    const tmp = path.join(root, ".cache", "figures", `${id}.tmp`);
    rmSync(tmp, { recursive: true, force: true });
    mkdirSync(tmp, { recursive: true });

    const svgEl = page.locator("#stage svg");
    await svgEl.screenshot({ path: path.join(tmp, "poster-light.png") });
    const bootSvg = await page.evaluate(() => document.querySelector("#stage svg").outerHTML);

    await page.evaluate(() => { document.documentElement.dataset.theme = "dark"; });
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    await svgEl.screenshot({ path: path.join(tmp, "poster-dark.png") });

    // Print stills. Default: the boot frame. A print.js overrides it — its
    // emit callback serializes each state it puts on stage, in order.
    // (Same page on purpose: the module-graph trace must be the union of
    // what both entries load, and the module cache dedupes shared imports.)
    let stills;
    if (fig.print) {
      await page.evaluate(() => { document.documentElement.dataset.theme = "light"; }); // stills are pinned light
      stills = await page.evaluate(async (printEntry) => {
        const stage = document.getElementById("stage");
        window.__handle?.dispose?.();
        stage.replaceChildren();
        const out = [];
        const mod = await import(printEntry);
        await mod.default(stage, async (label) => {
          await new Promise((r) => requestAnimationFrame(r));
          const svg = stage.querySelector("svg");
          if (!svg) throw new Error("print.js emit: no <svg> on stage");
          out.push({ label: label ?? null, svg: svg.outerHTML,
                     width: +svg.getAttribute("width"), height: +svg.getAttribute("height") });
        });
        return out;
      }, fig.print);
      if (!stills.length) throw new Error("print.js emitted zero stills");
    } else {
      stills = [{ label: null, svg: bootSvg, width: size.width, height: size.height }];
    }

    // Vector PDFs: each serialized SVG printed at exact size.
    const pdfPage = await context.newPage();
    const stillMeta = [];
    for (const [i, s] of stills.entries()) {
      const file = `still-${i + 1}.pdf`;
      await pdfPage.setContent(`<!doctype html><style>html,body{margin:0}svg{display:block}</style>${s.svg}`);
      await pdfPage.pdf({
        path: path.join(tmp, file),
        width: `${s.width}px`, height: `${s.height}px`,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        printBackground: false,
      });
      stillMeta.push({ file, label: s.label, width: s.width, height: s.height });
    }
    await pdfPage.close();

    const files = {};
    loaded.add("site/assets/book.css".replace("site/assets/", "assets/")); // palette is an input
    for (const rel of loaded) files[rel] = hashFile(repoPath(root, rel));
    const meta = { harness: HARNESS_VERSION, width: size.width, height: size.height, stills: stillMeta, files };
    writeFileSync(path.join(tmp, "meta.json"), JSON.stringify(meta, null, 2));

    const dir = path.join(root, ".cache", "figures", id);
    rmSync(dir, { recursive: true, force: true });
    renameSync(tmp, dir);
    return { ...meta, dir, entry: fig.entry };
  } catch (e) {
    throw new Error(`figure "${id}": ${e.message}`);
  } finally {
    await page.close();
  }
}

// --- cache -----------------------------------------------------------------

function readCache(root, id) {
  const dir = path.join(root, ".cache", "figures", id);
  const metaFile = path.join(dir, "meta.json");
  if (!existsSync(metaFile)) return null;
  try {
    const meta = JSON.parse(readFileSync(metaFile, "utf8"));
    if (meta.harness !== HARNESS_VERSION) return null;
    for (const [rel, hash] of Object.entries(meta.files))
      if (hashFile(repoPath(root, rel)) !== hash) return null;
    for (const f of ["poster-light.png", "poster-dark.png", ...meta.stills.map((s) => s.file)])
      if (!existsSync(path.join(dir, f))) return null;
    return { ...meta, dir };
  } catch {
    return null;
  }
}

function repoPath(root, rel) {
  return rel.startsWith("assets/")
    ? path.join(root, "site", rel)
    : path.join(root, rel);
}

function hashFile(file) {
  if (!existsSync(file)) return "missing";
  return createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 16);
}

// --- the harness's own tiny server -----------------------------------------
// Serves figure sources + site assets straight from the repo (capture does
// not depend on a prior site build), plus the blank harness page.

const HARNESS_PAGE = `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<script type="importmap">{"imports": {"toolkit/": "/figures/_toolkit/"}}</script>
<link rel="stylesheet" href="/assets/book.css">
</head>
<body>
<div id="stage" style="width: max-content"></div>
</body>
</html>`;

function serveFigureSources(root) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
      if (p === "/__harness") {
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end(HARNESS_PAGE);
      }
      const file =
        p.startsWith("/figures/") ? path.join(root, p.slice(1)) :
        p.startsWith("/assets/") ? path.join(root, "site", p.slice(1)) : null;
      if (!file || !existsSync(file)) { res.writeHead(404); return res.end(); }
      const type = { ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2" }[path.extname(file)] ?? "application/octet-stream";
      res.writeHead(200, { "Content-Type": type });
      res.end(readFileSync(file));
    });
    server.listen(0, () =>
      resolve({
        port: server.address().port,
        close: () => { server.closeAllConnections?.(); server.close(); }, // keep-alive sockets must not stall exit
      })
    );
  });
}
