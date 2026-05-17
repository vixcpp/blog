<template>
  <div class="cb" @mouseenter="hover = true" @mouseleave="hover = false">
    <!-- Header -->
    <div class="cb-head">
      <div class="cb-head-left">
        <span class="cb-title">{{ title || computedTitle }}</span>
        <span v-for="c in chipsToShow" :key="c" class="cb-chip">{{ c }}</span>
      </div>

      <div class="cb-head-right">
        <div class="cb-tabs" v-if="tabs.length > 1">
          <button
            v-for="t in tabs"
            :key="t.key"
            type="button"
            class="cb-tab"
            :class="{ 'cb-tab--active': activeTab === t.key }"
            @click="activeTab = t.key"
          >{{ t.label }}</button>
        </div>

        <button
          v-if="activeText"
          type="button"
          class="cb-copy"
          :class="{ 'cb-copy--visible': hover }"
          @click="copy(activeText)"
          :title="copied ? 'Copied!' : 'Copy'"
          aria-label="Copy code"
        >
          <svg v-if="!copied" viewBox="0 0 24 24" fill="none" class="cb-ico">
            <path d="M9 9h10v10H9V9Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
            <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" class="cb-ico">
            <path d="M20 7L10 17l-4-4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="cb-body" :style="{ maxHeight: maxH }" role="region" aria-label="Code">
      <pre class="cb-pre"><code class="cb-code" v-html="activeHtml"></code></pre>
    </div>

    <!-- Footer note -->
    <div v-if="note" class="cb-foot">
      <p class="cb-note">{{ note }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  title:     { type: String, default: "" },
  code:      { type: String, default: "" },
  run:       { type: String, default: "" },
  out:       { type: String, default: "" },
  note:      { type: String, default: "" },
  lang:      { type: String, default: "" },
  chips:     { type: Array,  default: () => [] },
  maxHeight: { type: [Number, String], default: 420 },
});

const copied    = ref(false);
const activeTab = ref("code");
const hover     = ref(false);

const tabs = computed(() => {
  const list = [];
  if (props.code?.trim()) list.push({ key: "code",  label: "Code",   lang: guessLang("code") });
  if (props.run?.trim())  list.push({ key: "run",   label: "Run",    lang: "shell" });
  if (props.out?.trim())  list.push({ key: "out",   label: "Output", lang: "shell" });
  return list;
});

watch(
  () => tabs.value.map(t => t.key).join(","),
  () => {
    if (!tabs.value.find(t => t.key === activeTab.value))
      activeTab.value = tabs.value[0]?.key || "code";
  },
  { immediate: true }
);

const active     = computed(() => tabs.value.find(t => t.key === activeTab.value) || tabs.value[0]);
const activeText = computed(() => {
  if (activeTab.value === "run")  return props.run  || "";
  if (activeTab.value === "out")  return props.out  || "";
  return props.code || "";
});
const activeLang = computed(() => active.value?.lang || guessLang(activeTab.value));

const computedTitle = computed(() => {
  if (activeTab.value === "run") return "Terminal";
  if (activeTab.value === "out") return "Output";
  return activeLang.value === "shell" ? "Shell" : "C++";
});

const chipsToShow = computed(() => (props.chips || []).filter(Boolean));

const maxH = computed(() => {
  const v = props.maxHeight;
  if (typeof v === "number") return `${v}px`;
  return v?.trim() ? v : "420px";
});

function guessLang(tabKey) {
  if (props.lang) return props.lang;
  if (tabKey === "run" || tabKey === "out") return "shell";
  const s = (props.code || "").trim();
  if (s.includes("#include") || s.includes("int main") || s.includes("std::")) return "cpp";
  if (s.startsWith("~$") || s.includes(" vix ") || s.startsWith("$ ")) return "shell";
  return "cpp";
}

