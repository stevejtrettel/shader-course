// ═══════════════════════════════════════════════════════════════
//  ★  EDIT HERE  ★   Billiard phase portrait
// ═══════════════════════════════════════════════════════════════
//
//  Phase space of a convex billiard table: the cylinder (s, θ)
//    s = arc length position on the boundary (horizontal axis)
//    θ = outgoing angle from the tangent   (vertical axis, 0 to π)
//
//  Each pixel is a different initial condition.
//  Color encodes the rotation number: the average fraction
//  of the perimeter traversed per bounce.
//
//  Table must be convex.  Change NUM_VERTS and getVertex below.

#define MAX_ITER 200            // bounces per orbit (more = sharper)

// ── Square (default — completely integrable) ──────────────────
#define NUM_VERTS 4
vec2 getVertex(int i) {
    vec2 v[4];
    v[0] = vec2(-0.5, -0.5);
    v[1] = vec2( 0.5, -0.5);
    v[2] = vec2( 0.5,  0.5);
    v[3] = vec2(-0.5,  0.5);
    return v[i];
}

// ── Regular pentagon ──────────────────────────────────────────
//#define NUM_VERTS 5
//vec2 getVertex(int i) {
//    float a = float(i) * 6.2832 / float(NUM_VERTS) + 1.5708;
//    return 0.40 * vec2(cos(a), sin(a));
//}

// ── Equilateral triangle ──────────────────────────────────────
//#define NUM_VERTS 3
//vec2 getVertex(int i) {
//    float a = float(i) * 6.2832 / 3.0 + 1.5708;
//    return 0.42 * vec2(cos(a), sin(a));
//}

// ── Regular hexagon ───────────────────────────────────────────
//#define NUM_VERTS 6
//vec2 getVertex(int i) {
//    float a = float(i) * 6.2832 / 6.0;
//    return 0.40 * vec2(cos(a), sin(a));
//}

// ── Near-circle (60-gon, nearly integrable) ───────────────────
//#define NUM_VERTS 60
//vec2 getVertex(int i) {
//    float a = float(i) * 6.2832 / float(NUM_VERTS);
//    return 0.40 * vec2(cos(a), sin(a));
//}


// ═══════════════════════════════════════════════════════════════
//  Implementation — no need to edit below this line
// ═══════════════════════════════════════════════════════════════

const float PI  = 3.141592653589793;
const float TAU = 6.283185307179586;

float edgeLens[NUM_VERTS];
float cumLens[NUM_VERTS];
float totalPerim;

void initGeometry() {
    totalPerim = 0.0;
    for (int i = 0; i < NUM_VERTS; i++) {
        cumLens[i] = totalPerim;
        edgeLens[i] = length(getVertex((i+1) % NUM_VERTS) - getVertex(i));
        totalPerim += edgeLens[i];
    }
}

// Arc length → position on boundary + frame
void arcToState(float s, out vec2 pos, out vec2 T, out vec2 N) {
    s = mod(s, totalPerim);
    for (int i = 0; i < NUM_VERTS; i++) {
        if (s <= cumLens[i] + edgeLens[i] + 1e-7) {
            float t = (s - cumLens[i]) / edgeLens[i];
            vec2 a = getVertex(i);
            vec2 b = getVertex((i+1) % NUM_VERTS);
            pos = mix(a, b, clamp(t, 0.0, 1.0));
            T = normalize(b - a);
            N = vec2(-T.y, T.x);  // inward normal for CCW polygon
            return;
        }
    }
    vec2 a = getVertex(0), b = getVertex(1);
    pos = a; T = normalize(b - a); N = vec2(-T.y, T.x);
}

// Ray–edge intersection; returns ray parameter, sets edge parameter et
float rayEdge(vec2 ro, vec2 rd, vec2 a, vec2 b, out float et) {
    vec2 e = b - a;
    float den = rd.x * e.y - rd.y * e.x;
    if (abs(den) < 1e-10) { et = -1.0; return -1.0; }
    vec2 d = a - ro;
    float t = (d.x * e.y - d.y * e.x) / den;
    float s = (d.x * rd.y - d.y * rd.x) / den;
    if (t > 0.001 && s > 0.002 && s < 0.998) {
        et = s; return t;
    }
    et = -1.0; return -1.0;
}

// One billiard bounce.  Returns arc length of new hit point.
float bounce(inout vec2 pos, inout vec2 dir) {
    float bestT = 1e10;
    float bestET = 0.0;
    int bestEdge = -1;
    for (int i = 0; i < NUM_VERTS; i++) {
        float et;
        float t = rayEdge(pos, dir, getVertex(i),
                          getVertex((i+1) % NUM_VERTS), et);
        if (t > 0.0 && t < bestT) {
            bestT = t; bestET = et; bestEdge = i;
        }
    }
    if (bestEdge < 0) return -1.0;
    pos += dir * bestT;
    vec2 eD = normalize(getVertex((bestEdge+1) % NUM_VERTS)
                        - getVertex(bestEdge));
    vec2 n = vec2(-eD.y, eD.x);
    if (dot(n, dir) > 0.0) n = -n;
    dir -= 2.0 * dot(dir, n) * n;
    return cumLens[bestEdge] + bestET * edgeLens[bestEdge];
}

vec3 palette(float t) {
    return 0.5 + 0.5 * cos(TAU * (t + vec3(0.0, 0.33, 0.67)));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    initGeometry();
    vec2 uv = fragCoord / iResolution.xy;

    // Phase space: x → arc length, y → outgoing angle
    float s0    = uv.x * totalPerim;
    float theta = mix(0.01, PI - 0.01, uv.y);

    vec2 pos, T, N;
    arcToState(s0, pos, T, N);
    vec2 dir = cos(theta) * T + sin(theta) * N;

    float prevArc = s0;
    float cumAdv  = 0.0;
    bool  ok      = true;

    for (int i = 0; i < MAX_ITER; i++) {
        float newArc = bounce(pos, dir);
        if (newArc < 0.0) { ok = false; break; }
        float adv = newArc - prevArc;
        if (adv < 0.0) adv += totalPerim;
        cumAdv += adv;
        prevArc = newArc;
    }

    vec3 col = vec3(0.02);
    if (ok) {
        float rho = cumAdv / (float(MAX_ITER) * totalPerim);
        col = palette(rho * 5.0);

        // Faint vertex lines (edge boundaries in phase space)
        float px = 1.0 / iResolution.x;
        for (int i = 0; i < NUM_VERTS; i++) {
            float vx = cumLens[i] / totalPerim;
            col *= smoothstep(0.0, 2.0 * px, abs(uv.x - vx));
        }
    }

    fragColor = vec4(col, 1.0);
}
