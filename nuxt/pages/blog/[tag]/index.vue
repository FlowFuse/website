<script setup lang="ts">
import { blogTags } from '~/utils/blogTags'
import { POSTS_PER_PAGE, useBlogPosts } from '~/composables/useBlogPosts'

const route = useRoute()
const tag = computed(() => route.params.tag as string)
const tagInfo = computed(() => blogTags.find(t => t.value === tag.value))

if (!tagInfo.value) {
    throw createError({ statusCode: 404, statusMessage: 'Blog tag not found' })
}

const page = computed(() => Math.max(1, parseInt(route.query.page as string) || 1))

const { data: allPosts } = await useBlogPosts()
const { data: authors } = await useBlogAuthors()

const posts = computed(() => (allPosts.value ?? []).filter(post => (post.tags ?? []).includes(tag.value)))
const pageCount = computed(() => Math.max(1, Math.ceil(posts.value.length / POSTS_PER_PAGE)))
const pagedPosts = computed(() => {
    const start = (page.value - 1) * POSTS_PER_PAGE
    return posts.value.slice(start, start + POSTS_PER_PAGE)
})

useSeoMeta({
    title: `${tagInfo.value.label} • Blog • FlowFuse`,
    description: `News, tutorials, and updates from the FlowFuse team tagged ${tagInfo.value.label}.`,
})
</script>

<template>
  <div class="ff-blog container m-auto text-left max-w-4xl pt-8 pb-24 w-full">
    <div class="px-2 flex items-center gap-12">
      <h1 class="mb-0">
        Blog
      </h1>
    </div>

    <BlogTagFilter :active-tag="tag" />

    <ul class="flex flex-wrap">
      <li v-for="post in pagedPosts" :key="post.path" class="w-full md:w-1/3 my-2 px-2 pb-6 border-b">
        <BlogPostCard :post="post" :authors="authors" />
      </li>
    </ul>

    <UPagination
      v-if="pageCount > 1"
      :page="page"
      :total="posts.length"
      :items-per-page="POSTS_PER_PAGE"
      class="mt-4 justify-center"
      @update:page="(p) => navigateTo({ query: { page: p === 1 ? undefined : p } })"
    />
  </div>
</template>
