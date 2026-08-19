# Day 3: Hyperbolic Tilings — Homework

## Checkpoints

These verify you've understood the core material.

**C1. Custom Palette.** Change the color scheme of any tiling shader. Replace `CREAM` and `SLATE` with your own colors. Try high contrast, low contrast, or complementary colors. Which combinations make the structure easiest to see?

**C2. Growing Tiling.** Animate the fold count limit to watch the tiling build up layer by layer:
```glsl
int max_iter = int(mod(iTime * 10.0, 100.0)) + 1;
```
Apply this to the Poincaré disk shader. Watch each iteration reveal a new ring of triangles.

**C3. The (2,4,5) Triangle.** The $(2,4,5)$ triangle has angles $\pi/2$, $\pi/4$, and $\pi/5$. Check: $\frac{1}{2} + \frac{1}{4} + \frac{1}{5} = \frac{19}{20} < 1$. ✓

Here are the half-spaces:
```glsl
HalfSpaceVert left = HalfSpaceVert(0.0, -1.0);           // x > 0
HalfSpaceCirc bottom = HalfSpaceCirc(0.0, 1.0, 1.0);     // outside unit circle
HalfSpaceCirc third = HalfSpaceCirc(-1.70, 2.40, -1.0);  // inside this circle
```
Implement this tiling in the Poincaré disk. How does it differ visually from $(2,3,7)$?

**C4. F Markers in (2,3,7).** Add the `drawF` function to the $(2,3,7)$ tiling. You'll need to find a good position for the F within the fundamental domain—try `z - vec2(0.15, 1.1)` as a starting point and adjust until the F sits nicely inside the triangle.

**C5. Rainbow Tiling.** Instead of parity (two colors), color by the full fold count using a smooth rainbow:
```glsl
float t = float(foldCount) / 20.0;
vec3 color = 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
```
What structure does this reveal that parity coloring hides?


## Explorations

These extend the day's topics in interesting directions.

**E1. Hyperbolic Circles.** In hyperbolic geometry, circles look different depending on where they are. The hyperbolic distance formula in the upper half-plane is:
$$d(z_1, z_2) = \text{arccosh}\left(1 + \frac{|z_1 - z_2|^2}{2 y_1 y_2}\right)$$

In GLSL: `acosh(x) = log(x + sqrt(x*x - 1.0))`.

Draw hyperbolic circles around a fixed point (say, $i$) with radii 0.5 and 1.0. Color pixels where the hyperbolic distance is within 0.02 of the target radius.

Then make the center follow the mouse. Notice how circles stretch horizontally and compress vertically near the boundary—this is the hyperbolic metric at work.

**E2. Dragging a Hyperbolic Ball.** On Day 1, we dragged a Euclidean circle with the mouse. Do the same in hyperbolic space:

1. Map mouse position to the upper half-plane
2. Draw a filled hyperbolic disk of radius 0.3 centered at the mouse
3. All points within hyperbolic distance 0.3 should be colored

Watch how the "ball" distorts as you drag it toward the real axis—it gets enormous in Euclidean terms but stays the same hyperbolic size.

*Extension:* Implement this in the Poincaré disk model. You'll need to convert mouse position through the Cayley transform.

**E3. Edge Highlighting.** Instead of coloring tiles by parity, color by distance to an edge of the fundamental domain. After folding, compute the distance to one of the boundary lines (Euclidean distance is fine for the Euclidean triangle tiling) and use it for coloring:

```glsl
float distToEdge = /* distance to bottom edge */;
float brightness = smoothstep(0.0, 0.3, distToEdge);
vec3 color = mix(vec3(1.0), SLATE, brightness);
```

For the equilateral triangle tiling, this creates a pattern of highlighted "stripes" that trace through the tiling—making hexagonal shapes visible even though we're drawing triangles!

Try the same for hyperbolic tilings (using hyperbolic distance). What patterns emerge?

**E4. Edges of the Tiling.** Add edge drawing to any hyperbolic tiling. After folding, check distance to each geodesic boundary and draw white where distance is small.

For a vertical geodesic at $x = c$:
```glsl
float distToVert(vec2 z, float c) {
    z.x -= c;
    return acosh(length(z) / z.y);
}
```

For a semicircular geodesic, use a Möbius transformation that sends it to a vertical line:
```glsl
float distToCirc(vec2 z, float center, float radius) {
    vec2 num = z - vec2(center + radius, 0.0);
    vec2 denom = z - vec2(center - radius, 0.0);
    vec2 w = cdiv(num, denom);
    return acosh(length(w) / w.y);
}
```

The edges should have constant hyperbolic thickness—fanning out near the boundary in Euclidean terms.

**E5. Soccer Ball Coloring.** The $(2,3,7)$ tiling can be colored to look like a hyperbolic soccer ball. The key insight: 7 triangles meet at the $\pi/7$ vertex, forming a heptagon, while 3 triangles meet at the $\pi/3$ vertex.

