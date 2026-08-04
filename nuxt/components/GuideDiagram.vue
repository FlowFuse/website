<script setup lang="ts">
import type { DiagramLane, DiagramLegendItem } from '~/types/bestpractice'

// Every diagram in these guides is the same shape: horizontal lanes (a zone such as
// "OT environment" or "Cloud") holding a row of boxes, with a labelled connector
// between lanes. Driving it from data keeps 30-odd diagrams consistent and editable
// in YAML rather than hand-drawn per page. Styling lives in assets/css/bestpractice.css.
defineProps<{
    lanes: DiagramLane[]
    legend?: DiagramLegendItem[]
    note?: string
}>()

const tone = (prefix: string, value?: string) => value ? `${prefix}--${value}` : ''
</script>

<template>
  <figure class="bp-diagram">
    <div class="bp-lanes">
      <template v-for="(lane, i) in lanes" :key="i">
        <!-- Connector between two zones -->
        <div v-if="lane.link" class="bp-link">
          <span class="bp-link-label">{{ lane.link }}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
            <path d="M8 1v11" stroke="currentColor" stroke-width="1.5" />
            <path d="M4 9l4 5 4-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <!-- A zone and the boxes inside it -->
        <div v-else class="bp-zone" :class="tone('bp-zone', lane.tone)">
          <p v-if="lane.label" class="bp-zone-label">{{ lane.label }}</p>
          <div class="bp-boxes">
            <div
              v-for="node in lane.nodes"
              :key="node.title + (node.sub ?? '')"
              class="bp-box"
              :class="tone('bp-box', node.tone)"
            >
              <p class="bp-box-title">{{ node.title }}</p>
              <p v-if="node.sub" class="bp-box-sub">{{ node.sub }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <figcaption v-if="legend?.length || note">
      <ul v-if="legend?.length" class="bp-legend">
        <li v-for="item in legend" :key="item.label">
          <span class="bp-dot" :class="tone('bp-dot', item.tone)" />
          {{ item.label }}
        </li>
      </ul>
      <p v-if="note" class="bp-diagram-note">{{ note }}</p>
    </figcaption>
  </figure>
</template>
