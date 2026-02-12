float sdCircle(vec2 p, vec2 center, float r) {
    return length(p - center) - r;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    vec2 p = uv * 3.0;

    float d1 = sdCircle(p, vec2(-0.7, 0.0), 1.0);
    float d2 = sdCircle(p, vec2(0.7, 0.0), 1.0);
    float d = min(d1, d2);

    // Color by sign
    vec3 color;
    if (d < 0.0) {
        color = vec3(0.2, 0.4, 0.8);
    } else {
        color = vec3(0.9, 0.6, 0.2);
    }

    // Darken near boundary
    color *= 1.0 - exp(-6.0 * abs(d));

    // Contour lines — the crease is visible where contours have a corner
    float contour = abs(fract(d * 4.0 + 0.5) - 0.5);
    color = mix(vec3(1.0), color, smoothstep(0.0, 0.05, contour));

    // Zero set
    color = mix(vec3(1.0), color, smoothstep(0.0, 0.02, abs(d)));

    // Highlight the seam where d1 == d2
    float seam = abs(d1 - d2);
    color = mix(vec3(1.0, 0.3, 0.3), color, smoothstep(0.0, 0.05, seam));

    fragColor = vec4(color, 1.0);
}
