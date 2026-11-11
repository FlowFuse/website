<script setup lang="ts">
useSchemaOrg([
    defineOrganization({
        name: 'FlowFuse',
        url: 'https://flowfuse.com',
        // Read by search engines and LLMs as the one-line answer to "what is FlowFuse".
        // Keep it on the platform and the deployment model, not on hosting Node-RED.
        description: 'FlowFuse is a platform for building, deploying and governing industrial applications across plants, from the cloud to machines on the factory floor. FlowFuse engineers build the first application with the customer\'s team.',
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
