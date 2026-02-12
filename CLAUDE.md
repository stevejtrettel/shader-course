# Claude Context

## After updating @stevejtrettel/shader-sandbox npm package

When a new version of the npm package is published that removes base.css from the
library build, do the following:

### 1. Install and rebuild
```bash
cd main
npm install @stevejtrettel/shader-sandbox@latest
node build-shaders.mjs
```

### 2. Verify the fix
Check that the built bundles no longer inject base.css:
```bash
head -1 dist/notes/3d/02-raymarching/scene-complete/main.js
```
If the fix worked, the first line should NOT contain `overflow:hidden` or
`html,body{width:100%;height:100%}`.

### 3. Remove workarounds (only after verifying step 2)

**main/styles/website.scss** — Remove the "Shader-sandbox base.css overrides" section:
```scss
// DELETE this entire block:
html {
  overflow: auto !important;
  height: auto !important;
}
body {
  overflow: auto !important;
  height: auto !important;
  font-family: $font-family-base !important;
}
```

**main/_quarto.yml** — Remove the `include-in-header` MutationObserver script
(the entire `include-in-header:` block with the `<script>` that intercepts
style injection).

### 4. Keep the IntersectionObserver (shader.lua)
The lazy mount/unmount IntersectionObserver in `_extensions/shader-sandbox/shader.lua`
is NOT a workaround — it's the correct solution for WebGL context limits on pages
with many shaders. Do NOT remove it.

## Project structure

- `main/` — Main shader course site (Quarto)
- `cirm/` — CIRM 2026 workshop site (Quarto, pre-built demos, no npm build needed)
- `build.sh` — Netlify build script (builds main shaders, then both Quarto sites)
- `main/build-shaders.mjs` — Discovers shaders/ dirs, builds each with Vite
- `main/_extensions/shader-sandbox/shader.lua` — Quarto shortcode for embedding shaders
- `main/styles/website.scss` — Site-wide styling (fonts, callouts, overrides)

## Shader convention
- Shaders live in `notes/<chapter>/shaders/<name>/image.glsl`
- Shortcode: `{{< shader name >}}` resolves relative to the current .qmd's directory
- Build output: `dist/<doc-dir>/<name>/main.js`

## Fonts
- Headings: IBM Plex Sans
- Body: EB Garamond (1.15rem)
- Code: JetBrains Mono (0.875rem)
- Sidebar: IBM Plex Sans
