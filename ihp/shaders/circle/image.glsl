void mainImage(out vec4 O, in vec2 F) {
    // Map pixel coordinates to math coordinates
    vec2 uv = (F - 0.5 * iResolution.xy) / iResolution.y;
    float x = 3.0 * uv.x, y = 3.0 * uv.y;

    // Implicit curve: f(x,y) = 0
    float f = x*x + y*y - 1.0;

    // Approximate distance to curve (gradient correction)
    vec2 grad = vec2(2.0*x, 2.0*y);
    float dist = abs(f) / max(length(grad), 0.001);

    // Pixel width in world coordinates
    float px = 3.0 / iResolution.y;

    // Color: blue inside, dark outside
    vec3 inside  = vec3(0.15, 0.3, 0.6);
    vec3 outside = vec3(0.06, 0.06, 0.1);
    vec3 col = f < 0.0 ? inside : outside;

    // Draw the curve as a bright line
    float line = 1.0 - smoothstep(0.5 * px, 1.5 * px, dist);
    col = mix(col, vec3(1.0, 0.4, 0.15), line);

    O = vec4(col, 1.0);
}
