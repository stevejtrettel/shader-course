/**
 * Stage 3b: AST → per-chapter HTML fragments, numbers baked in from the
 * resolver, math rendered to CHTML at build time (compiler/math.js).
 *
 * This is layer 1's web output: a fragment plus the chapter's section list
 * (for the ToC rails). Wrapping fragments into pages is the presentation
 * layer's job (site/layout.js); no page chrome or styling decisions here.
 * The markup vocabulary (.env, .disp, .secno, …) is the one ratified on
 * design/mockups/chapter.html.
 */

import { environments, proofLike, callouts, refWords } from "./registry.js";
import { renderMath } from "./math.js";

/** shaders: Map source name → {src} (resolved by the build, page-relative) */
let shaderTable = new Map();
let shadersEmitted = 0;

/** → { html, sections: [{id, number|null, title}], hasDemos } */
export function emitChapterFragment(ch, shaders = new Map()) {
  shaderTable = shaders;
  shadersEmitted = 0;
  const sections = [];
  const intro = [];      // blocks before the first ## section
  const groups = [];     // one entry per ## section
  let current = intro;
  let header = "";

  for (const node of ch.tree.children) {
    if (node.type === "yaml") continue;
    if (node.type === "heading" && node.depth === 1) {
      const id = node.data?.id ? ` id="${node.data.id}"` : "";
      header =
        (ch.number ? `<div class="chapter-number">Chapter ${ch.number}</div>\n` : "") +
        `<h1${id}>${inline(node.children)}</h1>`;
    } else if (node.type === "heading" && node.depth === 2) {
      const id = node.data?.id ?? slugify(text(node.children));
      const number = node.data?.unnumbered ? null : node.data.number;
      sections.push({ id, number, title: text(node.children) });
      const secno = number ? `<span class="secno">${number}</span>` : "";
      current = [`<h2>${secno}${inline(node.children)}</h2>`];
      groups.push({ id, blocks: current });
    } else {
      current.push(block(node));
    }
  }

  const html =
    header + "\n" +
    intro.join("\n") + "\n" +
    groups.map((g) => `<section id="${g.id}">\n${g.blocks.join("\n")}\n</section>`).join("\n");
  return { html, sections, hasShaders: shadersEmitted > 0 };
}

function blocks(nodes) {
  return nodes.map(block).filter(Boolean).join("\n");
}

function block(node) {
  switch (node.type) {
    case "heading": {
      // depth ≥ 3 inside a section; ratified layout has no styling below h3
      const id = node.data?.id ? ` id="${node.data.id}"` : "";
      const num = node.data?.number && !node.data?.unnumbered ? `<span class="secno">${node.data.number}</span>` : "";
      return `<h3${id}>${num}${inline(node.children)}</h3>`;
    }
    case "paragraph":
      return `<p>${inline(node.children)}</p>`;
    case "math":
      return displayMath(node);
    case "containerDirective":
      return directive(node);
    case "leafDirective":
      return leafDirective(node);
    case "list": {
      const tag = node.ordered ? "ol" : "ul";
      const items = node.children.map((li) => `<li>${blocks(li.children)}</li>`).join("\n");
      return `<${tag}>\n${items}\n</${tag}>`;
    }
    case "blockquote":
      return `<blockquote>${blocks(node.children)}</blockquote>`;
    case "code":
      // Shiki's dual-themed markup, stamped on by compiler/highlight.js.
      return node.data?.html ?? `<pre><code>${esc(node.value)}</code></pre>`;
    case "thematicBreak":
      return "<hr>";
    case "html":
      // A comment is a note to the author and simply does not render. Any
      // other raw HTML is a gap in the vocabulary and should be reported as
      // one rather than smuggled through the emitter.
      if (/^\s*<!--[\s\S]*-->\s*$/.test(node.value)) return "";
      throw new Error(`html emitter: raw HTML is not part of the vocabulary — ${node.value.slice(0, 60)}`);
    case "table": {
      // GFM tables. Alignment is per-column and lives on the table node, so
      // it is applied to each cell as the rows are walked.
      const [head, ...body] = node.children;
      const cells = (row, tag) =>
        row.children
          .map((cell, i) => {
            const a = node.align?.[i];
            return `<${tag}${a ? ` style="text-align:${a}"` : ""}>${inline(cell.children)}</${tag}>`;
          })
          .join("");
      return (
        `<div class="table-wrap"><table>\n<thead><tr>${cells(head, "th")}</tr></thead>\n` +
        `<tbody>\n${body.map((r) => `<tr>${cells(r, "td")}</tr>`).join("\n")}\n</tbody>\n</table></div>`
      );
    }
    default:
      throw new Error(`html emitter: unhandled block node "${node.type}"`);
  }
}

