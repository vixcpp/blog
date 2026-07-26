<script setup>
const latestRelease = {
  eyebrow: "Latest release",
  version: "Vix.cpp v2.7.8",
  date: "July 19, 2026",
  title: "Vix Note is now open to package-based extensions.",
  description:
    "The latest release adds installable Note extensions, custom cell types, external runtimes, extension management, a modernized Reply editor, and more reliable global CLI package installation.",
  href: "/posts/changelog/v2.7.8",
};

const readingPaths = [
  {
    index: "01",
    label: "Architecture",
    title: "Understand why Vix is built this way.",
    description:
      "Read the decisions behind vix.app, application modules, SDK profiles, runtime boundaries, and the long-term direction of the platform.",
    href: "/posts/roadmap/",
    action: "Explore architecture",
  },
  {
    index: "02",
    label: "Build system",
    title: "Follow a C++ build from source to executable.",
    description:
      "Study project resolution, generated CMake, build planning, graph execution, incremental builds, object caching, and native build work.",
    href: "/posts/vix-build/",
    action: "Study the build system",
  },
  {
    index: "03",
    label: "Runtime",
    title: "Inspect execution, diagnostics, and performance.",
    description:
      "See how Vix runs programs, reports failures, records executions, manages lifecycle behavior, and validates the native HTTP runtime.",
    href: "/posts/vix-core/",
    action: "Inspect the runtime",
  },
];

const featuredArticles = [
  {
    tag: "Application architecture",
    title: "Why vix.app exists",
    description:
      "The problem an application manifest solves, where CMake still belongs, and how Vix keeps common project workflows understandable.",
    href: "/posts/vix-app/why-vix-app-exists",
  },
  {
    tag: "Build internals",
    title: "How vix build works",
    description:
      "A complete look at project discovery, configuration, build planning, backend selection, target execution, and failure handling.",
    href: "/posts/vix-build/how-vix-build-works",
  },
  {
    tag: "Diagnostics",
    title: "Turning C++ failures into actionable diagnostics",
    description:
      "How Vix extracts the useful signal from compiler errors, linker failures, sanitizer reports, runtime crashes, and template noise.",
    href: "/posts/vix-error-diagnostics/",
  },
  {
    tag: "Performance",
    title: "Vix Core v2.6.3 benchmark baseline",
    description:
      "The benchmark setup, lifecycle guarantees, latency observations, and performance baseline used to validate the native runtime.",
    href: "/posts/vix-core/vix-core-benchmark-baseline-v263",
  },
];

const signals = [
  {
    value: "v2.7.8",
    label: "Latest documented release",
  },
  {
    value: "40",
    label: "Release pages in the V2 changelog",
  },
  {
    value: "112,539",
    label: "Requests/sec in a local HTTP benchmark",
  },
];

const quickLinks = [
  {
    label: "Read all articles",
    href: "/posts/",
  },
  {
    label: "Browse the changelog",
    href: "/posts/changelog/",
  },
  {
    label: "Open the documentation",
    href: "https://docs.vixcpp.com",
    external: true,
  },
  {
    label: "View Vix.cpp on GitHub",
    href: "https://github.com/vixcpp/vix",
    external: true,
  },
];
</script>

