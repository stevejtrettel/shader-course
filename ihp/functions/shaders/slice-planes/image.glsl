// =============================================
// 3D SLICE PLANES
// =============================================
// Visualizes a scalar field f(x,y,z) using cutting planes:
//
//   • Three semi-transparent REFERENCE planes at x=0, y=0, z=0
//     show a muted colormap with contour lines for spatial context.
//
//   • One opaque ACTIVE slice sweeps back and forth along a
//     chosen axis, showing a rich colormap with gradient-corrected
//     contour lines — a 2D level-set plot embedded in 3D.
//
// The active slice axis (x, y, or z) is configurable.
// Drag to orbit.

// =============================================
// EDIT HERE: Define your function f(x, y, z)
// =============================================

float f(vec3 p) {
    // Gyroid
    return sin(p.x) * cos(p.y) + sin(p.y) * cos(p.z) + sin(p.z) * cos(p.x);

    // return cos(p.x) + cos(p.y) + cos(p.z);                          // Schwarz P
    // return sin(p.x) * sin(p.y) * sin(p.z);                          // 3D checkerboard
    // return dot(p,p) + 2.0*p.x*p.y*p.z - 1.0;                      // Cayley cubic
    // return length(vec2(length(p.xz)-1.5, p.y)) - 0.5;              // torus field
    // return p.x*p.x + p.y*p.y - p.z*p.z - 0.5;                     // hyperboloid
    // return exp(-dot(p,p)) * (p.x*p.x - p.y*p.y);                   // d-orbital
    // return sin(length(p)*6.0 - iTime*2.0) * exp(-0.3*dot(p,p));    // pulsing wave
}

// =============================================
// PARAMETERS
// =============================================

#define PI 3.14159265359

// Active slice axis: 0 = x, 1 = y, 2 = z
#define SLICE_AXIS     1

// Active slice motion
#define SLICE_SPEED    0.4
#define SLICE_RANGE    2.8

// Domain
#define DOMAIN_SIZE    vec3(3.5)

// Camera
#define CAM_DIST       9.0
#define CAM_HEIGHT     4.5
#define AUTO_SPEED     0.2
#define FOV            2.0

// Active slice: colormap + contour lines
#define SPACING        0.25      // distance between contour lines
#define LINE_PX        2.0       // contour line width in pixels
#define COLOR_SCALE    0.45      // colormap saturation
#define ZERO_LINE_PX   3.5       // f=0 contour width (thicker)

// Reference planes
#define REF_SPACING    0.5
#define REF_LINE_PX    1.0
#define REF_COLOR_SAT  0.12
#define REF_LINE_DIM   0.35

// Grid lines on bounding box
#define GRID_SPACING   1.0
#define GRID_LINE_PX   1.2

// Lighting
#define AMBIENT        0.55

// Colors
const vec3 BG_COLOR     = vec3(0.94, 0.93, 0.91);
const vec3 BOX_COLOR    = vec3(0.88, 0.87, 0.85);
const vec3 GRID_COLOR   = vec3(0.6, 0.58, 0.55);
const vec3 AXIS_COLOR   = vec3(0.35, 0.33, 0.3);

// =============================================
// VISUALIZATION CODE (no need to edit below)
// =============================================

#define LIGHT_DIR normalize(vec3(cos(-iTime*0.3 + PI*0.5), 1.0, sin(-iTime*0.3 + PI*0.5)))

// Diverging colormap: blue — white — red
vec3 divergingMap(float val, float scale) {
    float t = clamp(val * scale, -1.0, 1.0);
    if (t < 0.0) return mix(vec3(1.0), vec3(0.15, 0.35, 0.85), -t);
    else          return mix(vec3(1.0), vec3(0.85, 0.15, 0.15), t);
}

// Gradient-corrected contour lines on a slice plane
float contourLines(vec3 p, vec3 faceNormal, float spacing, float linePx, float tHit) {
    float val = f(p);
    float e = 0.005;
    vec3 grad = vec3(
        f(p + vec3(e,0,0)) - f(p - vec3(e,0,0)),
        f(p + vec3(0,e,0)) - f(p - vec3(0,e,0)),
        f(p + vec3(0,0,e)) - f(p - vec3(0,0,e))
    ) / (2.0 * e);
    grad -= faceNormal * dot(grad, faceNormal);
    float gradMag = length(grad);
    float pixelSize = tHit * 2.0 / iResolution.y;
    float valInCell = fract(val / spacing);
    float distToLine = min(valInCell, 1.0 - valInCell) * spacing;
    float pixelDist = distToLine / max(gradMag * pixelSize, 1e-6);
    return 0.2 + 0.8 * smoothstep(0.0, linePx, pixelDist);
}

