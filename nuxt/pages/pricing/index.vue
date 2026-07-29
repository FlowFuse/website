<script setup lang="ts">
const { data: plans } = await useAsyncData('plans', () => queryCollection('plans').order('order', 'ASC').all())
const { data: featureCatalog } = await useAsyncData('featureCatalog', () => queryCollection('featureCatalog').first())
const { data: faq } = await useAsyncData('faq-pricing', () => queryCollection('faq').where('page', '=', 'pricing').first())

const tableTiers = computed(() => (plans.value ?? []).map(p => ({
  id: p.tierId,
  title: p.title,
  highlight: p.highlight,
})))

const faqAccordionItems = computed(() => (faq.value?.items ?? []).map(item => ({
  label: item.question,
  content: item.answer,
})))

// UPricingTable's feature-title slot types `feature` without `description`,
// even though the featureCatalog content schema does define it.
interface CatalogFeature {
  title: string
  description?: string
}
function featureDescription (feature: CatalogFeature) {
  return feature.description
}

useSchemaOrg([
  defineWebPage({ '@type': 'FAQPage' }),
  ...(faq.value?.items ?? []).map(item => defineQuestion({
    question: item.question,
    answer: item.answer,
  })),
])
</script>

<template>
  <div class="w-full px-6">
    <div class="max-w-5xl mx-auto py-16 px-4">
        <h1 class="text-center"><span class="text-indigo-600">FlowFuse</span> Pricing</h1>
        <h2 class="text-center text-gray-500 text-2xl -mt-3 mb-10">Choose the package that fits your team</h2>
        <p class="text-center text-lg max-w-2xl mx-auto mb-16">Machines on the shop floor, scaling to more plants? Or business systems and data sources to bring under governance? There’s a FlowFuse package for both.</p>
        <UPricingPlans>
        <UPricingPlan v-for="plan in plans" :key="plan.id" v-bind="plan" :ui="{ button: 'text-base font-bold', featureTitle: 'whitespace-normal overflow-visible text-clip', titleWrapper: 'mb-4' }" />
        </UPricingPlans>
        <SocialProof class="mt-16" />

        <CertifiedNodes />

        <h2 class="text-center mt-28 mb-10"><span class="text-indigo-600">FlowFuse</span> Comparison</h2>
        <UPricingTable
        v-if="featureCatalog"
        class="mt-16"
        :tiers="tableTiers"
        :sections="featureCatalog.sections"
        :ui="{
            tierWrapper: 'items-center text-center',
            tierTitleWrapper: 'justify-center',
            tierDescription: 'hidden',
            tierPriceWrapper: 'hidden',
        }"
        >
        <template #feature-title="{ feature }">
            <UPopover v-if="featureDescription(feature)" :content="{ side: 'top' }">
                <button type="button" class="inline-flex items-center gap-1 text-left hover:text-indigo-600">
                    <span>{{ feature.title }}</span>
                    <UIcon name="i-lucide-info" class="size-3.5 shrink-0 text-gray-500" />
                </button>
                <template #content>
                    <p class="max-w-xs p-3 text-sm text-gray-600">{{ featureDescription(feature) }}</p>
                </template>
            </UPopover>
            <span v-else>{{ feature.title }}</span>
        </template>
        </UPricingTable>

        <div v-if="faq" class="mt-28 mx-auto">
        <h2 class="text-center mb-10" v-html="faq.title" />
        <UAccordion :items="faqAccordionItems">
            <template #body="{ item }">
            <div v-html="item.content" />
            </template>
        </UAccordion>
        </div>
    </div>
  </div>
</template>