function displayMath(node) {
  const math = renderMath(node.value, true);
  if (!node.data?.id) return `<div class="disp">${math}</div>`;
  return (
    `<div class="disp" id="${node.data.id}">${math}` +
    `<span class="eqno">(${node.data.number})</span></div>`
  );
}

/**
 * Theorem-family and proof-like directives share the run-in skeleton:
 * the header span is spliced into the first paragraph so the body runs on
 * from it, per amsthm and the mock.
 */
function directive(node) {
  if (proofLike[node.name]) {
    const inner = runIn(`<span class="env-head">${proofLike[node.name].header}.</span>`, node.children);
    return `<div class="env env-proof">\n${tombstone(inner)}\n</div>`;
  }

  if (callouts[node.name]) {
    const title = node.data?.title ? inline(node.data.title) : callouts[node.name].word;
    return (
      `<div class="callout callout-${node.name}">\n` +
      `<div class="callout-title">${title}</div>\n` +
      `<div class="callout-body">${blocks(node.children)}</div>\n</div>`
    );
  }

  const env = environments[node.name];
  const word = env.word[0].toUpperCase() + env.word.slice(1);
  const title = node.attributes?.title;
  const head =
    `<span class="env-head">${word}&nbsp;${node.data.number}` +
    (title ? `<span class="env-title"> (${esc(title)})</span>` : "") +
    `.</span>`;
  const cls = `env env-${env.family}`;
  const id = node.attributes?.id ? ` id="${node.attributes.id}"` : "";
  return `<div class="${cls}"${id}>\n${runIn(head, node.children)}\n</div>`;
}

/**
 * `::shader{src=… height=… layout=tabbed}` → a slot the runtime fills.
 *
 * The element is not emitted here: site/assets/shader.js constructs it, so
 * `src` can be made absolute before the component is upgraded (the sandbox
 * library resolves its buffer passes with `new URL(file, src)`, which needs
 * a protocol). Every attribute other than `height` rides along untouched —
 * `layout="tabbed"` is in real use and must survive.
 */
function leafDirective(node) {
  const { src, height = "500px", ...extra } = node.attributes ?? {};
  const s = shaderTable.get(src);
  if (!s) throw new Error(`shader "${src}" was not resolved — build order bug`);
  shadersEmitted += 1;
  const attrs = Object.keys(extra).length ? ` data-attrs='${esc(JSON.stringify(extra))}'` : "";
  return `<div class="shader" style="height:${esc(height)}" data-src="${esc(s.src)}"${attrs}></div>`;
}

function runIn(head, children) {
  const [first, ...rest] = children;
  if (first?.type === "paragraph")
    return [`<p>${head} ${inline(first.children)}</p>`, ...rest.map(block)].join("\n");
  return [`<p>${head}</p>`, ...children.map(block)].join("\n");
}

function tombstone(html) {
  return html.endsWith("</p>")
    ? html.slice(0, -4) + ` <span class="tombstone">∎</span></p>`
    : html + `\n<p><span class="tombstone">∎</span></p>`;
}

function inline(nodes) {
  return nodes.map(inlineOne).join("");
}

function inlineOne(node) {
  switch (node.type) {
    case "text":
      return esc(node.value);
    case "inlineMath":
      return renderMath(node.value, false);
    case "emphasis":
      return `<em>${inline(node.children)}</em>`;
    case "strong":
      return `<strong>${inline(node.children)}</strong>`;
    case "inlineCode":
      return `<code>${esc(node.value)}</code>`;
    case "ref":
      return ref(node);
    case "link":
      return `<a href="${node.url}">${inline(node.children)}</a>`;
    case "image":
      return `<img src="${esc(node.url)}" alt="${esc(node.alt ?? "")}" loading="lazy">`;
    case "break":
      return "<br>";
    case "delete":
      return `<del>${inline(node.children)}</del>`;
    default:
      throw new Error(`html emitter: unhandled inline node "${node.type}"`);
  }
}

function ref(node) {
  const r = node.resolved;
  if (!r) return `<span class="broken-ref">@${node.target}</span>`;
  const attrs = `class="xref" href="${r.anchor}" data-ref="${node.target}" data-kind="${r.kind}"`;
  if (r.kind === "equation") return `<a ${attrs}>(${r.number})</a>`;
  const word = refWords[r.kind];
  const shown = node.capitalized ? word[0].toUpperCase() + word.slice(1) : word;
  return `<a ${attrs}>${shown}&nbsp;${r.number}</a>`;
}

/** A paragraph node → inline HTML. The cover's note is one line of markdown. */
export function emitInline(paragraph) {
  return inline(paragraph.children);
}

export function text(nodes) {
  return nodes.map((n) => (n.type === "text" ? n.value : n.children ? text(n.children) : n.value ?? "")).join("");
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function esc(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