float zeroContour(vec3 p, vec3 faceNormal, float linePx, float tHit) {
    float val = f(p);
    float e = 0.005;
    vec3 grad = vec3(
        f(p + vec3(e,0,0)) - f(p - vec3(e,0,0)),
        f(p + vec3(0,e,0)) - f(p - vec3(0,e,0)),
        f(p + vec3(0,0,e)) - f(p - vec3(0,0,e))
    ) / (2.0 * e);
    grad -= faceNormal * dot(grad, faceNormal);
    float gradMag = length(grad);
    float pixelSize = tHit * 2.0 / iResolution.y;
    float pixelDist = abs(val) / max(gradMag * pixelSize, 1e-6);
    return 1.0 - smoothstep(0.0, linePx, pixelDist);
}

// Active slice: rich colormap + contours + f=0 highlight
vec3 activeSliceColor(vec3 p, vec3 normal, float tHit) {
    float val = f(p);
    vec3 col = divergingMap(val, COLOR_SCALE);
    float lines = contourLines(p, normal, SPACING, LINE_PX, tHit);
    col *= 0.15 + 0.85 * lines;
    float zc = zeroContour(p, normal, ZERO_LINE_PX, tHit);
    col = mix(col, vec3(0.05), zc * 0.9);
    float diff = AMBIENT + (1.0 - AMBIENT) * abs(dot(normal, LIGHT_DIR));
    return col * diff;
}

// Reference plane: muted colormap + sparser contours
vec3 refPlaneColor(vec3 p, vec3 normal, float tHit) {
    float val = f(p);
    vec3 col = divergingMap(val, REF_COLOR_SAT);
    float lines = contourLines(p, normal, REF_SPACING, REF_LINE_PX, tHit);
    col *= mix(1.0, lines, REF_LINE_DIM);
    float zc = zeroContour(p, normal, REF_LINE_PX * 1.5, tHit);
    col = mix(col, vec3(0.45), zc * REF_LINE_DIM);
    float diff = AMBIENT + (1.0 - AMBIENT) * abs(dot(normal, LIGHT_DIR));
    return col * diff;
}

// Box face with grid
vec3 drawBoxFace(vec3 p, vec3 faceNormal, float tHit) {
    vec2 faceCoord;
    if (abs(faceNormal.x) > 0.5)      faceCoord = p.yz;
    else if (abs(faceNormal.y) > 0.5)  faceCoord = p.xz;
    else                                faceCoord = p.xy;
    float pixelSize = tHit * 2.0 / iResolution.y;
    vec2 majorGrid = abs(fract(faceCoord / GRID_SPACING + 0.5) - 0.5) * GRID_SPACING;
    float majorDist = min(majorGrid.x, majorGrid.y);
    float majorLine = 1.0 - smoothstep(0.0, pixelSize * GRID_LINE_PX, majorDist);
    vec2 axisDist = abs(faceCoord);
    float axisLine = 1.0 - smoothstep(0.0, pixelSize * GRID_LINE_PX * 2.0, min(axisDist.x, axisDist.y));
    float diff = AMBIENT + (1.0 - AMBIENT) * abs(dot(faceNormal, LIGHT_DIR));
    vec3 col = BOX_COLOR * diff;
    col = mix(col, GRID_COLOR * diff, majorLine * 0.45);
    col = mix(col, AXIS_COLOR * diff, axisLine * 0.6);
    return col;
}

// Geometry
vec2 boxIntersect(vec3 ro, vec3 rd, vec3 halfSize, out vec3 nFront, out vec3 nBack) {
    vec3 m = 1.0 / rd;
    vec3 n = m * ro;
    vec3 k = abs(m) * halfSize;
    vec3 t1 = -n - k;
    vec3 t2 = -n + k;
    float tN = max(max(t1.x, t1.y), t1.z);
    float tF = min(min(t2.x, t2.y), t2.z);
    if (tN > tF || tF < 0.0) return vec2(-1.0);
    nFront = -sign(rd) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz);
    vec3 d = abs(ro + rd * tF);
    nBack = -sign(rd) * vec3(
        d.x > d.y && d.x > d.z ? 1.0 : 0.0,
        d.y > d.x && d.y > d.z ? 1.0 : 0.0,
        d.z > d.y && d.z > d.x ? 1.0 : 0.0
    );
    return vec2(tN, tF);
}

