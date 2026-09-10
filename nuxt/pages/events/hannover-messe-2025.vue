<script setup lang="ts">
// Ported from src/events/hannover-messe-2025.njk (11ty), which this replaces. Same page,
// same copy, same classes from src/css/style.css.
//
// layouts/base.njk added only the header and footer, so this page is its own body. The
// frontmatter blocks nothing else read become the consts below.
//
// What the port changes on purpose:
//  - Copy strings carrying <span class="font-semibold"> and inline links went through
//    `| safe`. They go through nuxt/lib/rich-text.mjs, which escapes the string and
//    re-enables only an allowlisted set of inline tags.
//  - Two headings closed an <h3> with a stray </span> that had no opening tag, and the
//    live-session title used </br>, which is not a tag. Both are well-formed here.
//  - The "Book a demo" button was a hand-written ff-btn link to /book-demo, so it fired
//    no event; it is <CtaBookDemo>, which is where that destination is defined.
import { renderRichText } from '../../lib/rich-text.mjs'

const HERO = {
    image: '/events/images/hm25/hm-25-hero.png',
    imgAlt: 'Image of people at the FlowFuse booth',
    logo: '/events/images/hm25/hm_logo.png',
    logoAlt: 'Hannover Messe Logo',
    content: [
        'Discover how FlowFuse empowers you to build, deploy, and scale industrial automation, your way.',
        'Visit us at <span class="font-semibold">Hall 15, Stand H71</span> and experience live demos, explore real-time data visualisations, and see how open source innovation is shaping the future of industrial operations.',
        '<span class="font-semibold">Let’s shape the future of industrial automation, together.</span>',
    ],
    cta: 'CLAIM FREE TICKET',
    ctaUrl: 'https://www.hannovermesse.de/en/application/registration/direct-entry-tickets-passes?code=rkGXe',
}

const DEMO = {
    title: 'Visit Us and Unlock the Future of Modular Industrial Software',
    image: '/events/images/hm25/hm-25-demo.png',
    imgAlt: 'Image of people attending the FlowFuse demo.',
    contentIntro: 'At Hannover Messe 2025, you’ll see how FlowFuse empowers you to enhance your existing MES and explore an alternative to traditional SCADA systems. You’ll experience:',
    highlights: [
        'Real-time production monitoring for instant insights',
        'Seamless integration with your existing systems',
        'Fully customisable dashboards and alerts',
        'Hands-on demos that put you in control of your operations',
    ],
    contentOutro: [
        'At FlowFuse, we believe in empowering engineers to take charge, designing, adapting, and scaling solutions to meet unique operational challenges.',
        'Visit us at Hall 15, Stand H71 and unlock the potential of smarter, more efficient manufacturing.',
    ],
}

const LIVE_SESSION = {
    titleLead: 'On-Site Live Session:',
    titleRest: 'How FlowFuse enables a future-proof UNS IT/OT architecture',
    image: '/events/images/hm25/mayker-session-banner.jpg',
    imgAlt: 'Banner indicating place and time of the live session',
    description: [
        'Join us at our booth on <span class="font-semibold">April 1st at 11:30 am</span> for an exclusive live session presented by <span class="font-semibold">Jef Lamerant</span> and <span class="font-semibold">Diederik Vermeersch</span> from the <a href="https://mayker.eu/">Mayker</a> team on how to simplify IT/OT integration with a Unified Namespace (UNS).',
        'With <span class="font-semibold">deep expertise in digital manufacturing and industrial automation</span>, Mayker helps companies bridge the gap between IT and OT systems for more connected, efficient operations.',
    ],
    highlights: [
        'The most common challenges in IT/OT integration, and how to overcome them',
        'Why a Unified Namespace (UNS) is essential for scalable, future-proof data management',
        'How FlowFuse enables low-code integration, edge/cloud connectivity, and real-time event processing',
        'Real-world case studies showcasing efficiency gains and reduced downtime',
        'Practical steps to implement a UNS, plus key considerations to keep in mind',
    ],
    ctaTitle: 'Don’t miss out!',
    ctaCopy: [
        'Stop by our booth, catch the session, and chat with our team to discover how we can help you unlock the full potential of your industrial data.',
        'After the session, <span class="font-semibold">we’ll be giving away three plug-and-play UNS-in-a-Box</span>, be one of the lucky attendees to take one home!',
    ],
    ctaUrl: '/events/hm25-invite.ics',
    ctaCta: 'ADD IT TO YOUR CALENDAR',
}

const BOOK_DEMO = {
    title: 'Can’t make it to Hannover Messe 2025?',
    content: [
        'No problem! You can still experience FlowFuse’s cutting-edge modular MES solution from the comfort of your own space. Book a personalised online demo with us and see how our flexible, real-time industrial software can optimise your operations.',
        'Our team is ready to walk you through the features that matter most to your business and answer any questions you may have.',
        'Take control of your industrial data and improve efficiency across your operations.',
    ],
}

const META_DESCRIPTION = 'Visit us at Hall 15, Stand H71 and experience live demos, explore real-time data visualisations, and see how open source innovation is shaping the future of industrial operations.'

