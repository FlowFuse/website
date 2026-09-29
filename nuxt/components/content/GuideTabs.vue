<script setup lang="ts">
// Application Guide tabbed container (MDC). Uniquely named to avoid colliding
// with Nuxt UI's global `Tabs`, and self-contained (markup + styles + behaviour)
// so it can't half-load.
//
// Tab-bar labels are read synchronously from the child <GuideTab> slot VNodes,
// so the bar is correct at SSR render time (a reactive registry would render the
// bar before children mount → empty bar). Each <GuideTab> registers via the
// provided counter to get its index, and self-hides through the shared `active`.
//
//   :::guide-tabs
//   ::guide-tab{label="Packaged App"}
//   …markdown…
//   ::
//   :::
import { ref, computed, provide, useSlots, type VNode } from 'vue'

const slots = useSlots()
const active = ref(0)

function collectLabels(nodes: VNode[] | undefined, out: string[]) {
    for (const n of nodes || []) {
        if (!n || typeof n !== 'object') continue
        const label = (n.props as Record<string, unknown> | null)?.label
        const typeName = typeof n.type === 'object' ? ((n.type as { __name?: string, name?: string }).__name || (n.type as { name?: string }).name) : n.type
        if (typeName === 'GuideTab' || typeof label === 'string') {
            out.push(typeof label === 'string' ? label : 'Tab')
        } else if (Array.isArray(n.children)) {
            collectLabels(n.children as VNode[], out)
        }
    }
    return out
}

const labels = computed(() => collectLabels(slots.default?.(), []))

let counter = 0
function register() { return counter++ }
provide('guideTabs', { active, register })
</script>

<template>
  <div class="ff-tabs not-prose">
    <div class="ff-tabs-bar" role="tablist">
      <button
        v-for="(label, i) in labels"
        :key="i"
        type="button"
        role="tab"
        class="ff-tab-btn"
        :class="{ 'ff-tab-btn--active': active === i }"
        :aria-selected="active === i"
        @click="active = i"
      >{{ label }}</button>
    </div>
    <div class="ff-tabs-panels">
      <slot />
    </div>
  </div>
</template>

<style>
/* Unscoped on purpose: also styles the child GuideTab panels. Brand indigo. */
.ff-tabs {
    display: block;
    margin: 1.75rem 0;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    background: #fff;
}
.ff-tabs-bar {
    display: flex;
    flex-flow: row wrap;
    gap: 0.25rem;
    padding: 0.4rem 0.4rem 0;
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
}
.ff-tab-btn {
    appearance: none;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0.55rem 0.95rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #64748b;
    line-height: 1.2;
    border-radius: 0.4rem 0.4rem 0 0;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: color 0.12s ease, background 0.12s ease, border-color 0.12s ease;
}
.ff-tab-btn:hover { color: #4f46e5; background: #eef2ff; }
.ff-tab-btn--active {
    color: #4f46e5;
    background: #fff;
    border-bottom-color: #4f46e5;
}
.ff-tabs-panels { display: block; padding: 1.25rem 1.35rem; }
.ff-tab-panel > :first-child { margin-top: 0; }
.ff-tab-panel > :last-child { margin-bottom: 0; }

/* No desktop breakout. This box used to widen itself into the right-hand column on
   the assumption that guide pages had no TOC. They are docs pages now and that column
   holds a real table of contents, so a wider box would simply run underneath it. The
   diagrams inside are SVG and scale to whatever width they are given. */
</style>
