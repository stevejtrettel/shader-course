# Claude Context

Ported off Quarto in August 2026 onto the markdown compiler shared with
`calc3`, `ode-book`, and `analysis-book`. Netlify does not build this repo:
`npm run deploy` builds `dist/` locally and uploads it.

    npm run dev      watch + rebuild + livereload
    npm run build    dist/
    npm run deploy   build, then netlify deploy --prod (refuses a dirty tree)

## Structure

- `book/book.yml` — the whole site: parts, chapters, slugs, all book-specific choices
- `book/intro.md` — the page "Begin reading" opens to
- `book/cirm/`, `book/ihp/`, `book/3d/` — one directory per course, sources plus assets
- `book/shaders/hero/` — the cover shader
- `compiler/` — markdown → `dist/` (parse → resolve → highlight → emit)
- `site/` — page shells (`layout.js`), dev loop (`dev.js`), assets
- `tools/from-quarto.mjs` — the one-time port script, kept for reference
- `EXTRA/` — unpublished pages: code listings, solutions, unfinished chapters

The compiler knows nothing about this book's content: every course name,
label, URL and grouping lives in `book.yml`.

## What `book.yml` can say

| key | meaning |
|---|---|
| `{file, slug}` | explicit URL per chapter — required, since five CIRM days share basenames |
| `numbering: per-part` | each course numbers its chapters from 1 |
| `subtitle:` on a part | a line under the course name on the cover |
| `- group: X` | a named run of chapters inside a part |
| `label:` on a chapter | short nav name; the page keeps its own heading |
| `sub: true` | hangs under the entry above it (a day's homework) |
| `shader:` | the cover's picture, from `book/shaders/` |

A chapter whose `#` heading carries `{.unnumbered}` is front matter: it keeps
its place and takes no number. A part holding one such chapter renders as a
bare link with no heading and nothing to fold.

## Conventions

- Shaders: `<chapter-dir>/shaders/<name>/image.glsl`, embedded with
  `::shader{src="name" layout="tabbed"}` — a leaf directive, unnumbered and
  uncaptioned. Only the directories a page actually embeds are copied.
- Callouts: `:::note` / `:::tip` / `:::warning` / `:::important`; a leading
  `##` inside one becomes its title.
- Math: `$$ … $$` display, `$ … $` inline. The parser accepts every spelling
  TeX does, including `$$x = 1$$` on one line — remark alone silently drops
  or inlines those. Book-wide macros go in `book/macros.tex`.
- Slugs mirror the Quarto-era paths so every published URL still resolves;
  the build writes `dist/_redirects` for the old `.html` forms. Renaming a
  source directory never changes a URL — `file:` and `slug:` are independent.

## Deliberately absent

The sibling books' print pipeline (LaTeX, `aux-check`) and captured-figure
system (`:::figure`, `:::demo`, `tools/capture.mjs`, `embed.js`) were removed
rather than carried dormant — this book is web-only and a shader is its only
kind of figure. calc3 holds the master copy if any of it is wanted back.

Theorem environments, proofs, crossrefs and numbered equations are kept: they
are authoring mechanisms this book may yet use, not machinery for a removed
output. `compiler/stats.js` stays byte-compatible with the sibling books on
purpose (one line differs — front matter is not a chapter — and belongs
upstream), so `pdfPageCount` is portability, not dead code.

## The shader sandbox

`site/assets/shader-sandbox.js` is the prebuilt `@stevejtrettel/shader-sandbox`
bundle, vendored and never edited — source lives in its own repo. It is
re-themed entirely from `book.css` via the custom properties it exposes; those
rules need `shader-sandbox[data-theme]` selectors, because the component styles
itself through that attribute and outranks a bare element selector.
`site/assets/shader.js` constructs the element (so `src` is absolute before
upgrade) and holds it to the page's theme, which it otherwise ignores.

## Fonts

Headings IBM Plex Sans · body EB Garamond · code JetBrains Mono
