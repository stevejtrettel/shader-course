// Materials — Fresnel Graph
// Exact Fresnel vs Schlick approximation for water, glass, diamond.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float theta = uv.x * 1.5708;  // 0 to pi/2
    float plotY = uv.y;

    vec3 color = vec3(0.12);

    // Grid
    for (float g = 0.2; g <= 0.8; g += 0.2) {
        color += vec3(0.06) * smoothstep(0.003, 0.001, abs(plotY - g));
        color += vec3(0.06) * smoothstep(0.003, 0.001, abs(uv.x - g));
    }

    float cosT = cos(theta);
    float sinT = sin(theta);

    float iors[3];
    iors[0] = 1.33;  // water
    iors[1] = 1.5;   // glass
    iors[2] = 2.42;  // diamond

    vec3 curveColors[3];
    curveColors[0] = vec3(0.3, 0.5, 0.9);
    curveColors[1] = vec3(0.3, 0.8, 0.4);
    curveColors[2] = vec3(0.9, 0.4, 0.3);

    for (int i = 0; i < 3; i++) {
        float n = iors[i];
        float f0 = pow((n - 1.0) / (n + 1.0), 2.0);

        // Exact Fresnel
        float sinT2 = sinT / n;
        float exact;
        if (sinT2 >= 1.0) {
            exact = 1.0;
        } else {
            float cosT2 = sqrt(1.0 - sinT2 * sinT2);
            float rs = (cosT - n * cosT2) / (cosT + n * cosT2);
            float rp = (n * cosT - cosT2) / (n * cosT + cosT2);
            exact = 0.5 * (rs * rs + rp * rp);
        }

        // Schlick
        float schlick = f0 + (1.0 - f0) * pow(1.0 - cosT, 5.0);

        // Exact: solid line
        float distExact = abs(plotY - exact);
        color = mix(color, curveColors[i],
                    smoothstep(0.004, 0.001, distExact));

        // Schlick: dashed line
        float dash = step(0.5, fract(uv.x * 30.0));
        float distSchlick = abs(plotY - schlick);
        color = mix(color, curveColors[i] * 0.7,
                    smoothstep(0.004, 0.001, distSchlick) * dash);
    }

    fragColor = vec4(color, 1.0);
}
