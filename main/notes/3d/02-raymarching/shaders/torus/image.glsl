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

float sdTorus(vec3 p, float majorRadius, float minorRadius) {
    vec2 q = vec2(length(p.xz) - majorRadius, p.y);
    return length(q) - minorRadius;
}

// --- Scene ---

float sdScene(vec3 p) {
    return sdTorus(p, 1.0, 0.4);
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

vec3 shadeNormal(vec3 normal) {
    return normal * 0.5 + 0.5;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 5.0);

    float t = raymarch(ray);

    vec3 color = vec3(0.1, 0.1, 0.2);
    if (t > 0.0) {
        vec3 p = ray.origin + t * ray.dir;
        vec3 normal = calcNormal(p);
        color = shadeNormal(normal);
    }

    fragColor = vec4(color, 1.0);
}
