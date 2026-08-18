<script setup lang="ts">
const route = useRoute()
const tierId = route.params.tier as string

const { data: tier } = await useAsyncData(`product-${tierId}`, () =>
    queryCollection('products').where('tierId', '=', tierId).first()
)

if (!tier.value) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const { data: allProducts } = await useAsyncData('products-all', () =>
    queryCollection('products').all()
)

const otherProducts = computed(() => (allProducts.value ?? [])
    .filter(t => t.tierId !== tierId)
    .map(t => ({
        eyebrow: t.crossLinkEyebrow,
        title: t.label,
        description: t.crossLinkDescription,
        image: t.heroImage,
        to: `/product/${t.tierId}/`,
    })))

useSeoMeta({
    title: tier.value.label,
    description: tier.value.metaDescription,
    ogUrl: `https://flowfuse.com/product/${tierId}/`,
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full px-6">
    <div class="max-w-screen-lg mx-auto pt-12">
      <!-- Hero -->
      <div class="grid md:grid-cols-2 gap-12 items-stretch">
        <div class="text-center md:text-left">
          <div class="mb-4 flex justify-center md:justify-start">
            <span class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-gray-800">
              <span class="font-medium">{{ tier.eyebrow }}</span>
            </span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-medium">{{ tier.headingLead }} <span class="text-red-600">{{ tier.headingHighlight }}</span></h1>
          <p class="mt-6 text-lg max-w-xl mx-auto md:mx-0" v-html="tier.description" />
          <div class="mt-8 flex flex-row flex-wrap gap-4 items-center justify-center md:justify-start">
            <CtaBookDemo variant="highlight" :position="`${tierId}-hero`" />
            <CtaPricing variant="ghost" :position="`${tierId}-hero`" icon="i-lucide-arrow-right" />
          </div>
        </div>
        <div class="rounded-lg shadow-2xl border-2 border-red-100 overflow-hidden">
          <img :src="tier.heroImage.src" :alt="tier.heroImage.alt" class="w-full h-full object-cover" loading="eager">
        </div>
      </div>

      <!-- Quote -->
      <figure class="mt-24 border-l-4 border-red-100 pl-6">
        <blockquote class="font-normal italic text-2xl m-0">
          "{{ tier.quote.text }}"
        </blockquote>
        <figcaption class="mt-4 flex items-center gap-3 text-sm text-gray-500">
          <span v-if="tier.quote.avatar" class="w-14 h-14 rounded-full bg-red-200 border-2 border-white shadow-md overflow-hidden shrink-0">
            <img :src="tier.quote.avatar" :alt="tier.quote.author" class="w-full h-full object-cover">
          </span>
          <span>
            <span class="font-semibold text-gray-700">{{ tier.quote.author }}</span> · {{ tier.quote.role }}
          </span>
        </figcaption>
      </figure>

      <!-- Fit -->
      <div class="mt-24 grid md:grid-cols-2 gap-6">
        <div class="rounded-lg bg-gradient-to-br to-indigo-50/50 from-red-50/50 border border-red-50 p-8">
          <h3 class="text-lg font-semibold m-0 mb-8 text-center md:text-left">{{ tier.label }} is ideal for you if:</h3>
          <ul class="m-0 p-0 flex flex-col gap-6">
            <li v-for="(item, i) in tier.fitYes" :key="i" class="flex items-start gap-2 font-light text-gray-700">
              <UIcon name="i-lucide-check" class="size-5 shrink-0 mt-0.5 text-red-600" />
              <span v-html="item" />
            </li>
          </ul>
        </div>
        <div class="rounded-lg bg-gray-50 border border-gray-200 p-8">
          <h3 class="text-lg font-semibold m-0 mb-8 text-center md:text-left">Don't pick {{ tier.label }} if:</h3>
          <ul class="m-0 p-0 flex flex-col gap-6">
            <li v-for="(item, i) in tier.fitNo" :key="i" class="flex items-start gap-2 font-light text-gray-700">
              <UIcon name="i-lucide-x" class="size-5 shrink-0 mt-0.5 text-gray-400" />
              <span v-html="item" />
            </li>
          </ul>
        </div>
      </div>

      <!-- What's included -->
      <div class="mt-24">
        <div class="text-center md:text-left">
          <h2 class="mb-3">What's Included in <span class="text-indigo-600">{{ tier.label }}</span></h2>
          <p class="max-w-3xl mx-auto md:mx-0 mb-8">Every {{ tier.label }} deployment includes the core FlowFuse platform capabilities (governance, hosting, DevOps, security) plus these capabilities on top.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="group in tier.included" :key="group.title" class="rounded-lg border border-indigo-200 p-6">
            <h3 class="text-lg font-semibold m-0 text-indigo-600 text-center md:text-left">{{ group.title }}</h3>
            <div class="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <template v-for="chip in group.chips" :key="typeof chip === 'string' ? chip : chip.label">
                <NuxtLink
                  v-if="typeof chip !== 'string'"
                  :to="chip.href"
                  class="inline-flex items-center gap-1 py-1.5 px-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 bg-white no-underline hover:no-underline transition-colors duration-150 after:text-indigo-300 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 hover:after:text-indigo-600"
                >{{ chip.label }}</NuxtLink>
                <span
                  v-else
                  class="inline-flex items-center py-1.5 px-3 rounded-full border border-gray-200 text-sm font-regular bg-gray-50"
                >{{ chip }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Certified Nodes -->
      <CertifiedNodes v-if="tier.certifiedDefault" class="mt-20" :default-tier="tier.certifiedDefault" />

      <!-- Not sure -->
      <div class="mt-24">
        <h2 class="mb-6 text-center md:text-left">Not sure {{ tier.label }} is the right fit?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink v-for="product in otherProducts" :key="product.to" :to="product.to" class="group rounded-lg border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/50 flex flex-col sm:flex-row gap-4 hover:no-underline">
            <div class="ff-image-cover scale w-full h-40 sm:w-36 sm:h-auto shrink-0 sm:self-stretch rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
              <img :src="product.image.src" :alt="product.image.alt" loading="eager">
            </div>
            <div class="px-6 pb-6 sm:px-0 sm:py-6 sm:pr-6 text-center sm:text-left">
              <div class="text-sm font-semibold uppercase tracking-wide text-red-300">{{ product.eyebrow }}</div>
              <h3 class="text-2xl font-medium mt-2 mb-1">{{ product.title }}</h3>
              <p class="m-0">{{ product.description }}</p>
              <span class="mt-4 block text-indigo-600 group-hover:underline">See if {{ product.title }} fits better &rarr;</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="max-w-screen-lg mx-auto py-24">
      <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
        <h2 class="text-white font-medium m-0 max-w-2xl">Join hundreds of global organizations building, governing, and deploying operational applications.</h2>
        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <CtaBookDemo variant="highlight" :position="`${tierId}-final`" />
          <CtaSignUp variant="ghost" color="white" icon="i-lucide-arrow-right" :position="`${tierId}-final`" />
        </div>
      </div>
    </div>
  </div>
</template>
