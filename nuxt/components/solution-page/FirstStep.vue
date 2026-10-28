<script setup lang="ts">
// The close: what actually happens after "Talk to Us", so the first step reads as a short
// conversation and a look at one line, not a project. The loss review is the opening of the
// proof of value. No durations beyond the call, no prices (still internal proposals).
defineProps<{ heading: string, description: string }>()

const STEPS = [
    { icon: 'i-lucide-phone', title: 'A 30-minute call with an engineer', description: 'About one line and the losses you suspect. No slides.' },
    { icon: 'i-lucide-search', title: 'A loss review on that line', description: 'We connect to it and show where it really loses output, from your own data. It is the start of your proof of value.' },
    { icon: 'i-lucide-flag', title: 'You decide on the first solution', description: 'If the loss is worth fixing, we build the solution with your team. Either way, you know where your output goes.' },
]
</script>

<template>
  <div class="w-full px-6 py-20">
    <div class="ff-blue-card max-md:max-w-xl md:max-w-screen-lg mx-auto pt-12 pb-10 px-6 md:px-10">
      <h2 class="mb-3 w-full text-center">{{ heading }}</h2>
      <p class="text-gray-600 mb-10 max-w-2xl mx-auto text-center">{{ description }}</p>
      <ol class="list-none p-0 m-0 grid md:grid-cols-3 gap-6">
        <li v-for="(step, i) in STEPS" :key="step.title" class="m-0 rounded-lg bg-white border border-indigo-100 p-6 flex flex-col gap-3 max-md:text-center max-md:items-center">
          <div class="flex items-center gap-3 max-md:flex-col">
            <span class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">{{ i + 1 }}</span>
            <UIcon :name="step.icon" class="w-5 h-5 text-indigo-500" />
          </div>
          <h3 class="m-0 text-lg text-gray-800">{{ step.title }}</h3>
          <p class="m-0 text-sm text-gray-600">{{ step.description }}</p>
        </li>
      </ol>
      <div class="mt-10 flex justify-center">
        <CtaBookDemo variant="highlight" position="footer" class="min-h-[40px]" />
      </div>
    </div>
  </div>
</template>
