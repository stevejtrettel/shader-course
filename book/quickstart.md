# Quickstart {.unnumbered}

A shader is a function from a pixel to a color. You write the function once;
the GPU runs it for every pixel on the screen at the same time, sixty times a
second. That is the whole idea, and it is why shaders suit mathematics so
well — a great many mathematical objects are already defined pointwise. Does
this sequence escape? Is this point inside the set? What color should this
direction be? Answer that for one point and the picture draws itself.

Everything here is written in GLSL, and every example runs in the page. To
write your own you need somewhere to run them. There are three reasonable
choices below. They share the same language and very nearly the same
conventions, so starting with the first costs you nothing later.

## Shadertoy {.unnumbered}

[Shadertoy](https://www.shadertoy.com) is a website where you write a shader
in one pane and watch it run in the other. A free account saves your work,
and everyone else's published shaders can be read, run and edited in place —
so it is a library as much as an editor.

Nothing is installed, and none of the business of talking to the GPU is
yours: the canvas, the compile step and the frame loop are already there and
you never see them. What you give up is that you work inside its
conventions — its uniform names, its four buffers, its input channels. That
is a mild price, because those conventions are the ones everybody else uses,
and every shader in these notes is written to them. It is the fastest way in,
and the right one if you have never written a shader before.

Click **New** and edit. Your program is a single function:

```glsl
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    fragColor = vec4(uv, 0.5 + 0.5 * sin(iTime), 1.0);
}
```

`fragCoord` is the pixel you are being asked about and `fragColor` is your
answer. Around that you are given `iTime`, `iResolution` and `iMouse` —
elapsed seconds, canvas size, pointer position and click state — along with
`iFrame`, `iDate` and a few more.

Beyond one pass there are four buffers, **BufferA** through **BufferD**, each
able to read its own previous frame. That feedback is what makes simulation
possible: cellular automata, reaction–diffusion, wave equations. A **Common**
tab holds code shared across passes, and each pass has four input channels
that can be a buffer, a supplied texture, the keyboard, the microphone, or a
webcam.

The real value is the archive. Many thousands of shaders are published with
their source, and reading them is the fastest way to pick up the idioms —
which is where most of the techniques in these notes came from.

Where it runs out: nothing lives on your machine, buffers are named A–D
whatever they mean, and the only parameters you can vary while it runs are
the mouse and the clock. Anything you want a slider for has to be recompiled.

## Shader sandbox {.unnumbered}

Shader sandbox is mine. It implements Shadertoy's conventions exactly — the
same `mainImage`, the same uniforms, the same buffer semantics — so a shader
moves between the two by copy and paste, in either direction. What changes is
where it lives: a file in your own project, edited in your own editor, kept
in version control, and exportable as a standalone page you can put on your
own site.

Past that it adds the things you start wanting once a shader has outgrown a
browser tab, so it is also somewhere to graduate to rather than a second
place to start.

It is on npm as
[`shader-sandbox`](https://www.npmjs.com/package/shader-sandbox), with source
at [github.com/stevejtrettel/shader-sandbox](https://github.com/stevejtrettel/shader-sandbox).
You need [Node.js](https://nodejs.org) 18 or later.

```bash
npx shader-sandbox@latest create my-shaders
cd my-shaders
npx shader new my-shader
npx shader dev my-shader
```

That opens a dev server with live reload. `shader dev` with no name gives a
gallery of everything in the project; `shader build` produces a standalone
page you can host.

A shader is either a bare `.glsl` file or a folder:

```
shaders/my-shader/
    image.glsl      the main pass
    bufferA.glsl    optional extra passes
    common.glsl     code shared by every pass
    config.json     buffers, textures, uniforms
    script.js       per-frame JavaScript, if you want it
```

Every shader on this site is exactly such a folder, so anything you find here
can be copied into a project and run unchanged.

What it adds over Shadertoy is mostly in `config.json`. **Named buffers** —
`velocity`, `pressure` — become samplers you reference by name instead of
remembering which of A–D held what. **Textures** likewise, and the sources
include image files, video, the webcam, the microphone's FFT, the keyboard,
and cubemaps by equirectangular projection. **Custom uniforms** are declared
there and injected automatically, with a control built for each type:

```json
{
  "controls": true,
  "uniforms": {
    "uSpeed": { "type": "float", "value": 1.0, "min": 0.0, "max": 5.0 },
    "uColor": { "type": "vec3", "value": [1, 0.5, 0.2], "color": true }
  }
}
```

A `float` gets a slider, a `bool` a toggle, a `vec2` an XY pad, a `vec3` three
sliders or a color picker. You write `uSpeed` in the shader with no `uniform`
declaration and drag it while the thing runs — which changes how you work more
than it sounds, because the parameter you are hunting for is now something you
find by hand rather than by recompiling.

There is a little more than Shadertoy offers elsewhere too: `iMousePressed`,
touch and pinch uniforms for tablets, and `script.js` for anything better
computed on the CPU and handed to the shader as data.

## Your own WebGL {.unnumbered}

If you already write code, the only real question is how a shader gets hooked
up to a canvas. It is less than you would guess: three files, each with one
job. A page holding a canvas —

```html
<!doctype html>
<style>
  html, body { margin: 0; height: 100% }
  #gl { display: block; width: 100%; height: 100% }
</style>
<canvas id=gl></canvas>
<script type=module src=main.js></script>
```

a script that sets WebGL up and runs a frame loop —

```js
const canvas = document.querySelector('#gl');
const gl = canvas.getContext('webgl2');

const compile = (type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    console.error(gl.getShaderInfoLog(shader));
  return shader;
};

// Three vertices and no buffer: gl_VertexID gives (0,0), (2,0), (0,2),
// which in clip space is one triangle covering the whole screen.
const vertex = `#version 300 es
void main() {
  vec2 v = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(v * 2.0 - 1.0, 0, 1);
}`;

const fragment = await fetch('./fragment.glsl').then((r) => r.text());

const program = gl.createProgram();
gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
gl.linkProgram(program);
gl.useProgram(program);

const uResolution = gl.getUniformLocation(program, 'iResolution');
const uTime = gl.getUniformLocation(program, 'iTime');

const frame = (ms) => {
  const w = canvas.clientWidth * devicePixelRatio | 0;
  const h = canvas.clientHeight * devicePixelRatio | 0;
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  }
  gl.uniform2f(uResolution, w, h);
  gl.uniform1f(uTime, ms / 1000);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  requestAnimationFrame(frame);
};
requestAnimationFrame(frame);
```

and the shader itself, which is the only file you will actually edit:

```glsl
#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution;
  fragColor = vec4(uv, 0.5 + 0.5 * sin(iTime), 1.0);
}
```

Serve that directory and open it. A server is needed rather than optional:
module scripts and `fetch` are both blocked on `file://`, so double-clicking
the page will not work. `python3 -m http.server` is enough.

Two things keep `main.js` short. There is no geometry and no vertex buffer:
in WebGL2 the vertex shader can read `gl_VertexID`, and the expression above
turns vertices 0, 1 and 2 into one triangle covering the screen, so
`drawArrays` is called with nothing bound. And `mainImage` is absent — that
is a Shadertoy convention, not part of the language — so the shader has a
real `main()`, a version directive, a precision qualifier and its own `out`
variable. Everything Shadertoy handed you is now a uniform you declare and
upload yourself, once per frame.

The `COMPILE_STATUS` check is the part to keep. Without it a shader with a
typo compiles to nothing and you get a blank canvas, silently, with no
indication anywhere of what went wrong.

What is missing, in rough order of effort: the mouse, which is two event
listeners; textures, which bring asynchronous loading and choices about
filtering and wrapping; multi-pass, which means a framebuffer and texture per
pass, bound in order, with a pair swapped each frame so a pass can read its
own previous output; hot reload, so you are refreshing by hand; and context
loss when the tab sleeps, which you either handle or ignore and live with a
dead canvas. That list is most of what the sandbox is doing for you.

---

If you are unsure: start on Shadertoy, move to the sandbox when a shader
deserves to live in a file, and write your own host only when something makes
you.
