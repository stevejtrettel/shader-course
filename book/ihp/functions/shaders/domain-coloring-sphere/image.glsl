// =============================================
//  IHP Shader Workshop 2026
//  DOMAIN COLORING — RIEMANN SPHERE
//
//  Domain coloring on a lit 3D sphere via
//  stereographic projection. Drag to rotate.
//  The south pole maps to infinity.
//  Common tab: complex arithmetic library.
// =============================================

// =============================================
//  YOUR FUNCTION
// =============================================

vec2 f(vec2 z) {
    // Two steps of the Doyle-McMullen iteration for z^5 = 1
    // (a generally convergent algorithm; see doi:10.1007/BF02392735)
    for (int i = 0; i < 2; i++) {
        vec2 z5 = cmul(cmul(cmul(cmul(z, z), z), z), z);
        vec2 num = cmul(z5 + vec2(11, 0), z5) - vec2(1, 0);
        vec2 den = cmul(11.0 * z5, z5 + vec2(6, 0)) - vec2(1, 0);
        z = z - 12.0 * cmul(z, cdiv(num, den));
    }
    return z;

    // Other things to try:
    // return cmul(z, z);                                // z^2: two-to-one cover
    // return cdiv(cmul(z, z) - vec2(1,0), cmul(z, z) + vec2(1,0)); // Mobius
    // return csin(z);                                   // wild near poles
    // return cinv(z);                                   // swap 0 and infinity
}

// =============================================
//  PARAMETERS
//
//  SPHERE_RADIUS  — radius in screen units
//  SCALE          — how much of the screen the sphere fills
//  AUTO_SPEED     — auto-rotation speed when not dragging
//  BG_COLOR       — background color
// =============================================

#define SPHERE_RADIUS 3.0     // radius in screen units
#define SCALE         8.0     // controls how much of the screen the sphere fills
#define AUTO_SPEED    0.15    // auto-rotation speed when not dragging
const vec3 BG_COLOR = vec3(0.15); // background: try vec3(0.95) for light

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

// Rotation matrices
mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1, 0, 0, 0, c, -s, 0, s, c);
}

mat3 rotZ(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, -s, 0, s, c, 0, 0, 0, 1);
}

// Stereographic projection: sphere point (x, y, z) -> complex number
// Projects from the back pole (y = -1, hidden from viewer)
// Center of visible disk (y = 1) maps to z = 0
vec2 stereo(vec3 n) {
    float denom = 1.0 + n.y;
    if (denom < 1e-6) return vec2(1e6); // near back pole -> infinity
    return vec2(n.x, n.z) / denom;
}

// Sphere normal from screen-space point inside the disk
vec3 sphereNormal(vec2 uv, float r) {
    vec2 p = uv / r;
    float z = sqrt(max(0.0, 1.0 - dot(p, p)));
    return normalize(vec3(p.x, z, p.y)); // y is toward viewer
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 aspect = iResolution.xy / iResolution.y;
    vec2 uv = (fragCoord.xy / iResolution.y) - 0.5 * aspect;
    uv *= SCALE;

    float r = SPHERE_RADIUS;

    if (length(uv) < r) {
        // Sphere geometry
        vec3 normal = sphereNormal(uv, r);

        // Rotation: drag to orbit, auto-rotate when idle
        float azimuth, elevation;
        if (iMouse.z > 0.0) {
            // Mouse dragging: map mouse position to angles
            azimuth   = -(iMouse.x / iResolution.x - 0.5) * 2.0 * PI;
            elevation = (iMouse.y / iResolution.y - 0.5) * PI;
        } else {
            // Auto-rotate
            azimuth   = AUTO_SPEED * iTime;
            elevation = 0.3 * sin(0.2 * iTime);
        }
        normal = rotZ(azimuth) * rotX(elevation) * normal;

        // Stereographic projection -> complex plane
        vec2 z = stereo(normal);

        // Apply the function and color
        vec2 w = f(z);
        vec3 col = complexToColor(w);

        // Diffuse lighting (light follows the camera)
        vec3 lightDir = normalize(vec3(0.0, 1.0, 0.0));
        float diffuse = 0.3 + 0.7 * max(dot(sphereNormal(uv, r), lightDir), 0.0);
        col *= diffuse;

        fragColor = vec4(col, 1.0);
    } else {
        // Background
        fragColor = vec4(BG_COLOR, 1.0);
    }
}
