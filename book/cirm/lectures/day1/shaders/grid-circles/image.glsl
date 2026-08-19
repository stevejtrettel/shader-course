void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    uv = uv - vec2(0.5, 0.5);
    uv.x *= iResolution.x / iResolution.y;
    vec2 p = uv * 4.0;
    
    float aspect = iResolution.x / iResolution.y;
    float N = 5.0;  // number of columns
    float L = (4.0 * aspect) / N;  // cell size
    
    vec2 cell_id = floor(p / L);
    vec2 cell_p = mod(p + vec2(L/2.0, L/2.0), L) - vec2(L/2.0, L/2.0);
    
    // Checkerboard background
    float checker = mod(cell_id.x + cell_id.y, 2.0);
    vec3 bg = mix(vec3(0.15, 0.15, 0.25), vec3(0.25, 0.15, 0.15), checker);
    
    // Circle in each cell
    float d = length(cell_p);
    float r = L * 0.35;
    
    vec3 color;
    if (d < r) {
        color = vec3(1.0, 1.0, 0.0);
    } else {
        color = bg;
    }
    
    fragColor = vec4(color, 1.0);
}
