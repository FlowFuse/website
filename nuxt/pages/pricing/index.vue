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
        <h1 class="text-center mb-16"><span class="text-indigo-600">FlowFuse</span> Pricing</h1>
        <UPricingPlans>
        <UPricingPlan v-for="plan in plans" :key="plan.id" v-bind="plan" :ui="{ button: 'text-base font-bold', featureTitle: 'whitespace-normal overflow-visible text-clip' }" />
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
        />
        
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