<script setup>
// Reproduces layouts/abm-landing.njk: hero + value bullets, problem, solution
// benefits, testimonials + social proof, use cases, 3-step how, features grid,
// and CTA. Icon names are bare.
const SIGNUP = 'https://app.flowfuse.com/account/create'
defineProps({
    heroTitle: { type: String, required: true },
    description: { type: String, default: '' },
    values: { type: Array, default: () => [] },
    hero: { type: Object, required: true },
    image: { type: String, default: '' },
    imageDescription: { type: String, default: '' },
    problem: { type: Object, required: true },
    solution: { type: Object, required: true },
    testimonialsTitle: { type: String, default: '' },
    useCases: { type: Object, required: true },
    how: { type: Object, required: true },
    features: { type: Object, required: true },
    ctaSection: { type: Object, required: true },
})
</script>

<template>
  <div>
    <div class="w-full px-6">
      <div class="w-full py-12 md:pt-6">
        <div class="md:flex md:my-16 items-center md:flex-row md:justify-between container mx-auto max-md:text-center md:max-w-screen-lg gap-8 items-stretch">
          <div class="m-auto md:w-3/5">
            <h1 class="w-full mt-0 m-auto" v-html="heroTitle" />
            <div class="ff-prose prose my-10">
              <p v-html="description" />
              <ul class="list-disc text-left">
                <li v-for="(v, i) in values" :key="i">{{ v }}</li>
              </ul>
            </div>
            <div class="md:mt-3 gap-4 hidden md:flex md:flex-row md:items-start md:justify-start md:m-0">
              <a class="ff-btn ff-btn--primary text-base flex uppercase min-h-[40px]" :href="hero.buttonLink">{{ hero.buttonText }}</a>
              <a class="ff-btn uppercase text-base" :href="SIGNUP"><span class="flex gap-2 uppercase items-center text-indigo-600 hover:text-indigo-800">Start Free Trial <Icon name="arrow-right" /></span></a>
            </div>
          </div>
          <div class="md:w-2/5 flex-grow relative">
            <div class="ff-image-cover ff-image-rounded w-full h-full">
              <img :src="image" :alt="imageDescription" style="max-width:496px" />
            </div>
          </div>
          <div class="flex flex-col sm:flex-row md:hidden gap-3">
            <a class="ff-btn ff-btn--primary uppercase w-full m-auto mt-12" :href="hero.buttonLink">{{ hero.buttonText }}</a>
            <a class="ff-btn uppercase flex flex-col w-full m-auto sm:mt-12" :href="SIGNUP"><span class="flex gap-2 uppercase items-center text-indigo-600">Start Free Trial</span></a>
          </div>
        </div>
      </div>
      <div class="max-w-screen-lg mx-auto mb-4">
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="problem.title" />
        <p v-for="(p, i) in problem.description" :key="i" v-html="p" />
      </div>
    </div>

    <div class="w-full bg-indigo-50/50 py-16 my-16 px-6">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="solution.title" />
        <p v-html="solution.description" />
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-8 gap-y-14 mt-16">
          <div v-for="(b, i) in solution.benefits" :key="i" class="relative w-full max-md:max-w-md mx-auto">
            <div class="flex flex-col items-center sm:items-start">
              <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                <div class="w-8 h-8 m-auto sm:m-0 text-indigo-600"><Icon :name="b.icon" /></div>
                <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                  <h5 class="w-full md:m-0"><div class="text-xl font-medium text-gray-600 text-center sm:text-left">{{ b.title }}</div></h5>
                </div>
              </div>
              <div><p class="text-center sm:text-left font-light" v-html="b.description" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 pt-6">
      <div class="max-w-screen-lg mx-auto mb-4">
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="testimonialsTitle" />
        <div class="w-full mt-12 md:px-0"><div class="sm:max-w-screen-lg mx-auto"><Testimonials /></div></div>
        <div class="max-w-md sm:max-w-screen-lg m-auto my-10"><div class="mx-auto w-full"><SocialProof /></div></div>
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="useCases.title" />
        <div class="max-w-md sm:max-w-screen-lg m-auto my-10">
          <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div v-for="(item, i) in useCases.case" :key="i" class="bg-indigo-50 rounded-lg p-6 pb-2">
                <h5 class="mb-3">{{ item.title }}</h5>
                <p class="text-gray-600">{{ item.description }}</p>
              </div>
            </div>
            <div class="flex-grow relative hidden lg:block">
              <div class="ff-image-cover ff-image-rounded w-full h-full">
                <img :src="useCases.image" :alt="useCases.imgAlt" style="max-width:496px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full bg-indigo-50/50 py-16 my-16 px-6">
      <div class="md:max-w-screen-lg m-auto">
        <h2 class="text-center w-full md:text-left max-w-4xl" v-html="how.title" />
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-14 mt-16">
          <div v-for="(step, i) in how.steps" :key="i" class="relative w-full max-md:max-w-md mx-auto">
            <div class="flex flex-col items-center sm:items-start">
              <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                <h5 class="max-sm:text-center text-indigo-400">Step {{ i + 1 }}</h5>
                <div class="w-full mx-auto md:m-0"><h4 class="w-full md:m-0 text-gray-600 max-sm:text-center">{{ step.title }}</h4></div>
              </div>
              <div><p class="max-sm:text-center font-light" v-html="step.description" /></div>
            </div>
            <template v-if="i !== how.steps.length - 1">
              <div class="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-gray-500"><Icon name="chevron-right" /></div>
              <div class="sm:hidden absolute left-1/2 -translate-x-1/2 -bottom-7 text-gray-500"><Icon name="chevron-down" /></div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6">
      <div class="max-w-screen-lg mx-auto mb-4">
        <h2 class="text-center w-full md:text-left max-w-4xl mb-10" v-html="features.title" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(feature, i) in features.features" :key="i" class="flex items-center gap-3 p-4 border border-indigo-200 rounded-lg bg-white hover:border-indigo-300 transition-colors">
            <div class="flex-shrink-0 text-indigo-600 w-6"><Icon :name="feature.icon" /></div>
            <span class="text-gray-700">{{ feature.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 pt-10 pb-20">
      <div class="ff-blue-card max-md:max-w-xl md:max-w-screen-lg mx-auto max-sm:text-center pt-16 pb-10 text-lg flex-col flex-row items-center justify-center gap-1 flex-wrap">
        <h3 class="mb-6 w-full text-center">{{ ctaSection.title }}</h3>
        <p class="text-center">{{ ctaSection.description }}</p>
        <div class="flex max-sm:flex-col max-md:mx-auto gap-3 justify-center mt-8">
          <a class="ff-btn ff-btn--primary min-h-[40px] uppercase" :href="hero.buttonLink">{{ ctaSection.primaryCta }}</a>
          <a class="ff-btn ff-btn--primary-outlined min-h-[40px] uppercase" :href="SIGNUP">{{ ctaSection.secondaryCta }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
