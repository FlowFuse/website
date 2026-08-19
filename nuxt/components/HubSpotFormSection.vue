<script setup lang="ts">
// Shared "gray band with centered HubSpot form" section used at the bottom
// of support and professional-services (both still on 11ty as of writing;
// this is prep for their Nuxt migration, mirroring how MqlContactPage
// already dedupes the contact-us/book-demo layout).
withDefaults(defineProps<{
    title: string
    description: string
    formId: string
    cta?: string
    reference?: string
    /** Tighter vertical spacing, matching professional-services' original layout. */
    compact?: boolean
}>(), {
    compact: false,
})
</script>

<template>
  <div class="w-full bg-gray-50 px-0" :class="compact ? 'py-8' : 'py-16'">
    <div class="text-center m-auto md:max-w-xl px-6" :class="compact ? 'pt-10 md:pt-8 mb-6 md:mb-12' : 'mb-6'">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <div class="container m-auto md:max-w-xl">
      <div class="px-6" :class="{ 'mb-16': compact }">
        <HubSpotForm :form-id="formId" :cta="cta" :reference="reference" />
      </div>
    </div>
  </div>
</template>
