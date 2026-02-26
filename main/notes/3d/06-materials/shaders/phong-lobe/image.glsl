// Materials — Phong Lobe Visualization
// Polar plot of cos^n(theta) for several values of n.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    // Shift origin to lower-center so the lobe points upward
    uv.y += 0.8;

    float r = length(uv);
    float theta = atan(uv.x, uv.y);  // angle from vertical

    vec3 color = vec3(0.12);

    // Grid lines
    float grid = smoothstep(0.002, 0.001, abs(uv.x)) +
                 smoothstep(0.002, 0.001, abs(uv.y - 0.8));
    for (float cr = 0.25; cr <= 1.0; cr += 0.25) {
        grid += smoothstep(0.003, 0.001, abs(r - cr));
    }
    color += vec3(0.08) * grid;

    // Draw lobes for different exponents
    float exponents[5];
    exponents[0] = 4.0;
    exponents[1] = 16.0;
    exponents[2] = 64.0;
    exponents[3] = 256.0;
    exponents[4] = 1024.0;

    vec3 colors[5];
    colors[0] = vec3(0.9, 0.3, 0.2);
    colors[1] = vec3(0.9, 0.6, 0.2);
    colors[2] = vec3(0.3, 0.8, 0.3);
    colors[3] = vec3(0.3, 0.5, 0.9);
    colors[4] = vec3(0.7, 0.3, 0.9);

    for (int i = 0; i < 5; i++) {
        float n = exponents[i];
        float cosTheta = cos(theta);
        float lobe = 0.0;
        if (cosTheta > 0.0) {
            lobe = pow(cosTheta, n);
        }
        float lobeR = lobe * 0.95;

        float dist = abs(r - lobeR);
        float line = smoothstep(0.005, 0.002, dist);
        color = mix(color, colors[i], line);
    }

    fragColor = vec4(color, 1.0);
}
