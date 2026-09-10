<script setup lang="ts">
// Ported from src/use-cases/uns.njk (11ty), which this replaces. Same page, same copy,
// same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The five feature icons were {% include %}d straight from
//    src/_includes/components/icons/ with no ff-icon wrapper, so they are plain Heroicons
//    at w-8 h-8. They resolve through <UIcon> against the installed heroicons set here.
//  - The three CTA macros become <CtaContactUs>, <CtaSignUp> and <CtaBookDemo>.
//  - Production renders TWO <h1> ("FlowFuse for UNS" from layouts/page.njk's `nohero`
//    branch, then the page's own "FlowFuse for the Unified Namespace"). Only the page's
//    own heading survives here.
//  - The "From Data Source to Application:" heading used </br>, which is not a tag. It is
//    a <br> here, which is what it was reaching for.
//  - The reading-list and resources thumbnails point at /blog/**, /whitepaper/** and
//    /resources/** - assets owned by sections still on 11ty. They stay where they are and
//    move wholesale at teardown; the page's own art is copied into nuxt/public/images/,
//    which is where the already-ported pages keep theirs.
const FEATURES = [
    { icon: 'i-heroicons-circle-stack', title: 'Break down data silos', description: 'Access data from any source, regardless of its format or location and make it available through a central hub. ' },
    { icon: 'i-heroicons-eye', title: 'Gain real-time visibility', description: 'Monitor your operations with interactive visual dashboards.' },
    { icon: 'i-heroicons-bolt', title: 'Make faster, data-driven decisions', description: 'Analyze data from across your organization to identify gaps and optimize processes.' },
    { icon: 'i-heroicons-lock-closed', title: 'Replace point-to-point connections', description: 'Seamlessly share data across your entire operation.' },
    { icon: 'i-heroicons-arrows-pointing-out', title: 'Improved collaboration', description: 'Adapt data across different systems with minimal data loss or loss of context.' },
]

const REASONS = [
    { title: 'Built-in adaptation layer', description: "Leverage FlowFuse's low-code platform to transform and make your data available for UNS." },
    { title: 'End-to-end UNS platform', description: 'Everything you need to connect, manage, visualize and analyze your data in one place.' },
    { title: 'Seamless integration', description: 'Built-in MQTT Broker ready to use alongside your FlowFuse applications with robust enterprise-grade features of the FlowFuse Platform.' },
    { title: 'Rapid implementation', description: 'Get up and running quickly on FlowFuse Cloud.' },
    { title: 'Open-source', description: 'Avoid vendor lock-in.' },
    { title: 'Low-Code', description: 'Empowering your teams to build custom solutions with ease.' },
]

// Two columns of reading, kept in the .njk's order.
const READING_COLUMNS = [
    [
        { title: 'Introduction to UNS', url: '/blog/2023/12/introduction-to-unified-namespace/', image: '/blog/2023/12/images/introduction-to-uns.png', alt: 'Graphics depicting a unified namespace.' },
        { title: 'From ISA 95 towards the UNS', url: '/blog/2023/08/isa-95-automation-pyramid-to-unified-namespace/', image: '/blog/2023/08/images/UNS/UNS-Headline.svg', alt: 'Graphics depicting the UNS related to the automation pyramid.' },
        { title: 'Node-RED: The perfect adapter and middleware for the UNS', url: '/blog/2024/02/node-red-perfect-adapter-middleware-uns/', image: '/blog/2024/02/images/node-red-for-uns.png', alt: 'Node-RED and the UNS' },
        { title: 'Building a Unified Namespace (UNS) with FlowFuse', url: '/blog/2024/11/building-uns-with-flowfuse/', image: '/blog/2024/11/images/building-uns-with-flowfuse.png', alt: 'Graphics depicting a Unified Namespace with FlowFuse.' },
    ],
    [
        { titleLead: 'Free whitepaper:', title: ' UNS - Decoupling data producers and consumers', url: '/whitepaper/uns-decoupling-data-producers-and-consumers/', image: '/resources/images/whitepaper_uns.png', alt: 'Graphics depicting the cover of the Whitepaper.' },
        { title: 'Data Modeling: The Key to a Successful Unified Namespace', url: '/blog/2024/12/why-uns-need-data-modeling/', image: '/blog/2024/12/images/data-modeling-uns.png', alt: 'Graphics depicting unified namespace data modeling.' },
        { title: 'Selecting your UNS Broker', url: '/blog/2024/01/unified-namespace-what-broker/', image: '/blog/2024/01/images/broker-for-uns.png', alt: 'Graphics displaying different broker logos.' },
        { title: 'Unified Namespace: When to Use It, and When to Choose Something Else', url: '/blog/2024/01/unified-namespace-when-not-to-use/', image: '/blog/2024/01/images/when-not-to-use-the-uns.png', alt: 'Graphics depicting unified namespace data modeling using FlowFuse.' },
    ],
]

const META_DESCRIPTION = 'FlowFuse simplifies UNS adoption for manufacturing companies by providing a user-friendly, low-code platform for deploying and using data from a UNS.'

