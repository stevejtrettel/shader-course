// =============================================
//  IHP Shader Workshop 2026
//  BILLIARD PHASE PORTRAIT
//
//  Phase space (t, theta) of billiards in an ellipse.
//  Left panel: phase portrait colored by Poincare section.
//  Right panel: the ellipse with a selected trajectory.
//  Click left panel to select an orbit.
// =============================================

// =============================================
//  YOUR ELLIPSE
// =============================================

//  The table boundary is the ellipse (A cos t, sin t).
//  A = 1.0 is a circle (theta is conserved — horizontal invariant curves).
//  A < 1.0 is a proper ellipse (invariant curves deform but persist).
//  Try: 1.0, 0.7, 0.5, 0.3

const float A = 0.7;

// =============================================
//  PARAMETERS
//
//  ITERATIONS — number of bounces to iterate
// =============================================

const int ITERATIONS = 500;

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

const float PI = 3.141592653589793238;
const float PI_INV = 1.0 / PI;
const float SCALE = 2.5;
const float EPS = 1e-2;

const float A2 = A * A;
const float A_INV = 1.0 / A;
const float A2_INV = A_INV * A_INV;

const vec3 ORBIT_COLOR = vec3(1.0, 0.2, 0.2);

vec2 project(vec2 v, vec2 onto) {
    return onto * dot(v, onto) / (onto.x * onto.x + onto.y * onto.y);
}

vec2 perp(vec2 v, vec2 onto) {
    return v - project(v, onto);
}

vec2 rotate(vec2 v, float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
}

float atan2(in float y, in float x)
{
    bool s = (abs(x) > abs(y));
    float t = mix(PI/2.0 - atan(x,y), atan(y,x), s);
    if (t < 0.0) t += 2. * PI;
    return t;
}

float angle(vec2 u, vec2 v) {
    return acos(dot(u, v) / sqrt(dot(u,u) * dot(v,v)));
}

struct Ray {
    vec2 source;
    vec2 direction;
};

struct State {
    float t;
    float theta;
};

float pointOnSegment(vec2 pt, vec2 start, vec2 end, float thickness) {
    vec2 dp = pt - start;
    vec2 v = end - start;
    float d = dot(dp, v);
    float f;
    if (d < 0.0) f = max(0., thickness - length(dp)) / thickness;
    else if (d > dot(v,v)) f = max(0., thickness - length(end - pt)) / thickness;
    else f = max(0., thickness - length(perp(dp, v))) / thickness;
    return min(1., 2. * f);
}

vec2 gamma(float t) {
    return vec2(A * cos(t), sin(t));
}

vec2 gammaPrime(float t) {
    return normalize(vec2(-A * sin(t), cos(t)));
}

Ray stateToRay(State state) {
    vec2 source = gamma(state.t);
    vec2 gp = gammaPrime(state.t);
    vec2 direction = rotate(gp, state.theta);
    return Ray(source, normalize(direction));
}

State rayToState(Ray ray) {
    vec2 aff = ray.source * vec2(A_INV, 1.);
    float t = atan2(aff.y, aff.x);
    float theta = angle(gammaPrime(t), ray.direction);
    return State(t, theta);
}

Ray billiard(Ray ray) {
    Ray affRay = Ray(ray.source * vec2(A_INV, 1), normalize(ray.direction * vec2(A_INV, 1)));
    float t = -2.0 * dot(affRay.source, affRay.direction);
    vec2 affPoint = affRay.source + t * affRay.direction;
    vec2 point = affPoint * vec2(A, 1);
    vec2 der = normalize(vec2(-A * affPoint.y, affPoint.x));
    return Ray(point, 2.0 * dot(ray.direction, der) * der - ray.direction);
}


float pointOnEllipse(vec2 pt, float thickness) {
    float grad = length(vec2(2. * pt.x * A2_INV, 2. * pt.y));
    float level = abs(pt.x * pt.x * A2_INV + pt.y * pt.y - 1.) / grad;
    float f = max(0., (thickness - level) / thickness);
    return min(1., 2. * f);
}

vec2 pixelToWorldLeft(vec2 px) {
    return SCALE * (px / vec2(iResolution.x / 2.)
        - vec2(0.5, iResolution.y / iResolution.x));
}

vec2 pixelToWorldRight(vec2 px) {
    px.x -= iResolution.x / 2.;
    return SCALE * (px / vec2(iResolution.x / 2.)
        - vec2(0.5, iResolution.y / iResolution.x));
}

vec3 colorState(State s) {
    Ray ray = stateToRay(s);
    for (int i = 0; i < ITERATIONS; i++) {
        if (abs(s.t - PI) < EPS) {
            float th = abs(s.theta * PI_INV - 0.5) * 2.;
            float rta = round(th * 73.);
            if (mod(rta, 2.0) <= 0.5) continue;
            float rt = mod(rta * 64., 79.) / 79.;
            return vec3(rt, 1.-mod(12.*rt, 1.), 0.5);
        }
        ray = billiard(ray);
        s = rayToState(ray);
    }
    return vec3(0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 mp = pixelToWorldLeft(iMouse.xy);
    float thickness = SCALE / iResolution.x;
    vec3 color;
    if (fragCoord.x >= iResolution.x / 2.) {
        vec2 pt = pixelToWorldRight(fragCoord);

        color = vec3(pointOnEllipse(pt, 5. * thickness));

        float time = (mp.x + 1.0) * PI;
        float theta = (mp.y + 1.0) * PI / 2.0;

        if (time >= 0.0 && time <= 2.0 * PI && theta >= 0.0 && theta <= PI) {
            Ray ray = stateToRay(State(time,theta));

            for (int i = 0; i < ITERATIONS; i++) {
                Ray newRay = billiard(ray);
                float f = pointOnSegment(pt, ray.source, newRay.source, thickness);
                color = max(color, f * ORBIT_COLOR);
                ray = newRay;
            }
        }
    } else {
        vec2 pt = pixelToWorldLeft(fragCoord);


        float l = pointOnSegment(pt, vec2(-1,-1), vec2(-1,+1), 5. * thickness);
        float r = pointOnSegment(pt, vec2(+1,-1), vec2(+1,+1), 5. * thickness);
        float b = pointOnSegment(pt, vec2(-1,-1), vec2(+1,-1), 5. * thickness);
        float t = pointOnSegment(pt, vec2(-1,+1), vec2(+1,+1), 5. * thickness);
        float box = max(max(l,r),max(b,t));

        color = vec3(box);

        float time = (pt.x + 1.0) * PI;
        float theta = (pt.y + 1.0) * PI / 2.0;

        if (time >= 0.0 && time <= 2.0 * PI && theta >= 0.0 && theta <= PI) {
            color = colorState(State(time,theta));
        }

        time = (mp.x + 1.0) * PI;
        theta = (mp.y + 1.0) * PI / 2.0;

        if (time >= 0.0 && time <= 2.0 * PI && theta >= 0.0 && theta <= PI) {
            Ray ray = stateToRay(State(time,theta));

            for (int i = 0; i < 100; i++) {
                State state = rayToState(ray);
                vec2 pp = vec2(
                    state.t * PI_INV - 1.,
                    state.theta * PI_INV * 2. - 1.
                );
                if (length(pt - pp) < 10. * thickness) color = ORBIT_COLOR;
                ray = billiard(ray);
            }
        }

    }
    fragColor = vec4(color, 1);
}
