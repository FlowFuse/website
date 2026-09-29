<script setup lang="ts">
// Second page built on the shared industry-page template (components/industry-page/),
// same shape as automotive.vue. Content lives in content/industries/industrial-machinery.yml.
const { data: page } = await useAsyncData('industry-page-industrial-machinery', () =>
    queryCollection('industries').where('slug', '=', 'industrial-machinery').first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Industry not found' })
}
</script>

<template>
  <IndustryPageTemplate v-if="page" :page="page" />
</template>
