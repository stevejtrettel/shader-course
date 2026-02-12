// Lighting & Shadows — Point Light
// Single point light, ambient v2 (+AO), gamma

const int MAX_STEPS = 100;
const float MAX_DIST = 100.0;
const float HIT_THRESHOLD = 0.001;

struct Ray {
    vec3 origin;
    vec3 dir;
};

struct PtLight {
    vec3 pos;
    vec3 color;
    float intensity;
};

Ray makeRay(vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    float f = 1.0 / tan(radians(90.0) / 2.0);
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


// --- Scene ---

const float R = 0.5;
const vec3 S1 = vec3( 0.0,   0.5,  0.577);
const vec3 S2 = vec3(-0.5,   0.5, -0.289);
const vec3 S3 = vec3( 0.5,   0.5, -0.289);
const vec3 S4 = vec3( 0.0,   1.317, 0.0);

const vec3 C1 = vec3(0.80, 0.45, 0.30);
const vec3 C2 = vec3(0.50, 0.70, 0.50);
const vec3 C3 = vec3(0.40, 0.55, 0.75);
const vec3 C4 = vec3(0.90, 0.85, 0.75);
const vec3 CG = vec3(0.60, 0.60, 0.55);

float sdScene(vec3 p) {
    float d = length(p - S1) - R;
    d = min(d, length(p - S2) - R);
    d = min(d, length(p - S3) - R);
    d = min(d, length(p - S4) - R);
    d = min(d, p.y);
    return d;
}

vec3 getMaterial(vec3 p) {
    float eps = 0.01;
    if (length(p - S1) - R < eps) return C1;
    if (length(p - S2) - R < eps) return C2;
    if (length(p - S3) - R < eps) return C3;
    if (length(p - S4) - R < eps) return C4;
    return CG;
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

float softShadow(vec3 p, vec3 lightDir, float k, float maxDist) {
    float res = 1.0;
    float t = 0.02;
    float prev = 1e20;
    for (int i = 0; i < 50; i++) {
        float d = sdScene(p + lightDir * t);
        if (d < 0.001) return 0.0;
        float y = d * d / (2.0 * prev);
        float s = sqrt(d * d - y * y);
        res = min(res, k * s / max(0.0, t - y));
        prev = d;
        t += d;
        if (t > maxDist) break;
    }
    return res;
}

float ambientOcclusion(vec3 p, vec3 n) {
    float ao = 0.0;
    float scale = 1.0;
    for (int i = 1; i <= 5; i++) {
        float dist = 0.02 * float(i);
        float d = sdScene(p + n * dist);
        ao += (dist - d) * scale;
        scale *= 0.5;
    }
    return 1.0 - clamp(ao, 0.0, 1.0);
}

vec3 ambient(vec3 p, vec3 n, vec3 mat) {
    float ao = ambientOcclusion(p, n);
    return mat * 0.15 * ao;
}

vec3 shade(vec3 p, vec3 n, vec3 mat, vec3 v, PtLight light) {
    vec3 toLight = light.pos - p;
    float dist = length(toLight);
    vec3 lightDir = toLight / dist;
    float atten = light.intensity / (1.0 + dist * dist);

    float diff = max(0.0, dot(n, lightDir));
    vec3 h = normalize(lightDir + v);
    float spec = pow(max(0.0, dot(n, h)), 32.0);
    float sh = softShadow(p + n * 0.01, lightDir, 16.0, dist);

    return (mat * diff + vec3(0.3) * spec) * light.color * atten * sh;
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 5.0);

    float t = raymarch(ray);

    vec3 color = vec3(0.5, 0.6, 0.7);
    if (t > 0.0) {
        vec3 p = ray.origin + t * ray.dir;
        vec3 normal = calcNormal(p);
        vec3 material = getMaterial(p);
        vec3 viewDir = -ray.dir;

        PtLight warm = PtLight(vec3(1.5, 2.5, 1.0), vec3(1.0, 0.85, 0.7), 8.0);

        color = ambient(p, normal, material);
        color += shade(p, normal, material, viewDir, warm);
    }

    color = pow(color, vec3(1.0 / 2.2));
    fragColor = vec4(color, 1.0);
}
