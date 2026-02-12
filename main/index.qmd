# Shaders for Mathematical Illustration {.unnumbered}

This site collects notes and courses on **GPU shader programming** for mathematical visualization. The focus is on using shaders as a tool for illustrating mathematics — rendering fractals, implicit surfaces, tilings, and simulations — rather than on game development or visual effects.

Shaders are well-suited to this task: many mathematical objects are defined pointwise (color a pixel based on whether a sequence converges, or whether a point lies inside a set), and GPUs evaluate such functions across millions of pixels in parallel.

## What is a Shader? {.unnumbered}

A shader is a small program that runs on your graphics card (GPU), executing simultaneously for every pixel on screen. Where a traditional program might loop through pixels one at a time, a shader computes millions of pixels in parallel — making it possible to render complex mathematical objects in real-time.

The core idea is simple: you write a function that takes a pixel's coordinates as input and returns a color as output. That's it. But from this simple foundation emerges extraordinary power. By encoding mathematical formulas into this pixel-by-pixel computation, we can visualize:

- **Complex dynamics** — Julia sets, Mandelbrot sets, Newton fractals
- **Implicit surfaces** — algebraic varieties, isosurfaces, signed distance fields
- **Geometric patterns** — tilings, symmetry groups, hyperbolic geometry
- **Physical simulations** — wave equations, fluid dynamics, reaction-diffusion systems

## Examples {.unnumbered}

Here are a few examples of what's possible with shader programming for mathematical illustration.

### Mandelbrot and Julia Sets {.unnumbered}

<!-- TODO: Add interactive Mandelbrot/Julia explorer embed here -->

The Mandelbrot set emerges from iterating the simple map $z \mapsto z^2 + c$ on complex numbers. Each pixel represents a value of $c$, colored by how quickly the iteration escapes to infinity. Zooming reveals infinite self-similar structure at every scale — all computed in real-time on the GPU.

### Algebraic Surfaces {.unnumbered}

<!-- TODO: Add algebraic surface (cubic/Cayley) embed here -->

Algebraic surfaces defined by polynomial equations like $x^3 + y^3 + z^3 + 1 = (x + y + z + 1)^3$ can be rendered using ray marching techniques. The GPU traces rays from the camera and finds intersections with the implicit surface, revealing the intricate geometry of these mathematical objects.

### Reaction-Diffusion Patterns {.unnumbered}

<!-- TODO: Add reaction-diffusion simulation embed here -->

The Gray-Scott reaction-diffusion system produces mesmerizing patterns from simple rules: two chemicals that diffuse at different rates while undergoing a reaction. These Turing patterns — spots, stripes, and labyrinthine structures — emerge spontaneously from the mathematics, simulated in real-time on the GPU.

---

## Courses and Notes {.unnumbered}

This site collects tutorials and notes on shader programming, as well as materials from courses I have taught — including lecture notes, code, and exercises.

- [**CIRM 2026**](/cirm-2026/) — GPU-Accelerated Mathematical Illustration, a mini-course taught at CIRM in Marseille

---

## Getting Started {.unnumbered}

There are two main ways to start writing shaders: using an online platform, or working locally on your own machine.

### Option 1: Shadertoy (Online) {.unnumbered}

[Shadertoy](https://www.shadertoy.com) is a popular online platform for writing and sharing shaders. It's the fastest way to get started — no installation required.

1. Go to [shadertoy.com](https://www.shadertoy.com) and create a free account
2. Click "New" to create a new shader
3. Start coding in the editor — your shader runs immediately in the browser
4. Browse thousands of existing shaders for inspiration and learning

Shadertoy provides built-in uniforms like `iTime` (elapsed time), `iResolution` (screen size), and `iMouse` (mouse position) that you can use in your shaders. It also supports multi-pass rendering with buffers for simulations and post-processing.

**Pros:** No setup, instant feedback, huge community, easy sharing
**Cons:** Requires internet, limited customization, no local file access

### Option 2: Local Development with Shader Sandbox {.unnumbered}

For more control and offline work, you can use the [`shader-sandbox`](https://www.npmjs.com/package/shader-sandbox) npm package. This provides a Shadertoy-compatible development environment that runs locally on your machine.

**Prerequisites:** [Node.js](https://nodejs.org) (version 18 or later)

**Quick start:**

```bash
# Create a new shader project
npx shader-sandbox@latest create my-shaders
cd my-shaders

# Create and run a new shader
npx shader new my-shader
npx shader dev my-shader
```

Or install globally to skip the `npx` prefix:

```bash
npm install -g shader-sandbox
shader create my-shaders
cd my-shaders
shader new my-shader
shader dev my-shader
```

This launches a development server with live reloading — edit your shader file and see changes instantly.

**Features beyond Shadertoy:**

- **Custom uniforms** — define your own parameters with UI controls (sliders, color pickers, toggles)
- **Named buffers** — organize multi-pass shaders with meaningful names instead of just BufferA-D
- **Texture loading** — easily load images, video, webcam, and audio as shader inputs
- **JavaScript scripting** — run per-frame computations on the CPU and pass data to shaders
- **Export** — build standalone HTML files or record video output

**Pros:** Works offline, full customization, file-based workflow, export capabilities
**Cons:** Requires Node.js installation, command-line familiarity

---

Both approaches use the same GLSL shader language and compatible uniforms, so skills transfer between them. Start with Shadertoy for quick experiments, and move to local development when you need more control.
