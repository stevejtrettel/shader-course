const int MAX_STEPS = 100;
const float MAX_DIST = 100.0;
const float HIT_THRESHOLD = 0.001;

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

#define PHI (0.5 + 0.5 * sqrt(5.0))

float sdIcosahedron(vec3 p, float r) {
    p = abs(p);
    float invPHI = PHI - 1.0;

    float d = p.x + p.y + p.z;
    d = max(d, p.y * invPHI + p.z * PHI);
    d = max(d, p.x * invPHI + p.y * PHI);
    d = max(d, p.x * PHI + p.z * invPHI);

    return d * 0.57735027 - r;
}

float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

// --- Mug ---

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

// --- Objects ---

struct Mug {
    vec3 center;
    vec3 color;
};

struct Icosahedron {
    vec3 center;
    float size;
    vec3 color;
};

float sdf(vec3 p, Mug m) {
    return sdMug(p - m.center);
}

float sdf(vec3 p, Icosahedron ico) {
    return sdIcosahedron(p - ico.center, ico.size);
}

// --- Scene ---

Mug cup = Mug(vec3(-1.0, -0.3, 0.0), vec3(0.85, 0.82, 0.78));
Icosahedron gem = Icosahedron(vec3(1.2, 0.0, 0.0), 0.7, vec3(0.9, 0.3, 0.2));

float sdScene(vec3 p) {
    float d = sdf(p, cup);
    d = min(d, sdf(p, gem));
    d = min(d, p.y + 0.8);
    return d;
}

vec3 getMaterial(vec3 p) {
    float eps = 0.01;

    if (sdf(p, cup) < eps) return cup.color;
    if (sdf(p, gem) < eps) return gem.color;
    if (p.y + 0.8 < eps) return vec3(0.35, 0.3, 0.3);

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

        t += d;

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
    ray = orbitRay(ray, 6.0);

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
