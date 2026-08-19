// =============================================
//  IHP Shader Workshop 2026
//  HYPERBOLIC TRIANGLE TILINGS
//
//  (P, Q, R) triangle group tilings of the
//  hyperbolic plane via iterated reflection.
//  Choose the triangle angles and viewing model.
// =============================================

// =============================================
//  YOUR TRIANGLE GROUP
// =============================================

// Model (uncomment one)
#define MODEL_POINCARE
//#define MODEL_UHP
//#define MODEL_KLEIN
//#define MODEL_BAND

// Theme (uncomment one)
//#define THEME_DARK
#define THEME_LIGHT

// Triangle group (P, Q, R)
//   Angles pi/P, pi/Q, pi/R.
//   Must satisfy 1/P + 1/Q + 1/R < 1.
#define TRI_P  3
#define TRI_Q  2
#define TRI_R  10

// What to draw
#define DRAW_EDGES    true
#define DRAW_VERTICES true
#define DRAW_PARITY   true    // two-color by orientation?

// =============================================
//  PARAMETERS
//
//  EDGE_THICKNESS   — hyperbolic width of edges
//  VERTEX_RADIUS    — hyperbolic radius of vertices
//  ZOOM             — camera zoom level
//  ANIMATE          — enable orbit animation
//  ROTATE_SPEED     — rotation speed
//  DRIFT_AMOUNT     — drift amplitude
// =============================================

#define EDGE_THICKNESS   0.015
#define VERTEX_RADIUS    0.06

#define ZOOM 2.4

#define ANIMATE       true
#define ROTATE_SPEED  0.3
#define DRIFT_AMOUNT  0.15

// Colors
#ifdef THEME_DARK
    const vec3 COLOR_A      = vec3(0.55, 0.70, 0.85);
    const vec3 COLOR_B      = vec3(0.20, 0.30, 0.45);
    const vec3 COLOR_EDGE   = vec3(0.92, 0.88, 0.82);
    const vec3 COLOR_VERTEX = vec3(0.90, 0.35, 0.25);
    const vec3 COLOR_BG     = vec3(0.02, 0.02, 0.03);
    const vec3 COLOR_BORDER = vec3(0.25, 0.25, 0.3);
#else
    const vec3 COLOR_A      = vec3(0.72, 0.82, 0.92);
    const vec3 COLOR_B      = vec3(0.45, 0.55, 0.70);
    const vec3 COLOR_EDGE   = vec3(0.15, 0.12, 0.08);
    const vec3 COLOR_VERTEX = vec3(0.85, 0.3, 0.2);
    const vec3 COLOR_BG     = vec3(0.88, 0.87, 0.85);
    const vec3 COLOR_BORDER = vec3(0.4, 0.38, 0.35);
#endif

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

const float PI = 3.14159265;

vec2 cmul(vec2 a, vec2 b) {
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}
vec2 cdiv(vec2 a, vec2 b) {
    return vec2(a.x*b.x + a.y*b.y, a.y*b.x - a.x*b.y) / dot(b, b);
}
vec2 ctanh(vec2 z) {
    float d = cosh(2.0*z.x) + cos(2.0*z.y);
    return vec2(sinh(2.0*z.x), sin(2.0*z.y)) / d;
}

vec2 diskToUHP(vec2 w) {
    return cmul(vec2(0,1), cdiv(vec2(1,0)+w, vec2(1,0)-w));
}
vec2 kleinToDisk(vec2 w) {
    float s = length(w);
    if (s < 0.0001) return vec2(0);
    return w / (1.0 + sqrt(max(1.0 - dot(w,w), 0.0)));
}
vec2 diskRotate(vec2 w, float angle) {
    float c = cos(angle), s = sin(angle);
    return vec2(c*w.x - s*w.y, s*w.x + c*w.y);
}
vec2 diskTranslate(vec2 w, vec2 a) {
    return cdiv(w - a, vec2(1,0) - cmul(vec2(a.x,-a.y), w));
}

// Half-space types
struct HSVert { float x; float side; };
struct HSCirc { float center; float radius; float side; };

vec2 reflectInto(vec2 z, HSVert h, inout int count) {
    if ((z.x - h.x) * h.side >= 0.0) return z;
    count++;
    return vec2(2.0*h.x - z.x, z.y);
}
vec2 reflectInto(vec2 z, HSCirc h, inout int count) {
    vec2 rel = z - vec2(h.center, 0.0);
    float r2 = h.radius * h.radius;
    if ((dot(rel, rel) - r2) * h.side >= 0.0) return z;
    count++;
    z.x -= h.center;
    z = z * (r2 / dot(z, z));
    z.x += h.center;
    return z;
}

// Hyperbolic distances
float distToVert(vec2 z, float c) {
    vec2 w = z - vec2(c, 0.0);
    return acosh(max(1.0, length(w) / z.y));
}
float distToCirc(vec2 z, float center, float radius) {
    vec2 num   = z - vec2(center + radius, 0.0);
    vec2 denom = z - vec2(center - radius, 0.0);
    vec2 w = cdiv(num, denom);
    return acosh(max(1.0, length(w) / max(w.y, 1e-10)));
}
float hypDist(vec2 z1, vec2 z2) {
    vec2 d = z1 - z2;
    return acosh(max(1.0, 1.0 + dot(d,d) / (2.0*z1.y*z2.y)));
}

