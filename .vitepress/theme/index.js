import DefaultTheme from "vitepress/theme";
import "./custom.css";
import "./codeblocks.css";

import Layout from "./Layout.vue";
import BlogHomeHero from "./BlogHomeHero.vue";
import CodeTabs from "./CodeTabs.vue";
import CodeBlock from "./CodeBlock.vue";

import { highlight, normalizeLang } from "./highlighter";

export default {
  ...DefaultTheme,
  Layout,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx);

    const { app, router } = ctx;

    app.component("BlogHomeHero", BlogHomeHero);
    app.component("CodeTabs", CodeTabs);
    app.component("CodeBlock", CodeBlock);

    if (typeof window === "undefined") {
      return;
    }

    const highlightMarkdownBlocks = () => {
      const blocks = document.querySelectorAll(
        [
          '.vp-doc div[class*="language-"] code',
          '.vp-doc [class*="language-"] code',
        ].join(","),
      );

      blocks.forEach((codeElement) => {
        if (codeElement.dataset.vixHighlighted === "1") {
          return;
        }

        const container = codeElement.closest('[class*="language-"]');
        if (!container || container.closest(".cb")) {
          return;
        }

        const className =
          typeof container.className === "string" ? container.className : "";

        const match = className.match(/language-([\w+-]+)/);
        const language = normalizeLang(match?.[1] || "text");
        const source = codeElement.textContent || "";

        codeElement.innerHTML = highlight(source, language);
        codeElement.dataset.vixHighlighted = "1";
        container.classList.add("vix-styled");
      });
    };

    let frameId = 0;

    const queueHighlight = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        highlightMarkdownBlocks();
      });
    };

    const refresh = () => {
      queueHighlight();
      window.setTimeout(queueHighlight, 60);
      window.setTimeout(queueHighlight, 180);
    };

    window.requestAnimationFrame(refresh);

    const observer = new MutationObserver(queueHighlight);
    const appRoot = document.querySelector("#app");

    if (appRoot) {
      observer.observe(appRoot, {
        childList: true,
        subtree: true,
      });
    }

    if (router) {
      const previousAfterRouteChanged = router.onAfterRouteChanged;

      router.onAfterRouteChanged = (to) => {
        previousAfterRouteChanged?.(to);
        refresh();
      };
    }
  },
};
