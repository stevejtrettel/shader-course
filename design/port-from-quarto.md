# Porting this site off Quarto

Working notes for the port of `shader-course` from three Quarto projects to
the markdown compiler used by `calc3`, `ode-book`, and `analysis-book`.
Written 2026-08-19 from a survey of this repo, calc3's compiler, and
sjtSite; the findings below were expensive to establish and are the reason
this file exists.

**Scope: website only.** No PDF, no LaTeX output for now. Both this and
calc3 are expected to be rewritten again later — this is a port away from
Quarto, not a final system, and it should not be gold-plated.

**Author is the only author.** The doctrine consequence: the new system
builds `dist/` locally and deploys static files, so this repo loses
push-to-deploy and Netlify stops running `build.sh`. That is a deliberate
trade, not an oversight.

## What exists today

| | |
|---|---|
| projects | `main/`, `cirm/`, `ihp/` — three Quarto *websites*, combined by `build.sh` |
| published | one Netlify site, built **remotely** (`command = "bash build.sh"`, which installs Quarto onto the build image) |
| URLs | `/` (main), `/cirm-2026/`, `/ihp-2026/` |
| sources | 52 `.qmd` |
| shaders | 190 `{{< shader >}}` shortcodes |
| code | 772 ```` ```glsl ```` blocks, 2 ```` ```bash ```` |
| callouts | 33, all `.callout-note` / `-tip` / `-warning` / `-important` |
| other | 12 `{.unnumbered}`, 4 markdown images, 0 iframes, 0 executable cells |

## Target

One book. `book.yml` with three parts (Main notes / CIRM 2026 / IHP 2026),
built by the shared compiler, emitted as a website only.

## The four findings that matter

### 1. The shader sandbox is not touched by any of this

`@stevejtrettel/shader-sandbox` (npm, `^0.1.10`) is a prebuilt web
component that already carries the code editor, tabs, recompile,
syntax colours, and IntersectionObserver lazy-loading. **Keep it exactly as
is.** Vendor the built ESM into `vendor/` and serve it through the import
map, per the vendored-only rule; nothing inside it changes.

The thing that looks like a blocker and is not: the new system's figure
capture serializes an `<svg>` and throws *"canvas capture is not built
yet"* on anything else — which a WebGL shader is. **calc3's `:::demo` path
never enters that pipeline.** It resolves a demo to `{src, name, poster}`,
emits a custom element, and lets the book's own runtime
(`demo-kit/runtime.js`, `<calc3-demo>`) mount and tear it down; posters are
supplied files from the chapter's `img/` dir by stem, with `poster="none"`
to opt out. Model the shader directive on that and the capture pipeline is
simply never involved.

### 2. Syntax highlighting is a swap, not a project

The compiler currently emits code raw — `compiler/emit-html.js`, the
`case "code"` arm, returns `<pre><code>${esc(node.value)}</code></pre>`.
Quarto is giving these 772 GLSL blocks their highlighting today
(`highlight-style: arrow`), and losing it is not acceptable for a shader
course.

sjtSite already solved this: **Shiki**, build-time, dual themes
(`vitesse-light` / `vitesse-dark` with `defaultColor: false`, so both ship
as CSS variables and no client JS is involved). Shiki has a GLSL grammar,
and it is a build-time dependency, which fits "npm for build tooling only".
See `astro.config.mjs` in sjtSite for the config, and its `::sandbox`
directive for the pattern worth copying: emit plain
`<pre><code class="language-*">` and let the same highlighting pass handle
it, so a file-backed block and a fenced block cannot disagree about themes.

### 3. The slug rule is a hard blocker

`compiler/build.js` derives a chapter's URL as
`slug: path.basename(rel, ".md")`. That is one path segment, and it
**collides on this content**: CIRM's sidebar alone has five `notes.qmd`,
five `shaders.qmd`, and five `homework.qmd`. Under a basename rule, days 1
through 5 all claim `/notes/` and silently overwrite each other. So the
current scheme does not merely fail to preserve the existing URLs — it
cannot hold this content at all.

