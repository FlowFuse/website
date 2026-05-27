<script setup>
const openChat = () => window.HubSpotConversations?.widget?.open()
useHead({
    title: 'Help Center • FlowFuse',
    meta: [{ name: 'description', content: 'Search through our extensive range of resources, knowledge base, or reach out to our dedicated support team by submitting a ticket.' }],
})
</script>

<template>
  <div class="w-full page hero">
    <div class="w-full">
      <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
        <div class="mx-auto max-w-screen-xl md:max-w-xl">
          <h1>Help Center</h1>
          <h4 class="text-indigo-400" />
          <p class="lead-p m-auto mt-3">Search through our extensive range of resources, knowledge base, or reach out to our dedicated support team by submitting a ticket.</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="text-left max-w-full">
        <div class="w-full pt-10 md:pt-8 px-0 ff-prose">
          <div class="text-center mb-8"><h4>Find answers<span class="text-indigo-600"> instantly</span></h4></div>
          <div class="max-w-screen-lg m-auto px-6 md:px-0 md:mb-10">
            <div id="algolia-search" class="border rounded" />
          </div>
          <div class="container m-auto max-w-screen-lg">
            <div class="grid px-6 grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 gap-y-12 mb-16">
              <div class="md:flex md:flex-col md:justify-between text-left self-start md:h-full">
                <div>
                  <h4 class="flex items-center gap-4">
                    <div class="w-16 mt-6"><img src="/images/pictograms/community_blue.png" alt="Graphics depicting low-code programming." style="max-width:64px" /></div>
                    <div class="flex flex-col leading-8 mt-6"><h4>Ask the <span class="text-indigo-600">community</span></h4></div>
                  </h4>
                  <p class="mb-0">Explore our forum to find answers and solutions. Others may have already shared similar issues, providing valuable insights that could address your concerns.</p>
                </div>
                <div class="container text-center max-w-4xl flex flex-col md:items-start mt-6">
                  <a class="ff-btn ff-btn--primary flex flex-col" href="https://discourse.nodered.org/c/vendors/flowfuse/24/"><span class="text-base uppercase no-underline md:px-4">COMMUNITY FORUM</span></a>
                </div>
              </div>
              <div class="md:flex md:flex-col md:justify-between text-left self-start md:h-full">
                <div>
                  <h4 class="flex items-center gap-4">
                    <div class="w-16 mt-6"><img src="/images/pictograms/speech_blue.png" alt="Graphics depicting low-code programming." style="max-width:64px" /></div>
                    <div class="flex flex-col leading-8 mt-6"><h4>Reach out via our <span class="text-indigo-600">chat</span></h4></div>
                  </h4>
                  <p class="mb-0">Get real-time assistance and quick answers. Chat with us for prompt support and solutions to your queries.</p>
                </div>
                <div class="container text-center max-w-4xl flex flex-col md:items-start mt-6">
                  <button type="button" class="ff-btn ff-btn--primary flex flex-col" @click="openChat"><span class="text-base uppercase no-underline md:px-4">OPEN CHAT BOX</span></button>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full bg-gray-50 py-16 px-0 ff-prose">
            <div class="text-center m-auto mb-6 md:max-w-xl">
              <h2>Submit a ticket</h2>
              <p>If you need assistance with the FlowFuse application, account, or billing, please submit a ticket by filling out the form below.</p>
            </div>
            <div class="container m-auto md:max-w-xl prose">
              <div class="px-6">
                <HubSpotForm form-id="74ffcab1-a984-459a-871f-5751b8d69ac2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
