<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const pageNumber = computed(() => {
    const n = Number(route.params.page)
    return Number.isInteger(n) && n > 0 ? n : 1
})

if (!/^\d+$/.test(String(route.params.page))) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>

<template>
  <ChangelogListing :page="pageNumber" />
</template>
