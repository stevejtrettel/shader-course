// =============================================
//  IHP Shader Workshop 2026
//  JULIA SETS
//
//  Filled Julia set of z² + c. Each pixel is a
//  starting point z; c is set by the mouse (or
//  animates). Click and drag to explore the
//  Mandelbrot/Julia correspondence.
// =============================================

// =============================================
//  YOUR PALETTE
// =============================================

// Cosine palette (same as Mandelbrot shader)
vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 freq = vec3(1.0, 0.7, 0.4);
    vec3 phase = vec3(0.0, 0.15, 0.2);
    return a + b * cos(6.28318 * (freq * t + phase));
}

// =============================================
//  PARAMETERS
//
//  MAX_ITER   — iteration limit (higher → finer detail, slower)
//  C_DEFAULT  — parameter c before first click (Douady rabbit)
// =============================================

const int MAX_ITER = 200;

// Default c before first click (Douady rabbit)
const vec2 C_DEFAULT = vec2(-0.7, 0.27);

// Other interesting values:
// vec2(-0.8, 0.156)    — dendrite
// vec2(0.285, 0.01)    — Siegel disk
// vec2(-0.12, 0.74)    — near the main antenna
// vec2(0.36, 0.1)      — disconnected, spiraling

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    // c from mouse position (same coordinate mapping as Mandelbrot shader)
    vec2 c;
    if (iMouse.x == 0.0 && iMouse.y == 0.0) {
        c = C_DEFAULT;
    } else {
        vec2 mouse = (2.0 * iMouse.xy - iResolution.xy) / iResolution.y;
        c = mouse * 1.5 - vec2(0.5, 0.0);
    }

    // z starts at the pixel position
    vec2 z = uv * 1.5;
    int i;
    for (i = 0; i < MAX_ITER; i++) {
        z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
        if (dot(z, z) > 256.0) break;
    }

    vec3 color = vec3(0.0);
    if (i < MAX_ITER) {
        float sl = float(i) - log2(log2(dot(z, z))) + 4.0;
        color = palette(sl * 0.025);
    }

    fragColor = vec4(color, 1.0);
}
