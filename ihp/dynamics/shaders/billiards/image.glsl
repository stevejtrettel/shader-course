// ╔══════════════════════════════════════════════════════════════════╗
// ║  Polygonal Billiard Trajectories                                ║
// ║                                                                  ║
// ║  HOW TO EDIT: change the table in the section below marked       ║
// ║  "TABLE DEFINITION". Set NUM_VERTS and list vertices CCW.        ║
// ║  Several examples are provided — uncomment the one you want.     ║
// ║                                                                  ║
// ║  Mouse.x → launch angle    Mouse.y → start position on edge 0   ║
// ╚══════════════════════════════════════════════════════════════════╝


// ── rendering settings ──────────────────────────────────────────
#define MAX_BOUNCES    200
#define DRAW_SPEED     0.8
#define LINE_WIDTH     1.8
#define GLOW_WIDTH     12.0
#define SHOW_SCATTERER 0       // 1 = add central circular obstacle
#define SCATTERER_R    0.12


// ═══════════════════════════════════════════════════════════════
//  TABLE DEFINITION — edit here!
//
//  • Set NUM_VERTS to the number of vertices
//  • Define getVertex(int i) returning each vertex CCW
//  • Vertices should be centered roughly around the origin
//  • Scale to fit in roughly [-0.5, 0.5]
//
//  Uncomment ONE of the examples below, or write your own.
// ═══════════════════════════════════════════════════════════════


// ── Example 1: Rectangle (classic billiard table) ───────────────
/*
#define NUM_VERTS 4
vec2 getVertex(int i) {
    vec2 v[4];
    v[0] = vec2(-0.65, -0.38);
    v[1] = vec2( 0.65, -0.38);
    v[2] = vec2( 0.65,  0.38);
    v[3] = vec2(-0.65,  0.38);
    return v[i];
}
*/

// ── Example 2: Equilateral triangle ─────────────────────────────
/*
#define NUM_VERTS 3
vec2 getVertex(int i) {
    float a = float(i) * 6.2832 / 3.0 + 1.5708;
    return 0.42 * vec2(cos(a), sin(a));
}
*/

// ── Example 3: Regular pentagon ─────────────────────────────────

#define NUM_VERTS 5
vec2 getVertex(int i) {
    float a = float(i) * 6.2832 / 5.0 + 1.5708;
    return 0.40 * vec2(cos(a), sin(a));
}


// ── Example 4: Regular hexagon ──────────────────────────────────
/*
#define NUM_VERTS 6
vec2 getVertex(int i) {
    float a = float(i) * 6.2832 / 6.0;
    return 0.40 * vec2(cos(a), sin(a));
}
*/

// ── Example 5: L-shaped room (non-convex) ───────────────────────
/*
#define NUM_VERTS 6
vec2 getVertex(int i) {
    vec2 v[6];
    v[0] = vec2(-0.5, -0.4);
    v[1] = vec2( 0.5, -0.4);
    v[2] = vec2( 0.5,  0.0);
    v[3] = vec2( 0.0,  0.0);
    v[4] = vec2( 0.0,  0.4);
    v[5] = vec2(-0.5,  0.4);
    return v[i];
}
*/

// ── Example 6: Right triangle (rational angles → periodic) ──────
/*
#define NUM_VERTS 3
vec2 getVertex(int i) {
    vec2 v[3];
    v[0] = vec2(-0.45, -0.35);
    v[1] = vec2( 0.45, -0.35);
    v[2] = vec2(-0.45,  0.35);
    return v[i];
}
*/

// ── Example 7: Isosceles triangle (irrational angle → ergodic?) ─
/*
#define NUM_VERTS 3
vec2 getVertex(int i) {
    vec2 v[3];
    v[0] = vec2(-0.40, -0.30);
    v[1] = vec2( 0.40, -0.30);
    v[2] = vec2( 0.00,  0.42);
    return v[i];
}
*/

// ── Example 8: Star-shaped (non-convex!) ────────────────────────
/*
#define NUM_VERTS 10
vec2 getVertex(int i) {
    float a = float(i) * 6.2832 / 10.0 + 1.5708;
    float r = (i / 2 * 2 == i) ? 0.40 : 0.18;
    return r * vec2(cos(a), sin(a));
}
*/


// ═══════════════════════════════════════════════════════════════
//  END TABLE DEFINITION — nothing below here needs editing
// ═══════════════════════════════════════════════════════════════


