// Materials Chapter — Hero Shader
// Stanford Bunny (neural SDF by Blackle Mori, CC0 1.0 Universal)
// cycles through the chapter's material types on a single object.
//
// iChannel0: equirectangular environment map (optional).
// Falls back to a procedural environment if no texture is loaded.

const float PI = 3.14159265;
const int MAX_STEPS = 120;
const float MAX_DIST = 12.0;
const float HIT_THRESHOLD = 0.0005;

struct Ray { vec3 origin; vec3 dir; };

struct Material {
    vec3 albedo;
    float shininess;
    float metallic;
    float clearcoat;
};


// =====================================================================
// Neural Bunny SDF — Blackle Mori (CC0 1.0 Universal)
// SIREN network with skip connections encoding the Stanford Bunny.
// https://creativecommons.org/publicdomain/zero/1.0/
// =====================================================================

vec3 erot(vec3 p, vec3 ax, float ro) {
    return mix(dot(p, ax) * ax, p, cos(ro)) + sin(ro) * cross(ax, p);
}

float bunnyRaw(vec3 p) {
    if (length(p) > 1.) return length(p) - .8;
    vec4 f00=sin(p.y*vec4(-3.02,1.95,-3.42,-.60)+p.z*vec4(3.08,.85,-2.25,-.24)-p.x*vec4(-.29,1.16,-3.74,2.89)+vec4(-.71,4.50,-3.24,-3.50));
    vec4 f01=sin(p.y*vec4(-.40,-3.61,3.23,-.14)+p.z*vec4(-.36,3.64,-3.91,2.66)-p.x*vec4(2.90,-.54,-2.75,2.71)+vec4(7.02,-5.41,-1.12,-7.41));
    vec4 f02=sin(p.y*vec4(-1.77,-1.28,-4.29,-3.20)+p.z*vec4(-3.49,-2.81,-.64,2.79)-p.x*vec4(3.15,2.14,-3.85,1.83)+vec4(-2.07,4.49,5.33,-2.17));
    vec4 f03=sin(p.y*vec4(-.49,.68,3.05,.42)+p.z*vec4(-2.87,.78,3.78,-3.41)-p.x*vec4(-2.65,.33,.07,-.64)+vec4(-3.24,-5.90,1.14,-4.71));
    vec4 f10=sin(mat4(-.34,.06,-.59,-.76,.10,-.19,-.12,.44,.64,-.02,-.26,.15,-.16,.21,.91,.15)*f00+mat4(.01,.54,-.77,.11,.06,-.14,.43,.51,-.18,.08,.39,.20,.33,-.49,-.10,.19)*f01+mat4(.27,.22,.43,.53,.18,-.17,.23,-.64,-.14,.02,-.10,.16,-.13,-.06,-.04,-.36)*f02+mat4(-.13,.29,-.29,.08,1.13,.02,-.83,.32,-.32,.04,-.31,-.16,.14,-.03,-.20,.39)*f03+vec4(.73,-4.28,-1.56,-1.80))/1.0+f00;
    vec4 f11=sin(mat4(-1.11,.55,-.12,-1.00,.16,.15,-.30,.31,-.01,.01,.31,-.42,-.29,.38,-.04,.71)*f00+mat4(.96,-.02,.86,.52,-.14,.60,.44,.43,.02,-.15,-.49,-.05,-.06,-.25,-.03,-.22)*f01+mat4(.52,.44,-.05,-.11,-.56,-.10,-.61,-.40,-.04,.55,.32,-.07,-.02,.28,.26,-.49)*f02+mat4(.02,-.32,.06,-.17,-.59,.00,-.24,.60,-.06,.13,-.21,-.27,-.12,-.14,.58,-.55)*f03+vec4(-2.24,-3.48,-.80,1.41))/1.0+f01;
    vec4 f12=sin(mat4(.44,-.06,-.79,-.46,.05,-.60,.30,.36,.35,.12,.02,.12,.40,-.26,.63,-.21)*f00+mat4(-.48,.43,-.73,-.40,.11,-.01,.71,.05,-.25,.25,-.28,-.20,.32,-.02,-.84,.16)*f01+mat4(.39,-.07,.90,.36,-.38,-.27,-1.86,-.39,.48,-.20,-.05,.10,-.00,-.21,.29,.63)*f02+mat4(.46,-.32,.06,.09,.72,-.47,.81,.78,.90,.02,-.21,.08,-.16,.22,.32,-.13)*f03+vec4(3.38,1.20,.84,1.41))/1.0+f02;
    vec4 f13=sin(mat4(-.41,-.24,-.71,-.25,-.24,-.75,-.09,.02,-.27,-.42,.02,.03,-.01,.51,-.12,-1.24)*f00+mat4(.64,.31,-1.36,.61,-.34,.11,.14,.79,.22,-.16,-.29,-.70,.02,-.37,.49,.39)*f01+mat4(.79,.47,.54,-.47,-1.13,-.35,-1.03,-.22,-.67,-.26,.10,.21,-.07,-.73,-.11,.72)*f02+mat4(.43,-.23,.13,.09,1.38,-.63,1.57,-.20,.39,-.14,.42,.13,-.57,-.08,-.21,.21)*f03+vec4(-.34,-3.28,.43,-.52))/1.0+f03;
    f00=sin(mat4(-.72,.23,-.89,.52,.38,.19,-.16,-.88,.26,-.37,.09,.63,.29,-.72,.30,-.95)*f10+mat4(-.22,-.51,-.42,-.73,-.32,.00,-1.03,1.17,-.20,-.03,-.13,-.16,-.41,.09,.36,-.84)*f11+mat4(-.21,.01,.33,.47,.05,.20,-.44,-1.04,.13,.12,-.13,.31,.01,-.34,.41,-.34)*f12+mat4(-.13,-.06,-.39,-.22,.48,.25,.24,-.97,-.34,.14,.42,-.00,-.44,.05,.09,-.95)*f13+vec4(.48,.87,-.87,-2.06))/1.4+f10;
    f01=sin(mat4(-.27,.29,-.21,.15,.34,-.23,.85,-.09,-1.15,-.24,-.05,-.25,-.12,-.73,-.17,-.37)*f10+mat4(-1.11,.35,-.93,-.06,-.79,-.03,-.46,-.37,.60,-.37,-.14,.45,-.03,-.21,.02,.59)*f11+mat4(-.92,-.17,-.58,-.18,.58,.60,.83,-1.04,-.80,-.16,.23,-.11,.08,.16,.76,.61)*f12+mat4(.29,.45,.30,.39,-.91,.66,-.35,-.35,.21,.16,-.54,-.63,1.10,-.38,.20,.15)*f13+vec4(-1.72,-.14,1.92,2.08))/1.4+f11;
    f02=sin(mat4(1.00,.66,1.30,-.51,.88,.25,-.67,.03,-.68,-.08,-.12,-.14,.46,1.15,.38,-.10)*f10+mat4(.51,-.57,.41,-.09,.68,-.50,-.04,-1.01,.20,.44,-.60,.46,-.09,-.37,-1.30,.04)*f11+mat4(.14,.29,-.45,-.06,-.65,.33,-.37,-.95,.71,-.07,1.00,-.60,-1.68,-.20,-.00,-.70)*f12+mat4(-.31,.69,.56,.13,.95,.36,.56,.59,-.63,.52,-.30,.17,1.23,.72,.95,.75)*f13+vec4(-.90,-3.26,-.44,-3.11))/1.4+f12;
    f03=sin(mat4(.51,-.98,-.28,.16,-.22,-.17,-1.03,.22,.70,-.15,.12,.43,.78,.67,-.85,-.25)*f10+mat4(.81,.60,-.89,.61,-1.03,-.33,.60,-.11,-.06,.01,-.02,-.44,.73,.69,1.02,.62)*f11+mat4(-.10,.52,.80,-.65,.40,-.75,.47,1.56,.03,.05,.08,.31,-.03,.22,-1.63,.07)*f12+mat4(-.18,-.07,-1.22,.48,-.01,.56,.07,.15,.24,.25,-.09,-.54,.23,-.08,.20,.36)*f13+vec4(-1.11,-4.28,1.02,-.23))/1.4+f13;
    return dot(f00,vec4(.09,.12,-.07,-.03))+dot(f01,vec4(-.04,.07,-.08,.05))+dot(f02,vec4(-.01,.06,-.02,.07))+dot(f03,vec4(-.05,.07,.03,.04))-0.16;
}


