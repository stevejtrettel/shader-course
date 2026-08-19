# Dynamics

The previous sections visualize *static* objects — a function's values, a surface's shape, a field's contours.
This section turns to systems that evolve in time.

A dynamical system is a rule for moving points around.
The rule might be continuous (a vector field defining a flow) or discrete (an iterated map).
It might be integrable or chaotic, finite-dimensional or a PDE on a function space.
In every case, the fundamental questions are about long-time behavior: where do orbits go, what structures organize the phase space, and how does the answer depend on initial conditions?

Shaders are particularly well suited to this last question.
"How does the answer depend on initial conditions?" is a per-pixel computation — each pixel represents a different starting point, and the GPU evaluates all of them in parallel.
For simulations that evolve in time, Shadertoy's multi-pass buffers provide the state persistence: one buffer stores the current field, reads its own previous frame, computes one timestep, and writes the result.

We cover five families: vector fields, complex iteration, cellular automata, PDEs, and billiards.

### Vector Fields

A vector field $V\colon \mathbb{R}^2 \to \mathbb{R}^2$ assigns a vector to each point in the plane.
The graph lives in $\mathbb{R}^4$ — the same dimensionality problem as complex functions — so again we need to encode the output as color or geometry.

The pullback perspective still works: given a way to encode a single vector as a color, we can visualize any vector field by pulling that encoding back through $V$.
But vector fields also have *dynamics* — they define a flow — and this is something neither scalar functions nor complex functions possess.
So alongside the pointwise color encoding we'll want tools that show the trajectories of that flow.

We'll build three complementary views.
The first is *pointwise*: at each pixel, evaluate $V$ and encode direction and magnitude as color.
The second is *geometric*: draw actual arrows on a grid.
The third is *dynamic*: animate particles along the flow.
No single view is complete on its own — the pointwise view shows singularities and index, the arrows show local direction, and the streamlines show where things actually go — so it's worth having all three.


#### Version 1: Direction and Magnitude Coloring

The simplest approach: map the angle of $V(p)$ to hue (reusing our `rainbow` colormap) and the magnitude to brightness.
This is literally domain coloring applied to a real vector field instead of a complex function.
The code is nearly identical — `atan(v.y, v.x)` gives the angle, which maps to a rainbow phase, and the magnitude modulates brightness.

Singularities — points where $V = 0$ — show up as dark points where all colors converge, exactly like zeros in domain coloring.
The index of a singularity is visible in how the colors wind around it: a source or sink has index $+1$ (all hues appear once in a loop around the singularity), a saddle has index $-1$ (some hues appear three times).
This is the Poincaré–Hopf theorem made visible.

The only subtlety is normalizing brightness.
If $|V|$ varies over orders of magnitude, a linear brightness map will be mostly black or mostly white.
We use $|V| / (1 + |V|)$ — a sigmoid that compresses the range to $[0, 1]$ without ever saturating.
Near a singularity the brightness goes to zero smoothly; far away it approaches 1.
This is one of the places where choosing the right transfer function matters more than choosing the right colormap.

Try the default field and locate the singularities — you should see one source, one sink, and one saddle.
Then replace `V` with your own: a linear field like `vec2(y, -x)` (rotation), a gradient field like `vec2(2.0*uv.x, 2.0*uv.y)`, or something with a higher-order zero like `vec2(uv.x*uv.x - uv.y*uv.y, 2.0*uv.x*uv.y)`.

::shader{src="vector-field-color" layout="tabbed"}


#### Version 2: Arrow Grid

The textbook picture: tile the screen into a grid of cells, evaluate $V$ at each cell center, and draw an arrow pointing in that direction with length proportional to $|V|$.

On a CPU you'd do this with a loop: for each cell, draw an arrow.
In a shader there are no loops over geometry — every pixel runs the same code independently.
So the question becomes: how does a single pixel know whether it's inside an arrow?

The answer is **signed distance functions** (SDFs).
A signed distance function $d(p)$ returns the distance from a point $p$ to the nearest boundary of a shape, with a sign convention: negative inside, positive outside.
Given an SDF, drawing a shape is just a threshold test: if $d(p) < 0$, color the pixel.
Antialiasing comes from `smoothstep` across a pixel-width band around $d = 0$.

The arrow is built from two SDF primitives:

