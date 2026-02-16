void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    // Distance to the unit circle: | |p| - 1 |
    float d = abs(length(uv) - 1.0);

    // Pixel size in world coordinates
    float px = 2.0 / iResolution.y;

    // 1 within ~1.5 pixels of the curve, 0 elsewhere
    float circle = smoothstep(1.5 * px, 0.5 * px, d);

    fragColor = vec4(vec3(circle), 1.0);
}
