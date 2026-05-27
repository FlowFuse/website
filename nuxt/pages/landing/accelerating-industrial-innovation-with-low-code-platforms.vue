<script setup>
useHead({
    title: 'Accelerating Industrial Innovation with Low-Code Platforms • FlowFuse',
    meta: [{ name: 'description', content: 'Discover how low-code platforms are accelerating industrial innovation, and how you can leverage them to drive digital transformation in your manufacturing business.' }],
})
</script>

<template>
  <div class="w-full nohero py-16">
    <div class="container flex flex-col m-auto text-left max-lg:px-6 md:max-w-screen-lg items-stretch">
      <div class="ff-prose whitepaper w-full flex flex-col md:flex-row md:gap-10 mt-3 pb-4 md:pb-12">
        <div class="sm:1/3 md:w-1/2 flex-grow">
          <div class="ff-image-cover ff-image-rounded w-full h-full mb-6">
            <img src="/landing/images/low-code-whitepaper.png" alt="Image representing Accelerating Industrial Innovation with Low-Code Platforms" loading="lazy" class="w-full h-auto">
          </div>
        </div>
        <div class="main-content prose sm:2/3 md:w-1/2">
          <h1 class="md:max-w-screen-md">Empowering Engineers to Drive Innovation</h1>
          <p>The competitive industrial landscape puts immense pressure on companies to innovate. However, traditional IT processes often hinder operational technology (OT) engineers, preventing them from quickly implementing solutions that drive efficiency.</p>
        </div>
      </div>
    </div>
    <div class="w-full md:bg-white md:pt-8">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg md:gap-14 items-stretch">
        <div class="ff-prose whitepaper w-full mt-3 md:w-2/3">
          <label class="text-red-600 font-medium mb-2">Whitepaper</label>
          <h3 class="text-gray-600 leading-snug">Accelerating Industrial Innovation with <span class="inline-block">Low-Code Platforms</span></h3>
          <h4 class="text-gray-600" />
          <p>We explore the challenges faced by engineers and introduce low-code platforms as a powerful solution. By empowering domain experts, low-code platforms like Node-RED enable rapid application development, prototyping, and iteration, fostering a culture of continuous improvement and driving significant cost reduction. Add to this FlowFuse enterprise-grade features and you have powerful production-ready solutions.</p>
          <!-- Social proof logos -->
          <div class="border-t border-gray-200 mt-16">
            <SocialProof />
          </div>
        </div>
        <div class="max-w-[350px] flex flex-col mx-auto">
          <div class="sticky top-20 bg-indigo-50 border-2 border-indigo-200 rounded-md drop-shadow-xl px-6 pb-2 mt-4">
            <p class="text-gray-600"><span class="font-semibold">Download our whitepaper</span><br>to learn how to unleash your engineers' potential and accelerate industrial innovation.</p>
            <HubSpotForm form-id="b9b00a26-31ee-435a-b5fc-ebc38cd90055" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
