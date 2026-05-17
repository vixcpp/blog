<script setup>
import DefaultTheme from "vitepress/theme";
import { useData, useRoute } from "vitepress";
import { computed, ref, onMounted, onUnmounted } from "vue";

const { Layout } = DefaultTheme;
const { frontmatter, page } = useData();
const route = useRoute();

/* ── Navigation links ── */
const navLinks = [
  { text: "Articles",  href: "/posts/" },
  { text: "About",     href: "/about" },
];

const externalLinks = [
  { text: "Docs",      href: "https://vixcpp.com" },
  { text: "GitHub",    href: "https://github.com/vixcpp" },
];

/* ── Social links ── */
const social = [
  {
    label: "GitHub",
    href:  "https://github.com/vixcpp",
    icon: `<path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 7.07c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>`,
  },
  {
    label: "X / Twitter",
    href:  "https://x.com/vix_cpp",
    icon: `<path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.8L5.3 22H2l7.3-8.4L1.7 2h6.9l4.7 6.1L18.9 2Zm-1.2 18h1.7L7.7 3.9H5.9L17.7 20Z"/>`,
  },
  {
    label: "Discord",
    href:  "https://discord.gg/JEPD98yrme",
    icon: `<path d="M20 4.5a16.3 16.3 0 0 0-4-1.3l-.2.4a15.5 15.5 0 0 1 3 1.2 11.9 11.9 0 0 0-3.7-1.1c-.6.8-1 1.7-1.2 2.1a14.5 14.5 0 0 0-3.8 0c-.2-.4-.6-1.3-1.2-2.1A11.9 11.9 0 0 0 5.2 4.8a15.5 15.5 0 0 1 3-1.2l-.2-.4a16.3 16.3 0 0 0-4 1.3C2.4 7 1.8 9.4 2 12c1.3 2 3.3 3.2 5.6 3.7l.4-.6a9.4 9.4 0 0 1-1.8-.9l.4-.3c1.1.5 2.3.9 3.5 1.1a13 13 0 0 0 4.8 0c1.2-.2 2.4-.6 3.5-1.1l.4.3c-.6.4-1.2.7-1.8.9l.4.6c2.3-.5 4.3-1.7 5.6-3.7.3-2.6-.4-5-2-7.5ZM9.2 12.9c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4Zm5.6 0c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4Z"/>`,
  },
  {
    label: "RSS",
    href:  "/rss.xml",
    icon: `<path d="M4 4a16 16 0 0 1 16 16h-3A13 13 0 0 0 4 7V4Zm0 6a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7v-3Zm2.5 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>`,
  },
];

/* ── Scroll-aware header ── */
const scrolled = ref(false);
const handleScroll = () => { scrolled.value = window.scrollY > 8; };

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

/* ── Mobile menu ── */
const menuOpen = ref(false);
const toggleMenu = () => { menuOpen.value = !menuOpen.value; };

/* ── Is this a post page? ── */
const isHome = computed(() =>
  route.path === "/" || route.path === "/index.html"
);

/* ── Reading time helper for posts ── */
const readingTime = computed(() => frontmatter.value?.readingTime || "");
const postDate    = computed(() => frontmatter.value?.date || "");
const postAuthor  = computed(() => frontmatter.value?.author || "Vix.cpp team");
const postTag     = computed(() => frontmatter.value?.tag || frontmatter.value?.category || "");
const isPost      = computed(() => !!frontmatter.value?.date || route.path.startsWith("/posts/"));
</script>

