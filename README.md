# Shader Course Website

Source for [shaders.stevejtrettel.site](https://shaders.stevejtrettel.site).

## Structure

```
shader-course/
├── main/                    # Main landing page + future living notes
│   ├── _quarto.yml          # Quarto config for main site
│   ├── index.qmd            # Landing page with links to courses
│   └── styles/              # (populated by build.sh from _shared)
│
├── cirm/                    # CIRM 2025 course (self-contained)
│   ├── _quarto.yml          # Quarto config for this course
│   ├── index.qmd            # Course overview
│   ├── lectures/            # Day 1-5 notes, code, homework
│   ├── appendices/          # GLSL reference, coordinates, etc.
│   ├── demos/               # Interactive shader demos
│   ├── images/              # Course images
│   ├── _extensions/         # Quarto extensions (shader-demo, etc.)
│   └── styles/              # (populated by build.sh from _shared)
│
├── _shared/
│   └── styles/
│       └── website.scss     # Shared styles copied to each project
│
├── build.sh                 # Build script (see below)
├── netlify.toml             # Netlify deployment config
└── README.md                # This file
```

## URLs

- `/` → Main landing page (from `main/`)
- `/cirm/` → CIRM 2025 course (from `cirm/`)

## Local Development

Each project is independent. Preview whichever you're working on:

```bash
# Work on CIRM course
cd cirm && quarto preview

# Work on main site
cd main && quarto preview
```

## Build Process

The `build.sh` script:

1. Copies shared styles from `_shared/styles/` into each project
2. Builds `main/` with `quarto render`
3. Builds `cirm/` with `quarto render`
4. Combines outputs into root `_site/`:
   - `main/_site/*` → `_site/`
   - `cirm/_site/` → `_site/cirm/`

Run locally with:

```bash
./build.sh
```

## Deployment

Netlify runs `build.sh` on every push and publishes `_site/`.

The `@quarto/netlify-plugin-quarto` plugin installs Quarto on the build server.

## Adding a New Course

1. Copy an existing course folder:
   ```bash
   cp -r cirm mit-2026
   ```

2. Edit `mit-2026/_quarto.yml` to update title, navbar, etc.

3. Add to `build.sh`:
   ```bash
   # In the "Copying shared styles" section:
   cp _shared/styles/* mit-2026/styles/

   # Add a build step:
   echo "=== Building MIT 2026 course ==="
   cd mit-2026 && quarto render && cd ..

   # In the "Combining outputs" section:
   cp -r mit-2026/_site _site/mit-2026
   ```

4. Add link in `main/_quarto.yml` sidebar or `main/index.qmd`.

## Notes

- Each course has its own `_extensions/` — they may diverge over time
- Each course has its own `appendices/` — content may be customized per course
- Styles are shared via `_shared/` to keep consistent theming
- The root `README.md` is not rendered (only files in `main/` and `cirm/` are)
