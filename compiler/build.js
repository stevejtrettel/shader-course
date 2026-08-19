/**
 * Build orchestrator: book.yml → parse → resolve → emit LaTeX + the site,
 * compile the PDF, and run the aux check.
 *
 *   node compiler/build.js            build everything (LaTeX + PDF + site)
 *   node compiler/build.js --no-pdf   skip latexmk + aux check
 *
 * Also importable: build({pdf}) throws BuildError on content errors, so the
 * dev loop (site/dev.js) can keep a warm process and stay sub-second.
 *
 * Site output is dist/: the whole public face, pure static files —
 * landing page, one page per chapter, assets, and the compiled PDF.
 */

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, copyFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import YAML from "yaml";

import { parseChapter } from "./parse.js";
import { resolveBook, walk } from "./resolve.js";
import { resolveDemo, resolveBookDemo } from "./figure-resolve.js";
import { resolveShader } from "./shader-resolve.js";
import { captureFigures } from "../tools/capture.mjs";
import { emitMain, emitChapter } from "./emit-latex.js";
import { emitChapterFragment } from "./emit-html.js";
import { initMath, saveMathCache, mathStylesheet } from "./math.js";
import { initHighlight, highlightBook } from "./highlight.js";
import { auxCheck } from "./aux-check.js";
import { bookStats, pdfPageCount } from "./stats.js";
import { chapterPage, landingPage } from "../site/layout.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TEX_OUT = path.join(ROOT, "latex", "build");
const DIST = path.join(ROOT, "dist");

export class BuildError extends Error {
  constructor(errors) {
    super(errors.map((e) => `  ✗ ${e}`).join("\n"));
    this.errors = errors;
  }
}

