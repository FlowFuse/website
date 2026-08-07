<script setup lang="ts">
useSeoMeta({
    title: 'Thank you for contacting us',
    description: 'Or get inspired by our customer success stories while you wait for someone from our team to reach out to you.',
})
</script>

<template>
  <div>
    <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
      <div class="mx-auto max-w-screen-xl md:max-w-xl">
        <h1>Thank you for contacting us</h1>
        <h4 class="text-gray-500">
          <a href="https://meetings-eu1.hubspot.com/flowfuse/book-a-demo-call?uuid=22122d0b-0581-44fb-ab2c-4ae4ff8dc4f5" class="underline">Schedule a call right now</a>
        </h4>
        <p class="lead-p m-auto mt-3">
          Or get inspired by our customer success stories while you wait for someone from our team to reach out to you.
        </p>
      </div>
    </div>
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
