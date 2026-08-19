/**
 * Stage 1: markdown → AST. Knows nothing about numbering.
 *
 * Beyond the stock remark pipeline this adds three small source conventions:
 *
 *  - TeX's tolerance for display math:  $$ x = 1 $$
 *    remark treats an opening `$$` as a code fence, so anything after it on
 *    that line is an info string and is discarded. `$$x = 1$$` therefore
 *    parses as inline math, and `$$x = 1` + `$$` parses as an EMPTY display
 *    — the equation disappears with no error anywhere. TeX draws no such
 *    distinction, so neither does this: every `$$ … $$` is put on its own
 *    lines before parsing, and all four spellings mean one thing.
 *
 *  - Quarto-style equation labels:  $$ ... $$ {#eq-name}
 *    remark-math refuses a closing fence with trailing text, so a
 *    preprocessor rewrites the closing line to a bare `$$` and the label is
 *    re-attached to the math node afterward by source line number (the
 *    rewrite never adds or removes lines, so positions stay exact).
 *
 *  - Heading attributes:  ## Title {#sec-name}  /  {.unnumbered}
 *    remark leaves these as plain text; they are parsed off the last text
 *    child and stored on node.data.
 *
 *  - Callout titles:  a callout whose first block is a heading
 *    (`:::note` / `## Why does this work?` / body) uses that heading as its
 *    title. Lifting it off here rather than in the emitter keeps it out of
 *    the section counter — an aside's title is not a section of the text —
 *    while preserving its inline markup, which an attribute could not.
 *
 *  - References:  @thm-name / @Thm-name
 *    Text nodes are split around them into {type:"ref"} nodes. A capitalized
 *    first letter requests a capitalized reference word; the canonical id is
 *    always the lowercase-first form.
 */

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

import { callouts } from "./registry.js";

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm) // tables (the GLSL reference is one) and strikethrough
  .use(remarkDirective)
  .use(remarkMath);

export function parseChapter(source) {
  // Before anything else, so the label extractor and the parser agree on
  // line numbers: both see the normalized text.
  const { text, equationLabels } = extractEquationLabels(normalizeDisplayMath(source));
  const tree = processor.parse(text);
  attachEquationLabels(tree, equationLabels);
  parseHeadingAttributes(tree);
  liftCalloutTitles(tree);
  splitReferences(tree);
  return tree;
}

function liftCalloutTitles(tree) {
  visit(tree, "containerDirective", (node) => {
    if (!callouts[node.name]) return;
    const first = node.children[0];
    if (first?.type !== "heading") return;
    node.children.shift();
    node.data = { ...node.data, title: first.children };
  });
}

const FENCE = /^(```|~~~)[\s\S]*?^\1[^\n]*$/gm;
const DISPLAY_MATH = /\$\$([\s\S]*?)\$\$/g;

/**
 * Put every `$$ … $$` on three lines. Fenced code is masked out first — a
 * shader listing may hold a `$`, and none of it is math. A trailing
 * `{#eq-…}` stays on the closing line, where the label extractor wants it.
 */
function normalizeDisplayMath(source) {
  const fences = [];
  const masked = source.replace(FENCE, (m) => {
    fences.push(m);
    return `\u0000FENCE${fences.length - 1}\u0000`;
  });
  const spaced = masked.replace(DISPLAY_MATH, (_, body) => `$$\n${body.trim()}\n$$`);
  return spaced.replace(/\u0000FENCE(\d+)\u0000/g, (_, i) => fences[Number(i)]);
}

/** Rewrite `$$ {#eq-x}` closing lines to `$$`, recording (line, id) pairs. */
const CLOSING_LABEL = /^(\s*)\$\$\s*\{#([A-Za-z][A-Za-z0-9_-]*)\}\s*$/;

function extractEquationLabels(source) {
  const lines = source.split("\n");
  const equationLabels = new Map(); // 1-based line of the closing $$ → id
  let inCodeFence = false;

  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) inCodeFence = !inCodeFence;
    if (inCodeFence) return;
    const m = CLOSING_LABEL.exec(line);
    if (m) {
      lines[i] = m[1] + "$$";
      equationLabels.set(i + 1, m[2]);
    }
  });

  return { text: lines.join("\n"), equationLabels };
}

function attachEquationLabels(tree, equationLabels) {
  visit(tree, "math", (node) => {
    const id = equationLabels.get(node.position?.end.line);
    if (id) {
      node.data = { ...node.data, id };
      equationLabels.delete(node.position.end.line);
    }
  });
  // A label whose line matched no math node is a lint the resolver reports.
  tree.data = { ...tree.data, orphanEquationLabels: [...equationLabels.values()] };
}

const HEADING_ATTRS = /\s*\{([^}]*)\}\s*$/;

function parseHeadingAttributes(tree) {
  visit(tree, "heading", (node) => {
    const last = node.children.at(-1);
    if (last?.type !== "text") return;
    const m = HEADING_ATTRS.exec(last.value);
    if (!m) return;
    last.value = last.value.slice(0, m.index);
    if (last.value === "") node.children.pop();

    node.data = { ...node.data };
    for (const token of m[1].trim().split(/\s+/)) {
      if (token.startsWith("#")) node.data.id = token.slice(1);
      else if (token === ".unnumbered") node.data.unnumbered = true;
    }
  });
}

/** `@id` in prose. The char before must not be a word char (rules out emails). */
const REF = /@([A-Za-z][A-Za-z0-9-]*[A-Za-z0-9])/g;

function splitReferences(tree) {
  visit(tree, "text", (node, index, parent) => {
    if (parent.type === "link") return; // leave URLs alone
    const pieces = [];
    let cursor = 0;
    for (const m of node.value.matchAll(REF)) {
      const before = m.index === 0 ? "" : node.value[m.index - 1];
      if (/[\w@.]/.test(before)) continue;
      if (m.index > cursor) pieces.push({ type: "text", value: node.value.slice(cursor, m.index) });
      const raw = m[1];
      pieces.push({
        type: "ref",
        target: raw[0].toLowerCase() + raw.slice(1),
        capitalized: raw[0] !== raw[0].toLowerCase(),
      });
      cursor = m.index + m[0].length;
    }
    if (pieces.length === 0) return;
    if (cursor < node.value.length) pieces.push({ type: "text", value: node.value.slice(cursor) });
    parent.children.splice(index, 1, ...pieces);
    return index + pieces.length;
  });
}
