<script setup>
const WHITEPAPERS = {
    'accelerating-innovation-in-manufacturing-with-flowfuse': {
        metaTitle: 'Accelerating Innovation in Manufacturing with FlowFuse',
        metaDescription: "Break down data silos & unlock innovation! Discover how FlowFuse leverages UNS, MQTT & Node-RED to create a unified data platform for agile application development in manufacturing. Download our whitepaper to see how FlowFuse empowers citizen developers & accelerates digital transformation.",
        image: '/whitepaper/images/whitepaper-manufacturing.png',
        heroTitle: 'Turning Factory Data into Scalable Innovation',
        heroContent: 'Digital transformation in manufacturing fails when data is trapped in silos or integration is too complex. FlowFuse helps industrial teams move fast by connecting systems through open standards and low-code tools—so engineers can build and iterate quickly without waiting on traditional IT processes.',
        whitepaperTitle: 'Accelerating Innovation in Manufacturing with FlowFuse',
        whitepaperSubtitle: '',
        description: '<p>Learn how manufacturers are using Node-RED and FlowFuse to unlock real-time insights, empower citizen developers, and break free from rigid architectures. This whitepaper explores how Unified Namespace, MQTT, and low-code development accelerate innovation—while FlowFuse adds the governance, security, and scalability needed for enterprise-grade deployment.</p>',
        formTitle: 'Download our whitepaper',
        formSubtitle: 'to learn how low-code and open standards accelerate smart manufacturing initiatives.',
        hubspotFormId: 'ccb34689-88f5-4c32-b1d8-529c564d8c8a',
    },
    'open-source-software-for-manufacturing': {
        metaTitle: 'Open Source Software for Manufacturing',
        metaDescription: 'In this free white paper get a comprehensive understanding of why open source software (OSS) is a smart choice for digital transformation and industrial agility',
        image: '/whitepaper/images/whitepaper-oss-manufacturing.jpg',
        heroTitle: 'The Case for True Openness in Industrial Software',
        heroContent: 'Digital transformation in manufacturing is moving fast, but many teams are stuck with software that’s closed, slow to adapt, or costly to scale. Open source offers a different approach: transparent, flexible, and built for change. For engineering teams solving real problems on the shop floor, it\'s a smarter foundation.',
        whitepaperTitle: 'Open Source Software for Manufacturing',
        whitepaperSubtitle: 'A Comprehensive Look at Why Open Source is a Smart Choice for Industrial Agility',
        description: "<p>This whitepaper explores how open source supports agility, future-proofing, and faster adoption in industrial environments. You'll learn how manufacturers benefit from community-driven innovation, stronger security through transparency, and a more flexible vendor strategy—while understanding how to manage the unique risks of OSS in critical operations.</p>",
        formTitle: 'Download our whitepaper',
        formSubtitle: 'to discover how OSS boosts efficiency and innovation in manufacturing.',
        hubspotFormId: '0ecb7f9a-cae9-403f-9067-50d4cf494255',
    },
    'uns-decoupling-data-producers-and-consumers': {
        metaTitle: 'UNS - Decoupling data producers and consumers',
        metaDescription: 'Discover why Unified Namespace (UNS) is essential for scalable and adaptable systems. Get step-by-step implementation guidance, explore real-world applications, and learn when UNS might not be the right solution—all in one comprehensive whitepaper.',
        image: '/whitepaper/images/uns.png',
        heroTitle: 'Unlocking Flexibility in Industrial Data Management',
        heroContent: 'The fast-paced evolution of Industry 4.0 demands manufacturers to adapt and innovate. Yet, traditional point-to-point integrations create rigid systems that slow progress. The Unified Namespace (UNS) breaks down these barriers, decoupling data producers and consumers to enable seamless data exchange and scalability.',
        whitepaperTitle: 'UNS - Decoupling Data Producers and Consumers',
        whitepaperSubtitle: 'A Practical Guide to Unified Namespace with FlowFuse',
        description: '<p>This whitepaper introduces the Unified Namespace (UNS) as a transformative solution for industrial data management. Learn how decoupling systems fosters agility, simplifies architectures, and future-proofs your operations.</p>\n<p>FlowFuse streamlines UNS adoption with native MQTT support, robust security, and enterprise-ready features. It simplifies broker management, abstracts protocol complexities, and provides a centralised interface for building and scaling industrial data solutions. Whether starting small or scaling up, discover best practices and actionable insights for adopting UNS and driving continuous improvement.</p>',
        formTitle: 'Download our whitepaper',
        formSubtitle: 'to learn how FlowFuse and the Unified Namespace can accelerate your transition to Industry 4.0.',
        hubspotFormId: '85c01934-e6fb-4f92-8377-1ea20be00535',
    },
}

const route = useRoute()
const slug = computed(() => {
    const s = route.params.slug
    return (Array.isArray(s) ? s : s ? [s] : []).filter(Boolean).join('/')
})
const wp = computed(() => WHITEPAPERS[slug.value])
if (!wp.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead(() => ({
    title: `${wp.value.metaTitle} • FlowFuse`,
    meta: [{ name: 'description', content: wp.value.metaDescription }],
}))
</script>

<template>
  <div class="w-full nohero py-16">
    <div class="container flex flex-col m-auto text-left max-lg:px-6 md:max-w-screen-lg items-stretch">
      <div class="ff-prose whitepaper w-full flex flex-col md:flex-row md:gap-10 mt-3 pb-4 md:pb-12">
        <div class="sm:1/3 md:w-1/2 flex-grow">
          <div class="ff-image-cover ff-image-rounded w-full h-full mb-6">
            <img :src="wp.image" :alt="`Image representing ${wp.metaTitle}`" style="max-width:644px" />
          </div>
        </div>
        <div class="main-content prose sm:2/3 md:w-1/2">
          <h1 class="md:max-w-screen-md">{{ wp.heroTitle }}</h1>
          <p>{{ wp.heroContent }}</p>
        </div>
      </div>
    </div>
    <div class="w-full md:bg-white md:pt-8">
      <div class="container flex flex-col md:flex-row m-auto text-left max-lg:px-6 md:max-w-screen-lg md:gap-14 items-stretch">
        <div class="ff-prose whitepaper w-full mt-3 md:w-2/3">
          <label class="text-red-600 font-medium mb-2">Whitepaper</label>
          <h3 class="text-gray-600 leading-snug">{{ wp.whitepaperTitle }}</h3>
          <h4 v-if="wp.whitepaperSubtitle" class="text-gray-600">{{ wp.whitepaperSubtitle }}</h4>
          <div v-html="wp.description" />
          <div class="border-t border-gray-200 mt-16">
            <SocialProof />
          </div>
        </div>
        <div class="max-w-[350px] flex flex-col mx-auto">
          <div class="sticky top-20 bg-indigo-50 border-2 border-indigo-200 rounded-md drop-shadow-xl px-6 pb-2 mt-4">
            <p class="text-gray-600"><span class="font-semibold">{{ wp.formTitle }}</span><br>{{ wp.formSubtitle }}</p>
            <HubSpotForm v-if="wp.hubspotFormId" :form-id="wp.hubspotFormId" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
