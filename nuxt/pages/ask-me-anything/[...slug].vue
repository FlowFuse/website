<script setup>
import indexData from '../../events.index.json'

const route = useRoute()
const slug = computed(() => {
    const s = route.params.slug
    return (Array.isArray(s) ? s : s ? [s] : []).filter(Boolean).join('/')
})

const events = indexData.events
const path = computed(() => `/ask-me-anything/${slug.value}`)
const meta = computed(() => events.find((e) => e.url.replace(/\/$/, '') === path.value) || {})

const { data: page } = await useAsyncData(
    () => `ama-${slug.value}`,
    () => queryCollection('ama').path(path.value).first()
)
if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead(() => ({
    title: `${meta.value.title} • FlowFuse`,
    meta: [{ name: 'description', content: meta.value.description || '' }],
}))
</script>

<template>
  <EventDetail :meta="meta" :page="page" />
</template>
