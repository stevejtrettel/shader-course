# Intro to GLSL

With the conceptual framework in place — a shader is a function from pixel coordinates to colors, evaluated in parallel across the screen — we need just enough of the language to start writing them.
This section covers the basics of GLSL and works through a handful of small examples.
The goal is not fluency in the language; it's comfort with the pattern, so the prewritten shaders in the rest of the workshop make sense on first reading.

We'll write all our shaders in [Shadertoy](https://www.shadertoy.com), a web-based environment for fragment shaders.
There's nothing to install — you open the site, type code in the editor, and hit play.

The interface is a single function called `mainImage`:

```glsl
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // fragCoord: pixel coordinates (e.g. 0 to 1920)
    // fragColor: output color (red, green, blue, alpha), each 0 to 1
}
```

It receives the pixel's coordinates as input, you assign a color as output, and the GPU calls it at every pixel, in parallel, every frame.
Everything else is what you do inside this function.


## Coordinates

The first thing you'll do in essentially every shader is convert from pixel coordinates to something mathematically useful.
`fragCoord` gives you raw pixel positions — `(0, 0)` is the bottom-left corner, and values go up to `iResolution.xy`, which is the canvas size in pixels.

The standard move is to center the origin and normalize so the y-axis runs from $-1$ to $1$:

```glsl
vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
```

Now `uv` is a centered, aspect-corrected coordinate system: $(0,0)$ is the middle of the screen, $y$ ranges from $-1$ to $1$, and $x$ ranges a bit wider depending on the aspect ratio.

Shadertoy also provides `iTime`, a float that counts seconds since the shader started, which you use for animation.


## A Little Bit of GLSL

GLSL — the language shaders are written in — looks a lot like C, and you don't need much of it for what we're doing.
Here are the essentials.

The basic types are `float`, `int`, `vec2`, `vec3`, and `vec4`.
A `vec2` is a pair of floats, a `vec3` is a triple, and so on.
You access components with `.x`, `.y`, `.z`, `.w`, and you can swizzle: `v.xy` gives you the first two components of a `vec3` as a `vec2`.

All the standard math functions exist: `sin`, `cos`, `exp`, `log`, `abs`, `min`, `max`, `pow`.
They work component-wise on vectors, so `sin(v)` where `v` is a `vec3` gives you `vec3(sin(v.x), sin(v.y), sin(v.z))`.

There are also some functions you might not have seen before: `length(v)` computes $|v|$, `dot(u,v)` is the dot product, `normalize(v)` returns $v/|v|$, `mix(a, b, t)` is the linear interpolation $(1-t)a + tb$.

One more: `smoothstep(a, b, x)` is a $C^1$ ramp from 0 to 1 as $x$ goes from $a$ to $b$ — we use it constantly for antialiased edges.

The best way to learn more GLSL is by reading shaders.


## Examples

Let's build up from the simplest possible program to something that starts to feel like mathematics.

### A Gradient

The simplest shader just uses the pixel coordinates directly as color.
The red channel increases left to right, green increases bottom to top:

```glsl
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    fragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}
```

This isn't mathematically interesting, but it confirms the pipeline: you're writing a function from $[0,1]^2$ to RGB, and the GPU is evaluating it at every pixel.

::shader{src="gradient" layout="tabbed"}


### A Disk

Now something geometric.
We center our coordinates, compute the distance from the origin, and check whether it's less than $0.5$:

```glsl
vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
float d = length(uv);
float disk = smoothstep(0.51, 0.49, d);  // 1 inside, 0 outside
```

The `smoothstep` handles the boundary — instead of a hard binary test (which would produce jagged pixel edges), the transition ramps smoothly over about two pixels.
Note the reversed arguments: `smoothstep(0.51, 0.49, d)` is 1 when `d` is small and 0 when `d` is large.

::shader{src="disk" layout="tabbed"}


### Drawing a Circle

The disk filled a region.
But what if we want to draw a *curve* — a one-dimensional object in a two-dimensional image?

The trick: compute the *distance to the curve* and threshold.
For the unit circle, the distance from $(x,y)$ to the nearest point on the circle is $\bigl| \sqrt{x^2 + y^2} - 1 \bigr|$.
Where this distance is within about one pixel, we light up:

```glsl
float d = abs(length(uv) - 1.0);       // distance to the unit circle
float px = 2.0 / iResolution.y;         // one pixel in world coords
float circle = smoothstep(1.5*px, 0.5*px, d);
```

This is the technique that powers everything in the workshop.
To draw the zero set of a function $f$, compute $|f|/|\nabla f|$ (the distance to the zero set, to first order) and threshold.
The gradient correction makes the line width consistent regardless of how $f$ behaves — we'll develop this carefully in the level sets section.

::shader{src="circle" layout="tabbed"}


### Animated Rings

Add `iTime` and you have animation.
Every pixel evaluates $\sin(20r - 3t)$ independently — there's no state, no communication between pixels, just a function of position and time:

::shader{src="rings" layout="tabbed"}


### Polar Colors

To close this section: a shader that maps polar coordinates to color.
The angle $\theta = \operatorname{atan2}(y, x)$ determines hue, and the radius $r$ modulates brightness through logarithmic rings.

This is a preview of *domain coloring* — the technique we'll use for complex functions.
The idea is to paint the plane with a pattern that encodes position as color, and then pull that pattern back through a function to see what it does.
Here we're just looking at the pattern itself, applied to the identity.

::shader{src="polar-color" layout="tabbed"}


## Using the Workshop Shaders

With the syntax out of the way, the rest of this workshop is a collection of prewritten shaders.
They're meant to be used, not just read — open them in Shadertoy, change the function at the top, and see what happens.

Every shader is structured the same way.
At the top of the file there's a clearly marked block where you enter your math: a function, a vector field, a recurrence relation, whatever the shader visualizes.
Below that is the visualization code.
You don't need to read or understand the code below the line to use the shader — just edit the top block and hit play.

Some shaders use Shadertoy's **Common** tab.
This is code that's shared across all tabs in a shader, and we use it as a math library: complex arithmetic, Möbius transformations, hyperbolic distance, and so on.
If you want to use `cmul(z, w)` or `mobius(a, b, c, d, z)` in your function at the top, that's where they're defined.
Think of it as an `#include`.

A few of the shaders use multiple passes — **Buffer A** does a computation (like one timestep of a PDE), and the **Image** tab reads the result and turns it into a picture.
Shadertoy handles the plumbing; you just need to make sure the tabs and channels are set up as described in each shader's header.