float segDist(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

float rayEdge(vec2 ro, vec2 rd, vec2 a, vec2 b, out vec2 nrm) {
    vec2 e = b - a;
    float denom = rd.x * e.y - rd.y * e.x;
    if (abs(denom) < 1e-8) return -1.0;
    vec2 d = a - ro;
    float t = (d.x * e.y - d.y * e.x) / denom;
    float s = (d.x * rd.y - d.y * rd.x) / denom;
    if (t > 0.001 && s >= 0.0 && s <= 1.0) {
        nrm = normalize(vec2(e.y, -e.x));
        return t;
    }
    return -1.0;
}

float polyBorderDist(vec2 p) {
    float d = 1e10;
    for (int i = 0; i < NUM_VERTS; i++) {
        int j = (i + 1 < NUM_VERTS) ? i + 1 : 0;
        d = min(d, segDist(p, getVertex(i), getVertex(j)));
    }
    return d;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

    vec2 m = iMouse.xy / iResolution.xy;
    if (iMouse.z < 0.5 && iMouse.x < 1.0) {
        m = vec2(
            0.5 + 0.15 * sin(iTime * 0.17),
            0.55 + 0.12 * cos(iTime * 0.23)
        );
    }

    vec2 v0 = getVertex(0);
    vec2 v1 = getVertex(1);
    vec2 pos = mix(v0 + 0.01 * normalize(v1 - v0),
                   v1 - 0.01 * normalize(v1 - v0), m.y);

    vec2 edgeDir = normalize(v1 - v0);
    vec2 inward  = vec2(edgeDir.y, -edgeDir.x);
    vec2 ctr = vec2(0.0);
    for (int ci = 0; ci < NUM_VERTS; ci++) ctr += getVertex(ci);
    ctr /= float(NUM_VERTS);
    if (dot(inward, ctr - pos) < 0.0) inward = -inward;

    float angle = mix(0.08, 3.14159 - 0.08, m.x);
    vec2 dir = cos(angle) * edgeDir + sin(angle) * inward;

    float minDist  = 1e10;
    float bestT    = 0.0;
    float cumLen   = 0.0;
    float drawLen  = DRAW_SPEED * iTime;

    for (int i = 0; i < MAX_BOUNCES; i++) {
        float tMin = 1e10;
        vec2 hitNrm = vec2(0.0);

        for (int ei = 0; ei < NUM_VERTS; ei++) {
            int ej = (ei + 1 < NUM_VERTS) ? ei + 1 : 0;
            vec2 n;
            float t = rayEdge(pos, dir, getVertex(ei), getVertex(ej), n);
            if (t > 0.0 && t < tMin) {
                tMin = t;
                hitNrm = n;
            }
        }

        #if SHOW_SCATTERER
        {
            float r = SCATTERER_R;
            float B = dot(pos, dir);
            float C = dot(pos, pos) - r * r;
            float disc = B * B - C;
            if (disc > 0.0) {
                float t = -B - sqrt(disc);
                if (t > 0.001 && t < tMin) {
                    tMin = t;
                    hitNrm = normalize(pos + dir * t);
                }
            }
        }
        #endif

        if (tMin > 1e9) break;

        vec2 nextPos = pos + dir * tMin;
        float segLen = length(nextPos - pos);
        float t01    = float(i) / float(MAX_BOUNCES);

        if (cumLen + segLen > drawLen) {
            float frac = (drawLen - cumLen) / segLen;
            vec2 partEnd = mix(pos, nextPos, frac);
            float d = segDist(uv, pos, partEnd);
            if (d < minDist) { minDist = d; bestT = t01; }
            break;
        }

        float d = segDist(uv, pos, nextPos);
        if (d < minDist) { minDist = d; bestT = t01; }
        cumLen += segLen;

        if (dot(hitNrm, dir) > 0.0) hitNrm = -hitNrm;
        dir = dir - 2.0 * dot(dir, hitNrm) * hitNrm;
        pos = nextPos;
    }

    vec3 col = vec3(0.015);
    float bd = polyBorderDist(uv);
    float px = 1.0 / iResolution.y;

    col = mix(col, vec3(0.18), smoothstep(3.0 * px, 0.0, bd));

    for (int i = 0; i < NUM_VERTS; i++) {
        float vd = length(uv - getVertex(i));
        col = mix(col, vec3(0.30), smoothstep(0.010, 0.006, vd));
    }

    #if SHOW_SCATTERER
    {
        float cDist = length(uv) - SCATTERER_R;
        col = mix(col, vec3(0.06), smoothstep(0.0, -0.004, cDist));
        col = mix(col, vec3(0.22), smoothstep(3.0 * px, 0.0, abs(cDist)));
    }
    #endif

    float lw   = LINE_WIDTH * px;
    float glow = GLOW_WIDTH * px;
    float fade = 1.0 - bestT;
    vec3 tCol  = vec3(0.85, 0.92, 1.0) * fade;
    col += tCol * 0.25 * smoothstep(glow, 0.0, minDist);
    col  = mix(col, tCol, smoothstep(lw, 0.0, minDist));

    vec2 startPt = mix(v0 + 0.01 * normalize(v1 - v0),
                       v1 - 0.01 * normalize(v1 - v0), m.y);
    col = mix(col, vec3(1.0), smoothstep(0.010, 0.006, length(uv - startPt)));

    fragColor = vec4(col, 1.0);
}
