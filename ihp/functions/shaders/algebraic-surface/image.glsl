// =============================================
//  IHP Shader Workshop 2026
//  ALGEBRAIC SURFACES
//
//  Raymarches real algebraic varieties V(f) = {f = 0}
//  for polynomial f. Loaded with classic examples from
//  algebraic geometry: Clebsch, Cayley, Kummer, Barth,
//  and more.
// =============================================

// =============================================
//  YOUR FUNCTION
// =============================================

#define PI 3.14159265359
#define PHI (0.5 + 0.5 * sqrt(5.0))  // golden ratio

float f(vec3 p) {

    // ── Clebsch diagonal cubic ────────────────────────────
    // The unique cubic surface (up to projective equivalence)
    // on which all 27 lines are real. Look for them as
    // straight creases on the surface.
    //
    // In projective coordinates [x0:x1:x2:x3:x4] with
    // x0+x1+x2+x3+x4 = 0, the equation is sum(xi^3) = 0.
    // The affine form below places the surface nicely in the
    // bounding box.
    float x = p.x, y = p.y, z = p.z;
    return 81.0*(x*x*x + y*y*y + z*z*z)
         - 189.0*(x*x*y + x*x*z + x*y*y + y*y*z + x*z*z + y*z*z)
         + 54.0*x*y*z + 126.0*(x*y + x*z + y*z)
         - 9.0*(x*x + y*y + z*z) - 9.0*(x + y + z) + 1.0;


    // ── CUBICS ──────────────────────────────────────────

    // Cayley cubic — 4 ordinary double points (the maximum
    // for a cubic surface). The nodes sit at the vertices
    // of a tetrahedron.
    // return x*x + y*y + z*z + 2.0*x*y*z - 1.0;

    // Fermat cubic — x³ + y³ + z³ = 1
    // Smooth, with 3-fold rotational symmetry about (1,1,1).
    // return x*x*x + y*y*y + z*z*z - 1.0;

    // Nodal cubic — a single ordinary double point at the origin
    // return x*x*x + y*y*y + z*z*z - x*y*z;


    // ── QUARTICS ─────────────────────────────────────────

    // Kummer surface — quartic with 16 nodes (the maximum).
    // The parameter mu controls the shape; mu = sqrt(2)
    // gives the "standard" Kummer surface with tetrahedral symmetry.
    // float mu = sqrt(2.0);
    // float x2 = x*x, y2 = y*y, z2 = z*z;
    // float s2 = x2 + y2 + z2;
    // float lam = (3.0*mu*mu - 1.0) / (3.0 - mu*mu);
    // float p2 = s2 - lam;
    // return p2*p2 - lam*lam * (3.0*mu*mu - 1.0)/(3.0 - mu*mu) * (x2*y2 + x2*z2 + y2*z2 - lam*lam/4.0);

    // Steiner surface (Roman surface) — a self-intersecting
    // quartic with tetrahedral symmetry. The three double
    // lines and the pinch point are clearly visible.
    // return x*x*y*y + x*x*z*z + y*y*z*z - 0.3*x*y*z;


    // ── HIGHER DEGREE ────────────────────────────────────

    // Togliatti quintic — degree 5 with 31 nodes (a record).
    // Icosahedral symmetry.
    // float x2=x*x, y2=y*y, z2=z*z;
    // float w = 1.0; // homogeneous coordinate
    // float w2 = w*w, w4 = w2*w2;
    // float c0 = (x2+y2+z2-w2);
    // float t1 = x2+y2+z2+w2;
    // return 64.0*(x2-PHI*PHI*w2)*(x2-w2/(PHI*PHI))*t1
    //      - 8.0*(x2+y2-z2-w2)*(x2+y2-z2-w2)*t1*t1
    //      + 4.0*c0*c0*c0*c0 - 4.0*c0*c0*t1*t1;

    // Barth sextic — degree 6, icosahedral symmetry, 65 nodes
    // (the maximum for a sextic). The golden ratio appears
    // in the equation.
    // float x2=x*x, y2=y*y, z2=z*z, w2=0.36;
    // float s2 = x2+y2+z2;
    // return 4.0*(PHI*PHI*x2-y2)*(PHI*PHI*y2-z2)*(PHI*PHI*z2-x2)
    //      - (1.0+2.0*PHI)*(s2-w2)*(s2-w2)*w2;

    // Barth decic — degree 10, icosahedral symmetry, 345 nodes.
    // Extraordinarily intricate.
    // float x2=x*x, y2=y*y, z2=z*z, w2=0.36;
    // float s2 = x2+y2+z2;
    // float a = x2+y2+z2-w2;
    // return 8.0*(x2-PHI*PHI*PHI*PHI*y2)*(y2-PHI*PHI*PHI*PHI*z2)*(z2-PHI*PHI*PHI*PHI*x2)
    //        *(s2*s2 - 2.0*((x*y)*(x*y)+(x*z)*(x*z)+(y*z)*(y*z)))
    //        + (3.0+5.0*PHI)*a*a*a*a*a*w2*w2*w2*w2*w2;


    // ── SINGULARITY ZOO ──────────────────────────────────

    // Whitney umbrella — the simplest non-isolated singularity:
    // a line of double points along the z-axis, with a pinch
    // point at the origin.
    // return x*x - y*y*z;

    // Cuspidal edge — a line of cuspidal singularities
    // return x*x - y*y*y;

    // Swallowtail — the discriminant of x⁴ + ax² + bx + c
    // (here a = z, b = x, c = y)
    // return 256.0*y*y*y - 27.0*x*x*x*x - 128.0*z*z*y*y
    //      + 144.0*z*x*x*y - 4.0*z*z*z*x*x + 16.0*z*z*z*z*y;


    // ── FERMAT FAMILY x^n + y^n + z^n = 1 ───────────────

    // Sphere (n=2)
    // return x*x + y*y + z*z - 1.0;

    // Fermat quartic (n=4) — resembles a rounded cube
    // return x*x*x*x + y*y*y*y + z*z*z*z - 1.0;

    // Fermat sextic (n=6) — even more cube-like
    // float x2=x*x, y2=y*y, z2=z*z;
    // return x2*x2*x2 + y2*y2*y2 + z2*z2*z2 - 1.0;


    // ── OTHER CLASSICS ───────────────────────────────────

    // Boy surface (parametric -> implicit approximation via
    // Apery's equation). A non-orientable surface immersed
    // in R^3 with a single triple point.
    // float x2=x*x, y2=y*y, z2=z*z;
    // float s2 = x2 + y2 + z2;
    // return 64.0*(1.0-z)*(1.0-z)*(1.0-z)*z*z*z
    //      - 48.0*(1.0-z)*(1.0-z)*z*z*(3.0*x2+3.0*y2+2.0*z2)
    //      + 12.0*(1.0-z)*z*(27.0*(x2+y2)*(x2+y2) - 24.0*z2*(x2+y2)
    //      + 36.0*sqrt(2.0)*y*z*(y2-3.0*x2) + 4.0*z2*z2)
    //      + (9.0*x2+9.0*y2-2.0*z2)*(-81.0*(x2+y2)*(x2+y2)
    //      - 72.0*z2*(x2+y2) + 108.0*sqrt(2.0)*x*z*(x2-3.0*y2) + 4.0*z2*z2);

    // Labs septic — degree 7, 99 nodes
    // (uncomment and scale p by ~0.7 for a good view)
    // float x2=x*x, y2=y*y, z2=z*z;
    // return (x2+y2+z2-0.5)*(x2+y2+z2-0.5)*(x2+y2+z2-0.5)
    //      - (0.5+sqrt(5.0)/4.0)*(3.0*x2-1.0);
}