- **Shaft**: the signed distance to a line segment (from tail to the base of the head), thickened by subtracting a half-width. Geometrically this is a rectangle aligned with the arrow direction.
- **Head**: the signed distance to a triangle (the arrowhead), computed by finding the closest point on each of the three edges and checking which side of the boundary we're on.

The union of two SDFs is just `min(d1, d2)` — a pixel is inside the arrow if it's inside *either* piece.

**The grid trick.** Each pixel computes which cell it belongs to via `floor(uv / cellSize)`, finds that cell's center, and evaluates $V$ there.
Then it works in *local coordinates* relative to the cell center.
This means every pixel only ever thinks about one arrow — the one in its own cell — so there's no need to loop over all arrows.
This is the same tiling idea that appears in any shader that draws a repeating pattern: reduce to a fundamental domain, do your geometry there.

The arrow length is scaled by a sigmoid $|V|/(1 + |V|)$ so that arrows always fit inside their cell regardless of how large $|V|$ gets.
At zero, the arrow vanishes; at moderate values it's nearly proportional; at large values it saturates at the cell size.

Try the same vector fields from the color version and compare what you can read off from each.
You can also adjust `CELL_SIZE` to trade arrow density against legibility.

::shader{src="vector-field-arrows" layout="tabbed"}


#### Version 3: Animated Streamlines

A streamline is a curve $\gamma$ satisfying $\dot\gamma(t) = V(\gamma(t))$ — the integral curve of the vector field.
Drawing streamlines is the gold standard for visualizing flow, but it's inherently nonlocal: a streamline is a curve, and a shader only knows about one pixel.

The single-pass ideas we might try all have problems.
Integrating from each pixel and coloring by arc length produces a smooth scalar field whose level sets cut *across* streamlines, not along them.
Advecting a texture by reading upstream each frame produces noise rather than clean curves.

The solution is a **particle system stored in a framebuffer**.
This is our first shader that uses Shadertoy's multi-pass buffers, and the idea is beautifully simple.

**Buffer A is the particle array.**
Every pixel in Buffer A stores one particle's position (in the `.rg` channels).
On the first frame, particles are scattered randomly across the screen.
On each subsequent frame, every pixel reads its own previous position from Buffer A, evaluates $V$ at that position, and takes a small step along the velocity — exactly Euler integration of the ODE, one step per frame.
If a particle leaves the screen, it respawns at a new random position.

The key insight: the framebuffer *is* the particle state.
Each pixel's red and green channels are the $x$ and $y$ coordinates of its particle, persisted across frames by reading from the buffer's own previous contents.
This is a feedback loop: Buffer A reads from itself.

**Buffer B draws the particles and accumulates trails.**
For each pixel on screen, Buffer B loops over the particles (reading their positions from Buffer A) and checks whether any particle is close enough to draw.
This is a brute-force approach — each pixel tests against `NUMBER` particles — but GPUs are fast at exactly this kind of parallel work.

The trail effect comes from compositing with Buffer B's own previous frame: `max(current, previous * TRAIL_DECAY)`.
Each frame, the old trails dim slightly, and new bright dots appear at the current particle positions.
The result: particles leave fading streaks behind them as they flow, producing animated streamlines.

The `MIX_FACTOR` parameter (e.g. 0.99) controls trail length: closer to 1 means longer trails.
`NUMBER` controls how many particles are visible (more = denser coverage, but the loop in Buffer B gets more expensive).
`VEL_FACTOR` controls the step size — since we normalize velocity direction, all particles move at the same screen speed regardless of $|V|$, which keeps the visualization evenly readable.

Try a field with a limit cycle, like `vec2(uv.y + uv.x*(1.0 - dot(uv,uv)), -uv.x + uv.y*(1.0 - dot(uv,uv)))`, and watch the particles spiral inward.

::shader{src="vector-field-streamlines" layout="tabbed"}

#### Comparing the three views

These three shaders are worth running side by side on the same vector field, because each reveals different structure.

The **color view** is the most information-dense: every pixel encodes both direction and magnitude, so you can see the full local structure everywhere at once.
It's particularly good for locating and classifying singularities — the winding pattern of hues tells you the index without any computation.
But it's abstract: it takes practice to read, and it says nothing about where things actually go.

