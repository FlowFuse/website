<script setup lang="ts">
const props = defineProps<{
    authors: string[]
    authorsLookup?: Record<string, any>
    date: string
    lastUpdated?: string
    readingMinutes: number
}>()

const resolvedAuthors = computed(() =>
    props.authors
        .map(key => props.authorsLookup?.[key])
        .filter(Boolean)
)

const displayDate = computed(() => new Date(props.lastUpdated || props.date))
const dateLabel = computed(() => props.lastUpdated ? 'Updated ' : '')
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 mt-4">
    <template v-for="(author, index) in resolvedAuthors" :key="author.name">
      <span v-if="index > 0">,</span>
      <span class="font-medium text-gray-700">{{ author.name }}</span>
      <span v-if="author.title" class="text-gray-400">, {{ author.title }}</span>
    </template>
    <span v-if="resolvedAuthors.length === 0" class="font-medium text-gray-700">FlowFuse</span>
    <span class="text-gray-400">•</span>
    <time :datetime="displayDate.toISOString()">{{ dateLabel }}{{ displayDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
    <span class="text-gray-400">•</span>
    <span>{{ readingMinutes }} min read</span>
  </div>
</template>
