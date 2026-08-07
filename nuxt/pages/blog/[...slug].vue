<script setup lang="ts">
import { BLOG_TAGS, isFuturePost } from '../../composables/useBlogList'
// Handed to ContentRenderer explicitly below. Nuxt Content resolves a markdown component tag
// against a registry it builds while parsing, and reaches it through an async loader. These
// two nodes are spliced in after parsing, so that path renders nothing in a production build
// even though it works in dev. Passing the components directly skips the registry entirely.
import FeatureTierBadges from '../../components/content/FeatureTierBadges.vue'
import FeatureReleaseLinks from '../../components/content/FeatureReleaseLinks.vue'

definePageMeta({ layout: 'default' })

const route = useRoute()
const slugParts = computed(() => (Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]).filter(Boolean))

const routeInfo = computed(() => {
    const parts = slugParts.value
    if (parts.length === 0) return { kind: 'listing' as const, tag: null, page: 1 }
    if (parts.length === 1 && /^\d+$/.test(parts[0])) return { kind: 'listing' as const, tag: null, page: Number(parts[0]) }
    if (parts.length === 1 && BLOG_TAGS.includes(parts[0])) return { kind: 'listing' as const, tag: parts[0], page: 1 }
    if (parts.length === 2 && BLOG_TAGS.includes(parts[0]) && /^\d+$/.test(parts[1])) return { kind: 'listing' as const, tag: parts[0], page: Number(parts[1]) }
    if (parts.length === 3 && /^\d{4}$/.test(parts[0]) && /^\d{2}$/.test(parts[1])) return { kind: 'post' as const }
    return { kind: 'notfound' as const }
})

if (routeInfo.value.kind === 'notfound') {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const contentPath = computed(() => `/blog/${slugParts.value.join('/')}`)

const { data: page } = await useAsyncData(
    () => `blog-${contentPath.value}`,
    () => routeInfo.value.kind === 'post' ? queryCollection('blog').path(contentPath.value).first() : Promise.resolve(null)
)

if (routeInfo.value.kind === 'post' && (!page.value || isFuturePost(page.value.date))) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

// Release blogs get plan badges and changelog links injected under their `features:` headings.
// Every other post passes straight through.
const renderedPage = useReleaseFeaturePage(page)
const releaseFeatureComponents = {
    'feature-tier-badges': FeatureTierBadges,
    'feature-release-links': FeatureReleaseLinks,
}

const { data: allPosts } = await useAsyncData(
    'blog-all-for-related',
    () => routeInfo.value.kind === 'post'
        ? queryCollection('blog').select('path', 'title', 'date', 'tags').order('date', 'DESC').all()
        : Promise.resolve([])
)

const authorMembers = computed(() => useAuthorMembers(page.value?.authors))

function extractText(node: any): string {
    if (!node) return ''
    if (node.type === 'text') return node.value || ''
    if (Array.isArray(node.children)) return node.children.map(extractText).join(' ')
    return ''
}
const readingTime = computed(() => {
    const words = extractText(page.value?.body).split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(words / 200))
})

