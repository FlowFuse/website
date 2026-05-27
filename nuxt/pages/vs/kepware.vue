<script setup>
const SIGNUP = 'https://app.flowfuse.com/account/create'
const hero = {
    buttonText: 'Talk to a Migration Expert',
    buttonLink: 'https://meetings-eu1.hubspot.com/michael-davis/round-robin-michael-omar-kasheef?utm_campa[…]113138546&utm_content=113138546&utm_source=hs_automation',
}
const sectionTitle = "Why Industrial Teams Are <span class='text-indigo-600'>Moving Away from Kepware to FlowFuse</span>"
const ICON = {
    cloud: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>',
    arrows: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>',
    puzzle: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" /></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100%" height="100%"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>',
}
const sections = [
    { svg: ICON.cloud, title: 'Built for the cloud', description: 'Run your automation flows wherever you need: edge, on-prem or cloud.' },
    { svg: ICON.arrows, title: 'Open & extensible', description: 'Based on open-source Node-RED. No more black boxes.' },
    { svg: ICON.puzzle, title: 'Faster integrations', description: 'Native support for MQTT, OPC-UA, REST, and custom APIs.' },
]
const table = [
    { feature: 'Open-source base', flowFuse: 'Node-RED & OSS ecosystem', vendor: 'Proprietary stack' },
    { feature: 'Vendor lock-in', flowFuse: 'None', vendor: 'Strong lock-in' },
    { feature: 'Integration flexibility', flowFuse: 'MQTT, OPC-UA, REST, SQL…', vendor: 'Limited/custom connectors' },
    { feature: 'License & scaling model', flowFuse: 'Transparent & usage-based', vendor: 'Expensive & tiered' },
    { feature: 'Community and transparency', flowFuse: 'Active OSS community', vendor: 'Closed ecosystem' },
    { feature: 'Future-proof architecture', flowFuse: 'Portable & cloud-ready', vendor: 'Uncertainty post-acquisition' },
]
const switchSection = {
    title: 'How to Switch from Kepware to FlowFuse',
    content: [
        "<span class='font-semibold'>Migration consultation:</span> We analyze your current setup and challenges.",
        "<span class='font-semibold'>Try FlowFuse with your data:</span> Build real flows using your industrial environment.",
        "<span class='font-semibold'>Go live with expert support:</span> From pilot to full rollout, we’ve got your back.",
    ],
}
const cta = {
    title: 'Ready to Leave Kepware Behind?',
    content: "See how FlowFuse helps teams like yours modernize their industrial automation infrastructure — faster, more flexibly, and at lower cost. <a href='https://meetings-eu1.hubspot.com/michael-davis/round-robin-michael-omar-kasheef?utm_campa[…]113138546&utm_content=113138546&utm_source=hs_automation' class='font-semibold'>Book a Demo with a FlowFuse Expert</a>.",
}
const ARROW_RIGHT = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/></svg>'

useHead({
    title: 'A Modern Alternative to Kepware • FlowFuse',
    meta: [{ name: 'description', content: 'FlowFuse is the open, cloud-ready solution engineers choose to replace legacy tools like PTC Kepware. Build faster, integrate easier, and modernize your industrial workflows — without vendor lock-in.' }],
})
</script>

