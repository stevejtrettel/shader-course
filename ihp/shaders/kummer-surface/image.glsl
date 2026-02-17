// =============================================
//  IHP Shader Workshop 2026
//  KUMMER SURFACE
//
//  The Kummer quartic — a degree-4 surface with
//  16 ordinary double points (the maximum for a
//  quartic). Tetrahedral symmetry.
//
//  The parameter mu controls the shape: near 1
//  the surface is a small deformed sphere; at
//  mu = sqrt(2) it expands into the full Kummer
//  with all 16 nodes developed.
//  Drag to orbit the camera.
// =============================================

// =============================================
//  THE SURFACE
// =============================================

#define PI 3.14159265359
#define ANIM_SPEED 0.35

float f(vec3 p) {
    // mu controls the Kummer deformation
    //   mu near 1  : small, gently deformed sphere
    //   mu = sqrt(2): classic Kummer, 16 nodes at full depth
    float mu = 1.1 + 0.32 * (0.5 + 0.5 * sin(iTime * ANIM_SPEED));

    float mu2 = mu * mu;
    float lam = (3.0 * mu2 - 1.0) / (3.0 - mu2);
    float lam3 = lam * lam * lam;

    float x2 = p.x*p.x, y2 = p.y*p.y, z2 = p.z*p.z;
    float s2 = x2 + y2 + z2;
    float q = s2 - lam;
    return q*q - lam3 * (x2*y2 + x2*z2 + y2*z2 - lam*lam*0.25);
}

// =============================================
//  PARAMETERS
//
//  ANIM_SPEED      — oscillation speed
//  BOX_SIZE        — bounding box half-size
//  SHOW_BOX        — 1 = bounding box, 0 = unbounded
//  STEP_SIZE       — ray march step (smaller = finer)
//  ISO_LINE_WIDTH  — isoline width on box faces
//  SPEC_EXP        — specular exponent
//  CAM_DIST        — camera distance from origin
//  CAM_HEIGHT      — camera height
//  CAM_SPEED       — orbit speed
//  FOV             — field of view (smaller = wider angle)
//  SURFACE_A/B     — two-tone surface colors (tetrahedral)
//  ISO_COLOR       — isoline color on box faces
// =============================================

#define BOX_SIZE   vec3(4.5)
#define SHOW_BOX   1
#define MARCH_RADIUS 10.0
#define STEP_SIZE  0.006
#define ISO_LINE_WIDTH 0.2
#define SPEC_EXP   128.0

// Camera
#define CAM_DIST   10.5
#define CAM_HEIGHT 3.5
#define CAM_SPEED  0.2
#define FOV        1.2

// Colors — two-tone tetrahedral coloring via sign(xyz)
const vec3 SURFACE_A = vec3(0.92, 0.55, 0.25); // warm amber
const vec3 SURFACE_B = vec3(0.25, 0.50, 0.85); // cool blue
const vec3 GRID_COLOR = vec3(0.03);             // dark grid lines
const vec3 ISO_COLOR  = vec3(0.05);

// Surface grid — radial contour rings
#define GRID_FREQ  2.5   // rings per unit radius
#define GRID_WIDTH 0.03  // line half-width (in fract-space)

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

#define LIGHT_DIR normalize(vec3(cos(-iTime*0.3+PI*0.5), 1.0, sin(-iTime*0.3+PI*0.5)))

vec3 boxCenter = vec3(0.0, BOX_SIZE.y, 0.0);

float fWorld(vec3 p) { return f(p - boxCenter); }

vec3 fGrad(vec3 p) {
    vec2 d = vec2(0.005, 0.0);
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
    vec3 dd = abs(roo + rd*tF);
    nBack = -sign(rd)*vec3(
        dd.x>dd.y&&dd.x>dd.z ? 1.0 : 0.0,
        dd.y>dd.x&&dd.y>dd.z ? 1.0 : 0.0,
        dd.z>dd.y&&dd.z>dd.x ? 1.0 : 0.0);
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
    vec3 col = mix(vec3(0.92), vec3(0.5,0.6,0.9), 1.0 - exp(-0.05*t));

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

            // Two-tone tetrahedral coloring: sign of xyz
            // divides the surface along the three coordinate planes,
            // revealing the tetrahedral symmetry
            vec3 sp = p - boxCenter;
            float tetra = sp.x * sp.y * sp.z;
            vec3 cur_col = mix(SURFACE_A, SURFACE_B,
                               smoothstep(-0.1, 0.1, tetra));

            // Radial contour rings
            float r = length(sp);
            float radial = abs(fract(r * GRID_FREQ - 0.5) - 0.5);
            float ring = 1.0 - smoothstep(GRID_WIDTH, GRID_WIDTH + 0.02, radial);
            cur_col = mix(cur_col, GRID_COLOR, 0.7 * ring);

            if (dot(nn, rd) > 0.0) {
                cur_col = 0.4 + 0.6*cur_col;
                nn = -nn;
            }
            // Wrap diffuse + specular
            col = cur_col*(0.5 + 0.5*max(0.0, dot(nn, LIGHT_DIR)))
                + vec3(pow(max(0.0, dot(LIGHT_DIR, reflect(rd, nn))), SPEC_EXP));
            t_max = tt;
        }
    }

#if SHOW_BOX
    // Isolines on box faces (f=0 contour)
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
    vec3 ta = boxCenter;
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
