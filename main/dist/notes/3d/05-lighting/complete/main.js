(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('*{margin:0;padding:0;box-sizing:border-box}html,body{width:100%;height:100%;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}body{background:var(--bg-primary);color:var(--text-primary);transition:background-color .2s ease,color .2s ease}#app{width:100%;height:100%}canvas{display:block}:root,[data-theme=light]{--bg-primary: #f5f5f5;--bg-secondary: #ffffff;--bg-tertiary: #f8f8f8;--bg-canvas: #000000;--text-primary: #000000;--text-secondary: #333333;--text-muted: #666666;--text-disabled: #999999;--border-primary: #e0e0e0;--border-secondary: #cccccc;--accent-primary: #4a9eff;--accent-primary-hover: #3a8eef;--accent-primary-active: #2a7edf;--accent-secondary: #7c4dff;--error-bg: #fff0f0;--error-text: #cc0000;--error-border: #ffcccc;--success-bg: #e8f5e9;--success-text: #4caf50;--success-border: #4caf50;--overlay-bg: rgba(0, 0, 0, .75);--overlay-backdrop: rgba(0, 0, 0, .95);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .1);--shadow-md: 0 10px 30px rgba(0, 0, 0, .2);--shadow-lg: 0 20px 60px rgba(0, 0, 0, .25);--code-bg: #ffffff;--code-text: #000000;--code-line-number: #999999;--code-line-border: #e0e0e0;--code-selection: rgba(173, 214, 255, .4);--syntax-comment: #6a9955;--syntax-keyword: #0000ff;--syntax-string: #a31515;--syntax-number: #098658;--syntax-operator: #000000;--syntax-function: #795e26;--syntax-class: #267f99;--syntax-punctuation: #000000;--tab-bg: #f8f8f8;--tab-text: #666666;--tab-text-hover: #333333;--tab-text-active: #000000;--tab-border-active: #4a9eff;--button-bg: transparent;--button-border: #cccccc;--button-text: #666666;--button-bg-hover: #f0f0f0;--button-border-hover: #999999;--button-text-hover: #333333;--recompile-bg: #e8e8e8;--recompile-text: #333333;--recompile-bg-hover: #d8d8d8;--recompile-bg-active: #c8c8c8;--image-viewer-bg: #f5f5f5;--pane-radius: 8px;--pane-shadow: var(--shadow-lg), var(--shadow-sm)}[data-theme=dark]{--bg-primary: #1a1a1a;--bg-secondary: #252525;--bg-tertiary: #2a2a2a;--bg-canvas: #000000;--text-primary: #ffffff;--text-secondary: #e0e0e0;--text-muted: #a0a0a0;--text-disabled: #666666;--border-primary: #3a3a3a;--border-secondary: #4a4a4a;--accent-primary: #4a9eff;--accent-primary-hover: #5aadff;--accent-primary-active: #3a8eef;--accent-secondary: #9c7cff;--error-bg: #3a1a1a;--error-text: #ff6b6b;--error-border: #5a2a2a;--success-bg: #1a3a1a;--success-text: #6bcf6b;--success-border: #2a5a2a;--overlay-bg: rgba(0, 0, 0, .85);--overlay-backdrop: rgba(0, 0, 0, .98);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .3);--shadow-md: 0 10px 30px rgba(0, 0, 0, .4);--shadow-lg: 0 20px 60px rgba(0, 0, 0, .5);--code-bg: #1e1e1e;--code-text: #d4d4d4;--code-line-number: #858585;--code-line-border: #3a3a3a;--code-selection: rgba(38, 79, 120, .6);--syntax-comment: #6a9955;--syntax-keyword: #569cd6;--syntax-string: #ce9178;--syntax-number: #b5cea8;--syntax-operator: #d4d4d4;--syntax-function: #dcdcaa;--syntax-class: #4ec9b0;--syntax-punctuation: #d4d4d4;--tab-bg: #2a2a2a;--tab-text: #a0a0a0;--tab-text-hover: #d0d0d0;--tab-text-active: #ffffff;--tab-border-active: #4a9eff;--button-bg: transparent;--button-border: #4a4a4a;--button-text: #a0a0a0;--button-bg-hover: #3a3a3a;--button-border-hover: #5a5a5a;--button-text-hover: #e0e0e0;--recompile-bg: #3a3a3a;--recompile-text: #e0e0e0;--recompile-bg-hover: #4a4a4a;--recompile-bg-active: #5a5a5a;--image-viewer-bg: #2a2a2a;--pane-radius: 8px;--pane-shadow: var(--shadow-lg), var(--shadow-sm)}[data-theme=system]{--bg-primary: #f5f5f5;--bg-secondary: #ffffff;--bg-tertiary: #f8f8f8;--bg-canvas: #000000;--text-primary: #000000;--text-secondary: #333333;--text-muted: #666666;--text-disabled: #999999;--border-primary: #e0e0e0;--border-secondary: #cccccc;--accent-primary: #4a9eff;--accent-primary-hover: #3a8eef;--accent-primary-active: #2a7edf;--accent-secondary: #7c4dff;--error-bg: #fff0f0;--error-text: #cc0000;--error-border: #ffcccc;--success-bg: #e8f5e9;--success-text: #4caf50;--success-border: #4caf50;--overlay-bg: rgba(0, 0, 0, .75);--overlay-backdrop: rgba(0, 0, 0, .95);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .1);--shadow-md: 0 10px 30px rgba(0, 0, 0, .2);--shadow-lg: 0 20px 60px rgba(0, 0, 0, .25);--code-bg: #ffffff;--code-text: #000000;--code-line-number: #999999;--code-line-border: #e0e0e0;--code-selection: rgba(173, 214, 255, .4);--syntax-comment: #6a9955;--syntax-keyword: #0000ff;--syntax-string: #a31515;--syntax-number: #098658;--syntax-operator: #000000;--syntax-function: #795e26;--syntax-class: #267f99;--syntax-punctuation: #000000;--tab-bg: #f8f8f8;--tab-text: #666666;--tab-text-hover: #333333;--tab-text-active: #000000;--tab-border-active: #4a9eff;--button-bg: transparent;--button-border: #cccccc;--button-text: #666666;--button-bg-hover: #f0f0f0;--button-border-hover: #999999;--button-text-hover: #333333;--recompile-bg: #e8e8e8;--recompile-text: #333333;--recompile-bg-hover: #d8d8d8;--recompile-bg-active: #c8c8c8;--image-viewer-bg: #f5f5f5;--pane-radius: 8px;--pane-shadow: var(--shadow-lg), var(--shadow-sm)}@media (prefers-color-scheme: dark){[data-theme=system]{--bg-primary: #1a1a1a;--bg-secondary: #252525;--bg-tertiary: #2a2a2a;--bg-canvas: #000000;--text-primary: #ffffff;--text-secondary: #e0e0e0;--text-muted: #a0a0a0;--text-disabled: #666666;--border-primary: #3a3a3a;--border-secondary: #4a4a4a;--accent-primary: #4a9eff;--accent-primary-hover: #5aadff;--accent-primary-active: #3a8eef;--accent-secondary: #9c7cff;--error-bg: #3a1a1a;--error-text: #ff6b6b;--error-border: #5a2a2a;--success-bg: #1a3a1a;--success-text: #6bcf6b;--success-border: #2a5a2a;--overlay-bg: rgba(0, 0, 0, .85);--overlay-backdrop: rgba(0, 0, 0, .98);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .3);--shadow-md: 0 10px 30px rgba(0, 0, 0, .4);--shadow-lg: 0 20px 60px rgba(0, 0, 0, .5);--code-bg: #1e1e1e;--code-text: #d4d4d4;--code-line-number: #858585;--code-line-border: #3a3a3a;--code-selection: rgba(38, 79, 120, .6);--syntax-comment: #6a9955;--syntax-keyword: #569cd6;--syntax-string: #ce9178;--syntax-number: #b5cea8;--syntax-operator: #d4d4d4;--syntax-function: #dcdcaa;--syntax-class: #4ec9b0;--syntax-punctuation: #d4d4d4;--tab-bg: #2a2a2a;--tab-text: #a0a0a0;--tab-text-hover: #d0d0d0;--tab-text-active: #ffffff;--tab-border-active: #4a9eff;--button-bg: transparent;--button-border: #4a4a4a;--button-text: #a0a0a0;--button-bg-hover: #3a3a3a;--button-border-hover: #5a5a5a;--button-text-hover: #e0e0e0;--recompile-bg: #3a3a3a;--recompile-text: #e0e0e0;--recompile-bg-hover: #4a4a4a;--recompile-bg-active: #5a5a5a;--image-viewer-bg: #2a2a2a;--pane-radius: 8px;--pane-shadow: var(--shadow-lg), var(--shadow-sm)}}.unstyled{--pane-radius: 0 !important;--pane-shadow: none !important}:root{--glass-bg: rgba(30, 30, 35, .65);--glass-bg-hover: rgba(30, 30, 35, .8);--glass-border: 1px solid rgba(255, 255, 255, .1);--glass-shadow: 0 4px 16px rgba(0, 0, 0, .25), 0 2px 4px rgba(0, 0, 0, .15), inset 0 1px 0 rgba(255, 255, 255, .1);--glass-shadow-sm: 0 2px 8px rgba(0, 0, 0, .25), inset 0 1px 0 rgba(255, 255, 255, .08);--glass-blur: blur(20px);--glass-radius: 6px;--glass-radius-sm: 6px;--glass-text: rgba(255, 255, 255, .9);--glass-text-muted: rgba(255, 255, 255, .6)}.stats-container{position:absolute;bottom:12px;left:12px;z-index:1000;display:flex;flex-direction:column;align-items:flex-start;gap:6px}.fps-counter{padding:6px 10px;background:var(--glass-bg);color:var(--glass-text);font-family:Monaco,Menlo,Courier New,monospace;font-size:11px;font-weight:500;border-radius:var(--glass-radius-sm);border:var(--glass-border);cursor:pointer;-webkit-user-select:none;user-select:none;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow-sm);transition:all .2s ease}.fps-counter:hover{background:var(--glass-bg-hover)}.stats-grid{display:flex;flex-direction:row;gap:6px;opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .2s ease,transform .2s ease,visibility .2s;pointer-events:none}.stats-grid.open{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto}.stat-item{padding:6px 10px;background:var(--glass-bg);border-radius:var(--glass-radius-sm);border:var(--glass-border);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow-sm);display:flex;flex-direction:column;align-items:center;gap:2px;min-width:48px}.stat-value{color:var(--glass-text);font-family:Monaco,Menlo,Courier New,monospace;font-size:11px;font-weight:600;white-space:nowrap}.stat-label{color:var(--glass-text-muted);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-size:9px;font-weight:500;text-transform:uppercase;letter-spacing:.5px}.playback-controls{position:absolute;bottom:12px;right:12px;z-index:1000}.controls-menu-button{padding:6px 8px;background:var(--glass-bg);color:var(--glass-text);border:var(--glass-border);border-radius:var(--glass-radius-sm);cursor:pointer;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow-sm);transition:all .2s ease;display:flex;align-items:center;justify-content:center;width:44px;height:44px;font-size:20px;font-weight:300;line-height:1}.controls-menu-button:hover{background:var(--glass-bg-hover);transform:scale(1.05)}.controls-menu-button:active{transform:scale(.95)}.controls-grid{position:absolute;bottom:0;right:0;display:grid;grid-template-columns:44px 44px 44px 44px;grid-template-rows:44px 44px;gap:6px;opacity:0;visibility:hidden;transform:scale(.8);transform-origin:bottom right;transition:opacity .2s ease,transform .2s ease,visibility .2s;pointer-events:none}.controls-grid.open{opacity:1;visibility:visible;transform:scale(1);pointer-events:auto}.control-button{padding:6px 8px;background:var(--glass-bg);color:var(--glass-text);border:var(--glass-border);border-radius:var(--glass-radius-sm);cursor:pointer;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow-sm);transition:all .2s ease;display:flex;align-items:center;justify-content:center;width:44px;height:44px}.control-button:hover{background:var(--glass-bg-hover);transform:scale(1.05)}.control-button:active{transform:scale(.95)}.control-button svg{width:16px;height:16px;fill:currentColor}.playback-controls .controls-menu-button{position:relative;z-index:1}.playback-controls.open>.controls-menu-button{opacity:0;pointer-events:none}.shader-error-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:#000000f2;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:2000;padding:60px;overflow-y:auto}.error-overlay-content{background:#1a1a1a;border-radius:6px;max-width:900px;width:100%;display:flex;flex-direction:column;box-shadow:0 20px 60px #000c,0 0 1px #ffffff1a;border:1px solid #2a2a2a;max-height:calc(100vh - 120px)}.error-header{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;background:linear-gradient(135deg,#c62828,#b71c1c);color:#fff;border-radius:6px 6px 0 0;border-bottom:1px solid rgba(0,0,0,.3);box-shadow:0 2px 8px #0003}.error-title{font-size:15px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;display:flex;align-items:center;gap:8px;letter-spacing:-.01em}.error-close{background:transparent;border:none;color:#ffffffe6;font-size:24px;line-height:1;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all .2s ease;opacity:.8}.error-close:hover{background:#ffffff26;opacity:1;transform:scale(1.05)}.error-body{padding:24px;overflow-y:auto;flex:1}.error-section{margin-bottom:24px}.error-section:last-child{margin-bottom:0}.error-pass-name{font-size:13px;font-weight:600;color:#ffa726;font-family:Monaco,Menlo,Courier New,monospace;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #2a2a2a;letter-spacing:.02em}.error-content{margin:0;padding:14px 16px;background:#0f0f0f;border-radius:4px;color:#ff6b6b;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.6;overflow-x:auto;border:1px solid #2a2a2a;white-space:pre-wrap;word-break:break-word}.error-code-context{margin:12px 0 0;padding:14px 16px;background:#0d0d0d;border-radius:4px;color:#b0b0b0;font-size:12px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.6;overflow-x:auto;border:1px solid #2a2a2a;white-space:pre}.error-code-context .context-line{color:#666;display:block}.error-code-context .error-line-highlight{color:#fff;background:#c6282840;display:block;font-weight:600;border-left:3px solid #c62828;margin-left:-16px;padding-left:13px}.context-lost-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:#000000e6;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:3000}.context-lost-content{text-align:center;color:#fff;padding:40px}.context-lost-icon{margin-bottom:16px;opacity:.8}.context-lost-spinner{width:48px;height:48px;border:3px solid rgba(255,255,255,.2);border-top-color:#fff;border-radius:50%;margin:0 auto 16px;animation:context-lost-spin 1s linear infinite}@keyframes context-lost-spin{to{transform:rotate(360deg)}}.context-lost-title{font-size:18px;font-weight:600;margin-bottom:8px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}.context-lost-message{font-size:14px;opacity:.7;margin-bottom:20px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}.context-lost-reload{background:#fff;color:#000;border:none;padding:10px 24px;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:transform .2s,box-shadow .2s;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif}.context-lost-reload:hover{transform:scale(1.02);box-shadow:0 4px 12px #fff3}.context-lost-reload:active{transform:scale(.98)}.recording-indicator{position:absolute;top:12px;right:12px;z-index:1000;display:flex;align-items:center;gap:6px;padding:6px 10px;background:#dc2626d9;border-radius:var(--glass-radius-sm);border:1px solid rgba(255,100,100,.3);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow-sm)}.recording-dot{width:8px;height:8px;background:#fff;border-radius:50%;animation:recording-pulse 1s ease-in-out infinite}@keyframes recording-pulse{0%,to{opacity:1}50%{opacity:.4}}.recording-text{color:#fff;font-family:Monaco,Menlo,Courier New,monospace;font-size:11px;font-weight:600;letter-spacing:.5px}.control-button.recording{background:#dc2626b3;border-color:#ff64644d}.control-button.recording:hover{background:#dc2626d9}.control-button.recording svg{fill:#fff}.media-permission-banner{position:absolute;bottom:48px;left:50%;transform:translate(-50%);background:var(--glass-bg);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:var(--glass-border);box-shadow:var(--glass-shadow);color:#ffffffe6;padding:8px 16px;border-radius:6px;font-size:13px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;display:flex;align-items:center;gap:12px;z-index:100;white-space:nowrap}.media-banner-button{background:#4a9effcc;color:#fff;border:none;padding:4px 12px;border-radius:4px;cursor:pointer;font-size:13px;font-family:inherit}.media-banner-button:hover{background:#4a9eff}.script-error-overlay{position:absolute;bottom:48px;left:12px;right:12px;z-index:1500;pointer-events:auto}.script-error-content{background:#1a1a1a;border-radius:6px;box-shadow:0 8px 32px #0009,0 0 1px #ffffff1a;border:1px solid #2a2a2a;overflow:hidden}.script-error-header{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:linear-gradient(135deg,#e65100,#bf360c);color:#fff;border-bottom:1px solid rgba(0,0,0,.3)}.script-error-header.disabled{background:linear-gradient(135deg,#6d4c41,#4e342e)}.script-error-header.warning{background:linear-gradient(135deg,#f9a825,#f57f17);color:#1a1a1a}.script-error-header.warning .script-error-close{color:#000000b3}.script-error-header.warning .script-error-close:hover{background:#00000026;color:#000000e6}.script-error-title{font-size:13px;font-weight:600;font-family:Monaco,Menlo,Courier New,monospace;display:flex;align-items:center;gap:6px}.script-error-close{background:transparent;border:none;color:#ffffffe6;font-size:20px;line-height:1;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;opacity:.8;transition:all .2s ease}.script-error-close:hover{background:#ffffff26;opacity:1}.script-error-message{margin:0;padding:10px 14px;color:#ffab91;font-size:12px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.5;white-space:pre-wrap;word-break:break-word;max-height:80px;overflow-y:auto}.script-error-stack{margin:0;padding:6px 14px 10px;color:#888;font-size:11px;font-family:Monaco,Menlo,Courier New,monospace;line-height:1.4;white-space:pre-wrap;word-break:break-word;max-height:60px;overflow-y:auto;border-top:1px solid #2a2a2a}.script-overlay{position:absolute;z-index:500;padding:6px 10px;background:var(--glass-bg);color:var(--glass-text);font-family:Monaco,Menlo,Courier New,monospace;font-size:11px;border-radius:var(--glass-radius-sm);border:var(--glass-border);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow-sm);pointer-events:none;white-space:pre;max-width:calc(100% - 24px);overflow:hidden;text-overflow:ellipsis}.script-overlay.hidden{display:none}.script-overlay.top-left{top:12px;left:12px}.script-overlay.top-right{top:12px;right:12px}.script-overlay.bottom-left{bottom:12px;left:12px}.script-overlay.bottom-right{bottom:12px;right:12px}@media (prefers-reduced-motion: reduce){*,*:before,*:after{transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}@media (max-width: 428px){.stats-container{bottom:8px;left:8px}.playback-controls{bottom:8px;right:8px}.script-error-overlay{left:8px;right:8px;bottom:40px}.script-overlay.top-left{top:8px;left:8px}.script-overlay.top-right{top:8px;right:8px}.script-overlay.bottom-left{bottom:8px;left:8px}.script-overlay.bottom-right{bottom:8px;right:8px}}.uniforms-panel-wrapper{position:absolute;top:16px;right:16px;z-index:100;display:flex;flex-direction:column;align-items:flex-end}.uniforms-toggle-button{width:44px;height:44px;padding:6px;background:var(--glass-bg);border:var(--glass-border);border-radius:var(--glass-radius-sm);color:var(--glass-text);cursor:pointer;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow-sm);transition:all .2s ease,opacity .15s ease;display:flex;align-items:center;justify-content:center}.uniforms-toggle-button:hover{background:var(--glass-bg-hover);transform:scale(1.05)}.uniforms-toggle-button:active{transform:scale(.95)}.uniforms-toggle-button svg{width:16px;height:16px}.uniforms-toggle-button.hidden{opacity:0;transform:scale(.8);pointer-events:none;position:absolute}.uniforms-panel{width:175px;max-height:calc(100vh - 100px);background:var(--glass-bg);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);border-radius:var(--glass-radius);border:var(--glass-border);box-shadow:var(--glass-shadow);overflow:hidden;display:flex;flex-direction:column;transform-origin:top right;transition:opacity .2s ease,transform .2s ease,max-height .2s ease}.uniforms-panel.closed{opacity:0;transform:scale(.25) translate(0);transform-origin:top right;pointer-events:none;max-height:0;padding:0}.uniforms-panel-header{padding:10px 14px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--glass-text-muted);background:#ffffff08;border-bottom:1px solid rgba(255,255,255,.06);flex-shrink:0;display:flex;justify-content:space-between;align-items:center}.uniforms-panel-close{background:transparent;border:none;color:var(--glass-text-muted);font-size:18px;line-height:1;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all .15s ease}.uniforms-panel-close:hover{background:#ffffff1a;color:var(--glass-text)}.uniforms-panel-content{flex:1;overflow-y:auto;overflow-x:hidden}.uniforms-panel .uniform-controls{padding:12px;gap:12px;background:transparent}.uniforms-panel .uniform-controls-header{display:none}.uniforms-panel .uniform-controls-list{gap:14px}.uniforms-panel .uniform-control{gap:6px}.uniforms-panel .uniform-control-label{font-size:11px;color:var(--glass-text)}.uniforms-panel .uniform-control-value{font-size:10px;padding:1px 4px;min-width:40px;color:var(--glass-text-muted);background:#0003;border-radius:3px}.uniforms-panel .uniform-control-slider{height:4px;background:#ffffff26}.uniforms-panel .uniform-control-slider::-webkit-slider-runnable-track{height:4px;background:#ffffff26}.uniforms-panel .uniform-control-slider::-webkit-slider-thumb{width:12px;height:12px;margin-top:-4px;background:#ffffffe6;box-shadow:0 1px 4px #0000004d}.uniforms-panel .uniform-control-slider::-moz-range-track{height:4px;background:#ffffff26}.uniforms-panel .uniform-control-slider::-moz-range-thumb{width:12px;height:12px;background:#ffffffe6;box-shadow:0 1px 4px #0000004d}.uniforms-panel .uniform-control-toggle{width:34px;height:18px}.uniforms-panel .uniform-control-toggle-slider{border-radius:18px}.uniforms-panel .uniform-control-toggle-slider:before{width:12px;height:12px;left:3px;bottom:3px}.uniforms-panel .uniform-control-toggle input:checked+.uniform-control-toggle-slider:before{transform:translate(16px)}.uniforms-panel .uniform-control-xy-pad{height:100px}.uniforms-panel .uniform-control-xy-handle{width:12px;height:12px}.uniforms-panel .uniform-control-color-swatch{height:28px}.uniforms-panel .uniform-control-vec-slider-row{gap:6px}.uniforms-panel .uniform-control-vec-component{font-size:9px;width:12px;color:var(--glass-text-muted)}.uniforms-panel .uniform-control-vec-value{font-size:9px;min-width:32px;color:var(--glass-text-muted);background:#0003;border-radius:3px}.uniforms-panel .uniform-control-xy-pad{background:#00000040;border:1px solid rgba(255,255,255,.1)}.uniforms-panel .uniform-control-xy-handle{background:#ffffffe6;box-shadow:0 1px 4px #0006}.uniforms-panel-content::-webkit-scrollbar{width:6px}.uniforms-panel-content::-webkit-scrollbar-track{background:transparent}.uniforms-panel-content::-webkit-scrollbar-thumb{background:#fff3;border-radius:3px}.uniforms-panel-content::-webkit-scrollbar-thumb:hover{background:#ffffff59}.uniform-controls{display:flex;flex-direction:column;gap:16px;padding:16px;height:100%;overflow-y:auto;background:var(--bg-secondary)}.uniform-controls-empty{color:var(--text-muted);font-size:13px;text-align:center;padding:20px}.uniform-controls-header{display:flex;justify-content:flex-end;padding-bottom:8px;border-bottom:1px solid var(--border-primary);margin-bottom:8px}.uniform-controls-reset{font-family:inherit;font-size:11px;padding:4px 10px;background:var(--bg-tertiary);color:var(--text-secondary);border:1px solid var(--border-primary);border-radius:4px;cursor:pointer;transition:background .15s ease,color .15s ease}.uniform-controls-reset:hover{background:var(--border-primary);color:var(--text-primary)}.uniform-controls-reset:active{transform:translateY(1px)}.uniform-controls-list{display:flex;flex-direction:column;gap:16px}.uniform-control{display:flex;flex-direction:column;gap:8px}.uniform-control-label-row{display:flex;justify-content:space-between;align-items:center}.uniform-control-label{font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;font-weight:500;color:var(--text-primary)}.uniform-control-value{font-family:Monaco,Menlo,Courier New,monospace;font-size:11px;color:var(--text-muted);background:var(--bg-tertiary);padding:2px 6px;border-radius:3px;min-width:50px;text-align:right}.uniform-control-slider{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:100%;height:6px;background:var(--border-primary);border-radius:3px;outline:none;cursor:pointer}.uniform-control-slider::-webkit-slider-runnable-track{height:6px;background:var(--border-primary);border-radius:3px}.uniform-control-slider::-webkit-slider-thumb{-webkit-appearance:none;-moz-appearance:none;appearance:none;width:14px;height:14px;background:var(--accent-primary);border-radius:50%;cursor:pointer;margin-top:-4px;transition:transform .15s ease,box-shadow .15s ease}.uniform-control-slider::-webkit-slider-thumb:hover{transform:scale(1.1);box-shadow:0 2px 6px #0003}.uniform-control-slider::-webkit-slider-thumb:active{transform:scale(.95)}.uniform-control-slider::-moz-range-track{height:6px;background:var(--border-primary);border-radius:3px}.uniform-control-slider::-moz-range-thumb{width:14px;height:14px;background:var(--accent-primary);border:none;border-radius:50%;cursor:pointer;transition:transform .15s ease,box-shadow .15s ease}.uniform-control-slider::-moz-range-thumb:hover{transform:scale(1.1);box-shadow:0 2px 6px #0003}.uniform-control-slider::-moz-range-thumb:active{transform:scale(.95)}.uniform-control-slider:focus{outline:none}.uniform-control-slider:focus::-webkit-slider-thumb{box-shadow:0 0 0 3px var(--code-selection)}.uniform-control-slider:focus::-moz-range-thumb{box-shadow:0 0 0 3px var(--code-selection)}.uniform-control-toggle{position:relative;display:inline-block;width:40px;height:22px;cursor:pointer}.uniform-control-toggle input{opacity:0;width:0;height:0}.uniform-control-toggle-slider{position:absolute;top:0;left:0;right:0;bottom:0;background:var(--border-primary);border-radius:22px;transition:background .2s ease}.uniform-control-toggle-slider:before{content:"";position:absolute;width:16px;height:16px;left:3px;bottom:3px;background:var(--text-muted);border-radius:50%;transition:transform .2s ease,background .2s ease}.uniform-control-toggle input:checked+.uniform-control-toggle-slider{background:var(--accent-primary)}.uniform-control-toggle input:checked+.uniform-control-toggle-slider:before{transform:translate(18px);background:#fff}.uniform-control-toggle input:focus+.uniform-control-toggle-slider{box-shadow:0 0 0 2px var(--code-selection)}.uniform-control-xy-pad{position:relative;width:100%;height:120px;background:var(--bg-tertiary);border:1px solid var(--border-primary);border-radius:4px;cursor:crosshair;overflow:hidden}.uniform-control-xy-pad:before,.uniform-control-xy-pad:after{content:"";position:absolute;background:var(--border-primary);opacity:.5}.uniform-control-xy-pad:before{left:50%;top:0;bottom:0;width:1px}.uniform-control-xy-pad:after{top:50%;left:0;right:0;height:1px}.uniform-control-xy-handle{position:absolute;width:14px;height:14px;background:var(--accent-primary);border:2px solid white;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 2px 4px #0000004d;pointer-events:none;z-index:1}.uniform-control-color-wrapper{display:flex;align-items:center;gap:8px}.uniform-control-color-swatch{width:100%;height:32px;border-radius:4px;border:1px solid var(--border-primary);cursor:pointer;transition:box-shadow .15s ease}.uniform-control-color-swatch:hover{box-shadow:0 0 0 2px var(--accent-primary)}.uniform-control-color-input{position:absolute;width:0;height:0;opacity:0;pointer-events:none}.uniform-control-vec3{gap:6px}.uniform-control-vec-slider-row{display:flex;align-items:center;gap:8px}.uniform-control-vec-component{font-family:Monaco,Menlo,Courier New,monospace;font-size:10px;font-weight:600;color:var(--text-muted);width:14px;text-align:center}.uniform-control-vec-slider{flex:1}.uniform-control-vec-value{min-width:40px;font-size:10px}.render-dialog-backdrop{position:absolute;top:0;left:0;right:0;bottom:0;background:#000000b3;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:4000}.render-dialog{background:#1a1a1f;border:1px solid rgba(255,255,255,.1);border-radius:10px;box-shadow:0 20px 60px #0009;width:360px;max-width:calc(100% - 32px);overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#e0e0e0}.render-dialog-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:linear-gradient(135deg,#1565c0,#0d47a1);color:#fff;border-bottom:1px solid rgba(0,0,0,.3)}.render-dialog-title{font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px}.render-dialog-close{background:transparent;border:none;color:#fffc;font-size:20px;line-height:1;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all .15s ease}.render-dialog-close:hover{background:#ffffff26;color:#fff}.render-dialog-body{padding:18px;display:flex;flex-direction:column;gap:14px}.render-field{display:flex;flex-direction:column;gap:5px}.render-field-label{font-size:12px;font-weight:500;color:#fff9;text-transform:uppercase;letter-spacing:.5px}.render-field-row{display:flex;gap:8px;align-items:center}.render-field-row span{color:#fff6;font-size:13px}.render-input{flex:1;background:#0f0f14;border:1px solid rgba(255,255,255,.1);border-radius:5px;color:#e0e0e0;font-family:Monaco,Menlo,monospace;font-size:13px;padding:7px 10px;outline:none;transition:border-color .15s}.render-input:focus{border-color:#648cff80}.render-input[type=number]{-moz-appearance:textfield}.render-input[type=number]::-webkit-inner-spin-button,.render-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.render-format-group{display:flex;gap:8px}.render-format-option{flex:1;position:relative}.render-format-option input[type=radio]{position:absolute;opacity:0;pointer-events:none}.render-format-option label{display:block;text-align:center;padding:8px 12px;background:#0f0f14;border:1px solid rgba(255,255,255,.1);border-radius:5px;font-size:12px;font-weight:500;cursor:pointer;transition:all .15s}.render-format-option input[type=radio]:checked+label{background:#648cff26;border-color:#648cff80;color:#8ab4ff}.render-format-option label:hover{border-color:#fff3}.render-estimate{font-size:11px;color:#fff6;font-family:Monaco,Menlo,monospace;text-align:center;padding:4px 0}.render-dialog-actions{display:flex;gap:8px;padding:0 18px 18px}.render-btn{flex:1;padding:9px 16px;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;border:none;transition:all .15s;font-family:inherit}.render-btn-primary{background:linear-gradient(135deg,#1565c0,#0d47a1);color:#fff}.render-btn-primary:hover{filter:brightness(1.1)}.render-btn-primary:disabled{opacity:.5;cursor:not-allowed;filter:none}.render-btn-cancel{background:#ffffff14;color:#ffffffb3;border:1px solid rgba(255,255,255,.1)}.render-btn-cancel:hover{background:#ffffff1f}.render-progress{display:none;flex-direction:column;gap:8px;padding:18px}.render-progress.active{display:flex}.render-progress-bar-bg{height:6px;background:#0f0f14;border-radius:3px;overflow:hidden}.render-progress-bar{height:100%;background:linear-gradient(90deg,#1565c0,#42a5f5);border-radius:3px;width:0%;transition:width .1s ease}.render-progress-text{font-size:12px;color:#ffffff80;font-family:Monaco,Menlo,monospace;text-align:center}.multi-view-controls-wrapper{position:absolute;top:16px;right:16px;z-index:100;display:flex;flex-direction:column;align-items:flex-end}.multi-view-controls-toggle{width:44px;height:44px;padding:6px;background:var(--glass-bg);border:var(--glass-border);border-radius:var(--glass-radius-sm);color:var(--glass-text);cursor:pointer;backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);box-shadow:var(--glass-shadow-sm);transition:all .2s ease,opacity .15s ease;display:flex;align-items:center;justify-content:center}.multi-view-controls-toggle:hover{background:var(--glass-bg-hover);transform:scale(1.05)}.multi-view-controls-toggle:active{transform:scale(.95)}.multi-view-controls-toggle svg{width:16px;height:16px}.multi-view-controls-toggle.hidden{opacity:0;transform:scale(.8);pointer-events:none;position:absolute}.multi-view-controls-panel{width:175px;max-height:calc(100vh - 100px);background:var(--glass-bg);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);border-radius:var(--glass-radius);border:var(--glass-border);box-shadow:var(--glass-shadow);overflow:hidden;display:flex;flex-direction:column;transform-origin:top right;transition:opacity .2s ease,transform .2s ease,max-height .2s ease}.multi-view-controls-panel.closed{opacity:0;transform:scale(.25) translate(0);transform-origin:top right;pointer-events:none;max-height:0;padding:0}.multi-view-controls-header{padding:10px 14px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--glass-text-muted);background:#ffffff08;border-bottom:1px solid rgba(255,255,255,.06);flex-shrink:0;display:flex;justify-content:space-between;align-items:center}.multi-view-controls-close{background:transparent;border:none;color:var(--glass-text-muted);font-size:18px;line-height:1;cursor:pointer;padding:0;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all .15s ease}.multi-view-controls-close:hover{background:#ffffff1a;color:var(--glass-text)}.controls-section{display:flex;flex-direction:column;gap:8px;padding:12px}.controls-section+.controls-section{padding-top:0}.section-label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--glass-text-muted);padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,.06);margin-bottom:4px}.playback-controls{flex-direction:row;gap:8px;padding:12px}.control-btn{width:44px;height:44px;border:none;border-radius:var(--glass-radius-sm);background:#ffffff1a;color:var(--glass-text);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s ease}.control-btn:hover{background:#fff3}.control-btn:active{transform:scale(.95)}.control-btn svg{width:16px;height:16px}.uniforms-section{border-top:1px solid rgba(255,255,255,.06)}.uniforms-container{display:flex;flex-direction:column;gap:8px}.multi-view-controls-panel .uniform-controls{padding:0;gap:12px;background:transparent}.multi-view-controls-panel .uniform-controls-header{display:none}.multi-view-controls-panel .uniform-controls-list{gap:14px}.multi-view-controls-panel .uniform-control{gap:6px}.multi-view-controls-panel .uniform-control-label{font-size:11px;color:var(--glass-text)}.multi-view-controls-panel .uniform-control-value{font-size:10px;padding:1px 4px;min-width:40px;color:var(--glass-text-muted);background:#0003;border-radius:3px}.multi-view-controls-panel .uniform-control-slider{height:4px;background:#ffffff26}.multi-view-controls-panel .uniform-control-slider::-webkit-slider-runnable-track{height:4px;background:#ffffff26}.multi-view-controls-panel .uniform-control-slider::-webkit-slider-thumb{width:12px;height:12px;margin-top:-4px;background:#ffffffe6;box-shadow:0 1px 4px #0000004d}.multi-view-controls-panel .uniform-control-slider::-moz-range-track{height:4px;background:#ffffff26}.multi-view-controls-panel .uniform-control-slider::-moz-range-thumb{width:12px;height:12px;background:#ffffffe6;box-shadow:0 1px 4px #0000004d}.multi-view-controls-panel .uniform-control-toggle{width:34px;height:18px}.multi-view-controls-panel .uniform-control-toggle-slider{border-radius:18px}.multi-view-controls-panel .uniform-control-toggle-slider:before{width:12px;height:12px;left:3px;bottom:3px}.multi-view-controls-panel .uniform-control-toggle input:checked+.uniform-control-toggle-slider:before{transform:translate(16px)}.layout-fullscreen{width:100%;height:100%}.layout-fullscreen .canvas-container{position:relative;width:100%;height:100%;background:#000}.layout-default{width:100%;height:100%}.layout-default .canvas-container{position:relative;width:100%;height:100%;background:var(--bg-canvas);border-radius:var(--pane-radius);box-shadow:var(--pane-shadow);overflow:hidden}.layout-split{width:100%;height:100%;display:flex;gap:24px}.layout-split .canvas-container{position:relative;flex:1;background:var(--bg-canvas);border-radius:var(--pane-radius);box-shadow:var(--pane-shadow);overflow:hidden}.layout-split .code-panel{position:relative;flex:1;display:flex;flex-direction:column;background:var(--bg-secondary);border-radius:var(--pane-radius);box-shadow:var(--pane-shadow);overflow:hidden}.tab-bar{display:flex;background:var(--tab-bg);border-bottom:1px solid var(--border-primary);padding:8px 8px 0;gap:4px}.tab-button{padding:8px 16px;background:transparent;border:none;border-radius:6px 6px 0 0;font-size:13px;font-family:Monaco,Menlo,Courier New,monospace;cursor:pointer;transition:background .2s,color .2s;color:var(--tab-text)}.tab-button:hover{background:var(--button-bg-hover);color:var(--tab-text-hover)}.tab-button.active{background:var(--bg-secondary);color:var(--tab-text-active);font-weight:500}.copy-button{position:absolute;top:12px;right:12px;padding:6px;background:var(--button-bg);border:none;border-radius:4px;color:var(--button-text);cursor:pointer;transition:all .2s;z-index:10;display:flex;align-items:center;justify-content:center}.copy-button:hover{background:var(--button-bg-hover);color:var(--button-text-hover)}.copy-button:active{transform:scale(.9)}.copy-button.copied{color:var(--success-text)}.code-viewer{flex:1;min-height:0;overflow:auto;position:relative;background:var(--code-bg)}.code-viewer pre{margin:0;padding:16px;font-size:13px;line-height:1.5;font-family:Monaco,Menlo,Courier New,monospace;background:var(--code-bg);color:var(--code-text)}.code-viewer code{font-family:inherit;font-size:inherit}.token.comment{color:var(--syntax-comment)}.token.keyword{color:var(--syntax-keyword)}.token.string{color:var(--syntax-string)}.token.number{color:var(--syntax-number)}.token.operator{color:var(--syntax-operator)}.token.function{color:var(--syntax-function)}.token.class-name{color:var(--syntax-class)}.token.punctuation{color:var(--syntax-punctuation)}.tab-button.image-tab,.tab-button.image-tab.active{color:var(--accent-secondary)}.image-viewer{display:flex;align-items:center;justify-content:center;height:100%;padding:16px;background:var(--image-viewer-bg)}.image-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:var(--shadow-sm)}@media (max-width: 800px){.layout-split{flex-direction:column}}.layout-tabbed{width:100%;height:100%;display:flex;flex-direction:column;box-sizing:border-box}.tabbed-wrapper{display:flex;flex-direction:column;width:100%;height:100%;border-radius:var(--pane-radius);box-shadow:var(--pane-shadow);overflow:hidden}.tabbed-toolbar{display:flex;align-items:center;flex-shrink:0;background:var(--tab-bg);border-bottom:1px solid var(--border-primary);padding-right:8px}.tabbed-tab-bar{display:flex;flex:1;gap:4px;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin}.tabbed-tab-bar::-webkit-scrollbar{height:4px}.tabbed-tab-bar::-webkit-scrollbar-thumb{background:var(--border-secondary);border-radius:2px}.tabbed-tab-button{padding:10px 16px;background:transparent;border:none;border-bottom:2px solid transparent;font-size:12px;font-family:Monaco,Menlo,Courier New,monospace;cursor:pointer;transition:color .15s,border-color .15s;color:var(--tab-text);white-space:nowrap;flex-shrink:0}.tabbed-tab-button:hover{color:var(--tab-text-hover)}.tabbed-tab-button.active{color:var(--tab-text-active);border-bottom-color:var(--tab-border-active)}.tabbed-tab-button.shader-tab{font-family:system-ui,-apple-system,sans-serif}.tabbed-tab-button.image-tab{color:var(--accent-secondary)}.tabbed-tab-button.image-tab.active{color:var(--accent-secondary);border-bottom-color:var(--accent-secondary)}.tabbed-tab-button.uniforms-tab{color:var(--accent-tertiary, var(--accent-primary));padding:8px 12px}.tabbed-tab-button.uniforms-tab.active{color:var(--accent-tertiary, var(--accent-primary));border-bottom-color:var(--accent-tertiary, var(--accent-primary))}.tabbed-tab-button .uniforms-icon{width:18px;height:18px;display:block}.tabbed-content{flex:1;min-height:0;position:relative;background:var(--bg-canvas);overflow:hidden}.tabbed-canvas-container{position:absolute;top:0;left:0;width:100%;height:100%}.tabbed-code-viewer{position:absolute;top:0;left:0;width:100%;height:100%;overflow:auto;background:var(--code-bg)}.tabbed-code-viewer pre{margin:0;padding:16px 16px 16px 0;font-size:13px;line-height:1.6;font-family:Monaco,Menlo,Courier New,monospace;background:var(--code-bg);color:var(--code-text);display:flex}.tabbed-code-viewer code{font-family:inherit;font-size:inherit}.tabbed-line-numbers{text-align:right;padding-right:16px;margin-right:16px;border-right:1px solid var(--code-line-border);color:var(--code-line-number);-webkit-user-select:none;user-select:none;flex-shrink:0;padding-left:16px}.tabbed-code-content{flex:1;overflow-x:auto}.tabbed-image-viewer{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--image-viewer-bg);padding:20px;box-sizing:border-box}.tabbed-image-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:var(--shadow-sm)}.tabbed-code-viewer .token.comment{color:var(--syntax-comment)}.tabbed-code-viewer .token.keyword{color:var(--syntax-keyword)}.tabbed-code-viewer .token.string{color:var(--syntax-string)}.tabbed-code-viewer .token.number{color:var(--syntax-number)}.tabbed-code-viewer .token.operator{color:var(--syntax-operator)}.tabbed-code-viewer .token.function{color:var(--syntax-function)}.tabbed-code-viewer .token.class-name{color:var(--syntax-class)}.tabbed-code-viewer .token.punctuation{color:var(--syntax-punctuation)}@media (max-width: 600px){.tabbed-tab-button{padding:8px 12px;font-size:12px}}.tabbed-editor-container{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;background:var(--code-bg)}.tabbed-button-container{display:flex;align-items:center;gap:6px;flex-shrink:0}.tabbed-copy-button{display:flex;align-items:center;justify-content:center;background:var(--button-bg);border:1px solid var(--button-border);color:var(--button-text);width:44px;height:44px;border-radius:4px;cursor:pointer;transition:background .15s,border-color .15s,color .15s}.tabbed-copy-button:hover{background:var(--button-bg-hover);border-color:var(--button-border-hover);color:var(--button-text-hover)}.tabbed-copy-button:active{background:var(--button-bg-hover)}.tabbed-copy-button.copied{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}.tabbed-recompile-button{display:flex;align-items:center;gap:6px;background:var(--recompile-bg);border:none;color:var(--recompile-text);padding:6px 12px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;transition:background .15s,color .15s}.tabbed-recompile-button:hover{background:var(--recompile-bg-hover)}.tabbed-recompile-button:active{background:var(--recompile-bg-active)}.tabbed-recompile-button svg{flex-shrink:0}.tabbed-error-display{position:absolute;bottom:0;left:0;right:0;background:var(--error-bg);color:var(--error-text);padding:10px 14px;font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;white-space:pre-wrap;overflow:auto;max-height:120px;border-top:1px solid var(--error-border);z-index:10}.tabbed-fallback-textarea{width:100%;height:100%;background:var(--code-bg);color:var(--code-text);border:none;padding:12px;font-family:Monaco,Menlo,Courier New,monospace;font-size:13px;resize:none;outline:none}.tabbed-uniforms-container{position:absolute;top:0;left:0;width:100%;height:100%;overflow-y:auto;background:#00000080;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;justify-content:center;padding:20px;box-sizing:border-box}.tabbed-uniforms-container .uniform-controls{max-width:400px;width:100%;background:#1e1e23f2;border-radius:12px;padding:20px;box-shadow:0 4px 20px #0006;height:fit-content}.tabbed-uniforms-container .uniform-control-label{color:#e0e0e0}.tabbed-uniforms-container .uniform-control-value{color:#a0a0a0;background:#0000004d}.tabbed-uniforms-container .uniform-controls-header{color:#909090;border-bottom-color:#ffffff1a}.tabbed-uniforms-container .uniform-control-slider{background:#ffffff1a}.tabbed-uniforms-container .uniform-control-slider::-webkit-slider-thumb{background:#fff}.tabbed-uniforms-container .uniform-control-slider::-moz-range-thumb{background:#fff}.tabbed-uniforms-container .uniform-control-vec-component{color:#909090}.tabbed-uniforms-container .uniform-control-vec-value{color:#a0a0a0;background:#0000004d}.layout-multi-view{position:relative;width:100%;height:100%;box-sizing:border-box;background:var(--bg-primary)}.multi-view-canvas{position:relative;background:var(--bg-canvas);border-radius:var(--pane-radius);box-shadow:var(--pane-shadow);overflow:hidden}.multi-view-label{position:absolute;top:12px;left:12px;padding:4px 10px;background:#0009;color:#fff;font-family:var(--font-mono);font-size:12px;font-weight:500;border-radius:4px;text-transform:capitalize;z-index:5;pointer-events:none}.multi-view-info{position:absolute;bottom:12px;left:12px;padding:6px 10px;background:#0009;color:#fff;font-family:var(--font-mono);font-size:11px;border-radius:4px;z-index:5;pointer-events:none}.layout-grid-view{display:grid;gap:16px}.layout-grid-view .multi-view-canvas{min-height:0;min-width:0}.layout-grid-view[data-view-count="2"].grid-horizontal{grid-template-columns:1fr 1fr;grid-template-rows:1fr}.layout-grid-view[data-view-count="2"].grid-vertical{grid-template-columns:1fr;grid-template-rows:1fr 1fr}.layout-grid-view[data-view-count="3"].grid-horizontal{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}.layout-grid-view[data-view-count="3"].grid-horizontal .multi-view-canvas:last-child{grid-column:1 / -1}.layout-grid-view[data-view-count="3"].grid-vertical{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}.layout-grid-view[data-view-count="3"].grid-vertical .multi-view-canvas:first-child{grid-column:1 / -1}.layout-grid-view[data-view-count="4"]{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}.layout-inset-view .multi-view-canvas.inset-main{width:100%;height:100%}.layout-inset-view .multi-view-canvas.inset-overlay{position:absolute;bottom:40px;right:40px;width:25%;min-width:200px;aspect-ratio:16 / 9;z-index:10;transition:all .2s ease}.layout-inset-view .multi-view-canvas.inset-overlay.minimized{width:48px;height:48px;min-width:unset;aspect-ratio:unset;cursor:pointer;opacity:.8}.layout-inset-view .multi-view-canvas.inset-overlay.minimized:hover{opacity:1}.inset-minimize-btn{position:absolute;top:8px;right:8px;width:24px;height:24px;border:none;border-radius:4px;background:#00000080;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;z-index:11;transition:background .2s}.inset-minimize-btn:hover{background:#000000b3}.editor-toolbar{display:flex;align-items:center;background:var(--tab-bg);border-bottom:1px solid var(--border-primary);padding-right:8px}.editor-tab-bar{display:flex;flex:1;overflow-x:auto;scrollbar-width:thin}.editor-tab-button{background:transparent;border:none;color:var(--tab-text);padding:10px 16px;cursor:pointer;font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;white-space:nowrap;border-bottom:2px solid transparent;transition:color .15s,border-color .15s}.editor-tab-button:hover{color:var(--tab-text-hover)}.editor-tab-button.active{color:var(--tab-text-active);border-bottom-color:var(--tab-border-active)}.editor-tab-button.image-tab{color:var(--accent-secondary)}.editor-tab-button.image-tab.active{color:var(--accent-secondary);border-bottom-color:var(--accent-secondary)}.editor-tab-button.uniforms-tab{color:var(--accent-tertiary, var(--accent-primary));padding:8px 12px}.editor-tab-button.uniforms-tab.active{color:var(--accent-tertiary, var(--accent-primary));border-bottom-color:var(--accent-tertiary, var(--accent-primary))}.editor-tab-button .uniforms-icon{width:18px;height:18px;display:block}.editor-copy-button{display:flex;align-items:center;justify-content:center;background:var(--button-bg);border:1px solid var(--button-border);color:var(--button-text);width:32px;height:32px;border-radius:4px;cursor:pointer;transition:background .15s,border-color .15s,color .15s;flex-shrink:0;margin-right:6px}.editor-copy-button:hover{background:var(--button-bg-hover);border-color:var(--button-border-hover);color:var(--button-text-hover)}.editor-copy-button:active{background:var(--button-bg-hover)}.editor-copy-button.copied{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}.editor-copy-button svg{flex-shrink:0}.editor-recompile-button{display:flex;align-items:center;gap:6px;background:var(--recompile-bg);border:none;color:var(--recompile-text);padding:6px 12px;border-radius:4px;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;transition:background .15s,color .15s;flex-shrink:0}.editor-recompile-button:hover{background:var(--recompile-bg-hover)}.editor-recompile-button:active{background:var(--recompile-bg-active)}.editor-recompile-button svg{flex-shrink:0}.editor-content-area{flex:1;overflow:hidden;position:relative;background:var(--code-bg)}.editor-prism-container{height:100%;width:100%}.editor-fallback-textarea{width:100%;height:100%;background:var(--code-bg);color:var(--code-text);border:none;padding:12px;font-family:Monaco,Menlo,Courier New,monospace;font-size:13px;resize:none;outline:none}.editor-image-viewer{display:flex;align-items:center;justify-content:center;height:100%;background:var(--image-viewer-bg);padding:20px}.editor-uniforms-container{height:100%;overflow-y:auto;background:var(--bg-secondary)}.editor-image-viewer img{max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;box-shadow:var(--shadow-sm)}.editor-error-display{background:var(--error-bg);color:var(--error-text);padding:10px 14px;font-family:Monaco,Menlo,Courier New,monospace;font-size:12px;white-space:pre-wrap;overflow:auto;max-height:120px;border-top:1px solid var(--error-border)}.prism-editor-wrapper{display:flex;height:100%;background:var(--code-bg);font-family:Monaco,Menlo,Courier New,monospace;font-size:13px;line-height:1.6}.prism-editor-line-numbers{flex-shrink:0;padding:16px 12px 16px 16px;text-align:right;color:var(--code-line-number);border-right:1px solid var(--code-line-border);-webkit-user-select:none;user-select:none;overflow:hidden}.prism-editor-line-numbers span{display:block}.prism-editor-area{flex:1;position:relative;overflow:hidden}.prism-editor-textarea,.prism-editor-highlight{position:absolute;top:0;left:0;width:100%;height:100%;padding:16px;margin:0;border:none;outline:none;font-family:inherit;font-size:inherit;line-height:inherit;white-space:pre-wrap;word-wrap:break-word;overflow:auto;box-sizing:border-box}.prism-editor-textarea{background:transparent;color:transparent;caret-color:var(--code-text);resize:none;z-index:1;-webkit-text-fill-color:transparent}.prism-editor-textarea::selection{background:var(--code-selection)}.prism-editor-textarea::-moz-selection{background:var(--code-selection)}.prism-editor-highlight{background:var(--code-bg);color:var(--code-text);pointer-events:none;z-index:0}.prism-editor-highlight code{font-family:inherit;font-size:inherit;background:none;padding:0}.prism-editor-highlight .token.comment{color:var(--syntax-comment)}.prism-editor-highlight .token.keyword{color:var(--syntax-keyword)}.prism-editor-highlight .token.string{color:var(--syntax-string)}.prism-editor-highlight .token.number{color:var(--syntax-number)}.prism-editor-highlight .token.operator{color:var(--syntax-operator)}.prism-editor-highlight .token.function{color:var(--syntax-function)}.prism-editor-highlight .token.class-name{color:var(--syntax-class)}.prism-editor-highlight .token.punctuation{color:var(--syntax-punctuation)}')),document.head.appendChild(o)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
function A(i) {
  return "count" in i && typeof i.count == "number";
}
function se(i) {
  return !A(i) && !i.hidden;
}
function Ye(i) {
  return "views" in i && Array.isArray(i.views);
}
function Ce(i) {
  return "views" in i && Array.isArray(i.views);
}
function de(i, e, t) {
  const n = i.createShader(e);
  if (!n)
    throw new Error("Failed to create shader object");
  if (i.shaderSource(n, t), i.compileShader(n), !i.getShaderParameter(n, i.COMPILE_STATUS)) {
    const r = i.getShaderInfoLog(n);
    throw i.deleteShader(n), new Error(`Shader compilation failed:
${r}`);
  }
  return n;
}
function he(i, e, t) {
  const n = de(i, i.VERTEX_SHADER, e), s = de(i, i.FRAGMENT_SHADER, t), r = i.createProgram();
  if (!r)
    throw new Error("Failed to create program object");
  if (i.attachShader(r, n), i.attachShader(r, s), i.linkProgram(r), !i.getProgramParameter(r, i.LINK_STATUS)) {
    const a = i.getProgramInfoLog(r);
    throw i.deleteProgram(r), i.deleteShader(n), i.deleteShader(s), new Error(`Program linking failed:
${a}`);
  }
  return i.detachShader(r, n), i.detachShader(r, s), i.deleteShader(n), i.deleteShader(s), r;
}
function Ke(i) {
  const e = i.createVertexArray();
  if (!e)
    throw new Error("Failed to create VAO");
  i.bindVertexArray(e);
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
  ]), n = i.createBuffer();
  if (!n)
    throw new Error("Failed to create VBO");
  return i.bindBuffer(i.ARRAY_BUFFER, n), i.bufferData(i.ARRAY_BUFFER, t, i.STATIC_DRAW), i.enableVertexAttribArray(0), i.vertexAttribPointer(
    0,
    // attribute location
    2,
    // size (vec2)
    i.FLOAT,
    // type
    !1,
    // normalized
    0,
    // stride
    0
    // offset
  ), i.bindVertexArray(null), i.bindBuffer(i.ARRAY_BUFFER, null), e;
}
function z(i, e, t) {
  const n = i.createTexture();
  if (!n)
    throw new Error("Failed to create texture");
  return i.bindTexture(i.TEXTURE_2D, n), i.texImage2D(
    i.TEXTURE_2D,
    0,
    // mip level
    i.RGBA32F,
    // internal format (32-bit float per channel)
    e,
    t,
    0,
    // border (must be 0)
    i.RGBA,
    // format
    i.FLOAT,
    // type
    null
    // no data (allocate only)
  ), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.bindTexture(i.TEXTURE_2D, null), n;
}
function me(i, e) {
  const t = i.createFramebuffer();
  if (!t)
    throw new Error("Failed to create framebuffer");
  i.bindFramebuffer(i.FRAMEBUFFER, t), i.framebufferTexture2D(
    i.FRAMEBUFFER,
    i.COLOR_ATTACHMENT0,
    i.TEXTURE_2D,
    e,
    0
    // mip level
  );
  const n = i.checkFramebufferStatus(i.FRAMEBUFFER);
  if (n !== i.FRAMEBUFFER_COMPLETE)
    throw i.deleteFramebuffer(t), new Error(`Framebuffer incomplete: ${et(i, n)}`);
  return i.bindFramebuffer(i.FRAMEBUFFER, null), t;
}
function ze(i) {
  const e = i.createTexture();
  if (!e)
    throw new Error("Failed to create black texture");
  i.bindTexture(i.TEXTURE_2D, e);
  const t = new Float32Array([0, 0, 0, 1]);
  return i.texImage2D(i.TEXTURE_2D, 0, i.RGBA32F, 1, 1, 0, i.RGBA, i.FLOAT, t), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.bindTexture(i.TEXTURE_2D, null), e;
}
function Ge(i) {
  const e = i.createTexture();
  if (!e)
    throw new Error("Failed to create keyboard texture");
  i.bindTexture(i.TEXTURE_2D, e);
  const t = 256, n = 3, s = new Float32Array(t * n * 4);
  return i.texImage2D(i.TEXTURE_2D, 0, i.RGBA32F, t, n, 0, i.RGBA, i.FLOAT, s), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.bindTexture(i.TEXTURE_2D, null), e;
}
function We(i, e, t, n) {
  const o = new Float32Array(3072);
  for (let a = 0; a < 256; a++) {
    const c = t.get(a) || !1, l = n.get(a) || 0, u = (0 * 256 + a) * 4;
    o[u + 0] = c ? 1 : 0, o[u + 1] = c ? 1 : 0, o[u + 2] = c ? 1 : 0, o[u + 3] = 1;
    const d = (2 * 256 + a) * 4;
    o[d + 0] = l, o[d + 1] = l, o[d + 2] = l, o[d + 3] = 1;
  }
  i.bindTexture(i.TEXTURE_2D, e), i.texSubImage2D(
    i.TEXTURE_2D,
    0,
    0,
    0,
    // x, y offset
    256,
    3,
    i.RGBA,
    i.FLOAT,
    o
  ), i.bindTexture(i.TEXTURE_2D, null);
}
function qe(i) {
  const e = i.createTexture();
  if (!e)
    throw new Error("Failed to create audio texture");
  i.bindTexture(i.TEXTURE_2D, e);
  const t = 512, n = 2, s = new Uint8Array(t * n);
  return i.texImage2D(i.TEXTURE_2D, 0, i.R8, t, n, 0, i.RED, i.UNSIGNED_BYTE, s), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.bindTexture(i.TEXTURE_2D, null), e;
}
function Ze(i, e, t, n) {
  i.bindTexture(i.TEXTURE_2D, e), i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, 512, 1, i.RED, i.UNSIGNED_BYTE, t), i.texSubImage2D(i.TEXTURE_2D, 0, 0, 1, 512, 1, i.RED, i.UNSIGNED_BYTE, n), i.bindTexture(i.TEXTURE_2D, null);
}
function pe(i) {
  const e = i.createTexture();
  if (!e)
    throw new Error("Failed to create video texture");
  return i.bindTexture(i.TEXTURE_2D, e), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255])), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.bindTexture(i.TEXTURE_2D, null), e;
}
function Je(i, e, t) {
  i.bindTexture(i.TEXTURE_2D, e), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !0), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !1), i.bindTexture(i.TEXTURE_2D, null);
}
function Qe(i, e, t, n, s) {
  const r = e ?? i.createTexture();
  if (!r)
    throw new Error("Failed to create script texture");
  return i.bindTexture(i.TEXTURE_2D, r), s instanceof Float32Array ? i.texImage2D(i.TEXTURE_2D, 0, i.RGBA32F, t, n, 0, i.RGBA, i.FLOAT, s) : i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, t, n, 0, i.RGBA, i.UNSIGNED_BYTE, s), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.NEAREST), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.bindTexture(i.TEXTURE_2D, null), r;
}
function et(i, e) {
  switch (e) {
    case i.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
      return "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
    case i.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
      return "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
    case i.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
      return "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
    case i.FRAMEBUFFER_UNSUPPORTED:
      return "FRAMEBUFFER_UNSUPPORTED";
    case i.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE:
      return "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE";
    default:
      return `Unknown status: ${e}`;
  }
}
const Se = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  mat3: 9,
  mat4: 16
}, re = {
  float: 4,
  // 1 float + 3 padding
  vec2: 4,
  // 2 floats + 2 padding
  vec3: 4,
  // 3 floats + 1 padding
  vec4: 4,
  // 4 floats, naturally aligned
  mat3: 12,
  // 3 columns × 4 floats (vec3 padded to vec4)
  mat4: 16
  // 4 columns × 4 floats, no padding
};
function O(i, e) {
  return Se[i] * e;
}
function tt(i, e) {
  return re[i] * e * 4;
}
function nt(i, e) {
  return re[i] * e;
}
function it(i, e, t, n) {
  const s = Se[i], r = re[i];
  if (s === r)
    return t;
  const o = r * e, a = n && n.length >= o ? n : new Float32Array(o);
  if (i === "mat3")
    for (let c = 0; c < e; c++) {
      const l = c * 9, u = c * 12;
      a[u + 0] = t[l + 0], a[u + 1] = t[l + 1], a[u + 2] = t[l + 2], a[u + 3] = 0, a[u + 4] = t[l + 3], a[u + 5] = t[l + 4], a[u + 6] = t[l + 5], a[u + 7] = 0, a[u + 8] = t[l + 6], a[u + 9] = t[l + 7], a[u + 10] = t[l + 8], a[u + 11] = 0;
    }
  else
    for (let c = 0; c < e; c++) {
      const l = c * s, u = c * 4;
      for (let d = 0; d < s; d++)
        a[u + d] = t[l + d];
      for (let d = s; d < 4; d++)
        a[u + d] = 0;
    }
  return a;
}
const fe = `#version 300 es
precision highp float;

layout(location = 0) in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`, st = `#version 300 es
precision highp float;

// Shadertoy compatibility: equirectangular texture sampling
const float ST_PI = 3.14159265359;
const float ST_TWOPI = 6.28318530718;
vec2 _st_dirToEquirect(vec3 dir) {
  float phi = atan(dir.z, dir.x);
  float theta = asin(dir.y);
  return vec2(phi / ST_TWOPI + 0.5, theta / ST_PI + 0.5);
}
`, rt = `// --- Keyboard helpers (auto-injected) ---
// Letter keys
const int KEY_A = 65; const int KEY_B = 66; const int KEY_C = 67; const int KEY_D = 68;
const int KEY_E = 69; const int KEY_F = 70; const int KEY_G = 71; const int KEY_H = 72;
const int KEY_I = 73; const int KEY_J = 74; const int KEY_K = 75; const int KEY_L = 76;
const int KEY_M = 77; const int KEY_N = 78; const int KEY_O = 79; const int KEY_P = 80;
const int KEY_Q = 81; const int KEY_R = 82; const int KEY_S = 83; const int KEY_T = 84;
const int KEY_U = 85; const int KEY_V = 86; const int KEY_W = 87; const int KEY_X = 88;
const int KEY_Y = 89; const int KEY_Z = 90;

// Digit keys
const int KEY_0 = 48; const int KEY_1 = 49; const int KEY_2 = 50; const int KEY_3 = 51;
const int KEY_4 = 52; const int KEY_5 = 53; const int KEY_6 = 54; const int KEY_7 = 55;
const int KEY_8 = 56; const int KEY_9 = 57;

// Arrow keys
const int KEY_LEFT = 37; const int KEY_UP = 38; const int KEY_RIGHT = 39; const int KEY_DOWN = 40;

// Special keys
const int KEY_SPACE = 32;
const int KEY_ENTER = 13;
const int KEY_TAB = 9;
const int KEY_ESC = 27;
const int KEY_BACKSPACE = 8;
const int KEY_DELETE = 46;
const int KEY_SHIFT = 16;
const int KEY_CTRL = 17;
const int KEY_ALT = 18;

// Function keys
const int KEY_F1 = 112; const int KEY_F2 = 113; const int KEY_F3 = 114; const int KEY_F4 = 115;
const int KEY_F5 = 116; const int KEY_F6 = 117; const int KEY_F7 = 118; const int KEY_F8 = 119;
const int KEY_F9 = 120; const int KEY_F10 = 121; const int KEY_F11 = 122; const int KEY_F12 = 123;

// Returns 1.0 if key is held down, 0.0 otherwise
float keyDown(int key) {
  return textureLod(keyboard, vec2((float(key) + 0.5) / 256.0, 0.25), 0.0).x;
}

// Returns 1.0/0.0, toggling each time the key is pressed
float keyToggle(int key) {
  return textureLod(keyboard, vec2((float(key) + 0.5) / 256.0, 0.75), 0.0).x;
}

// Boolean convenience helpers
bool isKeyDown(int key) { return keyDown(key) > 0.5; }
bool isKeyToggled(int key) { return keyToggle(key) > 0.5; }
`;
function ot(i, e, t) {
  const n = [st];
  if (t.commonSource && (n.push("// Common code"), n.push(t.commonSource), n.push("")), t.namedSamplers && t.namedSamplers.size > 0) {
    if (n.push(`// Core uniforms
uniform vec3  iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform int   iFrame;
uniform vec4  iMouse;
uniform bool  iMousePressed;
uniform vec4  iDate;
uniform float iFrameRate;

// Shader Sandbox touch extensions
uniform int   iTouchCount;
uniform vec4  iTouch0;
uniform vec4  iTouch1;
uniform vec4  iTouch2;
uniform float iPinch;
uniform float iPinchDelta;
uniform vec2  iPinchCenter;
`), t.viewNames && t.viewNames.length > 1) {
      n.push("// Cross-view uniforms (multi-view project)");
      for (const d of t.viewNames)
        n.push(`uniform vec4  iMouse_${d};`), n.push(`uniform vec3  iResolution_${d};`), n.push(`uniform bool  iMousePressed_${d};`);
      n.push("");
    }
    n.push("// Named samplers");
    for (const [d] of t.namedSamplers)
      n.push(`uniform sampler2D ${d};`), n.push(`uniform vec3 ${d}_resolution;`);
    n.push(""), t.namedSamplers.has("keyboard") && (n.push(rt), n.push(""));
  } else if (n.push(`// Shadertoy built-in uniforms
uniform vec3  iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform int   iFrame;
uniform vec4  iMouse;
uniform bool  iMousePressed;
uniform vec4  iDate;
uniform float iFrameRate;
uniform vec3  iChannelResolution[4];
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;

// Shader Sandbox touch extensions (not in Shadertoy)
uniform int   iTouchCount;          // Number of active touches (0-10)
uniform vec4  iTouch0;              // Primary touch: (x, y, startX, startY)
uniform vec4  iTouch1;              // Second touch
uniform vec4  iTouch2;              // Third touch
uniform float iPinch;               // Pinch scale factor (1.0 = no pinch)
uniform float iPinchDelta;          // Pinch change since last frame
uniform vec2  iPinchCenter;         // Center point of pinch gesture
`), t.viewNames && t.viewNames.length > 1) {
    n.push("// Cross-view uniforms (multi-view project)");
    for (const d of t.viewNames)
      n.push(`uniform vec4  iMouse_${d};`), n.push(`uniform vec3  iResolution_${d};`), n.push(`uniform bool  iMousePressed_${d};`);
    n.push("");
  }
  for (const d of t.ubos)
    n.push(`// Array uniform: ${d.name} (max ${d.count})`), n.push(`layout(std140) uniform _ub_${d.name} {`), n.push(`  ${d.def.type} ${d.name}[${d.count}];`), n.push("};"), n.push(`uniform int ${d.name}_count;`), n.push("");
  const s = Object.entries(t.uniforms).filter(([, d]) => !A(d));
  if (s.length > 0) {
    n.push("// Custom uniforms");
    for (const [d, E] of s) {
      const y = E.type === "bool" ? "bool" : E.type;
      n.push(`uniform ${y} ${d};`);
    }
    n.push("");
  }
  const r = at(i, e);
  n.push("// User shader code"), n.push(r), n.push(""), n.push(`// Main wrapper
out vec4 fragColor;

void main() {
  mainImage(fragColor, gl_FragCoord.xy);
}`);
  const o = n.join(`
`), a = o.split(`
`);
  let c = 0, l = 0, u = 0;
  for (let d = 0; d < a.length; d++)
    a[d] === "// Common code" && (c = d + 2, l = t.commonSource ? t.commonSource.split(`
`).length : 0), a[d] === "// User shader code" && (u = d + 2);
  return {
    source: o,
    lineMapping: { commonStartLine: c, commonLines: l, userCodeStartLine: u }
  };
}
function at(i, e) {
  const t = /* @__PURE__ */ new Set();
  if (e.forEach((s, r) => {
    s.kind === "texture" && s.cubemap && t.add(`iChannel${r}`);
  }), t.size === 0)
    return i;
  const n = /texture\s*\(\s*(iChannel[0-3])\s*,\s*([^)]+)\)/g;
  return i.replace(n, (s, r, o) => t.has(r) ? `texture(${r}, _st_dirToEquirect(${o}))` : s);
}
class ct {
  constructor(e, t) {
    this._audioTexture = null, this._needsAudio = !1, this._videoTextures = [];
    const n = this.getAllChannelSources(t);
    n.some((s) => s.kind === "audio") && (this._needsAudio = !0, this._audioTexture = {
      texture: qe(e),
      audioContext: null,
      analyser: null,
      stream: null,
      frequencyData: new Uint8Array(512),
      waveformData: new Uint8Array(512),
      width: 512,
      height: 2,
      initialized: !1
    });
    for (const s of n)
      s.kind === "webcam" ? this._videoTextures.find((o) => o.kind === "webcam") || this._videoTextures.push({
        texture: pe(e),
        video: null,
        stream: null,
        width: 1,
        height: 1,
        ready: !1,
        kind: "webcam"
      }) : s.kind === "video" && (this._videoTextures.find((o) => o.kind === "video" && o.src === s.src) || this._videoTextures.push({
        texture: pe(e),
        video: null,
        stream: null,
        width: 1,
        height: 1,
        ready: !1,
        kind: "video",
        src: s.src
      }));
  }
  // ===========================================================================
  // Accessors
  // ===========================================================================
  get needsAudio() {
    return this._needsAudio;
  }
  get needsWebcam() {
    return this._videoTextures.some((e) => e.kind === "webcam");
  }
  get videoSources() {
    return this._videoTextures.filter((e) => e.kind === "video" && !e.ready && e.src).map((e) => e.src);
  }
  get audioTexture() {
    return this._audioTexture;
  }
  get videoTextures() {
    return this._videoTextures;
  }
  // ===========================================================================
  // Initialization (require user gesture for audio/webcam)
  // ===========================================================================
  async initAudio() {
    if (!(!this._audioTexture || this._audioTexture.initialized))
      try {
        const e = await navigator.mediaDevices.getUserMedia({ audio: !0 }), t = new AudioContext(), n = t.createMediaStreamSource(e), s = t.createAnalyser();
        s.fftSize = 1024, s.smoothingTimeConstant = 0.8, n.connect(s), this._audioTexture.audioContext = t, this._audioTexture.analyser = s, this._audioTexture.stream = e, this._audioTexture.initialized = !0;
      } catch (e) {
        console.warn("Failed to initialize audio input:", e);
      }
  }
  async initWebcam() {
    const e = this._videoTextures.find((t) => t.kind === "webcam" && !t.ready);
    if (e)
      try {
        const t = await navigator.mediaDevices.getUserMedia({ video: !0 }), n = document.createElement("video");
        n.srcObject = t, n.muted = !0, n.playsInline = !0, await n.play(), e.video = n, e.stream = t, e.width = n.videoWidth, e.height = n.videoHeight, n.addEventListener("loadedmetadata", () => {
          e.width = n.videoWidth, e.height = n.videoHeight;
        }), e.ready = !0;
      } catch (t) {
        console.warn("Failed to initialize webcam:", t);
      }
  }
  async initVideo(e) {
    const t = this._videoTextures.find((s) => s.kind === "video" && s.src === e && !s.ready);
    if (!t)
      return;
    const n = document.createElement("video");
    n.src = e, n.muted = !0, n.loop = !0, n.playsInline = !0, n.crossOrigin = "anonymous", n.addEventListener("loadedmetadata", () => {
      t.width = n.videoWidth, t.height = n.videoHeight;
    });
    try {
      await n.play(), t.video = n, t.ready = !0;
    } catch (s) {
      console.warn(`Failed to play video '${e}':`, s);
    }
  }
  // ===========================================================================
  // Per-frame updates
  // ===========================================================================
  updateAudioTexture(e) {
    var t;
    (t = this._audioTexture) != null && t.analyser && (this._audioTexture.analyser.getByteFrequencyData(this._audioTexture.frequencyData), this._audioTexture.analyser.getByteTimeDomainData(this._audioTexture.waveformData), Ze(e, this._audioTexture.texture, this._audioTexture.frequencyData, this._audioTexture.waveformData));
  }
  updateVideoTextures(e) {
    for (const t of this._videoTextures)
      !t.ready || !t.video || t.video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || (Je(e, t.texture, t.video), t.video.videoWidth > 0 && (t.width = t.video.videoWidth, t.height = t.video.videoHeight));
  }
  // ===========================================================================
  // Cleanup
  // ===========================================================================
  dispose(e) {
    var t, n, s, r;
    this._audioTexture && ((t = this._audioTexture.stream) == null || t.getTracks().forEach((o) => o.stop()), (n = this._audioTexture.audioContext) == null || n.close(), e.deleteTexture(this._audioTexture.texture));
    for (const o of this._videoTextures)
      (s = o.stream) == null || s.getTracks().forEach((a) => a.stop()), (r = o.video) == null || r.pause(), e.deleteTexture(o.texture);
    this._audioTexture = null, this._videoTextures = [];
  }
  // ===========================================================================
  // Helpers
  // ===========================================================================
  getAllChannelSources(e) {
    const t = [], n = e.passes;
    for (const s of [n.Image, n.BufferA, n.BufferB, n.BufferC, n.BufferD])
      s && (t.push(...s.channels), s.namedSamplers && t.push(...s.namedSamplers.values()));
    return t;
  }
}
class lt {
  constructor(e) {
    this.values = {}, this.definitions = e, this.initializeDefaults();
  }
  /**
   * Initialize all values to their definition defaults.
   */
  initializeDefaults() {
    for (const [e, t] of Object.entries(this.definitions))
      A(t) ? this.values[e] = new Float32Array(O(t.type, t.count)) : this.values[e] = this.cloneValue(t.value);
  }
  /**
   * Clone a value to avoid mutation of arrays.
   */
  cloneValue(e) {
    return e instanceof Float32Array ? e.slice() : Array.isArray(e) ? [...e] : e;
  }
  /**
   * Get the definition for a uniform.
   */
  getDefinition(e) {
    return this.definitions[e];
  }
  /**
   * Get all definitions.
   */
  getDefinitions() {
    return this.definitions;
  }
  /**
   * Check if a uniform exists.
   */
  has(e) {
    return e in this.definitions;
  }
  /**
   * Get the current value of a uniform.
   */
  get(e) {
    const t = this.values[e];
    return t !== void 0 ? this.cloneValue(t) : void 0;
  }
  /**
   * Get all current values (returns a shallow copy).
   */
  getAll() {
    const e = {};
    for (const [t, n] of Object.entries(this.values))
      e[t] = this.cloneValue(n);
    return e;
  }
  /**
   * Set the value of a uniform.
   * Returns true if the value was set, false if the uniform doesn't exist.
   */
  set(e, t) {
    return this.has(e) ? (this.values[e] = this.cloneValue(t), !0) : !1;
  }
  /**
   * Set multiple values at once.
   */
  setAll(e) {
    for (const [t, n] of Object.entries(e))
      n !== void 0 && this.set(t, n);
  }
  /**
   * Reset a single uniform to its default value.
   */
  reset(e) {
    const t = this.definitions[e];
    return t ? (A(t) ? this.values[e] = new Float32Array(O(t.type, t.count)) : this.values[e] = this.cloneValue(t.value), !0) : !1;
  }
  /**
   * Reset all uniforms to their default values.
   */
  resetAll() {
    this.initializeDefaults();
  }
  /**
   * Get the default value for a uniform.
   */
  getDefault(e) {
    const t = this.definitions[e];
    if (t)
      return A(t) ? new Float32Array(O(t.type, t.count)) : this.cloneValue(t.value);
  }
  /**
   * Iterate over all uniforms (name, definition, current value).
   */
  *entries() {
    for (const [e, t] of Object.entries(this.definitions))
      yield [e, t, this.values[e]];
  }
  /**
   * Get the number of uniforms.
   */
  get size() {
    return Object.keys(this.definitions).length;
  }
  /**
   * Check if there are any uniforms.
   */
  get isEmpty() {
    return this.size === 0;
  }
}
class ut {
  constructor(e, t) {
    this._ubos = [], this._dirtyScalars = /* @__PURE__ */ new Set(), this._uniforms = t, this._store = new lt(t), this.initUBOs(e);
    for (const [n, s] of Object.entries(t))
      A(s) || this._dirtyScalars.add(n);
  }
  // ===========================================================================
  // Accessors
  // ===========================================================================
  /** UBO metadata needed by shaderSource for building declarations */
  get ubos() {
    return this._ubos;
  }
  /** The underlying uniform store */
  get store() {
    return this._store;
  }
  // ===========================================================================
  // Get / Set
  // ===========================================================================
  get(e) {
    return this._store.get(e);
  }
  getAll() {
    return this._store.getAll();
  }
  /**
   * Set the value of a custom uniform.
   * Validates type, packs UBO data for arrays, marks scalars dirty.
   */
  set(e, t) {
    const n = this._uniforms[e];
    if (!n) {
      console.warn(`setUniformValue('${e}'): uniform not defined in config`);
      return;
    }
    if (!A(n)) {
      const s = n.type;
      if ((s === "float" || s === "int") && typeof t != "number") {
        console.warn(`setUniformValue('${e}'): expected number for ${s}, got ${typeof t}`);
        return;
      }
      if (s === "bool" && typeof t != "boolean") {
        console.warn(`setUniformValue('${e}'): expected boolean, got ${typeof t}`);
        return;
      }
      if (s === "vec2" || s === "vec3" || s === "vec4") {
        if (!Array.isArray(t)) {
          console.warn(`setUniformValue('${e}'): expected array for ${s}, got ${typeof t}`);
          return;
        }
        const r = s === "vec2" ? 2 : s === "vec3" ? 3 : 4;
        if (t.length !== r) {
          console.warn(`setUniformValue('${e}'): expected array of length ${r} for ${s}, got ${t.length}`);
          return;
        }
      }
    }
    if (this._store.set(e, t), A(n)) {
      const s = this._ubos.find((r) => r.name === e);
      if (s) {
        const r = t, o = O(n.type, n.count), a = O(n.type, 1);
        if (r.length > o) {
          console.warn(`setUniformValue('${e}'): Float32Array length ${r.length} exceeds max ${o} (${n.count} × ${n.type})`);
          return;
        }
        if (r.length % a !== 0) {
          console.warn(`setUniformValue('${e}'): Float32Array length ${r.length} is not a multiple of ${a} (components per ${n.type})`);
          return;
        }
        const c = r.length / a, l = it(n.type, c, r, s.paddedData);
        l !== s.paddedData && s.paddedData.set(l);
        const u = nt(n.type, c), d = s.paddedData.length;
        u < d && s.paddedData.fill(0, u), s.activeCount = c, s.dirty = !0;
      }
    } else
      this._dirtyScalars.add(e);
  }
  setMultiple(e) {
    for (const [t, n] of Object.entries(e))
      n !== void 0 && this.set(t, n);
  }
  // ===========================================================================
  // GL Binding
  // ===========================================================================
  /**
   * Bind custom uniform values to the current program.
   * Uploads dirty UBOs and re-binds changed scalar uniforms.
   */
  bindToProgram(e, t) {
    for (const n of this._ubos) {
      n.dirty && (e.bindBuffer(e.UNIFORM_BUFFER, n.buffer), e.bufferSubData(e.UNIFORM_BUFFER, 0, n.paddedData), n.dirty = !1);
      const s = t.custom.get(`${n.name}_count`);
      s && e.uniform1i(s, n.activeCount);
    }
    for (const n of this._dirtyScalars) {
      const s = this._uniforms[n];
      if (!s || A(s))
        continue;
      const r = this._store.get(n);
      if (r === void 0)
        continue;
      const o = t.custom.get(n);
      if (o)
        switch (s.type) {
          case "float":
            e.uniform1f(o, r);
            break;
          case "int":
            e.uniform1i(o, r);
            break;
          case "bool":
            e.uniform1i(o, r ? 1 : 0);
            break;
          case "vec2": {
            const a = r;
            e.uniform2f(o, a[0], a[1]);
            break;
          }
          case "vec3": {
            const a = r;
            e.uniform3f(o, a[0], a[1], a[2]);
            break;
          }
          case "vec4": {
            const a = r;
            e.uniform4f(o, a[0], a[1], a[2], a[3]);
            break;
          }
        }
    }
  }
  /** Clear dirty flags after all passes have been bound. */
  clearDirty() {
    this._dirtyScalars.clear();
  }
  /** Mark all scalar uniforms dirty (e.g., after recompilation). */
  markAllScalarsDirty() {
    for (const [e, t] of Object.entries(this._uniforms))
      A(t) || this._dirtyScalars.add(e);
  }
  /**
   * Bind UBO block indices for a newly compiled program.
   * Also caches _count uniform locations.
   */
  bindUBOsToProgram(e, t, n) {
    for (const s of this._ubos) {
      const r = e.getUniformBlockIndex(t, `_ub_${s.name}`);
      r !== e.INVALID_INDEX && e.uniformBlockBinding(t, r, s.bindingPoint), n.set(`${s.name}_count`, e.getUniformLocation(t, `${s.name}_count`));
    }
  }
  // ===========================================================================
  // Cleanup
  // ===========================================================================
  dispose(e) {
    for (const t of this._ubos)
      e.deleteBuffer(t.buffer);
    this._ubos = [];
  }
  // ===========================================================================
  // Initialization
  // ===========================================================================
  initUBOs(e) {
    const t = e.getParameter(e.MAX_UNIFORM_BLOCK_SIZE), n = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
    let s = 0;
    for (const [r, o] of Object.entries(this._uniforms)) {
      if (!A(o))
        continue;
      const a = tt(o.type, o.count);
      if (a > t)
        throw new Error(`Array uniform '${r}' requires ${a} bytes but GL MAX_UNIFORM_BLOCK_SIZE is ${t}`);
      const c = e.createBuffer();
      if (!c)
        throw new Error(`Failed to create UBO buffer for '${r}'`);
      if (e.bindBuffer(e.UNIFORM_BUFFER, c), e.bufferData(e.UNIFORM_BUFFER, a, e.DYNAMIC_DRAW), e.bindBuffer(e.UNIFORM_BUFFER, null), s >= n)
        throw new Error(`Too many array uniforms: binding point ${s} exceeds GL MAX_UNIFORM_BUFFER_BINDINGS (${n})`);
      e.bindBufferBase(e.UNIFORM_BUFFER, s, c);
      const l = new Float32Array(a / 4);
      this._ubos.push({
        name: r,
        def: o,
        buffer: c,
        bindingPoint: s,
        byteSize: a,
        dirty: !1,
        paddedData: l,
        activeCount: 0
      }), s++;
    }
  }
}
class ge {
  constructor(e) {
    this._frame = 0, this._time = 0, this._lastStepTime = null, this._passes = [], this._textures = [], this._keyboardTexture = null, this._blackTexture = null, this._keyStates = /* @__PURE__ */ new Map(), this._toggleStates = /* @__PURE__ */ new Map(), this._compilationErrors = [], this._scriptTextures = /* @__PURE__ */ new Map(), this._sharedVAO = null, this._disposed = !1, this._viewNames = [], this.gl = e.gl, this.project = e.project, this._onAssetError = e.onAssetError, this._width = this.gl.drawingBufferWidth, this._height = this.gl.drawingBufferHeight, this.initExtensions(), this._blackTexture = ze(this.gl);
    const t = Ge(this.gl);
    this._keyboardTexture = {
      texture: t,
      width: 256,
      height: 3
    }, this.initProjectTextures(), this._media = new ct(this.gl, e.project), this._uniformMgr = new ut(this.gl, e.project.uniforms), e.viewNames && e.viewNames.length > 1 && (this._viewNames = e.viewNames), this.initRuntimePasses();
  }
  // ===========================================================================
  // Media Delegates (forwarded to MediaManager)
  // ===========================================================================
  async initAudio() {
    return this._media.initAudio();
  }
  updateAudioTexture() {
    this._media.updateAudioTexture(this.gl);
  }
  async initWebcam() {
    return this._media.initWebcam();
  }
  async initVideo(e) {
    return this._media.initVideo(e);
  }
  updateVideoTextures() {
    this._media.updateVideoTextures(this.gl);
  }
  /** Whether this project uses audio channels. */
  get needsAudio() {
    return this._media.needsAudio;
  }
  /** Whether this project uses webcam channels. */
  get needsWebcam() {
    return this._media.needsWebcam;
  }
  /** Get video sources that need initialization. */
  get videoSources() {
    return this._media.videoSources;
  }
  /**
   * Upload or update a named texture from JavaScript (for script channel).
   */
  updateTexture(e, t, n, s) {
    const r = this._scriptTextures.get(e), o = s instanceof Float32Array;
    if (r && r.width === t && r.height === n && r.isFloat === o) {
      const a = this.gl;
      a.bindTexture(a.TEXTURE_2D, r.texture), o ? a.texSubImage2D(a.TEXTURE_2D, 0, 0, 0, t, n, a.RGBA, a.FLOAT, s) : a.texSubImage2D(a.TEXTURE_2D, 0, 0, 0, t, n, a.RGBA, a.UNSIGNED_BYTE, s), a.bindTexture(a.TEXTURE_2D, null);
    } else {
      const a = Qe(this.gl, (r == null ? void 0 : r.texture) ?? null, t, n, s);
      this._scriptTextures.set(e, { texture: a, width: t, height: n, isFloat: o });
    }
  }
  /**
   * Read pixels from a buffer pass (reads previous frame's data).
   */
  readPixels(e, t, n, s, r) {
    const o = this._passes.find((l) => l.name === e);
    if (!o)
      return console.warn(`readPixels: pass '${e}' not found`), new Uint8Array(s * r * 4);
    const a = this.gl;
    a.bindFramebuffer(a.FRAMEBUFFER, o.framebuffer), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, o.previousTexture, 0);
    const c = new Uint8Array(s * r * 4);
    return a.readPixels(t, n, s, r, a.RGBA, a.UNSIGNED_BYTE, c), a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, o.currentTexture, 0), a.bindFramebuffer(a.FRAMEBUFFER, null), c;
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
  getUniformStore() {
    return this._uniformMgr.store;
  }
  getUniformValue(e) {
    return this._uniformMgr.get(e);
  }
  getUniformValues() {
    return this._uniformMgr.getAll();
  }
  setUniformValue(e, t) {
    this._uniformMgr.set(e, t);
  }
  setUniformValues(e) {
    this._uniformMgr.setMultiple(e);
  }
  /** Export UBO data for HTML export (copies current padded data). */
  getUBOExportData() {
    return this._uniformMgr.ubos.map((e) => ({
      name: e.name,
      type: e.def.type,
      count: e.def.count,
      bindingPoint: e.bindingPoint,
      paddedData: new Float32Array(e.paddedData)
    }));
  }
  /**
   * Get the framebuffer for the Image pass (for presenting to screen).
   */
  getImageFramebuffer() {
    const e = this._passes.find((t) => t.name === "Image");
    return (e == null ? void 0 : e.framebuffer) ?? null;
  }
  /**
   * Bind the Image pass output as the READ_FRAMEBUFFER for blitting to screen.
   *
   * After the ping-pong swap, the rendered output is in previousTexture,
   * but the framebuffer is attached to currentTexture. This method temporarily
   * attaches previousTexture so blitFramebuffer reads the correct data.
   */
  bindImageForRead() {
    const e = this.gl, t = this._passes.find((n) => n.name === "Image");
    return t ? (e.bindFramebuffer(e.READ_FRAMEBUFFER, t.framebuffer), e.framebufferTexture2D(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.previousTexture, 0), !0) : !1;
  }
  /**
   * Restore the Image pass framebuffer to its normal state (attached to currentTexture).
   * Call after blitting to screen.
   */
  unbindImageForRead() {
    const e = this.gl, t = this._passes.find((n) => n.name === "Image");
    t && (e.framebufferTexture2D(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.currentTexture, 0), e.bindFramebuffer(e.READ_FRAMEBUFFER, null));
  }
  /**
   * Run one full frame of all passes.
   *
   * @param timeSeconds - global time in seconds (monotone, from App)
   * @param mouse - iMouse as [x, y, clickX, clickY]
   * @param touch - optional touch state for touch uniforms
   */
  step(e, t, n, s, r) {
    const o = this.gl, a = this._lastStepTime === null ? 0 : e - this._lastStepTime;
    this._lastStepTime = e, this._time = e;
    const c = /* @__PURE__ */ new Date(), l = s ?? {
      count: 0,
      touches: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      pinch: 1,
      pinchDelta: 0,
      pinchCenter: [0, 0]
    }, u = {
      iResolution: [this._width, this._height, 1],
      iTime: this._time,
      iTimeDelta: a,
      iFrame: this._frame,
      iMouse: t,
      iMousePressed: n,
      iDate: [
        c.getFullYear(),
        c.getMonth(),
        // 0-11 (matches Shadertoy)
        c.getDate(),
        // 1-31
        c.getHours() * 3600 + c.getMinutes() * 60 + c.getSeconds() + c.getMilliseconds() / 1e3
      ],
      iFrameRate: a > 0 ? 1 / a : 60,
      iTouchCount: l.count,
      iTouch: l.touches,
      iPinch: l.pinch,
      iPinchDelta: l.pinchDelta,
      iPinchCenter: l.pinchCenter,
      crossViewStates: r
    };
    o.viewport(0, 0, this._width, this._height);
    const d = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"];
    for (const E of d) {
      const y = this._passes.find((b) => b.name === E);
      y && (this.executePass(y, u), this.swapPassTextures(y));
    }
    this._uniformMgr.clearDirty(), this._frame += 1;
  }
  /**
   * Resize all internal render targets to new width/height.
   * Does not reset time or frame count.
   */
  resize(e, t) {
    this._width = e, this._height = t;
    const n = this.gl;
    for (const s of this._passes)
      n.deleteTexture(s.currentTexture), n.deleteTexture(s.previousTexture), n.deleteFramebuffer(s.framebuffer), s.currentTexture = z(n, e, t), s.previousTexture = z(n, e, t), s.framebuffer = me(n, s.currentTexture);
  }
  /**
   * Reset frame counter and clear all render targets.
   * Used for playback controls to restart shader from frame 0.
   */
  reset() {
    this._frame = 0;
    const e = this.gl;
    for (const t of this._passes)
      e.bindFramebuffer(e.FRAMEBUFFER, t.framebuffer), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.previousTexture, 0), e.clear(e.COLOR_BUFFER_BIT), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.currentTexture, 0);
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
    this._keyboardTexture && We(this.gl, this._keyboardTexture.texture, this._keyStates, this._toggleStates);
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
    const r = this.project.passes[e];
    if (!r)
      return { success: !1, error: `Project pass '${e}' not found` };
    const { source: o } = this.buildFragmentShader(t, r.channels, r.namedSamplers);
    try {
      const a = he(n, fe, o);
      return n.deleteProgram(s.uniforms.program), s.uniforms = this.cacheUniformLocations(a, r.namedSamplers), r.glslSource = t, this._compilationErrors = this._compilationErrors.filter((c) => c.passName !== e), this._uniformMgr.markAllScalarsDirty(), { success: !0 };
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
    for (const r of s) {
      const o = this.project.passes[r];
      if (!o)
        continue;
      const a = this.recompilePass(r, o.glslSource);
      a.success || n.push({ passName: r, error: a.error || "Unknown error" });
    }
    if (n.length > 0) {
      this.project.commonSource = t;
      for (const r of s) {
        const o = this.project.passes[r];
        if (!o || n.some((c) => c.passName === r))
          continue;
        const a = this.recompilePass(r, o.glslSource);
        a.success || (console.error(`Failed to revert ${r} to old common source:`, a.error), n.push({ passName: r, error: `Revert failed: ${a.error}` }));
      }
      return { success: !1, errors: n };
    }
    return { success: !0, errors: [] };
  }
  /**
   * Delete all GL resources.
   */
  dispose() {
    this._disposed = !0;
    const e = this.gl;
    for (const t of this._passes)
      e.deleteProgram(t.uniforms.program), e.deleteFramebuffer(t.framebuffer), e.deleteTexture(t.currentTexture), e.deleteTexture(t.previousTexture);
    this._sharedVAO && (e.deleteVertexArray(this._sharedVAO), this._sharedVAO = null);
    for (const t of this._textures)
      e.deleteTexture(t.texture);
    this._keyboardTexture && e.deleteTexture(this._keyboardTexture.texture), this._blackTexture && e.deleteTexture(this._blackTexture);
    for (const [, t] of this._scriptTextures)
      e.deleteTexture(t.texture);
    this._scriptTextures.clear(), this._uniformMgr.dispose(e), this._media.dispose(e), this._passes = [], this._textures = [], this._keyboardTexture = null, this._blackTexture = null;
  }
  // ===========================================================================
  // Initialization Helpers
  // ===========================================================================
  initExtensions() {
    const e = this.gl;
    if (!e.getExtension("EXT_color_buffer_float"))
      throw new Error("EXT_color_buffer_float not supported. WebGL2 with float rendering is required.");
    e.getExtension("OES_texture_float_linear");
  }
  /**
   * Cache uniform locations for a compiled program.
   * Returns a PassUniformLocations object with all standard and custom uniform locations.
   */
  cacheUniformLocations(e, t) {
    const n = this.gl, s = /* @__PURE__ */ new Map();
    for (const [r, o] of Object.entries(this.project.uniforms))
      A(o) || s.set(r, n.getUniformLocation(e, r));
    return this._uniformMgr.bindUBOsToProgram(n, e, s), {
      program: e,
      iResolution: n.getUniformLocation(e, "iResolution"),
      iTime: n.getUniformLocation(e, "iTime"),
      iTimeDelta: n.getUniformLocation(e, "iTimeDelta"),
      iFrame: n.getUniformLocation(e, "iFrame"),
      iMouse: n.getUniformLocation(e, "iMouse"),
      iMousePressed: n.getUniformLocation(e, "iMousePressed"),
      iDate: n.getUniformLocation(e, "iDate"),
      iFrameRate: n.getUniformLocation(e, "iFrameRate"),
      iChannel: [
        n.getUniformLocation(e, "iChannel0"),
        n.getUniformLocation(e, "iChannel1"),
        n.getUniformLocation(e, "iChannel2"),
        n.getUniformLocation(e, "iChannel3")
      ],
      iChannelResolution: [
        n.getUniformLocation(e, "iChannelResolution[0]"),
        n.getUniformLocation(e, "iChannelResolution[1]"),
        n.getUniformLocation(e, "iChannelResolution[2]"),
        n.getUniformLocation(e, "iChannelResolution[3]")
      ],
      // Touch uniforms
      iTouchCount: n.getUniformLocation(e, "iTouchCount"),
      iTouch: [
        n.getUniformLocation(e, "iTouch0"),
        n.getUniformLocation(e, "iTouch1"),
        n.getUniformLocation(e, "iTouch2")
      ],
      iPinch: n.getUniformLocation(e, "iPinch"),
      iPinchDelta: n.getUniformLocation(e, "iPinchDelta"),
      iPinchCenter: n.getUniformLocation(e, "iPinchCenter"),
      custom: s,
      namedSamplers: (() => {
        const r = /* @__PURE__ */ new Map();
        if (t)
          for (const [o] of t)
            r.set(o, n.getUniformLocation(e, o));
        return r;
      })(),
      namedSamplerResolutions: (() => {
        const r = /* @__PURE__ */ new Map();
        if (t)
          for (const [o] of t)
            r.set(o, n.getUniformLocation(e, `${o}_resolution`));
        return r;
      })(),
      // Cross-view uniforms for multi-view projects
      crossViewMouse: (() => {
        const r = /* @__PURE__ */ new Map();
        if (this._viewNames.length > 1)
          for (const o of this._viewNames)
            r.set(o, n.getUniformLocation(e, `iMouse_${o}`));
        return r;
      })(),
      crossViewResolution: (() => {
        const r = /* @__PURE__ */ new Map();
        if (this._viewNames.length > 1)
          for (const o of this._viewNames)
            r.set(o, n.getUniformLocation(e, `iResolution_${o}`));
        return r;
      })(),
      crossViewMousePressed: (() => {
        const r = /* @__PURE__ */ new Map();
        if (this._viewNames.length > 1)
          for (const o of this._viewNames)
            r.set(o, n.getUniformLocation(e, `iMousePressed_${o}`));
        return r;
      })()
    };
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
      const r = new Image();
      r.crossOrigin = "anonymous", r.onload = () => {
        if (this._disposed || e.isContextLost())
          return;
        e.bindTexture(e.TEXTURE_2D, n), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, r), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1);
        const o = t.filter !== "nearest";
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, o ? e.LINEAR : e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, o ? e.LINEAR_MIPMAP_LINEAR : e.NEAREST);
        const a = t.wrap === "clamp" ? e.CLAMP_TO_EDGE : e.REPEAT;
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, a), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, a), o && e.generateMipmap(e.TEXTURE_2D), s.width = r.width, s.height = r.height, console.log(`Loaded texture '${t.name}': ${r.width}x${r.height}`);
      }, r.onerror = () => {
        var o;
        console.error(`Failed to load texture '${t.name}' from ${t.source}`), (o = this._onAssetError) == null || o.call(this, { type: "texture", name: t.name, detail: t.source });
      }, r.src = t.source;
    }
  }
  /**
   * Compile shaders, create VAOs/FBOs/textures, and build RuntimePass array.
   */
  initRuntimePasses() {
    const e = this.gl, t = this.project, n = Ke(e);
    this._sharedVAO = n;
    const s = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"];
    for (const r of s) {
      const o = t.passes[r];
      if (!o)
        continue;
      const { source: a, lineMapping: c } = this.buildFragmentShader(o.glslSource, o.channels, o.namedSamplers);
      try {
        const l = he(e, fe, a), u = this.cacheUniformLocations(l, o.namedSamplers), d = z(e, this._width, this._height), E = z(e, this._width, this._height), y = me(e, d), b = {
          name: r,
          projectChannels: o.channels,
          vao: n,
          uniforms: u,
          framebuffer: y,
          currentTexture: d,
          previousTexture: E,
          namedSamplers: o.namedSamplers
        };
        this._passes.push(b);
      } catch (l) {
        const u = l instanceof Error ? l.message : String(l), d = u.match(/ERROR:\s*\d+:(\d+):/);
        let E = !1, y = null;
        if (d) {
          const b = parseInt(d[1], 10);
          if (c.commonStartLine > 0 && c.commonLines > 0) {
            const T = c.commonStartLine + c.commonLines - 1;
            b >= c.commonStartLine && b <= T && (E = !0, y = b - c.commonStartLine + 1);
          }
          !E && c.userCodeStartLine > 0 && b >= c.userCodeStartLine && (y = b - c.userCodeStartLine + 1);
        }
        this._compilationErrors.push({
          passName: r,
          error: u,
          source: a,
          isFromCommon: E,
          originalLine: y,
          lineMapping: c
        }), console.error(`Failed to compile ${r}:`, u);
      }
    }
  }
  /**
   * Build complete fragment shader source with Shadertoy boilerplate.
   */
  buildFragmentShader(e, t, n) {
    return ot(e, t, {
      commonSource: this.project.commonSource ?? "",
      ubos: this._uniformMgr.ubos.map((s) => ({ name: s.name, def: s.def, count: s.def.count })),
      uniforms: this.project.uniforms,
      namedSamplers: n,
      viewNames: this._viewNames.length > 1 ? this._viewNames : void 0
    });
  }
  /**
   * Set view names for multi-view projects.
   * This enables cross-view uniforms (iMouse_viewName, iResolution_viewName, etc.)
   * Must be called before shader compilation.
   */
  setViewNames(e) {
    this._viewNames = e;
  }
  // ===========================================================================
  // Pass Execution
  // ===========================================================================
  executePass(e, t) {
    const n = this.gl;
    n.bindFramebuffer(n.FRAMEBUFFER, e.framebuffer), n.useProgram(e.uniforms.program), n.bindVertexArray(e.vao), this.bindBuiltinUniforms(e.uniforms, t), this._uniformMgr.bindToProgram(n, e.uniforms), e.namedSamplers && e.namedSamplers.size > 0 ? this.bindNamedSamplers(e) : this.bindChannelTextures(e), n.drawArrays(n.TRIANGLES, 0, 3), n.bindVertexArray(null), n.useProgram(null), n.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  bindBuiltinUniforms(e, t) {
    const n = this.gl;
    e.iResolution && n.uniform3f(e.iResolution, t.iResolution[0], t.iResolution[1], t.iResolution[2]), e.iTime && n.uniform1f(e.iTime, t.iTime), e.iTimeDelta && n.uniform1f(e.iTimeDelta, t.iTimeDelta), e.iFrame && n.uniform1i(e.iFrame, t.iFrame), e.iMouse && n.uniform4f(e.iMouse, t.iMouse[0], t.iMouse[1], t.iMouse[2], t.iMouse[3]), e.iMousePressed && n.uniform1i(e.iMousePressed, t.iMousePressed ? 1 : 0), e.iDate && n.uniform4f(e.iDate, t.iDate[0], t.iDate[1], t.iDate[2], t.iDate[3]), e.iFrameRate && n.uniform1f(e.iFrameRate, t.iFrameRate), e.iTouchCount && n.uniform1i(e.iTouchCount, t.iTouchCount);
    for (let s = 0; s < 3; s++) {
      const r = e.iTouch[s];
      if (r) {
        const o = t.iTouch[s];
        n.uniform4f(r, o[0], o[1], o[2], o[3]);
      }
    }
    if (e.iPinch && n.uniform1f(e.iPinch, t.iPinch), e.iPinchDelta && n.uniform1f(e.iPinchDelta, t.iPinchDelta), e.iPinchCenter && n.uniform2f(e.iPinchCenter, t.iPinchCenter[0], t.iPinchCenter[1]), t.crossViewStates)
      for (const [s, r] of t.crossViewStates) {
        const o = e.crossViewMouse.get(s);
        o && n.uniform4f(o, r.mouse[0], r.mouse[1], r.mouse[2], r.mouse[3]);
        const a = e.crossViewResolution.get(s);
        a && n.uniform3f(a, r.resolution[0], r.resolution[1], r.resolution[2]);
        const c = e.crossViewMousePressed.get(s);
        c && n.uniform1i(c, r.mousePressed ? 1 : 0);
      }
  }
  bindChannelTextures(e) {
    const t = this.gl;
    for (let n = 0; n < 4; n++) {
      const s = e.projectChannels[n], r = this.resolveChannelTexture(s), o = this.resolveChannelResolution(s);
      t.activeTexture(t.TEXTURE0 + n), t.bindTexture(t.TEXTURE_2D, r);
      const a = e.uniforms.iChannel[n];
      a && t.uniform1i(a, n);
      const c = e.uniforms.iChannelResolution[n];
      c && t.uniform3f(c, o[0], o[1], 1);
    }
  }
  /**
   * Bind named samplers (standard mode).
   * Each named sampler gets its own texture unit.
   */
  bindNamedSamplers(e) {
    const t = this.gl;
    let n = 0;
    for (const [s, r] of e.namedSamplers) {
      const o = this.resolveChannelTexture(r), a = this.resolveChannelResolution(r);
      t.activeTexture(t.TEXTURE0 + n), t.bindTexture(t.TEXTURE_2D, o);
      const c = e.uniforms.namedSamplers.get(s);
      c && t.uniform1i(c, n);
      const l = e.uniforms.namedSamplerResolutions.get(s);
      l && t.uniform3f(l, a[0], a[1], 1), n++;
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
        const t = this._passes.find((n) => n.name === e.buffer);
        return t ? e.current ? t.currentTexture : t.previousTexture : (console.warn(`resolveChannelTexture: buffer '${e.buffer}' not found, using black`), this._blackTexture);
      }
      case "texture": {
        const t = this._textures.find((n) => n.name === e.name);
        return t ? t.texture : (console.warn(`resolveChannelTexture: texture '${e.name}' not found, using black`), this._blackTexture);
      }
      case "keyboard":
        if (!this._keyboardTexture)
          throw new Error("Internal error: keyboard texture not initialized");
        return this._keyboardTexture.texture;
      case "audio":
        return this._media.audioTexture ? this._media.audioTexture.texture : this._blackTexture;
      case "webcam": {
        const t = this._media.videoTextures.find((n) => n.kind === "webcam");
        return (t == null ? void 0 : t.texture) ?? this._blackTexture;
      }
      case "video": {
        const t = this._media.videoTextures.find((n) => n.kind === "video" && n.src === e.src);
        return (t == null ? void 0 : t.texture) ?? this._blackTexture;
      }
      case "script": {
        const t = this._scriptTextures.get(e.name);
        return (t == null ? void 0 : t.texture) ?? this._blackTexture;
      }
    }
  }
  /**
   * Resolve a ChannelSource to its resolution [width, height].
   * Returns [0, 0] for unused channels.
   */
  resolveChannelResolution(e) {
    switch (e.kind) {
      case "none":
        return [0, 0];
      case "buffer":
        return [this._width, this._height];
      case "texture": {
        const t = this._textures.find((n) => n.name === e.name);
        return t ? [t.width, t.height] : [0, 0];
      }
      case "keyboard":
        return [256, 3];
      case "audio":
        return this._media.audioTexture ? [this._media.audioTexture.width, this._media.audioTexture.height] : [0, 0];
      case "webcam": {
        const t = this._media.videoTextures.find((n) => n.kind === "webcam");
        return t ? [t.width, t.height] : [0, 0];
      }
      case "video": {
        const t = this._media.videoTextures.find((n) => n.kind === "video" && n.src === e.src);
        return t ? [t.width, t.height] : [0, 0];
      }
      case "script": {
        const t = this._scriptTextures.get(e.name);
        return t ? [t.width, t.height] : [0, 0];
      }
    }
  }
  /**
   * Swap current and previous textures for a pass (ping-pong).
   * Also reattach framebuffer to new current texture.
   */
  swapPassTextures(e) {
    const t = this.gl, n = e.currentTexture;
    e.currentTexture = e.previousTexture, e.previousTexture = n, t.bindFramebuffer(t.FRAMEBUFFER, e.framebuffer), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, e.currentTexture, 0), t.bindFramebuffer(t.FRAMEBUFFER, null);
  }
}
class dt {
  constructor(e) {
    this.overlay = null, this.container = e;
  }
  /**
   * Display shader compilation errors in an overlay.
   */
  show(e, t) {
    this.overlay || (this.overlay = document.createElement("div"), this.overlay.className = "shader-error-overlay", this.container.appendChild(this.overlay));
    const n = e.filter((u) => u.isFromCommon), s = e.filter((u) => !u.isFromCommon), c = [...n.length > 0 ? [n[0]] : [], ...s].map(({ passName: u, error: d, isFromCommon: E, originalLine: y, lineMapping: b }) => {
      const T = d.replace(`Shader compilation failed:
`, ""), w = y;
      let _ = T;
      w !== null && (_ = T.replace(/ERROR:\s*\d+:(\d+):/g, `ERROR: 0:${w}:`));
      let m = null;
      if (E)
        m = t.commonSource;
      else {
        const h = t.passes[u];
        m = (h == null ? void 0 : h.glslSource) ?? null;
      }
      return {
        passName: E ? "common.glsl" : u,
        error: ht(_, b, E),
        codeContext: w !== null && m ? pt(m, w) : null
      };
    }).map(({ passName: u, error: d, codeContext: E }) => `
      <div class="error-section">
        <div class="error-pass-name">${u}</div>
        <pre class="error-content">${Fe(d)}</pre>
        ${E ? `<pre class="error-code-context">${E}</pre>` : ""}
      </div>
    `).join("");
    this.overlay.innerHTML = `
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
    const l = this.overlay.querySelector(".error-close");
    l && l.addEventListener("click", () => this.hide());
  }
  /**
   * Hide the error overlay.
   */
  hide() {
    this.overlay && (this.overlay.remove(), this.overlay = null);
  }
  /**
   * Clean up resources.
   */
  dispose() {
    this.hide();
  }
}
function ht(i, e, t) {
  return i.split(`
`).map((n) => {
    const s = n.match(/^ERROR:\s*(\d+):(\d+):\s*(.+)$/);
    if (s) {
      const [, , r, o] = s, a = parseInt(r, 10);
      let c = a;
      return t && e.commonStartLine > 0 ? c = a - e.commonStartLine + 1 : e.userCodeStartLine > 0 && a >= e.userCodeStartLine && (c = a - e.userCodeStartLine + 1), `Line ${c}: ${mt(o)}`;
    }
    return n;
  }).join(`
`);
}
function mt(i) {
  return i.includes("no matching overloaded function found") ? i + " (check function name spelling and argument types)" : i.includes("undeclared identifier") ? i + " (variable not declared — check spelling)" : i.includes("syntax error") ? i + " (check for missing semicolons, brackets, or commas)" : i.includes("is not a function") ? i + " (identifier exists but is not callable)" : i.includes("wrong operand types") ? i + " (type mismatch — check vec/float/int types)" : i;
}
function pt(i, e) {
  const t = i.split(`
`);
  if (e < 1 || e > t.length)
    return null;
  const n = 3, s = Math.max(0, e - n - 1), r = Math.min(t.length, e + n);
  return t.slice(s, r).map((a, c) => {
    const l = s + c + 1, u = l === e, d = String(l).padStart(4, " "), E = Fe(a);
    return u ? `<span class="error-line-highlight">${d} │ ${E}</span>` : `<span class="context-line">${d} │ ${E}</span>`;
  }).join("");
}
function Fe(i) {
  const e = document.createElement("div");
  return e.textContent = i, e.innerHTML;
}
class H {
  constructor(e) {
    this.overlay = null, this.autoHideTimer = null, this.container = e;
  }
  /**
   * Show an error from setup() or onFrame().
   */
  showError(e, t) {
    this.clearAutoHide(), this.ensureOverlay();
    const n = t instanceof Error ? t.message : String(t), s = t instanceof Error && t.stack ? t.stack.split(`
`).slice(1, 4).join(`
`) : "";
    this.overlay.innerHTML = `
      <div class="script-error-content">
        <div class="script-error-header">
          <span class="script-error-title">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="vertical-align: text-bottom;">
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm9 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.25-6.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5z"/>
            </svg>
            script.js ${e}() error
          </span>
          <button class="script-error-close" title="Dismiss">×</button>
        </div>
        <pre class="script-error-message">${G(n)}</pre>
        ${s ? `<pre class="script-error-stack">${G(s)}</pre>` : ""}
      </div>
    `, this.wireClose(), this.autoHideTimer = setTimeout(() => this.hide(), H.AUTO_HIDE_MS);
  }
  /**
   * Show a persistent warning when onFrame() has been disabled.
   */
  showDisabled() {
    this.clearAutoHide(), this.ensureOverlay(), this.overlay.innerHTML = `
      <div class="script-error-content">
        <div class="script-error-header disabled">
          <span class="script-error-title">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="vertical-align: text-bottom;">
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm9 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.25-6.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5z"/>
            </svg>
            script.js onFrame() disabled
          </span>
          <button class="script-error-close" title="Dismiss">×</button>
        </div>
        <pre class="script-error-message">Too many consecutive errors. Reload to retry.</pre>
      </div>
    `, this.wireClose();
  }
  /**
   * Show a warning banner for asset load errors (textures, framebuffers).
   */
  showWarning(e, t) {
    this.clearAutoHide(), this.ensureOverlay(), this.overlay.innerHTML = `
      <div class="script-error-content">
        <div class="script-error-header warning">
          <span class="script-error-title">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="vertical-align: text-bottom;">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            ${G(e)}
          </span>
          <button class="script-error-close" title="Dismiss">×</button>
        </div>
        <pre class="script-error-message">${G(t)}</pre>
      </div>
    `, this.wireClose(), this.autoHideTimer = setTimeout(() => this.hide(), H.AUTO_HIDE_MS);
  }
  /**
   * Hide the overlay.
   */
  hide() {
    this.clearAutoHide(), this.overlay && (this.overlay.remove(), this.overlay = null);
  }
  /**
   * Clean up resources.
   */
  dispose() {
    this.hide();
  }
  ensureOverlay() {
    this.overlay || (this.overlay = document.createElement("div"), this.overlay.className = "script-error-overlay", this.container.appendChild(this.overlay));
  }
  wireClose() {
    var t;
    const e = (t = this.overlay) == null ? void 0 : t.querySelector(".script-error-close");
    e && e.addEventListener("click", () => this.hide());
  }
  clearAutoHide() {
    this.autoHideTimer !== null && (clearTimeout(this.autoHideTimer), this.autoHideTimer = null);
  }
}
H.AUTO_HIDE_MS = 5e3;
function G(i) {
  const e = document.createElement("div");
  return e.textContent = i, e.innerHTML;
}
const V = {};
for (let i = 0; i < 26; i++)
  V[`Key${String.fromCharCode(65 + i)}`] = 65 + i;
for (let i = 0; i < 10; i++)
  V[`Digit${i}`] = 48 + i;
for (let i = 1; i <= 12; i++)
  V[`F${i}`] = 111 + i;
Object.assign(V, {
  Backspace: 8,
  Tab: 9,
  Enter: 13,
  ShiftLeft: 16,
  ShiftRight: 16,
  ControlLeft: 17,
  ControlRight: 17,
  AltLeft: 18,
  AltRight: 18,
  Pause: 19,
  CapsLock: 20,
  Escape: 27,
  Space: 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  Insert: 45,
  Delete: 46,
  NumLock: 144,
  ScrollLock: 145,
  Semicolon: 186,
  Equal: 187,
  Comma: 188,
  Minus: 189,
  Period: 190,
  Slash: 191,
  Backquote: 192,
  BracketLeft: 219,
  Backslash: 220,
  BracketRight: 221,
  Quote: 222
});
function Ee(i) {
  const e = V[i.code];
  return e !== void 0 && e >= 0 && e < 256 ? e : null;
}
class ft {
  constructor(e, t) {
    this.mouse = [0, 0, 0, 0], this.isMouseDown = !1, this.touchState = {
      count: 0,
      touches: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      pinch: 1,
      pinchDelta: 0,
      pinchCenter: [0, 0]
    }, this.onFirstGesture = null, this.activePointers = /* @__PURE__ */ new Map(), this.gestureTriggered = !1, this.keyEvents = [], this.canvasListeners = [], this.canvas = e, this.pixelRatio = t, this.setupMouseTracking(), this.setupTouchTracking(), this.keydownHandler = (n) => {
      const s = Ee(n);
      s !== null && this.keyEvents.push({ keycode: s, down: !0 });
    }, this.keyupHandler = (n) => {
      const s = Ee(n);
      s !== null && this.keyEvents.push({ keycode: s, down: !1 });
    }, document.addEventListener("keydown", this.keydownHandler), document.addEventListener("keyup", this.keyupHandler);
  }
  /**
   * Drain and return accumulated key events since last call.
   */
  getAndClearKeyEvents() {
    const e = this.keyEvents;
    return this.keyEvents = [], e;
  }
  /**
   * Clean up all event listeners.
   */
  dispose() {
    document.removeEventListener("keydown", this.keydownHandler), document.removeEventListener("keyup", this.keyupHandler);
    for (const { event: e, handler: t } of this.canvasListeners)
      this.canvas.removeEventListener(e, t);
    this.canvasListeners = [];
  }
  triggerGesture() {
    var e;
    this.gestureTriggered || (this.gestureTriggered = !0, (e = this.onFirstGesture) == null || e.call(this));
  }
  setupMouseTracking() {
    const e = (r) => {
      const o = this.canvas.getBoundingClientRect(), a = (r.clientX - o.left) * this.pixelRatio, c = (o.height - (r.clientY - o.top)) * this.pixelRatio;
      return [a, c];
    }, t = (r) => {
      const [o, a] = e(r);
      this.isMouseDown = !0, this.mouse[0] = o, this.mouse[1] = a, this.mouse[2] = o, this.mouse[3] = a, this.triggerGesture();
    }, n = (r) => {
      if (!this.isMouseDown)
        return;
      const [o, a] = e(r);
      this.mouse[0] = o, this.mouse[1] = a;
    }, s = () => {
      this.isMouseDown = !1, this.mouse[2] = -Math.abs(this.mouse[2]), this.mouse[3] = -Math.abs(this.mouse[3]);
    };
    this.canvas.addEventListener("mousedown", t), this.canvas.addEventListener("mousemove", n), this.canvas.addEventListener("mouseup", s), this.canvasListeners.push({ event: "mousedown", handler: t }, { event: "mousemove", handler: n }, { event: "mouseup", handler: s });
  }
  setupTouchTracking() {
    this.canvas.style.touchAction = "pan-y";
    const e = (o, a) => {
      const c = this.canvas.getBoundingClientRect(), l = (o - c.left) * this.pixelRatio, u = (c.height - (a - c.top)) * this.pixelRatio;
      return [l, u];
    }, t = (o) => {
      if (o.pointerType === "mouse")
        return;
      const [a, c] = e(o.clientX, o.clientY);
      this.activePointers.set(o.pointerId, {
        id: o.pointerId,
        x: a,
        y: c,
        startX: a,
        startY: c
      }), this.canvas.setPointerCapture(o.pointerId), this.updateTouchState(), this.activePointers.size === 1 && (this.isMouseDown = !0, this.mouse[0] = a, this.mouse[1] = c, this.mouse[2] = a, this.mouse[3] = c);
    }, n = (o) => {
      if (o.pointerType === "mouse")
        return;
      const a = this.activePointers.get(o.pointerId);
      if (!a)
        return;
      const [c, l] = e(o.clientX, o.clientY);
      a.x = c, a.y = l, this.updateTouchState(), this.activePointers.size === 1 && (this.mouse[0] = c, this.mouse[1] = l), o.preventDefault();
    }, s = (o) => {
      o.pointerType !== "mouse" && (this.activePointers.delete(o.pointerId), this.canvas.releasePointerCapture(o.pointerId), this.activePointers.size === 0 && (this.isMouseDown = !1, this.mouse[2] = -Math.abs(this.mouse[2]), this.mouse[3] = -Math.abs(this.mouse[3])), this.updateTouchState());
    }, r = (o) => {
      s(o);
    };
    this.canvas.addEventListener("pointerdown", t), this.canvas.addEventListener("pointermove", n), this.canvas.addEventListener("pointerup", s), this.canvas.addEventListener("pointercancel", r), this.canvasListeners.push({ event: "pointerdown", handler: t }, { event: "pointermove", handler: n }, { event: "pointerup", handler: s }, { event: "pointercancel", handler: r });
  }
  updateTouchState() {
    const e = Array.from(this.activePointers.values()), t = e.length;
    this.touchState.count = t;
    for (let n = 0; n < 3; n++)
      if (n < e.length) {
        const s = e[n];
        this.touchState.touches[n] = [s.x, s.y, s.startX, s.startY];
      } else
        this.touchState.touches[n] = [0, 0, 0, 0];
    if (t >= 2) {
      const n = e[0], s = e[1], r = s.x - n.x, o = s.y - n.y, a = Math.sqrt(r * r + o * o), c = s.startX - n.startX, l = s.startY - n.startY, u = Math.sqrt(c * c + l * l);
      if (u > 0) {
        const d = a / u;
        this.touchState.pinchDelta = d - this.touchState.pinch, this.touchState.pinch = d;
      }
      this.touchState.pinchCenter = [
        (n.x + s.x) / 2,
        (n.y + s.y) / 2
      ];
    } else
      this.touchState.pinchDelta = 0, t === 0 && (this.touchState.pinch = 1, this.touchState.pinchCenter = [0, 0]);
  }
}
class ve {
  get engine() {
    return this._engine;
  }
  get isContextLost() {
    return this._isContextLost;
  }
  constructor(e) {
    this._resizeDebounceTimer = null, this._contextLostOverlay = null, this._isContextLost = !1, this._mediaBanner = null, this._mediaInitialized = !1, this._overlays = /* @__PURE__ */ new Map(), this.onResize = null, this.onContextRestored = null, this.container = e.container, this._project = e.project, this._pixelRatio = e.pixelRatio, this._viewNames = e.viewNames, this.canvas = document.createElement("canvas"), this.canvas.style.width = "100%", this.canvas.style.height = "100%", this.canvas.style.display = "block", this.container.appendChild(this.canvas), this.errorOverlay = new dt(this.container), this.runtimeErrorOverlay = new H(this.container);
    const t = this.canvas.getContext("webgl2", {
      alpha: !1,
      antialias: !1,
      depth: !1,
      stencil: !1,
      preserveDrawingBuffer: !0,
      powerPreference: "high-performance"
    });
    if (!t)
      throw new Error("WebGL2 not supported");
    this.gl = t, this.setupContextLossHandling(), this.updateCanvasSize(), this._engine = new ge({
      gl: this.gl,
      project: e.project,
      viewNames: e.viewNames,
      onAssetError: (n) => {
        const s = n.type === "texture" ? `Texture '${n.name}' failed to load` : `Framebuffer '${n.name}' error`;
        this.runtimeErrorOverlay.showWarning(s, n.detail);
      }
    }), this._engine.hasErrors() && this.errorOverlay.show(this._engine.getCompilationErrors(), this._project), (this._engine.needsAudio || this._engine.needsWebcam) && this.showMediaBanner(), this._resizeObserver = new ResizeObserver(() => {
      this.updateCanvasSize(), this._resizeDebounceTimer !== null && clearTimeout(this._resizeDebounceTimer), this._resizeDebounceTimer = setTimeout(() => {
        var n;
        this._resizeDebounceTimer = null, this._engine.resize(this.canvas.width, this.canvas.height), this._engine.reset(), (n = this.onResize) == null || n.call(this, this.canvas.width, this.canvas.height);
      }, 150);
    }), this._resizeObserver.observe(this.container), this.input = new ft(this.canvas, this._pixelRatio), this.input.onFirstGesture = () => this.initMediaOnGesture(), this.initVideoFiles();
  }
  // ===========================================================================
  // Per-Frame Rendering
  // ===========================================================================
  /**
   * Step this view for one frame: forward input, run engine, blit to screen.
   */
  step(e, t) {
    if (!this._isContextLost) {
      for (const n of this.input.getAndClearKeyEvents())
        this._engine.updateKeyState(n.keycode, n.down);
      this._engine.updateKeyboardTexture(), this._engine.updateAudioTexture(), this._engine.updateVideoTextures(), this._engine.step(e, this.input.mouse, this.input.isMouseDown, {
        count: this.input.touchState.count,
        touches: this.input.touchState.touches,
        pinch: this.input.touchState.pinch,
        pinchDelta: this.input.touchState.pinchDelta,
        pinchCenter: this.input.touchState.pinchCenter
      }, t), this.input.touchState.pinchDelta = 0, this.presentToScreen();
    }
  }
  /**
   * Blit engine Image pass output to the canvas.
   */
  presentToScreen() {
    const e = this.gl;
    this._engine.bindImageForRead() && (e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.blitFramebuffer(0, 0, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height, e.COLOR_BUFFER_BIT, e.NEAREST), this._engine.unbindImageForRead());
  }
  // ===========================================================================
  // Cross-View State Getters
  // ===========================================================================
  getMouseState() {
    return [...this.input.mouse];
  }
  getResolution() {
    return [this.canvas.width, this.canvas.height, 1];
  }
  getMousePressed() {
    return this.input.isMouseDown;
  }
  hasErrors() {
    return this._engine.hasErrors();
  }
  // ===========================================================================
  // Script Info Overlays
  // ===========================================================================
  setOverlay(e, t) {
    let n = this._overlays.get(e);
    if (t === null) {
      n && n.classList.add("hidden");
      return;
    }
    n || (n = document.createElement("div"), n.className = `script-overlay ${e}`, this.container.appendChild(n), this._overlays.set(e, n)), n.textContent = t, n.classList.remove("hidden");
  }
  // ===========================================================================
  // Lifecycle
  // ===========================================================================
  dispose() {
    this.input.dispose(), this._resizeObserver.disconnect(), this._resizeDebounceTimer !== null && clearTimeout(this._resizeDebounceTimer), this._engine.dispose(), this.errorOverlay.hide(), this.runtimeErrorOverlay.dispose(), this.hideMediaBanner(), this.hideContextLostOverlay();
    for (const e of this._overlays.values())
      e.remove();
    this._overlays.clear(), this.container.removeChild(this.canvas);
  }
  // ===========================================================================
  // Canvas Sizing
  // ===========================================================================
  updateCanvasSize() {
    const e = this.container.getBoundingClientRect(), t = Math.floor(e.width * this._pixelRatio), n = Math.floor(e.height * this._pixelRatio);
    (this.canvas.width !== t || this.canvas.height !== n) && (this.canvas.width = t, this.canvas.height = n);
  }
  // ===========================================================================
  // Context Loss Handling
  // ===========================================================================
  setupContextLossHandling() {
    this.canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault(), this.handleContextLost();
    }), this.canvas.addEventListener("webglcontextrestored", () => {
      this.handleContextRestored();
    });
  }
  handleContextLost() {
    this._isContextLost = !0, this.showContextLostOverlay(), console.warn("WebGL context lost. Waiting for restoration...");
  }
  handleContextRestored() {
    var e;
    console.log("WebGL context restored. Reinitializing...");
    try {
      this._engine.dispose(), this._engine = new ge({
        gl: this.gl,
        project: this._project,
        viewNames: this._viewNames,
        onAssetError: (t) => {
          const n = t.type === "texture" ? `Texture '${t.name}' failed to load` : `Framebuffer '${t.name}' error`;
          this.runtimeErrorOverlay.showWarning(n, t.detail);
        }
      }), this._engine.hasErrors() && this.errorOverlay.show(this._engine.getCompilationErrors(), this._project), this._engine.resize(this.canvas.width, this.canvas.height), this.hideContextLostOverlay(), this._isContextLost = !1, (e = this.onContextRestored) == null || e.call(this), console.log("WebGL context successfully restored");
    } catch (t) {
      console.error("Failed to restore WebGL context:", t), this.showContextLostOverlay(!0);
    }
  }
  showContextLostOverlay(e = !1) {
    this._contextLostOverlay || (this._contextLostOverlay = document.createElement("div"), this._contextLostOverlay.className = "context-lost-overlay", this.container.appendChild(this._contextLostOverlay)), e ? this._contextLostOverlay.innerHTML = `
        <div class="context-lost-content">
          <div class="context-lost-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="context-lost-title">WebGL Context Lost</div>
          <div class="context-lost-message">Unable to restore automatically.</div>
          <button class="context-lost-reload" onclick="location.reload()">Reload Page</button>
        </div>
      ` : this._contextLostOverlay.innerHTML = `
        <div class="context-lost-content">
          <div class="context-lost-spinner"></div>
          <div class="context-lost-title">WebGL Context Lost</div>
          <div class="context-lost-message">Attempting to restore...</div>
        </div>
      `;
  }
  hideContextLostOverlay() {
    this._contextLostOverlay && (this._contextLostOverlay.remove(), this._contextLostOverlay = null);
  }
  // ===========================================================================
  // Media Initialization
  // ===========================================================================
  initMediaOnGesture() {
    this._mediaInitialized || (this._mediaInitialized = !0, this.hideMediaBanner(), this._engine.needsAudio && this._engine.initAudio(), this._engine.needsWebcam && this._engine.initWebcam());
  }
  initVideoFiles() {
    for (const e of this._engine.videoSources)
      this._engine.initVideo(e);
  }
  showMediaBanner() {
    this._mediaBanner = document.createElement("div"), this._mediaBanner.className = "media-permission-banner";
    const e = [];
    this._engine.needsAudio && e.push("microphone"), this._engine.needsWebcam && e.push("webcam"), this._mediaBanner.innerHTML = `
      <span class="media-banner-text">This shader uses ${e.join(" and ")}</span>
      <button class="media-banner-button">Click to enable</button>
    `, this._mediaBanner.querySelector(".media-banner-button").addEventListener("click", () => {
      this.initMediaOnGesture();
    }), this.container.appendChild(this._mediaBanner);
  }
  hideMediaBanner() {
    this._mediaBanner && (this._mediaBanner.remove(), this._mediaBanner = null);
  }
}
class Ae {
  constructor(e) {
    var t;
    this.values = {}, this.updaters = /* @__PURE__ */ new Map(), this.documentListeners = [], this.container = e.container, this.uniforms = e.uniforms, this.onChange = e.onChange;
    for (const [n, s] of Object.entries(this.uniforms))
      A(s) || s.hidden || (this.values[n] = ((t = e.initialValues) == null ? void 0 : t[n]) ?? s.value);
    this.render();
  }
  /**
   * Render all uniform controls.
   */
  render() {
    this.container.innerHTML = "", this.container.className = "uniform-controls";
    const e = Object.entries(this.uniforms);
    if (e.length === 0) {
      const r = document.createElement("div");
      r.className = "uniform-controls-empty", r.textContent = "No uniforms defined", this.container.appendChild(r);
      return;
    }
    const t = document.createElement("div");
    t.className = "uniform-controls-header";
    const n = document.createElement("button");
    n.className = "uniform-controls-reset", n.textContent = "Reset", n.title = "Reset all uniforms to defaults", n.addEventListener("click", () => this.resetToDefaults()), t.appendChild(n), this.container.appendChild(t);
    const s = document.createElement("div");
    s.className = "uniform-controls-list";
    for (const [r, o] of e) {
      if (A(o) || o.hidden)
        continue;
      const a = this.createControl(r, o);
      a && (this.updaters.set(r, a.update), s.appendChild(a.element));
    }
    this.container.appendChild(s);
  }
  /**
   * Create a control element for a uniform.
   */
  createControl(e, t) {
    if (A(t) || t.hidden)
      return null;
    switch (t.type) {
      case "float":
        return this.createFloatSlider(e, t);
      case "int":
        return this.createIntSlider(e, t);
      case "bool":
        return this.createBoolToggle(e, t);
      case "vec2":
        return this.createVec2Pad(e, t);
      case "vec3":
        return t.color ? this.createColorPicker(e, t) : this.createVecSliders(e, t, 3);
      case "vec4":
        return t.color ? this.createColorPicker4(e, t) : this.createVecSliders(e, t, 4);
      default:
        return console.warn(`Uniform '${e}': unknown type '${t.type}'`), null;
    }
  }
  // ===========================================================================
  // Shared Slider Row Helper
  // ===========================================================================
  createSliderRow(e) {
    const t = document.createElement("div");
    t.className = "uniform-control-label-row";
    const n = document.createElement("label");
    n.className = "uniform-control-label", n.textContent = e.label;
    const s = document.createElement("span");
    s.className = "uniform-control-value", s.textContent = e.format(e.value), t.appendChild(n), t.appendChild(s);
    const r = document.createElement("input");
    r.type = "range", r.className = "uniform-control-slider", r.min = String(e.min), r.max = String(e.max), r.step = String(e.step), r.value = String(e.value), r.addEventListener("input", () => {
      const c = parseFloat(r.value);
      e.onInput(c), s.textContent = e.format(c);
    });
    const o = document.createElement("div");
    return o.appendChild(t), o.appendChild(r), { element: o, update: (c) => {
      r.value = String(c), s.textContent = e.format(c);
    } };
  }
  // ===========================================================================
  // Float Slider
  // ===========================================================================
  createFloatSlider(e, t) {
    const n = t.step ?? 0.01, { element: s, update: r } = this.createSliderRow({
      label: t.label ?? e,
      min: t.min ?? 0,
      max: t.max ?? 1,
      step: n,
      value: this.values[e],
      format: (a) => this.formatNumber(a, n),
      onInput: (a) => {
        this.values[e] = a, this.onChange(e, a);
      }
    }), o = document.createElement("div");
    return o.className = "uniform-control uniform-control-float", o.appendChild(s), {
      element: o,
      update: (a) => r(a)
    };
  }
  // ===========================================================================
  // Int Slider
  // ===========================================================================
  createIntSlider(e, t) {
    const { element: n, update: s } = this.createSliderRow({
      label: t.label ?? e,
      min: t.min ?? 0,
      max: t.max ?? 10,
      step: t.step ?? 1,
      value: this.values[e],
      format: (o) => String(Math.round(o)),
      onInput: (o) => {
        const a = Math.round(o);
        this.values[e] = a, this.onChange(e, a);
      }
    }), r = document.createElement("div");
    return r.className = "uniform-control uniform-control-int", r.appendChild(n), {
      element: r,
      update: (o) => s(o)
    };
  }
  // ===========================================================================
  // Bool Toggle
  // ===========================================================================
  createBoolToggle(e, t) {
    const n = this.values[e], s = t.label ?? e, r = document.createElement("div");
    r.className = "uniform-control uniform-control-bool";
    const o = document.createElement("div");
    o.className = "uniform-control-label-row";
    const a = document.createElement("label");
    a.className = "uniform-control-label", a.textContent = s;
    const c = document.createElement("label");
    c.className = "uniform-control-toggle";
    const l = document.createElement("input");
    l.type = "checkbox", l.checked = n;
    const u = document.createElement("span");
    return u.className = "uniform-control-toggle-slider", l.addEventListener("change", () => {
      const d = l.checked;
      this.values[e] = d, this.onChange(e, d);
    }), c.appendChild(l), c.appendChild(u), o.appendChild(a), o.appendChild(c), r.appendChild(o), {
      element: r,
      update: (d) => {
        l.checked = d;
      }
    };
  }
  // ===========================================================================
  // Vec2 XY Pad
  // ===========================================================================
  createVec2Pad(e, t) {
    const n = this.values[e], s = t.min ?? [0, 0], r = t.max ?? [1, 1], o = t.label ?? e, a = document.createElement("div");
    a.className = "uniform-control uniform-control-vec2";
    const c = document.createElement("div");
    c.className = "uniform-control-label-row";
    const l = document.createElement("label");
    l.className = "uniform-control-label", l.textContent = o;
    const u = document.createElement("span");
    u.className = "uniform-control-value", u.textContent = this.formatVec2(n), c.appendChild(l), c.appendChild(u);
    const d = document.createElement("div");
    d.className = "uniform-control-xy-pad";
    const E = document.createElement("div");
    E.className = "uniform-control-xy-handle", d.appendChild(E);
    const y = (p) => {
      const g = (p[0] - s[0]) / (r[0] - s[0]) * 100, x = (1 - (p[1] - s[1]) / (r[1] - s[1])) * 100;
      E.style.left = `${g}%`, E.style.top = `${x}%`;
    };
    y(n);
    let b = !1;
    const T = (p) => {
      const g = d.getBoundingClientRect(), x = "touches" in p ? p.touches[0].clientX : p.clientX, C = "touches" in p ? p.touches[0].clientY : p.clientY;
      let v = Math.max(0, Math.min(1, (x - g.left) / g.width)), R = Math.max(0, Math.min(1, (C - g.top) / g.height));
      const F = s[0] + v * (r[0] - s[0]), S = s[1] + (1 - R) * (r[1] - s[1]), B = [F, S];
      this.values[e] = B, E.style.left = `${v * 100}%`, E.style.top = `${R * 100}%`, u.textContent = this.formatVec2(B), this.onChange(e, B);
    }, w = (p) => {
      b = !0, T(p), p.preventDefault();
    }, _ = (p) => {
      b && T(p);
    }, m = () => {
      b = !1;
    };
    d.addEventListener("mousedown", w), document.addEventListener("mousemove", _), document.addEventListener("mouseup", m), this.documentListeners.push({ type: "mousemove", handler: _ }), this.documentListeners.push({ type: "mouseup", handler: m });
    const h = (p) => {
      b = !0, T(p), p.preventDefault();
    }, f = (p) => {
      b && T(p);
    };
    return d.addEventListener("touchstart", h), document.addEventListener("touchmove", f), document.addEventListener("touchend", m), this.documentListeners.push({ type: "touchmove", handler: f }), this.documentListeners.push({ type: "touchend", handler: m }), a.appendChild(c), a.appendChild(d), {
      element: a,
      update: (p) => {
        const g = p;
        y(g), u.textContent = this.formatVec2(g);
      }
    };
  }
  // ===========================================================================
  // Vec3 Color Picker
  // ===========================================================================
  createColorPicker(e, t) {
    const n = this.values[e], s = t.label ?? e, r = document.createElement("div");
    r.className = "uniform-control uniform-control-color";
    const o = document.createElement("div");
    o.className = "uniform-control-label-row";
    const a = document.createElement("label");
    a.className = "uniform-control-label", a.textContent = s;
    const c = document.createElement("span");
    c.className = "uniform-control-value", c.textContent = this.rgbToHex(n), o.appendChild(a), o.appendChild(c);
    const l = document.createElement("div");
    l.className = "uniform-control-color-wrapper";
    const u = document.createElement("input");
    u.type = "color", u.className = "uniform-control-color-input", u.value = this.rgbToHex(n);
    const d = document.createElement("div");
    return d.className = "uniform-control-color-swatch", d.style.backgroundColor = this.rgbToHex(n), u.addEventListener("input", () => {
      const E = this.hexToRgb(u.value);
      this.values[e] = E, c.textContent = u.value, d.style.backgroundColor = u.value, this.onChange(e, E);
    }), d.addEventListener("click", () => u.click()), l.appendChild(d), l.appendChild(u), r.appendChild(o), r.appendChild(l), {
      element: r,
      update: (E) => {
        const y = this.rgbToHex(E);
        u.value = y, d.style.backgroundColor = y, c.textContent = y;
      }
    };
  }
  // ===========================================================================
  // Vec4 Color Picker (with alpha)
  // ===========================================================================
  createColorPicker4(e, t) {
    var T, w, _;
    const n = this.values[e], s = t.label ?? e, r = document.createElement("div");
    r.className = "uniform-control uniform-control-color";
    const o = document.createElement("div");
    o.className = "uniform-control-label-row";
    const a = document.createElement("label");
    a.className = "uniform-control-label", a.textContent = s;
    const c = document.createElement("span");
    c.className = "uniform-control-value", c.textContent = this.rgbToHex(n), o.appendChild(a), o.appendChild(c);
    const l = document.createElement("div");
    l.className = "uniform-control-color-wrapper";
    const u = document.createElement("input");
    u.type = "color", u.className = "uniform-control-color-input", u.value = this.rgbToHex(n);
    const d = document.createElement("div");
    d.className = "uniform-control-color-swatch", d.style.backgroundColor = this.rgbToHex(n), u.addEventListener("input", () => {
      const m = this.hexToRgb(u.value), h = this.values[e];
      h[0] = m[0], h[1] = m[1], h[2] = m[2], c.textContent = u.value, d.style.backgroundColor = u.value, this.onChange(e, [...h]);
    }), d.addEventListener("click", () => u.click()), l.appendChild(d), l.appendChild(u);
    const E = ((T = t.step) == null ? void 0 : T[3]) ?? 0.01, { element: y, update: b } = this.createSliderRow({
      label: "Alpha",
      min: ((w = t.min) == null ? void 0 : w[3]) ?? 0,
      max: ((_ = t.max) == null ? void 0 : _[3]) ?? 1,
      step: E,
      value: n[3],
      format: (m) => this.formatNumber(m, E),
      onInput: (m) => {
        const h = this.values[e];
        h[3] = m, this.onChange(e, [...h]);
      }
    });
    return r.appendChild(o), r.appendChild(l), r.appendChild(y), {
      element: r,
      update: (m) => {
        const h = m, f = this.rgbToHex(h);
        u.value = f, d.style.backgroundColor = f, c.textContent = f, b(h[3]);
      }
    };
  }
  // ===========================================================================
  // Vec3/Vec4 Component Sliders
  // ===========================================================================
  createVecSliders(e, t, n) {
    const s = this.values[e], r = t.label ?? e, o = n === 3 ? ["X", "Y", "Z"] : ["X", "Y", "Z", "W"], a = document.createElement("div");
    a.className = `uniform-control uniform-control-vec${n}`;
    const c = document.createElement("div");
    c.className = "uniform-control-label", c.textContent = r, a.appendChild(c);
    const l = [];
    return o.forEach((u, d) => {
      var _, m, h;
      const E = ((_ = t.step) == null ? void 0 : _[d]) ?? 0.01, { element: y, update: b } = this.createSliderRow({
        label: u,
        min: ((m = t.min) == null ? void 0 : m[d]) ?? 0,
        max: ((h = t.max) == null ? void 0 : h[d]) ?? 1,
        step: E,
        value: s[d],
        format: (f) => this.formatNumber(f, E),
        onInput: (f) => {
          const p = this.values[e];
          p[d] = f, this.onChange(e, [...p]);
        }
      }), T = y.querySelector(".uniform-control-label-row");
      if (T) {
        T.classList.add("uniform-control-vec-slider-row");
        const f = T.querySelector(".uniform-control-label");
        f && f.classList.add("uniform-control-vec-component");
        const p = T.querySelector(".uniform-control-value");
        p && p.classList.add("uniform-control-vec-value");
      }
      const w = y.querySelector(".uniform-control-slider");
      w && w.classList.add("uniform-control-vec-slider"), l.push(b), a.appendChild(y);
    }), {
      element: a,
      update: (u) => {
        const d = u;
        l.forEach((E, y) => E(d[y]));
      }
    };
  }
  // ===========================================================================
  // Utility Methods
  // ===========================================================================
  formatNumber(e, t) {
    const n = String(t), s = n.indexOf("."), r = s === -1 ? 0 : n.length - s - 1;
    return e.toFixed(r);
  }
  formatVec2(e) {
    return `(${e[0].toFixed(2)}, ${e[1].toFixed(2)})`;
  }
  rgbToHex(e) {
    const t = Math.round(e[0] * 255), n = Math.round(e[1] * 255), s = Math.round(e[2] * 255);
    return `#${t.toString(16).padStart(2, "0")}${n.toString(16).padStart(2, "0")}${s.toString(16).padStart(2, "0")}`;
  }
  hexToRgb(e) {
    const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? [
      parseInt(t[1], 16) / 255,
      parseInt(t[2], 16) / 255,
      parseInt(t[3], 16) / 255
    ] : [0, 0, 0];
  }
  // ===========================================================================
  // Public Methods
  // ===========================================================================
  /**
   * Update a uniform value externally (e.g., from reset).
   */
  setValue(e, t) {
    var n;
    e in this.uniforms && (this.values[e] = t, (n = this.updaters.get(e)) == null || n(t));
  }
  /**
   * Reset all uniforms to their default values.
   */
  resetToDefaults() {
    for (const [e, t] of Object.entries(this.uniforms))
      A(t) || t.hidden || (this.setValue(e, t.value), this.onChange(e, t.value));
  }
  /**
   * Destroy the controls and clean up.
   */
  destroy() {
    for (const { type: e, handler: t } of this.documentListeners)
      document.removeEventListener(e, t);
    this.documentListeners = [], this.container.innerHTML = "", this.updaters.clear();
  }
}
class gt {
  constructor(e) {
    if (this.controls = null, this.isOpen = e.startOpen ?? !1, this.wrapper = document.createElement("div"), this.wrapper.className = "uniforms-panel-wrapper", this.toggleButton = document.createElement("button"), this.toggleButton.className = "uniforms-toggle-button", this.toggleButton.title = "Toggle Uniforms Panel", this.toggleButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="4" y1="21" x2="4" y2="14"></line>
        <line x1="4" y1="10" x2="4" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12" y2="3"></line>
        <line x1="20" y1="21" x2="20" y2="16"></line>
        <line x1="20" y1="12" x2="20" y2="3"></line>
        <line x1="1" y1="14" x2="7" y2="14"></line>
        <line x1="9" y1="8" x2="15" y2="8"></line>
        <line x1="17" y1="16" x2="23" y2="16"></line>
      </svg>
    `, this.toggleButton.addEventListener("click", () => this.toggle()), this.wrapper.appendChild(this.toggleButton), this.panel = document.createElement("div"), this.panel.className = "uniforms-panel", !Object.values(e.uniforms).some((a) => se(a))) {
      this.wrapper.style.display = "none", e.container.appendChild(this.wrapper);
      return;
    }
    const n = document.createElement("div");
    n.className = "uniforms-panel-header";
    const s = document.createElement("span");
    s.textContent = "Uniforms", n.appendChild(s);
    const r = document.createElement("button");
    r.className = "uniforms-panel-close", r.innerHTML = "&times;", r.title = "Close", r.addEventListener("click", () => this.hide()), n.appendChild(r), this.panel.appendChild(n);
    const o = document.createElement("div");
    o.className = "uniforms-panel-content", this.panel.appendChild(o), this.controls = new Ae({
      container: o,
      uniforms: e.uniforms,
      initialValues: e.initialValues,
      onChange: e.onChange
    }), this.wrapper.appendChild(this.panel), this.isOpen || this.panel.classList.add("closed"), e.container.appendChild(this.wrapper);
  }
  /**
   * Update a uniform value from external source.
   */
  setValue(e, t) {
    var n;
    (n = this.controls) == null || n.setValue(e, t);
  }
  /**
   * Show the panel.
   */
  show() {
    this.isOpen = !0, this.toggleButton.classList.add("hidden"), this.panel.classList.remove("closed");
  }
  /**
   * Hide the panel.
   */
  hide() {
    this.isOpen = !1, this.panel.classList.add("closed"), this.toggleButton.classList.remove("hidden");
  }
  /**
   * Toggle panel visibility.
   */
  toggle() {
    this.isOpen ? this.hide() : this.show();
  }
  /**
   * Check if panel is visible.
   */
  isVisible() {
    return this.isOpen;
  }
  /**
   * Destroy the panel.
   */
  destroy() {
    var e;
    (e = this.controls) == null || e.destroy(), this.wrapper.remove();
  }
}
const te = (i) => i.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
function Et(i, e) {
  const t = vt(i, e), n = new Blob([t], { type: "text/html" }), r = `${i.root.split("/").pop() || "shader"}.html`, o = URL.createObjectURL(n), a = document.createElement("a");
  a.href = o, a.download = r, a.click(), URL.revokeObjectURL(o), console.log(`Exported: ${r}`);
}
function vt(i, e) {
  var p, g, x, C;
  const t = i.meta.title, n = i.commonSource ?? "", s = e.getUniformValues(), r = e.getUBOExportData(), o = ["BufferA", "BufferB", "BufferC", "BufferD", "Image"], a = [];
  let c = !1, l = !1;
  for (const v of o) {
    const R = i.passes[v];
    if (!R)
      continue;
    const F = R.channels.map((S) => S.kind === "buffer" ? `buffer:${S.buffer}` : S.kind === "texture" ? "procedural" : S.kind === "keyboard" ? (c = !0, "keyboard") : S.kind === "script" ? (l = !0, `script:${S.name}`) : S.kind === "audio" || S.kind === "webcam" || S.kind === "video" ? "black" : "none");
    a.push({
      name: v,
      source: R.glslSource,
      channels: R.channels,
      channelTypes: F
    });
  }
  const u = !!((p = i.script) != null && p.setup || (g = i.script) != null && g.onFrame), d = Object.entries(i.uniforms).filter(([, v]) => !A(v)), E = [];
  for (const [v, R] of d) {
    if (A(R))
      continue;
    const F = s[v] ?? R.value;
    if (R.type === "float" || R.type === "int")
      E.push(`  '${v}': ${F}`);
    else if (R.type === "bool")
      E.push(`  '${v}': ${F ? 1 : 0}`);
    else if (R.type === "vec2") {
      const S = F;
      E.push(`  '${v}': [${S[0]}, ${S[1]}]`);
    } else if (R.type === "vec3") {
      const S = F;
      E.push(`  '${v}': [${S[0]}, ${S[1]}, ${S[2]}]`);
    } else if (R.type === "vec4") {
      const S = F;
      E.push(`  '${v}': [${S[0]}, ${S[1]}, ${S[2]}, ${S[3]}]`);
    }
  }
  const y = d.map(([v, R]) => `uniform ${R.type === "bool" ? "bool" : R.type} ${v};`).join(`
`), b = r.map((v) => `// Array uniform: ${v.name} (max ${v.count})
layout(std140) uniform _ub_${v.name} {
  ${v.type} ${v.name}[${v.count}];
};
uniform int ${v.name}_count;`).join(`

`), T = r.map((v) => {
    const R = Array.from(v.paddedData).map((F) => F.toFixed(6)).join(", ");
    return `  { name: '${v.name}', type: '${v.type}', count: ${v.count}, binding: ${v.bindingPoint}, data: new Float32Array([${R}]) }`;
  }).join(`,
`);
  let w = "", _ = "";
  u && ((x = i.script) != null && x.setup && (w = i.script.setup.toString()), (C = i.script) != null && C.onFrame && (_ = i.script.onFrame.toString()));
  const m = c ? `
// --- Keyboard helpers ---
const int KEY_A = 65; const int KEY_B = 66; const int KEY_C = 67; const int KEY_D = 68;
const int KEY_E = 69; const int KEY_F = 70; const int KEY_G = 71; const int KEY_H = 72;
const int KEY_I = 73; const int KEY_J = 74; const int KEY_K = 75; const int KEY_L = 76;
const int KEY_M = 77; const int KEY_N = 78; const int KEY_O = 79; const int KEY_P = 80;
const int KEY_Q = 81; const int KEY_R = 82; const int KEY_S = 83; const int KEY_T = 84;
const int KEY_U = 85; const int KEY_V = 86; const int KEY_W = 87; const int KEY_X = 88;
const int KEY_Y = 89; const int KEY_Z = 90;
const int KEY_0 = 48; const int KEY_1 = 49; const int KEY_2 = 50; const int KEY_3 = 51;
const int KEY_4 = 52; const int KEY_5 = 53; const int KEY_6 = 54; const int KEY_7 = 55;
const int KEY_8 = 56; const int KEY_9 = 57;
const int KEY_LEFT = 37; const int KEY_UP = 38; const int KEY_RIGHT = 39; const int KEY_DOWN = 40;
const int KEY_SPACE = 32; const int KEY_ENTER = 13; const int KEY_TAB = 9; const int KEY_ESC = 27;
const int KEY_BACKSPACE = 8; const int KEY_DELETE = 46; const int KEY_SHIFT = 16;
const int KEY_CTRL = 17; const int KEY_ALT = 18;
const int KEY_F1 = 112; const int KEY_F2 = 113; const int KEY_F3 = 114; const int KEY_F4 = 115;
const int KEY_F5 = 116; const int KEY_F6 = 117; const int KEY_F7 = 118; const int KEY_F8 = 119;
const int KEY_F9 = 120; const int KEY_F10 = 121; const int KEY_F11 = 122; const int KEY_F12 = 123;
float keyDown(int key) { return textureLod(iChannel0, vec2((float(key) + 0.5) / 256.0, 0.25), 0.0).x; }
float keyToggle(int key) { return textureLod(iChannel0, vec2((float(key) + 0.5) / 256.0, 0.75), 0.0).x; }
bool isKeyDown(int key) { return keyDown(key) > 0.5; }
bool isKeyToggled(int key) { return keyToggle(key) > 0.5; }
` : "", h = a.map((v) => `  { name: '${v.name}', source: \`${te(v.source)}\`, channels: ${JSON.stringify(v.channelTypes)} }`).join(`,
`), f = `#version 300 es
precision highp float;

const float ST_PI = 3.14159265359;
const float ST_TWOPI = 6.28318530718;
vec2 _st_dirToEquirect(vec3 dir) {
  float phi = atan(dir.z, dir.x);
  float theta = asin(dir.y);
  return vec2(phi / ST_TWOPI + 0.5, theta / ST_PI + 0.5);
}

uniform vec3  iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform int   iFrame;
uniform vec4  iMouse;
uniform bool  iMousePressed;
uniform vec4  iDate;
uniform float iFrameRate;
uniform vec3  iChannelResolution[4];
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;

${b}
${y}
${m}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: #fff; }
    body { display: flex; align-items: center; justify-content: center; }
    .container {
      width: 90vw;
      max-width: 1200px;
      aspect-ratio: 16 / 9;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1);
    }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div class="container">
    <canvas id="canvas"></canvas>
  </div>
  <script>
// Shader Sandbox Export - ${t}
// Generated ${(/* @__PURE__ */ new Date()).toISOString()}

// ── Constants ──

const VERTEX_SHADER = \`#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
\`;

const FRAGMENT_PREAMBLE = \`${te(f)}\`;

const FRAGMENT_SUFFIX = \`
out vec4 fragColor;
void main() { mainImage(fragColor, gl_FragCoord.xy); }
\`;

const COMMON_SOURCE = \`${te(n)}\`;

const PASSES = [
${h}
];

const UNIFORM_VALUES = {
${E.join(`,
`)}
};

const UBO_DATA = [
${T}
];

// ── WebGL Setup ──

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, preserveDrawingBuffer: true });
if (!gl) { alert('WebGL2 not supported'); throw new Error('WebGL2 not supported'); }

const floatExt = gl.getExtension('EXT_color_buffer_float');
if (!floatExt) console.warn('EXT_color_buffer_float not supported');

// Fullscreen triangle
const vao = gl.createVertexArray();
gl.bindVertexArray(vao);
const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

// ── Helper Textures ──

function createProceduralTexture() {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  const data = new Uint8Array(8 * 8 * 4);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const i = (y * 8 + x) * 4;
      const c = (x + y) % 2;
      data[i] = c ? 204 : 51; data[i+1] = c ? 26 : 51;
      data[i+2] = c ? 204 : 51; data[i+3] = 255;
    }
  }
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 8, 8, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  return tex;
}

function createBlackTexture() {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,255]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  return tex;
}

const proceduralTex = createProceduralTexture();
const blackTex = createBlackTexture();
${c ? `
// ── Keyboard Texture (256x3) ──
// Row 0: current key state, Row 1: key down events, Row 2: toggle state
const keyboardTex = gl.createTexture();
const keyboardData = new Uint8Array(256 * 3);
gl.bindTexture(gl.TEXTURE_2D, keyboardTex);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 256, 3, 0, gl.RED, gl.UNSIGNED_BYTE, keyboardData);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

const keyStates = new Uint8Array(256);     // row 0: held
const keyDown_ev = new Uint8Array(256);    // row 1: down this frame
const keyToggle_st = new Uint8Array(256);  // row 2: toggle

document.addEventListener('keydown', e => {
  const k = e.keyCode;
  if (k < 256) {
    if (!keyStates[k]) {
      keyDown_ev[k] = 255;
      keyToggle_st[k] = keyToggle_st[k] ? 0 : 255;
    }
    keyStates[k] = 255;
  }
});
document.addEventListener('keyup', e => {
  const k = e.keyCode;
  if (k < 256) keyStates[k] = 0;
});

function updateKeyboardTexture() {
  keyboardData.set(keyStates, 0);
  keyboardData.set(keyDown_ev, 256);
  keyboardData.set(keyToggle_st, 512);
  gl.bindTexture(gl.TEXTURE_2D, keyboardTex);
  gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 256, 3, gl.RED, gl.UNSIGNED_BYTE, keyboardData);
  keyDown_ev.fill(0);
}
` : ""}
${l || u ? `
// ── Script Textures ──
const scriptTextures = new Map();

function updateScriptTexture(name, w, h, data) {
  const existing = scriptTextures.get(name);
  const isFloat = data instanceof Float32Array;
  const internalFormat = isFloat ? gl.RGBA32F : gl.RGBA;
  const type = isFloat ? gl.FLOAT : gl.UNSIGNED_BYTE;
  if (existing && existing.width === w && existing.height === h) {
    gl.bindTexture(gl.TEXTURE_2D, existing.texture);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, w, h, gl.RGBA, type, data);
  } else {
    const tex = existing ? existing.texture : gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, gl.RGBA, type, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    scriptTextures.set(name, { texture: tex, width: w, height: h });
  }
}
` : ""}
// ── Shader Compilation ──

function compileShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    console.error(source.split('\\n').map((l,i) => (i+1) + ': ' + l).join('\\n'));
    throw new Error('Shader compile failed');
  }
  return shader;
}

function createProgram(fragSource) {
  const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compileShader(gl.FRAGMENT_SHADER, fragSource);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error('Program link failed: ' + gl.getProgramInfoLog(program));
  }
  return program;
}

function createRenderTexture(w, h) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, w, h, 0, gl.RGBA, gl.FLOAT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

function createFramebuffer(tex) {
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  return fb;
}

// ── Initialize Passes ──

const container = canvas.parentElement;
let width = canvas.width = container.clientWidth * devicePixelRatio;
let height = canvas.height = container.clientHeight * devicePixelRatio;

const runtimePasses = PASSES.map(pass => {
  const fragSource = FRAGMENT_PREAMBLE +
    (COMMON_SOURCE ? '\\n// Common\\n' + COMMON_SOURCE + '\\n' : '') +
    '\\n// User code\\n' + pass.source + FRAGMENT_SUFFIX;
  const program = createProgram(fragSource);
  const currentTexture = createRenderTexture(width, height);
  const previousTexture = createRenderTexture(width, height);
  const framebuffer = createFramebuffer(currentTexture);

  // Cache uniform locations
  const uniforms = {
    iResolution: gl.getUniformLocation(program, 'iResolution'),
    iTime: gl.getUniformLocation(program, 'iTime'),
    iTimeDelta: gl.getUniformLocation(program, 'iTimeDelta'),
    iFrame: gl.getUniformLocation(program, 'iFrame'),
    iMouse: gl.getUniformLocation(program, 'iMouse'),
    iMousePressed: gl.getUniformLocation(program, 'iMousePressed'),
    iDate: gl.getUniformLocation(program, 'iDate'),
    iFrameRate: gl.getUniformLocation(program, 'iFrameRate'),
    iChannel: [0,1,2,3].map(i => gl.getUniformLocation(program, 'iChannel' + i)),
    iChannelResolution: gl.getUniformLocation(program, 'iChannelResolution'),
    custom: {},
    uboCountLocs: {},
  };

  // Scalar uniform locations
  for (const name of Object.keys(UNIFORM_VALUES)) {
    uniforms.custom[name] = gl.getUniformLocation(program, name);
  }

  // UBO block bindings and count locations
  for (const ubo of UBO_DATA) {
    const blockIndex = gl.getUniformBlockIndex(program, '_ub_' + ubo.name);
    if (blockIndex !== gl.INVALID_INDEX) {
      gl.uniformBlockBinding(program, blockIndex, ubo.binding);
    }
    uniforms.uboCountLocs[ubo.name] = gl.getUniformLocation(program, ubo.name + '_count');
  }

  return { name: pass.name, channels: pass.channels, program, framebuffer, currentTexture, previousTexture, uniforms };
});

// ── UBO Buffers ──

const uboBuffers = UBO_DATA.map(ubo => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.UNIFORM_BUFFER, buffer);
  gl.bufferData(gl.UNIFORM_BUFFER, ubo.data, gl.DYNAMIC_DRAW);
  gl.bindBufferBase(gl.UNIFORM_BUFFER, ubo.binding, buffer);
  return { name: ubo.name, buffer, count: ubo.count, data: ubo.data };
});

const findPass = name => runtimePasses.find(p => p.name === name);
${u ? `
// ── Script Setup ──

