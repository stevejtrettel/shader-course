#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const projectArg = process.argv[2] ?? ".";
const projectDir = path.resolve(process.cwd(), projectArg);
const demosDir = path.join(projectDir, "demos");
const demoPrefix = process.env.SHADER_DEMO_PREFIX ?? "course";

if (!existsSync(demosDir)) {
  console.log(`[shader-build] No demos directory in ${projectDir}; skipping.`);
  process.exit(0);
}

function walkForDemoDirs(dir, found = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const hasImage = entries.some((entry) => entry.isFile() && entry.name === "image.glsl");
  if (hasImage) {
    found.push(dir);
    return found;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    walkForDemoDirs(path.join(dir, entry.name), found);
  }

  return found;
}

function shellEscape(value) {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function buildCommandFromTemplate(template, vars) {
  return template
    .replaceAll("{demoDir}", shellEscape(vars.demoDir))
    .replaceAll("{demoName}", shellEscape(vars.demoName))
    .replaceAll("{outFile}", shellEscape(vars.outFile));
}

function run(command, cwd) {
  const result = spawnSync(command, {
    cwd,
    stdio: "inherit",
    shell: true
  });
  return result.status === 0;
}

const demoDirs = walkForDemoDirs(demosDir);

if (demoDirs.length === 0) {
  console.log(`[shader-build] No demos found under ${demosDir}; skipping.`);
  process.exit(0);
}

const userTemplate = process.env.SHADER_SANDBOX_BUILD_CMD;
const templates = userTemplate
  ? [userTemplate]
  : [
      "npx @stevejtrettel/shader-sandbox build {demoDir} --name {demoName} --output {outFile}",
      "npx @stevejtrettel/shader-sandbox build {demoDir} --name {demoName} --out {outFile}",
      "npx @stevejtrettel/shader-sandbox compile {demoDir} --name {demoName} --output {outFile}",
      "npx shader-sandbox build {demoDir} --name {demoName} --output {outFile}"
    ];

const jobs = demoDirs
  .map((demoDir) => {
    const rel = path.relative(demosDir, demoDir).split(path.sep).join("/");
    return {
      demoDir,
      demoName: `${demoPrefix}/${rel}`,
      outFile: path.join(demoDir, "embed.js"),
      rel
    };
  })
  .sort((a, b) => a.rel.localeCompare(b.rel));

let chosenTemplate = null;

for (const template of templates) {
  const probe = jobs[0];
  const probeCommand = buildCommandFromTemplate(template, probe);
  console.log(`[shader-build] Probing command: ${probeCommand}`);
  if (run(probeCommand, projectDir)) {
    chosenTemplate = template;
    break;
  }
}

if (!chosenTemplate) {
  console.error("[shader-build] Could not find a working shader-sandbox build command.");
  console.error("[shader-build] Set SHADER_SANDBOX_BUILD_CMD, for example:");
  console.error(
    "[shader-build] SHADER_SANDBOX_BUILD_CMD=\"npx @stevejtrettel/shader-sandbox build {demoDir} --name {demoName} --output {outFile}\""
  );
  process.exit(1);
}

console.log(`[shader-build] Building ${jobs.length} demos in ${projectArg}...`);

for (const job of jobs.slice(1)) {
  const command = buildCommandFromTemplate(chosenTemplate, job);
  console.log(`[shader-build] ${job.rel}`);
  if (!run(command, projectDir)) {
    console.error(`[shader-build] Build failed for ${job.rel}`);
    process.exit(1);
  }
}

console.log("[shader-build] Done.");