The **arrow grid** is the most immediately legible.
It looks like a textbook figure, and anyone can read it: arrows point in the direction of the field, and longer arrows mean stronger flow.
But the discrete sampling hides structure between grid points, and you can't trace trajectories by eye beyond a cell or two.

The **animated streamlines** show dynamics directly — you watch particles flow, accumulate in attractors, and separate along unstable manifolds.
The trade-off is that the visualization has state (it depends on its own history), requires multiple buffers, and takes a few seconds to develop its trail pattern.

Together, the three views illustrate a general principle: there is no single best visualization for a mathematical object.
Each encoding reveals some structure and hides other structure.
The art is choosing the right encoding for the question you're trying to answer — or better, building a tool that lets you switch between them.


### Complex Dynamics

Vector fields define continuous dynamics — a flow parameterized by real time.
*Complex iteration* is the discrete counterpart: apply a holomorphic map $f\colon \mathbb{C} \to \mathbb{C}$ repeatedly and ask what happens to the orbit $z, f(z), f(f(z)), \ldots$

This is perhaps the most natural shader computation of all: iterate a formula at every pixel and color by the result.
The simplest nontrivial family is $f_c(z) = z^2 + c$, one quadratic map for each parameter $c \in \mathbb{C}$.
The dynamics of this single family is already extraordinarily rich — it contains the Mandelbrot set, Julia sets, and a century of open problems.


#### The Mandelbrot Set

The Mandelbrot set is the set of parameters $c$ for which the orbit of $0$ under $f_c$ stays bounded:
$$M = \{ c \in \mathbb{C} : f_c^n(0) \not\to \infty \}$$

This is a per-pixel computation: each pixel is a value of $c$, and we iterate the map to see whether the orbit escapes.
The core loop is exactly what you'd write on paper — complex squaring is two lines of real arithmetic:

```glsl
vec2 z = vec2(0.0);
for (int i = 0; i < MAX_ITER; i++) {
    z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
    if (dot(z, z) > 256.0) break;
}
```

Points where the orbit stays bounded (reaches `MAX_ITER` without escaping) are in $M$ and colored black.
Points outside are colored by *how quickly* they escape.
The naive approach — color by the integer iteration count $i$ — produces visible banding.
The smooth coloring formula $i - \log_2(\log_2 |z|^2)$ interpolates between integer escape times, producing continuous color gradients that reveal the fractal structure cleanly.

The color palette itself is a cosine-based palette (a technique due to Inigo Quilez): three cosines with different frequencies and phases produce a smooth, non-repeating color cycle.
You can swap in any palette you like — the only requirement is that it varies enough to make the level sets of escape time visible.

::shader{src="mandelbrot" layout="tabbed"}


#### Julia Sets

The Mandelbrot set asks: for which $c$ does the orbit of $0$ stay bounded?
A Julia set asks the complementary question: fix $c$ and let $z$ vary.
The *filled Julia set* $K_c$ is the set of starting points whose orbit under $f_c$ stays bounded.

The shader code is identical — the only difference is what plays the role of the pixel coordinate:

```glsl
// z starts at the pixel; c is fixed (from the mouse)
vec2 z = uv * 1.5;
for (int i = 0; i < MAX_ITER; i++) {
    z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
    if (dot(z, z) > 256.0) break;
}
```

The deep connection between the two: $c \in M$ if and only if $K_c$ is connected.
The Mandelbrot set is a *catalog* of Julia sets — each point $c \in M$ indexes a connected Julia set, and points $c \notin M$ give disconnected, Cantor-like Julia sets.

Click and drag to change $c$ and watch this happen in real time.
Near the center of $M$, the Julia set is a slightly deformed circle.
Along the boundary of $M$, the Julia set develops elaborate filaments.
Step outside $M$, and the Julia set shatters into dust.

::shader{src="julia" layout="tabbed"}


#### Newton's Method

Newton's method for finding roots of $f(z) = 0$ is the iteration $z \mapsto z - f(z)/f'(z)$.
For a polynomial with $n$ roots, each starting point converges to one of them, and the plane partitions into **basins of attraction** — one basin per root.

