<template>
    <NuxtImg :src="src" :alt="alt" :title="title" />
</template>

<script setup lang="ts">
defineProps<{
    src?: string
    alt?: string
    title?: string
}>()
</script>
