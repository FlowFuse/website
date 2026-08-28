<script setup lang="ts">
// Reading-progress rail. `progress` (0–100) and `active` (slug in view) come from the layout.
const props = defineProps<{ progress?: number; active?: string }>()
const activeIndex = computed(() => {
  const i = GS_SECTIONS.findIndex(s => s.slug === props.active)
  return i < 0 ? 0 : i
})
function go (e: MouseEvent, slug: string) {
  const el = document.getElementById(slug)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${slug}`)
}
</script>

<template>
  <div class="gs-prog">
    <div class="gs-prog__head">
      <span class="gs-prog__pct">{{ progress ?? 0 }}<small>%</small></span>
      <span class="gs-prog__cap">complete</span>
    </div>
    <ol class="gs-prog__steps">
      <li
        v-for="(s, i) in GS_SECTIONS"
        :key="s.slug"
        :class="{ 'is-done': i < activeIndex, 'is-active': i === activeIndex }"
      >
        <a :href="`#${s.slug}`" @click="go($event, s.slug)">
          <span class="gs-prog__dot" aria-hidden="true"></span>
          <span class="gs-prog__name">{{ s.title }}</span>
        </a>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.gs-prog { font-size: .8rem; }
.gs-prog__head { display: flex; align-items: baseline; gap: .35rem; margin-bottom: 1.1rem; }
.gs-prog__pct { font-size: 1.9rem; font-weight: 800; color: #4f46e5; letter-spacing: -0.02em; line-height: 1; }
.gs-prog__pct small { font-size: .9rem; font-weight: 700; }
.gs-prog__cap { font-size: .68rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #9ca3af; }
.gs-prog__steps { list-style: none; margin: 0; padding: 0; position: relative; }
/* the connecting track */
.gs-prog__steps::before { content: ""; position: absolute; left: 5px; top: .5rem; bottom: .5rem; width: 2px; background: #eef0f3; }
.gs-prog__steps li a { display: flex; align-items: center; gap: .55rem; padding: .3rem 0; color: #94a3b8; text-decoration: none; line-height: 1.25; transition: color .12s ease; }
.gs-prog__steps li a:hover { color: #4f46e5; text-decoration: none; }
.gs-prog__dot { position: relative; z-index: 1; flex: none; width: 12px; height: 12px; border-radius: 9999px; background: #fff; border: 2px solid #d7dbe3; transition: background .15s ease, border-color .15s ease; }
.gs-prog__name { font-size: .76rem; }
.gs-prog__steps li.is-done a { color: #64748b; }
.gs-prog__steps li.is-done .gs-prog__dot { background: #a5b4fc; border-color: #a5b4fc; }
.gs-prog__steps li.is-active a { color: #4338ca; font-weight: 700; }
.gs-prog__steps li.is-active .gs-prog__dot { background: #4f46e5; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79,70,229,0.18); }
</style>
