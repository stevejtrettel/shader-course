/**
 * Dev loop: watch → rebuild → livereload (scroll preserved). Serves dist/
 * with clean directory URLs.
 *
 *   node site/dev.js        then open the URL it prints (4321 if free)
 *
 * Builds run in a persistent warm child (site/builder.js) so prose edits
 * rebuild fast; edits to build code (compiler/, site/*.js) respawn the child
 * first, so stale modules can't exist.
 */

import { watch, readFileSync, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { fork } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";


const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(ROOT, "dist");
// The sibling books run the same dev server, so 4321 is often already taken
// by a different project. Take the next free port rather than refusing to
// start; PORT=… or --port=… pins one when that matters.
const flag = process.argv.find((a) => a.startsWith("--port="))?.slice(7);
const PORT = Number(flag ?? process.env.PORT ?? 4321);
const LAST_PORT = PORT + 12;

// --- warm builder child ----------------------------------------------------

let builder = null;
let building = false;
let queued = false;
let t0 = 0;

function spawnBuilder() {
  builder = fork(path.join(ROOT, "site", "builder.js"), { stdio: ["ignore", "pipe", "pipe", "ipc"] });
  builder.stdout.on("data", () => {}); // build() logs its own summary; keep the loop's output ours
  let err = "";
  builder.stderr.on("data", (d) => (err += d));
  builder.on("message", (m) => {
    building = false;
    if (m.ok) {
      console.log(`✓ rebuilt in ${(performance.now() - t0).toFixed(0)}ms`);
      broadcast("reload");
    } else {
      console.error(m.msg.trim()); // errors stay loud; the page keeps its last good state
    }
    if (queued) { queued = false; build(); }
  });
  builder.on("exit", (code) => {
    if (code !== null && code !== 0) console.error(err.trim() || `builder exited with ${code}`);
  });
}

function build() {
  if (building) { queued = true; return; }
  building = true;
  t0 = performance.now();
  builder.send("build");
}

function respawnAndBuild() {
  builder.kill(); // an in-flight build dies with it; reset so the new one can run
  building = false;
  queued = false;
  spawnBuilder();
  build();
}

// --- watchers --------------------------------------------------------------

let timer = null;
let needsRespawn = false;
const trigger = (respawn) => {
  needsRespawn ||= respawn;
  clearTimeout(timer);
  timer = setTimeout(() => {
    needsRespawn ? respawnAndBuild() : build();
    needsRespawn = false;
  }, 80);
};

watch(path.join(ROOT, "book"), { recursive: true }, () => trigger(false));
watch(path.join(ROOT, "compiler"), { recursive: true }, () => trigger(true));
watch(path.join(ROOT, "tools"), { recursive: true }, () => trigger(true));
watch(path.join(ROOT, "site"), { recursive: true }, (event, file) =>
  trigger(!(file ?? "").startsWith("assets" + path.sep))
);

// --- static server + SSE livereload ---------------------------------------

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".pdf": "application/pdf", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".glsl": "text/plain; charset=utf-8",
};

const CLIENT = `<script>
new EventSource("/__reload").onmessage = () => {
  sessionStorage.setItem("devScroll", scrollY);
  location.reload();
};
addEventListener("load", () => {
  const y = sessionStorage.getItem("devScroll");
  if (y !== null) { scrollTo(0, +y); sessionStorage.removeItem("devScroll"); }
});
</script>`;

const clients = new Set();
const broadcast = (msg) => { for (const res of clients) res.write(`data: ${msg}\n\n`); };

const server = createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/__reload") {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-store" });
    res.write("\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  let file = path.join(DIST, decodeURIComponent(url.pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!existsSync(file)) { res.writeHead(404); res.end("not found"); return; }

  const type = TYPES[path.extname(file)] ?? "application/octet-stream";
  res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
  if (type.startsWith("text/html")) {
    res.end(readFileSync(file, "utf8").replace("</body>", CLIENT + "</body>"));
  } else {
    res.end(readFileSync(file));
  }
});

let port = PORT;
server.on("error", (e) => {
  if (e.code !== "EADDRINUSE") throw e;
  if (port < LAST_PORT) {
    port += 1;
    server.listen(port);
    return;
  }
  console.error(
    `ports ${PORT}–${LAST_PORT} are all in use. Free one, or pick another:\n` +
    `  npm run dev -- --port=5173`
  );
  builder?.kill();
  process.exit(1);
});
server.listen(port, () => {
  const moved = port === PORT ? "" : ` (${PORT} was busy)`;
  console.log(`serving dist/ at http://localhost:${port}${moved}`);
});
