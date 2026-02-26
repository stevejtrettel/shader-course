const float PI = 3.14159265;
const int MAX_STEPS = 100;
const float MAX_DIST = 50.0;
const float HIT_THRESHOLD = 0.001;

struct Ray { vec3 origin; vec3 dir; };
struct DirLight { vec3 dir; vec3 color; };

struct Material {
    vec3 albedo;
    float shininess;
    float metallic;
};

Ray makeRay(vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    float f = 1.0 / tan(radians(40.0) / 2.0);
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


// --- Scene: 6 spheres in a row on checkerboard ---

const float SR = 0.7;
const vec3 P0 = vec3(-3.5, 0.7, 0.0);  // terra cotta
const vec3 P1 = vec3(-2.1, 0.7, 0.0);  // red plastic
const vec3 P2 = vec3(-0.7, 0.7, 0.0);  // ceramic
const vec3 P3 = vec3( 0.7, 0.7, 0.0);  // copper
const vec3 P4 = vec3( 2.1, 0.7, 0.0);  // gold
const vec3 P5 = vec3( 3.5, 0.7, 0.0);  // chrome

float sdScene(vec3 p) {
    float d = p.y;
    d = min(d, length(p - P0) - SR);
    d = min(d, length(p - P1) - SR);
    d = min(d, length(p - P2) - SR);
    d = min(d, length(p - P3) - SR);
    d = min(d, length(p - P4) - SR);
    d = min(d, length(p - P5) - SR);
    return d;
}

float checkerboard(vec3 p) {
    vec2 q = floor(p.xz);
    return mod(q.x + q.y, 2.0);
}

Material getMaterial(vec3 p) {
    float eps = 0.01;

    if (length(p - P0) - SR < eps)
        return Material(vec3(0.72, 0.36, 0.24), 8.0, 0.0);
    if (length(p - P1) - SR < eps)
        return Material(vec3(0.80, 0.08, 0.05), 64.0, 0.0);
    if (length(p - P2) - SR < eps)
        return Material(vec3(0.92, 0.89, 0.82), 256.0, 0.0);

    if (length(p - P3) - SR < eps)
        return Material(vec3(0.95, 0.64, 0.54), 64.0, 1.0);   // copper
    if (length(p - P4) - SR < eps)
        return Material(vec3(1.0, 0.71, 0.29), 256.0, 1.0);   // gold
    if (length(p - P5) - SR < eps)
        return Material(vec3(0.95, 0.93, 0.88), 512.0, 1.0);  // chrome

    float check = checkerboard(p);
    vec3 col = mix(vec3(0.4, 0.38, 0.35), vec3(0.65, 0.62, 0.58), check);
    return Material(col, 4.0, 0.0);
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
    for (int i = 0; i < 50; i++) {
        float d = sdScene(p + lightDir * t);
        if (d < 0.001) return 0.0;
        res = min(res, k * d / t);
        t += d;
        if (t > 20.0) break;
    }
    return clamp(res, 0.0, 1.0);
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

vec3 fresnelSchlick(float cosTheta, vec3 f0) {
    return f0 + (1.0 - f0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

vec3 skyColor(vec3 dir) {
    float t = 0.5 + 0.5 * dir.y;
    return mix(vec3(0.68, 0.63, 0.58), vec3(0.25, 0.4, 0.7), clamp(t * t, 0.0, 1.0));
}

vec3 ambient(vec3 p, vec3 n, Material mat) {
    float ao = ambientOcclusion(p, n);
    vec3 diffAlbedo = mat.albedo * (1.0 - mat.metallic);
    return diffAlbedo * 0.15 * ao;
}

vec3 shadeDirect(vec3 p, vec3 n, Material mat, vec3 V, DirLight light) {
    vec3 L = light.dir;
    float NdotL = max(0.0, dot(n, L));
    if (NdotL <= 0.0) return vec3(0.0);

    vec3 diffColor = mat.albedo * (1.0 - mat.metallic);
    vec3 specColor = mix(vec3(0.04), mat.albedo, mat.metallic);

    vec3 reflDir = reflect(-L, n);
    float RdotV = max(0.0, dot(reflDir, V));

    vec3 Fi = fresnelSchlick(NdotL, specColor);
    vec3 Fr = fresnelSchlick(RdotV, specColor);
    float normFactor = (mat.shininess + 2.0) / (2.0 * PI);
    float spec = normFactor * pow(RdotV, mat.shininess);

    vec3 diffuse = (vec3(1.0) - Fi) * diffColor / PI;
    vec3 specular = Fr * spec;

    float sh = softShadow(p + n * 0.01, L, 16.0);
    return (diffuse + specular) * light.color * NdotL * sh;
}

vec3 shadePoint(vec3 p, vec3 n, Material mat, vec3 V, DirLight l1, DirLight l2) {
    vec3 color = ambient(p, n, mat);
    color += shadeDirect(p, n, mat, V, l1);
    color += shadeDirect(p, n, mat, V, l2);
    return color;
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 10.0);

    DirLight key = DirLight(normalize(vec3(1.0, 1.0, 1.0)), vec3(1.0, 0.9, 0.8));
    DirLight fill = DirLight(normalize(vec3(-1.0, 0.3, 0.0)), vec3(0.15, 0.2, 0.3));

    float t = raymarch(ray);
    vec3 color;

    if (t < 0.0) {
        color = skyColor(ray.dir);
    } else {
        vec3 p = ray.origin + t * ray.dir;
        vec3 n = calcNormal(p);
        Material mat = getMaterial(p);
        vec3 V = -ray.dir;
        float NdotV = max(0.001, dot(n, V));

        vec3 f0 = mix(vec3(0.04), mat.albedo, mat.metallic);
        vec3 Fenv = fresnelSchlick(NdotV, f0);

        vec3 directColor = shadePoint(p, n, mat, V, key, fill);

        // Single-bounce reflection
        vec3 reflDir = reflect(-V, n);
        Ray reflRay = Ray(p + n * 0.02, reflDir);
        float rt = raymarch(reflRay);

        vec3 reflColor;
        if (rt < 0.0) {
            reflColor = skyColor(reflDir);
        } else {
            vec3 rp = reflRay.origin + rt * reflRay.dir;
            vec3 rn = calcNormal(rp);
            Material rmat = getMaterial(rp);
            vec3 rv = -reflDir;
            reflColor = shadePoint(rp, rn, rmat, rv, key, fill);
        }

        color = directColor + Fenv * reflColor;

        // Roughness fade (metals always reflect)
        float clarity = clamp((mat.shininess - 16.0) / 112.0, 0.0, 1.0);
        clarity = max(clarity, mat.metallic);
        color = mix(directColor, color, clarity);
    }

    color = color / (1.0 + color);
    color = pow(color, vec3(1.0 / 2.2));
    fragColor = vec4(color, 1.0);
}
