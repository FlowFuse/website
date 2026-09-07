<script setup lang="ts">
const props = defineProps<{
    entry: { path: string, title: string, description?: string, date: string | Date, authors?: string[] }
}>()

const authorNames = computed(() => useAuthorNames(props.entry.authors))

const plans = useChangelogPlans(() => props.entry.path)

const formattedDate = computed(() => new Date(props.entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }))
</script>

<template>
  <li class="w-full my-2 py-6 border-b flex flex-col md:flex-row md:gap-10">
    <div class="w-full flex flex-col flex-none md:w-72">
      <NuxtLink :to="entry.path" class="flex flex-col group hover:no-underline">
        <h2 class="mb-0 text-xl font-medium group-hover:underline">{{ entry.title }}</h2>
        <div v-if="authorNames" class="italic text-xs">
          <div class="author">{{ authorNames }}</div>
        </div>
        <time class="block text-xs text-gray-500 mt-1 mb-3">{{ formattedDate }}</time>
      </NuxtLink>
      <FeatureTierBadges :plans="plans" />
    </div>
    <!-- pt-4 only while the columns are stacked; side by side the description should
         start on the same line as the title, not below it. -->
    <div class="flex-grow pt-4 md:pt-0">
      <div class="prose">
        <p class="mt-0">{{ entry.description }}</p>
      </div>
    </div>
  </li>
</template>
