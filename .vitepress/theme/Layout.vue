<script setup>
import DefaultTheme from "vitepress/theme";
import { useData, useRoute } from "vitepress";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
const route = useRoute();

const author = {
  name: "Gaspard Kirira",
  role: "Founder of Softadastra and creator of Vix.cpp",
  description:
    "Building open C++ tooling focused on simpler application development, reliable native workflows, and a more accessible C++ ecosystem.",
  website: "https://gaspardkirira.softadastra.com",
};

const navLinks = [
  { text: "Articles", href: "/posts/" },
  { text: "Changelog", href: "/posts/changelog/" },
  { text: "About", href: "/about" },
  { text: "Contribute", href: "/contribute" },
];

const externalLinks = [
  { text: "Docs", href: "https://docs.vixcpp.com" },
  { text: "Registry", href: "https://registry.vixcpp.com" },
  { text: "GitHub", href: "https://github.com/vixcpp/vix" },
];

const footerGroups = [
  {
    title: "Read",
    links: [
      { text: "All articles", href: "/posts/" },
      { text: "Release notes", href: "/posts/changelog/" },
      { text: "Roadmap", href: "/posts/roadmap/" },
      { text: "RSS feed", href: "/rss.xml" },
    ],
  },
  {
    title: "Vix.cpp",
    links: [
      { text: "Documentation", href: "https://docs.vixcpp.com" },
      { text: "Package registry", href: "https://registry.vixcpp.com" },
      { text: "GitHub repository", href: "https://github.com/vixcpp/vix" },
      { text: "Vix.cpp website", href: "https://vixcpp.com" },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        text: "Gaspard Kirira",
        href: "https://gaspardkirira.softadastra.com",
      },
      { text: "Softadastra", href: "https://softadastra.com" },
      { text: "X / Twitter", href: "https://x.com/vix_cpp" },
      { text: "Discord", href: "https://discord.gg/JEPD98yrme" },
    ],
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/vixcpp/vix",
    path: "M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 7.07c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/vix_cpp",
    path: "M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.8L5.3 22H2l7.3-8.4L1.7 2h6.9l4.7 6.1L18.9 2Zm-1.2 18h1.7L7.7 3.9H5.9L17.7 20Z",
  },
  {
    label: "RSS",
    href: "/rss.xml",
    path: "M4 4a16 16 0 0 1 16 16h-3A13 13 0 0 0 4 7V4Zm0 6a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7v-3Zm2.5 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z",
  },
];

const menuOpen = ref(false);
const scrolled = ref(false);
const readingProgress = ref(0);

const normalizedPath = computed(() => {
  const path = route.path || "/";
  return path.endsWith("/") ? path : `${path}/`;
});

const isHome = computed(
  () => route.path === "/" || route.path === "/index.html",
);

const postSegments = computed(() => route.path.split("/").filter(Boolean));

const isArticle = computed(() => {
  if (frontmatter.value?.layout === "home") return false;
  if (frontmatter.value?.article === false) return false;
  if (frontmatter.value?.author) return true;

  return postSegments.value[0] === "posts" && postSegments.value.length >= 3;
});

const postTag = computed(
  () =>
    frontmatter.value?.tag ||
    frontmatter.value?.category ||
    frontmatter.value?.section ||
    "",
);

const readingTime = computed(() => frontmatter.value?.readingTime || "");

