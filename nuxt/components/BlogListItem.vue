<script setup lang="ts">
const props = defineProps<{
    entry: { path: string, title: string, description?: string, meta?: { description?: string }, date: string | Date, authors?: string[], image?: string }
}>()

const team = useTeam()
const authorNames = computed(() => (props.entry.authors || []).map(username => team[username]?.name).filter(Boolean).join(', '))
const summary = computed(() => props.entry.description || props.entry.meta?.description || '')
const formattedDate = computed(() => new Date(props.entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }))
const imageSrc = computed(() => props.entry.image || '/images/og-blog.jpg')
</script>

<template>
  <li class="w-full md:w-1/3 my-2 px-2 pb-6 border-b">
    <NuxtLink :to="entry.path" class="w-full flex flex-col group hover:no-underline">
      <time class="block text-xs mb-2 text-gray-500">{{ formattedDate }}</time>
      <div class="ff-blog-tile">
        <div class="w-full h-auto">
          <img :src="imageSrc" :alt="`Image representing ${entry.title}`" loading="lazy" class="w-full h-auto" width="285">
        </div>
      </div>
      <h2 class="mt-1 mb-0 text-xl font-medium group-hover:underline">{{ entry.title }}</h2>
      <div class="text-sm prose prose-blue md:prose-md py-1">
        <p v-if="summary">{{ summary }}</p>
      </div>
      <div class="italic text-xs mb-3">
        <div class="author">{{ authorNames }}</div>
      </div>
    </NuxtLink>
  </li>
</template>
