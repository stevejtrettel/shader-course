// =============================================
//  IHP Shader Workshop 2026
//  WAVE EQUATION — Buffer A (PDE timestep)
//
//  Symplectic Euler for u_tt = c^2 * laplacian(u).
//  Click to inject pulses.
//  Reads: iChannel0 = Buffer A (self).
// =============================================

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    if (iFrame == 0 || !inDomain(uv)) {
        fragColor = vec4(0.0);
        return;
    }

    ivec2 p = ivec2(fragCoord);

    // Current state: displacement u and velocity v
    float u = texelFetch(iChannel0, p, 0).r;
    float v = texelFetch(iChannel0, p, 0).g;

    // Discrete Laplacian: sum of 4 neighbors minus 4x center
    float u_n = texelFetch(iChannel0, p + ivec2( 0,  1), 0).r;
    float u_s = texelFetch(iChannel0, p + ivec2( 0, -1), 0).r;
    float u_e = texelFetch(iChannel0, p + ivec2( 1,  0), 0).r;
    float u_w = texelFetch(iChannel0, p + ivec2(-1,  0), 0).r;
    float laplacian = u_n + u_s + u_e + u_w - 4.0 * u;

    // The PDE: wave equation  u_tt = c^2 * laplacian(u)
    // Symplectic Euler — update velocity first, then position with the *new* velocity
    float newV = v + dt * c * c * laplacian;

    // Click to inject a Gaussian pulse of velocity
    if (iMouse.z > 0.0) {
        float d = length(fragCoord - iMouse.xy);
        float sigma = 10.0;
        newV += 0.01 * exp(-d * d / (2.0 * sigma * sigma));
    }

    float newU = u + dt * newV;

    fragColor = vec4(newU, newV, 0.0, 1.0);
}
