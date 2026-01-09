(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".shader-demo{position:relative;width:100%}.shader-demo canvas{display:block;width:100%;height:100%}.fps-counter{position:absolute;bottom:8px;left:8px;padding:6px 10px;background:#000000bf;color:#fff;font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;font-weight:500;border-radius:4px;pointer-events:none;-webkit-user-select:none;user-select:none;z-index:1000;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);box-shadow:0 2px 8px #0000004d}.playback-controls{position:absolute;bottom:8px;right:8px;display:flex;gap:8px;z-index:1000}.control-button{padding:6px 8px;background:#000000bf;color:#fff;border:none;border-radius:4px;cursor:pointer;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);box-shadow:0 2px 8px #0000004d;transition:all .2s ease;display:flex;align-items:center;justify-content:center;width:32px;height:32px}.control-button:hover{background:#000000d9;transform:scale(1.05)}.control-button:active{transform:scale(.95)}.control-button svg{width:16px;height:16px;fill:currentColor}.shader-error-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:#000000f2;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:2000;padding:60px;overflow-y:auto}.error-overlay-content{background:#1a1a1a;border-radius:6px;max-width:900px;width:100%;display:flex;flex-direction:column;box-shadow:0 20px 60px #000c,0 0 1px #ffffff1a;border:1px solid #2a2a2a;max-height:calc(100vh - 120px)}.error-header{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;background:linear-gradient(135deg,#c62828,#b71c1c);color:#fff;border-radius:6px 6px 0 0;border-bottom:1px solid rgba(0,0,0,.3);box-shadow:0 2px 8px #0003}.error-title{font-size:15px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;display:flex;align-items:center;gap:8px;letter-spacing:-.01em}.error-close{background:transparent;border:none;color:#ffffffe6;font-size:24px;line-height:1;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all .2s ease;opacity:.8}.error-close:hover{background:#ffffff26;opacity:1;transform:scale(1.05)}.error-body{padding:24px;overflow-y:auto;flex:1}.error-section{margin-bottom:24px}.error-section:last-child{margin-bottom:0}.error-pass-name{font-size:13px;font-weight:600;color:#ffa726;font-family:Monaco,Menlo,Courier New,monospace;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #2a2a2a;letter-spacing:.02em}.error-content{margin:0;padding:14px 16px;background:#0f0f0f;border-radius:4px;color:#ff6b6b;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.6;overflow-x:auto;border:1px solid #2a2a2a;white-space:pre-wrap;word-break:break-word}.error-code-context{margin:12px 0 0;padding:14px 16px;background:#0d0d0d;border-radius:4px;color:#b0b0b0;font-size:12px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.6;overflow-x:auto;border:1px solid #2a2a2a;white-space:pre}.error-code-context .context-line{color:#666;display:block}.error-code-context .error-line-highlight{color:#fff;background:#c6282840;display:block;font-weight:600;border-left:3px solid #c62828;margin-left:-16px;padding-left:13px}.layout-fullscreen{width:100%;height:100%}.layout-fullscreen .canvas-container{position:relative;width:100%;height:100%;background:#000}.layout-default{width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:60px}.layout-default .canvas-container{position:relative;width:800px;height:600px;background:#000;border-radius:8px;box-shadow:0 20px 60px #00000040,0 5px 15px #00000026;overflow:hidden}.layout-split{width:100%;height:100%;display:flex;gap:40px;padding:120px 140px}.layout-split .canvas-container{position:relative;flex:1;background:#000;border-radius:8px;box-shadow:0 10px 30px #0003,0 3px 8px #0000001f;overflow:hidden}.layout-split .code-panel{position:relative;flex:1;display:flex;flex-direction:column;background:#fff;border-radius:8px;box-shadow:0 10px 30px #0003,0 3px 8px #0000001f;overflow:hidden}.tab-bar{display:flex;background:#f8f8f8;border-bottom:1px solid #e0e0e0;padding:8px 8px 0;gap:4px}.tab-button{padding:8px 16px;background:transparent;border:none;border-radius:6px 6px 0 0;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;cursor:pointer;transition:background .2s;color:#666}.tab-button:hover{background:#e8e8e8}.tab-button.active{background:#fff;color:#000;font-weight:500}.copy-button{position:absolute;top:12px;right:12px;padding:6px;background:transparent;border:none;border-radius:4px;color:#666;cursor:pointer;transition:all .2s;z-index:10;display:flex;align-items:center;justify-content:center}.copy-button:hover{background:#0000000d;color:#333}.copy-button:active{transform:scale(.9)}.copy-button.copied{color:#4caf50}.code-viewer{flex:1;min-height:0;overflow:auto;position:relative;background:#fff}.code-viewer pre{margin:0;padding:16px;font-size:13px;line-height:1.5;font-family:Monaco,Menlo,Courier New,monospace;background:#fff}.code-viewer code{font-family:inherit;font-size:inherit}.token.comment{color:#6a9955}.token.keyword{color:#00f}.token.string{color:#a31515}.token.number{color:#098658}.token.operator{color:#000}.token.function{color:#795e26}.token.class-name{color:#267f99}.token.punctuation{color:#000}.tab-button.image-tab,.tab-button.image-tab.active{color:#7c4dff}.image-viewer{display:flex;align-items:center;justify-content:center;height:100%;padding:16px;background:#f5f5f5}.image-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 2px 8px #0000001a}@media (max-width: 1800px){.layout-split{padding:100px 120px}}@media (max-width: 1600px){.layout-split{padding:80px 100px}}@media (max-width: 1400px){.layout-split{padding:60px 80px}}@media (max-width: 1200px){.layout-split{padding:50px 60px}}@media (max-width: 1000px){.layout-split{padding:40px 50px}}@media (max-width: 800px){.layout-split{flex-direction:column;padding:30px;gap:30px}}.layout-tabbed{--tab-border: #e0e0e0;--code-bg: white;--code-text: #000;--line-number-text: #999}.layout-tabbed{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px;box-sizing:border-box}.tabbed-wrapper{display:flex;flex-direction:column;width:800px;max-width:100%;height:650px;max-height:100%;border-radius:8px;box-shadow:0 20px 60px #00000040,0 5px 15px #00000026;overflow:hidden}.tabbed-toolbar{display:flex;align-items:center;flex-shrink:0;background:#f8f8f8;border-bottom:1px solid #e0e0e0;padding-right:8px}.tabbed-tab-bar{display:flex;flex:1;gap:4px;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin}.tabbed-tab-bar::-webkit-scrollbar{height:4px}.tabbed-tab-bar::-webkit-scrollbar-thumb{background:#ccc;border-radius:2px}.tabbed-tab-button{padding:10px 16px;background:transparent;border:none;border-bottom:2px solid transparent;font-size:12px;font-family:Monaco,Menlo,Courier New,monospace;cursor:pointer;transition:color .15s,border-color .15s;color:#666;white-space:nowrap;flex-shrink:0}.tabbed-tab-button:hover{color:#333}.tabbed-tab-button.active{color:#000;border-bottom-color:#4a9eff}.tabbed-tab-button.shader-tab{font-family:system-ui,-apple-system,sans-serif}.tabbed-tab-button.image-tab{color:#7c4dff}.tabbed-tab-button.image-tab.active{color:#7c4dff;border-bottom-color:#7c4dff}.tabbed-content{flex:1;min-height:0;position:relative;background:#000;overflow:hidden}.tabbed-canvas-container{position:absolute;top:0;left:0;width:100%;height:100%}.tabbed-code-viewer{position:absolute;top:0;left:0;width:100%;height:100%;overflow:auto;background:var(--code-bg)}.tabbed-code-viewer pre{margin:0;padding:16px 16px 16px 0;font-size:13px;line-height:1.6;font-family:Monaco,Menlo,Courier New,monospace;background:var(--code-bg);color:var(--code-text);display:flex}.tabbed-code-viewer code{font-family:inherit;font-size:inherit}.tabbed-line-numbers{text-align:right;padding-right:16px;margin-right:16px;border-right:1px solid var(--tab-border);color:var(--line-number-text);-webkit-user-select:none;user-select:none;flex-shrink:0;padding-left:16px}.tabbed-code-content{flex:1;overflow-x:auto}.tabbed-image-viewer{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f5f5f5;padding:20px;box-sizing:border-box}.tabbed-image-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 2px 8px #00000026}.tabbed-code-viewer .token.comment{color:#6a9955}.tabbed-code-viewer .token.keyword{color:#00f}.tabbed-code-viewer .token.string{color:#a31515}.tabbed-code-viewer .token.number{color:#098658}.tabbed-code-viewer .token.operator{color:#000}.tabbed-code-viewer .token.function{color:#795e26}.tabbed-code-viewer .token.class-name{color:#267f99}.tabbed-code-viewer .token.punctuation{color:#000}[data-bs-theme=dark] .tabbed-code-viewer .token.comment,.dark .tabbed-code-viewer .token.comment{color:#6a9955}[data-bs-theme=dark] .tabbed-code-viewer .token.keyword,.dark .tabbed-code-viewer .token.keyword{color:#569cd6}[data-bs-theme=dark] .tabbed-code-viewer .token.string,.dark .tabbed-code-viewer .token.string{color:#ce9178}[data-bs-theme=dark] .tabbed-code-viewer .token.number,.dark .tabbed-code-viewer .token.number{color:#b5cea8}[data-bs-theme=dark] .tabbed-code-viewer .token.operator,.dark .tabbed-code-viewer .token.operator{color:#d4d4d4}[data-bs-theme=dark] .tabbed-code-viewer .token.function,.dark .tabbed-code-viewer .token.function{color:#dcdcaa}[data-bs-theme=dark] .tabbed-code-viewer .token.class-name,.dark .tabbed-code-viewer .token.class-name{color:#4ec9b0}[data-bs-theme=dark] .tabbed-code-viewer .token.punctuation,.dark .tabbed-code-viewer .token.punctuation{color:#d4d4d4}@media (max-width: 1200px){.layout-tabbed{padding:40px 60px}}@media (max-width: 900px){.layout-tabbed{padding:30px 40px}}@media (max-width: 600px){.layout-tabbed{padding:20px}.tabbed-tab-button{padding:8px 12px;font-size:12px}}.tabbed-editor-container{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;background:#fff}.tabbed-button-container{display:flex;align-items:center;gap:6px;flex-shrink:0}.tabbed-copy-button{display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid #ccc;color:#666;width:32px;height:32px;border-radius:4px;cursor:pointer;transition:background .15s,border-color .15s,color .15s}.tabbed-copy-button:hover{background:#f0f0f0;border-color:#999;color:#333}.tabbed-copy-button:active{background:#e0e0e0}.tabbed-copy-button.copied{background:#e8f5e9;border-color:#4caf50;color:#4caf50}.tabbed-recompile-button{display:flex;align-items:center;gap:6px;background:#4a9eff;border:none;color:#fff;padding:6px 12px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;transition:background .15s}.tabbed-recompile-button:hover{background:#3a8eef}.tabbed-recompile-button:active{background:#2a7edf}.tabbed-recompile-button svg{flex-shrink:0}.tabbed-error-display{position:absolute;bottom:0;left:0;right:0;background:#fff0f0;color:#c00;padding:10px 14px;font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;white-space:pre-wrap;overflow:auto;max-height:120px;border-top:1px solid #fcc;z-index:10}.tabbed-fallback-textarea{width:100%;height:100%;background:#fff;color:#000;border:none;padding:12px;font-family:Monaco,Menlo,Courier New,monospace;font-size:13px;resize:none;outline:none}.editor-toolbar{display:flex;align-items:center;background:#f8f8f8;border-bottom:1px solid #e0e0e0;padding-right:8px}.editor-tab-bar{display:flex;flex:1;overflow-x:auto;scrollbar-width:thin}.editor-tab-button{background:transparent;border:none;color:#666;padding:10px 16px;cursor:pointer;font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;white-space:nowrap;border-bottom:2px solid transparent;transition:color .15s,border-color .15s}.editor-tab-button:hover{color:#333}.editor-tab-button.active{color:#000;border-bottom-color:#4a9eff}.editor-tab-button.image-tab{color:#7c4dff}.editor-tab-button.image-tab.active{color:#7c4dff;border-bottom-color:#7c4dff}.editor-copy-button{display:flex;align-items:center;justify-content:center;background:transparent;border:1px solid #ccc;color:#666;width:32px;height:32px;border-radius:4px;cursor:pointer;transition:background .15s,border-color .15s,color .15s;flex-shrink:0;margin-right:6px}.editor-copy-button:hover{background:#f0f0f0;border-color:#999;color:#333}.editor-copy-button:active{background:#e0e0e0}.editor-copy-button.copied{background:#e8f5e9;border-color:#4caf50;color:#4caf50}.editor-copy-button svg{flex-shrink:0}.editor-recompile-button{display:flex;align-items:center;gap:6px;background:#4a9eff;border:none;color:#fff;padding:6px 12px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;transition:background .15s;flex-shrink:0}.editor-recompile-button:hover{background:#3a8eef}.editor-recompile-button:active{background:#2a7edf}.editor-recompile-button svg{flex-shrink:0}.editor-content-area{flex:1;overflow:hidden;position:relative;background:#fff}.editor-prism-container{height:100%;width:100%}.editor-fallback-textarea{width:100%;height:100%;background:#fff;color:#000;border:none;padding:12px;font-family:Monaco,Menlo,Courier New,monospace;font-size:13px;resize:none;outline:none}.editor-image-viewer{display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;padding:20px}.editor-image-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:0 2px 8px #00000026}.editor-error-display{background:#fff0f0;color:#c00;padding:10px 14px;font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;white-space:pre-wrap;overflow:auto;max-height:120px;border-top:1px solid #fcc}.prism-editor-wrapper{display:flex;height:100%;background:#fff;font-family:Monaco,Menlo,Courier New,monospace;font-size:13px;line-height:1.6}.prism-editor-line-numbers{flex-shrink:0;padding:16px 12px 16px 16px;text-align:right;color:#999;border-right:1px solid #e0e0e0;-webkit-user-select:none;user-select:none;overflow:hidden}.prism-editor-line-numbers span{display:block}.prism-editor-area{flex:1;position:relative;overflow:hidden}.prism-editor-textarea,.prism-editor-highlight{position:absolute;top:0;left:0;width:100%;height:100%;padding:16px;margin:0;border:none;outline:none;font-family:inherit;font-size:inherit;line-height:inherit;white-space:pre-wrap;word-wrap:break-word;overflow:auto;box-sizing:border-box}.prism-editor-textarea{background:transparent;color:transparent;caret-color:#000;resize:none;z-index:1;-webkit-text-fill-color:transparent}.prism-editor-textarea::selection{background:#add6ff66}.prism-editor-textarea::-moz-selection{background:#add6ff66}.prism-editor-highlight{background:#fff;color:#000;pointer-events:none;z-index:0}.prism-editor-highlight code{font-family:inherit;font-size:inherit;background:none;padding:0}.prism-editor-highlight .token.comment{color:#6a9955}.prism-editor-highlight .token.keyword{color:#00f}.prism-editor-highlight .token.string{color:#a31515}.prism-editor-highlight .token.number{color:#098658}.prism-editor-highlight .token.operator{color:#000}.prism-editor-highlight .token.function{color:#795e26}.prism-editor-highlight .token.class-name{color:#267f99}.prism-editor-highlight .token.punctuation{color:#000}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
var he = Object.defineProperty;
var pe = (r, e, t) => e in r ? he(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var h = (r, e, t) => pe(r, typeof e != "symbol" ? e + "" : e, t);
function Y(r, e, t) {
  const n = r.createShader(e);
  if (!n)
    throw new Error("Failed to create shader object");
  if (r.shaderSource(n, t), r.compileShader(n), !r.getShaderParameter(n, r.COMPILE_STATUS)) {
    const l = r.getShaderInfoLog(n);
    throw r.deleteShader(n), new Error(`Shader compilation failed:
${l}`);
  }
  return n;
}
function Z(r, e, t) {
  const n = Y(r, r.VERTEX_SHADER, e), s = Y(r, r.FRAGMENT_SHADER, t), l = r.createProgram();
  if (!l)
    throw new Error("Failed to create program object");
  if (r.attachShader(l, n), r.attachShader(l, s), r.linkProgram(l), !r.getProgramParameter(l, r.LINK_STATUS)) {
    const a = r.getProgramInfoLog(l);
    throw r.deleteProgram(l), r.deleteShader(n), r.deleteShader(s), new Error(`Program linking failed:
${a}`);
  }
  return r.detachShader(l, n), r.detachShader(l, s), r.deleteShader(n), r.deleteShader(s), l;
}
function fe(r) {
  const e = r.createVertexArray();
  if (!e)
    throw new Error("Failed to create VAO");
  r.bindVertexArray(e);
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
  ]), n = r.createBuffer();
  if (!n)
    throw new Error("Failed to create VBO");
  return r.bindBuffer(r.ARRAY_BUFFER, n), r.bufferData(r.ARRAY_BUFFER, t, r.STATIC_DRAW), r.enableVertexAttribArray(0), r.vertexAttribPointer(
    0,
    // attribute location
    2,
    // size (vec2)
    r.FLOAT,
    // type
    !1,
    // normalized
    0,
    // stride
    0
    // offset
  ), r.bindVertexArray(null), r.bindBuffer(r.ARRAY_BUFFER, null), e;
}
function O(r, e, t) {
  const n = r.createTexture();
  if (!n)
    throw new Error("Failed to create texture");
  return r.bindTexture(r.TEXTURE_2D, n), r.texImage2D(
    r.TEXTURE_2D,
    0,
    // mip level
    r.RGBA32F,
    // internal format (32-bit float per channel)
    e,
    t,
    0,
    // border (must be 0)
    r.RGBA,
    // format
    r.FLOAT,
    // type
    null
    // no data (allocate only)
  ), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.bindTexture(r.TEXTURE_2D, null), n;
}
function J(r, e) {
  const t = r.createFramebuffer();
  if (!t)
    throw new Error("Failed to create framebuffer");
  r.bindFramebuffer(r.FRAMEBUFFER, t), r.framebufferTexture2D(
    r.FRAMEBUFFER,
    r.COLOR_ATTACHMENT0,
    r.TEXTURE_2D,
    e,
    0
    // mip level
  );
  const n = r.checkFramebufferStatus(r.FRAMEBUFFER);
  if (n !== r.FRAMEBUFFER_COMPLETE)
    throw r.deleteFramebuffer(t), new Error(`Framebuffer incomplete: ${Ee(r, n)}`);
  return r.bindFramebuffer(r.FRAMEBUFFER, null), t;
}
function me(r) {
  const e = r.createTexture();
  if (!e)
    throw new Error("Failed to create black texture");
  r.bindTexture(r.TEXTURE_2D, e);
  const t = new Float32Array([0, 0, 0, 1]);
  return r.texImage2D(
    r.TEXTURE_2D,
    0,
    r.RGBA32F,
    1,
    1,
    0,
    r.RGBA,
    r.FLOAT,
    t
  ), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.bindTexture(r.TEXTURE_2D, null), e;
}
function ge(r) {
  const e = r.createTexture();
  if (!e)
    throw new Error("Failed to create keyboard texture");
  r.bindTexture(r.TEXTURE_2D, e);
  const t = 256, n = 3, s = new Float32Array(t * n * 4);
  return r.texImage2D(
    r.TEXTURE_2D,
    0,
    r.RGBA32F,
    t,
    n,
    0,
    r.RGBA,
    r.FLOAT,
    s
  ), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.NEAREST), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.bindTexture(r.TEXTURE_2D, null), e;
}
function be(r, e, t, n) {
  const i = new Float32Array(3072);
  for (let a = 0; a < 256; a++) {
    const f = t.get(a) || !1, g = n.get(a) || 0, v = (0 * 256 + a) * 4;
    i[v + 0] = f ? 1 : 0, i[v + 1] = f ? 1 : 0, i[v + 2] = f ? 1 : 0, i[v + 3] = 1;
    const w = (2 * 256 + a) * 4;
    i[w + 0] = g, i[w + 1] = g, i[w + 2] = g, i[w + 3] = 1;
  }
  r.bindTexture(r.TEXTURE_2D, e), r.texSubImage2D(
    r.TEXTURE_2D,
    0,
    0,
    0,
    // x, y offset
    256,
    3,
    r.RGBA,
    r.FLOAT,
    i
  ), r.bindTexture(r.TEXTURE_2D, null);
}
function Ee(r, e) {
  switch (e) {
    case r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
      return "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
    case r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
      return "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
    case r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
      return "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
    case r.FRAMEBUFFER_UNSUPPORTED:
      return "FRAMEBUFFER_UNSUPPORTED";
    case r.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE:
      return "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE";
    default:
      return `Unknown status: ${e}`;
  }
}
const Q = `#version 300 es
precision highp float;

layout(location = 0) in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`, ne = `#version 300 es
precision highp float;

// Shadertoy compatibility: equirectangular texture sampling
const float ST_PI = 3.14159265359;
const float ST_TWOPI = 6.28318530718;
vec2 _st_dirToEquirect(vec3 dir) {
  float phi = atan(dir.z, dir.x);
  float theta = asin(dir.y);
  return vec2(phi / ST_TWOPI + 0.5, theta / ST_PI + 0.5);
}
`, ve = ne.split(`
`).length - 1;
class ye {
  constructor(e) {
    h(this, "project");
    h(this, "gl");
    h(this, "_width");
    h(this, "_height");
    h(this, "_frame", 0);
    h(this, "_time", 0);
    h(this, "_lastStepTime", null);
    h(this, "_passes", []);
    h(this, "_textures", []);
    h(this, "_keyboardTexture", null);
    h(this, "_blackTexture", null);
    // Keyboard state tracking (Maps keycodes to state)
    h(this, "_keyStates", /* @__PURE__ */ new Map());
    // true = down, false = up
    h(this, "_toggleStates", /* @__PURE__ */ new Map());
    // 0.0 or 1.0
    // Compilation errors (if any occurred during initialization)
    h(this, "_compilationErrors", []);
    this.gl = e.gl, this.project = e.project, this._width = this.gl.drawingBufferWidth, this._height = this.gl.drawingBufferHeight, this.initExtensions(), this._blackTexture = me(this.gl);
    const t = ge(this.gl);
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
    const n = this.gl, s = this._lastStepTime === null ? 0 : e - this._lastStepTime;
    this._lastStepTime = e, this._time = e;
    const l = [this._width, this._height, 1], i = this._time, a = s, f = this._frame, g = t;
    n.viewport(0, 0, this._width, this._height);
    const v = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"];
    for (const w of v) {
      const x = this._passes.find((C) => C.name === w);
      x && (this.executePass(x, {
        iResolution: l,
        iTime: i,
        iTimeDelta: a,
        iFrame: f,
        iMouse: g
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
    const n = this.gl;
    for (const s of this._passes)
      n.deleteTexture(s.currentTexture), n.deleteTexture(s.previousTexture), n.deleteFramebuffer(s.framebuffer), s.currentTexture = O(n, e, t), s.previousTexture = O(n, e, t), s.framebuffer = J(n, s.currentTexture);
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
    const n = this._keyStates.get(e) || !1;
    if (this._keyStates.set(e, t), t && !n) {
      const s = this._toggleStates.get(e) || 0;
      this._toggleStates.set(e, s === 0 ? 1 : 0);
    }
  }
  /**
   * Update keyboard texture with current key states.
   * Should be called once per frame before rendering.
   */
  updateKeyboardTexture() {
    this._keyboardTexture && be(
      this.gl,
      this._keyboardTexture.texture,
      this._keyStates,
      this._toggleStates
    );
  }
  /**
   * Recompile a single pass with new GLSL source code.
   * Used for live editing - keeps the old shader running if compilation fails.
   *
   * @param passName - Name of the pass to recompile ('Image', 'BufferA', etc.)
   * @param newSource - New GLSL source code for the pass
   * @returns Object with success status and error message if failed
   */
  recompilePass(e, t) {
    const n = this.gl, s = this._passes.find((a) => a.name === e);
    if (!s)
      return { success: !1, error: `Pass '${e}' not found` };
    const l = this.project.passes[e];
    if (!l)
      return { success: !1, error: `Project pass '${e}' not found` };
    const i = this.buildFragmentShader(t, l.channels);
    try {
      const a = Z(n, Q, i);
      n.deleteProgram(s.uniforms.program);
      const f = {
        program: a,
        iResolution: n.getUniformLocation(a, "iResolution"),
        iTime: n.getUniformLocation(a, "iTime"),
        iTimeDelta: n.getUniformLocation(a, "iTimeDelta"),
        iFrame: n.getUniformLocation(a, "iFrame"),
        iMouse: n.getUniformLocation(a, "iMouse"),
        iChannel: [
          n.getUniformLocation(a, "iChannel0"),
          n.getUniformLocation(a, "iChannel1"),
          n.getUniformLocation(a, "iChannel2"),
          n.getUniformLocation(a, "iChannel3")
        ]
      };
      return s.uniforms = f, l.glslSource = t, this._compilationErrors = this._compilationErrors.filter((g) => g.passName !== e), { success: !0 };
    } catch (a) {
      return { success: !1, error: a instanceof Error ? a.message : String(a) };
    }
  }
  /**
   * Recompile common.glsl and all passes that use it.
   * Used for live editing of common code.
   *
   * @param newCommonSource - New GLSL source code for common.glsl
   * @returns Object with success status and errors for each failed pass
   */
  recompileCommon(e) {
    const t = this.project.commonSource;
    this.project.commonSource = e;
    const n = [], s = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"];
    for (const l of s) {
      const i = this.project.passes[l];
      if (!i) continue;
      const a = this.recompilePass(l, i.glslSource);
      a.success || n.push({ passName: l, error: a.error || "Unknown error" });
    }
    if (n.length > 0) {
      this.project.commonSource = t;
      for (const l of s) {
        const i = this.project.passes[l];
        i && (n.some((a) => a.passName === l) || this.recompilePass(l, i.glslSource));
      }
      return { success: !1, errors: n };
    }
    return { success: !0, errors: [] };
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
      const n = e.createTexture();
      if (!n)
        throw new Error("Failed to create texture");
      e.bindTexture(e.TEXTURE_2D, n), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
      const s = {
        name: t.name,
        texture: n,
        width: 1,
        height: 1
      };
      this._textures.push(s);
      const l = new Image();
      l.crossOrigin = "anonymous", l.onload = () => {
        e.bindTexture(e.TEXTURE_2D, n), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, l);
        const i = t.filter === "nearest" ? e.NEAREST : e.LINEAR;
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, i), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, i);
        const a = t.wrap === "clamp" ? e.CLAMP_TO_EDGE : e.REPEAT;
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, a), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, a), t.filter === "linear" && e.generateMipmap(e.TEXTURE_2D), s.width = l.width, s.height = l.height, console.log(`Loaded texture '${t.name}': ${l.width}x${l.height}`);
      }, l.onerror = () => {
        console.error(`Failed to load texture '${t.name}' from ${t.source}`);
      }, l.src = t.source;
    }
  }
  /**
   * Compile shaders, create VAOs/FBOs/textures, and build RuntimePass array.
   */
  initRuntimePasses() {
    const e = this.gl, t = this.project, n = fe(e), s = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"];
    for (const l of s) {
      const i = t.passes[l];
      if (!i) continue;
      const a = this.buildFragmentShader(i.glslSource, i.channels);
      try {
        const f = Z(e, Q, a), g = {
          program: f,
          iResolution: e.getUniformLocation(f, "iResolution"),
          iTime: e.getUniformLocation(f, "iTime"),
          iTimeDelta: e.getUniformLocation(f, "iTimeDelta"),
          iFrame: e.getUniformLocation(f, "iFrame"),
          iMouse: e.getUniformLocation(f, "iMouse"),
          iChannel: [
            e.getUniformLocation(f, "iChannel0"),
            e.getUniformLocation(f, "iChannel1"),
            e.getUniformLocation(f, "iChannel2"),
            e.getUniformLocation(f, "iChannel3")
          ]
        }, v = O(e, this._width, this._height), w = O(e, this._width, this._height), x = J(e, v), C = {
          name: l,
          projectChannels: i.channels,
          vao: n,
          uniforms: g,
          framebuffer: x,
          currentTexture: v,
          previousTexture: w
        };
        this._passes.push(C);
      } catch (f) {
        const g = f instanceof Error ? f.message : String(f), v = this.getLineMapping(), w = g.match(/ERROR:\s*\d+:(\d+):/);
        let x = !1, C = null;
        if (w && this.project.commonSource) {
          const R = parseInt(w[1], 10), y = v.boilerplateLinesBeforeCommon + 2, E = y + v.commonLineCount - 1;
          R >= y && R <= E && (x = !0, C = R - y + 1);
        }
        this._compilationErrors.push({
          passName: l,
          error: g,
          source: a,
          isFromCommon: x,
          originalLine: C
        }), console.error(`Failed to compile ${l}:`, g);
      }
    }
  }
  /**
   * Calculate line number mappings for error reporting.
   * Returns info about where common.glsl code lives in the compiled shader.
   */
  getLineMapping() {
    const e = ve + 1, t = this.project.commonSource ? this.project.commonSource.split(`
`).length : 0;
    return { boilerplateLinesBeforeCommon: e, commonLineCount: t };
  }
  /**
   * Build complete fragment shader source with Shadertoy boilerplate.
   *
   * @param userSource - The user's GLSL source code
   * @param channels - Channel configuration for this pass (to detect cubemap textures)
   */
  buildFragmentShader(e, t) {
    const n = [ne];
    this.project.commonSource && (n.push("// Common code"), n.push(this.project.commonSource), n.push("")), n.push(`// Shadertoy built-in uniforms
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
    const s = this.preprocessCubemapTextures(e, t);
    return n.push("// User shader code"), n.push(s), n.push(""), n.push(`// Main wrapper
out vec4 fragColor;

void main() {
  mainImage(fragColor, gl_FragCoord.xy);
}`), n.join(`
`);
  }
  /**
   * Preprocess shader to convert cubemap-style texture() calls to equirectangular.
   *
   * Uses the channel configuration to determine which channels are cubemaps.
   * Only channels explicitly marked as `type: 'cubemap'` in config.json will have
   * their texture() calls wrapped with _st_dirToEquirect().
   *
   * @param source - User's GLSL source code
   * @param channels - Channel configuration for this pass
   */
  preprocessCubemapTextures(e, t) {
    const n = /* @__PURE__ */ new Set();
    if (t.forEach((l, i) => {
      l.kind === "texture" && l.cubemap && n.add(`iChannel${i}`);
    }), n.size === 0)
      return e;
    const s = /texture\s*\(\s*(iChannel[0-3])\s*,\s*([^)]+)\)/g;
    return e.replace(s, (l, i, a) => n.has(i) ? `texture(${i}, _st_dirToEquirect(${a}))` : l);
  }
  // ===========================================================================
  // Pass Execution
  // ===========================================================================
  executePass(e, t) {
    const n = this.gl;
    n.bindFramebuffer(n.FRAMEBUFFER, e.framebuffer), n.useProgram(e.uniforms.program), n.bindVertexArray(e.vao), this.bindBuiltinUniforms(e.uniforms, t), this.bindChannelTextures(e), n.drawArrays(n.TRIANGLES, 0, 3), n.bindVertexArray(null), n.useProgram(null), n.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  bindBuiltinUniforms(e, t) {
    const n = this.gl;
    e.iResolution && n.uniform3f(e.iResolution, t.iResolution[0], t.iResolution[1], t.iResolution[2]), e.iTime && n.uniform1f(e.iTime, t.iTime), e.iTimeDelta && n.uniform1f(e.iTimeDelta, t.iTimeDelta), e.iFrame && n.uniform1i(e.iFrame, t.iFrame), e.iMouse && n.uniform4f(e.iMouse, t.iMouse[0], t.iMouse[1], t.iMouse[2], t.iMouse[3]);
  }
  bindChannelTextures(e) {
    const t = this.gl;
    for (let n = 0; n < 4; n++) {
      const s = e.projectChannels[n], l = this.resolveChannelTexture(s);
      t.activeTexture(t.TEXTURE0 + n), t.bindTexture(t.TEXTURE_2D, l);
      const i = e.uniforms.iChannel[n];
      i && t.uniform1i(i, n);
    }
  }
  /**
   * Resolve a ChannelSource to an actual WebGLTexture to bind.
   */
  resolveChannelTexture(e) {
    switch (e.kind) {
      case "none":
        if (!this._blackTexture)
          throw new Error("Black texture not initialized");
        return this._blackTexture;
      case "buffer": {
        const n = this._passes.find((s) => s.name === e.buffer);
        if (!n)
          throw new Error(`Buffer '${e.buffer}' not found`);
        return e.current ? n.currentTexture : n.previousTexture;
      }
      case "texture": {
        const n = this._textures.find((s) => s.name === e.name);
        if (!n)
          throw new Error(`Texture '${e.name}' not found`);
        return n.texture;
      }
      case "keyboard":
        if (!this._keyboardTexture)
          throw new Error("Internal error: keyboard texture not initialized");
        return this._keyboardTexture.texture;
      default:
        const t = e;
        throw new Error(`Unknown channel source: ${JSON.stringify(t)}`);
    }
  }
  /**
   * Swap current and previous textures for a pass (ping-pong).
   * Also reattach framebuffer to new current texture.
   */
  swapPassTextures(e) {
    const t = this.gl, n = e.currentTexture;
    e.currentTexture = e.previousTexture, e.previousTexture = n, t.bindFramebuffer(t.FRAMEBUFFER, e.framebuffer), t.framebufferTexture2D(
      t.FRAMEBUFFER,
      t.COLOR_ATTACHMENT0,
      t.TEXTURE_2D,
      e.currentTexture,
      0
    ), t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
}
class Te {
  constructor(e) {
    h(this, "container");
    h(this, "canvas");
    h(this, "gl");
    h(this, "engine");
    h(this, "project");
    h(this, "pixelRatio");
    h(this, "animationId", null);
    h(this, "startTime", 0);
    // Mouse state for iMouse uniform
    h(this, "mouse", [0, 0, -1, -1]);
    // FPS tracking
    h(this, "fpsDisplay");
    h(this, "frameCount", 0);
    h(this, "lastFpsUpdate", 0);
    h(this, "currentFps", 0);
    // Playback controls
    h(this, "controlsContainer", null);
    h(this, "playPauseButton", null);
    h(this, "isPaused", !1);
    // Error overlay
    h(this, "errorOverlay", null);
    // Resize observer
    h(this, "resizeObserver");
    // Visibility observer (auto-pause when off-screen)
    h(this, "intersectionObserver");
    h(this, "isVisible", !0);
    // ===========================================================================
    // Animation Loop
    // ===========================================================================
    h(this, "animate", (e) => {
      if (this.animationId = requestAnimationFrame(this.animate), this.isPaused || !this.isVisible)
        return;
      const t = e / 1e3, n = t - this.startTime;
      this.updateFps(t), this.engine.updateKeyboardTexture(), this.engine.step(n, this.mouse), this.presentToScreen();
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
    this.gl = t, this.updateCanvasSize(), this.engine = new ye({
      gl: this.gl,
      project: e.project
    }), this.engine.hasErrors() && this.showErrorOverlay(this.engine.getCompilationErrors()), this.resizeObserver = new ResizeObserver(() => {
      this.updateCanvasSize(), this.engine.resize(this.canvas.width, this.canvas.height), this.startTime = performance.now() / 1e3, this.engine.reset();
    }), this.resizeObserver.observe(this.container), this.intersectionObserver = new IntersectionObserver(
      (n) => {
        const s = n[0];
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
   * Get the underlying engine instance.
   * Used for live recompilation in editor mode.
   */
  getEngine() {
    return this.engine;
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
    const e = this.container.getBoundingClientRect(), t = Math.floor(e.width * this.pixelRatio), n = Math.floor(e.height * this.pixelRatio);
    (this.canvas.width !== t || this.canvas.height !== n) && (this.canvas.width = t, this.canvas.height = n);
  }
  // ===========================================================================
  // Mouse Tracking
  // ===========================================================================
  setupMouseTracking() {
    const e = (n) => {
      const s = this.canvas.getBoundingClientRect(), l = (n.clientX - s.left) * this.pixelRatio, i = (s.height - (n.clientY - s.top)) * this.pixelRatio;
      this.mouse[0] = l, this.mouse[1] = i;
    }, t = (n) => {
      const s = this.canvas.getBoundingClientRect(), l = (n.clientX - s.left) * this.pixelRatio, i = (s.height - (n.clientY - s.top)) * this.pixelRatio;
      this.mouse[2] = l, this.mouse[3] = i;
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
    const e = this.project.root.split("/").pop() || "shader", t = /* @__PURE__ */ new Date(), n = t.getFullYear().toString() + (t.getMonth() + 1).toString().padStart(2, "0") + t.getDate().toString().padStart(2, "0") + "-" + t.getHours().toString().padStart(2, "0") + t.getMinutes().toString().padStart(2, "0") + t.getSeconds().toString().padStart(2, "0"), s = `shadertoy-${e}-${n}.png`;
    this.canvas.toBlob((l) => {
      if (!l) {
        console.error("Failed to create screenshot blob");
        return;
      }
      const i = URL.createObjectURL(l), a = document.createElement("a");
      a.href = i, a.download = s, a.click(), URL.revokeObjectURL(i), console.log(`Screenshot saved: ${s}`);
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
    const t = e.filter((g) => g.isFromCommon), n = e.filter((g) => !g.isFromCommon), a = [...t.length > 0 ? [t[0]] : [], ...n].map(({ passName: g, error: v, source: w, isFromCommon: x, originalLine: C }) => {
      const R = v.replace(`Shader compilation failed:
`, "");
      let y = R;
      return x && C !== null && (y = R.replace(/Line \d+:/, `Line ${C}:`), y = y.replace(/ERROR:\s*\d+:(\d+):/, `ERROR: 0:${C}:`)), {
        passName: x ? "common.glsl" : g,
        error: this.parseShaderError(y),
        codeContext: x ? this.extractCodeContextFromCommon(C) : this.extractCodeContext(y, w)
      };
    }).map(({ passName: g, error: v, codeContext: w }) => `
      <div class="error-section">
        <div class="error-pass-name">${g}</div>
        <pre class="error-content">${this.escapeHTML(v)}</pre>
        ${w ? `<pre class="error-code-context">${w}</pre>` : ""}
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
          ${a}
        </div>
      </div>
    `;
    const f = this.errorOverlay.querySelector(".error-close");
    f && f.addEventListener("click", () => this.hideErrorOverlay());
  }
  /**
   * Parse and improve WebGL shader error messages.
   */
  parseShaderError(e) {
    return e.split(`
`).map((t) => {
      const n = t.match(/^ERROR:\s*(\d+):(\d+):\s*(.+)$/);
      if (n) {
        const [, , s, l] = n;
        return `Line ${s}: ${l}`;
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
    const n = e.match(/ERROR:\s*\d+:(\d+):/);
    if (!n) return null;
    const s = parseInt(n[1], 10), l = t.split(`
`), i = 3, a = Math.max(0, s - i - 1), f = Math.min(l.length, s + i);
    return l.slice(a, f).map((w, x) => {
      const C = a + x + 1, R = C === s, y = String(C).padStart(4, " "), E = this.escapeHTML(w);
      return R ? `<span class="error-line-highlight">${y} │ ${E}</span>` : `<span class="context-line">${y} │ ${E}</span>`;
    }).join("");
  }
  /**
   * Extract code context from common.glsl file.
   * Similar to extractCodeContext but uses the original common source.
   */
  extractCodeContextFromCommon(e) {
    const t = this.engine.project.commonSource;
    if (!t) return null;
    const n = t.split(`
`), s = 3, l = Math.max(0, e - s - 1), i = Math.min(n.length, e + s);
    return n.slice(l, i).map((g, v) => {
      const w = l + v + 1, x = w === e, C = String(w).padStart(4, " "), R = this.escapeHTML(g);
      return x ? `<span class="error-line-highlight">${C} │ ${R}</span>` : `<span class="context-line">${C} │ ${R}</span>`;
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
class xe {
  constructor(e) {
    h(this, "container");
    h(this, "root");
    h(this, "canvasContainer");
    this.container = e.container, this.root = document.createElement("div"), this.root.className = "layout-fullscreen", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.root.appendChild(this.canvasContainer), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
}
class _e {
  constructor(e) {
    h(this, "container");
    h(this, "root");
    h(this, "canvasContainer");
    this.container = e.container, this.root = document.createElement("div"), this.root.className = "layout-default", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.root.appendChild(this.canvasContainer), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
}
class we {
  constructor(e) {
    h(this, "container");
    h(this, "project");
    h(this, "root");
    h(this, "canvasContainer");
    h(this, "codePanel");
    h(this, "editorPanel", null);
    h(this, "recompileHandler", null);
    this.container = e.container, this.project = e.project, this.root = document.createElement("div"), this.root.className = "layout-split", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.codePanel = document.createElement("div"), this.codePanel.className = "code-panel", this.buildEditorPanel(), this.root.appendChild(this.canvasContainer), this.root.appendChild(this.codePanel), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  setRecompileHandler(e) {
    this.recompileHandler = e, this.editorPanel && this.editorPanel.setRecompileHandler(e);
  }
  dispose() {
    this.editorPanel && (this.editorPanel.dispose(), this.editorPanel = null), this.container.innerHTML = "";
  }
  /**
   * Build editor panel (dynamically loaded).
   */
  async buildEditorPanel() {
    try {
      const { EditorPanel: e } = await Promise.resolve().then(() => Me);
      this.editorPanel = new e(this.codePanel, this.project), this.recompileHandler && this.editorPanel.setRecompileHandler(this.recompileHandler);
    } catch (e) {
      console.error("Failed to load editor panel:", e);
    }
  }
}
class Ce {
  constructor(e) {
    h(this, "container");
    h(this, "project");
    h(this, "root");
    h(this, "canvasContainer");
    h(this, "contentArea");
    h(this, "imageViewer");
    h(this, "editorContainer");
    h(this, "editorInstance", null);
    h(this, "buttonContainer");
    h(this, "copyButton");
    h(this, "recompileButton");
    h(this, "errorDisplay");
    h(this, "recompileHandler", null);
    h(this, "modifiedSources", /* @__PURE__ */ new Map());
    h(this, "tabs", []);
    h(this, "activeTabIndex", 0);
    this.container = e.container, this.project = e.project, this.root = document.createElement("div"), this.root.className = "layout-tabbed";
    const t = document.createElement("div");
    t.className = "tabbed-wrapper", this.contentArea = document.createElement("div"), this.contentArea.className = "tabbed-content", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "tabbed-canvas-container", this.imageViewer = document.createElement("div"), this.imageViewer.className = "tabbed-image-viewer", this.imageViewer.style.visibility = "hidden", this.contentArea.appendChild(this.canvasContainer), this.contentArea.appendChild(this.imageViewer), this.editorContainer = document.createElement("div"), this.editorContainer.className = "tabbed-editor-container", this.editorContainer.style.visibility = "hidden", this.contentArea.appendChild(this.editorContainer), this.buttonContainer = document.createElement("div"), this.buttonContainer.className = "tabbed-button-container", this.buttonContainer.style.display = "none", this.copyButton = document.createElement("button"), this.copyButton.className = "tabbed-copy-button", this.copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z" opacity="0.4"/>
        <path d="M2 5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2zm0 1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>
      </svg>
    `, this.copyButton.title = "Copy code to clipboard", this.copyButton.addEventListener("click", () => this.copyToClipboard()), this.buttonContainer.appendChild(this.copyButton), this.recompileButton = document.createElement("button"), this.recompileButton.className = "tabbed-recompile-button", this.recompileButton.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 3v10l8-5-8-5z"/>
      </svg>
      Recompile
    `, this.recompileButton.title = "Recompile shader (Ctrl+Enter)", this.recompileButton.addEventListener("click", () => this.recompile()), this.buttonContainer.appendChild(this.recompileButton), this.errorDisplay = document.createElement("div"), this.errorDisplay.className = "tabbed-error-display", this.errorDisplay.style.display = "none", this.contentArea.appendChild(this.errorDisplay), this.setupKeyboardShortcut();
    const n = this.buildTabBar();
    t.appendChild(n), t.appendChild(this.contentArea), this.root.appendChild(t), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  setRecompileHandler(e) {
    this.recompileHandler = e;
  }
  dispose() {
    this.editorInstance && (this.editorInstance.destroy(), this.editorInstance = null), this.container.innerHTML = "";
  }
  setupKeyboardShortcut() {
    document.addEventListener("keydown", (e) => {
      (e.ctrlKey || e.metaKey) && e.key === "Enter" && this.tabs[this.activeTabIndex].kind === "code" && (e.preventDefault(), this.recompile());
    });
  }
  saveCurrentEditorContent() {
    if (this.editorInstance) {
      const e = this.tabs[this.activeTabIndex];
      if (e.kind === "code") {
        const t = this.editorInstance.getSource();
        this.modifiedSources.set(e.passName, t);
      }
    }
  }
  recompile() {
    if (!this.recompileHandler) {
      console.warn("No recompile handler set");
      return;
    }
    this.saveCurrentEditorContent();
    const e = this.tabs[this.activeTabIndex];
    if (e.kind !== "code") return;
    const t = this.modifiedSources.get(e.passName) ?? e.source, n = this.recompileHandler(e.passName, t);
    n.success ? (this.hideError(), e.source = t) : this.showError(n.error || "Compilation failed");
  }
  showError(e) {
    this.errorDisplay && (this.errorDisplay.textContent = e, this.errorDisplay.style.display = "block");
  }
  hideError() {
    this.errorDisplay && (this.errorDisplay.style.display = "none");
  }
  async copyToClipboard() {
    const e = this.tabs[this.activeTabIndex];
    if (e.kind !== "code") return;
    const t = this.editorInstance ? this.editorInstance.getSource() : this.modifiedSources.get(e.passName) ?? e.source;
    try {
      await navigator.clipboard.writeText(t);
      const n = this.copyButton.innerHTML;
      this.copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
        </svg>
      `, this.copyButton.classList.add("copied"), setTimeout(() => {
        this.copyButton.innerHTML = n, this.copyButton.classList.remove("copied");
      }, 1500);
    } catch (n) {
      console.error("Failed to copy:", n);
    }
  }
  buildTabBar() {
    const e = document.createElement("div");
    e.className = "tabbed-toolbar";
    const t = document.createElement("div");
    t.className = "tabbed-tab-bar", this.tabs = [], this.tabs.push({ kind: "shader", name: "Shader" }), this.project.commonSource && this.tabs.push({
      kind: "code",
      name: "common.glsl",
      passName: "common",
      source: this.project.commonSource
    });
    const n = [
      "BufferA",
      "BufferB",
      "BufferC",
      "BufferD"
    ];
    for (const i of n) {
      const a = this.project.passes[i];
      a && this.tabs.push({
        kind: "code",
        name: `${i.toLowerCase()}.glsl`,
        passName: i,
        source: a.glslSource
      });
    }
    const s = this.project.passes.Image;
    this.tabs.push({
      kind: "code",
      name: "image.glsl",
      passName: "Image",
      source: s.glslSource
    });
    for (const i of this.project.textures)
      this.tabs.push({
        kind: "image",
        name: i.filename || i.name,
        url: i.source
      });
    const l = async (i) => {
      this.saveCurrentEditorContent();
      const a = this.tabs[i];
      if (this.activeTabIndex = i, t.querySelectorAll(".tabbed-tab-button").forEach((f, g) => {
        f.classList.toggle("active", g === i);
      }), this.canvasContainer.style.visibility = "hidden", this.imageViewer.style.visibility = "hidden", this.editorContainer.style.visibility = "hidden", this.buttonContainer.style.display = "none", this.editorInstance && (this.editorInstance.destroy(), this.editorInstance = null), a.kind === "shader")
        this.canvasContainer.style.visibility = "visible";
      else if (a.kind === "code") {
        this.editorContainer.style.visibility = "visible", this.buttonContainer.style.display = "flex";
        const f = this.modifiedSources.get(a.passName) ?? a.source;
        this.editorContainer.innerHTML = "";
        try {
          const { createEditor: g } = await Promise.resolve().then(() => ie);
          this.editorInstance = g(this.editorContainer, f, (v) => {
            this.modifiedSources.set(a.passName, v);
          });
        } catch (g) {
          console.error("Failed to load editor:", g);
          const v = document.createElement("textarea");
          v.className = "tabbed-fallback-textarea", v.value = f, v.addEventListener("input", () => {
            this.modifiedSources.set(a.passName, v.value);
          }), this.editorContainer.appendChild(v);
        }
      } else {
        this.imageViewer.style.visibility = "visible";
        const f = document.createElement("img");
        f.src = a.url, f.alt = a.name, this.imageViewer.innerHTML = "", this.imageViewer.appendChild(f);
      }
    };
    return this.tabs.forEach((i, a) => {
      const f = document.createElement("button");
      f.className = "tabbed-tab-button", i.kind === "shader" ? f.classList.add("shader-tab") : i.kind === "image" && f.classList.add("image-tab"), f.textContent = i.name, a === 0 && f.classList.add("active"), f.addEventListener("click", () => l(a)), t.appendChild(f);
    }), e.appendChild(t), e.appendChild(this.buttonContainer), e;
  }
}
function Fe(r, e) {
  switch (r) {
    case "fullscreen":
      return new xe(e);
    case "default":
      return new _e(e);
    case "split":
      return new we(e);
    case "tabbed":
      return new Ce(e);
  }
}
function I(r, e) {
  if (e in r) return e;
  const t = e.toLowerCase();
  for (const n of Object.keys(r))
    if (n.toLowerCase() === t)
      return n;
  return null;
}
function Re(r) {
  return r === "Image" || r === "BufferA" || r === "BufferB" || r === "BufferC" || r === "BufferD";
}
function re(r) {
  return typeof r == "string" ? Re(r) ? { buffer: r } : r === "keyboard" ? { keyboard: !0 } : { texture: r } : r;
}
async function Se(r, e, t, n) {
  const s = `/demos/${r}/config.json`;
  if (s in t) {
    const i = await t[s]();
    return i.Image || i.BufferA || i.BufferB || i.BufferC || i.BufferD ? Ae(r, i, e, n) : ee(r, e, i);
  } else
    return ee(r, e);
}
async function ee(r, e, t) {
  const n = `/demos/${r}/image.glsl`, s = I(e, n);
  if (!s)
    throw new Error(`Demo '${r}' not found. Expected ${n}`);
  const l = await e[s](), i = (t == null ? void 0 : t.layout) || "tabbed", a = (t == null ? void 0 : t.controls) ?? !0, f = (t == null ? void 0 : t.title) || r.split("-").map((g) => g.charAt(0).toUpperCase() + g.slice(1)).join(" ");
  return {
    root: `/demos/${r}`,
    meta: {
      title: f,
      author: (t == null ? void 0 : t.author) || null,
      description: (t == null ? void 0 : t.description) || null
    },
    layout: i,
    controls: a,
    commonSource: null,
    passes: {
      Image: {
        name: "Image",
        glslSource: l,
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
async function Ae(r, e, t, n) {
  const s = {
    Image: e.Image,
    BufferA: e.BufferA,
    BufferB: e.BufferB,
    BufferC: e.BufferC,
    BufferD: e.BufferD
  };
  let l = null;
  if (e.common) {
    const E = `/demos/${r}/${e.common}`, T = I(t, E);
    T && (l = await t[T]());
  } else {
    const E = `/demos/${r}/common.glsl`, T = I(t, E);
    T && (l = await t[T]());
  }
  const i = /* @__PURE__ */ new Set(), a = ["Image", "BufferA", "BufferB", "BufferC", "BufferD"];
  for (const E of a) {
    const T = s[E];
    if (T)
      for (const c of ["iChannel0", "iChannel1", "iChannel2", "iChannel3"]) {
        const o = T[c];
        if (!o) continue;
        const u = re(o);
        u && "texture" in u && i.add(u.texture);
      }
  }
  const f = [], g = /* @__PURE__ */ new Map();
  for (const E of i) {
    const T = `/demos/${r}/${E.replace(/^\.\//, "")}`, c = I(n, T);
    if (!c)
      throw new Error(`Texture not found: ${E} (expected at ${T})`);
    const o = await n[c](), u = E.split("/").pop(), d = u.replace(/\.[^.]+$/, "");
    f.push({
      name: d,
      filename: u,
      // Preserve original filename for display
      source: o,
      filter: "linear",
      wrap: "repeat"
    }), g.set(E, d);
  }
  const v = {};
  for (const E of a) {
    const T = s[E];
    if (!T) continue;
    const c = {
      Image: "image.glsl",
      BufferA: "bufferA.glsl",
      BufferB: "bufferB.glsl",
      BufferC: "bufferC.glsl",
      BufferD: "bufferD.glsl"
    }, o = T.source || c[E], u = `/demos/${r}/${o}`, d = I(t, u);
    if (!d)
      throw new Error(`Missing shader file: ${u}`);
    const p = await t[d](), m = [
      H(T.iChannel0, g),
      H(T.iChannel1, g),
      H(T.iChannel2, g),
      H(T.iChannel3, g)
    ];
    v[E] = {
      name: E,
      glslSource: p,
      channels: m
    };
  }
  if (!v.Image)
    throw new Error(`Demo '${r}' must have an Image pass`);
  const w = e.title || r.split("-").map((E) => E.charAt(0).toUpperCase() + E.slice(1)).join(" "), x = e.author || null, C = e.description || null, R = e.layout || "tabbed", y = e.controls ?? !0;
  return {
    root: `/demos/${r}`,
    meta: { title: w, author: x, description: C },
    layout: R,
    controls: y,
    commonSource: l,
    passes: v,
    textures: f
  };
}
function H(r, e) {
  if (!r)
    return { kind: "none" };
  const t = re(r);
  return t ? "buffer" in t ? {
    kind: "buffer",
    buffer: t.buffer,
    current: !!t.current
  } : "texture" in t ? {
    kind: "texture",
    name: (e == null ? void 0 : e.get(t.texture)) || t.texture,
    cubemap: t.type === "cubemap"
  } : "keyboard" in t ? { kind: "keyboard" } : { kind: "none" } : { kind: "none" };
}
const Be = "course/day5/barth-sextic-final";
async function Le() {
  return Se(Be, /* @__PURE__ */ Object.assign({
    "/demos/course/day5/barth-sextic-final/image.glsl": () => Promise.resolve().then(() => Ue).then((n) => n.default)
  }), /* @__PURE__ */ Object.assign({
    "/demos/course/day5/barth-sextic-final/config.json": () => Promise.resolve().then(() => $e).then((n) => n.default)
  }), /* @__PURE__ */ Object.assign({}));
}
async function Oe(r) {
  const e = typeof r.container == "string" ? document.querySelector(r.container) : r.container;
  if (!e || !(e instanceof HTMLElement))
    throw new Error(`Container not found: ${r.container}`);
  const t = await Le(), n = Fe(t.layout, {
    container: e,
    project: t
  }), s = new Te({
    container: n.getCanvasContainer(),
    project: t,
    pixelRatio: r.pixelRatio ?? window.devicePixelRatio
  });
  return s.hasErrors() || s.start(), {
    app: s,
    destroy: () => {
      var l;
      (l = s.stop) == null || l.call(s);
    }
  };
}
class ke {
  constructor(e, t) {
    h(this, "container");
    h(this, "project");
    h(this, "recompileHandler", null);
    h(this, "tabBar");
    h(this, "contentArea");
    h(this, "copyButton");
    h(this, "recompileButton");
    h(this, "errorDisplay");
    h(this, "tabs", []);
    h(this, "activeTabIndex", 0);
    // Editor instance (null if not in editor mode or viewing image)
    h(this, "editorInstance", null);
    // Track modified sources (passName -> modified source)
    h(this, "modifiedSources", /* @__PURE__ */ new Map());
    this.container = e, this.project = t, this.buildTabs(), this.tabBar = document.createElement("div"), this.tabBar.className = "editor-tab-bar", this.buildTabBar(), this.contentArea = document.createElement("div"), this.contentArea.className = "editor-content-area", this.copyButton = document.createElement("button"), this.copyButton.className = "editor-copy-button", this.copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z" opacity="0.4"/>
        <path d="M2 5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2zm0 1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>
      </svg>
    `, this.copyButton.title = "Copy code to clipboard", this.copyButton.addEventListener("click", () => this.copyToClipboard()), this.recompileButton = document.createElement("button"), this.recompileButton.className = "editor-recompile-button", this.recompileButton.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 3v10l8-5-8-5z"/>
      </svg>
      Recompile
    `, this.recompileButton.title = "Recompile shader (Ctrl+Enter)", this.recompileButton.addEventListener("click", () => this.recompile()), this.errorDisplay = document.createElement("div"), this.errorDisplay.className = "editor-error-display", this.errorDisplay.style.display = "none";
    const n = document.createElement("div");
    n.className = "editor-toolbar", n.appendChild(this.tabBar), n.appendChild(this.copyButton), n.appendChild(this.recompileButton), this.container.appendChild(n), this.container.appendChild(this.contentArea), this.container.appendChild(this.errorDisplay), this.setupKeyboardShortcut(), this.showTab(0);
  }
  setRecompileHandler(e) {
    this.recompileHandler = e;
  }
  dispose() {
    this.editorInstance && (this.editorInstance.destroy(), this.editorInstance = null), this.container.innerHTML = "";
  }
  buildTabs() {
    this.tabs = [], this.project.commonSource && this.tabs.push({
      kind: "code",
      name: "common.glsl",
      passName: "common",
      source: this.project.commonSource
    });
    const e = [
      "BufferA",
      "BufferB",
      "BufferC",
      "BufferD"
    ];
    for (const n of e) {
      const s = this.project.passes[n];
      s && this.tabs.push({
        kind: "code",
        name: `${n.toLowerCase()}.glsl`,
        passName: n,
        source: s.glslSource
      });
    }
    const t = this.project.passes.Image;
    this.tabs.push({
      kind: "code",
      name: "image.glsl",
      passName: "Image",
      source: t.glslSource
    });
    for (const n of this.project.textures)
      this.tabs.push({
        kind: "image",
        name: n.filename || n.name,
        url: n.source
      });
  }
  buildTabBar() {
    this.tabBar.innerHTML = "", this.tabs.forEach((e, t) => {
      const n = document.createElement("button");
      n.className = "editor-tab-button", e.kind === "image" && n.classList.add("image-tab"), n.textContent = e.name, t === this.activeTabIndex && n.classList.add("active"), n.addEventListener("click", () => this.showTab(t)), this.tabBar.appendChild(n);
    });
  }
  async showTab(e) {
    this.saveCurrentEditorContent(), this.activeTabIndex = e;
    const t = this.tabs[e];
    if (this.tabBar.querySelectorAll(".editor-tab-button").forEach((n, s) => {
      n.classList.toggle("active", s === e);
    }), this.contentArea.innerHTML = "", this.editorInstance && (this.editorInstance.destroy(), this.editorInstance = null), t.kind === "code") {
      this.copyButton.style.display = "", this.recompileButton.style.display = "";
      const n = this.modifiedSources.get(t.passName) ?? t.source, s = document.createElement("div");
      s.className = "editor-prism-container", this.contentArea.appendChild(s);
      try {
        const { createEditor: l } = await Promise.resolve().then(() => ie);
        this.editorInstance = l(s, n, (i) => {
          this.modifiedSources.set(t.passName, i);
        });
      } catch (l) {
        console.error("Failed to load editor:", l);
        const i = document.createElement("textarea");
        i.className = "editor-fallback-textarea", i.value = n, i.addEventListener("input", () => {
          this.modifiedSources.set(t.passName, i.value);
        }), s.appendChild(i);
      }
    } else {
      this.copyButton.style.display = "none", this.recompileButton.style.display = "none";
      const n = document.createElement("div");
      n.className = "editor-image-viewer";
      const s = document.createElement("img");
      s.src = t.url, s.alt = t.name, n.appendChild(s), this.contentArea.appendChild(n);
    }
  }
  saveCurrentEditorContent() {
    if (this.editorInstance) {
      const e = this.tabs[this.activeTabIndex];
      if (e.kind === "code") {
        const t = this.editorInstance.getSource();
        this.modifiedSources.set(e.passName, t);
      }
    }
  }
  recompile() {
    if (!this.recompileHandler) {
      console.warn("No recompile handler set");
      return;
    }
    this.saveCurrentEditorContent();
    const e = this.tabs[this.activeTabIndex];
    if (e.kind !== "code")
      return;
    const t = this.modifiedSources.get(e.passName) ?? e.source, n = this.recompileHandler(e.passName, t);
    n.success ? (this.hideError(), e.source = t) : this.showError(n.error || "Compilation failed");
  }
  showError(e) {
    this.errorDisplay.textContent = e, this.errorDisplay.style.display = "block";
  }
  hideError() {
    this.errorDisplay.style.display = "none";
  }
  async copyToClipboard() {
    const e = this.tabs[this.activeTabIndex];
    if (e.kind !== "code") return;
    const t = this.editorInstance ? this.editorInstance.getSource() : this.modifiedSources.get(e.passName) ?? e.source;
    try {
      await navigator.clipboard.writeText(t);
      const n = this.copyButton.innerHTML;
      this.copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
        </svg>
      `, this.copyButton.classList.add("copied"), setTimeout(() => {
        this.copyButton.innerHTML = n, this.copyButton.classList.remove("copied");
      }, 1500);
    } catch (n) {
      console.error("Failed to copy:", n);
    }
  }
  setupKeyboardShortcut() {
    this.container.addEventListener("keydown", (e) => {
      (e.ctrlKey || e.metaKey) && e.key === "Enter" && (e.preventDefault(), this.recompile());
    });
  }
}
const Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EditorPanel: ke
}, Symbol.toStringTag, { value: "Module" }));
var te = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ae = { exports: {} };
(function(r) {
  var e = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   */
  var t = function(n) {
    var s = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, l = 0, i = {}, a = {
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
      manual: n.Prism && n.Prism.manual,
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
      disableWorkerMessageHandler: n.Prism && n.Prism.disableWorkerMessageHandler,
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
        encode: function c(o) {
          return o instanceof f ? new f(o.type, c(o.content), o.alias) : Array.isArray(o) ? o.map(c) : o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
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
        type: function(c) {
          return Object.prototype.toString.call(c).slice(8, -1);
        },
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: function(c) {
          return c.__id || Object.defineProperty(c, "__id", { value: ++l }), c.__id;
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
        clone: function c(o, u) {
          u = u || {};
          var d, p;
          switch (a.util.type(o)) {
            case "Object":
              if (p = a.util.objId(o), u[p])
                return u[p];
              d = /** @type {Record<string, any>} */
              {}, u[p] = d;
              for (var m in o)
                o.hasOwnProperty(m) && (d[m] = c(o[m], u));
              return (
                /** @type {any} */
                d
              );
            case "Array":
              return p = a.util.objId(o), u[p] ? u[p] : (d = [], u[p] = d, /** @type {Array} */
              /** @type {any} */
              o.forEach(function(_, b) {
                d[b] = c(_, u);
              }), /** @type {any} */
              d);
            default:
              return o;
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
        getLanguage: function(c) {
          for (; c; ) {
            var o = s.exec(c.className);
            if (o)
              return o[1].toLowerCase();
            c = c.parentElement;
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
        setLanguage: function(c, o) {
          c.className = c.className.replace(RegExp(s, "gi"), ""), c.classList.add("language-" + o);
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
          } catch (d) {
            var c = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(d.stack) || [])[1];
            if (c) {
              var o = document.getElementsByTagName("script");
              for (var u in o)
                if (o[u].src == c)
                  return o[u];
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
        isActive: function(c, o, u) {
          for (var d = "no-" + o; c; ) {
            var p = c.classList;
            if (p.contains(o))
              return !0;
            if (p.contains(d))
              return !1;
            c = c.parentElement;
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
        plain: i,
        plaintext: i,
        text: i,
        txt: i,
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
        extend: function(c, o) {
          var u = a.util.clone(a.languages[c]);
          for (var d in o)
            u[d] = o[d];
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
        insertBefore: function(c, o, u, d) {
          d = d || /** @type {any} */
          a.languages;
          var p = d[c], m = {};
          for (var _ in p)
            if (p.hasOwnProperty(_)) {
              if (_ == o)
                for (var b in u)
                  u.hasOwnProperty(b) && (m[b] = u[b]);
              u.hasOwnProperty(_) || (m[_] = p[_]);
            }
          var F = d[c];
          return d[c] = m, a.languages.DFS(a.languages, function(S, k) {
            k === F && S != c && (this[S] = m);
          }), m;
        },
        // Traverse a language definition with Depth First Search
        DFS: function c(o, u, d, p) {
          p = p || {};
          var m = a.util.objId;
          for (var _ in o)
            if (o.hasOwnProperty(_)) {
              u.call(o, _, o[_], d || _);
              var b = o[_], F = a.util.type(b);
              F === "Object" && !p[m(b)] ? (p[m(b)] = !0, c(b, u, null, p)) : F === "Array" && !p[m(b)] && (p[m(b)] = !0, c(b, u, _, p));
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
      highlightAll: function(c, o) {
        a.highlightAllUnder(document, c, o);
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
      highlightAllUnder: function(c, o, u) {
        var d = {
          callback: u,
          container: c,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        a.hooks.run("before-highlightall", d), d.elements = Array.prototype.slice.apply(d.container.querySelectorAll(d.selector)), a.hooks.run("before-all-elements-highlight", d);
        for (var p = 0, m; m = d.elements[p++]; )
          a.highlightElement(m, o === !0, d.callback);
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
      highlightElement: function(c, o, u) {
        var d = a.util.getLanguage(c), p = a.languages[d];
        a.util.setLanguage(c, d);
        var m = c.parentElement;
        m && m.nodeName.toLowerCase() === "pre" && a.util.setLanguage(m, d);
        var _ = c.textContent, b = {
          element: c,
          language: d,
          grammar: p,
          code: _
        };
        function F(k) {
          b.highlightedCode = k, a.hooks.run("before-insert", b), b.element.innerHTML = b.highlightedCode, a.hooks.run("after-highlight", b), a.hooks.run("complete", b), u && u.call(b.element);
        }
        if (a.hooks.run("before-sanity-check", b), m = b.element.parentElement, m && m.nodeName.toLowerCase() === "pre" && !m.hasAttribute("tabindex") && m.setAttribute("tabindex", "0"), !b.code) {
          a.hooks.run("complete", b), u && u.call(b.element);
          return;
        }
        if (a.hooks.run("before-highlight", b), !b.grammar) {
          F(a.util.encode(b.code));
          return;
        }
        if (o && n.Worker) {
          var S = new Worker(a.filename);
          S.onmessage = function(k) {
            F(k.data);
          }, S.postMessage(JSON.stringify({
            language: b.language,
            code: b.code,
            immediateClose: !0
          }));
        } else
          F(a.highlight(b.code, b.grammar, b.language));
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
      highlight: function(c, o, u) {
        var d = {
          code: c,
          grammar: o,
          language: u
        };
        if (a.hooks.run("before-tokenize", d), !d.grammar)
          throw new Error('The language "' + d.language + '" has no grammar.');
        return d.tokens = a.tokenize(d.code, d.grammar), a.hooks.run("after-tokenize", d), f.stringify(a.util.encode(d.tokens), d.language);
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
      tokenize: function(c, o) {
        var u = o.rest;
        if (u) {
          for (var d in u)
            o[d] = u[d];
          delete o.rest;
        }
        var p = new w();
        return x(p, p.head, c), v(c, p, o, p.head, 0), R(p);
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
        add: function(c, o) {
          var u = a.hooks.all;
          u[c] = u[c] || [], u[c].push(o);
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
        run: function(c, o) {
          var u = a.hooks.all[c];
          if (!(!u || !u.length))
            for (var d = 0, p; p = u[d++]; )
              p(o);
        }
      },
      Token: f
    };
    n.Prism = a;
    function f(c, o, u, d) {
      this.type = c, this.content = o, this.alias = u, this.length = (d || "").length | 0;
    }
    f.stringify = function c(o, u) {
      if (typeof o == "string")
        return o;
      if (Array.isArray(o)) {
        var d = "";
        return o.forEach(function(F) {
          d += c(F, u);
        }), d;
      }
      var p = {
        type: o.type,
        content: c(o.content, u),
        tag: "span",
        classes: ["token", o.type],
        attributes: {},
        language: u
      }, m = o.alias;
      m && (Array.isArray(m) ? Array.prototype.push.apply(p.classes, m) : p.classes.push(m)), a.hooks.run("wrap", p);
      var _ = "";
      for (var b in p.attributes)
        _ += " " + b + '="' + (p.attributes[b] || "").replace(/"/g, "&quot;") + '"';
      return "<" + p.tag + ' class="' + p.classes.join(" ") + '"' + _ + ">" + p.content + "</" + p.tag + ">";
    };
    function g(c, o, u, d) {
      c.lastIndex = o;
      var p = c.exec(u);
      if (p && d && p[1]) {
        var m = p[1].length;
        p.index += m, p[0] = p[0].slice(m);
      }
      return p;
    }
    function v(c, o, u, d, p, m) {
      for (var _ in u)
        if (!(!u.hasOwnProperty(_) || !u[_])) {
          var b = u[_];
          b = Array.isArray(b) ? b : [b];
          for (var F = 0; F < b.length; ++F) {
            if (m && m.cause == _ + "," + F)
              return;
            var S = b[F], k = S.inside, V = !!S.lookbehind, K = !!S.greedy, ce = S.alias;
            if (K && !S.pattern.global) {
              var le = S.pattern.toString().match(/[imsuy]*$/)[0];
              S.pattern = RegExp(S.pattern.source, le + "g");
            }
            for (var q = S.pattern || S, A = d.next, L = p; A !== o.tail && !(m && L >= m.reach); L += A.value.length, A = A.next) {
              var P = A.value;
              if (o.length > c.length)
                return;
              if (!(P instanceof f)) {
                var U = 1, B;
                if (K) {
                  if (B = g(q, L, c, V), !B || B.index >= c.length)
                    break;
                  var N = B.index, ue = B.index + B[0].length, M = L;
                  for (M += A.value.length; N >= M; )
                    A = A.next, M += A.value.length;
                  if (M -= A.value.length, L = M, A.value instanceof f)
                    continue;
                  for (var D = A; D !== o.tail && (M < ue || typeof D.value == "string"); D = D.next)
                    U++, M += D.value.length;
                  U--, P = c.slice(L, M), B.index -= L;
                } else if (B = g(q, 0, P, V), !B)
                  continue;
                var N = B.index, $ = B[0], z = P.slice(0, N), W = P.slice(N + $.length), X = L + P.length;
                m && X > m.reach && (m.reach = X);
                var j = A.prev;
                z && (j = x(o, j, z), L += z.length), C(o, j, U);
                var de = new f(_, k ? a.tokenize($, k) : $, ce, $);
                if (A = x(o, j, de), W && x(o, A, W), U > 1) {
                  var G = {
                    cause: _ + "," + F,
                    reach: X
                  };
                  v(c, o, u, A.prev, L, G), m && G.reach > m.reach && (m.reach = G.reach);
                }
              }
            }
          }
        }
    }
    function w() {
      var c = { value: null, prev: null, next: null }, o = { value: null, prev: c, next: null };
      c.next = o, this.head = c, this.tail = o, this.length = 0;
    }
    function x(c, o, u) {
      var d = o.next, p = { value: u, prev: o, next: d };
      return o.next = p, d.prev = p, c.length++, p;
    }
    function C(c, o, u) {
      for (var d = o.next, p = 0; p < u && d !== c.tail; p++)
        d = d.next;
      o.next = d, d.prev = o, c.length -= p;
    }
    function R(c) {
      for (var o = [], u = c.head.next; u !== c.tail; )
        o.push(u.value), u = u.next;
      return o;
    }
    if (!n.document)
      return n.addEventListener && (a.disableWorkerMessageHandler || n.addEventListener("message", function(c) {
        var o = JSON.parse(c.data), u = o.language, d = o.code, p = o.immediateClose;
        n.postMessage(a.highlight(d, a.languages[u], u)), p && n.close();
      }, !1)), a;
    var y = a.util.currentScript();
    y && (a.filename = y.src, y.hasAttribute("data-manual") && (a.manual = !0));
    function E() {
      a.manual || a.highlightAll();
    }
    if (!a.manual) {
      var T = document.readyState;
      T === "loading" || T === "interactive" && y && y.defer ? document.addEventListener("DOMContentLoaded", E) : window.requestAnimationFrame ? window.requestAnimationFrame(E) : window.setTimeout(E, 16);
    }
    return a;
  }(e);
  r.exports && (r.exports = t), typeof te < "u" && (te.Prism = t), t.languages.markup = {
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
  }, t.languages.markup.tag.inside["attr-value"].inside.entity = t.languages.markup.entity, t.languages.markup.doctype.inside["internal-subset"].inside = t.languages.markup, t.hooks.add("wrap", function(n) {
    n.type === "entity" && (n.attributes.title = n.content.replace(/&amp;/, "&"));
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
    value: function(s, l) {
      var i = {};
      i["language-" + l] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: t.languages[l]
      }, i.cdata = /^<!\[CDATA\[|\]\]>$/i;
      var a = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: i
        }
      };
      a["language-" + l] = {
        pattern: /[\s\S]+/,
        inside: t.languages[l]
      };
      var f = {};
      f[s] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
          return s;
        }), "i"),
        lookbehind: !0,
        greedy: !0,
        inside: a
      }, t.languages.insertBefore("markup", "cdata", f);
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
    value: function(n, s) {
      t.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          /(^|["'\s])/.source + "(?:" + n + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
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
  }), t.languages.html = t.languages.markup, t.languages.mathml = t.languages.markup, t.languages.svg = t.languages.markup, t.languages.xml = t.languages.extend("markup", {}), t.languages.ssml = t.languages.xml, t.languages.atom = t.languages.xml, t.languages.rss = t.languages.xml, function(n) {
    var s = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    n.languages.css = {
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
    }, n.languages.css.atrule.inside.rest = n.languages.css;
    var l = n.languages.markup;
    l && (l.tag.addInlined("style", "css"), l.tag.addAttribute("style", "css"));
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
    var n = "Loading…", s = function(y, E) {
      return "✖ Error " + y + " while fetching file: " + E;
    }, l = "✖ Error: File does not exist or is empty", i = {
      js: "javascript",
      py: "python",
      rb: "ruby",
      ps1: "powershell",
      psm1: "powershell",
      sh: "bash",
      bat: "batch",
      h: "c",
      tex: "latex"
    }, a = "data-src-status", f = "loading", g = "loaded", v = "failed", w = "pre[data-src]:not([" + a + '="' + g + '"]):not([' + a + '="' + f + '"])';
    function x(y, E, T) {
      var c = new XMLHttpRequest();
      c.open("GET", y, !0), c.onreadystatechange = function() {
        c.readyState == 4 && (c.status < 400 && c.responseText ? E(c.responseText) : c.status >= 400 ? T(s(c.status, c.statusText)) : T(l));
      }, c.send(null);
    }
    function C(y) {
      var E = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(y || "");
      if (E) {
        var T = Number(E[1]), c = E[2], o = E[3];
        return c ? o ? [T, Number(o)] : [T, void 0] : [T, T];
      }
    }
    t.hooks.add("before-highlightall", function(y) {
      y.selector += ", " + w;
    }), t.hooks.add("before-sanity-check", function(y) {
      var E = (
        /** @type {HTMLPreElement} */
        y.element
      );
      if (E.matches(w)) {
        y.code = "", E.setAttribute(a, f);
        var T = E.appendChild(document.createElement("CODE"));
        T.textContent = n;
        var c = E.getAttribute("data-src"), o = y.language;
        if (o === "none") {
          var u = (/\.(\w+)$/.exec(c) || [, "none"])[1];
          o = i[u] || u;
        }
        t.util.setLanguage(T, o), t.util.setLanguage(E, o);
        var d = t.plugins.autoloader;
        d && d.loadLanguages(o), x(
          c,
          function(p) {
            E.setAttribute(a, g);
            var m = C(E.getAttribute("data-range"));
            if (m) {
              var _ = p.split(/\r\n?|\n/g), b = m[0], F = m[1] == null ? _.length : m[1];
              b < 0 && (b += _.length), b = Math.max(0, Math.min(b - 1, _.length)), F < 0 && (F += _.length), F = Math.max(0, Math.min(F, _.length)), p = _.slice(b, F).join(`
`), E.hasAttribute("data-start") || E.setAttribute("data-start", String(b + 1));
            }
            T.textContent = p, t.highlightElement(T);
          },
          function(p) {
            E.setAttribute(a, v), T.textContent = p;
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
      highlight: function(E) {
        for (var T = (E || document).querySelectorAll(w), c = 0, o; o = T[c++]; )
          t.highlightElement(o);
      }
    };
    var R = !1;
    t.fileHighlight = function() {
      R || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), R = !0), t.plugins.fileHighlight.highlight.apply(this, arguments);
    };
  }();
})(ae);
var Pe = ae.exports;
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
(function(r) {
  var e = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/, t = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function() {
    return e.source;
  });
  r.languages.cpp = r.languages.extend("c", {
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
  }), r.languages.insertBefore("cpp", "string", {
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
  }), r.languages.insertBefore("cpp", "keyword", {
    "generic-function": {
      pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
      inside: {
        function: /^\w+/,
        generic: {
          pattern: /<[\s\S]+/,
          alias: "class-name",
          inside: r.languages.cpp
        }
      }
    }
  }), r.languages.insertBefore("cpp", "operator", {
    "double-colon": {
      pattern: /::/,
      alias: "punctuation"
    }
  }), r.languages.insertBefore("cpp", "class-name", {
    // the base clause is an optional list of parent classes
    // https://en.cppreference.com/w/cpp/language/class
    "base-clause": {
      pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
      lookbehind: !0,
      greedy: !0,
      inside: r.languages.extend("cpp", {})
    }
  }), r.languages.insertBefore("inside", "double-colon", {
    // All untokenized words that are not namespaces should be class names
    "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
  }, r.languages.cpp["base-clause"]);
})(Prism);
function De(r, e, t) {
  const n = document.createElement("div");
  n.className = "prism-editor-wrapper";
  const s = document.createElement("div");
  s.className = "prism-editor-line-numbers";
  const l = document.createElement("div");
  l.className = "prism-editor-area";
  const i = document.createElement("textarea");
  i.className = "prism-editor-textarea", i.value = e, i.spellcheck = !1, i.autocapitalize = "off", i.autocomplete = "off";
  const a = document.createElement("pre");
  a.className = "prism-editor-highlight";
  const f = document.createElement("code");
  f.className = "language-cpp", a.appendChild(f), l.appendChild(i), l.appendChild(a), n.appendChild(s), n.appendChild(l), r.appendChild(n);
  function g() {
    const x = i.value;
    f.textContent = x + `
`, Pe.highlightElement(f);
    const C = x.split(`
`);
    s.innerHTML = C.map((R, y) => `<span>${y + 1}</span>`).join(""), t && t(x);
  }
  function v() {
    a.scrollTop = i.scrollTop, a.scrollLeft = i.scrollLeft, s.scrollTop = i.scrollTop;
  }
  function w(x) {
    if (x.key === "Tab") {
      x.preventDefault();
      const C = i.selectionStart, R = i.selectionEnd, y = i.value;
      i.value = y.substring(0, C) + "  " + y.substring(R), i.selectionStart = i.selectionEnd = C + 2, g();
    }
  }
  return i.addEventListener("input", g), i.addEventListener("scroll", v), i.addEventListener("keydown", w), g(), {
    getSource: () => i.value,
    setSource: (x) => {
      i.value = x, g();
    },
    destroy: () => {
      i.removeEventListener("input", g), i.removeEventListener("scroll", v), i.removeEventListener("keydown", w), r.removeChild(n);
    }
  };
}
const ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createEditor: De
}, Symbol.toStringTag, { value: "Module" })), Ie = `struct Ray {
    vec3 origin;
    vec3 dir;
};

struct Hit {
    float t;
    vec3 point;
    vec3 normal;
    vec3 color;
};

struct Light {
    vec3 dir;
    vec3 color;
};

Ray generateRay(vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float fov = 90.0;
    float f = 1.0 / tan(radians(fov) / 2.0);

    Ray ray;
    ray.origin = vec3(0.0);
    ray.dir = normalize(vec3(uv, -f));
    return ray;
}

mat3 rotateX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1, 0, 0, 0, c, -s, 0, s, c);
}

mat3 rotateY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, 0, s, 0, 1, 0, -s, 0, c);
}

Ray orbitCamera(Ray ray, float distance) {
    vec2 mouse = iMouse.xy / iResolution.xy;
    float angleY = (mouse.x - 0.5) * 6.28;
    float angleX = (0.5 - mouse.y) * 3.14;

    mat3 rot = rotateX(angleX) * rotateY(angleY);
    ray.origin = rot * vec3(0.0, 0.0, distance);
    ray.dir = rot * ray.dir;
    return ray;
}

float polynomial(vec3 p) {
    float phi = (1.0 + sqrt(5.0)) / 2.0;
    float phi2 = phi * phi;

    float x2 = p.x * p.x, y2 = p.y * p.y, z2 = p.z * p.z;

    float a = (phi2 * x2 - y2) * (phi2 * y2 - z2) * (phi2 * z2 - x2);
    float b = (x2 + y2 + z2 - 1.0);

    return 4.0 * a - (1.0 + 2.0 * phi) * b * b;
}

vec3 gradient(vec3 p) {
    float eps = 0.001;
    return vec3(
        polynomial(p + vec3(eps, 0, 0)) - polynomial(p - vec3(eps, 0, 0)),
        polynomial(p + vec3(0, eps, 0)) - polynomial(p - vec3(0, eps, 0)),
        polynomial(p + vec3(0, 0, eps)) - polynomial(p - vec3(0, 0, eps))
    ) / (2.0 * eps);
}

float sdBarth(vec3 p) {
    // Rotate the Barth surface
    mat3 spin = rotateY(iTime * 0.3);
    p = spin * p;

    // Bounding sphere
    float bounds = length(p) - 2.5;
    if (bounds > 0.01) return bounds;

    // Distance estimate for algebraic variety
    float f = polynomial(p);
    vec3 g = gradient(p);
    float glen = length(g);
    if (glen < 0.001) return 0.1;
    return 0.5 * abs(f) / glen;
}

float sceneSDF(vec3 p) {
    float barth = sdBarth(p);
    float floor = p.y + 1.8;
    return min(barth, floor);
}

vec3 sceneColor(vec3 p) {
    float barth = sdBarth(p);
    float floor = p.y + 1.8;

    if (barth < floor) {
        return vec3(0.9, 0.7, 0.5);  // Barth: gold
    }
    return vec3(0.3, 0.3, 0.35);     // Floor: gray
}

vec3 calcNormal(vec3 p) {
    float eps = 0.001;
    return normalize(vec3(
        sceneSDF(p + vec3(eps, 0, 0)) - sceneSDF(p - vec3(eps, 0, 0)),
        sceneSDF(p + vec3(0, eps, 0)) - sceneSDF(p - vec3(0, eps, 0)),
        sceneSDF(p + vec3(0, 0, eps)) - sceneSDF(p - vec3(0, 0, eps))
    ));
}

float raymarch(Ray ray) {
    float t = 0.0;

    for (int i = 0; i < 200; i++) {
        vec3 p = ray.origin + t * ray.dir;
        float d = sceneSDF(p);

        if (d < 0.0005) return t;

        t += d;

        if (t > 100.0) return -1.0;
    }

    return -1.0;
}

float shadow(vec3 origin, vec3 lightDir, float maxDist) {
    float t = 0.02;
    for (int i = 0; i < 50; i++) {
        float d = sceneSDF(origin + lightDir * t);
        if (d < 0.001) return 0.0;
        t += d;
        if (t > maxDist) break;
    }
    return 1.0;
}

vec3 shade(Hit hit, Light light, vec3 viewDir, float shadowFactor) {
    float diffuse = max(0.0, dot(hit.normal, light.dir));
    vec3 reflected = reflect(-light.dir, hit.normal);
    float specular = pow(max(0.0, dot(reflected, viewDir)), 64.0);

    vec3 diff = hit.color * light.color * diffuse * shadowFactor;
    vec3 spec = light.color * specular * 0.5 * shadowFactor;
    return diff + spec;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = generateRay(fragCoord);
    ray = orbitCamera(ray, 5.0);

    // Two colored lights
    Light light1 = Light(normalize(vec3(1.0, 2.0, 1.0)), vec3(1.0, 0.8, 0.6));
    Light light2 = Light(normalize(vec3(-1.0, 1.0, -0.5)), vec3(0.3, 0.4, 0.8));

    float t = raymarch(ray);

    vec3 color = vec3(0.05, 0.05, 0.1);
    if (t > 0.0) {
        vec3 p = ray.origin + t * ray.dir;
        vec3 normal = calcNormal(p);

        // Flip normal if facing away from camera (for Barth surface)
        if (dot(normal, ray.dir) > 0.0) normal = -normal;

        Hit hit;
        hit.t = t;
        hit.point = p;
        hit.normal = normal;
        hit.color = sceneColor(p);

        float shadow1 = shadow(p, light1.dir, 20.0);
        float shadow2 = shadow(p, light2.dir, 20.0);

        vec3 ambient = hit.color * 0.1;
        color = ambient + shade(hit, light1, -ray.dir, shadow1) + shade(hit, light2, -ray.dir, shadow2);
    }

    fragColor = vec4(color, 1.0);
}
`, Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ie
}, Symbol.toStringTag, { value: "Module" })), se = "tabbed", oe = !0, Ne = {
  layout: se,
  controls: oe
}, $e = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  controls: oe,
  default: Ne,
  layout: se
}, Symbol.toStringTag, { value: "Module" }));
export {
  Be as DEMO_NAME,
  Oe as embed
};
