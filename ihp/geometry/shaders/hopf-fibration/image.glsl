// ═══════════════════════════════════════════════════════════════
//  ★  EDIT HERE  ★   Fiber Configuration
// ═══════════════════════════════════════════════════════════════
//
//  NUM_FIBERS    — total number of fibers to draw
//  TUBE_RADIUS   — thickness of each fiber tube
//  CAMERA_DIST   — initial camera distance (scroll to zoom)
//
//  INTRINSIC — how fiber thickness is measured:
//    0 → uniform Euclidean thickness in R³
//    1 → uniform thickness on S³ (intrinsic geometry)
//        fibers swell near ∞ where stereographic projection
//        stretches space, revealing the conformal factor

#define NUM_FIBERS  16
#define TUBE_RADIUS 0.06
#define CAMERA_DIST 5.0
#define INTRINSIC   0


// ── Base points on S² ───────────────────────────────────────
//  Return the i-th point on S² (i = 0 .. NUM_FIBERS-1).
//  The Hopf fiber over each point will be drawn.
//  Uncomment ONE block, or write your own.

/*
// Latitude rings: 5 rings × 12 points per ring = 60 fibers.
// Each ring sits at a fixed colatitude, so its fibers all
// lie on the same Clifford torus.
vec3 basePoint(int i) {
    int ptsPerRing = 12;
    int ring = i / ptsPerRing;
    int j    = i - ring * ptsPerRing;
    int numRings = NUM_FIBERS / ptsPerRing;
    float theta = PI * float(ring + 1) / float(numRings + 1);
    float phi   = TAU * float(j) / float(ptsPerRing);
    float st = sin(theta), ct = cos(theta);
    return vec3(st * cos(phi), st * sin(phi), ct);
}
*/


// Fibonacci spiral: approximately uniform distribution on S².
// Good for seeing all the different torus shapes at once.
vec3 basePoint(int i) {
    float golden = (1.0 + sqrt(5.0)) * 0.5;
    float theta = acos(1.0 - 2.0 * (float(i) + 0.5) / float(NUM_FIBERS));
    float phi   = TAU * float(i) / golden;
    float st = sin(theta), ct = cos(theta);
    return vec3(st * cos(phi), st * sin(phi), ct);
}


// ── Fiber color ─────────────────────────────────────────────
//  Color each fiber by its base point on S².
//  Default: hue = longitude, brightness = latitude.

vec3 fiberColor(vec3 bp) {
    float hue = atan(bp.y, bp.x) / TAU + 0.5;
    float lit = 0.5 + 0.45 * bp.z;
    return hsv2rgb(vec3(hue, 0.82, lit));
}


// ═══════════════════════════════════════════════════════════════
//  Implementation — no need to edit below this line
// ═══════════════════════════════════════════════════════════════

#define MAX_STEPS  100
#define MAX_DIST   25.0
#define SURF_DIST  0.001


// ── SDF ─────────────────────────────────────────────────────
//
//  Distance from x ∈ R³ to the Hopf fiber over p ∈ S²:
//
//    d(x, fiber_p) ≈ (|x|²+1)/4 · arccos⟨π(σ⁻¹(x)), p⟩
//
//  The (|x|²+1)/4 factor combines:
//    • (|x|²+1)/2   conformal factor of σ: S³→R³
//    • 1/2           from the Riemannian submersion S³(1)→S²(½)

float sceneSDF(vec3 x, out vec3 col) {
    vec4  q = invStereoS3(x);
    vec3  h = hopfMap(q);
    float conformal = (dot(x, x) + 1.0) * 0.25;

    float dMin = 1e10;
    col = vec3(0);

    for (int i = 0; i < NUM_FIBERS; i++) {
        vec3 bp  = basePoint(i);
        float ang = acos(clamp(dot(h, bp), -1.0, 1.0));

#if INTRINSIC
        float dFiber = conformal * (ang - TUBE_RADIUS);
#else
        float dFiber = conformal * ang - TUBE_RADIUS;
#endif

        if (dFiber < dMin) {
            dMin = dFiber;
            col  = fiberColor(bp);
        }
    }
    return dMin;
}

float sdf(vec3 x) {
    vec3 c;
    return sceneSDF(x, c);
}

vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.001, 0);
    return normalize(vec3(
        sdf(p + e.xyy) - sdf(p - e.xyy),
        sdf(p + e.yxy) - sdf(p - e.yxy),
        sdf(p + e.yyx) - sdf(p - e.yyx)
    ));
}


void mainImage(out vec4 O, in vec2 F) {
    vec2 uv = (F - 0.5 * iResolution.xy) / iResolution.y;

    vec2 m = iMouse.z > 0.0
        ? (iMouse.xy / iResolution.xy - 0.5) * vec2(TAU, PI)
        : vec2(0.5, 0.3);

    mat3 cam = orbitCamera(m.x, m.y);
    vec3 ro  = -CAMERA_DIST * cam[2];
    vec3 rd  = normalize(cam * vec3(uv, 1));

    float t = 0.0;
    vec3  col;
    bool  hit = false;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3  p = ro + t * rd;
        float d = sceneSDF(p, col);
        if (d < SURF_DIST) { hit = true; break; }
        t += d;
        if (t > MAX_DIST) break;
    }

    vec3 result;
    if (hit) {
        vec3 p = ro + t * rd;
        vec3 n = calcNormal(p);
        result = shade(col, n, rd, t);
    } else {
        result = mix(vec3(0.01, 0.01, 0.02),
                     vec3(0.04, 0.03, 0.07), uv.y + 0.5);
    }

    O = vec4(pow(clamp(result, 0.0, 1.0), vec3(1.0/2.2)), 1);
}
