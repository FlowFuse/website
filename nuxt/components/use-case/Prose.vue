<script setup lang="ts">
// Headings, paragraphs and images in reading order: the "How it Works" write-ups on
// SCADA and MES, the architecture diagrams on UNS and IT/OT. With `callout`, the heading
// and the first paragraph sit side by side in the bordered card SCADA and MES opened with.

type Image = { src: string, alt: string, width?: number, framed?: boolean }

const props = defineProps<{
    block: {
        heading?: string
        callout?: boolean
        body: Array<string | { image: Image }>
    }
}>()

// A callout takes its first paragraph into the card; anything after it follows below.
const calloutText = computed(() => props.block.callout && typeof props.block.body[0] === 'string' ? props.block.body[0] : undefined)
const body = computed(() => calloutText.value ? props.block.body.slice(1) : props.block.body)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <section class="w-full px-6 pt-8 pb-8">
    <div class="max-w-screen-lg mx-auto">
      <div v-if="block.callout" class="flex md:flex-row flex-col w-full bg-white border-2 border-indigo-200 px-6 py-2 drop-shadow-lg md:gap-6 rounded-lg">
        <h2 class="w-full max-sm:mx-auto my-6 text-indigo-400" v-html="block.heading" />
        <p v-if="calloutText" class="md:max-w-2/3 max-sm:mx-auto" v-html="calloutText" />
      </div>
      <h2 v-else-if="block.heading" class="mt-8" v-html="block.heading" />

      <template v-for="(item, i) in body" :key="i">
        <p v-if="typeof item === 'string'" class="w-full max-sm:mx-auto mt-6" v-html="item" />
        <div
            v-else
            class="mx-auto my-12"
            :class="{ 'ff-image-rounded border drop-shadow-md p-1 bg-white': item.image.framed }"
            :style="{ maxWidth: item.image.width ? `${item.image.width}px` : undefined }"
        >
          <img :src="item.image.src" :alt="item.image.alt" :width="item.image.width || 1024" loading="lazy" class="w-full h-auto">
        </div>
      </template>
    </div>
  </section>
</template>
