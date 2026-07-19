<template>
  <figure
    class="cb"
    :class="`cb--${normalizeLang(activeLang)}`"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <div class="cb-head">
      <div class="cb-head-left">
        <span class="cb-dot cb-dot--red" aria-hidden="true"></span>
        <span class="cb-dot cb-dot--yellow" aria-hidden="true"></span>
        <span class="cb-dot cb-dot--green" aria-hidden="true"></span>

        <figcaption class="cb-title">
          {{ title || computedTitle }}
        </figcaption>

        <span v-for="chip in chipsToShow" :key="chip" class="cb-chip">
          {{ chip }}
        </span>
      </div>

      <div class="cb-head-right">
        <div
          v-if="tabs.length > 1"
          class="cb-tabs"
          role="tablist"
          aria-label="Code block views"
          @keydown="onTabsKeydown"
        >
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            role="tab"
            class="cb-tab"
            :class="{ 'cb-tab--active': activeTab === tab.key }"
            :aria-selected="activeTab === tab.key"
            :tabindex="activeTab === tab.key ? 0 : -1"
            :data-key="tab.key"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <button
          v-if="activeText"
          type="button"
          class="cb-copy"
          :class="{
            'cb-copy--visible': hover || copied,
            'cb-copy--copied': copied,
          }"
          :title="copied ? 'Copied' : 'Copy code'"
          :aria-label="copied ? 'Code copied' : 'Copy code'"
          @click="copy(activeText)"
        >
          <svg
            v-if="!copied"
            viewBox="0 0 24 24"
            fill="none"
            class="cb-icon"
            aria-hidden="true"
          >
            <path
              d="M9 9h10v10H9V9Z"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linejoin="round"
            />
            <path
              d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            class="cb-icon"
            aria-hidden="true"
          >
            <path
              d="M20 7 10 17l-4-4"
              stroke="currentColor"
              stroke-width="1.9"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="cb-body"
      :style="{ maxHeight: maxH }"
      role="region"
      :aria-label="`${computedTitle} source`"
    >
      <pre
        class="cb-pre"
      ><code class="cb-code" v-html="activeHtml"></code></pre>
    </div>

    <div v-if="note" class="cb-foot">
      <p class="cb-note">{{ note }}</p>
    </div>
  </figure>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { highlight, normalizeLang } from "./highlighter";

const props = defineProps({
  title: { type: String, default: "" },
  code: { type: String, default: "" },
  run: { type: String, default: "" },
  out: { type: String, default: "" },
  note: { type: String, default: "" },
  lang: { type: String, default: "" },
  chips: { type: Array, default: () => [] },
  maxHeight: { type: [Number, String], default: 420 },
});

const copied = ref(false);
const activeTab = ref("code");
const hover = ref(false);
let copyTimer;

const tabs = computed(() => {
  const result = [];

  if (props.code?.trim()) {
    result.push({
      key: "code",
      label: "Code",
      lang: guessLang("code"),
    });
  }

  if (props.run?.trim()) {
    result.push({
      key: "run",
      label: "Run",
      lang: "shell",
    });
  }

  if (props.out?.trim()) {
    result.push({
      key: "out",
      label: "Output",
      lang: "shell",
    });
  }

  return result;
});

watch(
  () => tabs.value.map((tab) => tab.key).join(","),
  () => {
    if (!tabs.value.some((tab) => tab.key === activeTab.value)) {
      activeTab.value = tabs.value[0]?.key || "code";
    }
  },
  { immediate: true },
);

const active = computed(
  () =>
    tabs.value.find((tab) => tab.key === activeTab.value) ||
    tabs.value[0] ||
    null,
);

const activeText = computed(() => {
  if (activeTab.value === "run") return props.run || "";
  if (activeTab.value === "out") return props.out || "";
  return props.code || "";
});

const activeLang = computed(
  () => active.value?.lang || guessLang(activeTab.value),
);

