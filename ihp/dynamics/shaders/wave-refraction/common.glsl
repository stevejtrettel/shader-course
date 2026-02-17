// =============================================
//  IHP Shader Workshop 2026
//  WAVE REFRACTION (Common tab)
//
//  Shared parameters, domain, and speed function.
//  Edit the wave speed and domain shape here.
// =============================================

// =============================================
//  YOUR DOMAIN AND PARAMETERS
// =============================================

const float dt = 0.3;     // Timestep

// Domain boundary — waves are forced to zero outside.

bool inDomain(vec2 uv) {
    return abs(uv.x) < 1.5 && abs(uv.y) < 0.95;
}

// =============================================
//  YOUR SPEED FUNCTION
// =============================================
// Wave speed at each point.
// Regions with different speeds create refraction at the interface.

float speed(vec2 uv) {
    // Circular lens: slower inside -> converging lens
    return length(uv) < 0.3 ? 0.5 : 1.0;

    // Half-plane: flat refractive interface
    // return uv.x < 0.0 ? 0.5 : 1.0;

    // Annular lens
    // float r = length(uv);
    // return (r > 0.25 && r < 0.5) ? 0.5 : 1.0;

    // Gradient index: speed varies smoothly, no sharp boundary
    // return 0.5 + 0.5 * (uv.y + 1.0);
}