<template>
  <main class="home">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-glow" aria-hidden="true"></div>

      <div class="hero-copy">
        <div class="eyebrow">
          <span class="eyebrow-mark" aria-hidden="true"></span>
          Vix.cpp Engineering Blog
        </div>

        <h1 id="hero-title" class="hero-title">
          Engineering a modern C++ toolchain.
        </h1>

        <p class="hero-lead">
          Architecture, build-system internals, runtime benchmarks, and release
          notes from the development of Vix.cpp.
        </p>

        <div class="hero-actions">
          <a class="button button-primary" :href="latestRelease.href">
            Read the latest release
            <svg
              viewBox="0 0 16 16"
              width="15"
              height="15"
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

          <a class="button button-secondary" href="/posts/">
            Explore all articles
          </a>
        </div>

        <div class="hero-links" aria-label="Vix.cpp resources">
          <a href="/posts/changelog/">Changelog</a>
          <span aria-hidden="true"></span>
          <a href="https://docs.vixcpp.com" target="_blank" rel="noreferrer">
            Documentation
          </a>
          <span aria-hidden="true"></span>
          <a
            href="https://github.com/vixcpp/vix"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <aside class="hero-demo" aria-label="Vix.cpp workflow example">
        <div class="terminal">
          <div class="terminal-head">
            <div class="terminal-dots" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span class="terminal-label">A Vix workflow</span>
          </div>

          <div class="terminal-body">
            <div class="terminal-group">
              <div class="terminal-command">
                <span class="terminal-prompt">$</span>
                <span class="terminal-program">vix</span>
                <span class="terminal-command-name">new</span>
                <span class="terminal-value">cloud</span>
                <span class="terminal-option">--template</span>
                <span class="terminal-value">backend</span>
                <span class="terminal-option">--api-only</span>
              </div>

              <div class="terminal-result">
                <span class="terminal-success">✓</span>
                <span>Created C++ backend project</span>
              </div>
            </div>

            <div class="terminal-group">
              <div class="terminal-command">
                <span class="terminal-prompt">$</span>
                <span class="terminal-program">cd</span>
                <span class="terminal-path">cloud</span>
              </div>

              <div class="terminal-command">
                <span class="terminal-prompt">$</span>
                <span class="terminal-program">vix</span>
                <span class="terminal-command-name">modules add</span>
                <span class="terminal-value">auth</span>
              </div>

              <div class="terminal-result">
                <span class="terminal-success">✓</span>
                <span>Added application module</span>
                <code>auth</code>
              </div>
            </div>

            <div class="terminal-group">
              <div class="terminal-command">
                <span class="terminal-prompt">$</span>
                <span class="terminal-program">vix</span>
                <span class="terminal-command-name">add</span>
                <span class="terminal-package">rix/rix</span>
                <span class="terminal-option">--module</span>
                <span class="terminal-value">auth</span>
              </div>

              <div class="terminal-result">
                <span class="terminal-success">✓</span>
                <span>Updated</span>
                <code>vix.module</code>
                <span>and</span>
                <code>vix.lock</code>
              </div>
            </div>

            <div class="terminal-group">
              <div class="terminal-command">
                <span class="terminal-prompt">$</span>
                <span class="terminal-program">vix</span>
                <span class="terminal-command-name">build</span>
                <span class="terminal-option">--preset</span>
                <span class="terminal-value">release</span>
              </div>

              <div class="terminal-result terminal-result--final">
                <span class="terminal-success">✓</span>
                <span>Built</span>
                <code>bin/cloud</code>
              </div>
            </div>
          </div>

          <div class="terminal-foot">
            <span>One project</span>
            <span>One lockfile</span>
            <span>Native C++</span>
          </div>
        </div>

        <p class="hero-demo-note">
          The blog explains the architecture behind workflows like this—not only
          the command syntax.
        </p>
      </aside>
    </section>

    <section class="signals" aria-label="Project signals">
      <div v-for="signal in signals" :key="signal.label" class="signal">
        <strong>{{ signal.value }}</strong>
        <span>{{ signal.label }}</span>
      </div>
    </section>

    <section class="latest" aria-labelledby="latest-release-title">
      <div class="latest-copy">
        <div class="section-kicker">{{ latestRelease.eyebrow }}</div>

        <div class="latest-meta">
          <span>{{ latestRelease.version }}</span>
          <span aria-hidden="true">·</span>
          <time datetime="2026-07-19">{{ latestRelease.date }}</time>
        </div>

        <h2 id="latest-release-title">{{ latestRelease.title }}</h2>
        <p>{{ latestRelease.description }}</p>

        <a class="text-link" :href="latestRelease.href">
          Read the complete release notes
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

      <div class="latest-map" aria-hidden="true">
        <div class="map-node map-node-package">
          <span class="map-node-label">Registry package</span>
          <strong>extension.vix.json</strong>
        </div>

        <div class="map-line map-line-one"></div>

        <div class="map-node map-node-note">
          <span class="map-node-label">Vix Note</span>
          <strong>Extension host</strong>
        </div>

        <div class="map-line map-line-two"></div>

        <div class="map-node map-node-runtime">
          <span class="map-node-label">External runtime</span>
          <strong>Custom cell execution</strong>
        </div>
      </div>
    </section>

    <section class="paths section-block" aria-labelledby="paths-title">
      <div class="section-heading">
        <div>
          <div class="section-kicker">Choose a path</div>
          <h2 id="paths-title">
            Start with the part of Vix you want to understand.
          </h2>
        </div>

        <p>
          Each series follows a real subsystem from its original problem to the
          current implementation.
        </p>
      </div>

      <div class="path-grid">
        <a
          v-for="path in readingPaths"
          :key="path.index"
          class="path-card"
          :href="path.href"
        >
          <div class="path-top">
            <span class="path-index">{{ path.index }}</span>
            <span class="path-label">{{ path.label }}</span>
          </div>

          <h3>{{ path.title }}</h3>
          <p>{{ path.description }}</p>

          <span class="path-action">
            {{ path.action }}
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
          </span>
        </a>
      </div>
    </section>

    <section class="featured section-block" aria-labelledby="featured-title">
      <div class="section-heading section-heading-row">
        <div>
          <div class="section-kicker">Selected writing</div>
          <h2 id="featured-title">Engineering notes worth starting with.</h2>
        </div>

        <a class="section-all" href="/posts/">
          View all articles
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

      <div class="article-list">
        <a
          v-for="(article, index) in featuredArticles"
          :key="article.title"
          class="article"
          :href="article.href"
        >
          <span class="article-number">
            {{ String(index + 1).padStart(2, "0") }}
          </span>

          <div class="article-copy">
            <span class="article-tag">{{ article.tag }}</span>
            <h3>{{ article.title }}</h3>
            <p>{{ article.description }}</p>
          </div>

          <span class="article-arrow" aria-hidden="true">
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none">
              <path
                d="M4 9h10M10 5l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </section>

    <section
      class="principles section-block"
      aria-labelledby="principles-title"
    >
      <div class="principles-intro">
        <div class="section-kicker">Built in public</div>
        <h2 id="principles-title">
          More than announcements. The reasoning stays visible.
        </h2>
      </div>

      <div class="principle-grid">
        <article>
          <span>01</span>
          <h3>Architecture before promotion</h3>
          <p>
            Articles begin with the problem, constraints, and tradeoffs before
            describing the implementation.
          </p>
        </article>

        <article>
          <span>02</span>
          <h3>Evidence beside claims</h3>
          <p>
            Benchmarks include the machine, command, workload, and latency
            distribution required to understand the result.
          </p>
        </article>

        <article>
          <span>03</span>
          <h3>Release history that remains useful</h3>
          <p>
            Every release page records the workflow changes, compatibility
            details, validation, and known limitations.
          </p>
        </article>
      </div>
    </section>

    <section class="conversion" aria-labelledby="conversion-title">
      <div class="conversion-glow" aria-hidden="true"></div>

      <div class="conversion-copy">
        <div class="section-kicker">Build with Vix.cpp</div>
        <h2 id="conversion-title">
          Read the decisions, inspect the code, then try the workflow yourself.
        </h2>
        <p>
          Vix.cpp is open source. Start with the documentation, explore the
          repository, or browse the package registry used by Vix projects.
        </p>
      </div>

      <div class="conversion-actions">
        <a
          class="button button-primary"
          href="https://docs.vixcpp.com"
          target="_blank"
          rel="noreferrer"
        >
          Get started with Vix
          <svg
            viewBox="0 0 16 16"
            width="15"
            height="15"
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

        <a
          class="button button-secondary"
          href="https://registry.vixcpp.com"
          target="_blank"
          rel="noreferrer"
        >
          Browse packages
        </a>
      </div>
    </section>

    <nav class="quick-links" aria-label="More Vix.cpp resources">
      <a
        v-for="link in quickLinks"
        :key="link.label"
        :href="link.href"
        :target="link.external ? '_blank' : undefined"
        :rel="link.external ? 'noreferrer' : undefined"
      >
        <span>{{ link.label }}</span>
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
    </nav>
  </main>
