<script setup lang="ts">
import type { GuidePanelContent } from '~/types/bestpractice'

defineProps<{ panel: GuidePanelContent }>()
</script>

<template>
  <div>
    <div v-if="panel.kicker" class="mb-4">
      <p class="m-0 text-xs font-semibold uppercase tracking-wider text-indigo-600">{{ panel.kicker }}</p>
      <p v-if="panel.kickerNote" class="m-0 mt-1 text-sm text-gray-500">{{ panel.kickerNote }}</p>
    </div>

    <p v-if="panel.diagramTitle" class="m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
      {{ panel.diagramTitle }}
    </p>

    <GuideDiagram
      v-if="panel.diagram"
      :lanes="panel.diagram.lanes"
      :legend="panel.diagram.legend"
      :note="panel.diagram.note"
    />

    <p v-if="panel.summary" class="text-gray-600">{{ panel.summary }}</p>

    <div v-if="panel.useWhen" class="my-5 border-l-4 border-indigo-500 bg-indigo-50 px-4 py-3">
      <p class="m-0 text-xs font-semibold uppercase tracking-wider text-indigo-700">
        {{ panel.useWhenHeading ?? 'Use it when' }}
      </p>
      <p class="m-0 mt-1 text-gray-700">{{ panel.useWhen }}</p>
    </div>

    <div v-if="panel.how" class="my-5">
      <h3 class="m-0 text-xs font-semibold uppercase tracking-wider text-gray-400">
        {{ panel.howHeading ?? 'How it works' }}
      </h3>
      <p class="mt-2 text-gray-600">{{ panel.how }}</p>
    </div>

    <div v-if="panel.lists?.length" class="my-5 grid gap-6 sm:grid-cols-2">
      <div v-for="list in panel.lists" :key="list.heading">
        <h3 class="m-0 text-xs font-semibold uppercase tracking-wider text-gray-400">{{ list.heading }}</h3>
        <ul class="mt-2 list-none p-0">
          <li
            v-for="item in list.items"
            :key="item"
            class="m-0 mb-2 flex gap-2 text-sm text-gray-600"
          >
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="panel.callout"
      class="my-5 rounded-md border px-4 py-3"
      :class="panel.callout.tone === 'watch' ? 'border-red-200 bg-red-50' : 'border-teal-200 bg-teal-50'"
    >
      <p
        class="m-0 text-xs font-semibold uppercase tracking-wider"
        :class="panel.callout.tone === 'watch' ? 'text-red-700' : 'text-teal-700'"
      >{{ panel.callout.tone === 'watch' ? 'Watch out' : 'Good for' }}</p>
      <p class="m-0 mt-1 text-gray-700">{{ panel.callout.text }}</p>
    </div>

    <div v-if="panel.footnote" class="my-5 rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
      <p class="m-0 text-sm text-gray-600">{{ panel.footnote.text }}</p>
      <NuxtLink
        v-if="panel.footnote.link"
        :to="panel.footnote.link.to"
        class="mt-2 inline-block text-sm font-medium"
      >{{ panel.footnote.link.label }}</NuxtLink>
    </div>
  </div>
</template>
