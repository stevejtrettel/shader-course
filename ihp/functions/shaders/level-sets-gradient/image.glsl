// =============================================
// 2D LEVEL SETS — GRADIENT CORRECTED
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
#define LINE_PX      1.5      // line width in pixels

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

    // Numerical gradient via finite differences
    float eps = VIEW_RADIUS * 2.0 / iResolution.y; // one pixel in world coords
    float gradX = (f(uv + vec2(eps, 0.0)) - f(uv - vec2(eps, 0.0))) / (2.0 * eps);
    float gradY = (f(uv + vec2(0.0, eps)) - f(uv - vec2(0.0, eps))) / (2.0 * eps);
    float gradMag = length(vec2(gradX, gradY));

    // Color by value
    vec3 col = colormap(val);

    // Level curves with gradient-corrected width
    float valInCell = fract(val / SPACING);
    float distToLine = min(valInCell, 1.0 - valInCell) * SPACING; // distance in value
    float pixelDist = distToLine / (gradMag * eps);                // distance in pixels
    float line = smoothstep(0.0, LINE_PX, pixelDist);

    col *= 0.2 + 0.8 * line;

    fragColor = vec4(col, 1.0);
}
