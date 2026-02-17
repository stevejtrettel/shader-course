// =============================================
//  IHP Shader Workshop 2026
//  IDEAL TETRAHEDRAL HONEYCOMB {3,3,6}
//
//  Tiling of H³ by ideal tetrahedra with dihedral
//  angle π/3. Fold-into-fundamental-domain via
//  reflection in four face planes. Six tetrahedra
//  meet at each edge.
//  Common tab: hyperboloid model utilities.
// =============================================

// =============================================
//  YOUR CONFIGURATION
// =============================================

struct Style {
    vec3  edgeColor;
    vec3  faceColor;
    vec3  bgColor;
    float edgeRadius;
    vec3  hue;            // per-channel exponent for depth coloring
};

// =============================================
//  PARAMETERS
//
//  edgeColor    — color of tetrahedral edges
//  faceColor    — color of face panels
//  bgColor      — background color
//  edgeRadius   — hyperbolic tube thickness
//  hue          — per-channel depth color shift
//  DRAW_EDGES   — toggle edge rendering
//  DRAW_FACES   — toggle face rendering
//  FACE_HOLE    — gap width around edges (0 = solid)
//  FACE_BOUND   — how far faces extend from center
// =============================================

Style style = Style(
    vec3(1.0, 0.75, 0.3),       // edges: bright amber
    vec3(0.3, 0.8, 0.7),        // faces: vivid teal
    vec3(0.02, 0.02, 0.04),     // background: near-black
    0.10,                        // edge radius
    vec3(1.0, 1.3, 1.8)         // depth hue shift
);

// Toggle features
#define DRAW_EDGES true
#define DRAW_FACES true

// Face parameters
#define FACE_HOLE   0.016    // gap width around edges (0 = solid faces)
#define FACE_BOUND  0.507    // how far faces extend from cell center

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================


// === TETRAHEDRON CONSTANTS ========================
// Ideal regular tetrahedron in H³.
// All vertices are at infinity (ideal points).
// The tiling is {3,3,6}: 6 tetrahedra around each edge.

const float T_BETA   = 0.4330127018922193;   // sqrt(3)/4
const float T_GAMMA  = 1.25;                 // 5/4
const float T_LAMBDA = 0.8660254037844386;   // sqrt(3)/2
const float T_OMEGA  = 1.7320508075688773;   // sqrt(3)

// Reflection normals (unit spacelike, Minkowski norm = 1):
//   (±psi, ±psi, ∓psi, chi)  where psi = sqrt(3)/(2√2), chi = 1/(2√2)
// Encoded via TK for the bounce loop.
const vec3 TK = vec3(T_LAMBDA, -T_LAMBDA, 0.5);


// === BOUNCE (fundamental domain reduction) ========
//
// Folds any point in H³ into the fundamental
// ideal tetrahedron by iterated reflection through
// the 4 face mirrors.

vec4 bounce(vec4 P) {
    for (int k = 0; k < 12; k++) {
        // Compute dot products with all 4 face normals simultaneously
        vec4 q = P.x * TK.xyxy + P.y * TK.xxyy + P.z * TK.yxxy;
        vec2 m = max(q.xy, q.zw);
        float M = max(m.x, m.y);

        float dp = M - TK.z * P.w;
        if (dp <= 0.0) break;

        if (q.w >= M)
            P -= dp * TK.yyyz;
        else if (q.x >= M)
            P -= dp * TK.xxyz;
        else if (q.y >= M)
            P -= dp * TK.yxxz;
        else
            P -= dp * TK.xyxz;
    }
    return P;
}


// === EDGE SDF =====================================
//
// Distance to nearest edge (geodesic line).
// The ideal tetrahedron has 6 edges.
// Centers at (±mu, 0, 0, tau) and cyclic permutations.
//
// cosh²(d) = 0.5 + w² + min over 3 axes of
//   (p_i² - |omega·w·p_i + p_j·p_k|)

float edge_sdf(vec4 p) {
    p = bounce(p);
    float r = T_OMEGA * p.w;
    vec3 Q = p.xyz * p.xyz - abs(r * p.xyz + p.yzx * p.zxy);
    float q = 0.5 + p.w * p.w + min(Q.x, min(Q.y, Q.z));
    return arccosh_sqrt(q) - style.edgeRadius;
}


// === FACE SDF =====================================
//
// Distance to nearest face (totally geodesic plane).
// The 4 face centers (in the neighbouring copy) are at
//   (±beta, ±beta, ∓beta, gamma).
//
// The SDF is bounded by a ball of hyperbolic radius ~0.507
// from the origin to keep faces from extending to infinity.

