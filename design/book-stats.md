# Book stats — `stats.json`

Every book built on this system publishes a small JSON file at the root of
its site, which stevejtrettel.site fetches at *its* build time to render a
stats line under the book:

> 12 chapters · 340 pages · 200 figures (170 interactive)

The website needs no configuration — it fetches `stats.json` from the URL
already recorded for the book in its own `src/content/writing/*.yaml`. A
book gains a stats line by publishing the file and loses it by not.

This document is the portable half: the counting rules, so that "figure"
and "chapter" mean the same thing in all three books whose numbers sit
side by side on one page, and the drop-in instructions for the other two.

## The consumer's contract

Authoritative version lives with the website (`src/utils/book-stats.ts`).
Restated here so a book can be maintained without it:

| field | meaning |
|---|---|
| `chapters` | top-level divisions |
| `pages` | only if a PDF is actually produced |
| `figures` | every figure, interactive or not |
| `interactives` | how many of those are live — a **subset of `figures`** |
| `updated` | ISO date the numbers were computed |

- **All fields optional.** Emit only what the book can honestly count;
  the site drops the missing item from the line and renders the rest.
- **Non-negative integers only.** A float, negative, or string in a
  numeric field is silently dropped, taking that item off the line.
- **`interactives` must not exceed `figures`,** or the site treats the
  subset claim as broken and shows the bare figure count.
- **Zero is a statement; absent is silence.** Emit `0` when zero is true,
  omit the key to say nothing.
- **Unknown keys are ignored** — safe to add, but not displayed. `sections`
  and `exercises` were considered and cut.
- **Nothing here can break the website's build.** 404, malformed JSON, an
  8s timeout, or the host being down all fall back to the last values
  successfully fetched (cached under `node_modules/.cache/sjtsite`, carried
  between Netlify deploys). Never seen any → the line is dropped.

## Counting rules (the part that must match across books)

These are the decisions that would otherwise drift. They are the reason
this document exists.

- **A chapter is an entry in `book.yml`'s `parts[].chapters`.** Parts are
  not chapters, and are not counted as anything.
