<script setup lang="ts">
// Columns of <ResourceList> cards under an optional heading each: UNS's "Learn about UNS"
// reading list, IT/OT's case studies and whitepapers. Thumbnails point at the sections
// that own them (/blog/**, /whitepaper/**, /images/stories/**).

defineProps<{
    block: {
        heading?: string
        columns: Array<{
            heading?: string
            id?: string
            items: Array<{ title: string, lead?: string, href: string, image: string, alt: string }>
        }>
    }
}>()
</script>

<template>
  <section class="w-full px-6 pt-16 pb-20">
    <div class="container m-auto max-w-5xl">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h2 v-if="block.heading" class="text-center mb-8" v-html="block.heading" />
      <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 items-start">
        <div v-for="(column, c) in block.columns" :key="c" class="pb-4 md:pb-0">
          <h4 v-if="column.heading" :id="column.id" class="text-center max-md:pt-8 scroll-mt-24">{{ column.heading }}</h4>
          <ResourceList :items="column.items" :columns="1" class="pt-4" />
        </div>
      </div>
    </div>
  </section>
</template>
