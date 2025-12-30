(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('.shader-demo{position:relative;width:100%}.shader-demo canvas{display:block;width:100%;height:100%}.fps-counter{position:absolute;bottom:8px;left:8px;padding:6px 10px;background:#000000bf;color:#fff;font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;font-weight:500;border-radius:4px;pointer-events:none;-webkit-user-select:none;user-select:none;z-index:1000;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);box-shadow:0 2px 8px #0000004d}.playback-controls{position:absolute;bottom:8px;right:8px;display:flex;gap:8px;z-index:1000}.control-button{padding:6px 8px;background:#000000bf;color:#fff;border:none;border-radius:4px;cursor:pointer;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);box-shadow:0 2px 8px #0000004d;transition:all .2s ease;display:flex;align-items:center;justify-content:center;width:32px;height:32px}.control-button:hover{background:#000000d9;transform:scale(1.05)}.control-button:active{transform:scale(.95)}.control-button svg{width:16px;height:16px;fill:currentColor}.shader-error-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:#000000f2;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:2000;padding:60px;overflow-y:auto}.error-overlay-content{background:#1a1a1a;border-radius:6px;max-width:900px;width:100%;display:flex;flex-direction:column;box-shadow:0 20px 60px #000c,0 0 1px #ffffff1a;border:1px solid #2a2a2a;max-height:calc(100vh - 120px)}.error-header{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;background:linear-gradient(135deg,#c62828,#b71c1c);color:#fff;border-radius:6px 6px 0 0;border-bottom:1px solid rgba(0,0,0,.3);box-shadow:0 2px 8px #0003}.error-title{font-size:15px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;display:flex;align-items:center;gap:8px;letter-spacing:-.01em}.error-close{background:transparent;border:none;color:#ffffffe6;font-size:24px;line-height:1;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all .2s ease;opacity:.8}.error-close:hover{background:#ffffff26;opacity:1;transform:scale(1.05)}.error-body{padding:24px;overflow-y:auto;flex:1}.error-section{margin-bottom:24px}.error-section:last-child{margin-bottom:0}.error-pass-name{font-size:13px;font-weight:600;color:#ffa726;font-family:Monaco,Menlo,Courier New,monospace;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #2a2a2a;letter-spacing:.02em}.error-content{margin:0;padding:14px 16px;background:#0f0f0f;border-radius:4px;color:#ff6b6b;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.6;overflow-x:auto;border:1px solid #2a2a2a;white-space:pre-wrap;word-break:break-word}.error-code-context{margin:12px 0 0;padding:14px 16px;background:#0d0d0d;border-radius:4px;color:#b0b0b0;font-size:12px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.6;overflow-x:auto;border:1px solid #2a2a2a;white-space:pre}.error-code-context .context-line{color:#666;display:block}.error-code-context .error-line-highlight{color:#fff;background:#c6282840;display:block;font-weight:600;border-left:3px solid #c62828;margin-left:-16px;padding-left:13px}.layout-fullscreen{width:100%;height:100%}.layout-fullscreen .canvas-container{position:relative;width:100%;height:100%;background:#000}.layout-centered{width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:60px}.layout-centered .canvas-container{position:relative;width:800px;height:600px;background:#000;border-radius:8px;box-shadow:0 20px 60px #00000040,0 5px 15px #00000026;overflow:hidden}.layout-split{width:100%;height:100%;display:flex;gap:40px;padding:120px 140px}.layout-split .canvas-container{position:relative;flex:1;background:#000;border-radius:8px;box-shadow:0 10px 30px #0003,0 3px 8px #0000001f;overflow:hidden}.layout-split .code-panel{position:relative;flex:1;display:flex;flex-direction:column;background:#fff;border-radius:8px;box-shadow:0 10px 30px #0003,0 3px 8px #0000001f;overflow:hidden}.tab-bar{display:flex;background:#f8f8f8;border-bottom:1px solid #e0e0e0;padding:8px 8px 0;gap:4px}.tab-button{padding:8px 16px;background:transparent;border:none;border-radius:6px 6px 0 0;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;cursor:pointer;transition:background .2s;color:#666}.tab-button:hover{background:#e8e8e8}.tab-button.active{background:#fff;color:#000;font-weight:500}.copy-button{position:absolute;top:12px;right:12px;padding:6px;background:transparent;border:none;border-radius:4px;color:#666;cursor:pointer;transition:all .2s;z-index:10;display:flex;align-items:center;justify-content:center}.copy-button:hover{background:#0000000d;color:#333}.copy-button:active{transform:scale(.9)}.copy-button.copied{color:#4caf50}.code-viewer{flex:1;min-height:0;overflow:auto;position:relative;background:#fff}.code-viewer pre{margin:0;padding:16px;font-size:13px;line-height:1.5;font-family:Monaco,Menlo,Courier New,monospace;background:#fff}.code-viewer code{font-family:inherit;font-size:inherit}.token.comment{color:#6a9955}.token.keyword{color:#00f}.token.string{color:#a31515}.token.number{color:#098658}.token.operator{color:#000}.token.function{color:#795e26}.token.class-name{color:#267f99}.token.punctuation{color:#000}@media (max-width: 1800px){.layout-split{padding:100px 120px}}@media (max-width: 1600px){.layout-split{padding:80px 100px}}@media (max-width: 1400px){.layout-split{padding:60px 80px}}@media (max-width: 1200px){.layout-split{padding:50px 60px}}@media (max-width: 1000px){.layout-split{padding:40px 50px}}@media (max-width: 800px){.layout-split{flex-direction:column;padding:30px;gap:30px}}.layout-tabbed{--tab-bg: #f8f8f8;--tab-border: #e0e0e0;--tab-text: #666;--tab-text-hover: #333;--tab-hover-bg: #e8e8e8;--tab-active-bg: white;--tab-active-text: #000;--code-bg: white;--code-text: #000;--line-number-text: #999;--copy-btn-bg: rgba(0, 0, 0, .05);--copy-btn-hover-bg: rgba(0, 0, 0, .1)}[data-bs-theme=dark] .layout-tabbed,.dark .layout-tabbed,:root.dark .layout-tabbed{--tab-bg: #2d2d2d;--tab-border: #444;--tab-text: #999;--tab-text-hover: #ccc;--tab-hover-bg: #3d3d3d;--tab-active-bg: #1e1e1e;--tab-active-text: #fff;--code-bg: #1e1e1e;--code-text: #d4d4d4;--line-number-text: #666;--copy-btn-bg: rgba(255, 255, 255, .1);--copy-btn-hover-bg: rgba(255, 255, 255, .15)}.layout-tabbed{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px;box-sizing:border-box}.tabbed-wrapper{display:flex;flex-direction:column;width:800px;max-width:100%;height:650px;max-height:100%;border-radius:8px;box-shadow:0 20px 60px #00000040,0 5px 15px #00000026;overflow:hidden}.tabbed-tab-bar{display:flex;flex-shrink:0;background:var(--tab-bg);padding:8px 8px 0;gap:4px;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;position:relative}.tabbed-tab-bar:after{content:"";position:absolute;bottom:0;left:0;right:0;height:1px;background:var(--tab-border);z-index:0}.tabbed-tab-bar::-webkit-scrollbar{height:4px}.tabbed-tab-bar::-webkit-scrollbar-thumb{background:#ccc;border-radius:2px}.tabbed-tab-button{padding:10px 20px;background:transparent;border:none;border-radius:6px 6px 0 0;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;cursor:pointer;transition:background .2s,color .2s;color:var(--tab-text);white-space:nowrap;flex-shrink:0}.tabbed-tab-button:hover{background:var(--tab-hover-bg);color:var(--tab-text-hover)}.tabbed-tab-button.active{background:var(--tab-active-bg);color:var(--tab-active-text);font-weight:500;position:relative;z-index:1;padding-bottom:11px;margin-bottom:-1px}.tabbed-tab-button.shader-tab{font-family:system-ui,-apple-system,sans-serif}.tabbed-content{flex:1;min-height:0;position:relative;background:#000;overflow:hidden}.tabbed-canvas-container{position:absolute;top:0;left:0;width:100%;height:100%}.tabbed-code-viewer{position:absolute;top:0;left:0;width:100%;height:100%;overflow:auto;background:var(--code-bg)}.tabbed-code-viewer pre{margin:0;padding:16px 16px 16px 0;font-size:13px;line-height:1.6;font-family:Monaco,Menlo,Courier New,monospace;background:var(--code-bg);color:var(--code-text);display:flex}.tabbed-code-viewer code{font-family:inherit;font-size:inherit}.tabbed-line-numbers{text-align:right;padding-right:16px;margin-right:16px;border-right:1px solid var(--tab-border);color:var(--line-number-text);-webkit-user-select:none;user-select:none;flex-shrink:0;padding-left:16px}.tabbed-code-content{flex:1;overflow-x:auto}.tabbed-copy-button{position:absolute;top:12px;right:12px;padding:8px;background:var(--copy-btn-bg);border:none;border-radius:6px;color:var(--tab-text);cursor:pointer;transition:all .2s;z-index:10;display:flex;align-items:center;justify-content:center}.tabbed-copy-button:hover{background:var(--copy-btn-hover-bg);color:var(--tab-text-hover)}.tabbed-copy-button:active{transform:scale(.9)}.tabbed-copy-button.copied{color:#4caf50}.tabbed-code-viewer .token.comment{color:#6a9955}.tabbed-code-viewer .token.keyword{color:#00f}.tabbed-code-viewer .token.string{color:#a31515}.tabbed-code-viewer .token.number{color:#098658}.tabbed-code-viewer .token.operator{color:#000}.tabbed-code-viewer .token.function{color:#795e26}.tabbed-code-viewer .token.class-name{color:#267f99}.tabbed-code-viewer .token.punctuation{color:#000}[data-bs-theme=dark] .tabbed-code-viewer .token.comment,.dark .tabbed-code-viewer .token.comment{color:#6a9955}[data-bs-theme=dark] .tabbed-code-viewer .token.keyword,.dark .tabbed-code-viewer .token.keyword{color:#569cd6}[data-bs-theme=dark] .tabbed-code-viewer .token.string,.dark .tabbed-code-viewer .token.string{color:#ce9178}[data-bs-theme=dark] .tabbed-code-viewer .token.number,.dark .tabbed-code-viewer .token.number{color:#b5cea8}[data-bs-theme=dark] .tabbed-code-viewer .token.operator,.dark .tabbed-code-viewer .token.operator{color:#d4d4d4}[data-bs-theme=dark] .tabbed-code-viewer .token.function,.dark .tabbed-code-viewer .token.function{color:#dcdcaa}[data-bs-theme=dark] .tabbed-code-viewer .token.class-name,.dark .tabbed-code-viewer .token.class-name{color:#4ec9b0}[data-bs-theme=dark] .tabbed-code-viewer .token.punctuation,.dark .tabbed-code-viewer .token.punctuation{color:#d4d4d4}@media (max-width: 1200px){.layout-tabbed{padding:40px 60px}}@media (max-width: 900px){.layout-tabbed{padding:30px 40px}}@media (max-width: 600px){.layout-tabbed{padding:20px}.tabbed-tab-button{padding:8px 12px;font-size:12px}}')),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
var ie = Object.defineProperty;
var se = (n, e, t) => e in n ? ie(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var f = (n, e, t) => se(n, typeof e != "symbol" ? e + "" : e, t);
function Y(n, e, t) {
  const r = n.createShader(e);
  if (!r)
    throw new Error("Failed to create shader object");
  if (n.shaderSource(r, t), n.compileShader(r), !n.getShaderParameter(r, n.COMPILE_STATUS)) {
    const o = n.getShaderInfoLog(r);
    throw n.deleteShader(r), new Error(`Shader compilation failed:
${o}`);
  }
  return r;
}
function oe(n, e, t) {
  const r = Y(n, n.VERTEX_SHADER, e), s = Y(n, n.FRAGMENT_SHADER, t), o = n.createProgram();
  if (!o)
    throw new Error("Failed to create program object");
  if (n.attachShader(o, r), n.attachShader(o, s), n.linkProgram(o), !n.getProgramParameter(o, n.LINK_STATUS)) {
    const c = n.getProgramInfoLog(o);
    throw n.deleteProgram(o), n.deleteShader(r), n.deleteShader(s), new Error(`Program linking failed:
${c}`);
  }
  return n.detachShader(o, r), n.detachShader(o, s), n.deleteShader(r), n.deleteShader(s), o;
}
function ce(n) {
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
function H(n, e, t) {
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
function Z(n, e) {
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
    throw n.deleteFramebuffer(t), new Error(`Framebuffer incomplete: ${he(n, r)}`);
  return n.bindFramebuffer(n.FRAMEBUFFER, null), t;
}
function ue(n) {
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
function le(n) {
  const e = n.createTexture();
  if (!e)
    throw new Error("Failed to create keyboard texture");
  n.bindTexture(n.TEXTURE_2D, e);
  const t = 256, r = 3, s = new Float32Array(t * r * 4);
  return n.texImage2D(
    n.TEXTURE_2D,
    0,
    n.RGBA32F,
    t,
    r,
    0,
    n.RGBA,
    n.FLOAT,
    s
  ), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.bindTexture(n.TEXTURE_2D, null), e;
}
function de(n, e, t, r) {
  const p = new Float32Array(3072);
  for (let c = 0; c < 256; c++) {
    const E = t.get(c) || !1, b = r.get(c) || 0, v = (0 * 256 + c) * 4;
    p[v + 0] = E ? 1 : 0, p[v + 1] = E ? 1 : 0, p[v + 2] = E ? 1 : 0, p[v + 3] = 1;
    const g = (2 * 256 + c) * 4;
    p[g + 0] = b, p[g + 1] = b, p[g + 2] = b, p[g + 3] = 1;
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
function he(n, e) {
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
const pe = `#version 300 es
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
`, fe = J.split(`
`).length - 1;
class me {
  constructor(e) {
    f(this, "project");
    f(this, "gl");
    f(this, "_width");
    f(this, "_height");
    f(this, "_frame", 0);
    f(this, "_time", 0);
    f(this, "_lastStepTime", null);
    f(this, "_passes", []);
    f(this, "_textures", []);
    f(this, "_keyboardTexture", null);
    f(this, "_blackTexture", null);
    // Keyboard state tracking (Maps keycodes to state)
    f(this, "_keyStates", /* @__PURE__ */ new Map());
    // true = down, false = up
    f(this, "_toggleStates", /* @__PURE__ */ new Map());
    // 0.0 or 1.0
    // Compilation errors (if any occurred during initialization)
    f(this, "_compilationErrors", []);
    this.gl = e.gl, this.project = e.project, this._width = this.gl.drawingBufferWidth, this._height = this.gl.drawingBufferHeight, this.initExtensions(), this._blackTexture = ue(this.gl);
    const t = le(this.gl);
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
    const r = this.gl, s = this._lastStepTime === null ? 0 : e - this._lastStepTime;
    this._lastStepTime = e, this._time = e;
    const o = [this._width, this._height, 1], p = this._time, c = s, E = this._frame, b = t;
    r.viewport(0, 0, this._width, this._height);
    const v = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"];
    for (const g of v) {
      const T = this._passes.find((_) => _.name === g);
      T && (this.executePass(T, {
        iResolution: o,
        iTime: p,
        iTimeDelta: c,
        iFrame: E,
        iMouse: b
      }), this.swapPassTextures(T));
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
    for (const s of this._passes)
      r.deleteTexture(s.currentTexture), r.deleteTexture(s.previousTexture), r.deleteFramebuffer(s.framebuffer), s.currentTexture = H(r, e, t), s.previousTexture = H(r, e, t), s.framebuffer = Z(r, s.currentTexture);
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
      const s = this._toggleStates.get(e) || 0;
      this._toggleStates.set(e, s === 0 ? 1 : 0);
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
      const s = {
        name: t.name,
        texture: r,
        width: 1,
        height: 1
      };
      this._textures.push(s);
      const o = new Image();
      o.crossOrigin = "anonymous", o.onload = () => {
        e.bindTexture(e.TEXTURE_2D, r), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, o);
        const p = t.filter === "nearest" ? e.NEAREST : e.LINEAR;
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, p), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, p);
        const c = t.wrap === "clamp" ? e.CLAMP_TO_EDGE : e.REPEAT;
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, c), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, c), t.filter === "linear" && e.generateMipmap(e.TEXTURE_2D), s.width = o.width, s.height = o.height, console.log(`Loaded texture '${t.name}': ${o.width}x${o.height}`);
      }, o.onerror = () => {
        console.error(`Failed to load texture '${t.name}' from ${t.source}`);
      }, o.src = t.source;
    }
  }
  /**
   * Compile shaders, create VAOs/FBOs/textures, and build RuntimePass array.
   */
  initRuntimePasses() {
    const e = this.gl, t = this.project, r = ce(e), s = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"];
    for (const o of s) {
      const p = t.passes[o];
      if (!p) continue;
      const c = this.buildFragmentShader(p.glslSource);
      try {
        const E = oe(e, pe, c), b = {
          program: E,
          iResolution: e.getUniformLocation(E, "iResolution"),
          iTime: e.getUniformLocation(E, "iTime"),
          iTimeDelta: e.getUniformLocation(E, "iTimeDelta"),
          iFrame: e.getUniformLocation(E, "iFrame"),
          iMouse: e.getUniformLocation(E, "iMouse"),
          iChannel: [
            e.getUniformLocation(E, "iChannel0"),
            e.getUniformLocation(E, "iChannel1"),
            e.getUniformLocation(E, "iChannel2"),
            e.getUniformLocation(E, "iChannel3")
          ]
        }, v = H(e, this._width, this._height), g = H(e, this._width, this._height), T = Z(e, v), _ = {
          name: o,
          projectChannels: p.channels,
          vao: r,
          uniforms: b,
          framebuffer: T,
          currentTexture: v,
          previousTexture: g
        };
        this._passes.push(_);
      } catch (E) {
        const b = E instanceof Error ? E.message : String(E), v = this.getLineMapping(), g = b.match(/ERROR:\s*\d+:(\d+):/);
        let T = !1, _ = null;
        if (g && this.project.commonSource) {
          const R = parseInt(g[1], 10), x = v.boilerplateLinesBeforeCommon + 2, F = x + v.commonLineCount - 1;
          R >= x && R <= F && (T = !0, _ = R - x + 1);
        }
        this._compilationErrors.push({
          passName: o,
          error: b,
          source: c,
          isFromCommon: T,
          originalLine: _
        }), console.error(`Failed to compile ${o}:`, b);
      }
    }
  }
  /**
   * Calculate line number mappings for error reporting.
   * Returns info about where common.glsl code lives in the compiled shader.
   */
  getLineMapping() {
    const e = fe + 1, t = this.project.commonSource ? this.project.commonSource.split(`
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
    return e.replace(t, (r, s, o) => o.includes("fragCoord") || // Using fragCoord directly
    o.includes("/") || // Division (likely uv calculation)
    /\.xy\s*$/.test(o.trim()) || // Ends with .xy swizzle
    /\.st\s*$/.test(o.trim()) || // Ends with .st swizzle
    /^vec2\s*\(/.test(o.trim()) ? r : `texture(${s}, _st_dirToEquirect(${o}))`);
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
      const s = e.projectChannels[r], o = this.resolveChannelTexture(s, e.name);
      t.activeTexture(t.TEXTURE0 + r), t.bindTexture(t.TEXTURE_2D, o);
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
        const s = this._passes.find((p) => p.name === e.buffer);
        if (!s)
          throw new Error(`Buffer '${e.buffer}' not found`);
        return e.buffer === t ? s.previousTexture : s.currentTexture;
      }
      case "texture2D": {
        const s = this._textures.find((o) => o.name === e.name);
        if (!s)
          throw new Error(`Texture '${e.name}' not found`);
        return s.texture;
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
class ge {
  constructor(e) {
    f(this, "container");
    f(this, "canvas");
    f(this, "gl");
    f(this, "engine");
    f(this, "project");
    f(this, "pixelRatio");
    f(this, "animationId", null);
    f(this, "startTime", 0);
    // Mouse state for iMouse uniform
    f(this, "mouse", [0, 0, -1, -1]);
    // FPS tracking
    f(this, "fpsDisplay");
    f(this, "frameCount", 0);
    f(this, "lastFpsUpdate", 0);
    f(this, "currentFps", 0);
    // Playback controls
    f(this, "controlsContainer", null);
    f(this, "playPauseButton", null);
    f(this, "isPaused", !1);
    // Error overlay
    f(this, "errorOverlay", null);
    // Resize observer
    f(this, "resizeObserver");
    // Visibility observer (auto-pause when off-screen)
    f(this, "intersectionObserver");
    f(this, "isVisible", !0);
    // ===========================================================================
    // Animation Loop
    // ===========================================================================
    f(this, "animate", (e) => {
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
    this.gl = t, this.updateCanvasSize(), this.engine = new me({
      gl: this.gl,
      project: e.project
    }), this.engine.hasErrors() && this.showErrorOverlay(this.engine.getCompilationErrors()), this.resizeObserver = new ResizeObserver(() => {
      this.updateCanvasSize(), this.engine.resize(this.canvas.width, this.canvas.height), this.startTime = performance.now() / 1e3, this.engine.reset();
    }), this.resizeObserver.observe(this.container), this.intersectionObserver = new IntersectionObserver(
      (r) => {
        const s = r[0];
        this.isVisible = s.isIntersecting;
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
      const s = this.canvas.getBoundingClientRect(), o = (r.clientX - s.left) * this.pixelRatio, p = (s.height - (r.clientY - s.top)) * this.pixelRatio;
      this.mouse[0] = o, this.mouse[1] = p;
    }, t = (r) => {
      const s = this.canvas.getBoundingClientRect(), o = (r.clientX - s.left) * this.pixelRatio, p = (s.height - (r.clientY - s.top)) * this.pixelRatio;
      this.mouse[2] = o, this.mouse[3] = p;
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
    const e = this.project.root.split("/").pop() || "shader", t = /* @__PURE__ */ new Date(), r = t.getFullYear().toString() + (t.getMonth() + 1).toString().padStart(2, "0") + t.getDate().toString().padStart(2, "0") + "-" + t.getHours().toString().padStart(2, "0") + t.getMinutes().toString().padStart(2, "0") + t.getSeconds().toString().padStart(2, "0"), s = `shadertoy-${e}-${r}.png`;
    this.canvas.toBlob((o) => {
      if (!o) {
        console.error("Failed to create screenshot blob");
        return;
      }
      const p = URL.createObjectURL(o), c = document.createElement("a");
      c.href = p, c.download = s, c.click(), URL.revokeObjectURL(p), console.log(`Screenshot saved: ${s}`);
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
    const t = e.filter((b) => b.isFromCommon), r = e.filter((b) => !b.isFromCommon), c = [...t.length > 0 ? [t[0]] : [], ...r].map(({ passName: b, error: v, source: g, isFromCommon: T, originalLine: _ }) => {
      const R = v.replace(`Shader compilation failed:
`, "");
      let x = R;
      return T && _ !== null && (x = R.replace(/Line \d+:/, `Line ${_}:`), x = x.replace(/ERROR:\s*\d+:(\d+):/, `ERROR: 0:${_}:`)), {
        passName: T ? "common.glsl" : b,
        error: this.parseShaderError(x),
        codeContext: T ? this.extractCodeContextFromCommon(_) : this.extractCodeContext(x, g)
      };
    }).map(({ passName: b, error: v, codeContext: g }) => `
      <div class="error-section">
        <div class="error-pass-name">${b}</div>
        <pre class="error-content">${this.escapeHTML(v)}</pre>
        ${g ? `<pre class="error-code-context">${g}</pre>` : ""}
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
          ${c}
        </div>
      </div>
    `;
    const E = this.errorOverlay.querySelector(".error-close");
    E && E.addEventListener("click", () => this.hideErrorOverlay());
  }
  /**
   * Parse and improve WebGL shader error messages.
   */
  parseShaderError(e) {
    return e.split(`
`).map((t) => {
      const r = t.match(/^ERROR:\s*(\d+):(\d+):\s*(.+)$/);
      if (r) {
        const [, , s, o] = r;
        return `Line ${s}: ${o}`;
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
    const s = parseInt(r[1], 10), o = t.split(`
`), p = 3, c = Math.max(0, s - p - 1), E = Math.min(o.length, s + p);
    return o.slice(c, E).map((g, T) => {
      const _ = c + T + 1, R = _ === s, x = String(_).padStart(4, " "), F = this.escapeHTML(g);
      return R ? `<span class="error-line-highlight">${x} │ ${F}</span>` : `<span class="context-line">${x} │ ${F}</span>`;
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
`), s = 3, o = Math.max(0, e - s - 1), p = Math.min(r.length, e + s);
    return r.slice(o, p).map((b, v) => {
      const g = o + v + 1, T = g === e, _ = String(g).padStart(4, " "), R = this.escapeHTML(b);
      return T ? `<span class="error-line-highlight">${_} │ ${R}</span>` : `<span class="context-line">${_} │ ${R}</span>`;
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
class Ee {
  constructor(e) {
    f(this, "container");
    f(this, "root");
    f(this, "canvasContainer");
    this.container = e.container, this.root = document.createElement("div"), this.root.className = "layout-fullscreen", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.root.appendChild(this.canvasContainer), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
}
class be {
  constructor(e) {
    f(this, "container");
    f(this, "root");
    f(this, "canvasContainer");
    this.container = e.container, this.root = document.createElement("div"), this.root.className = "layout-centered", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.root.appendChild(this.canvasContainer), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
}
var Q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ee = { exports: {} };
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
    var s = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, o = 0, p = {}, c = {
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
        encode: function i(a) {
          return a instanceof E ? new E(a.type, i(a.content), a.alias) : Array.isArray(a) ? a.map(i) : a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
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
        type: function(i) {
          return Object.prototype.toString.call(i).slice(8, -1);
        },
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: function(i) {
          return i.__id || Object.defineProperty(i, "__id", { value: ++o }), i.__id;
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
        clone: function i(a, u) {
          u = u || {};
          var l, d;
          switch (c.util.type(a)) {
            case "Object":
              if (d = c.util.objId(a), u[d])
                return u[d];
              l = /** @type {Record<string, any>} */
              {}, u[d] = l;
              for (var m in a)
                a.hasOwnProperty(m) && (l[m] = i(a[m], u));
              return (
                /** @type {any} */
                l
              );
            case "Array":
              return d = c.util.objId(a), u[d] ? u[d] : (l = [], u[d] = l, /** @type {Array} */
              /** @type {any} */
              a.forEach(function(y, h) {
                l[h] = i(y, u);
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
        getLanguage: function(i) {
          for (; i; ) {
            var a = s.exec(i.className);
            if (a)
              return a[1].toLowerCase();
            i = i.parentElement;
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
        setLanguage: function(i, a) {
          i.className = i.className.replace(RegExp(s, "gi"), ""), i.classList.add("language-" + a);
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
            var i = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(l.stack) || [])[1];
            if (i) {
              var a = document.getElementsByTagName("script");
              for (var u in a)
                if (a[u].src == i)
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
        isActive: function(i, a, u) {
          for (var l = "no-" + a; i; ) {
            var d = i.classList;
            if (d.contains(a))
              return !0;
            if (d.contains(l))
              return !1;
            i = i.parentElement;
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
        extend: function(i, a) {
          var u = c.util.clone(c.languages[i]);
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
        insertBefore: function(i, a, u, l) {
          l = l || /** @type {any} */
          c.languages;
          var d = l[i], m = {};
          for (var y in d)
            if (d.hasOwnProperty(y)) {
              if (y == a)
                for (var h in u)
                  u.hasOwnProperty(h) && (m[h] = u[h]);
              u.hasOwnProperty(y) || (m[y] = d[y]);
            }
          var w = l[i];
          return l[i] = m, c.languages.DFS(c.languages, function(C, S) {
            S === w && C != i && (this[C] = m);
          }), m;
        },
        // Traverse a language definition with Depth First Search
        DFS: function i(a, u, l, d) {
          d = d || {};
          var m = c.util.objId;
          for (var y in a)
            if (a.hasOwnProperty(y)) {
              u.call(a, y, a[y], l || y);
              var h = a[y], w = c.util.type(h);
              w === "Object" && !d[m(h)] ? (d[m(h)] = !0, i(h, u, null, d)) : w === "Array" && !d[m(h)] && (d[m(h)] = !0, i(h, u, y, d));
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
      highlightAll: function(i, a) {
        c.highlightAllUnder(document, i, a);
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
      highlightAllUnder: function(i, a, u) {
        var l = {
          callback: u,
          container: i,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        c.hooks.run("before-highlightall", l), l.elements = Array.prototype.slice.apply(l.container.querySelectorAll(l.selector)), c.hooks.run("before-all-elements-highlight", l);
        for (var d = 0, m; m = l.elements[d++]; )
          c.highlightElement(m, a === !0, l.callback);
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
      highlightElement: function(i, a, u) {
        var l = c.util.getLanguage(i), d = c.languages[l];
        c.util.setLanguage(i, l);
        var m = i.parentElement;
        m && m.nodeName.toLowerCase() === "pre" && c.util.setLanguage(m, l);
        var y = i.textContent, h = {
          element: i,
          language: l,
          grammar: d,
          code: y
        };
        function w(S) {
          h.highlightedCode = S, c.hooks.run("before-insert", h), h.element.innerHTML = h.highlightedCode, c.hooks.run("after-highlight", h), c.hooks.run("complete", h), u && u.call(h.element);
        }
        if (c.hooks.run("before-sanity-check", h), m = h.element.parentElement, m && m.nodeName.toLowerCase() === "pre" && !m.hasAttribute("tabindex") && m.setAttribute("tabindex", "0"), !h.code) {
          c.hooks.run("complete", h), u && u.call(h.element);
          return;
        }
        if (c.hooks.run("before-highlight", h), !h.grammar) {
          w(c.util.encode(h.code));
          return;
        }
        if (a && r.Worker) {
          var C = new Worker(c.filename);
          C.onmessage = function(S) {
            w(S.data);
          }, C.postMessage(JSON.stringify({
            language: h.language,
            code: h.code,
            immediateClose: !0
          }));
        } else
          w(c.highlight(h.code, h.grammar, h.language));
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
      highlight: function(i, a, u) {
        var l = {
          code: i,
          grammar: a,
          language: u
        };
        if (c.hooks.run("before-tokenize", l), !l.grammar)
          throw new Error('The language "' + l.language + '" has no grammar.');
        return l.tokens = c.tokenize(l.code, l.grammar), c.hooks.run("after-tokenize", l), E.stringify(c.util.encode(l.tokens), l.language);
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
      tokenize: function(i, a) {
        var u = a.rest;
        if (u) {
          for (var l in u)
            a[l] = u[l];
          delete a.rest;
        }
        var d = new g();
        return T(d, d.head, i), v(i, d, a, d.head, 0), R(d);
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
        add: function(i, a) {
          var u = c.hooks.all;
          u[i] = u[i] || [], u[i].push(a);
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
        run: function(i, a) {
          var u = c.hooks.all[i];
          if (!(!u || !u.length))
            for (var l = 0, d; d = u[l++]; )
              d(a);
        }
      },
      Token: E
    };
    r.Prism = c;
    function E(i, a, u, l) {
      this.type = i, this.content = a, this.alias = u, this.length = (l || "").length | 0;
    }
    E.stringify = function i(a, u) {
      if (typeof a == "string")
        return a;
      if (Array.isArray(a)) {
        var l = "";
        return a.forEach(function(w) {
          l += i(w, u);
        }), l;
      }
      var d = {
        type: a.type,
        content: i(a.content, u),
        tag: "span",
        classes: ["token", a.type],
        attributes: {},
        language: u
      }, m = a.alias;
      m && (Array.isArray(m) ? Array.prototype.push.apply(d.classes, m) : d.classes.push(m)), c.hooks.run("wrap", d);
      var y = "";
      for (var h in d.attributes)
        y += " " + h + '="' + (d.attributes[h] || "").replace(/"/g, "&quot;") + '"';
      return "<" + d.tag + ' class="' + d.classes.join(" ") + '"' + y + ">" + d.content + "</" + d.tag + ">";
    };
    function b(i, a, u, l) {
      i.lastIndex = a;
      var d = i.exec(u);
      if (d && l && d[1]) {
        var m = d[1].length;
        d.index += m, d[0] = d[0].slice(m);
      }
      return d;
    }
    function v(i, a, u, l, d, m) {
      for (var y in u)
        if (!(!u.hasOwnProperty(y) || !u[y])) {
          var h = u[y];
          h = Array.isArray(h) ? h : [h];
          for (var w = 0; w < h.length; ++w) {
            if (m && m.cause == y + "," + w)
              return;
            var C = h[w], S = C.inside, P = !!C.lookbehind, $ = !!C.greedy, z = C.alias;
            if ($ && !C.pattern.global) {
              var ne = C.pattern.toString().match(/[imsuy]*$/)[0];
              C.pattern = RegExp(C.pattern.source, ne + "g");
            }
            for (var W = C.pattern || C, L = l.next, B = d; L !== a.tail && !(m && B >= m.reach); B += L.value.length, L = L.next) {
              var U = L.value;
              if (a.length > i.length)
                return;
              if (!(U instanceof E)) {
                var I = 1, M;
                if ($) {
                  if (M = b(W, B, i, P), !M || M.index >= i.length)
                    break;
                  var O = M.index, re = M.index + M[0].length, k = B;
                  for (k += L.value.length; O >= k; )
                    L = L.next, k += L.value.length;
                  if (k -= L.value.length, B = k, L.value instanceof E)
                    continue;
                  for (var D = L; D !== a.tail && (k < re || typeof D.value == "string"); D = D.next)
                    I++, k += D.value.length;
                  I--, U = i.slice(B, k), M.index -= B;
                } else if (M = b(W, 0, U, P), !M)
                  continue;
                var O = M.index, N = M[0], G = U.slice(0, O), K = U.slice(O + N.length), V = B + U.length;
                m && V > m.reach && (m.reach = V);
                var j = L.prev;
                G && (j = T(a, j, G), B += G.length), _(a, j, I);
                var ae = new E(y, S ? c.tokenize(N, S) : N, z, N);
                if (L = T(a, j, ae), K && T(a, L, K), I > 1) {
                  var q = {
                    cause: y + "," + w,
                    reach: V
                  };
                  v(i, a, u, L.prev, B, q), m && q.reach > m.reach && (m.reach = q.reach);
                }
              }
            }
          }
        }
    }
    function g() {
      var i = { value: null, prev: null, next: null }, a = { value: null, prev: i, next: null };
      i.next = a, this.head = i, this.tail = a, this.length = 0;
    }
    function T(i, a, u) {
      var l = a.next, d = { value: u, prev: a, next: l };
      return a.next = d, l.prev = d, i.length++, d;
    }
    function _(i, a, u) {
      for (var l = a.next, d = 0; d < u && l !== i.tail; d++)
        l = l.next;
      a.next = l, l.prev = a, i.length -= d;
    }
    function R(i) {
      for (var a = [], u = i.head.next; u !== i.tail; )
        a.push(u.value), u = u.next;
      return a;
    }
    if (!r.document)
      return r.addEventListener && (c.disableWorkerMessageHandler || r.addEventListener("message", function(i) {
        var a = JSON.parse(i.data), u = a.language, l = a.code, d = a.immediateClose;
        r.postMessage(c.highlight(l, c.languages[u], u)), d && r.close();
      }, !1)), c;
    var x = c.util.currentScript();
    x && (c.filename = x.src, x.hasAttribute("data-manual") && (c.manual = !0));
    function F() {
      c.manual || c.highlightAll();
    }
    if (!c.manual) {
      var A = document.readyState;
      A === "loading" || A === "interactive" && x && x.defer ? document.addEventListener("DOMContentLoaded", F) : window.requestAnimationFrame ? window.requestAnimationFrame(F) : window.setTimeout(F, 16);
    }
    return c;
  }(e);
  n.exports && (n.exports = t), typeof Q < "u" && (Q.Prism = t), t.languages.markup = {
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
    value: function(s, o) {
      var p = {};
      p["language-" + o] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: t.languages[o]
      }, p.cdata = /^<!\[CDATA\[|\]\]>$/i;
      var c = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: p
        }
      };
      c["language-" + o] = {
        pattern: /[\s\S]+/,
        inside: t.languages[o]
      };
      var E = {};
      E[s] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
          return s;
        }), "i"),
        lookbehind: !0,
        greedy: !0,
        inside: c
      }, t.languages.insertBefore("markup", "cdata", E);
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
    value: function(r, s) {
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
                alias: [s, "language-" + s],
                inside: t.languages[s]
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
    var s = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    r.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + s.source + ")*?" + /(?:;|(?=\s*\{))/.source),
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
        pattern: RegExp("\\burl\\((?:" + s.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
        greedy: !0,
        inside: {
          function: /^url/i,
          punctuation: /^\(|\)$/,
          string: {
            pattern: RegExp("^" + s.source + "$"),
            alias: "url"
          }
        }
      },
      selector: {
        pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + s.source + ")*(?=\\s*\\{)"),
        lookbehind: !0
      },
      string: {
        pattern: s,
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
    var o = r.languages.markup;
    o && (o.tag.addInlined("style", "css"), o.tag.addAttribute("style", "css"));
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
    var r = "Loading…", s = function(x, F) {
      return "✖ Error " + x + " while fetching file: " + F;
    }, o = "✖ Error: File does not exist or is empty", p = {
      js: "javascript",
      py: "python",
      rb: "ruby",
      ps1: "powershell",
      psm1: "powershell",
      sh: "bash",
      bat: "batch",
      h: "c",
      tex: "latex"
    }, c = "data-src-status", E = "loading", b = "loaded", v = "failed", g = "pre[data-src]:not([" + c + '="' + b + '"]):not([' + c + '="' + E + '"])';
    function T(x, F, A) {
      var i = new XMLHttpRequest();
      i.open("GET", x, !0), i.onreadystatechange = function() {
        i.readyState == 4 && (i.status < 400 && i.responseText ? F(i.responseText) : i.status >= 400 ? A(s(i.status, i.statusText)) : A(o));
      }, i.send(null);
    }
    function _(x) {
      var F = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(x || "");
      if (F) {
        var A = Number(F[1]), i = F[2], a = F[3];
        return i ? a ? [A, Number(a)] : [A, void 0] : [A, A];
      }
    }
    t.hooks.add("before-highlightall", function(x) {
      x.selector += ", " + g;
    }), t.hooks.add("before-sanity-check", function(x) {
      var F = (
        /** @type {HTMLPreElement} */
        x.element
      );
      if (F.matches(g)) {
        x.code = "", F.setAttribute(c, E);
        var A = F.appendChild(document.createElement("CODE"));
        A.textContent = r;
        var i = F.getAttribute("data-src"), a = x.language;
        if (a === "none") {
          var u = (/\.(\w+)$/.exec(i) || [, "none"])[1];
          a = p[u] || u;
        }
        t.util.setLanguage(A, a), t.util.setLanguage(F, a);
        var l = t.plugins.autoloader;
        l && l.loadLanguages(a), T(
          i,
          function(d) {
            F.setAttribute(c, b);
            var m = _(F.getAttribute("data-range"));
            if (m) {
              var y = d.split(/\r\n?|\n/g), h = m[0], w = m[1] == null ? y.length : m[1];
              h < 0 && (h += y.length), h = Math.max(0, Math.min(h - 1, y.length)), w < 0 && (w += y.length), w = Math.max(0, Math.min(w, y.length)), d = y.slice(h, w).join(`
`), F.hasAttribute("data-start") || F.setAttribute("data-start", String(h + 1));
            }
            A.textContent = d, t.highlightElement(A);
          },
          function(d) {
            F.setAttribute(c, v), A.textContent = d;
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
      highlight: function(F) {
        for (var A = (F || document).querySelectorAll(g), i = 0, a; a = A[i++]; )
          t.highlightElement(a);
      }
    };
    var R = !1;
    t.fileHighlight = function() {
      R || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), R = !0), t.plugins.fileHighlight.highlight.apply(this, arguments);
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
class ve {
  constructor(e) {
    f(this, "container");
    f(this, "project");
    f(this, "root");
    f(this, "canvasContainer");
    f(this, "codePanel");
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
    for (const g of t) {
      const T = this.project.passes[g];
      T && e.push({
        name: `${g.toLowerCase()}.glsl`,
        source: T.glslSource
      });
    }
    const r = this.project.passes.Image;
    e.push({ name: "image.glsl", source: r.glslSource });
    const s = document.createElement("div");
    s.className = "tab-bar";
    const o = document.createElement("div");
    o.className = "code-viewer";
    const p = document.createElement("button");
    p.className = "copy-button", p.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z" opacity="0.4"/>
        <path d="M2 5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2zm0 1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>
      </svg>
    `, p.title = "Copy code to clipboard";
    let c = "";
    const E = p.innerHTML, b = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
      </svg>
    `, v = (g) => {
      const T = e[g];
      c = T.source;
      const _ = document.createElement("pre"), R = document.createElement("code");
      R.className = "language-cpp", R.textContent = T.source, _.appendChild(R), o.innerHTML = "", o.appendChild(_), te.highlightElement(R);
    };
    p.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(c), p.innerHTML = b, p.classList.add("copied"), setTimeout(() => {
          p.innerHTML = E, p.classList.remove("copied");
        }, 1500);
      } catch (g) {
        console.error("Failed to copy:", g);
      }
    }), e.forEach((g, T) => {
      const _ = document.createElement("button");
      _.className = "tab-button", _.textContent = g.name, T === 0 && _.classList.add("active"), _.addEventListener("click", () => {
        s.querySelectorAll(".tab-button").forEach((R) => R.classList.remove("active")), _.classList.add("active"), v(T);
      }), s.appendChild(_);
    }), this.codePanel.appendChild(s), this.codePanel.appendChild(p), this.codePanel.appendChild(o), e.length > 0 && v(0);
  }
}
class Te {
  constructor(e) {
    f(this, "container");
    f(this, "project");
    f(this, "root");
    f(this, "canvasContainer");
    f(this, "contentArea");
    f(this, "codeViewer");
    f(this, "copyButton");
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
      const v = this.project.passes[b];
      v && t.push({
        name: `${b.toLowerCase()}.glsl`,
        isShader: !1,
        source: v.glslSource
      });
    }
    const s = this.project.passes.Image;
    t.push({ name: "image.glsl", isShader: !1, source: s.glslSource });
    let o = "";
    const p = this.copyButton.innerHTML, c = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
      </svg>
    `;
    this.copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(o), this.copyButton.innerHTML = c, this.copyButton.classList.add("copied"), setTimeout(() => {
          this.copyButton.innerHTML = p, this.copyButton.classList.remove("copied");
        }, 1500);
      } catch (b) {
        console.error("Failed to copy:", b);
      }
    });
    const E = (b) => {
      const v = t[b];
      if (e.querySelectorAll(".tabbed-tab-button").forEach((g, T) => {
        g.classList.toggle("active", T === b);
      }), v.isShader)
        this.canvasContainer.style.visibility = "visible", this.codeViewer.style.visibility = "hidden", this.copyButton.style.visibility = "hidden";
      else {
        this.canvasContainer.style.visibility = "hidden", this.codeViewer.style.visibility = "visible", this.copyButton.style.visibility = "visible", o = v.source || "";
        const g = o.split(`
`), T = document.createElement("pre"), _ = document.createElement("div");
        _.className = "tabbed-line-numbers", _.innerHTML = g.map((F, A) => A + 1).join(`
`);
        const R = document.createElement("div");
        R.className = "tabbed-code-content";
        const x = document.createElement("code");
        x.className = "language-cpp", x.textContent = o, R.appendChild(x), T.appendChild(_), T.appendChild(R), this.codeViewer.innerHTML = "", this.codeViewer.appendChild(T), te.highlightElement(x);
      }
    };
    return t.forEach((b, v) => {
      const g = document.createElement("button");
      g.className = "tabbed-tab-button", b.isShader && g.classList.add("shader-tab"), g.textContent = b.name, v === 0 && g.classList.add("active"), g.addEventListener("click", () => E(v)), e.appendChild(g);
    }), e;
  }
}
function xe(n, e) {
  switch (n) {
    case "fullscreen":
      return new Ee(e);
    case "centered":
      return new be(e);
    case "split":
      return new ve(e);
    case "tabbed":
      return new Te(e);
  }
}
async function _e(n, e, t, r) {
  return `/demos/${n}/shadertoy.config.json` in t ? we(n, t, e, r) : ye(n, e);
}
async function ye(n, e) {
  const t = `/demos/${n}/image.glsl`;
  if (!(t in e))
    throw new Error(`Demo '${n}' not found. Expected ${t}`);
  const r = await e[t]();
  return {
    root: `/demos/${n}`,
    meta: {
      title: n.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
      author: null,
      description: null
    },
    layout: "tabbed",
    controls: !0,
    commonSource: null,
    passes: {
      Image: {
        name: "Image",
        glslSource: r,
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
  var A, i, a, u, l, d, m, y;
  const s = `/demos/${n}/shadertoy.config.json`, o = await e[s]();
  let p = null;
  if (o.common) {
    const h = `/demos/${n}/${o.common}`;
    h in t && (p = await t[h]());
  } else {
    const h = `/demos/${n}/common.glsl`;
    h in t && (p = await t[h]());
  }
  const c = /* @__PURE__ */ new Set(), E = ["Image", "BufferA", "BufferB", "BufferC", "BufferD"];
  for (const h of E) {
    const w = o.passes[h];
    if (w)
      for (const C of ["iChannel0", "iChannel1", "iChannel2", "iChannel3"]) {
        const S = (A = w.channels) == null ? void 0 : A[C];
        S && "texture" in S && c.add(S.texture);
      }
  }
  const b = [], v = /* @__PURE__ */ new Map();
  for (const h of c) {
    const w = `/demos/${n}/${h.replace(/^\.\//, "")}`;
    if (!(w in r))
      throw new Error(`Texture not found: ${h} (expected at ${w})`);
    const C = await r[w](), S = h.split("/").pop().replace(/\.[^.]+$/, "");
    b.push({
      name: S,
      source: C,
      filter: "linear",
      wrap: "repeat"
    }), v.set(h, S);
  }
  const g = {};
  for (const h of E) {
    const w = o.passes[h];
    if (!w) continue;
    const C = {
      Image: "image.glsl",
      BufferA: "bufferA.glsl",
      BufferB: "bufferB.glsl",
      BufferC: "bufferC.glsl",
      BufferD: "bufferD.glsl"
    }, S = w.source || C[h], P = `/demos/${n}/${S}`;
    if (!(P in t))
      throw new Error(`Missing shader file: ${P}`);
    const $ = await t[P](), z = [
      X((i = w.channels) == null ? void 0 : i.iChannel0, v),
      X((a = w.channels) == null ? void 0 : a.iChannel1, v),
      X((u = w.channels) == null ? void 0 : u.iChannel2, v),
      X((l = w.channels) == null ? void 0 : l.iChannel3, v)
    ];
    g[h] = {
      name: h,
      glslSource: $,
      channels: z
    };
  }
  if (!g.Image)
    throw new Error(`Demo '${n}' must have an Image pass`);
  const T = ((d = o.meta) == null ? void 0 : d.title) || n.split("-").map((h) => h.charAt(0).toUpperCase() + h.slice(1)).join(" "), _ = ((m = o.meta) == null ? void 0 : m.author) || null, R = ((y = o.meta) == null ? void 0 : y.description) || null, x = o.layout || "tabbed", F = o.controls ?? !0;
  return {
    root: `/demos/${n}`,
    meta: { title: T, author: _, description: R },
    layout: x,
    controls: F,
    commonSource: p,
    passes: g,
    textures: b
  };
}
function X(n, e) {
  return n ? "buffer" in n ? {
    kind: "buffer",
    buffer: n.buffer,
    previous: !!n.previous
  } : "texture" in n ? {
    kind: "texture2D",
    name: (e == null ? void 0 : e.get(n.texture)) || n.texture
  } : "keyboard" in n ? { kind: "keyboard" } : { kind: "none" } : { kind: "none" };
}
const Fe = "course/day1/circle";
async function Re() {
  return _e(Fe, /* @__PURE__ */ Object.assign({
    "/demos/course/day1/circle/image.glsl": () => Promise.resolve().then(() => Ce).then((r) => r.default)
  }), /* @__PURE__ */ Object.assign({}), /* @__PURE__ */ Object.assign({}));
}
async function Le(n) {
  const e = typeof n.container == "string" ? document.querySelector(n.container) : n.container;
  if (!e || !(e instanceof HTMLElement))
    throw new Error(`Container not found: ${n.container}`);
  const t = await Re(), r = xe(t.layout, {
    container: e,
    project: t
  }), s = new ge({
    container: r.getCanvasContainer(),
    project: t,
    pixelRatio: n.pixelRatio ?? window.devicePixelRatio
  });
  return s.hasErrors() || s.start(), {
    app: s,
    destroy: () => {
      var o;
      (o = s.stop) == null || o.call(s);
    }
  };
}
const Ae = `void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    uv = uv - vec2(0.5, 0.5);
    uv.x *= iResolution.x / iResolution.y;
    vec2 p = uv * 4.0;
    
    float d = length(p);
    float r = 1.0;
    float f = d - r;
    
    vec3 color;
    if (f < 0.0) {
        color = vec3(1.0, 1.0, 0.0);  // yellow inside
    } else {
        color = vec3(0.1, 0.1, 0.3);  // dark blue outside
    }
    
    fragColor = vec4(color, 1.0);
}`, Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ae
}, Symbol.toStringTag, { value: "Module" }));
export {
  Fe as DEMO_NAME,
  Le as embed
};
