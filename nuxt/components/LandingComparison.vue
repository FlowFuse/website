<script setup>
// Reproduces layouts/landing-comparison.njk: hero, two comparison cards, a key
// takeaway, and a HubSpot form. Icon names are bare (e.g. "snowflake").
defineProps({
    hero: { type: Object, required: true },
    leftCard: { type: Object, required: true },
    rightCard: { type: Object, required: true },
    takeaway: { type: Object, required: true },
    form: { type: Object, required: true },
    hubspotFormId: { type: String, required: true },
})
const scrollToAnchor = (event, id) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="nohero w-full">
    <div class="w-full pt-12 pb-20 md:pt-6 md:pb-12">
      <div class="md:flex px-6 md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8 items-stretch">
        <div class="m-auto md:w-1/2">
          <h1 class="w-full mt-0 px-6 md:px-0 m-auto font-medium">
            <span class="text-4xl">{{ hero.headline }} <span class="text-indigo-600">{{ hero.headlineHighlight }}</span></span>
          </h1>
          <p class="mb-4" v-html="hero.intro1" />
          <p class="mb-10" v-html="hero.intro2" />
          <a class="ff-btn ff-btn--highlight hidden min-h-[40px] md:inline uppercase" href="#form" @click="scrollToAnchor($event, 'form')">{{ hero.buttonText }}</a>
        </div>
        <div class="md:w-1/2 flex-grow relative">
          <div class="ff-image-cover ff-image-rounded w-full h-full">
            <img :src="hero.image" :alt="hero.imageAlt" style="max-width:496px" />
          </div>
        </div>
        <a class="ff-btn ff-btn--highlight flex flex-col w-full md:hidden m-auto mt-12 uppercase" href="#form" @click="scrollToAnchor($event, 'form')">{{ hero.buttonText }}</a>
      </div>
    </div>

    <div class="w-full py-16 comparison-section-bg">
      <div class="max-w-screen-lg mx-auto px-6">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/2 bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
            <div class="bg-gray-100 px-8 min-h-[6rem] flex items-center justify-center border-b border-gray-200">
              <h2 class="text-center text-gray-600 font-medium text-2xl m-0" v-html="leftCard.title" />
            </div>
            <ul class="px-8 py-6 space-y-10">
              <li v-for="(item, i) in leftCard.items" :key="i" class="flex items-start gap-3">
                <div class="w-8 h-8 min-w-[2rem] rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <div class="w-5 h-5 text-gray-700"><Icon :name="item.icon" /></div>
                </div>
                <span class="text-base leading-snug pt-1" v-html="item.text" />
              </li>
            </ul>
          </div>
          <div class="md:w-1/2 bg-white rounded-xl shadow-lg border border-red-400 overflow-hidden">
            <div class="bg-red-50 px-8 min-h-[6rem] flex items-center justify-center border-b border-red-200">
              <h2 class="text-center text-red-500 font-medium text-2xl m-0" v-html="rightCard.title" />
            </div>
            <ul class="px-8 py-6 space-y-10">
              <li v-for="(item, i) in rightCard.items" :key="i" class="flex items-start gap-3">
                <div class="w-8 h-8 min-w-[2rem] rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <div class="w-5 h-5 text-white m-auto"><Icon :name="item.icon" /></div>
                </div>
                <span class="text-base leading-snug pt-1" v-html="item.text" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full py-16">
      <div class="max-w-screen-lg mx-auto px-6">
        <div class="flex flex-col md:flex-row gap-12 items-start">
          <div class="w-full md:w-1/2 rounded-xl p-8 bg-gradient-to-b from-indigo-50 to-transparent">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-8 h-8 min-w-[2rem] rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <div class="w-5 h-5 text-indigo-600"><Icon name="light-bulb" /></div>
              </div>
              <h3 class="text-indigo-600 font-medium text-xl m-0">Key takeaway</h3>
            </div>
            <p v-html="takeaway.para1" />
            <p class="mt-4" v-html="takeaway.para2" />
          </div>
          <div id="form" class="w-full md:w-1/2 pt-8">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-8 h-8 min-w-[2rem] rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <div class="w-4 h-4 text-indigo-600"><Icon name="document-text" /></div>
              </div>
              <h3 class="font-medium text-xl m-0 text-gray-900">{{ form.title }}</h3>
            </div>
            <HubSpotForm :form-id="hubspotFormId" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
