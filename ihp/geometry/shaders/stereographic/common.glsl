// ═══════════════════════════════════════════════════════════════
//  Stereographic Projection — Curves on Plane & Sphere
//  COMMON tab (math library — nothing to edit here)
// ═══════════════════════════════════════════════════════════════

#define PI  3.14159265359
#define TAU 6.28318530718

// Scene geometry
#define SPHERE_CENTER vec3(0, 0, 1)
#define SPHERE_RADIUS 1.0


// ── Stereographic Projection ────────────────────────────────
//
//  Unit sphere centered at (0,0,1), south pole at origin.
//  Projection from north pole (0,0,2) to the z=0 plane.
//
//  Forward (sphere → plane):
//    w = 2 · P.xy / (2 − P.z)
//
//  This is 2× the standard stereographic projection.
//  Conformal factor (plane → sphere): λ = 4 / (4 + |w|²)

vec2 stereoForward(vec3 P) {
    return 2.0 * P.xy / (2.0 - P.z);
}

float conformalFactor(vec2 w) {
    return 4.0 / (4.0 + dot(w, w));
}


// ── Ray Intersection ────────────────────────────────────────

float hitPlane(vec3 ro, vec3 rd) {
    if (abs(rd.z) < 1e-6) return -1.0;
    float t = -ro.z / rd.z;
    return t > 0.001 ? t : -1.0;
}

float hitSphere(vec3 ro, vec3 rd) {
    vec3 oc = ro - SPHERE_CENTER;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - SPHERE_RADIUS * SPHERE_RADIUS;
    float disc = b * b - c;
    if (disc < 0.0) return -1.0;
    float t = -b - sqrt(disc);
    return t > 0.001 ? t : -1.0;
}


// ── Soft Shadow ─────────────────────────────────────────────

float sphereShadow(vec3 p, vec3 lightDir) {
    vec3 oc = p - SPHERE_CENTER;
    float b = dot(oc, lightDir);
    if (b > 0.0) return 1.0;
    float closest = sqrt(max(dot(oc, oc) - b * b, 0.0));
    float d = (closest - SPHERE_RADIUS) / SPHERE_RADIUS;
    return smoothstep(-0.05, 0.35, d);
}


// ── Ambient Occlusion ───────────────────────────────────────

float sphereAO(vec3 p, vec3 n) {
    vec3 v = SPHERE_CENTER - p;
    float d2 = dot(v, v);
    float cosA = dot(n, v / sqrt(d2));
    float r2 = SPHERE_RADIUS * SPHERE_RADIUS;
    return 1.0 - 0.5 * (r2 / d2) * max(cosA, 0.0);
}


// ── Color Utilities ─────────────────────────────────────────

vec3 hsv2rgb(vec3 c) {
    vec3 p = abs(fract(c.xxx + vec3(0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0);
    return c.z * mix(vec3(1), clamp(p - 1.0, 0.0, 1.0), c.y);
}
