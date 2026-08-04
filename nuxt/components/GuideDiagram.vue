<script setup lang="ts">
import type { DiagramLane, DiagramLegendItem } from '~/types/bestpractice'

// Every diagram in these guides is the same shape: horizontal lanes (a zone such as
// "OT environment" or "Cloud") holding a row of boxes, with a labelled connector
// between lanes. Driving it from data keeps 30-odd diagrams consistent and editable
// in YAML rather than hand-drawn per page.
defineProps<{
    lanes: DiagramLane[]
    legend?: DiagramLegendItem[]
    note?: string
}>()

const zoneTone = (tone?: string) => ({
    ot: 'border-red-200 bg-red-50/60',
    it: 'border-indigo-200 bg-indigo-50/60',
    dmz: 'border-amber-200 bg-amber-50/60',
    cloud: 'border-indigo-200 bg-indigo-50/40',
    broker: 'border-teal-200 bg-teal-50/60',
    neutral: 'border-gray-200 bg-gray-50/70',
}[tone ?? 'neutral'] ?? 'border-gray-200 bg-gray-50/70')

const zoneLabelTone = (tone?: string) => ({
    ot: 'text-red-700',
    it: 'text-indigo-700',
    dmz: 'text-amber-700',
    cloud: 'text-indigo-700',
    broker: 'text-teal-700',
    neutral: 'text-gray-500',
}[tone ?? 'neutral'] ?? 'text-gray-500')

const nodeTone = (tone?: string) => ({
    ot: 'border-red-300 bg-white',
    it: 'border-indigo-300 bg-white',
    cloud: 'border-indigo-300 bg-white',
    broker: 'border-teal-300 bg-white',
    muted: 'border-gray-200 bg-gray-50',
    strong: 'border-gray-800 bg-gray-800 text-white',
    neutral: 'border-gray-300 bg-white',
}[tone ?? 'neutral'] ?? 'border-gray-300 bg-white')

const dotTone = (tone?: string) => ({
    ot: 'bg-red-400',
    it: 'bg-indigo-400',
    dmz: 'bg-amber-400',
    cloud: 'bg-indigo-300',
    broker: 'bg-teal-400',
    muted: 'bg-gray-300',
    neutral: 'bg-gray-400',
}[tone ?? 'neutral'] ?? 'bg-gray-400')
</script>

<template>
  <figure class="my-6 overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
    <div class="min-w-[18rem] flex flex-col gap-2">
      <template v-for="(lane, i) in lanes" :key="i">
        <!-- Connector between two zones -->
        <div v-if="lane.link" class="flex flex-col items-center py-1 text-gray-400">
          <span class="text-xs font-medium tracking-wide text-gray-500">{{ lane.link }}</span>
          <svg class="h-4 w-4" viewBox="0 0 16 16" aria-hidden="true" fill="none">
            <path d="M8 1v11" stroke="currentColor" stroke-width="1.5" />
            <path d="M4 9l4 5 4-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <!-- A zone and the boxes inside it -->
        <div v-else class="rounded-lg border border-dashed p-3 sm:p-4" :class="zoneTone(lane.tone)">
          <p
            v-if="lane.label"
            class="m-0 mb-3 text-[0.7rem] font-semibold uppercase tracking-wider"
            :class="zoneLabelTone(lane.tone)"
          >{{ lane.label }}</p>
          <div class="flex flex-wrap gap-2 sm:gap-3">
            <div
              v-for="node in lane.nodes"
              :key="node.title + (node.sub ?? '')"
              class="flex-1 min-w-[8.5rem] rounded-md border px-3 py-2 text-center"
              :class="nodeTone(node.tone)"
            >
              <p class="m-0 text-sm font-semibold leading-tight">{{ node.title }}</p>
              <p v-if="node.sub" class="m-0 mt-0.5 text-xs leading-tight opacity-70">{{ node.sub }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <figcaption v-if="legend?.length || note" class="mt-4 border-t border-gray-100 pt-3">
      <ul v-if="legend?.length" class="m-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
        <li v-for="item in legend" :key="item.label" class="m-0 flex items-center gap-2 text-xs text-gray-500">
          <span class="h-2 w-2 shrink-0 rounded-full" :class="dotTone(item.tone)" />
          {{ item.label }}
        </li>
      </ul>
      <p v-if="note" class="m-0 mt-2 text-xs italic text-gray-500">{{ note }}</p>
    </figcaption>
  </figure>
</template>