// Triangle data
struct TriData {
    HSVert sideA;
    HSCirc sideB;
    HSCirc sideC;
    vec2 vertP, vertQ, vertR;
};

TriData buildTriangle(int P, int Q, int R) {
    float p = float(P), q = float(Q), r = float(R);
    float cosP = cos(PI/p), sinP = sin(PI/p);
    float cosQ = cos(PI/q), sinQ = sin(PI/q);
    float cosR = cos(PI/r);
    float xA = -cosP;
    HSVert sideA = HSVert(xA, 1.0);
    HSCirc sideB = HSCirc(0.0, 1.0, 1.0);
    float coshSR = (cosR + cosP*cosQ) / (sinP*sinQ);
    float eucH = sinP * exp(acosh(coshSR));
    float x_off = eucH / tan(PI/q);
    float cC = xA - x_off;
    float rC = sqrt(x_off*x_off + eucH*eucH);
    HSCirc sideC = HSCirc(cC, rC, -1.0);
    vec2 vertP = vec2(xA, sinP);
    float dy = sqrt(max(rC*rC - (xA-cC)*(xA-cC), 0.0));
    vec2 vertR = vec2(xA, dy);
    float xQ = (1.0 + cC*cC - rC*rC) / (2.0*cC);
    float yQ = sqrt(max(1.0 - xQ*xQ, 0.0));
    vec2 vertQ = vec2(xQ, yQ);
    return TriData(sideA, sideB, sideC, vertP, vertQ, vertR);
}

vec2 foldIntoTriangle(vec2 z, TriData tri, out int foldCount) {
    foldCount = 0;
    for (int i = 0; i < 100; i++) {
        vec2 z0 = z;
        z = reflectInto(z, tri.sideA, foldCount);
        z = reflectInto(z, tri.sideB, foldCount);
        z = reflectInto(z, tri.sideC, foldCount);
        if (dot(z - z0, z - z0) < 1e-8) break;
    }
    return z;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy - 0.5;
    uv.x *= iResolution.x / iResolution.y;
    vec2 w = uv * float(ZOOM);

    #ifdef MODEL_POINCARE
        if (ANIMATE) {
            float t = iTime * ROTATE_SPEED;
            w = diskRotate(w, t);
            w = diskTranslate(w, DRIFT_AMOUNT * vec2(sin(t*1.3), cos(t*0.9)));
        }
    #endif

    bool inDomain = false;
    float borderDist = 1e6;
    vec2 z;

    #ifdef MODEL_POINCARE
        inDomain = length(w) < 0.998;
        borderDist = 1.0 - length(w);
        z = diskToUHP(w);
    #endif
    #ifdef MODEL_KLEIN
        inDomain = length(w) < 0.998;
        borderDist = 1.0 - length(w);
        vec2 dkPt = kleinToDisk(w);
        if (ANIMATE) {
            float t = iTime * ROTATE_SPEED;
            dkPt = diskRotate(dkPt, t);
            dkPt = diskTranslate(dkPt, DRIFT_AMOUNT * vec2(sin(t*1.3), cos(t*0.9)));
        }
        z = diskToUHP(dkPt);
    #endif
    #ifdef MODEL_BAND
        float bandHalf = PI * 0.25 * float(ZOOM) / 2.4;
        inDomain = abs(w.y) < bandHalf * 0.998;
        borderDist = bandHalf - abs(w.y);
        vec2 bdPt = ctanh(w);
        if (ANIMATE) {
            float t = iTime * ROTATE_SPEED;
            bdPt = diskRotate(bdPt, t);
            bdPt = diskTranslate(bdPt, DRIFT_AMOUNT * vec2(sin(t*1.3), cos(t*0.9)));
        }
        z = diskToUHP(bdPt);
    #endif
    #ifdef MODEL_UHP
        z = w * 2.0 + vec2(0, 2.5);
        inDomain = z.y > 0.0;
        borderDist = z.y;
    #endif

    vec3 color = COLOR_BG;
    #if defined(MODEL_POINCARE) || defined(MODEL_KLEIN) || defined(MODEL_BAND)
        float pixSize = float(ZOOM) / iResolution.y;
        if (abs(borderDist) < pixSize * 2.0)
            color = COLOR_BORDER;
    #endif

    if (!inDomain) {
        fragColor = vec4(color, 1.0);
        return;
    }

    TriData tri = buildTriangle(TRI_P, TRI_Q, TRI_R);
    int foldCount;
    vec2 zf = foldIntoTriangle(z, tri, foldCount);

    if (DRAW_PARITY)
        color = (mod(float(foldCount), 2.0) < 0.5) ? COLOR_A : COLOR_B;
    else
        color = COLOR_A;

    if (DRAW_EDGES) {
        float d1 = distToVert(zf, tri.sideA.x);
        float d2 = distToCirc(zf, tri.sideB.center, tri.sideB.radius);
        float d3 = distToCirc(zf, tri.sideC.center, tri.sideC.radius);
        if (min(d1, min(d2, d3)) < EDGE_THICKNESS)
            color = COLOR_EDGE;
    }

    if (DRAW_VERTICES) {
        float dP = hypDist(zf, tri.vertP);
        float dQ = hypDist(zf, tri.vertQ);
        float dR = hypDist(zf, tri.vertR);
        if (min(dP, min(dQ, dR)) < VERTEX_RADIUS)
            color = COLOR_VERTEX;
    }

    fragColor = vec4(color, 1.0);
}
