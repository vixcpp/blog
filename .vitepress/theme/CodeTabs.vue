<script setup>
import { computed, ref, watch } from "vue";
import CodeBlock from "./CodeBlock.vue";

const props = defineProps({
  title: { type: String, default: "Examples" },
  subtitle: { type: String, default: "" },
  examples: { type: Array, required: true },
  defaultKey: { type: String, default: "" },
});

const active = ref(props.defaultKey || props.examples?.[0]?.key || "");

watch(
  () =>
    [
      props.defaultKey,
      props.examples?.map((example) => example.key).join("|"),
    ].join("::"),
  () => {
    const requested = props.defaultKey || active.value;
    const exists = props.examples?.some((example) => example.key === requested);

    active.value = exists ? requested : props.examples?.[0]?.key || "";
  },
  { immediate: true },
);

const current = computed(
  () =>
    props.examples.find((example) => example.key === active.value) ||
    props.examples[0] ||
    null,
);

function setTab(key) {
  active.value = key;
}

function onTabsKeydown(event) {
  const keys = props.examples?.map((example) => example.key) || [];
  if (!keys.length) return;

  const currentIndex = Math.max(0, keys.indexOf(active.value));
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
  active.value = keys[nextIndex];

  requestAnimationFrame(() => {
    event.currentTarget
      ?.querySelector(`button[data-key="${active.value}"]`)
      ?.focus();
  });
}
</script>

<template>
  <section class="ct" aria-label="Code examples">
    <header class="ct-head">
      <div class="ct-meta">
        <h3 class="ct-title">{{ title }}</h3>
        <p v-if="subtitle" class="ct-subtitle">{{ subtitle }}</p>
      </div>

      <div
        class="ct-tabs"
        role="tablist"
        aria-label="Choose an example"
        @keydown="onTabsKeydown"
      >
        <button
          v-for="example in examples"
          :key="example.key"
          type="button"
          role="tab"
          class="ct-tab"
          :class="{ 'ct-tab--active': example.key === active }"
          :aria-selected="example.key === active"
          :tabindex="example.key === active ? 0 : -1"
          :data-key="example.key"
          @click="setTab(example.key)"
        >
          {{ example.label }}
        </button>
      </div>
    </header>

    <div class="ct-body">
      <div v-if="current?.file" class="ct-file">
        <span class="ct-language">
          {{ current.lang || "text" }}
        </span>
        <code>{{ current.file }}</code>
      </div>

      <CodeBlock
        :title="current?.title || current?.file || current?.label || ''"
        :lang="current?.lang || ''"
        :chips="Array.isArray(current?.chips) ? current.chips : []"
        :code="current?.code || ''"
        :run="current?.run || ''"
        :out="current?.out || ''"
        :note="current?.note || ''"
        :max-height="current?.maxHeight || 440"
      />
    </div>
  </section>
</template>

<style scoped>
.ct {
  margin: 32px 0;
  overflow: hidden;
  border: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  border-radius: var(--radius-lg, 16px);
  background: var(--bg-panel, #1a1e22);
  box-shadow: var(--shadow-soft, 0 4px 24px rgba(0, 0, 0, 0.35));
}

.ct-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 15px 16px;
  border-bottom: 1px solid var(--line, rgba(255, 255, 255, 0.075));
  background: var(--bg-panel-strong, #20252a);
}

.ct-meta {
  min-width: 0;
}

.ct-title {
  margin: 0;
  color: var(--text, rgba(255, 255, 255, 0.92));
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.012em;
}

.ct-subtitle {
  margin: 4px 0 0;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  font-size: 11.5px;
  line-height: 1.45;
}

.ct-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 4px;
}

.ct-tab {
  min-height: 30px;
  padding: 5px 10px;
  border: 1px solid var(--line-strong, rgba(255, 255, 255, 0.12));
  border-radius: 7px;
  color: var(--text-muted, rgba(255, 255, 255, 0.43));
  background: transparent;
  font-size: 10.5px;
  font-weight: 650;
  cursor: pointer;
  transition:
    color 140ms ease,
    border-color 140ms ease,
    background 140ms ease;
}

.ct-tab:hover {
  color: var(--text, rgba(255, 255, 255, 0.92));
  border-color: rgba(34, 197, 94, 0.24);
}

.ct-tab--active {
  color: var(--green-bright, #86efac);
  border-color: rgba(34, 197, 94, 0.28);
  background: var(--green-faint, rgba(34, 197, 94, 0.1));
}

.ct-tab:focus-visible {
  outline: 2px solid var(--green-soft, #4ade80);
  outline-offset: 2px;
}

.ct-body {
  padding: 12px;
}

.ct-file {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 9px;
  padding: 7px 9px;
  border: 1px dashed var(--line-strong, rgba(255, 255, 255, 0.12));
  border-radius: 8px;
  color: var(--text-soft, rgba(255, 255, 255, 0.64));
  background: rgba(255, 255, 255, 0.018);
  font-size: 11.5px;
}

.ct-language {
  padding: 3px 7px;
  border: 1px solid rgba(34, 197, 94, 0.18);
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
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.ct-file code {
  overflow: hidden;
  color: var(--text, rgba(255, 255, 255, 0.92));
  background: transparent;
  font-family: var(
    --font-mono,
    "JetBrains Mono",
    "SFMono-Regular",
    Consolas,
    monospace
  );
  font-size: 11.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ct-body :deep(.cb) {
  margin: 0;
}

@media (max-width: 680px) {
  .ct-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .ct-tabs {
    justify-content: flex-start;
  }
}
</style>
