<script setup lang="ts">
// Copy-the-current-URL share button for the getting-started guide. Lives in the
// layout so it's on every guide page. Client-only work happens in the click handler,
// so there's nothing to guard for SSR.
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

async function share () {
  const url = window.location.href
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    // Fallback for older browsers / non-secure contexts.
    const ta = document.createElement('textarea')
    ta.value = url
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy') } catch { /* no-op */ }
    document.body.removeChild(ta)
  }
  copied.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { copied.value = false }, 2000)
  if (typeof (window as any).capture === 'function') {
    (window as any).capture('gs-share', { url })
  }
}
</script>

<template>
  <button
    type="button"
    class="gs-share"
    :class="{ 'gs-share--copied': copied }"
    :aria-label="copied ? 'Link copied to clipboard' : 'Copy link to this page'"
    @click="share"
  >
    <svg v-if="!copied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-3 3a4.5 4.5 0 01-6.364-6.364l1.5-1.5m6.364-2.828l1.5-1.5a4.5 4.5 0 016.364 6.364l-3 3a4.5 4.5 0 01-6.364 0" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
      <path d="M4.5 12.75l6 6 9-13.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>{{ copied ? 'Copied!' : 'Share' }}</span>
  </button>
</template>

<style scoped>
.gs-share {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .82rem; font-weight: 600; color: #4f46e5;
  background: #fff; border: 1px solid #e0e4ff; border-radius: 9999px;
  padding: .4rem .85rem; cursor: pointer;
  transition: background .15s ease, border-color .15s ease, color .15s ease;
}
.gs-share:hover { background: #eef2ff; border-color: #c7d2fe; }
.gs-share svg { width: 1rem; height: 1rem; }
.gs-share--copied { color: #0f766e; border-color: #99e6da; background: #e6faf6; }
</style>
