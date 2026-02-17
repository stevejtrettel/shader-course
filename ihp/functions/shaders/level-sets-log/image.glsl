// =============================================
//  IHP Shader Workshop 2026
//  LEVEL SETS — LOGARITHMIC CONTOURS
//
//  Multi-octave contour lines for functions with
//  large dynamic range. Contour density adapts to
//  the local gradient, using log-space spacing that
//  handles zeros and poles gracefully.
// =============================================

// =============================================
//  YOUR FUNCTION
// =============================================

vec2 myFunction(vec2 z) {
    // A rational function with two zeros and a pole
    // (z - 1)(z + 0.5 + 0.8i) / (z + 1)
    float x = z.x, y = z.y;
    // (z-1)
    vec2 a = z - vec2(1, 0);
    // (z+1)
    vec2 b = z + vec2(1, 0);
    // (z - (-0.5 + 0.8i))
    vec2 c = z - vec2(-0.5, 0.8);
    // a * c / b, done manually:
    vec2 ac = vec2(a.x*c.x - a.y*c.y, a.y*c.x + a.x*c.y);
    float denom = dot(b, b);
    return vec2(ac.x*b.x + ac.y*b.y, ac.y*b.x - ac.x*b.y) / denom;

    // Other things to try:
    // return vec2(length(z) - 1.0, 0.0);          // distance to unit circle
    // return vec2(z.x*z.x - z.y*z.y + 0.3, 2.0*z.x*z.y + 0.5); // z^2 + c
    // return vec2(exp(z.x)*cos(z.y), exp(z.x)*sin(z.y));         // e^z
}

// =============================================
//  PARAMETERS
//
//  VIEW_RADIUS   — half-width of visible region
//  MIN_SPACING   — smallest contour spacing in pixels
//  DIVISIONS     — subdivisions per octave
//  LINE_WIDTH    — line width in pixels
//  AA_WIDTH      — antialiasing width
// =============================================

#define VIEW_RADIUS    4.0
#define MIN_SPACING    2.0
#define DIVISIONS      6.0
#define LINE_WIDTH     1.0
#define AA_WIDTH       1.5

// =============================================
//  VISUALIZATION (nothing below needs editing)
// =============================================

// Numerically stable magnitude
float hypot(vec2 z) {
    float x = abs(z.x);
    float y = abs(z.y);
    float t = min(x, y);
    x = max(x, y);
    t = t / x;
    return x * sqrt(1.0 + t * t);
}

// Multi-octave logarithmic contours
float blendedContours(float f, vec2 gradient, float minSpacing,
                      float divisions, float lineWidth, float aa) {
    float screenSpaceLogGrad = hypot(gradient) / f;
    float localOctave = log2(screenSpaceLogGrad * minSpacing) / log2(divisions);
    float contourSpacing = pow(divisions, ceil(localOctave));
    float plotVar = log2(f) / contourSpacing;
    float widthScale = 0.5 * contourSpacing / screenSpaceLogGrad;

    float contourSum = 0.0;
    const int octaves = 5;

    for (int i = 0; i < octaves; i++) {
        float t = float(i + 1) - fract(localOctave);
        float weight = smoothstep(0.0, 1.0, t)
                     * smoothstep(float(octaves), float(octaves) - 1.0, t);

        contourSum += weight * smoothstep(
            0.5 * (lineWidth + aa),
            0.5 * (lineWidth - aa),
            (0.5 - abs(fract(plotVar) - 0.5)) * widthScale
        );

        widthScale *= divisions;
        plotVar /= divisions;
    }

    return contourSum / float(octaves);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = VIEW_RADIUS * vec2(1.0, iResolution.y / iResolution.x)
            * (fragCoord / iResolution.xy - 0.5);

    vec2 f = myFunction(uv);

    float fMag = hypot(f);
    vec2 fMagGradient = vec2(dFdx(fMag), dFdy(fMag));

    float contour = blendedContours(fMag, fMagGradient,
                                     MIN_SPACING, DIVISIONS, LINE_WIDTH, AA_WIDTH);

    vec3 col = vec3(1.0 - contour);
    fragColor = vec4(col, 1.0);
}
