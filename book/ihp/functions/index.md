# Visualizing Functions

This section is the core toolkit of the workshop: shaders for visualizing functions.
If there's one thing a fragment shader does naturally, it's evaluating a function at every point in a domain and turning the result into a picture.
Given $f\colon \mathbb{R}^n \to \mathbb{R}$ (or $\mathbb{C} \to \mathbb{C}$, or $\mathbb{R}^3 \to \mathbb{R}$), the shader evaluates $f$ at every pixel and maps the result to a color.
No meshes, no marching cubes, no parametrizations — the pixel knows its coordinates, calls $f$, and is done.

We build shaders for three settings:

**2D real-valued functions** $f\colon \mathbb{R}^2 \to \mathbb{R}$ — shown as colormaps with level curves.
This is the simplest case, and we'll use it to develop the gradient-correction technique that makes contour lines look sharp at any zoom level.

**Complex functions** $f\colon \mathbb{C} \to \mathbb{C}$ — shown via domain coloring, where the output's argument becomes hue and its modulus becomes brightness.
Every pixel pulls back the color wheel through $f$.

**3D scalar fields** $f\colon \mathbb{R}^3 \to \mathbb{R}$ — shown three different ways: as 2D slice planes cutting through the field, as isosurfaces (level sets rendered as opaque geometry via raymarching), and as luminous volumes (emission-absorption rendering of the density).
Each trades legibility for completeness.


### Level Sets of a Scalar Function

The most basic thing you might want to visualize is a function $f\colon \mathbb{R}^2 \to \mathbb{R}$.
The shader approach is as direct as it gets: for each pixel, evaluate $f$ and use the result to pick a color.

There are two things to show: the *value* of $f$ (via a color map) and its *level curves* $f = c$ for evenly spaced values of $c$ (as dark lines on top of the color).

The pseudocode:

```
for each pixel (x, y):
    compute val = f(x, y)
    map val to a color via some color ramp
    if val is close to a multiple of some spacing:
        darken the color (this is a level curve)
    output the color
```

The only question is what "close to a multiple" means.
The naive approach: compute `fract(val / spacing)` and check whether it's near 0 or 1.
This works, but the lines have uneven width — they're thin where $|\nabla f|$ is large (because the function crosses the level quickly) and thick where $|\nabla f|$ is small.

The fix is to measure distance in the *image*, not in the range of $f$.
The value $f$ changes by approximately $|\nabla f|$ per pixel, so dividing by the gradient magnitude converts from "closeness in value" to "closeness in pixels."
This gives you level curves with a consistent screen-space width everywhere, which is almost always what you want.


#### Level Sets

To get level curves with consistent screen-space width, we need $|\nabla f|$.
We could compute it analytically, but for a "type in any function" tool, it's easier to estimate numerically with finite differences.

The idea: instead of thresholding `fract(val / spacing)` directly, we divide by $|\nabla f|$ to convert from value-space distance to pixel-space distance.

First, estimate the gradient numerically:

```glsl
float eps = VIEW_RADIUS * 2.0 / iResolution.y; // one pixel in world coords
float gradX = (f(uv + vec2(eps, 0.0)) - f(uv - vec2(eps, 0.0))) / (2.0 * eps);
float gradY = (f(uv + vec2(0.0, eps)) - f(uv - vec2(0.0, eps))) / (2.0 * eps);
float gradMag = length(vec2(gradX, gradY));
```

Then the level curve detection becomes:

```glsl
float valInCell = fract(val / SPACING);
float distToLine = min(valInCell, 1.0 - valInCell) * SPACING; // distance in value
float pixelDist = distToLine / (gradMag * eps);                // distance in pixels
float line = smoothstep(0.0, LINE_PX, pixelDist);
```

Now `LINE_PX` is an actual pixel width — set it to 1.5 and you get clean, even curves everywhere regardless of how the function behaves.
Without the gradient correction, lines get thinner where $|\nabla f|$ is large and thicker where it's small.
Try $f(x,y) = x^2 + y^2$ to see the effect: uncorrected curves thin out with distance, while these stay uniform.

Try replacing `f` with your favorite function: $x^2 - y^2$, or $\sin(x^2 + y^2)$, or the distance to some curve.

::shader{src="level-sets-gradient" layout="tabbed"}


#### Logarithmic Contours