<template>
  <Layout>
    <!-- ════════════════════════════
         BLOG HEADER (replaces nav)
         ════════════════════════════ -->
    <template #nav-bar-title-before>
      <!-- VitePress slot fallback — not used here -->
    </template>

    <template #layout-top>
      <header class="bh-header" :class="{ 'bh-header--scrolled': scrolled }">
        <div class="bh-header-inner">

          <!-- Brand -->
          <a class="bh-brand" href="/" aria-label="Vix.cpp Blog home">
            <svg class="bh-logo" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bhl" x1="5" y1="6" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stop-color="#d4fcd4"/>
                  <stop offset="55%"  stop-color="#4ade80"/>
                  <stop offset="100%" stop-color="#22c55e"/>
                </linearGradient>
                <linearGradient id="bhr" x1="31" y1="6" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stop-color="#22c55e"/>
                  <stop offset="100%" stop-color="#15803d"/>
                </linearGradient>
              </defs>
              <polygon points="5,6 12,6 18,28 14,28"  fill="url(#bhl)"/>
              <polygon points="31,6 24,6 18,28 22,28" fill="url(#bhr)"/>
            </svg>
            <span class="bh-brand-text">
              <span class="bh-brand-name">Vix<span class="bh-brand-dim">.cpp</span></span>
              <span class="bh-brand-tag">Blog</span>
            </span>
          </a>

          <!-- Desktop nav -->
          <nav class="bh-nav" aria-label="Main navigation">
            <a
              v-for="l in navLinks"
              :key="l.text"
              :href="l.href"
              class="bh-nav-link"
              :class="{ 'bh-nav-link--active': route.path.startsWith(l.href) && l.href !== '/' }"
            >
              {{ l.text }}
            </a>

            <span class="bh-nav-divider" aria-hidden="true"></span>

            <a
              v-for="l in externalLinks"
              :key="l.text"
              :href="l.href"
              class="bh-nav-link bh-nav-link--muted"
              :target="l.href.startsWith('http') ? '_blank' : undefined"
              :rel="l.href.startsWith('http') ? 'noreferrer' : undefined"
            >
              {{ l.text }}
              <svg
                v-if="l.href.startsWith('http')"
                class="bh-nav-ext"
                viewBox="0 0 12 12"
                width="10"
                height="10"
                aria-hidden="true"
              >
                <path d="M3 3h6v6M3 9l6-6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              </svg>
            </a>
          </nav>

          <!-- Right actions -->
          <div class="bh-actions">
            <a
              href="/rss.xml"
              class="bh-icon-btn"
              aria-label="RSS feed"
              title="RSS feed"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                <path d="M4 4a16 16 0 0 1 16 16h-3A13 13 0 0 0 4 7V4Zm0 6a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7v-3Zm2.5 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>
              </svg>
            </a>

            <a
              href="https://github.com/vixcpp"
              class="bh-icon-btn"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 7.07c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.5-.01 2.84 0 .27.18.59.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>
              </svg>
            </a>

            <button
              class="bh-mobile-toggle"
              :class="{ 'bh-mobile-toggle--open': menuOpen }"
              type="button"
              aria-label="Toggle menu"
              @click="toggleMenu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div class="bh-mobile-menu" :class="{ 'bh-mobile-menu--open': menuOpen }">
          <nav class="bh-mobile-nav" aria-label="Mobile navigation">
            <a
              v-for="l in navLinks"
              :key="l.text"
              :href="l.href"
            class="bh-mobile-link"
:class="{ 'bh-mobile-link--active': route.path.startsWith(l.href) && l.href !== '/' }"
              @click="menuOpen = false"
            >
              {{ l.text }}
            </a>
            <div class="bh-mobile-divider"></div>
            <a
              v-for="l in externalLinks"
              :key="l.text"
              :href="l.href"
              class="bh-mobile-link bh-mobile-link--muted"
              :target="l.href.startsWith('http') ? '_blank' : undefined"
              :rel="l.href.startsWith('http') ? 'noreferrer' : undefined"
              @click="menuOpen = false"
            >
              {{ l.text }} ↗
            </a>
          </nav>
        </div>
      </header>

      <!-- Reading progress bar for posts -->
      <div v-if="isPost" class="bh-progress" aria-hidden="true">
        <div class="bh-progress-bar"></div>
      </div>
    </template>

    <!-- ════════════════════════════
         FOOTER
         ════════════════════════════ -->
    <template #layout-bottom>
      <footer class="bf" role="contentinfo">

        <!-- Main footer -->
        <div class="bf-main">
          <div class="bf-main-inner">

            <!-- Brand column -->
            <div class="bf-col bf-col--brand">
              <a class="bf-brand" href="/">
                <svg class="bf-logo" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="bfl" x1="5" y1="6" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                      <stop offset="0%"   stop-color="#d4fcd4"/>
                      <stop offset="55%"  stop-color="#4ade80"/>
                      <stop offset="100%" stop-color="#22c55e"/>
                    </linearGradient>
                    <linearGradient id="bfr" x1="31" y1="6" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                      <stop offset="0%"   stop-color="#22c55e"/>
                      <stop offset="100%" stop-color="#15803d"/>
                    </linearGradient>
                  </defs>
                  <polygon points="5,6 12,6 18,28 14,28"  fill="url(#bfl)"/>
                  <polygon points="31,6 24,6 18,28 22,28" fill="url(#bfr)"/>
                </svg>
                <span class="bf-brand-name">Vix<span class="bf-brand-dim">.cpp</span></span>
              </a>
              <p class="bf-tagline">
                Modern C++ tooling.<br/>
                Built for the people who ship.
              </p>

              <div class="bf-social">
                <a
  v-for="s in social"
  :key="s.label"
  :href="s.href"
  class="bf-social-icon"
  :target="s.href.startsWith('http') ? '_blank' : undefined"
  :rel="s.href.startsWith('http') ? 'noreferrer' : undefined"
  :aria-label="s.label"
