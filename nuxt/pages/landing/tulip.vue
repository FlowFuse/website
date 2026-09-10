<script setup lang="ts">
// Ported from src/landing/tulip.njk (11ty), which this replaces. Same page, same copy,
// same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The hero's two buttons ran an inline onclick that both scrolled to the form and
//    fired capture('download'). One handler here, same event and reference.
//  - hs-book-meeting.njk becomes <HubSpotMeetings>. The .njk defined a global the consent
//    banner called and built the container by hand; the container is markup here.
//  - The "Latest Customer Stories" grid read collections.stories directly, sorted by date
//    and took three. It queries the `stories` collection for the same three.
//  - The problem illustrations under components/icons/large/ are standalone art with no
//    currentColor, so they are public images; the smaller glyphs stay inlined <SiteArt>.
//  - `skipIndex` kept this campaign page out of 11ty's sitemap; it is a robots noindex
//    here, which is what that was for.
import { renderRichText } from '../../lib/rich-text.mjs'

const scrollToAnchor = useScrollToAnchor()
const capture = useCapture()

const META_DESCRIPTION = 'Tulip is only as powerful as the data you feed it. FlowFuse connects legacy machines, edge devices, ERPs, and any industrial system, giving Tulip the complete picture it needs to optimize your operations.'

const HERO = {
    image: '/images/solutions/mes-hero.png',
    imageDescription: 'MES Diagram',
    buttonText: 'REQUEST DEMO',
    buttonReference: 'landing-tulip',
}

const PROBLEM = {
    title: "Is <span class='text-indigo-600'>Tulip</span> Running on Incomplete Data?",
    intro: 'Tulip should give you complete visibility across your shop floor. But most manufacturers struggle with:',
    outro: 'The result? Tulip can only work with the data it receives, and critical information stays trapped in isolated systems.',
}

const PROBLEMS = [
    { image: '/images/icons-large/disconnected.svg', title: "Legacy equipment that doesn't communicate with Tulip" },
    { image: '/images/icons-large/data-silos.svg', title: 'Data silos across different systems and protocols' },
    { image: '/images/icons-large/expensive.svg', title: 'Custom integrations that are expensive and fragile' },
    { image: '/images/icons-large/incomplete.svg', title: 'Incomplete shop floor visibility because not all data reaches Tulip' },
]

// All three cards carry the same bullet list in the source; kept as authored.
const CONNECT_BULLETS = [
    'MQTT, OPC-UA, Modbus HTTP/REST',
    'Legacy PLCs, modern IoT sensors, edge devices',
    'ERP systems, databases, APIs',
    'Any protocol, any device, any system',
]

const SECTIONS = [
    { svgPath: 'arrows-pointing-out', title: 'Connect Everything', description: CONNECT_BULLETS },
    { svgPath: 'puzzle-piece', title: 'Integrate Legacy Equipment', description: CONNECT_BULLETS },
    { svgPath: 'check-circle', title: 'Optimized for Tulip Users', description: CONNECT_BULLETS },
]

const HOW = {
    title: "The Data Connectivity Platform <span class='text-indigo-600'>Built for Manufacturing</span>",
    img: '/vs/images/flowfuse-tulip.png',
    imgAlt: 'FlowFuse Tulip Integration Diagram',
    subtitle: "Built on <span class='whitespace-nowrap'>Node-RED</span> with enterprise features:",
}

const HOW_FEATURES = [
    { svgPath: 'user-group', title: 'Team collaboration and version control' },
    { svgPath: 'lock-closed', title: 'Secure deployment across edge and cloud' },
    { svgPath: 'arrows', title: 'High availability and disaster recovery' },
    { svgPath: 'lifebuoy', title: 'Enterprise support and professional services' },
]

const STORIES_HEADING = {
    title: "Latest <span class='text-indigo-600'>Customer Stories</span>",
    url: '/customer-stories/',
    urlText: 'See more customer stories',
}

const MEETINGS_SRC = 'https://meetings-eu1.hubspot.com/michael-davis/round-robin-michael-omar-kasheef?embed=true'

const { data: stories } = await useAsyncData('tulip-stories', () =>
    queryCollection('stories').select('path', 'title', 'image', 'logo', 'story', 'date')
        .order('date', 'DESC').limit(3).all()
)

function onDemoClick(event: Event) {
    scrollToAnchor(event, 'form')
    capture('download', { reference: HERO.buttonReference })
}

useSeoMeta({
    title: 'Get ALL Your Data into Your MES',
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    ogUrl: 'https://flowfuse.com/landing/tulip/',
    twitterSite: '@FlowFuseinc',
})

