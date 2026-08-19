/**
 * Figure islands (runtime layer). Each .fig-embed shows its poster, then:
 *  - approaching the viewport → import the figure module, mount it, and on
 *    its ready signal swap the poster out invisibly
 *  - drifting far off-screen → dispose and restore the poster (lazy
 *    mounting is the embed contract: browsers cap live WebGL contexts)
 *  - leaving/entering the viewport while mounted → pause/resume its clock
 * Posters are theme-aware (light/dark files chosen by data-theme).
 */

import { onThemeChange } from "toolkit/theme.js";

const embeds = [...document.querySelectorAll(".fig-embed[data-entry]")];
if (embeds.length) {
  const state = new Map(); // embed → {handle} once mounted

  const setPosters = () => {
    const mode = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    for (const embed of embeds) {
      const poster = embed.querySelector(".fig-poster");
      if (poster) poster.src = poster.dataset[mode];
    }
  };
  setPosters();
  onThemeChange(setPosters);

  const mounter = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      const embed = entry.target;
      if (entry.isIntersecting && !state.has(embed)) {
        state.set(embed, { handle: null }); // claim before the await
        const mod = await import(embed.dataset.entry);
        const handle = mod.default(embed);
        state.get(embed).handle = handle;
        await handle.ready;
        embed.classList.add("live");
      } else if (!entry.isIntersecting && state.has(embed)) {
        state.get(embed).handle?.dispose();
        state.delete(embed);
        embed.classList.remove("live");
      }
    }
  }, { rootMargin: "600px 0px" });

  const pauser = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const handle = state.get(entry.target)?.handle;
      if (!handle) continue;
      entry.isIntersecting ? handle.resume() : handle.pause();
    }
  }, { rootMargin: "100px 0px" });

  for (const embed of embeds) {
    mounter.observe(embed);
    pauser.observe(embed);
  }
}
