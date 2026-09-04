<script setup lang="ts">
// End-of-section hand-off to the deep technical reference (Drew's Application Guide).
// A tour stop consolidates several technical topics, so this takes a list of links.
const props = defineProps<{ links: { slug: string; title: string }[] }>()
const capture = useCapture()
</script>

<template>
  <div class="gs-godeeper">
    <div class="gs-godeeper__head">
      <span class="gs-godeeper__ic" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5.5A1.5 1.5 0 015.5 4H11v16H5.5A1.5 1.5 0 014 18.5v-13zM20 5.5A1.5 1.5 0 0018.5 4H13v16h5.5a1.5 1.5 0 001.5-1.5v-13z" stroke-linejoin="round"/></svg>
      </span>
      <div>
        <div class="gs-godeeper__eyebrow">Go deeper · technical reference</div>
        <div class="gs-godeeper__sub">The technical documentation covers the how-to in detail.</div>
      </div>
    </div>
    <div class="gs-godeeper__links">
      <a
        v-for="l in links"
        :key="l.slug"
        :href="`/application-guide/flowfuse/${l.slug}/`"
        class="gs-godeeper__link"
        @click="capture('gs-docs', { section: l.slug })"
      >{{ l.title }} <span aria-hidden="true">&rarr;</span></a>
    </div>
  </div>
</template>

<style scoped>
.gs-godeeper { margin-top: 1.75rem; padding: 1.15rem 1.3rem; border-radius: .9rem; background: linear-gradient(105deg, #eef2ff, #f7f8ff 75%); border: 1px solid #e0e4ff; }
.gs-godeeper__head { display: flex; align-items: center; gap: .8rem; }
.gs-godeeper__ic { flex: none; display: grid; place-items: center; width: 2.2rem; height: 2.2rem; border-radius: .6rem; background: #fff; color: #4f46e5; border: 1px solid #e0e4ff; }
.gs-godeeper__ic svg { width: 1.2rem; height: 1.2rem; }
.gs-godeeper__eyebrow { font-size: .66rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #6366f1; }
.gs-godeeper__sub { font-size: .85rem; color: #64748b; margin-top: .1rem; }
.gs-godeeper__links { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .9rem; }
.gs-godeeper__link { display: inline-flex; align-items: center; gap: .3rem; font-size: .82rem; font-weight: 600; color: #4338ca; background: #fff; border: 1px solid #dfe3f3; border-radius: 9999px; padding: .4rem .8rem; text-decoration: none; transition: border-color .15s ease, background .15s ease; }
.gs-godeeper__link:hover { border-color: #a5b4fc; background: #f5f7ff; text-decoration: none; }
</style>
