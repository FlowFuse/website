<script setup lang="ts">
const { data: page } = await useAsyncData('industry-page-energy-utilities', () =>
    queryCollection('industries').where('slug', '=', 'energy-utilities').first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Industry not found' })
}
</script>

<template>
  <IndustryPageTemplate v-if="page" :page="page" />
</template>
