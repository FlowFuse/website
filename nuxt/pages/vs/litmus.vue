<script setup>
const SIGNUP = 'https://app.flowfuse.com/account/create'
const hero = {
    buttonText: 'Talk to a Migration Expert',
    buttonLink: 'https://meetings-eu1.hubspot.com/michael-davis/round-robin-michael-omar-kasheef?utm_campa[…]113138546&utm_content=113138546&utm_source=hs_automation',
}
const ICON = {
    cube: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" /></svg>',
    squares: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>',
    link: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" /></svg>',
}
const sectionTitle = "Why Industrial Teams Consider <span class='text-red-600'>FlowFuse Instead of Litmus</span>"
const sections = [
    { svg: ICON.cube, title: 'Built for open architectures', description: 'Run your Industrial IoT and AI workloads at the edge, on-premise, or in the cloud, leveraging maximum flexibility for deployment.' },
    { svg: ICON.squares, title: 'Open & extensible', description: 'Built on open-source Node-RED so engineering teams can integrate a wide range of OT assets, IT systems, and AI services with full visibility into every flow.' },
    { svg: ICON.link, title: 'Fast integrations', description: 'Accelerate time from prototype to production and eliminate glue code with native support for MQTT, OPC-UA, REST APIs, SQL targets, and UNS-style architectures.' },
]
const blueCards = [
    { title: 'Open, flexible edge architecture', content: "Customers can run FlowFuse where it makes sense — <span class='font-medium'>at the edge, on-premises, or in the cloud</span> — and integrate with a wide range of clouds, data platforms, and AI services, rather than a single, tightly coupled stack." },
    { title: 'Reduced vendor lock-in and higher portability', content: "Because flows remain Node-RED-compatible and <span class='font-medium'>rely on open standards</span>, organizations can evolve their Industrial AI strategy over time without being constrained by a monolithic, proprietary edge data platform." },
]
const table = [
    { feature: 'Foundation & Governance', flowFuse: "<span class='font-medium'>Open-source (Node-RED).</span> Full transparency with human-readable JSON flows. Users own, inspect, and govern every line of logic.", litmus: "<span class='font-medium'>Proprietary</span>. All-in-one 'black box' stack. Governance and visibility are limited to what the vendor's tools allow." },
    { feature: 'Deployment & Extensibility', flowFuse: "<span class='font-medium'>Infrastructure agnostic.</span> Runs on edge, cloud, or on-prem. Extendable via plain JavaScript/APIs; your team owns the logic.", litmus: "<span class='font-medium'>Platform-dictated.</span> Optimized for large rollouts, but architectural decisions and customization are bounded by the ecosystem." },
    { feature: 'Integration & Connectivity', flowFuse: "<span class='font-medium'>Unrestricted.</span> 5,000+ community nodes + native MQTT, OPC-UA, and UNS. Connect to anything without vendor roadmaps.", litmus: "<span class='font-medium'>Pre-built.</span> Offers connectors for major platforms, but limited to the specific integrations Litmus has prioritized." },
    { feature: 'Industrial AI Strategy', flowFuse: "<span class='font-medium'>Agnostic.</span> Bring your own models and services. Your AI strategy remains flexible as the market evolves.", litmus: "<span class='font-medium'>Opinionated.</span> Fast to start with an integrated stack, but your AI choices are tied to the vendor's specific roadmap." },
    { feature: 'Vendor Lock-in Risk', flowFuse: "<span class='font-medium'>Zero.</span> Fully portable, version-controlled code that is never held hostage by a single vendor.", litmus: "<span class='font-medium'>High.</span> Requires full buy-in to a single vendor stack for connectivity, analytics, and AI." },
]
const switchSection = {
    title: "How to Move Workloads <span class='text-red-600'>from Litmus to FlowFuse</span>",
    content: [
        "<span class='font-semibold'>Migration consultation:</span> We review your current Litmus deployment and data flows to propose a FlowFuse architecture that preserves requirements while increasing openness.",
        "<span class='font-semibold'>Try FlowFuse with your data:</span> Connect your OT assets and replicate key pipelines in a controlled pilot to verify performance and operator experience before you commit.",
        "<span class='font-semibold'>Gradual rollout with expert support:</span> We provide expert support from the initial pilot through multi-site rollout, helping your team standardize patterns and train engineers.",
    ],
}
const cta = {
    title: 'Exploring Alternatives to Litmus?',
    content: "Discover how FlowFuse can help your team modernize its industrial edge and data infrastructure with an open, flexible platform that complements your existing AI and analytics strategy. <a href='https://meetings-eu1.hubspot.com/michael-davis/round-robin-michael-omar-kasheef?utm_campa[…]113138546&utm_content=113138546&utm_source=hs_automation' class='font-semibold'>Book a Demo with a FlowFuse Expert</a>.",
}

