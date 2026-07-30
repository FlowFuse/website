<script setup lang="ts">
const props = defineProps<{
    title: string
    path: string
}>()

const url = computed(() => `https://flowfuse.com${props.path}`)
const links = computed(() => [
    { label: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url.value)}&title=${encodeURIComponent(props.title)}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url.value)}` },
    { label: 'Reddit', href: `https://www.reddit.com/submit?url=${encodeURIComponent(url.value)}&title=${encodeURIComponent(props.title)}` },
    { label: 'Email', href: `mailto:?subject=${encodeURIComponent(props.title)}&body=Check out this article: ${encodeURIComponent(url.value)}` },
])
</script>

<template>
  <div class="social-share">
    <h3 class="mb-3">Share This</h3>
    <div class="flex flex-col gap-3">
      <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
      >{{ link.label }}</a>
    </div>
  </div>
</template>
