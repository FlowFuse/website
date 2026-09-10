<script setup lang="ts">
// src/blueprints.njk plus src/_includes/blueprints/template.njk and the
// layouts/catalog.njk hero it extended: the paginated Blueprint Library grid.
//
// Shared by pages/blueprints/index.vue and pages/blueprints/[page].vue, the way
// <BlogListing> is shared by the blog's listing routes.
import { BLUEPRINTS_DESCRIPTION, BLUEPRINTS_TITLE } from '../composables/useBlueprintList'

const props = defineProps<{ page: number }>()

const { entries, totalPages } = useBlueprintList(() => props.page)
</script>

<template>
  <div class="w-full px-6 page hero catalog-hero">
    <div class="container m-auto text-center flex py-8 max-w-lg md:max-w-6xl">
      <div class="text-left w-full">
        <h1>{{ BLUEPRINTS_TITLE }}</h1>
        <p class="md:w-9/12">{{ BLUEPRINTS_DESCRIPTION }}</p>
        <div class="flex gap-2 mt-8">
          <NuxtLink to="/blueprints/submit/" class="ff-btn ff-btn--primary flex-col uppercase">Submit Your Own</NuxtLink>
        </div>
      </div>
    </div>
    <div>
      <div class="container m-auto text-left max-w-lg md:max-w-6xl pt-8 pb-12 w-full ff-full-bg gap-4">
        <ul class="flex flex-col sm:grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 pb-10 border-b">
          <BlueprintCard v-for="entry in entries" :key="entry.path" :entry="entry" />
        </ul>
        <Pagination base-path="/blueprints" :page="page" :total-pages="totalPages" />
        <ContactUsCtaLine />
      </div>
    </div>
  </div>
</template>
