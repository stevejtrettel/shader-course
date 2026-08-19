/**
 * The dev loop's warm builder: a child process that keeps MathJax and the
 * math cache initialized and rebuilds the site on request over IPC, so a
 * prose edit costs ~100ms instead of a fresh node start. dev.js respawns
 * this process whenever build code (compiler/, site/*.js) or macros.tex
 * changes, so staleness is structurally impossible.
 */

import { build, BuildError } from "../compiler/build.js";

process.on("message", async () => {
  try {
    await build();
    process.send({ ok: true });
  } catch (e) {
    process.send({ ok: false, msg: e instanceof BuildError ? "build failed:\n" + e.message : e.stack });
  }
});
