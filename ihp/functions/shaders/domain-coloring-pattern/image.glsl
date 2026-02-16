// =============================================
// DOMAIN COLORING — THE PATTERN
// =============================================
// The color scheme applied to the identity f(z) = z.
// Hue encodes argument, brightness from modulus.
// No channels, no Common tab needed.

// =============================================
// PARAMETERS
// =============================================

#define PI 3.14159265359
#define VIEW_RADIUS 4.0

// =============================================
// COLOR
// =============================================

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

vec3 rainbow(float t) {
    if (t < 0.0 || t > 1.0) t -= floor(t);
    float ts = abs(t - 0.5);
    return cubehelix(360.0 * t - 100.0, 1.5 - 1.5 * ts, 0.8 - 0.9 * ts);
}

vec3 complexToColor(vec2 w) {
    float arg = atan(w.y, w.x);
    float mag = length(w);

    float phase = arg / (2.0 * PI) + 0.5;
    vec3 col = rainbow(phase);

    float rings = 0.5 + 0.5 * sin(2.0 * PI * log2(mag + 0.001));
    col *= 0.7 + 0.3 * rings;

    return col;
}

// =============================================
// MAIN
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    uv *= VIEW_RADIUS;

    vec3 col = complexToColor(uv);
    fragColor = vec4(col, 1.0);
}
