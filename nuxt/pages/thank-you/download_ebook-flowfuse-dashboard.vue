<script setup lang="ts">
useSeoMeta({
    title: 'Thank you!',
    description: 'We\'ve also sent a copy to your inbox',
    robots: 'noindex',
})
</script>

<template>
  <div class="w-full">
    <PageHero title="Thank you!" description="We've also sent a copy to your inbox">
      <template #subtitle>
        <a href="https://26586079.fs1.hubspotusercontent-eu1.net/hubfs/26586079/eBook_%20Ultimate%20Guide%20to%20Building%20Applications%20with%20FlowFuse%20Dashboard%20for%20Node-RED.pdf">Click here</a> to access The Ultimate Guide to Building Applications with FlowFuse Dashboard for Node-RED
      </template>
    </PageHero>
    <div class="flex flex-col max-w-5xl mx-auto gap-x-10 px-6">
      <div class="max-w-md sm:max-w-screen-lg m-auto pb-6">
        <ThankYouExploreMore download-follow-up collection-name="dashboard" hubspot-reference="thank-you-dashboard-ebook" />
      </div>
    </div>
    <div class="w-full max-w-md sm:max-w-screen-lg m-auto mt-6 px-6 border-t border-gray-200">
      <SocialProof />
    </div>
  </div>
</template>
