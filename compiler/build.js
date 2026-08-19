/**
 * Build orchestrator: book.yml → parse → resolve → highlight → the site.
 *
 *   node compiler/build.js
 *
 * Also importable: build() throws BuildError on content errors, so the dev
 * loop (site/dev.js) can keep a warm process and stay sub-second.
 *
 * Site output is dist/: the whole public face, pure static files — cover,
 * one page per chapter, the shader sources each page embeds, and assets.
 *
 * This book is web-only and its one kind of figure is a shader. The print
 * pipeline and the captured-figure system this compiler carries in its other
 * books (LaTeX, :::figure, :::demo) were stripped here rather than left
 * dormant: unreachable branches decay, and calc3 holds the master copy.
 */

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import YAML from "yaml";

import { parseChapter } from "./parse.js";
import { resolveBook, walk } from "./resolve.js";
import { resolveShader } from "./shader-resolve.js";
import { emitChapterFragment, emitInline } from "./emit-html.js";
import { initMath, saveMathCache, mathStylesheet } from "./math.js";
import { initHighlight, highlightBook } from "./highlight.js";
import { bookStats } from "./stats.js";
import { chapterPage, landingPage } from "../site/layout.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(ROOT, "dist");

export class BuildError extends Error {
  constructor(errors) {
    super(errors.map((e) => `  ✗ ${e}`).join("\n"));
    this.errors = errors;
  }
}

export async function build() {
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
  // paths rather than redirects.
  const loadChapter = (entry) => {
    const rel = typeof entry === "string" ? entry : entry.file;
    const slug = (typeof entry === "string" ? null : entry.slug) ?? path.basename(rel, ".md");
    return {
      file: rel,
      slug,
      // What the nav calls it, when the page's own heading is too long or too
      // formal to sit in a list — a course's front page is titled with the
      // course's full name and wants to read as "Introduction" in the rails.
      label: (typeof entry === "string" ? null : entry.label) ?? null,
      // Hangs under the chapter above it in the nav rather than standing
      // beside it — a day's homework belongs to that day's lecture.
      sub: (typeof entry === "string" ? false : entry.sub) ?? false,
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
    return { title: part.title ?? null, subtitle: part.subtitle ?? null, groups, chapters };
  });
  book.chapters = book.parts.flatMap((p) => p.chapters);

  // Standalone pages sit outside the reading order: no number, no entry in
  // the contents, no previous/next. They are built and addressable, and
  // reached from a link in the prose. Their "#" heading must carry
  // {.unnumbered}, which is what keeps them out of the chapter count.
  book.pages = (book.pages ?? []).map(loadChapter);
  for (const page of book.pages) page.standalone = true;
  // Everything that becomes an HTML page, in the order it is emitted.
  const allPages = [...book.chapters, ...book.pages];

  // --- resolve -------------------------------------------------------------

  const { labels, errors } = resolveBook(allPages, { perPart: book.numbering === "per-part" });
  if (errors.length) throw new BuildError(errors);

  // --- shaders: resolve against each chapter's own directory ---------------

  const shaderErrors = [];
  for (const ch of allPages) {
    ch.dir = path.join(ROOT, "book", path.dirname(ch.file));
    // Shader sources are per-chapter, not book-wide: two chapters may both
    // hold a shader called "circle" and mean different files, exactly as
    // the Quarto shortcode resolved them against the page's own directory.
    ch.shaders = new Map();
    ch.shaderCount = 0;
    walk(ch.tree, (n) => {
      if (n.type === "leafDirective" && n.name === "shader") {
        const name = n.attributes?.src;
        if (!name) return;
        ch.shaderCount += 1;
        if (ch.shaders.has(name)) return;
        const sh = resolveShader(ch.dir, name);
        if (sh.error) shaderErrors.push(`${ch.file}: shader "${name}": ${sh.error}`);
        else ch.shaders.set(name, sh);
      }
    });
  }
  // The cover's shader (book.yml `shader:`) belongs to the book rather than
  // to any chapter, so it resolves against book/ and is served from /shaders/.
  if (book.shader) {
    const hero = resolveShader(path.join(ROOT, "book"), book.shader);
    if (hero.error) shaderErrors.push(`book.yml: shader: ${book.shader}: ${hero.error}`);
    else book.heroShader = { src: `/${hero.rel}/`, dir: hero.dir, rel: hero.rel };
  }

  if (shaderErrors.length) throw new BuildError(shaderErrors);

  // --- emit: site ----------------------------------------------------------

  await initMath(ROOT);
  await initHighlight();
  highlightBook(allPages);

  for (const ch of allPages) {
    const fragment = emitChapterFragment(ch, ch.shaders);
    mkdirSync(path.join(DIST, ch.slug), { recursive: true });
    writeFileSync(path.join(DIST, ch.slug, "index.html"), chapterPage(book, ch, fragment));
    // A chapter's images travel with it: pages reference them by
    // chapter-relative paths, exactly as in the Quarto era.
    for (const sub of ["img", "images"])
      if (existsSync(path.join(ch.dir, sub)))
        cpSync(path.join(ch.dir, sub), path.join(DIST, ch.slug, sub), { recursive: true });
    // Only the shader directories this page actually embeds, so a chapter
    // sharing a directory with another (a day's lecture and its homework)
    // ships its own and no more.
    for (const sh of ch.shaders.values())
      cpSync(sh.dir, path.join(DIST, ch.slug, sh.rel), { recursive: true });
  }
  if (book.note) {
    const para = parseChapter(`# _\n\n${book.note}\n`).children.find((n) => n.type === "paragraph");
    book.noteHtml = para ? emitInline(para) : "";
  }
  writeFileSync(path.join(DIST, "index.html"), landingPage(book));

  // Quarto published every page as `<path>.html`; this system publishes
  // `<path>/`. Slugs mirror the old paths, so one rule per chapter keeps
  // every link ever handed out — course pages included — alive.
  writeFileSync(
    path.join(DIST, "_redirects"),
    allPages.map((ch) => `/${ch.slug}.html  /${ch.slug}/  301`).join("\n") + "\n"
  );

  cpSync(path.join(ROOT, "site", "assets"), path.join(DIST, "assets"), { recursive: true });
  if (book.heroShader)
    cpSync(book.heroShader.dir, path.join(DIST, book.heroShader.rel), { recursive: true });

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

  // stats.json for stevejtrettel.site. Written from what this build knows,
  // so it cannot go stale silently (see compiler/stats.js, design/book-stats.md).
  // A shader is this book's only kind of figure, and counts per embed rather
  // than per distinct source: one met twice is two figures on the page, which
  // is how the Quarto-era counter read them and what keeps the published
  // number continuous. The cover's shader is furniture, not a figure.
  // `pages` is never claimed — there is no PDF.
  const statFigures = allPages.flatMap((ch) =>
    Array.from({ length: ch.shaderCount }, (_, i) => ({ id: `${ch.slug}#${i}`, live: true }))
  );
  writeFileSync(
    path.join(DIST, "stats.json"),
    JSON.stringify(
      bookStats({ book: { ...book, chapters: allPages }, figures: statFigures, pdfPages: null }),
      null,
      2
    ) + "\n"
  );

  console.log(
    `${labels.size} labels · ${book.chapters.length} chapters → dist/ in ${(performance.now() - t0).toFixed(0)}ms`
  );
}

// --- CLI -------------------------------------------------------------------

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await build();
  } catch (e) {
    console.error("build failed:\n" + (e instanceof BuildError ? e.message : e.stack));
    process.exit(1);
  }
}
