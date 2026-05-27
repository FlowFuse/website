<script setup>
useHead({
    title: 'Schedule your Free Consultation • FlowFuse',
    meta: [
        { name: 'description', content: 'Schedule a 30 minute free consultation with our experts and see how we can help scale your workflows.' },
        { name: 'robots', content: 'noindex, nofollow' },
    ],
})
</script>

<template>
  <div class="w-full page hero">
    <div class="w-full">
      <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
        <div class="mx-auto max-w-screen-xl md:max-w-xl">
          <h1>Schedule your Free Consultation</h1>
          <h4 class="text-indigo-400" />
          <p class="lead-p m-auto mt-3" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="w-full page webinar">
        <div class="w-full pt-6 pb-24 bg-gray-50">
          <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg gap-8">
            <div class="max-w-screen-sm w-full">
              <p>Facing challenges with your Node-RED applications in industrial or enterprise environments? <span class="font-bold">Schedule a free 30-minute consultation with our experts.</span> We'll assess your current setup and provide tailored recommendations to help you address pain points such as scalability, security, and workflow automation.</p>
              <div class="ff-blue-card flex flex-row gap-6 items-center">
                <div class="max-w-24"><img src="/images/node-red-icon.png" alt="Node-RED logo" style="max-width:100px" /></div>
                <h4 class="font-light text-left">Our expertise has helped businesses across the world streamline Node-RED operations, developer velocity, security, and compliance.</h4>
              </div>
              <SocialProof />
            </div>
            <div class="product mt-3">
              <div class="w-80 w-full mx-auto">
                <HubSpotForm form-id="d24fa635-f19c-400b-82d4-b6f233faf38b" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
