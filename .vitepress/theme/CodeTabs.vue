<script setup>
import { computed, ref, watch } from "vue";
import CodeBlock from "./CodeBlock.vue";

const props = defineProps({
  title:      { type: String, default: "Examples" },
  subtitle:   { type: String, default: "" },
  examples:   { type: Array,  required: true },
  defaultKey: { type: String, default: "" },
});

const active = ref(props.defaultKey || (props.examples?.[0]?.key ?? ""));

watch(
  () => [props.defaultKey, props.examples?.map(e => e.key).join("|")].join("::"),
  () => {
    const wanted = props.defaultKey || active.value;
    const exists = props.examples?.some(e => e.key === wanted);
    active.value = exists ? wanted : (props.examples?.[0]?.key ?? "");
  },
  { immediate: true }
);

const current = computed(() =>
  props.examples.find(e => e.key === active.value) || props.examples[0] || null
);

function setTab(key) { active.value = key; }

function onTabsKeydown(e) {
  const keys = props.examples?.map(x => x.key) ?? [];
  if (!keys.length) return;
  const idx = Math.max(0, keys.indexOf(active.value));
  let next = idx;
  if (e.key === "ArrowRight") next = (idx + 1) % keys.length;
  else if (e.key === "ArrowLeft") next = (idx - 1 + keys.length) % keys.length;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = keys.length - 1;
  else return;
  e.preventDefault();
  active.value = keys[next];
  e.currentTarget?.querySelector?.(`button[data-key="${active.value}"]`)?.focus?.();
}
</script>

<template>
  <div class="ct">
    <!-- Header -->
    <div class="ct-head">
      <div class="ct-meta">
        <div class="ct-title">{{ title }}</div>
        <div v-if="subtitle" class="ct-sub">{{ subtitle }}</div>
      </div>

      <div class="ct-tabs" role="tablist" aria-label="Code examples" @keydown="onTabsKeydown">
        <button
          v-for="ex in examples"
          :key="ex.key"
          class="ct-tab"
          :class="{ 'ct-tab--active': ex.key === active }"
          :aria-selected="ex.key === active"
          :tabindex="ex.key === active ? 0 : -1"
          role="tab"
          type="button"
          :data-key="ex.key"
          @click="setTab(ex.key)"
        >{{ ex.label }}</button>
      </div>
    </div>

    <!-- File badge -->
    <div class="ct-body">
      <div class="ct-file" v-if="current?.file">
        <span class="ct-lang-badge">{{ current.lang || "txt" }}</span>
        <span class="ct-filename">{{ current.file }}</span>
      </div>

      <CodeBlock
        :title="current?.title || current?.file || current?.label || ''"
        :lang="current?.lang || ''"
        :chips="Array.isArray(current?.chips) ? current.chips : []"
        :code="current?.code || ''"
        :run="current?.run || ''"
        :out="current?.out || ''"
        :note="current?.note || ''"
        :maxHeight="460"
      />
    </div>
  </div>
</template>

<style scoped>
.ct {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(10, 10, 10, .08);
  background: #ffffff;
  margin: 24px 0;
  transition: border-color .15s ease;
}

.ct:hover {
  border-color: rgba(10, 10, 10, .14);
}

/* Head */
.ct-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(10, 10, 10, .06);
  background: #fafafa;
}

.ct-title {
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: #0a0a0a;
  line-height: 1.2;
}

.ct-sub {
  margin-top: 3px;
  font-size: 12.5px;
  color: #525252;
  line-height: 1.4;
  letter-spacing: -0.005em;
}

/* Tabs */
.ct-tabs {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 3px;
  background: rgba(10, 10, 10, .04);
  border-radius: 8px;
}

.ct-tab {
  border: 0;
  background: transparent;
  color: #525252;
  padding: 5px 11px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  letter-spacing: -0.005em;
  transition: all .12s ease;
  font-family: inherit;
}

.ct-tab:hover {
  color: #0a0a0a;
  background: rgba(10, 10, 10, .04);
}

.ct-tab--active {
  color: #0a0a0a;
  background: #ffffff;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .06);
}

.ct-tab:focus-visible {
  box-shadow: 0 0 0 2px rgba(10, 10, 10, .20);
}

/* Body */
.ct-body {
  padding: 12px;
  background: #ffffff;
}

/* File info */
.ct-file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  margin-bottom: 10px;
  border: 1px solid #d4d2c8;
  border-radius: 8px;
  background: #f0eee4;
  color: #555;
  font-size: 12.5px;
}

.ct-lang-badge {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 4px;
  background: #0000ff;
  color: #ffffff;
  letter-spacing: 0.04em;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}

.ct-filename {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12.5px;
  color: #0a0a0a;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 640px) {
  .ct-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 14px;
  }
  .ct-tabs { justify-content: flex-start; }
  .ct-body { padding: 10px; }
}
</style>