// =====================================================================
// Scene
// =====================================================================

const float BSCALE = 1.5;
const vec3 BPOS = vec3(0.0, 1.05, 0.0);

float sdBunny(vec3 p) {
    vec3 q = (p - BPOS) / BSCALE;
    q = erot(q, vec3(1,0,0), PI/2.0);  // ears along Z → ears along Y
    return bunnyRaw(q) * BSCALE;
}

float sdScene(vec3 p) {
    return min(sdBunny(p), p.y);
}

float checkerboard(vec3 p) {
    vec2 q = floor(p.xz);
    return mod(q.x + q.y, 2.0);
}

vec3 calcNormal(vec3 p) {
    mat3 k = mat3(p, p, p) - mat3(0.0015);
    return normalize(sdScene(p) - vec3(sdScene(k[0]), sdScene(k[1]), sdScene(k[2])));
}

float raymarch(Ray ray) {
    float t = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        float d = sdScene(ray.origin + t * ray.dir);
        if (abs(d) < HIT_THRESHOLD) return t;
        t += d;
        if (t > MAX_DIST) return -1.0;
    }
    return -1.0;
}

bool isBunny(vec3 p) {
    return sdBunny(p) < 0.01;
}


// =====================================================================
// Environment Map
// =====================================================================

vec3 proceduralEnv(vec3 dir) {
    // Sky
    float sky = smoothstep(-0.05, 0.5, dir.y);
    vec3 col = mix(vec3(0.7, 0.65, 0.6), vec3(0.15, 0.35, 0.8), sky);

    // Sun disk
    vec3 sunDir = normalize(vec3(1.5, 0.8, 1.0));
    float sun = smoothstep(0.98, 0.995, dot(dir, sunDir));
    col += vec3(12.0, 10.0, 7.0) * sun;

    // Warm glow near sun
    float halo = pow(max(0.0, dot(dir, sunDir)), 8.0);
    col += vec3(0.4, 0.3, 0.15) * halo;

    // Ground reflection
    float ground = smoothstep(0.02, -0.15, dir.y);
    col = mix(col, vec3(0.25, 0.22, 0.18), ground);

    return col;
}

