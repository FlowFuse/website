<script setup lang="ts">
// Ported from src/_includes/layouts/mql-contact.njk. The form/meeting embed
// is passed via the default slot since the two consumers (contact-us,
// book-demo) use different HubSpot embeds (form vs meetings calendar).
withDefaults(defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    subtitleIcon?: string
    description: string
    highlights?: string[]
    socialProofTitle?: string
    otherChannels?: Array<{
        title: string
        description: string
        buttonText: string
        buttonLink: string
        icon: string
    }>
}>(), {
    eyebrow: undefined,
    subtitle: undefined,
    subtitleIcon: undefined,
    highlights: undefined,
    socialProofTitle: undefined,
    otherChannels: undefined,
})
</script>

<template>
  <div class="page container m-auto max-w-5xl px-6 pb-16 pt-16">
    <div class="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-x-12">
      <div class="order-1 text-center md:text-left md:col-start-1 md:row-start-1 min-w-0">
        <p v-if="eyebrow" class="text-indigo-500 mb-3 text-sm font-semibold uppercase">
          {{ eyebrow }}
        </p>
        <h1 class="m-0 mb-2">
          {{ title }}
        </h1>
        <h2 v-if="subtitle" class="flex items-center justify-center md:justify-start gap-2 text-xl text-gray-500 font-light mt-3 mb-6">
          <UIcon v-if="subtitleIcon" :name="subtitleIcon" class="size-5 shrink-0 text-indigo-400" />
          {{ subtitle }}
        </h2>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="text-gray-600 mt-6" v-html="description" />
        <ul v-if="highlights?.length" class="mt-4 flex flex-col gap-2 text-left mt-6">
          <li v-for="(highlight, index) in highlights" :key="index" class="flex gap-2 text-gray-600 font-light">
            <UIcon name="i-lucide-check" class="size-5 shrink-0 mt-0.5" />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="highlight" />
          </li>
        </ul>
      </div>

      <div class="order-2 md:col-start-2 md:row-start-1 md:row-span-2 min-w-0 overflow-hidden">
        <slot />
      </div>

      <div v-if="otherChannels?.length" class="order-4 md:col-start-1 md:row-start-2 min-w-0">
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
        <p v-if="socialProofTitle" class="text-center text-gray-500 font-medium mb-6">
          {{ socialProofTitle }}
        </p>
        <SocialProof />
      </div>
    </div>
  </div>
</template>
