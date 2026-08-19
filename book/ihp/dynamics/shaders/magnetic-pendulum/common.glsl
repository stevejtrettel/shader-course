// =============================================
//  IHP Shader Workshop 2026
//  MAGNETIC PENDULUM (Common tab)
//
//  Shared constants, physics parameters, and
//  utilities used by all passes. Edit the magnet
//  layout and physics here.
// =============================================

// =============================================
//  YOUR MAGNETS
// =============================================

const int N_MAGNETS = 3;

// Magnet positions: equally spaced on a unit circle
vec2 magnetPos(int i) {
    float angle = float(i) * 6.28318 / float(N_MAGNETS);
    return vec2(cos(angle), sin(angle));
}

// =============================================
//  PARAMETERS
//
//  N_MAGNETS  — number of magnets on the unit circle
//  FRICTION   — damping (lower → more intricate basins)
//  GRAVITY    — restoring force toward center
//  STRENGTH   — magnetic attraction
//  HEIGHT     — vertical gap (prevents singularity)
//  DT         — integration time step
//  SUBSTEPS   — ODE steps per frame
// =============================================
const float FRICTION = 0.1;
const float GRAVITY = 0.5;
const float STRENGTH = 1.0;
const float HEIGHT = 0.3;

const float DT = 0.02;
const int SUBSTEPS = 10;

// =============================================
//  SHARED UTILITIES (nothing below needs editing)
// =============================================

vec3 hsv2rgb(float h, float s, float v) {
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return v * mix(vec3(1.0), c, s);
}
