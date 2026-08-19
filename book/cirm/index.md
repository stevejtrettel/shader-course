# GPU-Accelerated Mathematical Illustration {.unnumbered}

This mini-course was taught at [CIRM](https://www.cirm-math.fr/) in Marseille, January 2026. It introduces shader programming as a tool for mathematical illustration and exploration.

Shaders are programs that run in parallel on the GPU, making them exceptionally fast for visualization tasks. We learn to write code that "reads like mathematics" using Shadertoy, a beginner-friendly web-based platform that handles all the low-level programming complexities.

We progress from 2D foundations (fractals, tilings, simulations) to 3D rendering via raymarching. Along the way, we implement classic examples like the Mandelbrot set, hyperbolic tessellations, the wave equation and implicit surface renderers.

No prior experience with shaders or GLSL is required—only a strong foundation in undergraduate mathematics and willingness to put in some time with code through daily homework exercises.

Here are three of the things we build over the week, running as you read.
Each one carries its own source: open the tab to see the whole program.

A Julia set, with the parameter under the mouse — drag it:

::shader{src="julia-explorer" layout="tabbed" height="420px"}

A hyperbolic tiling, built by reflecting one shape across its own edges:

::shader{src="hook-animated-tiling" layout="tabbed" height="420px"}

And the wave equation, solved on the pixel grid — it starts with one pulse,
and you can drag on it to make more:

::shader{src="wave-equation" layout="tabbed" height="420px"}
