# Claude Context

## Project structure

This site was ported off Quarto in August 2026 and now runs on the markdown
compiler shared with `calc3`, `ode-book`, and `analysis-book`. Netlify does
not build this repo; `npm run deploy` builds `dist/` locally and uploads it.

- `book/book.yml` — the whole site: parts, chapters, explicit slugs
- `book/<course>/` — one directory per course, sources plus their assets
- `book/shaders/hero/` — the cover shader
- `compiler/` — markdown → `dist/` (parse → resolve → highlight → emit)
- `site/` — page shells (`layout.js`), the dev loop (`dev.js`), assets
- `tools/from-quarto.mjs` — the one-time port script, kept for reference
- `EXTRA/` — pages not published: code listings, solutions, unfinished chapters

    npm run dev      watch + rebuild + livereload
    npm run build    dist/
    npm run deploy   build, then netlify deploy --prod (refuses a dirty tree)

## Conventions

- Shaders live in `<chapter-dir>/shaders/<name>/image.glsl`, embedded with
  `::shader{src="name" layout="tabbed"}` — a leaf directive, unnumbered and
  uncaptioned. The build copies only the shader directories a page uses.
- Callouts are `:::note` / `:::tip` / `:::warning` / `:::important`; a leading
  `##` inside one becomes its title.
- Display math is `$$ … $$` and inline is `$ … $`. The parser accepts all the
  spellings TeX does, including `$$x = 1$$` on one line.
- Chapter slugs are explicit in `book.yml` and mirror the Quarto-era paths, so
  every published URL still resolves; the build writes `dist/_redirects` to
  carry the old `.html` forms across.
- `numbering: per-part` — each course numbers its own chapters from 1.
- A chapter whose `#` heading carries `{.unnumbered}` is front matter: it keeps
  its place and takes no number.

## The shader sandbox

`site/assets/shader-sandbox.js` is the prebuilt `@stevejtrettel/shader-sandbox`
bundle, vendored and never edited — its source lives in its own repo. It is
re-themed entirely from `book.css` through the custom properties it exposes;
those rules need `shader-sandbox[data-theme]` selectors, because the component
styles itself through that attribute and outranks a bare element selector.
`site/assets/shader.js` constructs the element (so `src` can be absolute before
upgrade) and holds it to the page's theme, which it otherwise ignores.

## Fonts

- Headings: IBM Plex Sans
- Body: EB Garamond
- Code: JetBrains Mono
