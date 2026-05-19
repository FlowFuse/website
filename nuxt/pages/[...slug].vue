<script setup>
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const { data: page } = await useAsyncData(`content-${slug}`, () =>
    queryCollection('pages').path(`/${slug}`).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead({
    title: `${page.value.title} • FlowFuse`,
    meta: [{ name: 'robots', content: 'noindex' }]
})
</script>

<template>
  <div class="nohero w-full">
    <div class="w-full page hero">
      <div class="content">
        <div class="prose prose-blue container pt-12 m-auto max-w-4xl">
          <ContentRenderer :value="page" />
        </div>
      </div>
    </div>
  </div>
</template>
