<script setup lang="ts">
defineProps<{
    faq: Array<{ question: string, answer: string }>
}>()
</script>

<template>
  <div class="prose mt-12">
    <h2 class="mb-1">
      Frequently Asked Questions
    </h2>
    <details v-for="(item, index) in faq" :key="index" class="w-full border-b py-4">
      <summary class="cursor-pointer text-lg font-medium">
        {{ item.question }}
      </summary>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="mt-4" v-html="item.answer" />
    </details>
  </div>
</template>
