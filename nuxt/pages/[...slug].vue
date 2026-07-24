<script setup>
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const { data: page } = await useAsyncData(`content-${slug}`, () =>
    queryCollection('pages').path(`/${slug}`).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

// robots: false is applied via routeRules in nuxt.config.ts, not here — @nuxtjs/robots
// computes its own X-Robots-Tag/meta before this component ever runs, so a manual
// `useHead` robots meta tag here would only race against it, not control it.
useHead({
    title: `${page.value.title} • FlowFuse`
})
</script>

<template>
  <div class="nohero w-full">
    <div class="w-full page hero">
      <div class="content max-w-4xl m-auto">
        <div class="prose prose-blue container pt-12 px-6 pb-24">
          <ContentRenderer :value="page" />
        </div>
      </div>
    </div>
  </div>
</template>
