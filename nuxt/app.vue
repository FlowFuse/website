<script setup lang="ts">
import site from './data/site.json'

// alternateName ties the brand's other spellings and its former name to this entity:
// "flow fuse" and "flowforge" are both among the homepage's top search queries.
const { legalName, alternateName } = site.organization

useSchemaOrg([
    defineOrganization({
        name: 'FlowFuse',
        legalName,
        alternateName,
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
    defineWebSite({ name: 'FlowFuse', alternateName }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
