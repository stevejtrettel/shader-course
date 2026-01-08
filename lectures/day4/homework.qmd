# Day 4 Exercises

## Checkpoints

**C1. Rainbow Paint.** Modify the painting shader so the brush paints in color instead of white. Use the position to determine the hue:

```glsl
vec3 hue = 0.5 + 0.5 * cos(6.28 * (fragCoord.x / iResolution.x) + vec3(0, 2, 4));
```

Or use time so the color cycles as you draw:

```glsl
vec3 hue = 0.5 + 0.5 * cos(iTime + vec3(0, 2, 4));
```

**C2. Click to Toggle.** Add mouse interaction to the Game of Life. When the mouse is pressed, toggle cells near the cursor between alive and dead:

```glsl
if (iMouse.z > 0.0) {
    float d = length(fragCoord - iMouse.xy);
    if (d < 5.0) {
        alive = 1.0 - self;  // toggle
    }
}
```

This lets you draw patterns into the simulation. Try drawing a glider!

**C3. Damped Waves.** Add friction to the wave equation. After computing `newV`, multiply by a decay factor:

```glsl
newV *= 0.998;
```

Waves still propagate and reflect, but lose energy over time. Try different values: 0.999 for slow decay, 0.99 for fast. With mouse interaction, you can keep adding energy to fight the damping.

**C4. Off-Center Pluck.** Move the initial Gaussian bump away from the center:

```glsl
vec2 pluck = iResolution.xy * 0.5 + vec2(150.0, 100.0);
float d = length(fragCoord - pluck);
float u = exp(-d * d / 1800.0);
```

The asymmetric position creates more complex patterns as waves hit different edges at different times.

**C5. Two Wave Sources.** Initialize with two Gaussian bumps:

```glsl
if (iFrame == 0) {
    vec2 center = iResolution.xy * 0.5;
    vec2 p1 = center + vec2(-80.0, 0.0);
    vec2 p2 = center + vec2(80.0, 0.0);
    float d1 = length(fragCoord - p1);
    float d2 = length(fragCoord - p2);
    float u = exp(-d1 * d1 / 1200.0) + exp(-d2 * d2 / 1200.0);
    fragColor = vec4(u, 0.0, 0.0, 1.0);
    return;
}
```

Watch the circular waves expand and interfere — bright where they add, dark where they cancel.

---

## Explorations

**E1. Brian's Brain.** Brian's Brain is a cellular automaton with three states:

- **Off** (0): Becomes **On** if exactly 2 neighbors are **On**
- **On** (1): Always becomes **Dying** next step
- **Dying** (2): Always becomes **Off** next step

On cells are like firing neurons — they fire once, go through a refractory period, then reset. This creates self-sustaining waves.

Store state as 0.0, 1.0, or 2.0 in the red channel. When counting neighbors, only count On cells:

```glsl
float isOn(float val) {
    return (val > 0.5 && val < 1.5) ? 1.0 : 0.0;
}
```

Initialize randomly across all three states:
```glsl
float r = hash(fragCoord);
float state = r < 0.33 ? 0.0 : (r < 0.66 ? 1.0 : 2.0);
```

In the Image shader, color each state differently — black for Off, white for On, blue for Dying.

**E2. Heat Equation.** The heat equation is simpler than the wave equation — it's first order in time:

$$\frac{\partial u}{\partial t} = \alpha \Delta u$$

where $\alpha$ is the diffusion coefficient. Heat spreads out; it doesn't bounce.

The discretization is straightforward:
```glsl
float laplacian = u_n + u_s + u_e + u_w - 4.0 * u;
float newU = u + dt * alpha * laplacian;
```

That's it — no velocity, just one quantity. Use a single buffer with displacement in the red channel.

Initialize with a hot disk in the center:
```glsl
if (iFrame == 0) {
    vec2 center = iResolution.xy * 0.5;
    float d = length(fragCoord - center);
    float temp = d < 80.0 ? 1.0 : 0.0;
    fragColor = vec4(temp, 0.0, 0.0, 1.0);
    return;
}
```

Try `alpha = 0.25` and `dt = 1.0`. Watch the sharp boundary blur out over time.

Add mouse interaction: when clicked, set nearby pixels to maximum temperature.

**E3. Heat Variations.** With the heat equation working, try different initial conditions:

*Ring of Fire:* Hot between two radii, cold elsewhere:
```glsl
float temp = (d > 60.0 && d < 100.0) ? 1.0 : 0.0;
```
Watch it diffuse both inward and outward.

