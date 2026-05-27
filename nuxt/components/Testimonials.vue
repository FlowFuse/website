<script setup>
// Reproduces testimonials.njk: a rotating testimonial carousel (auto-advance
// every 10s, dot buttons). Data mirrors src/_data/testimonials.json.
const testimonials = [
    { id: 'testimonial1', imageFile: '/images/home/home-arch.png', imageAlt: ' a man and woman looking at an Arch System Dashboard.', quote: "FlowFuse’s enterprise features complement our broader platform strategy, helping us scale automation and streamline deployments across complex manufacturing environments.", url: '/customer-stories/scaling-manufacturing-automation-with-flowfuse/', author: 'Sevan Petrosian, Senior Application Engineer', company: 'Arch Systems', companyLogo: '/images/arch-icon.png' },
    { id: 'testimonial2', imageFile: '/images/home/power.png', imageAlt: ' a 3d image of an office with sensors.', quote: 'FlowFuse removes concerns about scalability and reliability. It also makes it a lot easier for us to complete security audits for our customers.', url: '/customer-stories/node-red-building-management/', author: 'Alan Yeung, CTO', company: 'Power Workplace', companyLogo: '/images/power-workplace-icon.png' },
    { id: 'testimonial3', imageFile: '/images/home/pidd.png', imageAlt: ' a dam in an artificial river.', quote: 'FlowFuse has helped us take our Node-RED from proof-of-concept through to a reliable, scalable solution for the future.', url: '/customer-stories/leveraging-node-red-and-flowfuse-to-revolutionize-irrigation/', author: 'Robert VanHofwegen', company: 'Paloma Irrigation District', companyLogo: '/images/pidd-icon.png' },
]
const current = ref(0)
let timer = null
onMounted(() => {
    timer = setInterval(() => { current.value = (current.value + 1) % testimonials.length }, 10000)
})
onBeforeUnmount(() => timer && clearInterval(timer))
const select = (i) => { current.value = i; if (timer) clearInterval(timer) }
</script>

<template>
  <div>
    <div class="flex flex-col flex-wrap content-center justify-center p-6 max-w-md sm:max-w-screen-lg mx-auto border-2 border-indigo-200 rounded-xl bg-white hover:drop-shadow-lg hover:border-blue-600 hover:border-2 transition ease-in-out duration-300">
      <a v-for="(t, i) in testimonials" v-show="i === current" :key="t.id" :href="t.url" class="testimonial sm:text-left hover:no-underline">
        <div class="m-auto max-w-screen-lg">
          <div class="max-w-none mx-auto flex flex-col sm:grid justify-center items-center" style="grid-template-columns: 35% auto;">
            <div class="w-full h-full aspect-[331/239] ff-image-cover scale rounded-md mb-4 sm:mb-0">
              <img :src="t.imageFile" :alt="`Image depicting${t.imageAlt}`" style="max-width:360px" />
            </div>
            <div class="items-end justify-between sm:pl-12 flex-1 flex flex-col h-full w-full">
              <span class="text-right pb-5 flex gap-1 hover:underline">Read the full story <Icon name="arrow-long-right" /></span>
              <p class="font-normal italic text-2xl">"{{ t.quote }}"</p>
              <p class="text-lg mt-4 flex flex-row gap-3 text-right items-center self-end mb-0 mr-0">
                <span>{{ t.author }}, <span class="font-medium">{{ t.company }}</span></span>
                <span class="w-16 h-16 min-w-16 rounded-full mx-1 bg-black p-1">
                  <img :src="t.companyLogo" :alt="`${t.company} logo`" style="max-width:56px" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div class="flex flex-wrap flex-row gap-3 justify-center my-6">
      <button v-for="(t, i) in testimonials" :key="t.id" type="button" class="testimonial-button align-baseline max-md:p-2"
              :class="{ active: i === current }" :aria-label="`Show testimonial from ${t.author}, ${t.company}`" @click="select(i)">
        <span />
      </button>
    </div>
  </div>
</template>
