<script setup lang="ts">
import { parseInline } from '../lib/faq-answer.mjs'

type InlineNode =
    | { type: 'text', value: string }
    | { type: 'strong' | 'em', children: InlineNode[] }
    | { type: 'link', href: string, children: InlineNode[] }

const props = defineProps<{
    text?: string
    nodes?: InlineNode[]
}>()

const list = computed<InlineNode[]>(() => props.nodes ?? parseInline(props.text ?? ''))
</script>

<template>
  <template v-for="(node, i) in list" :key="i">
    <template v-if="node.type === 'text'">{{ node.value }}</template>
    <strong v-else-if="node.type === 'strong'"><InlineMarkdown :nodes="node.children" /></strong>
    <em v-else-if="node.type === 'em'"><InlineMarkdown :nodes="node.children" /></em>
    <a v-else :href="node.href"><InlineMarkdown :nodes="node.children" /></a>
  </template>
</template>