*Two Hot Spots:* Two separated hot disks:
```glsl
vec2 c1 = center + vec2(-100.0, 0.0);
vec2 c2 = center + vec2(100.0, 0.0);
float temp = (length(fragCoord - c1) < 50.0 || 
              length(fragCoord - c2) < 50.0) ? 1.0 : 0.0;
```
Watch them diffuse and eventually merge.

*Spatially Varying Diffusion:* Make α depend on position:
```glsl
float alpha = 0.1 + 0.4 * step(iResolution.x * 0.5, fragCoord.x);
```
The right half diffuses faster. Can you create a barrier that heat flows around?

**E4. Stadium Waves.** A stadium is two semicircles connected by straight edges. Build the SDF by combining a box and two circles:

```glsl
float sdStadium(vec2 p, float halfLength, float radius) {
    p.x = abs(p.x);
    p.x -= halfLength;
    if (p.x < 0.0) p.x = 0.0;
    return length(p) - radius;
}
```

Use this as your wave equation boundary:
```glsl
bool inDomain(vec2 fragCoord, vec2 resolution) {
    vec2 center = resolution * 0.5;
    float scale = min(resolution.x, resolution.y) * 0.3;
    vec2 p = (fragCoord - center) / scale;
    return sdStadium(p, 0.8, 0.5) < 0.0;
}
```

Stadium billiards are chaotic — waves bounce unpredictably and eventually fill the whole domain. Click to add ripples and watch the chaos develop.

---

## Challenges

**H1. Velocity Brush.** Make brush size depend on how fast the mouse is moving. Fast strokes → thick lines; slow strokes → thin lines (or vice versa).

The problem: shaders don't remember the previous mouse position. But buffers do! You can hide state in a pixel that's not visible — say, pixel (0, 0).

**Step 1:** In Buffer A, check if we're at the storage pixel:
```glsl
if (fragCoord.x < 1.0 && fragCoord.y < 1.0) {
    // This pixel stores the previous mouse position
    fragColor = vec4(iMouse.xy, 0.0, 1.0);
    return;
}
```

**Step 2:** Read the previous position and compute velocity:
```glsl
vec2 prevMouse = texelFetch(iChannel0, ivec2(0, 0), 0).xy;
vec2 velocity = iMouse.xy - prevMouse;
float speed = length(velocity);
```

**Step 3:** Use speed to set brush size:
```glsl
float brushSize = 5.0 + speed * 0.5;  // adjust multiplier to taste
if (iMouse.z > 0.0 && d < brushSize) {
    // paint
}
```

Experiment with the mapping — linear, square root, clamped. Try inverting it so slow = big, fast = small (like a calligraphy pen with pressure).

**H2. Symmetry Painting.** Combine Day 3's folding with Day 4's buffers to make a kaleidoscope paint program.

The idea: the buffer stores paint in a fundamental domain. The Image shader folds coordinates before reading, creating tiled reflections.

**Step 1:** Buffer A is a normal paint shader — nothing special.

**Step 2:** In the Image shader, fold the coordinates before reading:
```glsl
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 center = iResolution.xy * 0.5;
    vec2 p = fragCoord - center;
    
    // Fold into fundamental domain (use your Day 3 code)
    // Example: 4-fold mirror symmetry
    p = abs(p);
    
    vec2 foldedCoord = p + center;
    fragColor = texelFetch(iChannel0, ivec2(foldedCoord), 0);
}
```

Try different symmetries:
- `p = abs(p)` — 4-fold mirror (rectangular)
- 6-fold by folding across 60° lines
- Use your triangle folding from Day 3 for wallpaper groups

The painting only happens in one region, but appears everywhere.

**H3. Gray-Scott Reaction-Diffusion.** Two chemicals react and diffuse, producing spots, stripes, and labyrinths.

$$\frac{\partial u}{\partial t} = D_u \Delta u - uv^2 + f(1-u)$$
$$\frac{\partial v}{\partial t} = D_v \Delta v + uv^2 - (f+k)v$$

Think of $u$ as food and $v$ as catalyst. The catalyst consumes food to replicate ($uv^2$ terms), fresh food is added ($f(1-u)$), and catalyst dies ($(f+k)v$).

Use one buffer with two channels — red for $u$, green for $v$:
```glsl
float Du = 0.2, Dv = 0.1;
float f = 0.04, k = 0.06;
float dt = 1.0;

vec2 uv = texelFetch(iChannel0, p, 0).rg;
float u = uv.x, v = uv.y;

// Laplacians for both
float lap_u = u_n + u_s + u_e + u_w - 4.0 * u;
float lap_v = v_n + v_s + v_e + v_w - 4.0 * v;

float uvv = u * v * v;
float newU = u + dt * (Du * lap_u - uvv + f * (1.0 - u));
float newV = v + dt * (Dv * lap_v + uvv - (f + k) * v);

fragColor = vec4(clamp(newU, 0.0, 1.0), clamp(newV, 0.0, 1.0), 0.0, 1.0);
```

