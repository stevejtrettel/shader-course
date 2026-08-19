# Shader Workshop {.unnumbered}

Welcome to the Shader Workshop, given at [IHP](https://www.ihp.fr/) in Paris, February 2026.
This is a short introduction to shader programming as a tool for mathematical illustration and exploration, aimed at working mathematicians — especially geometers and topologists — who want to visualize things from their research but haven't encountered GPU programming before.
No prior experience with graphics or GPU computing is assumed.

We won't be learning computer graphics in any traditional sense.
We won't talk about game engines, 3D modeling software, or the OpenGL pipeline.
Instead, we'll focus on a single, specific tool — the *fragment shader*: a small program that runs once per pixel, receives the pixel's coordinates as input, and outputs a color.

The point of this workshop is not to teach you computer graphics — it's to give you the ability to quickly draw things that show up in your own research.
You have a surface defined by an equation, a tiling coming from a group action, a PDE you want to watch evolve — and you want to see it *now*.
We'll start with ideas, move to a little bit of syntax, and then spend most of our time with a collection of prewritten shaders that do things you might actually want to do — plotting level sets, raymarching implicit surfaces, domain coloring, visualizing hyperbolic geometry, simulating PDEs.


::shader{src="kummer-surface" layout="tabbed" width="80%" height="450px"}

For example: the Kummer surface above is a quartic in $\mathbb{R}^3$ with 16 ordinary double points — the maximum for a degree-4 surface.
The entire shader is a single function `f(x,y,z)` that evaluates the defining polynomial; everything else (the raymarching, lighting, coloring) is template code you don't need to touch.
Click the *Code* tab above to see it.


## Two Ways to Make Pictures

Every visualization task has the same basic setup: you have a mathematical object, and you want to turn it into a grid of colored pixels.
There are two fundamentally different approaches, and the distinction will be familiar — it's the difference between a pushforward and a pullback.


### The Pushforward: Meshes

The standard approach in computer graphics starts from a parameterization.
You have some domain — an interval, a rectangle, a triangulated region — and a map that sends it into the space where you want to draw.
You sample the domain, push the sample points forward through the map, and connect them up into geometry: line segments for curves, triangles for surfaces.

If you want to plot a parametric curve $\gamma\colon [0,1] \to \mathbb{R}^2$, you sample $t_0, t_1, \ldots, t_n$, compute $\gamma(t_i)$ for each one, and draw line segments between consecutive points.
A parametric surface works the same way, one dimension up: sample a grid in the parameter domain, push each point forward, connect neighbors into triangles.

In pseudocode the pattern is always:

```
for each sample point in the domain:
    compute its image under the map
    store the result as a vertex
connect neighboring vertices into line segments / triangles
```

This is the backbone of essentially all traditional computer graphics.
OpenGL, WebGL, game engines, 3D modeling software — nearly everything is built on pushing triangles through a pipeline.
And it's extremely natural when your object comes with a parameterization.
Want to draw a trefoil knot?
Just evaluate the parametric formula at a few hundred values of $t$ and connect the dots.
The hard part — finding a parameterization — is already done, and the computer work is trivial.


### The Pullback: Shaders

There's another approach that goes in the opposite direction.

Instead of starting in the domain and pushing forward, you start in the *image* — at the pixel grid — and pull back.
For each pixel on screen, you know its coordinates.
You use those coordinates to evaluate some function, check some condition, or run some computation, and the result tells you what color that pixel should be.

If you want to draw the unit disk, you don't parameterize the boundary and connect points.
Instead, for each pixel $(x,y)$, you compute $x^2 + y^2$ and check whether it's less than $1$.
If it is, color the pixel; if not, don't.

In pseudocode:

```
for each pixel (x, y) in the image:
    evaluate some function of (x, y)
    assign a color based on the result
```

This is what a *fragment shader* does.
It's a small program that runs once per pixel, receives the pixel's coordinates as input, and outputs a color.
That's it.
The entire programming model is: you write a function from coordinates to colors, and the GPU runs it at every pixel in the image, in parallel, every frame.


### The Same Object, Both Ways

To see the difference concretely, think about drawing a circle.

**Pushforward:** parameterize the circle as $(\cos\theta, \sin\theta)$, sample $\theta$ at (say) 64 evenly spaced values, connect consecutive samples with line segments.
This is simple to code and gives you a clean curve.
But you've made a choice about resolution — 64 segments — and if you zoom in you'll see the polygon.

**Pullback:** for each pixel $(x,y)$, compute the distance $\sqrt{x^2+y^2}$ to the origin and check whether it's close to $1$.
No sampling, no resolution parameter, no polygon.
The circle is as smooth as your pixel grid allows.
But now you have to think about what "close to $1$" means — you need to choose a thickness, handle antialiasing, and the notion of a one-dimensional curve living in a two-dimensional pixel grid becomes a real question.

Neither approach is better — they have different strengths, and a big part of developing intuition for shader programming is learning which objects and tasks are natural in each world.

Here is a rough guide:

**Pushforward is natural for:**

- **Parametric curves and surfaces** — you have the map, you just evaluate it. Doing this in a shader requires computing distances to the image of the parameterization, which ranges from annoying to impossible depending on the map.
- **Sparse objects** — a curve only occupies a thin strip of pixels. A mesh only computes where the curve actually is; a shader has to evaluate every pixel in the image regardless.
- **Numerical geometry problems where the unknown is an embedding** — finding a harmonic map, computing Willmore flow, solving Plateau's problem. The mesh *is* the domain, and the computation is a search for the right pushforward.

**Pullback is natural for:**

- **Implicit surfaces, level sets, anything defined by an equation** — you have $f(x,y,z) = 0$, and for each point you just evaluate $f$.
- **Scalar fields, coloring by function values** — the pixel knows its coordinates, you evaluate the function, you map the value to a color.
- **Tilings and quotient spaces** — identifying points under a group action is just modular arithmetic.
- **Fractals and iterated function systems** — per-pixel iteration is exactly the shader programming model.
- **PDE simulations, cellular automata** — anything that updates a grid of values.

All of this is powered by one structural advantage: every pixel is independent, so the GPU runs them all in parallel.
A couple of million pixels, each doing a hundred operations, sixty times a second — and you can chain multiple passes, each reading the previous pass as input, all still running in parallel.
That's how you get PDE solvers running live on a laptop.
