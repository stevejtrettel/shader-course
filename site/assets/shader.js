/**
 * The shader runtime: turns each `::shader` slot into a live sandbox.
 *
 * `@stevejtrettel/shader-sandbox` ships prebuilt and vendored beside this
 * file; importing it registers <shader-sandbox>. Nothing in it is modified.
 *
 * The element is constructed here rather than emitted as markup for the
 * reason the Quarto shortcode did the same: the library resolves buffer
 * passes with `new URL(file, src)`, which needs an absolute URL with a
 * protocol, so `src` must be resolved against location.href before the
 * element is upgraded. A slot in the HTML plus construction here guarantees
 * that order.
 *
 * Lazy mounting is the component's own business — it carries an
 * IntersectionObserver internally and does not start work off-screen.
 *
 * Theme is not the component's business, though it thinks it is: it stamps
 * data-theme on itself from its own option and never looks at the page, so
 * every sandbox stays light on a dark page and ignores the toggle. The page
 * is the authority here, so the theme is handed over at construction and
 * kept in step afterwards — including against the component's own writes,
 * which land after mount.
 */

const pageTheme = () => document.documentElement.dataset.theme || "light";

/** Hold one element to the page's theme, whoever else writes the attribute. */
function followTheme(el) {
  const apply = () => {
    const want = pageTheme();
    if (el.dataset.theme !== want) el.dataset.theme = want;
  };
  apply();
  new MutationObserver(apply).observe(el, { attributes: true, attributeFilter: ["data-theme"] });
  new MutationObserver(apply).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

import "./shader-sandbox.js";

for (const slot of document.querySelectorAll(".shader[data-src]")) {
  const el = document.createElement("shader-sandbox");
  el.setAttribute("src", new URL(slot.dataset.src, location.href).href);
  el.setAttribute("controls", "false");
  el.setAttribute("theme", pageTheme());
  el.style.cssText = "width:100%;height:100%;display:block";
  for (const [key, value] of Object.entries(JSON.parse(slot.dataset.attrs || "{}")))
    el.setAttribute(key, value);
  slot.appendChild(el);
  followTheme(el);
}