*(Based on [Ricky Reusser's blended contour shader](https://www.shadertoy.com/view/tsycWV))*

The level set shader draws contours at evenly spaced values: $f = c, 2c, 3c, \ldots$.
This is fine when the function has a bounded range, but for functions with zeros, poles, or large dynamic range it's a poor choice — you either get contours crammed together near the zeros or invisible near the poles.

The fix is to draw contours that are evenly spaced *multiplicatively* — that is, contour $\log|f|$ instead of $f$.
Near a zero the contours are dense; near a pole they spread out.
This is the natural choice for rational functions, holomorphic functions with interesting singularity structure, or anything where the magnitude varies over several orders.

The shader takes this a step further with **multi-octave blending**.
Instead of one set of contour lines, it draws several octaves simultaneously — like major and minor gridlines on logarithmic graph paper — and smoothly fades between them based on the local gradient.
As the function gets steeper, finer subdivisions appear; in flat regions, only the coarsest contours survive.
The result is scale-invariant and visually clean everywhere.

The core of the algorithm works in log-space.
Given the function magnitude $|f|$ and its screen-space gradient $\nabla|f|$, we compute the *logarithmic screen-space gradient*:

```glsl
float screenSpaceLogGrad = hypot(gradient) / f;
```

This tells us how fast $\log|f|$ is changing per pixel, which determines which octave of contours is appropriate at this pixel.
From there, we pick a contour spacing, compute fractional distance to the nearest contour in $\log_2|f|$ space, and blend across octaves:

```glsl
float localOctave = log2(screenSpaceLogGrad * minSpacing) / log2(divisions);
float contourSpacing = pow(divisions, ceil(localOctave));
float plotVar = log2(f) / contourSpacing;
float widthScale = 0.5 * contourSpacing / screenSpaceLogGrad;
```

One nice trick: the screen-space gradient is computed using `dFdx` and `dFdy`, built-in GLSL functions that give you derivatives for free — the GPU computes them from neighboring pixel values.
No finite differences needed.

The function goes at the top as usual — return a `vec2` for complex-valued functions, or `vec2(realValue, 0.0)` for real-valued ones.
All the contour machinery lives below the edit line.

::shader{src="level-sets-log" layout="tabbed"}


#### Colored Contour Regions

*(Based on [Aaron Fennig's contour shader](https://www.shadertoy.com/view/...))*

The previous two shaders draw dark lines on a continuous color ramp.
This one does something different: it fills the *bands* between level sets with distinct colors, giving you a topographic-map look.
The transition between neighboring bands is antialiased properly using the error function — instead of the ad hoc `smoothstep`, we convolve the sharp stripe edge with a Gaussian pixel kernel.
This is the mathematically correct way to antialias, and it looks noticeably cleaner, especially when the stripes are wide.

The original shader by Aaron Fennig uses automatic differentiation (tracking 1-jets of maps $\mathbb{R}^2 \to \mathbb{R}^2$) to propagate the derivative exactly.
That's the principled approach — and worth studying — but it requires the user to implement their function in terms of the `jet2` type.
For a "type in any function" tool, we use finite differences for the gradient instead.

The antialiasing works like this.
At each pixel, we compute `mod(f, period)` to find where we are in the stripe cycle, giving us the index of the current stripe and the distance to the nearest edge.
Then we divide by $|\nabla f|$ times the pixel size to convert to screen-space distance.
Finally, we use the complementary error function to compute what fraction of the pixel's Gaussian footprint falls on the other side of the nearest edge, and blend the two stripe colors accordingly:

```glsl
float screen_dist = abs(disp) / (gradMag * pixelRadius);
float overflow = 0.5 * erfc_appx(screen_dist / pixelRadius);
color = mix(thisStripeColor, neighborColor, overflow);
```

The `erfc` gives a softer, more physically correct blend than `smoothstep` — the difference is visible when you compare them side by side.

The color palette is defined at the top alongside the function.
The default uses four alternating colors, but you can use any number.

::shader{src="level-sets-stripes" layout="tabbed"}


### Domain Coloring

A function $f\colon \mathbb{R}^2 \to \mathbb{R}$ maps each point to a single number, and we can turn that number into a color.
A function $f\colon \mathbb{C} \to \mathbb{C}$ maps each point to a *pair* of numbers — or equivalently, to another point in the plane.
The graph lives in $\mathbb{C}^2 \cong \mathbb{R}^4$, so we can't plot it directly.

The solution is the pullback idea in its purest form: design a coloring of the plane — a pattern that encodes position as color — and then pull it back through $f$.
To visualize $f$, we don't try to draw its graph.
Instead, we paint the *range* with a known pattern and look at what that pattern becomes when dragged back to the domain.

The standard choice: encode a complex number $w = |w|e^{i\theta}$ as color by mapping $\theta$ to hue and $|w|$ to brightness.
Red is the positive real axis, cyan is the negative real axis, and the colors wrap smoothly around the circle.
Zeros show up as points where all hues converge to black; poles as points where all hues converge to white.

The key function is `complexToColor`, which implements this pattern:

```glsl
// The "target pattern" for domain coloring:
// phase via cubehelix rainbow, brightness from modulus
vec3 complexToColor(vec2 w) {
    float arg = atan(w.y, w.x);           // -pi to pi
    float mag = length(w);

    // Phase coloring via rainbow colormap
    float phase = arg / (2.0 * PI) + 0.5;
    vec3 col = rainbow(phase);

    // Brightness: periodic in log|w| to show modulus contours
    float rings = 0.5 + 0.5 * sin(2.0 * PI * log2(mag));
    col *= 0.7 + 0.3 * rings;

    return col;
}
```

The `rainbow` function is a port of d3's cubehelix rainbow colormap — it cycles through hues with perceptually uniform brightness, so the coloring doesn't have the artificial bright/dark bands you get from naive HSL.

Domain coloring is then just: evaluate $f(z)$, pass the result to this function.
The pullback does all the work — every feature of $f$ (zeros, poles, branch cuts, saddle points) becomes visible in how it distorts the pattern.


#### The Common Tab

This is our first shader that benefits from a shared library.
Shadertoy's **Common** tab holds code that's available in all other tabs.
We use it to define complex arithmetic: `cmul`, `cdiv`, `cexp`, `clog`, `cpow`, `csin`, and so on, along with the `cubehelix`, `rainbow`, and `complexToColor` functions.

This means that in the Image tab, you can write your function naturally:

```glsl
vec2 f(vec2 z) {
    return cdiv(cmul(z, z) - vec2(1, 0), z + vec2(0, 1));
}
```

instead of manually expanding every multiplication and division.
The Common tab holds all the visualization machinery that doesn't change between shaders.


#### Version 1: Standard Domain Coloring

Hue from phase, brightness modulated by modulus.
The periodic brightness creates concentric rings around zeros and poles, making them easy to count.
To see the raw color pattern without any transformation, set $f(z) = z$ (the identity).

::shader{src="domain-coloring" layout="tabbed"}


#### Version 2: Checkerboard Grid

Same idea, different pattern to pull back: no color at all.
Instead, we pull back a black-and-white checkerboard on the integer grid.
Dark squares are dark, light squares are light, and within each square a finer subdivision grid gives you local scale information.
Major grid lines at integers are drawn nearly black.

This makes geometric distortion immediately visible: you can see area changes (squares stretching or compressing), angle changes (squares shearing), and conformality (squares staying square, just rotated and scaled).
It's essentially a visual Jacobian.

::shader{src="domain-coloring-checker" layout="tabbed"}


#### Version 3: Adaptive Grid

*(Based on [Ricky Reusser's rectangular domain coloring](https://www.shadertoy.com/view/tlcGzf))*

The previous two versions have a fixed grid scale, which means near a pole or zero — where $|f|$ changes by orders of magnitude over a few pixels — the grid either bunches up into solid black or vanishes entirely.
This version fixes that by adapting the grid density to the local derivative.

The idea is the same multi-octave trick we saw in the logarithmic contour shader: compute how fast $|f|$ is changing per pixel, pick the appropriate grid scale, and blend across several octaves so finer subdivisions fade in and out smoothly.
On top of this it composites three layers: phase coloring (hue from $\arg f$), checkerboard shading (area distortion), and the adaptive grid lines (angle distortion).
Six parameters at the top control the mix — you can dial any layer to zero to isolate the others.

The hardware derivatives (`dFdx`, `dFdy`) are computed with `hypot` rather than `length` to avoid floating-point overflow near poles — a detail that matters in practice.

::shader{src="domain-coloring-adaptive" layout="tabbed"}


#### Version 4: The Riemann Sphere

Everything so far has been in the plane $\mathbb{C}$.
But many of the most natural objects in complex analysis — Möbius transformations, rational maps, meromorphic functions — live on the Riemann sphere $\hat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}$.
A zero and a pole aren't really different things on $\hat{\mathbb{C}}$; they're both points where the function takes a particular value.

This shader renders a lit 3D sphere and domain-colors it via stereographic projection.
Each visible point on the sphere maps to a point $z \in \mathbb{C}$ via the standard projection from the south pole, we evaluate $f(z)$, and color with `complexToColor`.
The south pole itself maps to $\infty$.

The default function is two steps of the Doyle–McMullen iteration for $z^5 = 1$ — a generally convergent algorithm that finds fifth roots of unity from (almost) any starting point.
On the sphere you can see the five basins of attraction as colored patches, with the Julia set winding between them.
The sphere rotates so you can see the whole picture, including the basin at $\infty$.

The stereographic projection is straightforward:
given a point $(x, y, z)$ on the unit sphere with $y$ pointing toward the viewer, the complex coordinate is $(x + iz_{\text{coord}}) / (1 + y)$.
This blows up at the back pole ($y = -1$), which is exactly the point at infinity.
The center of the visible disk maps to $z = 0$.

::shader{src="domain-coloring-sphere" layout="tabbed"}



### 3D Scalar Functions: Slice Planes

We now move from 2D to 3D: given a function $f\colon \mathbb{R}^3 \to \mathbb{R}$, how do we see it?
The most direct approach is also the most familiar: take 2D slices and draw contour plots on them.

Each slice is a standard 2D level-set visualization — the same gradient-corrected contour lines from our earlier shaders, now embedded in 3D space.
You can see exactly where $f$ is positive, negative, where it crosses zero, and how steeply it varies.


#### Structure

The shader draws four planes inside a bounding box:

Three **reference planes** at $x = 0$, $y = 0$, and $z = 0$ provide spatial context.
These use a muted, desaturated diverging colormap (blue–white–red) with sparse contour lines — just enough to orient you without competing for attention.
The back faces of the bounding box double as reference planes, showing the contour plot of $f$ restricted to the boundary.

One **active slice** sweeps back and forth along a chosen axis (configurable via `SLICE_AXIS`).
This uses the full diverging colormap with dense, crisp contour lines and a highlighted $f = 0$ contour — the same visual language as our 2D level-set shaders.
The active slice is opaque and paints over whatever is behind it.

The bounding box faces show a subtle grid for spatial reference, with axis lines highlighted.


#### Contour lines in 3D

The contour line technique is essentially identical to our 2D gradient-corrected lines, but with one twist: the gradient of $f$ must be **projected onto the slice plane** before computing pixel distances.
In 2D, the gradient $\nabla f$ already lives in the plane.
In 3D, $\nabla f$ has a component perpendicular to the slice that would make the lines too thin (or too thick) if included.
We subtract that component:
$$\nabla_{\text{proj}} = \nabla f - n\,(\nabla f \cdot n)$$
where $n$ is the slice plane normal, and use $|\nabla_{\text{proj}}|$ for the width correction.

The $f = 0$ contour is drawn separately and thicker, since it's the most important curve — it's where the level surface $f = 0$ would intersect this plane.


#### Diverging colormap

The colormap maps negative values to blue and positive to red, with white at zero.
The `COLOR_SCALE` parameter controls how quickly the colors saturate — a small value shows structure across a wide range of $f$, while a large value clips early and emphasizes the sign.
On reference planes, `REF_COLOR_SAT` keeps the coloring very subtle so the active slice dominates visually.

::shader{src="slice-planes" layout="tabbed"}


### 3D Scalar Functions: Implicit Surfaces

Slice planes show one cross-section at a time.
To see the full surface $f^{-1}(c)$ as a three-dimensional object — lit, shaded, and rotatable — we need a different technique: **raymarching**.

A scalar function $f\colon \mathbb{R}^3 \to \mathbb{R}$ has level sets $f^{-1}(c)$ that are (generically) surfaces — the 3D analog of the contour curves we drew earlier.
The challenge is that we can't just evaluate $f$ at each pixel.
A pixel corresponds to a *ray* through 3D space, and we need to find where that ray intersects the surface $f = c$.
There's no general closed-form solution — the surface could be any shape — so we solve it numerically: walk along the ray in small steps, evaluate $f$, and watch for the value to cross the target level.

For a true signed distance function (where $|f(p)|$ gives the distance to the nearest surface point), we can step by $|f|$ itself — this is sphere tracing proper, and it converges fast.
For a general implicit function, we use a fixed step size and watch for sign changes.
Our shaders use the latter since we want the user to type *any* function without worrying about the SDF property.


#### Scene setup

All three shaders share the same scene structure.
The function lives inside a **bounding box** that sits on a **ground plane** at $y = 0$, like a specimen in a display case.
The camera orbits above, looking slightly down.

The bounding box serves a dual purpose.
First, it makes the marcher efficient: we analytically intersect the ray with the box and only march between the entry and exit points — no wasted steps in empty space.
Second, the box faces become a canvas for drawing **isolines** of $f$, showing where each level set meets the boundary.
This gives crucial context: even when an isosurface is hidden behind another, you can see its fingerprint on the walls.

The box intersection (from Inigo Quilez) returns both the near and far intersection distances, plus the face normals at each.
We need these normals to draw isolines correctly — the gradient of $f$ must be **projected onto the face** by subtracting the component along the face normal before computing the distance to each level.

The gradient itself uses **forward differences** rather than centered differences — one evaluation instead of two per axis:
$$\nabla f(p) \approx \bigl(f(p+\epsilon\hat x) - f(p),\  f(p+\epsilon\hat y) - f(p),\  f(p+\epsilon\hat z) - f(p)\bigr)$$
Less accurate than centered differences, but for normals and isoline widths the savings are worth it — we evaluate $f$ three extra times instead of six.

The **ground plane** contributes ambient occlusion: at each ground hit, we compute the distance to the nearest isosurface (using the projected gradient), and darken the ground when an isosurface is close.
This is extremely cheap — just one evaluation of $f$ and its gradient — but gives a convincing sense of the object sitting in space.

Lighting uses a slowly **rotating directional light** with wrap diffuse ($\frac{1}{2} + \frac{1}{2}\max(n \cdot l, 0)$, which ensures even faces turned away from the light receive some illumination) and a sharp specular highlight via `reflect` with a high exponent (128).
Back-facing surfaces — where the normal points away from the camera — are lightened (`0.4 + 0.6 * color`) to distinguish inside from outside.


#### Single Level Set

The basic tool: type a function $f(x,y,z)$, see the surface $f = 0$.

The raymarcher walks in uniform steps between the box entry and exit points.
At each step it evaluates $f$ and checks for a sign change — meaning the ray has crossed the surface.
When that happens, it returns the current $t$ value, computes the gradient normal, and shades.
The isoline on the box walls shows where the $f = 0$ curve intersects each face.

The default is the Schwarz P surface $\cos(\pi x) + \cos(\pi y) + \cos(\pi z) = 0$, a triply periodic minimal surface.
The coordinates are scaled so the bounding box contains $2 \times 2 \times 2$ fundamental domains — you can see the channels connecting in all three coordinate directions.

::shader{src="implicit-surface" layout="tabbed"}


#### Nested Level Sets

Now we want to see an entire *family* of level sets $f = c_1, c_2, \ldots, c_n$ simultaneously, each in its own color.
The marcher walks through the volume in uniform steps, and at each step checks all levels for a sign change.
When the ray crosses a level, it shades that surface and composites it **front-to-back** — the accumulated color and opacity build up as the ray passes through successive layers.
This is the same compositing used in volume rendering: each layer contributes `(1 - accumulated_alpha) * layer_alpha * layer_color`.

By default, every level is opaque — the first one hit occludes everything behind it, just like the single-level shader.
But you can set `HIGHLIGHT` to a level index (0 through `NUM_LEVELS - 1`) to make that one level opaque while the rest become translucent at `GHOST_OPACITY`.
The march then continues *through* the translucent surfaces, revealing the highlighted level even when it's nested deep inside the others.

The levels are generated automatically from three parameters: `CENTER_LEVEL`, `LEVEL_SPACING`, and `NUM_LEVELS`.
Colors follow a diverging blue → white → red ramp, so the central level is white and the extremes are saturated.
On the box walls, all levels get isolines in their respective colors, giving a topographic map of the entire family.

This reveals topology that a single level set hides.
A function might have a sphere-like level set at one value but develop handles or disconnect at another — watching the family evolve as $c$ changes is exactly Morse theory made visible.

The default shows the Schwarz P family at five levels centered on $c = 0$ with spacing $0.5$.
At $c = 0$ you see the minimal surface itself (white); as $|c|$ grows the channels pinch off, and the topology changes from a connected network to isolated components.

::shader{src="implicit-surface-nested" layout="tabbed"}


#### Cross-Section

Nested level sets show the outside of each shell, but the interesting structure is often inside — how the Schwarz P surface partitions space, how nested shells merge or pinch off.

The idea: clip away half the scene with a sweeping plane, exposing the interior.
On the cut face we draw **colored contour lines** for each level value, so the cross-section becomes a topographic map.

The marcher now tracks two things as it walks: the function value $f$ and the signed distance to the clipping plane.
At each step it checks whether either has changed sign.
Isosurface crossings in the kept region (the side of the plane we haven't clipped away) are shaded and composited front-to-back, exactly as in the nested level set shader — including support for `HIGHLIGHT` and `GHOST_OPACITY`.
When the ray crosses into the clipped region, the cut face is rendered with contour lines and composited behind any translucent surfaces already accumulated.

The contour lines use the same gradient-projection technique as the box wall isolines: the gradient of $f$ is projected onto the cut plane by removing the component along the plane normal, and the distance to each level is divided by the projected gradient magnitude to get a world-space width.

The level configuration (`CENTER_LEVEL`, `LEVEL_SPACING`, `NUM_LEVELS`) and highlight mode work identically to the nested shader.
The clip plane sweeps back and forth with `sin(iTime)`, turning the visualization into something like a CT scan.
The `CLIP_NORMAL` direction controls which way the plane faces — try `vec3(1,0,0)` for a vertical slice, `vec3(0,1,0)` for horizontal, or `normalize(vec3(1,1,0))` for a diagonal cut.

::shader{src="implicit-surface-section" layout="tabbed"}


### Algebraic Surfaces

The implicit surface shaders above work for any function $f(x,y,z)$ — transcendental, piecewise, whatever you like.
But there's a distinguished class of functions where the zero set has particularly rich structure: **polynomials**.

A real algebraic surface is the variety $V(f) = \{ (x,y,z) \in \mathbb{R}^3 : f(x,y,z) = 0 \}$ for a polynomial $f$.
The raymarcher renders these directly — type the polynomial, see the variety.
No triangulation, no marching cubes, no special handling of singularities.
In fact, the shader's behavior at singular points is informative: where $\nabla f = 0$, the gradient-based normal degenerates and the shading breaks down, which marks exactly the singular locus.
Nodes appear as dimples where the lighting flickers; cuspidal edges show up as creases where the normal reverses abruptly.

The shader below is loaded with classic examples from the algebraic geometry literature.
Here are some highlights worth trying:

- **Clebsch diagonal cubic** (the default) — the unique cubic surface on which all 27 lines are real. The lines are visible as straight creases on the surface. This was one of the first algebraic surfaces to be physically modeled, by Clebsch and Klein in the 1870s.
- **Cayley cubic** — a cubic with 4 ordinary double points (nodes), the maximum for a cubic. The nodes sit at the vertices of a tetrahedron.
- **Kummer surface** — a quartic with 16 nodes (the maximum for a quartic), with beautiful tetrahedral symmetry.
- **Barth sextic** — a degree-6 surface with 65 nodes and icosahedral symmetry. The golden ratio $\varphi$ appears explicitly in the equation. Barth proved in 1996 that 65 is the maximum number of nodes on a sextic.
- **Togliatti quintic** — a degree-5 surface with 31 nodes, also with icosahedral symmetry.
- **Whitney umbrella** ($x^2 = y^2 z$) — the simplest non-isolated singularity: a line of double points along the $z$-axis, with a pinch point at the origin where the surface crosses itself.
- **Steiner surface** ($x^2 y^2 + x^2 z^2 + y^2 z^2 = xyz$) — a self-intersecting surface with three double lines meeting at a triple point. Also called the Roman surface after Steiner's visit to Rome where he discovered it.
- **Fermat surfaces** ($x^n + y^n + z^n = 1$) — a family interpolating between the sphere ($n=2$) and a cube (as $n \to \infty$). The quartic and sextic members are already visibly box-like.

::shader{src="algebraic-surface" layout="tabbed"}


### 3D Scalar Functions: Volumetric Rendering

Isosurfaces show *where* a function crosses a threshold — crisp, opaque boundaries.
But a scalar field contains information everywhere, not just on surfaces.
A probability density, a temperature distribution, an electromagnetic potential — these fill all of space, and the interesting structure is often in *how* the field varies, not just where it crosses a particular value.

Volume rendering makes the entire field visible at once by treating $\rho(x,y,z)$ as a density of luminous gas.
Where $\rho$ is large, the volume glows brightly and is opaque.
Where $\rho$ is near zero, it's transparent.
The result looks like a glowing nebula or cloud — you see the full spatial structure of the field at once, with no information lost to a level-set choice.


#### Emission-absorption model

The physics is Beer–Lambert: a ray passing through a medium accumulates light (emission) while simultaneously being attenuated (absorption).
For a ray at position $\mathbf{r}(t) = \mathbf{o} + t\mathbf{d}$, the received light is:

$$I = \int_{t_\text{min}}^{t_\text{max}} c(t)\, \sigma(t)\, T(t)\, dt, \qquad T(t) = \exp\!\left(-\int_{t_\text{min}}^{t}\sigma(s)\,ds\right)$$

where $c(t)$ is the emitted color, $\sigma(t)$ is the opacity per unit length, and $T(t)$ is the transmittance — the fraction of light that makes it from depth $t$ back to the camera.

We approximate this by marching the ray through the bounding box in uniform steps and compositing **front-to-back**.
At each step we evaluate $\rho$, map it through a **transfer function** to get a color and opacity, and blend:
$$C_\text{acc} \mathrel{+}= (1 - \alpha_\text{acc}) \cdot c_i \cdot \alpha_i, \qquad \alpha_\text{acc} \mathrel{+}= (1 - \alpha_\text{acc}) \cdot \alpha_i$$
where $\alpha_i = 1 - e^{-\sigma_i \, \Delta t}$ is the step opacity from Beer's law.
Once $\alpha_\text{acc}$ is near 1, the ray is fully opaque and we stop early.


#### Transfer function

The transfer function is the creative heart of volume rendering: it decides what density values look like.
Ours maps positive $\rho$ to warm colors (orange → white) and negative to cool (blue → cyan), with intensity and opacity both increasing with $|\rho|$.
A power curve (`GLOW_POWER`) controls contrast — values above 1 suppress low-density haze and sharpen the bright cores.

The `VOLUME_SIGN` parameter lets you render only positive, only negative, or both — useful for seeing the separate contributions in a field like $\rho = g_1 + g_2 - g_3$.


#### Gradient lighting

A raw emission volume can look flat — just colored fog.
The trick that gives it sculptural depth is **gradient-based directional shading**: at each sample point, compute $\nabla\rho$ and treat it as a surface normal.
The dot product $\nabla\rho \cdot \mathbf{l}$ with the light direction modulates the emission, so regions where the density is increasing toward the light appear brighter, and regions facing away appear darker.
This is physically dubious (luminous gas doesn't have surface normals) but visually compelling — it gives the volume the three-dimensional presence of a lit object.


#### Dark background and tone mapping

Unlike the isosurface shaders (which sit on a bright ground plane), volumes live against a dark background.
Emissive rendering adds light, so anything nonzero gets brighter — a bright background would wash everything out.

Since emission can accumulate to very high values (especially in dense cores), we apply **Reinhard tone mapping** ($c \mapsto c/(1+c)$) before gamma correction.
This smoothly compresses highlights without clipping, preserving the full dynamic range.

::shader{src="volume" layout="tabbed"}


#### Cross-Section

The volume shows global structure beautifully, but sometimes you want to peel it open — watch the density reveal itself slice by slice.

The implementation is as simple as it gets: the march loop is identical to the basic volume shader, but each sample checks `dot(p, CLIP_NORMAL) > clipOff` and skips if true.
The box, grid, camera — everything else stays exactly the same.
The clip plane sweeps with `sin(iTime)`, progressively revealing or hiding the density.

::shader{src="volume-section" layout="tabbed"}


