<script setup lang="ts">
// A page's FAQ band: a heading over the <BlogFaq> accordion, plus the FAQPage structured
// data for the same questions. Every marketing page used to write all three by hand, with
// its own negative-margin trick to pull the accordion up under its heading.
//
// `schemaItems` is for a page whose displayed copy is altered for layout only, so search
// engines still get the plain text: device-agent shows "Node‑RED" with a non-breaking
// hyphen. `schema: false` is for a page that emits its FAQPage some other way.
import { richText } from '../lib/rich-text.mjs'

const props = withDefaults(defineProps<{
    items: Array<{ question: string, answer: string }>
    heading?: string
    background?: 'white' | 'gray' | 'indigo'
    schema?: boolean
    schemaItems?: Array<{ question: string, answer: string }>
}>(), {
    heading: 'Frequently Asked ==Questions==',
    background: 'white',
    schema: true,
    schemaItems: undefined,
})

const BACKGROUNDS = { white: '', gray: 'bg-gray-50', indigo: 'bg-indigo-50/50' }

if (props.schema && props.items.length) {
    useSchemaOrg([
        defineWebPage({ '@type': 'FAQPage' }),
        ...(props.schemaItems || props.items).map(item => defineQuestion({ question: item.question, answer: item.answer })),
    ])
}
</script>

<template>
  <section class="w-full px-6 py-16" :class="BACKGROUNDS[background]">
    <div class="max-w-screen-lg mx-auto">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h2 class="mb-4 max-md:text-center" v-html="richText(heading)" />
      <BlogFaq :faq="items" />
    </div>
  </section>
</template>