>
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="currentColor"
    aria-hidden="true"
    v-html="s.icon"
  ></svg>
</a>
              </div>
            </div>

            <!-- Blog column -->
            <div class="bf-col">
              <h4 class="bf-col-title">Blog</h4>
              <ul class="bf-list">
                <li><a href="/posts/">All articles</a></li>
                <li><a href="/authors/">Authors</a></li>
                <li><a href="/rss.xml">RSS feed</a></li>
              </ul>
            </div>

            <!-- Project column -->
            <div class="bf-col">
              <h4 class="bf-col-title">Vix.cpp</h4>
              <ul class="bf-list">
                <li><a href="https://vixcpp.com">Documentation</a></li>
                <li><a href="https://registry.vixcpp.com">Registry</a></li>
                <li><a href="https://github.com/vixcpp">GitHub</a></li>
                <li><a href="https://github.com/vixcpp/vix.cpp/releases">Releases</a></li>
              </ul>
            </div>

            <!-- Community column -->
            <div class="bf-col">
              <h4 class="bf-col-title">Community</h4>
              <ul class="bf-list">
                <li><a href="https://discord.gg/vixcpp">Discord</a></li>
                <li><a href="https://x.com/vix_cpp">X / Twitter</a></li>
                <li><a href="https://www.youtube.com/@vixcpp">YouTube</a></li>
                <li><a href="/contribute">Contribute</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="bf-bottom">
          <div class="bf-bottom-inner">
            <span class="bf-copy">
              © 2026 Vix.cpp · Softadastra. Released under the MIT License.
            </span>
            <div class="bf-meta">
              <a href="/privacy">Privacy</a>
              <span class="bf-dot">·</span>
              <a href="/terms">Terms</a>
              <span class="bf-dot">·</span>
              <span class="bf-built">
                Built with
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true" class="bf-heart">
                  <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5 6 5c2 0 3.5 1 4 2 .5-1 2-2 4-2 3.5 0 5 4 3.5 7-2.5 4.5-9.5 9-9.5 9z"/>
                </svg>
                in C++
              </span>
            </div>
          </div>
        </div>
      </footer>
    </template>
  </Layout>
</template>

<style>
/* ════════════════════════════════════════════════
   BLOG HEADER
   Sticky, refined, with scroll-aware shadow
   ════════════════════════════════════════════════ */

.bh-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid transparent;
  transition: background .2s ease, border-color .2s ease, box-shadow .2s ease;
}

.bh-header--scrolled {
  background: rgba(255, 255, 255, 0.92);
  border-bottom-color: rgba(10, 10, 10, 0.06);
  box-shadow: 0 1px 0 rgba(10, 10, 10, 0.02);
}

.bh-header-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
}

/* Brand */
.bh-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none !important;
  flex-shrink: 0;
}

.bh-logo {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
}

.bh-brand-text {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
}

.bh-brand-name {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #0a0a0a;
  line-height: 1;
}

.bh-brand-dim {
  font-weight: 400;
  color: #737373;
}

.bh-brand-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: #16a34a;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(22, 163, 74, 0.08);
  border: 1px solid rgba(22, 163, 74, 0.18);
  line-height: 1;
}

