#!/usr/bin/env node

/**
 * Build all shaders found in ** /shaders/ directories throughout the project.
 *
 * Walks the project tree looking for directories named "shaders", then builds
 * each shader (folder or bare .glsl file) within them. Output goes to:
 *   dist/<parent-path>/<shader-name>/main.js
 *
 * For example:
 *   3d/raymarching/shaders/sdf-basics/  → dist/3d/raymarching/sdf-basics/
 *   lectures/intro/shaders/hello.glsl   → dist/lectures/intro/hello/
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const cwd = process.cwd();

// ─── Helpers ─────────────────────────────────────────────────────────────────

function findPackageRoot() {
  const pkgPath = path.join(cwd, 'node_modules', '@stevejtrettel', 'shader-sandbox');
  if (fs.existsSync(pkgPath)) return pkgPath;
  return null;
}

function findViteBin() {
  const base = path.join(cwd, 'node_modules', '.bin', 'vite');
  if (fs.existsSync(base)) return base;
  if (fs.existsSync(base + '.cmd')) return base + '.cmd';
  return null;
}

/** Recursively find all directories named "shaders" under `dir`. */
function findShaderDirs(dir, results = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return results; }

  for (const entry of entries) {
    if (/^(node_modules|_site|_freeze|dist|\.)/i.test(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'shaders') {
        results.push(full);
      } else {
        findShaderDirs(full, results);
      }
    }
  }
  return results;
}

/** List individual shader entries inside a shaders/ directory. */
function getShadersIn(shadersDir) {
  const entries = fs.readdirSync(shadersDir, { withFileTypes: true });
  const names = new Set();
  for (const e of entries) {
    if (e.isDirectory()) names.add(e.name);
    else if (e.name.endsWith('.glsl')) names.add(e.name.replace(/\.glsl$/, ''));
  }
  return [...names].sort();
}

/**
 * If the shader is a bare .glsl file, wrap it in a temp folder so the build
 * can treat it uniformly. Returns a cleanup function (or null).
 */
function ensureFolder(shadersDir, shaderName) {
  const folder = path.join(shadersDir, shaderName);
  const bare   = path.join(shadersDir, `${shaderName}.glsl`);

  if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
    return null;                      // already a folder — nothing to clean up
  }
  if (fs.existsSync(bare)) {
    fs.mkdirSync(folder, { recursive: true });
    fs.copyFileSync(bare, path.join(folder, 'image.glsl'));
    return () => { try { fs.rmSync(folder, { recursive: true }); } catch {} };
  }
  return null;
}

// ─── Build one shader ────────────────────────────────────────────────────────

function buildShader(shaderRelPath, outputName) {
  return new Promise((resolve, reject) => {
    const entryFile = path.join(cwd, '_build-entry.js');

    const code = `
import { mount as _mount, loadDemo } from '@stevejtrettel/shader-sandbox';

const glslFiles   = import.meta.glob('./${shaderRelPath}/**/*.glsl',                       { query: '?raw', import: 'default' });
const jsonFiles   = import.meta.glob('./${shaderRelPath}/*.json',                           { import: 'default' });
const imageFiles  = import.meta.glob('./${shaderRelPath}/**/*.{jpg,jpeg,png,gif,webp,bmp}', { query: '?url', import: 'default' });
const scriptFiles = import.meta.glob('./${shaderRelPath}/**/script.js');

let _project = null;

async function getProject() {
  if (!_project) {
    _project = await loadDemo('${shaderRelPath}', glslFiles, jsonFiles, imageFiles, scriptFiles);
  }
  return _project;
}

export async function mount(el, options = {}) {
  const project = await getProject();
  return _mount(el, { project, ...options });
}
`.trimStart();

    fs.writeFileSync(entryFile, code);

    const viteBin = findViteBin();
    if (!viteBin) {
      fs.unlinkSync(entryFile);
      reject(new Error('vite not found — run npm install'));
      return;
    }

    const env = {
      ...process.env,
      SHADER_NAME: outputName,
      SHADER_BUILD_ENTRY: '1',
    };

    const child = spawn(viteBin, ['build'], {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env,
    });

    child.on('error', (err) => {
      try { fs.unlinkSync(entryFile); } catch {}
      reject(err);
    });

    child.on('close', (code) => {
      try { fs.unlinkSync(entryFile); } catch {}
      if (code !== 0) {
        reject(new Error(`vite build exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────

(async () => {
  if (!findViteBin()) {
    console.error('Error: vite not found in node_modules. Run "npm install" first.');
    process.exit(1);
  }

  const packageRoot = findPackageRoot();
  const shaderDirs  = findShaderDirs(cwd);

  if (shaderDirs.length === 0) {
    console.log('No shaders/ directories found — nothing to build.');
    process.exit(0);
  }

  let total = 0, failed = 0;

  for (const shadersDir of shaderDirs) {
    const shaders = getShadersIn(shadersDir);
    if (shaders.length === 0) continue;

    // Parent directory relative to project root  (e.g. "3d/raymarching")
    const parentRel = path.relative(cwd, path.dirname(shadersDir)).replace(/\\/g, '/');

    for (const name of shaders) {
      total++;

      const cleanup = ensureFolder(shadersDir, name);

      // Path from project root to the shader folder (for import.meta.glob)
      const shaderRelPath = path.relative(cwd, path.join(shadersDir, name)).replace(/\\/g, '/');

      // Output path under dist/ — strips the intermediate "shaders" segment
      const outputName = parentRel ? `${parentRel}/${name}` : name;

      console.log(`\n--- Building "${outputName}" ---`);

      try {
        await buildShader(shaderRelPath, outputName);

        console.log(`✓ ${outputName}`);
      } catch (err) {
        console.error(`✗ ${outputName}: ${err.message}`);
        failed++;
      } finally {
        if (cleanup) cleanup();
      }
    }
  }

  console.log(`\nDone. ${total - failed}/${total} shaders built.`);
  if (failed > 0) process.exit(1);
})();
