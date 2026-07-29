<script setup lang="ts">
import { findFeatureByChangelog, deriveTierLabel } from '../../composables/useFeatureCatalog'

definePageMeta({ layout: 'default' })

const route = useRoute()
const slugParts = computed(() => Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug].filter(Boolean))
const contentPath = computed(() => `/changelog/${slugParts.value.join('/')}`)

const { data: page } = await useAsyncData(
    () => `changelog-${contentPath.value}`,
    () => queryCollection('changelog').path(contentPath.value).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const { data: recentEntries } = await useAsyncData(
    'changelog-recent',
    () => queryCollection('changelog').order('date', 'DESC').limit(6).all()
)

const otherRecentEntries = computed(() =>
    (recentEntries.value || []).filter(entry => entry.path !== page.value?.path).slice(0, 5)
)

const team = useTeam()
const authorMembers = computed(() => (page.value?.authors || []).map(username => team[username]))

const catalogFeature = computed(() => findFeatureByChangelog(page.value?.path || ''))
const tierCloud = computed(() => deriveTierLabel(catalogFeature.value?.cloud))
const tierSelfHosted = computed(() => deriveTierLabel(catalogFeature.value?.selfHosted))

function issueHref(issue: string): string {
    if (issue.startsWith('#')) return `https://github.com/FlowFuse/flowfuse/issues/${issue.substring(1)}`
    if (issue.startsWith('http')) return issue
    return `https://github.com/FlowFuse/flowfuse/issues/${issue}`
}
function issueLabel(issue: string): string {
    if (issue.startsWith('http')) return `#${issue.split('/').pop()}`
    return issue.startsWith('#') ? issue : `#${issue}`
}

const pageTitle = computed(() => page.value?.title || 'Changelog')
const fullTitle = computed(() => `${pageTitle.value} • FlowFuse Changelog`)
const canonicalUrl = computed(() => `https://flowfuse.com${route.path}`)

useSeoMeta({
    title: fullTitle,
    description: computed(() => page.value?.description || ''),
    ogTitle: fullTitle,
    ogDescription: computed(() => page.value?.description || ''),
    ogUrl: canonicalUrl,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full page post">
    <div class="post-title container m-auto text-center max-lg:px-6 flex mt-6 mb-6 md:max-w-screen-lg md:mt-12">
      <div class="text-left md:pr-32">
        <label>Changelog</label>
        <h1>{{ page.title }}</h1>
        <h4 v-if="page.subtitle">{{ page.subtitle }}</h4>
        <ChangelogTierBadges :cloud="tierCloud" :self-hosted="tierSelfHosted" />
      </div>
    </div>

    <div class="blog nohero w-full pb-24">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8 items-stretch">
        <div class="ff-prose flex-grow">
          <NuxtLink to="/changelog" class="inline-flex align-center gap-1 mb-4">
            <UIcon name="i-heroicons-chevron-left" />
            Back to the Changelog
          </NuxtLink>
          <div class="prose">
            <ContentRenderer :value="page" />
          </div>
        </div>

        <div class="w-72 max-w-full flex-shrink-0">
          <div class="sticky top-20 mt-6 flex flex-col">
            <h3 class="mb-3">Written By:</h3>
            <TeamCardSmall v-for="(member, i) in authorMembers" :key="i" :member="member" />

            <p>Published on: <time :datetime="new Date(page.date).toISOString()">{{ new Date(page.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time></p>

            <div v-if="page.issues && page.issues.length > 0" class="py-6 border-t-2">
              <h3 class="mb-3">Related GitHub Issues</h3>
              <ul class="space-y-2 list-disc pl-5">
                <li v-for="issue in page.issues" :key="issue">
                  <a :href="issueHref(issue)" class="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener">{{ issueLabel(issue) }}</a>
                </li>
              </ul>
            </div>

            <h3 class="mb-3 pt-6 border-t-2">Recent Updates:</h3>
            <ul class="ml-6 list-disc">
              <li v-for="entry in otherRecentEntries" :key="entry.path" class="mb-3">
                <NuxtLink :to="entry.path">{{ entry.title }}</NuxtLink>
              </li>
            </ul>

            <div class="mt-3 pt-6 flex flex-col border-t-2">
              <h3>Sign up for updates</h3>
              <HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" cta="cta-blog-subscribe" reference="changelog" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
