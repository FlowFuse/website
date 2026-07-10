<script setup lang="ts">
import { blogTags } from '~/utils/blogTags'

const props = defineProps<{
    activeTag?: string
}>()
</script>

<template>
  <div class="px-2 my-4 flex flex-wrap flex-row gap-4">
    <NuxtLink
      v-for="tag in blogTags"
      :key="tag.value"
      :to="tag.value === 'posts' ? '/blog/' : `/blog/${tag.value}/`"
      class="hover:no-underline"
    >
      <button
        type="button"
        class="w-full ff-btn"
        :class="props.activeTag === tag.value ? 'ff-btn--primary' : 'ff-btn--primary-outlined'"
      >
        {{ tag.label }}
      </button>
    </NuxtLink>
  </div>
</template>
