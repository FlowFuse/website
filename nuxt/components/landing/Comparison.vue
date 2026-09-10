<script setup lang="ts">
// layouts/landing-comparison.njk. Three gated-brief landing pages shared it, all of them
// pure frontmatter, so the whole layout is this one component.
//
// The card glyphs were {% include %}d raw with no wrapper, so they resolve through
// <SiteArt>; hs-form.njk becomes <HubSpotForm>. The two hero buttons ran an inline
// onclick that both scrolled to the form and fired the download event; that is one
// handler here, and it keeps the same event name and reference.
import { renderRichText } from '../../lib/rich-text.mjs'

const props = defineProps<{
    page: {
        hubspot: { formId: string, cta: string, reference: string }
        hero: {
            headline: string
            headlineHighlight: string
            intro1: string
            intro2: string
            image: string
            imageAlt: string
            buttonText: string
        }
        leftCard: { title: string, items: Array<{ icon: string, text: string }> }
        rightCard: { title: string, items: Array<{ icon: string, text: string }> }
        takeaway: { para1: string, para2: string }
        form: { title: string }
    }
}>()

const scrollToAnchor = useScrollToAnchor()
const capture = useCapture()

function onBriefClick(event: Event) {
    scrollToAnchor(event, 'form')
    capture(props.page.hubspot.cta, { reference: props.page.hubspot.reference })
}
</script>

<template>
  <div class="nohero w-full">
    <div class="w-full pt-12 pb-20 md:pt-6 md:pb-12">
      <div class="md:flex px-6 md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8 items-stretch">
        <div class="m-auto md:w-1/2">
          <h1 class="w-full mt-0 px-6 md:px-0 m-auto font-medium">
            <span class="text-4xl">{{ page.hero.headline }} <span class="text-indigo-600">{{ page.hero.headlineHighlight }}</span></span>
          </h1>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p class="mb-4" v-html="renderRichText(page.hero.intro1)" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p class="mb-10" v-html="renderRichText(page.hero.intro2)" />
          <a class="ff-btn ff-btn--highlight hidden min-h-[40px] md:inline uppercase" href="#form" @click="onBriefClick">
            {{ page.hero.buttonText }}
          </a>
        </div>

        <div class="md:w-1/2 flex-grow relative">
          <div class="ff-image-cover ff-image-rounded w-full h-full">
            <img :src="page.hero.image" :alt="page.hero.imageAlt" width="496" class="w-full h-auto">
          </div>
        </div>

        <a class="ff-btn ff-btn--highlight flex flex-col w-full md:hidden m-auto mt-12 uppercase" href="#form" @click="onBriefClick">
          {{ page.hero.buttonText }}
        </a>
      </div>
    </div>

    <div class="w-full py-16 comparison-section-bg">
      <div class="max-w-screen-lg mx-auto px-6">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/2 bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
            <div class="bg-gray-100 px-8 min-h-[6rem] flex items-center justify-center border-b border-gray-200">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <h2 class="text-center text-gray-600 font-medium text-2xl m-0" v-html="renderRichText(page.leftCard.title)" />
            </div>
            <ul class="px-8 py-6 space-y-10">
              <li v-for="item in page.leftCard.items" :key="item.text" class="flex items-start gap-3">
                <div class="w-8 h-8 min-w-[2rem] rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <div class="w-5 h-5 text-gray-700"><SiteArt :name="item.icon" /></div>
                </div>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span class="text-base leading-snug pt-1" v-html="renderRichText(item.text)" />
              </li>
            </ul>
          </div>

          <div class="md:w-1/2 bg-white rounded-xl shadow-lg border border-red-400 overflow-hidden">
            <div class="bg-red-50 px-8 min-h-[6rem] flex items-center justify-center border-b border-red-200">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <h2 class="text-center text-red-500 font-medium text-2xl m-0" v-html="renderRichText(page.rightCard.title)" />
            </div>
            <ul class="px-8 py-6 space-y-10">
              <li v-for="item in page.rightCard.items" :key="item.text" class="flex items-start gap-3">
                <div class="w-8 h-8 min-w-[2rem] rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <div class="w-5 h-5 text-white m-auto"><SiteArt :name="item.icon" /></div>
                </div>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span class="text-base leading-snug pt-1" v-html="renderRichText(item.text)" />
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
                <div class="w-5 h-5 text-indigo-600"><SiteArt name="light-bulb" /></div>
              </div>
              <h3 class="text-indigo-600 font-medium text-xl m-0">Key takeaway</h3>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="renderRichText(page.takeaway.para1)" />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="mt-4" v-html="renderRichText(page.takeaway.para2)" />
          </div>

          <div id="form" class="w-full md:w-1/2 pt-8">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-8 h-8 min-w-[2rem] rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <div class="w-4 h-4 text-indigo-600"><SiteArt name="document-text" /></div>
              </div>
              <h3 class="font-medium text-xl m-0 text-gray-900">{{ page.form.title }}</h3>
            </div>
            <HubSpotForm
                :form-id="page.hubspot.formId"
                :cta="page.hubspot.cta"
                :reference="page.hubspot.reference"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