/* ── Syntax highlight ── */
function esc(s) {
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

function normalizeShellText(raw) {
  return String(raw ?? "")
    .split("\n")
    .map(line => line
      .replace(/^\s*>\s?/, "")
      .replace(/\s*>\s*:(\d{2,5})/g, " :$1")
    )
    .join("\n");
}

/* ──────────────────────────────────────────────
   cppreference-style highlight
   - Keywords + fundamental types: BLUE bold
   - Preprocessor #directive: dark purple
   - Include headers <...>: green italic
   - Strings / chars: dark red
   - Comments: green italic
   - Numbers: dark teal
   - Identifiers, operators, punctuation: BLACK
   ────────────────────────────────────────────── */

/* Keywords + fundamental types — cppreference colors all of these blue */
const KW_BLUE = new Set([
  // Keywords
  "alignas","alignof","and","and_eq","asm","auto","bitand","bitor","break",
  "case","catch","class","compl","concept","const","consteval","constexpr",
  "constinit","const_cast","continue","co_await","co_return","co_yield",
  "decltype","default","delete","do","dynamic_cast","else","enum","explicit",
  "export","extern","false","for","friend","goto","if","inline","mutable",
  "namespace","new","noexcept","not","not_eq","nullptr","operator","or","or_eq",
  "private","protected","public","register","reinterpret_cast","requires",
  "return","sizeof","static","static_assert","static_cast","struct","switch",
  "template","this","thread_local","throw","true","try","typedef","typeid",
  "typename","union","using","virtual","volatile","while","xor","xor_eq",
  "override","final","import","module",
  // Fundamental types
  "bool","char","char8_t","char16_t","char32_t","double","float","int","long",
  "short","signed","unsigned","void","wchar_t"
]);

function wrap(cls, text) { return `<span class="${cls}">${esc(text)}</span>`; }

function splitComment(line) {
  let inStr = false, inChar = false;
  for (let i = 0; i < line.length - 1; i++) {
    const c = line[i];
    if (!inChar && c === '"' && line[i-1] !== "\\") inStr = !inStr;
    if (!inStr  && c === "'" && line[i-1] !== "\\") inChar = !inChar;
    if (!inStr && !inChar && line[i] === "/" && line[i+1] === "/") {
      const before = line.slice(0, i);
      if (before.endsWith("http:") || before.endsWith("https:")) continue;
      return { code: before, comment: line.slice(i) };
    }
  }
  return { code: line, comment: "" };
}

function hlDirective(line) {
  const m = line.match(/^(\s*)(#\s*(?:include|define|pragma|if|ifdef|ifndef|endif|elif|else|undef|error|warning|line)\b)(.*)/);
  if (!m) return null;
  let out = esc(m[1]) + wrap("cb-dir", m[2]);
  const rest = m[3] || "";
  const angle = rest.match(/^(\s*)(<[^>\n]*>)(.*)/);
  if (angle) { out += esc(angle[1]) + wrap("cb-inc", angle[2]) + hlInline(angle[3]||""); return out; }
  const quote = rest.match(/^(\s*)("(?:[^"\\]|\\.)*")(.*)/);
  if (quote) { out += esc(quote[1]) + wrap("cb-inc", quote[2]) + hlInline(quote[3]||""); return out; }
  return out + hlInline(rest);
}

function hlInline(s) {
  let out = "", i = 0;
  const isStart = c => /[A-Za-z_]/.test(c);
  const isId    = c => /[A-Za-z0-9_]/.test(c);

  while (i < s.length) {
    const ch = s[i];

    /* Strings */
    if (ch === '"') {
      let j = i+1;
      while (j < s.length) { if (s[j] === '"' && s[j-1] !== "\\") break; j++; }
      const str = s.slice(i, Math.min(j+1, s.length));
      out += wrap("cb-str", str); i += str.length; continue;
    }

    /* Char literals */
    if (ch === "'") {
      let j = i+1;
      while (j < s.length) { if (s[j] === "'" && s[j-1] !== "\\") break; j++; }
      const lit = s.slice(i, Math.min(j+1, s.length));
      out += wrap("cb-char", lit); i += lit.length; continue;
    }

    /* Numbers */
    if (/[0-9]/.test(ch)) {
      const m = s.slice(i).match(/^(0[xX][0-9A-Fa-f']+|0[bB][01']+|0[0-7']+|[0-9][0-9']*(?:\.[0-9']+)?(?:[eE][+-]?[0-9']+)?)([uUlLfFzZ]{0,3}\b)?/);
      if (m) { out += wrap("cb-num", m[0]); i += m[0].length; continue; }
    }

    /* Identifiers & keywords */
    if (isStart(ch)) {
      let j = i+1;
      while (j < s.length && isId(s[j])) j++;
      const id = s.slice(i, j);

      if (KW_BLUE.has(id))  out += wrap("cb-kw", id);
      else                  out += wrap("cb-id", id);
      i = j; continue;
    }

    /* Operators & punctuation — black (no special class) */
    out += esc(ch); i++;
  }
  return out.replace(/(https?:\/\/[^\s<]+)/g, `<span class="cb-url">$1</span>`);
}

function highlightCpp(raw) {
  return String(raw ?? "").split("\n").map(line => {
    const { code, comment } = splitComment(line);
    const dir = hlDirective(code);
    return (dir ?? hlInline(code)) + (comment ? wrap("cb-cmt", comment) : "");
  }).join("\n");
}

function highlightShell(raw) {
  let s = esc(normalizeShellText(raw));
  s = s.replace(/^(\s*(?:~|\/[^$]*)?\s*\$)/gm,      `<span class="cb-sh-prompt">$1</span>`);
  s = s.replace(/(^\s*(?:<span[^>]*>.*?<\/span>\s*)?)([a-zA-Z0-9_.\/-]+)(\s+)/gm, `$1<span class="cb-sh-cmd">$2</span>$3`);
  s = s.replace(/(\s--?[a-zA-Z0-9_-]+(?:=[^\s]+)?)/g, `<span class="cb-sh-flag">$1</span>`);
  s = s.replace(/(https?:\/\/[^\s]+)/g,              `<span class="cb-sh-url">$1</span>`);
  s = s.replace(/(\s(?:\.{0,2}\/[^\s]+))/g,          `<span class="cb-sh-path">$1</span>`);
  s = s.replace(/(:\d{2,5}\b)/g,                     `<span class="cb-sh-port">$1</span>`);
  s = s.replace(/^(HTTP\/\d\.\d\s+\d+\s+.*)$/gm,     `<span class="cb-sh-http">$1</span>`);
  s = s.replace(/#([^\n]*)/g,                         `<span class="cb-sh-comment">#$1</span>`);
  return s;
}

function normalizeLang(lang) {
  const l = String(lang || "").toLowerCase().trim();
  if (["sh", "bash", "zsh", "shell", "console", "terminal"].includes(l)) return "shell";
  if (["cpp", "c++", "cc", "cxx", "hpp", "hxx"].includes(l)) return "cpp";
  if (["txt", "text", "plain", "plaintext"].includes(l)) return "text";
  return l || "text";
}

function highlightText(raw) { return esc(raw ?? ""); }

const activeHtml = computed(() => {
  const text = activeText.value || "";
  const lang = normalizeLang(activeLang.value);
  if (lang === "shell") return highlightShell(text);
  if (lang === "cpp") return highlightCpp(text);
  return highlightText(text);
});

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    clearTimeout(copy._t);
    copy._t = setTimeout(() => (copied.value = false), 1200);
  } catch {
    const ta = Object.assign(document.createElement("textarea"), {
      value: text,
      style: "position:fixed;opacity:0;left:-9999px",
    });
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); copied.value = true; clearTimeout(copy._t); copy._t = setTimeout(() => (copied.value = false), 1200); }
    finally { document.body.removeChild(ta); }
  }
}
</script>

