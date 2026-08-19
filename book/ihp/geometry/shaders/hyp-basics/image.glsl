// =============================================
//  IHP Shader Workshop 2026
//  HYPERBOLIC 3-SPACE — POINTS AND GEODESICS
//
//  Place balls and geodesic tubes in H³ using
//  the hyperboloid model. Raymarching along
//  hyperbolic geodesics. Drag to orbit.
//  Common tab: hyperboloid model utilities.
// =============================================

// =============================================
//  YOUR POINTS AND GEODESICS
// =============================================

#define NUM_POINTS    5
#define NUM_GEODESICS 10

// =============================================
//  PARAMETERS
//
//  BALL_RADIUS  — hyperbolic radius of each ball
//  TUBE_RADIUS  — geodesic tube thickness
//  BG_COLOR     — background color
// =============================================

const float BALL_RADIUS = 0.30;   // hyperbolic radius
const float TUBE_RADIUS = 0.065;  // geodesic tube radius
const vec3  BG_COLOR    = vec3(0.015);

// Tetrahedron vertices + center
void getPoint(int i, out vec3 pos, out vec3 col) {
    if (i == 0) { pos = vec3( 0.0,  0.0,  0.0); col = vec3(1.0, 1.0,  1.0);  return; }  // center
    if (i == 1) { pos = vec3( 1.0,  1.0,  1.0); col = vec3(1.0, 0.35, 0.3);  return; }  // red
    if (i == 2) { pos = vec3( 1.0, -1.0, -1.0); col = vec3(0.3, 0.75, 1.0);  return; }  // blue
    if (i == 3) { pos = vec3(-1.0,  1.0, -1.0); col = vec3(0.35, 1.0, 0.4);  return; }  // green
                  pos = vec3(-1.0, -1.0,  1.0); col = vec3(1.0, 0.8,  0.25);              // yellow
}

// Geodesics: all 10 edges of the complete graph K5
void getGeodesic(int i, out int a, out int b, out vec3 col) {
    col = vec3(0.8, 0.72, 0.6);
    if (i == 0) { a = 0; b = 1; return; }
    if (i == 1) { a = 0; b = 2; return; }
    if (i == 2) { a = 0; b = 3; return; }
    if (i == 3) { a = 0; b = 4; return; }
    if (i == 4) { a = 1; b = 2; col = vec3(0.9, 0.5, 0.3); return; }
    if (i == 5) { a = 1; b = 3; col = vec3(0.9, 0.5, 0.3); return; }
    if (i == 6) { a = 1; b = 4; col = vec3(0.9, 0.5, 0.3); return; }
    if (i == 7) { a = 2; b = 3; col = vec3(0.9, 0.5, 0.3); return; }
    if (i == 8) { a = 2; b = 4; col = vec3(0.9, 0.5, 0.3); return; }
                  a = 3; b = 4; col = vec3(0.9, 0.5, 0.3);
}

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================


// === HELPERS =======================================

vec4 hPoint(vec3 v) {
    return vec4(v, sqrt(1.0 + dot(v, v)));
}

// Distance from p to full geodesic line through A, B
float geodesicLineDist(vec4 p, vec4 A, vec4 B) {
    vec4 t = B + hyp_dot(A, B) * A;
    t = normalize_s(t);
    float alpha = -hyp_dot(p, A);
    float beta  =  hyp_dot(p, t);
    return arccosh_sqrt(max(1.0, alpha * alpha - beta * beta));
}


// === SDF ============================================

float sdf(vec4 p) {
    float d = 1e6;

    for (int i = 0; i < NUM_POINTS; i++) {
        vec3 pos, col;
        getPoint(i, pos, col);
        d = min(d, hyp_dist(p, hPoint(pos)) - BALL_RADIUS);
    }

    for (int i = 0; i < NUM_GEODESICS; i++) {
        int a, b; vec3 col;
        getGeodesic(i, a, b, col);
        vec3 pa, pb, ca, cb;
        getPoint(a, pa, ca);
        getPoint(b, pb, cb);
        d = min(d, geodesicLineDist(p, hPoint(pa), hPoint(pb)) - TUBE_RADIUS);
    }

    return d;
}

// Identify hit object by re-testing at hit point
vec3 hitColor(vec4 p) {
    float d = 1e6;
    vec3 color = BG_COLOR;

    for (int i = 0; i < NUM_POINTS; i++) {
        vec3 pos, col;
        getPoint(i, pos, col);
        float di = hyp_dist(p, hPoint(pos)) - BALL_RADIUS;
        if (di < d) { d = di; color = col; }
    }

    for (int i = 0; i < NUM_GEODESICS; i++) {
        int a, b; vec3 col;
        getGeodesic(i, a, b, col);
        vec3 pa, pb, ca, cb;
        getPoint(a, pa, ca);
        getPoint(b, pb, cb);
        float di = geodesicLineDist(p, hPoint(pa), hPoint(pb)) - TUBE_RADIUS;
        if (di < d) { d = di; color = col; }
    }

    return color;
}


