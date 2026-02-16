/////////////////////////////////////////////////////
//  RIGHT-ANGLED DODECAHEDRAL HONEYCOMB  {5,3,4}
//  Edges + Vertices only
//
//  Uses common.glsl math library (Common tab).
//  Geometry adapted from Alexander Foksha.
//
//  Mouse drag to orbit. Static when idle.
/////////////////////////////////////////////////////


// === STYLE ========================================
// Change colors and sizes here.

struct Style {
    vec3  vertexColor;
    vec3  edgeColor;
    vec3  bgColor;
    float vertexRadius;   // hyperbolic distance
    float edgeRadius;
    vec3  hue;            // per-channel exponent for depth coloring
};

Style style = Style(
    vec3(0.90, 0.35, 0.25),     // vertices: warm red
    vec3(0.85, 0.82, 0.72),     // edges: warm white
    vec3(0.0),                   // background: black
    0.24,                        // vertex radius
    0.0875,                      // edge radius
    vec3(1.41, 1.73, 2.72)      // depth hue shift
);

// Toggle features
#define DRAW_VERTICES true
#define DRAW_EDGES    true


// === DODECAHEDRON CONSTANTS =======================
// All derived from the golden ratio phi = (1+sqrt(5))/2.
// These define the geometry of the fundamental domain.

const float PHI   = 1.6180339887498948;   // golden ratio
const float SPHI  = 1.2720196495140690;   // sqrt(phi)

// Reflection normals (unit spacelike, Minkowski norm = 1)
// The 12 face normals of the dodecahedron are:
//   (1/sqrt2)(+-1, +-phi, 0, sqrt(phi))  and cyclic permutations
// Encoded via K for the symmetry-exploiting bounce loop.
const vec3 K = vec3(1.0, PHI, SPHI);

// Vertex positions on H^3 (20 vertices of the dodecahedron):
//   (+-sigma, +-sigma, +-sigma, psi)   [8 vertices]
//   (+-omega, +-delta, 0, psi)         [12, cyclic perms]
const float SIGMA = 0.8994537199739336;   // sqrt(phi+1)/2... wait
// Let me just use Foksha's verified constants directly:
const float V_SIGMA = 0.8994537199739336;
const float V_OMEGA = 1.4553466902253548;
const float V_DELTA = 0.5558929702514212;
const float V_PSI   = 1.8512295868219161;

// Edge midpoints on H^3 (30 edges):
//   6 axis-aligned: (+-chi, 0, 0, rho) and cyclic   [tangent along perpendicular axis]
//   24 "golden":    (+-phi_e, +-tau, +-eta, rho) and cyclic permutations
const float E_CHI   = 1.2720196495140690;
const float E_RHO   = 1.6180339887498948;
const float E_PHI   = 1.0290855136357461;
const float E_TAU   = 0.6360098247570345;
const float E_ETA   = 0.3930756888787116;
const float E_KAPPA = 0.8090169943749474;
const float E_THETA = 0.3090169943749474;

// Face neighbor centers (for face SDF, kept for future use):
const float F_ALPHA = 1.2720196495140690;
const float F_BETA  = 2.0581710272714923;
const float F_GAMMA = 2.6180339887498948;


// === BOUNCE (fundamental domain reduction) ========
//
// Folds any point in H^3 into the fundamental
// dodecahedron by iterated reflection through the
// 12 face mirrors.
//
// Exploits icosahedral symmetry: instead of testing
// all 12 normals, uses abs + golden-ratio weighted
// cyclic sums to find which mirror to reflect through.

vec4 bounce(vec4 P) {
    for (int k = 0; k < 12; k++) {
        vec3 q = abs(P.xyz);
        q += K.y * q.yzx;            // phi-weighted cyclic shift
        float M = max(q.x, max(q.y, q.z));

        // dp = max dot product with any reflection normal (x sqrt(2))
        float dp = M - K.z * P.w;

        if (dp <= 0.0) break;        // inside all half-spaces: done

        // Reflect through the winning mirror
        if (q.x >= M)
            P.xy -= dp * K.xy * sign(P.xy);
        else if (q.y >= M)
            P.yz -= dp * K.xy * sign(P.yz);
        else
            P.zx -= dp * K.xy * sign(P.zx);

        P.w -= dp * K.z;
    }
    return P;
}


// === VERTEX SDF ===================================
//
// After bouncing, compute distance to nearest vertex.
// The 20 vertices reduce to testing 4 dot-product
// expressions thanks to abs() and cyclic symmetry.

