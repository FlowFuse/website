<script setup>
useHead({
    title: 'Professional Services • FlowFuse',
    meta: [{ name: 'description', content: 'At FlowFuse, we partner with our customers to ensure their successful deployment of FlowFuse and Node-RED. Our professional services are available to Enterprise tier customers, providing expert support for critical projects.' }],
})
</script>

<template>
  <div class="w-full page hero">
    <div class="w-full">
      <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
        <div class="mx-auto max-w-screen-xl md:max-w-xl">
          <h1>Professional Services</h1>
          <h4 class="text-indigo-400" />
          <p class="lead-p m-auto mt-3">At FlowFuse, we partner with our customers to ensure their successful deployment of FlowFuse and Node-RED. Our professional services are available to Enterprise tier customers, providing expert support for critical projects.</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="text-left max-w-full">
        <div class="w-full pt-0 md:pt-12 px-0">
          <div class="m-auto max-w-4xl pb-8 md:pb-16">
            <div class="flex px-6 flex-col gap-6 md:gap-x-12 gap-y-14">
              <div class="flex flex-col md:flex-row gap-8 items-center">
                <div class="sm:max-h-none md:min-w-[40%] max-w-[340px] ff-image-cover ff-image-rounded mx-auto">
                  <img src="/images/services/engineering-and-architecture-services.png" alt="Image of hands typing on laptop working on Node-RED flows" style="max-width:357px" />
                </div>
                <div class="prose">
                  <h3 class="flex items-center"><div class="flex flex-col leading-8 mt-3 text-center md:text-left w-full">Engineering and Architecture Services</div></h3>
                  <p class="mb-0">FlowFuse employees are experts in Node-RED development. We can help your team create Node-RED flows that meet your requirements or conduct an architecture review of existing flows to align with Node-RED best practices.</p>
                </div>
              </div>
              <div class="flex flex-col md:flex-row-reverse gap-8 items-center pb-6 md:pb-0">
                <div class="sm:max-h-none md:min-w-[40%] max-w-[340px] ff-image-cover ff-image-rounded mx-auto">
                  <img src="/images/services/training.png" alt="Image of two people working together" style="max-width:357px" />
                </div>
                <div class="prose">
                  <h3 class="flex items-center"><div class="flex flex-col leading-8 mt-3 text-center md:text-left w-full">Education and Training</div></h3>
                  <p class="mb-0">FlowFuse offers Node-RED and FlowFuse in-person and online courses for engineers, architects, and managers. Our structured approach to training can be customized to fit your unique requirements.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full bg-gray-50 py-8">
            <div class="text-center m-auto pt-10 md:pt-8 mb-6 md:mb-12 md:max-w-xl px-6">
              <h2>Contact us</h2>
              <p>Reach out to discuss how FlowFuse experts can help with your FlowFuse and Node-RED projects.</p>
            </div>
            <div class="container m-auto md:max-w-xl prose">
              <div class="px-6 mb-16">
                <HubSpotForm form-id="b8ae3144-7eb2-4f5a-a9f8-f99e5c7bb07f" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
