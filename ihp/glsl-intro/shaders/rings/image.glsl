void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    float d = length(uv);
    float rings = sin(20.0 * d - 3.0 * iTime);

    vec3 col = vec3(0.5 + 0.5 * rings);
    fragColor = vec4(col, 1.0);
}
