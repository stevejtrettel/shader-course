// =============================================
//  IHP Shader Workshop 2026
//  VECTOR FIELD — DIRECTION/MAGNITUDE COLORING
//
//  Hue from direction, brightness from magnitude.
//  Singularities appear as dark points where all
//  colors converge.
// =============================================

// =============================================
//  YOUR VECTOR FIELD
// =============================================

vec2 V(vec2 p) {
    // Rotation + source: a spiral
    return vec2(-p.y, p.x) + 0.5 * p;

    // Other things to try:
    // return vec2(-p.y, p.x);                      // pure rotation
    // return p;                                      // source at origin
    // return -p;                                     // sink at origin
    // return vec2(p.x, -p.y);                       // saddle
    // return vec2(p.y, -sin(p.x));                  // pendulum phase portrait
    // return vec2(p.x - p.x*p.y, -p.y + p.x*p.y); // Lotka-Volterra
    // return vec2(sin(p.y), sin(p.x));              // doubly periodic
}

// =============================================
//  PARAMETERS
//
//  VIEW_RADIUS — half-width of the visible window
// =============================================

#define PI 3.14159265359
#define VIEW_RADIUS 5.0

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

// Cubehelix rainbow (same as domain coloring)
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

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    uv *= VIEW_RADIUS;

    vec2 v = V(uv);
    float mag = length(v);
    float angle = atan(v.y, v.x);

    // Hue from direction
    float phase = angle / (2.0 * PI) + 0.5;
    vec3 col = rainbow(phase);

    // Brightness from magnitude (sigmoid compression)
    float brightness = mag / (1.0 + mag);
    col *= 0.1 + 0.9 * brightness;

    fragColor = vec4(col, 1.0);
}
