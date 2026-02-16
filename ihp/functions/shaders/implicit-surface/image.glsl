// =============================================
// IMPLICIT SURFACE — SINGLE LEVEL SET
// =============================================
// Raymarches the surface f(x,y,z) = 0 inside a bounding box
// sitting on a ground plane. Isolines of f on the box walls.
// Drag to orbit.

// =============================================
// EDIT HERE: Define your implicit function f(x, y, z)
// The surface is the level set f = 0.
// =============================================

#define PI 3.14159265359

float f(vec3 p) {
    // Schwarz P surface (triply periodic minimal surface)
    // The factor of 2.0 shows 2x2x2 = 8 fundamental domains in the box
    p *= 2.0;
    return cos(PI * p.x) + cos(PI * p.y) + cos(PI * p.z);

    // Torus: major radius R, minor radius r
    // float R = 0.6, r = 0.25;
    // vec2 q = vec2(length(p.xz) - R, p.y);
    // return length(q) - r;

    // return length(p) - 0.8;                                       // sphere
    // return max(abs(p.x), max(abs(p.y), abs(p.z))) - 0.7;         // cube
    // return dot(p,p) + 2.0*p.x*p.y*p.z - 0.5;                    // Cayley cubic
    // return sin(PI*p.x)*cos(PI*p.y) + sin(PI*p.y)*cos(PI*p.z)
    //      + sin(PI*p.z)*cos(PI*p.x);                               // gyroid
}

// =============================================
// PARAMETERS
// =============================================

#define BOX_SIZE   vec3(1.0)       // bounding box half-size
#define SHOW_BOX   1              // 1 = bounding box, 0 = unbounded
#define MARCH_RADIUS 10.0          // max march distance when SHOW_BOX = 0
#define STEP_SIZE  0.01
#define ISO_LINE_WIDTH 0.2         // isoline width on box faces
#define SPEC_EXP   128.0

// Camera
#define CAM_DIST   5.0
#define CAM_HEIGHT 4.0
#define CAM_SPEED  0.3
#define FOV        2.0

// Colors
const vec3 SURFACE_COLOR = vec3(0.4, 0.6, 0.95);
const vec3 ISO_COLOR     = vec3(0.05);

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

float marchIso(vec3 ro, vec3 rd, float tMin, float tMax, float level) {
    float val = fWorld(ro + rd*tMin);
    float inv = val > level ? 1.0 : -1.0;
    for (float t = tMin; t < tMax; t += STEP_SIZE) {
        val = fWorld(ro + rd*t);
        if ((val - level)*inv < 0.0) return t;
    }
    return tMax;
}

mat3 setCamera(vec3 ro, vec3 ta, float cr) {
    vec3 cw = normalize(ta - ro);
    vec3 cp = vec3(sin(cr), cos(cr), 0.0);
    vec3 cu = normalize(cross(cw, cp));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

vec3 render(vec3 ro, vec3 rd) {
    // Ground plane
    float t = -ro.y / rd.y;
    if (t < 0.0 || rd.y > 0.0) t = 10000.0;
    vec3 col = mix(vec3(0.9), vec3(0.5,0.6,0.9), 1.0 - exp(-0.05*t));

    // Ground AO
    if (t < 100.0) {
        vec3 pGround = ro + rd*t;
        float val = fWorld(pGround);
        vec3 grad = fGrad(pGround);
        grad.y = 0.0;
        float w = abs(val) / length(grad);
#if SHOW_BOX
        w = max(w, max(max(abs(pGround.x), abs(pGround.z)) - BOX_SIZE.x, 0.0)*100.0);
#endif
        w = clamp(w / 12.0, 0.0, 1.0);
        col *= 0.6 + 0.4*smoothstep(0.0, 1.0, w);
    }

    // March bounds
#if SHOW_BOX
    vec3 n, n2;
    vec2 tnf = boxIntersect(ro, rd, n, n2);
    float t_min = max(0.0, tnf.x);
    float t_max = min(t, tnf.y);
#else
    float t_min = 0.0;
    float t_max = min(t, MARCH_RADIUS);
#endif
    float depth = max(0.0, t_max - t_min);

    if (depth > 0.0) {
        float tt = marchIso(ro, rd, t_min, t_max, 0.0);
        if (tt < t_max) {
            vec3 p = ro + rd*tt;
            vec3 nn = normalize(fGrad(p));
            vec3 cur_col = SURFACE_COLOR;
            if (dot(nn, rd) > 0.0) {
                cur_col = 0.4 + 0.6*cur_col;
                nn = -nn;
            }
            col = cur_col*(0.5 + 0.5*max(0.0, dot(nn, LIGHT_DIR)))
                + vec3(pow(max(0.0, dot(LIGHT_DIR, reflect(rd, nn))), SPEC_EXP));
            t_max = tt;
        }
    }

#if SHOW_BOX
    // Isolines on box faces (just f=0)
    if (depth > 0.001) {
        vec3 p = ro + rd*(tnf.x + 0.01);
        float val = fWorld(p);
        vec3 grad = fGrad(p);
        grad -= n*dot(grad, n);
        float w = abs(val) / length(grad);
        col = mix(col, ISO_COLOR, mix(1.0, 0.0, clamp(w - ISO_LINE_WIDTH*tnf.x, 0.0, 1.0)));

        if (tnf.y < t_max + 0.01) {
            p = ro + rd*(tnf.y - 0.01);
            val = fWorld(p);
            grad = fGrad(p);
            grad -= n2*dot(grad, n2);
            w = abs(val) / length(grad);
            col = mix(col, ISO_COLOR, mix(1.0, 0.0, clamp(w - ISO_LINE_WIDTH*tnf.y, 0.0, 1.0)));
        }
    }
#endif

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
