// =============================================
//  IHP Shader Workshop 2026
//  HEAT EQUATION — Buffer A (PDE timestep)
//
//  Forward Euler for u_t = kappa * laplacian(u).
//  Click to inject heat.
//  Reads: iChannel0 = Buffer A (self).
// =============================================

// =============================================
//  PARAMETERS
//
//  dt     — Timestep (must be < 0.25 for stability)
//  kappa  — Thermal diffusivity
// =============================================

const float dt = 0.2;       // Timestep (must be < 0.25 for stability)
const float kappa = 1.0;    // Thermal diffusivity

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    if (iFrame == 0) {
        fragColor = vec4(0.0);
        return;
    }

    ivec2 p = ivec2(fragCoord);

    // Current temperature
    float u = texelFetch(iChannel0, p, 0).r;

    // Discrete Laplacian: sum of 4 neighbors minus 4x center
    float u_n = texelFetch(iChannel0, p + ivec2( 0,  1), 0).r;
    float u_s = texelFetch(iChannel0, p + ivec2( 0, -1), 0).r;
    float u_e = texelFetch(iChannel0, p + ivec2( 1,  0), 0).r;
    float u_w = texelFetch(iChannel0, p + ivec2(-1,  0), 0).r;
    float laplacian = u_n + u_s + u_e + u_w - 4.0 * u;

    // The PDE: heat equation  u_t = kappa * laplacian(u)
    // Forward Euler — just one field, no velocity
    float newU = u + dt * kappa * laplacian;

    // Click to inject heat
    if (iMouse.z > 0.0) {
        float d = length(fragCoord - iMouse.xy);
        float sigma = 10.0;
        newU += 0.05 * exp(-d * d / (2.0 * sigma * sigma));
    }

    fragColor = vec4(newU, 0.0, 0.0, 1.0);
}