float vertex_sdf(vec4 p) {
    p = bounce(p);
    vec3 a = abs(p.xyz);

    // dot products with vertex directions (all have w = psi)
    float dp = V_SIGMA * (a.x + a.y + a.z);            // (sigma,sigma,sigma) type
    vec3  q  = V_OMEGA * a + V_DELTA * a.yzx;           // (omega,delta,0) type

    // Q = -hyp_dot(p, nearest_vertex) = psi*w - max(spatial dots)
    float Q = V_PSI * p.w - max(max(q.x, q.y), max(q.z, dp));
    return arccosh(Q) - style.vertexRadius;
}


// === EDGE SDF =====================================
//
// Distance to nearest edge (geodesic segment).
// Uses the identity: cosh^2(dist_to_line) = alpha^2 - beta^2
// where alpha = -hyp_dot(p, edge_center), beta = hyp_dot(p, tangent).
//
// 30 edges = 6 axis-aligned + 24 golden, computed via
// symmetry in vec4 batches.

float edge_sdf(vec4 p) {
    p = bounce(p);
    vec3 a = abs(p.xyz);

    // --- 6 axis-aligned edges ---
    // Centers: (chi, 0, 0, rho) etc.  Tangents: (0, 1, 0, 0) etc.
    // alpha = rho*w - chi*|p_i|,  beta = |p_j|
    // cosh^2(d) = alpha^2 - beta^2
    vec3 ax_alpha = E_RHO * p.w - E_CHI * a;
    vec3 A = ax_alpha * ax_alpha - a.yzx * a.yzx;

    // --- 24 golden edges (8 per cyclic group) ---
    // Packed into vec4s: 4 sign combos at once
    const vec4 S0 = vec4(E_TAU, -E_TAU, E_ETA, -E_ETA);
    const vec4 S1 = vec4(E_THETA, -E_THETA, E_KAPPA, -E_KAPPA);

    // X-dominant group
    vec4 b0 = E_RHO * p.w - abs(E_PHI * p.x + p.y * S0.xxyy + p.z * S0.zwzw);
    vec4 b1 = 0.5 * p.x - p.y * S1.xxyy - p.z * S1.zwzw;
    vec4 B = b0 * b0 - b1 * b1;

    // Y-dominant group
    vec4 c0 = E_RHO * p.w - abs(E_PHI * p.y + p.z * S0.xxyy + p.x * S0.zwzw);
    vec4 c1 = 0.5 * p.y - p.z * S1.xxyy - p.x * S1.zwzw;
    vec4 C = c0 * c0 - c1 * c1;

    // Z-dominant group
    vec4 d0 = E_RHO * p.w - abs(E_PHI * p.z + p.x * S0.xxyy + p.y * S0.zwzw);
    vec4 d1 = 0.5 * p.z - p.x * S1.xxyy - p.y * S1.zwzw;
    vec4 D = d0 * d0 - d1 * d1;

    // Minimum cosh^2(d) across all 30 edges
    B = min(B, min(C, D));
    B.xyz = min(B.xyz, A);
    B.xy = min(B.xy, B.zw);
    float Q = min(B.x, B.y);

    return arccosh_sqrt(Q) - style.edgeRadius;
}


// === COMBINED SDF =================================

float sdf(vec4 p) {
    float d = 1e6;
    if (DRAW_VERTICES) d = min(d, vertex_sdf(p));
    if (DRAW_EDGES)    d = min(d, edge_sdf(p));
    return d;
}






// === SDF GRADIENT =================================


vec4 hyp_gradient(vec4 p) {
    vec4 X, Y, Z;
    transport_frame(p, X, Y, Z);
    const float eps = 0.00625;

    float gx = sdf(normalize_t(p + eps*X)) - sdf(normalize_t(p - eps*X));
    float gy = sdf(normalize_t(p + eps*Y)) - sdf(normalize_t(p - eps*Y));
    float gz = sdf(normalize_t(p + eps*Z)) - sdf(normalize_t(p - eps*Z));

    return normalize_s(gx*X + gy*Y + gz*Z);
}


// === RAY MARCHING =================================

// March along geodesic gamma(t) = cosh(t)*O + sinh(t)*R.
// dist < 0 on miss.
vec4 raymarch(vec4 origin, vec4 ray, out float dist) {
    dist = -1.0;
    vec4 p = origin;
    float t = 0.0;
    float d = sdf(p);

    for (int i = 0; i < 96; i++) {
        if (d < 0.00005 * t || t > 24.0) break;
        t += d;
        p = cosh(t) * origin + sinh(t) * ray;
        d = sdf(p);
    }

    if (d < 0.05) dist = t;
    return p;
}


