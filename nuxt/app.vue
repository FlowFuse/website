<script setup lang="ts">
useSchemaOrg([
    defineOrganization({
        name: 'FlowFuse',
        url: 'https://flowfuse.com',
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
