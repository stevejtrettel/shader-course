/**
 * Guarded deploy: what's live is always exactly a pushed commit.
 *
 *   npm run deploy
 *
 * Netlify does not build this repo — builds are stopped at the site itself —
 * so production only ever changes when this script runs. It refuses to
 * run with uncommitted changes or unpushed commits, so the deployed site can
 * never drift from git history, which is the guarantee repo-connected CI gave.
 * Each deploy is stamped with its commit hash, visible in Netlify's deploy list.
 *
 * The site link lives in gitignored .netlify/; a fresh clone needs
 *   netlify link --id 4b6c4251-56d2-46df-9f6f-d9e86eaf64d6
 */

import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

const dirty = git("status", "--porcelain");
if (dirty) {
  console.error("deploy refused: uncommitted changes —\n" + dirty + "\n\nCommit (or stash) first; what's live must be a commit.");
  process.exit(1);
}

const unpushed = git("rev-list", "--count", "@{upstream}..HEAD");
if (unpushed !== "0") {
  console.error(`deploy refused: ${unpushed} commit(s) not pushed — push first, so the live site always exists in the remote history.`);
  process.exit(1);
}

const hash = git("rev-parse", "--short", "HEAD");
const title = git("log", "-1", "--format=%s");

console.log(`deploying ${hash} ("${title}")`);
execFileSync("node", [path.join(ROOT, "compiler", "build.js")], { cwd: ROOT, stdio: "inherit" });
execFileSync(
  "netlify",
  ["deploy", "--prod", "--dir", "dist", "--message", `${hash} ${title}`],
  { cwd: ROOT, stdio: "inherit" }
);
