<script setup>
const featured = {
  tag: "Featured",
  date: "May 2026",
  title: "Why Vix.cpp exists",
  desc: "Modern C++ has incredible power but a fractured developer experience. Vix.cpp is an attempt to give the language the kind of cohesive tooling that JavaScript, Rust, and Go developers take for granted — without compromising on performance.",
  href: "/posts/why-vix-exists",
  readTime: "8 min read",
};

const posts = [
  {
    title: "vix.app",
    desc: "A simpler project format for building C++ apps without fighting CMake complexity.",
    href: "/posts/vix-app",
    tag: "Build",
    date: "May 2026",
    readTime: "6 min",
  },
  {
    title: "Replay system",
    desc: "How Vix records executions so developers can inspect and replay past runs deterministically.",
    href: "/posts/vix-replay",
    tag: "CLI",
    date: "April 2026",
    readTime: "9 min",
  },
  {
    title: "Local-first C++",
    desc: "Building reliable applications that keep working under unstable networks and offline conditions.",
    href: "/posts/local-first-cpp",
    tag: "Runtime",
    date: "April 2026",
    readTime: "7 min",
  },
  {
    title: "Diagnostics as a first-class citizen",
    desc: "Why error messages and observability deserve as much design effort as APIs themselves.",
    href: "/posts/diagnostics",
    tag: "DX",
    date: "March 2026",
    readTime: "5 min",
  },
];

const topics = [
  { label: "Build systems", count: 12 },
  { label: "Runtime",       count: 8  },
  { label: "Diagnostics",   count: 6  },
  { label: "Vision",        count: 4  },
  { label: "CLI",           count: 5  },
];
</script>

<template>
  <section class="bh">
    <!-- ── Eyebrow ── -->
    <header class="bh-header">
      <div class="bh-eyebrow">
        <span class="bh-dot"></span>
        <span class="bh-eyebrow-label">Vix.cpp Engineering Blog</span>
      </div>

      <h1 class="bh-title">
        Notes on building<br />
        modern C++ tooling.
      </h1>

      <p class="bh-lead">
        Articles on build systems, runtime design, developer experience,
        diagnostics, local-first infrastructure, and the future of C++ tooling —
        written by the people building Vix.cpp.
      </p>

      <div class="bh-meta">
        <a class="bh-link" href="/posts/">
          All posts
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <span class="bh-meta-sep">·</span>
        <a class="bh-link bh-link--muted" href="https://vixcpp.com">
          vixcpp.com
        </a>
        <span class="bh-meta-sep">·</span>
        <a class="bh-link bh-link--muted" href="https://github.com/vixcpp">
          GitHub
        </a>
      </div>
    </header>

    <!-- ── Featured article ── -->
    <a class="bh-featured" :href="featured.href">
      <div class="bh-featured-meta">
        <span class="bh-tag bh-tag--featured">{{ featured.tag }}</span>
        <span class="bh-featured-date">{{ featured.date }}</span>
        <span class="bh-featured-sep">·</span>
        <span class="bh-featured-time">{{ featured.readTime }}</span>
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

    <!-- ── Section heading ── -->
    <div class="bh-section">
      <h3 class="bh-section-title">Recent posts</h3>
      <a href="/posts/" class="bh-section-link">View all</a>
    </div>

    <!-- ── Articles grid ── -->
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
          <span class="bh-card-time">{{ post.readTime }} read</span>
          <span class="bh-card-arrow">
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
      </a>
    </div>

    <!-- ── Topics ── -->
    <div class="bh-topics">
      <h3 class="bh-topics-title">Browse by topic</h3>
      <div class="bh-topics-list">
        <a
          v-for="topic in topics"
          :key="topic.label"
          class="bh-topic"
          :href="`/topics/${topic.label.toLowerCase().replace(/\s+/g, '-')}`"
        >
          {{ topic.label }}
          <span class="bh-topic-count">{{ topic.count }}</span>
        </a>
      </div>
    </div>

  </section>
</template>

<style scoped>
.bh {
  max-width: 760px;
  margin: 0 auto;
  padding: 56px 24px 64px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* ── Header ── */
.bh-header {
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
  animation: bh-pulse 2.4s ease-in-out infinite;
}

@keyframes bh-pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(22, 163, 74, .15); }
  50%      { box-shadow: 0 0 0 5px rgba(22, 163, 74, .08); }
}

.bh-eyebrow-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #525252;
}

.bh-title {
  margin: 0 0 24px;
  font-size: clamp(2.4rem, 5vw, 3.5rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  font-weight: 800;
  color: #0a0a0a;
}

.bh-lead {
  max-width: 60ch;
  margin: 0 0 28px;
  font-size: 17px;
  line-height: 1.65;
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
  transition: gap .15s ease;
}

.bh-link svg { transition: transform .15s ease; }
.bh-link:hover { gap: 7px; }
.bh-link:hover svg { transform: translateX(2px); }

.bh-link--muted {
  color: #525252;
  font-weight: 500;
}

.bh-link--muted:hover { color: #0a0a0a; }

.bh-meta-sep {
  color: #d4d4d4;
}

/* ── Featured ── */
.bh-featured {
  display: block;
  padding: 32px;
  margin-bottom: 56px;
  border-radius: 16px;
  border: 1px solid rgba(10, 10, 10, .08);
  background:
    linear-gradient(135deg, rgba(250, 250, 250, 0) 0%, rgba(244, 244, 245, .50) 100%),
    #fafafa;
  text-decoration: none !important;
  transition: all .2s cubic-bezier(.4, 0, .2, 1);
  position: relative;
  overflow: hidden;
}

.bh-featured::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(10, 10, 10, .12), transparent);
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
  gap: 10px;
  margin-bottom: 16px;
  font-size: 12.5px;
  color: #737373;
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

.bh-featured-date,
.bh-featured-time {
  font-weight: 500;
  font-size: 12.5px;
}

.bh-featured-sep {
  color: #d4d4d4;
}

.bh-featured-title {
  margin: 0 0 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.035em;
  font-weight: 700;
  color: #0a0a0a;
}

.bh-featured-desc {
  margin: 0 0 20px;
  font-size: 15.5px;
  line-height: 1.65;
  color: #525252;
  max-width: 58ch;
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

.bh-featured-cta svg { transition: transform .15s ease; }
.bh-featured:hover .bh-featured-cta svg { transform: translateX(3px); }

/* ── Section heading ── */
.bh-section {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(10, 10, 10, .08);
}

.bh-section-title {
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

.bh-section-link:hover { color: #0a0a0a; }

/* ── Cards grid ── */
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
  transition: all .2s cubic-bezier(.4, 0, .2, 1);
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

.bh-card:hover .bh-card-arrow { transform: translateX(3px); }

/* ── Topics ── */
.bh-topics {
  margin-bottom: 64px;
}

.bh-topics-title {
  margin: 0 0 16px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #525252;
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
  transition: all .15s ease;
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
  color: rgba(255, 255, 255, .60);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .bh {
    padding: 32px 20px 48px;
  }

  .bh-header { margin-bottom: 40px; }
  .bh-featured { padding: 24px; margin-bottom: 40px; }

  .bh-grid {
    grid-template-columns: 1fr;
    gap: 14px;
    margin-bottom: 48px;
  }

  .bh-topics { margin-bottom: 48px; }
}

@media (max-width: 480px) {
  .bh-title { font-size: 2rem; }
  .bh-featured-title { font-size: 1.35rem; }
  .bh-card { padding: 20px; }
}
</style>
