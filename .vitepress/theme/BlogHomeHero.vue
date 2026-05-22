<script setup>
const featured = {
  tag: "Featured",
  date: "May 2026",
  title: "vix.app",
  desc: "A simple application manifest for building C++ projects without exposing users directly to CMake complexity.",
  href: "/posts/vix-app/",
  readTime: "6 articles",
};

const posts = [
  {
    title: "vix build",
    desc: "Technical notes about how Vix configures, plans, caches, and executes native C++ builds.",
    href: "/posts/vix-build/",
    tag: "Build",
    date: "May 2026",
    readTime: "11 articles",
  },
  {
    title: "vix run",
    desc: "How Vix resolves files, scripts, projects, targets, CMake fallback, and runtime arguments.",
    href: "/posts/vix-run/",
    tag: "CLI",
    date: "May 2026",
    readTime: "5 articles",
  },
  {
    title: "vix dev",
    desc: "How Vix runs development workflows, watch mode, reloads, and Vue + Vix full-stack projects.",
    href: "/posts/vix-dev/",
    tag: "Dev",
    date: "May 2026",
    readTime: "1 article",
  },
  {
    title: "Vix Replay",
    desc: "How Vix records executions so developers can inspect and understand previous runs.",
    href: "/posts/vix-replay/",
    tag: "Runtime",
    date: "May 2026",
    readTime: "1 article",
  },
];
</script>

<template>
  <section class="bh">
    <header class="bh-hero">
      <div class="bh-eyebrow">
        <span class="bh-dot"></span>
        <span class="bh-eyebrow-label">Vix.cpp Engineering Blog</span>
      </div>

      <h1 class="bh-title">
        Engineering notes from the Vix.cpp project.
      </h1>

      <p class="bh-lead">
        Technical articles about the build system, runtime design, CLI behavior,
        diagnostics, and the decisions behind a modern C++ developer workflow.
      </p>

      <div class="bh-meta">
        <a class="bh-link" href="/posts/">
          Read articles
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>

        <span class="bh-meta-sep">·</span>

        <a class="bh-link bh-link--muted" href="https://vixcpp.com" target="_blank" rel="noreferrer">
          Documentation
        </a>

        <span class="bh-meta-sep">·</span>

        <a class="bh-link bh-link--muted" href="https://github.com/vixcpp" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </header>

    <a class="bh-featured" :href="featured.href">
      <div class="bh-featured-meta">
        <span class="bh-tag bh-tag--featured">{{ featured.tag }}</span>
        <span>{{ featured.date }}</span>
        <span class="bh-featured-sep">·</span>
        <span>{{ featured.readTime }}</span>
      </div>

      <h2 class="bh-featured-title">{{ featured.title }}</h2>
      <p class="bh-featured-desc">{{ featured.desc }}</p>

      <span class="bh-featured-cta">
        Read the article
        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
          <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </a>

    <div class="bh-section">
      <h3 class="bh-section-title">Recent posts</h3>
      <a href="/posts/" class="bh-section-link">View all</a>
    </div>

    <div class="bh-grid">
      <a
        v-for="post in posts"
        :key="post.title"
        class="bh-card"
        :href="post.href"
      >
        <div class="bh-card-meta">
          <span class="bh-tag">{{ post.tag }}</span>
          <span class="bh-card-date">{{ post.date }}</span>
        </div>

        <h4 class="bh-card-title">{{ post.title }}</h4>
        <p class="bh-card-desc">{{ post.desc }}</p>

        <div class="bh-card-footer">
          <span class="bh-card-time">{{ post.readTime }}</span>
          <span class="bh-card-arrow">
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </a>
    </div>

  </section>
</template>

<style scoped>
.bh {
  max-width: 820px;
  margin: 0 auto;
  padding: 64px 24px 72px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.bh-hero {
  margin-bottom: 56px;
}

.bh-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
  padding: 5px 11px 5px 9px;
  border: 1px solid rgba(10, 10, 10, .10);
  border-radius: 999px;
  background: rgba(250, 250, 250, .80);
}

.bh-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #16a34a;
  box-shadow: 0 0 0 3px rgba(22, 163, 74, .15);
}

.bh-eyebrow-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #525252;
}

.bh-title {
  margin: 0 0 24px;
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.02;
  letter-spacing: -0.05em;
  font-weight: 850;
  color: #0a0a0a;
}

.bh-lead {
  max-width: 64ch;
  margin: 0 0 28px;
  font-size: 17px;
  line-height: 1.7;
  color: #525252;
  letter-spacing: -0.005em;
}

.bh-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 14px;
}

.bh-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #0a0a0a;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: -0.005em;
  transition: gap .15s ease, color .15s ease;
}

.bh-link:hover {
  gap: 7px;
}

.bh-link svg {
  transition: transform .15s ease;
}

.bh-link:hover svg {
  transform: translateX(2px);
}

.bh-link--muted {
  color: #525252;
  font-weight: 500;
}

.bh-link--muted:hover {
  color: #0a0a0a;
}

