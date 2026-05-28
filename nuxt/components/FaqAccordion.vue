<script setup>
const props = defineProps({ items: { type: Array, default: () => [] } })
const open = ref(props.items.map(() => false))
const toggle = (i) => { open.value[i] = !open.value[i] }
</script>

<template>
  <div class="w-full py-16" id="faqs">
    <div class="m-auto sm:max-w-screen-lg">
      <div class="mt-12 m-auto w-full ff-prose">
        <div class="prose max-w-none">
          <div v-for="(faq, i) in items" :key="i" class="w-full py-4" :class="{ 'border-b': i !== items.length - 1 }">
            <h3 class="m-0">
              <button class="question flex flex-row justify-between items-center w-full m-0 p-0 gap-6 cursor-pointer text-left bg-transparent border-0 text-lg font-semibold"
                      type="button" :aria-expanded="open[i] ? 'true' : 'false'" @click="toggle(i)">
                <span>{{ faq.question }}</span>
                <div class="chevron transition-transform ease-in-out duration-300" :style="open[i] ? 'transform: rotate(180deg)' : ''">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </button>
            </h3>
            <div v-show="open[i]" class="answer px-6 mt-6">
              <p v-html="faq.answer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
