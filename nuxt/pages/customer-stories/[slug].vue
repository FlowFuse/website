<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: page } = await useAsyncData(`customer-story-${slug}`, () =>
    queryCollection('stories').path(`/customer-stories/${slug}`).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Story not found' })
}

const { data: allStories } = await useAsyncData(
    'customer-stories-all',
    () => queryCollection('stories').order('date', 'DESC').all()
)

const otherStories = computed(() => (allStories.value || []).filter(item => item.path !== page.value?.path))

// Prefer resolving the quote byline from src/_data/team|guests/*.json (name/title/headshot)
// when `quoteAuthorSlug` is set; not every quoted person has a JSON entry, so fall back to
// the manual quoteAuthor/quoteRole/quoteAvatar fields on `story`.
const quoteAuthorMember = computed(() => useTeamMember(page.value?.story?.quoteAuthorSlug))
const quoteAuthorName = computed(() => quoteAuthorMember.value?.name || page.value?.story?.quoteAuthor)
const quoteAuthorTitle = computed(() => quoteAuthorMember.value?.title
  || (page.value?.story?.quoteRole ? `${page.value.story.quoteRole}, ${page.value.story.brand}` : undefined))
const quoteAuthorAvatar = computed(() => quoteAuthorMember.value?.headshot
  ? `/images/team/headshot-${quoteAuthorMember.value.headshot}`
  : page.value?.story?.quoteAvatar)

// Deterministic on first render (SSR and pre-hydration client render must match to avoid a
// hydration mismatch); onMounted then reshuffles client-side so each visit gets a fresh pick,
// matching the spirit of 11ty's per-build `shuffle` filter without freezing one order into the
// prerendered static output.
const relatedStories = ref(otherStories.value.slice(0, 3))
onMounted(() => {
    relatedStories.value = [...otherStories.value].sort(() => Math.random() - 0.5).slice(0, 3)
})

const productUrls: Record<string, string> = {
    'Node-RED': '/node-red/',
    'FlowFuse Dashboard': '/platform/dashboard/',
    FlowFuse: '/platform/features/',
    'FlowFuse Device Agent': '/docs/hardware/introduction/#device-agent-hardware',
    'FlowFuse Project Nodes': '/docs/user/projectnodes/#flowfuse-project-nodes',
}
const productIcons: Record<string, string> = {
    'Node-RED': '/images/stories/product-icons/node-red.svg',
    'FlowFuse Dashboard': '/images/stories/product-icons/ff-dashboard.svg',
    FlowFuse: '/images/stories/product-icons/ff-icon.svg',
    'FlowFuse Device Agent': '/images/stories/product-icons/ff-device-agent.svg',
    'FlowFuse Project Nodes': '/images/stories/product-icons/ff-project-nodes.svg',
}

const pageTitle = computed(() => page.value?.title ?? 'Customer Story')
const breadcrumbItems = computed(() => [
    { label: 'Customer Stories', to: '/customer-stories' },
    { label: pageTitle.value },
])
const fullTitle = computed(() => `${pageTitle.value} • FlowFuse`)
const canonicalUrl = computed(() => `https://flowfuse.com${route.path}`)

