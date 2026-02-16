// ═══════════════════════════════════════════════════════════════
//  ★  EDIT HERE  ★   Choose your polygon
// ═══════════════════════════════════════════════════════════════
//
//  Outer billiards: given a convex polygon, the outer billiard
//  map reflects each exterior point through the nearest vertex
//  (in cyclic order). The singularity set is the union of all
//  preimages of the edge-extension rays under iterates of this map.
//
//  Uncomment ONE polygon block below, or write your own.
//  N must match the number of vertices in the array.

#define SCALE 10.0              // zoom level (larger = more of the plane)
#define ITERATIONS 1000         // max iterates to check

const float PI = 3.141592653589793238;
const float DELTA = 0.001;

// ── Animated pentagon (default) ────────────────────────────────
//  One vertex drifts slowly with time.
const int N = 5;
#define WOBBLE 0.15                 // amplitude of vertex motion (0 = static)

// ── For static polygons, change N above and replace initVertices ──
//  Triangle: N = 3    Square: N = 4    Hexagon: N = 6    Heptagon: N = 7

vec2 VERTICES[N];

void initVertices() {
    // Regular N-gon
    for (int i = 0; i < N; i++) {
        float angle = PI * 2.0 * float(i + 1) / float(N);
        VERTICES[i] = vec2(-sin(angle), cos(angle));
    }
    // Wobble one vertex
    float t = iTime * 0.2;
    VERTICES[0] += WOBBLE * vec2(cos(t), sin(t * 0.7));
}

// Vector operations
vec2 project(in vec2 v, in vec2 onto) {
    return onto * dot(v, onto) / (onto.x * onto.x + onto.y * onto.y);
}

vec2 perp(in vec2 v, in vec2 onto) {
    return v - project(v, onto);
}

struct Ray {
    vec2 source;
    vec2 direction;
};

float pointOnRay(in vec2 pt, in Ray ray, in float lineThickness) {
    vec2 dp = pt - ray.source;
    bool rightSide = dot(dp, ray.direction) > 0.;
    if (!rightSide) return 0.;
    return max(0., lineThickness - length(perp(dp, ray.direction))) / lineThickness;
}

// -1 is left, 0 is on, 1 is right
float lcr(in vec2 pt, in Ray ray) {
    vec2 dp = pt - ray.source;
    return -(ray.direction.x * dp.y - ray.direction.y * dp.x);
}

bool pointInsideTable(in vec2 pt) {
    bool inside = true;
    for (int i = 0; i < N; i++) {
        vec2 v1 = VERTICES[i];
        vec2 v2 = VERTICES[(i + 1) % N];
        if (lcr(pt, Ray(v1, v2 - v1)) > 0.) {
            inside = false;
            break;
        }
    }
    return inside;
}

bool inForwardRegion(in int n, in vec2 pt) {
    if (n < 0 || n >= N) {
        return false;
    }
    vec2 vn = VERTICES[n];
    vec2 vl = VERTICES[(N + n - 1) % N];
    vec2 vr = VERTICES[(n + 1) % N];
    return lcr(pt, Ray(vn, vl - vn)) > 0. && lcr(pt, Ray(vn, vr - vn)) > 0.;
}

int findForwardRegion(in vec2 pos) {
    for (int i = 0; i < N; i++) {
        if (inForwardRegion(i, pos)) {
            return i;
        }
    }
    return -1;
}

vec2 outerBilliardMap(vec2 pt) {
    vec2 vf = VERTICES[findForwardRegion(pt)];
    return 2. * vf - pt;
}

float isFutureSingularity(in vec2 pt, in Ray[N] rays, in float lineThickness) {
    vec2 current = pt;
    for (int i = 0; i < ITERATIONS; i++) {
        for (int j = 0; j < N; j++) {
            float d = pointOnRay(current, rays[j], lineThickness);
            if (d > 0.0) return d;
        }
        current = outerBilliardMap(current);
        if (length(current - pt) < DELTA) return 0.;
    }
    return 0.;
}

vec2 pixelToWorld(in vec2 px) {
    return SCALE * 2.0 * (px/vec2(iResolution.x)
        - vec2(0.5, 0.5 * iResolution.y / iResolution.x));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    initVertices();

    vec2 pos = pixelToWorld(fragCoord);

    float lineThickness = 2.0 * SCALE / iResolution.x;

    if (pointInsideTable(pos)) {
        fragColor = vec4(0.2, 0.4, 0.6, 1.0);
        return;
    }
    
    Ray[N] rays;
    for (int i = 0; i < N; i++) {
        vec2 v2 = VERTICES[(i+1) % N];
        vec2 v1 = VERTICES[i];
        rays[i] = Ray(v2, v1 - v2);
    }

    float singularity = isFutureSingularity(pos, rays, lineThickness);
    fragColor = vec4(vec3(1) - singularity * vec3(0.2, 0.8, 0.9), 1.);
}