float planeIntersect(vec3 ro, vec3 rd, int axis, float planePos, vec3 halfSize) {
    float o = axis == 0 ? ro.x : (axis == 1 ? ro.y : ro.z);
    float d = axis == 0 ? rd.x : (axis == 1 ? rd.y : rd.z);
    if (abs(d) < 1e-8) return -1.0;
    float t = (planePos - o) / d;
    if (t < 0.0) return -1.0;
    vec3 p = ro + rd * t;
    if (abs(p.x) > halfSize.x + 0.001 ||
        abs(p.y) > halfSize.y + 0.001 ||
        abs(p.z) > halfSize.z + 0.001) return -1.0;
    return t;
}

vec3 planeNormal(int axis) {
    if (axis == 0) return vec3(1, 0, 0);
    if (axis == 1) return vec3(0, 1, 0);
    return vec3(0, 0, 1);
}

mat3 setCamera(vec3 ro, vec3 ta) {
    vec3 cw = normalize(ta - ro);
    vec3 cp = vec3(0.0, 1.0, 0.0);
    vec3 cu = normalize(cross(cw, cp));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;

    vec3 ro, ta;
    ta = vec3(0.0);
    if (iMouse.z > 0.5) {
        float phi = (iMouse.x / iResolution.x) * 2.0 * PI;
        float psi = -((iMouse.y / iResolution.y) - 0.5) * PI;
        ro = CAM_DIST * vec3(cos(phi)*cos(psi), sin(psi), sin(phi)*cos(psi));
    } else {
        ro = vec3(
            CAM_DIST * cos(-iTime * AUTO_SPEED),
            CAM_HEIGHT,
            CAM_DIST * sin(-iTime * AUTO_SPEED)
        );
    }
    mat3 cam = setCamera(ro, ta);
    vec3 rd = cam * normalize(vec3(uv, FOV));

    vec3 col = BG_COLOR;

    vec3 nFront, nBack;
    vec2 tBox = boxIntersect(ro, rd, DOMAIN_SIZE, nFront, nBack);

    if (tBox.y > 0.0) {
        float tMin = max(tBox.x, 0.0);
        float tMax = tBox.y;

        // Back face: reference contour plot
        vec3 pBack = ro + rd * (tMax - 0.001);
        col = refPlaneColor(pBack, nBack, tMax);

        // Active slice
        float slicePos = SLICE_RANGE * sin(iTime * SLICE_SPEED);
        float sliceT = planeIntersect(ro, rd, SLICE_AXIS, slicePos, DOMAIN_SIZE);

        if (sliceT > tMin && sliceT < tMax - 0.001) {
            vec3 p = ro + rd * sliceT;
            vec3 n = planeNormal(SLICE_AXIS);
            vec3 sliceCol = activeSliceColor(p, n, sliceT);

            // Edge outline where slice meets box boundary
            float d1, d2;
            if (SLICE_AXIS == 0)      { d1 = DOMAIN_SIZE.y - abs(p.y); d2 = DOMAIN_SIZE.z - abs(p.z); }
            else if (SLICE_AXIS == 1) { d1 = DOMAIN_SIZE.x - abs(p.x); d2 = DOMAIN_SIZE.z - abs(p.z); }
            else                       { d1 = DOMAIN_SIZE.x - abs(p.x); d2 = DOMAIN_SIZE.y - abs(p.y); }
            float edgeDist = min(d1, d2);
            float pixelSize = sliceT * 2.0 / iResolution.y;
            float edge = 1.0 - smoothstep(pixelSize * 0.5, pixelSize * 2.5, edgeDist);
            sliceCol = mix(sliceCol, vec3(0.15), edge * 0.7);

            col = sliceCol;
        }

        // Front face: thin grid overlay
        if (tMin > 0.0) {
            vec3 pFront = ro + rd * (tMin + 0.001);
            vec3 gridCol = drawBoxFace(pFront, nFront, tMin);
            col = mix(col, gridCol, 0.1);
        }
    }

    col = pow(col, vec3(1.0 / 2.2));
    fragColor = vec4(col, 1.0);
}
