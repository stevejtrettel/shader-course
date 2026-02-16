// ============================================================
//  APOLLONIAN CIRCLE PACKING
//  Given three mutually tangent circles (specified by curvature),
//  this shader computes the fourth via Descartes' theorem, then
//  draws the full Apollonian gasket by iterating inversions
//  through the dual circles of the initial quadruple.
// ============================================================


// === USER SETTINGS =========================================

// Curvatures of three mutually tangent circles.
// Use 0.0 for a straight line, negative for exterior circles.
//   Try: (2, 2, 3), (3, 6, 7), (0, 1, 1), (0, 0, 1)
const float K1 = 1.0;
const float K2 = 2.0;
const float K3 = 3.0;

// Which solution of Descartes' equation for the fourth circle:
//   false = outer circle (- root, typically negative curvature)
//   true  = inner circle (+ root, smaller circle in the interstice)
const bool INNER = false;


// Camera: center point and zoom level
const vec2  CENTER = vec2(0.0, 1.0);  // world-space center of the view
const float ZOOM   = 4.5;             // half-width of view (smaller = zoomed in)


// Colors for each of the four initial circles (RGB).
const vec3 COLOR_0 = vec3(0.30, 1.00, 0.40);  // green  (k1)
const vec3 COLOR_1 = vec3(1.00, 0.45, 0.55);  // pink   (k2)
const vec3 COLOR_2 = vec3(0.70, 0.40, 0.90);  // purple (k3)
const vec3 COLOR_3 = vec3(1.00, 1.00, 0.30);  // yellow (k4, computed)

// Background color (the gasket dust)
const vec3 COLOR_BG = vec3(0.08);

// How quickly circles fade toward white with depth.
// 0.0 = no fade, 1.0 = maximum fade. Try 0.3 to 0.7.
const float FADE_RATE = 1.;

// Circle boundary lines
const float BORDER_THICKNESS = 0.003;  // in world coords
const vec3  BORDER_COLOR = vec3(0.0);  // black outlines
const float BORDER_FADE  = 0.6;        // how much borders fade with depth

// Maximum iterations
const int MAX_ITER = 100;


// === END USER SETTINGS =====================================




const float EPS = 1e-4;


// --- Descartes' Theorem ---
// (k1+k2+k3+k4)^2 = 2(k1^2+k2^2+k3^2+k4^2)
// => k4 = k1+k2+k3 +/- 2*sqrt(k1*k2 + k2*k3 + k3*k1)

float descartesK4(float a, float b, float c, bool inner) {
    float disc = a * b + b * c + c * a;
    float s = a + b + c;
    float root = sqrt(max(0.0, disc));
    return inner ? s + 2.0 * root : s - 2.0 * root;
}


// --- Data Structures ---

struct Circle {
    vec2 center;
    float curvature;
    float offset;
};


// --- Geometric Operations ---

vec2 invert(vec2 z, Circle C) {
    if (abs(C.curvature) < EPS) {
        return z - 2.0 * (dot(z, C.center) - C.offset) * C.center;
    }
    vec2 d = z - C.center;
    float r = 1.0 / C.curvature;
    return C.center + (r * r / dot(d, d)) * d;
}

bool isInside(vec2 p, Circle c) {
    if (abs(c.curvature) < EPS) {
        return dot(p, c.center) > c.offset;
    }
    float dist = length(p - c.center);
    float r = 1.0 / c.curvature;
    return (c.curvature > 0.0) ? (dist < r) : (dist > abs(r));
}

// Unsigned distance to circle/line boundary
float distToBoundary(vec2 p, Circle C) {
    if (abs(C.curvature) < EPS) {
        return abs(dot(p, C.center) - C.offset);
    }
    return abs(length(p - C.center) - abs(1.0 / C.curvature));
}


// --- Circle Construction ---

Circle lineFromPoints(vec2 A, vec2 B) {
    vec2 t = normalize(B - A);
    vec2 n = vec2(-t.y, t.x);
    return Circle(n, 0.0, dot(n, A));
}

Circle circleFromThreePoints(vec3 A, vec3 B, vec3 C) {
    if (A.z < EPS) return lineFromPoints(B.xy, C.xy);
    if (B.z < EPS) return lineFromPoints(A.xy, C.xy);
    if (C.z < EPS) return lineFromPoints(A.xy, B.xy);

    vec2 a = A.xy, b = B.xy, c = C.xy;
    vec2 ab = b - a, ac = c - a;
    float d = 2.0 * (ab.x * ac.y - ab.y * ac.x);

    if (abs(d) < EPS) return lineFromPoints(a, b);

    vec2 u = vec2(
        ac.y * dot(ab, ab) - ab.y * dot(ac, ac),
        ab.x * dot(ac, ac) - ac.x * dot(ab, ab)
    ) / d;

    vec2 center = a + u;
    float radius = length(u);
    return Circle(center, 1.0 / radius, 0.0);
}


// --- Tangent Points ---

