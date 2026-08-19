// =============================================
//  IHP Shader Workshop 2026
//  MAGNETIC PENDULUM — Buffer B (path length)
//
//  Accumulates total path length for each pixel
//  to shade basin boundaries. Longer paths mean
//  the pendulum wandered before settling.
//  iChannel0 = Buffer A, iChannel1 = Buffer B (self).
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    ivec2 p = ivec2(fragCoord);

    if (iFrame == 0) {
        fragColor = vec4(uv * 2.5, 0.0, 0.0);
        return;
    }

    vec2 currentPos = texelFetch(iChannel0, p, 0).rg;
    vec4 prev = texelFetch(iChannel1, p, 0);
    vec2 prevPos = prev.rg;
    float pathLength = prev.b + length(currentPos - prevPos);

    fragColor = vec4(currentPos, pathLength, 0.0);
}
