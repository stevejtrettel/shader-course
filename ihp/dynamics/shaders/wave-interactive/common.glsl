// =============================================
//  IHP Shader Workshop 2026
//  WAVE EQUATION (Common tab)
//
//  Shared parameters and domain boundary.
//  Edit the domain shape and wave speed here.
// =============================================

// =============================================
//  YOUR DOMAIN AND PARAMETERS
// =============================================

const float dt = 0.3;     // Timestep (too large -> blows up)
const float c = 1.0;      // Wave speed

// Domain boundary — waves are forced to zero outside.
// Replace with any shape you like.

bool inDomain(vec2 uv) {
    // Circle
    return length(uv) < 0.9;

    // Square
    // return max(abs(uv.x), abs(uv.y)) < 0.85;

    // Mandelbrot set
    // vec2 z = vec2(0.0), w = uv * 1.5 - vec2(0.5, 0.0);
    // for (int i = 0; i < 100; i++) {
    //     z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + w;
    //     if (dot(z, z) > 4.0) return false;
    // }
    // return true;
}
