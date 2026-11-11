<script setup lang="ts">
useSchemaOrg([
    defineOrganization({
        name: 'FlowFuse',
        url: 'https://flowfuse.com',
        // Read by search engines and LLMs as the one-line answer to "what is FlowFuse".
        // Keep it on the platform and the deployment model, not on hosting Node-RED.
        description: 'FlowFuse is the edge-native platform for industrial applications. Manufacturers use it to build, deploy and govern production applications across their plants, and FlowFuse engineers build the first one with their team.',
        logo: 'https://flowfuse.com/handbook/images/logos/ff-logo--square--dark.png',
        sameAs: [
            'https://twitter.com/FlowFuseinc',
            'https://github.com/FlowFuse',
            'https://www.linkedin.com/company/flowfuse/',
            'https://www.facebook.com/FlowFuse/',
            'https://www.youtube.com/channel/UCbBzP8NZbv3WDtlt4UouA-g',
        ],
    }),
    defineWebSite({ name: 'FlowFuse' }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
