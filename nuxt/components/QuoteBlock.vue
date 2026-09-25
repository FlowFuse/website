<script setup lang="ts">
const props = defineProps<{
  quote: string
  author?: string
  role?: string
  avatar?: string
  result?: string
  resultLinkText?: string
  resultHref?: string
}>()

const resultParts = computed(() => {
  const at = props.result && props.resultHref && props.resultLinkText ? props.result.indexOf(props.resultLinkText) : -1
  if (at === -1) return null
  return {
    before: props.result!.slice(0, at),
    after: props.result!.slice(at + props.resultLinkText!.length),
  }
})
</script>

<template>
  <figure class="not-prose border-l-4 border-red-100 pl-6">
    <blockquote class="m-0 border-0 p-0 text-2xl font-normal italic text-gray-500">
      "{{ quote }}"
    </blockquote>
    <figcaption v-if="author || result" class="mt-4 text-sm text-gray-500">
      <div v-if="author" class="flex items-center gap-3">
        <span v-if="avatar" class="h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white bg-red-200 shadow-md">
          <img :src="avatar" :alt="author" class="h-full w-full object-cover">
        </span>
        <span>
          <span class="font-semibold text-gray-700">{{ author }}</span>{{ role ? ` · ${role}` : '' }}
        </span>
      </div>
      <p v-if="result" class="m-0 text-base font-semibold text-gray-700" :class="{ 'mt-4': author }">
        <template v-if="resultParts">{{ resultParts.before }}<NuxtLink :to="resultHref">{{ resultLinkText }}</NuxtLink>{{ resultParts.after }}</template>
        <template v-else>{{ result }}</template>
      </p>
    </figcaption>
  </figure>
</template>
