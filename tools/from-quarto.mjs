/**
 * The one-time Quarto → markdown rewrite.
 *
 *   node tools/from-quarto.mjs <src-dir> <dest-dir>
 *
 * Copies a Quarto project's tree into book/, converting each .qmd to .md and
 * carrying every asset beside it (shaders/, images/) untouched — page-relative
 * paths are the whole reason the tree shape is preserved rather than tidied.
 *
 * Three source conventions change, and nothing else does:
 *
 *   {{< shader layout="tabbed" circle >}}   →  ::shader{src="circle" layout="tabbed"}
 *   ::: {.callout-note}                     →  :::note
 *   ::: {.callout-tip}                      →  :::tip            (and warning, important)

 *
 * A callout's leading `## Title` is left in place: compiler/parse.js lifts it
 * off as the callout's title, which keeps its inline markup (several are code
 * spans) and keeps it out of the section counter.
 *
 * Kept deliberately dumb and re-runnable. It is not part of the build.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, copyFileSync } from "node:fs";
import path from "node:path";

const SHORTCODE = /\{\{<\s*shader\s+([^>]*?)\s*>\}\}/g;
const CALLOUT = /^:::+\s*\{\.callout-(note|tip|warning|important)\}\s*$/gm;

/**
 * Shortcode arguments are a mix of `key=value` pairs and one bare positional
 * — the shader name — in any order. `layout="tabbed"` comes first on nearly
 * every one of them, so position cannot be assumed.
 */
function shaderDirective(argString) {
  const tokens = argString.match(/(?:[\w-]+=)?(?:"[^"]*"|'[^']*'|[^\s]+)/g) ?? [];
  const attrs = [];
  let name = null;
  for (const token of tokens) {
    const m = /^([\w-]+)=(.*)$/.exec(token);
    if (m) attrs.push(`${m[1]}="${m[2].replace(/^["']|["']$/g, "")}"`);
    else if (name === null) name = token;
    else throw new Error(`two positional arguments in {{< shader ${argString} >}}`);
  }
  if (name === null) throw new Error(`no shader name in {{< shader ${argString} >}}`);
  return `::shader{src="${name}"${attrs.length ? " " + attrs.join(" ") : ""}}`;
}

function convert(source, file) {
  let shaders = 0;
  let text = source.replace(SHORTCODE, (_, args) => {
    shaders += 1;
    return shaderDirective(args);
  });
  let calls = 0;
  text = text.replace(CALLOUT, (_, kind) => {
    calls += 1;
    return `:::${kind}`;
  });
  return { text, shaders, calls };
}

function walkDir(src, dest, report) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    // Quarto's own machinery does not come along.
    if (entry.startsWith(".") || entry === "_site" || entry === "_extensions") continue;
    const from = path.join(src, entry);
    if (statSync(from).isDirectory()) {
      walkDir(from, path.join(dest, entry), report);
    } else if (entry.endsWith(".qmd")) {
      const { text, shaders, calls } = convert(readFileSync(from, "utf8"), from);
      const to = path.join(dest, entry.replace(/\.qmd$/, ".md"));
      writeFileSync(to, text);
      report.push({ file: path.relative(process.cwd(), to), shaders, calls });
    } else if (entry === "_quarto.yml" || entry.endsWith(".scss")) {
      continue; // project config and Quarto theming have no counterpart here
    } else {
      copyFileSync(from, path.join(dest, entry));
    }
  }
}

const [src, dest] = process.argv.slice(2);
if (!src || !dest) {
  console.error("usage: node tools/from-quarto.mjs <src-dir> <dest-dir>");
  process.exit(1);
}
const report = [];
walkDir(src, dest, report);
const total = (k) => report.reduce((n, r) => n + r[k], 0);
for (const r of report) console.log(`  ${r.file}  ${r.shaders} shaders, ${r.calls} callouts`);
console.log(`${report.length} pages → ${dest} · ${total("shaders")} shaders · ${total("calls")} callouts`);
