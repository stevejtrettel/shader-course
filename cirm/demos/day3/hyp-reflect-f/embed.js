(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.shader-demo{position:relative;width:100%}.shader-demo canvas{display:block;width:100%;height:100%}.fps-counter{position:absolute;bottom:8px;left:8px;padding:6px 10px;background:#000000bf;color:#fff;font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;font-weight:500;border-radius:4px;pointer-events:none;-webkit-user-select:none;user-select:none;z-index:1000;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);box-shadow:0 2px 8px #0000004d}.playback-controls{position:absolute;bottom:8px;right:8px;display:flex;gap:8px;z-index:1000}.control-button{padding:6px 8px;background:#000000bf;color:#fff;border:none;border-radius:4px;cursor:pointer;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);box-shadow:0 2px 8px #0000004d;transition:all .2s ease;display:flex;align-items:center;justify-content:center;width:32px;height:32px}.control-button:hover{background:#000000d9;transform:scale(1.05)}.control-button:active{transform:scale(.95)}.control-button svg{width:16px;height:16px;fill:currentColor}.shader-error-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:#000000f2;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:2000;padding:60px;overflow-y:auto}.error-overlay-content{background:#1a1a1a;border-radius:6px;max-width:900px;width:100%;display:flex;flex-direction:column;box-shadow:0 20px 60px #000c,0 0 1px #ffffff1a;border:1px solid #2a2a2a;max-height:calc(100vh - 120px)}.error-header{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;background:linear-gradient(135deg,#c62828,#b71c1c);color:#fff;border-radius:6px 6px 0 0;border-bottom:1px solid rgba(0,0,0,.3);box-shadow:0 2px 8px #0003}.error-title{font-size:15px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;display:flex;align-items:center;gap:8px;letter-spacing:-.01em}.error-close{background:transparent;border:none;color:#ffffffe6;font-size:24px;line-height:1;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all .2s ease;opacity:.8}.error-close:hover{background:#ffffff26;opacity:1;transform:scale(1.05)}.error-body{padding:24px;overflow-y:auto;flex:1}.error-section{margin-bottom:24px}.error-section:last-child{margin-bottom:0}.error-pass-name{font-size:13px;font-weight:600;color:#ffa726;font-family:Monaco,Menlo,Courier New,monospace;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #2a2a2a;letter-spacing:.02em}.error-content{margin:0;padding:14px 16px;background:#0f0f0f;border-radius:4px;color:#ff6b6b;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.6;overflow-x:auto;border:1px solid #2a2a2a;white-space:pre-wrap;word-break:break-word}.error-code-context{margin:12px 0 0;padding:14px 16px;background:#0d0d0d;border-radius:4px;color:#b0b0b0;font-size:12px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.6;overflow-x:auto;border:1px solid #2a2a2a;white-space:pre}.error-code-context .context-line{color:#666;display:block}.error-code-context .error-line-highlight{color:#fff;background:#c6282840;display:block;font-weight:600;border-left:3px solid #c62828;margin-left:-16px;padding-left:13px}.layout-fullscreen{width:100%;height:100%}.layout-fullscreen .canvas-container{position:relative;width:100%;height:100%;background:#000}.layout-centered{width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:60px}.layout-centered .canvas-container{position:relative;width:800px;height:600px;background:#000;border-radius:8px;box-shadow:0 20px 60px #00000040,0 5px 15px #00000026;overflow:hidden}.layout-split{width:100%;height:100%;display:flex;gap:40px;padding:120px 140px}.layout-split .canvas-container{position:relative;flex:1;background:#000;border-radius:8px;box-shadow:0 10px 30px #0003,0 3px 8px #0000001f;overflow:hidden}.layout-split .code-panel{position:relative;flex:1;display:flex;flex-direction:column;background:#fff;border-radius:8px;box-shadow:0 10px 30px #0003,0 3px 8px #0000001f;overflow:hidden}.tab-bar{display:flex;background:#f8f8f8;border-bottom:1px solid #e0e0e0;padding:8px 8px 0;gap:4px}.tab-button{padding:8px 16px;background:transparent;border:none;border-radius:6px 6px 0 0;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;cursor:pointer;transition:background .2s;color:#666}.tab-button:hover{background:#e8e8e8}.tab-button.active{background:#fff;color:#000;font-weight:500}.copy-button{position:absolute;top:12px;right:12px;padding:6px;background:transparent;border:none;border-radius:4px;color:#666;cursor:pointer;transition:all .2s;z-index:10;display:flex;align-items:center;justify-content:center}.copy-button:hover{background:#0000000d;color:#333}.copy-button:active{transform:scale(.9)}.copy-button.copied{color:#4caf50}.code-viewer{flex:1;min-height:0;overflow:auto;position:relative;background:#fff}.code-viewer pre{margin:0;padding:16px;font-size:13px;line-height:1.5;font-family:Monaco,Menlo,Courier New,monospace;background:#fff}.code-viewer code{font-family:inherit;font-size:inherit}.token.comment{color:#6a9955}.token.keyword{color:#00f}.token.string{color:#a31515}.token.number{color:#098658}.token.operator{color:#000}.token.function{color:#795e26}.token.class-name{color:#267f99}.token.punctuation{color:#000}@media (max-width: 1800px){.layout-split{padding:100px 120px}}@media (max-width: 1600px){.layout-split{padding:80px 100px}}@media (max-width: 1400px){.layout-split{padding:60px 80px}}@media (max-width: 1200px){.layout-split{padding:50px 60px}}@media (max-width: 1000px){.layout-split{padding:40px 50px}}@media (max-width: 800px){.layout-split{flex-direction:column;padding:30px;gap:30px}}.layout-tabbed{--tab-bg: #f8f8f8;--tab-border: #e0e0e0;--tab-text: #666;--tab-text-hover: #333;--tab-hover-bg: #e8e8e8;--tab-active-bg: white;--tab-active-text: #000;--code-bg: white;--code-text: #000;--line-number-text: #999;--copy-btn-bg: rgba(0, 0, 0, .05);--copy-btn-hover-bg: rgba(0, 0, 0, .1)}[data-bs-theme=dark] .layout-tabbed,.dark .layout-tabbed,:root.dark .layout-tabbed{--tab-bg: #2d2d2d;--tab-border: #444;--tab-text: #999;--tab-text-hover: #ccc;--tab-hover-bg: #3d3d3d;--tab-active-bg: #1e1e1e;--tab-active-text: #fff;--code-bg: #1e1e1e;--code-text: #d4d4d4;--line-number-text: #666;--copy-btn-bg: rgba(255, 255, 255, .1);--copy-btn-hover-bg: rgba(255, 255, 255, .15)}.layout-tabbed{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px;box-sizing:border-box}.tabbed-wrapper{display:flex;flex-direction:column;width:800px;max-width:100%;height:650px;max-height:100%;border-radius:8px;box-shadow:0 20px 60px #00000040,0 5px 15px #00000026;overflow:hidden}.tabbed-tab-bar{display:flex;flex-shrink:0;background:var(--tab-bg);padding:8px 8px 0;gap:4px;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;position:relative}.tabbed-tab-bar:after{content:"";position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--tab-border);z-index:0}.tabbed-tab-bar::-webkit-scrollbar{height:4px}.tabbed-tab-bar::-webkit-scrollbar-thumb{background:#ccc;border-radius:2px}.tabbed-tab-button{padding:10px 20px;background:transparent;border:none;border-radius:6px 6px 0 0;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;cursor:pointer;transition:background .2s,color .2s;color:var(--tab-text);white-space:nowrap;flex-shrink:0}.tabbed-tab-button:hover{background:var(--tab-hover-bg);color:var(--tab-text-hover)}.tabbed-tab-button.active{background:var(--tab-active-bg);color:var(--tab-active-text);font-weight:500;position:relative;z-index:1;padding-bottom:11px;margin-bottom:-1px}.tabbed-tab-button.shader-tab{font-family:system-ui,-apple-system,sans-serif}.tabbed-content{flex:1;min-height:0;position:relative;background:#000;overflow:hidden}.tabbed-canvas-container{position:absolute;top:0;left:0;width:100%;height:100%}.tabbed-code-viewer{position:absolute;top:0;left:0;width:100%;height:100%;overflow:auto;background:var(--code-bg)}.tabbed-code-viewer pre{margin:0;padding:16px 16px 16px 0;font-size:13px;line-height:1.6;font-family:Monaco,Menlo,Courier New,monospace;background:var(--code-bg);color:var(--code-text);display:flex}.tabbed-code-viewer code{font-family:inherit;font-size:inherit}.tabbed-line-numbers{text-align:right;padding-right:16px;margin-right:16px;border-right:1px solid var(--tab-border);color:var(--line-number-text);-webkit-user-select:none;user-select:none;flex-shrink:0;padding-left:16px}.tabbed-code-content{flex:1;overflow-x:auto}.tabbed-copy-button{position:absolute;top:12px;right:12px;padding:8px;background:var(--copy-btn-bg);border:none;border-radius:6px;color:var(--tab-text);cursor:pointer;transition:all .2s;z-index:10;display:flex;align-items:center;justify-content:center}.tabbed-copy-button:hover{background:var(--copy-btn-hover-bg);color:var(--tab-text-hover)}.tabbed-copy-button:active{transform:scale(.9)}.tabbed-copy-button.copied{color:#4caf50}.tabbed-code-viewer .token.comment{color:#6a9955}.tabbed-code-viewer .token.keyword{color:#00f}.tabbed-code-viewer .token.string{color:#a31515}.tabbed-code-viewer .token.number{color:#098658}.tabbed-code-viewer .token.operator{color:#000}.tabbed-code-viewer .token.function{color:#795e26}.tabbed-code-viewer .token.class-name{color:#267f99}.tabbed-code-viewer .token.punctuation{color:#000}[data-bs-theme=dark] .tabbed-code-viewer .token.comment,.dark .tabbed-code-viewer .token.comment{color:#6a9955}[data-bs-theme=dark] .tabbed-code-viewer .token.keyword,.dark .tabbed-code-viewer .token.keyword{color:#569cd6}[data-bs-theme=dark] .tabbed-code-viewer .token.string,.dark .tabbed-code-viewer .token.string{color:#ce9178}[data-bs-theme=dark] .tabbed-code-viewer .token.number,.dark .tabbed-code-viewer .token.number{color:#b5cea8}[data-bs-theme=dark] .tabbed-code-viewer .token.operator,.dark .tabbed-code-viewer .token.operator{color:#d4d4d4}[data-bs-theme=dark] .tabbed-code-viewer .token.function,.dark .tabbed-code-viewer .token.function{color:#dcdcaa}[data-bs-theme=dark] .tabbed-code-viewer .token.class-name,.dark .tabbed-code-viewer .token.class-name{color:#4ec9b0}[data-bs-theme=dark] .tabbed-code-viewer .token.punctuation,.dark .tabbed-code-viewer .token.punctuation{color:#d4d4d4}@media (max-width: 1200px){.layout-tabbed{padding:40px 60px}}@media (max-width: 900px){.layout-tabbed{padding:30px 40px}}@media (max-width: 600px){.layout-tabbed{padding:20px}.tabbed-tab-button{padding:8px 12px;font-size:12px}}')),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
var ie = Object.defineProperty;
var oe = (n, e, t) => e in n ? ie(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var g = (n, e, t) => oe(n, typeof e != "symbol" ? e + "" : e, t);
function K(n, e, t) {
  const r = n.createShader(e);
  if (!r)
    throw new Error("Failed to create shader object");
  if (n.shaderSource(r, t), n.compileShader(r), !n.getShaderParameter(r, n.COMPILE_STATUS)) {
    const c = n.getShaderInfoLog(r);
    throw n.deleteShader(r), new Error(`Shader compilation failed:
${c}`);
  }
  return r;
}
function ce(n, e, t) {
  const r = K(n, n.VERTEX_SHADER, e), i = K(n, n.FRAGMENT_SHADER, t), c = n.createProgram();
  if (!c)
    throw new Error("Failed to create program object");
  if (n.attachShader(c, r), n.attachShader(c, i), n.linkProgram(c), !n.getProgramParameter(c, n.LINK_STATUS)) {
    const o = n.getProgramInfoLog(c);
    throw n.deleteProgram(c), n.deleteShader(r), n.deleteShader(i), new Error(`Program linking failed:
${o}`);
  }
  return n.detachShader(c, r), n.detachShader(c, i), n.deleteShader(r), n.deleteShader(i), c;
}
function ue(n) {
  const e = n.createVertexArray();
  if (!e)
    throw new Error("Failed to create VAO");
  n.bindVertexArray(e);
  const t = new Float32Array([
    -1,
    -1,
    // Bottom-left
    3,
    -1,
    // Bottom-right (extends beyond viewport)
    -1,
    3
    // Top-left (extends beyond viewport)
  ]), r = n.createBuffer();
  if (!r)
    throw new Error("Failed to create VBO");
  return n.bindBuffer(n.ARRAY_BUFFER, r), n.bufferData(n.ARRAY_BUFFER, t, n.STATIC_DRAW), n.enableVertexAttribArray(0), n.vertexAttribPointer(
    0,
    // attribute location
    2,
    // size (vec2)
    n.FLOAT,
    // type
    !1,
    // normalized
    0,
    // stride
    0
    // offset
  ), n.bindVertexArray(null), n.bindBuffer(n.ARRAY_BUFFER, null), e;
}
function O(n, e, t) {
  const r = n.createTexture();
  if (!r)
    throw new Error("Failed to create texture");
  return n.bindTexture(n.TEXTURE_2D, r), n.texImage2D(
    n.TEXTURE_2D,
    0,
    // mip level
    n.RGBA32F,
    // internal format (32-bit float per channel)
    e,
    t,
    0,
    // border (must be 0)
    n.RGBA,
    // format
    n.FLOAT,
    // type
    null
    // no data (allocate only)
  ), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.bindTexture(n.TEXTURE_2D, null), r;
}
function Y(n, e) {
  const t = n.createFramebuffer();
  if (!t)
    throw new Error("Failed to create framebuffer");
  n.bindFramebuffer(n.FRAMEBUFFER, t), n.framebufferTexture2D(
    n.FRAMEBUFFER,
    n.COLOR_ATTACHMENT0,
    n.TEXTURE_2D,
    e,
    0
    // mip level
  );
  const r = n.checkFramebufferStatus(n.FRAMEBUFFER);
  if (r !== n.FRAMEBUFFER_COMPLETE)
    throw n.deleteFramebuffer(t), new Error(`Framebuffer incomplete: ${pe(n, r)}`);
  return n.bindFramebuffer(n.FRAMEBUFFER, null), t;
}
function le(n) {
  const e = n.createTexture();
  if (!e)
    throw new Error("Failed to create black texture");
  n.bindTexture(n.TEXTURE_2D, e);
  const t = new Float32Array([0, 0, 0, 1]);
  return n.texImage2D(
    n.TEXTURE_2D,
    0,
    n.RGBA32F,
    1,
    1,
    0,
    n.RGBA,
    n.FLOAT,
    t
  ), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.bindTexture(n.TEXTURE_2D, null), e;
}
function he(n) {
  const e = n.createTexture();
  if (!e)
    throw new Error("Failed to create keyboard texture");
  n.bindTexture(n.TEXTURE_2D, e);
  const t = 256, r = 3, i = new Float32Array(t * r * 4);
  return n.texImage2D(
    n.TEXTURE_2D,
    0,
    n.RGBA32F,
    t,
    r,
    0,
    n.RGBA,
    n.FLOAT,
    i
  ), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.bindTexture(n.TEXTURE_2D, null), e;
}
function de(n, e, t, r) {
  const p = new Float32Array(3072);
  for (let o = 0; o < 256; o++) {
    const m = t.get(o) || !1, b = r.get(o) || 0, T = (0 * 256 + o) * 4;
    p[T + 0] = m ? 1 : 0, p[T + 1] = m ? 1 : 0, p[T + 2] = m ? 1 : 0, p[T + 3] = 1;
    const E = (2 * 256 + o) * 4;
    p[E + 0] = b, p[E + 1] = b, p[E + 2] = b, p[E + 3] = 1;
  }
  n.bindTexture(n.TEXTURE_2D, e), n.texSubImage2D(
    n.TEXTURE_2D,
    0,
    0,
    0,
    // x, y offset
    256,
    3,
    n.RGBA,
    n.FLOAT,
    p
  ), n.bindTexture(n.TEXTURE_2D, null);
}
function pe(n, e) {
  switch (e) {
    case n.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
      return "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
    case n.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
      return "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
    case n.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
      return "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
    case n.FRAMEBUFFER_UNSUPPORTED:
      return "FRAMEBUFFER_UNSUPPORTED";
    case n.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE:
      return "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE";
    default:
      return `Unknown status: ${e}`;
  }
}
const fe = `#version 300 es
precision highp float;

layout(location = 0) in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`, J = `#version 300 es
precision highp float;

// Shadertoy compatibility: equirectangular texture sampling
const float ST_PI = 3.14159265359;
const float ST_TWOPI = 6.28318530718;
vec2 _st_dirToEquirect(vec3 dir) {
  float phi = atan(dir.z, dir.x);
  float theta = asin(dir.y);
  return vec2(phi / ST_TWOPI + 0.5, theta / ST_PI + 0.5);
}
`, me = J.split(`
`).length - 1;
class ge {
  constructor(e) {
    g(this, "project");
    g(this, "gl");
    g(this, "_width");
    g(this, "_height");
    g(this, "_frame", 0);
    g(this, "_time", 0);
    g(this, "_lastStepTime", null);
    g(this, "_passes", []);
    g(this, "_textures", []);
    g(this, "_keyboardTexture", null);
    g(this, "_blackTexture", null);
    // Keyboard state tracking (Maps keycodes to state)
    g(this, "_keyStates", /* @__PURE__ */ new Map());
    // true = down, false = up
    g(this, "_toggleStates", /* @__PURE__ */ new Map());
    // 0.0 or 1.0
    // Compilation errors (if any occurred during initialization)
    g(this, "_compilationErrors", []);
    this.gl = e.gl, this.project = e.project, this._width = this.gl.drawingBufferWidth, this._height = this.gl.drawingBufferHeight, this.initExtensions(), this._blackTexture = le(this.gl);
    const t = he(this.gl);
    this._keyboardTexture = {
      texture: t,
      width: 256,
      height: 3
    }, this.initProjectTextures(), this.initRuntimePasses();
  }
  // ===========================================================================
  // Public API
  // ===========================================================================
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get stats() {
    const e = this._lastStepTime === null ? 0 : this._time - this._lastStepTime;
    return {
      frame: this._frame,
      time: this._time,
      deltaTime: e,
      width: this._width,
      height: this._height
    };
  }
  /**
   * Get shader compilation errors (if any occurred during initialization).
   * Returns empty array if all shaders compiled successfully.
   */
  getCompilationErrors() {
    return this._compilationErrors;
  }
  /**
   * Check if there were any compilation errors.
   */
  hasErrors() {
    return this._compilationErrors.length > 0;
  }
  /**
   * Get the framebuffer for the Image pass (for presenting to screen).
   */
  getImageFramebuffer() {
    const e = this._passes.find((t) => t.name === "Image");
    return (e == null ? void 0 : e.framebuffer) ?? null;
  }
  /**
   * Run one full frame of all passes.
   *
   * @param timeSeconds - global time in seconds (monotone, from App)
   * @param mouse - iMouse as [x, y, clickX, clickY]
   */
  step(e, t) {
    const r = this.gl, i = this._lastStepTime === null ? 0 : e - this._lastStepTime;
    this._lastStepTime = e, this._time = e;
    const c = [this._width, this._height, 1], p = this._time, o = i, m = this._frame, b = t;
    r.viewport(0, 0, this._width, this._height);
    const T = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"];
    for (const E of T) {
      const x = this._passes.find((y) => y.name === E);
      x && (this.executePass(x, {
        iResolution: c,
        iTime: p,
        iTimeDelta: o,
        iFrame: m,
        iMouse: b
      }), this.swapPassTextures(x));
    }
    this._frame += 1;
  }
  /**
   * Resize all internal render targets to new width/height.
   * Does not reset time or frame count.
   */
  resize(e, t) {
    this._width = e, this._height = t;
    const r = this.gl;
    for (const i of this._passes)
      r.deleteTexture(i.currentTexture), r.deleteTexture(i.previousTexture), r.deleteFramebuffer(i.framebuffer), i.currentTexture = O(r, e, t), i.previousTexture = O(r, e, t), i.framebuffer = Y(r, i.currentTexture);
  }
  /**
   * Reset frame counter and clear all render targets.
   * Used for playback controls to restart shader from frame 0.
   */
  reset() {
    this._frame = 0;
    const e = this.gl;
    for (const t of this._passes)
      e.bindFramebuffer(e.FRAMEBUFFER, t.framebuffer), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.framebufferTexture2D(
        e.FRAMEBUFFER,
        e.COLOR_ATTACHMENT0,
        e.TEXTURE_2D,
        t.previousTexture,
        0
      ), e.clear(e.COLOR_BUFFER_BIT), e.framebufferTexture2D(
        e.FRAMEBUFFER,
        e.COLOR_ATTACHMENT0,
        e.TEXTURE_2D,
        t.currentTexture,
        0
      );
    e.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  /**
   * Update keyboard key state (called from App on keydown/keyup events).
   *
   * @param keycode ASCII keycode (e.g., 65 for 'A')
   * @param isDown true if key pressed, false if released
   */
  updateKeyState(e, t) {
    const r = this._keyStates.get(e) || !1;
    if (this._keyStates.set(e, t), t && !r) {
      const i = this._toggleStates.get(e) || 0;
      this._toggleStates.set(e, i === 0 ? 1 : 0);
    }
  }
  /**
   * Update keyboard texture with current key states.
   * Should be called once per frame before rendering.
   */
  updateKeyboardTexture() {
    this._keyboardTexture && de(
      this.gl,
      this._keyboardTexture.texture,
      this._keyStates,
      this._toggleStates
    );
  }
  /**
   * Delete all GL resources.
   */
  dispose() {
    const e = this.gl;
    for (const t of this._passes)
      e.deleteProgram(t.uniforms.program), e.deleteVertexArray(t.vao), e.deleteFramebuffer(t.framebuffer), e.deleteTexture(t.currentTexture), e.deleteTexture(t.previousTexture);
    for (const t of this._textures)
      e.deleteTexture(t.texture);
    this._keyboardTexture && e.deleteTexture(this._keyboardTexture.texture), this._blackTexture && e.deleteTexture(this._blackTexture), this._passes = [], this._textures = [], this._keyboardTexture = null, this._blackTexture = null;
  }
  // ===========================================================================
  // Initialization Helpers
  // ===========================================================================
  initExtensions() {
    const e = this.gl;
    if (!e.getExtension("EXT_color_buffer_float"))
      throw new Error(
        "EXT_color_buffer_float not supported. WebGL2 with float rendering is required."
      );
    e.getExtension("OES_texture_float_linear");
  }
  /**
   * Initialize external textures based on project.textures.
   *
   * NOTE: This function as written assumes that actual image loading
   * is handled elsewhere. For now we just construct an empty array.
   * In a real implementation, you would load images here.
   */
  initProjectTextures() {
    const e = this.gl;
    this._textures = [];
    for (const t of this.project.textures) {
      const r = e.createTexture();
      if (!r)
        throw new Error("Failed to create texture");
      e.bindTexture(e.TEXTURE_2D, r), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
      const i = {
        name: t.name,
        texture: r,
        width: 1,
        height: 1
      };
      this._textures.push(i);
      const c = new Image();
      c.crossOrigin = "anonymous", c.onload = () => {
        e.bindTexture(e.TEXTURE_2D, r), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, c);
        const p = t.filter === "nearest" ? e.NEAREST : e.LINEAR;
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, p), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, p);
        const o = t.wrap === "clamp" ? e.CLAMP_TO_EDGE : e.REPEAT;
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, o), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, o), t.filter === "linear" && e.generateMipmap(e.TEXTURE_2D), i.width = c.width, i.height = c.height, console.log(`Loaded texture '${t.name}': ${c.width}x${c.height}`);
      }, c.onerror = () => {
        console.error(`Failed to load texture '${t.name}' from ${t.source}`);
      }, c.src = t.source;
    }
  }
  /**
   * Compile shaders, create VAOs/FBOs/textures, and build RuntimePass array.
   */
  initRuntimePasses() {
    const e = this.gl, t = this.project, r = ue(e), i = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"];
    for (const c of i) {
      const p = t.passes[c];
      if (!p) continue;
      const o = this.buildFragmentShader(p.glslSource);
      try {
        const m = ce(e, fe, o), b = {
          program: m,
          iResolution: e.getUniformLocation(m, "iResolution"),
          iTime: e.getUniformLocation(m, "iTime"),
          iTimeDelta: e.getUniformLocation(m, "iTimeDelta"),
          iFrame: e.getUniformLocation(m, "iFrame"),
          iMouse: e.getUniformLocation(m, "iMouse"),
          iChannel: [
            e.getUniformLocation(m, "iChannel0"),
            e.getUniformLocation(m, "iChannel1"),
            e.getUniformLocation(m, "iChannel2"),
            e.getUniformLocation(m, "iChannel3")
          ]
        }, T = O(e, this._width, this._height), E = O(e, this._width, this._height), x = Y(e, T), y = {
          name: c,
          projectChannels: p.channels,
          vao: r,
          uniforms: b,
          framebuffer: x,
          currentTexture: T,
          previousTexture: E
        };
        this._passes.push(y);
      } catch (m) {
        const b = m instanceof Error ? m.message : String(m), T = this.getLineMapping(), E = b.match(/ERROR:\s*\d+:(\d+):/);
        let x = !1, y = null;
        if (E && this.project.commonSource) {
          const C = parseInt(E[1], 10), _ = T.boilerplateLinesBeforeCommon + 2, w = _ + T.commonLineCount - 1;
          C >= _ && C <= w && (x = !0, y = C - _ + 1);
        }
        this._compilationErrors.push({
          passName: c,
          error: b,
          source: o,
          isFromCommon: x,
          originalLine: y
        }), console.error(`Failed to compile ${c}:`, b);
      }
    }
  }
  /**
   * Calculate line number mappings for error reporting.
   * Returns info about where common.glsl code lives in the compiled shader.
   */
  getLineMapping() {
    const e = me + 1, t = this.project.commonSource ? this.project.commonSource.split(`
`).length : 0;
    return { boilerplateLinesBeforeCommon: e, commonLineCount: t };
  }
  /**
   * Build complete fragment shader source with Shadertoy boilerplate.
   */
  buildFragmentShader(e) {
    const t = [J];
    this.project.commonSource && (t.push("// Common code"), t.push(this.project.commonSource), t.push("")), t.push(`// Shadertoy built-in uniforms
uniform vec3  iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform int   iFrame;
uniform vec4  iMouse;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;
`);
    const r = this.preprocessCubemapTextures(e);
    return t.push("// User shader code"), t.push(r), t.push(""), t.push(`// Main wrapper
out vec4 fragColor;

void main() {
  mainImage(fragColor, gl_FragCoord.xy);
}`), t.join(`
`);
  }
  /**
   * Preprocess shader to convert cubemap-style texture() calls to equirectangular.
   * Detects: texture(iChannelN, vec3_expr) and converts to texture(iChannelN, _st_dirToEquirect(vec3_expr))
   */
  preprocessCubemapTextures(e) {
    const t = /texture\s*\(\s*(iChannel[0-3])\s*,\s*([^)]+)\)/g;
    return e.replace(t, (r, i, c) => c.includes("fragCoord") || // Using fragCoord directly
    c.includes("/") || // Division (likely uv calculation)
    /\.xy\s*$/.test(c.trim()) || // Ends with .xy swizzle
    /\.st\s*$/.test(c.trim()) || // Ends with .st swizzle
    /^vec2\s*\(/.test(c.trim()) ? r : `texture(${i}, _st_dirToEquirect(${c}))`);
  }
  // ===========================================================================
  // Pass Execution
  // ===========================================================================
  executePass(e, t) {
    const r = this.gl;
    r.bindFramebuffer(r.FRAMEBUFFER, e.framebuffer), r.useProgram(e.uniforms.program), r.bindVertexArray(e.vao), this.bindBuiltinUniforms(e.uniforms, t), this.bindChannelTextures(e), r.drawArrays(r.TRIANGLES, 0, 3), r.bindVertexArray(null), r.useProgram(null), r.bindFramebuffer(r.FRAMEBUFFER, null);
  }
  bindBuiltinUniforms(e, t) {
    const r = this.gl;
    e.iResolution && r.uniform3f(e.iResolution, t.iResolution[0], t.iResolution[1], t.iResolution[2]), e.iTime && r.uniform1f(e.iTime, t.iTime), e.iTimeDelta && r.uniform1f(e.iTimeDelta, t.iTimeDelta), e.iFrame && r.uniform1i(e.iFrame, t.iFrame), e.iMouse && r.uniform4f(e.iMouse, t.iMouse[0], t.iMouse[1], t.iMouse[2], t.iMouse[3]);
  }
  bindChannelTextures(e) {
    const t = this.gl;
    for (let r = 0; r < 4; r++) {
      const i = e.projectChannels[r], c = this.resolveChannelTexture(i, e.name);
      t.activeTexture(t.TEXTURE0 + r), t.bindTexture(t.TEXTURE_2D, c);
      const p = e.uniforms.iChannel[r];
      p && t.uniform1i(p, r);
    }
  }
  /**
   * Resolve a ChannelSource to an actual WebGLTexture to bind.
   */
  resolveChannelTexture(e, t) {
    switch (e.kind) {
      case "none":
        if (!this._blackTexture)
          throw new Error("Black texture not initialized");
        return this._blackTexture;
      case "buffer": {
        const i = this._passes.find((p) => p.name === e.buffer);
        if (!i)
          throw new Error(`Buffer '${e.buffer}' not found`);
        return e.buffer === t ? i.previousTexture : i.currentTexture;
      }
      case "texture2D": {
        const i = this._textures.find((c) => c.name === e.name);
        if (!i)
          throw new Error(`Texture '${e.name}' not found`);
        return i.texture;
      }
      case "keyboard":
        if (!this._keyboardTexture)
          throw new Error("Internal error: keyboard texture not initialized");
        return this._keyboardTexture.texture;
      default:
        const r = e;
        throw new Error(`Unknown channel source: ${JSON.stringify(r)}`);
    }
  }
  /**
   * Swap current and previous textures for a pass (ping-pong).
   * Also reattach framebuffer to new current texture.
   */
  swapPassTextures(e) {
    const t = this.gl, r = e.currentTexture;
    e.currentTexture = e.previousTexture, e.previousTexture = r, t.bindFramebuffer(t.FRAMEBUFFER, e.framebuffer), t.framebufferTexture2D(
      t.FRAMEBUFFER,
      t.COLOR_ATTACHMENT0,
      t.TEXTURE_2D,
      e.currentTexture,
      0
    ), t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
}
class Ee {
  constructor(e) {
    g(this, "container");
    g(this, "canvas");
    g(this, "gl");
    g(this, "engine");
    g(this, "project");
    g(this, "pixelRatio");
    g(this, "animationId", null);
    g(this, "startTime", 0);
    // Mouse state for iMouse uniform
    g(this, "mouse", [0, 0, -1, -1]);
    // FPS tracking
    g(this, "fpsDisplay");
    g(this, "frameCount", 0);
    g(this, "lastFpsUpdate", 0);
    g(this, "currentFps", 0);
    // Playback controls
    g(this, "controlsContainer", null);
    g(this, "playPauseButton", null);
    g(this, "isPaused", !1);
    // Error overlay
    g(this, "errorOverlay", null);
    // Resize observer
    g(this, "resizeObserver");
    // Visibility observer (auto-pause when off-screen)
    g(this, "intersectionObserver");
    g(this, "isVisible", !0);
    // ===========================================================================
    // Animation Loop
    // ===========================================================================
    g(this, "animate", (e) => {
      if (this.animationId = requestAnimationFrame(this.animate), this.isPaused || !this.isVisible)
        return;
      const t = e / 1e3, r = t - this.startTime;
      this.updateFps(t), this.engine.updateKeyboardTexture(), this.engine.step(r, this.mouse), this.presentToScreen();
    });
    this.container = e.container, this.project = e.project, this.pixelRatio = e.pixelRatio ?? window.devicePixelRatio, this.canvas = document.createElement("canvas"), this.canvas.style.width = "100%", this.canvas.style.height = "100%", this.canvas.style.display = "block", this.container.appendChild(this.canvas), this.fpsDisplay = document.createElement("div"), this.fpsDisplay.className = "fps-counter", this.fpsDisplay.textContent = "0 FPS", this.container.appendChild(this.fpsDisplay), e.project.controls && this.createControls();
    const t = this.canvas.getContext("webgl2", {
      alpha: !1,
      antialias: !1,
      depth: !1,
      stencil: !1,
      preserveDrawingBuffer: !0,
      // Required for screenshots
      powerPreference: "high-performance"
    });
    if (!t)
      throw new Error("WebGL2 not supported");
    this.gl = t, this.updateCanvasSize(), this.engine = new ge({
      gl: this.gl,
      project: e.project
    }), this.engine.hasErrors() && this.showErrorOverlay(this.engine.getCompilationErrors()), this.resizeObserver = new ResizeObserver(() => {
      this.updateCanvasSize(), this.engine.resize(this.canvas.width, this.canvas.height), this.startTime = performance.now() / 1e3, this.engine.reset();
    }), this.resizeObserver.observe(this.container), this.intersectionObserver = new IntersectionObserver(
      (r) => {
        const i = r[0];
        this.isVisible = i.isIntersecting;
      },
      { threshold: 0.1 }
      // Trigger when 10% visible
    ), this.intersectionObserver.observe(this.container), this.setupMouseTracking(), this.setupKeyboardTracking(), this.setupGlobalShortcuts(), e.project.controls && this.setupKeyboardShortcuts();
  }
  // ===========================================================================
  // Public API
  // ===========================================================================
  /**
   * Check if there were any shader compilation errors.
   * Returns true if the engine has errors and should not be started.
   */
  hasErrors() {
    return this.engine.hasErrors();
  }
  /**
   * Start the animation loop.
   */
  start() {
    this.animationId === null && (this.startTime = performance.now() / 1e3, this.animate(this.startTime));
  }
  /**
   * Stop the animation loop.
   */
  stop() {
    this.animationId !== null && (cancelAnimationFrame(this.animationId), this.animationId = null);
  }
  /**
   * Clean up all resources.
   */
  dispose() {
    this.stop(), this.resizeObserver.disconnect(), this.intersectionObserver.disconnect(), this.engine.dispose(), this.container.removeChild(this.canvas), this.container.removeChild(this.fpsDisplay);
  }
  /**
   * Update FPS counter.
   * Updates the display roughly once per second.
   */
  updateFps(e) {
    this.frameCount++, e - this.lastFpsUpdate >= 1 && (this.currentFps = this.frameCount / (e - this.lastFpsUpdate), this.fpsDisplay.textContent = `${Math.round(this.currentFps)} FPS`, this.frameCount = 0, this.lastFpsUpdate = e);
  }
  /**
   * Present the Image pass output to the screen.
   *
   * Since Image is the final pass and we execute all passes to their FBOs,
   * we need to blit the Image pass output to the default framebuffer.
   */
  presentToScreen() {
    const e = this.gl, t = this.engine.getImageFramebuffer();
    if (!t) {
      console.warn("No Image pass found");
      return;
    }
    e.bindFramebuffer(e.FRAMEBUFFER, null), e.clearColor(0, 0, 0, 1), e.clear(e.COLOR_BUFFER_BIT), e.bindFramebuffer(e.READ_FRAMEBUFFER, t), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.blitFramebuffer(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      // src
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      // dst
      e.COLOR_BUFFER_BIT,
      e.NEAREST
    ), e.bindFramebuffer(e.READ_FRAMEBUFFER, null);
  }
  // ===========================================================================
  // Resize Handling
  // ===========================================================================
  updateCanvasSize() {
    const e = this.container.getBoundingClientRect(), t = Math.floor(e.width * this.pixelRatio), r = Math.floor(e.height * this.pixelRatio);
    (this.canvas.width !== t || this.canvas.height !== r) && (this.canvas.width = t, this.canvas.height = r);
  }
  // ===========================================================================
  // Mouse Tracking
  // ===========================================================================
  setupMouseTracking() {
    const e = (r) => {
      const i = this.canvas.getBoundingClientRect(), c = (r.clientX - i.left) * this.pixelRatio, p = (i.height - (r.clientY - i.top)) * this.pixelRatio;
      this.mouse[0] = c, this.mouse[1] = p;
    }, t = (r) => {
      const i = this.canvas.getBoundingClientRect(), c = (r.clientX - i.left) * this.pixelRatio, p = (i.height - (r.clientY - i.top)) * this.pixelRatio;
      this.mouse[2] = c, this.mouse[3] = p;
    };
    this.canvas.addEventListener("mousemove", e), this.canvas.addEventListener("click", t);
  }
  // ===========================================================================
  // Playback Controls
  // ===========================================================================
  /**
   * Create playback control buttons (play/pause and reset).
   */
  createControls() {
    this.controlsContainer = document.createElement("div"), this.controlsContainer.className = "playback-controls", this.playPauseButton = document.createElement("button"), this.playPauseButton.className = "control-button", this.playPauseButton.title = "Play/Pause (Space)", this.playPauseButton.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path d="M5 3h2v10H5V3zm4 0h2v10H9V3z"/>
      </svg>
    `, this.playPauseButton.addEventListener("click", () => this.togglePlayPause());
    const e = document.createElement("button");
    e.className = "control-button", e.title = "Reset (R)", e.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
      </svg>
    `, e.addEventListener("click", () => this.reset());
    const t = document.createElement("button");
    t.className = "control-button", t.title = "Screenshot (S)", t.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
      </svg>
    `, t.addEventListener("click", () => this.screenshot()), this.controlsContainer.appendChild(this.playPauseButton), this.controlsContainer.appendChild(e), this.controlsContainer.appendChild(t), this.container.appendChild(this.controlsContainer);
  }
  /**
   * Set up keyboard tracking for shader keyboard texture.
   * Tracks all key presses/releases and forwards to engine.
   */
  setupKeyboardTracking() {
    document.addEventListener("keydown", (e) => {
      const t = e.keyCode;
      t >= 0 && t < 256 && this.engine.updateKeyState(t, !0);
    }), document.addEventListener("keyup", (e) => {
      const t = e.keyCode;
      t >= 0 && t < 256 && this.engine.updateKeyState(t, !1);
    });
  }
  /**
   * Set up global keyboard shortcuts (always available).
   */
  setupGlobalShortcuts() {
    document.addEventListener("keydown", (e) => {
      e.code === "KeyS" && !e.repeat && (e.preventDefault(), this.screenshot());
    });
  }
  /**
   * Set up keyboard shortcuts for playback control.
   */
  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      e.code === "Space" && !e.repeat && (e.preventDefault(), this.togglePlayPause()), e.code === "KeyR" && !e.repeat && (e.preventDefault(), this.reset());
    });
  }
  /**
   * Toggle between play and pause states.
   */
  togglePlayPause() {
    this.isPaused = !this.isPaused, this.updatePlayPauseButton();
  }
  /**
   * Reset the shader to frame 0.
   */
  reset() {
    this.startTime = performance.now() / 1e3, this.frameCount = 0, this.lastFpsUpdate = 0, this.engine.reset();
  }
  /**
   * Capture and download a screenshot of the current canvas as PNG.
   * Filename format: shadertoy-{folderName}-{timestamp}.png
   */
  screenshot() {
    const e = this.project.root.split("/").pop() || "shader", t = /* @__PURE__ */ new Date(), r = t.getFullYear().toString() + (t.getMonth() + 1).toString().padStart(2, "0") + t.getDate().toString().padStart(2, "0") + "-" + t.getHours().toString().padStart(2, "0") + t.getMinutes().toString().padStart(2, "0") + t.getSeconds().toString().padStart(2, "0"), i = `shadertoy-${e}-${r}.png`;
    this.canvas.toBlob((c) => {
      if (!c) {
        console.error("Failed to create screenshot blob");
        return;
      }
      const p = URL.createObjectURL(c), o = document.createElement("a");
      o.href = p, o.download = i, o.click(), URL.revokeObjectURL(p), console.log(`Screenshot saved: ${i}`);
    }, "image/png");
  }
  /**
   * Update play/pause button icon based on current state.
   */
  updatePlayPauseButton() {
    this.playPauseButton && (this.isPaused ? this.playPauseButton.innerHTML = `
        <svg viewBox="0 0 16 16">
          <path d="M4 3v10l8-5-8-5z"/>
        </svg>
      ` : this.playPauseButton.innerHTML = `
        <svg viewBox="0 0 16 16">
          <path d="M5 3h2v10H5V3zm4 0h2v10H9V3z"/>
        </svg>
      `);
  }
  // ===========================================================================
  // Error Handling
  // ===========================================================================
  /**
   * Display shader compilation errors in an overlay.
   */
  showErrorOverlay(e) {
    this.errorOverlay || (this.errorOverlay = document.createElement("div"), this.errorOverlay.className = "shader-error-overlay", this.container.appendChild(this.errorOverlay));
    const t = e.filter((b) => b.isFromCommon), r = e.filter((b) => !b.isFromCommon), o = [...t.length > 0 ? [t[0]] : [], ...r].map(({ passName: b, error: T, source: E, isFromCommon: x, originalLine: y }) => {
      const C = T.replace(`Shader compilation failed:
`, "");
      let _ = C;
      return x && y !== null && (_ = C.replace(/Line \d+:/, `Line ${y}:`), _ = _.replace(/ERROR:\s*\d+:(\d+):/, `ERROR: 0:${y}:`)), {
        passName: x ? "common.glsl" : b,
        error: this.parseShaderError(_),
        codeContext: x ? this.extractCodeContextFromCommon(y) : this.extractCodeContext(_, E)
      };
    }).map(({ passName: b, error: T, codeContext: E }) => `
      <div class="error-section">
        <div class="error-pass-name">${b}</div>
        <pre class="error-content">${this.escapeHTML(T)}</pre>
        ${E ? `<pre class="error-code-context">${E}</pre>` : ""}
      </div>
    `).join("");
    this.errorOverlay.innerHTML = `
      <div class="error-overlay-content">
        <div class="error-header">
          <span class="error-title">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="vertical-align: text-bottom;">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM3.5 7.5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9z"/>
            </svg>
            Shader Compilation Failed
          </span>
          <button class="error-close" title="Dismiss">×</button>
        </div>
        <div class="error-body">
          ${o}
        </div>
      </div>
    `;
    const m = this.errorOverlay.querySelector(".error-close");
    m && m.addEventListener("click", () => this.hideErrorOverlay());
  }
  /**
   * Parse and improve WebGL shader error messages.
   */
  parseShaderError(e) {
    return e.split(`
`).map((t) => {
      const r = t.match(/^ERROR:\s*(\d+):(\d+):\s*(.+)$/);
      if (r) {
        const [, , i, c] = r;
        return `Line ${i}: ${c}`;
      }
      return t;
    }).join(`
`);
  }
  /**
   * Extract code context around error line (±3 lines).
   * Returns HTML with the error line highlighted.
   */
  extractCodeContext(e, t) {
    const r = e.match(/ERROR:\s*\d+:(\d+):/);
    if (!r) return null;
    const i = parseInt(r[1], 10), c = t.split(`
`), p = 3, o = Math.max(0, i - p - 1), m = Math.min(c.length, i + p);
    return c.slice(o, m).map((E, x) => {
      const y = o + x + 1, C = y === i, _ = String(y).padStart(4, " "), w = this.escapeHTML(E);
      return C ? `<span class="error-line-highlight">${_} │ ${w}</span>` : `<span class="context-line">${_} │ ${w}</span>`;
    }).join("");
  }
  /**
   * Extract code context from common.glsl file.
   * Similar to extractCodeContext but uses the original common source.
   */
  extractCodeContextFromCommon(e) {
    const t = this.engine.project.commonSource;
    if (!t) return null;
    const r = t.split(`
`), i = 3, c = Math.max(0, e - i - 1), p = Math.min(r.length, e + i);
    return r.slice(c, p).map((b, T) => {
      const E = c + T + 1, x = E === e, y = String(E).padStart(4, " "), C = this.escapeHTML(b);
      return x ? `<span class="error-line-highlight">${y} │ ${C}</span>` : `<span class="context-line">${y} │ ${C}</span>`;
    }).join("");
  }
  /**
   * Escape HTML to prevent XSS.
   */
  escapeHTML(e) {
    const t = document.createElement("div");
    return t.textContent = e, t.innerHTML;
  }
  /**
   * Hide the error overlay.
   */
  hideErrorOverlay() {
    this.errorOverlay && (this.errorOverlay.remove(), this.errorOverlay = null);
  }
}
class be {
  constructor(e) {
    g(this, "container");
    g(this, "root");
    g(this, "canvasContainer");
    this.container = e.container, this.root = document.createElement("div"), this.root.className = "layout-fullscreen", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.root.appendChild(this.canvasContainer), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
}
class ve {
  constructor(e) {
    g(this, "container");
    g(this, "root");
    g(this, "canvasContainer");
    this.container = e.container, this.root = document.createElement("div"), this.root.className = "layout-centered", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.root.appendChild(this.canvasContainer), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
}
var Z = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ee = { exports: {} };
(function(n) {
  var e = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   */
  var t = function(r) {
    var i = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, c = 0, p = {}, o = {
      /**
       * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
       * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
       * additional languages or plugins yourself.
       *
       * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
       *
       * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.manual = true;
       * // add a new <script> to load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      manual: r.Prism && r.Prism.manual,
      /**
       * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
       * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
       * own worker, you don't want it to do this.
       *
       * By setting this value to `true`, Prism will not add its own listeners to the worker.
       *
       * You obviously have to change this value before Prism executes. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.disableWorkerMessageHandler = true;
       * // Load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      disableWorkerMessageHandler: r.Prism && r.Prism.disableWorkerMessageHandler,
      /**
       * A namespace for utility methods.
       *
       * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
       * change or disappear at any time.
       *
       * @namespace
       * @memberof Prism
       */
      util: {
        encode: function s(a) {
          return a instanceof m ? new m(a.type, s(a.content), a.alias) : Array.isArray(a) ? a.map(s) : a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
        },
        /**
         * Returns the name of the type of the given value.
         *
         * @param {any} o
         * @returns {string}
         * @example
         * type(null)      === 'Null'
         * type(undefined) === 'Undefined'
         * type(123)       === 'Number'
         * type('foo')     === 'String'
         * type(true)      === 'Boolean'
         * type([1, 2])    === 'Array'
         * type({})        === 'Object'
         * type(String)    === 'Function'
         * type(/abc+/)    === 'RegExp'
         */
        type: function(s) {
          return Object.prototype.toString.call(s).slice(8, -1);
        },
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: function(s) {
          return s.__id || Object.defineProperty(s, "__id", { value: ++c }), s.__id;
        },
        /**
         * Creates a deep clone of the given object.
         *
         * The main intended use of this function is to clone language definitions.
         *
         * @param {T} o
         * @param {Record<number, any>} [visited]
         * @returns {T}
         * @template T
         */
        clone: function s(a, u) {
          u = u || {};
          var l, h;
          switch (o.util.type(a)) {
            case "Object":
              if (h = o.util.objId(a), u[h])
                return u[h];
              l = /** @type {Record<string, any>} */
              {}, u[h] = l;
              for (var d in a)
                a.hasOwnProperty(d) && (l[d] = s(a[d], u));
              return (
                /** @type {any} */
                l
              );
            case "Array":
              return h = o.util.objId(a), u[h] ? u[h] : (l = [], u[h] = l, /** @type {Array} */
              /** @type {any} */
              a.forEach(function(v, f) {
                l[f] = s(v, u);
              }), /** @type {any} */
              l);
            default:
              return a;
          }
        },
        /**
         * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
         *
         * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
         *
         * @param {Element} element
         * @returns {string}
         */
        getLanguage: function(s) {
          for (; s; ) {
            var a = i.exec(s.className);
            if (a)
              return a[1].toLowerCase();
            s = s.parentElement;
          }
          return "none";
        },
        /**
         * Sets the Prism `language-xxxx` class of the given element.
         *
         * @param {Element} element
         * @param {string} language
         * @returns {void}
         */
        setLanguage: function(s, a) {
          s.className = s.className.replace(RegExp(i, "gi"), ""), s.classList.add("language-" + a);
        },
        /**
         * Returns the script element that is currently executing.
         *
         * This does __not__ work for line script element.
         *
         * @returns {HTMLScriptElement | null}
         */
        currentScript: function() {
          if (typeof document > "u")
            return null;
          if (document.currentScript && document.currentScript.tagName === "SCRIPT")
            return (
              /** @type {any} */
              document.currentScript
            );
          try {
            throw new Error();
          } catch (l) {
            var s = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(l.stack) || [])[1];
            if (s) {
              var a = document.getElementsByTagName("script");
              for (var u in a)
                if (a[u].src == s)
                  return a[u];
            }
            return null;
          }
        },
        /**
         * Returns whether a given class is active for `element`.
         *
         * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
         * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
         * given class is just the given class with a `no-` prefix.
         *
         * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
         * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
         * ancestors have the given class or the negated version of it, then the default activation will be returned.
         *
         * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
         * version of it, the class is considered active.
         *
         * @param {Element} element
         * @param {string} className
         * @param {boolean} [defaultActivation=false]
         * @returns {boolean}
         */
        isActive: function(s, a, u) {
          for (var l = "no-" + a; s; ) {
            var h = s.classList;
            if (h.contains(a))
              return !0;
            if (h.contains(l))
              return !1;
            s = s.parentElement;
          }
          return !!u;
        }
      },
      /**
       * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
       *
       * @namespace
       * @memberof Prism
       * @public
       */
      languages: {
        /**
         * The grammar for plain, unformatted text.
         */
        plain: p,
        plaintext: p,
        text: p,
        txt: p,
        /**
         * Creates a deep copy of the language with the given id and appends the given tokens.
         *
         * If a token in `redef` also appears in the copied language, then the existing token in the copied language
         * will be overwritten at its original position.
         *
         * ## Best practices
         *
         * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
         * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
         * understand the language definition because, normally, the order of tokens matters in Prism grammars.
         *
         * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
         * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
         *
         * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
         * @param {Grammar} redef The new tokens to append.
         * @returns {Grammar} The new language created.
         * @public
         * @example
         * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
         *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
         *     // at its original position
         *     'comment': { ... },
         *     // CSS doesn't have a 'color' token, so this token will be appended
         *     'color': /\b(?:red|green|blue)\b/
         * });
         */
        extend: function(s, a) {
          var u = o.util.clone(o.languages[s]);
          for (var l in a)
            u[l] = a[l];
          return u;
        },
        /**
         * Inserts tokens _before_ another token in a language definition or any other grammar.
         *
         * ## Usage
         *
         * This helper method makes it easy to modify existing languages. For example, the CSS language definition
         * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
         * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
         * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
         * this:
         *
         * ```js
         * Prism.languages.markup.style = {
         *     // token
         * };
         * ```
         *
         * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
         * before existing tokens. For the CSS example above, you would use it like this:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'cdata', {
         *     'style': {
         *         // token
         *     }
         * });
         * ```
         *
         * ## Special cases
         *
         * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
         * will be ignored.
         *
         * This behavior can be used to insert tokens after `before`:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'comment', {
         *     'comment': Prism.languages.markup.comment,
         *     // tokens after 'comment'
         * });
         * ```
         *
         * ## Limitations
         *
         * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
         * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
         * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
         * deleting properties which is necessary to insert at arbitrary positions.
         *
         * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
         * Instead, it will create a new object and replace all references to the target object with the new one. This
         * can be done without temporarily deleting properties, so the iteration order is well-defined.
         *
         * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
         * you hold the target object in a variable, then the value of the variable will not change.
         *
         * ```js
         * var oldMarkup = Prism.languages.markup;
         * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
         *
         * assert(oldMarkup !== Prism.languages.markup);
         * assert(newMarkup === Prism.languages.markup);
         * ```
         *
         * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
         * object to be modified.
         * @param {string} before The key to insert before.
         * @param {Grammar} insert An object containing the key-value pairs to be inserted.
         * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
         * object to be modified.
         *
         * Defaults to `Prism.languages`.
         * @returns {Grammar} The new grammar object.
         * @public
         */
        insertBefore: function(s, a, u, l) {
          l = l || /** @type {any} */
          o.languages;
          var h = l[s], d = {};
          for (var v in h)
            if (h.hasOwnProperty(v)) {
              if (v == a)
                for (var f in u)
                  u.hasOwnProperty(f) && (d[f] = u[f]);
              u.hasOwnProperty(v) || (d[v] = h[v]);
            }
          var F = l[s];
          return l[s] = d, o.languages.DFS(o.languages, function(A, M) {
            M === F && A != s && (this[A] = d);
          }), d;
        },
        // Traverse a language definition with Depth First Search
        DFS: function s(a, u, l, h) {
          h = h || {};
          var d = o.util.objId;
          for (var v in a)
            if (a.hasOwnProperty(v)) {
              u.call(a, v, a[v], l || v);
              var f = a[v], F = o.util.type(f);
              F === "Object" && !h[d(f)] ? (h[d(f)] = !0, s(f, u, null, h)) : F === "Array" && !h[d(f)] && (h[d(f)] = !0, s(f, u, v, h));
            }
        }
      },
      plugins: {},
      /**
       * This is the most high-level function in Prism’s API.
       * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
       * each one of them.
       *
       * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
       *
       * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
       * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
       * @memberof Prism
       * @public
       */
      highlightAll: function(s, a) {
        o.highlightAllUnder(document, s, a);
      },
      /**
       * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
       * {@link Prism.highlightElement} on each one of them.
       *
       * The following hooks will be run:
       * 1. `before-highlightall`
       * 2. `before-all-elements-highlight`
       * 3. All hooks of {@link Prism.highlightElement} for each element.
       *
       * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
       * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
       * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
       * @memberof Prism
       * @public
       */
      highlightAllUnder: function(s, a, u) {
        var l = {
          callback: u,
          container: s,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        o.hooks.run("before-highlightall", l), l.elements = Array.prototype.slice.apply(l.container.querySelectorAll(l.selector)), o.hooks.run("before-all-elements-highlight", l);
        for (var h = 0, d; d = l.elements[h++]; )
          o.highlightElement(d, a === !0, l.callback);
      },
      /**
       * Highlights the code inside a single element.
       *
       * The following hooks will be run:
       * 1. `before-sanity-check`
       * 2. `before-highlight`
       * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
       * 4. `before-insert`
       * 5. `after-highlight`
       * 6. `complete`
       *
       * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
       * the element's language.
       *
       * @param {Element} element The element containing the code.
       * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
       * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
       * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
       * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
       *
       * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
       * asynchronous highlighting to work. You can build your own bundle on the
       * [Download page](https://prismjs.com/download.html).
       * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
       * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
       * @memberof Prism
       * @public
       */
      highlightElement: function(s, a, u) {
        var l = o.util.getLanguage(s), h = o.languages[l];
        o.util.setLanguage(s, l);
        var d = s.parentElement;
        d && d.nodeName.toLowerCase() === "pre" && o.util.setLanguage(d, l);
        var v = s.textContent, f = {
          element: s,
          language: l,
          grammar: h,
          code: v
        };
        function F(M) {
          f.highlightedCode = M, o.hooks.run("before-insert", f), f.element.innerHTML = f.highlightedCode, o.hooks.run("after-highlight", f), o.hooks.run("complete", f), u && u.call(f.element);
        }
        if (o.hooks.run("before-sanity-check", f), d = f.element.parentElement, d && d.nodeName.toLowerCase() === "pre" && !d.hasAttribute("tabindex") && d.setAttribute("tabindex", "0"), !f.code) {
          o.hooks.run("complete", f), u && u.call(f.element);
          return;
        }
        if (o.hooks.run("before-highlight", f), !f.grammar) {
          F(o.util.encode(f.code));
          return;
        }
        if (a && r.Worker) {
          var A = new Worker(o.filename);
          A.onmessage = function(M) {
            F(M.data);
          }, A.postMessage(JSON.stringify({
            language: f.language,
            code: f.code,
            immediateClose: !0
          }));
        } else
          F(o.highlight(f.code, f.grammar, f.language));
      },
      /**
       * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
       * and the language definitions to use, and returns a string with the HTML produced.
       *
       * The following hooks will be run:
       * 1. `before-tokenize`
       * 2. `after-tokenize`
       * 3. `wrap`: On each {@link Token}.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @param {string} language The name of the language definition passed to `grammar`.
       * @returns {string} The highlighted HTML.
       * @memberof Prism
       * @public
       * @example
       * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
       */
      highlight: function(s, a, u) {
        var l = {
          code: s,
          grammar: a,
          language: u
        };
        if (o.hooks.run("before-tokenize", l), !l.grammar)
          throw new Error('The language "' + l.language + '" has no grammar.');
        return l.tokens = o.tokenize(l.code, l.grammar), o.hooks.run("after-tokenize", l), m.stringify(o.util.encode(l.tokens), l.language);
      },
      /**
       * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
       * and the language definitions to use, and returns an array with the tokenized code.
       *
       * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
       *
       * This method could be useful in other contexts as well, as a very crude parser.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @returns {TokenStream} An array of strings and tokens, a token stream.
       * @memberof Prism
       * @public
       * @example
       * let code = `var foo = 0;`;
       * let tokens = Prism.tokenize(code, Prism.languages.javascript);
       * tokens.forEach(token => {
       *     if (token instanceof Prism.Token && token.type === 'number') {
       *         console.log(`Found numeric literal: ${token.content}`);
       *     }
       * });
       */
      tokenize: function(s, a) {
        var u = a.rest;
        if (u) {
          for (var l in u)
            a[l] = u[l];
          delete a.rest;
        }
        var h = new E();
        return x(h, h.head, s), T(s, h, a, h.head, 0), C(h);
      },
      /**
       * @namespace
       * @memberof Prism
       * @public
       */
      hooks: {
        all: {},
        /**
         * Adds the given callback to the list of callbacks for the given hook.
         *
         * The callback will be invoked when the hook it is registered for is run.
         * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
         *
         * One callback function can be registered to multiple hooks and the same hook multiple times.
         *
         * @param {string} name The name of the hook.
         * @param {HookCallback} callback The callback function which is given environment variables.
         * @public
         */
        add: function(s, a) {
          var u = o.hooks.all;
          u[s] = u[s] || [], u[s].push(a);
        },
        /**
         * Runs a hook invoking all registered callbacks with the given environment variables.
         *
         * Callbacks will be invoked synchronously and in the order in which they were registered.
         *
         * @param {string} name The name of the hook.
         * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
         * @public
         */
        run: function(s, a) {
          var u = o.hooks.all[s];
          if (!(!u || !u.length))
            for (var l = 0, h; h = u[l++]; )
              h(a);
        }
      },
      Token: m
    };
    r.Prism = o;
    function m(s, a, u, l) {
      this.type = s, this.content = a, this.alias = u, this.length = (l || "").length | 0;
    }
    m.stringify = function s(a, u) {
      if (typeof a == "string")
        return a;
      if (Array.isArray(a)) {
        var l = "";
        return a.forEach(function(F) {
          l += s(F, u);
        }), l;
      }
      var h = {
        type: a.type,
        content: s(a.content, u),
        tag: "span",
        classes: ["token", a.type],
        attributes: {},
        language: u
      }, d = a.alias;
      d && (Array.isArray(d) ? Array.prototype.push.apply(h.classes, d) : h.classes.push(d)), o.hooks.run("wrap", h);
      var v = "";
      for (var f in h.attributes)
        v += " " + f + '="' + (h.attributes[f] || "").replace(/"/g, "&quot;") + '"';
      return "<" + h.tag + ' class="' + h.classes.join(" ") + '"' + v + ">" + h.content + "</" + h.tag + ">";
    };
    function b(s, a, u, l) {
      s.lastIndex = a;
      var h = s.exec(u);
      if (h && l && h[1]) {
        var d = h[1].length;
        h.index += d, h[0] = h[0].slice(d);
      }
      return h;
    }
    function T(s, a, u, l, h, d) {
      for (var v in u)
        if (!(!u.hasOwnProperty(v) || !u[v])) {
          var f = u[v];
          f = Array.isArray(f) ? f : [f];
          for (var F = 0; F < f.length; ++F) {
            if (d && d.cause == v + "," + F)
              return;
            var A = f[F], M = A.inside, D = !!A.lookbehind, V = !!A.greedy, ne = A.alias;
            if (V && !A.pattern.global) {
              var re = A.pattern.toString().match(/[imsuy]*$/)[0];
              A.pattern = RegExp(A.pattern.source, re + "g");
            }
            for (var q = A.pattern || A, S = l.next, B = h; S !== a.tail && !(d && B >= d.reach); B += S.value.length, S = S.next) {
              var P = S.value;
              if (a.length > s.length)
                return;
              if (!(P instanceof m)) {
                var I = 1, L;
                if (V) {
                  if (L = b(q, B, s, D), !L || L.index >= s.length)
                    break;
                  var $ = L.index, ae = L.index + L[0].length, k = B;
                  for (k += S.value.length; $ >= k; )
                    S = S.next, k += S.value.length;
                  if (k -= S.value.length, B = k, S.value instanceof m)
                    continue;
                  for (var U = S; U !== a.tail && (k < ae || typeof U.value == "string"); U = U.next)
                    I++, k += U.value.length;
                  I--, P = s.slice(B, k), L.index -= B;
                } else if (L = b(q, 0, P, D), !L)
                  continue;
                var $ = L.index, z = L[0], H = P.slice(0, $), W = P.slice($ + z.length), X = B + P.length;
                d && X > d.reach && (d.reach = X);
                var N = S.prev;
                H && (N = x(a, N, H), B += H.length), y(a, N, I);
                var se = new m(v, M ? o.tokenize(z, M) : z, ne, z);
                if (S = x(a, N, se), W && x(a, S, W), I > 1) {
                  var G = {
                    cause: v + "," + F,
                    reach: X
                  };
                  T(s, a, u, S.prev, B, G), d && G.reach > d.reach && (d.reach = G.reach);
                }
              }
            }
          }
        }
    }
    function E() {
      var s = { value: null, prev: null, next: null }, a = { value: null, prev: s, next: null };
      s.next = a, this.head = s, this.tail = a, this.length = 0;
    }
    function x(s, a, u) {
      var l = a.next, h = { value: u, prev: a, next: l };
      return a.next = h, l.prev = h, s.length++, h;
    }
    function y(s, a, u) {
      for (var l = a.next, h = 0; h < u && l !== s.tail; h++)
        l = l.next;
      a.next = l, l.prev = a, s.length -= h;
    }
    function C(s) {
      for (var a = [], u = s.head.next; u !== s.tail; )
        a.push(u.value), u = u.next;
      return a;
    }
    if (!r.document)
      return r.addEventListener && (o.disableWorkerMessageHandler || r.addEventListener("message", function(s) {
        var a = JSON.parse(s.data), u = a.language, l = a.code, h = a.immediateClose;
        r.postMessage(o.highlight(l, o.languages[u], u)), h && r.close();
      }, !1)), o;
    var _ = o.util.currentScript();
    _ && (o.filename = _.src, _.hasAttribute("data-manual") && (o.manual = !0));
    function w() {
      o.manual || o.highlightAll();
    }
    if (!o.manual) {
      var R = document.readyState;
      R === "loading" || R === "interactive" && _ && _.defer ? document.addEventListener("DOMContentLoaded", w) : window.requestAnimationFrame ? window.requestAnimationFrame(w) : window.setTimeout(w, 16);
    }
    return o;
  }(e);
  n.exports && (n.exports = t), typeof Z < "u" && (Z.Prism = t), t.languages.markup = {
    comment: {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
      greedy: !0
    },
    prolog: {
      pattern: /<\?[\s\S]+?\?>/,
      greedy: !0
    },
    doctype: {
      // https://www.w3.org/TR/xml/#NT-doctypedecl
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: !0,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: !0,
          greedy: !0,
          inside: null
          // see below
        },
        string: {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: !0
        },
        punctuation: /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        name: /[^\s<>'"]+/
      }
    },
    cdata: {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      greedy: !0
    },
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            punctuation: [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              {
                pattern: /^(\s*)["']|["']$/,
                lookbehind: !0
              }
            ]
          }
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/
          }
        }
      }
    },
    entity: [
      {
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
      },
      /&#x?[\da-f]{1,8};/i
    ]
  }, t.languages.markup.tag.inside["attr-value"].inside.entity = t.languages.markup.entity, t.languages.markup.doctype.inside["internal-subset"].inside = t.languages.markup, t.hooks.add("wrap", function(r) {
    r.type === "entity" && (r.attributes.title = r.content.replace(/&amp;/, "&"));
  }), Object.defineProperty(t.languages.markup.tag, "addInlined", {
    /**
     * Adds an inlined language to markup.
     *
     * An example of an inlined language is CSS with `<style>` tags.
     *
     * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addInlined('style', 'css');
     */
    value: function(i, c) {
      var p = {};
      p["language-" + c] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: t.languages[c]
      }, p.cdata = /^<!\[CDATA\[|\]\]>$/i;
      var o = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: p
        }
      };
      o["language-" + c] = {
        pattern: /[\s\S]+/,
        inside: t.languages[c]
      };
      var m = {};
      m[i] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
          return i;
        }), "i"),
        lookbehind: !0,
        greedy: !0,
        inside: o
      }, t.languages.insertBefore("markup", "cdata", m);
    }
  }), Object.defineProperty(t.languages.markup.tag, "addAttribute", {
    /**
     * Adds an pattern to highlight languages embedded in HTML attributes.
     *
     * An example of an inlined language is CSS with `style` attributes.
     *
     * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addAttribute('style', 'css');
     */
    value: function(r, i) {
      t.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          /(^|["'\s])/.source + "(?:" + r + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
          "i"
        ),
        lookbehind: !0,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [i, "language-" + i],
                inside: t.languages[i]
              },
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          }
        }
      });
    }
  }), t.languages.html = t.languages.markup, t.languages.mathml = t.languages.markup, t.languages.svg = t.languages.markup, t.languages.xml = t.languages.extend("markup", {}), t.languages.ssml = t.languages.xml, t.languages.atom = t.languages.xml, t.languages.rss = t.languages.xml, function(r) {
    var i = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    r.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + i.source + ")*?" + /(?:;|(?=\s*\{))/.source),
        inside: {
          rule: /^@[\w-]+/,
          "selector-function-argument": {
            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: !0,
            alias: "selector"
          },
          keyword: {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: !0
          }
          // See rest below
        }
      },
      url: {
        // https://drafts.csswg.org/css-values-3/#urls
        pattern: RegExp("\\burl\\((?:" + i.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
        greedy: !0,
        inside: {
          function: /^url/i,
          punctuation: /^\(|\)$/,
          string: {
            pattern: RegExp("^" + i.source + "$"),
            alias: "url"
          }
        }
      },
      selector: {
        pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + i.source + ")*(?=\\s*\\{)"),
        lookbehind: !0
      },
      string: {
        pattern: i,
        greedy: !0
      },
      property: {
        pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: !0
      },
      important: /!important\b/i,
      function: {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: !0
      },
      punctuation: /[(){};:,]/
    }, r.languages.css.atrule.inside.rest = r.languages.css;
    var c = r.languages.markup;
    c && (c.tag.addInlined("style", "css"), c.tag.addAttribute("style", "css"));
  }(t), t.languages.clike = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
      }
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0
    },
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: !0,
      inside: {
        punctuation: /[.\\]/
      }
    },
    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
  }, t.languages.javascript = t.languages.extend("clike", {
    "class-name": [
      t.languages.clike["class-name"],
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0
      }
    ],
    keyword: [
      {
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: !0
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
      }
    ],
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
      pattern: RegExp(
        /(^|[^\w$])/.source + "(?:" + // constant
        (/NaN|Infinity/.source + "|" + // binary integer
        /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
        /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
        /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
        /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
        /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
      ),
      lookbehind: !0
    },
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
  }), t.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, t.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: RegExp(
        // lookbehind
        // eslint-disable-next-line regexp/no-dupe-characters-character-class
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
        // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
        // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
        // with the only syntax, so we have to define 2 different regex patterns.
        /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
        /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
        /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: "language-regex",
          inside: t.languages.regex
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/
      }
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    "function-variable": {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function"
    },
    parameter: [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: t.languages.javascript
      },
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: t.languages.javascript
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: t.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: t.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  }), t.languages.insertBefore("javascript", "string", {
    hashbang: {
      pattern: /^#!.*/,
      greedy: !0,
      alias: "comment"
    },
    "template-string": {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            rest: t.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    },
    "string-property": {
      pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: "property"
    }
  }), t.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: "property"
    }
  }), t.languages.markup && (t.languages.markup.tag.addInlined("script", "javascript"), t.languages.markup.tag.addAttribute(
    /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
    "javascript"
  )), t.languages.js = t.languages.javascript, function() {
    if (typeof t > "u" || typeof document > "u")
      return;
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
    var r = "Loading…", i = function(_, w) {
      return "✖ Error " + _ + " while fetching file: " + w;
    }, c = "✖ Error: File does not exist or is empty", p = {
      js: "javascript",
      py: "python",
      rb: "ruby",
      ps1: "powershell",
      psm1: "powershell",
      sh: "bash",
      bat: "batch",
      h: "c",
      tex: "latex"
    }, o = "data-src-status", m = "loading", b = "loaded", T = "failed", E = "pre[data-src]:not([" + o + '="' + b + '"]):not([' + o + '="' + m + '"])';
    function x(_, w, R) {
      var s = new XMLHttpRequest();
      s.open("GET", _, !0), s.onreadystatechange = function() {
        s.readyState == 4 && (s.status < 400 && s.responseText ? w(s.responseText) : s.status >= 400 ? R(i(s.status, s.statusText)) : R(c));
      }, s.send(null);
    }
    function y(_) {
      var w = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(_ || "");
      if (w) {
        var R = Number(w[1]), s = w[2], a = w[3];
        return s ? a ? [R, Number(a)] : [R, void 0] : [R, R];
      }
    }
    t.hooks.add("before-highlightall", function(_) {
      _.selector += ", " + E;
    }), t.hooks.add("before-sanity-check", function(_) {
      var w = (
        /** @type {HTMLPreElement} */
        _.element
      );
      if (w.matches(E)) {
        _.code = "", w.setAttribute(o, m);
        var R = w.appendChild(document.createElement("CODE"));
        R.textContent = r;
        var s = w.getAttribute("data-src"), a = _.language;
        if (a === "none") {
          var u = (/\.(\w+)$/.exec(s) || [, "none"])[1];
          a = p[u] || u;
        }
        t.util.setLanguage(R, a), t.util.setLanguage(w, a);
        var l = t.plugins.autoloader;
        l && l.loadLanguages(a), x(
          s,
          function(h) {
            w.setAttribute(o, b);
            var d = y(w.getAttribute("data-range"));
            if (d) {
              var v = h.split(/\r\n?|\n/g), f = d[0], F = d[1] == null ? v.length : d[1];
              f < 0 && (f += v.length), f = Math.max(0, Math.min(f - 1, v.length)), F < 0 && (F += v.length), F = Math.max(0, Math.min(F, v.length)), h = v.slice(f, F).join(`
`), w.hasAttribute("data-start") || w.setAttribute("data-start", String(f + 1));
            }
            R.textContent = h, t.highlightElement(R);
          },
          function(h) {
            w.setAttribute(o, T), R.textContent = h;
          }
        );
      }
    }), t.plugins.fileHighlight = {
      /**
       * Executes the File Highlight plugin for all matching `pre` elements under the given container.
       *
       * Note: Elements which are already loaded or currently loading will not be touched by this method.
       *
       * @param {ParentNode} [container=document]
       */
      highlight: function(w) {
        for (var R = (w || document).querySelectorAll(E), s = 0, a; a = R[s++]; )
          t.highlightElement(a);
      }
    };
    var C = !1;
    t.fileHighlight = function() {
      C || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), C = !0), t.plugins.fileHighlight.highlight.apply(this, arguments);
    };
  }();
})(ee);
var te = ee.exports;
Prism.languages.c = Prism.languages.extend("clike", {
  comment: {
    pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0
  },
  string: {
    // https://en.cppreference.com/w/c/language/string_literal
    pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    greedy: !0
  },
  "class-name": {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0
  },
  keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
  function: /\b[a-z_]\w*(?=\s*\()/i,
  number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
});
Prism.languages.insertBefore("c", "string", {
  char: {
    // https://en.cppreference.com/w/c/language/character_constant
    pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
    greedy: !0
  }
});
Prism.languages.insertBefore("c", "string", {
  macro: {
    // allow for multiline macro definitions
    // spaces after the # character compile fine with gcc
    pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
    lookbehind: !0,
    greedy: !0,
    alias: "property",
    inside: {
      string: [
        {
          // highlight the path of the include statement as a string
          pattern: /^(#\s*include\s*)<[^>]+>/,
          lookbehind: !0
        },
        Prism.languages.c.string
      ],
      char: Prism.languages.c.char,
      comment: Prism.languages.c.comment,
      "macro-name": [
        {
          pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
          lookbehind: !0
        },
        {
          pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
          lookbehind: !0,
          alias: "function"
        }
      ],
      // highlight macro directives as keywords
      directive: {
        pattern: /^(#\s*)[a-z]+/,
        lookbehind: !0,
        alias: "keyword"
      },
      "directive-hash": /^#/,
      punctuation: /##|\\(?=[\r\n])/,
      expression: {
        pattern: /\S[\s\S]*/,
        inside: Prism.languages.c
      }
    }
  }
});
Prism.languages.insertBefore("c", "function", {
  // highlight predefined macros as constants
  constant: /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
});
delete Prism.languages.c.boolean;
(function(n) {
  var e = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/, t = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function() {
    return e.source;
  });
  n.languages.cpp = n.languages.extend("c", {
    "class-name": [
      {
        pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g, function() {
          return e.source;
        })),
        lookbehind: !0
      },
      // This is intended to capture the class name of method implementations like:
      //   void foo::bar() const {}
      // However! The `foo` in the above example could also be a namespace, so we only capture the class name if
      // it starts with an uppercase letter. This approximation should give decent results.
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      // This will capture the class name before destructors like:
      //   Foo::~Foo() {}
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      // This also intends to capture the class name of method implementations but here the class has template
      // parameters, so it can't be a namespace (until C++ adds generic namespaces).
      /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
    ],
    keyword: e,
    number: {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0
    },
    operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:false|true)\b/
  }), n.languages.insertBefore("cpp", "string", {
    module: {
      // https://en.cppreference.com/w/cpp/language/modules
      pattern: RegExp(
        /(\b(?:import|module)\s+)/.source + "(?:" + // header-name
        /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source + "|" + // module name or partition or both
        /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g, function() {
          return t;
        }) + ")"
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        string: /^[<"][\s\S]+/,
        operator: /:/,
        punctuation: /\./
      }
    },
    "raw-string": {
      pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
      alias: "string",
      greedy: !0
    }
  }), n.languages.insertBefore("cpp", "keyword", {
    "generic-function": {
      pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
      inside: {
        function: /^\w+/,
        generic: {
          pattern: /<[\s\S]+/,
          alias: "class-name",
          inside: n.languages.cpp
        }
      }
    }
  }), n.languages.insertBefore("cpp", "operator", {
    "double-colon": {
      pattern: /::/,
      alias: "punctuation"
    }
  }), n.languages.insertBefore("cpp", "class-name", {
    // the base clause is an optional list of parent classes
    // https://en.cppreference.com/w/cpp/language/class
    "base-clause": {
      pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
      lookbehind: !0,
      greedy: !0,
      inside: n.languages.extend("cpp", {})
    }
  }), n.languages.insertBefore("inside", "double-colon", {
    // All untokenized words that are not namespaces should be class names
    "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
  }, n.languages.cpp["base-clause"]);
})(Prism);
class Te {
  constructor(e) {
    g(this, "container");
    g(this, "project");
    g(this, "root");
    g(this, "canvasContainer");
    g(this, "codePanel");
    this.container = e.container, this.project = e.project, this.root = document.createElement("div"), this.root.className = "layout-split", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.codePanel = document.createElement("div"), this.codePanel.className = "code-panel", this.buildCodePanel(), this.root.appendChild(this.canvasContainer), this.root.appendChild(this.codePanel), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
  /**
   * Build the code panel with tabs for each shader pass.
   * Uses Prism.js with C++ syntax highlighting (lightweight, works well for GLSL).
   */
  buildCodePanel() {
    const e = [];
    this.project.commonSource && e.push({ name: "common.glsl", source: this.project.commonSource });
    const t = [
      "BufferA",
      "BufferB",
      "BufferC",
      "BufferD"
    ];
    for (const E of t) {
      const x = this.project.passes[E];
      x && e.push({
        name: `${E.toLowerCase()}.glsl`,
        source: x.glslSource
      });
    }
    const r = this.project.passes.Image;
    e.push({ name: "image.glsl", source: r.glslSource });
    const i = document.createElement("div");
    i.className = "tab-bar";
    const c = document.createElement("div");
    c.className = "code-viewer";
    const p = document.createElement("button");
    p.className = "copy-button", p.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z" opacity="0.4"/>
        <path d="M2 5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2zm0 1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>
      </svg>
    `, p.title = "Copy code to clipboard";
    let o = "";
    const m = p.innerHTML, b = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
      </svg>
    `, T = (E) => {
      const x = e[E];
      o = x.source;
      const y = document.createElement("pre"), C = document.createElement("code");
      C.className = "language-cpp", C.textContent = x.source, y.appendChild(C), c.innerHTML = "", c.appendChild(y), te.highlightElement(C);
    };
    p.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(o), p.innerHTML = b, p.classList.add("copied"), setTimeout(() => {
          p.innerHTML = m, p.classList.remove("copied");
        }, 1500);
      } catch (E) {
        console.error("Failed to copy:", E);
      }
    }), e.forEach((E, x) => {
      const y = document.createElement("button");
      y.className = "tab-button", y.textContent = E.name, x === 0 && y.classList.add("active"), y.addEventListener("click", () => {
        i.querySelectorAll(".tab-button").forEach((C) => C.classList.remove("active")), y.classList.add("active"), T(x);
      }), i.appendChild(y);
    }), this.codePanel.appendChild(i), this.codePanel.appendChild(p), this.codePanel.appendChild(c), e.length > 0 && T(0);
  }
}
class xe {
  constructor(e) {
    g(this, "container");
    g(this, "project");
    g(this, "root");
    g(this, "canvasContainer");
    g(this, "contentArea");
    g(this, "codeViewer");
    g(this, "copyButton");
    this.container = e.container, this.project = e.project, this.root = document.createElement("div"), this.root.className = "layout-tabbed";
    const t = document.createElement("div");
    t.className = "tabbed-wrapper", this.contentArea = document.createElement("div"), this.contentArea.className = "tabbed-content", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "tabbed-canvas-container", this.codeViewer = document.createElement("div"), this.codeViewer.className = "tabbed-code-viewer", this.codeViewer.style.visibility = "hidden", this.copyButton = document.createElement("button"), this.copyButton.className = "tabbed-copy-button", this.copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z" opacity="0.4"/>
        <path d="M2 5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2zm0 1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>
      </svg>
    `, this.copyButton.title = "Copy code to clipboard", this.copyButton.style.visibility = "hidden", this.contentArea.appendChild(this.canvasContainer), this.contentArea.appendChild(this.codeViewer), this.contentArea.appendChild(this.copyButton);
    const r = this.buildTabBar();
    t.appendChild(r), t.appendChild(this.contentArea), this.root.appendChild(t), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
  buildTabBar() {
    const e = document.createElement("div");
    e.className = "tabbed-tab-bar";
    const t = [];
    t.push({ name: "Shader", isShader: !0 }), this.project.commonSource && t.push({ name: "common.glsl", isShader: !1, source: this.project.commonSource });
    const r = [
      "BufferA",
      "BufferB",
      "BufferC",
      "BufferD"
    ];
    for (const b of r) {
      const T = this.project.passes[b];
      T && t.push({
        name: `${b.toLowerCase()}.glsl`,
        isShader: !1,
        source: T.glslSource
      });
    }
    const i = this.project.passes.Image;
    t.push({ name: "image.glsl", isShader: !1, source: i.glslSource });
    let c = "";
    const p = this.copyButton.innerHTML, o = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
      </svg>
    `;
    this.copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(c), this.copyButton.innerHTML = o, this.copyButton.classList.add("copied"), setTimeout(() => {
          this.copyButton.innerHTML = p, this.copyButton.classList.remove("copied");
        }, 1500);
      } catch (b) {
        console.error("Failed to copy:", b);
      }
    });
    const m = (b) => {
      const T = t[b];
      if (e.querySelectorAll(".tabbed-tab-button").forEach((E, x) => {
        E.classList.toggle("active", x === b);
      }), T.isShader)
        this.canvasContainer.style.visibility = "visible", this.codeViewer.style.visibility = "hidden", this.copyButton.style.visibility = "hidden";
      else {
        this.canvasContainer.style.visibility = "hidden", this.codeViewer.style.visibility = "visible", this.copyButton.style.visibility = "visible", c = T.source || "";
        const E = c.split(`
`), x = document.createElement("pre"), y = document.createElement("div");
        y.className = "tabbed-line-numbers", y.innerHTML = E.map((w, R) => R + 1).join(`
`);
        const C = document.createElement("div");
        C.className = "tabbed-code-content";
        const _ = document.createElement("code");
        _.className = "language-cpp", _.textContent = c, C.appendChild(_), x.appendChild(y), x.appendChild(C), this.codeViewer.innerHTML = "", this.codeViewer.appendChild(x), te.highlightElement(_);
      }
    };
    return t.forEach((b, T) => {
      const E = document.createElement("button");
      E.className = "tabbed-tab-button", b.isShader && E.classList.add("shader-tab"), E.textContent = b.name, T === 0 && E.classList.add("active"), E.addEventListener("click", () => m(T)), e.appendChild(E);
    }), e;
  }
}
function _e(n, e) {
  switch (n) {
    case "fullscreen":
      return new be(e);
    case "centered":
      return new ve(e);
    case "split":
      return new Te(e);
    case "tabbed":
      return new xe(e);
  }
}
async function ye(n, e, t, r) {
  const i = `/demos/${n}/shadertoy.config.json`, c = `/demos/${n}/config.json`, p = i in t ? i : c in t ? c : null;
  if (p) {
    const o = await t[p]();
    return o.passes ? we(n, o, e, r) : Q(n, e, o);
  } else
    return Q(n, e);
}
async function Q(n, e, t) {
  var m, b, T;
  const r = `/demos/${n}/image.glsl`;
  if (!(r in e))
    throw new Error(`Demo '${n}' not found. Expected ${r}`);
  const i = await e[r](), c = (t == null ? void 0 : t.layout) || "tabbed", p = (t == null ? void 0 : t.controls) ?? !0, o = ((m = t == null ? void 0 : t.meta) == null ? void 0 : m.title) || n.split("-").map((E) => E.charAt(0).toUpperCase() + E.slice(1)).join(" ");
  return {
    root: `/demos/${n}`,
    meta: {
      title: o,
      author: ((b = t == null ? void 0 : t.meta) == null ? void 0 : b.author) || null,
      description: ((T = t == null ? void 0 : t.meta) == null ? void 0 : T.description) || null
    },
    layout: c,
    controls: p,
    commonSource: null,
    passes: {
      Image: {
        name: "Image",
        glslSource: i,
        channels: [
          { kind: "none" },
          { kind: "none" },
          { kind: "none" },
          { kind: "none" }
        ]
      }
    },
    textures: []
  };
}
async function we(n, e, t, r) {
  var _, w, R, s, a, u, l, h;
  let i = null;
  if (e.common) {
    const d = `/demos/${n}/${e.common}`;
    d in t && (i = await t[d]());
  } else {
    const d = `/demos/${n}/common.glsl`;
    d in t && (i = await t[d]());
  }
  const c = /* @__PURE__ */ new Set(), p = ["Image", "BufferA", "BufferB", "BufferC", "BufferD"];
  for (const d of p) {
    const v = e.passes[d];
    if (v)
      for (const f of ["iChannel0", "iChannel1", "iChannel2", "iChannel3"]) {
        const F = (_ = v.channels) == null ? void 0 : _[f];
        F && "texture" in F && c.add(F.texture);
      }
  }
  const o = [], m = /* @__PURE__ */ new Map();
  for (const d of c) {
    const v = `/demos/${n}/${d.replace(/^\.\//, "")}`;
    if (!(v in r))
      throw new Error(`Texture not found: ${d} (expected at ${v})`);
    const f = await r[v](), F = d.split("/").pop().replace(/\.[^.]+$/, "");
    o.push({
      name: F,
      source: f,
      filter: "linear",
      wrap: "repeat"
    }), m.set(d, F);
  }
  const b = {};
  for (const d of p) {
    const v = e.passes[d];
    if (!v) continue;
    const f = {
      Image: "image.glsl",
      BufferA: "bufferA.glsl",
      BufferB: "bufferB.glsl",
      BufferC: "bufferC.glsl",
      BufferD: "bufferD.glsl"
    }, F = v.source || f[d], A = `/demos/${n}/${F}`;
    if (!(A in t))
      throw new Error(`Missing shader file: ${A}`);
    const M = await t[A](), D = [
      j((w = v.channels) == null ? void 0 : w.iChannel0, m),
      j((R = v.channels) == null ? void 0 : R.iChannel1, m),
      j((s = v.channels) == null ? void 0 : s.iChannel2, m),
      j((a = v.channels) == null ? void 0 : a.iChannel3, m)
    ];
    b[d] = {
      name: d,
      glslSource: M,
      channels: D
    };
  }
  if (!b.Image)
    throw new Error(`Demo '${n}' must have an Image pass`);
  const T = ((u = e.meta) == null ? void 0 : u.title) || n.split("-").map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(" "), E = ((l = e.meta) == null ? void 0 : l.author) || null, x = ((h = e.meta) == null ? void 0 : h.description) || null, y = e.layout || "tabbed", C = e.controls ?? !0;
  return {
    root: `/demos/${n}`,
    meta: { title: T, author: E, description: x },
    layout: y,
    controls: C,
    commonSource: i,
    passes: b,
    textures: o
  };
}
function j(n, e) {
  return n ? "buffer" in n ? {
    kind: "buffer",
    buffer: n.buffer,
    previous: !!n.previous
  } : "texture" in n ? {
    kind: "texture2D",
    name: (e == null ? void 0 : e.get(n.texture)) || n.texture
  } : "keyboard" in n ? { kind: "keyboard" } : { kind: "none" } : { kind: "none" };
}
const Fe = "course/day3/hyp-reflect-f";
async function Ce() {
  return ye(Fe, /* @__PURE__ */ Object.assign({
    "/demos/course/day3/hyp-reflect-f/image.glsl": () => Promise.resolve().then(() => Ae).then((r) => r.default)
  }), /* @__PURE__ */ Object.assign({}), /* @__PURE__ */ Object.assign({}));
}
async function Le(n) {
  const e = typeof n.container == "string" ? document.querySelector(n.container) : n.container;
  if (!e || !(e instanceof HTMLElement))
    throw new Error(`Container not found: ${n.container}`);
  const t = await Ce(), r = _e(t.layout, {
    container: e,
    project: t
  }), i = new Ee({
    container: r.getCanvasContainer(),
    project: t,
    pixelRatio: n.pixelRatio ?? window.devicePixelRatio
  });
  return i.hasErrors() || i.start(), {
    app: i,
    destroy: () => {
      var c;
      (c = i.stop) == null || c.call(i);
    }
  };
}
const Re = `struct HalfSpaceVert {
    float x;
    float side;
};

struct HalfSpaceCirc {
    float center;
    float radius;
    float side;
};

vec2 reflectInto(vec2 z, HalfSpaceVert h) {
    if ((z.x - h.x) * h.side < 0.0) return z;
    z.x = 2.0 * h.x - z.x;
    return z;
}

vec2 reflectInto(vec2 z, HalfSpaceCirc h) {
    vec2 rel = z - vec2(h.center, 0.0);
    float dist2 = dot(rel, rel);
    
    if ((dist2 - h.radius * h.radius) * h.side > 0.0) return z;
    
    z.x -= h.center;
    z /= h.radius;
    z /= dot(z, z);
    z *= h.radius;
    z.x += h.center;
    
    return z;
}

vec3 drawF(vec2 p, vec3 bgColor, vec3 fgColor) {
    vec3 color = bgColor;
    if (p.x > -0.2 && p.x < -0.05 && p.y > -0.3 && p.y < 0.3) color = fgColor;
    if (p.x > -0.2 && p.x < 0.2 && p.y > 0.15 && p.y < 0.3) color = fgColor;
    if (p.x > -0.2 && p.x < 0.1 && p.y > -0.05 && p.y < 0.1) color = fgColor;
    return color;
}

vec2 normalize_coord(vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    uv = uv - vec2(0.5, 0.0);
    uv.x *= iResolution.x / iResolution.y;
    return uv * 6.0;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 z = normalize_coord(fragCoord);
    
    HalfSpaceVert hv = HalfSpaceVert(-1.5, -1.0);
    HalfSpaceCirc hc = HalfSpaceCirc(1.5, 2.5, 1.0);
    
    float t = mod(iTime, 4.0);
    if (t < 2.0) {
        z = reflectInto(z, hv);
    } else {
        z = reflectInto(z, hc);
    }
    
    vec3 color = drawF(z - vec2(0.5, 3.5), vec3(0.1, 0.1, 0.15), vec3(1.0, 0.8, 0.3));
    
    vec2 z_orig = normalize_coord(fragCoord);
    
    if (abs(z_orig.x - hv.x) < 0.04) color = vec3(0.5);
    if (abs(length(z_orig - vec2(hc.center, 0.0)) - hc.radius) < 0.04 && z_orig.y > 0.0) color = vec3(0.5);
    if (z_orig.y < 0.02) color = vec3(0.15);
    
    fragColor = vec4(color, 1.0);
}`, Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Re
}, Symbol.toStringTag, { value: "Module" }));
export {
  Fe as DEMO_NAME,
  Le as embed
};
