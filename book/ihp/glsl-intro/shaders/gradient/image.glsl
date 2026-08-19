// IHP Shader Workshop 2026
// A gradient — pixel coordinates mapped directly to color.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    fragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}
