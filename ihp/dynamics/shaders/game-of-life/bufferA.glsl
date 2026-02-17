// =============================================
//  IHP Shader Workshop 2026
//  GAME OF LIFE — Buffer A (state update)
//
//  Cellular automaton on the pixel grid.
//  Edit the rule() function to change the automaton.
//  Reads: iChannel0 = Buffer A (self).
// =============================================

// =============================================
//  YOUR RULE
// =============================================
// Given the cell's current state (0.0 or 1.0)
// and the number of live neighbors (0.0 to 8.0),
// return 1.0 (alive) or 0.0 (dead).

float rule(float self, float neighbors) {
    // Conway's Game of Life (B3/S23):
    if (self == 1.0) {
        return (neighbors == 2.0 || neighbors == 3.0) ? 1.0 : 0.0;
    } else {
        return (neighbors == 3.0) ? 1.0 : 0.0;
    }

    // Other rules to try:
    // HighLife (B36/S23) — like Life, but also births on 6. Has a replicator!
    //   if (self == 1.0) return (neighbors == 2.0 || neighbors == 3.0) ? 1.0 : 0.0;
    //   else return (neighbors == 3.0 || neighbors == 6.0) ? 1.0 : 0.0;

    // Seeds (B2/S) — every cell dies, birth on 2. Explosive growth.
    //   return (self == 0.0 && neighbors == 2.0) ? 1.0 : 0.0;

    // Day & Night (B3678/S34678) — symmetric between on/off.
    //   if (self == 1.0) return (neighbors>=3.0 && neighbors!=5.0 && neighbors!=6.0) ? 1.0 : 0.0;
    //   else return (neighbors==3.0||neighbors==6.0||neighbors==7.0||neighbors==8.0) ? 1.0 : 0.0;

    // Diamoeba (B35678/S5678) — grows into diamond-like blobs.
    //   if (self == 1.0) return (neighbors >= 5.0) ? 1.0 : 0.0;
    //   else return (neighbors==3.0 || neighbors>=5.0) ? 1.0 : 0.0;
}

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    if (iFrame == 0) {
        float random = hash(fragCoord);
        fragColor = vec4(step(0.5, random));
        return;
    }

    ivec2 p = ivec2(fragCoord);

    float self = texelFetch(iChannel0, p, 0).r;
    float neighbors =
        texelFetch(iChannel0, p + ivec2(-1, -1), 0).r +
        texelFetch(iChannel0, p + ivec2( 0, -1), 0).r +
        texelFetch(iChannel0, p + ivec2( 1, -1), 0).r +
        texelFetch(iChannel0, p + ivec2(-1,  0), 0).r +
        texelFetch(iChannel0, p + ivec2( 1,  0), 0).r +
        texelFetch(iChannel0, p + ivec2(-1,  1), 0).r +
        texelFetch(iChannel0, p + ivec2( 0,  1), 0).r +
        texelFetch(iChannel0, p + ivec2( 1,  1), 0).r;

    float alive = rule(self, neighbors);
    fragColor = vec4(vec3(alive), 1.0);
}
