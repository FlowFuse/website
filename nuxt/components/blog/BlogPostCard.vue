<script setup lang="ts">
const props = defineProps<{
    post: any
    featured?: boolean
    authors?: Record<string, any>
}>()

const authorNames = computed(() =>
    (props.post.authors ?? [])
        .map((key: string) => props.authors?.[key]?.name)
        .filter(Boolean)
        .join(', ')
)

const summary = computed(() => props.post.description ?? '')
</script>

<template>
  <NuxtLink :to="post.path" class="w-full flex flex-col group hover:no-underline">
    <div class="ff-blog-tile w-full h-auto">
      <img
        :src="post.image || '/images/og-blog.jpg'"
        :alt="post.title"
        class="w-full h-auto rounded-lg"
        loading="lazy"
      >
    </div>
    <time class="text-xs text-gray-500 mt-3" :datetime="post.date">{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
    <h3 class="mb-0 mt-1" :class="featured ? 'text-2xl' : 'text-lg font-semibold'">{{ post.title }}</h3>
    <div v-if="featured && summary" class="text-sm prose prose-blue md:prose-md py-1">
      {{ summary }}
    </div>
    <div v-if="authorNames" class="text-sm text-gray-500 mt-1">{{ authorNames }}</div>
  </NuxtLink>
</template>
