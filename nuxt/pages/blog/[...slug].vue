<script setup lang="ts">
import { estimateReadingMinutes } from '~/utils/readingTime'
import { pickRelatedPosts } from '~/composables/useRelatedPosts'
import { useBlogPosts } from '~/composables/useBlogPosts'

const route = useRoute()
const slugParts = computed(() => Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug].filter(Boolean))
const contentPath = computed(() => `/blog/${slugParts.value.join('/')}`)

const { data: post } = await useAsyncData(
    () => `blog-post-${contentPath.value}`,
    () => queryCollection('blog').path(contentPath.value).first()
)

if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const { data: authors } = await useBlogAuthors()
const { data: allPosts } = await useBlogPosts()

const readingMinutes = computed(() => estimateReadingMinutes(post.value?.body))

const related = computed(() => pickRelatedPosts(allPosts.value ?? [], {
    path: post.value!.path,
    tags: post.value!.tags,
}))

const resolvedAuthors = computed(() =>
    (post.value!.authors ?? []).map(key => authors.value?.[key]).filter(Boolean)
)

const tldrList = computed(() => Array.isArray(post.value?.tldr) ? post.value!.tldr : null)
const tldrText = computed(() => typeof post.value?.tldr === 'string' ? post.value!.tldr : null)

const canonicalUrl = computed(() => `https://flowfuse.com${route.path}`)
const fullTitle = computed(() => `${post.value?.title} • FlowFuse Blog`)

useSeoMeta({
    title: fullTitle,
    description: computed(() => post.value?.description || ''),
    ogTitle: computed(() => post.value?.title || ''),
    ogDescription: computed(() => post.value?.description || ''),
    ogUrl: canonicalUrl,
    ogType: 'article',
    ogImage: computed(() => post.value?.image ? `https://flowfuse.com${post.value.image}` : undefined),
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
    keywords: computed(() => post.value?.keywords),
})

useSchemaOrg([
    defineArticle({
        headline: computed(() => post.value?.title || ''),
        description: computed(() => post.value?.description || ''),
        image: computed(() => post.value?.image ? [`https://flowfuse.com${post.value.image}`] : undefined),
        datePublished: computed(() => post.value?.date),
        dateModified: computed(() => post.value?.lastUpdated || post.value?.date),
        author: computed(() => resolvedAuthors.value.length
            ? resolvedAuthors.value.map(a => ({ name: a.name }))
            : [{ name: 'FlowFuse', url: 'https://flowfuse.com' }]),
    }),
])

defineOgImage('Default', {
    title: post.value.title,
    section: 'Blog',
})
</script>

<template>
  <div v-if="post" class="w-full page post">
    <div class="post-title container m-auto text-center max-lg:px-6 flex mt-6 mb-6 md:max-w-screen-lg md:mt-12">
      <div class="text-left md:pr-32 w-full">
        <label>Article</label>
        <h1>{{ post.title }}</h1>
        <h4 v-if="post.subtitle">
          {{ post.subtitle }}
        </h4>
        <BlogByline
          :authors="post.authors ?? []"
          :authors-lookup="authors"
          :date="post.date"
          :last-updated="post.lastUpdated"
          :reading-minutes="readingMinutes"
        />
        <div v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-3">
          <NuxtLink v-for="tag in post.tags" :key="tag" :to="`/blog/${tag}/`" class="text-xs uppercase tracking-wide font-semibold text-red-500 hover:no-underline">
            {{ tag }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="blog nohero w-full pb-24">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8 items-stretch">
        <div class="ff-prose min-w-0">
          <NuxtLink to="/blog/" class="inline-flex align-center gap-1 mb-4 hover:no-underline">
            <IconChevronLeft class="w-5 h-5" />
            Back to Blog Posts
          </NuxtLink>

          <div class="prose w-full flex-grow">
            <div class="mb-4 hero-img">
              <iframe
                v-if="post.video"
                :src="`https://www.youtube-nocookie.com/embed/${post.video}?rel=0`"
                :title="`${post.title} - YouTube video`"
                style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px; border: 0;"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <img v-else :src="post.image || '/images/og-blog.jpg'" :alt="post.title" class="w-full h-auto rounded-lg">
            </div>

            <section v-if="tldrText || tldrList" aria-label="TL;DR" class="not-prose my-8 rounded-r-lg border-l-4 border-indigo-400 bg-indigo-50 px-6 py-5">
              <span class="text-indigo-400 text-xs uppercase font-bold tracking-wider">TL;DR</span>
              <p v-if="tldrText" class="mt-2 mb-0 text-sm leading-relaxed text-gray-700">
                {{ tldrText }}
              </p>
              <ul v-else class="mt-2 mb-0 list-disc space-y-1 pl-4 text-sm leading-relaxed text-gray-700">
                <li v-for="(point, i) in tldrList" :key="i">
                  {{ point }}
                </li>
              </ul>
            </section>

            <ContentRenderer :value="post" />
          </div>

          <div class="mt-10">
            <BlogCta v-bind="post.cta" :post-title="post.title" />
          </div>

          <BlogFaq v-if="post.meta?.faq" :faq="post.meta.faq" />

          <BlogAuthorCard v-for="author in resolvedAuthors" :key="author.name" :author="author" />
        </div>

        <div class="w-72 max-w-full flex-shrink-0">
          <div class="mt-6 flex flex-col">
            <HandbookToc :links="post.body?.toc?.links" />
          </div>
          <div class="sticky top-20">
            <h3 class="mb-3 pt-6 border-t-2">
              {{ related.heading }}
            </h3>
            <ul class="ml-6 list-disc">
              <li v-for="related_post in related.posts" :key="related_post.path" class="mb-3">
                <NuxtLink :to="related_post.path">
                  {{ related_post.title }}
                </NuxtLink>
              </li>
            </ul>
            <div class="mb-6 pb-6 pt-6 border-t-2">
              <SocialShareIcons :title="post.title" :path="route.path" />
            </div>
            <div class="mt-3 pt-6 flex flex-col border-t-2">
              <h3>Sign up for updates</h3>
              <HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" cta="cta-blog-subscribe" reference="article" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <BlogRelatedPosts :heading="'More to explore'" :posts="related.posts" />
  </div>
</template>
