<script setup>
const otherChannels = [
    { title: 'Talk to an expert first?', description: 'Pick a date and time and we’ll guide you through the purchasing process.', buttonText: 'Book a call', buttonLink: '/book-demo', icon: 'calendar' },
    { title: 'Where you looking to solve some technical issue?', description: "Check out our Help Center for support, you’ll find all the channels available to solve any issues you’re encountering.", buttonText: 'Help center', buttonLink: '/support', icon: 'lifebuoy' },
]
useHead({
    title: 'Request a Quote • FlowFuse',
    meta: [
        { name: 'description', content: 'Request a quote for FlowFuse, the automation platform.' },
        { name: 'keywords', content: 'FlowFuse Quote, License FlowFuse' },
    ],
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <MqlContact
        title="Request a Quote"
        description="Ready to unlock all FlowFuse has to offer?<br> Share what you need, and a quote will be created for you shortly."
        :other-channels="otherChannels">
        <template #form>
          <div class="border border-indigo-200 rounded-xl p-6 bg-white shadow-sm overflow-hidden">
            <HubSpotForm form-id="5b9d1cfb-f658-43c3-8d4d-a5b1b2802b74" />
          </div>
        </template>
      </MqlContact>

      <div class="prose prose-blue container m-auto max-w-4xl px-6 pb-24">
        <div id="contact-us" class="w-full bg-gray-50 mt-16 pt-0">
          <div class="w-full bg-gray-50 pb-12">
            <div class="container max-w-5xl m-auto grid grid-cols-1 md:grid-cols-2 px-6 pt-16 gap-x-16 gap-y-6">
              <div>
                <h4 class="w-full text-center md:text-left">Request a Quote</h4>
                <p>Ready to buy a FlowFuse license? Let us know what you need, and receive a quote the next business day!</p>
              </div>
              <HubSpotForm form-id="5b9d1cfb-f658-43c3-8d4d-a5b1b2802b74" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
