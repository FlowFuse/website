<script setup lang="ts">
// Ported from src/partners/certify-hardware.njk (11ty), which this replaces. Same page,
// same copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The step glyphs were {% include %}d raw inside .ff-certify-list-icon, so they become
//    <SiteArt>, which inlines the same file without a wrapper.
//  - ctaContactUs becomes <CtaContactUs>.
//  - The .njk closed the "Benefits" heading with </h1> after an <h2>; the markup here is
//    well-formed.
//  - The Documentation link was written as "/../docs/device-agent/introduction/", which
//    browsers resolve to /docs/... anyway. It is spelled that way here.
const TECHNICAL_STEPS = [
    { icon: 'book-open', slot: 'repository' },
    { icon: 'check-circle', text: 'Ensure that the Device Agent comes pre-installed on your device. Alternatively, it should be available from a store or marketplace as a "one-click" installer.' },
    { icon: 'document-arrow-up', text: 'Users can easily upload their device configuration either through a custom user interface (e.g., file upload or input mask) or via the built-in Device Agent UI.' },
]

useSeoMeta({
    title: 'How to Certify Your Hardware',
    description: 'Follow these steps to get your hardware certified for compatibility with FlowFuse and Node-RED',
    ogDescription: 'Follow these steps to get your hardware certified for compatibility with FlowFuse and Node-RED',
    ogUrl: 'https://flowfuse.com/partners/certify-hardware/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="py-20 px-6 md:px-0">
        <h1><div class="m-auto max-w-xl text-center">How to Certify Your Hardware</div></h1>
        <div class="max-w-[550px] m-auto gap-6 md:gap-2">
          <h4 class="text-center m-auto text-indigo-400">Follow these steps to get your hardware certified for compatibility with FlowFuse and Node-RED.</h4>
        </div>
      </div>
      <div class="w-full px-6 pb-20 md:px-0 flex flex-col gap-10 md:gap-12">
        <div class="container max-w-screen-md m-auto flex flex-col gap-4">
          <h3 class="m-auto text-center w-full mb-6">Technical Qualification in 3 Steps</h3>
          <div class="ff-certify-list">
            <div v-for="(step, i) in TECHNICAL_STEPS" :key="step.icon" class="ff-item">
              <div class="ff-line-container" :class="{ 'sm:invisible': i === 0 }">
                <div class="ff-line" />
              </div>
              <div class="ff-certify-list-icon"><SiteArt :name="step.icon" /></div>
              <div class="ff-line-container">
                <div class="ff-line" :class="{ 'sm:hidden': i === TECHNICAL_STEPS.length - 1 }" />
              </div>
              <div class="font-light sm:row-span-3 col-span-3 sm:col-auto my-auto pt-6 sm:pt-0">
                <template v-if="step.slot === 'repository'">
                  Explore the FlowFuse Device Agent
                  <a href="https://github.com/FlowFuse/device-agent" target="_blank" rel="noopener">Repository</a> and
                  <NuxtLink to="/docs/device-agent/introduction/">Documentation</NuxtLink>.
                </template>
                <template v-else>{{ step.text }}</template>
              </div>
            </div>
          </div>
        </div>
        <hr class="w-full md:w-[768px] mx-auto">
        <div class="container max-w-screen-md m-auto flex flex-col gap-4">
          <h3 class="m-auto text-center w-full">Certification</h3>
          <div class="flex flex-col gap-6 md:px-10">
            <p class="w-full">After successfully navigating the technical qualification, take the next step by booking a meeting with our team. Together, we'll work towards ensuring your device is fully compatible with FlowFuse and Node-RED.</p>
            <ul class="flex flex-row justify-center w-full items-center">
              <li class="pb-6">
                <CtaContactUs variant="primary" position="certify-hardware" class="inline-block w-[218px] text-center" />
              </li>
            </ul>
          </div>
        </div>
        <hr class="w-full md:w-[768px] mx-auto">
        <div class="container max-w-screen-md m-auto flex flex-col gap-4">
          <h3 class="m-auto text-center w-full mb-6">Marketing and Publications</h3>
          <div class="ff-certify-list">
            <div class="ff-item">
              <div class="ff-line-container sm:invisible"><div class="ff-line" /></div>
              <div class="ff-certify-list-icon"><SiteArt name="chat-bubble-bottom-center-text" /></div>
              <div class="ff-line-container"><div class="ff-line" /></div>
              <div class="font-light sm:row-span-3 col-span-3 sm:col-auto my-auto pt-6 sm:pt-0">In a joint meeting, we will discuss marketing activities on a case-by-case basis.</div>
            </div>
            <div class="ff-item ff-certified">
              <div class="ff-line-container"><div class="ff-line" /></div>
              <div class="ff-certify-list-icon"><SiteArt name="check-badge" /></div>
              <div class="ff-line-container"><div class="ff-line sm:hidden" /></div>
              <div class="font-light sm:row-span-3 col-span-3 my-auto pt-6 sm:pt-0">Upon successful technical qualification, you will be granted the right to use the "FlowFuse Certified" logo.</div>
              <div class="w-[86px] col-span-3 sm:row-span-3 m-auto pt-6 sm:pt-0">
                <img src="/images/partners/ff-certified-device.svg" alt="FlowFuse certification badge" width="86" class="w-full h-auto">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
