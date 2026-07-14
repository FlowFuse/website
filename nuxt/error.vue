<script setup lang="ts">
defineProps<{ error: { statusCode: number; statusMessage: string } }>()
</script>

<template>
  <NuxtLayout>
    <div class="w-full h-full ff-full-bg">
      <div class="flex flex-col justify-center px-6 pt-10 pb-24 md:py-16 max-w-sm md:max-w-lg m-auto text-center h-full">
        <div class="w-full mx-auto md:-mt-6">
          <img :src="'/images/pictograms/404_blue.png'" alt="404" width="465" />
        </div>
        <h1 class="mb-0 text-[2.75rem] leading-[3.1rem] font-normal text-gray-700">Ooops!</h1>
        <h5 class="text-[1.1rem] leading-[1.85rem] font-semibold text-gray-700">Page not found</h5>
        <!-- Plain <a> forces a full page navigation — / is served by 11ty and a
             client-side Nuxt redirect would leave the page blank. -->
        <a href="/" class="ff-btn ff-btn--primary mt-4">Return to homepage</a>
      </div>
    </div>
  </NuxtLayout>
</template>
