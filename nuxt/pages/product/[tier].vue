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
        to: `/product/${t.tierId}/`,
    })))

useSeoMeta({
    title: tier.value.label,
    description: tier.value.metaDescription,
    ogUrl: `https://flowfuse.com/product/${tierId}/`,
    twitterSite: '@FlowFuseinc',
})

const capture = useCapture()
</script>

<template>
  <div class="w-full px-6">
    <div class="max-w-screen-lg mx-auto pt-12 pb-16">
      <!-- Hero -->
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div class="mb-4">
            <span class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-gray-800">
              <span class="font-medium">{{ tier.eyebrow }}</span>
            </span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-medium">{{ tier.headingLead }} <span class="text-indigo-600">{{ tier.headingHighlight }}</span></h1>
          <p class="mt-6 text-lg text-gray-500" v-html="tier.description" />
          <div class="mt-8 flex flex-row flex-wrap gap-4 items-center">
            <CtaBookDemo variant="highlight" :position="`${tierId}-hero`" />
            <a class="ff-btn group flex flex-col" href="/pricing/" @click="capture('cta-pricing', { position: `${tierId}-hero` })">
              <span class="flex items-center justify-center gap-2 text-base uppercase text-indigo-600 hover:text-indigo-800">
                <span>VIEW PRICING</span>
                <IconsArrowRightIcon class="w-5 h-5" />
              </span>
            </a>
          </div>
        </div>
        <div class="rounded-lg shadow-2xl border-2 border-indigo-100 overflow-hidden">
          <img :src="tier.heroImage.src" :alt="tier.heroImage.alt" class="w-full h-full object-cover" loading="eager">
        </div>
      </div>

      <!-- Quote -->
      <figure class="mt-16 border-l-4 border-indigo-100 pl-6">
        <blockquote class="text-xl md:text-2xl font-light text-gray-700 m-0">
          "{{ tier.quote.text }}"
        </blockquote>
        <figcaption class="mt-4 text-sm text-gray-500">
          <span class="font-semibold text-gray-700">{{ tier.quote.author }}</span> · {{ tier.quote.role }}
        </figcaption>
      </figure>

      <!-- Fit -->
      <div class="mt-16 grid md:grid-cols-2 gap-6">
        <div class="rounded-lg bg-indigo-50/50 border border-indigo-100 p-6">
          <h3 class="text-lg font-semibold m-0 mb-3">{{ tier.label }} is ideal for you if:</h3>
          <ul class="m-0 p-0 flex flex-col gap-3">
            <li v-for="(item, i) in tier.fitYes" :key="i" class="flex items-start gap-2">
              <UIcon name="i-lucide-check" class="size-5 shrink-0 mt-0.5 text-indigo-600" />
              <span v-html="item" />
            </li>
          </ul>
        </div>
        <div class="rounded-lg bg-gray-50 border border-gray-200 p-6">
          <h3 class="text-lg font-semibold m-0 mb-3">Don't pick {{ tier.label }} if:</h3>
          <ul class="m-0 p-0 flex flex-col gap-3">
            <li v-for="(item, i) in tier.fitNo" :key="i" class="flex items-start gap-2">
              <UIcon name="i-lucide-x" class="size-5 shrink-0 mt-0.5 text-gray-400" />
              <span v-html="item" />
            </li>
          </ul>
        </div>
      </div>

      <!-- What's included -->
      <div class="mt-16">
        <h2 class="mb-3">What's Included in <span class="text-indigo-600">{{ tier.label }}</span></h2>
        <p class="text-gray-500 max-w-3xl mb-8">Every {{ tier.label }} deployment includes the core FlowFuse platform capabilities — governance, hosting, DevOps, security — plus these capabilities on top.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="group in tier.included" :key="group.title" class="rounded-lg border border-gray-200 p-6">
            <h3 class="text-lg font-semibold m-0 text-indigo-600">{{ group.title }}</h3>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="chip in group.chips" :key="chip" class="inline-flex items-center py-1.5 px-3 border border-gray-200 rounded-full text-sm font-medium text-gray-700 bg-white">{{ chip }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Certified Nodes -->
      <CertifiedNodes v-if="tier.certifiedDefault" class="mt-20" :default-tier="tier.certifiedDefault" />

      <!-- Not sure -->
      <div class="mt-20">
        <h2 class="mb-6">Not sure {{ tier.label }} is the right fit?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink v-for="product in otherProducts" :key="product.to" :to="product.to" class="rounded-lg bg-gradient-to-br from-indigo-50/50 to-red-50/50 p-6 block hover:no-underline">
            <div class="text-sm font-semibold uppercase tracking-wide text-red-300">{{ product.eyebrow }}</div>
            <h3 class="text-2xl font-medium mt-2 mb-1">{{ product.title }}</h3>
            <p class="text-gray-500 m-0">{{ product.description }} <span class="text-indigo-600">Learn more &rarr;</span></p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="max-w-screen-lg mx-auto py-20">
      <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-8 text-center ff-get-started-bg">
        <p class="text-white text-3xl sm:text-4xl font-medium m-0 max-w-2xl">Join hundreds of global organisations building, governing, and deploying operational applications.</p>
        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <CtaBookDemo variant="highlight" :position="`${tierId}-final`" />
          <CtaSignUp variant="ghost" color="white" icon="i-lucide-arrow-right" :position="`${tierId}-final`" />
        </div>
      </div>
    </div>
  </div>
</template>
