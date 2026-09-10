<script setup lang="ts">
// layouts/abm-landing.njk. Four account-based-marketing landing pages shared it, all of
// them pure frontmatter, so the whole layout is this one component.
//
// The section glyphs were {% include %}d raw with no wrapper, so they resolve through
// <SiteArt>. testimonials.njk and social-proof.njk become <TestimonialCarousel> and
// <SocialProof>, both shared with the homepage.
import { renderRichText } from '../../lib/rich-text.mjs'

defineProps<{
    page: {
        heroTitle: string
        image: string
        imageDescription?: string
        seoMeta: { description?: string }
        values?: string[]
        problem?: { title: string, description: string[] }
        solution?: { title: string, description: string, benefits: Array<{ svgPath: string, title: string, description: string }> }
        testimonialsTitle?: string
        useCases?: { title: string, image: string, imgAlt: string, case: Array<{ title: string, description: string }> }
        how?: { title: string, steps: Array<{ title: string, description: string }> }
        features?: { title: string, features: Array<{ svgPath: string, title: string }> }
        ctaSection?: { title: string, description: string }
    }
}>()
</script>

<template>
  <div class="nohero w-full">
    <div class="w-full px-6">
      <div class="w-full py-12 md:pt-6">
        <div class="md:flex md:my-16 items-center md:flex-row md:justify-between container mx-auto max-md:text-center md:max-w-screen-lg gap-8 items-stretch">
          <div class="m-auto md:w-3/5">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <h1 class="w-full mt-0 m-auto" v-html="renderRichText(page.heroTitle)" />
            <div class="ff-prose prose my-10">
              <p>{{ page.seoMeta.description }}</p>
              <ul class="list-disc text-left">
                <li v-for="value in page.values" :key="value">{{ value }}</li>
              </ul>
            </div>
            <div class="md:mt-3 gap-4 hidden md:flex md:flex-row md:items-start md:justify-start md:m-0">
              <CtaBookDemo variant="primary" position="hero" class="inline min-h-[40px]" />
              <CtaSignUp variant="ghost" position="hero" icon class="inline" />
            </div>
          </div>
          <div class="md:w-2/5 flex-grow relative">
            <div class="ff-image-cover ff-image-rounded w-full h-full">
              <img :src="page.image" :alt="page.imageDescription" width="496" class="w-full h-auto">
            </div>
          </div>
          <div class="flex flex-col sm:flex-row md:hidden gap-3">
            <CtaBookDemo variant="primary" position="hero-mobile" class="w-full mt-12 min-h-[40px]" />
            <CtaSignUp variant="ghost" position="hero-mobile" icon class="flex flex-col w-full m-auto sm:mt-12" />
          </div>
        </div>
      </div>
      <div v-if="page.problem" class="max-w-screen-lg mx-auto mb-4">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="renderRichText(page.problem.title)" />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-for="(paragraph, i) in page.problem.description" :key="i" v-html="renderRichText(paragraph)" />
      </div>
    </div>

    <div v-if="page.solution" class="w-full bg-indigo-50/50 py-16 my-16 px-6">
      <div class="md:max-w-screen-lg m-auto">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="renderRichText(page.solution.title)" />
        <p>{{ page.solution.description }}</p>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-8 gap-y-14 mt-16">
          <div v-for="benefit in page.solution.benefits" :key="benefit.title" class="relative w-full max-md:max-w-md mx-auto">
            <div class="flex flex-col items-center sm:items-start">
              <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                <div class="w-8 h-8 m-auto sm:m-0 text-indigo-600"><SiteArt :name="benefit.svgPath" /></div>
                <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                  <h5 class="w-full md:m-0">
                    <div class="text-xl font-medium text-gray-600 text-center sm:text-left">{{ benefit.title }}</div>
                  </h5>
                </div>
              </div>
              <div>
                <p class="text-center sm:text-left font-light">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 pt-6">
      <div class="max-w-screen-lg mx-auto mb-4">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="renderRichText(page.testimonialsTitle)" />
        <div class="w-full mt-12 md:px-0">
          <div class="sm:max-w-screen-lg mx-auto">
            <TestimonialCarousel />
          </div>
        </div>
        <div class="max-w-md sm:max-w-screen-lg m-auto my-10">
          <div class="mx-auto w-full">
            <SocialProof />
          </div>
        </div>
        <template v-if="page.useCases">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 class="text-center w-full md:text-left max-w-4xl" v-html="renderRichText(page.useCases.title)" />
          <div class="max-w-md sm:max-w-screen-lg m-auto my-10">
            <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div v-for="item in page.useCases.case" :key="item.title" class="bg-indigo-50 rounded-lg p-6 pb-2">
                  <h5 class="mb-3">{{ item.title }}</h5>
                  <p class="text-gray-600">{{ item.description }}</p>
                </div>
              </div>
              <div class="flex-grow relative hidden lg:block">
                <div class="ff-image-cover ff-image-rounded w-full h-full">
                  <img :src="page.useCases.image" :alt="page.useCases.imgAlt" width="496" class="w-full h-auto">
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div v-if="page.how" class="w-full bg-indigo-50/50 py-16 my-16 px-6">
      <div class="md:max-w-screen-lg m-auto">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="renderRichText(page.how.title)" />
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-14 mt-16">
          <div v-for="(step, i) in page.how.steps" :key="step.title" class="relative w-full max-md:max-w-md mx-auto">
            <div class="flex flex-col items-center sm:items-start">
              <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                <h5 class="max-sm:text-center text-indigo-400">Step {{ i + 1 }}</h5>
                <div class="w-full mx-auto md:m-0">
                  <h4 class="w-full md:m-0 text-gray-600 max-sm:text-center">{{ step.title }}</h4>
                </div>
              </div>
              <div>
                <p class="max-sm:text-center font-light">{{ step.description }}</p>
              </div>
            </div>
            <template v-if="i < page.how.steps.length - 1">
              <div class="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-gray-500">
                <SiteArt name="chevron-right" />
              </div>
              <div class="sm:hidden absolute left-1/2 -translate-x-1/2 -bottom-7 text-gray-500">
                <SiteArt name="chevron-down" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="page.features" class="w-full px-6">
      <div class="max-w-screen-lg mx-auto mb-4">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 class="text-center w-full md:text-left max-w-4xl mb-10" v-html="renderRichText(page.features.title)" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
              v-for="feature in page.features.features"
              :key="feature.title"
              class="flex items-center gap-3 p-4 border border-indigo-200 rounded-lg bg-white hover:border-indigo-300 transition-colors"
          >
            <div class="flex-shrink-0 text-indigo-600 w-6"><SiteArt :name="feature.svgPath" /></div>
            <span class="text-gray-700">{{ feature.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="page.ctaSection" class="w-full px-6 pt-10 pb-20">
      <div class="ff-blue-card max-md:max-w-xl md:max-w-screen-lg mx-auto max-sm:text-center pt-16 pb-10 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap">
        <h3 class="mb-6 w-full text-center">{{ page.ctaSection.title }}</h3>
        <p class="text-center">{{ page.ctaSection.description }}</p>
        <div class="flex max-sm:flex-col max-md:mx-auto gap-3 justify-center mt-8">
          <CtaBookDemo variant="primary" position="secondary" class="min-h-[40px]" />
          <CtaSignUp variant="primary-outlined" position="secondary" class="min-h-[40px]" />
        </div>
      </div>
    </div>
  </div>
</template>
