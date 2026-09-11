<script setup lang="ts">
defineProps<{
    faq: Array<{ question: string, answer: string }>
}>()

const openIndex = ref<number | null>(null)
function toggle(i: number) {
    openIndex.value = openIndex.value === i ? null : i
}

const ESCAPE_MAP: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
function escapeHtml(text: string) {
    return text.replace(/[&<>"]/g, char => ESCAPE_MAP[char])
}

// Answers are plain text (any literal "<...>" in existing FAQ content - e.g. "<ip>",
// "<img>" placeholders - must stay literal, not be parsed as markup), so escape first.
// The only markup this renders is [label](url) links, converted after escaping so a URL
// or label can't reintroduce raw HTML.
function renderAnswer(answer: string) {
    return escapeHtml(answer).replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g,
        '<a href="$2" class="text-indigo-600 hover:underline">$1</a>',
    )
}
</script>

<template>
  <div class="w-full py-4" id="faqs">
    <div class="m-auto w-full ff-prose">
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
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="renderAnswer(item.answer)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