.bh-meta-sep {
  color: #d4d4d4;
}

.bh-featured {
  display: block;
  padding: 32px;
  margin-bottom: 56px;
  border-radius: 16px;
  border: 1px solid rgba(10, 10, 10, .08);
  background:
    linear-gradient(135deg, rgba(250, 250, 250, 0) 0%, rgba(244, 244, 245, .55) 100%),
    #fafafa;
  text-decoration: none !important;
  transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease;
}

.bh-featured:hover {
  border-color: rgba(10, 10, 10, .18);
  transform: translateY(-2px);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, .04),
    0 10px 30px rgba(0, 0, 0, .06);
}

.bh-featured-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
  font-size: 12.5px;
  color: #737373;
}

.bh-featured-sep {
  color: #d4d4d4;
}

.bh-tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: -0.005em;
  background: rgba(10, 10, 10, .06);
  color: #0a0a0a;
  border: 1px solid rgba(10, 10, 10, .08);
}

.bh-tag--featured {
  background: #0a0a0a;
  color: #ffffff;
  border-color: #0a0a0a;
}

.bh-featured-title {
  margin: 0 0 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.035em;
  font-weight: 750;
  color: #0a0a0a;
}

.bh-featured-desc {
  margin: 0 0 20px;
  font-size: 15.5px;
  line-height: 1.65;
  color: #525252;
  max-width: 62ch;
}

.bh-featured-cta {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13.5px;
  font-weight: 600;
  color: #0a0a0a;
  letter-spacing: -0.005em;
}

.bh-featured-cta svg {
  transition: transform .15s ease;
}

.bh-featured:hover .bh-featured-cta svg {
  transform: translateX(3px);
}

.bh-section {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(10, 10, 10, .08);
}

.bh-section-title,
.bh-topics-title {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #525252;
}

.bh-section-link {
  font-size: 13px;
  font-weight: 500;
  color: #737373;
  text-decoration: none;
  transition: color .15s ease;
}

.bh-section-link:hover {
  color: #0a0a0a;
}

.bh-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 64px;
}

.bh-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(10, 10, 10, .08);
  background: #ffffff;
  text-decoration: none !important;
  transition: border-color .2s ease, background .2s ease, transform .2s ease, box-shadow .2s ease;
}

.bh-card:hover {
  border-color: rgba(10, 10, 10, .18);
  background: #fafafa;
  transform: translateY(-2px);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, .03),
    0 8px 20px rgba(0, 0, 0, .05);
}

.bh-card-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.bh-card-date {
  font-size: 12px;
  font-weight: 500;
  color: #737373;
}

.bh-card-title {
  margin: 0 0 10px;
  font-size: 17px;
  line-height: 1.3;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: #0a0a0a;
}

.bh-card-desc {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.6;
  color: #525252;
  flex: 1;
}

.bh-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid rgba(10, 10, 10, .06);
}

.bh-card-time {
  font-size: 12px;
  font-weight: 500;
  color: #737373;
}

.bh-card-arrow {
  display: inline-flex;
  align-items: center;
  color: #0a0a0a;
  transition: transform .15s ease;
}

.bh-card:hover .bh-card-arrow {
  transform: translateX(3px);
}

.bh-topics {
  margin-bottom: 16px;
}

.bh-topics-title {
  margin-bottom: 16px;
}

.bh-topics-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.bh-topic {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(10, 10, 10, .10);
  background: #ffffff;
  font-size: 13px;
  font-weight: 500;
  color: #0a0a0a;
  text-decoration: none !important;
  letter-spacing: -0.005em;
  transition: border-color .15s ease, background .15s ease, color .15s ease;
}

.bh-topic:hover {
  border-color: #0a0a0a;
  background: #0a0a0a;
  color: #ffffff;
}

.bh-topic-count {
  font-size: 11px;
  color: #737373;
  font-weight: 600;
  transition: color .15s ease;
}

.bh-topic:hover .bh-topic-count {
  color: rgba(255, 255, 255, .65);
}

.bh {
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 24px 72px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.bh-hero {
  margin-bottom: 48px;
}

.bh-title {
  max-width: 760px;
  margin: 0 0 22px;
  font-size: clamp(2.25rem, 4.4vw, 3.15rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
  font-weight: 800;
  color: #0a0a0a;
}

.bh-lead {
  max-width: 720px;
  margin: 0 0 28px;
  font-size: clamp(1rem, 1.6vw, 1.18rem);
  line-height: 1.75;
  color: #4b5563;
  letter-spacing: -0.01em;
}

@media (max-width: 768px) {
  .bh {
    padding: 40px 20px 56px;
  }

  .bh-hero {
    margin-bottom: 40px;
  }

  .bh-featured {
    padding: 24px;
    margin-bottom: 40px;
  }

  .bh-grid {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-bottom: 48px;
  }
}

@media (max-width: 480px) {
  .bh-title {
    font-size: 2rem;
  }

  .bh-featured-title {
    font-size: 1.35rem;
  }

  .bh-card {
    padding: 20px;
  }
}
</style>
