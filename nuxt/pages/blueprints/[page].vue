<script setup lang="ts">
// Pages 2 and up of the Blueprint Library listing. Page 1 is pages/blueprints/index.vue.
//
// Only a number matches: /blueprints/<anything-else>/ is a 404, as it was under 11ty,
// which generated no page for a category on its own. The blueprint detail pages sit one
// level deeper, in pages/blueprints/[category]/[slug].vue.
import { BLUEPRINTS_DESCRIPTION, BLUEPRINTS_META_TITLE } from '../../composables/useBlueprintList'

const route = useRoute()
const page = computed(() => Number(route.params.page))

if (!/^\d+$/.test(String(route.params.page))) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
    title: BLUEPRINTS_META_TITLE,
    description: BLUEPRINTS_DESCRIPTION,
})
</script>

<template>
  <BlueprintListing :page="page" />
</template>
