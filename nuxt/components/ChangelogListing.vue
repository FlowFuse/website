<script setup lang="ts">
const props = defineProps<{
    page: number
}>()

const { entries, totalPages } = useChangelogList(props.page)

useSeoMeta({
    title: 'Changelog',
    ogTitle: 'Changelog',
})
</script>

<template>
  <div class="ff-blog container m-auto text-left max-w-4xl pt-8 pb-24 w-full px-6">
    <div class="w-full sm:flex justify-between">
      <h1 class="mb-0">Changelog</h1>
      <div class="flex flex-row max-sm:mt-4 justify-between sm:justify-end gap-4 items-end">
        <p class="my-0">Getting all the news on new features we ship</p>
        <a href="/changelog/index.xml" class="mb-2 hover:text-blue-800 hover:cursor-pointer" title="View the changelog RSS feed">
          <UIcon name="i-heroicons-rss" class="w-5 h-5" />
        </a>
      </div>
    </div>
    <ul class="flex flex-wrap border-t">
      <ChangelogListItem v-for="entry in entries" :key="entry.path" :entry="entry" />
    </ul>
    <ChangelogPagination :page="page" :total-pages="totalPages" />
  </div>
</template>
