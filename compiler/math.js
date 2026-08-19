/**
 * Build-time MathJax: TeX → CHTML strings, so pages ship no math JS.
 *
 * One MathJax instance per process (init ~100ms), a disk cache keyed by
 * content hash of (font, macros, display, tex) so unchanged expressions cost
 * a Map lookup on rebuild.
 *
 * The stylesheet and the cache are entangled, and getting that wrong is
 * silent. adaptiveCSS is off, which makes the CSS cover the whole *base*
 * font no matter what was rendered — but NOT the dynamically loaded variants
 * (double-struck, script, fraktur, and assorted symbols like \ell and
 * \perp). Those emit their per-character sizing rules only for characters
 * MathJax actually rendered, and a character with no sizing rule has no
 * width, because the glyph advance comes from the rule rather than the font.
 * A warm cache renders nothing, so the second build of an unchanged book
 * would drop those rules and the affected symbols would vanish from the page
 * — no error, no warning, just gaps in the prose.
 *
 * So the stylesheet is cached alongside the expressions and reused only when
 * every expression this build was a cache hit. One miss and every expression
 * is re-rendered from its stored TeX before the CSS is taken, which is what
 * makes the output identical whether the cache was cold or warm. Verified by
 * building twice and diffing.
 *
 * The font is the one-line swap: change FONT to any @mathjax/*-font package
 * (mathjax-newcm is the mathjax package default) and reinstall.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

const FONT = "mathjax-newcm";
const FONT_URL = "/assets/mathjax-fonts";

let MathJax = null;
let cache = new Map();       // key → {tex, display, html}
let cachePath = null;
let cacheDirty = false;
let keyPrefix = "";
let stylesheet = null;       // last build's CSS, reusable on an all-hit build
let used = new Map();        // this build's expressions, hit or miss
let anyMiss = false;

/**
 * Load the cache and start MathJax, defining macros.tex's macros once.
 * Idempotent: a warm process (the dev loop's builder) pays init once. A
 * macros.tex change must arrive in a fresh process — the dev loop respawns
 * its builder for exactly that reason.
 */
export async function initMath(root) {
  if (MathJax) return;
  cachePath = path.join(root, ".cache", "math.json");
  if (existsSync(cachePath)) {
    const saved = JSON.parse(readFileSync(cachePath, "utf8"));
    cache = new Map(Object.entries(saved.expressions ?? {}));
    stylesheet = saved.css ?? null;
  }

  // Book-wide \newcommand definitions, if the author wants any. It lived
  // under latex/ when this compiler also produced a PDF; here it is simply
  // part of the book.
  const macrosFile = path.join(root, "book", "macros.tex");
  const macros = existsSync(macrosFile) ? readFileSync(macrosFile, "utf8") : "";
  const version = JSON.parse(
    readFileSync(path.join(root, "node_modules", "mathjax", "package.json"), "utf8")
  ).version;
  keyPrefix = `${version}|${FONT}|${hash(macros)}|`;

  const { init } = await import("mathjax");
  MathJax = await init({
    loader: { load: ["input/tex", "output/chtml", "[tex]/boldsymbol"] },
    // Loaded up front, never on demand: tex2chtml is synchronous, so a
    // control sequence whose extension is not already present fails the
    // build rather than pausing for it. \boldsymbol is in the prose.
    tex: { packages: { "[+]": ["ams", "boldsymbol"] } },
    chtml: { adaptiveCSS: false, fontURL: FONT_URL },
  });
  // The whole font, up front: the sync tex2chtml path can't await the
  // dynamic font pieces (\mathbb, script, fraktur, ...), and adaptiveCSS is
  // already off because caching demands render-order independence.
  await MathJax.startup.document.outputJax.font.loadDynamicFiles();
  if (macros.trim()) MathJax.tex2mml(macros); // registers \newcommand definitions
}

/** TeX → CHTML html string. Throws with the TeX source on a compile error. */
export function renderMath(tex, display) {
  const key = keyPrefix + hash(`${display ? "D" : "I"}\0${tex}`);
  used.set(key, { tex, display });
  const hit = cache.get(key);
  if (hit !== undefined) return hit.html;

  anyMiss = true;
  const node = MathJax.tex2chtml(tex, { display });
  const html = MathJax.startup.adaptor.outerHTML(node);
  if (html.includes("data-mjx-error")) {
    const msg = html.match(/data-mjx-error="([^"]*)"/)?.[1] ?? "unknown error";
    throw new Error(`math error: ${msg}\n  in: ${tex.trim().split("\n")[0]}`);
  }
  cache.set(key, { tex, display, html });
  cacheDirty = true;
  return html;
}

/**
 * The stylesheet — identical for every build of the same book, which is the
 * whole point. Reused as-is when nothing was re-rendered; otherwise every
 * expression is put through MathJax first, so the dynamic variants register
 * their sizing rules and nothing renders zero-width.
 */
export function mathStylesheet() {
  if (!anyMiss && stylesheet) return stylesheet;
  for (const { tex, display } of used.values()) MathJax.tex2chtml(tex, { display });
  stylesheet = MathJax.startup.adaptor.textContent(MathJax.chtmlStylesheet());
  cacheDirty = true;
  return stylesheet;
}

export function saveMathCache() {
  if (!cacheDirty) return;
  mkdirSync(path.dirname(cachePath), { recursive: true });
  writeFileSync(
    cachePath,
    JSON.stringify({ expressions: Object.fromEntries(cache), css: stylesheet })
  );
  cacheDirty = false;
}

function hash(s) {
  return createHash("sha256").update(s).digest("hex").slice(0, 16);
}
