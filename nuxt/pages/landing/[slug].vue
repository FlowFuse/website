<script setup lang="ts">
// Routes the /landing/ pages that were pure 11ty frontmatter. Two layouts shared that
// shape - layouts/abm-landing.njk and layouts/landing-comparison.njk - so the collection
// carries a `kind` and this picks the matching component.
//
// /landing/plc/, /landing/tulip/ and /landing/factory-efficiency/ had real markup bodies
// and are their own .vue files; Nuxt matches those static routes ahead of this one.
const route = useRoute()
const slug = String(route.params.slug)

const { data: page } = await useAsyncData(`landing-${slug}`, () =>
    queryCollection('landingPages').where('slug', '=', slug).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
    title: computed(() => page.value?.seoMeta.title),
    description: computed(() => page.value?.seoMeta.description || ''),
    ogDescription: computed(() => page.value?.seoMeta.description || ''),
    ogUrl: computed(() => `https://flowfuse.com/landing/${slug}/`),
    twitterSite: '@FlowFuseinc',
})

// The gated briefs are campaign pages. `skipIndex` kept them out of 11ty's sitemap;
// this keeps them out of search results, which is what that was for.
useHead({
    meta: computed(() => page.value?.skipIndex ? [{ name: 'robots', content: 'noindex' }] : []),
})
</script>

<template>
  <div v-if="page" class="w-full page hero">
    <div class="content">
      <LandingAbm v-if="page.kind === 'abm'" :page="page" />
      <LandingComparison v-else :page="page" />
    </div>
  </div>
</template>
