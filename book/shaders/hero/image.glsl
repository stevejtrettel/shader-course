// The cover: an Apollonian packing, raymarched, arriving out of its own
// pixels. The image is computed at full precision from the first frame —
// what changes is the size of the sample grid, which starts at 64 screen
// pixels and shrinks to one, so the picture resolves rather than fades in.
// Colour quantization eases out on the same schedule, so the opening frames
// read as a handful of flat blocks and the last as continuous tone.
//
// It loops: resolve, hold, coarsen again, and away. The camera never stops
// or jumps, so the cycle has no seam — only the sampling breathes.

const float T_RESOLVE = 5.0;   // coarse → sharp
const float T_HOLD    = 7.0;   // sharp, while the camera drifts
const float T_COARSEN = 3.0;   // sharp → coarse
const float T_BLOCKS  = 1.2;   // held coarse, long enough to read as blocks
const float COARSEST  = 72.0;  // screen pixels per fake pixel at the coarsest

// --- the fractal -----------------------------------------------------------
// Kaleidoscopic inversion: fold into the unit cell, invert about the origin,
// repeat. The running scale factor turns the folded distance back into a
// distance estimate in the original space. `orbit` records how close the
// point came to each axis, which is what the colour is read from.

float apollonian(vec3 p, out vec4 orbit) {
    float scale = 1.0;
    orbit = vec4(1e4);
    for (int i = 0; i < 8; i++) {
        p = -1.0 + 2.0 * fract(0.5 * p + 0.5);
        float r2 = dot(p, p);
        orbit = min(orbit, vec4(abs(p), r2));
        float k = 1.15 / r2;
        p *= k;
        scale *= k;
    }
    return 0.25 * abs(p.y) / scale;
}

float map(vec3 p) {
    vec4 orbit;
    return apollonian(p, orbit);
}

vec3 normalAt(vec3 p) {
    vec2 e = vec2(1.0, -1.0) * 0.0008;
    return normalize(
        e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx)
    );
}

// Cheap ambient occlusion: how much shorter the distance field is than the
// free-space distance, sampled a few steps along the normal.
float occlusion(vec3 p, vec3 n) {
    float occ = 0.0, w = 1.0;
    for (int i = 1; i <= 5; i++) {
        float h = 0.012 * float(i) * float(i);
        occ += (h - map(p + n * h)) * w;
        w *= 0.72;
    }
    return clamp(1.0 - 12.0 * occ, 0.0, 1.0);
}

float shadow(vec3 p, vec3 l) {
    float res = 1.0, t = 0.015;
    for (int i = 0; i < 40; i++) {
        float h = map(p + l * t);
        res = min(res, 14.0 * h / t);
        t += clamp(h, 0.004, 0.05);
        if (res < 0.002 || t > 1.6) break;
    }
    return clamp(res, 0.0, 1.0);
}

// --- shading ---------------------------------------------------------------

// A ramp rather than a cosine cycle: cycling hues gives the rainbow every
// Apollonian on the internet already wears. This runs deep blue → slate →
// gold → cream, which are the book's own accent and definition colours, and
// never leaves that line.
vec3 palette(float t) {
    t = clamp(t, 0.0, 1.0);
    vec3 c = mix(vec3(0.050, 0.078, 0.155), vec3(0.24, 0.31, 0.48), smoothstep(0.00, 0.34, t));
    c = mix(c, vec3(0.86, 0.65, 0.27), smoothstep(0.30, 0.74, t));
    c = mix(c, vec3(0.97, 0.93, 0.82), smoothstep(0.84, 1.00, t));
    return c;
}

