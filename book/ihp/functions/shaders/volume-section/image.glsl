// =============================================
//  IHP Shader Workshop 2026
//  3D SCALAR FIELD — VOLUME CROSS-SECTION
//
//  Same as the volume shader, but with a sweeping
//  clip plane that progressively reveals the density.
//  Everything else identical.
// =============================================

// =============================================
//  YOUR FUNCTION
// =============================================

float rho(vec3 p) {
    float g1 = exp(-2.0 * dot(p - vec3(1,0,0), p - vec3(1,0,0)));
    float g2 = exp(-2.0 * dot(p + vec3(1,0,0), p + vec3(1,0,0)));
    float g3 = exp(-3.0 * dot(p, p));
    return g1 + g2 - 0.8 * g3;

    // return sin(p.x) * sin(p.y) * sin(p.z);
    // return exp(-dot(p,p)) * sin(5.0*length(p));
    // return exp(-dot(p,p)) * (p.x*p.x - p.y*p.y);
    // return sin(length(p) * 6.0 - iTime * 2.0) * exp(-0.3*dot(p,p));
}

// =============================================
//  PARAMETERS
//
//  VOLUME_SIGN    — which sign to render (0=both, 1=pos, -1=neg)
//  DENSITY_SCALE  — amplifies density for visibility
//  CLIP_SPEED     — clip plane sweep speed
//  CLIP_RANGE     — clip plane sweep amplitude
//  CLIP_NORMAL    — clip plane orientation
//  NUM_STEPS      — raymarch sample count
// =============================================

const int VOLUME_SIGN = 0;

#define PI 3.14159265359

// Domain
#define BOX_SIZE       vec3(3.0)

// Camera
#define CAM_DIST       7.0
#define CAM_HEIGHT     3.5
#define CAM_SPEED      0.2
#define FOV            2.0

// Volume rendering
#define NUM_STEPS      128
#define DENSITY_SCALE  5.0
#define ABSORPTION     0.5
#define LIGHT_STRENGTH 0.6
#define BRIGHTNESS     4.0
#define GLOW_POWER     1.0
#define OPACITY_CUTOFF 0.01

// Clipping: skip samples where dot(p, CLIP_NORMAL) > clipOff
#define CLIP_SPEED     0.25
#define CLIP_RANGE     2.5
vec3 CLIP_NORMAL = normalize(vec3(0.0, 1.0, 0.0));

// Grid on box faces
#define SHOW_GRID      true
#define GRID_SPACING   1.0
#define GRID_WIDTH     0.02

// Colors
const vec3 POS_COLOR_CORE = vec3(1.0, 0.95, 0.85);
const vec3 POS_COLOR_EDGE = vec3(0.95, 0.4, 0.1);
const vec3 NEG_COLOR_CORE = vec3(0.85, 0.95, 1.0);
const vec3 NEG_COLOR_EDGE = vec3(0.1, 0.35, 0.9);
const vec3 BG_COLOR       = vec3(0.02, 0.02, 0.04);

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

#define LIGHT_DIR normalize(vec3(cos(-iTime*0.3+PI*0.5), 1.0, sin(-iTime*0.3+PI*0.5)))

vec2 boxIntersect(vec3 ro, vec3 rd, vec3 halfSize) {
    vec3 m = 1.0/rd;
    vec3 n = m*ro;
    vec3 k = abs(m)*halfSize;
    vec3 t1 = -n - k;
    vec3 t2 = -n + k;
    float tN = max(max(t1.x, t1.y), t1.z);
    float tF = min(min(t2.x, t2.y), t2.z);
    if (tN > tF || tF < 0.0) return vec2(-1.0);
    return vec2(tN, tF);
}

vec3 gradRho(vec3 p) {
    float e = 0.02;
    return vec3(
        rho(p + vec3(e,0,0)) - rho(p - vec3(e,0,0)),
        rho(p + vec3(0,e,0)) - rho(p - vec3(0,e,0)),
        rho(p + vec3(0,0,e)) - rho(p - vec3(0,0,e))
    ) / (2.0 * e);
}

vec4 transferFunction(float val, vec3 p, vec3 lightDir) {
    float absVal = abs(val);
    if (absVal < OPACITY_CUTOFF) return vec4(0.0);
    if (VOLUME_SIGN > 0 && val < 0.0) return vec4(0.0);
    if (VOLUME_SIGN < 0 && val > 0.0) return vec4(0.0);

    float intensity = pow(absVal, GLOW_POWER);
    vec3 col;
    if (val > 0.0)
        col = mix(POS_COLOR_EDGE, POS_COLOR_CORE, smoothstep(0.0, 0.8, intensity));
    else
        col = mix(NEG_COLOR_EDGE, NEG_COLOR_CORE, smoothstep(0.0, 0.8, intensity));

    vec3 grad = gradRho(p);
    float gradMag = length(grad);
    if (gradMag > 0.001) {
        float lightFactor = 0.5 + 0.5 * dot(grad / gradMag, lightDir);
        col *= mix(1.0, lightFactor, LIGHT_STRENGTH * smoothstep(0.0, 0.5, absVal));
    }

    float emit = 1.0 - exp(-intensity);   // saturates at 1 — prevents blowout
    float opacity = 1.0 - exp(-ABSORPTION * emit);
    return vec4(col * BRIGHTNESS * emit, opacity);
}