// === GRADIENT ======================================

vec4 hyp_gradient(vec4 p) {
    vec4 eX, eY, eZ;
    transport_frame(p, eX, eY, eZ);
    const float eps = 0.005;

    float gx = sdf(normalize_t(p + eps*eX)) - sdf(normalize_t(p - eps*eX));
    float gy = sdf(normalize_t(p + eps*eY)) - sdf(normalize_t(p - eps*eY));
    float gz = sdf(normalize_t(p + eps*eZ)) - sdf(normalize_t(p - eps*eZ));

    return normalize_s(gx*eX + gy*eY + gz*eZ);
}


// === RAYMARCHING ===================================

vec4 raymarch(vec4 origin, vec4 ray, out float dist) {
    dist = -1.0;
    vec4 p = origin;
    float t = 0.0;
    float d = sdf(p);

    for (int i = 0; i < 128; i++) {
        if (d < 0.00005 * (1.0 + t) || t > 20.0) break;
        t += d;
        p = cosh(t) * origin + sinh(t) * ray;
        d = sdf(p);
    }

    if (d < 0.05) dist = t;
    return p;
}


// === LIGHTING ======================================

vec3 shade(vec4 pos, vec4 normal, vec4 cam) {
    vec3 base = hitColor(pos);

    // Depth fade
    float fade = 1.0 / (1.0 + 0.03 * pos.w * pos.w);
    base *= fade;

    // View direction (tangent at pos toward cam)
    vec4 V = normalize_s(cam + hyp_dot(cam, pos) * pos);

    vec3 color = 0.2 * base;

    // 3 lights at fixed positions on H³
    vec3 lp[3] = vec3[](
        vec3( 0.0,  0.0, 2.5),
        vec3( 2.0,  1.5, 0.5),
        vec3(-1.5, -1.0, 1.5)
    );

    for (int i = 0; i < 3; i++) {
        vec4 light = hPoint(lp[i]);
        float cdist = -hyp_dot(pos, light);
        float atten = 1.0 / (1.0 + 0.04 * cdist * cdist);

        vec4 L = normalize_s(light + hyp_dot(light, pos) * pos);

        float diff = max(hyp_dot(L, normal), 0.0);
        vec4 H = normalize_s(L + V);
        float spec = pow(max(hyp_dot(H, normal), 0.0), 64.0);

        color += atten * (0.5 * diff * base + 0.25 * spec * vec3(1.0));
    }

    return color;
}


// === CAMERA ========================================
// Orbit camera around the origin.
// Modeled on the dodecahedron shader's approach:
// build a 3D look direction, then lift to tangent space.

void build_camera(out vec4 O, out vec4 X, out vec4 Y, out vec4 Z) {
    float theta, phi;
    if (iMouse.z > 0.0) {
        theta = 6.2832 * (iMouse.x / iResolution.x - 0.5);
        phi   = 2.4 * (iMouse.y / iResolution.y - 0.5);
    } else {
        theta = 0.25 * iTime;
        phi   = 0.3 + 0.15 * sin(0.19 * iTime);
    }
    phi = clamp(phi, -1.3, 1.3);

    float cp = cos(phi), sp = sin(phi);
    float ct = cos(theta), st = sin(theta);
    vec3 dir = vec3(cp * ct, cp * st, sp);

    // Camera position on H³
    float R = 2.0;
    vec3 cam_xyz = R * dir;
    float W = sqrt(1.0 + R * R);
    O = vec4(cam_xyz, W);

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

    // Up: complete the frame
    Y = hyp_cross(O, Z, X);
    Y = normalize_s(Y);
}


// === MAIN ==========================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = 2.0 * (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

    vec4 cam, X, Y, Z;
    build_camera(cam, X, Y, Z);

    vec4 ray = normalize_s(uv.x * X + uv.y * Y - Z);

    float dist;
    vec4 pos = raymarch(cam, ray, dist);

    vec3 color = BG_COLOR;

    if (dist >= 0.0) {
        vec4 normal = hyp_gradient(pos);
        color = shade(pos, normal, cam);
    }

    // Gamma
    color = pow(color, vec3(1.0 / 2.2));

    fragColor = vec4(color, 1.0);
}
