<script setup lang="ts">
import { parseInline } from '../lib/inline-markdown.mjs'
import { ctaLink } from '../lib/cta-destinations'

type InlineNode =
    | { type: 'text', value: string }
    | { type: 'strong' | 'em', children: InlineNode[] }
    | { type: 'link', href: string, children: InlineNode[] }

const props = defineProps<{
    text?: string
    nodes?: InlineNode[]
    position: string
}>()

const list = computed<InlineNode[]>(() => props.nodes ?? parseInline(props.text ?? ''))
const ctas = computed(() => list.value.map(node => node.type === 'link' ? ctaLink(node.href) : undefined))
</script>

<template>
  <template v-for="(node, i) in list" :key="i">
    <template v-if="node.type === 'text'">{{ node.value }}</template>
    <strong v-else-if="node.type === 'strong'"><InlineMarkdown :nodes="node.children" :position="position" /></strong>
    <em v-else-if="node.type === 'em'"><InlineMarkdown :nodes="node.children" :position="position" /></em>
    <CtaLink v-else-if="ctas[i]" :destination="ctas[i]!.destination" :query="ctas[i]!.query" :position="position"><InlineMarkdown :nodes="node.children" :position="position" /></CtaLink>
    <a v-else :href="node.href"><InlineMarkdown :nodes="node.children" :position="position" /></a>
  </template>
</template>
