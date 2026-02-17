// =============================================
//  IHP Shader Workshop 2026
//  MAGNETIC PENDULUM — Buffer A (ODE state)
//
//  Integrates the pendulum ODE for each pixel.
//  Stores position (.rg) and velocity (.ba).
//  iChannel0 = Buffer A (self).
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    ivec2 p = ivec2(fragCoord);

    vec2 pos, vel;

    if (iFrame == 0) {
        pos = uv * 2.5;
        vel = vec2(0.0);
    } else {
        vec4 state = texelFetch(iChannel0, p, 0);
        pos = state.rg;
        vel = state.ba;
    }

    for (int s = 0; s < SUBSTEPS; s++) {
        vec2 acc = -FRICTION * vel - GRAVITY * pos;
        for (int j = 0; j < N_MAGNETS; j++) {
            vec2 d = magnetPos(j) - pos;
            float r = sqrt(dot(d, d) + HEIGHT * HEIGHT);
            acc += STRENGTH * d / (r * r * r);
        }
        vel += DT * acc;
        pos += DT * vel;
    }

    fragColor = vec4(pos, vel);
}