export async function build({ pdf = true } = {}) {
  const t0 = performance.now();

  // --- load + parse --------------------------------------------------------

  const book = YAML.parse(readFileSync(path.join(ROOT, "book", "book.yml"), "utf8"));

  // A chapter entry is either a bare path (slug = its basename) or a
  // {file, slug} pair. The explicit form exists because this book cannot be
  // held by basenames: five CIRM days each have a notes.md and a
  // homework.md, and under a basename rule they would all claim the same
  // URL and overwrite each other. An explicit slug may contain slashes —
  // the output writer already creates directories recursively — which is
  // also how the addresses handed to workshop participants stay real page
  // paths rather than redirects. LaTeX cannot take a slash in \include, so
  // a flattened texName travels alongside.
  const loadChapter = (entry) => {
    const rel = typeof entry === "string" ? entry : entry.file;
    const slug = (typeof entry === "string" ? null : entry.slug) ?? path.basename(rel, ".md");
    return {
      file: rel,
      slug,
      texName: slug.replace(/\//g, "-"),
      tree: parseChapter(readFileSync(path.join(ROOT, "book", rel), "utf8")),
    };
  };

  // Within a part, chapters may be gathered into named groups — CIRM's five
  // days, each holding a lecture and a homework. Groups are a navigation
  // device only: numbering, ordering, and prev/next see one flat sequence.
  book.parts = book.parts.map((part, partIndex) => {
    const groups = [];
    for (const entry of part.chapters) {
      if (entry?.group) {
        groups.push({ title: entry.group, chapters: entry.chapters.map(loadChapter) });
      } else {
        const open = groups.at(-1);
        if (open && open.title === null) open.chapters.push(loadChapter(entry));
        else groups.push({ title: null, chapters: [loadChapter(entry)] });
      }
    }
    const chapters = groups.flatMap((g) => g.chapters);
    for (const ch of chapters) ch.part = partIndex; // the per-part counter reads this
    return { title: part.title ?? null, kicker: part.kicker ?? null, figure: part.figure ?? null, groups, chapters };
  });
  book.chapters = book.parts.flatMap((p) => p.chapters);

  // --- resolve -------------------------------------------------------------

  const { labels, errors } = resolveBook(book.chapters, { perPart: book.numbering === "per-part" });
  if (errors.length) throw new BuildError(errors);

  // This book ships web-only for now (book.yml pdf: false): the LaTeX
  // machinery is carried dormant, not stripped, so the print pass can come
  // later. See SYSTEM-CHANGES.md.
  const wantPdf = pdf && book.pdf !== false;

  // --- emit: LaTeX ---------------------------------------------------------

  if (wantPdf) {
    mkdirSync(TEX_OUT, { recursive: true });
    writeFileSync(path.join(TEX_OUT, "main.tex"), emitMain(book, book.chapters));
    for (const ch of book.chapters) writeFileSync(path.join(TEX_OUT, `${ch.texName}.tex`), emitChapter(ch));
  }

  // --- demos: resolve against each chapter's own demos/ dir ----------------

  const demoTable = new Map();
  const demoErrors = [];
  for (const ch of book.chapters) {
    ch.dir = path.join(ROOT, "book", path.dirname(ch.file));
    // Shader sources are per-chapter, not book-wide: two chapters may both
    // hold a shader called "circle" and mean different files, exactly as
    // the Quarto shortcode resolved them against the page's own directory.
    ch.shaders = new Map();
    ch.shaderCount = 0;
    walk(ch.tree, (n) => {
      if (n.type === "containerDirective" && n.name === "demo") {
        const d = resolveDemo(ch.dir, n.attributes?.id, n.attributes ?? {});
        if (d.error) demoErrors.push(`${ch.file}: demo "${n.attributes?.id ?? "?"}": ${d.error}`);
        else demoTable.set(n.attributes.id, d);
      }
      if (n.type === "leafDirective" && n.name === "shader") {
        const name = n.attributes?.src;
        if (!name) return;
        ch.shaderCount += 1;
        if (ch.shaders.has(name)) return;
        const sh = resolveShader(ch.dir, name);
        if (sh.error) demoErrors.push(`${ch.file}: shader "${name}": ${sh.error}`);
        else ch.shaders.set(name, sh);
      }
    });
  }
  // The cover's shader (book.yml `shader:`) belongs to the book rather than
  // to any chapter, so it resolves against book/ and is served from /shaders/.
  if (book.shader) {
    const hero = resolveShader(path.join(ROOT, "book"), book.shader);
    if (hero.error) demoErrors.push(`book.yml: shader: ${book.shader}: ${hero.error}`);
    else book.heroShader = { src: `/${hero.rel}/`, dir: hero.dir, rel: hero.rel };
  }

  // The landing page's hero is its own demo, in book/demos/ — it belongs to
  // the book rather than to a chapter.
  const hero = resolveBookDemo(path.join(ROOT, "book"), book.demo);
  if (hero?.error) demoErrors.push(`book.yml: demo: ${book.demo}: ${hero.error}`);
  else book.heroDemo = hero;
  if (demoErrors.length) throw new BuildError(demoErrors);

  // --- figures: resolve + capture (cache makes hits ~free) -----------------

  const directiveIds = new Set();
  for (const ch of book.chapters)
    walk(ch.tree, (n) => {
      if (n.type === "containerDirective" && n.name === "figure" && n.attributes?.id)
        directiveIds.add(n.attributes.id);
    });
  const partFigureIds = book.parts.map((p) => p.figure).filter(Boolean);
  const figureIds = [book.figure, ...partFigureIds, ...directiveIds].filter(Boolean); // hero (book.yml figure:) + part art: wired by layout.js / main.tex
  const figures = figureIds.length ? await captureFigures(ROOT, figureIds) : new Map();
  book.hasCaptureFigures = figures.size > 0; // layout gates the island mounter + toolkit importmap on this

  // --- emit: site ----------------------------------------------------------

  await initMath(ROOT);
  await initHighlight();
  highlightBook(book.chapters);

  for (const ch of book.chapters) {
    const fragment = emitChapterFragment(ch, figures, demoTable, ch.shaders);
    mkdirSync(path.join(DIST, ch.slug), { recursive: true });
    writeFileSync(path.join(DIST, ch.slug, "index.html"), chapterPage(book, ch, fragment));
    // A chapter's demos/ and img/ travel with it: pages reference both by
    // chapter-relative paths, exactly as in the Quarto era.
    for (const sub of ["demos", "img", "images"])
      if (existsSync(path.join(ch.dir, sub)))
        cpSync(path.join(ch.dir, sub), path.join(DIST, ch.slug, sub), { recursive: true });
    // Only the shader directories this page actually embeds, so a chapter
    // sharing a directory with another (a day's lecture and its homework)
    // ships its own and no more.
    for (const sh of ch.shaders.values())
      cpSync(sh.dir, path.join(DIST, ch.slug, sh.rel), { recursive: true });
  }
  writeFileSync(path.join(DIST, "index.html"), landingPage(book, figures));

  // Quarto published every page as `<path>.html`; this system publishes
  // `<path>/`. Slugs mirror the old paths, so one rule per chapter keeps
  // every link ever handed out — course pages included — alive.
  writeFileSync(
    path.join(DIST, "_redirects"),
    book.chapters.map((ch) => `/${ch.slug}.html  /${ch.slug}/  301`).join("\n") + "\n"
  );

  cpSync(path.join(ROOT, "site", "assets"), path.join(DIST, "assets"), { recursive: true });
  if (existsSync(path.join(ROOT, "figures")))
    cpSync(path.join(ROOT, "figures"), path.join(DIST, "figures"), { recursive: true });
  if (demoTable.size || book.heroDemo)
    cpSync(path.join(ROOT, "demo-kit"), path.join(DIST, "demo-kit"), { recursive: true });
  if (book.heroShader)
    cpSync(book.heroShader.dir, path.join(DIST, book.heroShader.rel), { recursive: true });
  // Book-level demos (the hero) are served from /demos/, beside the chapters.
  if (existsSync(path.join(ROOT, "book", "demos")))
    cpSync(path.join(ROOT, "book", "demos"), path.join(DIST, "demos"), { recursive: true });

  mkdirSync(path.join(DIST, "assets", "figures"), { recursive: true });
  if (wantPdf) mkdirSync(path.join(TEX_OUT, "figures"), { recursive: true });
  for (const [id, fig] of figures) {
    copyFileSync(path.join(fig.dir, "poster-light.png"), path.join(DIST, "assets", "figures", `${id}-light.png`));
    copyFileSync(path.join(fig.dir, "poster-dark.png"), path.join(DIST, "assets", "figures", `${id}-dark.png`));
    if (fig.stills.length === 1) {
      copyFileSync(path.join(fig.dir, fig.stills[0].file), path.join(TEX_OUT, "figures", `${id}.pdf`));
    } else if (directiveIds.has(id)) {
      // The emitter's row layout for still sequences is designed, unbuilt.
      throw new BuildError([`figure "${id}": sequence layout in LaTeX arrives with the first sequence figure in a chapter`]);
    } else {
      fig.stills.forEach((s, i) =>
        copyFileSync(path.join(fig.dir, s.file), path.join(TEX_OUT, "figures", `${id}-${i + 1}.pdf`)));
    }
  }
  writeFileSync(path.join(DIST, "assets", "mathjax.css"), mathStylesheet());

  // The math font files (1.8MB) change only with the font package: copy once
  // per version, verified by a stamp so a bump can't leave dist/ stale.
  const fontPkg = path.join(ROOT, "node_modules", "@mathjax", "mathjax-newcm-font");
  const fontVer = JSON.parse(readFileSync(path.join(fontPkg, "package.json"), "utf8")).version;
  const fontOut = path.join(DIST, "assets", "mathjax-fonts");
  const stamp = path.join(fontOut, ".version");
  if (!existsSync(stamp) || readFileSync(stamp, "utf8") !== fontVer) {
    cpSync(path.join(fontPkg, "chtml", "woff2"), fontOut, { recursive: true });
    writeFileSync(stamp, fontVer);
  }
  saveMathCache();

  const pdfSrc = path.join(TEX_OUT, "main.pdf");
  if (existsSync(pdfSrc)) copyFileSync(pdfSrc, path.join(DIST, "book.pdf"));

  // stats.json for stevejtrettel.site. Written from what this build knows,
  // so it cannot go stale silently; `pages` is claimed only by a build that
  // actually compiled the PDF (see compiler/stats.js, design/book-stats.md).
  // What counts as a figure here: every :::demo (always a live module,
  // resolved against its own chapter's demos/) plus any :::figure. The
  // landing page's hero demo is book furniture, not a figure in the text.
  // Shaders count per embed, not per distinct source: a shader the reader
  // meets twice is two figures on the page, which is how the Quarto-era
  // counter read them and what keeps the published number continuous.
  const statFigures = [
    ...book.chapters.flatMap((ch) =>
      Array.from({ length: ch.shaderCount }, (_, i) => ({ id: `${ch.slug}#${i}`, live: true }))),
    ...[...demoTable.keys()].map((id) => ({ id, live: true })),
    ...[...directiveIds].map((id) => ({ id, live: figures.get(id)?.entry !== undefined })),
  ];
  const writeStats = (pdfPages) =>
    writeFileSync(
      path.join(DIST, "stats.json"),
      JSON.stringify(
        bookStats({ book, figures: statFigures, pdfPages }),
        null,
        2
      ) + "\n"
    );

  console.log(
    `${labels.size} labels · ${book.chapters.length} chapters → dist/ in ${(performance.now() - t0).toFixed(0)}ms`
  );

  // --- compile + verify ----------------------------------------------------

  if (!wantPdf) {
    writeStats(null);
    return;
  }

  console.log("compiling PDF (latexmk, xelatex)...");
  execFileSync("latexmk", ["-xelatex", "-interaction=nonstopmode", "-halt-on-error", "main.tex"], {
    cwd: TEX_OUT,
    stdio: ["ignore", "ignore", "inherit"],
  });
  copyFileSync(pdfSrc, path.join(DIST, "book.pdf"));

  const mismatches = auxCheck(path.join(TEX_OUT, "main.aux"), labels);
  if (mismatches.length)
    throw new BuildError(
      mismatches.map((m) => `aux check: ${m.id}: resolver says ${m.ours}, LaTeX says ${m.latex}`)
    );
  console.log(`aux check passed: LaTeX agrees with the resolver on all ${labels.size} labels ✓`);
  writeStats(pdfPageCount(path.join(DIST, "book.pdf")));
  console.log(`PDF at latex/build/main.pdf (and dist/book.pdf)`);
}

// --- CLI -------------------------------------------------------------------

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await build({ pdf: !process.argv.includes("--no-pdf") });
  } catch (e) {
    console.error("build failed:\n" + (e instanceof BuildError ? e.message : e.stack));
    process.exit(1);
  }
}
