<script setup lang="ts">
import { faqAnswerText } from '../lib/faq-answer.mjs'

type Heading = [string, string]

const props = defineProps<{
    page: {
        slug: string
        metaTitle: string
        metaDescription: string
        hero: { eyebrow: string, title: Heading, subtext: string, imagePlaceholder: string, image?: { src: string, alt: string } }
        outcomes: { heading: Heading, intro: string, items: Array<{ label: string, title: string, detail: string, icon: string }> }
        solutions: { heading: Heading, intro: string, cards: Array<{ eyebrow: string, title: string, description: string, points: string[], image: { src: string, alt: string, fit: 'cover' | 'contain' }, link: { to: string, label: string } }> }
        support: { heading: Heading, intro: string, items: Array<{ title: string, description: string, icon: string }> }
        proof: { heading: Heading, intro: string, items: Array<{ number: string, text: string }> }
        faq: { heading: Heading, items: Array<{ question: string, answer: string }> }
        cta: { heading: string, body: string, buttons: Array<'bookDemo' | 'signUp'> }
    }
}>()

const FRAME_VARIANTS = [
    { backdrop: 'from-indigo-400 via-indigo-300 to-indigo-100', border: 'border-indigo-300' },
    { backdrop: 'from-red-200 via-red-100 to-red-50', border: 'border-red-100' },
]

const url = `https://flowfuse.com/teams/${props.page.slug}/`

useSeoMeta({
    title: props.page.metaTitle,
    description: props.page.metaDescription,
    ogTitle: props.page.metaTitle,
    ogDescription: props.page.metaDescription,
    ogImage: 'https://flowfuse.com/images/use-cases/mes/platform-home.webp',
    ogUrl: url,
    twitterSite: '@FlowFuseinc',
})

useHead({ titleTemplate: '%s' })

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...props.page.faq.items.map(item => defineQuestion({ question: item.question, answer: faqAnswerText(item.answer) })),
])
</script>

