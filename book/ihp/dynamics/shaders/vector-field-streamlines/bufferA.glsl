// =============================================
//  IHP Shader Workshop 2026
//  ANIMATED STREAMLINES — Buffer A (particle state)
//
//  Reads: iChannel0 = Buffer A (self, nearest/clamp)
//  Stores particle positions in .rg channels.
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    if (iFrame == 0) {
        fragColor = vec4(hash22(fragCoord), 1.0, 1.0);
    } else {
        vec4 txt = texelFetch(iChannel0, ivec2(fragCoord), 0);
        vec2 p = txt.rg;

        // Evaluate V in world coords, normalize direction, constant speed
        vec2 worldP = p * VIEW_RADIUS;
        vec2 v = V(worldP);
        float mag = length(v);
        vec2 vel = (mag > 0.001) ? v / mag * VEL_FACTOR : vec2(0.0);
        p += vel;

        fragColor = vec4(p, 1.0, 1.0);

        if (abs(p.x) > ASP || abs(p.y) > 1.0) {
            vec2 np = hash22(fragCoord + floor(iTime));
            np.x *= ASP;
            fragColor = vec4(np, 0.0, 1.0);
        }
    }
}
