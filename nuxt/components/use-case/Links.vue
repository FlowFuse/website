<script setup lang="ts">
// components/use-case-links.njk: cross-link cards whose copy is read from each use-case's
// own definition, so a title or problem line is written once. The .njk looped the whole
// collection per slug to preserve the caller's order; a lookup does the same thing here.
const props = defineProps<{ slugs: string[] }>()

const { data: all } = await useAsyncData('use-case-links', () =>
    queryCollection('useCases').select('slug', 'title', 'problem').all()
)

const cards = computed(() => {
    const bySlug = new Map((all.value || []).map(uc => [uc.slug, uc]))
    return props.slugs.map(slug => bySlug.get(slug)).filter(Boolean)
})
</script>

<template>
  <div v-if="cards.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
    <UseCaseCard
        v-for="card in cards"
        :key="card.slug"
        :to="`/use-cases/${card.slug}/`"
        :title="card.title"
        :problem="card.problem"
    />
  </div>
</template>
