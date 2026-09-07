<script setup lang="ts">
// MDC: ::flow-diagram — a left→right lane of boxes (Node-RED style). Data comes
// from the block's YAML (nodes / edges / groups).
import { computed } from 'vue'
import { buildDiagramSvg, type DiagramNode, type DiagramEdge, type DiagramGroup, type DiagramLegendItem } from '~/lib/diagram'

const props = defineProps<{
    nodes: DiagramNode[]
    edges?: (DiagramEdge | string)[]
    groups?: DiagramGroup[]
    legend?: DiagramLegendItem[]
    align?: 'center' | 'left'
}>()

// Allow the terse `from>to` edge shorthand alongside the object form.
const edges = computed<DiagramEdge[]>(() => (props.edges || []).map(e =>
    typeof e === 'string'
        ? { from: e.split('>')[0].trim(), to: e.split('>')[1].trim() }
        : e,
))

const svg = computed(() => buildDiagramSvg({ layout: 'flow', align: props.align, nodes: props.nodes, edges: edges.value, groups: props.groups, legend: props.legend }))
</script>

<template>
  <div class="ag-diagram not-prose" v-html="svg" />
</template>

<style>
.ag-diagram {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 28px 32px;
    margin: 1.75rem 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* On desktop the guide pages drop the right-hand TOC, so diagrams break out of
   the text column into that reclaimed width (~50% larger). Text stays narrow. */
@media (min-width: 1024px) {
    .ag-diagram {
        max-width: none;
        margin-left: -24px;
        margin-right: -290px;
    }
}
@media (min-width: 1536px) {
    .ag-diagram { margin-right: -300px; }
}
</style>
