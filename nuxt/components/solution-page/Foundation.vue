<script setup lang="ts">
// "One solution, every plant": the first solution is the tip of the iceberg, and the
// foundation under it is what every next solution and every next plant reuses.
defineProps<{ solution: string }>()

const LAYERS = [
    { icon: 'i-lucide-cable', text: 'Connected equipment and sensors' },
    { icon: 'i-lucide-database', text: 'A shared data model for every asset' },
    { icon: 'i-lucide-shield-check', text: 'Approvals and change control' },
    { icon: 'i-lucide-sparkles', text: 'FlowFuse AI on your own data' },
    { icon: 'i-lucide-factory', text: 'Deployment to every site' },
]
</script>

<template>
  <section class="w-full py-16 md:py-24 px-6 bg-indigo-50/50 border-y border-indigo-100">
    <div class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="max-md:text-center">
        <h2 class="m-0">One solution, <span class="text-indigo-600">every plant</span></h2>
        <p class="mt-6 text-gray-600">
          What's built for the first line becomes the template for the rest. FlowFuse deploys the same solution to every
          site and keeps them governed and in sync, so plant two takes days, not a new project.
        </p>
        <p class="mt-4 text-gray-600">
          The first solution is only the part you can see. Underneath it is a foundation every next solution reuses.
        </p>
        <slot />
      </div>
      <div class="rounded-lg overflow-hidden border-2 border-indigo-200 bg-white" role="img" :aria-label="`An iceberg: ${solution} sits above the waterline; below it is the reusable foundation of connected equipment, a shared data model, approvals, FlowFuse AI and deployment to every site.`">
        <div class="bg-gradient-to-b from-white to-indigo-50 pt-6 flex flex-col items-center">
          <span class="uppercase text-[11px] font-semibold tracking-widest text-gray-400 mb-3">What you see</span>
          <div class="rounded-lg bg-indigo-600 text-white px-4 py-2 text-center">
            <span class="block font-semibold text-sm">{{ solution }}</span>
            <span class="block text-[11px] text-indigo-100">Your first solution</span>
          </div>
          <svg viewBox="0 0 240 56" class="w-60 mt-2 -mb-px" aria-hidden="true">
            <path d="M60 56 L94 16 L112 26 L128 2 L150 30 L166 22 L196 56 Z" fill="#ffffff" stroke="#c7d2fe" stroke-width="2" stroke-linejoin="round" />
          </svg>
        </div>
        <svg class="block w-full h-5 -mt-px" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 10 C 40 2, 80 18, 120 10 S 200 2, 240 10 S 320 18, 360 10 S 400 4, 400 4 V20 H0 Z" fill="#4f46e5" />
        </svg>
        <div class="bg-gradient-to-b from-indigo-600 to-indigo-800 px-6 pt-2 pb-8">
          <span class="block text-center uppercase text-[11px] font-semibold tracking-widest text-indigo-100 mb-4">The foundation it sits on</span>
          <ul class="list-none p-0 m-0 flex flex-col gap-2">
            <li
                v-for="(layer, i) in LAYERS"
                :key="layer.text"
                class="m-0 rounded-md bg-white/10 border border-white/20 text-white text-sm py-2 px-3 mx-auto flex items-center justify-center gap-2"
                :style="{ width: `${68 + i * 8}%` }"
            >
              <UIcon :name="layer.icon" class="w-4 h-4 text-indigo-100 shrink-0" />
              {{ layer.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
