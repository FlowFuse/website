<script setup lang="ts">
// Ported from src/use-cases/edge-connectivity.njk (11ty), which this replaces. Same page,
// same copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - layouts/solution.njk's hero becomes <UseCaseSolutionHero>. Its `description` was an
//    HTML fragment in frontmatter rendered with `| safe`; it is ordinary template markup
//    in the slot here, so no page interpolates raw HTML.
//  - The hand-written <lite-youtube> element becomes <LiteYoutube>, shared with the blog.
//  - components/use-case-links.njk becomes <UseCaseLinks>, reading the same use-case
//    definitions so the card copy still lives in one place.
//  - ctaContactUs becomes <CtaContactUs>, keeping the registry's copy and event.
const FEATURES = [
    {
        headingLead: 'Scaleable',
        headingRest: ' Edge Connectivity',
        body: 'Efficiently connect and manage vast fleets of edge devices with FlowFuse. Our device agent ensures synchronized updates across all devices, while our central console provides seamless status monitoring and reliable connectivity management.',
    },
    {
        headingLead: 'Effortless',
        headingRest: ' Data Streaming',
        body: 'FlowFuse makes data streaming to the cloud painless, removing the hassle of network configurations. Our custom nodes facilitate effortless MQTT connection between the device and the FlowFuse platform, removing the need for complex setup. No configuration of IP address, domain name, certificates or firewalls required.',
    },
    {
        headingLead: 'Consistent Deployment',
        headingRest: ' Assurance',
        body: 'Create and distribute consistent application snapshots across your devices with FlowFuse. Our central console ensures uniform deployment, maintaining version consistency across your network.',
    },
    {
        headingPrefix: 'Rapid ',
        headingLead: 'Security Deployment',
        body: 'FlowFuse provides expert support for your deployments, ensuring systems are consistently up-to-date and operationally continuous, backed by our professional guidance.',
    },
    {
        headingPrefix: 'Remote ',
        headingLead: ' Troubleshooting',
        body: "Identify and resolve production issues remotely with FlowFuse's debugging capabilities. This feature significantly eases troubleshooting of instances on devices.",
    },
    {
        headingLead: 'Easy',
        headingRest: ' Onboarding',
        body: 'Easily integrate new devices into FlowFuse through our administrative interface or automated processes. This allows for hassle-free connection of multiple devices without manual intervention.',
    },
]

useSeoMeta({
    title: 'FlowFuse for Edge Connectivity',
    description: 'Deploy and manage Node-RED instances on edge hardware at scale, from a single pane of glass, without touching each device.',
    ogImage: 'https://flowfuse.com/images/solutions/og-solutions-edge-connectivity.jpg',
    ogUrl: 'https://flowfuse.com/use-cases/edge-connectivity/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full">
    <UseCaseSolutionHero title="FlowFuse for Edge Connectivity" hero-img="/images/pictograms/edge_blue.png">
      <p>
        FlowFuse simplifies the management of deployments to edge devices in manufacturing, from equipment to
        <NuxtLink to="/landing/plc/">PLCs</NuxtLink>. Our platform ensures secure and reliable handling of large-scale
        deployments, providing seamless edge connectivity solutions.
      </p>
    </UseCaseSolutionHero>

    <div class="w-full px-0">
      <div>
        <div class="mt-6 text-center">
          <CtaContactUs variant="highlight" position="hero" class="inline-block shadow" />
        </div>
      </div>

      <div class="container m-auto text-center">
        <div class="mt-20 content max-w-screen-lg m-auto">
          <div class="grid px-6 grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 mb-16">
            <div v-for="feature in FEATURES" :key="feature.headingLead" class="text-left self-start">
              <h3>
                <template v-if="feature.headingPrefix">{{ feature.headingPrefix }}</template><span class="text-indigo-600">{{ feature.headingLead }}</span><template v-if="feature.headingRest">{{ feature.headingRest }}</template>
              </h3>
              <div><p>{{ feature.body }}</p></div>
            </div>
          </div>
        </div>
        <div class="w-full max-w-screen-lg m-auto pb-16 px-6">
          <div class="flex justify-center items-center md:w-full">
            <LiteYoutube
                videoid="dvTgCBXCa5A"
                title="FlowFuse edge connectivity webinar - YouTube video"
                class="aspect-video bg-cover bg-top bg-no-repeat border-2 border-black rounded-md drop-shadow-xl"
                style="background-image: url('/images/solutions/webinar-july-2023_video_tile.jpg'); width: 1080px; background-repeat: no-repeat;"
            />
          </div>
        </div>
      </div>

      <div class="w-full py-16 sm:py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div class="max-w-screen-lg mx-auto">
          <h2 class="max-md:text-center">What teams build <span class="text-indigo-600">at the edge</span></h2>
          <UseCaseLinks :slugs="['shop-floor-communication', 'production-monitoring']" />
          <div class="mt-8 flex justify-center">
            <NuxtLink class="ff-btn ff-btn--primary-outlined uppercase" to="/docs/device-agent/install/">Get the Device Agent</NuxtLink>
          </div>
        </div>
      </div>

      <div class="w-full px-6 pb-28 pt-12 md:px-0">
        <div class="content max-w-screen-lg m-auto text-center border-2 rounded-lg py-6 px-20 bg-indigo-50 border-indigo-100">
          <p class="text-2xl leading-10 mt-0 mb-9">Ready to learn more?</p>
          <div>
            <CtaContactUs variant="primary" position="footer" class="inline-block m-auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