const scriptSetup = ${w || "null"};
const scriptOnFrame = ${_ || "null"};

const scriptEngine = {
  setUniformValue(name, value) {
    // Check if this is an array uniform (Float32Array)
    if (value instanceof Float32Array) {
      const ubo = uboBuffers.find(u => u.name === name);
      if (ubo) {
        // Pack to std140: user provides tight data, we need to pad
        // For simplicity, copy directly (assume already padded or vec4/mat4)
        const len = Math.min(value.length, ubo.data.length);
        ubo.data.set(value.subarray(0, len));
        gl.bindBuffer(gl.UNIFORM_BUFFER, ubo.buffer);
        gl.bufferSubData(gl.UNIFORM_BUFFER, 0, ubo.data);
      }
    } else {
      UNIFORM_VALUES[name] = value;
    }
  },
  getUniformValue(name) {
    return UNIFORM_VALUES[name];
  },
  updateTexture(name, w, h, data) {
    updateScriptTexture(name, w, h, data);
  },
  readPixels(passName, x, y, w, h) {
    const pass = findPass(passName);
    if (!pass) return new Uint8Array(w * h * 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, pass.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, pass.previousTexture, 0);
    const pixels = new Uint8Array(w * h * 4);
    gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, pass.currentTexture, 0);
    return pixels;
  },
  get width() { return width; },
  get height() { return height; },
  setOverlay() {},
};

