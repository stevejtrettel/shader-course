const int MAX_STEPS = 100;
const float MAX_DIST = 100.0;
const float HIT_THRESHOLD = 0.001;
const float STEP_SCALE = 0.5;

struct Ray {
    vec3 origin;
    vec3 dir;
};

Ray makeRay(vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float fov = 90.0;
    float f = 1.0 / tan(radians(fov) / 2.0);

    Ray ray;
    ray.origin = vec3(0.0);
    ray.dir = normalize(vec3(uv, -f));
    return ray;
}

mat3 rotateX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1, 0, 0, 0, c, -s, 0, s, c);
}

mat3 rotateY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, 0, s, 0, 1, 0, -s, 0, c);
}

Ray orbitRay(Ray ray, float distance) {
    vec2 mouse = iMouse.xy / iResolution.xy;
    if (length(iMouse.xy) < 1.0) mouse = vec2(0.6, 0.55);

    float angleY = (mouse.x - 0.5) * 6.28;
    float angleX = (0.5 - mouse.y) * 3.14;

    mat3 rot = rotateX(angleX) * rotateY(angleY);
    ray.origin = rot * vec3(0.0, 0.0, distance);
    ray.dir = rot * ray.dir;
    return ray;
}

// --- Primitives ---

float sdCylinder(vec3 p, float r, float h) {
    vec2 d = vec2(length(p.xz) - r, abs(p.y) - h);
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdTorus(vec3 p, float R, float r) {
    vec2 q = vec2(length(p.xz) - R, p.y);
    return length(q) - r;
}

float sdBox(vec3 p, vec3 halfSize) {
    vec3 d = abs(p) - halfSize;
    return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}

float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

// --- Compound shapes ---

float mugBody(vec3 p) {
    float outer = sdCylinder(p, 0.5, 0.5);
    float inner = sdCylinder(p - vec3(0, 0.05, 0), 0.45, 0.5);
    return max(outer, -inner);
}

float mugHandle(vec3 p) {
    vec3 hp = p - vec3(0.5, 0.0, 0.0);
    hp = hp.xzy;
    float torus = sdTorus(hp, 0.3, 0.07);
    float d = max(torus, hp.y - 0.2);
    d = max(d, -hp.x);
    return d;
}

float sdMug(vec3 p) {
    return smin(mugBody(p), mugHandle(p), 0.08);
}

// Unified dish: saucer and plate are the same shape at different scales
float sdDish(vec3 p, float radius, float rimInner) {
    float base = sdCylinder(p, radius, 0.04);
    float ring = sdCylinder(p - vec3(0, 0.01, 0), radius, 0.03);
    float hole = sdCylinder(p - vec3(0, 0.01, 0), rimInner, 0.1);
    float rim = max(ring, -hole);
    return smin(base, rim, 0.06);
}

float sdDonut(vec3 p) {
    return sdTorus(p, 0.35, 0.15);
}

float sdIcing(vec3 p) {
    float icing = sdTorus(p, 0.35, 0.17);
    icing = max(icing, -p.y - 0.02);
    icing += 0.008 * sin(40.0 * p.x) * sin(40.0 * p.y) * sin(40.0 * p.z);
    return icing;
}

float sdTable(vec3 p) {
    float top = sdBox(p, vec3(2.5, 0.06, 1.5));

    vec3 lp = p;
    lp.xz = abs(lp.xz);
    lp -= vec3(2.3, -0.56, 1.3);
    float legs = sdBox(lp, vec3(0.08, 0.5, 0.08));

    return smin(top, legs, 0.04);
}

// --- Objects ---

struct Mug    { vec3 center; vec3 color; };
struct Dish   { vec3 center; float radius; float rimInner; vec3 color; };
struct Donut  { vec3 center; vec3 color; };
struct Icing  { vec3 center; vec3 color; };
struct Table  { vec3 center; vec3 color; };

float sdf(vec3 p, Mug m)   { return sdMug(p - m.center); }
float sdf(vec3 p, Dish d)  { return sdDish(p - d.center, d.radius, d.rimInner); }
float sdf(vec3 p, Donut d) { return sdDonut(p - d.center); }
float sdf(vec3 p, Icing i) { return sdIcing(p - i.center); }
float sdf(vec3 p, Table t) { return sdTable(p - t.center); }

// --- Scene layout ---

Mug   cup     = Mug(vec3(-0.8, 0.56, 0.0), vec3(0.85, 0.82, 0.78));
Dish  saucer  = Dish(vec3(-0.8, 0.0, 0.0), 0.7, 0.55, vec3(0.85, 0.82, 0.78));
Dish  plate   = Dish(vec3(1.2, 0.0, 0.0), 1.0, 0.8, vec3(0.9, 0.88, 0.84));
Donut donut   = Donut(vec3(1.2, 0.2, 0.0), vec3(0.76, 0.6, 0.42));
Icing icing   = Icing(vec3(1.2, 0.2, 0.0), vec3(0.9, 0.5, 0.6));
Table table   = Table(vec3(0.2, -0.06, 0.0), vec3(0.45, 0.3, 0.2));

float sdScene(vec3 p) {
    float d = sdf(p, cup);
    d = min(d, sdf(p, saucer));
    d = min(d, sdf(p, plate));
    d = min(d, sdf(p, donut));
    d = min(d, sdf(p, icing));
    d = min(d, sdf(p, table));
    return d;
}

vec3 getMaterial(vec3 p) {
    float eps = 0.01;

    if (sdf(p, cup)    < eps) return cup.color;
    // Icing before donut — at the icing surface we're inside the donut
    if (sdf(p, icing)  < eps) return icing.color;
    if (sdf(p, donut)  < eps) return donut.color;
    if (sdf(p, saucer) < eps) return saucer.color;
    if (sdf(p, plate)  < eps) return plate.color;
    if (sdf(p, table)  < eps) return table.color;

    return vec3(1.0, 0.0, 1.0);
}

// --- Raymarching ---

vec3 calcNormal(vec3 p) {
    float eps = 0.001;
    return normalize(vec3(
        sdScene(p + vec3(eps, 0, 0)) - sdScene(p - vec3(eps, 0, 0)),
        sdScene(p + vec3(0, eps, 0)) - sdScene(p - vec3(0, eps, 0)),
        sdScene(p + vec3(0, 0, eps)) - sdScene(p - vec3(0, 0, eps))
    ));
}

float raymarch(Ray ray) {
    float t = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ray.origin + t * ray.dir;
        float d = sdScene(p);

        if (d < HIT_THRESHOLD) return t;

        t += d * STEP_SCALE;

        if (t > MAX_DIST) return -1.0;
    }

    return -1.0;
}

// --- Shading ---

vec3 shadeDiffuse(vec3 normal, vec3 albedo) {
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float brightness = max(0.0, dot(normal, lightDir));
    return albedo * (0.15 + 0.85 * brightness);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 8.0);

    float t = raymarch(ray);

    vec3 color = vec3(0.1, 0.1, 0.2);
    if (t > 0.0) {
        vec3 p = ray.origin + t * ray.dir;
        vec3 normal = calcNormal(p);
        vec3 material = getMaterial(p);
        color = shadeDiffuse(normal, material);
    }

    fragColor = vec4(color, 1.0);
}
