<script setup lang="ts">
// Single-page guide layout: normal FlowFuse chrome, a sticky section nav on the left,
// the content in the middle, and a reading-progress rail on the right. Scroll-spy and
// progress are computed here and passed down, so the rails track one scrolling page.
import '~/assets/css/how-it-works.css'

const activeId = ref('')
const progress = ref(0)
let observer: IntersectionObserver | null = null
let onScroll: (() => void) | null = null

onMounted(() => {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.hiw-section[id]'))
  if (sections.length) {
    activeId.value = sections[0].id
    observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) activeId.value = (e.target as HTMLElement).id })
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })
    sections.forEach(s => observer!.observe(s))
  }
  const content = document.getElementById('hiw-content')
  onScroll = () => {
    if (!content) return
    const total = content.offsetHeight - window.innerHeight
    const scrolled = Math.max(0, -content.getBoundingClientRect().top)
    progress.value = Math.round(Math.min(100, Math.max(0, (scrolled / Math.max(total, 1)) * 100)))
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  observer?.disconnect()
  if (onScroll) window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="font-sans ff-website leading-normal tracking-normal text-gray-500 min-h-screen flex flex-col">
    <a href="#hiw-content" class="skip-to-main">Skip to main content</a>
    <AppUtilityBar />
    <AppHeader />
    <div class="flex-grow base bg-white">
      <div class="hiw-shell">
        <aside class="hiw-sidebar">
          <div class="hiw-sidebar__inner"><HiwLeftNav :active="activeId" /></div>
        </aside>
        <main id="hiw-content" class="hiw-main">
          <div class="hiw-topbar"><HiwShare /></div>
          <slot />
        </main>
        <aside class="hiw-rail">
          <div class="hiw-rail__inner"><HiwProgress :progress="progress" :active="activeId" /></div>
        </aside>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.hiw-shell { max-width: 86rem; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr; }
.hiw-sidebar, .hiw-rail { display: none; }
.hiw-main { min-width: 0; padding: 0 1.5rem; }
.hiw-topbar { display: flex; justify-content: flex-end; padding-top: 1.25rem; }
@media (min-width: 1024px) {
  .hiw-shell { grid-template-columns: 220px minmax(0, 1fr); column-gap: 2rem; }
  .hiw-sidebar { display: block; }
  .hiw-sidebar__inner { position: sticky; top: 1.25rem; max-height: calc(100vh - 2.5rem); overflow-y: auto; padding: 1.75rem 0 1.75rem 1.5rem; }
}
@media (min-width: 1280px) {
  .hiw-shell { grid-template-columns: 220px minmax(0, 1fr) 200px; }
  .hiw-rail { display: block; }
  .hiw-rail__inner { position: sticky; top: 1.75rem; padding: 1.75rem 0; }
}
</style>