useSeoMeta({
    title: 'FlowFuse at Hannover Messe 2025',
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    ogUrl: 'https://flowfuse.com/events/hannover-messe-2025/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full nohero py-20">
    <div class="w-full px-6">
      <div class="container flex flex-col m-auto text-left md:max-w-screen-lg items-stretch">
        <div class="w-full flex flex-col max-md:justify-center md:flex-row md:gap-10 mt-3 pb-8 md:pb-12">
          <div class="md:max-w-[390px] flex flex-grow relative ff-image-cover ff-image-rounded w-full max-md:mb-6">
            <div class="event bg-indigo-50 max-md:max-h-[300px] w-full md:h-full flex-grow">
              <img :src="HERO.image" :alt="HERO.imgAlt" width="644" class="w-full h-auto">
            </div>
            <div class="hannover-logo-container">
              <img :src="HERO.logo" :alt="HERO.logoAlt" width="50" class="w-full h-auto">
            </div>
          </div>
          <div class="main-content sm:2/3">
            <label class="text-red-600 font-medium mb-2 capitalize">Trade Show</label>
            <h1 class="md:max-w-screen-md">FlowFuse at Hannover Messe 2025</h1>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-for="(item, i) in HERO.content" :key="i" v-html="renderRichText(item)" />
            <div class="flex items-start justify-start mt-10">
              <a class="ff-btn ff-btn--primary uppercase items-center text-base" :href="HERO.ctaUrl" target="_blank" rel="noopener">
                {{ HERO.cta }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full md:bg-white pt-12 md:pt-20 px-6">
      <div class="container flex flex-col md:flex-row m-auto text-left md:max-w-screen-lg md:gap-14 items-stretch">
        <div class="ff-prose mt-3 sm:1/3 flex-grow">
          <h3 class="text-gray-600 leading-snug">{{ DEMO.title }}</h3>
          <p>{{ DEMO.contentIntro }}</p>
          <div class="prose">
            <ul>
              <li v-for="highlight in DEMO.highlights" :key="highlight">{{ highlight }}</li>
            </ul>
          </div>
          <p v-for="(item, i) in DEMO.contentOutro" :key="i">{{ item }}</p>
        </div>
        <div class="md:max-w-[390px] flex flex-grow w-full max-md:mb-6">
          <div class="ff-image-cover right ff-image-rounded max-md:max-h-[300px] w-full md:h-full flex-grow mb-6">
            <img :src="DEMO.image" :alt="DEMO.imgAlt" width="644" class="w-full h-auto">
          </div>
        </div>
      </div>

      <div id="livesession" class="flex flex-col m-auto text-left md:max-w-screen-lg items-stretch mt-6 md:mt-20">
        <div>
          <h3 class="text-gray-600 leading-snug">
            <span class="text-indigo-600">{{ LIVE_SESSION.titleLead }}</span><br>{{ LIVE_SESSION.titleRest }}
          </h3>
          <div class="ff-image-rounded w-full my-6">
            <img :src="LIVE_SESSION.image" :alt="LIVE_SESSION.imgAlt" width="1024" class="w-full h-auto">
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-for="(item, i) in LIVE_SESSION.description" :key="i" v-html="renderRichText(item)" />
        </div>
        <div class="flex max-md:flex-col w-full gap-4">
          <div class="ff-prose prose w-full md:2/3">
            <p>In this session, you’ll learn:</p>
            <ul>
              <li v-for="highlight in LIVE_SESSION.highlights" :key="highlight">{{ highlight }}</li>
            </ul>
          </div>
          <div class="bg-indigo-50/50 rounded-lg p-6 w-full md:max-w-[390px] flex flex-col justify-center max-md:mb-6">
            <h4>{{ LIVE_SESSION.ctaTitle }}</h4>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-for="(item, i) in LIVE_SESSION.ctaCopy" :key="i" v-html="renderRichText(item)" />
            <div class="flex sm:order-2 order-3 mt-4">
              <a class="ff-btn ff-btn--primary-outlined uppercase items-center text-base mx-auto" :href="LIVE_SESSION.ctaUrl" download>
                {{ LIVE_SESSION.ctaCta }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="container md:max-w-screen-lg p-8 border-2 border-indigo-200 rounded-lg bg-white drop-shadow-lg m-auto mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-3 sm:grid-flow-col sm:gap-x-6 sm:py-0 sm:grid-rows-[100px_minmax(20px,_1fr)]">
        <h3 class="order-1 sm:mt-6">{{ BOOK_DEMO.title }}</h3>
        <div class="sm:row-span-2 sm:col-span-2 sm:order-3 order-2">
          <p v-for="(item, i) in BOOK_DEMO.content" :key="i">{{ item }}</p>
        </div>
        <div class="flex items-start justify-start sm:order-2 order-3 sm:self-end sm:pb-6 max-sm:mt-6">
          <CtaBookDemo variant="primary" position="hannover-messe-2025" uppercase class="items-center text-base" />
        </div>
      </div>
    </div>
  </div>
</template>