vec3 render(vec2 uv, float time) {
    // A slow drift, so the resolved image is alive without asking to be
    // watched. The camera orbits; the fractal itself never moves.
    float a = 0.18 * time;
    vec3 ro = vec3(1.16 * cos(a), 0.50 + 0.09 * sin(0.7 * a), 1.16 * sin(a));
    vec3 ta = vec3(0.0, 0.26, 0.0);

    vec3 fw = normalize(ta - ro);
    vec3 rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
    vec3 up = cross(fw, rt);
    vec3 rd = normalize(uv.x * rt + uv.y * up + 1.85 * fw);

    // March. The step is clamped because an Apollonian estimate is generous
    // near the tangency points and will happily step through a sphere.
    float t = 0.05;
    bool hit = false;
    for (int i = 0; i < 120; i++) {
        float h = map(ro + rd * t);
        if (h < 0.0009 * t) { hit = true; break; }
        t += min(h, 0.03);
        if (t > 4.5) break;
    }

    vec3 sky = mix(vec3(0.045, 0.05, 0.075), vec3(0.10, 0.11, 0.15), 0.5 + 0.5 * rd.y);
    if (!hit) return sky;

    vec3 p = ro + rd * t;
    vec3 n = normalAt(p);
    vec4 orbit;
    apollonian(p, orbit);

    // The orbit trap is compressed hard: raw, almost everything lands in the
    // first tenth of the ramp and the picture is one colour.
    float trap = pow(clamp(1.18 * orbit.w + 0.30 * orbit.y, 0.0, 1.0), 0.50);
    vec3 base = palette(trap);

    vec3 key = normalize(vec3(0.7, 0.85, -0.45));
    float dif = clamp(dot(n, key), 0.0, 1.0) * shadow(p, key);
    float fil = clamp(0.4 + 0.6 * dot(n, vec3(-0.6, 0.3, 0.6)), 0.0, 1.0);
    float occ = occlusion(p, n);
    float fre = pow(clamp(1.0 + dot(rd, n), 0.0, 1.0), 4.0);

    // Warm key, cool fill and rim — the one place the two hues meet.
    vec3 col = base * (0.20 * fil * occ) * vec3(0.72, 0.80, 1.0)
             + base * dif * vec3(1.18, 1.04, 0.84)
             + vec3(0.38, 0.52, 0.78) * fre * occ * 0.42;

    // A specular the gold can catch, then distance haze into the sky.
    vec3 h = normalize(key - rd);
    col += vec3(1.0, 0.93, 0.8) * pow(clamp(dot(n, h), 0.0, 1.0), 42.0) * dif * 0.7;
    col = mix(col, sky, 1.0 - exp(-0.16 * t * t));
    return col;
}

// --- the reveal ------------------------------------------------------------

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // k: 0 at the coarsest, 1 at full resolution.
    float cycle = T_RESOLVE + T_HOLD + T_COARSEN + T_BLOCKS;
    float u = mod(iTime, cycle);
    float k;
    if (u < T_RESOLVE)                     k = u / T_RESOLVE;
    else if (u < T_RESOLVE + T_HOLD)       k = 1.0;
    else if (u < T_RESOLVE + T_HOLD + T_COARSEN)
        k = 1.0 - (u - T_RESOLVE - T_HOLD) / T_COARSEN;
    else                                   k = 0.0;
    k = k * k * (3.0 - 2.0 * k);                 // ease in and out

    // Halving, not sliding: the grid steps 64 → 32 → 16 … so each stage is a
    // clean subdivision of the last, the way a progressive image loads.
    float steps = log2(COARSEST);
    float px = max(1.0, exp2(floor(mix(steps, 0.0, k) * 1.0)));

    // Sample at the centre of each cell, so a block is the colour of its
    // middle rather than of its corner.
    vec2 cell = (floor(fragCoord / px) + 0.5) * px;
    vec2 uv = (2.0 * cell - iResolution.xy) / iResolution.y;

    vec3 col = render(uv, iTime);

    // Tone first, then posterize — quantizing linear values crushes the
    // shadows and the early frames go muddy.
    col = pow(clamp(col, 0.0, 1.0), vec3(0.4545));
    // Few enough to read as posterized, many enough to stay on the palette:
    // at five levels per channel the rounding invents hues (pinks, purples)
    // that appear nowhere in the resolved image.
    float levels = mix(12.0, 255.0, k * k);
    col = floor(col * levels + 0.5) / levels;

    fragColor = vec4(col, 1.0);
}
