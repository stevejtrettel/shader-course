# Claude Context

## Project structure

- `main/` — Main shader course site (Quarto)
- `cirm/` — CIRM 2026 workshop site (Quarto, pre-built demos, no npm build needed)
- `build.sh` — Netlify build script (renders both Quarto sites)
- `main/_extensions/shader-sandbox/` — Quarto extension: shortcode + runtime JS
- `main/styles/website.scss` — Site-wide styling (fonts, callouts)

## Shader convention
- Shaders live in `notes/<chapter>/shaders/<name>/image.glsl`
- Shortcode: `{{< shader name >}}` resolves relative to the current .qmd's directory
- At runtime, `shader-sandbox.js` fetches the `.glsl` files directly (no build step)
- Lazy loading is built into the `<shader-sandbox>` custom element (IntersectionObserver)

## Fonts
- Headings: IBM Plex Sans
- Body: EB Garamond (1.15rem)
- Code: JetBrains Mono (0.875rem)
- Sidebar: IBM Plex Sans
