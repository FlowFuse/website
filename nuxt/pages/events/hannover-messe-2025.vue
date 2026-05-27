<script setup>
// Reproduces src/events/hannover-messe-2025.njk (layout: base.njk, nohero).
const title = 'FlowFuse at Hannover Messe 2025'
const heroSection = {
    image: '/events/images/hm25/hm-25-hero.png',
    imgAlt: 'Image of people at the FlowFuse booth',
    logo: '/events/images/hm25/hm_logo.png',
    logoAlt: 'Hannover Messe Logo',
    content: [
        'Discover how FlowFuse empowers you to build, deploy, and scale industrial automation — your way.',
        'Visit us at <span class="font-semibold">Hall 15, Stand H71</span> and experience live demos, explore real-time data visualisations, and see how open source innovation is shaping the future of industrial operations.',
        '<span class="font-semibold">Let’s shape the future of industrial automation, together.</span>',
    ],
    cta: 'CLAIM FREE TICKET',
    ctaUrl: 'https://www.hannovermesse.de/en/application/registration/direct-entry-tickets-passes?code=rkGXe',
}
const demoSection = {
    title: 'Visit Us and Unlock the Future of Modular Industrial Software',
    image: '/events/images/hm25/hm-25-demo.png',
    imgAlt: 'Image of people attending the FlowFuse demo.',
    contentIntro: 'At Hannover Messe 2025, you’ll see how FlowFuse empowers you to enhance your existing MES and explore an alternative to traditional SCADA systems. You’ll experience:',
    contentHiglights: [
        'Real-time production monitoring for instant insights',
        'Seamless integration with your existing systems',
        'Fully customisable dashboards and alerts',
        'Hands-on demos that put you in control of your operations',
    ],
    contentOutro: [
        'At FlowFuse, we believe in empowering engineers to take charge—designing, adapting, and scaling solutions to meet unique operational challenges.',
        'Visit us at Hall 15, Stand H71 and unlock the potential of smarter, more efficient manufacturing.',
    ],
}
const liveSession = {
    title: "<span class='text-indigo-600'>On-Site Live Session:</span></br>How FlowFuse enables a future-proof UNS IT/OT architecture",
    image: '/events/images/hm25/mayker-session-banner.jpg',
    imgAlt: 'Banner indicating place and time of the live session',
    description: [
        'Join us at our booth on <span class="font-semibold">April 1st at 11:30 am</span> for an exclusive live session presented by <span class="font-semibold">Jef Lamerant</span> and <span class="font-semibold">Diederik Vermeersch</span> from the <a href="https://mayker.eu/" target="_blank">Mayker</a> team on how to simplify IT/OT integration with a Unified Namespace (UNS).',
        'With <span class="font-semibold">deep expertise in digital manufacturing and industrial automation</span>, Mayker helps companies bridge the gap between IT and OT systems for more connected, efficient operations.',
    ],
    highlights: [
        'The most common challenges in IT/OT integration — and how to overcome them',
        'Why a Unified Namespace (UNS) is essential for scalable, future-proof data management',
        'How FlowFuse enables low-code integration, edge/cloud connectivity, and real-time event processing',
        'Real-world case studies showcasing efficiency gains and reduced downtime',
        'Practical steps to implement a UNS, plus key considerations to keep in mind',
    ],
    ctaTitle: 'Don’t miss out!',
    ctaCopy: [
        'Stop by our booth, catch the session, and chat with our team to discover how we can help you unlock the full potential of your industrial data.',
        'After the session, <span class="font-semibold">we’ll be giving away three plug-and-play UNS-in-a-Box</span>—be one of the lucky attendees to take one home!',
    ],
    ctaUrl: '/events/hm25-invite.ics',
    ctaCta: 'ADD IT TO YOUR CALENDAR',
}
const bookDemo = {
    title: 'Can’t make it to Hannover Messe 2025?',
    content: [
        'No problem! You can still experience FlowFuse’s cutting-edge modular MES solution from the comfort of your own space. Book a personalised online demo with us and see how our flexible, real-time industrial software can optimise your operations.',
        'Our team is ready to walk you through the features that matter most to your business and answer any questions you may have.',
        'Take control of your industrial data and improve efficiency across your operations.',
    ],
    cta: 'BOOK A DEMO',
    ctaUrl: '/book-demo',
}
useHead({
    title,
    meta: [{ name: 'description', content: 'Visit us at Hall 15, Stand H71 and experience live demos, explore real-time data visualisations, and see how open source innovation is shaping the future of industrial operations.' }],
})
</script>

