<script setup lang="ts">
const props = defineProps<{
    tag?: string | null
    page: number
}>()

const { entries, totalPages } = useBlogList(props.tag ?? null, props.page)
const team = useTeam()

const featured = computed(() => props.page === 1 ? entries.value[0] : null)
const rest = computed(() => props.page === 1 ? entries.value.slice(1) : entries.value)
const basePath = computed(() => props.tag ? `/blog/${props.tag}` : '/blog')

const featuredAuthorNames = computed(() => (featured.value?.authors || []).map(username => team[username]?.name).filter(Boolean).join(', '))
const featuredSummary = computed(() => featured.value?.description || featured.value?.meta?.description || '')
const featuredImage = computed(() => featured.value?.image || '/images/og-blog.jpg')
const featuredDate = computed(() => featured.value ? new Date(featured.value.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '')

const pageTitle = computed(() => props.tag ? 'Blog' : 'Blog')
useSeoMeta({
    title: pageTitle,
    ogTitle: pageTitle,
})
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
        <NuxtLink :to="featured.path" class="w-full flex flex-col group hover:no-underline">
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
      <li v-if="featured" class="w-full px-2 pt-2 pb-2 mb-2 flex flex-col border-t-2 border-b-2">
        <a id="sign-up"></a>
        <h3 class="mb-0 text-lg font-semibold">Sign up for our monthly email updates:</h3>
        <HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" cta="cta-blog-subscribe" reference="blog" />
      </li>
      <BlogListItem v-for="entry in rest" :key="entry.path" :entry="entry" />
    </ul>
    <BlogPagination :base-path="basePath" :page="page" :total-pages="totalPages" />
  </div>
</template>
