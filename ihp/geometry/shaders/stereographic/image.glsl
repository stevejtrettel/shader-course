// ═══════════════════════════════════════════════════════════════
//  ★  EDIT HERE  ★   Define your algebraic curve
// ═══════════════════════════════════════════════════════════════
//
//  Define a curve f(u,v) = 0 in the z=0 plane.
//  It will be drawn on the plane AND lifted onto the
//  unit sphere via inverse stereographic projection.
//
//  Just return f.  Gradient is computed numerically.

#define CAMERA_DIST 8.0
#define CURVE_WIDTH 1.5         // line half-width in pixels
#define CURVE_COLOR vec3(0.85, 0.15, 0.1)

#define SHOW_PLANE  1           // 0 to hide ground plane
#define SHOW_SPHERE 1           // 0 to hide sphere
#define PLANE_ALPHA 0.3         // plane opacity when seen from below


// ── Your curve ──────────────────────────────────────────────
//  Uncomment ONE block, or write your own.


// Circle  |w|² = 1   →  equator of S²
float curve(vec2 w) {
    return dot(w, w) - 1.0;
}

/*
// Line  u = 0   →  great circle through poles
float curve(vec2 w) {
    return w.x;
}
*/

/*
// Lemniscate of Bernoulli  (u²+v²)² = 2(u²−v²)
float curve(vec2 w) {
    float r2 = dot(w, w);
    return r2*r2 - 2.0*(w.x*w.x - w.y*w.y);
}
*/

/*
// Elliptic curve  v² = u³ − u
float curve(vec2 w) {
    return w.y*w.y - (w.x*w.x*w.x - w.x);
}
*/

/*
// Parabola  v = u²
float curve(vec2 w) {
    return w.y - w.x*w.x;
}
*/

/*
// Two concentric circles  (|w|²−1)(|w|²−4) = 0
float curve(vec2 w) {
    float r2 = dot(w, w);
    return (r2 - 1.0) * (r2 - 4.0);
}
*/


// ═══════════════════════════════════════════════════════════════
//  Implementation — no need to edit below this line
// ═══════════════════════════════════════════════════════════════

#define LIGHT_DIR normalize(vec3(2.0, 1.5, 4.0))
#define EPS 0.001


// ── Numerical gradient & distance ───────────────────────────

vec2 curveGrad(vec2 w) {
    return vec2(
        curve(w + vec2(EPS, 0)) - curve(w - vec2(EPS, 0)),
        curve(w + vec2(0, EPS)) - curve(w - vec2(0, EPS))
    ) / (2.0 * EPS);
}

// Euclidean distance to curve in the plane
float curveDist(vec2 w) {
    float f = curve(w);
    float g = length(curveGrad(w));
    return abs(f) / max(g, 1e-5);
}

// Distance to curve on the sphere surface,
// conformally corrected: d_sphere = d_plane · λ
float curveDistSphere(vec3 P) {
    vec2 w = stereoForward(P);
    return curveDist(w) * conformalFactor(w);
}


// ── Grid on the plane ───────────────────────────────────────

float gridPattern(vec2 w, float t, float px) {
    vec2 gd = abs(fract(w + 0.5) - 0.5);
    float gridMin = min(gd.x, gd.y);
    float grid = 1.0 - smoothstep(0.0, 1.5, gridMin / (t * px));

    float axesDist = min(abs(w.x), abs(w.y));
    float axes = 1.0 - smoothstep(0.0, 2.0, axesDist / (t * px));

    return max(grid * 0.15, axes * 0.3);
}


// ── Shading ─────────────────────────────────────────────────

vec3 shadePlane(vec3 p, float t, float px) {
    vec2 w = p.xy;

    vec3 col = vec3(0.95, 0.93, 0.90);
    col = mix(col, vec3(0.5, 0.5, 0.48), gridPattern(w, t, px));

    float d = curveDist(w);
    float curvePx = d / (t * px);
    col = mix(col, CURVE_COLOR, 1.0 - smoothstep(CURVE_WIDTH - 0.5, CURVE_WIDTH + 0.5, curvePx));

    col *= 0.3 + 0.7 * max(dot(vec3(0, 0, 1), LIGHT_DIR), 0.0);

#if SHOW_SPHERE
    col *= mix(0.65, 1.0, sphereShadow(p, LIGHT_DIR));
    col *= sphereAO(p, vec3(0, 0, 1));
#endif

    float fade = exp(-0.02 * dot(w, w));
    col = mix(vec3(0.85, 0.87, 0.92), col, fade);

    return col;
}