// =============================================
//  PARAMETERS
//
//  BOX_SIZE        — bounding box half-size
//  SHOW_BOX        — 1 = bounding box, 0 = unbounded
//  MARCH_RADIUS    — max march distance when SHOW_BOX = 0
//  STEP_SIZE       — smaller step for fine polynomial detail
//  ISO_LINE_WIDTH  — isoline width on box faces
//  SPEC_EXP        — specular exponent
//  CAM_DIST        — camera distance from origin
//  CAM_HEIGHT      — camera height
//  CAM_SPEED       — orbit speed
//  FOV             — field of view
//  SURFACE_COLOR   — surface diffuse color (warm stone)
//  ISO_COLOR       — isoline color on box faces
// =============================================

#define BOX_SIZE   vec3(1.0)
#define SHOW_BOX   1
#define MARCH_RADIUS 10.0
#define STEP_SIZE  0.008
#define ISO_LINE_WIDTH 0.2
#define SPEC_EXP   128.0

// Camera
#define CAM_DIST   5.0
#define CAM_HEIGHT 4.0
#define CAM_SPEED  0.2
#define FOV        2.0

// Colors
const vec3 SURFACE_COLOR = vec3(0.85, 0.78, 0.65); // warm stone
const vec3 ISO_COLOR     = vec3(0.05);

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
            vec3 cur_col = SURFACE_COLOR;
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
