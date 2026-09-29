<script setup lang="ts">
// The first page built on the shared industry-page template (components/industry-page/).
// Content lives in content/industries/automotive.yml; this file is only resolution.
//
// Still its own static route rather than pages/industries/[slug].vue: Nuxt matches a
// static filename ahead of a dynamic segment, so this and every future page built on this
// template stay one file per industry rather than a second dynamic-route collection.
const { data: page } = await useAsyncData('industry-page-automotive', () =>
    queryCollection('industries').where('slug', '=', 'automotive').first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Industry not found' })
}
</script>

<template>
  <IndustryPageTemplate v-if="page" :page="page" />
</template>
