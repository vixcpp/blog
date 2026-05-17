import DefaultTheme from "vitepress/theme";
import "./custom.css";

import Layout from "./Layout.vue";
import BlogHomeHero from "./BlogHomeHero.vue";
import CodeTabs from "./CodeTabs.vue";
import CodeBlock from "./CodeBlock.vue";

export default {
  ...DefaultTheme,
  Layout,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);
    const { app } = ctx;

    // Register global blog components — usable in any .md file
    app.component("BlogHomeHero", BlogHomeHero);
    app.component("CodeTabs", CodeTabs);
    app.component("CodeBlock", CodeBlock);

    // SSR-safe guard
    if (typeof window === "undefined") return;

    // Disable browser scroll restoration so SPA nav always starts at top
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Reading progress bar for post pages
    const updateProgressBar = () => {
      const bar = document.querySelector(".bh-progress-bar");
      if (!bar) return;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
    };

    window.addEventListener("scroll", updateProgressBar, { passive: true });
    window.addEventListener("resize", updateProgressBar);
    window.requestAnimationFrame(updateProgressBar);
  },
};
