<script setup lang="ts">
// Proof cards — real customer stories, linked out to the full write-up.
const props = defineProps<{ items: { slug: string; name: string; note: string; image: string }[] }>()
const capture = useCapture()
</script>

<template>
  <div class="hiw-stories">
    <div class="hiw-stories__eyebrow">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 17l-5.3 2.9 1-5.8-4.2-4.1 5.9-.9L12 3z" stroke-linejoin="round"/></svg>
      Proof it works — in production today
    </div>
    <div class="hiw-stories__grid">
      <a
        v-for="s in items"
        :key="s.slug"
        :href="`/customer-stories/${s.slug}/`"
        class="hiw-story"
        @click="capture('hiw-story', { story: s.slug })"
      >
        <span class="hiw-story__thumb" :style="{ backgroundImage: `url(${s.image})` }" aria-hidden="true"></span>
        <span class="hiw-story__body">
          <span class="hiw-story__name">{{ s.name }}</span>
          <span class="hiw-story__note">{{ s.note }}</span>
          <span class="hiw-story__cta">Read the story <span aria-hidden="true">&rarr;</span></span>
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.hiw-stories { margin-top: 1.75rem; }
.hiw-stories__eyebrow { display: inline-flex; align-items: center; gap: .45rem; font-size: .68rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #b45309; margin-bottom: .9rem; }
.hiw-stories__eyebrow svg { width: 1rem; height: 1rem; color: #f59e0b; }
.hiw-stories__grid { display: grid; gap: .8rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.hiw-story { display: flex; align-items: center; gap: .9rem; padding: .85rem; border-radius: .9rem; background: linear-gradient(180deg, #fff, #fdfdff); border: 1px solid #e9ebf3; box-shadow: 0 2px 8px rgba(2,6,13,0.05); text-decoration: none; transition: transform .14s ease, box-shadow .18s ease, border-color .18s ease; }
.hiw-story:hover { transform: translateY(-2px); box-shadow: 0 12px 26px rgba(2,6,13,0.10); border-color: #d9deee; text-decoration: none; }
.hiw-story__thumb { flex: none; width: 60px; height: 60px; border-radius: .7rem; background-size: cover; background-position: center; background-color: #eef1f8; box-shadow: inset 0 0 0 1px rgba(2,6,13,0.06); }
.hiw-story__body { display: flex; flex-direction: column; gap: .12rem; min-width: 0; }
.hiw-story__name { font-size: .92rem; font-weight: 700; color: #0f172a; letter-spacing: -0.01em; }
.hiw-story__note { font-size: .8rem; color: #64748b; line-height: 1.35; }
.hiw-story__cta { font-size: .76rem; font-weight: 700; color: #4338ca; margin-top: .3rem; }
.hiw-story:hover .hiw-story__cta { color: #4f46e5; }
</style>