<style>
/* ════════════════════════════════════════════════
   Code Block — cppreference.com style
   Light cream background, classic syntax colors
   ════════════════════════════════════════════════ */

.cb {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #d4d2c8;
  background: #fafaf6;
  font-family: 'JetBrains Mono', 'Consolas', 'Courier New', ui-monospace, monospace;
  transition: border-color .15s ease;
  margin: 20px 0;
}

.cb:hover {
  border-color: #b8b6ac;
}

/* ── Header ── */
.cb-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  background: #f0eee4;
  border-bottom: 1px solid #d4d2c8;
}

.cb-head-left  { display: flex; align-items: center; gap: 10px; min-width: 0; }
.cb-head-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

.cb-title {
  font-size: 12px;
  font-weight: 600;
  color: #555;
  white-space: nowrap;
  letter-spacing: -0.005em;
  font-family: 'Inter', -apple-system, sans-serif;
}

.cb-chip {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #555;
  border: 1px solid #d4d2c8;
  background: #fafaf6;
  font-family: 'Inter', -apple-system, sans-serif;
}

/* Tabs */
.cb-tabs {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border-radius: 7px;
  background: rgba(0, 0, 0, .04);
}

.cb-tab {
  border: 0;
  background: transparent;
  color: #666;
  font-size: 11.5px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background .12s, color .12s;
  font-family: 'Inter', -apple-system, sans-serif;
  letter-spacing: -0.005em;
}

