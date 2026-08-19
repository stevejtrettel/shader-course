/**
 * Build-time syntax highlighting (Shiki), dual-themed.
 *
 * Quarto gave this book's 700+ GLSL blocks their colours; losing them was
 * not an option for a shader course. Shiki replaces it at build time, so
 * pages still ship no client JS for code: both themes are emitted at once
 * as CSS custom properties (`defaultColor: false`) and book.css picks the
 * side matching `data-theme`.
 *
 * Highlighting is a separate pass rather than part of the emitter because
 * Shiki is async and the emitter is not: this walks every chapter, renders
 * each code block, and stamps the HTML onto `node.data.html`, which
 * emit-html.js then uses in place of a bare <pre>.
 *
 * A fenced block in an unknown (or missing) language falls back to plain
 * text rather than failing the build — an unlabelled block is a writing
 * slip, not a reason to stop.
 */

import { walk } from "./resolve.js";

const THEMES = { light: "vitesse-light", dark: "vitesse-dark" };

/** Loaded up front; anything else falls back to plain text. */
const LANGS = ["glsl", "bash", "js", "json", "html", "css", "python", "c"];

let highlighter = null;

export async function initHighlight() {
  if (highlighter) return;
  const { createHighlighter } = await import("shiki");
  highlighter = await createHighlighter({ themes: Object.values(THEMES), langs: LANGS });
}

/** One code string → dual-themed <pre class="shiki">…</pre>. */
export function highlight(code, lang) {
  const language = LANGS.includes(lang) ? lang : "text";
  return highlighter.codeToHtml(code, { lang: language, themes: THEMES, defaultColor: false });
}

/** Stamp highlighted HTML onto every code node in the book. */
export function highlightBook(chapters) {
  for (const ch of chapters)
    walk(ch.tree, (node) => {
      if (node.type !== "code") return;
      node.data = { ...node.data, html: highlight(node.value, node.lang ?? "text") };
    });
}