Fix: let a chapter entry in `book.yml` be either a string (today's
behaviour, unchanged) or a `{file, slug}` pair, and take the URL from the
explicit slug. Downstream consumers only interpolate `/${slug}/`, and
`mkdirSync(…, {recursive: true})` already writes nested output. The one
thing that breaks is the `.tex` filename and `\include{${ch.slug}}` — a
slash is not valid there — so those need a flattened `texName`. Roughly
five lines plus the flattening.

This is worth upstreaming: any book with two chapters sharing a basename
hits it.

### 4. The URLs are historical facts

`/cirm-2026/…` and `/ihp-2026/…` were handed to workshop participants.
With finding 3 in place they can be the *real* page paths — declare them as
explicit slugs — rather than redirects. Do that; redirects are the worse
answer here.

## The shader shortcode contract (preserve this exactly)

From `main/_extensions/shader-sandbox/shader-sandbox.lua`:

```
{{< shader <name-or-path> [height=400px] [layout="tabbed"] [attr=…] >}}
```

- **Bare name** resolves relative to the current page's directory:
  `notes/3d/04-sculpting/notes.qmd` + `{{< shader breakfast-scene >}}`
  → `src = "shaders/breakfast-scene/"`.
- **A name containing `/`** is used as-is.
- A `src` not ending in `.glsl` gets a trailing slash.
- Default height `500px`; outer div is `width:75%`, centred.
- `controls` is set to `"false"`; every other keyword argument is forwarded
  to the element as an attribute. **`layout="tabbed"` is in real use** and
  must survive.
- The `src` is set to `new URL(src, location.href).href` — an **absolute
  URL with protocol**, because the library's internal `new URL(file, src)`
  will not accept a bare path. Whatever the new runtime does, it must still
  hand the element an absolute URL.
- A shader lives in a directory holding `image.glsl` and optionally
  `config.json`.

Consequence for the build: the `.glsl` and `config.json` files must be
copied into `dist/` beside their pages, the way `_quarto.yml`'s
`resources: shaders/**` does it now, and the way the compiler already
copies `figures/` into `dist/figures/`.

## The system you are copying

**Nothing here gets built from scratch.** The whole thing is ~2,800 lines
across three repos that already run it, and the port is a copy plus the
three changes in the findings above. Copy calc3's tree wholesale and delete
what this site does not need.

Architecture (see calc3 `DESIGN.md`, worth copying too): three layers,
strict one-way dependencies — a content pipeline (markdown in, HTML
fragments + `book.json` out), a presentation layer (template literals +
one stylesheet), and a runtime layer (native ES modules, the only client
JS). No framework.

### Manifest

| file | lines | what it does | website-only |
|---|---|---|---|
| `compiler/build.js` | 227 | orchestrator: parse → resolve → emit → capture → PDF | keep, run `--no-pdf` |
| `compiler/parse.js` | 121 | markdown → mdast (remark + directives + math + frontmatter) | keep |
| `compiler/resolve.js` | 135 | numbering, labels, crossrefs; exports `walk` | keep |
| `compiler/registry.js` | 45 | the environment list both emitters read | keep |
| `compiler/emit-html.js` | 234 | mdast → HTML; where `demo`/`figure`/`code` are handled | keep — **edit here** |
| `compiler/math.js` | 91 | build-time MathJax with a per-expression cache | keep |
| `compiler/stats.js` | 105 | `stats.json` | keep |
| `compiler/figure-resolve.js` | 99 | resolves figures **and** demos by file presence | keep the demo half |
| `compiler/emit-latex.js` | 250 | mdast → LaTeX | dead weight; see below |
| `compiler/aux-check.js` | 35 | diffs LaTeX's `.aux` against the resolver | dead weight; see below |
| `site/layout.js` | 242 | page shells, nav, ToC, landing — template literals | keep |
| `site/dev.js` | 209 | watch → rebuild → livereload; `/dev/<id>` harness | keep |
| `site/builder.js` | 18 | warm build child for the dev loop | keep |
| `site/assets/book.css` | 352 | the theme; light/dark as `--*` custom properties | keep |
| `site/assets/page.js` | 101 | theme toggle, nav behaviour | keep |
| `site/assets/embed.js` | 57 | figure islands: lazy mount, pause off-screen | keep |
| `site/assets/fonts.css` | 167 | IBM Plex Sans / EB Garamond / JetBrains Mono | keep — matches this repo's fonts already |
| `demo-kit/runtime.js` | 156 | `<calc3-demo>` custom element, `IntersectionObserver` mount/unmount | **the model for the shader element** |
| `tools/capture.mjs` | 252 | headless capture of SVG figures → posters + print stills | not needed here |
| `tools/deploy.mjs` | 44 | guarded deploy (refuses dirty/unpushed), stamps the commit | keep |

