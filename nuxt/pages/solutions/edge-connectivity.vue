<script setup>
const features = [
    { heading: '<span class="text-indigo-600">Scaleable</span> Edge Connectivity', body: 'Efficiently connect and manage vast fleets of edge devices with FlowFuse. Our device agent ensures synchronized updates across all devices, while our central console provides seamless status monitoring and reliable connectivity management.' },
    { heading: '<span class="text-indigo-600">Effortless</span> Data Streaming', body: 'FlowFuse makes data streaming to the cloud painless, removing the hassle of network configurations. Our custom nodes facilitate effortless MQTT connection between the device and the FlowFuse platform, removing the need for complex setup. No configuration of IP address, domain name, certificates or firewalls required.' },
    { heading: '<span class="text-indigo-600">Consistent Deployment</span> Assurance', body: 'Create and distribute consistent application snapshots across your devices with FlowFuse. Our central console ensures uniform deployment, maintaining version consistency across your network.' },
    { heading: 'Rapid <span class="text-indigo-600">Security Deployment</span>', body: 'FlowFuse provides expert support for your deployments, ensuring systems are consistently up-to-date and operationally continuous, backed by our professional guidance.' },
    { heading: 'Remote <span class="text-indigo-600"> Troubleshooting</span>', body: "Identify and resolve production issues remotely with FlowFuse's debugging capabilities. This feature significantly eases troubleshooting of instances on devices." },
    { heading: '<span class="text-indigo-600">Easy</span> Onboarding', body: 'Easily integrate new devices into FlowFuse through our administrative interface or automated processes. This allows for hassle-free connection of multiple devices without manual intervention.' },
]

useHead({
    title: 'FlowFuse for Edge Connectivity • FlowFuse',
})
</script>

<template>
  <!-- Hero (reproduces layouts/solution.njk) -->
  <div class="page w-full px-6 mt-12 md:px-0">
    <div class="hero container m-auto text-center max-w-screen-md">
      <div>
        <h1 class="px-12 md:px-0 m-auto">FlowFuse for Edge Connectivity</h1>
        <h4 class="mt-4 text-indigo-400" />
      </div>
      <div class="flex items-center gap-6 mt-6">
        <div class="hidden sm:block w-64 flex-shrink-0">
          <img src="/images/pictograms/edge_blue.png" alt="Hero image for the respective solution" style="max-width:250px" />
        </div>
        <div class="flex flex-col justify-center text-center sm:text-left py-2">
          <p>FlowFuse simplifies the management of deployments to edge devices in manufacturing, from equipment to <a href="/landing/plc/">PLCs</a>. Our platform ensures secure and reliable handling of large-scale deployments, providing seamless edge connectivity solutions.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full px-0">
    <div>
      <div class="mt-6 text-center">
        <a href="/contact-us/" class="inline-block ff-btn ff-btn--highlight shadow uppercase">Speak to our team</a>
      </div>
    </div>
    <div class="container m-auto text-center">
      <div class="mt-20 content max-w-screen-lg m-auto">
        <div class="grid px-6 grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 mb-16">
          <div v-for="f in features" :key="f.heading" class="text-left self-start">
            <h3 v-html="f.heading" />
            <div><p>{{ f.body }}</p></div>
          </div>
        </div>
      </div>
      <div class="w-full max-w-screen-lg m-auto pb-16 px-6">
        <div class="flex justify-center items-center md:w-full">
          <div class="aspect-video border-2 border-black rounded-md drop-shadow-xl overflow-hidden" style="width:1080px;max-width:100%;">
            <iframe src="https://www.youtube.com/embed/dvTgCBXCa5A?rel=0" title="FlowFuse edge connectivity webinar"
                    style="width:100%;height:100%;" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 pb-28 pt-12 md:px-0">
      <div class="content max-w-screen-lg m-auto text-center border-2 rounded-lg py-6 px-20 bg-indigo-50 border-indigo-100">
        <p class="text-2xl leading-10 mt-0 mb-9">Ready to learn more?</p>
        <div>
          <a href="/contact-us/" class="inline-block ff-btn ff-btn--primary m-auto">Get in touch</a>
        </div>
      </div>
    </div>
  </div>
</template>