vec3 sampleEnv(vec3 dir) {
    float u = atan(dir.z, dir.x) / (2.0 * PI) + 0.5;
    float v = acos(clamp(dir.y, -1.0, 1.0)) / PI;
    vec3 tex = texture(iChannel0, vec2(u, v)).rgb;
    // Fallback: if texture is black (not loaded), use procedural
    if (dot(tex, tex) < 0.0001 && texture(iChannel0, vec2(0.5, 0.25)).r < 0.001)
        return proceduralEnv(dir);
    return tex;
}


// =====================================================================
// Material Cycling
// =====================================================================

Material cycleMaterial(float time) {
    // 7 materials, 4 seconds each, 0.5s transition
    const float DWELL = 4.0;
    const int N = 7;

    float phase = mod(time / DWELL, float(N));
    int idx = int(floor(phase));
    int next = int(mod(float(idx + 1), float(N)));
    float blend = smoothstep(0.75, 1.0, fract(phase));

    // Chapter materials:
    //   0  matte clay         1  glossy plastic      2  polished ceramic
    //   3  copper             4  gold                5  chrome
    //   6  deep red car paint (clearcoat)

    Material mats[7];
    mats[0] = Material(vec3(0.72, 0.36, 0.24),   4.0, 0.0, 0.0);
    mats[1] = Material(vec3(0.80, 0.08, 0.05),  64.0, 0.0, 0.0);
    mats[2] = Material(vec3(0.95, 0.93, 0.90), 256.0, 0.0, 0.0);
    mats[3] = Material(vec3(0.95, 0.64, 0.54), 128.0, 1.0, 0.0);
    mats[4] = Material(vec3(1.00, 0.71, 0.29), 256.0, 1.0, 0.0);
    mats[5] = Material(vec3(0.95, 0.93, 0.88), 512.0, 1.0, 0.0);
    mats[6] = Material(vec3(0.60, 0.03, 0.02),   8.0, 0.0, 1.0);

    Material a = mats[idx], b = mats[next];
    Material m;
    m.albedo    = mix(a.albedo, b.albedo, blend);
    m.shininess = exp(mix(log(a.shininess), log(b.shininess), blend));
    m.metallic  = mix(a.metallic,  b.metallic,  blend);
    m.clearcoat = mix(a.clearcoat, b.clearcoat, blend);
    return m;
}


// =====================================================================
// Camera
// =====================================================================

Ray makeRay(vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    float f = 1.0 / tan(radians(50.0) / 2.0);
    return Ray(vec3(0.0), normalize(vec3(uv, -f)));
}

mat3 rotateX(float a) { float c=cos(a),s=sin(a); return mat3(1,0,0,0,c,-s,0,s,c); }
mat3 rotateY(float a) { float c=cos(a),s=sin(a); return mat3(c,0,s,0,1,0,-s,0,c); }

Ray orbitRay(Ray ray, float dist) {
    vec2 m = iMouse.xy / iResolution.xy;
    if (length(iMouse.xy) < 1.0) m = vec2(0.5 + iTime * 0.015, 0.42);
    float ay = (m.x - 0.5) * 6.28;
    float ax = (0.5 - m.y) * 2.5;
    ax = clamp(ax, -0.1, 1.2);
    mat3 rot = rotateX(ax) * rotateY(ay);
    ray.origin = rot * vec3(0.0, 0.0, dist);
    ray.dir = rot * ray.dir;
    ray.origin.y += 1.0;
    return ray;
}


