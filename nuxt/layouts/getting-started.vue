<script setup lang="ts">
// Single-page guide layout: normal FlowFuse chrome, the reading-progress rail +
// section nav on the LEFT and content to its right. Scroll-spy and progress are
// computed here and passed down, so the left rail tracks one scrolling page.
import '~/assets/css/getting-started.css'

const activeId = ref('')
const progress = ref(0)
let observer: IntersectionObserver | null = null
let onScroll: (() => void) | null = null

onMounted(() => {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.gs-section[id]'))
  if (sections.length) {
    activeId.value = sections[0].id
    observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) activeId.value = (e.target as HTMLElement).id })
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })
    sections.forEach(s => observer!.observe(s))
  }
  const content = document.getElementById('gs-content')
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
    <a href="#gs-content" class="skip-to-main">Skip to main content</a>
    <AppUtilityBar />
    <AppHeader />
    <div class="flex-grow base bg-white">
      <div class="gs-shell">
        <aside class="gs-sidebar">
          <div class="gs-sidebar__inner"><GsProgress :progress="progress" :active="activeId" /></div>
        </aside>
        <main id="gs-content" class="gs-main">
          <div class="gs-topbar"><GsShare /></div>
          <slot />
        </main>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.gs-shell { max-width: 86rem; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr; }
.gs-sidebar { display: none; }
.gs-main { min-width: 0; padding: 0 1.5rem; }
.gs-topbar { display: flex; justify-content: flex-end; padding-top: 1.25rem; }
@media (min-width: 1024px) {
  .gs-shell { grid-template-columns: 232px minmax(0, 1fr); column-gap: 2rem; }
  .gs-sidebar { display: block; }
  /* top clears the sticky site header (~75px) so the rail isn't hidden behind
     it once the page scrolls; matches the sections' scroll-margin-top. */
  .gs-sidebar__inner { position: sticky; top: 5.75rem; max-height: calc(100vh - 7.25rem); overflow-y: auto; padding: 0.25rem 0 1.75rem 1.5rem; }
}
</style>
