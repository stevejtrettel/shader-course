// =============================================
// IMPLICIT SURFACE — CROSS-SECTION
// =============================================
// Raymarches multiple level sets f(x,y,z) = c inside a
// bounding box, clipped by an animated plane. The cut face
// shows colored contour lines. Box wall isolines and ground AO.
// Drag to orbit.

// =============================================
// EDIT HERE: Define your implicit function f(x, y, z)
// Should return values spanning your level set range.
// =============================================

#define PI 3.14159265359

float f(vec3 p) {
    // Schwarz P surface (triply periodic minimal surface)
    // The factor of 2.0 shows 2x2x2 fundamental domains in the box
    p *= 2.0;
    return cos(PI * p.x) + cos(PI * p.y) + cos(PI * p.z);

    // Torus distance field
    // float R = 0.6; vec2 q = vec2(length(p.xz)-R, p.y); return length(q);

    // return length(p);                                                // concentric spheres
    // return length(p) + 0.3*sin(3.0*p.x)*sin(3.0*p.y)*sin(3.0*p.z); // deformed shells
}

// =============================================
// EDIT HERE: Level set configuration
// =============================================

#define CENTER_LEVEL  0.0     // value of the central level set
#define LEVEL_SPACING 0.5     // spacing between consecutive levels
#define NUM_LEVELS    5        // number of level sets

// Highlight one level set: that level is opaque, the rest translucent.
// Set to -1 for all opaque (no highlighting).
#define HIGHLIGHT     -1
#define GHOST_OPACITY 0.25    // opacity of non-highlighted levels (0 to 1)

// Clipping plane
vec3 CLIP_NORMAL = normalize(vec3(0.0, 1.0, 0.0));
#define CLIP_SPEED   0.3
#define CLIP_RANGE   0.9       // sweep amplitude (fraction of BOX_SIZE)

// =============================================
// PARAMETERS
// =============================================

#define BOX_SIZE   vec3(1.0)
#define SHOW_BOX   1               // 1 = bounding box, 0 = unbounded
#define MARCH_RADIUS 10.0          // max march distance when SHOW_BOX = 0
#define STEP_SIZE  0.01
#define CUT_LINE_WIDTH 0.15
#define SPEC_EXP   128.0

// Camera
#define CAM_DIST   5.0
#define CAM_HEIGHT 4.0
#define CAM_SPEED  0.3
#define FOV        2.0

// =============================================
// VISUALIZATION CODE (no need to edit below)
// =============================================

#define LIGHT_DIR normalize(vec3(cos(-iTime*0.3+PI*0.5), 1.0, sin(-iTime*0.3+PI*0.5)))

vec3 boxCenter = vec3(0.0, BOX_SIZE.y, 0.0);

float fWorld(vec3 p) { return f(p - boxCenter); }

vec3 fGrad(vec3 p) {
    vec2 d = vec2(0.01, 0.0);
    float v = fWorld(p);
    return vec3(fWorld(p+d.xyy)-v, fWorld(p+d.yxy)-v, fWorld(p+d.yyx)-v);
}

float getLevel(int k) {
    return CENTER_LEVEL + float(k - NUM_LEVELS / 2) * LEVEL_SPACING;
}

vec3 levelColor(int k) {
    float t = float(k) / float(max(NUM_LEVELS - 1, 1));
    vec3 cold = vec3(0.2, 0.4, 0.9);
    vec3 warm = vec3(0.9, 0.3, 0.2);
    vec3 mid  = vec3(1.0);
    return t < 0.5 ? mix(cold, mid, t * 2.0) : mix(mid, warm, (t - 0.5) * 2.0);
}

vec2 boxIntersect(vec3 ro, vec3 rd, out vec3 nFront, out vec3 nBack) {
    vec3 roo = ro - boxCenter;
    vec3 m = 1.0/rd;
    vec3 n = m*roo;
    vec3 k = abs(m)*BOX_SIZE;
    vec3 t1 = -n - k;
    vec3 t2 = -n + k;
    float tN = max(max(t1.x, t1.y), t1.z);
    float tF = min(min(t2.x, t2.y), t2.z);
    if (tN > tF || tF < 0.0) return vec2(-1.0);
    nFront = -sign(rd)*step(t1.yzx,t1.xyz)*step(t1.zxy,t1.xyz);
    vec3 d = abs(roo + rd*tF);
    nBack = -sign(rd)*vec3(
        d.x>d.y&&d.x>d.z ? 1.0 : 0.0,
        d.y>d.x&&d.y>d.z ? 1.0 : 0.0,
        d.z>d.y&&d.z>d.x ? 1.0 : 0.0);
    return vec2(tN, tF);
}

