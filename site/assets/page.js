/**
 * The site's entire page JS: theme toggle, ToC scrollspy, the mobile
 * drawer + auto-hiding bar, and crossref hover previews. Figures are the
 * only other client JS and live in their own modules (runtime layer).
 */

// ---- Theme toggle (boot script in <head> set data-theme pre-paint) ----
const root = document.documentElement;
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", root.dataset.theme);
});

// ---- Scrollspy for the right-rail ToC ----
const tocItems = [...document.querySelectorAll("#toc li")];
if (tocItems.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        if (e.isIntersecting)
          tocItems.forEach((li) => li.classList.toggle("active", li.dataset.for === e.target.id));
    },
    { rootMargin: "-15% 0px -70% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
}

// ---- Nav: show the reader where they are ----
// The rails scroll on their own once the book outgrows the window, and the
// browser has no reason to scroll them — the page's own anchor is elsewhere.
// Only the container is moved, never the page.
function revealCurrent(scroller) {
  const cur = scroller?.querySelector("li.current");
  if (!cur) return;
  const box = scroller.getBoundingClientRect();
  const item = cur.getBoundingClientRect();
  if (item.top >= box.top && item.bottom <= box.bottom) return;
  scroller.scrollTop += item.top - box.top - (box.height - item.height) / 2;
}
revealCurrent(document.querySelector(".book-rail .sticky"));

// ---- Mobile drawer ----
const drawer = document.getElementById("drawer");
if (drawer) {
  const open = (on) => {
    document.body.classList.toggle("drawer-open", on);
    if (on) {
      revealCurrent(drawer);
      drawer.querySelector("a")?.focus({ preventScroll: true });
    }
  };
  document.getElementById("drawer-open").addEventListener("click", () => open(true));
  document.getElementById("drawer-scrim").addEventListener("click", () => open(false));
  drawer.addEventListener("click", (e) => { if (e.target.closest("a")) open(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); });
}

// ---- Auto-hiding mobile bar: hide scrolling down, reappear scrolling up ----
const bar = document.getElementById("mobile-bar");
if (bar) {
  let last = scrollY;
  addEventListener("scroll", () => {
    const dy = scrollY - last;
    last = scrollY;
    if (scrollY < 60) bar.classList.remove("hidden");
    else if (dy > 4) bar.classList.add("hidden");
    else if (dy < -4) bar.classList.remove("hidden");
  }, { passive: true });
}

// ---- Crossref hover previews (hover devices only) ----
// The label table baked each .xref's target into its href; the preview is
// the target element itself, fetched from its page and cloned. Pages are
// static and same-origin, so a fetch + DOMParser is the whole mechanism.
if (matchMedia("(hover: hover)").matches) {
  const PREVIEWABLE = new Set(["theorem", "lemma", "proposition", "corollary",
    "definition", "example", "remark", "equation", "figure"]);
  const pages = new Map(); // pathname → Promise<Document>
  const fetchPage = (path) => {
    if (!pages.has(path))
      pages.set(path, fetch(path).then((r) => r.text())
        .then((t) => new DOMParser().parseFromString(t, "text/html")));
    return pages.get(path);
  };

  let popover = null;
  let hideTimer = null;
  const hide = () => { popover?.remove(); popover = null; };

  for (const link of document.querySelectorAll(".xref[data-kind]")) {
    if (!PREVIEWABLE.has(link.dataset.kind)) continue;
    const url = new URL(link.href);

    link.addEventListener("mouseenter", async () => {
      clearTimeout(hideTimer);
      const doc = url.pathname === location.pathname
        ? document
        : await fetchPage(url.pathname).catch(() => null);
      const target = doc?.getElementById(url.hash.slice(1));
      if (!target) return;

      hide();
      popover = document.createElement("div");
      popover.className = "xref-preview";
      popover.appendChild(target.cloneNode(true));
      popover.addEventListener("mouseenter", () => clearTimeout(hideTimer));
      popover.addEventListener("mouseleave", () => (hideTimer = setTimeout(hide, 150)));
      document.body.appendChild(popover);

      const r = link.getBoundingClientRect();
      const w = Math.min(popover.offsetWidth, innerWidth - 24);
      popover.style.left = Math.max(12, Math.min(r.left, innerWidth - w - 12)) + scrollX + "px";
      const below = r.bottom + 10 + popover.offsetHeight < innerHeight;
      popover.style.top = scrollY + (below ? r.bottom + 10 : r.top - popover.offsetHeight - 10) + "px";
    });
    link.addEventListener("mouseleave", () => (hideTimer = setTimeout(hide, 150)));
  }
}
