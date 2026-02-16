// =============================================
// DOMAIN COLORING — STANDARD
// =============================================
// Common tab: complex arithmetic + complexToColor
// No channels needed

// =============================================
// EDIT HERE: Define your complex function f(z)
// =============================================

vec2 f(vec2 z) {
    // (z^2 - 1) / (z + i)
    return cdiv(csqr(z) - vec2(1, 0), z + vec2(0, 1));

    // Other things to try:
    // return csin(z);                              // complex sine
    // return cexp(cinv(z));                         // essential singularity at 0
    // return cmul(z, clog(z));                      // z * log(z)
    // return cpow(z, 3.0) - vec2(1, 0);            // z^3 - 1
    // return cdiv(vec2(1,0), csqr(z) + vec2(1,0)); // 1/(z^2+1)
}

// =============================================
// PARAMETERS
// =============================================

#define VIEW_RADIUS  4.0

// =============================================
// MAIN
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    uv *= VIEW_RADIUS;

    vec2 w = f(uv);
    vec3 col = complexToColor(w);

    fragColor = vec4(col, 1.0);
}
