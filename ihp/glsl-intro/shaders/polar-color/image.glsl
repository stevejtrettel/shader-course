// IHP Shader Workshop 2026
// Polar colors — angle to hue, radius to brightness rings.
// A preview of domain coloring: the identity map in polar coordinates.

#define PI 3.14159265

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    uv *= 3.0;

    float angle = atan(uv.y, uv.x);    // -pi to pi
    float r = length(uv);

    // Map angle to hue via three offset cosines
    float phase = angle / (2.0 * PI) + 0.5;
    vec3 col = 0.5 + 0.5 * cos(2.0 * PI * phase + vec3(0.0, 2.094, 4.189));

    // Logarithmic radial rings
    col *= 0.7 + 0.3 * cos(2.0 * PI * log2(max(r, 0.001)));

    // Fade near origin where angle is undefined
    col *= smoothstep(0.0, 0.3, r);

    fragColor = vec4(col, 1.0);
}
