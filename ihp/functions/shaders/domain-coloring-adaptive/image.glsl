// =============================================
//  IHP Shader Workshop 2026
//  DOMAIN COLORING — ADAPTIVE GRID
//
//  Phase coloring with multi-scale adaptive grid
//  lines. Grid density adjusts to the local
//  derivative, fading finer subdivisions smoothly.
//  Common tab: complex arithmetic library.
// =============================================

// =============================================
//  YOUR FUNCTION
// =============================================

vec2 f(vec2 z) {
    return cdiv(csqr(z) - vec2(1, 0), z + vec2(0, 1));

    // Other things to try:
    // return csin(z);
    // return cexp(cinv(z));
    // return cpow(z, 3.0) - vec2(1, 0);
    // return cmul(z, clog(z));
    // return cdiv(cmul(z - vec2(1,0), z + vec2(0.5, 0.8)), z + vec2(1, 0));
}

// =============================================
//  PARAMETERS
//
//  VIEW_RADIUS    — half-width of the view window
//  GRID_STEPS     — subdivisions per octave
//  GRID_OPACITY   — 0 = no grid, 1 = full grid
//  SHADE_OPACITY  — 0 = no checkerboard, 1 = full
//  PHASE_AMOUNT   — 0 = grayscale, 1 = full color
//  LINE_WIDTH     — grid line thickness
//  LINE_FEATHER   — anti-aliasing softness
// =============================================

#define VIEW_RADIUS    4.0
#define GRID_STEPS     8.0    // subdivisions per octave
#define GRID_OPACITY   0.7    // 0 = no grid, 1 = full grid
#define SHADE_OPACITY  0.15   // 0 = no checkerboard, 1 = full checkerboard
#define PHASE_AMOUNT   1.0    // 0 = grayscale, 1 = full phase coloring
#define LINE_WIDTH     1.0
#define LINE_FEATHER   1.0

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

// Numerically careful hypot (avoids overflow near poles)
float hypot(vec2 z) {
    float x = abs(z.x);
    float y = abs(z.y);
    float t = min(x, y);
    x = max(x, y);
    if (x == 0.0) return 0.0;
    t = t / x;
    return x * sqrt(1.0 + t * t);
}

// Phase color via rainbow (cubehelix rainbow is defined in Common)
vec3 phaseColor(float arg) {
    float phase = arg / (2.0 * PI) + 0.5;
    return rainbow(phase);
}

// Grid helpers
vec2 gridFract(vec2 x) {
    return 2.0 * abs(fract(x - 0.5) - 0.5);
}

float checkerboard(vec2 xy) {
    vec2 fl = fract(xy * 0.5) * 2.0 - 1.0;
    return fl.x * fl.y > 0.0 ? 1.0 : 0.0;
}

// Adaptive multi-scale domain coloring
vec4 adaptiveDomainColoring(vec4 f_df) {
    const int octaves = 4;
    vec2 steps = vec2(GRID_STEPS);
    vec2 baseScale = vec2(10.0);

    float cmagRecip = 1.0 / hypot(f_df.xy);
    vec2 znorm = f_df.xy * cmagRecip;
    float cmagGradientMag = hypot(vec2(
        dot(znorm, f_df.zw),
        dot(vec2(znorm.y, -znorm.x), f_df.zw)
    ));

    float xContinuousScale = log2(cmagGradientMag) / log2(steps.x);
    float xDiscreteScale = floor(xContinuousScale);
    float yContinuousScale = log2(cmagGradientMag) / log2(steps.y);
    float yDiscreteScale = floor(yContinuousScale);

    vec2 scalePosition = 1.0 - vec2(xContinuousScale, yContinuousScale)
                       + vec2(xDiscreteScale, yDiscreteScale);
    vec2 scaleBase = vec2(
        pow(steps.x, -xDiscreteScale),
        pow(steps.y, -yDiscreteScale)
    ) / baseScale;

    float width1 = max(0.0, LINE_WIDTH - LINE_FEATHER);
    float width2 = LINE_WIDTH + LINE_FEATHER;

    float totalWeight = 0.0;
    float shading = 0.0;
    vec2 invSteps = 1.0 / steps;
    vec2 octaveScale = vec2(1.0);
    vec2 grid = vec2(0.0);
    vec2 gridScaleBase = vec2(
        pow(steps.x, scalePosition.x),
        pow(steps.y, scalePosition.y)
    );

    for (int i = 0; i < octaves; i++) {
        float w0 = i == 0 ? 1e-4 : 1.0 + float(i);
        float w1 = i == octaves - 1 ? 1e-4 : 1.0 + float(i + 1);
        float w = mix(w0, w1, scalePosition.x);
        totalWeight += w;

        vec2 value = f_df.xy * scaleBase * octaveScale;
        vec2 gridSlope = baseScale * gridScaleBase / octaveScale / steps;
        vec2 xygrid = gridFract(value) * gridSlope;

        grid += w * vec2(
            smoothstep(width2, width1, xygrid.x),
            smoothstep(width2, width1, xygrid.y)
        );
        shading += w * checkerboard(value);
        octaveScale *= invSteps;
    }

    shading /= totalWeight;
    grid /= totalWeight;
    grid *= GRID_OPACITY;

    float carg = atan(f_df.y, f_df.x);
    vec3 color = mix(vec3(1.0), phaseColor(carg), PHASE_AMOUNT);

    // Gamma-aware compositing
    const float gamma = 0.454;
    color = pow(color, vec3(gamma));
    color = mix(vec3(1), color, 0.97);

    float mixedGrid = max(grid.x, grid.y);
    float shade = mix(1.0, shading, SHADE_OPACITY);
    vec3 result = clamp(mix(color * shade, vec3(0.0), mixedGrid), vec3(0), vec3(1));

    result = pow(result, vec3(1.0 / gamma));
    return vec4(result, 1.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy - 0.5)
            * vec2(1.0, iResolution.y / iResolution.x) * VIEW_RADIUS * 2.0;

    vec2 fz = f(uv);

    // Derivative magnitudes via hardware derivatives
    vec4 fdf = vec4(fz, vec2(hypot(dFdx(fz)), hypot(dFdy(fz))));

    fragColor = adaptiveDomainColoring(fdf);
}