- **A figure is a figure directive in the text** — a numbered figure the
  reader meets and can be sent to by crossref. Which directive that is
  depends on the book: `:::figure` in analysis-book and ode-book,
  `:::demo` in calc3 (resolved against each chapter's own `demos/`), and
  both where both exist. They are the same thing under different names and
  are counted together.
- **Book furniture is not a figure.** The cover hero (`figure:` or `demo:`
  at the top of `book.yml`) and part-opener art (`figure:` on a part) are
  site and title-page decoration, not figures in the text, and are **not**
  counted. Consequence worth knowing: a book with cover art and no in-text
  figures honestly reports `figures: 0`.
- **A figure with three sliders is one figure.** Count figures, not
  controls. This is the rule most likely to drift between books.
- **An interactive figure is one that resolves to a live module**
  (`figures/<id>.js` or `figures/<id>/index.js`) rather than a plain image
  file. Because it is computed by filtering the same list `figures` was
  counted from, `interactives <= figures` holds by construction rather
  than by discipline.
- **`pages` is read out of the PDF that is actually published,** and only
  by a build that produced one. A `--no-pdf` build omits the key rather
  than reusing a stale number.
- **`words` counts prose only** — text nodes of the parsed markdown, so
  display and inline math, code, and crossref tokens are excluded. It is
  an extra key: the website ignores it today (see *unknown keys* above),
  and it will start appearing only if `book-stats.ts` learns about it.

## How it is implemented

Identical in all three books; this document is the same file in each, so
that the rules cannot drift apart.

- **`compiler/stats.js`** — `bookStats({book, figures, pdfPages})` builds
  the payload, and `pdfPageCount(logFile)` reads the page count. This file
  is the portable unit and is byte-identical in every book.
  `figures` arrives as an already-assembled `{id, live}[]`: what counts as
  a figure is the one book-specific decision here, so it is made in
  `build.js`, where that knowledge already lives, rather than by teaching
  this module about every book's directives.
- **`compiler/build.js`** — defines a local `writeStats(pdfPages)` right
  after the `dist/book.pdf` copy, and calls it twice: with `null` on the
  `--no-pdf` early return, and with the real count after `latexmk` and the
  aux check. Two call sites so that `pages` is claimed exactly when a PDF
  was produced.
- **`netlify.toml`** — a `[[headers]]` block giving `/stats.json` a
  five-minute `Cache-Control`. This matters: the website only sees a new
  number when it rebuilds *and* the CDN hands over a fresh copy, so a long
  `max-age` on this one file would freeze the stats indefinitely.

Nothing is written by hand; `stats.json` is a build artifact like any page,
so it cannot go stale silently.

## Adding it to another book on this compiler

Three edits:

1. Copy `compiler/stats.js` and this document unchanged.
2. In `compiler/build.js`, add the import, assemble `statFigures` from
   whatever this book calls a figure, add the `writeStats` closure after
   the `book.pdf` copy, and add the two call sites described above.
   Everything the closure needs is already in scope at that point. (The
   `--no-pdf` flag is named `pdf` in some books and `wantPdf` in others —
   the early return is the anchor, not the name.)
3. Append the `[[headers]]` block to `netlify.toml`.

Then check the output is honest for that book before deploying — in
particular that `figures` matches what you would count by hand, since that
is the number readers will compare across books.

## The Quarto projects

`analysisBook`, `geometry`, and `shader-course` predate this compiler.
They share one byte-identical, dependency-free `stats.mjs`; only how it is
invoked differs.

- **analysisBook, geometry** — Quarto *book* projects. Wired as a
  `post-render` step via `tools/stats.sh` (Quarto maps interpreters by
  extension and has no mapping for `.mjs`). Writes `_book/stats.json`.
- **shader-course** — three Quarto *website* projects combined by
  `build.sh` into one site. Run as
  `node scripts/stats.mjs --combine _site main cirm:cirm-2026 ihp:ihp-2026`,
  which gives each published course its own `stats.json` and the site root
  the aggregate. This one builds remotely on Netlify, so the step lives in
  `build.sh` rather than in a Quarto hook.

Differences forced by that era, all documented in the script:

- **Only pages the project actually publishes are counted** — listed in
  `_quarto.yml` (a book's `chapters:` or a website's sidebar `contents:`)
  and present on disk. Commented-out and abandoned pages contribute
  nothing. Consequence: a shortcode on an unlisted page is invisible to
  the count, which is the intended behaviour.
- **A figure is a markdown image, an `<iframe>`, or a `{{< shader >}}`
  shortcode;** an interactive is an `<iframe>` or a shader. Same subset
  relation as everywhere else.
- **`chapters` counts navigable pages,** so a course whose sidebar lists
  Notes / Code / Homework per day counts three, not one. Worth revisiting
  if that reads wrong on the website.
- **Prose is counted after stripping** front matter, fenced code, display
  and inline math, HTML, and image markup.
- **It never fails the render.** No chapters found means it writes nothing
  and exits 0.

## Known fragilities

- **The page count scans the PDF for page objects,** inflating every
  deflate stream on the way, because TeX writes the page tree into
  compressed object streams — `/Type /Page` does not appear in the raw
  bytes. Verified against the OS page count on a 7-page, a 43-page, a
  384-page and a 430-page book. If it ever finds nothing it returns
  `null` and `pages` is omitted; the line loses one item and nothing
  breaks. That is the intended failure.
- **Do not read the page count from the TeX log.** It was the first
  approach here and it is quietly wrong: `analysisBook`'s log claimed 368
  pages for a PDF that has 384, because the log was two builds old. The
  published artifact is the only honest source.
- **`words` counts what the markdown parse calls text.** Prose moved into
  a figure caption still counts; prose inside raw LaTeX passthrough does
  not.
