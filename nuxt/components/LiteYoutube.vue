<script setup lang="ts">
const props = defineProps<{
    videoid: string
    title: string
}>()

onMounted(() => {
    if (!document.querySelector('script[src*="lite-yt-embed"]')) {
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.2.0/src/lite-yt-embed.min.js'
        document.head.appendChild(script)
    }
    if (!document.querySelector('link[href*="lite-yt-embed"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.2.0/src/lite-yt-embed.min.css'
        link.crossOrigin = 'anonymous'
        link.referrerPolicy = 'no-referrer'
        document.head.appendChild(link)
    }
})
</script>

<template>
  <lite-youtube :videoid="videoid" params="rel=0" style="width: 100%; height: 480px;" :title="`${title} - YouTube video`" />
</template>