useSeoMeta({
    title: 'FlowFuse for the Unified Namespace',
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    ogImage: 'https://flowfuse.com/images/solutions/flowfuse-uns.png',
    keywords: 'FlowFuse, UNS, Unified Namespace, manufacturing, data, data integration, data management, data visualization, data analysis, data-driven decisions, data silos, real-time data, collaboration, Node-RED, MQTT Broker, low-code, open-source, rapid implementation, seamless integration',
    ogUrl: 'https://flowfuse.com/use-cases/uns/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="nohero w-full">
        <div class="w-full pt-12 pb-20 md:pt-6 md:pb-8">
          <div class="md:flex px-6 md:my-16 items-center md:flex-row md:justify-between container mx-auto text-center md:text-left md:max-w-screen-lg gap-8">
            <div class="my-auto max-md:mx-auto md:w-1/2 lg:w-5/12 max-w-md">
              <h1 class="w-full mt-0 px-12 md:px-0 m-auto font-medium">
                FlowFuse for the <span class="text-indigo-600 inline-block">Unified Namespace</span>
              </h1>
              <p class="mb-10">{{ META_DESCRIPTION }}</p>
              <div class="flex md:hidden justify-center m-auto max-w-[400px] mb-10">
                <img src="/images/solutions/ff-uns.png" alt="FlowFuse connected to many industrial devices" width="400" class="w-full h-auto">
              </div>
              <div class="flex gap-3 max-md:max-w-sm max-md:mx-auto max-sm:flex-col max-md:justify-center">
                <CtaContactUs variant="primary" position="primary" class="min-h-[40px]" />
                <CtaSignUp variant="primary-outlined" position="primary" class="min-h-[40px]" />
              </div>
            </div>
            <div class="flex max-md:hidden justify-center m-auto max-w-[400px]">
              <img src="/images/solutions/ff-uns.png" alt="FlowFuse connected to many industrial devices" width="400" class="w-full h-auto">
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="max-w-screen-lg mx-auto px-6">
            <h2 class="max-sm:max-w-md w-full max-sm:text-center max-sm:mx-auto mb-6">
              Unlock the power of your <span class="text-indigo-600">real-time data</span>
            </h2>
            <p class="max-sm:max-w-md w-full max-sm:text-center max-sm:mx-auto mt-6">
              IT and data professionals are often challenged by the complexities of accessing and analyzing data
              scattered across disparate systems in manufacturing environments. UNS offers a solution to these
              challenges by providing a standardized way to access and utilize real-time data across your entire
              manufacturing operation.
            </p>
            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 gap-y-14 my-14">
              <div class="flex flex-col justify-center w-full max-md:max-w-md mx-auto sm:bg-indigo-50 rounded-lg sm:p-7">
                <h2 class="text-center w-full sm:text-left col-span-full text-3xl text-gray-500 font-light leading-14">
                  With FlowFuse adopting UNS has never been faster or easier
                </h2>
              </div>
              <div v-for="feature in FEATURES" :key="feature.title" class="relative w-full max-md:max-w-md mx-auto">
                <div class="flex flex-col items-center sm:items-start">
                  <div class="flex flex-col justify-center sm:justify-start gap-3 w-full mb-4">
                    <div class="w-8 h-8 m-auto sm:m-0 text-indigo-600">
                      <UIcon :name="feature.icon" class="w-8 h-8" />
                    </div>
                    <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                      <h5 class="w-full md:m-0">
                        <div class="text-xl text-gray-600 text-center sm:text-left">{{ feature.title }}</div>
                      </h5>
                    </div>
                  </div>
                  <div>
                    <p class="text-center sm:text-left font-light">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 class="mb-16 mt-16">
              <!-- Vue condenses the newline between <br> and <span>, which would run the two
                   lines together for a screen reader; the explicit space keeps them apart. -->
              From Data Source to Application:<br>{{ ' ' }}
              <span class="text-indigo-600">Streamline Your UNS Workflows with FlowFuse</span>
            </h2>
            <img src="/images/solutions/flowfuse-uns.png" alt="FlowFuse UNS Workflow" width="1024" class="w-full h-auto">
          </div>
        </div>
      </div>

      <div class="w-full bg-indigo-50/50 py-12 mt-20">
        <div class="max-w-screen-lg mx-auto px-6">
          <h2 class="font-bold m-auto w-full text-center sm:text-left mb-12">
            The FlowFuse <span class="text-red-600">Advantage</span>
          </h2>
          <div class="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div v-for="reason in REASONS" :key="reason.title" class="w-full mt-4 md:mt-0 flex flex-col">
              <h4 class="flex justify-center sm:justify-start font-semibold text-gray-500">{{ reason.title }}</h4>
              <p class="text-center sm:text-left font-light mt-6 max-sm:max-w-md max-sm:mx-auto">{{ reason.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-md:max-w-xl md:max-w-screen-lg mx-auto max-sm:text-center pt-16 pb-10 px-6 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap mb-12">
        <div class="ff-blue-card max-sm:max-w-none">
          <h4 class="mb-6 w-full text-center">Ready to simplify your UNS journey and unlock the power of your industrial data?</h4>
          <div class="flex max-sm:flex-col max-md:mx-auto gap-3 justify-center">
            <CtaBookDemo variant="primary" position="secondary" class="min-h-[40px]" />
            <CtaSignUp variant="primary-outlined" position="secondary" class="min-h-[40px]" />
          </div>
        </div>

        <div class="about w-full pt-24">
          <h3 class="w-full mb-8 text-gray-500 text-center">Learn about UNS</h3>
          <div class="grid grid-cols-1 md:gap-12 md:grid-cols-2 pt-4 md:pt-6 items-start m-auto">
            <div v-for="(column, c) in READING_COLUMNS" :key="c" class="pb-4 md:pb-0">
              <div class="ff-nodered-resources grid grid-cols-1 max-md:text-center">
                <NuxtLink v-for="article in column" :key="article.url" :to="article.url">
                  <li>
                    <div class="w-2/5 ff-image-cover ff-image-left-rounded h-full">
                      <img :src="article.image" :alt="article.alt" width="208" loading="lazy" class="w-full h-auto">
                    </div>
                    <label class="w-3/5 font-light text-left">
                      <span v-if="article.titleLead" class="font-semibold">{{ article.titleLead }}</span>{{ article.title }}
                    </label>
                  </li>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
