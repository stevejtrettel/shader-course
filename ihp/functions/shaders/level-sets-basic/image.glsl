// =============================================
// 2D LEVEL SETS — BASIC
// =============================================
// Paste into Shadertoy (no channels needed)

// =============================================
// EDIT HERE: Define your function f(x, y)
// =============================================

float f(vec2 p) {
    return sin(p.x) * sin(p.y) + 0.5 * sin(p.x + p.y);
}

// =============================================
// PARAMETERS
// =============================================

#define VIEW_RADIUS  6.0      // half-width of visible region
#define SPACING      0.25     // distance between level curves
#define LINE_WIDTH   0.06     // thickness of level curves (as fraction of spacing)

// Color ramp: blue for negative, white at zero, red for positive
vec3 colormap(float val) {
    float t = clamp(val * 0.3, -1.0, 1.0);
    if (t < 0.0) return mix(vec3(1.0), vec3(0.2, 0.4, 0.9), -t);
    else          return mix(vec3(1.0), vec3(0.9, 0.2, 0.2), t);
}

// =============================================
// MAIN
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    uv *= VIEW_RADIUS;

    float val = f(uv);

    // Color by value
    vec3 col = colormap(val);

    // Level curves: check if val is near a multiple of SPACING
    float inCell = fract(val / SPACING);          // 0 to 1 within each band
    float distToLine = min(inCell, 1.0 - inCell); // distance to nearest edge
    float line = smoothstep(0.0, LINE_WIDTH, distToLine);

    col *= 0.2 + 0.8 * line; // darken near level curves

    fragColor = vec4(col, 1.0);
}