const relatedPosts = computed(() => {
    const current = page.value
    if (!current) return []
    const requiredTags = current.tags || []
    return (allPosts.value || [])
        .filter(post => post.path !== current.path && !isFuturePost(post.date))
        .map(post => ({ post, commonTags: requiredTags.reduce((count, tag) => count + ((post.tags || []).includes(tag) ? 1 : 0), 0) }))
        .filter(({ commonTags }) => commonTags >= requiredTags.length - 1)
        .sort((a, b) => b.commonTags - a.commonTags || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
        .slice(0, 5)
        .map(({ post }) => post)
})
const recommendedPosts = computed(() => (allPosts.value || []).filter(post => !isFuturePost(post.date)).slice(0, 5))
const relatedHeading = computed(() => relatedPosts.value.length ? 'Related Articles:' : 'Recommended Articles:')
const postsToShow = computed(() => relatedPosts.value.length ? relatedPosts.value : recommendedPosts.value)

const formattedDate = computed(() => page.value ? new Date(page.value.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '')
const heroImage = computed(() => page.value?.image || '/images/og-blog.jpg')
const tldrList = computed(() => Array.isArray(page.value?.tldr) ? page.value?.tldr : null)
const tldrText = computed(() => typeof page.value?.tldr === 'string' ? page.value?.tldr : null)

const pageTitle = computed(() => page.value?.title || 'Blog')
provide('blogPostTitle', pageTitle)
const pageDescription = computed(() => page.value?.description || page.value?.meta?.description || '')
const fullTitle = computed(() => `${pageTitle.value} • FlowFuse Blog`)
const canonicalUrl = computed(() => `https://flowfuse.com${route.path}`)
const absoluteImage = computed(() => heroImage.value.startsWith('http') ? heroImage.value : `https://flowfuse.com${heroImage.value}`)

useSeoMeta({
    title: computed(() => routeInfo.value.kind === 'post' ? fullTitle.value : 'Blog'),
    description: computed(() => routeInfo.value.kind === 'post' ? pageDescription.value : ''),
    ogTitle: computed(() => routeInfo.value.kind === 'post' ? fullTitle.value : 'Blog'),
    ogDescription: computed(() => routeInfo.value.kind === 'post' ? pageDescription.value : ''),
    ogImage: computed(() => routeInfo.value.kind === 'post' ? absoluteImage.value : undefined),
    ogUrl: canonicalUrl,
    ogType: computed(() => routeInfo.value.kind === 'post' ? 'article' : 'website'),
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

if (routeInfo.value.kind === 'post') {
    const firstAuthor = computed(() => authorMembers.value[0])
    useSchemaOrg([
        defineArticle({
            headline: pageTitle,
            description: pageDescription,
            image: absoluteImage,
            datePublished: computed(() => page.value ? new Date(page.value.date).toISOString() : undefined),
            dateModified: computed(() => page.value ? new Date(page.value.lastUpdated || page.value.date).toISOString() : undefined),
            author: computed(() => firstAuthor.value ? [{ name: firstAuthor.value.name, url: 'https://flowfuse.com' }] : [{ name: 'FlowFuse', url: 'https://flowfuse.com' }]),
        }),
        computed(() => page.value?.meta?.faq?.length ? {
            '@type': 'FAQPage',
            mainEntity: page.value.meta.faq.map(item => defineQuestion({ name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
        } : undefined),
        computed(() => page.value?.meta?.howto ? defineHowTo({
            name: page.value.meta.howto.name || pageTitle.value,
            description: page.value.meta.howto.description || pageDescription.value,
            totalTime: page.value.meta.howto.totalTime,
            tool: page.value.meta.howto.tool,
            step: (page.value.meta.howto.steps || []).map(s => defineHowToStep({ name: s.name, text: s.text, url: s.url ? `${canonicalUrl.value}#${s.url}` : undefined })),
        }) : undefined),
    ])
}
</script>

<template>
  <BlogListing v-if="routeInfo.kind === 'listing'" :tag="routeInfo.tag" :page="routeInfo.page" />

  <div v-else-if="page" class="w-full page post">
    <div class="post-title container m-auto text-center max-lg:px-6 flex mt-6 mb-6 md:max-w-screen-lg md:mt-12">
      <div class="text-left md:pr-32">
        <label>Article</label>
        <h1>{{ page.title }}</h1>
        <h4 v-if="page.subtitle">{{ page.subtitle }}</h4>
        <div class="flex flex-wrap items-center gap-1 text-sm text-gray-500 mt-4">
          <span>By</span>
          <span v-for="(author, i) in authorMembers" :key="i">
            <span v-if="i > 0">, </span>
            <span class="font-medium">{{ author ? author.name : 'FlowFuse' }}</span>
          </span>
          <span class="text-gray-300">|</span>
          <time :datetime="new Date(page.lastUpdated || page.date).toISOString()">
            {{ page.lastUpdated ? 'Updated ' : '' }}{{ formattedDate }}
          </time>
          <span class="text-gray-300">|</span>
          <span>{{ readingTime }} min read</span>
        </div>
      </div>
    </div>

    <div class="blog nohero w-full pb-24">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8 items-stretch">
        <div class="ff-prose min-w-0">
          <NuxtLink class="group hover:no-underline inline-flex items-center gap-1 mb-4" to="/blog">
            <UIcon name="i-heroicons-chevron-left" />
            <span class="group-hover:underline">Back to Blog Posts</span>
          </NuxtLink>

          <div class="prose w-full flex-grow">
            <div class="mb-4 hero-img">
              <div v-if="page.video" class="w-full" style="margin-top: 20px; margin-bottom: 20px;">
                <LiteYoutube :videoid="page.video" :title="page.title" />
              </div>
              <div v-else class="w-full h-auto">
                <img :src="heroImage" :alt="`Image representing ${page.title}`" class="w-full h-auto">
              </div>
            </div>

            <section v-if="tldrList || tldrText" id="tldr" aria-label="TL;DR" class="not-prose my-8 rounded-r-lg border-l-4 border-indigo-400 bg-indigo-50 px-6 py-5">
              <span class="text-indigo-400 text-xs uppercase font-bold tracking-wider">TL;DR</span>
              <p v-if="tldrText" class="mt-2 mb-0 text-sm leading-relaxed text-gray-700">{{ tldrText }}</p>
              <ul v-else class="mt-2 mb-0 list-disc space-y-1 pl-4 text-sm leading-relaxed text-gray-700">
                <li v-for="(point, i) in tldrList" :key="i">{{ point }}</li>
              </ul>
            </section>

            <ContentRenderer :value="renderedPage" :components="releaseFeatureComponents" />
          </div>

          <div class="mt-10">
            <BlogPostCta :title="page.title" :cta="page.cta" />
          </div>

          <div v-if="page.meta?.faq?.length" class="prose mt-12">
            <h2 class="mb-1">Frequently Asked Questions</h2>
            <BlogFaq :faq="page.meta.faq" />
          </div>

          <BlogAuthorCard v-for="(author, i) in authorMembers" :key="i" :author="author" />
        </div>

        <div class="w-72 max-w-full flex-shrink-0">
          <div class="mt-6 flex flex-col">
            <HandbookToc :links="page?.body?.toc?.links" :ui="{ root: 'static' }" />
            <div class="mb-6 pt-6 border-t-2">
              <h3 class="mb-3">Like what you're reading?</h3>
              <a
                  class="text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline"
                  href="https://www.google.com/preferences/source?q=flowfuse.com"
                  target="_blank"
                  rel="noopener"
              >Add FlowFuse as a preferred source</a>
              <p class="text-xs text-gray-500 mt-1 mb-0">On the page that opens, check the box next to flowfuse.com to see more of our articles in your Google Search results.</p>
            </div>
          </div>
          <div class="sticky top-20">
            <h3 class="mb-3 pt-6 border-t-2">{{ relatedHeading }}</h3>
            <ul class="ml-6 list-disc">
              <li v-for="post in postsToShow" :key="post.path" class="mb-3">
                <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
              </li>
            </ul>
            <div class="mb-6 pb-6 pt-6 border-t-2">
              <BlogSocialShare :title="page.title" :path="route.path" />
            </div>
            <div class="mt-3 pt-6 flex flex-col border-t-2">
              <h3>Sign up for updates</h3>
              <HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" cta="cta-blog-subscribe" reference="article" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
