<script setup lang="ts">
import { isFuturePost } from '../../../composables/useBlogList'

definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const author = computed(() => useTeamMember(slug.value))

if (!author.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const { data: posts } = await useAsyncData(
    () => `blog-author-${slug.value}`,
    async () => {
        const all = await queryCollection('blog')
            .select('path', 'title', 'date', 'authors', 'description', 'meta', 'image')
            .order('date', 'DESC')
            .all()
        return all.filter(entry => !isFuturePost(entry.date) && (entry.authors || []).includes(slug.value))
    }
)

// Only sumit-shinde carries `expertise` today; `knowsAbout` is the older key and
// stands in for it on anyone who has one but not the other.
const topics = computed(() => author.value?.expertise || author.value?.knowsAbout || [])

const pageTitle = computed(() => `${author.value?.name} - FlowFuse Blog`)
const pageDescription = computed(() => {
    const member = author.value
    if (!member) return ''
    return `Articles by ${member.name}${member.title ? `, ${member.title}` : ''} on the FlowFuse blog.`
})

useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogUrl: computed(() => `https://flowfuse.com${route.path}`),
    ogType: 'profile',
    twitterCard: 'summary',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    computed(() => author.value ? {
        '@type': 'ProfilePage',
        mainEntity: authorSchema(author.value),
    } : undefined),
])
</script>

<template>
  <div v-if="author" class="ff-blog container m-auto text-left max-w-4xl pt-8 pb-24 w-full">
    <NuxtLink class="group hover:no-underline inline-flex items-center gap-1 mb-6" to="/blog">
      <UIcon name="i-heroicons-chevron-left" />
      <span class="group-hover:underline">Back to Blog Posts</span>
    </NuxtLink>

    <div class="bg-gray-50 rounded-lg p-6 md:p-8">
      <div class="flex flex-col sm:flex-row gap-6">
        <div v-if="author.headshot" class="flex-shrink-0">
          <div
              class="w-28 h-28 rounded-full overflow-hidden bg-white shadow-md"
              :style="{ backgroundImage: `url(/images/team/headshot-${author.headshot})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
          />
        </div>
        <div class="flex-grow">
          <h1 class="text-2xl font-medium mb-0">{{ author.name }}</h1>
          <p v-if="author.title" class="text-base text-indigo-600 mb-3 -mt-1">{{ author.title }}</p>
          <p v-if="author.bio" class="text-sm text-gray-700 mb-4">{{ author.bio }}</p>
          <div v-if="topics.length" class="flex flex-wrap gap-2 mb-4">
            <span v-for="topic in topics" :key="topic" class="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-3 py-1">{{ topic }}</span>
          </div>
          <div class="flex gap-3">
            <a v-if="author.email" :href="`mailto:${author.email}`" title="Email" class="text-gray-600 hover:text-indigo-600 transition-colors">
              <UIcon name="i-lucide-mail" class="w-5 h-5" />
            </a>
            <a v-if="author.linkedin" :href="`https://www.linkedin.com/in/${author.linkedin}`" target="_blank" rel="noopener" title="LinkedIn" class="text-gray-600 hover:text-indigo-600 transition-colors">
              <IconsLinkedinIcon class="w-5 h-5" />
            </a>
            <a v-if="author.github" :href="`https://github.com/${author.github}`" target="_blank" rel="noopener" title="GitHub" class="text-gray-600 hover:text-indigo-600 transition-colors">
              <IconsGithubIcon class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <h2 class="mt-10 mb-4">Articles by {{ author.name }}</h2>
    <ul class="flex flex-wrap">
      <BlogListItem v-for="entry in posts" :key="entry.path" :entry="entry" />
    </ul>
  </div>
</template>