useSeoMeta({
    title: fullTitle,
    description: computed(() => page.value?.description || ''),
    ogTitle: fullTitle,
    ogDescription: computed(() => page.value?.description || ''),
    ogUrl: canonicalUrl,
    ogImage: computed(() => page.value?.image),
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    computed(() => page.value?.structuredData?.faq?.length ? {
        '@type': 'FAQPage',
        mainEntity: page.value.structuredData.faq.map(item => defineQuestion({ name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
    } : undefined),
])
</script>

<template>
  <div class="page post story w-full">
    <div
      v-if="page.title"
      class="w-full bg-cover bg-center py-6 md:flex md:min-h-[272px] md:content-center md:py-9"
      :style="{ backgroundImage: `linear-gradient(to right, #1F2937, #1F293700), url(${page.image})` }"
    >
      <div class="post-title container m-auto flex max-w-screen-lg text-center max-lg:px-6">
        <div class="max-w-screen-md text-left md:pr-32">
          <label><span class="text-indigo-200">Customer Story</span></label>
          <h1 class="text-shadow-header text-white">
            {{ page.title }}
          </h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h4 v-if="page.subtitle" v-html="page.subtitle" />
        </div>
      </div>
    </div>

    <div class="blog nohero w-full bg-gray-50 pb-24 pt-6">
      <div class="container m-auto flex flex-col items-stretch text-left max-lg:px-6 md:max-w-screen-lg">
        <Breadcrumbs :items="breadcrumbItems" class="mb-3" />
        <NuxtLink to="/customer-stories" class="group mb-5 inline-flex items-center gap-1 hover:no-underline md:mb-4">
          <UIcon name="i-heroicons-chevron-left" />
          <span class="group-hover:underline">Back to Customer Stories</span>
        </NuxtLink>

        <div class="ff-prose mb-6 flex flex-col-reverse border-b md:flex-row md:gap-8">
          <div class="flex-grow">
            <div class="prose">
              <QuoteBlock
                v-if="page.story.quote"
                class="mx-6 my-6"
                :quote="page.story.quote"
                :author="quoteAuthorName"
                :role="quoteAuthorTitle"
                :avatar="quoteAuthorAvatar"
              />
              <ContentRenderer :value="page" />
            </div>

            <div v-if="page.structuredData?.faq?.length" class="prose">
              <ProseH2>{{ page.structuredData.faqTitle || 'Frequently Asked Questions' }}</ProseH2>
              <BlogFaq :faq="page.structuredData.faq" />
            </div>
          </div>

          <div class="w-80 max-w-full flex-shrink-0 self-center md:self-auto">
            <div class="flex flex-col rounded-lg border px-6 py-6" style="box-shadow: 4px 4px 6px rgba(75,85,99,0.05)">
              <template v-if="page.story.logo">
                <div class="flex h-[180px] items-center justify-center bg-white p-2 object-contain">
                  <a :href="page.story.url" target="_blank" rel="noopener" class="ff-image-contain h-full">
                    <img :src="page.story.logo" :alt="`Image representing ${page.story.brand} logo`" class="h-full max-w-full object-contain">
                  </a>
                </div>
                <div class="border-t pb-3" />
              </template>

              <div class="border-b pb-3">
                <h3 class="text-base">
                  Challenge
                </h3>
                <p class="mt-2">
                  {{ page.story.challenge }}
                </p>
              </div>

              <div class="border-b pb-3 pt-3">
                <h3 class="text-base">
                  Solution
                </h3>
                <p class="mt-2">
                  {{ page.story.solution }}
                </p>
                <template v-if="page.story.products?.length">
                  <div class="flex flex-row items-center">
                    <h5 class="mr-2 text-sm font-normal text-gray-500">
                      using:
                    </h5>
                    <hr class="flex-grow border-gray-200">
                  </div>
                  <ul class="mt-4 flex flex-row flex-wrap gap-4">
                    <li v-for="product in page.story.products" :key="product">
                      <NuxtLink v-if="productIcons[product]" :to="productUrls[product]" :title="product" class="mb-3 flex h-10 w-10 items-center">
                        <img :src="productIcons[product]" :alt="product" class="h-10 w-10">
                      </NuxtLink>
                    </li>
                  </ul>
                </template>
              </div>

              <div class="border-b pb-3 pt-3">
                <h3 class="text-base">
                  Results
                </h3>
                <ul class="list-disc pl-6">
                  <li v-for="result in page.story.results" :key="result" class="mb-3 text-base">
                    {{ result }}
                  </li>
                </ul>
              </div>

              <CtaBookDemo variant="primary" position="customer-story" uppercase class="mt-3 w-full md:self-end" />
            </div>

            <div v-if="page.hubspot?.formId" class="mt-6 flex flex-col px-6">
              <div class="flex flex-col pb-3 pt-3">
                <h3 class="mb-3">
                  Download Case Study
                </h3>
                <HubSpotForm :form-id="page.hubspot.formId" />
              </div>
            </div>
          </div>
        </div>

        <h3 v-if="relatedStories.length" class="mt-6 text-indigo-400">
          Read more stories
        </h3>
        <ul v-if="relatedStories.length" class="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 md:grid-cols-3">
          <StoryTile
            v-for="item in relatedStories"
            :key="item.path"
            :title="item.title"
            :path="item.path"
            :brand="item.story.brand"
            :logo="item.logo"
            :image="item.image"
          />
        </ul>
      </div>
    </div>
  </div>
</template>
