<script setup lang="ts">
// src/_includes/contact-us-cta-line.njk - the one-line band under the Blueprint Library
// grid and in the blueprint detail sidebar. A text band with an inline link, not a
// button, so it does not go through cta/CtaButton.vue like the other Cta* components.
// It shares their destination registry so the href stays in one place, but like the .njk
// it fires no event: adding tracking here would be a behaviour change, not a port.
import { CTA_DESTINATIONS } from '../lib/cta-destinations'

const HREF = CTA_DESTINATIONS.contactUs.href
</script>

<template>
  <div class="bg-indigo-50 py-1 px-4 rounded-md w-full mx-auto text-center mt-12">
    <p>Looking for help with your project? <NuxtLink :to="HREF" class="underline">Contact us</NuxtLink>; our experts will be happy to provide a solution for your needs.</p>
  </div>
</template>
