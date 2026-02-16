// ═══════════════════════════════════════════════════════════════
//  ★  EDIT HERE  ★   Define your algebraic curve
// ═══════════════════════════════════════════════════════════════
//
//  The Hopf map sends S³ → S², and stereographic projection
//  sends S² → R².  Define a curve f(u,v) = 0 in this plane.
//  Its preimage under the Hopf fibration is a surface in R³
//  (visualized via stereographic projection S³ → R³).
//
//  Just return f.  The gradient is computed automatically.

#define THICKNESS   0.03      // surface shell half-width
#define CAMERA_DIST 7.0       // initial camera distance


// ── Your curve ──────────────────────────────────────────────
//  Uncomment ONE return line, or write your own.

float curve(vec2 w) {
    float u = w.x, v = w.y;
    float r2 = dot(w, w);

    //return r2 - 1.0;                            // Circle (Clifford torus)
    //return u;                                   // Line (torus through ∞)
    //return r2*r2 - 2.0*(u*u - v*v);            // Lemniscate of Bernoulli
    return v*v - (u*u*u - u);                     // Elliptic curve
    //return u*u*u - 3.0*u*v*v - 0.5;            // Trefoil  Re(z³) = ½
    //return v - u*u;                             // Parabola
    //return (r2 - 1.0) * (r2 - 4.0);            // Two concentric circles
}


// ═══════════════════════════════════════════════════════════════
//  Implementation — no need to edit below this line
// ═══════════════════════════════════════════════════════════════


// ── Preimage SDF ─────────────────────────────────────────────
//
//  sdf(x) ≈  (|x|²+1) / (2(|w|²+1))  ·  |f(w)| / |∇f(w)|

float preimageDist(vec3 x, vec2 w) {
    float f  = curve(w);
    float fu = curve(w + vec2(0.0001, 0));
    float fv = curve(w + vec2(0, 0.0001));
    vec2 grad = vec2(fu - f, fv - f) / 0.0001;

    float gradLen = length(grad);
    if (gradLen < 1e-6) return 10.0;

    float s3 = (dot(x, x) + 1.0) * 0.5;
    float s2inv = dot(w, w) + 1.0;

    return s3 / s2inv * f / gradLen;
}

#define MAX_STEPS  500
#define MAX_DIST   30.0


// ── SDF ─────────────────────────────────────────────────────

float sceneDist(vec3 x, out vec3 col) {
    vec3 h = hopfMap(invStereoS3(x));
    vec2 w = stereoS2(h);
    col = surfaceColor(h);
    return preimageDist(x, w);
}

float sdf(vec3 x) {
    vec3 c;
    return abs(sceneDist(x, c)) - THICKNESS;
}

vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.0005, 0);
    return normalize(vec3(
        sdf(p + e.xyy) - sdf(p - e.xyy),
        sdf(p + e.yxy) - sdf(p - e.yxy),
        sdf(p + e.yyx) - sdf(p - e.yyx)
    ));
}


// ── Inset disk (curve in R²) ─────────────────────────────────

#define INSET_PLANE_R 3.5

vec3 insetDisk(vec2 uv_local) {
    vec2 w = uv_local * INSET_PLANE_R;

    float f = curve(w);
    vec2 grad = vec2(
        curve(w + vec2(0.0001, 0)) - f,
        curve(w + vec2(0, 0.0001)) - f
    ) / 0.0001;
    float d = abs(f) / max(length(grad), 1e-5);

    float px = INSET_PLANE_R * 2.0 / (iResolution.y * 0.15);
    float curveAlpha = 1.0 - smoothstep(1.0 * px, 3.0 * px, d);

    vec3 col = vec3(0.12, 0.11, 0.14);
    col = mix(col, vec3(0.85, 0.25, 0.15), curveAlpha);
    return col;
}


// ── Main ────────────────────────────────────────────────────

void mainImage(out vec4 O, in vec2 F) {
    vec2 uv = (F - 0.5 * iResolution.xy) / iResolution.y;

    float yaw   = iTime * 0.25;
    float pitch = 0.3;
    if (iMouse.z > 0.0) {
        vec2 mo = iMouse.xy / iResolution.xy;
        yaw   += (mo.x - 0.5) * PI;
        pitch  = (mo.y - 0.5) * PI * 0.7;
    }

    mat3 cam = orbitCamera(yaw, pitch);
    vec3 ro  = -CAMERA_DIST * cam[2];
    vec3 rd  = normalize(cam * vec3(uv, 1));

    float t = 0.0;
    vec3  col;
    bool  hit = false;
    float prevD = sceneDist(ro, col);
    float prevT = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        float ad = abs(prevD);
        if (ad < THICKNESS) { t = prevT; hit = true; break; }

        // Conservative step: the chained conformal SDF
        // can have Lipschitz constant > 1, so use a small
        // fraction and cap the maximum step size.
        t = prevT + min(ad * 0.2, 0.5);
        if (t > MAX_DIST) break;

        float d = sceneDist(ro + t * rd, col);

        if (d * prevD < 0.0) {
            float lo = prevT, hi = t;
            float loD = prevD;
            for (int b = 0; b < 12; b++) {
                float mid = 0.5 * (lo + hi);
                float dm = sceneDist(ro + mid * rd, col);
                if (loD * dm < 0.0) hi = mid;
                else { lo = mid; loD = dm; }
            }
            t = 0.5 * (lo + hi);
            hit = true;
            break;
        }

        prevD = d;
        prevT = t;
    }

    vec3 result;
    if (hit) {
        vec3 p = ro + t * rd;
        sceneDist(p, col);
        vec3 n = calcNormal(p);
        result = shade(col, n, rd, t);
    } else {
        result = mix(vec3(0.01, 0.01, 0.02),
                     vec3(0.04, 0.02, 0.06), uv.y + 0.5);
    }

    // Inset sphere (bottom-right): curve on S²
    float aspect = iResolution.x / iResolution.y;
    float insetR = 0.15;
    float margin = 0.03;
    vec2 insetCenter = vec2(0.5 * aspect - insetR - margin,
                            -0.5 + insetR + margin);
    vec2 insetUV = (uv - insetCenter) / insetR;
    float insetDist = length(insetUV);

    if (insetDist < 1.06) {
        if (insetDist > 1.0)
            result = vec3(0.25);
        else
            result = insetDisk(insetUV);
    }

    O = vec4(pow(clamp(result, 0.0, 1.0), vec3(1.0/2.2)), 1);
}
