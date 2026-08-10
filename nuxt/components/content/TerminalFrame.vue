<template>
    <div class="ff-terminal-frame ff-terminal-frame--prose" :style="`max-width: ${width}px`">
        <div class="ff-terminal-frame__bar">
            <span class="ff-terminal-frame__dot ff-terminal-frame__dot--close" />
            <span class="ff-terminal-frame__dot ff-terminal-frame__dot--minimise" />
            <span class="ff-terminal-frame__dot ff-terminal-frame__dot--expand" />
        </div>
        <div class="ff-terminal-frame__screen">
            <img :src="src" :alt="alt" loading="lazy">
        </div>
    </div>
</template>

<script setup lang="ts">
/*
    MDC counterpart of the `terminalFrame` 11ty shortcode. Blog and changelog posts
    render through @nuxt/content, which does not process Nunjucks, so a shortcode
    used there ships as literal text. Both renderers link the same compiled
    /css/style.css, so .ff-terminal-frame gives identical chrome either way.

    A plain <img> rather than <NuxtImg>: the image CDN re-encodes what it is given
    and would drop the animation from a recording stored as a GIF. `src` is an
    absolute site path, because the remark plugin that rewrites post-relative image
    paths only sees markdown images, not component props.
*/
withDefaults(defineProps<{
    src: string
    alt?: string
    width?: number
}>(), {
    alt: '',
    width: 1000,
})
</script>
