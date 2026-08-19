// =============================================
//  IHP Shader Workshop 2026
//  HYPERBOLIC GEOMETRY EXPLORER
//
//  A graphing calculator for the hyperbolic plane.
//  Define points, geodesics, and horocycles in
//  upper half-plane coordinates and view them
//  in any model.
// =============================================

// =============================================
//  YOUR CONFIGURATION
// =============================================

// Model (uncomment one)
#define MODEL_POINCARE
//#define MODEL_UHP
//#define MODEL_KLEIN
//#define MODEL_BAND

// Theme (uncomment one)
//#define THEME_DARK
#define THEME_LIGHT

// Points in UHP (x + yi, y > 0)
#define NUM_POINTS 3
vec2 pts[NUM_POINTS] = vec2[NUM_POINTS](
    vec2(0.0, 1.0),        // i
    vec2(1.5, 0.8),        // 1.5 + 0.8i
    vec2(-1.0, 2.0)        // -1 + 2i
);
vec3 ptColor[NUM_POINTS] = vec3[NUM_POINTS](
    vec3(0.95, 0.3, 0.25),
    vec3(0.3, 0.85, 0.35),
    vec3(0.3, 0.5, 0.95)
);
float ptRadius[NUM_POINTS] = float[NUM_POINTS](
    0.08, 0.08, 0.08
);

// Geodesics (through two UHP points)
// Each vec4 = (z1.x, z1.y, z2.x, z2.y)
// The full geodesic is drawn, not just the segment.
#define NUM_GEODESICS 3
vec4 geos[NUM_GEODESICS] = vec4[NUM_GEODESICS](
    vec4(0.0, 1.0,  1.5, 0.8),      // connecting point 0 and 1
    vec4(1.5, 0.8, -1.0, 2.0),      // connecting point 1 and 2
    vec4(-1.0, 2.0,  0.0, 1.0)      // connecting point 2 and 0
);
vec3 geoColor[NUM_GEODESICS] = vec3[NUM_GEODESICS](
    vec3(0.9, 0.75, 0.3),
    vec3(0.9, 0.75, 0.3),
    vec3(0.9, 0.75, 0.3)
);
float geoThick[NUM_GEODESICS] = float[NUM_GEODESICS](
    0.02, 0.02, 0.02
);

// Horocycles
// vec2(base, radius):
//   base = point on the real axis where horocycle is tangent
//   radius = Euclidean radius of the horocycle in UHP
// For a horocycle at infinity: vec2(INF, height)
//   where height = the y-coordinate of the horizontal line
#define INF 1e10
#define NUM_HOROCYCLES 2
vec2 horos[NUM_HOROCYCLES] = vec2[NUM_HOROCYCLES](
    vec2(0.0, 0.3),        // tangent to real axis at 0, radius 0.3
    vec2(INF, 3.0)          // horizontal line y = 3 (horocycle at infinity)
);
vec3 horoColor[NUM_HOROCYCLES] = vec3[NUM_HOROCYCLES](
    vec3(0.3, 0.75, 0.9),
    vec3(0.3, 0.75, 0.9)
);
float horoThick[NUM_HOROCYCLES] = float[NUM_HOROCYCLES](
    0.02, 0.02
);

// =============================================
//  PARAMETERS
//
//  AA_WIDTH       — antialiasing width
//  ZOOM           — camera zoom level
//  UHP_CENTER     — center of view in UHP mode
//  UHP_SCALE      — zoom for UHP mode
//  ANIMATE        — enable orbit animation
//  ROTATE_SPEED   — rotation speed
//  DRIFT_AMOUNT   — drift amplitude
// =============================================

#define PI 3.14159265359

#define AA_WIDTH       0.008    // antialiasing width

// Camera / display
#define ZOOM           2.4
#define UHP_CENTER     vec2(0.0, 2.5)   // center of view in UHP mode
#define UHP_SCALE      2.0              // zoom for UHP mode

// Animation (Poincaré / Klein only)
#define ANIMATE        true
#define ROTATE_SPEED   0.15
#define DRIFT_AMOUNT   0.1

// Colors — theme-dependent
#ifdef THEME_DARK
    const vec3 COLOR_BG     = vec3(0.02, 0.02, 0.03);
    const vec3 COLOR_DISK   = vec3(0.06, 0.06, 0.08);
    const vec3 COLOR_BORDER = vec3(0.25, 0.25, 0.3);
#else
    const vec3 COLOR_BG     = vec3(0.88, 0.87, 0.85);
    const vec3 COLOR_DISK   = vec3(0.96, 0.95, 0.93);
    const vec3 COLOR_BORDER = vec3(0.4, 0.38, 0.35);
#endif

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

// ---- Complex arithmetic ----

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

// ---- Model conversions ----

vec2 diskToUHP(vec2 w) {
    return cmul(vec2(0,1), cdiv(vec2(1,0)+w, vec2(1,0)-w));
}
vec2 uhpToDisk(vec2 z) {
    return cdiv(z - vec2(0,1), z + vec2(0,1));
}
vec2 kleinToDisk(vec2 w) {
    float s = length(w);
    if (s < 1e-6) return vec2(0);
    return w * ((s / (1.0 + sqrt(1.0 - s*s))) / s);
}

// ---- Möbius in the disk ----

vec2 diskRotate(vec2 w, float a) {
    return vec2(cos(a)*w.x - sin(a)*w.y, sin(a)*w.x + cos(a)*w.y);
}
vec2 diskTranslate(vec2 w, vec2 a) {
    return cdiv(w - a, vec2(1,0) - cmul(vec2(a.x,-a.y), w));
}

// ---- Hyperbolic distances ----