// =====================================================================
// Shading
// =====================================================================

vec3 fresnelSchlick(float cosTheta, vec3 f0) {
    return f0 + (1.0 - f0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}


float softShadow(vec3 p, vec3 ld, float k) {
    float res = 1.0;
    float t = 0.03;
    for (int i = 0; i < 40; i++) {
        float d = sdScene(p + ld * t);
        if (d < 0.001) return 0.0;
        res = min(res, k * d / t);
        t += d;
        if (t > 8.0) break;
    }
    return clamp(res, 0.0, 1.0);
}

// Phong, Fresnel-coupled, with clearcoat (chapter pipeline)
vec3 shadeDirect(vec3 p, vec3 n, Material mat, vec3 V, vec3 L, vec3 lightCol) {
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
    vec3 base = (diffuse + specular) * lightCol * NdotL;

    if (mat.clearcoat > 0.0) {
        vec3 FcoatR = fresnelSchlick(RdotV, vec3(0.04));
        vec3 FcoatI = fresnelSchlick(NdotL, vec3(0.04));
        float coatShininess = 256.0;
        float coatNorm = (coatShininess + 2.0) / (2.0 * PI);
        float coatSpec = coatNorm * pow(RdotV, coatShininess);
        vec3 coat = FcoatR * coatSpec * lightCol * NdotL;
        base = base * (vec3(1.0) - FcoatI * mat.clearcoat) + coat * mat.clearcoat;
    }

    float sh = softShadow(p + n * 0.02, L, 12.0);
    return base * sh;
}


// =====================================================================
// Main
// =====================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 6.0);

    float t = raymarch(ray);

    vec3 color;
    if (t < 0.0) {
        color = sampleEnv(ray.dir);
    } else {
        vec3 p = ray.origin + t * ray.dir;
        vec3 n = calcNormal(p);
        vec3 V = -ray.dir;
        float NdotV = max(0.001, dot(n, V));

        bool bunny = isBunny(p);

        // Material: bunny cycles, ground is matte dark
        Material mat;
        if (bunny) {
            mat = cycleMaterial(iTime);
        } else {
            float check = checkerboard(p);
            vec3 groundCol = mix(vec3(0.4, 0.38, 0.35), vec3(0.7, 0.67, 0.63), check);
            mat = Material(groundCol, 4.0, 0.0, 0.0);
        }

        // Ambient: env map diffuse approximation
        vec3 diffAlbedo = mat.albedo * (1.0 - mat.metallic);
        vec3 envDiffuse = sampleEnv(n) * 0.3;
        vec3 ambient = diffAlbedo * envDiffuse;

        // Direct key light (from the env sun direction)
        vec3 keyDir = normalize(vec3(1.5, 0.8, 1.0));
        vec3 keyCol = vec3(1.0, 0.95, 0.9) * 2.5;
        vec3 direct = shadeDirect(p, n, mat, V, keyDir, keyCol);

        // Soft fill
        vec3 fillDir = normalize(vec3(-1.5, 0.5, -0.5));
        vec3 fillCol = vec3(0.4, 0.5, 0.7) * 0.4;
        direct += shadeDirect(p, n, mat, V, fillDir, fillCol);

        color = ambient + direct;

        // Environment reflections (bunny and ground)
        if (bunny) {
            vec3 f0 = mix(vec3(0.04), mat.albedo, mat.metallic);
            vec3 Fenv = fresnelSchlick(NdotV, f0);

            if (mat.clearcoat > 0.0) {
                vec3 Fcoat = fresnelSchlick(NdotV, vec3(0.04));
                Fenv = mix(Fenv, max(Fenv, Fcoat), mat.clearcoat);
            }

            vec3 reflDir = reflect(-V, n);
            vec3 reflColor = sampleEnv(reflDir);

            float effectiveShininess = mat.shininess;
            if (mat.clearcoat > 0.0)
                effectiveShininess = max(effectiveShininess, 256.0 * mat.clearcoat);
            float clarity = clamp((effectiveShininess - 16.0) / 112.0, 0.0, 1.0);
            clarity = max(clarity, mat.metallic);

            color += Fenv * reflColor * clarity;
        } else {
            // Ground: very faint reflection
            vec3 reflDir = reflect(-V, n);
            float groundRefl = 0.03 * smoothstep(0.0, 0.5, 1.0 - NdotV);
            color += sampleEnv(reflDir) * groundRefl;
        }
    }

    // Reinhard + gamma
    color = color / (1.0 + color);
    color = pow(color, vec3(1.0 / 2.2));
    fragColor = vec4(color, 1.0);
}
