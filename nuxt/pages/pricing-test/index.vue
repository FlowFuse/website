<script setup lang="ts">
const { data: plans } = await useAsyncData('plans', () => queryCollection('plans').all())
</script>

<template>
  <div class="max-w-5xl mx-auto py-16 px-4">
    <h1 class="text-3xl font-bold text-center mb-10">Pricing (test)</h1>
    <UPricingPlans>
      <UPricingPlan v-for="plan in plans" :key="plan.id" v-bind="plan" />
    </UPricingPlans>
  </div>
</template>