/* Nav */
.bh-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  justify-content: center;
}

.bh-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 12px;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.005em;
  color: #525252;
  text-decoration: none !important;
  border-radius: 7px;
  transition: all .15s ease;
}

.bh-nav-link:hover {
  color: #0a0a0a;
  background: rgba(10, 10, 10, 0.04);
}

.bh-nav-link--active {
  color: #0a0a0a;
  font-weight: 600;
  background: rgba(10, 10, 10, 0.05);
}

.bh-nav-link--muted {
  color: #737373;
}

.bh-nav-ext {
  opacity: 0.5;
  transition: opacity .15s ease;
}

.bh-nav-link:hover .bh-nav-ext {
  opacity: 1;
}

.bh-nav-divider {
  width: 1px;
  height: 16px;
  background: rgba(10, 10, 10, 0.10);
  margin: 0 6px;
}

/* Actions */
.bh-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.bh-icon-btn {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: #525252;
  text-decoration: none !important;
  border-radius: 7px;
  border: 1px solid transparent;
  transition: all .15s ease;
}

.bh-icon-btn:hover {
  color: #0a0a0a;
  background: rgba(10, 10, 10, 0.04);
  border-color: rgba(10, 10, 10, 0.08);
}

.bh-subscribe-btn {
  margin-left: 4px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #ffffff !important;
  background: #0a0a0a;
  border: 1px solid #0a0a0a;
  border-radius: 7px;
  text-decoration: none !important;
  transition: all .15s ease;
}

.bh-subscribe-btn:hover {
  background: #000000;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

/* Mobile toggle */
.bh-mobile-toggle {
  display: none;
  width: 34px;
  height: 34px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: transparent;
  border: 1px solid rgba(10, 10, 10, 0.08);
  border-radius: 7px;
  cursor: pointer;
  padding: 0;
  transition: all .15s ease;
}

.bh-mobile-toggle span {
  display: block;
  width: 16px;
  height: 1.5px;
  background: #0a0a0a;
  border-radius: 999px;
  transition: all .2s ease;
}

.bh-mobile-toggle--open span:nth-child(1) {
  transform: translateY(5.5px) rotate(45deg);
}

.bh-mobile-toggle--open span:nth-child(2) {
  opacity: 0;
}

.bh-mobile-toggle--open span:nth-child(3) {
  transform: translateY(-5.5px) rotate(-45deg);
}

/* Mobile menu */
.bh-mobile-menu {
  display: none;
  background: #ffffff;
  border-bottom: 1px solid rgba(10, 10, 10, 0.06);
  overflow: hidden;
  max-height: 0;
  transition: max-height .25s ease;
}

.bh-mobile-menu--open {
  max-height: 400px;
}

.bh-mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 8px 24px 16px;
  gap: 2px;
}

.bh-mobile-link {
  padding: 11px 12px;
  font-size: 15px;
  font-weight: 500;
  color: #0a0a0a;
  text-decoration: none !important;
  border-radius: 7px;
  transition: background .15s ease;
}

.bh-mobile-link:hover {
  background: rgba(10, 10, 10, 0.04);
}

.bh-mobile-link--muted {
  color: #525252;
  font-weight: 400;
}

.bh-mobile-divider {
  height: 1px;
  background: rgba(10, 10, 10, 0.06);
  margin: 6px 12px;
}

/* Reading progress bar (for post pages) */
.bh-progress {
  position: sticky;
  top: 64px;
  z-index: 99;
  height: 2px;
  background: transparent;
  pointer-events: none;
}

.bh-progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #16a34a, #22c55e, #4ade80);
  transition: width .1s ease;
}

/* ── Hide default VitePress nav since we replace it ── */
.VPNav { display: none !important; }
.VPLocalNav { display: none !important; }
.VPContent { padding-top: 0 !important; }


/* ════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════ */

.bf {
  border-top: 1px solid rgba(10, 10, 10, 0.06);
  background: #ffffff;
  flex-shrink: 0;
}

/* Main footer */
.bf-main {
  background: #fafafa;
  border-top: 1px solid rgba(10, 10, 10, 0.06);
}

.bf-main-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 56px 24px 40px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px;
}