The surprise: the boundaries between basins are fractal.
A point on the boundary never converges; it wanders chaotically between roots.
And for polynomials of degree $\geq 3$, the basins are always interleaved: no matter how close two basins appear to share a smooth boundary, the third basin is wedged between them.
This is a consequence of Montel's theorem — the same normal-families machinery that underlies the Mandelbrot and Julia sets.

The shader iterates Newton's method at each pixel and colors by the angle of the root it converges to.
Darker regions took more iterations to settle — these trace out the fractal basin boundaries.

```glsl
vec2 f(vec2 z) {
    // z³ - 1  (three roots: cube roots of unity)
    return cmul(z, cmul(z, z)) - vec2(1.0, 0.0);
}

vec2 df(vec2 z) {
    // 3z²
    return 3.0 * cmul(z, z);
}
```

Try switching to $z^4 - 1$ (four-fold symmetry), $z^5 - 1$ (five-fold), or $z^3 - 2z + 2$ (asymmetric roots) — the commented alternatives are in the shader.

::shader{src="newton-fractal" layout="tabbed"}


#### Magnetic Pendulum

Fractal basins of attraction aren't specific to complex iteration — they appear whenever a dissipative system has multiple attractors.
Here's a physical example: a pendulum bob swinging above a plane of magnets.

Three forces act on the bob at position $\mathbf{x}$: a gravitational restoring force $-g\,\mathbf{x}$ pulling it back toward center, friction $-\gamma \dot{\mathbf{x}}$ damping the motion, and magnetic attraction from each magnet $\mathbf{m}_i$.
The full ODE is
$$\ddot{\mathbf{x}} = -\gamma \dot{\mathbf{x}} - g\, \mathbf{x} + \sum_i \frac{\mu\,(\mathbf{m}_i - \mathbf{x})}{(|\mathbf{m}_i - \mathbf{x}|^2 + h^2)^{3/2}}$$
where the height $h$ in the denominator prevents the force from blowing up when the bob passes directly over a magnet.

This is a second-order ODE, so the state is position *and* velocity — four numbers per pixel.
We integrate it with symplectic Euler, the same scheme used in the wave equation:

```glsl
// Acceleration: gravity + friction + magnetic forces
vec2 acc = -FRICTION * vel - GRAVITY * pos;
for (int j = 0; j < N_MAGNETS; j++) {
    vec2 d = magnetPos(j) - pos;
    float r = sqrt(dot(d, d) + HEIGHT * HEIGHT);
    acc += STRENGTH * d / (r * r * r);
}

// Symplectic Euler: update velocity, then position
vel += DT * acc;
pos += DT * vel;
```

Each pixel runs this loop independently — 2000 steps of the ODE, 40 seconds of simulated time — starting from rest at that pixel's position.
The coloring uses **path length**: the total distance the pendulum travels before settling.
Points deep inside a basin settle quickly (short path, bright).
Points near a basin boundary swing back and forth between magnets before committing (long path, dark).
The fractal boundary is exactly the set of initial conditions where the pendulum takes the longest to decide.

Try lowering `FRICTION`: the basins become more intricate as the pendulum has more time to wander.
Changing `N_MAGNETS` to 4 or 5 gives different symmetries.

::shader{src="magnetic-pendulum" layout="tabbed"}


### Cellular Automata

We now shift from continuous to discrete.
Cellular automata sit at the opposite extreme from everything above — discrete time, discrete space, discrete state — and yet they produce dynamics every bit as rich.

A cellular automaton is a grid of cells, each in one of finitely many states, updated simultaneously according to a local rule: the next state of a cell depends only on its current state and the states of its neighbors.
This may be the most natural computation a shader can do.
The grid *is* the pixel grid; the state is stored in a framebuffer; each pixel reads its neighbors, applies the rule, and writes its new state.
The framebuffer feeds back into itself — Buffer A at frame $n+1$ reads Buffer A at frame $n$ — and the automaton runs.

No integration, no floating-point arithmetic, no stability analysis — just a lookup table applied in parallel.


#### Game of Life

Conway's Game of Life is the most famous cellular automaton: cells are alive (1) or dead (0), and the update rule is:

- A live cell with 2 or 3 live neighbors survives; otherwise it dies.
- A dead cell with exactly 3 live neighbors becomes alive.

That's it.
From this two-line rule, initialized with random noise, you get gliders, oscillators, still lifes, and — if you're patient — universal computation.

