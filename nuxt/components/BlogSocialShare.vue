<script setup lang="ts">
import LinkedinIcon from './icons/LinkedinIcon.vue'
import FacebookIcon from './icons/FacebookIcon.vue'
import RedditIcon from './icons/RedditIcon.vue'

const props = defineProps<{
    title: string
    path: string
}>()

const url = computed(() => `https://flowfuse.com${props.path}`)

const links = computed(() => [
    { label: 'LinkedIn', icon: LinkedinIcon, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url.value)}&title=${encodeURIComponent(props.title)}` },
    { label: 'Facebook', icon: FacebookIcon, href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url.value)}` },
    { label: 'Reddit', icon: RedditIcon, href: `https://www.reddit.com/submit?url=${encodeURIComponent(url.value)}&title=${encodeURIComponent(props.title)}` },
    { label: 'Email', icon: null, href: `mailto:?subject=${encodeURIComponent(props.title)}&body=Check out this article: ${encodeURIComponent(url.value)}` },
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
          class="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
      >
        <component :is="link.icon" v-if="link.icon" class="w-5 h-5 flex-shrink-0" />
        <UIcon v-else name="i-lucide-mail" class="w-5 h-5 flex-shrink-0" />
        {{ link.label }}
      </a>
    </div>
  </div>
</template>
