<script setup lang="ts">
// Built on the shared industry-page template (components/industry-page/), same shape as
// automotive.vue and industrial-machinery.vue. Content lives in
// content/industries/aviation-aerospace.yml. Static route, so it takes precedence over the
// industriesLegacy [slug].vue entry for this same slug (see automotive.vue's own note).
const { data: page } = await useAsyncData('industry-page-aviation-aerospace', () =>
    queryCollection('industries').where('slug', '=', 'aviation-aerospace').first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Industry not found' })
}
</script>

<template>
  <IndustryPageTemplate v-if="page" :page="page" />
</template>