The shader is short enough to read in one sitting.
Buffer A stores the grid: each pixel's red channel is 0 or 1.
On frame 0 it initializes randomly (a hash function thresholded at 0.5).
On every subsequent frame, each pixel reads the eight neighbors via `texelFetch`, sums them up, and applies the rule.
The Image tab just reads Buffer A and displays it.

The entire update rule lives in a single function at the top of Buffer A:

```glsl
float rule(float self, float neighbors) {
    // Conway's Game of Life (B3/S23):
    if (self == 1.0) {
        return (neighbors == 2.0 || neighbors == 3.0) ? 1.0 : 0.0;
    } else {
        return (neighbors == 3.0) ? 1.0 : 0.0;
    }
}
```

This is the only thing you need to change to get a completely different automaton.
The notation **B3/S23** means "birth on 3 neighbors, survival on 2 or 3" — it's the standard shorthand for [totalistic rules](https://en.wikipedia.org/wiki/Life-like_cellular_automaton).
Replace the body of `rule` with any of the following and watch what happens:

- **HighLife (B36/S23)** — same as Life, but also births on 6 neighbors. Contains a small *replicator*: a pattern that copies itself.
- **Seeds (B2/S)** — no cell ever survives; birth on exactly 2. Produces explosive, chaotic growth from any initial condition.
- **Day & Night (B3678/S34678)** — symmetric between live and dead states (the complement of any pattern evolves the same way). Produces large stable regions.
- **Diamoeba (B35678/S5678)** — grows into amoeba-like blobs with smooth, shifting boundaries.

There's no visualization cleverness here — no colormaps, no antialiasing, no SDFs.
The entire shader is a handful of integer comparisons.
But this is the right way to appreciate what multi-pass feedback gives you: a trivial per-pixel rule, iterated, produces emergent complexity.
The GPU is doing nothing fancy; it's the mathematics of the rule that does the work.

::shader{src="game-of-life" layout="tabbed"}


### PDEs

Cellular automata update a discrete grid with a discrete rule.
The continuous analog is a PDE: a field $u(x, t)$ evolving according to a differential equation that couples each point to its neighbors through spatial derivatives.

On a pixel grid, the connection between the two is almost literal.
A discrete Laplacian at pixel $p$ is just the sum of the four neighbors minus four times the center:
$$\Delta u \approx u_{i+1,j} + u_{i-1,j} + u_{i,j+1} + u_{i,j-1} - 4u_{i,j}$$

This is the same stencil as the Game of Life's neighbor sum — just with different arithmetic on top.
The buffer feedback pattern is identical too: Buffer A stores the field, reads its own previous frame, computes one timestep, and writes the result.
The Image tab reads Buffer A and maps values to colors.

The difference from cellular automata is that the state is now continuous (floating-point values in the framebuffer channels) and the update rule involves real arithmetic — additions, multiplications, a timestep parameter $\Delta t$.
This means we have to think about stability: if $\Delta t$ is too large relative to the grid spacing, the numerical scheme blows up.
But within the stable regime, the GPU gives you a live PDE solver at interactive framerates, for free.


#### The Heat Equation

The heat equation $u_t = \kappa \Delta u$ is the simplest PDE you can write down: each point moves toward the average of its neighbors.
The result is diffusion — any initial temperature distribution smooths out, fine structure is erased, and everything relaxes toward the mean.

The shader has a single field $u$ (temperature) stored in the red channel of Buffer A.
The update is one line of forward Euler:

```glsl
// The PDE: heat equation  u_t = κ Δu
// Forward Euler — just one field, no velocity
float newU = u + dt * kappa * laplacian;
```

Click and drag to inject heat.
Watch it spread and fade — the Gaussian pulse you inject broadens and dims, exactly as the heat kernel predicts.
The colormap runs from black (cold) through red and yellow to white (hot).
The simulation is stable as long as $\Delta t \cdot \kappa < 0.25$ (the CFL condition for the 2D stencil).

Try injecting heat in several spots and watching the profiles merge.
You can also increase `kappa` past the stability threshold to see what a blow-up looks like — the field develops a checkerboard instability within a few frames.

::shader{src="heat-equation" layout="tabbed"}


#### The Wave Equation

The wave equation $u_{tt} = c^2 \Delta u$ is fundamentally different: it's conservative, not dissipative.
Disturbances don't fade — they propagate at finite speed, reflect off boundaries, and interfere.

