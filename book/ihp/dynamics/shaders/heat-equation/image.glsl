// Image tab — maps temperature to a hot colormap.
// Open the Buffer A tab to edit heat parameters.

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float u = texelFetch(iChannel0, ivec2(fragCoord), 0).r;

    // Hot colormap: black -> red -> yellow -> white
    float t = clamp(u * 5.0, 0.0, 1.0);
    vec3 color = vec3(
        min(1.0, t * 3.0),
        min(1.0, max(0.0, t * 3.0 - 1.0)),
        min(1.0, max(0.0, t * 3.0 - 2.0))
    );

    fragColor = vec4(color, 1.0);
}
