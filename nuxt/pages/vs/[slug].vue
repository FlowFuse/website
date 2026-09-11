<script setup lang="ts">
// Ported from src/vs/{ignition,kepware,litmus}.njk (11ty), which this replaces.
//
// The three pages were near-identical: the same seven sections, the same markup, per-page
// copy. They are one data collection and this renderer now.
//
// What the port changes on purpose:
//  - /vs/kepware/ had drifted from the other two: no comparison chip, no "at a Glance"
//    heading, an unbordered table, plain section icons instead of accent badges, and a
//    plain closing card. It follows the same structure as the other two here. That is a
//    visible change to that page, and the reason to make it is that all three are the
//    same page with a different competitor in it.
//  - The competitor's table column was keyed by its own name (item.ignition,
//    item.Kepware, item.litmus). One key, `competitor`, so one renderer reads all three.
//  - `sectionSubtitle` sat in all three frontmatters and was read by none; it is dropped.
//    So were switch.cta/ctaUrl, which the .njk carried but never rendered - the switch
//    section repeats the hero's migration-expert button.
//  - The migration-expert button was a Nunjucks macro with an inline capture() call. It
//    keeps the same event and reference, through useCapture.
//  - Content strings carrying <span class="font-medium">, <code> and inline links went
//    through `| safe`. They go through nuxt/lib/rich-text.mjs, which escapes the string
//    and re-enables only an allowlisted set of inline tags, classes and href shapes.
import { renderRichText } from '../../lib/rich-text.mjs'

const route = useRoute()
const slug = String(route.params.slug)

const { data: page } = await useAsyncData(`vs-${slug}`, () =>
    queryCollection('vsPages').where('slug', '=', slug).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Comparison not found' })
}

const capture = useCapture()

// Tailwind needs to see whole class names, so these are written out rather than built by
// interpolating the accent into a string.
const ACCENT = {
    orange: { heroBorder: 'border-orange-600', badge: 'bg-orange-400/70', switchBorder: 'border-orange-200' },
    red: { heroBorder: 'border-red-600', badge: 'bg-red-400/70', switchBorder: 'border-red-200' },
    indigo: { heroBorder: 'border-indigo-600', badge: 'bg-indigo-400/70', switchBorder: 'border-indigo-200' },
} as const

const accent = computed(() => ACCENT[page.value?.accent ?? 'indigo'])

function onMigrationExpertClick() {
    capture('talk-to-migration-expert', { reference: page.value?.hero.buttonReference })
}

