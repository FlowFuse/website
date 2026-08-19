<script setup lang="ts">
// MDC: ::arch-diagram — boxes placed on a small grid by col/row (architecture /
// network style), with optional dashed groups. Data comes from the block's YAML.
import { computed } from 'vue'
import { buildDiagramSvg, type DiagramNode, type DiagramEdge, type DiagramGroup, type DiagramLegendItem } from '~/lib/diagram'

const props = defineProps<{
    nodes: DiagramNode[]
    edges?: (DiagramEdge | string)[]
    groups?: DiagramGroup[]
    legend?: DiagramLegendItem[]
    align?: 'center' | 'left'
}>()

const edges = computed<DiagramEdge[]>(() => (props.edges || []).map(e =>
    typeof e === 'string'
        ? { from: e.split('>')[0].trim(), to: e.split('>')[1].trim() }
        : e,
))

const svg = computed(() => buildDiagramSvg({ layout: 'grid', align: props.align, nodes: props.nodes, edges: edges.value, groups: props.groups, legend: props.legend }))
</script>

<template>
  <div class="ag-diagram not-prose" v-html="svg" />
</template>