useHead({ meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="nohero w-full">
        <div class="w-full pt-12 pb-20 md:pt-6 md:pb-12">
          <div class="md:flex px-6 md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8 items-stretch">
            <div class="m-auto md:w-1/2">
              <h1 class="w-full mt-0 px-12 md:px-0 my-auto text-base md:max-w-[365px]">
                <span class="text-4xl"><span class="text-indigo-600">Get ALL Your Data</span> into Your MES</span>
              </h1>
              <p class="mb-10">{{ META_DESCRIPTION }}</p>
              <a class="ff-btn ff-btn--primary hidden min-h-[40px] md:inline" href="#form" @click="onDemoClick">
                {{ HERO.buttonText }}
              </a>
            </div>
            <div class="md:w-1/2 flex-grow relative">
              <div class="ff-image-rounded w-full h-full">
                <img :src="HERO.image" :alt="HERO.imageDescription" width="496" class="w-full h-auto">
              </div>
            </div>
            <a class="ff-btn ff-btn--primary flex flex-col w-full md:hidden m-auto mt-12" href="#form" @click="onDemoClick">
              {{ HERO.buttonText }}
            </a>
          </div>
        </div>

        <div class="w-full">
          <div class="max-w-screen-lg mx-auto px-6">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <h2 class="text-center w-full md:text-left mb-4" v-html="renderRichText(PROBLEM.title)" />
            <p class="text-center w-full md:text-left text-gray-500 font-normal">{{ PROBLEM.intro }}</p>
            <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 my-12">
              <div v-for="item in PROBLEMS" :key="item.title" class="relative w-full max-md:max-w-md mx-auto bg-indigo-50 rounded-md p-6">
                <div class="flex flex-row justify-center items-center gap-8 h-full">
                  <div class="flex w-16 items-center justify-center">
                    <img :src="item.image" alt="" class="w-full h-auto">
                  </div>
                  <h5 class="w-full md:m-0 text-gray-600 font-medium mx-auto">{{ item.title }}</h5>
                </div>
              </div>
            </div>
            <p class="text-center w-full md:text-left text-gray-500 font-normal">{{ PROBLEM.outro }}</p>
          </div>
        </div>

        <div class="w-full">
          <div class="max-w-screen-lg mx-auto px-6 mt-20">
            <h2 class="text-center w-full md:text-left max-w-4xl"><span class="text-indigo-600">Connect Everything</span> to Tulip</h2>
            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 mt-12">
              <div v-for="section in SECTIONS" :key="section.title" class="container relative w-full max-md:max-w-md mx-auto">
                <div class="flex flex-col items-center sm:items-start">
                  <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                    <div class="w-8 h-8 m-auto sm:m-0 text-indigo-600"><SiteArt :name="section.svgPath" /></div>
                    <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                      <h5 class="w-full md:m-0 font-medium">
                        <div class="text-xl text-gray-600 text-center sm:text-left">{{ section.title }}</div>
                      </h5>
                    </div>
                  </div>
                  <ul class="mt-6 ff-prose prose list-disc">
                    <li v-for="item in section.description" :key="item" class="font-light my-0 ml-4">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full bg-indigo-50/50 py-16 mt-20">
          <div class="max-w-screen-lg mx-auto px-6">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <h2 class="text-center w-full md:text-left max-w-4xl" v-html="renderRichText(HOW.title)" />
            <div class="w-full my-12">
              <img :src="HOW.img" :alt="HOW.imgAlt" width="976" class="w-full h-auto">
            </div>
            <div class="w-full md:flex gap-4">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <h4 class="md:w-[203px] text-xl max-md:mb-6 max-md:text-center" v-html="renderRichText(HOW.subtitle)" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div v-for="item in HOW_FEATURES" :key="item.title" class="bg-indigo-50 border border-white rounded-md flex flex-row items-center gap-4 p-4">
                  <div class="w-8 h-8 text-indigo-600"><SiteArt :name="item.svgPath" /></div>
                  <div class="text-gray-600">{{ item.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-screen-lg mx-auto px-6 mt-16">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 class="max-md:text-center max-w-3xl" v-html="renderRichText(STORIES_HEADING.title)" />
          <ul class="mt-10 grid grid-cols-1 md:grid md:grid-cols-3 gap-y-4 pb-4 m-auto gap-6">
            <li v-for="story in stories" :key="story.path" class="w-full max-w-md m-auto my-2">
              <NuxtLink :to="`${story.path}/`" class="w-full flex flex-col group hover:no-underline">
                <div>
                  <div>
                    <div class="relative">
                      <div class="w-full h-40 ff-image-cover scale mb-4 ff-image-rounded object-contain overflow-hidden">
                        <div v-if="story.image && story.logo" class="w-1/2 h-full absolute left-0 top-0 bg-white flex items-center justify-center">
                          <img :src="story.logo" :alt="`Image representing ${story.story.brand} logo`" width="285" class="max-h-full max-w-full object-contain">
                        </div>
                        <img
                            :src="story.image || '/images/og-blog.jpg'"
                            :alt="story.image ? `Image representing ${story.title}` : 'Image with logo and the slogan: Elevate Node-RED with Flowfuse'"
                            width="285"
                            loading="lazy"
                            class="w-full h-auto"
                        >
                      </div>
                    </div>
                  </div>
                  <h5 class="mt-1 mb-0 group-hover:underline font-light text-lg text-left text-gray-600">{{ story.title }}</h5>
                </div>
              </NuxtLink>
            </li>
          </ul>
          <NuxtLink
              :to="STORIES_HEADING.url"
              class="w-full font-light text-center md:text-left hover:underline pt-3 flex flex-row items-center gap-1 cursor-pointer flex-wrap max-md:max-w-md mx-auto mb-20"
          >
            {{ STORIES_HEADING.urlText }} <SiteArt name="chevron-right-sm" />
          </NuxtLink>
        </div>

        <div id="form" class="max-w-screen-lg mx-auto mb-6">
          <div class="w-full px-6 pb-2 max-sm:mt-4">
            <h2 class="mb-8 max-md:text-center">Ready to Make the Wiser Decision?</h2>
            <p>See how FlowFuse can connect ALL your data sources to Tulip. Book your demo now.</p>
            <div class="my-10">
              <HubSpotMeetings :data-src="MEETINGS_SRC" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