float face_sdf(vec4 p) {
    p = bounce(p);
    float d0 = arccosh(p.w);

    vec2 c = vec2(T_BETA, -T_BETA);
    vec4 q = p.x * c.xyxy + p.y * c.xxyy + p.z * c.yxxy;
    q.xy = max(q.xy, q.zw);

    float dp = T_GAMMA * p.w - max(q.x, q.y);
    float d1 = arccosh(dp);

    float b_sdf = FACE_BOUND - d0;
    float f_sdf = 0.5 * (d1 - d0 - FACE_HOLE);

    return max(b_sdf, f_sdf);
}


// === COMBINED SDF =================================

float sdf(vec4 p) {
    float d = 1e6;
    if (DRAW_EDGES) d = min(d, edge_sdf(p));
    if (DRAW_FACES) d = min(d, face_sdf(p));
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
// 0 = edge, 1 = face

int hit_feature(vec4 p) {
    if (DRAW_EDGES && edge_sdf(p) < 0.01) return 0;
    return 1;
}


// === LIGHTING =====================================

const vec4 LIGHTS[8] = vec4[](
    vec4(+1, +1, +1, 2), vec4(+1, +1, -1, 2),
    vec4(+1, -1, +1, 2), vec4(+1, -1, -1, 2),
    vec4(-1, +1, +1, 2), vec4(-1, +1, -1, 2),
    vec4(-1, -1, +1, 2), vec4(-1, -1, -1, 2)
);

vec3 shade(vec4 pos, vec4 normal, vec4 camera) {
    float w = pos.w;

    float c = 1.0 / (1.0 + 0.175 * sqrt(w));
    vec3 depth_rgb = pow(vec3(c), 4.0 * style.hue);

    int feat = hit_feature(pos);
    vec3 base = (feat == 0)
        ? depth_rgb * style.edgeColor
        : depth_rgb * style.faceColor;

    vec3 view_dir = camera.xyz - pos.xyz;
    vec4 V = vec4(view_dir, dot(view_dir, pos.xyz) / w);
    V = normalize_s(V);

    vec3 color = 0.225 * base;

    for (int i = 0; i < 8; i++) {
        vec4 light = LIGHTS[i];
        float dp = dot(light.xyz, pos.xyz);
        float hyp_dp = w * light.w - dp;

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

    // Fog: fade to dark with hyperbolic distance
    float hyp_d = arccosh(w);
    color *= exp(-0.35 * hyp_d);

    return color;
}


// === CAMERA =======================================

void build_camera(vec4 mouse, vec2 res,
                  out vec4 cam_pos, out vec4 X, out vec4 Y, out vec4 Z) {

    float theta = 0.785, phi = 0.615;  // looking through a face center: (1,1,1)/√3
    if (mouse.z > 0.0) {
        theta = 6.2832 * (mouse.x / res.x - 0.5);
        phi   = 2.4 * (mouse.y / res.y - 0.5);
    }
    phi = clamp(phi, -1.3, 1.3);

    float cp = cos(phi), sp = sin(phi);
    float ct = cos(theta), st = sin(theta);
    vec3 dir = vec3(cp * ct, cp * st, sp);

    float R = 1.5;
    float W = sqrt(1.0 + R * R);
    vec3 cam_xyz = R * dir;
    cam_pos = vec4(cam_xyz, W);

    vec3 look = cam_xyz;
    Z = vec4(look, dot(cam_xyz, look) / W);
    Z = normalize_s(Z);

    vec3 world_up = vec3(0, 0, 1);
    vec3 right3 = normalize(cross(world_up, look));
    X = vec4(right3, dot(cam_xyz, right3) / W);
    X = X - hyp_dot(X, Z) * Z;
    X = normalize_s(X);

    Y = hyp_cross(cam_pos, Z, X);
    Y = normalize_s(Y);
}


// === MAIN =========================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = 1.77 * (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

    vec4 cam, X, Y, Z;
    build_camera(iMouse, iResolution.xy, cam, X, Y, Z);

    vec4 ray = normalize_s(uv.x * X + uv.y * Y - Z);

    float dist;
    vec4 pos = raymarch(cam, ray, dist);

    vec3 color = style.bgColor;

    if (dist >= 0.0 && dist < 7.2) {
        vec4 normal = hyp_gradient(pos);
        color = shade(pos, normal, cam);
    }

    fragColor = vec4(color, 1.0);
}
