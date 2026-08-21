<script setup lang="ts">
// In-page section nav for the single-page guide. `active` (the slug in view) comes
// from the layout's scroll-spy. Clicking smooth-scrolls to the section.
defineProps<{ active?: string }>()

function go (e: MouseEvent, slug: string) {
  const el = document.getElementById(slug)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${slug}`)
}
</script>

<template>
  <nav class="hiw-nav" aria-label="On this page">
    <p class="hiw-nav__eyebrow">The guide</p>
    <ol class="hiw-nav__list">
      <li v-for="(s, i) in HIW_SECTIONS" :key="s.slug">
        <a
          :href="`#${s.slug}`"
          class="hiw-nav__link"
          :class="{ 'hiw-nav__link--active': active === s.slug }"
          @click="go($event, s.slug)"
        >
          <span class="hiw-nav__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="hiw-nav__text">{{ s.title }}</span>
        </a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.hiw-nav { font-size: .875rem; }
.hiw-nav__eyebrow { font-size: .66rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #9ca3af; margin: 0 0 .8rem; }
.hiw-nav__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .05rem; }
.hiw-nav__link { display: flex; align-items: baseline; gap: .6rem; padding: .4rem .7rem; border-radius: .45rem; color: #64748b; text-decoration: none; border-left: 2px solid transparent; line-height: 1.3; transition: color .12s ease, background .12s ease; }
.hiw-nav__link:hover { color: #111827; background: #f5f6f8; text-decoration: none; }
.hiw-nav__num { font-size: .66rem; font-weight: 800; color: #cbd5e1; letter-spacing: .04em; flex: none; }
.hiw-nav__link--active { color: #4338ca; background: #eef2ff; border-left-color: #4f46e5; font-weight: 600; }
.hiw-nav__link--active .hiw-nav__num { color: #4f46e5; }
</style>
