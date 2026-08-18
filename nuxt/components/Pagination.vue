<script setup lang="ts">
const props = defineProps<{
    basePath: string
    page: number
    totalPages: number
}>()

const previousHref = computed(() => {
    if (props.page <= 1) return null
    return props.page === 2 ? `${props.basePath}/` : `${props.basePath}/${props.page - 1}/`
})
const nextHref = computed(() => props.page < props.totalPages ? `${props.basePath}/${props.page + 1}/` : null)
</script>

<template>
  <nav aria-label="Pagination" class="pagination mt-4">
    <ol class="flex flex-row w-full justify-between text-gray-600">
      <li class="flex md:flex-initial w-40 justify-start pl-2 ff-nav-blog-p" :style="!previousHref ? 'opacity: 0; pointer-events: none;' : ''">
        <NuxtLink v-if="previousHref" :to="previousHref">Previous</NuxtLink>
      </li>
      <li><span>{{ page }} of {{ totalPages }}</span></li>
      <li class="flex md:flex-initial w-40 justify-end pr-2 ff-nav-blog-n" :style="!nextHref ? 'opacity: 0; pointer-events: none;' : ''">
        <NuxtLink v-if="nextHref" :to="nextHref">Next</NuxtLink>
      </li>
    </ol>
  </nav>
</template>
