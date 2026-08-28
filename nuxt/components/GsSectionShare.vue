<script setup lang="ts">
// Per-section share: copies a deep link to this section (page URL + #slug).
const props = defineProps<{ slug: string }>()
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function share () {
  const url = `${location.origin}${location.pathname.replace(/\/$/, '/')}#${props.slug}`
  const done = () => {
    copied.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { copied.value = false }, 1800)
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).then(done).catch(done)
  } else {
    const ta = document.createElement('textarea')
    ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0'
    document.body.appendChild(ta); ta.select()
    try { document.execCommand('copy') } catch { /* no-op */ }
    ta.remove(); done()
  }
}
</script>

<template>
  <button
    type="button"
    class="gs-secshare"
    :class="{ 'is-copied': copied }"
    :aria-label="copied ? 'Section link copied' : 'Copy a link to this section'"
    @click="share"
  >
    <svg v-if="!copied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-3 3a4.5 4.5 0 01-6.364-6.364l1.5-1.5m6.364-2.828l1.5-1.5a4.5 4.5 0 016.364 6.364l-3 3a4.5 4.5 0 01-6.364 0" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
      <path d="M4.5 12.75l6 6 9-13.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>{{ copied ? 'Copied' : 'Share' }}</span>
  </button>
</template>

<style scoped>
.gs-secshare { display: inline-flex; align-items: center; gap: .35rem; font-size: .74rem; font-weight: 700; color: #64748b; background: #fff; border: 1px solid #e5e7eb; border-radius: 9999px; padding: .32rem .7rem; cursor: pointer; transition: color .15s ease, border-color .15s ease, background .15s ease; }
.gs-secshare:hover { color: #4f46e5; border-color: #c7d2fe; background: #f5f7ff; }
.gs-secshare svg { width: .9rem; height: .9rem; }
.gs-secshare.is-copied { color: #0f766e; border-color: #99e6da; background: #e6faf6; }
</style>
