/**
 * The figure resolver: one id → what kind of figure exists and where.
 * Every consumer (emitters, capture, dev harness) reads this answer and
 * never touches the filesystem layout itself.
 *
 * Shapes (file presence is the signal — observed, never declared):
 *   figures/<id>.js           single-file live figure (the common case)
 *   figures/<id>/index.js     folder figure; optional print.js beside it
 *                             means the print form is a sequence of stills
 *   figures/<id>.png|jpg|svg|pdf   a plain image as the figure (designed in;
 *                             built when the first real image figure exists)
 *
 * More than one shape for an id is a build error; none is null (callers
 * decide how loud to be).
 */

import { existsSync } from "node:fs";
import path from "node:path";

const IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".svg", ".pdf"];

export function resolveFigure(root, id) {
  const figDir = path.join(root, "figures");
  const found = [];

  if (existsSync(path.join(figDir, `${id}.js`)))
    found.push({ kind: "module", entry: `/figures/${id}.js`, print: null });

  if (existsSync(path.join(figDir, id, "index.js")))
    found.push({
      kind: "module",
      entry: `/figures/${id}/index.js`,
      print: existsSync(path.join(figDir, id, "print.js")) ? `/figures/${id}/print.js` : null,
    });

  for (const ext of IMAGE_EXTS)
    if (existsSync(path.join(figDir, `${id}${ext}`)))
      found.push({ kind: "image", file: path.join(figDir, `${id}${ext}`) });

  if (found.length > 1)
    throw new Error(`figure "${id}" exists in more than one shape under figures/ — keep exactly one`);
  if (found.length === 0) return null;

  const fig = found[0];
  if (fig.kind === "image")
    throw new Error(`figure "${id}": image figures are designed but not built yet — arrives with the first real one`);
  return fig;
}

/**
 * Demo resolution (calc3's :::demo directive) — mirrors the Quarto-era
 * demo filter exactly. A demo always lives beside its chapter: name from
 * src=/name= attr or the id minus "fig-", candidates demos/<name>.js,
 * demos/<name>/index.js, demos/<name>/main.js; poster from the chapter's
 * img/ dir by stem (poster="none" suppresses, poster="…" overrides).
 * There is deliberately no book-wide search: two chapters may innocently
 * name demos alike; shared code belongs in demo-kit/shared/.
 * Paths returned are chapter-relative — pages resolve them via baseURI.
 */
/**
 * The landing page's hero demo, which belongs to the book rather than to any
 * one chapter: it lives in book/demos/ and is served from /demos/. Same
 * candidate shapes as a chapter demo, no poster — the hero is never lazy.
 */
export function resolveBookDemo(bookDir, name) {
  if (!name) return null;
  if (name.includes("..") || name.startsWith("/"))
    return { error: `hero demo path escapes book/demos/: ${name}` };
  const bare = name.replace(/^demos\//, "").replace(/\.js$/, "");
  const candidates = [`demos/${bare}.js`, `demos/${bare}/index.js`, `demos/${bare}/main.js`];
  const src = candidates.find((c) => existsSync(path.join(bookDir, c)));
  if (!src) return { error: `no hero demo found (tried ${candidates.join(", ")})` };
  return { name: bare, src: `/${src}` };
}

export function resolveDemo(chapterDir, id, attributes = {}) {
  let name = attributes.src || attributes.name || (id?.startsWith("fig-") ? id.slice(4) : null);
  if (!name) return { error: "needs a #fig-… id or an explicit src attribute" };
  name = name.replace(/^demos\//, "").replace(/^\.\//, "");
  if (name.includes("..") || name.startsWith("/"))
    return { error: `demo path escapes the chapter's demos/ directory: ${name}` };

  const candidates = name.endsWith(".js")
    ? [`demos/${name}`]
    : [`demos/${name}.js`, `demos/${name}/index.js`, `demos/${name}/main.js`];
  const src = candidates.find((c) => existsSync(path.join(chapterDir, c)));
  if (!src) return { error: `no demo found (tried ${candidates.join(", ")})` };

  let poster = null;
  if (attributes.poster !== "none") {
    const stem = name.replace(/\.js$/, "").replace(/\/(index|main)$/, "");
    const posters = attributes.poster
      ? [attributes.poster]
      : ["png", "jpg", "jpeg", "svg"].map((ext) => `img/${stem}.${ext}`);
    poster = posters.find((p) => existsSync(path.join(chapterDir, p))) ?? null;
  }

  return { src, name, poster };
}
