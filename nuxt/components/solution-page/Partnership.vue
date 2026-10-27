<script setup lang="ts">
// How FlowFuse builds a solution with the customer: the Foundation Partnership's three
// stages, Define, Design, Deliver. Shared by every solution page so the stages read the
// same everywhere. Process only: no fees, scope or durations (still internal proposals).
defineProps<{ image: string, imageAlt: string }>()

const STAGES = [
    { step: 'Define', description: 'Our engineers and your team pick one real operational problem, agree what success looks like, and map the equipment and data behind it.' },
    { step: 'Design', description: 'Together we design the solution on a reusable foundation (connections, data model, governance and AI agents) and build it into your environment.' },
    { step: 'Deliver', description: 'It goes into production on your equipment. Your team is trained alongside ours, so you own it and can extend it yourselves.' },
]
</script>

<template>
  <section class="w-full py-16 md:py-24 px-6">
    <div class="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="relative max-md:max-w-md max-md:mx-auto w-full">
        <div class="absolute -top-4 -left-4 w-full h-full rounded-lg bg-gradient-to-tl from-red-200 via-red-100 to-red-50" aria-hidden="true" />
        <div class="relative rounded-lg border-2 border-red-100 overflow-hidden aspect-[4/5] md:aspect-[4/5] ff-image-cover">
          <img :src="image" :alt="imageAlt" loading="lazy">
        </div>
      </div>
      <div>
        <h2 class="m-0 max-md:text-center">We build it <span class="text-indigo-600">with you</span></h2>
        <p class="mt-4 text-gray-600 max-md:text-center">
          The Foundation Partnership: FlowFuse engineers work alongside your team, not instead of it.
        </p>
        <ol class="list-none p-0 m-0 mt-8">
          <li v-for="(stage, i) in STAGES" :key="stage.step" class="relative m-0 pl-16 pb-8 last:pb-0">
            <span v-if="i < STAGES.length - 1" class="absolute left-[21px] top-12 bottom-0 w-0.5 bg-indigo-100" aria-hidden="true" />
            <span class="absolute left-0 top-0 w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold">{{ i + 1 }}</span>
            <h3 class="m-0 text-xl text-gray-800">{{ stage.step }}</h3>
            <p class="mt-2 mb-0 text-gray-600">{{ stage.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
