/**
 * Stage 2: the book pass — the ONLY code that counts anything.
 *
 * Walks every chapter in book order, stamps {kind, number} onto each
 * numberable node, and builds the global label table. The emitter consumes
 * these numbers and never counts anything itself.
 *
 * Numbering rules:
 *   chapter N (book order) · section N.M · subsection N.M.K
 *
 * `numbering: per-part` in book.yml restarts the chapter counter at each
 * part instead, which is what a site holding several separate courses wants:
 * a reader in the CIRM notes should meet chapters 1, 2, 3, not 14, 15, 16.
 * Everything downstream — sections, equations, figures — is derived from the
 * chapter number and follows automatically.
 *   theorem family: one shared counter per chapter → N.M
 *   equations: labeled display math only, per chapter → N.M
 */

import { environments, proofLike, callouts } from "./registry.js";

export function resolveBook(chapters, { perPart = false } = {}) {
  const labels = new Map(); // id → {kind, number, chapter, anchor, file}
  const errors = [];

  const define = (id, kind, number, ch, node) => {
    if (!id) return;
    if (labels.has(id)) {
      errors.push(`duplicate id "${id}" in ${ch.file} (first defined in ${labels.get(id).file})`);
      return;
    }
    labels.set(id, { kind, number, chapter: ch.number, anchor: `/${ch.slug}/#${id}`, file: ch.file });
    node.data = { ...node.data, id, kind, number };
  };

  // A chapter whose "#" heading carries {.unnumbered} is front matter — a
  // course's own opening page. It keeps its place in the order and in
  // prev/next, but takes no number and passes none on, so the numbered
  // chapters run 1, 2, 3 with no gaps where a front page sat.
  let numbered = 0;
  let openPart = null;
  chapters.forEach((ch) => {
    if (perPart && ch.part !== openPart) {
      openPart = ch.part;
      numbered = 0;
    }
    const h1 = ch.tree.children.find((n) => n.type === "heading" && n.depth === 1);
    ch.unnumbered = Boolean(h1?.data?.unnumbered);
    ch.number = ch.unnumbered ? null : ++numbered;
    const c = { section: 0, subsection: 0, theorem: 0, equation: 0 };
    let sawChapterHeading = false;

    walk(ch.tree, (node) => {
      if (node.type === "heading") {
        if (ch.unnumbered) node.data = { ...node.data, unnumbered: true };
        if (node.data?.unnumbered) {
          if (node.depth === 1) {
            if (sawChapterHeading) errors.push(`${ch.file}: more than one "#" chapter heading`);
            sawChapterHeading = true;
            ch.title = node.children;
          }
          return;
        }
        if (node.depth === 1) {
          if (sawChapterHeading) errors.push(`${ch.file}: more than one "#" chapter heading`);
          sawChapterHeading = true;
          ch.title = node.children;
          define(node.data?.id, "chapter", `${ch.number}`, ch, node);
          node.data = { ...node.data, kind: "chapter", number: `${ch.number}` };
        } else if (node.depth === 2) {
          c.section += 1;
          c.subsection = 0;
          const number = `${ch.number}.${c.section}`;
          define(node.data?.id, "section", number, ch, node);
          node.data = { ...node.data, kind: "section", number };
        } else if (node.depth === 3) {
          c.subsection += 1;
          const number = `${ch.number}.${c.section}.${c.subsection}`;
          define(node.data?.id, "subsection", number, ch, node);
          node.data = { ...node.data, kind: "subsection", number };
        }
      } else if (node.type === "containerDirective") {
        if (ch.unnumbered && environments[node.name]) {
          errors.push(`${ch.file}: :::${node.name} needs a numbered chapter — remove {.unnumbered} from the "#" heading`);
        } else if (environments[node.name]) {
          c.theorem += 1;
          const number = `${ch.number}.${c.theorem}`;
          define(node.attributes?.id, node.name, number, ch, node);
          node.data = { ...node.data, kind: node.name, number };
        } else if (!proofLike[node.name] && !callouts[node.name]) {
          errors.push(`${ch.file}: unknown directive :::${node.name}`);
        }
      } else if (node.type === "leafDirective") {
        // Shaders are embeds, not figures: unnumbered, uncaptioned, and not
        // crossref targets — the form they had under Quarto, kept on purpose.
        if (node.name !== "shader") errors.push(`${ch.file}: unknown directive ::${node.name}`);
        else if (!node.attributes?.src)
          errors.push(`${ch.file}: shader directive needs a src (::shader{src=my-shader})`);
      } else if (node.type === "math") {
        lintMath(node, ch, errors);
        if (node.data?.id && ch.unnumbered) {
          errors.push(`${ch.file}: a labelled equation needs a numbered chapter — remove {.unnumbered} from the "#" heading`);
        } else if (node.data?.id) {
          c.equation += 1;
          const number = `${ch.number}.${c.equation}`;
          define(node.data.id, "equation", number, ch, node);
        }
      }
    });

    if (!sawChapterHeading) errors.push(`${ch.file}: missing "#" chapter heading`);
    for (const id of ch.tree.data?.orphanEquationLabels ?? [])
      errors.push(`${ch.file}: equation label {#${id}} not attached to any display math`);
  });

  // Second pass: every reference must resolve.
  for (const ch of chapters) {
    walk(ch.tree, (node) => {
      if (node.type !== "ref") return;
      const hit = labels.get(node.target);
      if (!hit) {
        errors.push(`${ch.file}: reference @${node.target} matches no id${suggest(node.target, labels)}`);
      } else {
        node.resolved = hit;
      }
    });
  }

  return { labels, errors };
}

/** Counter-touching math that would silently desync print and web numbering. */
function lintMath(node, ch, errors) {
  const banned = node.value.match(/\\(tag|notag|nonumber)\b|\\begin\{(align|gather|equation)[*]?\}/);
  if (banned)
    errors.push(
      `${ch.file}: "${banned[0]}" inside $$ is not allowed (v1: use aligned inside one labeled equation)`
    );
}

function suggest(target, labels) {
  const near = [...labels.keys()].filter(
    (id) => id.includes(target.slice(4)) || target.includes(id.slice(4))
  );
  return near.length ? ` (did you mean ${near.map((s) => `@${s}`).join(", ")}?)` : "";
}

/** Depth-first walk in document order. */
export function walk(node, fn) {
  fn(node);
  for (const child of node.children ?? []) walk(child, fn);
}