</template>

<style scoped>
.home {
  position: relative;
  width: min(calc(100% - 40px), var(--container, 1120px));
  margin: 0 auto;
  padding: 72px 0 96px;
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-family: var(
    --font-sans,
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif
  );
}

.home a {
  text-decoration: none;
}

.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.72fr);
  gap: clamp(42px, 7vw, 88px);
  align-items: center;
  min-height: 620px;
  padding: 52px 0 72px;
  border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
}

.hero-glow {
  position: absolute;
  top: -260px;
  left: -280px;
  width: 720px;
  height: 720px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.12),
    rgba(34, 197, 94, 0.025) 48%,
    transparent 72%
  );
  pointer-events: none;
}

.hero-copy,
.hero-demo {
  position: relative;
  z-index: 1;
}

.eyebrow,
.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--green-soft, #4ade80);
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.eyebrow {
  margin-bottom: 26px;
}

.eyebrow-mark {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green, #22c55e);
  box-shadow:
    0 0 0 4px rgba(34, 197, 94, 0.11),
    0 0 18px rgba(34, 197, 94, 0.34);
}

.hero-title {
  max-width: 780px;
  margin: 0;
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: clamp(3.5rem, 7.2vw, 6.5rem);
  font-weight: 790;
  letter-spacing: -0.072em;
  line-height: 0.94;
  text-wrap: balance;
}

.hero-lead {
  max-width: 690px;
  margin: 30px 0 0;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: clamp(18px, 2vw, 21px);
  letter-spacing: -0.014em;
  line-height: 1.66;
}

