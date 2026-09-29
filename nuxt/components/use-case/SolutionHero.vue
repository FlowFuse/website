<script setup lang="ts">
// The hero from layouts/solution.njk, which the three architecture pages using that
// layout share. `description` was written as an HTML fragment in frontmatter and rendered
// with `| safe`; it is markup in the calling page's template now, passed through the
// default slot, so no page interpolates raw HTML.
defineProps<{
    title: string
    subtitle?: string
    heroImg: string
    heroImgAlt?: string
}>()
</script>

<template>
  <div class="page w-full px-6 mt-12 md:px-0">
    <div class="hero container m-auto text-center max-w-screen-md">
      <div>
        <h1 class="px-12 md:px-0 m-auto">{{ title }}</h1>
        <h4 v-if="subtitle" class="mt-4 text-indigo-400">{{ subtitle }}</h4>
      </div>
      <div class="flex items-center gap-6 mt-6">
        <div class="hidden sm:block w-64 flex-shrink-0">
          <img :src="heroImg" :alt="heroImgAlt || 'Hero image for the respective solution'" width="250" class="w-full h-auto">
        </div>
        <div class="flex flex-col justify-center text-center sm:text-left py-2">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
