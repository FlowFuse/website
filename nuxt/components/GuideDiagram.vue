<script setup lang="ts">
import type { DiagramLane, DiagramLegendItem } from '~/types/application-guide'

// Every diagram in these guides is the same shape: horizontal lanes (a zone such as
// "OT environment" or "Cloud") holding a row of boxes, with a labelled connector
// between lanes. Driving it from data keeps 30-odd diagrams consistent and editable
// in YAML rather than hand-drawn per page. Styling lives in assets/css/application-guide.css.
defineProps<{
    lanes: DiagramLane[]
    legend?: DiagramLegendItem[]
    note?: string
}>()

const tone = (prefix: string, value?: string) => value ? `${prefix}--${value}` : ''
</script>

<template>
  <figure class="ag-diagram">
    <div class="ag-lanes">
      <template v-for="(lane, i) in lanes" :key="i">
        <!-- Connector between two zones -->
        <div v-if="lane.link" class="ag-link">
          <span class="ag-link-label">{{ lane.link }}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
            <path d="M8 1v11" stroke="currentColor" stroke-width="1.5" />
            <path d="M4 9l4 5 4-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <!-- A zone and the boxes inside it -->
        <div v-else class="ag-zone" :class="tone('ag-zone', lane.tone)">
          <p v-if="lane.label" class="ag-zone-label">{{ lane.label }}</p>
          <div class="ag-boxes">
            <div
              v-for="node in lane.nodes"
              :key="node.title + (node.sub ?? '')"
              class="ag-box"
              :class="tone('ag-box', node.tone)"
            >
              <p class="ag-box-title">{{ node.title }}</p>
              <p v-if="node.sub" class="ag-box-sub">{{ node.sub }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <figcaption v-if="legend?.length || note">
      <ul v-if="legend?.length" class="ag-legend">
        <li v-for="item in legend" :key="item.label">
          <span class="ag-dot" :class="tone('ag-dot', item.tone)" />
          {{ item.label }}
        </li>
      </ul>
      <p v-if="note" class="ag-diagram-note">{{ note }}</p>
    </figcaption>
  </figure>
</template>
