<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const { data: pages } = await useBestPracticePages()

const groups = computed(() => GUIDES.map(guide => ({
    ...guide,
    items: pagesForGuide(pages.value, guide.id).map((page): NavigationMenuItem => ({
        label: page.title,
        to: page.path,
        active: route.path === page.path,
    })),
})))
</script>

<template>
  <nav class="lg:pt-2" aria-label="Best Practice">
    <NuxtLink to="/bestpractice/" class="mb-5 inline-block text-sm font-medium">
      All Best Practice guides
    </NuxtLink>
    <div v-for="group in groups" :key="group.id" class="mb-6">
      <p class="m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        {{ group.title }}
      </p>
      <UNavigationMenu
        :items="group.items"
        orientation="vertical"
        color="neutral"
        highlight
      />
    </div>
  </nav>
</template>