vec3 boxFaceGrid(vec3 p, vec3 normal) {
    vec2 fc;
    if (abs(normal.x) > 0.5)      fc = p.yz;
    else if (abs(normal.y) > 0.5)  fc = p.xz;
    else                            fc = p.xy;

    vec2 grid = abs(fract(fc / GRID_SPACING + 0.5) - 0.5) * GRID_SPACING;
    float d = min(grid.x, grid.y);
    float line = 1.0 - smoothstep(0.0, GRID_WIDTH, d);

    vec2 axisD = abs(fc);
    float axisLine = 1.0 - smoothstep(0.0, GRID_WIDTH * 2.0, min(axisD.x, axisD.y));

    vec3 col = BG_COLOR + vec3(0.03);
    col = mix(col, vec3(0.08, 0.08, 0.12), line * 0.8);
    col = mix(col, vec3(0.12, 0.1, 0.15), axisLine * 0.6);
    return col;
}

vec3 boxNormalAt(vec3 ro, vec3 rd, float t, vec3 halfSize) {
    vec3 p = ro + rd * t;
    vec3 d = abs(abs(p) - halfSize);
    float minD = min(d.x, min(d.y, d.z));
    if (d.x == minD) return vec3(sign(p.x), 0, 0);
    if (d.y == minD) return vec3(0, sign(p.y), 0);
    return vec3(0, 0, sign(p.z));
}

mat3 setCamera(vec3 ro, vec3 ta) {
    vec3 cw = normalize(ta - ro);
    vec3 cp = vec3(0.0, 1.0, 0.0);
    vec3 cu = normalize(cross(cw, cp));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0*fragCoord - iResolution.xy) / iResolution.y;

    vec3 ta = vec3(0.0);
    vec3 ro;
    if (iMouse.z > 0.5) {
        float phi = (iMouse.x / iResolution.x) * PI * 2.0;
        float psi = -((iMouse.y / iResolution.y) - 0.5) * PI;
        ro = CAM_DIST * vec3(cos(phi)*cos(psi), sin(psi), sin(phi)*cos(psi));
    } else {
        ro = vec3(CAM_DIST*cos(-iTime*CAM_SPEED), CAM_HEIGHT, CAM_DIST*sin(-iTime*CAM_SPEED));
    }
    mat3 cam = setCamera(ro, ta);
    vec3 rd = cam * normalize(vec3(uv, FOV));

    float clipOff = CLIP_RANGE * sin(CLIP_SPEED * iTime);

    vec3 col = BG_COLOR + 0.02 * max(rd.y, 0.0);

    vec2 tBox = boxIntersect(ro, rd, BOX_SIZE);

    if (tBox.y > 0.0) {
        float tMin = max(tBox.x, 0.0);
        float tMax = tBox.y;
        float stepSize = (tMax - tMin) / float(NUM_STEPS);

        // Back face grid (always)
        if (SHOW_GRID) {
            vec3 pBack = ro + rd * (tMax - 0.001);
            vec3 nBack = boxNormalAt(ro, rd, tMax, BOX_SIZE);
            col = boxFaceGrid(pBack, nBack);
        }

        // Front-to-back compositing — skip samples above clip plane
        vec3 accumColor = vec3(0.0);
        float accumAlpha = 0.0;

        for (int i = 0; i < NUM_STEPS; i++) {
            if (accumAlpha > 0.99) break;
            float t = tMin + (float(i) + 0.5) * stepSize;
            vec3 p = ro + rd * t;

            // THE ONLY DIFFERENCE: skip if above clip plane
            if (dot(p, CLIP_NORMAL) > clipOff) continue;

            float val = rho(p) * DENSITY_SCALE;
            vec4 s = transferFunction(val, p, LIGHT_DIR);

            if (s.a > 0.0) {
                float so = s.a * stepSize;
                accumColor += (1.0 - accumAlpha) * s.rgb * so;
                accumAlpha += (1.0 - accumAlpha) * so;
            }
        }

        col = accumColor + (1.0 - accumAlpha) * col;

        // Front face grid (always)
        if (SHOW_GRID && tMin > 0.0) {
            vec3 pFront = ro + rd * (tMin + 0.001);
            vec3 nFront = boxNormalAt(ro, rd, tMin, BOX_SIZE);
            col = mix(col, boxFaceGrid(pFront, nFront), 0.15);
        }
    }

    col = col / (1.0 + col);
    col = pow(col, vec3(1.0/2.2));
    fragColor = vec4(col, 1.0);
}
