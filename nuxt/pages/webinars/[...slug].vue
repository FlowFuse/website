<script setup lang="ts">
// Ported from src/_includes/layouts/webinar.njk (11ty), which this replaces. Same page,
// same copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The hand-written <lite-youtube> element and the hs-form.njk include become
//    <LiteYoutube> and <HubSpotForm>, already shared with the blog and the ebook pages.
//  - {% renderTeamMember people[host] %} becomes useAuthorMembers + <TeamCardSmall>, the
//    same resolution the blog byline uses, instead of an 11ty shortcode over a global.
//  - faq.njk becomes <BlogFaq> plus useSchemaOrg. The 11ty partial interpolated answers
//    into a JSON string by hand; defineQuestion escapes them properly. faq.njk rendered
//    answers with `| safe`, so a few carried raw <a> tags; those are markdown links now,
//    because BlogFaq escapes HTML on purpose (existing answers contain literal "<ip>"
//    placeholders that must not become markup).
//  - The registration form's "is this still upcoming" test was the dateInFuture filter
//    (spacetime, today counts as future). isUpcoming below keeps that boundary exactly.
import { shortDate } from '../../lib/short-date.mjs'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const { data: page } = await useAsyncData(`webinar-${slug}`, () =>
    queryCollection('webinars').path(`/webinars/${slug}`).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Webinar not found' })
}

const hosts = computed(() => useAuthorMembers(page.value?.hosts))

// 11ty's `duration` filter, which takes minutes.
const formattedDuration = computed(() => {
    const mins = page.value?.duration
    if (!mins) return ''
    return mins > 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins} mins`
})

// 11ty's `shortDate` filter rendered "27 Jan, 2026" via spacetime.
const formattedDate = computed(() => page.value?.date ? shortDate(page.value.date) : '')

// Matches 11ty's dateInFuture: a webinar happening today still counts as upcoming.
const isUpcoming = computed(() => {
    if (!page.value?.date) return false
    const when = new Date(page.value.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    when.setHours(0, 0, 0, 0)
    return when >= today
})

// The registration form is dropped once the slides are up, so a finished webinar does not
// keep asking people to register for it.
const showRegistration = computed(() => isUpcoming.value && !page.value?.hubspot?.downloadFormId && page.value?.hubspot?.formId)

const pageTitle = computed(() => page.value?.title || 'Webinar')
// 11ty's base.njk took meta.description first and only then a top-level description, so
// keep that order. @nuxt/content also auto-fills `description` from the excerpt when the
// frontmatter has none, which is why it must not come first.
const pageDescription = computed(() => page.value?.structuredData?.description || page.value?.description || '')
// 11ty's base.njk resolved <title> as metaTitle -> navTitle -> meta.title -> title, and
// eleventyComputed always populated meta.title, so a page carrying `meta: title:` won its
// own <title>. Webinars have no navTitle, which leaves these three.
const seoTitle = computed(() => page.value?.metaTitle || page.value?.structuredData?.title || pageTitle.value)
const heroImage = computed(() => page.value?.image || '/images/og-webinar.jpg')
const absoluteImage = computed(() => heroImage.value.startsWith('http') ? heroImage.value : `https://flowfuse.com${heroImage.value}`)

useSeoMeta({
    title: seoTitle,
    description: pageDescription,
    ogDescription: pageDescription,
    ogImage: absoluteImage,
    ogUrl: computed(() => `https://flowfuse.com${route.path}/`),
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})

const faq = computed(() => page.value?.structuredData?.faq || [])
if (faq.value.length) {
    useSchemaOrg([
        defineWebPage({ '@type': 'FAQPage' }),
        ...faq.value.map(item => defineQuestion({ question: item.question, answer: item.answer })),
    ])
}
</script>

<template>
  <div v-if="page" class="w-full page webinar">
    <div class="webinar-title container m-auto text-center max-lg:px-6 flex mt-6 mb-6 md:max-w-screen-lg md:mt-12">
      <div class="text-left md:pr-32">
        <label>Webinar</label>
        <h1>{{ page.title }}</h1>
        <h4 v-if="page.subtitle">{{ page.subtitle }}</h4>
        <div class="mt-8">
          <time :datetime="String(page.date)">{{ formattedDate }}</time>
          <time v-if="page.time">{{ page.time }}</time>
          <time v-if="formattedDuration">{{ formattedDuration }}</time>
        </div>
      </div>
    </div>

    <div class="blog nohero w-full pt-6 pb-24">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8">
        <div class="min-w-0">
          <NuxtLink class="mb-4 inline-flex align-center gap-1" to="/webinars/">
            <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
            Back to Webinars
          </NuxtLink>

          <LiteYoutube
              v-if="page.video"
              :videoid="page.video"
              :title="`${page.title} - YouTube video`"
              class="mb-4 block"
              style="width: 706px; max-width: 100%; height: 397px;"
          />
          <div v-else-if="page.image" class="max-w-[706px] mb-6">
            <img :src="page.image" :alt="`Image representing ${page.title}`" width="706" class="w-full h-auto">
          </div>

          <div class="max-w-[706px]">
            <div class="prose">
              <ContentRenderer :value="page" />
            </div>
          </div>

          <div v-if="faq.length" class="max-w-[706px] mt-12">
            <div class="prose">
              <h2 class="mb-1">Frequently Asked Questions</h2>
            </div>
            <BlogFaq :faq="faq" />
          </div>
        </div>

        <div class="w-72 max-w-full">
          <div v-if="showRegistration" class="mt-6 flex flex-col">
            <h3 class="mb-3">Register Here:</h3>
            <HubSpotForm :form-id="page.hubspot.formId" cta="cta-webinar-register" />
          </div>
          <div class="mt-6 flex flex-col">
            <h3 class="mb-3">Presented by:</h3>
            <TeamCardSmall v-for="host in hosts" :key="host.slug" :member="host" />
            <div v-if="page.hubspot?.downloadFormId" class="mt-6 flex flex-col">
              <h3 class="mb-3">Download webinar slides</h3>
              <HubSpotForm :form-id="page.hubspot.downloadFormId" cta="cta-webinar-download-slides" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
