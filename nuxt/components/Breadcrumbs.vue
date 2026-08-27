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

const displayItems = computed(() => props.items.map((item, index) => ({
    ...item,
    ui: {
        ...(item.to ? { link: 'hover:text-indigo-600' } : {}),
        ...(index < props.items.length - 1 ? { item: 'shrink-0' } : {}),
    },
})))
</script>

<template>
  <UBreadcrumb
    :items="displayItems"
    color="neutral"
    class="capitalize"
    :ui="{ link: 'text-sm' }"
  >
    <template #separator>
      <span class="mx-1 text-gray-400">/</span>
    </template>
  </UBreadcrumb>
</template>
