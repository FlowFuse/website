<script setup lang="ts">
// Ported from src/landing/factory-efficiency.njk (11ty), which this replaces. Same page,
// same copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The hero's two download buttons ran an inline onclick that both scrolled to the form
//    and fired capture('download'). That is one handler here, keeping the event and
//    reference.
//  - The section illustrations under components/icons/large/ are standalone art with no
//    currentColor, so they are public images rather than inlined SVG.
//  - hs-form.njk becomes <HubSpotForm>, and smooth-scroll.njk becomes useScrollToAnchor.
//  - `skipIndex` kept this campaign page out of 11ty's sitemap; it is a robots noindex
//    here, which is what that was for.
import { renderRichText } from '../../lib/rich-text.mjs'

const scrollToAnchor = useScrollToAnchor()
const capture = useCapture()

const TITLE = 'Transform Your Factory’s Efficiency and Profitability with FlowFuse'
const META_DESCRIPTION = 'See how innovative plant managers like you are cutting costs, boosting uptime, and driving growth.'

const HERO = {
    image: '/landing/images/factory-efficiency.png',
    imageDescription: 'Plant manager with a walkie-talkie in a factory setting',
    buttonText: 'DOWNLOAD',
    buttonReference: 'landing-factory-efficiency',
}

const STATS = [
    { title: '-40%', description: 'reduction in integration costs' },
    { title: '9x', description: 'faster prototyping' },
    { description: "Deployment <span class='text-indigo-400 font-semibold'>at scale</span>" },
]

const SECTIONS = [
    { image: '/images/icons-large/connect.svg', title: 'Connect your factory systems', description: 'Integrate OT, IT, and cloud data for real-time visibility and control.' },
    { image: '/images/icons-large/launch.svg', title: 'Launch industrial apps up to 9x faster', description: 'Move from idea to solution in hours, not days.' },
    { image: '/images/icons-large/reduce.svg', title: 'Reduce engineering time by 20%', description: 'Free up your team for high-value projects.' },
    { image: '/images/icons-large/centralized.svg', title: 'Centralized management & enterprise security', description: 'Deploy and monitor all your applications from one dashboard.' },
]

const QUOTES = [
    { icon: '/images/power-workplace-icon.png', alt: 'Power Workplace logo', quote: 'FlowFuse Cloud is interesting for us because it allows us to focus on growing our business rather than maintaining environments.', author: 'Alan Yeung, CTO,', company: 'Power Workplace' },
    { icon: '/images/abrasive-technology-icon.png', alt: 'Abrasive Technology logo', quote: 'Our search for a better way to host and manage our Node-RED instances is what started our transition to using FlowFuse.', author: 'Josh Dudley,', company: 'Abrasive Technology' },
]

const HUBSPOT = {
    formId: 'eef5e79c-74ae-499e-9fa1-9bd9974959d4',
    cta: 'download-case-study',
    reference: 'factory-efficiency-landing',
}

function onDownloadClick(event: Event) {
    scrollToAnchor(event, 'form')
    capture('download', { reference: HERO.buttonReference })
}

useSeoMeta({
    title: TITLE,
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    ogUrl: 'https://flowfuse.com/landing/factory-efficiency/',
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
              <h1 class="w-full mt-0 px-12 md:px-0 m-auto text-base">
                <span class="text-4xl">{{ TITLE }}</span>
              </h1>
              <p class="mb-10">{{ META_DESCRIPTION }}</p>
              <a class="ff-btn ff-btn--primary hidden min-h-[40px] md:inline" href="#form" @click="onDownloadClick">
                {{ HERO.buttonText }}
              </a>
            </div>
            <div class="md:w-1/2 flex-grow relative">
              <div class="ff-image-cover ff-image-rounded w-full h-full">
                <img :src="HERO.image" :alt="HERO.imageDescription" width="496" class="w-full h-auto">
                <div class="absolute top-0 right-0 flex flex-col p-4 lg:max-w-[45%] text-left">
                  <div
                      v-for="(stat, i) in STATS"
                      :key="stat.description"
                      class="bg-white/80 rounded-md px-3"
                      :class="{ 'mb-2': i < STATS.length - 1 }"
                  >
                    <h3 v-if="stat.title" class="text-indigo-400 mt-3 font-semibold mb-0">{{ stat.title }}</h3>
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <p class="my-2 leading-5" :class="{ 'mt-0': i < STATS.length - 1 }" v-html="renderRichText(stat.description)" />
                  </div>
                </div>
              </div>
            </div>
            <a class="ff-btn ff-btn--primary flex flex-col w-full md:hidden m-auto mt-12" href="#form" @click="onDownloadClick">
              {{ HERO.buttonText }}
            </a>
          </div>
        </div>

        <div class="w-full">
          <div class="max-w-screen-lg mx-auto px-6">
            <h2 class="text-center w-full md:text-left text-indigo-600">The Industrial Application Platform for Plant Managers</h2>
            <h4 class="text-center w-full md:text-left text-gray-500 font-normal">Unlock Data. Accelerate Results. Scale with Confidence.</h4>
            <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              <div v-for="section in SECTIONS" :key="section.title" class="relative w-full max-md:max-w-md mx-auto bg-indigo-50 rounded-md p-6">
                <div class="flex flex-row justify-center items-center gap-8 h-full">
                  <div class="flex w-1/5 items-center">
                    <img :src="section.image" alt="" class="w-full h-auto">
                  </div>
                  <div class="w-4/5">
                    <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                      <h4 class="w-full md:m-0 text-gray-600 font-semibold">{{ section.title }}</h4>
                    </div>
                    <p class="font-light mb-0">{{ section.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-screen-lg mx-auto mt-28 pb-12 px-6 text-lg flex flex-col md:flex-row justify-center gap-12 hover:no-underline">
        <div class="md:w-2/3 text-center mb-12 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap">
          <ul class="m-auto max-w-screen-lg flex flex-col gap-16">
            <li v-for="quote in QUOTES" :key="quote.company" class="flex flex-col max-md:items-center md:flex-row gap-6 align-items-start">
              <div class="w-20 h-20 min-w-20 rounded-full mx-1 bg-black p-2">
                <img :src="quote.icon" :alt="quote.alt" width="64" class="w-full h-auto">
              </div>
              <div>
                <h4 class="md:text-left italic text-gray-500">“{{ quote.quote }}”</h4>
                <p class="md:text-right text-gray-500 text-lg">{{ quote.author }} <span class="font-bold">{{ quote.company }}</span></p>
              </div>
            </li>
          </ul>
        </div>
        <div id="form" class="md:w-1/3 w-full max-w-[550px] flex flex-col mx-auto">
          <div class="px-6 pb-2 max-sm:mt-4">
            <h4 class="mb-8 max-md:text-center">Download Case Study</h4>
            <HubSpotForm :form-id="HUBSPOT.formId" :cta="HUBSPOT.cta" :reference="HUBSPOT.reference" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
