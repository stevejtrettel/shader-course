// =============================================
//  IHP Shader Workshop 2026
//  MANDELBROT SET
//
//  Escape-time coloring of z² + c. Each pixel
//  is a parameter c; the orbit of 0 is iterated.
//  Smooth coloring via the log-log formula.
// =============================================

// =============================================
//  YOUR PALETTE
// =============================================

// Cosine palette (see Inigo Quilez, "palettes")
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
//  MAX_ITER  — iteration limit (higher → finer detail, slower)
// =============================================

const int MAX_ITER = 200;

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    vec2 c = uv * 1.5 - vec2(0.5, 0.0);

    // Iterate z → z² + c from z = 0
    vec2 z = vec2(0.0);
    int i;
    for (i = 0; i < MAX_ITER; i++) {
        z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
        if (dot(z, z) > 256.0) break;
    }

    vec3 color = vec3(0.0);
    if (i < MAX_ITER) {
        // Smooth iteration count: avoids banding
        float sl = float(i) - log2(log2(dot(z, z))) + 4.0;
        color = palette(sl * 0.025);
    }

    fragColor = vec4(color, 1.0);
}
