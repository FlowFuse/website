<script setup lang="ts">
import blogTags from '../../src/_data/blogTags.json'

defineProps<{
    activeTag?: string | null
}>()
</script>

<template>
  <div class="px-2 my-4 flex flex-wrap flex-row gap-4">
    <a
        v-for="tag in blogTags"
        :key="tag.value"
        class="hover:no-underline"
        :href="tag.value === 'posts' ? '/blog/' : `/blog/${tag.value}/`"
    >
      <button
          class="w-full ff-btn ff-btn--primary"
          :class="{ 'ff-btn--primary-outlined': tag.value === 'posts' ? !!activeTag : activeTag !== tag.value }"
      >{{ tag.label }}</button>
    </a>
  </div>
</template>
