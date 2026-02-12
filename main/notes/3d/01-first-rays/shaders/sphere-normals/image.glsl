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

vec3 shadeNormal(vec3 normal) {
    return normal * 0.5 + 0.5;
}

Sphere sphere = Sphere(vec3(0.0, 0.0, -3.0), 1.0, vec3(1.0, 0.0, 0.0));

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);

    float t = intersect(ray, sphere);

    vec3 color = vec3(0.1, 0.1, 0.2);
    if (t > 0.0) {
        vec3 hitPoint = ray.origin + t * ray.dir;
        vec3 normal = (hitPoint - sphere.center) / sphere.radius;
        color = shadeNormal(normal);
    }

    fragColor = vec4(color, 1.0);
}