Dependencies are nine npm packages, all build-time: `unified`,
`remark-parse`, `remark-directive`, `remark-math`, `remark-frontmatter`,
`mdast-util-to-string`, `unist-util-visit`, `mathjax`, `yaml`. Shiki makes
ten. Nothing ships to the browser except the runtime layer.

### Already supported, no work needed

`emit-html.js` handles heading, paragraph, text, emphasis, strong, link,
image, list, blockquote, code, inlineCode, math, inlineMath, break,
thematicBreak, ref, and container directives. The registry defines
theorem, lemma, proposition, corollary, definition, example, exercise,
remark, proof, sketch, plus chapter/section/subsection/figure/equation
crossref words. The 33 callouts map onto `remark` or a new registry entry —
adding an environment is one line there.

### On the LaTeX half

`emit-latex.js` + `aux-check.js` + the `latexmk` step are ~300 lines this
site does not use. **Do not remove them during the port.** Running
`--no-pdf` skips the compile and the aux check at zero risk, and deleting
them is surgery on `build.js`'s control flow for no gain while content is
still moving. Strip it later as its own change, if ever — both books are
due another rewrite anyway.

### Copy from elsewhere

| need | source |
|---|---|
| directive → custom element, poster, lazy mount | calc3 `compiler/figure-resolve.js` (`resolveDemo`), `emit-html.js` (`node.name === "demo"`), `demo-kit/runtime.js` |
| Shiki config, dual themes, emit-then-highlight | sjtSite `astro.config.mjs`, its `::sandbox` directive |
| architecture and conventions | calc3 `DESIGN.md`, `design/crossref.md`, `design/site-style-notes.md` |

Generalize calc3's demo mechanism into the shared compiler rather than
forking a second copy into this repo — two copies will drift, and both
books are due another rewrite anyway.

## Suggested order

1. Explicit slugs in `book.yml` (finding 3). Nothing else can be checked
   until URLs are expressible.
2. Shiki in the HTML emitter (finding 2). Verify against a real GLSL block
   in both themes before touching content.
3. A `shader` directive modelled on calc3's `demo` (finding 1), plus
   copying shader directories into `dist/`.
4. Mechanical content rewrite: 190 shortcodes, 33 callouts, front matter,
   `{.unnumbered}`, relative links, image paths. Scriptable.
5. Deploy: local build, `netlify deploy --prod --dir dist`. Retire
   `build.sh` and the remote build.

## Must not break

- **The sandbox itself.** No changes to the component or its editor.
- **Every published URL.** See finding 4.
- **`stats.json`.** Wired 2026-08-19, three files — `_site/stats.json`
  (aggregate) plus one per course — generated by `scripts/stats.mjs` from
  `build.sh`. See `design/book-stats.md`. Retiring `build.sh` means the
  stats step moves into the new build, and the output paths change from
  `_site/` to `dist/`. The counting rules in that document still apply, and
  `netlify.toml`'s five-minute `Cache-Control` on `/stats.json` and
  `/*/stats.json` must survive the move.

## Open decisions

- **Do the three courses stay three parts of one book, or does `main/`
  become the book with the two workshops as appendices?** Affects
  navigation and what the landing page is.
- **`chapters` in stats.** Today a CIRM day counts as three (Notes / Code /
  Homework), because the counter counts navigable pages. Post-port the
  structure is yours to choose; decide what a "chapter" should mean here
  before the number goes public.
- **Shaders on unlisted pages.** 15 of the 190 shortcodes live on pages not
  in any sidebar, so they are currently unpublished and uncounted. Decide
  whether they come along.