<template>
  <div class="w-full nohero py-20">
    <div class="w-full px-6">
      <div class="container flex flex-col m-auto text-left md:max-w-screen-lg items-stretch">
        <div class="w-full flex flex-col max-md:justify-center md:flex-row md:gap-10 mt-3 pb-8 md:pb-12">
          <div class="md:max-w-[390px] flex flex-grow relative ff-image-cover ff-image-rounded w-full max-md:mb-6">
            <div class="event bg-indigo-50 max-md:max-h-[300px] w-full md:h-full flex-grow">
              <img :src="heroSection.image" :alt="heroSection.imgAlt" style="max-width:644px" />
            </div>
            <div class="hannover-logo-container">
              <img :src="heroSection.logo" :alt="heroSection.logoAlt" style="max-width:50px" />
            </div>
          </div>
          <div class="main-content sm:2/3">
            <label class="text-red-600 font-medium mb-2 capitalize">Trade Show</label>
            <h1 class="md:max-w-screen-md">{{ title }}</h1>
            <p v-for="(item, i) in heroSection.content" :key="i" v-html="item" />
            <div class="flex items-start justify-start mt-10">
              <a class="ff-btn ff-btn--primary uppercase items-center text-base" :href="heroSection.ctaUrl" target="_blank">{{ heroSection.cta }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Demo Section -->
    <div class="w-full md:bg-white pt-12 md:pt-20 px-6">
      <div class="container flex flex-col md:flex-row m-auto text-left md:max-w-screen-lg md:gap-14 items-stretch">
        <div class="ff-prose mt-3 sm:1/3 flex-grow">
          <h3 class="text-gray-600 leading-snug" v-html="demoSection.title" />
          <p>{{ demoSection.contentIntro }}</p>
          <div class="prose">
            <ul>
              <li v-for="(h, i) in demoSection.contentHiglights" :key="i">{{ h }}</li>
            </ul>
          </div>
          <p v-for="(item, i) in demoSection.contentOutro" :key="i" v-html="item" />
        </div>
        <div class="md:max-w-[390px] flex flex-grow w-full max-md:mb-6">
          <div class="ff-image-cover right ff-image-rounded max-md:max-h-[300px] w-full md:h-full flex-grow mb-6">
            <img :src="demoSection.image" :alt="demoSection.imgAlt" style="max-width:644px" />
          </div>
        </div>
      </div>
      <!-- Live Session Section -->
      <div id="livesession" class="flex flex-col m-auto text-left md:max-w-screen-lg items-stretch mt-6 md:mt-20">
        <div>
          <h3 class="text-gray-600 leading-snug" v-html="liveSession.title" />
          <div class="ff-image-rounded w-full my-6">
            <img :src="liveSession.image" :alt="liveSession.imgAlt" style="max-width:1024px" />
          </div>
          <p v-for="(item, i) in liveSession.description" :key="i" v-html="item" />
        </div>
        <div class="flex max-md:flex-col w-full gap-4">
          <div class="ff-prose prose w-full md:2/3">
            <p>In this session, you’ll learn:</p>
            <ul>
              <li v-for="(h, i) in liveSession.highlights" :key="i">{{ h }}</li>
            </ul>
          </div>
          <div class="bg-indigo-50/50 rounded-lg p-6 w-full md:max-w-[390px] flex flex-col justify-center max-md:mb-6">
            <h4 v-html="liveSession.ctaTitle" />
            <p v-for="(item, i) in liveSession.ctaCopy" :key="i" v-html="item" />
            <div class="flex sm:order-2 order-3 mt-4">
              <a class="ff-btn ff-btn--primary-outlined uppercase items-center text-base mx-auto" :href="liveSession.ctaUrl" download>{{ liveSession.ctaCta }}</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Book a Demo Section -->
      <div class="container md:max-w-screen-lg p-8 border-2 border-indigo-200 rounded-lg bg-white drop-shadow-lg m-auto mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-3 sm:grid-flow-col sm:gap-x-6 sm:py-0 sm:grid-rows-[100px_minmax(20px,_1fr)]">
        <h3 class="order-1 sm:mt-6" v-html="bookDemo.title" />
        <div class="sm:row-span-2 sm:col-span-2 sm:order-3 order-2">
          <p v-for="(item, i) in bookDemo.content" :key="i" v-html="item" />
        </div>
        <div class="flex items-start justify-start sm:order-2 order-3 sm:self-end sm:pb-6 max-sm:mt-6">
          <a class="ff-btn ff-btn--primary uppercase items-center text-base" :href="bookDemo.ctaUrl">{{ bookDemo.cta }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
