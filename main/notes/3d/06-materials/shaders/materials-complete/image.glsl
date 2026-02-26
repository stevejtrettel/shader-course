const float PI = 3.14159265;
const int MAX_STEPS = 150;
const float MAX_DIST = 80.0;
const float HIT_THRESHOLD = 0.001;

struct Ray { vec3 origin; vec3 dir; };
struct DirLight { vec3 dir; vec3 color; };

struct Material {
    vec3 albedo;
    float shininess;
    float metallic;
    float clearcoat;
};

Ray makeRay(vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    float f = 1.0 / tan(radians(50.0) / 2.0);
    return Ray(vec3(0.0), normalize(vec3(uv, -f)));
}

mat3 rotateX(float a) { float c = cos(a), s = sin(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }
mat3 rotateY(float a) { float c = cos(a), s = sin(a); return mat3(c,0,s, 0,1,0, -s,0,c); }

Ray orbitRay(Ray ray, float dist) {
    vec2 m = iMouse.xy / iResolution.xy;
    if (length(iMouse.xy) < 1.0) m = vec2(0.55, 0.45);
    float ay = (m.x - 0.5) * 6.28;
    float ax = (0.5 - m.y) * 3.14 * 0.5;
    ax = clamp(ax, -0.2, 1.2);
    mat3 rot = rotateX(ax) * rotateY(ay);
    ray.origin = rot * vec3(0.0, 0.0, dist);
    ray.dir = rot * ray.dir;
    ray.origin.y += 2.0;
    return ray;
}


// --- SDF ---

float sdBox(vec3 p, vec3 b) {
    vec3 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}

const float SR = 0.9;

// Back row: dielectrics
const vec3 P0 = vec3(-3.0, 0.9, -3.5);
const vec3 P1 = vec3( 0.0, 0.9, -3.5);
const vec3 P2 = vec3( 3.0, 0.9, -3.5);
// Middle row: clearcoat
const vec3 P3 = vec3(-3.0, 0.9, 0.0);
const vec3 P4 = vec3( 0.0, 0.9, 0.0);
const vec3 P5 = vec3( 3.0, 0.9, 0.0);
// Front row: metals
const vec3 P6 = vec3(-3.0, 0.9, 3.5);
const vec3 P7 = vec3( 0.0, 0.9, 3.5);
const vec3 P8 = vec3( 3.0, 0.9, 3.5);

float sdScene(vec3 p) {
    float d = p.y;
    d = min(d, length(p - P0) - SR);
    d = min(d, length(p - P1) - SR);
    d = min(d, length(p - P2) - SR);
    d = min(d, length(p - P3) - SR);
    d = min(d, length(p - P4) - SR);
    d = min(d, length(p - P5) - SR);
    d = min(d, length(p - P6) - SR);
    d = min(d, length(p - P7) - SR);
    d = min(d, length(p - P8) - SR);
    return d;
}

float checkerboard(vec3 p) {
    vec2 q = floor(p.xz);
    return mod(q.x + q.y, 2.0);
}

Material getMaterial(vec3 p) {
    float eps = 0.02;

    // Back: dielectrics
    if (length(p - P0) - SR < eps)
        return Material(vec3(0.72, 0.36, 0.24), 4.0, 0.0, 0.0);      // matte terra cotta
    if (length(p - P1) - SR < eps)
        return Material(vec3(0.8, 0.08, 0.05), 64.0, 0.0, 0.0);      // glossy red plastic
    if (length(p - P2) - SR < eps)
        return Material(vec3(0.95, 0.93, 0.90), 512.0, 0.0, 0.0);    // polished ceramic

    // Middle: clearcoat
    if (length(p - P3) - SR < eps)
        return Material(vec3(0.65, 0.35, 0.22), 6.0, 0.0, 1.0);      // glazed terra cotta
    if (length(p - P4) - SR < eps)
        return Material(vec3(0.6, 0.03, 0.02), 8.0, 0.0, 1.0);       // deep red car paint
    if (length(p - P5) - SR < eps)
        return Material(vec3(0.92, 0.90, 0.85), 4.0, 0.0, 1.0);      // white lacquer

    // Front: metals
    if (length(p - P6) - SR < eps)
        return Material(vec3(0.95, 0.64, 0.54), 64.0, 1.0, 0.0);     // copper
    if (length(p - P7) - SR < eps)
        return Material(vec3(0.9, 0.15, 0.10), 256.0, 1.0, 0.0);     // red metal
    if (length(p - P8) - SR < eps)
        return Material(vec3(0.95, 0.93, 0.88), 512.0, 1.0, 0.0);    // chrome

    // Ground
    float check = checkerboard(p);
    vec3 col = mix(vec3(0.4, 0.38, 0.35), vec3(0.7, 0.67, 0.63), check);
    return Material(col, 4.0, 0.0, 0.0);
}


// --- Raymarching ---

vec3 calcNormal(vec3 p) {
    float e = 0.001;
    return normalize(vec3(
        sdScene(p + vec3(e, 0, 0)) - sdScene(p - vec3(e, 0, 0)),
        sdScene(p + vec3(0, e, 0)) - sdScene(p - vec3(0, e, 0)),
        sdScene(p + vec3(0, 0, e)) - sdScene(p - vec3(0, 0, e))
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


// --- Shadows & AO ---

float softShadow(vec3 p, vec3 ld, float k, float maxDist) {
    float res = 1.0;
    float t = 0.03;
    for (int i = 0; i < 64; i++) {
        float d = sdScene(p + ld * t);
        if (d < 0.001) return 0.0;
        res = min(res, k * d / t);
        t += d;
        if (t > maxDist) break;
    }
    return clamp(res, 0.0, 1.0);
}

float ambientOcclusion(vec3 p, vec3 n) {
    float ao = 0.0;
    float scale = 1.0;
    for (int i = 1; i <= 5; i++) {
        float dist = 0.04 * float(i);
        float d = sdScene(p + n * dist);
        ao += (dist - d) * scale;
        scale *= 0.5;
    }
    return 1.0 - clamp(ao * 3.0, 0.0, 1.0);
}


// --- BRDF ---

vec3 fresnelSchlick(float cosTheta, vec3 f0) {
    return f0 + (1.0 - f0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

vec2 dirToEquirect(vec3 dir) {
    float lon = atan(dir.z, dir.x);
    float lat = asin(clamp(dir.y, -1.0, 1.0));
    return vec2(lon / (2.0 * PI) + 0.5, lat / PI + 0.5);
}

vec3 skyColor(vec3 dir) {
    return texture(envMap, dirToEquirect(dir)).rgb;
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
    vec3 base = (diffuse + specular) * light.color * NdotL;

    // Clear coat
    if (mat.clearcoat > 0.0) {
        vec3 FcoatR = fresnelSchlick(RdotV, vec3(0.04));
        vec3 FcoatI = fresnelSchlick(NdotL, vec3(0.04));
        float coatShininess = 256.0;
        float coatNorm = (coatShininess + 2.0) / (2.0 * PI);
        float coatSpec = coatNorm * pow(RdotV, coatShininess);
        vec3 coat = FcoatR * coatSpec * light.color * NdotL;
        base = base * (vec3(1.0) - FcoatI * mat.clearcoat) + coat * mat.clearcoat;
    }

    float sh = softShadow(p + n * 0.02, L, 10.0, 30.0);
    return base * sh;
}

vec3 shadePoint(vec3 p, vec3 n, Material mat, vec3 V,
                DirLight l1, DirLight l2, DirLight l3) {
    vec3 color = ambient(p, n, mat);
    color += shadeDirect(p, n, mat, V, l1);
    color += shadeDirect(p, n, mat, V, l2);
    color += shadeDirect(p, n, mat, V, l3);
    return color;
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 18.0);

    DirLight key  = DirLight(normalize(vec3(2.0, 3.5, 2.0)),  vec3(1.0, 0.96, 0.92) * 2.5);
    DirLight fill = DirLight(normalize(vec3(-2.0, 1.0, -1.0)), vec3(0.5, 0.6, 0.75) * 0.6);
    DirLight rim  = DirLight(normalize(vec3(0.0, 0.5, -2.0)),  vec3(0.8, 0.75, 0.7) * 0.3);

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

        if (mat.clearcoat > 0.0) {
            vec3 Fcoat = fresnelSchlick(NdotV, vec3(0.04));
            Fenv = mix(Fenv, max(Fenv, Fcoat), mat.clearcoat);
        }

        vec3 directColor = shadePoint(p, n, mat, V, key, fill, rim);

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
            reflColor = shadePoint(rp, rn, rmat, rv, key, fill, rim);
        }

        color = directColor + Fenv * reflColor;

        // Roughness fade (clearcoat overrides, metals always reflect)
        float effectiveShininess = mat.shininess;
        if (mat.clearcoat > 0.0)
            effectiveShininess = max(effectiveShininess, 256.0 * mat.clearcoat);
        float clarity = clamp((effectiveShininess - 16.0) / 112.0, 0.0, 1.0);
        clarity = max(clarity, mat.metallic);
        color = mix(directColor, color, clarity);
    }

    color = color / (1.0 + color);
    color = pow(color, vec3(1.0 / 2.2));
    fragColor = vec4(color, 1.0);
}
