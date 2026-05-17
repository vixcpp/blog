import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",

  title: "Vix.cpp Blog",
  titleTemplate: ":title — Vix.cpp Blog",
  description:
    "Engineering notes on Vix.cpp, modern C++ tooling, build systems, runtime design, and developer experience.",

  base: "/",
  cleanUrls: true,
  lastUpdated: true,

  // ════════════════════════════════════════════════
  // MARKDOWN — Code blocks: cppreference.com style
  // ════════════════════════════════════════════════
  markdown: {
    html: true,
    // Line numbers off by default — blog posts read better without them.
    // Authors can opt-in per block with ```cpp:line-numbers
    lineNumbers: false,

    theme: {
      light: "github-light",
      dark: "github-light",
    },

    shikiSetup: async (highlighter) => {
      await highlighter.loadTheme({
        name: "cppreference",
        type: "light",
        colors: {
          "editor.background": "#fafaf6",
          "editor.foreground": "#000000",
          "editorLineNumber.foreground": "#999999",
        },
        tokenColors: [
          {
            scope: ["comment", "punctuation.definition.comment"],
            settings: { foreground: "#338033", fontStyle: "italic" },
          },
          {
            scope: [
              "keyword",
              "keyword.control",
              "keyword.other",
              "keyword.operator.new",
              "storage.type",
              "storage.modifier",
              "constant.language",
            ],
            settings: { foreground: "#0000ff", fontStyle: "bold" },
          },
          {
            scope: [
              "storage.type.built-in",
              "storage.type.primitive",
              "support.type.built-in",
              "storage.type.c",
              "storage.type.cpp",
            ],
            settings: { foreground: "#0000ff", fontStyle: "bold" },
          },
          {
            scope: [
              "meta.preprocessor",
              "keyword.control.directive",
              "punctuation.definition.directive",
              "entity.name.function.preprocessor",
            ],
            settings: { foreground: "#7f0055", fontStyle: "bold" },
          },
          {
            scope: [
              "string.quoted.other.lt-gt.include",
              "meta.preprocessor.include string",
              "punctuation.definition.string.begin.c",
              "punctuation.definition.string.end.c",
            ],
            settings: { foreground: "#1e8449", fontStyle: "italic" },
          },
          {
            scope: [
              "string",
              "string.quoted.double",
              "string.quoted.single",
              "punctuation.definition.string",
            ],
            settings: { foreground: "#a31515" },
          },
          {
            scope: [
              "constant.numeric",
              "constant.numeric.integer",
              "constant.numeric.float",
            ],
            settings: { foreground: "#098658" },
          },
          {
            scope: [
              "entity.name.function",
              "meta.function-call",
              "support.function",
            ],
            settings: { foreground: "#000000" },
          },
          {
            scope: ["variable", "variable.other", "meta.variable"],
            settings: { foreground: "#000000" },
          },
          {
            scope: ["keyword.operator", "punctuation"],
            settings: { foreground: "#000000" },
          },
          {
            scope: [
              "entity.name.type",
              "entity.name.namespace",
              "support.type",
            ],
            settings: { foreground: "#000000" },
          },
        ],
      });
    },
  },

  // ════════════════════════════════════════════════
  // HEAD — SEO, social, fonts
  // ════════════════════════════════════════════════
  head: [
    ["link", { rel: "icon", href: "/assets/pwa/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#ffffff" }],

    // Fonts (Inter + JetBrains Mono + Newsreader for serif blockquotes)
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&display=swap",
      },
    ],

    // Open Graph
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Vix.cpp Blog" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Engineering notes on Vix.cpp, modern C++ tooling, build systems, runtime design, and developer experience.",
      },
    ],
    ["meta", { property: "og:site_name", content: "Vix.cpp Blog" }],
    ["meta", { property: "og:url", content: "https://blog.vixcpp.com" }],

    // Twitter / X
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:site", content: "@vixcpp" }],
    ["meta", { name: "twitter:title", content: "Vix.cpp Blog" }],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Engineering notes on Vix.cpp, modern C++ tooling, build systems, runtime design, and developer experience.",
      },
    ],

    // RSS autodiscovery
    [
      "link",
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Vix.cpp Blog",
        href: "/rss.xml",
      },
    ],
  ],

  // ════════════════════════════════════════════════
  // VITE
  // ════════════════════════════════════════════════
  vite: {
    optimizeDeps: {
      include: ["mark.js", "minisearch"],
    },
    ssr: {
      noExternal: ["mark.js"],
    },
  },

  // ════════════════════════════════════════════════
  // THEME — Blog mode
  //   - NO sidebar (we hide it via CSS too)
  //   - NO default nav (custom blog header in Layout.vue)
  //   - NO outline by default (posts read top-to-bottom)
  //   - NO edit link (it's a blog, not docs)
  // ════════════════════════════════════════════════
  themeConfig: {
    siteTitle: false, // Hide default — custom brand in Layout.vue
    logo: false,
    appearance: false,

    // Empty nav array — our custom Layout.vue provides the blog header
    nav: [],

    // Empty sidebar — blog posts don't get a docs-style tree
    sidebar: [],

    // Disable aside (right outline) for a clean article view
    aside: false,
    outline: false,

    // Search still useful even on a blog
    search: {
      provider: "local",
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
          },
        },
        translations: {
          button: {
            buttonText: "Search articles",
            buttonAriaLabel: "Search articles",
          },
          modal: {
            displayDetails: "Show details",
            resetButtonTitle: "Reset",
            backButtonTitle: "Back",
            noResultsText: "No articles found for",
            footer: {
              selectText: "to select",
              navigateText: "to navigate",
              closeText: "to close",
            },
          },
        },
      },
    },

    // Disable doc-style features that don't fit a blog
    returnToTopLabel: "Back to top",
    externalLinkIcon: false,

    // Last updated info — useful for blog posts
    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "long",
      },
    },

    // No edit-on-GitHub link by default (overridable per-page via frontmatter)
    editLink: undefined,

    // Prev/Next between posts (still useful in chronological blog)
    docFooter: {
      prev: "Previous post",
      next: "Next post",
    },

    // Default footer disabled — we use custom one in Layout.vue
    footer: false,
  },
});
