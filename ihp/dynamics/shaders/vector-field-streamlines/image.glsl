// Image tab — displays Buffer B.
// Open the Common tab to edit the vector field and parameters.

// iChannel0 = Buffer B

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec3 col = texture(iChannel0, fragCoord.xy / iResolution.xy).rgb;
    fragColor = vec4(col, 1.0);
}
