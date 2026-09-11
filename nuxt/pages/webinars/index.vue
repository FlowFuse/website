<script setup lang="ts">
// Ported from src/webinars.njk (11ty), which this replaces. Same page, same copy, same
// classes from src/css/style.css.
//
// What the port changes on purpose:
//  - collections.event became queryCollection('webinars'). The 11ty collection was built
//    from the `event` tag in src/webinars/webinars.json, which only webinars ever carried
//    (the /events/ pages are tagged `trade-show`), so the set is the same one.
//  - The tile images went through the `tileImage` shortcode, which was being called with
//    four arguments against a six-parameter signature - so `defaultImage` received the alt
//    text and the size never arrived. Both tiles fall back to /images/og-webinar.jpg here,
//    which is what the call site meant; the past-webinar tiles previously fell back to
//    /images/og-blog.jpg through the same shifted-argument path.
//  - summary.njk ran the summary through markdown and stripped links. These summaries are
//    plain sentences with no markup, so this renders them as text.
//  - The hand-written onclick="capture('cta-webinar-info')" becomes useCapture(), matching
//    every other Nuxt CTA.
const { data: webinars } = await useAsyncData('webinars-listing', () =>
    queryCollection('webinars').select('path', 'title', 'date', 'time', 'duration', 'image', 'description', 'structuredData').all()
)

const capture = useCapture()

function startOfToday() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
}

// Matches 11ty's inFuture/inPast filters: a webinar dated today counts as upcoming.
function isUpcoming(date: string | Date) {
    const when = new Date(date)
    when.setHours(0, 0, 0, 0)
    return when >= startOfToday()
}

const byDateAscending = (a: { date: string | Date }, b: { date: string | Date }) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()

// `| inFuture | limit(2)`, soonest first.
const upcoming = computed(() =>
    (webinars.value || []).filter(item => isUpcoming(item.date)).sort(byDateAscending).slice(0, 2)
)

// `| inPast | reverse`, newest first.
const past = computed(() =>
    (webinars.value || []).filter(item => !isUpcoming(item.date)).sort(byDateAscending).reverse()
)

// summary.njk read excerpt -> description -> meta.description. @nuxt/content puts the
// <!--more--> excerpt on `description` when the frontmatter has none, which collapses the
// first two into one lookup.
function summaryOf(item: { description?: string, structuredData?: { description?: string } }) {
    return item.description || item.structuredData?.description || ''
}

function tileImage(item: { image?: string }) {
    return item.image || '/images/og-webinar.jpg'
}

function longDate(date: string | Date) {
    return new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

// 11ty's `shortDate` filter rendered "27 Jan, 2026" via spacetime.
function shortDate(date: string | Date) {
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ (\d{4})$/, ', $1')
}

// 11ty's `duration` filter, which takes minutes.
function duration(mins?: number) {
    if (!mins) return ''
    return mins > 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins} mins`
}

useSeoMeta({
    title: 'Webinars',
    description: 'Explore past and upcoming webinars showcasing Node-RED and FlowFuse advancements, perfect for engineers and integrators enhancing IoT strategies and streamlining development.',
    ogUrl: 'https://flowfuse.com/webinars/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="webinar nohero container m-auto text-left max-w-4xl pt-8 pb-24 w-full px-2">
    <h1>Webinars</h1>

    <div class="flex flex-col gap-6">
      <div v-for="item in upcoming" :key="item.path">
        <h3 class="w-full text-indigo-400">
          Upcoming Webinar:
          <span class="text-indigo-600 italic text-lg ml-2">{{ longDate(item.date) }}</span>
        </h3>
        <ul>
          <li class="webinar-tile">
            <div class="flex flex-col md:flex-row">
              <NuxtLink
                  :to="`${item.path}/`"
                  class="webinar-tile-img relative mb-4 md:mb-0 flex md:w-1/2 mr-2 rounded-lg"
                  @click="capture('cta-webinar-info')"
              >
                <div class="w-full h-auto">
                  <img :src="tileImage(item)" :alt="`Image representing ${item.title}`" width="432" class="w-full h-auto">
                  <div class="webinar-tile-radialshade" />
                </div>
                <div v-if="!item.image">
                  <label>
                    <h4 class="text-white">{{ item.title }}</h4>
                    <div class="webinar-tile-datetime">
                      <time class="text-gray-500">{{ item.time }}</time>
                      <time class="text-gray-500">{{ shortDate(item.date) }}</time>
                      <time class="text-gray-500">{{ duration(item.duration) }}</time>
                    </div>
                  </label>
                </div>
              </NuxtLink>
              <div class="flex flex-col justify-between md:w-1/2 md:px-2">
                <div class="grow">
                  <p v-if="summaryOf(item)">{{ summaryOf(item) }}</p>
                </div>
                <div>
                  <NuxtLink
                      class="inline-flex ff-btn ff-btn--primary text-sm"
                      :to="`${item.path}/`"
                      @click="capture('cta-webinar-info')"
                  >
                    More Info
                    <span class="ml-2"><UIcon name="i-heroicons-chevron-right" class="w-5 h-5" /></span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <template v-if="past.length">
      <h3 class="w-full text-indigo-400">Past Webinars</h3>
      <ul class="grid md:grid-cols-3 gap-4">
        <li v-for="item in past" :key="item.path" class="w-full my-2 pb-6 border-b">
          <NuxtLink :to="`${item.path}/`" class="w-full flex flex-col group hover:no-underline">
            <div>
              <time class="block text-xs mb-2 text-gray-500">{{ shortDate(item.date) }}</time>
              <div>
                <div class="w-full h-auto shadow rounded mb-4">
                  <img :src="tileImage(item)" :alt="`Image representing ${item.title}`" width="285" loading="lazy" class="w-full h-auto">
                </div>
              </div>
              <h3 class="mt-1 mb-0 font-medium group-hover:underline">{{ item.title }}</h3>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </div>
</template>
