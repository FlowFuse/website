<script setup lang="ts">
import site from './data/site.json'

// alternateName ties the brand's other spellings and its former name to this entity:
// "flow fuse" and "flowforge" are both among the homepage's top search queries.
// legalName, alternateName and sameAs all come from site.json, so there's one list.
const { legalName, alternateName, sameAs } = site.organization

useSchemaOrg([
    defineOrganization({
        name: 'FlowFuse',
        legalName,
        alternateName,
        url: 'https://flowfuse.com',
        logo: 'https://flowfuse.com/handbook/images/logos/ff-logo--square--dark.png',
        sameAs,
    }),
    defineWebSite({ name: 'FlowFuse', alternateName }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
