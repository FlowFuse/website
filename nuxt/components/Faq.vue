<script setup lang="ts">
import { parseFaqAnswer } from '../lib/faq-answer.mjs'

const props = withDefaults(defineProps<{
    faq: Array<{ question: string, answer: string }>
    /**
     * How much room the block takes above the first question.
     *
     * faq.njk had exactly these two modes: `post` inside an article, `page` everywhere a
     * marketing page pairs it with its own <h2>. Those pages set a negative bottom margin
     * on that heading, which only reads correctly against the taller spacing, so a page
     * rendering this in post mode pulls its first question up over its own heading.
     */
    variant?: 'post' | 'page'
}>(), {
    variant: 'post',
})

const answers = computed(() => props.faq.map(item => parseFaqAnswer(item.answer)))

const openIndex = ref<number | null>(null)
function toggle(i: number) {
    openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <div id="faqs" class="w-full" :class="variant === 'page' ? 'py-16' : 'py-4'">
    <div class="m-auto w-full ff-prose" :class="{ 'mt-12': variant === 'page' }">
      <div class="prose max-w-none">
        <div v-for="(item, i) in faq" :key="i" class="w-full py-4" :class="{ 'border-b': i !== faq.length - 1 }">
          <h3 class="not-prose m-0">
            <button
                class="question flex flex-row justify-between items-center w-full m-0 p-0 gap-6 cursor-pointer text-left bg-transparent border-0 text-lg font-medium"
                type="button"
                :aria-expanded="openIndex === i"
                @click="toggle(i)"
            >
              <span>{{ item.question }}</span>
              <UIcon
                  name="i-heroicons-chevron-down"
                  class="transition-transform ease-in-out duration-300 shrink-0"
                  :class="{ 'rotate-180': openIndex === i }"
              />
            </button>
          </h3>
          <div v-show="openIndex === i" class="px-6 mt-6">
            <template v-for="(block, b) in answers[i]" :key="b">
              <p v-if="block.type === 'p'"><InlineMarkdown :nodes="block.children" /></p>
              <component :is="block.type" v-else>
                <li v-for="(li, l) in block.items" :key="l"><InlineMarkdown :nodes="li" /></li>
              </component>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
