// ═══════════════════════════════════════════════════════════════
//  Hopf Fibration — Raymarched Fibers
//  COMMON tab (math library — nothing to edit here)
// ═══════════════════════════════════════════════════════════════

#define PI  3.14159265359
#define TAU 6.28318530718

// ── Hopf Fibration ──────────────────────────────────────────

// Inverse stereographic projection  R^3 → S^3
// Projects from north pole (0,0,0,1).
//   σ⁻¹(x) = (2x, |x|²−1) / (|x|²+1)
vec4 invStereoS3(vec3 p) {
    float r2 = dot(p, p);
    return vec4(2.0 * p, r2 - 1.0) / (r2 + 1.0);
}

// Hopf map  S^3 → S^2
// Reads q = (z₁, z₂) ∈ C² with z₁ = q.xy, z₂ = q.zw
//   π(z₁,z₂) = (2Re(z₁z̄₂), 2Im(z₁z̄₂), |z₁|²−|z₂|²)
vec3 hopfMap(vec4 q) {
    return vec3(
        2.0 * (q.x * q.z + q.y * q.w),
        2.0 * (q.y * q.z - q.x * q.w),
        dot(q.xy, q.xy) - dot(q.zw, q.zw)
    );
}

// ── Color ───────────────────────────────────────────────────

vec3 hsv2rgb(vec3 c) {
    vec3 p = abs(fract(c.xxx + vec3(0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0);
    return c.z * mix(vec3(1), clamp(p - 1.0, 0.0, 1.0), c.y);
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
    vec3 l1 = normalize(vec3(1, 2, 3));
    vec3 l2 = normalize(vec3(-2, 1, -1));
    float diff = max(dot(n, l1), 0.0)
               + max(dot(n, l2), 0.0) * 0.3;
    float amb  = 0.08;
    vec3 h    = normalize(l1 - rd);
    float spec = pow(max(dot(n, h), 0.0), 64.0) * 0.5;
    vec3 result = col * (amb + diff) + vec3(spec);
    float fog = 1.0 - exp(-0.015 * t * t);
    return mix(result, vec3(0.01, 0.01, 0.02), fog);
}
