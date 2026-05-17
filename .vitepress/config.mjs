import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",

  title: "Vix.cpp Blog",
  description:
    "Engineering notes about Vix.cpp, modern C++ tooling, build systems, runtime design, and developer experience.",

  base: "/",
  cleanUrls: true,
  lastUpdated: true,

  markdown: {
    html: true,
    lineNumbers: true,

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

  head: [
    ["link", { rel: "icon", href: "/assets/pwa/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#ffffff" }],

    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "Vix.cpp Blog" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Engineering notes about Vix.cpp, modern C++ tooling, build systems, runtime design, and developer experience.",
      },
    ],
    ["meta", { property: "og:site_name", content: "Vix.cpp Blog" }],

    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "Vix.cpp Blog" }],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Engineering notes about Vix.cpp, modern C++ tooling, build systems, runtime design, and developer experience.",
      },
    ],
  ],

  vite: {
    optimizeDeps: {
      include: ["mark.js", "minisearch"],
    },
    ssr: {
      noExternal: ["mark.js"],
    },
  },

  themeConfig: {
    siteTitle: "Vix.cpp",
    logo: "/assets/pwa/icon-192.png",

    appearance: false,

    nav: [
      { text: "Posts", link: "/posts/" },
      { text: "Docs", link: "https://docs.vixcpp.com/" },
      { text: "Registry", link: "https://registry.vixcpp.com/" },
      { text: "GitHub", link: "https://github.com/vixcpp/vix" },
    ],

    sidebar: {
      "/posts/": [
        {
          text: "Posts",
          items: [
            { text: "All posts", link: "/posts/" },
            { text: "Why Vix.cpp exists", link: "/posts/why-vix-exists" },
            { text: "vix.app", link: "/posts/vix-app" },
            { text: "Vix replay", link: "/posts/vix-replay" },
          ],
        },
      ],
    },

    search: {
      provider: "local",
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
          },
        },
      },
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/vixcpp/vix",
      },
      {
        icon: "x",
        link: "https://x.com/vix_cpp",
      },
    ],

    outline: {
      level: "deep",
      label: "On this page",
    },

    returnToTopLabel: "Back to top",

    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },

    editLink: {
      pattern: "https://github.com/vixcpp/blog/edit/main/:path",
      text: "Edit this post on GitHub",
    },

    docFooter: {
      prev: "Previous post",
      next: "Next post",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Vix.cpp",
    },
  },
});