.hero-actions,
.conversion-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 11px;
  margin-top: 34px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 44px;
  padding: 10px 17px;
  border: 1px solid transparent;
  border-radius: 9px;
  font-size: 13.5px;
  font-weight: 670;
  transition:
    transform 180ms var(--ease, ease),
    border-color 180ms var(--ease, ease),
    color 180ms var(--ease, ease),
    background 180ms var(--ease, ease),
    box-shadow 180ms var(--ease, ease);
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  color: #07170d;
  background: linear-gradient(
    135deg,
    var(--green-soft, #4ade80),
    var(--green, #22c55e)
  );
  box-shadow: 0 14px 34px rgba(34, 197, 94, 0.2);
}

.button-primary:hover {
  box-shadow: 0 18px 42px rgba(34, 197, 94, 0.28);
}

.button-secondary {
  border-color: var(--line-strong, rgba(255, 255, 255, 0.12));
  color: var(--text, rgba(255, 255, 255, 0.92));
  background: rgba(255, 255, 255, 0.035);
}

.button-secondary:hover {
  border-color: rgba(34, 197, 94, 0.28);
  background: rgba(255, 255, 255, 0.06);
}

.hero-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 11px;
  margin-top: 25px;
}

.hero-links a {
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-size: 12.5px;
  font-weight: 560;
  transition: color 160ms ease;
}

.hero-links span {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-faint, rgba(255, 255, 255, 0.28));
}

.hero-demo {
  align-self: center;
}

.terminal {
  overflow: hidden;
  border: 1px solid var(--line-strong, rgba(255, 255, 255, 0.12));
  border-radius: var(--radius-lg, 16px);
  background: var(--bg-ink, #0f1215);
  box-shadow:
    0 28px 90px rgba(0, 0, 0, 0.48),
    0 0 0 1px rgba(34, 197, 94, 0.025);
}

.terminal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  padding: 0 15px;
  border-bottom: 1px solid var(--line-ink, rgba(255, 255, 255, 0.08));
  background: rgba(255, 255, 255, 0.018);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.terminal-dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
}

.terminal-dots span:first-child {
  background: #f87171;
}

.terminal-dots span:nth-child(2) {
  background: #fbbf24;
}

