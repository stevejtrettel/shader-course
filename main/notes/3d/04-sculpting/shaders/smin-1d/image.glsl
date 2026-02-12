float sdCircle(vec2 p, vec2 center, float r) {
    return length(p - center) - r;
}

float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    vec2 p = uv * 3.0;

    float d1 = sdCircle(p, vec2(-0.7, 0.0), 1.0);
    float d2 = sdCircle(p, vec2(0.7, 0.0), 1.0);

    // Left half: hard min. Right half: smooth min.
    float d;
    if (uv.x < 0.0) {
        d = min(d1, d2);
    } else {
        d = smin(d1, d2, 0.5);
    }

    // Color by sign
    vec3 color;
    if (d < 0.0) {
        color = vec3(0.2, 0.4, 0.8);
    } else {
        color = vec3(0.9, 0.6, 0.2);
    }

    // Darken near boundary
    color *= 1.0 - exp(-6.0 * abs(d));

    // Contour lines
    float contour = abs(fract(d * 4.0 + 0.5) - 0.5);
    color = mix(vec3(1.0), color, smoothstep(0.0, 0.05, contour));

    // Zero set
    color = mix(vec3(1.0), color, smoothstep(0.0, 0.02, abs(d)));

    // Divider line
    color = mix(vec3(0.5), color, smoothstep(0.0, 0.02, abs(uv.x)));

    fragColor = vec4(color, 1.0);
}
