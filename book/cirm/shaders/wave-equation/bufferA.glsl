// The wave equation on the pixel grid, as built on day 4 — with the opening
// pulse of the lecture version and the mouse forcing of the exercise
// version, so it starts moving on its own and answers a drag.

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    if (iFrame == 0) {
        vec2 center = iResolution.xy * 0.5;
        float d = length(fragCoord - center);
        float u = 3.0 * exp(-d * d / 100.0);
        fragColor = vec4(u, 0.0, 0.0, 1.0);
        return;
    }

    ivec2 p = ivec2(fragCoord);

    float u = texelFetch(iChannel0, p, 0).r;
    float v = texelFetch(iChannel0, p, 0).g;

    float u_n = texelFetch(iChannel0, p + ivec2( 0,  1), 0).r;
    float u_s = texelFetch(iChannel0, p + ivec2( 0, -1), 0).r;
    float u_e = texelFetch(iChannel0, p + ivec2( 1,  0), 0).r;
    float u_w = texelFetch(iChannel0, p + ivec2(-1,  0), 0).r;
    float laplacian = u_n + u_s + u_e + u_w - 4.0 * u;

    // Symplectic Euler: update velocity first, then position
    float dt = 0.3;
    float c = 1.0;
    float newV = v + dt * c * c * laplacian;

    // Drag to push the surface: a Gaussian of velocity under the pointer.
    if (iMouse.z > 0.0) {
        float d = length(fragCoord - iMouse.xy);
        float sigma = 10.0;
        newV += 0.01 * exp(-d * d / (2.0 * sigma * sigma));
    }

    float newU = u + dt * newV;

    fragColor = vec4(newU, newV, 0.0, 1.0);
}
