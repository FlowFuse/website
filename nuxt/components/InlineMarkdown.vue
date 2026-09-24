<script setup lang="ts">
import { parseInline } from '../lib/inline-markdown.mjs'
import { ctaDestinationKey, ctaQuery } from '../lib/cta-destinations'

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
</script>

<template>
  <template v-for="(node, i) in list" :key="i">
    <template v-if="node.type === 'text'">{{ node.value }}</template>
    <strong v-else-if="node.type === 'strong'"><InlineMarkdown :nodes="node.children" :position="position" /></strong>
    <em v-else-if="node.type === 'em'"><InlineMarkdown :nodes="node.children" :position="position" /></em>
    <CtaLink v-else-if="ctaDestinationKey(node.href)" :destination="ctaDestinationKey(node.href)!" :query="ctaQuery(node.href)" :position="position"><InlineMarkdown :nodes="node.children" :position="position" /></CtaLink>
    <a v-else :href="node.href"><InlineMarkdown :nodes="node.children" :position="position" /></a>
  </template>
</template>
