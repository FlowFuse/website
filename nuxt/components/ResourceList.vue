<script setup lang="ts">
// Thumbnail link cards in the `ff-nodered-resources` style: a cover image on the left,
// the title on the right. /landing/plc/, /integrations/opcua/ and the UNS and IT/OT use
// cases each carried a copy of this markup. The caller keeps its own headings and
// "see all" links; this is only the list.
//
// `columns` is 2 for a grid of cards, or 1 for a single stacked column (the use-case
// resources band sets two of those side by side).
withDefaults(defineProps<{
    items: Array<{
        title: string
        href: string
        image: string
        alt: string
        // A bold run before the title, e.g. "Free whitepaper:".
        lead?: string
    }>
    columns?: 1 | 2
}>(), { columns: 2 })
</script>

<template>
  <div class="ff-nodered-resources grid grid-cols-1 gap-4" :class="{ 'md:grid-cols-2': columns === 2 }">
    <NuxtLink v-for="item in items" :key="item.href" :to="item.href" class="h-full">
      <li class="h-full">
        <div class="w-2/5 max-md:aspect-video ff-image-cover ff-image-left-rounded h-full">
          <img :src="item.image" :alt="item.alt" width="208" loading="lazy" class="w-full h-auto">
        </div>
        <label class="w-3/5 font-light text-left">
          <span v-if="item.lead" class="font-semibold">{{ item.lead }} </span>{{ item.title }}
        </label>
      </li>
    </NuxtLink>
  </div>
</template>