try {
  if (scriptSetup) scriptSetup(scriptEngine);
} catch(e) { console.error('script setup error:', e); }
` : ""}
// ── Mouse ──

let mouse = [0, 0, 0, 0];
let mouseDown = false;
canvas.addEventListener('mousedown', e => {
  mouseDown = true;
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width * width;
  const y = (1 - (e.clientY - rect.top) / rect.height) * height;
  mouse[0] = x; mouse[1] = y;
  mouse[2] = x; mouse[3] = y;
});
canvas.addEventListener('mousemove', e => {
  if (!mouseDown) return;
  const rect = canvas.getBoundingClientRect();
  mouse[0] = (e.clientX - rect.left) / rect.width * width;
  mouse[1] = (1 - (e.clientY - rect.top) / rect.height) * height;
});
canvas.addEventListener('mouseup', () => {
  mouseDown = false;
  mouse[2] = -Math.abs(mouse[2]);
  mouse[3] = -Math.abs(mouse[3]);
});

// ── Resize ──

let resizeTimer = null;
new ResizeObserver(() => {
  const newW = container.clientWidth * devicePixelRatio;
  const newH = container.clientHeight * devicePixelRatio;
  canvas.width = newW;
  canvas.height = newH;
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    width = newW;
    height = newH;
    runtimePasses.forEach(p => {
      [p.currentTexture, p.previousTexture].forEach(tex => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, width, height, 0, gl.RGBA, gl.FLOAT, null);
      });
      gl.bindFramebuffer(gl.FRAMEBUFFER, p.framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, p.currentTexture, 0);
    });
    frame = 0;
    startTime = performance.now() / 1000;
    lastTime = 0;
  }, 150);
}).observe(container);

// ── Animation Loop ──

let frame = 0;
let startTime = performance.now() / 1000;
let lastTime = 0;

function render(now) {
  requestAnimationFrame(render);

  const time = now / 1000 - startTime;
  const deltaTime = Math.max(0.001, time - lastTime);
  lastTime = time;

  const date = new Date();
  const iDate = [date.getFullYear(), date.getMonth(), date.getDate(),
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() / 1000];
${c ? `
  updateKeyboardTexture();` : ""}
${u ? `
  // Run script onFrame
  try {
    if (scriptOnFrame) scriptOnFrame(scriptEngine, time, deltaTime, frame);
  } catch(e) { console.error('script onFrame error:', e); }
