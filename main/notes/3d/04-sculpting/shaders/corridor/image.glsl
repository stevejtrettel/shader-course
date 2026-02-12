const int MAX_STEPS = 150;
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

// --- Primitives ---

float sdCylinder(vec3 p, float r, float h) {
    vec2 d = vec2(length(p.xz) - r, abs(p.y) - h);
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

// --- Scene ---

float sdScene(vec3 p) {
    float T = 4.0;

    // Repeat in z for column rows
    vec3 q = p;
    q.z = mod(q.z + 0.5 * T, T) - 0.5 * T;

    // Two rows of columns along the corridor
    float col1 = sdCylinder(q - vec3( 1.5, 0.0, 0.0), 0.3, 3.0);
    float col2 = sdCylinder(q - vec3(-1.5, 0.0, 0.0), 0.3, 3.0);

    float floor = p.y + 3.0;
    float ceiling = -(p.y - 3.0);
    float leftWall = -(p.x + 2.5);
    float rightWall = p.x - 2.5;

    float scene = min(col1, col2);
    scene = min(scene, floor);
    scene = min(scene, ceiling);
    scene = min(scene, leftWall);
    scene = min(scene, rightWall);

    return scene;
}

vec3 getMaterial(vec3 p) {
    float T = 4.0;
    vec3 q = p;
    q.z = mod(q.z + 0.5 * T, T) - 0.5 * T;

    float col1 = sdCylinder(q - vec3( 1.5, 0.0, 0.0), 0.3, 3.0);
    float col2 = sdCylinder(q - vec3(-1.5, 0.0, 0.0), 0.3, 3.0);

    if (min(col1, col2) < 0.01) return vec3(0.8, 0.75, 0.65);
    if (p.y + 3.0 < 0.01) return vec3(0.4, 0.35, 0.3);
    if (-(p.y - 3.0) < 0.01) return vec3(0.5, 0.45, 0.4);

    return vec3(0.6, 0.55, 0.5);
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

    // Fly forward through the corridor
    ray.origin = vec3(0.0, 0.0, -iTime * 2.0);

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
