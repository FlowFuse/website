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
        ...(index === 0 && props.items.length > 1 ? { item: 'shrink-0' } : {}),
    },
})))
</script>

<template>
  <!-- No `capitalize`: every crumb is an authored page title, so capitalising each word only
       mangles them, the same way it did in the sidebar. -->
  <UBreadcrumb
    :items="displayItems"
    color="neutral"
    :ui="{ link: 'text-sm' }"
  >
    <template #separator>
      <span class="mx-1 text-gray-400">/</span>
    </template>
  </UBreadcrumb>
</template>
