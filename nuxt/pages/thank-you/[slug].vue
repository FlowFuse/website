<script setup>
import blogIndex from '~/blog.index.json'
import eventsIndex from '~/events.index.json'
import storiesData from '~/customer-stories.index.json'

const NEWSLETTER_FORM_ID = '159c173d-dd95-49bd-922b-ff3ef243e90c'

// Per-page config mirrors the legacy src/thank-you/*.njk frontmatter.
const PAGES = {
    contact: {
        title: 'Thank you for contacting us',
        subtitle: "<a href='https://meetings-eu1.hubspot.com/flowfuse/book-a-demo-call?uuid=22122d0b-0581-44fb-ab2c-4ae4ff8dc4f5' class='underline'>Schedule a call right now</a>",
        description: 'Or get inspired by our customer success stories while you wait for someone from our team to reach out to you.',
        downloadFollowUp: false,
        readingResources: 'stories',
    },
    download: {
        title: 'Thank you!',
        subtitle: "<a href='https://26586079.fs1.hubspotusercontent-eu1.net/hubfs/26586079/ebook_%20The%20Ultimate%20Beginner%20Guide%20to%20a%20Professional%20Node-RED-V2.pdf'>Click here</a> to access The Ultimate Beginner Guide to a Professional Node-RED",
        description: "We've also sent a copy to your inbox",
        downloadFollowUp: true,
    },
    'download-platform-overview': {
        title: 'Thank you for your interest!',
        subtitle: "<a href='https://26586079.fs1.hubspotusercontent-eu1.net/hubfs/26586079/FlowFuse%20Platform%20Overview-October%202024.pdf'>Click here</a> to access the The FlowFuse Platform Overview",
        description: "We've also sent a copy to your inbox",
        downloadFollowUp: true,
    },
    'download_ebook-flowfuse-dashboard': {
        title: 'Thank you!',
        subtitle: "<a href='https://26586079.fs1.hubspotusercontent-eu1.net/hubfs/26586079/eBook_%20Ultimate%20Guide%20to%20Building%20Applications%20with%20FlowFuse%20Dashboard%20for%20Node-RED.pdf'>Click here</a> to access The Ultimate Guide to Building Applications with FlowFuse Dashboard for Node-RED",
        description: "We've also sent a copy to your inbox",
        downloadFollowUp: true,
        collectionName: 'dashboard',
    },
}

const route = useRoute()
const cfg = PAGES[route.params.slug]
if (!cfg) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead({ title: `${cfg.title} • FlowFuse`, meta: [{ name: 'robots', content: 'noindex' }] })

const latestPosts = computed(() => {
    if (cfg.collectionName && blogIndex.categories[cfg.collectionName]) {
        const urls = blogIndex.categories[cfg.collectionName].urls.slice(0, 3)
        return urls.map((u) => blogIndex.cards.find((c) => c.url === u) || { url: u, title: u })
    }
    return blogIndex.cards.slice(0, 3)
})
const blogAllLink = computed(() => `/blog/${cfg.collectionName || ''}`)

const latestWebinar = computed(() => {
    const webinars = (eventsIndex.events || []).filter((e) => e.type === 'webinar')
    webinars.sort((a, b) => new Date(b.date) - new Date(a.date))
    return webinars[0]
})
const webinarUpcoming = computed(() => {
    const w = latestWebinar.value
    return w && new Date(w.date) >= new Date()
})

const stories = computed(() =>
    [...storiesData.stories].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
)

function fmtDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<template>
  <div class="w-full page">
    <!-- Hero -->
    <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
      <div class="mx-auto max-w-screen-xl md:max-w-xl">
        <h1 v-html="cfg.title" />
        <h4 class="text-gray-500" v-html="cfg.subtitle" />
        <p class="lead-p m-auto mt-3" v-html="cfg.description" />
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col max-w-5xl mx-auto gap-x-10 px-6">
      <div class="max-w-md sm:max-w-screen-lg m-auto pb-6">
        <!-- Stories block (contact page) -->
        <template v-if="cfg.readingResources === 'stories'">
          <ul class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <li v-for="item in stories" :key="item.url" class="w-full max-w-md m-auto my-2">
              <a :href="item.url" class="w-full flex flex-col group hover:no-underline">
                <div class="w-full h-40 ff-image-cover scale mb-4 ff-image-rounded object-contain overflow-hidden relative">
                  <div v-if="item.logo" class="w-1/2 h-full absolute left-0 top-0 bg-white flex items-center justify-center">
                    <img :src="item.logo" :alt="`${item.story?.brand || item.title} logo`" />
                  </div>
                  <img :src="item.image || '/images/og-blog.jpg'" :alt="item.title" />
                </div>
                <h5 class="mt-1 mb-0 group-hover:underline font-light text-lg text-left text-gray-600">{{ item.title }}</h5>
              </a>
            </li>
          </ul>
          <h4 class="mt-20 w-full text-center text-gray-500 pt-12 border-t">Learn more about how FlowFuse helps with your industrial data applications</h4>
        </template>

        <!-- Explore more: blog / webinar / newsletter -->
        <div class="w-full max-w-md md:max-w-none mx-auto flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-x-8 pt-8">
          <div class="w-full my-2 grid grid-cols-1 pb-4">
            <div class="pb-2 md:pb-0">
              <a href="/blog/">
                <div class="sm:max-h-none md:min-w-[40%] max-w-[448px] ff-image-cover ff-image-rounded scale mx-auto mb-4 aspect-video">
                  <img src="/images/home/blog.png" alt="Image of hands typing on laptop working on Node-RED flows" />
                </div>
              </a>
              <h3 class="text-xl font-bold pb-3">Latest on the blog</h3>
              <a v-for="(item, idx) in latestPosts" :key="item.url" :href="item.url" class="w-full flex flex-col group" :class="{ 'border-b': idx !== latestPosts.length - 1 }">
                <h4 class="my-2 font-light text-lg"><span class="text-gray-500 group-hover:text-blue-700">{{ item.title }}</span></h4>
              </a>
            </div>
            <a :href="blogAllLink" class="w-full text-right flex flex-row items-center justify-end self-end justify-self-end gap-1">See all <Icon name="arrow-long-right" /></a>
          </div>

          <div v-if="latestWebinar" class="w-full my-2 grid grid-cols-1 pb-4">
            <div class="pb-2 md:pb-0">
              <a :href="latestWebinar.url">
                <div class="sm:max-h-none md:min-w-[40%] max-w-[448px] ff-image-cover ff-image-rounded scale mx-auto mb-4 aspect-video">
                  <img src="/images/home/webinar.png" alt="Image of hands typing on laptop working on Node-RED flows" />
                </div>
              </a>
              <h3 class="text-xl font-bold pb-3">{{ webinarUpcoming ? 'Upcoming' : 'Latest' }} Webinar</h3>
              <div class="w-full flex flex-col"><h4 class="my-2 font-light text-lg"><span class="text-gray-500">{{ latestWebinar.title }}</span></h4></div>
              <div class="webinar-title w-full border-t pt-3 font-light text-gray-500">
                <time :value="latestWebinar.date">{{ fmtDate(latestWebinar.date) }}</time>
                <time v-if="webinarUpcoming && latestWebinar.time" :value="latestWebinar.time"> | {{ latestWebinar.time }}</time>
              </div>
            </div>
            <a class="mt-4 ff-btn uppercase inline-block self-end justify-self-end" :class="cfg.downloadFollowUp ? 'ff-btn--primary' : 'ff-btn--primary-outlined'" :href="latestWebinar.url">{{ webinarUpcoming ? 'REGISTER NOW' : 'WATCH WEBINAR' }}</a>
          </div>

          <div class="w-full my-2 grid grid-cols-1">
            <div class="pb-2 md:pb-0">
              <div class="sm:max-h-none md:min-w-[40%] max-w-[448px] ff-image-cover ff-image-rounded mx-auto mb-4 aspect-video">
                <img src="/images/home/newsletter.png" alt="Image of hands typing on laptop working on Node-RED flows" />
              </div>
              <h3 class="text-xl font-bold pb-3">Newsletter</h3>
              <h4 class="font-bold pb-3 pt-2 text-lg">Sign up for our monthly email updates</h4>
            </div>
            <div class="-mb-1 self-end w-full"><HubSpotForm :form-id="NEWSLETTER_FORM_ID" /></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Social proof -->
    <div class="w-full max-w-md sm:max-w-screen-lg m-auto mt-6 px-6 border-t border-gray-200">
      <SocialProof />
    </div>
  </div>
</template>
