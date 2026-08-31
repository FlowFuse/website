<script setup lang="ts">
useSeoMeta({
    title: 'Professional Services',
    description: 'At FlowFuse, we partner with our customers to ensure their successful deployment of FlowFuse and Node-RED. Our professional services are available to Enterprise tier customers, providing expert support for critical projects.',
})
</script>

<template>
  <div class="w-full">
    <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
      <div class="mx-auto max-w-screen-xl md:max-w-xl">
        <h1>Professional Services</h1>
        <p class="lead-p m-auto mt-3">
          At FlowFuse, we partner with our customers to ensure their successful deployment of FlowFuse and Node-RED. Our professional services are available to Enterprise tier customers, providing expert support for critical projects.
        </p>
      </div>
    </div>
    <div class="text-left max-w-full">
      <div class="w-full pt-0 md:pt-12 px-0">
        <div class="m-auto max-w-4xl pb-8 md:pb-16">
          <div class="flex px-6 flex-col gap-6 md:gap-x-12 gap-y-14">
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div class="sm:max-h-none md:min-w-[40%] max-w-[340px] ff-image-cover ff-image-rounded mx-auto">
                <img src="/images/services/engineering-and-architecture-services.png" alt="Image of hands typing on laptop working on Node-RED flows">
              </div>
              <div class="prose">
                <h3 class="flex items-center">
                  <div class="flex flex-col leading-8 mt-3 text-center md:text-left w-full">
                    Engineering and Architecture Services
                  </div>
                </h3>
                <p class="mb-0">
                  FlowFuse employees are experts in Node-RED development. We can help your team create Node-RED flows that meet your requirements or conduct an architecture review of existing flows to align with Node-RED best practices.
                </p>
              </div>
            </div>
            <div class="flex flex-col md:flex-row-reverse gap-8 items-center pb-6 md:pb-0">
              <div class="sm:max-h-none md:min-w-[40%] max-w-[340px] ff-image-cover ff-image-rounded mx-auto">
                <img src="/images/services/training.png" alt="Image of two people working together">
              </div>
              <div class="prose">
                <h3 class="flex items-center">
                  <div class="flex flex-col leading-8 mt-3 text-center md:text-left w-full">
                    Education and Training
                  </div>
                </h3>
                <p class="mb-0">
                  FlowFuse offers Node-RED and FlowFuse in-person and online courses for engineers, architects, and managers. Our structured approach to training can be customized to fit your unique requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
        <HubSpotForm
          title="Contact us"
          description="Reach out to discuss how FlowFuse experts can help with your FlowFuse and Node-RED projects."
          form-id="b8ae3144-7eb2-4f5a-a9f8-f99e5c7bb07f"
          cta="cta-contact-us"
          reference="professional-services"
          compact
        />
      </div>
    </div>
  </div>
</template>
