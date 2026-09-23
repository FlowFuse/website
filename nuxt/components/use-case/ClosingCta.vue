<script setup lang="ts">
// The closing CTA band that layouts/use-case.njk and src/use-cases.njk both ended on.
// The markup and the sign-up button are identical; they differ only in the lead CTA
// (the layout asks for a demo, the listing asks for contact), so that stays a prop
// rather than being flattened to one of the two.
withDefaults(defineProps<{
    heading?: string
    description?: string
    lead?: 'book-demo' | 'contact-us'
}>(), {
    heading: 'See it on your operations',
    description: 'Talk to an expert, or get started with FlowFuse today.',
    lead: 'book-demo',
})
</script>

<template>
  <div class="w-full px-6 py-20">
    <div class="ff-blue-card max-md:max-w-xl md:max-w-screen-lg mx-auto pt-12 pb-10 text-center">
      <h3 class="mb-4 w-full text-center">{{ heading }}</h3>
      <p class="text-gray-600 mb-8 max-w-xl mx-auto text-center">{{ description }}</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <CtaBookDemo v-if="lead === 'book-demo'" variant="highlight" position="footer" class="min-h-[40px]" />
        <CtaContactUs v-else variant="highlight" position="footer" class="min-h-[40px]" />
        <CtaSignUp variant="primary-outlined" position="footer" class="min-h-[40px]" />
      </div>
    </div>
  </div>
</template>
