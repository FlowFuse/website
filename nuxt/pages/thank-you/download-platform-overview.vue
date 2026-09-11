<script setup lang="ts">
useSeoMeta({
    title: 'Thank you for your interest!',
    description: 'We\'ve also sent a copy to your inbox',
    robots: 'noindex',
})
</script>

<template>
  <div class="w-full">
    <PageHero title="Thank you for your interest!" description="We've also sent a copy to your inbox">
      <template #subtitle>
        <a href="https://26586079.fs1.hubspotusercontent-eu1.net/hubfs/26586079/FlowFuse%20Platform%20Overview-October%202024.pdf">Click here</a> to access the The FlowFuse Platform Overview
      </template>
    </PageHero>
    <div class="flex flex-col max-w-5xl mx-auto gap-x-10 px-6">
      <div class="max-w-md sm:max-w-screen-lg m-auto pb-6">
        <ThankYouExploreMore download-follow-up hubspot-reference="thank-you-flowfuse-overview" />
      </div>
    </div>
    <div class="w-full max-w-md sm:max-w-screen-lg m-auto mt-6 px-6 border-t border-gray-200">
      <SocialProof />
    </div>
  </div>
</template>