<template>
  <div class="w-full">
    <div class="w-full pt-12 pb-20 md:pt-6 md:pb-12">
      <div class="md:flex px-6 md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8 items-stretch">
        <div class="m-auto md:w-1/2">
          <h1 class="w-full mt-0 m-auto" v-html="'A Modern Alternative to <span class=&quot;text-indigo-600&quot;>Kepware</span>'" />
          <p class="mb-10">FlowFuse is the open, cloud-ready solution engineers choose to replace legacy tools like PTC Kepware. Build faster, integrate easier, and modernize your industrial workflows — without vendor lock-in.</p>
          <div class="md:mt-3 gap-4 hidden md:flex md:flex-row md:items-start md:justify-start md:m-0">
            <a class="ff-btn ff-btn--primary text-base flex uppercase min-h-[40px]" :href="hero.buttonLink">{{ hero.buttonText }}</a>
            <a class="ff-btn uppercase text-base" :href="SIGNUP">
              <span class="flex gap-2 uppercase items-center text-indigo-600 hover:text-indigo-800">TRY IT OUT <span class="w-6 h-6" v-html="ARROW_RIGHT" /></span>
            </a>
          </div>
        </div>
        <div class="md:w-1/2 flex justify-center items-end m-auto relative">
          <div class="rounded-xl overflow-hidden" style="width:472px;max-width:100%;aspect-ratio:16/9;">
            <iframe src="https://www.youtube.com/embed/rWcfYX_0_8U?rel=0" title="FlowFuse vs Kepware"
                    style="width:100%;height:100%;" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
          </div>
        </div>
        <div class="flex flex-col sm:flex-row md:hidden gap-3">
          <a class="ff-btn ff-btn--primary uppercase w-full m-auto mt-12" :href="hero.buttonLink">{{ hero.buttonText }}</a>
          <a class="ff-btn uppercase flex flex-col w-full m-auto sm:mt-12" :href="SIGNUP"><span class="flex gap-2 uppercase items-center text-indigo-600">TRY IT OUT</span></a>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="max-w-screen-lg mx-auto px-6">
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="sectionTitle" />
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 mt-16">
          <div v-for="section in sections" :key="section.title" class="relative w-full max-md:max-w-md mx-auto">
            <div class="flex flex-col items-center sm:items-start">
              <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                <div class="w-8 h-8 m-auto sm:m-0 text-indigo-600" v-html="section.svg" />
                <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                  <h3 class="w-full md:m-0"><div class="text-xl font-semibold text-gray-600 text-center sm:text-left">{{ section.title }}</div></h3>
                </div>
              </div>
              <div><p class="text-center sm:text-left font-light">{{ section.description }}</p></div>
            </div>
          </div>
        </div>
        <div class="relative overflow-x-auto rounded-lg mt-20">
          <table class="w-full">
            <thead class="bg-indigo-100">
              <tr><th class="px-6 py-3">Features</th><th class="px-6 py-3">FlowFuse</th><th class="px-6 py-3">Kepware</th></tr>
            </thead>
            <tbody>
              <tr v-for="item in table" :key="item.feature" class="even:bg-indigo-50/50">
                <th scope="row" class="px-6 py-4 font-medium text-right">{{ item.feature }}</th>
                <td class="px-6 py-4"><div class="flex gap-3 items-center"><div class="w-6 h-6 sm:w-8 sm:h-8 shrink-0 text-indigo-600" v-html="ICON.check" />{{ item.flowFuse }}</div></td>
                <td class="px-6 py-4"><div class="flex gap-3 items-center"><div class="w-6 h-6 sm:w-8 sm:h-8 shrink-0 text-red-600" v-html="ICON.x" />{{ item.vendor }}</div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="container p-8 md:max-w-screen-lg border-2 border-indigo-200 rounded-lg bg-white drop-shadow-lg m-auto mt-20 grid max-sm:grid-cols-1 sm:gap-x-6">
          <h3 class="order-1" v-html="switchSection.title" />
          <div class="sm:row-span-2 sm:col-span-2 sm:order-3 order-2 flex items-center max-sm:pl-6 max-sm:my-4 sm:px-10 m-auto">
            <ol class="list-decimal mt-2">
              <li v-for="(item, i) in switchSection.content" :key="i" :class="{ 'mb-4': i !== switchSection.content.length - 1 }" v-html="item" />
            </ol>
          </div>
          <div class="flex sm:items-end justify-start sm:order-2 order-3 sm:self-end max-sm:mt-6">
            <a class="ff-btn ff-btn--primary text-base flex uppercase min-h-[40px]" :href="hero.buttonLink">{{ hero.buttonText }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full px-6">
    <div class="max-w-md sm:max-w-screen-lg m-auto my-10">
      <div class="mx-auto w-full"><SocialProof /></div>
    </div>
    <div class="text-center w-full md:text-left md:max-w-screen-lg m-auto mb-24 mt-6 flex flex-col gap-6">
      <h2 v-html="cta.title" />
      <p v-html="cta.content" />
    </div>
  </div>
</template>
