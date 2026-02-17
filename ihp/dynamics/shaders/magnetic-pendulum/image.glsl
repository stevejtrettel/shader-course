// =============================================
//  IHP Shader Workshop 2026
//  MAGNETIC PENDULUM — Image (display pass)
//
//  Reads converged state from Buffer A and path
//  length from Buffer B. Colors each pixel by its
//  closest magnet; shades by path length.
//  Parameters and magnets are in the Common tab.
//  iChannel0 = Buffer A, iChannel1 = Buffer B.
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    ivec2 p = ivec2(fragCoord);

    vec2 pos = texelFetch(iChannel0, p, 0).rg;
    float pathLength = texelFetch(iChannel1, p, 0).b;

    // Find closest magnet
    int closest = 0;
    float minDist = 1e10;
    for (int i = 0; i < N_MAGNETS; i++) {
        float d = length(pos - magnetPos(i));
        if (d < minDist) {
            minDist = d;
            closest = i;
        }
    }

    // Color by magnet, shade by path length (longer path → darker → basin boundary)
    float hue = float(closest) / float(N_MAGNETS);
    float shade = 1.0 / (1.0 + pathLength / 40.0);
    vec3 color = hsv2rgb(hue, 0.8, 0.15 + 0.85 * shade);

    // Draw magnet positions as white dots
    for (int i = 0; i < N_MAGNETS; i++) {
        if (length(uv * 2.5 - magnetPos(i)) < 0.08) {
            color = vec3(1.0);
        }
    }

    fragColor = vec4(color, 1.0);
}