.bf-col-title {
  margin: 0 0 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #737373;
}

.bf-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bf-list a {
  font-size: 14px;
  font-weight: 500;
  color: #525252;
  text-decoration: none !important;
  letter-spacing: -0.005em;
  transition: color .15s ease;
}

.bf-list a:hover {
  color: #0a0a0a;
}

/* Brand column */
.bf-col--brand {
  max-width: 320px;
}

.bf-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none !important;
  margin-bottom: 14px;
}

.bf-logo {
  width: 26px;
  height: 26px;
}

.bf-brand-name {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #0a0a0a;
}

.bf-brand-dim {
  font-weight: 400;
  color: #737373;
}

.bf-tagline {
  margin: 0 0 24px;
  font-size: 14px;
  line-height: 1.6;
  color: #525252;
  letter-spacing: -0.005em;
}

.bf-social {
  display: flex;
  gap: 6px;
}

.bf-social-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: #737373;
  text-decoration: none !important;
  border-radius: 7px;
  border: 1px solid rgba(10, 10, 10, 0.08);
  background: #ffffff;
  transition: all .15s ease;
}

.bf-social-icon:hover {
  color: #0a0a0a;
  background: #ffffff;
  border-color: rgba(10, 10, 10, 0.20);
  transform: translateY(-1px);
}

/* Bottom bar */
.bf-bottom {
  background: #fafafa;
  border-top: 1px solid rgba(10, 10, 10, 0.06);
}

.bf-bottom-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.bf-copy {
  font-size: 12.5px;
  color: #737373;
  letter-spacing: -0.005em;
}

.bf-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12.5px;
  color: #737373;
}

.bf-meta a {
  color: #737373;
  text-decoration: none !important;
  transition: color .15s ease;
}

.bf-meta a:hover {
  color: #0a0a0a;
}

.bf-dot {
  color: rgba(10, 10, 10, 0.20);
}

.bf-built {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.bf-heart {
  color: #ef4444;
  animation: bf-heart-pulse 1.4s ease-in-out infinite;
}

@keyframes bf-heart-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.15); }
}

/* Disable default VitePress footer */
.VPFooter { display: none !important; }


/* ════════════════════════════════════════════════
   RESPONSIVE
   ════════════════════════════════════════════════ */

@media (max-width: 960px) {
  .bf-main-inner {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .bf-col--brand {
    grid-column: 1 / -1;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .bh-nav {
    display: none;
  }

  .bh-mobile-toggle {
    display: flex;
  }

  .bh-mobile-menu {
    display: block;
  }

  .bh-subscribe-btn {
    display: none;
  }

  .bh-icon-btn:not(:last-of-type) {
    display: none;
  }

  .bh-header-inner {
    padding: 12px 20px;
    gap: 12px;
  }

  .bh-brand-tag {
    display: none;
  }

  .bf-main-inner {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    padding: 40px 20px 32px;
  }

  .bf-bottom-inner {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .bf-main-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
.bh-mobile-link:hover {
  color: #15803d;
  background: rgba(22, 163, 74, 0.07);
}
.bh-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 12px;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.005em;
  color: #525252;
  text-decoration: none !important;
  border-radius: 7px;
  transition:
    color .15s ease,
    background .15s ease,
    border-color .15s ease;
}

.bh-nav-link:hover {
  color: #15803d;
  background: rgba(22, 163, 74, 0.07);
}

.bh-nav-link--active {
  color: #15803d;
  font-weight: 700;
  background: rgba(22, 163, 74, 0.10);
  box-shadow: inset 0 0 0 1px rgba(22, 163, 74, 0.18);
}
.bh-mobile-link[aria-current="page"],
.bh-mobile-link--active {
  color: #15803d;
  font-weight: 700;
  background: rgba(22, 163, 74, 0.10);
}
.bf-social-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: #0a0a0a;
  text-decoration: none !important;
  border-radius: 7px;
  border: 1px solid rgba(10, 10, 10, 0.14);
  background: #f4f4f5;
  transition: all .15s ease;
}

.bf-social-icon:hover {
  color: #15803d;
  background: rgba(22, 163, 74, 0.10);
  border-color: rgba(22, 163, 74, 0.28);
  transform: translateY(-1px);
}
</style>
