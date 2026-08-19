/**
 * Shader resolution — the `::shader` directive's half of the old Quarto
 * shortcode (`main/_extensions/shader-sandbox/shader-sandbox.lua`), whose
 * contract this preserves exactly:
 *
 *   - a bare name resolves against the page's own directory:
 *     `day1/notes.md` + `::shader{src=circle}` → `shaders/circle/`
 *   - a name containing `/` is used as written
 *   - anything not ending in `.glsl` gets a trailing slash
 *
 * A shader is a directory holding `image.glsl` and optionally `config.json`
 * (plus any extra buffer passes). Existence is checked here so a typo is a
 * build error rather than a blank rectangle on the page.
 *
 * Returned `src` is page-relative: the runtime resolves it against
 * `location.href`, because the sandbox library's internal `new URL(file,
 * src)` demands an absolute URL with a protocol. `dir` is the source
 * directory on disk, which the build copies to sit beside the page.
 */

import { existsSync, statSync } from "node:fs";
import path from "node:path";

export function resolveShader(chapterDir, name) {
  if (!name) return { error: "needs a src (::shader{src=my-shader})" };
  if (name.includes("..") || name.startsWith("/"))
    return { error: `shader path escapes the chapter directory: ${name}` };

  let src = name.includes("/") ? name : `shaders/${name}/`;
  if (!src.endsWith(".glsl") && !src.endsWith("/")) src += "/";

  const onDisk = path.join(chapterDir, src);
  if (!existsSync(onDisk)) return { error: `no shader at ${src}` };

  if (src.endsWith(".glsl")) return { src, dir: path.dirname(onDisk), rel: path.dirname(src) };

  if (!statSync(onDisk).isDirectory()) return { error: `${src} is not a directory` };
  if (!existsSync(path.join(onDisk, "image.glsl")))
    return { error: `${src} has no image.glsl` };

  return { src, dir: onDisk, rel: src.replace(/\/$/, "") };
}
