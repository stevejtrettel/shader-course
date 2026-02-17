// =============================================
//  IHP Shader Workshop 2026
//  COMPLEX ARITHMETIC LIBRARY (Common tab)
//
//  Shared utilities: cmul, cdiv, cexp, clog, cpow,
//  csin, ccos, csqr, cinv, rainbow, complexToColor.
//  Used by all domain coloring shaders.
// =============================================

#define PI 3.14159265359

vec2 cmul(vec2 a, vec2 b) {
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

vec2 cdiv(vec2 a, vec2 b) {
    return vec2(a.x*b.x + a.y*b.y, a.y*b.x - a.x*b.y) / dot(b, b);
}

vec2 csqr(vec2 z) {
    return vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y);
}

vec2 cconj(vec2 z) {
    return vec2(z.x, -z.y);
}

vec2 cexp(vec2 z) {
    return exp(z.x) * vec2(cos(z.y), sin(z.y));
}

vec2 clog(vec2 z) {
    return vec2(log(length(z)), atan(z.y, z.x));
}

vec2 cpow(vec2 z, float n) {
    float r = length(z);
    float theta = atan(z.y, z.x);
    return pow(r, n) * vec2(cos(n*theta), sin(n*theta));
}

vec2 cpow(vec2 z, vec2 w) {
    return cexp(cmul(w, clog(z)));
}

vec2 csin(vec2 z) {
    return vec2(sin(z.x)*cosh(z.y), cos(z.x)*sinh(z.y));
}

vec2 ccos(vec2 z) {
    return vec2(cos(z.x)*cosh(z.y), -sin(z.x)*sinh(z.y));
}

vec2 csqrt(vec2 z) {
    float r = length(z);
    float theta = atan(z.y, z.x);
    return sqrt(r) * vec2(cos(theta/2.0), sin(theta/2.0));
}

vec2 cinv(vec2 z) {
    return cconj(z) / dot(z, z);
}

// Mobius transformation (az+b)/(cz+d)
vec2 mobius(vec2 a, vec2 b, vec2 c, vec2 d, vec2 z) {
    return cdiv(cmul(a, z) + b, cmul(c, z) + d);
}

// =============================================
// COLOR UTILITIES
// =============================================

// Cubehelix color space (from d3-color, Mike Bostock)
vec3 cubehelix(float h, float s, float l) {
    float a = s * l * (1.0 - l);
    float hr = (h + 120.0) * PI / 180.0;
    float co = cos(hr), si = sin(hr);
    return clamp(vec3(
        l + a * (-0.14861 * co + 1.78277 * si),
        l + a * (-0.29227 * co - 0.90649 * si),
        l + a * (1.97294 * co)
    ), 0.0, 1.0);
}

// d3 rainbow colormap — perceptually uniform hue cycle
vec3 rainbow(float t) {
    if (t < 0.0 || t > 1.0) t -= floor(t);
    float ts = abs(t - 0.5);
    return cubehelix(360.0 * t - 100.0, 1.5 - 1.5 * ts, 0.8 - 0.9 * ts);
}

vec3 complexToColor(vec2 w) {
    float arg = atan(w.y, w.x);
    float mag = length(w);

    // Phase coloring via rainbow
    float phase = arg / (2.0 * PI) + 0.5;
    vec3 col = rainbow(phase);

    // Modulus rings
    float rings = 0.5 + 0.5 * sin(2.0 * PI * log2(mag + 0.001));
    col *= 0.7 + 0.3 * rings;

    return col;
}
