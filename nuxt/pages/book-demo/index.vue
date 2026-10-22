<script setup lang="ts">
// Where every "Talk to Us" CTA lands (CTA_DESTINATIONS.bookDemo). The URL stays
// /book-demo/ despite the copy: it carries a lot of existing traffic.
// A booking page: its one job is getting a time picked in the HubSpot scheduler, so
// keep it to the headline, the scheduler and a short "what happens next". No extra
// sections - the story of the offer lives on /build-with-us/.
//
// The steps are the customer's view of the E2E Enterprise Sales Cycle from the October
// 2026 sales working session. Keep internal mechanics off this page: no conversion
// benchmarks, no SDR/BDR hand-offs, no prices, durations or package sizes.
useSeoMeta({
    title: 'Talk to Us',
    description: 'Book a 30-minute call with the FlowFuse team. Bring an operational problem, and leave with an honest view on fit and an agreed next step.',
    ogImage: '/images/og-book-demo.jpeg',
    ogUrl: 'https://flowfuse.com/book-demo/',
    twitterSite: '@FlowFuseinc',
})

const LINK = 'text-indigo-600 hover:text-indigo-800 underline'

const NEXT_STEPS = [
    { title: 'First call', description: 'Your problem, your systems, and an honest answer on fit.' },
    { title: 'Shape the solution', description: 'Assessment, a conservative value case, and a demo on your use case.' },
    { title: 'Pilot', description: 'Prove it on your equipment against success criteria you set.' },
    { title: 'Commit', description: 'Agree scope and terms once the results are in.' },
    { title: 'Deliver and expand', description: 'Into production, then on to your next plant.' },
]
</script>

<template>
  <div class="w-full">
    <section class="w-full px-6 pt-16 md:pt-20 pb-10 bg-gradient-to-b from-indigo-50/70 to-white">
      <!-- On phones the scheduler comes straight after the headline, before the steps. -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,32rem)] lg:grid-rows-[auto_1fr] gap-10 lg:gap-x-14 items-start">
        <div class="text-center lg:text-left lg:col-start-1 lg:row-start-1">
          <p class="text-indigo-600 mb-4 text-sm font-semibold uppercase tracking-wide">Talk to us</p>
          <h1 class="font-medium home text-gray-900 mb-5">
            Bring us a problem. <span class="text-indigo-600">Leave with a plan.</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 m-0">
            30 minutes with people who build industrial applications on FlowFuse. No preparation needed.
          </p>
        </div>

        <div class="min-w-0 overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-lg shadow-indigo-100/60 p-2 sm:p-4 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24">
          <HubSpotMeetings />
        </div>

        <div class="lg:col-start-1 lg:row-start-2">
          <div class="text-left max-w-xl mx-auto lg:mx-0">
            <p class="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">What happens after you book</p>
            <ol class="list-none p-0 m-0">
              <li v-for="(step, index) in NEXT_STEPS" :key="step.title" class="m-0 relative flex gap-4 pb-5 last:pb-0">
                <span v-if="index < NEXT_STEPS.length - 1" class="absolute left-[0.875rem] top-8 bottom-0 w-px bg-indigo-200" aria-hidden="true" />
                <span
                  class="relative flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold"
                  :class="index === 0 ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-200 text-indigo-600'"
                >{{ index + 1 }}</span>
                <p class="m-0 pt-0.5 text-gray-600 font-light">
                  <span class="font-medium text-gray-900">{{ step.title }}.</span> {{ step.description }}
                </p>
              </li>
            </ol>
          </div>

          <p class="mt-10 text-sm text-gray-500 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            Just need a license? <CtaLink destination="pricing" position="hero" :class="LINK">Compare Edge, Hub and Fleet</CtaLink>.
            Already a customer? <a href="/support/" :class="LINK">Get support</a>.
          </p>
        </div>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-6 pb-16">
      <SocialProof />
    </div>
  </div>
</template>