` : ""}
  gl.bindVertexArray(vao);

  runtimePasses.forEach(pass => {
    gl.useProgram(pass.program);
    gl.bindFramebuffer(gl.FRAMEBUFFER, pass.framebuffer);
    gl.viewport(0, 0, width, height);

    // Built-in uniforms
    gl.uniform3f(pass.uniforms.iResolution, width, height, 1);
    gl.uniform1f(pass.uniforms.iTime, time);
    gl.uniform1f(pass.uniforms.iTimeDelta, deltaTime);
    gl.uniform1i(pass.uniforms.iFrame, frame);
    gl.uniform4fv(pass.uniforms.iMouse, mouse);
    gl.uniform1i(pass.uniforms.iMousePressed, mouseDown ? 1 : 0);
    gl.uniform4fv(pass.uniforms.iDate, iDate);
    gl.uniform1f(pass.uniforms.iFrameRate, 1 / deltaTime);

    // Scalar custom uniforms
    for (const [name, value] of Object.entries(UNIFORM_VALUES)) {
      const loc = pass.uniforms.custom[name];
      if (!loc) continue;
      if (Array.isArray(value)) {
        if (value.length === 2) gl.uniform2fv(loc, value);
        else if (value.length === 3) gl.uniform3fv(loc, value);
        else if (value.length === 4) gl.uniform4fv(loc, value);
      } else if (typeof value === 'number') {
        gl.uniform1f(loc, value);
      }
    }

    // UBO count uniforms
    for (const ubo of UBO_DATA) {
      const countLoc = pass.uniforms.uboCountLocs[ubo.name];
      if (countLoc) gl.uniform1i(countLoc, ubo.count);
    }

    // Bind channels
    const channelRes = new Float32Array(12); // iChannelResolution[4] × vec3
    pass.channels.forEach((ch, i) => {
      gl.activeTexture(gl.TEXTURE0 + i);
      if (ch === 'none') {
        gl.bindTexture(gl.TEXTURE_2D, blackTex);
      } else if (ch === 'procedural') {
        gl.bindTexture(gl.TEXTURE_2D, proceduralTex);
        channelRes[i*3] = 8; channelRes[i*3+1] = 8; channelRes[i*3+2] = 1;
      } else if (ch === 'keyboard') {
        gl.bindTexture(gl.TEXTURE_2D, ${c ? "keyboardTex" : "blackTex"});
        channelRes[i*3] = 256; channelRes[i*3+1] = 3; channelRes[i*3+2] = 1;
      } else if (ch === 'black') {
        gl.bindTexture(gl.TEXTURE_2D, blackTex);
      } else if (ch.startsWith('buffer:')) {
        const srcPass = findPass(ch.slice(7));
        gl.bindTexture(gl.TEXTURE_2D, srcPass ? srcPass.previousTexture : blackTex);
        channelRes[i*3] = width; channelRes[i*3+1] = height; channelRes[i*3+2] = 1;
      } else if (ch.startsWith('script:')) {
        const stex = scriptTextures?.get(ch.slice(7));
        gl.bindTexture(gl.TEXTURE_2D, stex ? stex.texture : blackTex);
        if (stex) { channelRes[i*3] = stex.width; channelRes[i*3+1] = stex.height; channelRes[i*3+2] = 1; }
      } else {
        gl.bindTexture(gl.TEXTURE_2D, blackTex);
      }
      gl.uniform1i(pass.uniforms.iChannel[i], i);
    });

    if (pass.uniforms.iChannelResolution) {
      gl.uniform3fv(pass.uniforms.iChannelResolution, channelRes);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // Swap textures
    const temp = pass.currentTexture;
    pass.currentTexture = pass.previousTexture;
    pass.previousTexture = temp;
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, pass.currentTexture, 0);
  });

  // Blit Image pass to screen
  const imagePass = findPass('Image');
  if (imagePass) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, imagePass.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, imagePass.previousTexture, 0);
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, imagePass.framebuffer);
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
    gl.blitFramebuffer(0, 0, width, height, 0, 0, width, height, gl.COLOR_BUFFER_BIT, gl.NEAREST);
    gl.bindFramebuffer(gl.FRAMEBUFFER, imagePass.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, imagePass.currentTexture, 0);
  }

  frame++;
}

requestAnimationFrame(render);
  <\/script>
</body>
</html>`;
}
class Tt {
  constructor(e, t, n) {
    this.isRecording = !1, this.mediaRecorder = null, this.recordedChunks = [], this.recordingIndicator = null, this.canvas = e, this.container = t, this.projectRoot = n;
  }
  /**
   * Toggle recording on/off.
   * If paused, calls unpause callback before starting.
   */
  toggle(e, t) {
    this.isRecording ? this.stop() : this.start(e, t);
  }
  /**
   * Start recording the canvas as WebM video.
   */
  start(e, t) {
    if (!MediaRecorder.isTypeSupported("video/webm")) {
      console.error("WebM recording not supported in this browser");
      return;
    }
    e && t();
    const n = this.canvas.captureStream(60);
    this.mediaRecorder = new MediaRecorder(n, {
      mimeType: "video/webm;codecs=vp9",
      videoBitsPerSecond: 8e6
      // 8 Mbps for high quality
    }), this.recordedChunks = [], this.mediaRecorder.ondataavailable = (s) => {
      s.data.size > 0 && this.recordedChunks.push(s.data);
    }, this.mediaRecorder.onstop = () => {
      const s = new Blob(this.recordedChunks, { type: "video/webm" }), r = this.projectRoot.split("/").pop() || "shader", o = /* @__PURE__ */ new Date(), a = o.getFullYear().toString() + (o.getMonth() + 1).toString().padStart(2, "0") + o.getDate().toString().padStart(2, "0") + "-" + o.getHours().toString().padStart(2, "0") + o.getMinutes().toString().padStart(2, "0") + o.getSeconds().toString().padStart(2, "0"), c = `shadertoy-${r}-${a}.webm`, l = URL.createObjectURL(s), u = document.createElement("a");
      u.href = l, u.download = c, u.click(), URL.revokeObjectURL(l), console.log(`Recording saved: ${c}`);
    }, this.mediaRecorder.start(), this.isRecording = !0, this.showRecordingIndicator(), console.log("Recording started");
  }
  /**
   * Stop recording and trigger download.
   */
  stop() {
    this.mediaRecorder && this.mediaRecorder.state !== "inactive" && this.mediaRecorder.stop(), this.isRecording = !1, this.mediaRecorder = null, this.hideRecordingIndicator(), console.log("Recording stopped");
  }
  /**
   * Clean up resources.
   */
  dispose() {
    this.isRecording && this.stop(), this.hideRecordingIndicator();
  }
  /**
   * Show the recording indicator (pulsing red dot in corner).
   */
  showRecordingIndicator() {
    this.recordingIndicator || (this.recordingIndicator = document.createElement("div"), this.recordingIndicator.className = "recording-indicator", this.recordingIndicator.innerHTML = `
      <span class="recording-dot"></span>
      <span class="recording-text">REC</span>
    `, this.container.appendChild(this.recordingIndicator));
  }
  /**
   * Hide the recording indicator.
   */
  hideRecordingIndicator() {
    this.recordingIndicator && (this.recordingIndicator.remove(), this.recordingIndicator = null);
  }
}
class bt {
  constructor(e) {
    this.frameCount = 0, this.totalFrameCount = 0, this.lastFpsUpdate = 0, this.currentFps = 0, this.isStatsOpen = !1, this.container = e, this.statsContainer = document.createElement("div"), this.statsContainer.className = "stats-container", this.fpsDisplay = document.createElement("button"), this.fpsDisplay.className = "fps-counter", this.fpsDisplay.textContent = "0 FPS", this.fpsDisplay.title = "Click to show stats", this.fpsDisplay.addEventListener("click", () => this.toggle()), this.statsGrid = document.createElement("div"), this.statsGrid.className = "stats-grid", this.timeDisplay = document.createElement("div"), this.timeDisplay.className = "stat-item", this.timeDisplay.innerHTML = '<span class="stat-value">0:00</span><span class="stat-label">time</span>', this.statsGrid.appendChild(this.timeDisplay), this.frameDisplay = document.createElement("div"), this.frameDisplay.className = "stat-item", this.frameDisplay.innerHTML = '<span class="stat-value">0</span><span class="stat-label">frame</span>', this.statsGrid.appendChild(this.frameDisplay), this.resolutionDisplay = document.createElement("div"), this.resolutionDisplay.className = "stat-item", this.resolutionDisplay.innerHTML = '<span class="stat-value">0×0</span><span class="stat-label">res</span>', this.statsGrid.appendChild(this.resolutionDisplay), this.statsContainer.appendChild(this.statsGrid), this.statsContainer.appendChild(this.fpsDisplay), this.container.appendChild(this.statsContainer);
  }
  /**
   * Update FPS counter and stats. Call once per frame.
   */
  update(e, t) {
    this.frameCount++, this.totalFrameCount++, this.isStatsOpen && this.updateFrameDisplay(), e - this.lastFpsUpdate >= 1 && (this.currentFps = this.frameCount / (e - this.lastFpsUpdate), this.fpsDisplay.textContent = `${Math.round(this.currentFps)} FPS`, this.frameCount = 0, this.lastFpsUpdate = e, this.isStatsOpen && (this.updateTimeDisplay(t), this.updateResolutionDisplay()));
  }
  /**
   * Reset all counters.
   */
  reset() {
    this.frameCount = 0, this.totalFrameCount = 0, this.lastFpsUpdate = 0, this.isStatsOpen && (this.updateTimeDisplay(0), this.updateFrameDisplay(), this.updateResolutionDisplay());
  }
  /**
   * Update resolution display with current canvas dimensions.
   */
  updateResolution(e, t) {
    this.resolutionDisplay.querySelector(".stat-value").textContent = `${e}×${t}`;
  }
  /**
   * Clean up DOM.
   */
  dispose() {
    this.statsContainer.remove();
  }
  toggle() {
    this.isStatsOpen = !this.isStatsOpen, this.statsGrid.classList.toggle("open", this.isStatsOpen), this.statsContainer.classList.toggle("open", this.isStatsOpen), this.isStatsOpen && (this.updateFrameDisplay(), this.updateResolutionDisplay());
  }
  updateFrameDisplay() {
    let e;
    this.totalFrameCount >= 1e6 ? e = (this.totalFrameCount / 1e6).toFixed(1) + "M" : this.totalFrameCount >= 1e3 ? e = (this.totalFrameCount / 1e3).toFixed(1) + "K" : e = this.totalFrameCount.toString(), this.frameDisplay.querySelector(".stat-value").textContent = e;
  }
  updateTimeDisplay(e) {
    const t = Math.floor(e), n = Math.floor(t / 3600), s = Math.floor(t % 3600 / 60), r = t % 60;
    let o;
    n > 0 ? o = `${n}:${s.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}` : o = `${s}:${r.toString().padStart(2, "0")}`, this.timeDisplay.querySelector(".stat-value").textContent = o;
  }
  updateResolutionDisplay() {
    this.resolutionDisplay.querySelector(".stat-value").textContent || (this.resolutionDisplay.querySelector(".stat-value").textContent = "0×0");
  }
}
class yt {
  constructor(e, t) {
    this.isMenuOpen = !1, this.container = e, this.controlsContainer = document.createElement("div"), this.controlsContainer.className = "playback-controls", this.menuButton = document.createElement("button"), this.menuButton.className = "controls-menu-button", this.menuButton.title = "Controls", this.menuButton.textContent = "+", this.menuButton.addEventListener("click", () => this.toggleMenu()), this.controlsGrid = document.createElement("div"), this.controlsGrid.className = "controls-grid", this.playPauseButton = document.createElement("button"), this.playPauseButton.className = "control-button", this.playPauseButton.title = "Play/Pause (Space)", this.playPauseButton.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path d="M5 3h2v10H5V3zm4 0h2v10H9V3z"/>
      </svg>
    `, this.playPauseButton.addEventListener("click", () => t.onTogglePlayPause());
    const n = document.createElement("button");
    n.className = "control-button", n.title = "Reset (R)", n.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
      </svg>
    `, n.addEventListener("click", () => t.onReset());
    const s = document.createElement("button");
    s.className = "control-button", s.title = "Screenshot (S)", s.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
      </svg>
    `, s.addEventListener("click", () => t.onScreenshot());
    const r = document.createElement("button");
    r.className = "control-button", r.title = "Record Video", r.innerHTML = `
      <svg viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="5"/>
      </svg>
    `, r.addEventListener("click", () => t.onToggleRecording());
    const o = document.createElement("button");
    o.className = "control-button", o.title = "Export HTML", o.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
        <path d="M2 14.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
      </svg>
    `, o.addEventListener("click", () => t.onExportHTML());
    const a = document.createElement("button");
    a.className = "control-button", a.title = "Render", a.innerHTML = `
      <svg viewBox="0 0 16 16">
        <path d="M2 3h12v2H2V3zm0 4h12v2H2V7zm0 4h12v2H2v-2z"/>
      </svg>
    `, a.addEventListener("click", () => t.onRender());
    const c = document.createElement("button");
    c.className = "control-button", c.title = "Close", c.textContent = "−", c.style.fontSize = "20px", c.style.fontWeight = "300", c.addEventListener("click", () => this.toggleMenu()), this.controlsGrid.appendChild(this.playPauseButton), this.controlsGrid.appendChild(n), this.controlsGrid.appendChild(o), this.controlsGrid.appendChild(a), this.controlsGrid.appendChild(s), this.controlsGrid.appendChild(r);
    const l = document.createElement("div");
    this.controlsGrid.appendChild(l), this.controlsGrid.appendChild(c), this.controlsContainer.appendChild(this.controlsGrid), this.controlsContainer.appendChild(this.menuButton), this.container.appendChild(this.controlsContainer);
  }
  /**
   * Update the play/pause button icon.
   */
  setPaused(e) {
    e ? this.playPauseButton.innerHTML = `
        <svg viewBox="0 0 16 16">
          <path d="M4 3v10l8-5-8-5z"/>
        </svg>
      ` : this.playPauseButton.innerHTML = `
        <svg viewBox="0 0 16 16">
          <path d="M5 3h2v10H5V3zm4 0h2v10H9V3z"/>
        </svg>
      `;
  }
  /**
   * Clean up DOM.
   */
  dispose() {
    this.controlsContainer.remove();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen, this.menuButton.textContent = this.isMenuOpen ? "−" : "+", this.controlsGrid.classList.toggle("open", this.isMenuOpen), this.controlsContainer.classList.toggle("open", this.isMenuOpen);
  }
}
class wt {
  constructor(e, t, n, s) {
    this.parentContainer = e, this.canvasWidth = t, this.canvasHeight = n, this.onStartRender = s, this.cancelRenderFn = null, this.backdrop = document.createElement("div"), this.backdrop.className = "render-dialog-backdrop", this.backdrop.addEventListener("click", (x) => {
      x.target === this.backdrop && this.close();
    });
    const r = document.createElement("div");
    r.className = "render-dialog";
    const o = document.createElement("div");
    o.className = "render-dialog-header", o.innerHTML = `
      <div class="render-dialog-title">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
          <path d="M2 14.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
        </svg>
        Render
      </div>
    `;
    const a = document.createElement("button");
    a.className = "render-dialog-close", a.textContent = "×", a.addEventListener("click", () => this.close()), o.appendChild(a), this.bodyEl = document.createElement("div"), this.bodyEl.className = "render-dialog-body";
    const c = this.createField("Resolution"), l = document.createElement("div");
    l.className = "render-field-row", this.widthInput = this.createNumberInput(t, 1, 7680), this.heightInput = this.createNumberInput(n, 1, 4320);
    const u = document.createElement("span");
    u.textContent = "×", l.appendChild(this.widthInput), l.appendChild(u), l.appendChild(this.heightInput), c.appendChild(l);
    const d = this.createField("FPS");
    this.fpsInput = this.createNumberInput(60, 1, 120), d.appendChild(this.fpsInput);
    const E = this.createField("Duration (seconds)");
    this.durationInput = this.createNumberInput(10, 1, 3600), E.appendChild(this.durationInput);
    const y = this.createField("Format"), b = document.createElement("div");
    b.className = "render-format-group", this.formatFrames = document.createElement("input"), this.formatFrames.type = "radio", this.formatFrames.name = "render-format", this.formatFrames.id = "render-fmt-frames", this.formatFrames.value = "frames", this.formatVideo = document.createElement("input"), this.formatVideo.type = "radio", this.formatVideo.name = "render-format", this.formatVideo.id = "render-fmt-video", this.formatVideo.value = "video", this.formatVideo.checked = !0;
    const T = document.createElement("div");
    T.className = "render-format-option";
    const w = document.createElement("label");
    w.htmlFor = "render-fmt-frames", w.textContent = "PNG Frames", T.appendChild(this.formatFrames), T.appendChild(w);
    const _ = document.createElement("div");
    _.className = "render-format-option";
    const m = document.createElement("label");
    m.htmlFor = "render-fmt-video", m.textContent = "Video (WebM)", _.appendChild(this.formatVideo), _.appendChild(m), b.appendChild(_), b.appendChild(T), y.appendChild(b), this.estimateEl = document.createElement("div"), this.estimateEl.className = "render-estimate", this.bodyEl.appendChild(c), this.bodyEl.appendChild(d), this.bodyEl.appendChild(E), this.bodyEl.appendChild(y), this.bodyEl.appendChild(this.estimateEl), this.actionsEl = document.createElement("div"), this.actionsEl.className = "render-dialog-actions";
    const h = document.createElement("button");
    h.className = "render-btn render-btn-cancel", h.textContent = "Cancel", h.addEventListener("click", () => this.close());
    const f = document.createElement("button");
    f.className = "render-btn render-btn-primary", f.textContent = "Start Render", f.addEventListener("click", () => this.startRender()), this.actionsEl.appendChild(h), this.actionsEl.appendChild(f), this.progressEl = document.createElement("div"), this.progressEl.className = "render-progress", this.progressEl.innerHTML = `
      <div class="render-progress-bar-bg"><div class="render-progress-bar"></div></div>
      <div class="render-progress-text">Preparing...</div>
    `, this.progressBar = this.progressEl.querySelector(".render-progress-bar"), this.progressText = this.progressEl.querySelector(".render-progress-text");
    const p = document.createElement("button");
    p.className = "render-btn render-btn-cancel", p.textContent = "Cancel Render", p.style.marginTop = "4px", p.addEventListener("click", () => this.cancelRender()), this.progressEl.appendChild(p), r.appendChild(o), r.appendChild(this.bodyEl), r.appendChild(this.actionsEl), r.appendChild(this.progressEl), this.backdrop.appendChild(r);
    const g = () => this.updateEstimate();
    this.widthInput.addEventListener("input", g), this.heightInput.addEventListener("input", g), this.fpsInput.addEventListener("input", g), this.durationInput.addEventListener("input", g), this.formatFrames.addEventListener("change", g), this.formatVideo.addEventListener("change", g), this.updateEstimate();
  }
  open() {
    this.parentContainer.appendChild(this.backdrop);
  }
  close() {
    var e;
    (e = this.cancelRenderFn) == null || e.call(this), this.cancelRenderFn = null, this.backdrop.remove();
  }
  createField(e) {
    const t = document.createElement("div");
    t.className = "render-field";
    const n = document.createElement("div");
    return n.className = "render-field-label", n.textContent = e, t.appendChild(n), t;
  }
  createNumberInput(e, t, n) {
    const s = document.createElement("input");
    return s.type = "number", s.className = "render-input", s.value = String(Math.round(e)), s.min = String(t), s.max = String(n), s;
  }
  updateEstimate() {
    const e = parseInt(this.widthInput.value) || 0, t = parseInt(this.heightInput.value) || 0, n = parseInt(this.fpsInput.value) || 0, s = parseFloat(this.durationInput.value) || 0, r = Math.ceil(n * s);
    if (this.formatFrames.checked) {
      const a = e * t * 4 / 1048576 * r;
      this.estimateEl.textContent = `${r} frames, ~${a < 1024 ? Math.round(a) + " MB" : (a / 1024).toFixed(1) + " GB"} raw`;
    } else
      this.estimateEl.textContent = `${r} frames, ${s}s at ${n} fps`;
  }
  startRender() {
    const e = parseInt(this.widthInput.value) || this.canvasWidth, t = parseInt(this.heightInput.value) || this.canvasHeight, n = parseInt(this.fpsInput.value) || 60, s = parseFloat(this.durationInput.value) || 10, r = this.formatFrames.checked ? "frames" : "video";
    this.bodyEl.style.display = "none", this.actionsEl.style.display = "none", this.progressEl.classList.add("active"), this.progressBar.style.width = "0%", this.progressText.textContent = "Preparing...", this.cancelRenderFn = this.onStartRender({
      width: e,
      height: t,
      fps: n,
      duration: s,
      format: r,
      onProgress: (o, a) => {
        const c = o / a * 100;
        this.progressBar.style.width = `${c}%`, this.progressText.textContent = `Frame ${o} / ${a} (${Math.round(c)}%)`;
      },
      onComplete: () => {
        this.progressText.textContent = "Done!", this.progressBar.style.width = "100%", setTimeout(() => this.close(), 1500);
      },
      onError: (o) => {
        this.progressText.textContent = `Error: ${o.message}`, this.progressBar.style.background = "#c62828";
      }
    });
  }
  cancelRender() {
    var e;
    (e = this.cancelRenderFn) == null || e.call(this), this.cancelRenderFn = null, this.bodyEl.style.display = "", this.actionsEl.style.display = "", this.progressEl.classList.remove("active");
  }
}
class M {
  constructor(e) {
    var n;
    this.views = /* @__PURE__ */ new Map(), this.animationId = null, this.startTime = 0, this.pausedElapsedTime = 0, this.disposed = !1, this.playbackControls = null, this.isPaused = !1, this.isVisible = !0, this.uniformsPanel = null, this.scriptAPI = null, this.scriptErrorCount = 0, this._lastOnFrameTime = null, this.globalKeyHandler = null, this.controlsKeyHandler = null, this.animate = (s) => {
      if (this.disposed || (this.animationId = requestAnimationFrame(this.animate), this.isPaused || !this.isVisible))
        return;
      for (const a of this.views.values())
        if (a.isContextLost)
          return;
      const r = s / 1e3, o = r - this.startTime;
      if (this.statsPanel.update(r, o), this.runScriptOnFrame(o, this.statsPanel.totalFrameCount), this.isMultiView) {
        const a = /* @__PURE__ */ new Map();
        for (const [c, l] of this.views)
          a.set(c, {
            mouse: l.getMouseState(),
            resolution: l.getResolution(),
            mousePressed: l.getMousePressed()
          });
        for (const c of this.views.values())
          c.step(o, a);
      } else
        this.primaryView.step(o);
    }, this.container = e.container, this.project = e.project, this.isMultiView = Ce(e.project);
    const t = e.pixelRatio ?? e.project.pixelRatio ?? window.devicePixelRatio;
    if (this.isMultiView) {
      const s = e.project, r = s.views.map((o) => o.name);
      if (!e.viewContainers)
        throw new Error("viewContainers required for multi-view projects");
      for (const o of s.views) {
        const a = e.viewContainers.get(o.name);
        if (!a)
          throw new Error(`No container provided for view "${o.name}"`);
        const c = this.createViewProject(s, o), l = new ve({
          container: a,
          project: c,
          pixelRatio: t,
          viewNames: r
        });
        this.views.set(o.name, l);
      }
      this.primaryView = this.views.values().next().value;
    } else {
      const s = new ve({
        container: e.container,
        project: e.project,
        pixelRatio: t
      });
      this.views.set("default", s), this.primaryView = s;
    }
    if (this.recorder = new Tt(this.primaryView.canvas, this.container, this.project.root), this.statsPanel = new bt(this.container), this.statsPanel.updateResolution(this.primaryView.canvas.width, this.primaryView.canvas.height), this.isMultiView) {
      this.primaryView.onResize = (s, r) => {
        this.statsPanel.updateResolution(s, r);
      };
      for (const s of this.views.values())
        s.onContextRestored = () => {
          var r;
          if (this.scriptAPI && ((r = this.project.script) != null && r.setup))
            try {
              this.project.script.setup(this.scriptAPI);
            } catch (o) {
              console.error("script.js setup() threw during context restore:", o), this.primaryView.runtimeErrorOverlay.showError("setup", o);
            }
        };
    } else
      this.primaryView.onResize = (s, r) => {
        this.statsPanel.updateResolution(s, r), this.startTime = performance.now() / 1e3, this.pausedElapsedTime = 0;
      }, this.primaryView.onContextRestored = () => {
        var s;
        if (this.scriptAPI && ((s = this.project.script) != null && s.setup))
          try {
            this.project.script.setup(this.scriptAPI);
          } catch (r) {
            console.error("script.js setup() threw during context restore:", r), this.primaryView.runtimeErrorOverlay.showError("setup", r);
          }
        this.reset(), this.start();
      };
    if (this.project.controls && !e.skipPlaybackControls && (this.playbackControls = new yt(this.container, {
      onTogglePlayPause: () => this.togglePlayPause(),
      onReset: () => this.reset(),
      onScreenshot: () => this.screenshot(),
      onToggleRecording: () => this.toggleRecording(),
      onExportHTML: () => this.exportHTML(),
      onRender: () => this.openRenderDialog()
    })), this.project.startPaused && (this.isPaused = !0, (n = this.playbackControls) == null || n.setPaused(!0)), this.intersectionObserver = new IntersectionObserver((s) => {
      this.isVisible = s[0].isIntersecting;
    }, { threshold: 0.1 }), this.intersectionObserver.observe(this.container), this.project.script && (this.initScriptAPI(), this.project.script.setup && this.scriptAPI))
      try {
        this.project.script.setup(this.scriptAPI);
      } catch (s) {
        console.error("script.js setup() threw:", s), this.primaryView.runtimeErrorOverlay.showError("setup", s);
      }
    !e.skipUniformsPanel && this.project.uniforms && Object.values(this.project.uniforms).some((s) => se(s)) && (this.uniformsPanel = new gt({
      container: this.container,
      uniforms: this.project.uniforms,
      onChange: (s, r) => {
        this.setUniformValue(s, r);
      }
    })), this.setupGlobalShortcuts(), this.project.controls && this.setupKeyboardShortcuts();
  }
  // ===========================================================================
  // Multi-View Helpers
  // ===========================================================================
  /**
   * Create a single-view ShaderProject from a MultiViewProject + ViewEntry.
   * Each view gets a fullscreen layout with no controls (App manages controls).
   */
  createViewProject(e, t) {
    return {
      mode: e.mode,
      root: e.root,
      meta: {
        ...e.meta,
        title: `${e.meta.title} - ${t.name}`
      },
      layout: "fullscreen",
      theme: e.theme,
      controls: !1,
      startPaused: e.startPaused,
      pixelRatio: e.pixelRatio,
      commonSource: e.commonSource,
      passes: t.passes,
      textures: e.textures,
      uniforms: e.uniforms,
      script: null
      // Script handled by App, not individual views
    };
  }
  // ===========================================================================
  // Script API
  // ===========================================================================
  initScriptAPI() {
    const e = this;
    this.scriptAPI = {
      setUniformValue: (t, n) => e.setUniformValue(t, n),
      getUniformValue: (t) => e.primaryView.engine.getUniformValue(t),
      updateTexture: (t, n, s, r) => e.primaryView.engine.updateTexture(t, n, s, r),
      readPixels: (t, n, s, r, o) => e.primaryView.engine.readPixels(t, n, s, r, o),
      get width() {
        return e.primaryView.engine.width;
      },
      get height() {
        return e.primaryView.engine.height;
      },
      setOverlay: (t, n, s) => {
        const r = s ? e.views.get(s) : e.primaryView;
        r == null || r.setOverlay(t, n);
      },
      // Multi-view extensions (undefined for single-view)
      getCrossViewState: e.isMultiView ? (t) => e.getCrossViewState(t) : void 0,
      viewNames: e.isMultiView ? e.project.views.map((t) => t.name) : void 0
    };
  }
  /**
   * Run script onFrame hook with error tracking.
   * Called from animate() with error tracking.
   */
  runScriptOnFrame(e, t) {
    var s;
    if (!this.scriptAPI || !((s = this.project.script) != null && s.onFrame) || this.scriptErrorCount >= M.MAX_SCRIPT_ERRORS)
      return;
    const n = this._lastOnFrameTime !== null ? e - this._lastOnFrameTime : 0;
    try {
      this.project.script.onFrame(this.scriptAPI, e, n, t), this.scriptErrorCount = 0;
    } catch (r) {
      this.scriptErrorCount++, console.error(`script.js onFrame() threw (${this.scriptErrorCount}/${M.MAX_SCRIPT_ERRORS}):`, r), this.primaryView.runtimeErrorOverlay.showError("onFrame", r), this.scriptErrorCount >= M.MAX_SCRIPT_ERRORS && (console.warn("script.js onFrame() disabled after too many errors"), this.primaryView.runtimeErrorOverlay.showDisabled());
    }
    this._lastOnFrameTime = e;
  }
  // ===========================================================================
  // Public API
  // ===========================================================================
  hasErrors() {
    for (const e of this.views.values())
      if (e.hasErrors())
        return !0;
    return !1;
  }
  getEngine() {
    return this.primaryView.engine;
  }
  /**
   * Set a uniform value across all views.
   */
  setUniformValue(e, t) {
    for (const n of this.views.values())
      n.engine.setUniformValue(e, t);
  }
  /**
   * Get a uniform value from the primary view.
   */
  getUniformValue(e) {
    return this.primaryView.engine.getUniformValue(e);
  }
  /**
   * Start the animation loop.
   */
  start() {
    this.animationId === null && (this.startTime = performance.now() / 1e3, this.animationId = requestAnimationFrame(this.animate));
  }
  stop() {
    this.animationId !== null && (cancelAnimationFrame(this.animationId), this.animationId = null);
  }
  // ===========================================================================
  // Cross-View State
  // ===========================================================================
  getMouseState() {
    return this.primaryView.getMouseState();
  }
  getResolution() {
    return this.primaryView.getResolution();
  }
  getMousePressed() {
    return this.primaryView.getMousePressed();
  }
  /**
   * Get cross-view state for a named view.
   */
  getCrossViewState(e) {
    const t = this.views.get(e);
    if (t)
      return {
        mouse: t.getMouseState(),
        resolution: t.getResolution(),
        mousePressed: t.getMousePressed()
      };
  }
  setOverlay(e, t) {
    this.primaryView.setOverlay(e, t);
  }
  // ===========================================================================
  // Playback Control
  // ===========================================================================
  togglePlayPause() {
    var e;
    this.isPaused ? this.startTime = performance.now() / 1e3 - this.pausedElapsedTime : this.pausedElapsedTime = performance.now() / 1e3 - this.startTime, this.isPaused = !this.isPaused, (e = this.playbackControls) == null || e.setPaused(this.isPaused);
  }
  getPaused() {
    return this.isPaused;
  }
  reset() {
    this.startTime = performance.now() / 1e3, this.pausedElapsedTime = 0, this._lastOnFrameTime = null, this.statsPanel.reset();
    for (const e of this.views.values())
      e.engine.reset();
  }
  // ===========================================================================
  // Screenshots & Recording
  // ===========================================================================
  screenshot() {
    const e = this.project.root.split("/").pop() || "shader", t = /* @__PURE__ */ new Date(), n = t.getFullYear().toString() + (t.getMonth() + 1).toString().padStart(2, "0") + t.getDate().toString().padStart(2, "0") + "-" + t.getHours().toString().padStart(2, "0") + t.getMinutes().toString().padStart(2, "0") + t.getSeconds().toString().padStart(2, "0"), s = `shadertoy-${e}-${n}.png`;
    this.primaryView.canvas.toBlob((r) => {
      if (!r) {
        console.error("Failed to create screenshot blob");
        return;
      }
      const o = URL.createObjectURL(r), a = document.createElement("a");
      a.href = o, a.download = s, a.click(), URL.revokeObjectURL(o), console.log(`Screenshot saved: ${s}`);
    }, "image/png");
  }
  toggleRecording() {
    this.recorder.toggle(this.isPaused, () => this.togglePlayPause());
  }
  // ===========================================================================
  // HTML Export
  // ===========================================================================
  exportHTML() {
    if (this.isMultiView) {
      console.warn("HTML export is not supported for multi-view projects");
      return;
    }
    Et(this.project, this.primaryView.engine);
  }
  openRenderDialog() {
    new wt(this.container, this.primaryView.canvas.width, this.primaryView.canvas.height, (t) => this.renderOffline(t)).open();
  }
  renderOffline(e) {
    let t = !1;
    const n = () => {
      t = !0;
    };
    return (async () => {
      var u, d;
      const r = this.primaryView.canvas, o = this.primaryView.engine, a = r.width, c = r.height, l = this.isPaused;
      try {
        this.isPaused = !0, r.width = e.width, r.height = e.height, o.resize(e.width, e.height), o.reset(), this.scriptAPI && ((u = this.project.script) != null && u.setup) && this.project.script.setup(this.scriptAPI);
        const E = Math.ceil(e.fps * e.duration);
        e.format === "video" ? await this.renderVideoFrames(E, e.fps, () => t, e.onProgress) : await this.renderPngFrames(E, e.fps, () => t, e.onProgress), t || e.onComplete();
      } catch (E) {
        t || e.onError(E instanceof Error ? E : new Error(String(E)));
      } finally {
        if (r.width = a, r.height = c, o.resize(a, c), o.reset(), this.scriptAPI && ((d = this.project.script) != null && d.setup))
          try {
            this.project.script.setup(this.scriptAPI);
          } catch {
          }
        this.isPaused = l;
      }
    })(), n;
  }
  async renderPngFrames(e, t, n, s) {
    let r = null;
    if ("showDirectoryPicker" in window)
      try {
        r = await window.showDirectoryPicker({ mode: "readwrite" });
      } catch {
      }
    for (let o = 0; o < e; o++) {
      if (n())
        return;
      this.stepForRender(o, t), this.primaryView.presentToScreen();
      const a = await new Promise((l, u) => {
        this.primaryView.canvas.toBlob((d) => d ? l(d) : u(new Error("Failed to capture frame")), "image/png");
      }), c = `frame_${String(o).padStart(5, "0")}.png`;
      if (r) {
        const u = await (await r.getFileHandle(c, { create: !0 })).createWritable();
        await u.write(a), await u.close();
      } else {
        const l = URL.createObjectURL(a), u = document.createElement("a");
        u.href = l, u.download = c, u.click(), URL.revokeObjectURL(l);
      }
      s(o + 1, e), o % 10 === 0 && await new Promise((l) => setTimeout(l, 0));
    }
  }
  async renderVideoFrames(e, t, n, s) {
    const r = this.primaryView.canvas, o = document.createElement("canvas");
    o.width = r.width, o.height = r.height;
    const a = o.getContext("2d"), c = o.captureStream(0), l = new MediaRecorder(c, {
      mimeType: "video/webm;codecs=vp9",
      videoBitsPerSecond: 8e6
    }), u = [];
    l.ondataavailable = (T) => {
      T.data.size > 0 && u.push(T.data);
    };
    const d = new Promise((T) => {
      l.onstop = () => T();
    });
    l.start();
    for (let T = 0; T < e; T++) {
      if (n()) {
        l.stop(), await d;
        return;
      }
      this.stepForRender(T, t), this.primaryView.presentToScreen(), a.drawImage(r, 0, 0);
      const w = c.getVideoTracks()[0];
      w != null && w.requestFrame && w.requestFrame(), s(T + 1, e), T % 10 === 0 && await new Promise((_) => setTimeout(_, 0));
    }
    l.stop(), await d;
    const E = new Blob(u, { type: "video/webm" }), y = URL.createObjectURL(E), b = document.createElement("a");
    b.href = y, b.download = `render_${r.width}x${r.height}_${t}fps.webm`, b.click(), URL.revokeObjectURL(y);
  }
  stepForRender(e, t) {
    var r;
    const n = e / t, s = 1 / t;
    if (this.scriptAPI && ((r = this.project.script) != null && r.onFrame))
      try {
        this.project.script.onFrame(this.scriptAPI, n, s, e);
      } catch {
      }
    this.primaryView.engine.step(n, [0, 0, 0, 0], !1);
  }
  // ===========================================================================
  // Keyboard Shortcuts
  // ===========================================================================
  static isTextInput(e) {
    const t = e.target;
    if (!t)
      return !1;
    const n = t.tagName;
    return n === "INPUT" || n === "TEXTAREA" || t.isContentEditable;
  }
  setupGlobalShortcuts() {
    this.globalKeyHandler = (e) => {
      M.isTextInput(e) || e.code === "KeyS" && !e.repeat && (e.preventDefault(), this.screenshot());
    }, document.addEventListener("keydown", this.globalKeyHandler);
  }
  setupKeyboardShortcuts() {
    this.controlsKeyHandler = (e) => {
      M.isTextInput(e) || (e.code === "Space" && !e.repeat && (e.preventDefault(), this.togglePlayPause()), e.code === "KeyR" && !e.repeat && (e.preventDefault(), this.reset()));
    }, document.addEventListener("keydown", this.controlsKeyHandler);
  }
  // ===========================================================================
  // Lifecycle
  // ===========================================================================
  dispose() {
    var e, t;
    this.disposed = !0, this.stop();
    for (const n of this.views.values())
      n.dispose();
    this.recorder.dispose(), (e = this.playbackControls) == null || e.dispose(), this.intersectionObserver.disconnect(), this.globalKeyHandler && document.removeEventListener("keydown", this.globalKeyHandler), this.controlsKeyHandler && document.removeEventListener("keydown", this.controlsKeyHandler), (t = this.uniformsPanel) == null || t.destroy(), this.statsPanel.dispose();
  }
}
M.MAX_SCRIPT_ERRORS = 10;
class xt {
  constructor(e) {
    this.panel = null, this.controls = null, this.isOpen = !1, this.isPaused = !1, this.wrapper = e.wrapper, this.opts = e, this.isPaused = e.getPaused(), this.controlsWrapper = document.createElement("div"), this.controlsWrapper.className = "multi-view-controls-wrapper", this.toggleButton = document.createElement("button"), this.toggleButton.className = "multi-view-controls-toggle", this.toggleButton.title = "Toggle Controls", this.toggleButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="4" y1="21" x2="4" y2="14"></line>
        <line x1="4" y1="10" x2="4" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12" y2="3"></line>
        <line x1="20" y1="21" x2="20" y2="16"></line>
        <line x1="20" y1="12" x2="20" y2="3"></line>
        <line x1="1" y1="14" x2="7" y2="14"></line>
        <line x1="9" y1="8" x2="15" y2="8"></line>
        <line x1="17" y1="16" x2="23" y2="16"></line>
      </svg>
    `, this.toggleButton.addEventListener("click", () => this.toggle()), this.controlsWrapper.appendChild(this.toggleButton), this.createPanel(e.uniforms), this.wrapper.appendChild(this.controlsWrapper);
  }
  createPanel(e) {
    this.panel = document.createElement("div"), this.panel.className = "multi-view-controls-panel";
    const t = document.createElement("div");
    t.className = "multi-view-controls-header";
    const n = document.createElement("span");
    n.textContent = "Controls", t.appendChild(n);
    const s = document.createElement("button");
    s.className = "multi-view-controls-close", s.innerHTML = "&times;", s.title = "Close", s.addEventListener("click", () => this.toggle()), t.appendChild(s), this.panel.appendChild(t);
    const r = document.createElement("div");
    r.className = "controls-section playback-controls";
    const o = document.createElement("button");
    o.className = "control-btn play-pause-btn", o.title = "Play/Pause", this.updatePlayPauseIcon(o), o.addEventListener("click", () => {
      this.opts.onTogglePlayPause(), this.isPaused = this.opts.getPaused(), this.updatePlayPauseIcon(o);
    }), r.appendChild(o);
    const a = document.createElement("button");
    if (a.className = "control-btn reset-btn", a.title = "Reset", a.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
      </svg>
    `, a.addEventListener("click", () => {
      this.opts.onReset();
    }), r.appendChild(a), this.panel.appendChild(r), e && Object.values(e).some((c) => se(c))) {
      const c = document.createElement("div");
      c.className = "controls-section uniforms-section";
      const l = document.createElement("div");
      l.className = "section-label", l.textContent = "Uniforms", c.appendChild(l);
      const u = document.createElement("div");
      u.className = "uniforms-container", this.controls = new Ae({
        container: u,
        uniforms: e,
        onChange: (d, E) => {
          var y, b;
          (b = (y = this.opts).onSetUniformValue) == null || b.call(y, d, E);
        }
      }), c.appendChild(u), this.panel.appendChild(c);
    }
    this.panel.classList.add("closed"), this.controlsWrapper.appendChild(this.panel);
  }
  updatePlayPauseIcon(e) {
    this.isPaused ? e.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      ` : e.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
      `;
  }
  toggle() {
    var e, t;
    this.isOpen = !this.isOpen, this.isOpen ? ((e = this.panel) == null || e.classList.remove("closed"), this.toggleButton.classList.add("hidden")) : ((t = this.panel) == null || t.classList.add("closed"), this.toggleButton.classList.remove("hidden"));
  }
  dispose() {
    var e;
    (e = this.controls) == null || e.destroy(), this.wrapper.removeChild(this.controlsWrapper);
  }
}
class _t {
  constructor(e) {
    this.container = e.container, this.root = document.createElement("div"), this.root.className = "layout-fullscreen", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.root.appendChild(this.canvasContainer), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
}
class Rt {
  constructor(e) {
    this.container = e.container, this.root = document.createElement("div"), this.root.className = "layout-default", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.root.appendChild(this.canvasContainer), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  dispose() {
    this.container.innerHTML = "";
  }
}
class Ct {
  constructor(e) {
    this.editorPanel = null, this.recompileHandler = null, this._disposed = !1, this.container = e.container, this.project = e.project, this.root = document.createElement("div"), this.root.className = "layout-split", this.canvasContainer = document.createElement("div"), this.canvasContainer.className = "canvas-container", this.codePanel = document.createElement("div"), this.codePanel.className = "code-panel", this.buildEditorPanel(), this.root.appendChild(this.canvasContainer), this.root.appendChild(this.codePanel), this.container.appendChild(this.root);
  }
  getCanvasContainer() {
    return this.canvasContainer;
  }
  setRecompileHandler(e) {
    this.recompileHandler = e, this.editorPanel && this.editorPanel.setRecompileHandler(e);
  }
  setUniformHandler(e) {
  }
  dispose() {
    this._disposed = !0, this.editorPanel && (this.editorPanel.dispose(), this.editorPanel = null), this.container.innerHTML = "";
  }
  /**
   * Build editor panel (dynamically loaded).
   */
  async buildEditorPanel() {
    try {
      const { EditorPanel: e } = await Promise.resolve().then(() => cn);
      if (this._disposed)
        return;
      this.editorPanel = new e(this.codePanel, this.project), this.recompileHandler && this.editorPanel.setRecompileHandler(this.recompileHandler);
    } catch (e) {
      console.error("Failed to load editor panel:", e);
    }
  }
}
class St {
  constructor(e) {
    this.editorInstance = null, this.recompileHandler = null, this.modifiedSources = /* @__PURE__ */ new Map(), this.tabs = [], this.activeTabIndex = 0, this.keydownHandler = null, this.container = e.container, this.project = e.project, this.root = document.createElement("div"), this.root.className = "layout-tabbed";
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
    this.keydownHandler && (document.removeEventListener("keydown", this.keydownHandler), this.keydownHandler = null), this.editorInstance && (this.editorInstance.destroy(), this.editorInstance = null), this.container.innerHTML = "";
  }
  setupKeyboardShortcut() {
    this.keydownHandler = (e) => {
      (e.ctrlKey || e.metaKey) && e.key === "Enter" && this.tabs[this.activeTabIndex].kind === "code" && (e.preventDefault(), this.recompile());
    }, document.addEventListener("keydown", this.keydownHandler);
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
    this.errorDisplay && (this.errorDisplay.textContent = e, this.errorDisplay.style.display = "block");
  }
  hideError() {
    this.errorDisplay && (this.errorDisplay.style.display = "none");
  }
  async copyToClipboard() {
    const e = this.tabs[this.activeTabIndex];
    if (e.kind !== "code")
      return;
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
    for (const o of n) {
      const a = this.project.passes[o];
      a && this.tabs.push({
        kind: "code",
        name: `${o.toLowerCase()}.glsl`,
        passName: o,
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
    for (const o of this.project.textures)
      this.tabs.push({
        kind: "image",
        name: o.filename || o.name,
        url: o.source
      });
    const r = async (o) => {
      this.saveCurrentEditorContent();
      const a = this.tabs[o];
      if (this.activeTabIndex = o, t.querySelectorAll(".tabbed-tab-button").forEach((c, l) => {
        c.classList.toggle("active", l === o);
      }), this.canvasContainer.style.visibility = "hidden", this.imageViewer.style.visibility = "hidden", this.editorContainer.style.visibility = "hidden", this.buttonContainer.style.display = "none", this.editorInstance && (this.editorInstance.destroy(), this.editorInstance = null), a.kind === "shader")
        this.canvasContainer.style.visibility = "visible";
      else if (a.kind === "code") {
        this.editorContainer.style.visibility = "visible", this.buttonContainer.style.display = "flex";
        const c = this.modifiedSources.get(a.passName) ?? a.source;
        this.editorContainer.innerHTML = "";
        try {
          const { createEditor: l } = await Promise.resolve().then(() => Oe);
          this.editorInstance = l(this.editorContainer, c, (u) => {
            this.modifiedSources.set(a.passName, u);
          });
        } catch (l) {
          console.error("Failed to load editor:", l);
          const u = document.createElement("textarea");
          u.className = "tabbed-fallback-textarea", u.value = c, u.addEventListener("input", () => {
            this.modifiedSources.set(a.passName, u.value);
          }), this.editorContainer.appendChild(u);
        }
      } else {
        this.imageViewer.style.visibility = "visible";
        const c = document.createElement("img");
        c.src = a.url, c.alt = a.name, this.imageViewer.innerHTML = "", this.imageViewer.appendChild(c);
      }
    };
    return this.tabs.forEach((o, a) => {
      const c = document.createElement("button");
      c.className = "tabbed-tab-button", o.kind === "shader" ? c.classList.add("shader-tab") : o.kind === "image" && c.classList.add("image-tab"), c.textContent = o.name, a === 0 && c.classList.add("active"), c.addEventListener("click", () => r(a)), t.appendChild(c);
    }), e.appendChild(t), e.appendChild(this.buttonContainer), e;
  }
}
class Te {
  constructor(e) {
    this.canvasContainers = /* @__PURE__ */ new Map(), this.container = e.container;
    const t = e.viewNames.length;
    this.wrapper = document.createElement("div"), this.wrapper.className = "layout-multi-view layout-grid-view", this.wrapper.dataset.viewCount = String(t);
    for (const s of e.viewNames) {
      const r = document.createElement("div");
      r.className = "multi-view-canvas", r.setAttribute("data-view-name", s);
      const o = document.createElement("div");
      o.className = "multi-view-label", o.textContent = s, r.appendChild(o), this.canvasContainers.set(s, r), this.wrapper.appendChild(r);
    }
    this.container.appendChild(this.wrapper), this.resizeObserver = new ResizeObserver((s) => {
      for (const r of s) {
        const { width: o, height: a } = r.contentRect;
        this.updateOrientation(o, a);
      }
    }), this.resizeObserver.observe(this.wrapper);
    const n = this.wrapper.getBoundingClientRect();
    this.updateOrientation(n.width, n.height);
  }
  updateOrientation(e, t) {
    const n = e > t;
    this.wrapper.classList.toggle("grid-horizontal", n), this.wrapper.classList.toggle("grid-vertical", !n);
  }
  getCanvasContainers() {
    return this.canvasContainers;
  }
  getWrapperElement() {
    return this.wrapper;
  }
  dispose() {
    this.resizeObserver.disconnect(), this.container.innerHTML = "";
  }
}
class Ft {
  constructor(e) {
    if (this.canvasContainers = /* @__PURE__ */ new Map(), this.insetContainer = null, this.minimizeBtn = null, this.isMinimized = !1, this.toggleMinimize = () => {
      this.isMinimized = !this.isMinimized, this.insetContainer && this.insetContainer.classList.toggle("minimized", this.isMinimized), this.minimizeBtn && (this.isMinimized ? (this.minimizeBtn.innerHTML = "&#x25A1;", this.minimizeBtn.title = "Restore", this.minimizeBtn.style.display = "none") : (this.minimizeBtn.innerHTML = "&#x2212;", this.minimizeBtn.title = "Minimize", this.minimizeBtn.style.display = ""));
    }, this.container = e.container, e.viewNames.length < 2)
      throw new Error("InsetViewLayout requires at least 2 views");
    this.wrapper = document.createElement("div"), this.wrapper.className = "layout-multi-view layout-inset-view";
    const t = e.viewNames[0], n = document.createElement("div");
    n.className = "multi-view-canvas inset-main", n.setAttribute("data-view-name", t), this.canvasContainers.set(t, n), this.wrapper.appendChild(n);
    const s = e.viewNames[1];
    this.insetContainer = document.createElement("div"), this.insetContainer.className = "multi-view-canvas inset-overlay", this.insetContainer.setAttribute("data-view-name", s), this.canvasContainers.set(s, this.insetContainer), this.minimizeBtn = document.createElement("button"), this.minimizeBtn.className = "inset-minimize-btn", this.minimizeBtn.innerHTML = "&#x2212;", this.minimizeBtn.title = "Minimize", this.minimizeBtn.addEventListener("click", this.toggleMinimize), this.insetContainer.appendChild(this.minimizeBtn), this.wrapper.appendChild(this.insetContainer), this.insetContainer.addEventListener("click", (r) => {
      this.isMinimized && r.target === this.insetContainer && this.toggleMinimize();
    }), this.container.appendChild(this.wrapper);
  }
  getCanvasContainers() {
    return this.canvasContainers;
  }
  getWrapperElement() {
    return this.wrapper;
  }
  dispose() {
    this.minimizeBtn && this.minimizeBtn.removeEventListener("click", this.toggleMinimize), this.container.innerHTML = "";
  }
}
function oe(i) {
  document.documentElement.setAttribute("data-theme", i);
}
function At(i, e) {
  switch (oe(e.project.theme), i) {
    case "fullscreen":
      return new _t(e);
    case "default":
      return new Rt(e);
    case "split":
      return new Ct(e);
    case "tabbed":
      return new St(e);
  }
}
function Lt(i, e) {
  switch (oe(e.project.theme), i) {
    case "split":
    case "quad":
    case "grid":
      return new Te(e);
    case "inset":
      return new Ft(e);
    default:
      return new Te(e);
  }
}
async function Dt(i, e) {
  const { project: t, styled: n = !0, pixelRatio: s = window.devicePixelRatio } = e;
  return n || i.classList.add("unstyled"), oe(t.theme), Ce(t) ? Mt(i, t, s) : Pt(i, t, s);
}
function Pt(i, e, t) {
  const n = At(e.layout, {
    container: i,
    project: e
  }), s = new M({
    container: n.getCanvasContainer(),
    project: e,
    pixelRatio: t,
    skipUniformsPanel: !1,
    skipPlaybackControls: !1
  });
  return n.setRecompileHandler && n.setRecompileHandler((r, o) => {
    const a = s.getEngine();
    if (!a)
      return { success: !1, error: "Engine not initialized" };
    if (r === "common") {
      const c = a.recompileCommon(o);
      if (c.success)
        return { success: !0 };
      const l = c.errors[0];
      return {
        success: !1,
        error: l ? `${l.passName}: ${l.error}` : "Unknown error"
      };
    }
    return a.recompilePass(r, o);
  }), n.setUniformHandler && n.setUniformHandler((r, o) => {
    const a = s.getEngine();
    a && a.setUniformValue(r, o);
  }), s.hasErrors() || s.start(), {
    app: s,
    destroy: () => {
      s.dispose(), n.dispose();
    }
  };
}
function Mt(i, e, t) {
  const n = e.views.map((a) => a.name), s = Lt(e.viewLayout, {
    container: i,
    project: e,
    viewNames: n
  }), r = new M({
    container: s.getWrapperElement(),
    project: e,
    pixelRatio: t,
    viewContainers: s.getCanvasContainers(),
    skipPlaybackControls: !0,
    skipUniformsPanel: !0
  }), o = new xt({
    wrapper: s.getWrapperElement(),
    onTogglePlayPause: () => r.togglePlayPause(),
    onReset: () => r.reset(),
    getPaused: () => r.getPaused(),
    onSetUniformValue: (a, c) => r.setUniformValue(a, c),
    uniforms: e.uniforms
  });
  return r.hasErrors() || r.start(), {
    app: r,
    destroy: () => {
      o.dispose(), r.dispose(), s.dispose();
    }
  };
}
function ae(i) {
  return i === "Image" || i === "BufferA" || i === "BufferB" || i === "BufferC" || i === "BufferD";
}
function kt(i) {
  switch (i) {
    case "Image":
      return "image.glsl";
    case "BufferA":
      return "bufferA.glsl";
    case "BufferB":
      return "bufferB.glsl";
    case "BufferC":
      return "bufferC.glsl";
    case "BufferD":
      return "bufferD.glsl";
  }
}
function Le(i) {
  return typeof i == "string" ? ae(i) ? { buffer: i } : i === "keyboard" ? { keyboard: !0 } : i === "audio" ? { audio: !0 } : i === "webcam" ? { webcam: !0 } : { texture: i } : i;
}
const ie = ["Image", "BufferA", "BufferB", "BufferC", "BufferD"], Ut = ["BufferA", "BufferB", "BufferC", "BufferD"], De = ["iChannel0", "iChannel1", "iChannel2", "iChannel3"], Bt = "default", Pe = !0, It = "light", Me = /* @__PURE__ */ new Set([
  "iResolution",
  "iTime",
  "iTimeDelta",
  "iFrame",
  "iMouse",
  "iDate",
  "iFrameRate",
  "iChannelResolution",
  "iChannel0",
  "iChannel1",
  "iChannel2",
  "iChannel3",
  "iTouchCount",
  "iTouch0",
  "iTouch1",
  "iTouch2",
  "iPinch",
  "iPinchDelta",
  "iPinchCenter"
]), Nt = /^[a-zA-Z_][a-zA-Z0-9_]*$/, $t = /* @__PURE__ */ new Set([
  "attribute",
  "const",
  "uniform",
  "varying",
  "break",
  "continue",
  "do",
  "for",
  "while",
  "if",
  "else",
  "in",
  "out",
  "inout",
  "float",
  "int",
  "void",
  "bool",
  "true",
  "false",
  "discard",
  "return",
  "mat2",
  "mat3",
  "mat4",
  "vec2",
  "vec3",
  "vec4",
  "ivec2",
  "ivec3",
  "ivec4",
  "bvec2",
  "bvec3",
  "bvec4",
  "sampler2D",
  "samplerCube",
  "struct",
  "precision",
  "highp",
  "mediump",
  "lowp",
  "layout",
  "centroid",
  "flat",
  "smooth",
  "noperspective",
  "switch",
  "case",
  "default"
]);
function $(i) {
  return Nt.test(i) && !$t.has(i);
}
const be = /* @__PURE__ */ new Set(["fullscreen", "default", "split", "tabbed"]), q = /* @__PURE__ */ new Set(["light", "dark", "system"]), Ot = /* @__PURE__ */ new Set([
  "mode",
  "title",
  "author",
  "description",
  "layout",
  "theme",
  "controls",
  "common",
  "startPaused",
  "pixelRatio",
  "uniforms",
  "buffers",
  "textures",
  "Image",
  "BufferA",
  "BufferB",
  "BufferC",
  "BufferD",
  "views"
  // multi-view projects
]), Ht = /* @__PURE__ */ new Set(["source", "iChannel0", "iChannel1", "iChannel2", "iChannel3"]), ye = /* @__PURE__ */ new Set(["keyboard", "audio", "webcam"]);
function Vt(i, e) {
  const t = [], n = [];
  for (const r of Object.keys(i))
    Ot.has(r) || t.push(`Unknown config key '${r}'`);
  if (i.layout !== void 0 && !be.has(i.layout) && n.push(`Invalid layout '${i.layout}'. Expected one of: ${[...be].join(", ")}`), i.theme !== void 0 && !q.has(i.theme) && n.push(`Invalid theme '${i.theme}'. Expected one of: ${[...q].join(", ")}`), i.uniforms && typeof i.uniforms == "object")
    for (const r of Object.keys(i.uniforms))
      Me.has(r) && n.push(`Uniform name '${r}' is reserved (built-in uniform)`), $(r) || n.push(`Uniform name '${r}' is not a valid GLSL identifier`);
  const s = /* @__PURE__ */ new Set();
  if (i.buffers) {
    const r = Object.keys(i.buffers);
    for (const o of r) {
      if (typeof o != "string") {
        n.push(`Buffer name must be a string, got ${typeof o}`);
        continue;
      }
      $(o) || n.push(`Buffer name '${o}' is not a valid GLSL identifier`), s.add(o);
    }
  }
  if (i.textures && typeof i.textures == "object")
    for (const [r, o] of Object.entries(i.textures))
      $(r) || n.push(`Texture name '${r}' is not a valid GLSL identifier`), s.has(r) && n.push(`Texture name '${r}' collides with a buffer name`), typeof o != "string" ? n.push(`Texture source for '${r}' must be a string`) : !ye.has(o) && !/\.\w+$/.test(o) && !$(o) && n.push(`Invalid texture source '${o}' for '${r}'. Expected a file path with extension, a script texture name, or one of: ${[...ye].join(", ")}`);
  for (const r of ie) {
    const o = i[r];
    if (!(!o || typeof o != "object")) {
      for (const a of Object.keys(o))
        Ht.has(a) || t.push(`Unknown key '${a}' in pass '${r}'`);
      for (const a of De) {
        const c = o[a];
        c && typeof c == "string" && ae(c) && c !== "Image" && !i[c] && t.push(`${r}.${a} references '${c}' but no ${c} pass is configured`);
      }
    }
  }
  for (const r of t)
    console.warn(`[config] ${e}: ${r}`);
  if (n.length > 0)
    throw new Error(`Config validation failed for '${e}':
${n.map((r) => `  - ${r}`).join(`
`)}`);
}
const we = /* @__PURE__ */ new Set(["split", "quad", "grid", "inset"]);
function Xt(i, e) {
  const t = [];
  if (!Array.isArray(i.views) || i.views.length < 2)
    t.push("'views' must be an array with at least 2 entries");
  else {
    for (const s of i.views)
      (typeof s != "string" || !s) && t.push(`Each view name must be a non-empty string, got '${s}'`);
    new Set(i.views).size !== i.views.length && t.push("Duplicate view names found");
  }
  if (i.layout !== void 0 && !we.has(i.layout) && t.push(`Invalid multi-view layout '${i.layout}'. Expected one of: ${[...we].join(", ")}`), i.theme !== void 0 && !q.has(i.theme) && t.push(`Invalid theme '${i.theme}'. Expected one of: ${[...q].join(", ")}`), i.uniforms && typeof i.uniforms == "object")
    for (const n of Object.keys(i.uniforms))
      Me.has(n) && t.push(`Uniform name '${n}' is reserved (built-in uniform)`), $(n) || t.push(`Uniform name '${n}' is not a valid GLSL identifier`);
  if (t.length > 0)
    throw new Error(`Multi-view config validation failed for '${e}':
${t.map((n) => `  - ${n}`).join(`
`)}`);
}
function Z(i) {
  return {
    mode: i.mode,
    root: i.root,
    meta: {
      title: i.title ?? i.root.split("/").pop() ?? "Untitled",
      author: i.author ?? null,
      description: i.description ?? null
    },
    layout: i.layout ?? Bt,
    theme: i.theme ?? It,
    controls: i.controls ?? Pe,
    startPaused: i.startPaused ?? !1,
    pixelRatio: i.pixelRatio ?? null,
    commonSource: i.commonSource,
    passes: i.passes,
    textures: i.textures ?? [],
    uniforms: i.uniforms ?? {},
    script: i.script ?? null
  };
}
const xe = /* @__PURE__ */ new Set(["float", "int", "bool", "vec2", "vec3", "vec4"]), _e = /* @__PURE__ */ new Set(["float", "vec2", "vec3", "vec4", "mat3", "mat4"]), jt = {
  vec2: 2,
  vec3: 3,
  vec4: 4
};
function Yt(i, e) {
  for (const [t, n] of Object.entries(i)) {
    const s = `Uniform '${t}' in '${e}'`;
    if (!n.type)
      throw new Error(`${s}: missing 'type' field`);
    if (A(n)) {
      if (!_e.has(n.type))
        throw new Error(`${s}: invalid array type '${n.type}'. Expected one of: ${[..._e].join(", ")}`);
      if (typeof n.count != "number" || n.count < 1 || !Number.isInteger(n.count))
        throw new Error(`${s}: 'count' must be a positive integer, got ${n.count}`);
      continue;
    }
    const r = n;
    if (!xe.has(r.type))
      throw new Error(`${s}: invalid type '${r.type}'. Expected one of: ${[...xe].join(", ")}`);
    switch (r.type) {
      case "float":
      case "int":
        if (typeof r.value != "number")
          throw new Error(`${s}: 'value' must be a number for type '${r.type}', got ${typeof r.value}`);
        if (r.min !== void 0 && typeof r.min != "number")
          throw new Error(`${s}: 'min' must be a number`);
        if (r.max !== void 0 && typeof r.max != "number")
          throw new Error(`${s}: 'max' must be a number`);
        if (r.step !== void 0 && typeof r.step != "number")
          throw new Error(`${s}: 'step' must be a number`);
        break;
      case "bool":
        if (typeof r.value != "boolean")
          throw new Error(`${s}: 'value' must be a boolean for type 'bool', got ${typeof r.value}`);
        break;
      case "vec2":
      case "vec3":
      case "vec4": {
        const o = jt[r.type];
        if (!Array.isArray(r.value) || r.value.length !== o)
          throw new Error(`${s}: 'value' must be an array of ${o} numbers for type '${r.type}'`);
        if (r.value.some((c) => typeof c != "number"))
          throw new Error(`${s}: all components of 'value' must be numbers`);
        const a = r;
        for (const c of ["min", "max", "step"]) {
          const l = a[c];
          if (l !== void 0 && (!Array.isArray(l) || l.length !== o))
            throw new Error(`${s}: '${c}' must be an array of ${o} numbers for type '${r.type}'`);
        }
        break;
      }
    }
  }
}
async function ke(i, e, t) {
  if (t) {
    const s = i.joinPath(e, t);
    if (!await i.exists(s))
      throw new Error(`Common GLSL file '${t}' not found in '${e}'.`);
    return await i.readText(s);
  }
  const n = i.joinPath(e, "common.glsl");
  return await i.exists(n) ? await i.readText(n) : null;
}
class Ue {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  register(e, t = "linear", n = "repeat", s) {
    const r = `${e}|${t}|${n}`, o = this.map.get(r);
    if (o)
      return o.name;
    const a = `tex${this.map.size}`;
    return this.map.set(r, { name: a, filename: s, source: e, filter: t, wrap: n }), a;
  }
  toArray() {
    return Array.from(this.map.values());
  }
}
function Kt(i, e, t, n, s, r) {
  if ("buffer" in i) {
    const o = i.buffer;
    if (!ae(o))
      throw new Error(`Invalid buffer name '${o}' for ${t} in pass '${e}' at '${n}'.`);
    return { kind: "buffer", buffer: o, current: !!i.current };
  }
  if ("texture" in i)
    return { kind: "texture", name: (r == null ? void 0 : r.get(i.texture)) ?? s.register(i.texture, i.filter, i.wrap), cubemap: i.type === "cubemap" };
  if ("keyboard" in i)
    return { kind: "keyboard" };
  if ("audio" in i)
    return { kind: "audio" };
  if ("webcam" in i)
    return { kind: "webcam" };
  if ("video" in i)
    return { kind: "video", src: i.video };
  if ("script" in i)
    return { kind: "script", name: i.script };
  throw new Error(`Invalid channel object for ${t} in pass '${e}' at '${n}'.`);
}
function W(i, e, t, n, s, r) {
  if (!i)
    return { kind: "none" };
  const o = Le(i);
  return o ? Kt(o, e, t, n, s, r) : { kind: "none" };
}
async function zt(i, e, t) {
  let n = t == null ? void 0 : t.config;
  if (n === void 0) {
    const s = i.joinPath(e, "config.json");
    if (await i.exists(s)) {
      const r = await i.readText(s);
      try {
        n = JSON.parse(r);
      } catch (o) {
        throw new Error(`Invalid JSON in config.json at '${e}': ${(o == null ? void 0 : o.message) ?? String(o)}`);
      }
    }
  }
  return n ? (Vt(n, e), n.mode === "shadertoy" ? Wt(i, e, n, t) : qt(i, e, n, t)) : Gt(i, e, t);
}
async function Gt(i, e, t) {
  const n = i.joinPath(e, "image.glsl");
  if (!await i.exists(n))
    throw new Error(`Single-pass project at '${e}' requires 'image.glsl'.`);
  const s = await i.listGlslFiles(e);
  if (s.length > 0 && s.filter((l) => l !== "image.glsl").length > 0)
    throw new Error(`Project at '${e}' contains multiple GLSL files (${s.join(", ")}) but no 'config.json'. Add a config file to use multiple passes.`);
  if (await i.hasFiles(i.joinPath(e, "textures")))
    throw new Error(`Project at '${e}' uses textures (in 'textures/' folder) but has no 'config.json'. Add a config file to define texture bindings.`);
  const o = await i.readText(n);
  return Z({
    mode: "standard",
    root: e,
    commonSource: null,
    passes: {
      Image: { name: "Image", glslSource: o, channels: [{ kind: "none" }, { kind: "none" }, { kind: "none" }, { kind: "none" }] }
    },
    script: t == null ? void 0 : t.script
  });
}
async function Wt(i, e, t, n) {
  const s = {
    Image: t.Image,
    BufferA: t.BufferA,
    BufferB: t.BufferB,
    BufferC: t.BufferC,
    BufferD: t.BufferD
  };
  s.Image || s.BufferA || s.BufferB || s.BufferC || s.BufferD || (s.Image = {});
  const o = await ke(i, e, t.common), a = new Ue(), c = /* @__PURE__ */ new Map();
  if (n != null && n.textureUrlResolver)
    for (const u of ie) {
      const d = s[u];
      if (d)
        for (const E of De) {
          const y = d[E];
          if (!y)
            continue;
          const b = Le(y);
          if (b && "texture" in b && !c.has(b.texture)) {
            const T = await n.textureUrlResolver(b.texture), w = b.texture.split("/").pop(), _ = a.register(T, b.filter, b.wrap, w);
            c.set(b.texture, _);
          }
        }
    }
  const l = {};
  for (const u of ie) {
    const d = s[u];
    if (!d)
      continue;
    const E = d.source ?? kt(u), y = i.joinPath(e, E);
    if (!await i.exists(y))
      throw new Error(`Source GLSL file for pass '${u}' not found at '${E}' in '${e}'.`);
    const b = await i.readText(y), T = [
      W(d.iChannel0, u, "iChannel0", e, a, c),
      W(d.iChannel1, u, "iChannel1", e, a, c),
      W(d.iChannel2, u, "iChannel2", e, a, c),
      W(d.iChannel3, u, "iChannel3", e, a, c)
    ];
    l[u] = { name: u, glslSource: b, channels: T };
  }
  if (!l.Image)
    throw new Error(`config.json at '${e}' must define an Image pass.`);
  return Z({
    mode: "shadertoy",
    root: e,
    title: t.title,
    author: t.author,
    description: t.description,
    layout: t.layout,
    theme: t.theme,
    controls: t.controls,
    startPaused: t.startPaused,
    pixelRatio: t.pixelRatio,
    commonSource: o,
    passes: l,
    textures: a.toArray(),
    script: n == null ? void 0 : n.script
  });
}
async function qt(i, e, t, n) {
  t.uniforms && Yt(t.uniforms, e);
  const s = await ke(i, e, t.common), r = t.buffers ?? {};
  if (Object.keys(r).length > 0 || t.textures && Object.keys(t.textures).length > 0)
    return Jt(i, e, t, s, n);
  const o = i.joinPath(e, "image.glsl");
  if (!await i.exists(o))
    throw new Error(`Standard mode project at '${e}' requires 'image.glsl'.`);
  const a = await i.readText(o), c = [{ kind: "none" }, { kind: "none" }, { kind: "none" }, { kind: "none" }];
  return Z({
    mode: "standard",
    root: e,
    title: t.title,
    author: t.author,
    description: t.description,
    layout: t.layout,
    theme: t.theme,
    controls: t.controls,
    startPaused: t.startPaused,
    pixelRatio: t.pixelRatio,
    commonSource: s,
    passes: {
      Image: { name: "Image", glslSource: a, channels: c }
    },
    uniforms: t.uniforms,
    script: n == null ? void 0 : n.script
  });
}
const Zt = /* @__PURE__ */ new Set(["keyboard", "audio", "webcam"]);
async function Jt(i, e, t, n, s) {
  const r = t.buffers ?? {}, o = Object.keys(r);
  if (o.length > 4)
    throw new Error(`Standard mode at '${e}' supports max 4 buffers, got ${o.length}: ${o.join(", ")}`);
  const a = /* @__PURE__ */ new Map();
  for (let b = 0; b < o.length; b++)
    a.set(o[b], Ut[b]);
  const c = new Ue(), l = /* @__PURE__ */ new Map();
  for (const [b, T] of a)
    l.set(b, { kind: "buffer", buffer: T, current: !1 });
  for (const [b, T] of Object.entries(t.textures ?? {}))
    if (T === "keyboard")
      l.set(b, { kind: "keyboard" });
    else if (T === "audio")
      l.set(b, { kind: "audio" });
    else if (T === "webcam")
      l.set(b, { kind: "webcam" });
    else if (/\.\w+$/.test(T)) {
      let w;
      s != null && s.textureUrlResolver ? w = await s.textureUrlResolver(T) : w = T;
      const _ = c.register(w);
      l.set(b, { kind: "texture", name: _, cubemap: !1 });
    } else Zt.has(T) || l.set(b, { kind: "script", name: T });
  const u = [{ kind: "none" }, { kind: "none" }, { kind: "none" }, { kind: "none" }], d = i.joinPath(e, "image.glsl");
  if (!await i.exists(d))
    throw new Error(`Standard mode project at '${e}' requires 'image.glsl'.`);
  const y = {
    Image: {
      name: "Image",
      glslSource: await i.readText(d),
      channels: u,
      namedSamplers: new Map(l)
    }
  };
  for (const [b, T] of a) {
    const w = i.joinPath(e, `${b}.glsl`);
    if (!await i.exists(w))
      throw new Error(`Buffer '${b}' requires '${b}.glsl' in '${e}'.`);
    const _ = await i.readText(w);
    y[T] = {
      name: T,
      glslSource: _,
      channels: u,
      namedSamplers: new Map(l)
    };
  }
  return Z({
    mode: "standard",
    root: e,
    title: t.title,
    author: t.author,
    description: t.description,
    layout: t.layout,
    theme: t.theme,
    controls: t.controls,
    startPaused: t.startPaused,
    pixelRatio: t.pixelRatio,
    commonSource: n,
    passes: y,
    textures: c.toArray(),
    uniforms: t.uniforms,
    script: s == null ? void 0 : s.script
  });
}
function U(i, e) {
  if (e in i)
    return e;
  const t = e.toLowerCase();
  for (const n of Object.keys(i))
    if (n.toLowerCase() === t)
      return n;
  return null;
}
async function Be(i, e) {
  if (!e)
    return null;
  const t = `${i}/script.js`, n = U(e, t);
  if (!n)
    return null;
  const s = await e[n](), r = {};
  return typeof s.setup == "function" && (r.setup = s.setup), typeof s.onFrame == "function" && (r.onFrame = s.onFrame), r.setup || r.onFrame ? r : null;
}
function Ie(i, e) {
  return {
    async exists(t) {
      return U(i, t) !== null || U(e, t) !== null;
    },
    async readText(t) {
      const n = U(i, t);
      if (!n)
        throw new Error(`File not found: ${t}`);
      return i[n]();
    },
    async resolveImageUrl(t) {
      const n = U(e, t);
      if (!n)
        throw new Error(`Image not found: ${t}`);
      return e[n]();
    },
    async listGlslFiles() {
      return [];
    },
    async hasFiles() {
      return !1;
    },
    joinPath(...t) {
      return t.map((n, s) => s === 0 ? n : n.replace(/^\/+/, "")).join("/").replace(/\/+/g, "/");
    },
    baseName(t) {
      return t.split("/").pop() || t;
    }
  };
}
function Ne(i) {
  return (i.split("/").pop() || i).split("-").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
}
async function Qt(i, e, t, n, s) {
  const r = i.startsWith("./") ? i : `./${i}`, o = `${r}/config.json`;
  let a;
  if (o in t && (a = await t[o]()), a && Ye(a))
    return Xt(a, r), en(r, a, e, n, s);
  const c = await Be(r, s), l = Ie(e, n), d = await zt(l, r, {
    config: a,
    script: c,
    textureUrlResolver: async (E) => {
      const y = `${r}/${E.replace(/^\.\//, "")}`;
      return l.resolveImageUrl(y);
    }
  });
  return a != null && a.title || (d.meta.title = Ne(r)), d;
}
async function en(i, e, t, n, s) {
  const r = Ie(t, n), o = await Be(i, s);
  let a = null;
  const c = `${i}/common.glsl`;
  U(t, c) && (a = await r.readText(c));
  const l = [], u = [
    { kind: "none" },
    { kind: "none" },
    { kind: "none" },
    { kind: "none" }
  ];
  for (const d of e.views) {
    const E = `${i}/${d}.glsl`, y = `${i}/${d}/image.glsl`;
    let b;
    if (U(t, E))
      b = await r.readText(E);
    else if (U(t, y))
      b = await r.readText(y);
    else
      throw new Error(`Multi-view: No shader found for view "${d}". Expected ${d}.glsl or ${d}/image.glsl`);
    const T = {
      name: "Image",
      glslSource: b,
      channels: u,
      namedSamplers: /* @__PURE__ */ new Map()
    };
    l.push({
      name: d,
      passes: { Image: T }
    });
  }
  return {
    mode: "standard",
    root: i,
    meta: {
      title: e.title ?? Ne(i),
      author: e.author ?? null,
      description: e.description ?? null
    },
    theme: e.theme ?? "light",
    controls: e.controls ?? Pe,
    startPaused: e.startPaused ?? !1,
    pixelRatio: e.pixelRatio ?? null,
    commonSource: a,
    uniforms: e.uniforms ?? {},
    textures: [],
    script: o,
    views: l,
    viewLayout: e.layout ?? "split"
  };
}
const tn = /* @__PURE__ */ Object.assign({ "./notes/3d/05-lighting/shaders/complete/image.glsl": () => Promise.resolve().then(() => hn).then((i) => i.default) }), nn = /* @__PURE__ */ Object.assign({}), sn = /* @__PURE__ */ Object.assign({}), rn = /* @__PURE__ */ Object.assign({});
let ne = null;
async function on() {
  return ne || (ne = await Qt("notes/3d/05-lighting/shaders/complete", tn, nn, sn, rn)), ne;
}
async function mn(i, e = {}) {
  const t = await on();
  return Dt(i, { project: t, ...e });
}
class an {
  constructor(e, t) {
    this.recompileHandler = null, this.tabs = [], this.activeTabIndex = 0, this.editorInstance = null, this.modifiedSources = /* @__PURE__ */ new Map(), this.keydownHandler = null, this.container = e, this.project = t, this.buildTabs(), this.tabBar = document.createElement("div"), this.tabBar.className = "editor-tab-bar", this.buildTabBar(), this.contentArea = document.createElement("div"), this.contentArea.className = "editor-content-area", this.copyButton = document.createElement("button"), this.copyButton.className = "editor-copy-button", this.copyButton.innerHTML = `
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
    this.keydownHandler && (this.container.removeEventListener("keydown", this.keydownHandler), this.keydownHandler = null), this.editorInstance && (this.editorInstance.destroy(), this.editorInstance = null), this.container.innerHTML = "";
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
    }), this.editorInstance && (this.editorInstance.destroy(), this.editorInstance = null), this.contentArea.innerHTML = "", t.kind === "code") {
      this.copyButton.style.display = "", this.recompileButton.style.display = "";
      const n = this.modifiedSources.get(t.passName) ?? t.source, s = document.createElement("div");
      s.className = "editor-prism-container", this.contentArea.appendChild(s);
      try {
        const { createEditor: r } = await Promise.resolve().then(() => Oe);
        this.editorInstance = r(s, n, (o) => {
          this.modifiedSources.set(t.passName, o);
        });
      } catch (r) {
        console.error("Failed to load editor:", r);
        const o = document.createElement("textarea");
        o.className = "editor-fallback-textarea", o.value = n, o.addEventListener("input", () => {
          this.modifiedSources.set(t.passName, o.value);
        }), s.appendChild(o);
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
    if (e.kind !== "code")
      return;
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
    this.keydownHandler = (e) => {
      (e.ctrlKey || e.metaKey) && e.key === "Enter" && (e.preventDefault(), this.recompile());
    }, this.container.addEventListener("keydown", this.keydownHandler);
  }
}
const cn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EditorPanel: an
}, Symbol.toStringTag, { value: "Module" }));
var Re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $e = { exports: {} };
(function(i) {
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
    var s = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, r = 0, o = {}, a = {
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
        encode: function m(h) {
          return h instanceof c ? new c(h.type, m(h.content), h.alias) : Array.isArray(h) ? h.map(m) : h.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
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
        type: function(m) {
          return Object.prototype.toString.call(m).slice(8, -1);
        },
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: function(m) {
          return m.__id || Object.defineProperty(m, "__id", { value: ++r }), m.__id;
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
        clone: function m(h, f) {
          f = f || {};
          var p, g;
          switch (a.util.type(h)) {
            case "Object":
              if (g = a.util.objId(h), f[g])
                return f[g];
              p = /** @type {Record<string, any>} */
              {}, f[g] = p;
              for (var x in h)
                h.hasOwnProperty(x) && (p[x] = m(h[x], f));
              return (
                /** @type {any} */
                p
              );
            case "Array":
              return g = a.util.objId(h), f[g] ? f[g] : (p = [], f[g] = p, /** @type {Array} */
              /** @type {any} */
              h.forEach(function(C, v) {
                p[v] = m(C, f);
              }), /** @type {any} */
              p);
            default:
              return h;
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
        getLanguage: function(m) {
          for (; m; ) {
            var h = s.exec(m.className);
            if (h)
              return h[1].toLowerCase();
            m = m.parentElement;
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
        setLanguage: function(m, h) {
          m.className = m.className.replace(RegExp(s, "gi"), ""), m.classList.add("language-" + h);
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
          } catch (p) {
            var m = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(p.stack) || [])[1];
            if (m) {
              var h = document.getElementsByTagName("script");
              for (var f in h)
                if (h[f].src == m)
                  return h[f];
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
        isActive: function(m, h, f) {
          for (var p = "no-" + h; m; ) {
            var g = m.classList;
            if (g.contains(h))
              return !0;
            if (g.contains(p))
              return !1;
            m = m.parentElement;
          }
          return !!f;
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
        plain: o,
        plaintext: o,
        text: o,
        txt: o,
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
        extend: function(m, h) {
          var f = a.util.clone(a.languages[m]);
          for (var p in h)
            f[p] = h[p];
          return f;
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
        insertBefore: function(m, h, f, p) {
          p = p || /** @type {any} */
          a.languages;
          var g = p[m], x = {};
          for (var C in g)
            if (g.hasOwnProperty(C)) {
              if (C == h)
                for (var v in f)
                  f.hasOwnProperty(v) && (x[v] = f[v]);
              f.hasOwnProperty(C) || (x[C] = g[C]);
            }
          var R = p[m];
          return p[m] = x, a.languages.DFS(a.languages, function(F, S) {
            S === R && F != m && (this[F] = x);
          }), x;
        },
        // Traverse a language definition with Depth First Search
        DFS: function m(h, f, p, g) {
          g = g || {};
          var x = a.util.objId;
          for (var C in h)
            if (h.hasOwnProperty(C)) {
              f.call(h, C, h[C], p || C);
              var v = h[C], R = a.util.type(v);
              R === "Object" && !g[x(v)] ? (g[x(v)] = !0, m(v, f, null, g)) : R === "Array" && !g[x(v)] && (g[x(v)] = !0, m(v, f, C, g));
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
      highlightAll: function(m, h) {
        a.highlightAllUnder(document, m, h);
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
      highlightAllUnder: function(m, h, f) {
        var p = {
          callback: f,
          container: m,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        a.hooks.run("before-highlightall", p), p.elements = Array.prototype.slice.apply(p.container.querySelectorAll(p.selector)), a.hooks.run("before-all-elements-highlight", p);
        for (var g = 0, x; x = p.elements[g++]; )
          a.highlightElement(x, h === !0, p.callback);
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
      highlightElement: function(m, h, f) {
        var p = a.util.getLanguage(m), g = a.languages[p];
        a.util.setLanguage(m, p);
        var x = m.parentElement;
        x && x.nodeName.toLowerCase() === "pre" && a.util.setLanguage(x, p);
        var C = m.textContent, v = {
          element: m,
          language: p,
          grammar: g,
          code: C
        };
        function R(S) {
          v.highlightedCode = S, a.hooks.run("before-insert", v), v.element.innerHTML = v.highlightedCode, a.hooks.run("after-highlight", v), a.hooks.run("complete", v), f && f.call(v.element);
        }
        if (a.hooks.run("before-sanity-check", v), x = v.element.parentElement, x && x.nodeName.toLowerCase() === "pre" && !x.hasAttribute("tabindex") && x.setAttribute("tabindex", "0"), !v.code) {
          a.hooks.run("complete", v), f && f.call(v.element);
          return;
        }
        if (a.hooks.run("before-highlight", v), !v.grammar) {
          R(a.util.encode(v.code));
          return;
        }
        if (h && n.Worker) {
          var F = new Worker(a.filename);
          F.onmessage = function(S) {
            R(S.data);
          }, F.postMessage(JSON.stringify({
            language: v.language,
            code: v.code,
            immediateClose: !0
          }));
        } else
          R(a.highlight(v.code, v.grammar, v.language));
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
      highlight: function(m, h, f) {
        var p = {
          code: m,
          grammar: h,
          language: f
        };
        if (a.hooks.run("before-tokenize", p), !p.grammar)
          throw new Error('The language "' + p.language + '" has no grammar.');
        return p.tokens = a.tokenize(p.code, p.grammar), a.hooks.run("after-tokenize", p), c.stringify(a.util.encode(p.tokens), p.language);
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
      tokenize: function(m, h) {
        var f = h.rest;
        if (f) {
          for (var p in f)
            h[p] = f[p];
          delete h.rest;
        }
        var g = new d();
        return E(g, g.head, m), u(m, g, h, g.head, 0), b(g);
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
        add: function(m, h) {
          var f = a.hooks.all;
          f[m] = f[m] || [], f[m].push(h);
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
        run: function(m, h) {
          var f = a.hooks.all[m];
          if (!(!f || !f.length))
            for (var p = 0, g; g = f[p++]; )
              g(h);
        }
      },
      Token: c
    };
    n.Prism = a;
    function c(m, h, f, p) {
      this.type = m, this.content = h, this.alias = f, this.length = (p || "").length | 0;
    }
    c.stringify = function m(h, f) {
      if (typeof h == "string")
        return h;
      if (Array.isArray(h)) {
        var p = "";
        return h.forEach(function(R) {
          p += m(R, f);
        }), p;
      }
      var g = {
        type: h.type,
        content: m(h.content, f),
        tag: "span",
        classes: ["token", h.type],
        attributes: {},
        language: f
      }, x = h.alias;
      x && (Array.isArray(x) ? Array.prototype.push.apply(g.classes, x) : g.classes.push(x)), a.hooks.run("wrap", g);
      var C = "";
      for (var v in g.attributes)
        C += " " + v + '="' + (g.attributes[v] || "").replace(/"/g, "&quot;") + '"';
      return "<" + g.tag + ' class="' + g.classes.join(" ") + '"' + C + ">" + g.content + "</" + g.tag + ">";
    };
    function l(m, h, f, p) {
      m.lastIndex = h;
      var g = m.exec(f);
      if (g && p && g[1]) {
        var x = g[1].length;
        g.index += x, g[0] = g[0].slice(x);
      }
      return g;
    }
    function u(m, h, f, p, g, x) {
      for (var C in f)
        if (!(!f.hasOwnProperty(C) || !f[C])) {
          var v = f[C];
          v = Array.isArray(v) ? v : [v];
          for (var R = 0; R < v.length; ++R) {
            if (x && x.cause == C + "," + R)
              return;
            var F = v[R], S = F.inside, B = !!F.lookbehind, ce = !!F.greedy, He = F.alias;
            if (ce && !F.pattern.global) {
              var Ve = F.pattern.toString().match(/[imsuy]*$/)[0];
              F.pattern = RegExp(F.pattern.source, Ve + "g");
            }
            for (var le = F.pattern || F, L = p.next, P = g; L !== h.tail && !(x && P >= x.reach); P += L.value.length, L = L.next) {
              var I = L.value;
              if (h.length > m.length)
                return;
              if (!(I instanceof c)) {
                var X = 1, D;
                if (ce) {
                  if (D = l(le, P, m, B), !D || D.index >= m.length)
                    break;
                  var j = D.index, Xe = D.index + D[0].length, k = P;
                  for (k += L.value.length; j >= k; )
                    L = L.next, k += L.value.length;
                  if (k -= L.value.length, P = k, L.value instanceof c)
                    continue;
                  for (var N = L; N !== h.tail && (k < Xe || typeof N.value == "string"); N = N.next)
                    X++, k += N.value.length;
                  X--, I = m.slice(P, k), D.index -= P;
                } else if (D = l(le, 0, I, B), !D)
                  continue;
                var j = D.index, Y = D[0], J = I.slice(0, j), ue = I.slice(j + Y.length), Q = P + I.length;
                x && Q > x.reach && (x.reach = Q);
                var K = L.prev;
                J && (K = E(h, K, J), P += J.length), y(h, K, X);
                var je = new c(C, S ? a.tokenize(Y, S) : Y, He, Y);
                if (L = E(h, K, je), ue && E(h, L, ue), X > 1) {
                  var ee = {
                    cause: C + "," + R,
                    reach: Q
                  };
                  u(m, h, f, L.prev, P, ee), x && ee.reach > x.reach && (x.reach = ee.reach);
                }
              }
            }
          }
        }
    }
    function d() {
      var m = { value: null, prev: null, next: null }, h = { value: null, prev: m, next: null };
      m.next = h, this.head = m, this.tail = h, this.length = 0;
    }
    function E(m, h, f) {
      var p = h.next, g = { value: f, prev: h, next: p };
      return h.next = g, p.prev = g, m.length++, g;
    }
    function y(m, h, f) {
      for (var p = h.next, g = 0; g < f && p !== m.tail; g++)
        p = p.next;
      h.next = p, p.prev = h, m.length -= g;
    }
    function b(m) {
      for (var h = [], f = m.head.next; f !== m.tail; )
        h.push(f.value), f = f.next;
      return h;
    }
    if (!n.document)
      return n.addEventListener && (a.disableWorkerMessageHandler || n.addEventListener("message", function(m) {
        var h = JSON.parse(m.data), f = h.language, p = h.code, g = h.immediateClose;
        n.postMessage(a.highlight(p, a.languages[f], f)), g && n.close();
      }, !1)), a;
    var T = a.util.currentScript();
    T && (a.filename = T.src, T.hasAttribute("data-manual") && (a.manual = !0));
    function w() {
      a.manual || a.highlightAll();
    }
    if (!a.manual) {
      var _ = document.readyState;
      _ === "loading" || _ === "interactive" && T && T.defer ? document.addEventListener("DOMContentLoaded", w) : window.requestAnimationFrame ? window.requestAnimationFrame(w) : window.setTimeout(w, 16);
    }
    return a;
  }(e);
  i.exports && (i.exports = t), typeof Re < "u" && (Re.Prism = t), t.languages.markup = {
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
    value: function(s, r) {
      var o = {};
      o["language-" + r] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: t.languages[r]
      }, o.cdata = /^<!\[CDATA\[|\]\]>$/i;
      var a = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: o
        }
      };
      a["language-" + r] = {
        pattern: /[\s\S]+/,
        inside: t.languages[r]
      };
      var c = {};
      c[s] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
          return s;
        }), "i"),
        lookbehind: !0,
        greedy: !0,
        inside: a
      }, t.languages.insertBefore("markup", "cdata", c);
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
    var r = n.languages.markup;
    r && (r.tag.addInlined("style", "css"), r.tag.addAttribute("style", "css"));
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
    var n = "Loading…", s = function(T, w) {
      return "✖ Error " + T + " while fetching file: " + w;
    }, r = "✖ Error: File does not exist or is empty", o = {
      js: "javascript",
      py: "python",
      rb: "ruby",
      ps1: "powershell",
      psm1: "powershell",
      sh: "bash",
      bat: "batch",
      h: "c",
      tex: "latex"
    }, a = "data-src-status", c = "loading", l = "loaded", u = "failed", d = "pre[data-src]:not([" + a + '="' + l + '"]):not([' + a + '="' + c + '"])';
    function E(T, w, _) {
      var m = new XMLHttpRequest();
      m.open("GET", T, !0), m.onreadystatechange = function() {
        m.readyState == 4 && (m.status < 400 && m.responseText ? w(m.responseText) : m.status >= 400 ? _(s(m.status, m.statusText)) : _(r));
      }, m.send(null);
    }
    function y(T) {
      var w = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(T || "");
      if (w) {
        var _ = Number(w[1]), m = w[2], h = w[3];
        return m ? h ? [_, Number(h)] : [_, void 0] : [_, _];
      }
    }
    t.hooks.add("before-highlightall", function(T) {
      T.selector += ", " + d;
    }), t.hooks.add("before-sanity-check", function(T) {
      var w = (
        /** @type {HTMLPreElement} */
        T.element
      );
      if (w.matches(d)) {
        T.code = "", w.setAttribute(a, c);
        var _ = w.appendChild(document.createElement("CODE"));
        _.textContent = n;
        var m = w.getAttribute("data-src"), h = T.language;
        if (h === "none") {
          var f = (/\.(\w+)$/.exec(m) || [, "none"])[1];
          h = o[f] || f;
        }
        t.util.setLanguage(_, h), t.util.setLanguage(w, h);
        var p = t.plugins.autoloader;
        p && p.loadLanguages(h), E(
          m,
          function(g) {
            w.setAttribute(a, l);
            var x = y(w.getAttribute("data-range"));
            if (x) {
              var C = g.split(/\r\n?|\n/g), v = x[0], R = x[1] == null ? C.length : x[1];
              v < 0 && (v += C.length), v = Math.max(0, Math.min(v - 1, C.length)), R < 0 && (R += C.length), R = Math.max(0, Math.min(R, C.length)), g = C.slice(v, R).join(`
`), w.hasAttribute("data-start") || w.setAttribute("data-start", String(v + 1));
            }
            _.textContent = g, t.highlightElement(_);
          },
          function(g) {
            w.setAttribute(a, u), _.textContent = g;
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
        for (var _ = (w || document).querySelectorAll(d), m = 0, h; h = _[m++]; )
          t.highlightElement(h);
      }
    };
    var b = !1;
    t.fileHighlight = function() {
      b || (console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."), b = !0), t.plugins.fileHighlight.highlight.apply(this, arguments);
    };
  }();
})($e);
var ln = $e.exports;
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
(function(i) {
  var e = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/, t = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function() {
    return e.source;
  });
  i.languages.cpp = i.languages.extend("c", {
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
  }), i.languages.insertBefore("cpp", "string", {
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
  }), i.languages.insertBefore("cpp", "keyword", {
    "generic-function": {
      pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
      inside: {
        function: /^\w+/,
        generic: {
          pattern: /<[\s\S]+/,
          alias: "class-name",
          inside: i.languages.cpp
        }
      }
    }
  }), i.languages.insertBefore("cpp", "operator", {
    "double-colon": {
      pattern: /::/,
      alias: "punctuation"
    }
  }), i.languages.insertBefore("cpp", "class-name", {
    // the base clause is an optional list of parent classes
    // https://en.cppreference.com/w/cpp/language/class
    "base-clause": {
      pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
      lookbehind: !0,
      greedy: !0,
      inside: i.languages.extend("cpp", {})
    }
  }), i.languages.insertBefore("inside", "double-colon", {
    // All untokenized words that are not namespaces should be class names
    "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
  }, i.languages.cpp["base-clause"]);
})(Prism);
function un(i, e, t) {
  const n = document.createElement("div");
  n.className = "prism-editor-wrapper";
  const s = document.createElement("div");
  s.className = "prism-editor-line-numbers";
  const r = document.createElement("div");
  r.className = "prism-editor-area";
  const o = document.createElement("textarea");
  o.className = "prism-editor-textarea", o.value = e, o.spellcheck = !1, o.autocapitalize = "off", o.autocomplete = "off";
  const a = document.createElement("pre");
  a.className = "prism-editor-highlight";
  const c = document.createElement("code");
  c.className = "language-cpp", a.appendChild(c), r.appendChild(o), r.appendChild(a), n.appendChild(s), n.appendChild(r), i.appendChild(n);
  function l() {
    const E = o.value;
    c.textContent = E + `
`, ln.highlightElement(c);
    const y = E.split(`
`);
    s.innerHTML = y.map((b, T) => `<span>${T + 1}</span>`).join(""), t && t(E);
  }
  function u() {
    a.scrollTop = o.scrollTop, a.scrollLeft = o.scrollLeft, s.scrollTop = o.scrollTop;
  }
  function d(E) {
    if (E.key === "Tab") {
      E.preventDefault();
      const y = o.selectionStart, b = o.selectionEnd, T = o.value;
      o.value = T.substring(0, y) + "  " + T.substring(b), o.selectionStart = o.selectionEnd = y + 2, l();
    }
  }
  return o.addEventListener("input", l), o.addEventListener("scroll", u), o.addEventListener("keydown", d), l(), {
    getSource: () => o.value,
    setSource: (E) => {
      o.value = E, l();
    },
    destroy: () => {
      o.removeEventListener("input", l), o.removeEventListener("scroll", u), o.removeEventListener("keydown", d), n.parentNode && n.parentNode.removeChild(n);
    }
  };
}
const Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createEditor: un
}, Symbol.toStringTag, { value: "Module" })), dn = `const int MAX_STEPS = 100;
const float MAX_DIST = 50.0;
const float HIT_THRESHOLD = 0.001;

struct Ray { vec3 origin; vec3 dir; };

Ray makeRay(vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    float f = 1.0 / tan(radians(90.0) / 2.0);

    Ray ray;
    ray.origin = vec3(0.0);
    ray.dir = normalize(vec3(uv, -f));
    return ray;
}

mat3 rotateX(float a) { float c = cos(a), s = sin(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }
mat3 rotateY(float a) { float c = cos(a), s = sin(a); return mat3(c,0,s, 0,1,0, -s,0,c); }

Ray orbitRay(Ray ray, float distance) {
    vec2 mouse = iMouse.xy / iResolution.xy;
    if (length(iMouse.xy) < 1.0) mouse = vec2(0.55, 0.6);
    float angleY = (mouse.x - 0.5) * 6.28;
    float angleX = (0.5 - mouse.y) * 3.14;
    mat3 rot = rotateX(angleX) * rotateY(angleY);
    ray.origin = rot * vec3(0.0, 0.0, distance);
    ray.dir = rot * ray.dir;
    return ray;
}


// =============================================
//  Scene: three spheres on a ground plane
// =============================================

float sdScene(vec3 p) {
    float d = p.y;                                          // ground
    d = min(d, length(p - vec3(-1.2, 0.5, 0.0)) - 0.5);   // left
    d = min(d, length(p - vec3( 0.0, 0.35, 0.5)) - 0.35);  // center
    d = min(d, length(p - vec3( 1.1, 0.8, -0.3)) - 0.8);   // right
    return d;
}

vec3 getMaterial(vec3 p) {
    float eps = 0.01;
    if (length(p - vec3(-1.2, 0.5, 0.0)) - 0.5 < eps)   return vec3(0.8, 0.35, 0.25);  // terracotta
    if (length(p - vec3( 0.0, 0.35, 0.5)) - 0.35 < eps)  return vec3(0.4, 0.5, 0.65);   // blue-gray
    if (length(p - vec3( 1.1, 0.8, -0.3)) - 0.8 < eps)   return vec3(0.9, 0.85, 0.78);  // cream
    return vec3(0.5, 0.45, 0.4);                                                          // ground
}


// =============================================
//  Raymarching
// =============================================

vec3 calcNormal(vec3 p) {
    float eps = 0.001;
    return normalize(vec3(
        sdScene(p + vec3(eps, 0, 0)) - sdScene(p - vec3(eps, 0, 0)),
        sdScene(p + vec3(0, eps, 0)) - sdScene(p - vec3(0, eps, 0)),
        sdScene(p + vec3(0, 0, eps)) - sdScene(p - vec3(0, 0, eps))
    ));
}

float raymarch(Ray ray) {
    float t = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ray.origin + t * ray.dir;
        float d = sdScene(p);
        if (d < HIT_THRESHOLD) return t;
        t += d;
        if (t > MAX_DIST) return -1.0;
    }
    return -1.0;
}


// =============================================
//  Lighting
// =============================================

struct DirLight { vec3 dir; vec3 color; };

float softShadow(vec3 p, vec3 lightDir, float k) {
    float res = 1.0;
    float t = 0.02;
    float prev = 1e20;

    for (int i = 0; i < 50; i++) {
        float d = sdScene(p + lightDir * t);
        if (d < 0.001) return 0.0;

        float y = d * d / (2.0 * prev);
        float x = sqrt(d * d - y * y);
        res = min(res, k * x / max(0.0, t - y));

        prev = d;
        t += d;
        if (t > 20.0) break;
    }

    return res;
}

float ambientOcclusion(vec3 p, vec3 n) {
    float ao = 0.0;
    float scale = 1.0;

    for (int i = 1; i <= 5; i++) {
        float dist = 0.02 * float(i);
        float d = sdScene(p + n * dist);
        ao += (dist - d) * scale;
        scale *= 0.5;
    }

    return 1.0 - clamp(ao, 0.0, 1.0);
}

vec3 shade(vec3 p, vec3 n, vec3 mat, vec3 v, DirLight light) {
    float diff = max(0.0, dot(n, light.dir));

    vec3 h = normalize(light.dir + v);
    float spec = pow(max(0.0, dot(n, h)), 32.0);

    float sh = softShadow(p + n * 0.01, light.dir, 16.0);

    return (mat * diff + vec3(0.3) * spec) * light.color * sh;
}

vec3 applyFog(vec3 color, float distance, vec3 fogColor) {
    float fog = 1.0 - exp(-distance * 0.04);
    return mix(color, fogColor, fog);
}


// =============================================
//  Main
// =============================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    Ray ray = makeRay(fragCoord);
    ray = orbitRay(ray, 6.0);

    float t = raymarch(ray);

    vec3 fogColor = vec3(0.5, 0.6, 0.7);
    vec3 color = fogColor;

    if (t > 0.0) {
        vec3 p = ray.origin + t * ray.dir;
        vec3 n = calcNormal(p);
        vec3 mat = getMaterial(p);
        vec3 viewDir = -ray.dir;

        // Ambient occlusion
        float ao = ambientOcclusion(p, n);

        // Ambient light
        vec3 ambient = mat * 0.15 * ao;

        // Key light: warm, from upper right
        DirLight key = DirLight(normalize(vec3(1.0, 1.0, 1.0)), vec3(1.0, 0.9, 0.8));

        // Fill light: cool, from the left
        DirLight fill = DirLight(normalize(vec3(-1.0, 0.3, 0.0)), vec3(0.15, 0.2, 0.3));

        color = ambient;
        color += shade(p, n, mat, viewDir, key);
        color += shade(p, n, mat, viewDir, fill);

        // Fog
        color = applyFog(color, t, fogColor);
    }

    // Gamma correction
    color = pow(color, vec3(1.0 / 2.2));

    fragColor = vec4(color, 1.0);
}
`, hn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dn
}, Symbol.toStringTag, { value: "Module" }));
export {
  mn as mount
};
