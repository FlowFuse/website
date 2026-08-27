<script setup lang="ts">
// Shared by docs, handbook to render the visual breadcrumb and registers the
// matching schema.org BreadcrumbList in one place, so a page are up to date.
interface BreadcrumbItem {
    label: string
    to?: string
}

const props = defineProps<{ items: BreadcrumbItem[] }>()

useSchemaOrg([
    defineBreadcrumb({
        itemListElement: props.items.map(item => ({
            name: item.label,
            ...(item.to ? { item: item.to } : {}),
        })),
    }),
])

// The indigo hover only makes sense on crumbs that actually navigate — a plain span
// (no `to`, e.g. the current page or a non-navigable group label) getting the same
// hover color as a real link falsely signals it's clickable.
const items = computed(() => props.items.map(item => ({
    ...item,
    ui: item.to ? { link: 'hover:text-indigo-600' } : undefined,
})))
</script>

<template>
  <UBreadcrumb
    :items="items"
    color="neutral"
    class="capitalize"
    :ui="{ link: 'text-sm' }"
  >
    <template #separator>
      <span class="mx-1 text-gray-400">/</span>
    </template>
  </UBreadcrumb>
</template>
