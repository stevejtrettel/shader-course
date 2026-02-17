// =============================================
//  IHP Shader Workshop 2026
//  LEVEL SETS — BASIC
//
//  Draws level curves of f(x,y) using a simple
//  fract threshold. No gradient correction — line
//  width varies with |∇f|. Compare with the
//  gradient-corrected version.
// =============================================

// =============================================
//  YOUR FUNCTION
// =============================================

float f(vec2 p) {
    return sin(p.x) * sin(p.y) + 0.5 * sin(p.x + p.y);
}

// =============================================
//  PARAMETERS
//
//  VIEW_RADIUS  — half-width of visible region
//  SPACING      — distance between level curves
//  LINE_WIDTH   — thickness of level curves (as fraction of spacing)
// =============================================

#define VIEW_RADIUS  6.0
#define SPACING      0.25
#define LINE_WIDTH   0.06

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

// Color ramp: blue for negative, white at zero, red for positive
vec3 colormap(float val) {
    float t = clamp(val * 0.3, -1.0, 1.0);
    if (t < 0.0) return mix(vec3(1.0), vec3(0.2, 0.4, 0.9), -t);
    else          return mix(vec3(1.0), vec3(0.9, 0.2, 0.2), t);
}

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
