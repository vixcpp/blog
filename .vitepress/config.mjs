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
  },

  head: [
    ["link", { rel: "icon", href: "/assets/pwa/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#0b0e14" }],

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

    appearance: true,

    nav: [
      { text: "Blog", link: "/" },
      { text: "Posts", link: "/posts/" },
      { text: "Docs", link: "https://docs.vixcpp.com/" },
      { text: "Registry", link: "https://registry.vixcpp.com/" },
      { text: "GitHub", link: "https://github.com/vixcpp/vix" },
    ],

    sidebar: {
      "/posts/": [
        {
          text: "Posts",
          items: [{ text: "All posts", link: "/posts/" }],
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
        link: "https://x.com/",
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
