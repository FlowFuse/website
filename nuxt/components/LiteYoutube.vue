<script setup lang="ts">
const props = defineProps<{
    videoid: string
    title: string
}>()

// Register stylesheet and script via useHead so they're present in the initial SSR HTML.
// This ensures the lite-youtube-embed layout/poster CSS is applied before hydration,
// preventing layout shift on pages like /platform/why-flowfuse.
useHead({
    link: [{
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.2.0/src/lite-yt-embed.min.css',
        crossorigin: 'anonymous',
        referrerpolicy: 'no-referrer',
    }],
    script: [{
        src: 'https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.2.0/src/lite-yt-embed.min.js',
        async: true,
    }],
})
</script>

<template>
  <lite-youtube :videoid="videoid" params="rel=0" style="width: 100%; height: 480px;" :title="`${title} - YouTube video`" />
</template>
