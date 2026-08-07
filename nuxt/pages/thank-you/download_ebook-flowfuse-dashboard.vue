<script setup lang="ts">
useSeoMeta({
    title: 'Thank you!',
    description: 'We\'ve also sent a copy to your inbox',
})
</script>

<template>
  <div>
    <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
      <div class="mx-auto max-w-screen-xl md:max-w-xl">
        <h1>Thank you!</h1>
        <h4 class="text-gray-500">
          <a href="https://26586079.fs1.hubspotusercontent-eu1.net/hubfs/26586079/eBook_%20Ultimate%20Guide%20to%20Building%20Applications%20with%20FlowFuse%20Dashboard%20for%20Node-RED.pdf">Click here</a> to access The Ultimate Guide to Building Applications with FlowFuse Dashboard for Node-RED
        </h4>
        <p class="lead-p m-auto mt-3">
          We've also sent a copy to your inbox
        </p>
      </div>
    </div>
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
