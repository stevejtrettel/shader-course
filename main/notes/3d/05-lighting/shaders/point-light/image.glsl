const int MAX_STEPS = 100;
const float MAX_DIST = 50.0;
const float HIT_THRESHOLD = 0.001;

struct Ray { vec3 origin; vec3 dir; };

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

mat3 rotateX(float a) { float c = cos(a), s = sin(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }
mat3 rotateY(float a) { float c = cos(a), s = sin(a); return mat3(c,0,s, 0,1,0, -s,0,c); }

Ray orbitRay(Ray ray, float distance) {
    vec2 mouse = iMouse.xy / iResolution.xy;
    if (length(iMouse.xy) < 1.0) mouse = vec2(0.55, 0.4);
    float angleY = (mouse.x - 0.5) * 6.28;
    float angleX = (0.5 - mouse.y) * 3.14;
    mat3 rot = rotateX(angleX) * rotateY(angleY);
    ray.origin = rot * vec3(0.0, 0.0, distance);
    ray.dir = rot * ray.dir;
    return ray;
}

float sdScene(vec3 p) {
    float d = p.y;
    d = min(d, length(p - vec3(-1.2, 0.5, 0.0)) - 0.5);
    d = min(d, length(p - vec3( 0.0, 0.35, 0.5)) - 0.35);
    d = min(d, length(p - vec3( 1.1, 0.8, -0.3)) - 0.8);
    return d;
}

vec3 getMaterial(vec3 p) {
    float eps = 0.01;
    if (length(p - vec3(-1.2, 0.5, 0.0)) - 0.5 < eps)   return vec3(0.8, 0.35, 0.25);
    if (length(p - vec3( 0.0, 0.35, 0.5)) - 0.35 < eps)  return vec3(0.4, 0.5, 0.65);
    if (length(p - vec3( 1.1, 0.8, -0.3)) - 0.8 < eps)   return vec3(0.9, 0.85, 0.78);
    return vec3(0.5, 0.45, 0.4);
}

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

vec3 shade(vec3 p, vec3 n, vec3 mat, PtLight light) {
    vec3 toLight = light.pos - p;
    float dist = length(toLight);
    vec3 lightDir = toLight / dist;
    float atten = light.intensity / (1.0 + dist * dist);

    float diff = max(0.0, dot(n, lightDir));
    float sh = softShadow(p + n * 0.01, lightDir, 16.0, dist);

    return mat * diff * light.color * atten * sh;
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 6.0);

    float t = raymarch(ray);

    vec3 color = vec3(0.5, 0.6, 0.7);
    if (t > 0.0) {
        vec3 p = ray.origin + t * ray.dir;
        vec3 normal = calcNormal(p);
        vec3 material = getMaterial(p);

        PtLight warm = PtLight(vec3(1.5, 2.5, 1.0), vec3(1.0, 0.85, 0.7), 8.0);

        color = ambient(p, normal, material);
        color += shade(p, normal, material, warm);
    }

    color = pow(color, vec3(1.0 / 2.2));
    fragColor = vec4(color, 1.0);
}
