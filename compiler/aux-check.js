/**
 * The closing of the loop: LaTeX counted natively; the resolver counted by
 * mirrored rules. This diffs the two — every \newlabel in the .aux against
 * the label table — so print/web number agreement is enforced, not hoped for.
 * Drift caused by an unlabeled object surfaces at the next labeled one.
 */

import { readFileSync } from "node:fs";
import path from "node:path";

export function auxCheck(auxPath, labels) {
  const seen = new Map();
  collect(auxPath, seen);

  const mismatches = [];
  for (const [id, entry] of labels) {
    const latexNumber = seen.get(id);
    if (latexNumber === undefined) mismatches.push({ id, ours: entry.number, latex: "(missing from .aux)" });
    else if (latexNumber !== entry.number) mismatches.push({ id, ours: entry.number, latex: latexNumber });
  }
  return mismatches;
}

/** Labels from \include'd chapters live in per-chapter .aux files, pulled in by \@input. */
function collect(auxPath, seen) {
  const aux = readFileSync(auxPath, "utf8");

  // \newlabel{id}{{number}{page}...} — hyperref's extended form included.
  for (const m of aux.matchAll(/\\newlabel\{([^}@]+)\}\{\{([^}]*)\}/g)) {
    seen.set(m[1], m[2].replace(/\\relax\s*/g, ""));
  }
  for (const m of aux.matchAll(/\\@input\{([^}]+)\}/g)) {
    collect(path.join(path.dirname(auxPath), m[1]), seen);
  }
}