Initialize with $u = 1$ everywhere and a small patch of $v$ in the center.

Different $(f, k)$ give different patterns:
- $(0.04, 0.06)$: mitosis (dividing spots)
- $(0.035, 0.065)$: coral growth
- $(0.025, 0.05)$: stripes and labyrinths

Be patient — patterns take hundreds of frames to develop.

**H4. Integration Methods.** We use symplectic Euler because forward Euler blows up. See it for yourself.

**Part A:** Change the wave equation to forward Euler:
```glsl
// Forward Euler (unstable!)
float newU = u + dt * v;
float newV = v + dt * c * c * laplacian;
```

Both updates use old values. Run it — within seconds, the simulation explodes.

**Part B:** Implement Verlet integration. Verlet doesn't store velocity explicitly — just current and previous position:
$$u^{n+1} = 2u^n - u^{n-1} + dt^2 \cdot c^2 \cdot \Delta u^n$$

Store current $u$ in red, previous $u$ in green:
```glsl
float u = texelFetch(iChannel0, p, 0).r;
float u_prev = texelFetch(iChannel0, p, 0).g;

// ... compute laplacian ...

float u_new = 2.0 * u - u_prev + dt * dt * c * c * laplacian;
fragColor = vec4(u_new, u, 0.0, 1.0);  // current becomes previous
```

Verlet is also symplectic and conserves energy. Compare it to symplectic Euler — which looks better?

**H5. Physical Coordinates.** Our simulations use pixel coordinates with grid spacing $h = 1$. This means physics looks different at different window sizes.

Make it resolution-independent:

**Step 1:** Define a physical domain, say $[-2, 2] \times [-2, 2]$:
```glsl
float L = 2.0;
float scale = min(iResolution.x, iResolution.y) / (2.0 * L);
vec2 phys = (fragCoord - iResolution.xy * 0.5) / scale;
```

**Step 2:** Compute actual grid spacing:
```glsl
float h = 2.0 * L / min(iResolution.x, iResolution.y);
```

**Step 3:** The Laplacian assumed $h = 1$. Correct it:
```glsl
float laplacian = (u_n + u_s + u_e + u_w - 4.0 * u) / (h * h);
```

**Step 4:** Adjust timestep for stability: $dt < h/c$ for waves, $dt < h^2/(4\alpha)$ for heat.

Test by resizing the window — the physics should look the same, just more or less detailed.

---

## Projects

**P1. Optics Simulation.** The wave equation has a wave speed $c$. So far we've used a constant $c$, but what if it varies with position? This is how light behaves in materials — it slows down in glass, water, diamond.

The wave equation becomes:
$$\frac{\partial^2 u}{\partial t^2} = c(x,y)^2 \Delta u$$

In the shader, just make `c` depend on position:
```glsl
float c = 1.0;
if (inGlass(fragCoord)) {
    c = 0.6;  // slower in glass
}
float newV = v + dt * c * c * laplacian;
```

**Part A: Rectangular Pane.** Start with a vertical stripe of "glass":
```glsl
bool inGlass(vec2 p) {
    return abs(p.x - iResolution.x * 0.5) < 50.0;
}
```

Send a plane wave from the left (initialize a vertical stripe of displacement). Watch it slow down inside the glass, then speed up again when it exits.

**Part B: Refraction.** Send a wave at an angle to the glass boundary. You should see it bend — Snell's law emerges naturally from the wave equation! The wave bends toward the normal when entering slower material.

**Part C: Circular Lens.** Replace the rectangular pane with a circle:
```glsl
bool inGlass(vec2 p) {
    vec2 center = iResolution.xy * 0.5;
    return length(p - center) < 100.0;
}
```

Send in plane waves. A convex region of slow material acts as a converging lens — waves focus on the far side!

**Part D: Varyind Index of Refraction.** Simulating a material with spatially varying index of refraction is simple in shadertoy - as everythign is already done per-pixel!  Here we build a lens out of a varyinhg index of refraction medium, where the index varies between 1 and 1.5, exponentially decreasing away from the center.


```glsl
float n = 1.0 + 0.5 * exp(-d * d / 5000.0);  // higher index at center
float c = 1.0 / n;
```

This creates focusing without any sharp boundary.

**Extensions:**
- Add absorption (multiply $u$ by a decay factor in the glass region)
- Build a Fresnel lens (concentric rings of glass)
- Simulate total internal reflection by sending waves from inside glass to outside at a steep angle