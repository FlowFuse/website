<script setup lang="ts">
// Right-rail sticky conversion CTA for the getting-started page. Stays in view
// as the reader scrolls, then fades out once the page's own "Ready to build?"
// CTA (#ready-cta) scrolls into view, so the two never stack up.
const hidden = ref(false)
let obs: IntersectionObserver | null = null

onMounted(() => {
  const target = document.getElementById('ready-cta')
  if (!target) return
  obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { hidden.value = e.isIntersecting })
  }, { threshold: 0 })
  obs.observe(target)
})
onBeforeUnmount(() => obs?.disconnect())
</script>

<template>
  <Transition name="gs-sticky">
    <div v-show="!hidden" class="gs-sticky">
      <p class="gs-sticky__title">Ready to build?</p>
      <p class="gs-sticky__sub">Start a free trial, or get a guided walkthrough from our team.</p>
      <CtaSignUp variant="primary" position="gs-sticky-rail" />
      <CtaBookDemo variant="ghost" position="gs-sticky-rail" />
    </div>
  </Transition>
</template>

<style scoped>
/* Deliberately quiet so it drops into any page: no full border or drop shadow —
   just a left indigo accent bar and a tint that fades out, echoing this page's
   section headers and note callouts. */
.gs-sticky { border-left: 3px solid #4f46e5; padding: .25rem 0 .25rem 1.1rem; background: transparent; display: flex; flex-direction: column; gap: .4rem; }
.gs-sticky__title { font-weight: 600; color: #374151; font-size: .9rem; margin: 0; }
.gs-sticky__sub { font-size: .76rem; color: #9ca3af; line-height: 1.45; margin: 0 0 .55rem; }
/* stretch the primary button; the ghost secondary stays a light text link */
.gs-sticky :deep(a) { width: 100%; justify-content: center; }
.gs-sticky-enter-active, .gs-sticky-leave-active { transition: opacity .25s ease, transform .25s ease; }
.gs-sticky-enter-from, .gs-sticky-leave-to { opacity: 0; transform: translateY(8px); }
@media (prefers-reduced-motion: reduce) { .gs-sticky-enter-active, .gs-sticky-leave-active { transition: none; } }
</style>