.terminal-dots span:nth-child(3) {
  background: var(--green, #22c55e);
}

.terminal-label {
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 10px;
  letter-spacing: 0.04em;
}

.terminal-body {
  margin: 0;
  padding: 24px 22px 26px;
  overflow-x: auto;
  color: rgba(255, 255, 255, 0.76);
  background:
    radial-gradient(
      circle at 100% 0,
      rgba(34, 197, 94, 0.055),
      transparent 38%
    ),
    transparent;
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 12px;
  line-height: 1.82;
  white-space: pre;
}

.terminal-body code {
  font: inherit;
}

.prompt {
  color: var(--green-soft, #4ade80);
}

.ok {
  color: var(--green, #22c55e);
}

.terminal-foot {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line-ink, rgba(255, 255, 255, 0.08));
}

.terminal-foot span {
  padding: 11px 8px;
  border-right: 1px solid var(--line-ink, rgba(255, 255, 255, 0.08));
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 9px;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
}

.terminal-foot span:last-child {
  border-right: 0;
}

.hero-demo-note {
  max-width: 430px;
  margin: 16px 3px 0;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-size: 12px;
  line-height: 1.6;
}

.signals {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
}

.signal {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-height: 126px;
  padding: 28px 30px;
  border-right: 1px solid var(--line, rgba(255, 255, 255, 0.075));
}

.signal:first-child {
  padding-left: 0;
}

.signal:last-child {
  border-right: 0;
}

.signal strong {
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 740;
  letter-spacing: -0.045em;
  line-height: 1;
}

.signal span {
  max-width: 190px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-size: 11.5px;
  line-height: 1.55;
}

.latest {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(360px, 0.72fr);
  gap: clamp(50px, 8vw, 100px);
  align-items: center;
  padding: 92px 0;
  border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
}

.latest-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 20px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 10.5px;
}

.latest-copy h2,
.section-heading h2,
.principles-intro h2,
.conversion h2 {
  margin: 18px 0 0;
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-weight: 740;
  letter-spacing: -0.05em;
  line-height: 1.06;
  text-wrap: balance;
}

.latest-copy h2 {
  max-width: 650px;
  font-size: clamp(2.5rem, 5.6vw, 4.7rem);
}

.latest-copy > p {
  max-width: 640px;
  margin: 23px 0 0;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 16px;
  line-height: 1.76;
}

.text-link,
.section-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 25px;
  color: var(--green-soft, #4ade80);
  font-size: 13px;
  font-weight: 670;
}

.text-link svg,
.section-all svg {
  transition: transform 160ms ease;
}

.text-link:hover svg,
.section-all:hover svg {
  transform: translateX(4px);
}

.latest-map {
  position: relative;
  min-height: 390px;
}

.map-node {
  position: absolute;
  z-index: 2;
  width: min(100%, 270px);
  padding: 18px 19px;
  border: 1px solid var(--line-strong, rgba(255, 255, 255, 0.12));
  border-radius: var(--radius-md, 10px);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent),
    var(--bg-panel, #1a1e22);
  box-shadow: var(--shadow-panel, 0 10px 42px rgba(0, 0, 0, 0.42));
}

.map-node::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -5px;
  width: 8px;
  height: 8px;
  border: 2px solid var(--bg-panel, #1a1e22);
  border-radius: 50%;
  background: var(--green, #22c55e);
  box-shadow: 0 0 16px rgba(34, 197, 94, 0.34);
  transform: translateY(-50%);
}

.map-node-package {
  top: 0;
  left: 0;
}

.map-node-note {
  top: 142px;
  right: 0;
  border-color: rgba(34, 197, 94, 0.28);
}

.map-node-runtime {
  bottom: 0;
  left: 24px;
}

.map-node-label {
  display: block;
  margin-bottom: 7px;
  color: var(--green-soft, #4ade80);
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.map-node strong {
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: 14px;
  font-weight: 650;
  letter-spacing: -0.015em;
}

.map-line {
  position: absolute;
  z-index: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(34, 197, 94, 0.08),
    rgba(34, 197, 94, 0.48),
    rgba(34, 197, 94, 0.08)
  );
  transform-origin: left center;
}

.map-line-one {
  top: 110px;
  left: 160px;
  width: 230px;
  transform: rotate(18deg);
}

.map-line-two {
  top: 250px;
  right: 120px;
  width: 230px;
  transform: rotate(150deg);
}

.section-block {
  padding: 94px 0;
  border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(300px, 0.48fr);
  gap: 60px;
  align-items: end;
  margin-bottom: 36px;
}

.section-heading h2,
.principles-intro h2 {
  max-width: 760px;
  font-size: clamp(2.35rem, 5vw, 4.2rem);
}

.section-heading > p {
  margin: 0;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-size: 13px;
  line-height: 1.72;
}

.path-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.path-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 330px;
  padding: 25px;
  overflow: hidden;
  border: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  border-radius: var(--radius-lg, 16px);
  color: inherit;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 62%),
    var(--bg-panel, #1a1e22);
  transition:
    transform 200ms var(--ease, ease),
    border-color 200ms var(--ease, ease),
    background 200ms var(--ease, ease),
    box-shadow 200ms var(--ease, ease);
}

.path-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    var(--green-line, rgba(34, 197, 94, 0.35)),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 200ms ease;
}

.path-card:hover {
  transform: translateY(-4px);
  border-color: rgba(34, 197, 94, 0.24);
  background:
    linear-gradient(180deg, rgba(34, 197, 94, 0.045), transparent 62%),
    var(--bg-panel-strong, #20252a);
  box-shadow: var(--shadow-panel, 0 10px 42px rgba(0, 0, 0, 0.42));
}

.path-card:hover::before {
  opacity: 1;
}

.path-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.path-index {
  color: var(--text-faint, rgba(255, 255, 255, 0.28));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 10px;
}

.path-label {
  padding: 4px 8px;
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
  font-size: 9px;
  letter-spacing: 0.045em;
}

.path-card h3 {
  margin: 50px 0 0;
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: 23px;
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.15;
  text-wrap: balance;
}

.path-card p {
  margin: 14px 0 0;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 13.5px;
  line-height: 1.7;
}

.path-action {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: auto;
  padding-top: 24px;
  color: var(--green-soft, #4ade80);
  font-size: 12px;
  font-weight: 650;
}

.path-action svg {
  transition: transform 160ms ease;
}

.path-card:hover .path-action svg {
  transform: translateX(4px);
}

.section-heading-row {
  display: flex;
  align-items: end;
  justify-content: space-between;
}

.section-heading-row h2 {
  max-width: 780px;
}

.section-all {
  flex-shrink: 0;
  margin: 0 0 8px;
}

.article-list {
  border-top: 1px solid var(--line, rgba(255, 255, 255, 0.075));
}

.article {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) 36px;
  gap: 24px;
  align-items: start;
  padding: 30px 0;
  border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  color: inherit;
  transition:
    padding 180ms var(--ease, ease),
    background 180ms var(--ease, ease);
}

.article:hover {
  padding-right: 16px;
  padding-left: 16px;
  background: rgba(255, 255, 255, 0.018);
}

.article-number {
  padding-top: 3px;
  color: var(--text-faint, rgba(255, 255, 255, 0.28));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 10px;
}

.article-tag {
  color: var(--green-soft, #4ade80);
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.article h3 {
  margin: 9px 0 0;
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 690;
  letter-spacing: -0.035em;
  line-height: 1.18;
}

.article p {
  max-width: 740px;
  margin: 10px 0 0;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 13.5px;
  line-height: 1.68;
}

.article-arrow {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin-top: 14px;
  border: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  border-radius: 8px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  transition:
    color 160ms ease,
    border-color 160ms ease,
    transform 160ms ease,
    background 160ms ease;
}

.article:hover .article-arrow {
  transform: translateX(3px);
  border-color: rgba(34, 197, 94, 0.26);
  color: var(--green-soft, #4ade80);
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
}

.principles {
  display: grid;
  grid-template-columns: minmax(0, 0.78fr) minmax(0, 1fr);
  gap: 80px;
}

.principle-grid {
  display: grid;
}

.principle-grid article {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  column-gap: 18px;
  padding: 24px 0;
  border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
}

.principle-grid article:first-child {
  padding-top: 0;
}

.principle-grid article:last-child {
  border-bottom: 0;
}

.principle-grid span {
  color: var(--green-soft, #4ade80);
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 9.5px;
}

.principle-grid h3 {
  margin: 0;
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: 18px;
  font-weight: 680;
  letter-spacing: -0.025em;
}

.principle-grid p {
  grid-column: 2;
  margin: 8px 0 0;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 13px;
  line-height: 1.7;
}

.conversion {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 60px;
  align-items: end;
  margin-top: 94px;
  padding: 54px;
  overflow: hidden;
  border: 1px solid rgba(34, 197, 94, 0.22);
  border-radius: var(--radius-xl, 22px);
  background:
    linear-gradient(125deg, rgba(34, 197, 94, 0.08), transparent 45%),
    var(--bg-panel, #1a1e22);
  box-shadow: var(--shadow-panel, 0 10px 42px rgba(0, 0, 0, 0.42));
}

.conversion-glow {
  position: absolute;
  right: -180px;
  bottom: -280px;
  width: 620px;
  height: 620px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.13), transparent 68%);
  pointer-events: none;
}

.conversion-copy,
.conversion-actions {
  position: relative;
  z-index: 1;
}

.conversion h2 {
  max-width: 800px;
  font-size: clamp(2.25rem, 5vw, 4.2rem);
}

.conversion p {
  max-width: 720px;
  margin: 20px 0 0;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 14px;
  line-height: 1.72;
}

.conversion-actions {
  justify-content: flex-end;
  margin-top: 0;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 28px;
  border: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  border-radius: var(--radius-md, 10px);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.015);
}

.quick-links a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 62px;
  padding: 16px;
  border-right: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 11.5px;
  font-weight: 600;
  transition:
    color 160ms ease,
    background 160ms ease;
}

.quick-links a:last-child {
  border-right: 0;
}

.quick-links a:hover {
  color: var(--green-soft, #4ade80);
  background: rgba(255, 255, 255, 0.028);
}

.quick-links svg {
  flex-shrink: 0;
}

@media (max-width: 1000px) {
  .hero,
  .latest,
  .principles {
    grid-template-columns: 1fr;
  }

  .hero {
    gap: 60px;
  }

  .hero-demo {
    width: min(100%, 660px);
  }

  .latest-map {
    width: min(100%, 620px);
    min-height: 390px;
  }

  .path-grid {
    grid-template-columns: 1fr;
  }

  .path-card {
    min-height: 270px;
  }

  .conversion {
    grid-template-columns: 1fr;
  }

  .conversion-actions {
    justify-content: flex-start;
    margin-top: 0;
  }

  .quick-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .quick-links a:nth-child(2) {
    border-right: 0;
  }

  .quick-links a:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  }
}

@media (max-width: 760px) {
  .home {
    width: min(calc(100% - 28px), var(--container, 1120px));
    padding: 30px 0 70px;
  }

  .hero {
    min-height: 0;
    padding: 34px 0 52px;
  }

  .hero-title {
    font-size: clamp(3rem, 16vw, 4.8rem);
  }

  .hero-lead {
    font-size: 17px;
  }

  .hero-actions,
  .conversion-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .button {
    width: 100%;
  }

  .terminal-body {
    padding: 20px 16px 22px;
    font-size: 10.5px;
  }

  .terminal-foot {
    grid-template-columns: 1fr;
  }

  .terminal-foot span {
    border-right: 0;
    border-bottom: 1px solid var(--line-ink, rgba(255, 255, 255, 0.08));
  }

  .terminal-foot span:last-child {
    border-bottom: 0;
  }

  .signals {
    grid-template-columns: 1fr;
  }

  .signal,
  .signal:first-child {
    min-height: 0;
    padding: 24px 0;
    border-right: 0;
    border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  }

  .signal:last-child {
    border-bottom: 0;
  }

  .latest,
  .section-block {
    padding: 70px 0;
  }

  .latest-map {
    min-height: 450px;
  }

  .map-node-package {
    left: 0;
  }

  .map-node-note {
    top: 170px;
  }

  .map-node-runtime {
    bottom: 0;
    left: 0;
  }

  .map-line {
    display: none;
  }

  .section-heading,
  .section-heading-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 22px;
    align-items: start;
  }

  .section-heading h2,
  .principles-intro h2,
  .conversion h2 {
    font-size: clamp(2.3rem, 12vw, 3.5rem);
  }

  .section-all {
    margin: 0;
  }

  .article {
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 14px;
  }

  .article-arrow {
    display: none;
  }

  .article:hover {
    padding-right: 0;
    padding-left: 0;
    background: transparent;
  }

  .principles {
    gap: 46px;
  }

  .conversion {
    margin-top: 70px;
    padding: 34px 24px;
  }
}

@media (max-width: 520px) {
  .hero-title {
    font-size: clamp(2.75rem, 15vw, 3.8rem);
  }

  .hero-links {
    gap: 8px;
  }

  .latest-map {
    min-height: 470px;
  }

  .map-node {
    width: calc(100% - 16px);
  }

  .map-node-note {
    right: 0;
  }

  .path-card {
    min-height: 300px;
    padding: 22px;
  }

  .quick-links {
    grid-template-columns: 1fr;
  }

  .quick-links a,
  .quick-links a:nth-child(2) {
    border-right: 0;
    border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  }

  .quick-links a:last-child {
    border-bottom: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home *,
  .home *::before,
  .home *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
/* ============================================================
   FINAL BACKGROUND OVERRIDES
   Keep one consistent Vix.cpp dark surface across the blog.
   Must remain at the end of custom.css.
   ============================================================ */

html,
body {
  background: var(--bg) !important;
  background-image: none !important;
}

#app,
.VPApp,
.VPContent,
.VPHome,
.VPDoc,
.VPPage,
.Layout,
main {
  background: transparent !important;
  background-image: none !important;
}

/* Blog homepage */
.home,
.bh,
.blog-home {
  background: transparent !important;
  background-image: none !important;
}

/* Main homepage sections */
.hero,
.signals,
.latest,
.paths,
.featured,
.principles,
.section-block,
.quick-links {
  background-color: transparent !important;
  background-image: none !important;
}

/* Remove decorative page-wide glows */
.hero-glow,
.conversion-glow {
  opacity: 0 !important;
  background: none !important;
}

/* Keep intentional component surfaces */
.terminal {
  background: var(--bg-ink) !important;
  background-image: none !important;
}

.path-card,
.blog-card,
.bh-card,
.post-card,
.article-card,
.map-node {
  background: var(--bg-panel) !important;
  background-image: none !important;
}

.path-card:hover,
.blog-card:hover,
.bh-card:hover,
.post-card:hover,
.article-card:hover {
  background: var(--bg-panel-strong) !important;
  background-image: none !important;
}

/* Latest release diagram */
.latest-map {
  background: transparent !important;
  background-image: none !important;
}

/* Final conversion block keeps one controlled surface */
.conversion {
  background: var(--bg-panel) !important;
  background-image: none !important;
}

/* Article pages */
.vp-doc,
.VPDocFooter,
.VPDoc .container,
.VPDoc .content,
.VPDoc .content-container {
  background: transparent !important;
  background-image: none !important;
}

/* Code remains visually distinct */
.vp-doc div[class*="language-"],
.vp-doc [class*="language-"],
.vp-doc pre {
  background-color: var(--bg-ink) !important;
  background-image: none !important;
}

/* Header and footer */
.blog-header,
.bh-header,
.site-header {
  background: rgba(19, 22, 25, 0.94) !important;
  background-image: none !important;
}

.blog-footer,
.bh-footer,
.site-footer {
  background: var(--bg) !important;
  background-image: none !important;
}

/* Prevent pseudo-elements from recreating large gradients */
.home::before,
.home::after,
.bh::before,
.bh::after,
.VPHome::before,
.VPHome::after {
  display: none !important;
  background: none !important;
}
/* Reduce the hero scale */
.hero {
  min-height: 520px;
  padding: 40px 0 58px;
}

.eyebrow {
  margin-bottom: 18px;
  font-size: 10px;
}

.hero-title {
  max-width: 760px;
  font-size: clamp(2.7rem, 5vw, 4.6rem);
  line-height: 1;
  letter-spacing: -0.055em;
}

.hero-lead {
  max-width: 640px;
  margin-top: 24px;
  font-size: clamp(16px, 1.7vw, 19px);
  line-height: 1.62;
}

@media (max-width: 760px) {
  .hero {
    padding: 28px 0 48px;
  }

  .hero-title {
    font-size: clamp(2.4rem, 11vw, 3.5rem);
    line-height: 1.02;
  }
}

@media (max-width: 520px) {
  .hero-title {
    font-size: clamp(2.2rem, 10.5vw, 3rem);
  }
}
/* Better spacing inside the hero */
.eyebrow {
  margin-bottom: 28px;
}

.hero-title {
  margin: 0 0 28px;
  line-height: 1.08;
  letter-spacing: -0.045em;
}

.hero-lead {
  margin: 0;
  line-height: 1.68;
}

.hero-actions {
  margin-top: 32px;
}
/* ============================================================
   Hero spacing and button hover fixes
   Keep this block at the end of BlogHomeHero.vue
   ============================================================ */

.home {
  padding-top: 0;
}

.hero {
  min-height: auto;
  padding-top: 48px;
  padding-bottom: 64px;
}

/* Prevent global article link styles from affecting buttons */
.home .button,
.home .button:hover,
.home .button:focus,
.home .button:active {
  text-decoration: none !important;
}

/* Primary action */
.home .button-primary {
  color: #07170d !important;
  border-color: transparent !important;
  background: linear-gradient(135deg, #4ade80, #22c55e) !important;
}

.home .button-primary:hover {
  color: #031107 !important;
  border-color: #86efac !important;
  background: linear-gradient(135deg, #86efac, #4ade80) !important;
  box-shadow:
    0 18px 42px rgba(34, 197, 94, 0.32),
    0 0 0 1px rgba(134, 239, 172, 0.28) !important;
  transform: translateY(-2px);
}

/* Secondary action */
.home .button-secondary {
  color: rgba(255, 255, 255, 0.88) !important;
  border-color: rgba(255, 255, 255, 0.14) !important;
  background: rgba(255, 255, 255, 0.035) !important;
}

.home .button-secondary:hover {
  color: #86efac !important;
  border-color: rgba(34, 197, 94, 0.42) !important;
  background: rgba(34, 197, 94, 0.11) !important;
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.26),
    inset 0 0 0 1px rgba(34, 197, 94, 0.06) !important;
  transform: translateY(-2px);
}

/* Keyboard focus */
.home .button:focus-visible {
  outline: 2px solid #86efac !important;
  outline-offset: 3px;
}

/* Text links below the buttons */
.home .hero-links a:hover {
  color: #86efac !important;
  text-decoration: none !important;
}

@media (max-width: 760px) {
  .home {
    padding-top: 0;
  }

  .hero {
    padding-top: 32px;
    padding-bottom: 50px;
  }
}
.hero-title {
  max-width: 720px;
  margin: 0;
  font-size: clamp(2.5rem, 4.6vw, 4.2rem);
  font-weight: 760;
  line-height: 1.02;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

@media (max-width: 760px) {
  .hero-title {
    font-size: clamp(2.25rem, 10vw, 3.25rem);
    line-height: 1.05;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.15rem;
  }
}
.terminal-body {
  padding: 22px;
  overflow-x: auto;
  background:
    radial-gradient(
      circle at 100% 0,
      rgba(34, 197, 94, 0.055),
      transparent 42%
    ),
    var(--bg-ink, #0f1215);
  font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
  font-size: 12px;
  line-height: 1.65;
}

.terminal-group {
  position: relative;
  padding: 0 0 18px 18px;
}

.terminal-group:last-child {
  padding-bottom: 0;
}

/* Ligne verticale reliant les étapes */
.terminal-group::before {
  content: "";
  position: absolute;
  top: 7px;
  bottom: -2px;
  left: 3px;
  width: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.terminal-group:last-child::before {
  bottom: 12px;
}

/* Petit point pour chaque étape */
.terminal-group::after {
  content: "";
  position: absolute;
  top: 6px;
  left: 0;
  width: 7px;
  height: 7px;
  border: 2px solid var(--bg-ink, #0f1215);
  border-radius: 50%;
  background: var(--green, #22c55e);
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.34);
}

.terminal-command,
.terminal-result {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 7px;
  min-width: max-content;
}

.terminal-command {
  color: rgba(255, 255, 255, 0.84);
  font-weight: 480;
}

.terminal-result {
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.48);
  font-size: 11px;
}

.terminal-result--final {
  color: rgba(255, 255, 255, 0.72);
}

.terminal-prompt {
  color: var(--green-soft, #4ade80);
  font-weight: 800;
  user-select: none;
}

.terminal-program {
  color: #7dd3fc;
  font-weight: 700;
}

.terminal-command-name {
  color: rgba(255, 255, 255, 0.88);
}

.terminal-option {
  color: #fb923c;
}

.terminal-value {
  color: #e9d5ff;
}

.terminal-package {
  color: #93c5fd;
}

.terminal-path {
  color: #c4b5fd;
}

.terminal-success {
  color: var(--green, #22c55e);
  font-weight: 800;
}

.terminal-result code {
  padding: 1px 5px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  color: var(--green-bright, #86efac);
  background: rgba(255, 255, 255, 0.035);
  font: inherit;
}

.terminal-group:hover::after {
  background: var(--green-bright, #86efac);
  box-shadow:
    0 0 0 4px rgba(34, 197, 94, 0.08),
    0 0 18px rgba(34, 197, 94, 0.4);
}

.terminal-body::-webkit-scrollbar {
  height: 6px;
}

.terminal-body::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
}

.terminal-body::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 197, 94, 0.35);
}

.terminal-body::-webkit-scrollbar-track {
  background: transparent;
}
</style>
