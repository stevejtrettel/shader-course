float sdBox(vec2 p, vec2 halfSize) {
    vec2 q = abs(p) - halfSize;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    vec2 p = uv * 3.0;

    vec2 halfSize = vec2(1.0, 0.6);
    float d = sdBox(p, halfSize);

    // Classify region using the excess vector
    vec2 q = abs(p) - halfSize;

    vec3 color;
    if (q.x > 0.0 && q.y > 0.0) {
        // Corner region
        color = vec3(0.85, 0.3, 0.25);
    } else if (q.x > 0.0 || q.y > 0.0) {
        // Edge region
        color = vec3(0.3, 0.7, 0.3);
    } else {
        // Inside
        color = vec3(0.2, 0.4, 0.8);
    }

    // Darken near the boundary
    color *= 1.0 - exp(-6.0 * abs(d));

    // Contour lines
    float contour = abs(fract(d * 4.0 + 0.5) - 0.5);
    color = mix(vec3(1.0), color, smoothstep(0.0, 0.05, contour));

    // Highlight the zero level set
    color = mix(vec3(1.0), color, smoothstep(0.0, 0.02, abs(d)));

    fragColor = vec4(color, 1.0);
}
