// =============================================
//  IHP Shader Workshop 2026
//  VECTOR FIELD — ARROW GRID
//
//  Arrows on a grid showing direction and magnitude.
//  Each pixel tests the SDF of its nearest arrow.
//  Arrow length uses a sigmoid to always fit inside cells.
// =============================================

// =============================================
//  YOUR VECTOR FIELD
// =============================================

vec2 V(vec2 p) {
    // Rotation + source: a spiral
    return vec2(-p.y, p.x) + 0.5 * p;

    // Other things to try:
    // return vec2(-p.y, p.x);                      // pure rotation
    // return p;                                      // source at origin
    // return -p;                                     // sink at origin
    // return vec2(p.x, -p.y);                       // saddle
    // return vec2(p.y, -sin(p.x));                  // pendulum phase portrait
    // return vec2(p.x - p.x*p.y, -p.y + p.x*p.y); // Lotka-Volterra
    // return vec2(sin(p.y), sin(p.x));              // doubly periodic
}

// =============================================
//  PARAMETERS
//
//  VIEW_RADIUS — half-width of the visible window
//  GRID_CELLS  — number of cells across the vertical axis
//  ARROW_SCALE — max arrow length as fraction of cell size
//  SHAFT_WIDTH — shaft half-width as fraction of cell size
//  HEAD_LENGTH — arrowhead length as fraction of arrow length
//  HEAD_WIDTH  — arrowhead half-width as fraction of cell size
// =============================================

#define PI 3.14159265359
#define VIEW_RADIUS   5.0
#define GRID_CELLS    20.0
#define ARROW_SCALE   0.8
#define SHAFT_WIDTH   0.04
#define HEAD_LENGTH   0.3
#define HEAD_WIDTH    0.15
const vec3 ARROW_COLOR = vec3(0.1);
const vec3 BG_COLOR    = vec3(0.97);

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

// Signed distance to a line segment from a to b
float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

// Signed distance to a triangle with vertices a, b, c
float sdTriangle(vec2 p, vec2 a, vec2 b, vec2 c) {
    vec2 e0 = b - a, e1 = c - b, e2 = a - c;
    vec2 v0 = p - a, v1 = p - b, v2 = p - c;

    vec2 pq0 = v0 - e0 * clamp(dot(v0, e0) / dot(e0, e0), 0.0, 1.0);
    vec2 pq1 = v1 - e1 * clamp(dot(v1, e1) / dot(e1, e1), 0.0, 1.0);
    vec2 pq2 = v2 - e2 * clamp(dot(v2, e2) / dot(e2, e2), 0.0, 1.0);

    float s = sign(e0.x * e2.y - e0.y * e2.x);
    vec2 d = min(min(
        vec2(dot(pq0, pq0), s * (v0.x * e0.y - v0.y * e0.x)),
        vec2(dot(pq1, pq1), s * (v1.x * e1.y - v1.y * e1.x))),
        vec2(dot(pq2, pq2), s * (v2.x * e2.y - v2.y * e2.x)));

    return -sqrt(d.x) * sign(d.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    uv *= VIEW_RADIUS;

    // Grid cell size and which cell we're in
    float cellSize = VIEW_RADIUS * 2.0 / GRID_CELLS;
    vec2 cellCenter = (floor(uv / cellSize) + 0.5) * cellSize;
    vec2 local = uv - cellCenter; // position relative to cell center

    // Evaluate field at cell center
    vec2 v = V(cellCenter);
    float mag = length(v);

    vec3 col = BG_COLOR;

    if (mag > 1e-6) {
        // Direction and arrow length
        vec2 dir = v / mag;
        vec2 perp = vec2(-dir.y, dir.x);

        // Scale arrow length: sigmoid so it fits in cell
        float arrowLen = ARROW_SCALE * cellSize * mag / (1.0 + mag);

        // Shaft: from center back to tip minus head
        float headLen = HEAD_LENGTH * arrowLen;
        float shaftLen = arrowLen - headLen;

        vec2 tail = -dir * arrowLen * 0.5;
        vec2 shaftEnd = tail + dir * shaftLen;
        vec2 tip = tail + dir * arrowLen;

        // Shaft SDF (thick line segment)
        float shaft = sdSegment(local, tail, shaftEnd) - SHAFT_WIDTH * cellSize;

        // Head SDF (triangle)
        vec2 headBase1 = shaftEnd + perp * HEAD_WIDTH * cellSize;
        vec2 headBase2 = shaftEnd - perp * HEAD_WIDTH * cellSize;
        float head = sdTriangle(local, tip, headBase1, headBase2);

        float arrow = min(shaft, head);

        // Antialiased edge
        float pixelSize = VIEW_RADIUS * 2.0 / iResolution.y;
        float mask = 1.0 - smoothstep(-pixelSize, pixelSize, arrow);

        col = mix(BG_COLOR, ARROW_COLOR, mask);
    }

    // Light grid lines at cell boundaries
    vec2 cellEdge = abs(local) / cellSize;
    float gridLine = 1.0 - smoothstep(0.48, 0.5, max(cellEdge.x, cellEdge.y));
    col *= 0.95 + 0.05 * gridLine;

    fragColor = vec4(col, 1.0);
}