const activeHtml = computed(() =>
  highlight(activeText.value || "", normalizeLang(activeLang.value)),
);

const computedTitle = computed(() => {
  if (activeTab.value === "run") return "Terminal";
  if (activeTab.value === "out") return "Output";

  const lang = normalizeLang(activeLang.value);

  const labels = {
    cpp: "C++",
    shell: "Shell",
    html: "HTML",
    css: "CSS",
    js: "JavaScript",
    json: "JSON",
    ini: "Manifest",
    cmake: "CMake",
    text: "Text",
  };

  return labels[lang] || lang.toUpperCase();
});

const chipsToShow = computed(() =>
  (props.chips || []).filter(
    (chip) => typeof chip === "string" && chip.trim().length > 0,
  ),
);

const maxH = computed(() => {
  if (typeof props.maxHeight === "number") {
    return `${props.maxHeight}px`;
  }

  return props.maxHeight?.trim() || "420px";
});

function guessLang(tabKey) {
  if (props.lang) return normalizeLang(props.lang);
  if (tabKey === "run" || tabKey === "out") return "shell";

  const source = (props.code || "").trim();

  if (
    source.includes("#include") ||
    source.includes("int main") ||
    source.includes("std::")
  ) {
    return "cpp";
  }

  if (
    source.startsWith("$ ") ||
    source.startsWith("~$") ||
    source.includes(" vix ")
  ) {
    return "shell";
  }

  if (
    /^\s*<(template|div|span|section|html|script|style|!DOCTYPE)\b/i.test(
      source,
    ) ||
    /<\/[a-z][\w-]*>/.test(source)
  ) {
    return "html";
  }

  if (
    /[.#&][\w-]+\s*\{/.test(source) ||
    /^\s*@(media|import|keyframes|supports)/m.test(source)
  ) {
    return "css";
  }

  if (
    /^\s*[{\[]/.test(source) &&
    /["}\]]\s*$/.test(source) &&
    /":/.test(source)
  ) {
    return "json";
  }

  if (/\b(const|let|function|import|export|=>)\b/.test(source)) {
    return "js";
  }

  return "cpp";
}

function onTabsKeydown(event) {
  const keys = tabs.value.map((tab) => tab.key);
  if (!keys.length) return;

  const currentIndex = Math.max(0, keys.indexOf(activeTab.value));
  let nextIndex = currentIndex;

  if (event.key === "ArrowRight") {
    nextIndex = (currentIndex + 1) % keys.length;
  } else if (event.key === "ArrowLeft") {
    nextIndex = (currentIndex - 1 + keys.length) % keys.length;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = keys.length - 1;
  } else {
    return;
  }

  event.preventDefault();
  activeTab.value = keys[nextIndex];

  requestAnimationFrame(() => {
    event.currentTarget
      ?.querySelector(`button[data-key="${activeTab.value}"]`)
      ?.focus();
  });
}

async function copy(text) {
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    showCopiedState();
  } catch {
    const textarea = Object.assign(document.createElement("textarea"), {
      value: text,
      style: "position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none",
    });

    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      showCopiedState();
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

function showCopiedState() {
  copied.value = true;
  window.clearTimeout(copyTimer);
  copyTimer = window.setTimeout(() => {
    copied.value = false;
  }, 1400);
}
</script>

<style>
.cb {
  width: 100%;
  margin: 28px 0;
  overflow: hidden;
  border: 1px solid var(--line-strong, rgba(255, 255, 255, 0.12));
  border-radius: var(--radius-md, 10px);
  background: var(--bg-ink, #0f1215);
  box-shadow: var(--shadow-soft, 0 4px 24px rgba(0, 0, 0, 0.35));
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
}

.cb-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 46px;
  padding: 8px 10px 8px 13px;
  border-bottom: 1px solid var(--line-ink, rgba(255, 255, 255, 0.08));
  background: var(--bg-ink-soft, #15191d);
}

.cb-head-left,
.cb-head-right {
  display: flex;
  align-items: center;
  min-width: 0;
}

.cb-head-left {
  gap: 7px;
}

.cb-head-right {
  flex-shrink: 0;
  gap: 8px;
}

.cb-dot {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.cb-dot--red {
  background: #f87171;
}

.cb-dot--yellow {
  background: #fbbf24;
}

.cb-dot--green {
  margin-right: 3px;
  background: var(--green, #22c55e);
}

.cb-title {
  min-width: 0;
  overflow: hidden;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  font-size: 11.5px;
  font-weight: 650;
  letter-spacing: -0.005em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cb-chip {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 3px 7px;
  border: 1px solid rgba(34, 197, 94, 0.18);
  border-radius: 999px;
  color: var(--green-bright, #86efac);
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.cb-tabs {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--line-ink, rgba(255, 255, 255, 0.08));
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
}

.cb-tab {
  min-height: 26px;
  padding: 4px 9px;
  border: 0;
  border-radius: 6px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  background: transparent;
  font-size: 10px;
  font-weight: 650;
  cursor: pointer;
  transition:
    color 140ms ease,
    background 140ms ease;
}

.cb-tab:hover {
  color: var(--text, rgba(255, 255, 255, 0.92));
}

.cb-tab--active {
  color: var(--green-bright, #86efac);
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
}

.cb-tab:focus-visible,
.cb-copy:focus-visible {
  outline: 2px solid var(--green-soft, #4ade80);
  outline-offset: 2px;
}

.cb-copy {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--line-strong, rgba(255, 255, 255, 0.12));
  border-radius: 7px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  background: rgba(255, 255, 255, 0.035);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 140ms ease,
    color 140ms ease,
    border-color 140ms ease,
    background 140ms ease,
    transform 140ms ease;
}

.cb-copy--visible {
  opacity: 1;
  pointer-events: auto;
}

.cb-copy:hover,
.cb-copy--copied {
  color: var(--green-bright, #86efac);
  border-color: var(--green-line, rgba(34, 197, 94, 0.35));
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
  transform: translateY(-1px);
}

.cb-icon {
  width: 15px;
  height: 15px;
}

.cb-body {
  overflow: auto;
  color: rgba(255, 255, 255, 0.9);
  background: var(--bg-ink, #0f1215);
  -webkit-overflow-scrolling: touch;
}

.cb-pre {
  min-width: max-content;
  margin: 0;
  padding: 18px 20px;
  color: inherit;
  background: transparent;
  font-size: 13.5px;
  line-height: 1.7;
  tab-size: 2;
  white-space: pre;
}

.cb-code {
  display: inline-block;
  min-width: 100%;
  color: inherit;
  font: inherit;
}

.cb-body::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

.cb-body::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
}

.cb-body::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 197, 94, 0.34);
}

.cb-body::-webkit-scrollbar-track {
  background: transparent;
}

.cb-foot {
  padding: 11px 14px;
  border-top: 1px solid var(--line-ink, rgba(255, 255, 255, 0.08));
  background: rgba(255, 255, 255, 0.018);
}

.cb-note {
  margin: 0;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-family: var(--font-sans, Inter, ui-sans-serif, system-ui, sans-serif);
  font-size: 12px;
  line-height: 1.58;
}

@media (hover: none) {
  .cb-copy {
    opacity: 1;
    pointer-events: auto;
  }
}

@media (max-width: 640px) {
  .cb {
    margin: 22px 0;
  }

  .cb-head {
    align-items: flex-start;
    flex-direction: column;
    padding: 10px;
  }

  .cb-head-right {
    width: 100%;
    justify-content: space-between;
  }

  .cb-tabs {
    overflow-x: auto;
  }

  .cb-title {
    max-width: 52vw;
  }

  .cb-pre {
    padding: 15px 14px;
    font-size: 12.5px;
  }
}
</style>