useSeoMeta({
    title: computed(() => page.value?.seoMeta.title),
    description: computed(() => page.value?.seoMeta.description),
    ogDescription: computed(() => page.value?.seoMeta.description),
    ogImage: computed(() => page.value?.heroImage ? `https://flowfuse.com${page.value.heroImage}` : undefined),
    ogUrl: computed(() => `https://flowfuse.com/vs/${slug}/`),
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div v-if="page" class="w-full">
    <div class="w-full px-6">
      <div class="w-full pt-12 pb-20 md:pt-6 md:pb-8">
        <div class="md:flex md:my-16 md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8 items-stretch">
          <div class="m-auto md:w-1/2">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <h1 class="w-full mt-0 m-auto" v-html="renderRichText(page.heroTitle)" />
            <p class="mb-10">{{ page.seoMeta.description }}</p>
            <div class="md:mt-3 gap-4 hidden md:flex md:flex-row md:items-center md:justify-start md:m-0">
              <a
                  class="ff-btn ff-btn--primary text-base inline-flex items-center justify-center uppercase min-h-[40px]"
                  :href="page.hero.buttonLink"
                  @click="onMigrationExpertClick"
              >{{ page.hero.buttonText }}</a>
              <CtaSignUp variant="ghost" position="hero" icon class="inline-flex items-center" />
            </div>
          </div>
          <div class="md:w-1/2 flex-grow relative">
            <div class="ff-image-cover ff-image-rounded w-full h-full border" :class="accent.heroBorder">
              <img :src="page.heroImage" :alt="page.heroImageAlt" width="496" class="w-full h-auto">
            </div>
          </div>
          <div class="flex flex-col sm:flex-row md:hidden gap-3">
            <a
                class="ff-btn ff-btn--primary text-base inline-flex items-center justify-center uppercase w-full m-auto mt-12"
                :href="page.hero.buttonLink"
                @click="onMigrationExpertClick"
            >{{ page.hero.buttonText }}</a>
            <CtaSignUp variant="ghost" position="hero-mobile" icon class="flex flex-col w-full m-auto sm:mt-12" />
          </div>
        </div>
      </div>

      <div v-if="page.cards?.length" class="max-w-screen-lg mx-auto">
        <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left mb-20">
          <div v-for="card in page.cards" :key="card.title" class="p-6 bg-gradient-to-r from-white to-indigo-50 border border-indigo-100 rounded-lg">
            <h3 class="text-indigo-600 text-xl font-semibold">{{ card.title }}</h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="renderRichText(card.content)" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 bg-indigo-50/50 py-20">
      <div class="max-w-screen-lg mx-auto">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 class="text-center w-full md:text-left" v-html="renderRichText(page.sectionTitle)" />
        <p v-if="page.sectionIntro">{{ page.sectionIntro }}</p>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 mt-16">
          <div v-for="section in page.sections" :key="section.title" class="relative w-full max-md:max-w-md mx-auto">
            <div class="flex flex-col items-center sm:items-start">
              <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                <div class="w-12 h-12 m-auto sm:m-0 rounded-full text-white flex items-center justify-center" :class="accent.badge">
                  <div class="w-5 h-5"><NavIcon :name="section.svgPath" /></div>
                </div>
                <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                  <h3 class="w-full md:m-0">
                    <div class="text-xl font-semibold text-gray-600 text-center sm:text-left">{{ section.title }}</div>
                  </h3>
                </div>
              </div>
              <div>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p class="text-center sm:text-left font-light" v-html="renderRichText(section.description)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <div>
          <span class="inline-block rounded bg-indigo-50 px-3 py-1 text-xs text-gray-700 max-md:block max-md:w-fit max-md:mx-auto">Comparison</span>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 class="mt-4 mb-8 max-md:text-center" v-html="renderRichText(page.tableHeading)" />
        </div>
        <div class="relative overflow-x-auto rounded-lg border border-indigo-600">
          <table class="w-full table-fixed min-w-[500px]">
            <thead class="bg-indigo-100 text-indigo-900">
              <tr>
                <th scope="col" class="px-6 py-3 w-1/3">Features</th>
                <th scope="col" class="px-6 py-3 w-1/3">{{ page.columnFlowFuse }}</th>
                <th scope="col" class="px-6 py-3 w-1/3">{{ page.columnCompetitor }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in page.table" :key="row.feature" class="even:bg-indigo-50/50 border-t border-indigo-200">
                <th scope="row" class="px-6 py-4 font-medium text-center">{{ row.feature }}</th>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <td class="px-6 py-4 font-light" v-html="renderRichText(row.flowFuse)" />
                <!-- eslint-disable-next-line vue/no-v-html -->
                <td class="px-6 py-4 font-light" v-html="renderRichText(row.competitor)" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="w-full px-6 py-20 bg-[radial-gradient(ellipse_120%_120%_at_50%_120%,theme(colors.indigo.600)_0%,theme(colors.indigo.900)_100%)]">
      <div class="max-w-screen-lg mx-auto">
        <div
            class="container p-8 md:max-w-screen-lg border rounded-lg bg-white drop-shadow-lg m-auto grid max-sm:grid-cols-1 sm:grid-cols-[minmax(500px,_1fr)_1fr_1fr] sm:grid-flow-col sm:gap-x-6"
            :class="accent.switchBorder"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h3 class="order-1 max-sm:text-center" v-html="renderRichText(page.switch.title)" />
          <div class="sm:row-span-2 sm:col-span-2 sm:order-3 order-2 flex items-center max-sm:pl-6 max-sm:my-4 sm:px-10 m-auto">
            <ol class="list-decimal mt-2">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <li
                  v-for="(item, i) in page.switch.content"
                  :key="i"
                  :class="{ 'mb-4': i < page.switch.content.length - 1 }"
                  v-html="renderRichText(item)"
              />
            </ol>
          </div>
          <div class="flex sm:items-end justify-start sm:order-2 order-3 sm:self-end max-sm:mt-6 max-sm:mx-auto">
            <a
                class="ff-btn ff-btn--primary text-base inline-flex items-center justify-center uppercase min-h-[40px]"
                :href="page.hero.buttonLink"
                @click="onMigrationExpertClick"
            >{{ page.hero.buttonText }}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 pb-24">
      <div class="max-w-md sm:max-w-screen-lg m-auto mb-14 mt-16">
        <div class="mx-auto w-full">
          <SocialProof :eyebrow="page.socialProofText" />
        </div>
      </div>
      <div class="ff-blue-card text-center w-full md:text-left md:max-w-screen-lg mx-auto mt-6 flex flex-col gap-6">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 class="text-indigo-600" v-html="renderRichText(page.cta.title)" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="renderRichText(page.cta.content)" />
      </div>
    </div>
  </div>
</template>