<template>
  <div class="w-full text-gray-700">
    <section class="team-gradient w-full px-6 pt-16 md:pt-20 pb-20">
      <div class="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="max-md:text-center">
          <p class="m-0 text-sm font-semibold uppercase tracking-wide text-indigo-600">{{ page.hero.eyebrow }}</p>
          <h1 class="mt-3 mb-0 text-4xl md:text-5xl font-medium">
            {{ page.hero.title[0] }}
            <span class="block text-red-600">{{ page.hero.title[1] }}</span>
          </h1>
          <p class="mt-6 mb-0 text-gray-700">{{ page.hero.subtext }}</p>
          <div class="mt-8 flex gap-4 items-center max-md:justify-center flex-wrap">
            <CtaBookDemo variant="highlight" position="hero" />
            <CtaSignUp variant="ghost" position="hero" icon="i-lucide-arrow-right" />
          </div>
        </div>
        <img
            v-if="page.hero.image"
            :src="page.hero.image.src"
            :alt="page.hero.image.alt"
            width="1200"
            height="800"
            class="aspect-[3/2] w-full rounded-lg object-cover max-md:mt-4"
        >
        <div v-else class="aspect-[3/2] w-full rounded-lg border-2 border-dashed border-indigo-200 bg-white/60 flex flex-col items-center justify-center gap-2 px-6 text-center text-indigo-400 max-md:mt-4">
          <UIcon name="i-lucide-image" class="w-10 h-10" />
          <span class="text-sm font-medium">{{ page.hero.imagePlaceholder }}</span>
        </div>
      </div>
    </section>

    <section class="w-full px-6 pb-16">
      <SocialProof />
    </section>

    <section class="w-full px-6 py-20 bg-gray-50 border-y border-gray-100">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center">
          {{ page.outcomes.heading[0] }} <span class="text-indigo-600">{{ page.outcomes.heading[1] }}</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">{{ page.outcomes.intro }}</p>
        <ul class="mt-12 mb-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <li v-for="item in page.outcomes.items" :key="item.label" class="m-0 rounded-xl bg-white border border-gray-200 p-7 flex flex-col gap-3">
            <UIcon :name="item.icon" class="w-7 h-7 text-indigo-500" />
            <h3 class="mt-3 mb-0 text-4xl font-semibold text-gray-900">{{ item.label }}</h3>
            <p class="m-0 text-lg font-medium leading-snug text-indigo-600">{{ item.title }}</p>
            <p class="m-0 text-sm leading-relaxed text-gray-500">{{ item.detail }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="w-full px-6 pt-20 pb-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center">
          {{ page.solutions.heading[0] }} <span class="text-indigo-600">{{ page.solutions.heading[1] }}</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">{{ page.solutions.intro }}</p>

        <div class="mt-20 md:max-w-screen-lg mx-auto">
          <div
              v-for="(card, i) in page.solutions.cards"
              :key="card.eyebrow"
              class="flex flex-col md:flex-row gap-8 items-center mb-14 md:mb-20 last:mb-0"
              :class="{ 'md:flex-row-reverse': i % 2 === 1 }"
          >
            <div class="w-full max-w-[500px] md:max-w-none md:w-[45%] max-md:mt-5">
              <div class="relative aspect-[430/289]">
                <div
                    class="absolute -top-5 w-full h-full rounded-lg bg-gradient-to-tl"
                    :class="[FRAME_VARIANTS[i % 2].backdrop, i % 2 === 0 ? '-left-5' : '-right-5']"
                    aria-hidden="true"
                />
                <div
                    class="absolute inset-0 rounded-lg border-2 overflow-hidden bg-white"
                    :class="FRAME_VARIANTS[i % 2].border"
                >
                  <img
                      :src="card.image.src"
                      :alt="card.image.alt"
                      loading="lazy"
                      class="w-full h-full"
                      :class="card.image.fit === 'contain' ? 'object-contain p-3' : 'object-cover object-top'"
                  >
                </div>
              </div>
            </div>
            <div class="md:w-[55%] flex flex-col gap-3 max-md:text-center">
              <p class="m-0 text-sm font-semibold uppercase tracking-wide text-indigo-600">{{ card.eyebrow }}</p>
              <h3 class="m-0 text-3xl font-medium text-gray-700">{{ card.title }}</h3>
              <p class="m-0 text-gray-500">{{ card.description }}</p>
              <ul class="mt-2 mb-0 p-0 list-none flex flex-col gap-2.5 max-md:text-left">
                <li v-for="point in card.points" :key="point" class="m-0 flex items-start gap-2.5 text-gray-600">
                  <UIcon name="i-lucide-check" class="w-5 h-5 mt-0.5 shrink-0 text-indigo-600" />
                  <span>{{ point }}</span>
                </li>
              </ul>
              <NuxtLink :to="card.link.to" class="mt-2 flex items-center gap-1.5 text-blue-600 hover:underline max-md:justify-center">
                {{ card.link.label }}
                <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="team-gradient w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center">
          {{ page.support.heading[0] }} <span class="text-indigo-600">{{ page.support.heading[1] }}</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">{{ page.support.intro }}</p>
        <ul class="mt-12 mb-0 p-0 list-none grid md:grid-cols-3 gap-6">
          <li v-for="item in page.support.items" :key="item.title" class="m-0 rounded-xl bg-white border border-indigo-100 p-7 flex flex-col gap-3">
            <span class="w-11 h-11 rounded-lg bg-indigo-600 inline-flex items-center justify-center">
              <UIcon :name="item.icon" class="w-5 h-5 text-white" />
            </span>
            <h3 class="mt-2 mb-0 text-xl font-medium text-gray-800">{{ item.title }}</h3>
            <p class="m-0 text-gray-600">
              <template v-if="item.descriptionLinks">
                <template v-for="(part, index) in item.descriptionLinks" :key="index">
                  <a v-if="part.href" :href="part.href" class="text-indigo-600 hover:underline">{{ part.text }}</a><template v-else>{{ part.text }}</template>
                </template>
              </template>
              <template v-else>{{ item.description }}</template>
            </p>
          </li>
        </ul>
      </div>
    </section>

    <section class="w-full px-6 py-20">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="max-w-3xl max-md:text-center">
          {{ page.proof.heading[0] }} <span class="text-indigo-600">{{ page.proof.heading[1] }}</span>
        </h2>
        <p class="mt-4 mb-0 max-w-3xl text-gray-600 max-md:text-center">{{ page.proof.intro }}</p>
        <ul class="mt-12 mb-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <li v-for="item in page.proof.items" :key="item.number" class="m-0 rounded-lg bg-red-50/70 px-6 pt-6 pb-5 flex flex-col gap-3">
            <p class="m-0 text-4xl leading-tight font-semibold text-red-400">{{ item.number }}</p>
            <p class="m-0 flex-1 text-gray-700 leading-6">{{ item.text }}</p>
          </li>
        </ul>
        <NuxtLink to="/customer-stories/" class="mt-10 inline-flex items-center gap-1.5 text-blue-600 hover:underline">
          Read our customer stories
          <UIcon name="i-heroicons-arrow-long-right" class="w-6 h-6 shrink-0" />
        </NuxtLink>
      </div>
    </section>

    <section class="w-full px-6 pt-10 pb-10">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">{{ page.faq.heading[0] }} <span class="text-indigo-600">{{ page.faq.heading[1] }}</span></h2>
        <Faq :faq="page.faq.items" />
      </div>
    </section>

    <section class="w-full px-6 pb-20">
      <div class="max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
          <h2 class="m-0 text-white text-3xl md:text-5xl font-medium">{{ page.cta.heading }}</h2>
          <p class="m-0 text-indigo-50 font-light text-xl max-w-2xl">{{ page.cta.body }}</p>
          <div class="flex gap-4 items-center justify-center flex-wrap">
            <template v-for="button in page.cta.buttons" :key="button">
              <CtaBookDemo v-if="button === 'bookDemo'" variant="highlight" position="final-cta" />
              <CtaSignUp v-else variant="ghost" color="white" position="final-cta" icon="i-lucide-arrow-right" />
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.team-gradient {
    background: linear-gradient(100deg, var(--color-indigo-50) 0%, white 50%, color-mix(in oklab, var(--color-red-50) 70%, white) 100%);
}
</style>
