<script setup lang="ts">
const { data: plans } = await useAsyncData('plans', () => queryCollection('plans').order('order', 'ASC').all())
const { data: featureCatalog } = await useAsyncData('featureCatalog', () => queryCollection('featureCatalog').first())

const tableTiers = computed(() => (plans.value ?? []).map(p => ({
  id: p.tierId,
  title: p.title,
  highlight: p.highlight,
})))
</script>

<template>
  <div class="max-w-5xl mx-auto py-16 px-4">
    <h1 class="text-3xl font-bold text-center mb-10"><span class="text-indigo-600">FlowFuse</span> Pricing</h1>
    <UPricingPlans>
      <UPricingPlan v-for="plan in plans" :key="plan.id" v-bind="plan" />
    </UPricingPlans>
    <SocialProof class="mt-16" />
    <h2 class="text-3xl font-bold text-center mt-28 mb-10"><span class="text-indigo-600">FlowFuse</span> Comparison</h2>
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
  </div>
</template>