// iChannel0 = Buffer A (nearest/clamp)
// iChannel1 = Buffer B (self, linear/clamp)

float drawPoint(vec2 uv, vec2 p) {
    return smoothstep(SIZE, SIZE * 0.5, length(uv - p));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    vec3 col = vec3(0.0);
    for (int i = 0; i < NUMBER; i++) {
        vec4 txt = texelFetch(iChannel0, ivec2(0, i), 0);
        vec2 p = txt.rg;
        col = mix(col, vec3(1.0), drawPoint(uv, p) * float(txt.b > 0.5));
    }

    vec3 prev = texture(iChannel1, fragCoord.xy / iResolution.xy).rgb;
    col = max(col, prev * MIX_FACTOR);
    fragColor = vec4(col, 1.0);
}
