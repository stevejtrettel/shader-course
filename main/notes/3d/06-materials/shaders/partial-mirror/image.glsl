const int MAX_STEPS = 100;
const float MAX_DIST = 50.0;
const float HIT_THRESHOLD = 0.001;

struct Ray { vec3 origin; vec3 dir; };
struct DirLight { vec3 dir; vec3 color; };

struct Material {
    vec3 albedo;
    float reflectivity;
};

Ray makeRay(vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    float f = 1.0 / tan(radians(90.0) / 2.0);
    return Ray(vec3(0.0), normalize(vec3(uv, -f)));
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


// --- Scene: four spheres with varying reflectivity on checkerboard ---

const vec3 P0 = vec3(-2.0, 0.7, 0.0);
const vec3 P1 = vec3(-0.6, 0.7, 0.0);
const vec3 P2 = vec3( 0.8, 0.7, 0.0);
const vec3 P3 = vec3( 2.2, 0.7, 0.0);

float sdScene(vec3 p) {
    float d = p.y;
    d = min(d, length(p - P0) - 0.7);
    d = min(d, length(p - P1) - 0.7);
    d = min(d, length(p - P2) - 0.7);
    d = min(d, length(p - P3) - 0.7);
    return d;
}

float checkerboard(vec3 p) {
    vec2 q = floor(p.xz);
    return mod(q.x + q.y, 2.0);
}

Material getMaterial(vec3 p) {
    float eps = 0.01;
    if (length(p - P0) - 0.7 < eps)
        return Material(vec3(0.80, 0.45, 0.30), 0.0);   // matte
    if (length(p - P1) - 0.7 < eps)
        return Material(vec3(0.50, 0.70, 0.50), 0.15);  // subtle sheen
    if (length(p - P2) - 0.7 < eps)
        return Material(vec3(0.40, 0.55, 0.75), 0.5);   // polished
    if (length(p - P3) - 0.7 < eps)
        return Material(vec3(0.90, 0.85, 0.75), 1.0);   // mirror
    float check = checkerboard(p);
    vec3 col = mix(vec3(0.4, 0.38, 0.35), vec3(0.65, 0.62, 0.58), check);
    return Material(col, 0.0);
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
        float d = sdScene(ray.origin + t * ray.dir);
        if (d < HIT_THRESHOLD) return t;
        t += d;
        if (t > MAX_DIST) return -1.0;
    }
    return -1.0;
}


// --- Lighting ---

float softShadow(vec3 p, vec3 lightDir, float k) {
    float res = 1.0;
    float t = 0.02;
    float prev = 1e20;
    for (int i = 0; i < 50; i++) {
        float d = sdScene(p + lightDir * t);
        if (d < 0.001) return 0.0;
        float y = d * d / (2.0 * prev);
        float x = sqrt(d * d - y * y);
        res = min(res, k * x / max(0.0, t - y));
        prev = d;
        t += d;
        if (t > 20.0) break;
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

vec3 shade(vec3 p, vec3 n, vec3 albedo, DirLight light) {
    float diff = max(0.0, dot(n, light.dir));
    float sh = softShadow(p + n * 0.01, light.dir, 16.0);
    return albedo * diff * light.color * sh;
}

vec3 shadeDiffuse(vec3 p, vec3 n, vec3 albedo, DirLight key, DirLight fill) {
    float ao = ambientOcclusion(p, n);
    vec3 color = albedo * 0.15 * ao;
    color += shade(p, n, albedo, key);
    color += shade(p, n, albedo, fill);
    return color;
}

vec3 shadeReflected(vec3 p, vec3 n, vec3 viewDir, DirLight key, DirLight fill) {
    vec3 reflDir = reflect(-viewDir, n);
    Ray reflRay = Ray(p + n * 0.02, reflDir);
    float t = raymarch(reflRay);

    if (t > 0.0) {
        vec3 rp = reflRay.origin + t * reflRay.dir;
        vec3 rn = calcNormal(rp);
        Material rmat = getMaterial(rp);
        return shadeDiffuse(rp, rn, rmat.albedo, key, fill);
    }
    return vec3(0.5, 0.6, 0.7);
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 8.0);

    DirLight key = DirLight(normalize(vec3(1.0, 1.0, 1.0)), vec3(1.0, 0.9, 0.8));
    DirLight fill = DirLight(normalize(vec3(-1.0, 0.3, 0.0)), vec3(0.15, 0.2, 0.3));

    float t = raymarch(ray);

    vec3 color = vec3(0.5, 0.6, 0.7);
    if (t > 0.0) {
        vec3 p = ray.origin + t * ray.dir;
        vec3 n = calcNormal(p);
        vec3 viewDir = -ray.dir;
        Material mat = getMaterial(p);

        vec3 diffuse = shadeDiffuse(p, n, mat.albedo, key, fill);
        vec3 refl = shadeReflected(p, n, viewDir, key, fill);
        color = mix(diffuse, refl, mat.reflectivity);
    }

    color = color / (1.0 + color);
    color = pow(color, vec3(1.0 / 2.2));
    fragColor = vec4(color, 1.0);
}
