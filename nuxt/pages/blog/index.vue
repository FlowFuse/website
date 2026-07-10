<script setup lang="ts">
import { POSTS_PER_PAGE, useBlogPosts } from '~/composables/useBlogPosts'

const route = useRoute()
const page = computed(() => Math.max(1, parseInt(route.query.page as string) || 1))

const { data: allPosts } = await useBlogPosts()
const { data: authors } = await useBlogAuthors()

const posts = computed(() => allPosts.value ?? [])
const pageCount = computed(() => Math.max(1, Math.ceil(posts.value.length / POSTS_PER_PAGE)))
const pagedPosts = computed(() => {
    const start = (page.value - 1) * POSTS_PER_PAGE
    return posts.value.slice(start, start + POSTS_PER_PAGE)
})
const featuredPost = computed(() => page.value === 1 ? pagedPosts.value[0] : null)
const gridPosts = computed(() => featuredPost.value ? pagedPosts.value.slice(1) : pagedPosts.value)

useSeoMeta({
    title: 'Blog • FlowFuse',
    description: 'News, tutorials, and updates from the FlowFuse team on Node-RED, industrial IoT, and low-code application development.',
})
</script>

<template>
  <div class="ff-blog container m-auto text-left max-w-4xl pt-8 pb-24 w-full">
    <div class="px-2 flex items-center gap-12">
      <h1 class="mb-0">
        Blog
      </h1>
    </div>

    <BlogTagFilter active-tag="posts" />

    <ul class="flex flex-wrap">
      <li v-if="featuredPost" class="w-full mt-2 px-2 pb-4">
        <BlogPostCard :post="featuredPost" featured :authors="authors" />
      </li>
      <li v-if="featuredPost" class="w-full px-2 pt-2 pb-2 mb-2 flex flex-col border-t-2 border-b-2">
        <h3 class="mb-0 text-lg font-semibold">
          Sign up for our monthly email updates:
        </h3>
        <HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" cta="cta-blog-subscribe" reference="blog" />
      </li>
      <li v-for="post in gridPosts" :key="post.path" class="w-full md:w-1/3 my-2 px-2 pb-6 border-b">
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
