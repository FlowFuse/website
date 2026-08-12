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
</script>

<template>
  <UBreadcrumb
    :items="items"
    color="neutral"
    class="capitalize"
    :ui="{ link: 'text-sm hover:text-indigo-600' }"
  >
    <template #separator>
      <span class="mx-1 text-gray-400">/</span>
    </template>
  </UBreadcrumb>
</template>
