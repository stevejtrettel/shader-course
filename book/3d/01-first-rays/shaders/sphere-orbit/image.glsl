struct Ray {
    vec3 origin;
    vec3 dir;
};

struct Sphere {
    vec3 center;
    float radius;
    vec3 color;
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

float intersect(Ray ray, Sphere s) {
    vec3 delta = ray.origin - s.center;

    float b = dot(delta, ray.dir);
    float c = dot(delta, delta) - s.radius * s.radius;
    float discriminant = b * b - c;

    if (discriminant < 0.0) return -1.0;

    float sqrtDisc = sqrt(discriminant);
    float t1 = -b - sqrtDisc;
    float t2 = -b + sqrtDisc;

    if (t1 > 0.0) return t1;
    if (t2 > 0.0) return t2;
    return -1.0;
}

// --- Shading ---

vec3 shadeDiffuse(vec3 normal, vec3 albedo) {
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float brightness = max(0.0, dot(normal, lightDir));
    return albedo * (0.15 + 0.85 * brightness);
}

Sphere sphere = Sphere(vec3(0.0), 1.0, vec3(1.0, 0.0, 0.0));

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 5.0);

    float t = intersect(ray, sphere);

    vec3 color = vec3(0.1, 0.1, 0.2);
    if (t > 0.0) {
        vec3 hitPoint = ray.origin + t * ray.dir;
        vec3 normal = (hitPoint - sphere.center) / sphere.radius;
        color = shadeDiffuse(normal, sphere.color);
    }

    fragColor = vec4(color, 1.0);
}
