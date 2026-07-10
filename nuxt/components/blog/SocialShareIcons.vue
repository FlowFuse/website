<script setup lang="ts">
const props = defineProps<{
    title: string
    path: string
}>()

const url = computed(() => `https://flowfuse.com${props.path}`)
</script>

<template>
  <div class="social-share">
    <h3 class="mb-3">
      Share This
    </h3>
    <div class="flex flex-col gap-3">
      <a
        :href="`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`"
        target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
      >
        <span class="flex-shrink-0 w-5"><IconLinkedin class="h-5" /></span>
        <span class="text-sm font-medium">LinkedIn</span>
      </a>
      <a
        :href="`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`"
        target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
      >
        <span class="flex-shrink-0 w-5"><IconFacebook class="h-5" /></span>
        <span class="text-sm font-medium">Facebook</span>
      </a>
      <a
        :href="`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`"
        target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
      >
        <span class="flex-shrink-0 w-5"><IconReddit class="h-5" /></span>
        <span class="text-sm font-medium">Reddit</span>
      </a>
      <a
        :href="`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this article: ' + url)}`"
        class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors"
      >
        <span class="flex-shrink-0 w-5 flex items-center justify-center"><IconMail class="h-5 w-5" /></span>
        <span class="text-sm font-medium">Email</span>
      </a>
    </div>
  </div>
</template>