The key difference from the heat equation is that we now need *two* fields: the displacement $u$ and its velocity $v = u_t$, stored in the red and green channels of Buffer A.
The update is two lines instead of one:

```glsl
// Symplectic Euler — update velocity first, then position with the *new* velocity
float newV = v + dt * c * c * laplacian;
float newU = u + dt * newV;
```

The order matters.
Updating velocity first and then using the *new* velocity to update position is the symplectic (semi-implicit) Euler method.
It preserves the Hamiltonian structure of the wave equation, which means energy doesn't drift — the simulation stays stable over thousands of frames without blowing up or damping out.

The domain is defined by an `inDomain` function in the Common tab — pixels outside the domain are forced to zero each frame, giving **Dirichlet boundary conditions**.
Waves reflect off this boundary, and the shape determines the reflection pattern:

```glsl
bool inDomain(vec2 uv) {
    // Circle
    return length(uv) < 0.9;
}
```

Try switching to a square, or to the Mandelbrot set — the commented alternatives are in the Common tab.
Click and drag to inject pulses.
The colormap is diverging: orange for positive displacement, blue for negative, black at zero.

Compare with the heat equation: a pulse here propagates outward as a ring and bounces forever.
The same pulse in the heat equation spreads and disappears.
This is the distinction between hyperbolic and parabolic PDEs, made visceral.

::shader{src="wave-interactive" layout="tabbed"}


#### Wave Refraction

The wave equation with a *spatially varying* speed, $u_{tt} = c(x)^2 \Delta u$, models propagation through an inhomogeneous medium — and gives you refraction for free.

The only change from the previous shader: replace the constant `c` with a function `speed(uv)` that returns the local wave speed at each pixel:

```glsl
float speed(vec2 uv) {
    // Circular lens: slower inside → converging lens
    return length(uv) < 0.3 ? 0.5 : 1.0;
}
```

When a wavefront crosses the boundary between regions with different speeds, it bends — this is Snell's law, and it's not imposed by the shader; it falls out of the PDE automatically.
The ratio of speeds determines the angle of refraction, and if the speed change is abrupt, you also get partial reflection at the interface.

The default is a circular lens in the center with half the wave speed — visible as a blue disk.
Click to one side and watch the wavefront curve as it passes through — it focuses on the far side, exactly like light through glass.
Try the commented alternatives: a half-plane gives refraction across a flat interface, and a gradient index bends waves continuously without any sharp boundary.

::shader{src="wave-refraction" layout="tabbed"}


### Billiards

We close with one of the simplest dynamical systems to define: a point moves in a straight line inside a region and reflects off the boundary according to the law of reflection (angle of incidence equals angle of reflection).
Despite this simplicity, billiard dynamics is extraordinarily rich — the shape of the table determines everything, and even basic questions (is a given trajectory periodic? does it visit every part of the table?) can be deep.

For a convex polygon with vertex angles that are rational multiples of $\pi$, every trajectory is either periodic or uniformly distributed — this is a theorem of Veech.
For irrational angles, the situation is wide open: whether every trajectory in an obtuse triangle is periodic remains unknown.

This shader is a good example of something that is *not* a natural fit for the pullback approach — and works anyway.
A billiard trajectory is a single curve: one initial condition, one sequence of reflections.
There's nothing per-pixel about it.
But the shader computes the entire trajectory independently at every pixel, then measures the distance from that pixel to every segment, just to decide whether to light up.
Every pixel does the same 200-bounce ray trace and throws away almost all of it.
This is absurdly wasteful — a CPU drawing the same trajectory with line segments would be essentially free.

But two million redundant copies of a 200-step loop, running in parallel, still finishes in a couple of milliseconds.
The result is a clean, anti-aliased, glowing trajectory with no line-drawing library, no graphics pipeline, no state management — just a distance function and `smoothstep`.

Use the mouse to control the trajectory: horizontal position sets the launch angle, vertical position moves the starting point along the first edge.
Try the different table shapes — the rectangle gives familiar periodic orbits, the pentagon fills out quasiperiodic patterns, and the L-shaped room (non-convex!) produces chaotic-looking trajectories.
You can also turn on a central circular scatterer with `SHOW_SCATTERER` to get a Sinai-billiard-like system.