// === WHICH FEATURE WAS HIT ========================
// 0 = vertex, 1 = edge

int hit_feature(vec4 p) {
    if (DRAW_VERTICES && vertex_sdf(p) < 0.01) return 0;
    return 1;
}


// === LIGHTING =====================================

// 8 point lights at vertices of a cube, distance arccosh(2)
// from origin.
const vec4 LIGHTS[8] = vec4[](
    vec4(+1, +1, +1, 2), vec4(+1, +1, -1, 2),
    vec4(+1, -1, +1, 2), vec4(+1, -1, -1, 2),
    vec4(-1, +1, +1, 2), vec4(-1, +1, -1, 2),
    vec4(-1, -1, +1, 2), vec4(-1, -1, -1, 2)
);

vec3 shade(vec4 pos, vec4 normal, vec4 camera) {
    float w = pos.w;

    // Depth-dependent base color (features deeper in H^3 are darker)
    float c = 1.0 / (1.0 + 0.175 * sqrt(w));
    vec3 depth_rgb = pow(vec3(c), 4.0 * style.hue);

    // Pick color by feature type
    int feat = hit_feature(pos);
    vec3 base = (feat == 0) ? style.vertexColor : depth_rgb * style.edgeColor;

    // View direction at hit point (lifted to tangent space)
    vec3 view_dir = camera.xyz - pos.xyz;
    vec4 V = vec4(view_dir, dot(view_dir, pos.xyz) / w);
    V = normalize_s(V);

    // Ambient
    vec3 color = 0.225 * base;

    // Accumulate 8 lights
    for (int i = 0; i < 8; i++) {
        vec4 light = LIGHTS[i];
        float dp = dot(light.xyz, pos.xyz);
        float hyp_dp = w * light.w - dp;     // cosh(distance to light)

        // Light direction lifted to tangent space at pos
        vec4 L = vec4(light.xyz - pos.xyz, -w + (dp + 1.0) / w);
        L = normalize_s(L);

        float atten = 0.75 / (1.0 + 0.025 * hyp_dp);

        float cos_theta = max(hyp_dot(L, normal), 0.0);
        vec4  H = normalize_s(L + V);
        float cos_alpha = max(hyp_dot(H, normal), 0.0);

        vec3 diffuse  = 0.475 * cos_theta * base;
        vec3 specular = vec3(0.562) * pow(cos_alpha, 88.0);

        color += atten * (diffuse + specular);
    }

    return color;
}


// === CAMERA =======================================

void build_camera(vec4 mouse, vec2 res,
                  out vec4 cam_pos, out vec4 X, out vec4 Y, out vec4 Z) {

    // Mouse-only orbit; static default when idle
    float theta = 0.6, phi = 0.4;
    if (mouse.z > 0.0) {
        theta = 6.2832 * (mouse.x / res.x - 0.5);
        phi   = 2.4 * (mouse.y / res.y - 0.5);
    }
    phi = clamp(phi, -1.3, 1.3);

    float cp = cos(phi), sp = sin(phi);
    float ct = cos(theta), st = sin(theta);
    vec3 dir = vec3(cp * ct, cp * st, sp);

    // Camera position on H^3
    float R = 1.5;
    float W = sqrt(1.0 + R * R);
    vec3 cam_xyz = R * dir;
    cam_pos = vec4(cam_xyz, W);

    // Z points away from origin (convention: ray = ... - Z)
    vec3 look = cam_xyz;
    Z = vec4(look, dot(cam_xyz, look) / W);
    Z = normalize_s(Z);

    // Right: world_up × look gives correct handedness
    vec3 world_up = vec3(0, 0, 1);
    vec3 right3 = normalize(cross(world_up, look));
    X = vec4(right3, dot(cam_xyz, right3) / W);
    X = X - hyp_dot(X, Z) * Z;
    X = normalize_s(X);

    // Up vector via cross product
    Y = hyp_cross(cam_pos, Z, X);
    Y = normalize_s(Y);
}


// === MAIN =========================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = 1.77 * (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

    // Build camera
    vec4 cam, X, Y, Z;
    build_camera(iMouse, iResolution.xy, cam, X, Y, Z);

    // View ray
    vec4 ray = normalize_s(uv.x * X + uv.y * Y - Z);

    // March
    float dist;
    vec4 pos = raymarch(cam, ray, dist);

    vec3 color = style.bgColor;

    if (dist >= 0.0 && dist < 7.2) {
        vec4 normal = hyp_gradient(pos);
        color = shade(pos, normal, cam);
    }

    fragColor = vec4(color, 1.0);
}