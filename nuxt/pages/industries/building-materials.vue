<script setup lang="ts">
const { data: page } = await useAsyncData('industry-page-building-materials', () =>
    queryCollection('industries').where('slug', '=', 'building-materials').first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Industry not found' })
}
</script>

<template>
  <IndustryPageTemplate v-if="page" :page="page" />
</template>