// Distance from z to vertical geodesic Re(z) = c
float distToVert(vec2 z, float c) {
    vec2 w = z - vec2(c, 0.0);
    return acosh(max(1.0, length(w) / z.y));
}

// Distance from z to semicircular geodesic centered at (center, 0) with given radius
float distToCirc(vec2 z, float center, float radius) {
    vec2 num   = z - vec2(center + radius, 0.0);
    vec2 denom = z - vec2(center - radius, 0.0);
    vec2 w = cdiv(num, denom);
    return acosh(max(1.0, length(w) / max(w.y, 1e-10)));
}

// Distance between two points
float hypDist(vec2 z1, vec2 z2) {
    vec2 d = z1 - z2;
    return acosh(max(1.0, 1.0 + dot(d,d) / (2.0*z1.y*z2.y)));
}

// ---- Distance to geodesic through two UHP points ----

float distToGeodesic(vec2 z, vec2 z1, vec2 z2) {
    // Vertical case
    if (abs(z1.x - z2.x) < 1e-4)
        return distToVert(z, 0.5*(z1.x + z2.x));
    // Semicircle: find center on real axis
    float c = (dot(z1,z1) - dot(z2,z2)) / (2.0*(z1.x - z2.x));
    float r = length(z1 - vec2(c, 0.0));
    return distToCirc(z, c, r);
}

// ---- Distance to horocycle ----

float distToHorocycle(vec2 z, vec2 horo) {
    float base = horo.x;
    float r = horo.y;
    if (abs(base) > 1e6) {
        // Horocycle at infinity: horizontal line y = r
        return abs(log(z.y / r));
    }
    // Horocycle at finite point: circle tangent to real axis
    // at (base, 0) with Euclidean radius r.
    // Apply T(z) = -1/(z - base), sending base → ∞.
    // Horocycle maps to y = 1/(2r).
    // dist = |log(Im(T(z)) / (1/(2r)))| = |log(2r · z.y / |z-base|²)|
    float dx = z.x - base;
    float d2 = dx*dx + z.y*z.y;
    return abs(log(max(1e-10, 2.0 * r * z.y / d2)));
}

// ---- Main ----

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy - 0.5;
    uv.x *= iResolution.x / iResolution.y;
    vec2 w = uv * ZOOM;

    // ---- Convert screen coords to UHP ----
    vec3 col = COLOR_BG;
    bool inDomain = false;
    float borderDist = 1e6;
    vec2 z;

    #ifdef MODEL_POINCARE
        float diskR = length(w);
        inDomain = diskR < 0.998;
        borderDist = 1.0 - diskR;
        if (ANIMATE) {
            float t = iTime * ROTATE_SPEED;
            w = diskRotate(w, t);
            w = diskTranslate(w, DRIFT_AMOUNT * vec2(sin(t*1.3), cos(t*0.9)));
        }
        z = diskToUHP(w);
    #endif

    #ifdef MODEL_KLEIN
        float kleinR = length(w);
        inDomain = kleinR < 0.998;
        borderDist = 1.0 - kleinR;
        vec2 diskPt = kleinToDisk(w);
        if (ANIMATE) {
            float t = iTime * ROTATE_SPEED;
            diskPt = diskRotate(diskPt, t);
            diskPt = diskTranslate(diskPt, DRIFT_AMOUNT * vec2(sin(t*1.3), cos(t*0.9)));
        }
        z = diskToUHP(diskPt);
    #endif

    #ifdef MODEL_BAND
        float bandHalf = PI * 0.25 * ZOOM / 2.4;
        inDomain = abs(w.y) < bandHalf * 0.998;
        borderDist = bandHalf - abs(w.y);
        vec2 diskPtB = ctanh(w);
        if (ANIMATE) {
            float t = iTime * ROTATE_SPEED;
            diskPtB = diskRotate(diskPtB, t);
            diskPtB = diskTranslate(diskPtB, DRIFT_AMOUNT * vec2(sin(t*1.3), cos(t*0.9)));
        }
        z = diskToUHP(diskPtB);
    #endif

    #ifdef MODEL_UHP
        z = w * UHP_SCALE + UHP_CENTER;
        inDomain = z.y > 0.001;
        borderDist = z.y;
    #endif

    // Disk/Klein/Band border
    #if defined(MODEL_POINCARE) || defined(MODEL_KLEIN) || defined(MODEL_BAND)
        float pixSize = ZOOM / iResolution.y;
        if (abs(borderDist) < pixSize * 2.0)
            col = COLOR_BORDER;
    #endif

    if (!inDomain) {
        fragColor = vec4(col, 1.0);
        return;
    }

    // Start with interior background
    col = COLOR_DISK;

    // ---- Draw geodesics ----
    for (int i = 0; i < NUM_GEODESICS; i++) {
        vec2 z1 = vec2(geos[i].xy);
        vec2 z2 = vec2(geos[i].zw);
        float d = distToGeodesic(z, z1, z2);
        float line = 1.0 - smoothstep(geoThick[i] - AA_WIDTH, geoThick[i] + AA_WIDTH, d);
        col = mix(col, geoColor[i], line);
    }

    // ---- Draw horocycles ----
    for (int i = 0; i < NUM_HOROCYCLES; i++) {
        float d = distToHorocycle(z, horos[i]);
        float line = 1.0 - smoothstep(horoThick[i] - AA_WIDTH, horoThick[i] + AA_WIDTH, d);
        col = mix(col, horoColor[i], line);
    }

    // ---- Draw points ----
    for (int i = 0; i < NUM_POINTS; i++) {
        float d = hypDist(z, pts[i]);
        float dot_ = 1.0 - smoothstep(ptRadius[i] - AA_WIDTH, ptRadius[i] + AA_WIDTH, d);
        col = mix(col, ptColor[i], dot_);
    }

    fragColor = vec4(col, 1.0);
}
