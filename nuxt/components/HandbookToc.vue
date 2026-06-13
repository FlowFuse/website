<script setup lang="ts">
interface TocLink {
    id: string
    text: string
    depth: number
    children?: TocLink[]
}

defineProps<{
    links?: TocLink[]
}>()
</script>

<template>
  <UContentToc v-if="links?.length" highlight highlight-color="primary" :links="links" />
</template>
