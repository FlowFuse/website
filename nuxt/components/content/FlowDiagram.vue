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
}>()

// Allow the terse `from>to` edge shorthand alongside the object form.
const edges = computed<DiagramEdge[]>(() => (props.edges || []).map(e =>
    typeof e === 'string'
        ? { from: e.split('>')[0].trim(), to: e.split('>')[1].trim() }
        : e,
))

const svg = computed(() => buildDiagramSvg({ layout: 'flow', nodes: props.nodes, edges: edges.value, groups: props.groups, legend: props.legend }))
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
</style>