vec3 getTangentPoint(Circle c1, Circle c2) {
    bool line1 = abs(c1.curvature) < EPS;
    bool line2 = abs(c2.curvature) < EPS;

    if (line1 && line2) return vec3(0.0, 0.0, 0.0);
    if (line1) return vec3(c2.center - c1.center / c2.curvature, 1.0);
    if (line2) return vec3(c1.center - c2.center / c1.curvature, 1.0);

    float k1 = c1.curvature, k2 = c2.curvature;
    return vec3((k1 * c1.center + k2 * c2.center) / (k1 + k2), 1.0);
}


// --- Orientation Helpers ---

bool checkDescartes(vec4 q) {
    float s = q.x + q.y + q.z + q.w;
    return abs(2.0 * dot(q, q) - s * s) < EPS;
}

void orientLine(inout Circle line, Circle ref) {
    if (isInside(ref.center, line)) {
        line.center *= -1.0;
        line.offset *= -1.0;
    }
}

void sortSwap(inout float a, inout float b, inout int idxA, inout int idxB) {
    if (a > b) {
        float t = a; a = b; b = t;
        int ti = idxA; idxA = idxB; idxB = ti;
    }
}

void orientDuals(inout Circle circ[4]) {
    vec4 k = vec4(circ[0].curvature, circ[1].curvature,
                  circ[2].curvature, circ[3].curvature);
    ivec4 idx = ivec4(0, 1, 2, 3);

    sortSwap(k.x, k.y, idx.x, idx.y);
    sortSwap(k.z, k.w, idx.z, idx.w);
    sortSwap(k.x, k.z, idx.x, idx.z);
    sortSwap(k.y, k.w, idx.y, idx.w);
    sortSwap(k.y, k.z, idx.y, idx.z);

    int zeros = 0;
    if (abs(k.x) < EPS) zeros++;
    if (abs(k.y) < EPS) zeros++;

    if (zeros == 0) {
        if (!checkDescartes(k))
            circ[idx.x].curvature = -circ[idx.x].curvature;
    } else {
        orientLine(circ[idx.x], circ[idx.w]);
        if (zeros == 2)
            orientLine(circ[idx.y], circ[idx.w]);
    }
}


// --- Apollonian Solver ---

mat4 solveApollonianQuad(vec4 kInput) {
    vec4 k = kInput;
    ivec4 idx = ivec4(0, 1, 2, 3);

    sortSwap(k.x, k.y, idx.x, idx.y);
    sortSwap(k.z, k.w, idx.z, idx.w);
    sortSwap(k.x, k.z, idx.x, idx.z);
    sortSwap(k.y, k.w, idx.y, idx.w);
    sortSwap(k.y, k.z, idx.y, idx.z);

    int zeros = 0;
    if (abs(k.x) < EPS) zeros++;
    if (abs(k.y) < EPS) zeros++;

    Circle c[4];
    ivec4 mapToGeom;

    if (zeros == 2) {
        float kC = (abs(k.z) > EPS) ? k.z : k.w;
        float gap = 2.0 / kC;
        c[0] = Circle(vec2(0.0, -1.0), 0.0, 0.0);
        c[1] = Circle(vec2(0.0,  1.0), 0.0, gap);
        c[2] = Circle(vec2(0.0, 1.0 / k.z), k.z, 0.0);
        c[3] = Circle(vec2(-2.0 / k.w, 1.0 / k.w), k.w, 0.0);
        mapToGeom = ivec4(0, 1, 2, 3);
    }
    else if (zeros == 1) {
        c[0] = Circle(vec2(0.0, 1.0), 0.0, 0.0);
        c[1] = Circle(vec2(0.0, 1.0 / k.y), k.y, 0.0);
        c[2] = Circle(vec2(2.0 / sqrt(k.y * k.z), 1.0 / k.z), k.z, 0.0);
        c[3] = Circle(vec2(2.0 / sqrt(k.y * k.w), 1.0 / k.w), k.w, 0.0);
        mapToGeom = ivec4(0, 1, 2, 3);
    }
    else {
        float a, b, cv, d;
        if (k.x < -EPS) {
            a = k.x; b = k.y; cv = k.z; d = k.w;
            mapToGeom = ivec4(3, 0, 1, 2);
        } else {
            b = k.x; cv = k.y; d = k.z; a = k.w;
            mapToGeom = ivec4(0, 1, 2, 3);
        }

        c[0] = Circle(vec2(0.0, 1.0 / b), b, 0.0);
        float xc = 2.0 / sqrt(b * cv);
        c[1] = Circle(vec2(xc, 1.0 / cv), cv, 0.0);

        float rB = 1.0 / b, rC = 1.0 / cv, rD = 1.0 / d;
        float dB = rB + rD, dC = rC + rD;
        float dCenters = distance(c[0].center, c[1].center);

        float xLocal = (dB * dB - dC * dC + dCenters * dCenters) / (2.0 * dCenters);
        float yLocal = sqrt(max(0.0, dB * dB - xLocal * xLocal));
        vec2 dir = (c[1].center - c[0].center) / dCenters;
        vec2 nrm = vec2(-dir.y, dir.x);
        c[2] = Circle(c[0].center + xLocal * dir - yLocal * nrm, d, 0.0);

        float sumK = a + b + cv + d;
        vec2 sKz = vec2(0.0), sK2z = vec2(0.0);
        for (int i = 0; i < 3; i++) {
            sKz  += c[i].curvature * c[i].center;
            sK2z += (c[i].curvature * c[i].curvature) * c[i].center;
        }
        float denom = a * a - 0.5 * sumK * a;
        if (abs(denom) < 1e-9) denom = 1.0;
        c[3] = Circle((0.5 * sumK * sKz - sK2z) / denom, a, 0.0);
    }

    mat4 result;
    for (int i = 0; i < 4; i++) {
        int gi = mapToGeom[i];
        int oi = idx[i];
        Circle g = c[gi];
        vec4 col;

        if (abs(g.curvature) < EPS) {
            col = vec4(0.0, g.center.x, g.center.y, g.offset);
        } else {
            float kx = g.curvature * g.center.x;
            float ky = g.curvature * g.center.y;
            float q  = (kx * kx + ky * ky - 1.0) / g.curvature;
            col = vec4(g.curvature, kx, ky, q);
        }

        if      (oi == 0) result[0] = col;
        else if (oi == 1) result[1] = col;
        else if (oi == 2) result[2] = col;
        else              result[3] = col;
    }
    return result;
}