vec3 shadeSphere(vec3 p, vec3 n, vec3 rd, float t, float px) {
    vec3 col = vec3(0.92, 0.92, 0.95);

    // Grid on sphere: pull back the plane grid through stereographic projection
    vec2 sw = stereoForward(p);
    col = mix(col, vec3(0.5, 0.5, 0.48), gridPattern(sw, t, px) * 0.7);

    float d = curveDistSphere(p);
    float curvePx = d / (t * px);
    col = mix(col, CURVE_COLOR, 1.0 - smoothstep(CURVE_WIDTH - 0.5, CURVE_WIDTH + 0.5, curvePx));

    float diff = max(dot(n, LIGHT_DIR), 0.0);
    vec3  h    = normalize(LIGHT_DIR - rd);
    float spec = pow(max(dot(n, h), 0.0), 64.0) * 0.4;
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0) * 0.12;

    col = col * (0.35 + 0.65 * diff) + vec3(spec + fres);

    return col;
}


// ── Main ────────────────────────────────────────────────────

void mainImage(out vec4 O, in vec2 F) {
    vec2 uv = (F - 0.5 * iResolution.xy) / iResolution.y;
    float px = 1.0 / iResolution.y;

    // Orbit camera: theta = azimuth, phi = elevation from horizontal
    float theta = iTime * 0.2;
    float phi   = 0.45;
    if (iMouse.z > 0.0) {
        vec2 mo = iMouse.xy / iResolution.xy;
        theta += (mo.x - 0.5) * TAU;
        phi    = mix(-0.8, 1.4, mo.y);  // allow looking from below
    }

    vec3 target = SPHERE_CENTER;
    vec3 ro = target + CAMERA_DIST * vec3(
        cos(theta) * cos(phi),
        sin(theta) * cos(phi),
        sin(phi));

    vec3 fwd   = normalize(target - ro);
    vec3 world_up = vec3(0, 0, 1);
    // Avoid degeneracy when looking straight up/down
    if (abs(dot(fwd, world_up)) > 0.999)
        world_up = vec3(0, 1, 0);
    vec3 right = normalize(cross(fwd, world_up));
    vec3 up    = cross(right, fwd);
    vec3 rd    = normalize(right * uv.x + up * uv.y + fwd);

    float tP = -1.0, tS = -1.0;
#if SHOW_PLANE
    tP = hitPlane(ro, rd);
#endif
#if SHOW_SPHERE
    tS = hitSphere(ro, rd);
#endif

    vec3 bg = vec3(0.85, 0.87, 0.92);
    vec3 result = bg;

    bool hP = tP > 0.0;
    bool hS = tS > 0.0;
    bool planeFromBelow = hP && rd.z > 0.0;

    if (hP && hS) {
        if (tS < tP) {
            // Sphere is in front
            vec3 p = ro + tS * rd;
            result = shadeSphere(p, normalize(p - SPHERE_CENTER), rd, tS, px);
        } else if (planeFromBelow) {
            // Plane is in front but seen from below — blend
            vec3 sphereCol = shadeSphere(ro + tS * rd,
                normalize(ro + tS * rd - SPHERE_CENTER), rd, tS, px);
            vec3 planeCol = shadePlane(ro + tP * rd, tP, px);
            result = mix(sphereCol, planeCol, PLANE_ALPHA);
        } else {
            result = shadePlane(ro + tP * rd, tP, px);
        }
    } else if (hS) {
        vec3 p = ro + tS * rd;
        result = shadeSphere(p, normalize(p - SPHERE_CENTER), rd, tS, px);
    } else if (hP) {
        if (planeFromBelow) {
            vec3 planeCol = shadePlane(ro + tP * rd, tP, px);
            result = mix(bg, planeCol, PLANE_ALPHA);
        } else {
            result = shadePlane(ro + tP * rd, tP, px);
        }
    }

    O = vec4(pow(clamp(result, 0.0, 1.0), vec3(1.0 / 2.2)), 1);
}
