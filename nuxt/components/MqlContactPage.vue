<script setup lang="ts">
// Ported from src/_includes/layouts/mql-contact.njk. The form/meeting embed
// is passed via the default slot since the two consumers (contact-us,
// book-demo) use different HubSpot embeds (form vs meetings calendar).
defineProps<{
    title: string
    description: string
    otherChannels: Array<{
        title: string
        description: string
        buttonText: string
        buttonLink: string
        icon: string
    }>
}>()
</script>

<template>
  <div class="container m-auto max-w-5xl px-6 pb-16 pt-16">
    <div class="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-x-12">
      <div class="order-1 text-center md:text-left md:col-start-1 md:row-start-1 min-w-0">
        <h1 class="text-indigo-600 mt-0">
          {{ title }}
        </h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="text-gray-500 mt-3" v-html="description" />
      </div>

      <div class="order-2 md:col-start-2 md:row-start-1 md:row-span-2 min-w-0 overflow-hidden">
        <slot />
      </div>

      <div class="order-4 md:col-start-1 md:row-start-2 min-w-0">
        <div class="flex flex-col gap-12">
          <div v-for="channel in otherChannels" :key="channel.title" class="flex flex-col items-center md:items-start">
            <div class="flex flex-col items-center md:items-start gap-2 mb-2">
              <UIcon :name="`i-lucide-${channel.icon}`" class="w-8 h-8 text-indigo-400" />
              <h4 class="text-indigo-400 m-0 text-lg font-medium">
                {{ channel.title }}
              </h4>
            </div>
            <p class="text-gray-500 mb-2 text-center md:text-left">
              {{ channel.description }}
            </p>
            <a :href="channel.buttonLink" class="text-blue-600 inline-flex items-center gap-1 mt-4">
              {{ channel.buttonText }}
              <UIcon name="i-lucide-move-right" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div class="order-3 md:col-start-1 md:col-span-2 md:row-start-3 min-w-0 border-t border-gray-200 pt-6">
        <SocialProof />
      </div>
    </div>
  </div>
</template>
