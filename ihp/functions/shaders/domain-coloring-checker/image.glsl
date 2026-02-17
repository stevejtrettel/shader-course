// =============================================
//  IHP Shader Workshop 2026
//  DOMAIN COLORING — CHECKERBOARD
//
//  Pulls back a black-and-white checkerboard grid
//  through f(z). Makes geometric distortion visible:
//  area changes, angle changes, and conformality.
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
}

// =============================================
//  PARAMETERS
//
//  VIEW_RADIUS   — half-width of the view window
//  SUBDIVISIONS  — minor grid lines per unit square
// =============================================

#define VIEW_RADIUS   4.0
#define SUBDIVISIONS  4.0     // minor grid lines per unit square

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    uv *= VIEW_RADIUS;

    vec2 w = f(uv);

    // Major checkerboard on integer grid
    float check = mod(floor(w.x) + floor(w.y), 2.0);
    float base = mix(0.2, 0.8, check);

    // Subdivision grid within each square
    float subX = min(fract(w.x * SUBDIVISIONS), 1.0 - fract(w.x * SUBDIVISIONS));
    float subY = min(fract(w.y * SUBDIVISIONS), 1.0 - fract(w.y * SUBDIVISIONS));
    float subGrid = smoothstep(0.0, 0.04, min(subX, subY));
    float sub = mix(base * 0.7, base, subGrid);

    // Major grid lines at integers (darkest)
    float reGrid = min(fract(w.x), 1.0 - fract(w.x));
    float imGrid = min(fract(w.y), 1.0 - fract(w.y));
    float grid = smoothstep(0.0, 0.03, min(reGrid, imGrid));
    float col = mix(0.05, sub, grid);

    fragColor = vec4(vec3(col), 1.0);
}
