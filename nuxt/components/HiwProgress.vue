<script setup lang="ts">
// Reading-progress rail. `progress` (0–100) and `active` (slug in view) come from the layout.
const props = defineProps<{ progress?: number; active?: string }>()
const activeIndex = computed(() => {
  const i = HIW_SECTIONS.findIndex(s => s.slug === props.active)
  return i < 0 ? 0 : i
})
function go (e: MouseEvent, slug: string) {
  const el = document.getElementById(slug)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${slug}`)
}

const shared = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
function shareActive () {
  const slug = props.active || HIW_SECTIONS[0].slug
  const url = `${location.origin}${location.pathname}#${slug}`
  const done = () => { shared.value = true; if (timer) clearTimeout(timer); timer = setTimeout(() => { shared.value = false }, 1800) }
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(done).catch(done)
  else { const ta = document.createElement('textarea'); ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy') } catch { /* no-op */ } ta.remove(); done() }
}
</script>

<template>
  <div class="hiw-prog">
    <div class="hiw-prog__head">
      <span class="hiw-prog__pct">{{ progress ?? 0 }}<small>%</small></span>
      <span class="hiw-prog__cap">complete</span>
    </div>
    <ol class="hiw-prog__steps">
      <li
        v-for="(s, i) in HIW_SECTIONS"
        :key="s.slug"
        :class="{ 'is-done': i < activeIndex, 'is-active': i === activeIndex }"
      >
        <a :href="`#${s.slug}`" @click="go($event, s.slug)">
          <span class="hiw-prog__dot" aria-hidden="true"></span>
          <span class="hiw-prog__name">{{ s.title }}</span>
        </a>
      </li>
    </ol>
    <button type="button" class="hiw-prog__share" :class="{ 'is-copied': shared }" @click="shareActive">
      <svg v-if="!shared" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-3 3a4.5 4.5 0 01-6.364-6.364l1.5-1.5m6.364-2.828l1.5-1.5a4.5 4.5 0 016.364 6.364l-3 3a4.5 4.5 0 01-6.364 0" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M4.5 12.75l6 6 9-13.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span>{{ shared ? 'Link copied' : 'Share this section' }}</span>
    </button>
  </div>
</template>

<style scoped>
.hiw-prog { font-size: .8rem; }
.hiw-prog__head { display: flex; align-items: baseline; gap: .35rem; margin-bottom: 1.1rem; }
.hiw-prog__pct { font-size: 1.9rem; font-weight: 800; color: #4f46e5; letter-spacing: -0.02em; line-height: 1; }
.hiw-prog__pct small { font-size: .9rem; font-weight: 700; }
.hiw-prog__cap { font-size: .68rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #9ca3af; }
.hiw-prog__steps { list-style: none; margin: 0; padding: 0; position: relative; }
/* the connecting track */
.hiw-prog__steps::before { content: ""; position: absolute; left: 5px; top: .5rem; bottom: .5rem; width: 2px; background: #eef0f3; }
.hiw-prog__steps li a { display: flex; align-items: center; gap: .55rem; padding: .3rem 0; color: #94a3b8; text-decoration: none; line-height: 1.25; transition: color .12s ease; }
.hiw-prog__steps li a:hover { color: #4f46e5; text-decoration: none; }
.hiw-prog__dot { position: relative; z-index: 1; flex: none; width: 12px; height: 12px; border-radius: 9999px; background: #fff; border: 2px solid #d7dbe3; transition: background .15s ease, border-color .15s ease; }
.hiw-prog__name { font-size: .76rem; }
.hiw-prog__steps li.is-done a { color: #64748b; }
.hiw-prog__steps li.is-done .hiw-prog__dot { background: #a5b4fc; border-color: #a5b4fc; }
.hiw-prog__steps li.is-active a { color: #4338ca; font-weight: 700; }
.hiw-prog__steps li.is-active .hiw-prog__dot { background: #4f46e5; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79,70,229,0.18); }
.hiw-prog__share { display: inline-flex; align-items: center; gap: .4rem; margin-top: 1.4rem; font-size: .72rem; font-weight: 700; color: #4f46e5; background: #eef2ff; border: 1px solid #e0e4ff; border-radius: 9999px; padding: .4rem .7rem; cursor: pointer; transition: background .15s ease, border-color .15s ease, color .15s ease; }
.hiw-prog__share:hover { background: #e0e7ff; border-color: #c7d2fe; }
.hiw-prog__share svg { width: .9rem; height: .9rem; }
.hiw-prog__share.is-copied { color: #0f766e; background: #e6faf6; border-color: #99e6da; }
</style>