const formattedDate = computed(() => {
  const raw = frontmatter.value?.date;
  if (!raw) return "";

  const date = raw instanceof Date ? raw : new Date(`${raw}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return String(raw);
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
});

function isExternal(href) {
  return /^https?:\/\//.test(href);
}

function isActiveLink(href) {
  if (isExternal(href)) return false;

  const normalizedHref = href.endsWith("/") ? href : `${href}/`;

  if (normalizedHref === "/posts/") {
    return (
      normalizedPath.value.startsWith("/posts/") &&
      !normalizedPath.value.startsWith("/posts/changelog/")
    );
  }

  return normalizedPath.value.startsWith(normalizedHref);
}

function updateScrollState() {
  scrolled.value = window.scrollY > 8;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  readingProgress.value =
    documentHeight > 0
      ? Math.min(100, Math.max(0, (window.scrollY / documentHeight) * 100))
      : 0;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

watch(
  () => route.path,
  async () => {
    closeMenu();
    readingProgress.value = 0;
    await nextTick();
    window.requestAnimationFrame(updateScrollState);
  },
);

watch(menuOpen, (open) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("blog-menu-open", open);
});

onMounted(() => {
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState, { passive: true });
  updateScrollState();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollState);
  window.removeEventListener("resize", updateScrollState);
  document.documentElement.classList.remove("blog-menu-open");
});
</script>

<template>
  <Layout>
    <template #layout-top>
      <header class="site-shell" :class="{ 'site-shell--scrolled': scrolled }">
        <div class="site-shell-inner">
          <a class="site-brand" href="/" aria-label="Vix.cpp Blog home">
            <svg
              class="site-logo"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="layout-logo-left"
                  x1="5"
                  y1="6"
                  x2="18"
                  y2="30"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stop-color="#d4fcd4" />
                  <stop offset="55%" stop-color="#4ade80" />
                  <stop offset="100%" stop-color="#22c55e" />
                </linearGradient>
                <linearGradient
                  id="layout-logo-right"
                  x1="31"
                  y1="6"
                  x2="18"
                  y2="30"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stop-color="#22c55e" />
                  <stop offset="100%" stop-color="#15803d" />
                </linearGradient>
              </defs>

              <polygon
                points="5,6 12,6 18,28 14,28"
                fill="url(#layout-logo-left)"
              />
              <polygon
                points="31,6 24,6 18,28 22,28"
                fill="url(#layout-logo-right)"
              />
            </svg>

            <span class="site-brand-copy">
              <span class="site-brand-name"> Vix<span>.cpp</span> </span>
              <span class="site-brand-label">Engineering Blog</span>
            </span>
          </a>

          <nav class="site-nav" aria-label="Primary navigation">
            <a
              v-for="link in navLinks"
              :key="link.text"
              :href="link.href"
              class="site-nav-link"
              :class="{ 'site-nav-link--active': isActiveLink(link.href) }"
            >
              {{ link.text }}
            </a>

            <span class="site-nav-separator" aria-hidden="true"></span>

            <a
              v-for="link in externalLinks"
              :key="link.text"
              :href="link.href"
              class="site-nav-link site-nav-link--external"
              target="_blank"
              rel="noreferrer"
            >
              {{ link.text }}
              <svg
                viewBox="0 0 12 12"
                width="10"
                height="10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 3h6v6M3 9l6-6"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                />
              </svg>
            </a>
          </nav>

          <div class="site-actions">
            <a
              class="site-icon-action"
              href="/rss.xml"
              aria-label="RSS feed"
              title="RSS feed"
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M4 4a16 16 0 0 1 16 16h-3A13 13 0 0 0 4 7V4Zm0 6a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7v-3Zm2.5 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                />
              </svg>
            </a>

            <a
              class="site-icon-action"
              href="https://github.com/vixcpp/vix"
              target="_blank"
              rel="noreferrer"
              aria-label="Vix.cpp on GitHub"
              title="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path :d="socialLinks[0].path" />
              </svg>
            </a>

            <button
              class="site-menu-toggle"
              :class="{ 'site-menu-toggle--open': menuOpen }"
              type="button"
              :aria-expanded="menuOpen"
              aria-controls="blog-mobile-menu"
              aria-label="Toggle navigation"
              @click="toggleMenu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <div
          id="blog-mobile-menu"
          class="site-mobile-menu"
          :class="{ 'site-mobile-menu--open': menuOpen }"
        >
          <nav aria-label="Mobile navigation">
            <a
              v-for="link in navLinks"
              :key="link.text"
              :href="link.href"
              class="site-mobile-link"
              :class="{ 'site-mobile-link--active': isActiveLink(link.href) }"
              @click="closeMenu"
            >
              {{ link.text }}
            </a>

            <div class="site-mobile-divider"></div>

            <a
              v-for="link in externalLinks"
              :key="link.text"
              :href="link.href"
              class="site-mobile-link site-mobile-link--external"
              target="_blank"
              rel="noreferrer"
              @click="closeMenu"
            >
              {{ link.text }}
              <span aria-hidden="true">↗</span>
            </a>

            <a
              class="site-mobile-author"
              :href="author.website"
              target="_blank"
              rel="noreferrer"
              @click="closeMenu"
            >
              <span>Written by</span>
              <strong>{{ author.name }}</strong>
            </a>
          </nav>
        </div>
      </header>

      <div v-if="isArticle" class="reading-progress" aria-hidden="true">
        <div
          class="reading-progress-bar"
          :style="{ width: `${readingProgress}%` }"
        ></div>
      </div>
    </template>

    <template #doc-before>
      <div v-if="isArticle" class="article-meta">
        <div class="article-meta-primary">
          <span v-if="postTag" class="article-meta-tag">{{ postTag }}</span>

          <time v-if="formattedDate">
            {{ formattedDate }}
          </time>

          <span
            v-if="formattedDate && readingTime"
            class="article-meta-dot"
            aria-hidden="true"
          ></span>

          <span v-if="readingTime">{{ readingTime }}</span>
        </div>

        <a
          class="article-meta-author"
          :href="author.website"
          target="_blank"
          rel="author noreferrer"
        >
          <span class="article-author-avatar" aria-hidden="true">GK</span>
          <span>
            <small>Written by</small>
            <strong>{{ author.name }}</strong>
          </span>
        </a>
      </div>
    </template>

    <template #doc-after>
      <aside v-if="isArticle" class="author-card">
        <div class="author-card-avatar" aria-hidden="true">GK</div>

        <div class="author-card-copy">
          <span class="author-card-label">About the author</span>
          <h2>{{ author.name }}</h2>
          <p class="author-card-role">{{ author.role }}</p>
          <p>{{ author.description }}</p>

          <a :href="author.website" target="_blank" rel="author noreferrer">
            Visit gaspardkirira.softadastra.com
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </aside>
    </template>

    <template #layout-bottom>
      <footer class="blog-footer">
        <div class="blog-footer-main">
          <div class="blog-footer-grid">
            <div class="blog-footer-brand">
              <a class="footer-brand-link" href="/">
                <svg
                  class="footer-logo"
                  viewBox="0 0 36 36"
                  fill="none"
                  aria-hidden="true"
                >
                  <polygon points="5,6 12,6 18,28 14,28" fill="#4ade80" />
                  <polygon points="31,6 24,6 18,28 22,28" fill="#16a34a" />
                </svg>

                <span>
                  <strong>Vix.cpp</strong>
                  <small>Engineering Blog</small>
                </span>
              </a>

              <p>
                Architecture, runtime internals, release notes, benchmarks, and
                implementation decisions from the Vix.cpp project.
              </p>

              <a
                class="footer-author-link"
                :href="author.website"
                target="_blank"
                rel="author noreferrer"
              >
                By {{ author.name }}
                <span aria-hidden="true">↗</span>
              </a>

              <div class="footer-socials">
                <a
                  v-for="link in socialLinks"
                  :key="link.label"
                  :href="link.href"
                  :target="isExternal(link.href) ? '_blank' : undefined"
                  :rel="isExternal(link.href) ? 'noreferrer' : undefined"
                  :aria-label="link.label"
                  :title="link.label"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path :d="link.path" />
                  </svg>
                </a>
              </div>
            </div>

            <div
              v-for="group in footerGroups"
              :key="group.title"
              class="blog-footer-column"
            >
              <h2>{{ group.title }}</h2>

              <ul>
                <li v-for="link in group.links" :key="link.text">
                  <a
                    :href="link.href"
                    :target="isExternal(link.href) ? '_blank' : undefined"
                    :rel="isExternal(link.href) ? 'noreferrer' : undefined"
                  >
                    {{ link.text }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="blog-footer-bottom">
          <div class="blog-footer-bottom-inner">
            <span>
              © 2026 Vix.cpp · Softadastra. Released under the MIT License.
            </span>

            <div>
              <a href="https://vixcpp.com">Vix.cpp</a>
              <span aria-hidden="true">·</span>
              <a href="https://softadastra.com">Softadastra</a>
              <span aria-hidden="true">·</span>
              <a :href="author.website" target="_blank" rel="author noreferrer">
                Gaspard Kirira
              </a>
            </div>
          </div>
        </div>
      </footer>
    </template>
  </Layout>
</template>

<style>
:root {
  --blog-header-height: 64px;
}

html.blog-menu-open {
  overflow: hidden;
}

.VPNav,
.VPLocalNav,
.VPFooter {
  display: none !important;
}

.VPContent {
  padding-top: var(--blog-header-height) !important;
}

.site-shell {
  position: fixed;
  inset: 0 0 auto;
  z-index: 1000;
  width: 100%;
  border-bottom: 1px solid transparent;
  background: rgba(19, 22, 25, 0.78);
  box-shadow: none;
  backdrop-filter: blur(18px) saturate(145%);
  -webkit-backdrop-filter: blur(18px) saturate(145%);
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.site-shell--scrolled {
  border-bottom-color: var(--line, rgba(255, 255, 255, 0.075));
  background: rgba(19, 22, 25, 0.93);
  box-shadow: 0 10px 34px rgba(0, 0, 0, 0.18);
}

.site-shell-inner {
  display: flex;
  align-items: center;
  width: min(calc(100% - 40px), var(--container, 1120px));
  min-height: var(--blog-header-height);
  margin: 0 auto;
  gap: 24px;
}

.site-brand {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: 10px;
  color: var(--text, rgba(255, 255, 255, 0.92));
  text-decoration: none !important;
}

.site-logo {
  width: 28px;
  height: 28px;
}

.site-brand-copy {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.site-brand-name {
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: 15px;
  font-weight: 790;
  letter-spacing: -0.025em;
  line-height: 1;
}

.site-brand-name span {
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-weight: 440;
}

.site-brand-label {
  padding: 3px 7px;
  border: 1px solid rgba(34, 197, 94, 0.16);
  border-radius: 999px;
  color: var(--green-bright, #86efac);
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.045em;
  line-height: 1;
  text-transform: uppercase;
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 2px;
}

.site-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 34px;
  padding: 7px 10px;
  border-radius: 7px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-size: 12px;
  font-weight: 580;
  text-decoration: none !important;
  transition:
    color 150ms ease,
    background 150ms ease;
}

.site-nav-link:hover {
  color: var(--text, rgba(255, 255, 255, 0.92));
  background: rgba(255, 255, 255, 0.04);
}

.site-nav-link--active {
  color: var(--green-bright, #86efac);
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
}

.site-nav-link--external svg {
  opacity: 0.5;
}

.site-nav-separator {
  width: 1px;
  height: 16px;
  margin: 0 5px;
  background: var(--line, rgba(255, 255, 255, 0.075));
}

.site-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 4px;
}

.site-icon-action,
.site-menu-toggle {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  background: transparent;
  text-decoration: none !important;
  transition:
    color 150ms ease,
    border-color 150ms ease,
    background 150ms ease;
}

.site-icon-action:hover,
.site-menu-toggle:hover {
  border-color: var(--line-strong, rgba(255, 255, 255, 0.12));
  color: var(--green-soft, #4ade80);
  background: rgba(255, 255, 255, 0.04);
}

.site-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 0;
  cursor: pointer;
}

.site-menu-toggle span {
  width: 15px;
  height: 1.5px;
  border-radius: 999px;
  background: currentColor;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.site-menu-toggle--open span:first-child {
  transform: translateY(5.5px) rotate(45deg);
}

.site-menu-toggle--open span:nth-child(2) {
  opacity: 0;
}

.site-menu-toggle--open span:last-child {
  transform: translateY(-5.5px) rotate(-45deg);
}

.site-mobile-menu {
  display: none;
  max-height: 0;
  overflow: hidden;
  border-top: 1px solid transparent;
  background: rgba(19, 22, 25, 0.98);
  transition:
    max-height 220ms ease,
    border-color 220ms ease;
}

.site-mobile-menu--open {
  max-height: 620px;
  border-top-color: var(--line, rgba(255, 255, 255, 0.075));
}

.site-mobile-menu nav {
  display: flex;
  flex-direction: column;
  width: min(calc(100% - 28px), var(--container, 1120px));
  margin: 0 auto;
  padding: 12px 0 18px;
}

.site-mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  padding: 9px 11px;
  border-radius: 8px;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 14px;
  font-weight: 580;
  text-decoration: none !important;
}

.site-mobile-link:hover,
.site-mobile-link--active {
  color: var(--green-bright, #86efac);
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
}

.site-mobile-divider {
  height: 1px;
  margin: 8px 10px;
  background: var(--line, rgba(255, 255, 255, 0.075));
}

.site-mobile-author {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 10px;
  padding: 13px;
  border: 1px solid rgba(34, 197, 94, 0.16);
  border-radius: 10px;
  color: var(--text, rgba(255, 255, 255, 0.92));
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
  text-decoration: none !important;
}

.site-mobile-author span {
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 8.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.site-mobile-author strong {
  font-size: 14px;
}

.reading-progress {
  position: fixed;
  top: var(--blog-header-height);
  right: 0;
  left: 0;
  z-index: 999;
  height: 2px;
  pointer-events: none;
}

.reading-progress-bar {
  height: 100%;
  border-radius: 0 999px 999px 0;
  background: linear-gradient(
    90deg,
    var(--green-strong, #16a34a),
    var(--green, #22c55e),
    var(--green-soft, #4ade80)
  );
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.24);
  transition: width 80ms linear;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  width: min(100%, var(--reading-width, 760px));
  margin: 0 auto;
  padding: 55px 0 0;
}

.article-meta-primary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 9.5px;
  line-height: 1.5;
}

.article-meta-tag {
  padding: 4px 8px;
  border: 1px solid rgba(34, 197, 94, 0.18);
  border-radius: 999px;
  color: var(--green-bright, #86efac);
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
  font-weight: 700;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.article-meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-faint, rgba(255, 255, 255, 0.28));
}

.article-meta-author {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: 9px;
  color: inherit;
  text-decoration: none !important;
}

.article-author-avatar,
.author-card-avatar {
  display: grid;
  place-items: center;
  border: 1px solid rgba(34, 197, 94, 0.24);
  border-radius: 50%;
  color: var(--green-bright, #86efac);
  background:
    radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.18), transparent),
    var(--bg-panel-strong, #20252a);
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-weight: 750;
}

.article-author-avatar {
  width: 34px;
  height: 34px;
  font-size: 9px;
}

.article-meta-author > span:last-child {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.article-meta-author small {
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-size: 8.5px;
  line-height: 1.2;
}

.article-meta-author strong {
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 11px;
  line-height: 1.3;
  transition: color 150ms ease;
}

.article-meta-author:hover strong {
  color: var(--green-soft, #4ade80);
}

.article-meta + .vp-doc {
  padding-top: 24px !important;
}

.author-card {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 24px;
  width: min(calc(100% - 40px), var(--reading-width, 760px));
  margin: 18px auto 86px;
  padding: 28px;
  border: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  border-radius: var(--radius-lg, 16px);
  background:
    linear-gradient(120deg, rgba(34, 197, 94, 0.055), transparent 52%),
    var(--bg-panel, #1a1e22);
  box-shadow: var(--shadow-soft, 0 4px 24px rgba(0, 0, 0, 0.35));
}

.author-card-avatar {
  width: 74px;
  height: 74px;
  font-size: 17px;
}

.author-card-label {
  color: var(--green-soft, #4ade80);
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.075em;
  text-transform: uppercase;
}

.author-card h2 {
  margin: 7px 0 0;
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: 21px;
  font-weight: 720;
  letter-spacing: -0.035em;
}

.author-card-role {
  margin: 4px 0 0 !important;
  color: var(--text-soft, rgba(255, 255, 255, 0.64)) !important;
  font-size: 12.5px !important;
  font-weight: 600;
}

.author-card p:not(.author-card-role) {
  max-width: 620px;
  margin: 13px 0 0;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 13px;
  line-height: 1.7;
}

.author-card a {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 17px;
  color: var(--green-soft, #4ade80);
  font-size: 12px;
  font-weight: 670;
  text-decoration: none !important;
}

.author-card a svg {
  transition: transform 150ms ease;
}

.author-card a:hover svg {
  transform: translateX(4px);
}

.blog-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  background: #101316;
}

.blog-footer-main {
  background:
    radial-gradient(
      600px 260px at 10% 100%,
      rgba(34, 197, 94, 0.055),
      transparent 70%
    ),
    transparent;
}

.blog-footer-grid {
  display: grid;
  grid-template-columns: minmax(250px, 1.5fr) repeat(3, minmax(130px, 0.72fr));
  gap: 58px;
  width: min(calc(100% - 40px), var(--container, 1120px));
  margin: 0 auto;
  padding: 62px 0 48px;
}

.footer-brand-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none !important;
}

.footer-logo {
  width: 29px;
  height: 29px;
}

.footer-brand-link > span {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-brand-link strong {
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: 15px;
  font-weight: 770;
  letter-spacing: -0.025em;
}

.footer-brand-link small {
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 8px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.blog-footer-brand > p {
  max-width: 330px;
  margin: 18px 0 0;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-size: 12.5px;
  line-height: 1.7;
}

.footer-author-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 16px;
  color: var(--green-soft, #4ade80);
  font-size: 11.5px;
  font-weight: 650;
  text-decoration: none !important;
}

.footer-socials {
  display: flex;
  gap: 6px;
  margin-top: 22px;
}

.footer-socials a {
  display: grid;
  place-items: center;
  width: 33px;
  height: 33px;
  border: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  border-radius: 8px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  background: rgba(255, 255, 255, 0.018);
  text-decoration: none !important;
  transition:
    color 150ms ease,
    border-color 150ms ease,
    background 150ms ease,
    transform 150ms ease;
}

.footer-socials a:hover {
  transform: translateY(-2px);
  border-color: rgba(34, 197, 94, 0.24);
  color: var(--green-soft, #4ade80);
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
}

.blog-footer-column h2 {
  margin: 2px 0 17px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.blog-footer-column ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-footer-column a {
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 12.5px;
  font-weight: 530;
  text-decoration: none !important;
  transition: color 150ms ease;
}

.blog-footer-column a:hover {
  color: var(--green-soft, #4ade80);
}

.blog-footer-bottom {
  border-top: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  background: rgba(0, 0, 0, 0.08);
}

.blog-footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: min(calc(100% - 40px), var(--container, 1120px));
  min-height: 66px;
  margin: 0 auto;
  color: var(--text-faint, rgba(255, 255, 255, 0.28));
  font-size: 10.5px;
}

.blog-footer-bottom-inner > div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.blog-footer-bottom a {
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  text-decoration: none !important;
}

.blog-footer-bottom a:hover {
  color: var(--green-soft, #4ade80);
}

@media (max-width: 980px) {
  .site-nav {
    display: none;
  }

  .site-actions {
    margin-left: auto;
  }

  .site-menu-toggle {
    display: flex;
  }

  .site-mobile-menu {
    display: block;
  }

  .blog-footer-grid {
    grid-template-columns: 1.4fr repeat(2, 1fr);
  }

  .blog-footer-column:last-child {
    grid-column: 2 / -1;
  }
}

@media (max-width: 720px) {
  :root {
    --blog-header-height: 58px;
  }

  .site-shell-inner,
  .blog-footer-grid,
  .blog-footer-bottom-inner {
    width: min(calc(100% - 28px), var(--container, 1120px));
  }

  .site-brand-label {
    display: none;
  }

  .site-icon-action {
    display: none;
  }

  .site-icon-action:first-child {
    display: grid;
  }

  .article-meta {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    width: min(calc(100% - 32px), var(--reading-width, 760px));
    padding-top: 38px;
  }

  .article-meta + .vp-doc {
    padding-top: 20px !important;
  }

  .author-card {
    grid-template-columns: 52px minmax(0, 1fr);
    gap: 17px;
    width: min(calc(100% - 28px), var(--reading-width, 760px));
    margin-bottom: 66px;
    padding: 22px;
  }

  .author-card-avatar {
    width: 52px;
    height: 52px;
    font-size: 12px;
  }

  .blog-footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 38px 28px;
    padding: 46px 0 38px;
  }

  .blog-footer-brand {
    grid-column: 1 / -1;
  }

  .blog-footer-column:last-child {
    grid-column: auto;
  }

  .blog-footer-bottom-inner {
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    min-height: 90px;
    padding: 18px 0;
  }
}

@media (max-width: 480px) {
  .site-brand-copy {
    gap: 5px;
  }

  .site-brand-name {
    font-size: 14px;
  }

  .author-card {
    grid-template-columns: 1fr;
  }

  .blog-footer-grid {
    grid-template-columns: 1fr;
  }

  .blog-footer-brand,
  .blog-footer-column:last-child {
    grid-column: auto;
  }

  .blog-footer-bottom-inner > div {
    flex-wrap: wrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-shell *,
  .author-card *,
  .blog-footer * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