Circle decodeCircle(vec4 v) {
    if (abs(v.x) < EPS) {
        return Circle(vec2(v.y, v.z), 0.0, v.w);
    }
    return Circle(vec2(v.y / v.x, v.z / v.x), v.x, 0.0);
}

Circle[4] buildQuadruple(vec4 curvatures) {
    mat4 packed = solveApollonianQuad(curvatures);
    return Circle[4](
        decodeCircle(packed[0]),
        decodeCircle(packed[1]),
        decodeCircle(packed[2]),
        decodeCircle(packed[3])
    );
}


// --- Main Packing Renderer ---

vec4 renderPacking(Circle main[4], vec2 p) {

    vec3 t01 = getTangentPoint(main[0], main[1]);
    vec3 t02 = getTangentPoint(main[0], main[2]);
    vec3 t03 = getTangentPoint(main[0], main[3]);
    vec3 t12 = getTangentPoint(main[1], main[2]);
    vec3 t23 = getTangentPoint(main[2], main[3]);
    vec3 t31 = getTangentPoint(main[3], main[1]);

    Circle dual[4] = Circle[4](
        circleFromThreePoints(t12, t23, t31),
        circleFromThreePoints(t02, t23, t03),
        circleFromThreePoints(t01, t03, t31),
        circleFromThreePoints(t12, t02, t01)
    );
    orientDuals(dual);

    vec3 colors[4] = vec3[4](COLOR_0, COLOR_1, COLOR_2, COLOR_3);

    // Track the cumulative scale factor from inversions,
    // so circle borders have consistent screen-space thickness
    // at every depth. Circle inversion scales locally by r^2/|z-c|^2.
    float scale = 1.0;

    for (int i = 0; i < MAX_ITER; i++) {

        for (int j = 0; j < 4; j++) {
            if (isInside(p, main[j])) {

                // Base fill: color faded toward white by depth
                float fade = 1.0 - exp(-FADE_RATE * float(i));
                vec3 col = mix(colors[j], vec3(1.0), fade);

                // Border: unsigned distance to boundary, scaled so
                // deep circles get the same pixel-width lines
                float d = distToBoundary(p, main[j]);
                float threshold = BORDER_THICKNESS * scale;

                if (d < threshold) {
                    float t = smoothstep(0.0, threshold, d);
                    // Fade the border toward the fill at high depth
                    float bf = mix(1.0, BORDER_FADE, fade);
                    vec3 bord = mix(BORDER_COLOR, col, 1.0 - bf);
                    col = mix(bord, col, t);
                }

                return vec4(col, float(i));
            }
        }

        // Invert through whichever dual circle contains p
        bool moved = false;
        for (int j = 0; j < 4; j++) {
            if (isInside(p, dual[j])) {
                // Accumulate local scale factor
                if (abs(dual[j].curvature) > EPS) {
                    float r = 1.0 / dual[j].curvature;
                    vec2 diff = p - dual[j].center;
                    scale *= (r * r) / dot(diff, diff);
                }
                p = invert(p, dual[j]);
                moved = true;
                break;
            }
        }

        if (!moved) break;
    }

    return vec4(COLOR_BG, -1.0);
}


// --- Entry Point ---

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y * ZOOM + CENTER;

    // Compute the fourth curvature via Descartes' theorem
    float k4 = descartesK4(K1, K2, K3, INNER);
    vec4 curvatures = vec4(K1, K2, K3, k4);

    Circle[4] mainCircles = buildQuadruple(curvatures);
    vec4 result = renderPacking(mainCircles, uv);

    fragColor = vec4(result.xyz, 1.0);
}