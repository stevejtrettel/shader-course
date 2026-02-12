// Ambient Occlusion Demo
// White scene, ambient light only — AO is the only depth cue.
// Left half: no AO.  Right half: with AO.

const int MAX_STEPS = 100;
const float MAX_DIST = 50.0;
const float HIT_THRESHOLD = 0.001;

struct Ray { vec3 origin; vec3 dir; };

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


// =============================================
//  Scene: white spheres on a white ground plane
//  with a back wall for corner occlusion
// =============================================

float sdScene(vec3 p) {
    float d = p.y;                                            // ground plane
    d = min(d, p.z + 1.2);                                   // back wall at z = -1.2

    // Cluster of spheres — different sizes, some touching
    d = min(d, length(p - vec3( 0.0,  0.5,  0.0)) - 0.5);   // center
    d = min(d, length(p - vec3(-0.9,  0.3,  0.3)) - 0.3);   // left small
    d = min(d, length(p - vec3( 0.8,  0.4, -0.2)) - 0.4);   // right medium
    d = min(d, length(p - vec3(-0.35, 0.15, 0.7)) - 0.15);  // front tiny
    d = min(d, length(p - vec3( 0.3,  0.2,  0.6)) - 0.2);   // front small
    d = min(d, length(p - vec3(-0.5,  0.7, -0.4)) - 0.35);  // back left, touching center sphere

    return d;
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


// =============================================
//  Ambient Occlusion
// =============================================

float ambientOcclusion(vec3 p, vec3 n) {
    float ao = 0.0;
    float scale = 1.0;
    for (int i = 1; i <= 5; i++) {
        float dist = 0.06 * float(i);
        float d = sdScene(p + n * dist);
        ao += (dist - d) * scale;
        scale *= 0.5;
    }
    return 1.0 - clamp(2.0 * ao, 0.0, 1.0);
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 4.0);

    float t = raymarch(ray);

    vec3 color = vec3(0.85);  // light gray sky
    if (t > 0.0) {
        vec3 p = ray.origin + t * ray.dir;
        vec3 n = calcNormal(p);

        // Hemisphere ambient: cool sky above, warm ground below
        vec3 sky    = vec3(0.95, 0.95, 1.0);
        vec3 ground = vec3(0.8, 0.75, 0.7);
        vec3 ambient = mix(ground, sky, 0.5 + 0.5 * n.y);

        // White material
        vec3 mat = vec3(0.9);

        float ao = ambientOcclusion(p, n);

        // Split screen: left = no AO, right = with AO
        float split = fragCoord.x / iResolution.x;
        float aoFactor = mix(1.0, ao, smoothstep(0.49, 0.51, split));

        color = mat * ambient * aoFactor;
    }

    // Divider line
    float splitX = 0.5 * iResolution.x;
    if (abs(fragCoord.x - splitX) < 1.0) color = vec3(0.3);

    color = pow(color, vec3(1.0 / 2.2));
    fragColor = vec4(color, 1.0);
}
