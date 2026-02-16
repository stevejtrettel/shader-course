// ═══════════════════════════════════════════════════════════════
//  Hopf Preimage of Algebraic Curves
//  COMMON tab (math library — nothing to edit here)
// ═══════════════════════════════════════════════════════════════

#define PI  3.14159265359
#define TAU 6.28318530718


// ── Hopf Fibration ──────────────────────────────────────────

// Inverse stereographic projection  R^3 → S^3
// From north pole (0,0,0,1):
//   σ⁻¹(x) = (2x, |x|²−1) / (|x|²+1)
vec4 invStereoS3(vec3 p) {
    float r2 = dot(p, p);
    return vec4(2.0 * p, r2 - 1.0) / (r2 + 1.0);
}

// Hopf map  S^3 → S^2
// q = (z₁, z₂) with z₁ = q.xy, z₂ = q.zw
//   π(z₁,z₂) = (2Re(z₁z̄₂), 2Im(z₁z̄₂), |z₁|²−|z₂|²)
vec3 hopfMap(vec4 q) {
    return vec3(
        2.0 * (q.x * q.z + q.y * q.w),
        2.0 * (q.y * q.z - q.x * q.w),
        dot(q.xy, q.xy) - dot(q.zw, q.zw)
    );
}

// Stereographic projection  S^2 → R^2  (from north pole)
//   stereo(p) = p.xy / (1 − p.z)
// Clamped to avoid blowup when h is near the north pole.
vec2 stereoS2(vec3 p) {
    return p.xy / max(1.0 - p.z, 0.01);
}


// ── Color ───────────────────────────────────────────────────

vec3 hsv2rgb(vec3 c) {
    vec3 p = abs(fract(c.xxx + vec3(0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0);
    return c.z * mix(vec3(1), clamp(p - 1.0, 0.0, 1.0), c.y);
}

vec3 surfaceColor(vec3 h) {
    float hue = atan(h.y, h.x) / TAU + 0.5;
    float lit = 0.4 + 0.55 * (0.5 + 0.5 * h.z);
    return hsv2rgb(vec3(hue, 0.7, lit));
}


// ── Camera ──────────────────────────────────────────────────

mat3 orbitCamera(float yaw, float pitch) {
    float cy = cos(yaw), sy = sin(yaw);
    float cp = cos(pitch), sp = sin(pitch);
    vec3 fwd   = vec3(sy * cp, sp, -cy * cp);
    vec3 right = vec3(cy, 0, sy);
    vec3 up    = cross(right, fwd);
    return mat3(right, up, fwd);
}


// ── Lighting ────────────────────────────────────────────────

vec3 shade(vec3 col, vec3 n, vec3 rd, float t) {
    vec3 l1 = normalize(vec3(2, 3, 1));
    vec3 l2 = normalize(vec3(-1, 1, -2));

    float diff = max(dot(n, l1), 0.0)
               + max(dot(n, l2), 0.0) * 0.25;
    float amb  = 0.12;

    vec3 h     = normalize(l1 - rd);
    float spec = pow(max(dot(n, h), 0.0), 48.0) * 0.4;
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0) * 0.15;

    vec3 result = col * (amb + diff) + vec3(spec + fres);

    float fog = 1.0 - exp(-0.012 * t * t);
    return mix(result, vec3(0.01, 0.01, 0.02), fog);
}
