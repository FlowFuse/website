<script setup lang="ts">
const props = defineProps<{
    tag?: string | null
    page: number
}>()

const { entries, totalPages } = useBlogList(props.tag ?? null, props.page)

const featured = computed(() => props.page === 1 ? entries.value[0] : null)
const featuredPath = computed(() => featured.value ? withTrailingSlash(featured.value.path) : '')
const rest = computed(() => props.page === 1 ? entries.value.slice(1) : entries.value)
const basePath = computed(() => props.tag ? `/blog/${props.tag}` : '/blog')

const featuredAuthorNames = computed(() => useAuthorNames(featured.value?.authors))
const featuredSummary = computed(() => featured.value?.description || featured.value?.meta?.description || '')
const featuredImage = computed(() => featured.value?.image || '/images/og-blog.jpg')
const featuredDate = computed(() => featured.value ? new Date(featured.value.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '')
</script>

<template>
  <div class="ff-blog container m-auto text-left max-w-4xl pt-8 pb-24 w-full">
    <div class="px-2 flex items-center gap-12">
      <h1 class="mb-0">Blog</h1>
    </div>
    <div class="w-full px-2 my-4 grid">
      <AlgoliaSearch index-filter="category:blog" placeholder="Search the blog" source-id="blog" />
    </div>
    <BlogTagNav :active-tag="tag" />
    <ul class="flex flex-wrap">
      <li v-if="featured" class="w-full mt-2 px-2 pb-4">
        <NuxtLink :to="featuredPath" class="w-full flex flex-col group hover:no-underline">
          <div class="md:w-3/4 pr-2">
            <time class="block text-xs text-gray-500">{{ featuredDate }}</time>
            <h2 class="mb-0 text-xl font-medium group-hover:underline">{{ featured.title }}</h2>
            <div class="italic text-xs mb-3">
              <div class="author">{{ featuredAuthorNames }}</div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="ff-blog-tile pr-2 md:w-1/3">
              <div class="w-full h-auto">
                <img :src="featuredImage" :alt="`Image representing ${featured.title}`" width="285" class="w-full h-auto">
              </div>
            </div>
            <div class="flex flex-col justify-between md:w-2/3 md:px-2">
              <div class="text-sm prose prose-blue md:prose-md py-1">
                <p v-if="featuredSummary">{{ featuredSummary }}</p>
              </div>
              <div class="group-hover:underline">read more...</div>
            </div>
          </div>
        </NuxtLink>
      </li>
      <li v-if="featured" class="w-full px-2 mt-2 mb-6">
        <a id="sign-up"></a>
        <div class="border-y border-gray-200 py-8">
          <FooterNewsletter reference="blog" layout="row" title="Sign up for our monthly email updates:" />
        </div>
      </li>
      <BlogListItem v-for="entry in rest" :key="entry.path" :entry="entry" />
    </ul>
    <Pagination :base-path="basePath" :page="page" :total-pages="totalPages" />
  </div>
</template>
