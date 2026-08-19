// =============================================
//  IHP Shader Workshop 2026
//  WYTHOFF TILINGS
//
//  Wythoff construction from (P, Q, R) triangle
//  groups. Choose the generating point position
//  to get regular, uniform, or omnitruncated
//  tilings.
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
#define TRI_P  2
#define TRI_Q  3
#define TRI_R  7

// Generating point
//   Controls which Wythoff tiling you get.
//
//   Mirrors:  a = vertical line (has vertices P, R)
//             b = unit circle   (has vertices P, Q)
//             c = computed arc  (has vertices Q, R)
//
//   0 = vertex P (pi/P)    on a,b
//   1 = vertex Q (pi/Q)    on b,c
//   2 = vertex R (pi/R)    on a,c
//   3 = uniform pt on QR   on c     (equidistant from a,b)
//   4 = uniform pt on PR   on a     (equidistant from b,c)
//   5 = uniform pt on PQ   on b     (equidistant from a,c)
//   6 = incenter            off all  (equidistant from a,b,c)
//   7 = MANUAL (see below)
#define GEN_POINT 5

// Manual generating point (only when GEN_POINT == 7)
//   GEN_MIRROR: 0 = sideA, 1 = sideB, 2 = sideC
//   GEN_T: position along mirror (0 to 1, hyperbolic interp)
#define GEN_MIRROR 0
#define GEN_T      0.5

// Drawing options
#define DRAW_WYTHOFF_EDGES    true
#define DRAW_WYTHOFF_VERTICES true
#define DRAW_TRIANGLE_EDGES   false
#define DRAW_TRIANGLE_PARITY  false

// =============================================
//  PARAMETERS
//
//  WYTHOFF_EDGE_THICKNESS  — width of Wythoff polygon edges
//  WYTHOFF_VERTEX_RADIUS   — size of Wythoff polygon vertices
//  TRIANGLE_EDGE_THICKNESS — width of triangle group edges
//  ZOOM                    — camera zoom level
//  ANIMATE                 — enable orbit animation
//  ROTATE_SPEED            — rotation speed
//  DRIFT_AMOUNT            — drift amplitude
// =============================================

#define WYTHOFF_EDGE_THICKNESS  0.012
#define WYTHOFF_VERTEX_RADIUS   0.04
#define TRIANGLE_EDGE_THICKNESS 0.004

#define ZOOM 2.4

#define ANIMATE       true
#define ROTATE_SPEED  0.3
#define DRIFT_AMOUNT  0.15

// Colors
#ifdef THEME_DARK
    const vec3 COLOR_A             = vec3(0.55, 0.70, 0.85);
    const vec3 COLOR_B             = vec3(0.35, 0.50, 0.68);
    const vec3 COLOR_WYTHOFF_EDGE  = vec3(0.92, 0.88, 0.82);
    const vec3 COLOR_WYTHOFF_VERT  = vec3(0.90, 0.35, 0.25);
    const vec3 COLOR_TRI_EDGE      = vec3(0.75, 0.75, 0.75);
    const vec3 COLOR_BG            = vec3(0.02, 0.02, 0.03);
    const vec3 COLOR_BORDER        = vec3(0.25, 0.25, 0.3);
