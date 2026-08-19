// =============================================
//  IHP Shader Workshop 2026
//  LEVEL SETS — COLORED CONTOUR REGIONS
//
//  Fills bands between level sets with distinct
//  colors, topographic-map style. Antialiased
//  using the error function for mathematically
//  correct pixel blending.
// =============================================

// =============================================
//  YOUR FUNCTION
// =============================================

float f(vec2 p, float t) {
    return sin(p.x + t) * cos(p.y) + sin(p.x * p.y + 0.5 * t);

    // Other things to try:
    // return length(p) + 0.3 * sin(6.0 * atan(p.y, p.x) + t);  // wobbly rings
    // return p.x * p.x - p.y * p.y;                               // saddle
    // return sin(p.x) * sin(p.y) + 0.5 * cos(length(p) - t);    // interference
}

// =============================================
//  STRIPE COLORS
// =============================================

#define NUM_COLORS 4
vec3 stripeColors[NUM_COLORS] = vec3[NUM_COLORS](
    vec3(0.82, 0.77, 0.71),  // warm cream
    vec3(0.18, 0.09, 0.00),  // dark brown
    vec3(0.02, 0.36, 0.51),  // deep blue
    vec3(0.24, 0.62, 0.67)   // teal
);

// =============================================
//  PARAMETERS
//
//  VIEW_RADIUS   — half-width of visible region
//  STRIPE_WIDTH  — width of each stripe in value-space
// =============================================

#define VIEW_RADIUS  5.0
#define STRIPE_WIDTH 0.5

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

// Abramowitz and Stegun, equation 7.1.27
float erfc_appx(float t) {
    const float A1 = 0.278393;
    const float A2 = 0.230389;
    const float A3 = 0.000972;
    const float A4 = 0.078108;
    float p = 1.0 + A1*(t + A2*(t + A3*(t + A4*t)));
    float p_sq = p*p;
    return 1.0 / (p_sq*p_sq);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    uv *= VIEW_RADIUS;

    float t = iTime;
    float val = f(uv, t);

    // Numerical gradient
    float eps = VIEW_RADIUS * 2.0 / iResolution.y;
    float gradX = (f(uv + vec2(eps, 0.0), t) - f(uv - vec2(eps, 0.0), t)) / (2.0 * eps);
    float gradY = (f(uv + vec2(0.0, eps), t) - f(uv - vec2(0.0, eps), t)) / (2.0 * eps);
    float gradMag = length(vec2(gradX, gradY));

    // Pixel radius in world coords
    float pixelRadius = VIEW_RADIUS * 2.0 / min(iResolution.x, iResolution.y);

    // Find position within stripe cycle
    float period = STRIPE_WIDTH * float(NUM_COLORS);
    float inCycle = mod(val, period);
    float inStripe = inCycle / STRIPE_WIDTH;
    int n = int(floor(inStripe));
    float disp = (inStripe - float(n) - 0.5) * STRIPE_WIDTH; // displacement from stripe center

    // Screen-space distance to nearest stripe edge
    float screenDist = abs(disp) / (gradMag * pixelRadius + 1e-6);

    // Gaussian antialiasing via erfc
    float overflow = 0.5 * erfc_appx(screenDist / pixelRadius);

    // Blend with neighbor stripe
    vec3 thisColor = stripeColors[n % NUM_COLORS];
    int neighborIdx = disp < 0.0 ? (n - 1 + NUM_COLORS) % NUM_COLORS
                                 : (n + 1) % NUM_COLORS;
    vec3 neighborColor = stripeColors[neighborIdx];

    vec3 col = mix(thisColor, neighborColor, overflow);

    fragColor = vec4(col, 1.0);
}
