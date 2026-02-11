# Shader Course Website

Source for [shaders.stevejtrettel.site](https://shaders.stevejtrettel.site).

## Structure

```
shader-course/
├── main/                    # Main landing page + future living notes
│   ├── _quarto.yml          # Quarto config for main site
│   ├── index.qmd            # Landing page with links to courses
│   └── styles/              # Site styles
│
├── cirm/                    # CIRM 2025 course (self-contained)
│   ├── _quarto.yml          # Quarto config for this course
│   ├── index.qmd            # Course overview
│   ├── lectures/            # Day 1-5 notes, code, homework
│   ├── appendices/          # GLSL reference, coordinates, etc.
│   ├── demos/               # Interactive shader demos
│   ├── images/              # Course images
│   ├── _extensions/         # Quarto extensions (shader-demo, etc.)
│   └── styles/              # Site styles
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
# One-time setup
npm install

# Work on CIRM course
cd cirm && quarto preview

# Work on main site
cd main && quarto preview
```

### Shader Build Pipeline

Shader demos are compiled from `*.glsl` files into per-demo `embed.js` files using
`@stevejtrettel/shader-sandbox`.

- Quarto runs this automatically via `project.pre-render` in both `main/_quarto.yml`
  and `cirm/_quarto.yml`.
- Manual build commands:
  - `npm run shaders:build:cirm`
  - `npm run shaders:build:main`
  - `npm run shaders:build`

The build script scans each project's `demos/` tree and compiles any folder
containing `image.glsl`.

If your local `shader-sandbox` CLI uses a different command shape, set:

```bash
SHADER_SANDBOX_BUILD_CMD="npx @stevejtrettel/shader-sandbox build {demoDir} --name {demoName} --output {outFile}"
```

Supported placeholders are `{demoDir}`, `{demoName}`, and `{outFile}`.

## Build Process

The `build.sh` script:

1. Builds `main/` with `quarto render`
2. Builds `cirm/` with `quarto render`
3. Combines outputs into root `_site/`:
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
- Each course has its own `styles/` — can customize per course if needed
- The root `README.md` is not rendered (only files in `main/` and `cirm/` are)