.cb-tab:hover { color: #222; }

.cb-tab--active {
  background: #fafaf6;
  color: #0a0a0a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .06);
}

/* Copy */
.cb-copy {
  width: 28px;
  height: 28px;
  border: 1px solid #d4d2c8;
  background: #fafaf6;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  display: grid;
  place-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity .15s, background .12s, color .12s;
}

.cb-copy--visible {
  opacity: 1;
  pointer-events: auto;
}

.cb-copy:hover {
  background: #ffffff;
  border-color: #b8b6ac;
  color: #0a0a0a;
}

.cb-ico { width: 14px; height: 14px; display: block; }

/* ── Body ── */
.cb-body {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #fafaf6;
}

.cb-pre {
  margin: 0;
  padding: 14px 16px;
  white-space: pre;
  line-height: 1.55;
  font-size: 13.5px;
  color: #000000;
  background: transparent;
  min-width: max-content;
}

.cb-code {
  display: inline-block;
  min-width: 100%;
  color: #000000;
}

/* Scrollbars */
.cb-body::-webkit-scrollbar { height: 6px; width: 6px; }
.cb-body::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, .15);
  border-radius: 999px;
}
.cb-body::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, .28);
}
.cb-body::-webkit-scrollbar-track { background: transparent; }

/* ── Footer ── */
.cb-foot {
  border-top: 1px solid #d4d2c8;
  padding: 10px 14px;
  background: #f0eee4;
}

.cb-note {
  margin: 0;
  color: #555;
  font-size: 12.5px;
  line-height: 1.55;
  font-family: 'Inter', -apple-system, sans-serif;
  letter-spacing: -0.005em;
}

/* ═══════════════════════════════════════════════
   C++ SYNTAX TOKENS — cppreference.com palette
   ═══════════════════════════════════════════════ */

/* Keywords + fundamental types: BLUE bold
   (int, auto, const, void, class, for, return, true, false, ...) */
.cb-kw       { color: #0000ff; font-weight: 600; }

/* Regular identifiers: BLACK */
.cb-id       { color: #000000; }

/* Preprocessor directive (#include, #define): dark magenta */
.cb-dir      { color: #7f0055; font-weight: 600; }

/* Include headers <iostream>, "file.h": green italic */
.cb-inc      { color: #1e8449; font-style: italic; }

/* String literals: dark red */
.cb-str      { color: #a31515; }

/* Char literals: dark red */
.cb-char     { color: #a31515; }

/* Numeric literals: dark teal/green */
.cb-num      { color: #098658; }

/* Comments: green italic (cppreference signature) */
.cb-cmt      { color: #338033; font-style: italic; }

/* URLs in code */
.cb-url      { color: #0066cc; text-decoration: underline; text-underline-offset: 2px; }

/* ═══════════════════════════
   Shell tokens — same palette family
   ═══════════════════════════ */
.cb-sh-prompt  { color: #098658; font-weight: 700; }
.cb-sh-cmd     { color: #0000ff; font-weight: 600; }
.cb-sh-flag    { color: #a31515; }
.cb-sh-path    { color: #7f0055; }
.cb-sh-url     { color: #0066cc; text-decoration: underline; text-underline-offset: 2px; }
.cb-sh-port    { color: #098658; }
.cb-sh-http    { color: #0000ff; font-weight: 700; }
.cb-sh-comment { color: #338033; font-style: italic; }

@media (max-width: 640px) {
  .cb-pre { font-size: 12.5px; padding: 12px 12px; }
  .cb-title { max-width: 28vw; overflow: hidden; text-overflow: ellipsis; }
  .cb-head { padding: 7px 10px; }
}
</style>
