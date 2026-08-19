// =============================================
//  IHP Shader Workshop 2026
//  HYPERBOLOID MODEL UTILITIES (Common tab)
//
//  Minkowski inner product, geodesics, distance,
//  camera setup.
// =============================================


// === INVERSE HYPERBOLIC FUNCTIONS =================

float arccosh(float x) {
    x = max(x, 1.0);
    return log(x + sqrt(x * x - 1.0));
}

// arccosh(sqrt(x)) — avoids intermediate sqrt.
// Use when you have cosh²(d) directly.
float arccosh_sqrt(float x) {
    x = max(x, 1.0);
    return log(sqrt(x) + sqrt(x - 1.0));
}


// === MINKOWSKI INNER PRODUCT ======================

// Signature (+,+,+,-)
float hyp_dot(vec4 u, vec4 v) {
    return dot(u.xyz, v.xyz) - u.w * v.w;
}


// === NORMALIZATION ================================

// Timelike: project onto H³ so hyp_dot(v,v) = -1
vec4 normalize_t(vec4 v) {
    return v / sqrt(-hyp_dot(v, v));
}

// Spacelike: unit tangent vector, hyp_dot(v,v) = +1
vec4 normalize_s(vec4 v) {
    return v / sqrt(hyp_dot(v, v));
}


// === DISTANCES ====================================

float hyp_dist(vec4 p, vec4 q) {
    return arccosh(-hyp_dot(p, q));
}

// Distance from point p to geodesic through center c
// with unit spacelike tangent t (orthogonal to c).
float dist_to_geodesic(vec4 p, vec4 center, vec4 tangent) {
    float a = -hyp_dot(p, center);
    float b =  hyp_dot(p, tangent);
    return arccosh_sqrt(a * a - b * b);
}


// === REFLECTION ===================================

vec4 hyp_reflect(vec4 p, vec4 n) {
    return p - 2.0 * hyp_dot(p, n) * n;
}


// === PARALLEL TRANSPORT ===========================

// Orthonormal frame at p ∈ H³, by parallel transport
// of {e_x, e_y, e_z} from origin (0,0,0,1).
void transport_frame(vec4 p, out vec4 X, out vec4 Y, out vec4 Z) {
    float s = 1.0 / (1.0 + p.w);

    X = vec4(1.0 + s*p.x*p.x,      s*p.x*p.y,      s*p.x*p.z, p.x);
    Y = vec4(     s*p.y*p.x,  1.0 + s*p.y*p.y,      s*p.y*p.z, p.y);
    Z = vec4(     s*p.z*p.x,       s*p.z*p.y,  1.0 + s*p.z*p.z, p.z);
}


// === HYPERBOLIC CROSS PRODUCT =====================

// Given point P ∈ H³ and tangent vectors A, B at P,
// returns the tangent at P orthogonal to both.
vec4 hyp_cross(vec4 P, vec4 A, vec4 B) {
    vec4 m1 = A * B.yzwx - B * A.yzwx;
    vec2 m2 = A.xy * B.zw - B.xy * A.zw;
    return vec4(
        +P.y * m1.z - P.z * m2.y + P.w * m1.y,
        -P.z * m1.w - P.w * m2.x - P.x * m1.z,
        +P.w * m1.x + P.x * m2.y + P.y * m1.w,
        +P.x * m1.y - P.y * m2.x + P.z * m1.x
    );
}
