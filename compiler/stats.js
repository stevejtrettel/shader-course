/**
 * stats.json — the build artifact stevejtrettel.site reads to put a stats
 * line under this book.
 *
 * Written to the root of the published site (dist/stats.json), so it sits
 * next to index.html and is fetched from the book's own URL. The site
 * needs no configuration: a book gains a stats line by publishing this
 * file and loses it by not.
 *
 * This module is deliberately portable — the three books built on this
 * system (analysis-book, ode-book, calc3) should carry the same copy, so
 * that "figure" and "chapter" mean the same thing on the page where their
 * numbers sit side by side. See design/book-stats.md for the counting
 * rules and the consumer's contract.
 *
 * Everything is optional by design: a count that cannot be made honestly
 * is left out rather than invented, and the site simply drops that item
 * from the line.
 */

import { readFileSync, existsSync } from "node:fs";
import { inflateSync } from "node:zlib";

import { walk } from "./resolve.js";

/**
 * Total pages, read from the PDF that is actually being published — so the
 * number cannot describe an older build than the file beside it.
 *
 * A text scan alone is not enough: xelatex/xdvipdfmx writes the page tree
 * into compressed object streams, so `/Type /Page` appears nowhere in the
 * raw bytes. Every deflate stream is inflated and scanned too. (Checked
 * against a 384-page book: agrees with the OS's own page count, while the
 * TeX log for the same book was two builds stale.)
 *
 * Returns null if the file is missing or nothing was found, so a book that
 * cannot honestly claim a page count simply omits the field.
 */
export function pdfPageCount(pdfFile) {
  if (!existsSync(pdfFile)) return null;
  const buf = readFileSync(pdfFile);
  const raw = buf.toString("latin1");
  const pages = (s) => (s.match(/\/Type\s*\/Page[^s]/g) || []).length;

  let n = pages(raw);
  const re = /stream\r?\n/g;
  for (let m; (m = re.exec(raw)); ) {
    const start = m.index + m[0].length;
    const end = raw.indexOf("endstream", start);
    if (end < 0) continue;
    try {
      n += pages(inflateSync(buf.subarray(start, end)).toString("latin1"));
    } catch {
      // not a deflate stream (images, fonts, raw content) — nothing to read
    }
  }
  return n > 0 ? n : null;
}

/** Prose words in a parsed chapter: text nodes only, so display and inline
 *  math, code, and crossref tokens are not counted as writing. */
function chapterWords(tree) {
  let n = 0;
  walk(tree, (node) => {
    if (node.type !== "text" || !node.value) return;
    for (const w of node.value.split(/\s+/)) if (w) n++;
  });
  return n;
}

/**
 * The caller passes the figure list already assembled, as {id, live}
 * records — because what counts as a figure is the one book-specific thing
 * here (this book and ode-book use `:::figure`; calc3 uses `:::demo`
 * resolved against each chapter's own demos/ directory, plus any
 * `:::figure`). Assembling it in build.js, where that knowledge already
 * lives, is what lets this module stay byte-identical across the books.
 *
 * @param {object}   o.book        resolved book (chapters carry .tree)
 * @param {{id: string, live: boolean}[]} o.figures  every figure in the text
 * @param {number|null} o.pdfPages  page count, or null if no PDF was produced
 * @param {Date}     [o.date]      when the numbers were computed
 * @returns {object} the stats.json payload — only keys that are honest
 */
export function bookStats({ book, figures, pdfPages, date = new Date() }) {
  const stats = {
    updated: date.toISOString().slice(0, 10),
    // Front matter (an {.unnumbered} "#" heading) is a landing page, not a
    // chapter — the same rule the Quarto-era counter applied when it skipped
    // each project's index.qmd. Its prose still counts as writing.
    chapters: book.chapters.filter((ch) => ch.number !== null).length,
    // Interactive figures are a SUBSET of `figures`, never a separate
    // population: a live figure is counted in both. Filtering the same list
    // is what makes interactives <= figures true by construction rather
    // than by discipline.
    figures: figures.length,
    interactives: figures.filter((f) => f.live).length,
    words: book.chapters.reduce((n, ch) => n + chapterWords(ch.tree), 0),
  };
  if (pdfPages !== null && pdfPages !== undefined) stats.pages = pdfPages;

  // The consumer silently drops any numeric field that is not a
  // non-negative integer, taking the whole item off the line with it.
  for (const [k, v] of Object.entries(stats))
    if (typeof v === "number" && !(Number.isInteger(v) && v >= 0)) delete stats[k];

  return stats;
}
