<script setup lang="ts">
const route = useRoute()

const slugParts = computed(() =>
    Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug].filter(Boolean)
)

const items = computed(() => {
    const parts = ['handbook', ...slugParts.value]
    let path = ''
    return parts.map((part, i) => {
        path += '/' + part
        const isLast = i === parts.length - 1
        return {
            label: part.replace(/-/g, ' '),
            ...(isLast ? {} : { to: path }),
        }
    })
})
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
