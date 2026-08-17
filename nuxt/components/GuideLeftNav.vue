<script setup lang="ts">
// Left nav for the Application Guide, styled to match DocsLeftNav (.handbook-nav).
// Groups are the two guides (FlowFuse / Node-RED); items come from the guide pages.
const route = useRoute()
const { data: pages } = await useApplicationGuidePages()

const groups = computed(() => GUIDES.map(guide => ({
    ...guide,
    pages: pagesForGuide(pages.value, guide.id),
})))

const norm = (p: string) => (p.endsWith('/') ? p.slice(0, -1) : p)
const isActive = (p: string) => norm(route.path) === norm(p)
</script>

<template>
  <div class="lg:pt-2 text-sm" data-el="application-guide-nav">
    <ul class="handbook-nav">
      <li :class="{ active: norm(route.path) === '/application-guide' }">
        <NuxtLink href="/application-guide/">Application Guide</NuxtLink>
      </li>
      <template v-for="group in groups" :key="group.id">
        <li class="handbook-nav-group">{{ group.title }}</li>
        <li
          v-for="page in group.pages"
          :key="page.path"
          :class="{ active: isActive(page.path) }"
        >
          <NuxtLink :href="page.path">{{ page.title }}</NuxtLink>
        </li>
      </template>
    </ul>
  </div>
</template>