mat3 setCamera(vec3 ro, vec3 ta, float cr) {
    vec3 cw = normalize(ta - ro);
    vec3 cp = vec3(sin(cr), cos(cr), 0.0);
    vec3 cu = normalize(cross(cw, cp));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

vec3 render(vec3 ro, vec3 rd) {
    float tGround = -ro.y / rd.y;
    if (tGround < 0.0 || rd.y > 0.0) tGround = 10000.0;
    vec3 bgCol = mix(vec3(0.9), vec3(0.5,0.6,0.9), 1.0 - exp(-0.05*tGround));

    float clipOff = CLIP_RANGE * sin(CLIP_SPEED * iTime);

    // Ground AO
    if (tGround < 100.0) {
        vec3 pGround = ro + rd*tGround;
        float val = fWorld(pGround);
        vec3 grad = fGrad(pGround);
        grad.y = 0.0;
        float w = 100.0;
        for (int k = 0; k < NUM_LEVELS; k++)
            w = min(w, abs(val - getLevel(k)) / length(grad));
#if SHOW_BOX
        w = max(w, max(max(abs(pGround.x), abs(pGround.z)) - BOX_SIZE.x, 0.0)*100.0);
#endif
        w = clamp(w / 12.0, 0.0, 1.0);
        bgCol *= 0.6 + 0.4*smoothstep(0.0, 1.0, w);
    }

    // March bounds
#if SHOW_BOX
    vec3 n, n2;
    vec2 tnf = boxIntersect(ro, rd, n, n2);
    float t_min = max(0.0, tnf.x);
    float t_max = min(tGround, tnf.y);
#else
    float t_min = 0.0;
    float t_max = min(tGround, MARCH_RADIUS);
#endif
    float depth = max(0.0, t_max - t_min);

    // March through box with clipping, accumulating surface layers
    vec3 surfCol = vec3(0.0);
    float surfAlpha = 0.0;
    float lastHitT = t_max;

    if (depth > 0.0) {
        float prev = fWorld(ro + rd * t_min);
        float prevClip = clipOff - dot((ro + rd * t_min) - boxCenter, CLIP_NORMAL);

        for (float t = t_min + STEP_SIZE; t < t_max && surfAlpha < 0.99; t += STEP_SIZE) {
            vec3 p = ro + rd * t;
            float val = fWorld(p);
            float curClip = clipOff - dot(p - boxCenter, CLIP_NORMAL);
            bool hitOpaque = false;

            // Check clip plane crossing (either direction)
            if (prevClip * curClip < 0.0) {
                float tClip = t - STEP_SIZE + STEP_SIZE * abs(prevClip) / (abs(prevClip) + abs(curClip));
                vec3 pClip = ro + rd * tClip;
                float cutVal = fWorld(pClip);
                vec3 cutGrad = fGrad(pClip);
                cutGrad -= CLIP_NORMAL * dot(cutGrad, CLIP_NORMAL);

                // Composite contour lines as transparent layer
                for (int k = 0; k < NUM_LEVELS; k++) {
                    float w = abs(cutVal - getLevel(k)) / length(cutGrad);
                    float line = mix(1.0, 0.0, clamp(w - CUT_LINE_WIDTH * tClip, 0.0, 1.0));
                    float la = (HIGHLIGHT < 0 || k == HIGHLIGHT) ? 1.0 : GHOST_OPACITY;
                    float a = la * line;
                    vec3 lineCol = levelColor(k) * 0.15;
                    surfCol += (1.0 - surfAlpha) * a * lineCol;
                    surfAlpha += (1.0 - surfAlpha) * a;
                }

                if (prevClip > 0.0) { lastHitT = tClip; break; } // kept→clipped: stop
                // clipped→kept: continue marching to find surfaces behind
            }

            // Only process level crossings in the kept region
            if (curClip > 0.0 && prevClip > 0.0) {
                for (int k = 0; k < NUM_LEVELS; k++) {
                    float lev = getLevel(k);
                    if ((prev - lev) * (val - lev) < 0.0) {
                        vec3 nn = normalize(fGrad(p));
                        vec3 lc = levelColor(k);

                        if (dot(nn, rd) > 0.0) {
                            lc = 0.4 + 0.6 * lc;
                            nn = -nn;
                        }

                        vec3 shaded = lc * (0.5 + 0.5 * max(0.0, dot(nn, LIGHT_DIR)))
                                    + vec3(pow(max(0.0, dot(LIGHT_DIR, reflect(rd, nn))), SPEC_EXP));

                        float a = (HIGHLIGHT < 0 || k == HIGHLIGHT) ? 1.0 : GHOST_OPACITY;

                        // Front-to-back compositing
                        surfCol += (1.0 - surfAlpha) * a * shaded;
                        surfAlpha += (1.0 - surfAlpha) * a;

                        if (a >= 1.0) { lastHitT = t; hitOpaque = true; }
                    }
                }
            }

            prev = val;
            prevClip = curClip;
            if (hitOpaque) break;
        }
    }

    // Composite surfaces (and any cut-face contour lines) over background
    vec3 col = surfCol + (1.0 - surfAlpha) * bgCol;

    if (ro.y < 0.0) col = mix(vec3(0.9), col, 0.5);
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0*fragCoord - iResolution.xy) / iResolution.y;
    vec3 ta = vec3(0.0, BOX_SIZE.y*0.5, 0.0);
    vec3 ro;
    if (iMouse.z > 0.5) {
        float phi = (iMouse.x / iResolution.x) * PI * 2.0;
        float psi = -((iMouse.y / iResolution.y) - 0.5) * PI;
        ro = CAM_DIST * vec3(cos(phi)*cos(psi), sin(psi), sin(phi)*cos(psi));
    } else {
        ro = vec3(CAM_DIST*cos(-iTime*CAM_SPEED), CAM_HEIGHT, CAM_DIST*sin(-iTime*CAM_SPEED));
    }
    mat3 cam = setCamera(ro, ta, 0.0);
    vec3 rd = cam * normalize(vec3(uv, FOV));
    vec3 col = render(ro, rd);
    col = sqrt(col);
    fragColor = vec4(col, 1.0);
}
