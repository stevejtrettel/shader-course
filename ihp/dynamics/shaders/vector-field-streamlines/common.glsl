#define ASP (iResolution.x / iResolution.y)
#define PI 3.14159265359
#define VEL_FACTOR 0.008
#define NUMBER     400
#define MIX_FACTOR 0.99
#define SIZE       0.007
#define VIEW_RADIUS 5.0

vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy) * 2.0 - 1.0;
}

// =============================================
// EDIT HERE: Define your vector field V(x, y)
// =============================================

vec2 V(vec2 p) {
    return vec2(-p.y, p.x) + 0.5 * p;

    // return vec2(-p.y, p.x);                      // pure rotation
    // return p;                                      // source
    // return vec2(p.x, -p.y);                       // saddle
    // return vec2(p.y, -sin(p.x));                  // pendulum
    // return vec2(sin(p.y), sin(p.x));              // doubly periodic
}
