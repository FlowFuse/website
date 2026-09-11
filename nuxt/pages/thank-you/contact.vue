<script setup lang="ts">
useSeoMeta({
    title: 'Thank you for contacting us',
    description: 'Or get inspired by our customer success stories while you wait for someone from our team to reach out to you.',
    robots: 'noindex',
})
</script>

<template>
  <div class="w-full">
    <PageHero
        title="Thank you for contacting us"
        description="Or get inspired by our customer success stories while you wait for someone from our team to reach out to you."
    >
      <template #subtitle>
        <a href="https://meetings-eu1.hubspot.com/flowfuse/book-a-demo-call?uuid=22122d0b-0581-44fb-ab2c-4ae4ff8dc4f5" class="underline">Schedule a call right now</a>
      </template>
    </PageHero>
    <div class="flex flex-col max-w-5xl mx-auto gap-x-10 px-6">
      <div class="max-w-md sm:max-w-screen-lg m-auto pb-6">
        <ThankYouExploreMore reading-resources="stories" hubspot-reference="thank-you-contact" />
      </div>
    </div>
    <div class="w-full max-w-md sm:max-w-screen-lg m-auto mt-6 px-6 border-t border-gray-200">
      <SocialProof />
    </div>
  </div>
</template>
