/**
 * The environment and kind registry — the single list the emitter and the
 * resolver read. Adding a numbered environment later is one entry here.
 */

/**
 * Theorem-family directives. All numbered ones share one per-chapter counter.
 * `family` is the visual family — which colored bar the environment wears
 * (results blue, definitions gold, notes faint). `style` is the amsthm style,
 * carried so this list stays interchangeable with the sibling books that do
 * produce print.
 */
export const environments = {
  theorem:     { style: "plain",      family: "result",     word: "theorem" },
  lemma:       { style: "plain",      family: "result",     word: "lemma" },
  proposition: { style: "plain",      family: "result",     word: "proposition" },
  corollary:   { style: "plain",      family: "result",     word: "corollary" },
  definition:  { style: "definition", family: "definition", word: "definition" },
  example:     { style: "definition", family: "note",       word: "example" },
  exercise:    { style: "definition", family: "note",       word: "exercise" },
  remark:      { style: "remark",     family: "note",       word: "remark" },
};

/**
 * Callouts: unnumbered, uncounted asides. Four kinds, carried over from the
 * Quarto era one-for-one (`.callout-note` and friends), which is why the
 * names are these and not something tidier. A callout may take a title —
 * written as a leading heading in the source and lifted off in parse.js —
 * and falls back to the kind's own word when it doesn't.
 */
export const callouts = {
  note:      { word: "Note" },
  tip:       { word: "Tip" },
  warning:   { word: "Warning" },
  important: { word: "Important" },
};

/** Unnumbered proof-like directives and their printed headers. */
export const proofLike = {
  proof:  { header: "Proof" },
  sketch: { header: "Sketch" },
};

/**
 * Reference words per kind, lowercase (capitalization comes from the ref's
 * own case, `@thm-` vs `@Thm-`). Equations render as a bare "(N.M)" and have
 * no word — matching \eqref. Subsections read as "section", matching cleveref.
 */
export const refWords = {
  chapter: "chapter",
  section: "section",
  subsection: "section",
  equation: null,
  ...Object.fromEntries(
    Object.entries(environments).map(([name, e]) => [name, e.word])
  ),
};