::shader{src="billiards" layout="tabbed"}


#### Phase portrait

The trajectory shader draws one orbit.
But billiards has a natural *per-pixel* question too: the **phase portrait**.

The phase space of a billiard in a convex curve is the cylinder $(t, \theta)$, where $t$ parameterizes position on the boundary and $\theta \in (0, \pi)$ is the outgoing angle measured from the tangent.
Each point in this cylinder is a different initial condition — a different starting position and launch angle — and the billiard map $T\colon (t, \theta) \mapsto (t', \theta')$ sends one bounce to the next.

This shader shows both views side by side.
The **left panel** is the phase portrait: each pixel represents an initial condition $(t, \theta)$, and the color encodes the orbit's dynamics.
The **right panel** shows the ellipse table itself — click in the left panel to select an orbit, and the corresponding trajectory appears in red on the right, with the orbit's iterates plotted as red dots in phase space on the left.

The coloring uses a **Poincaré section**.
Each orbit is iterated forward until it crosses a fixed section of the boundary (near $t = \pi$, the left end of the ellipse).
The angle $\theta$ at this return is discretized into bins, and each bin gets a distinct color.
Alternating bins are left black, which makes individual invariant curves stand out as separate colored bands rather than blurring into a gradient.
Orbits that never reach the section within the iteration limit appear black.

The default table is an ellipse with semi-axis ratio $A = 0.7$: the boundary curve is $(A\cos t, \sin t)$.
Billiards in an ellipse is completely integrable — a classical result going back to Jacobi.
Every orbit is tangent to a confocal conic (either a confocal ellipse or a confocal hyperbola), and this conserved quantity foliates the phase space into smooth invariant curves, visible as clean color bands in the left panel.

Try changing `A`: at $A = 1$ the table is a circle and the phase portrait is trivially foliated by horizontal lines ($\theta$ is itself a conserved quantity — every orbit hits the boundary at the same angle).
As $A$ decreases toward 0 the ellipse gets more eccentric and the invariant curves deform, but they persist — the system remains integrable for any ellipse.

::shader{src="billiard-phase" layout="tabbed"}

:::tip
## Credit
This shader was written by [Lael Costa](https://lael.dev) (Penn State), a graduate student at the IHP trimester program.
:::


### Outer Billiards

Where ordinary billiards studies trajectories *inside* a convex table, outer billiards acts on the *exterior*.
Given a point $p$ outside a convex polygon, find the vertex $v$ such that $p$ lies in the "forward cone" of $v$ — the region between the extensions of the two edges meeting at $v$ — and map $p$ to its reflection $2v - p$ through that vertex.
This is the **outer billiard map** $T$.

Unlike ordinary (inner) billiards, where a ball bounces inside a table, outer billiards acts on the unbounded complement.
The map is piecewise-isometric: in each cone it's a rotation by $\pi$ around the corresponding vertex.
The discontinuities occur along the rays extending the polygon's edges outward — these are the **singularity lines** of $T$.

The **singularity set** is the closure of all preimages of these rays under iterates of $T$:
$$\Sigma = \overline{\bigcup_{n \ge 0} T^{-n}(\text{edge rays})}$$

This set has rich fractal structure that depends on the polygon.
For rational polygons (vertex angles that are rational multiples of $\pi$), the singularity set tiles the plane into regions where the orbit of $T$ is periodic.
For regular polygons the pattern has the dihedral symmetry of the polygon, producing striking self-similar tilings.

The shader computes $\Sigma$ directly: for each pixel, it iterates the outer billiard map forward and checks whether any iterate lands on an edge ray.
This is the *correct* use of a shader for billiards — unlike the trajectory shader above, where every pixel redundantly computed the same curve, here each pixel genuinely has its own computation to do.
The question "does the orbit of *this point* hit a singularity line?" has a different answer at every pixel, and the GPU evaluates all of them in parallel.

Try switching between different polygons — the triangle gives a simple tiling, the pentagon produces an intricate quasicrystalline pattern, and the kite breaks all the symmetry.

::shader{src="outer-billiards" layout="tabbed"}

:::tip
## Credit
This shader was written by [Lael Costa](https://lael.dev) (Penn State), a graduate student at the IHP trimester program.
:::


