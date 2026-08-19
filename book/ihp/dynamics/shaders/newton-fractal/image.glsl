// =============================================
//  IHP Shader Workshop 2026
//  NEWTON'S METHOD FRACTAL
//
//  Newton iteration for f(z) = 0. Each pixel is
//  colored by which root it converges to; darkness
//  shows iteration count. Basin boundaries are
//  fractal.
// =============================================

// =============================================
//  YOUR MAP
// =============================================

// Complex arithmetic
vec2 cmul(vec2 a, vec2 b) {
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}
vec2 cdiv(vec2 a, vec2 b) {
    return vec2(a.x*b.x + a.y*b.y, a.y*b.x - a.x*b.y) / dot(b, b);
}

// The function and its derivative
vec2 f(vec2 z) {
    // z³ - 1  (three roots: cube roots of unity)
    return cmul(z, cmul(z, z)) - vec2(1.0, 0.0);

    // z⁴ - 1  (four roots, four basins)
    // vec2 z2 = cmul(z, z);
    // return cmul(z2, z2) - vec2(1.0, 0.0);

    // z³ - 2z + 2  (three asymmetric roots)
    // return cmul(z, cmul(z, z)) - 2.0 * z + vec2(2.0, 0.0);

    // z⁵ - 1  (five-fold symmetry)
    // vec2 z2 = cmul(z, z); vec2 z4 = cmul(z2, z2);
    // return cmul(z4, z) - vec2(1.0, 0.0);
}

vec2 df(vec2 z) {
    // 3z²
    return 3.0 * cmul(z, z);

    // 4z³
    // return 4.0 * cmul(z, cmul(z, z));

    // 3z² - 2
    // return 3.0 * cmul(z, z) - vec2(2.0, 0.0);

    // 5z⁴
    // vec2 z2 = cmul(z, z);
    // return 5.0 * cmul(z2, z2);
}

// =============================================
//  PARAMETERS
//
//  MAX_ITER  — iteration limit
//  TOL       — convergence tolerance
// =============================================

const int MAX_ITER = 50;
const float TOL = 1e-6;

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

vec3 hsv2rgb(float h, float s, float v) {
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return v * mix(vec3(1.0), c, s);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    vec2 z = uv * 2.0;

    int i;
    for (i = 0; i < MAX_ITER; i++) {
        vec2 fz = f(z);
        if (dot(fz, fz) < TOL) break;
        z -= cdiv(fz, df(z));
    }

    // Color by the angle of the root, shade by iteration count
    float hue = atan(z.y, z.x) / 6.28318 + 0.5;
    float shade = 1.0 - 0.7 * float(i) / float(MAX_ITER);
    vec3 color = hsv2rgb(hue, 0.7, shade);

    fragColor = vec4(color, 1.0);
}