useHead({
    title: 'A Flexible Alternative to Litmus • FlowFuse',
    meta: [{ name: 'description', content: 'FlowFuse is an open, cloud-ready platform that industrial teams choose as an alternative to Litmus. Build faster, stay flexible, and scale Industrial AI on your terms — without unnecessary lock-in.' }],
})
</script>

<template>
  <div class="w-full px-6">
    <div class="w-full pt-12 pb-20 md:pt-6 md:pb-8">
      <div class="md:flex md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8 items-stretch">
        <div class="m-auto md:w-1/2">
          <h1 class="w-full mt-0 m-auto" v-html="'A Flexible Alternative to <span class=&quot;text-red-600&quot;>Litmus</span>'" />
          <p class="mb-10">FlowFuse is an open, cloud-ready platform that industrial teams choose as an alternative to Litmus. Build faster, stay flexible, and scale Industrial AI on your terms — without unnecessary lock-in.</p>
          <div class="md:mt-3 gap-4 hidden md:flex md:flex-row md:items-start md:justify-start md:m-0">
            <a class="ff-btn ff-btn--highlight text-base flex uppercase min-h-[40px]" :href="hero.buttonLink">{{ hero.buttonText }}</a>
            <a class="ff-btn uppercase text-base" :href="SIGNUP"><span class="flex gap-2 uppercase items-center text-indigo-600 hover:text-indigo-800">TRY IT OUT</span></a>
          </div>
        </div>
        <div class="md:w-1/2 flex-grow relative">
          <div class="ff-image-cover ff-image-rounded w-full h-full border border-red-600">
            <img src="/vs/images/flowfuse-vs-litmus-hero.png" alt="FlowFuse vs Litmus Hero Image" style="max-width:496px" />
          </div>
        </div>
        <div class="flex flex-col sm:flex-row md:hidden gap-3">
          <a class="ff-btn ff-btn--highlight uppercase w-full m-auto mt-12" :href="hero.buttonLink">{{ hero.buttonText }}</a>
          <a class="ff-btn uppercase flex flex-col w-full m-auto sm:mt-12" :href="SIGNUP"><span class="flex gap-2 uppercase items-center text-indigo-600">TRY IT OUT</span></a>
        </div>
      </div>
    </div>
    <div class="max-w-screen-lg mx-auto">
      <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left mb-20">
        <div v-for="card in blueCards" :key="card.title" class="p-6 bg-gradient-to-r from-white to-indigo-50 border border-indigo-100 rounded-lg">
          <h3 class="text-indigo-600 text-xl font-semibold">{{ card.title }}</h3>
          <p v-html="card.content" />
        </div>
      </div>
    </div>
  </div>
  <div class="w-full px-6 bg-indigo-50/50 py-20">
    <div class="max-w-screen-lg mx-auto">
      <h2 class="text-center w-full md:text-left" v-html="sectionTitle" />
      <p>Industrial organizations evaluating Litmus often explore FlowFuse for a more open, modular approach to edge connectivity, data orchestration, and Industrial AI workloads.​</p>
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 mt-16">
        <div v-for="section in sections" :key="section.title" class="relative w-full max-md:max-w-md mx-auto">
          <div class="flex flex-col items-center sm:items-start">
            <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
              <div class="w-12 h-12 m-auto sm:m-0 rounded-full bg-red-400/70 text-white flex items-center justify-center">
                <div class="w-5 h-5" v-html="section.svg" />
              </div>
              <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                <h3 class="w-full md:m-0"><div class="text-xl font-semibold text-gray-600 text-center sm:text-left">{{ section.title }}</div></h3>
              </div>
            </div>
            <div><p class="text-center sm:text-left font-light">{{ section.description }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full px-6 py-20">
    <div class="max-w-screen-lg mx-auto">
      <div>
        <span class="inline-block rounded bg-indigo-50 px-3 py-1 text-xs text-gray-700 max-md:block max-md:w-fit max-md:mx-auto">Comparison</span>
        <h2 class="mt-4 mb-8 max-md:text-center"><span class="text-red-600">FlowFuse and Litmus</span> at a Glance</h2>
      </div>
      <div class="relative overflow-x-auto rounded-lg border border-indigo-600">
        <table class="w-full table-fixed min-w-[500px]">
          <thead class="bg-indigo-100 text-indigo-900">
            <tr><th class="px-6 py-3 w-1/3">Features</th><th class="px-6 py-3 w-1/3">FlowFuse (Open &amp; Flexible)</th><th class="px-6 py-3 w-1/3">Litmus (Proprietary &amp; Unified)</th></tr>
          </thead>
          <tbody>
            <tr v-for="item in table" :key="item.feature" class="even:bg-indigo-50/50 border-t border-indigo-200">
              <th scope="row" class="px-6 py-4 font-medium text-center">{{ item.feature }}</th>
              <td class="px-6 py-4 font-light" v-html="item.flowFuse" />
              <td class="px-6 py-4 font-light" v-html="item.litmus" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="w-full px-6 py-20 bg-[radial-gradient(ellipse_120%_120%_at_50%_120%,theme(colors.indigo.600)_0%,theme(colors.indigo.900)_100%)]">
    <div class="max-w-screen-lg mx-auto">
      <div class="container p-8 md:max-w-screen-lg border border-red-200 rounded-lg bg-white drop-shadow-lg m-auto grid max-sm:grid-cols-1 sm:gap-x-6">
        <h3 class="order-1 max-sm:text-center" v-html="switchSection.title" />
        <div class="sm:row-span-2 sm:col-span-2 sm:order-3 order-2 flex items-center max-sm:pl-6 max-sm:my-4 sm:px-10 m-auto">
          <ol class="list-decimal mt-2">
            <li v-for="(item, i) in switchSection.content" :key="i" :class="{ 'mb-4': i !== switchSection.content.length - 1 }" v-html="item" />
          </ol>
        </div>
        <div class="flex sm:items-end justify-start sm:order-2 order-3 sm:self-end max-sm:mt-6 max-sm:mx-auto">
          <a class="ff-btn ff-btn--highlight text-base flex uppercase min-h-[40px]" :href="hero.buttonLink">{{ hero.buttonText }}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full px-6 pb-24">
    <p class="text-center md:max-w-screen-lg m-auto mt-24 font-medium text-indigo-900">Trusted by industrial teams worldwide to modernize their OT‑IT data infrastructure and edge architectures.</p>
    <div class="max-w-md sm:max-w-screen-lg m-auto mb-14">
      <div class="mx-auto w-full"><SocialProof /></div>
    </div>
    <div class="ff-blue-card text-center w-full md:text-left md:max-w-screen-lg mx-auto mt-6 flex flex-col gap-6">
      <h2 class="text-indigo-600" v-html="cta.title" />
      <p v-html="cta.content" />
    </div>
  </div>
</template>
