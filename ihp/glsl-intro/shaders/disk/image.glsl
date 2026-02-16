void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    float d = length(uv);                    // distance to the origin
    float disk = smoothstep(0.51, 0.49, d);  // 1 inside, 0 outside, smooth edge

    vec3 col = vec3(disk);
    fragColor = vec4(col, 1.0);
}