After folding, determine which vertex of the fundamental domain your point is closest to (in hyperbolic distance). Color differently based on vertex type:
- Near the $\pi/2$ vertex: white
- Near the $\pi/3$ vertex: black  
- Near the $\pi/7$ vertex: white

This highlights the $\{7,3\}$ pattern—heptagons surrounded by heptagons, with 3 meeting at each vertex—that lives inside the $(2,3,7)$ triangle tiling.


## Challenges

These require ideas beyond the lecture.

**H1. The Klein Disk Model.** The **Klein disk** represents hyperbolic space where geodesics appear as *straight Euclidean lines*. This makes some properties obvious but distorts angles.

Conversions:
- Poincaré → Klein: $k = \frac{2w}{1 + |w|^2}$
- Klein → Poincaré: $w = \frac{k}{1 + \sqrt{1 - |k|^2}}$

Display the $(2,3,\infty)$ tiling in the Klein model. The curved geodesics become straight! All triangles look like ordinary Euclidean triangles.

**H2. The Band Model.** The **band model** maps hyperbolic space to an infinite horizontal strip of height $\pi$. It's useful for visualizing hyperbolic translations.

From the Poincaré disk:
$$b = \log\left(\frac{1 + w}{1 - w}\right)$$

In GLSL:
```glsl
vec2 poincareToBand(vec2 w) {
    vec2 num = vec2(1.0, 0.0) + w;
    vec2 denom = vec2(1.0, 0.0) - w;
    vec2 ratio = cdiv(num, denom);
    return vec2(0.5 * log(dot(ratio, ratio)), atan(ratio.y, ratio.x));
}
```

Display the tiling in the band model. Horizontal translation in the band corresponds to hyperbolic translation along a geodesic!

**H3. Interactive Möbius Transformations.** Hyperbolic isometries are Möbius transformations $z \mapsto \frac{az + b}{cz + d}$ with $ad - bc = 1$.

Useful ones:
- Horizontal translation: $z \mapsto z + t$
- Scaling: $z \mapsto kz$
- Rotation around $i$: $z \mapsto \frac{z\cos(\theta/2) + \sin(\theta/2)}{-z\sin(\theta/2) + \cos(\theta/2)}$

Make the tiling interactive: mouse x controls translation, mouse y controls scaling. The tiling slides and zooms while preserving its structure.


## Project: General Triangle Tilings

Build a shader that tiles the hyperbolic plane with any triangle $(p,q,r)$ where $\frac{1}{p} + \frac{1}{q} + \frac{1}{r} < 1$.

### Part A: Understanding the Setup

We place the triangle conveniently in the upper half-plane:
- The $\pi/p$ vertex sits where the vertical geodesic $x = -\cos(\pi/p)$ meets the unit circle
- One edge lies along the unit semicircle
- One edge lies along a vertical geodesic

For $(2, q, r)$ triangles, $\cos(\pi/2) = 0$, so the vertical edge is the imaginary axis—exactly what we've been using. The challenge is finding the third geodesic.

### Part B: Computing the Third Geodesic

The hyperbolic law of cosines gives the side length $s_r$ opposite angle $\pi/r$:
$$\cosh(s_r) = \frac{\cos(\pi/r) + \cos(\pi/p)\cos(\pi/q)}{\sin(\pi/p)\sin(\pi/q)}$$

From here, we can find the Euclidean height of the third vertex (it lies hyperbolic distance $s_r$ above $i$ on the vertical geodesic), and then the center and radius of the third geodesic (as we know the angle it makes with the vertical: and this angle is the same in both hyperbolic and Euclidean geometry sinc the upper half plane is conformal.)

*Hint: draw yourself some constructions in Eulidean geometry!*

**Exercise:** Given your general formula, work through this calculation for $(2,3,7)$ and verify you get `center ≈ -0.7665` and `radius ≈ 1.533`.

### Part C: Implementation

Write a function that takes `2`, `q`, `r` as parameters and returns the third half space. Then build the tiling with adjustable parameters (say, constants that are set at the top of the file? Or animated by iTime? Or controlled by iMouse?)


### Part D: Visualization

Add edges and vertices. Color vertices by their angle type ($\pi/p$, $\pi/q$, or $\pi/r$) using different colors.

Display in both the upper half-plane and Poincaré disk models.

### Part E: Gallery

Create a gallery of tilings—render several interesting examples:
- $(2,3,7)$, $(2,3,8)$, $(2,3,9)$, ... — increasing the third parameter
- $(2,4,5)$, $(2,4,6)$, $(2,4,7)$, ...
- $(3,3,4)$, $(3,3,5)$ — no right angles (requires generalizing Part B!)

Which parameters produce the most visually striking tilings? What happens as one parameter approaches infinity?

### Extra Challenge: The General (p,q,r) Case

When $p \neq 2$, the first edge is no longer the imaginary axis—it's a vertical geodesic at $x = -\cos(\pi/p)$. The unit circle edge stays the same, but the geometry of finding the third geodesic becomes more involved.

Generalize your implementation to handle arbitrary $(p,q,r)$ triangles. Test with $(3,3,4)$, for a tiling with no right angles.