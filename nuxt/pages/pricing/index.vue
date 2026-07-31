<script setup lang="ts">
const { data: plans } = await useAsyncData('plans', () => queryCollection('plans').order('order', 'ASC').all())
const { data: featureCatalog } = await useAsyncData('featureCatalog', () => queryCollection('featureCatalog').first())
const { data: faq } = await useAsyncData('faq-pricing', () => queryCollection('faq').where('page', '=', 'pricing').first())

const tableTiers = computed(() => (plans.value ?? []).map(p => ({
  id: p.tierId,
  title: p.title,
  highlight: p.highlight,
  button: p.button,
  bestFitFor: p.bestFitFor,
})))

const faqAccordionItems = computed(() => (faq.value?.items ?? []).map(item => ({
  label: item.question,
  content: item.answer,
})))

// The comparison table should only show features that differ between tiers.
// Features shared by every tier don't belong in a comparison — they're listed
// separately below as a plain "core features" dump, grouped by their original
// category so ~37 shared features don't read as one undifferentiated list.
const comparisonSections = computed(() => (featureCatalog.value?.sections ?? [])
  .map(section => ({ ...section, features: section.features.filter(f => f.tiers.edge !== f.tiers.hub) }))
  .filter(section => section.features.length > 0))

const coreFeatureSections = computed(() => (featureCatalog.value?.sections ?? [])
  .map(section => ({ ...section, features: section.features.filter(f => f.tiers.edge === f.tiers.hub) }))
  .filter(section => section.features.length > 0))

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
        <p class="text-center text-lg max-w-2xl mx-auto mb-16">Whether you’re connecting one plant or standardizing across hundreds of business systems, FlowFuse scales with you. Pick the package that works for you and the work you do.</p>
        <UPricingPlans>
        <UPricingPlan v-for="plan in plans" :key="plan.id" v-bind="plan" :ui="{ root: 'bg-radial-[at_bottom_right] from-indigo-50 to-white', button: 'text-base font-bold', featureTitle: 'whitespace-normal overflow-visible text-clip', titleWrapper: 'mb-4' }" />
        </UPricingPlans>
        <USeparator class="mt-16" />
        <SocialProof class="mt-16" />

        <CertifiedNodes />

        <h2 class="text-center mt-28 mb-10"><span class="text-indigo-600">FlowFuse</span> Comparison</h2>
        <UPricingTable
        v-if="featureCatalog"
        class="mt-16"
        :tiers="tableTiers"
        :sections="comparisonSections"
        :ui="{
            tier: 'border-x border-t border-b border-default rounded-t-lg bg-radial-[at_bottom_right] from-indigo-50 to-white',
            td: 'border-x border-default',
            th: 'px-6 border-l border-default',
            tr: '*:py-4',
            tbody: '[&>tr[data-slot]]:bg-indigo-50/50 [&>tr:first-child>th]:border-t [&>tr:first-child>th]:border-default [&>tr:first-child>th]:rounded-t-lg [&>tr:last-child>th]:rounded-b-lg [&>tr:last-child>td]:rounded-b-lg',
            tierWrapper: 'items-center text-center',
            tierTitleWrapper: 'justify-center',
            tierDescription: 'w-full',
            tierPriceWrapper: 'hidden',
            tierButton: 'w-full',
        }"
        >
        <template #tier-button="{ tier }">
            <UButton v-if="tier.button" block size="lg" v-bind="tier.button" class="text-base font-bold" />
        </template>
        <template #tier-description="{ tier }">
            <div v-if="tier.bestFitFor?.length" class="w-full mt-4 text-left">
                <p class="text-sm font-semibold text-gray-900">Best Fit For:</p>
                <ul class="mt-1.5 flex flex-col gap-1.5 text-sm text-gray-600">
                    <li v-for="fit in tier.bestFitFor" :key="fit" class="flex items-start gap-1.5">
                        <UIcon name="i-lucide-check" class="size-4 shrink-0 mt-0.5 text-indigo-600" />
                        <span>{{ fit }}</span>
                    </li>
                </ul>
            </div>
        </template>
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

        <div v-if="coreFeatureSections.length" class="mt-28">
        <h2 class="text-center mb-2"><span class="text-indigo-600">FlowFuse</span> Core Features</h2>
        <p class="text-center text-gray-500 mb-10">Included in every FlowFuse plan</p>
        <div class="max-w-4xl mx-auto space-y-8">
            <div v-for="section in coreFeatureSections" :key="section.id">
                <h3 class="font-semibold text-sm text-gray-900 mb-3">{{ section.title }}</h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                    <li v-for="feature in section.features" :key="feature.id" class="flex items-center gap-2">
                        <UIcon name="i-lucide-check" class="size-4 shrink-0 text-indigo-600" />
                        <span class="text-sm text-gray-700">{{ feature.title }}</span>
                    </li>
                </ul>
            </div>
        </div>
        </div>

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