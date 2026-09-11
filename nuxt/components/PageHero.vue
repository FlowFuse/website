<script setup lang="ts">
// The centered title/subtitle/description block repeated verbatim at the top of every
// plain marketing/support/thank-you page. `subtitle` is a slot rather than a prop because
// a couple of callers (the thank-you pages) put a link inside it.
defineProps<{
    title: string
    description?: string
}>()
</script>

<template>
  <div class="hero container m-auto text-center flex flex-wrap pt-6 px-6 pb-12 md:flex-nowrap md:max-w-4xl md:pt-12">
    <div class="mx-auto max-w-screen-xl md:max-w-xl">
      <h1>{{ title }}</h1>
      <h4 v-if="$slots.subtitle" class="text-gray-500">
        <slot name="subtitle" />
      </h4>
      <p v-if="description" class="lead-p m-auto mt-3">
        {{ description }}
      </p>
    </div>
  </div>
</template>