#else
    const vec3 COLOR_A             = vec3(0.72, 0.82, 0.92);
    const vec3 COLOR_B             = vec3(0.50, 0.60, 0.75);
    const vec3 COLOR_WYTHOFF_EDGE  = vec3(0.1, 0.1, 0.4);
    const vec3 COLOR_WYTHOFF_VERT  = vec3(0.85, 0.3, 0.2);
    const vec3 COLOR_TRI_EDGE      = vec3(0.5, 0.48, 0.45);
    const vec3 COLOR_BG            = vec3(0.88, 0.87, 0.85);
    const vec3 COLOR_BORDER        = vec3(0.4, 0.38, 0.35);
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
vec2 uhpToDisk(vec2 z) {
    return cdiv(z - vec2(0,1), z + vec2(0,1));
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

vec2 reflectInVert(vec2 z, float x) {
    return vec2(2.0*x - z.x, z.y);
}
vec2 reflectInCirc(vec2 z, float center, float radius) {
    z.x -= center;
    float r2 = radius * radius;
    z = z * (r2 / dot(z, z));
    z.x += center;
    return z;
}

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

float distToGeodesicThrough(vec2 z, vec2 A, vec2 B) {
    if (abs(A.x - B.x) < 0.0001)
        return distToVert(z, A.x);
    float center = (dot(A,A) - dot(B,B)) / (2.0*(A.x - B.x));
    float radius = length(A - vec2(center, 0.0));
    return distToCirc(z, center, radius);
}

float distToSegment(vec2 z, vec2 A, vec2 B) {
    float dA  = hypDist(z, A);
    float dB  = hypDist(z, B);
    float dAB = hypDist(A, B);
    float cosA = (cosh(dA)*cosh(dAB) - cosh(dB)) / max(sinh(dA)*sinh(dAB), 1e-8);
    float cosB = (cosh(dB)*cosh(dAB) - cosh(dA)) / max(sinh(dB)*sinh(dAB), 1e-8);
    if (cosA < 0.0) return dA;
    if (cosB < 0.0) return dB;
    return distToGeodesicThrough(z, A, B);
}

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

// Geodesic interpolation in UHP
vec2 geoInterp(vec2 A, vec2 B, float t) {
    if (abs(A.x - B.x) < 1e-6) {
        return vec2(A.x, exp(mix(log(A.y), log(B.y), t)));
    }
    float center = (dot(A,A) - dot(B,B)) / (2.0*(A.x - B.x));
    float R = length(A - vec2(center, 0.0));
    float thetaA = atan(A.y, A.x - center);
    float thetaB = atan(B.y, B.x - center);
    float logTanM = mix(log(tan(thetaA*0.5)), log(tan(thetaB*0.5)), t);
    float thetaM = 2.0 * atan(exp(logTanM));
    return vec2(center + R*cos(thetaM), R*sin(thetaM));
}

// Incenter via gradient descent
vec2 computeIncenter(TriData tri) {
    vec2 midAB = geoInterp(tri.vertP, tri.vertQ, 0.5);
    vec2 z = geoInterp(midAB, tri.vertR, 0.5);
    for (int i = 0; i < 60; i++) {
        float dA = distToVert(z, tri.sideA.x);
        float dB = distToCirc(z, tri.sideB.center, tri.sideB.radius);
        float dC = distToCirc(z, tri.sideC.center, tri.sideC.radius);
        float f = (dA-dB)*(dA-dB) + (dB-dC)*(dB-dC) + (dA-dC)*(dA-dC);
        if (f < 1e-14) break;
        float eps = z.y * 0.0005;
        float fx, fy;
        {
            vec2 zx = z + vec2(eps, 0);
            float a=distToVert(zx,tri.sideA.x), b=distToCirc(zx,tri.sideB.center,tri.sideB.radius), c=distToCirc(zx,tri.sideC.center,tri.sideC.radius);
            fx = (a-b)*(a-b) + (b-c)*(b-c) + (a-c)*(a-c);
        }
        {
            vec2 zy = z + vec2(0, eps);
            float a=distToVert(zy,tri.sideA.x), b=distToCirc(zy,tri.sideB.center,tri.sideB.radius), c=distToCirc(zy,tri.sideC.center,tri.sideC.radius);
            fy = (a-b)*(a-b) + (b-c)*(b-c) + (a-c)*(a-c);
        }
        vec2 grad = vec2(fx - f, fy - f) / eps;
        vec2 rGrad = z.y * z.y * grad;
        float gradLen = length(rGrad);
        if (gradLen < 1e-14) break;
        float step = min(0.3 * z.y / gradLen, 0.1);
        vec2 zNew = z - step * rGrad;
        zNew.y = max(zNew.y, 0.001);
        float dAn=distToVert(zNew,tri.sideA.x), dBn=distToCirc(zNew,tri.sideB.center,tri.sideB.radius), dCn=distToCirc(zNew,tri.sideC.center,tri.sideC.radius);
        float fNew = (dAn-dBn)*(dAn-dBn) + (dBn-dCn)*(dBn-dCn) + (dAn-dCn)*(dAn-dCn);
        if (fNew < f) z = zNew;
        else { z = z - 0.25*step*rGrad; z.y = max(z.y, 0.001); }
    }
    return z;
}

// Uniform point finder
float distToMirror(vec2 z, bool isVert, float p1, float p2) {
    if (isVert) return distToVert(z, p1);
    return distToCirc(z, p1, p2);
}
vec2 findUniformPoint(vec2 endA, vec2 endB,
    bool m1Vert, float m1p1, float m1p2,
    bool m2Vert, float m2p1, float m2p2) {
    float lo = 0.0, hi = 1.0;
    for (int i = 0; i < 40; i++) {
        float mid = 0.5*(lo+hi);
        vec2 G = geoInterp(endA, endB, mid);
        float d1 = distToMirror(G, m1Vert, m1p1, m1p2);
        float d2 = distToMirror(G, m2Vert, m2p1, m2p2);
        vec2 Glo = geoInterp(endA, endB, lo);
        float d1lo = distToMirror(Glo, m1Vert, m1p1, m1p2);
        float d2lo = distToMirror(Glo, m2Vert, m2p1, m2p2);
        if (d1lo - d2lo > 0.0) { if (d1-d2>0.0) lo=mid; else hi=mid; }
        else { if (d1-d2<0.0) lo=mid; else hi=mid; }
    }
    return geoInterp(endA, endB, 0.5*(lo+hi));
}

// Generating point
vec2 getGeneratingPoint(TriData tri) {
    #if GEN_POINT == 0
        return tri.vertP;
    #elif GEN_POINT == 1
        return tri.vertQ;
    #elif GEN_POINT == 2
        return tri.vertR;
    #elif GEN_POINT == 3
        return findUniformPoint(tri.vertQ, tri.vertR,
            true, tri.sideA.x, 0.0, false, tri.sideB.center, tri.sideB.radius);
    #elif GEN_POINT == 4
        return findUniformPoint(tri.vertP, tri.vertR,
            false, tri.sideB.center, tri.sideB.radius, false, tri.sideC.center, tri.sideC.radius);
    #elif GEN_POINT == 5
        return findUniformPoint(tri.vertP, tri.vertQ,
            true, tri.sideA.x, 0.0, false, tri.sideC.center, tri.sideC.radius);
    #elif GEN_POINT == 6
        return computeIncenter(tri);
    #elif GEN_POINT == 7
        #if GEN_MIRROR == 0
            return geoInterp(tri.vertP, tri.vertR, float(GEN_T));
        #elif GEN_MIRROR == 1
            return geoInterp(tri.vertP, tri.vertQ, float(GEN_T));
        #elif GEN_MIRROR == 2
            return geoInterp(tri.vertQ, tri.vertR, float(GEN_T));
        #endif
    #endif
}

vec2 reflectG_A(vec2 G, TriData tri) { return reflectInVert(G, tri.sideA.x); }
vec2 reflectG_B(vec2 G, TriData tri) { return reflectInCirc(G, tri.sideB.center, tri.sideB.radius); }
vec2 reflectG_C(vec2 G, TriData tri) { return reflectInCirc(G, tri.sideC.center, tri.sideC.radius); }

bool drawEdgeA() {
    #if GEN_POINT==0||GEN_POINT==2||GEN_POINT==4||(GEN_POINT==7&&GEN_MIRROR==0)
        return false;
    #else
        return true;
    #endif
}
bool drawEdgeB() {
    #if GEN_POINT==0||GEN_POINT==1||GEN_POINT==5||(GEN_POINT==7&&GEN_MIRROR==1)
        return false;
    #else
        return true;
    #endif
}
bool drawEdgeC() {
    #if GEN_POINT==1||GEN_POINT==2||GEN_POINT==3||(GEN_POINT==7&&GEN_MIRROR==2)
        return false;
    #else
        return true;
    #endif
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
    float parity = mod(float(foldCount), 2.0);

    color = COLOR_A;
    if (DRAW_TRIANGLE_PARITY)
        color = (parity < 0.5) ? COLOR_A : COLOR_B;

    if (DRAW_TRIANGLE_EDGES) {
        float dA = distToVert(zf, tri.sideA.x);
        float dB = distToCirc(zf, tri.sideB.center, tri.sideB.radius);
        float dC = distToCirc(zf, tri.sideC.center, tri.sideC.radius);
        if (min(dA, min(dB, dC)) < TRIANGLE_EDGE_THICKNESS)
            color = mix(color, COLOR_TRI_EDGE, 0.4);
    }

    vec2 G = getGeneratingPoint(tri);
    vec2 GA = reflectG_A(G, tri);
    vec2 GB = reflectG_B(G, tri);
    vec2 GC = reflectG_C(G, tri);

    if (DRAW_WYTHOFF_EDGES) {
        float minEdge = 1e6;
        if (drawEdgeA()) minEdge = min(minEdge, distToSegment(zf, G, GA));
        if (drawEdgeB()) minEdge = min(minEdge, distToSegment(zf, G, GB));
        if (drawEdgeC()) minEdge = min(minEdge, distToSegment(zf, G, GC));
        if (minEdge < WYTHOFF_EDGE_THICKNESS)
            color = COLOR_WYTHOFF_EDGE;
    }

    if (DRAW_WYTHOFF_VERTICES) {
        if (hypDist(zf, G) < WYTHOFF_VERTEX_RADIUS)
            color = COLOR_WYTHOFF_VERT;
    }

    fragColor = vec4(color, 1.0);
}
