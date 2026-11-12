<script setup lang="ts">
// Renders one of the homepage's isometric wireframe scenes (nuxt/lib/home-iso-scenes.ts)
// as inline SVG. Decorative, so it's hidden from assistive tech; the copy beside it
// carries the meaning. Animation is CSS only and stops under prefers-reduced-motion.
import { renderScene, type SceneName } from '../../lib/home-iso-scenes'

const props = withDefaults(defineProps<{
    scene: SceneName
    variant?: 'dark' | 'light'
}>(), { variant: 'light' })

const art = computed(() => renderScene(props.scene))
</script>

<template>
  <svg
      :viewBox="art.viewBox"
      class="iso-art"
      :class="`iso-${props.variant}`"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
  >
    <template v-for="(s, i) in art.shapes" :key="i">
      <polygon v-if="s.kind === 'poly'" :points="s.points" :class="[`r-${s.role}`, `t-${s.tone}`]" />
      <path v-else-if="s.kind === 'path'" :d="s.d" :class="[`r-${s.role}`, `t-${s.tone}`]" />
      <circle v-else :cx="s.cx" :cy="s.cy" :r="s.r" :class="[`r-${s.role}`, `t-${s.tone}`]" />
    </template>
  </svg>
</template>

<style scoped>
.iso-art { display: block; width: 100%; height: auto; overflow: visible; }

.iso-dark {
  --stroke: #a5b4fc;
  --muted: #34406e;
  --accent: #ff7b6b;
  --top: #1c2650;
  --left: #151d3e;
  --right: #10173a;
  --floor: #111a3d;
  --accent-fill: #3b2546;
}
.iso-light {
  --stroke: #6366f1;
  --muted: #c7d2fe;
  --accent: #ef4444;
  --top: #ffffff;
  --left: #eef2ff;
  --right: #e0e7ff;
  --floor: #f5f7ff;
  --accent-fill: #fff1f0;
}

polygon, path, circle {
  vector-effect: non-scaling-stroke;
  stroke-width: 1.15px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.t-line { stroke: var(--stroke); }
.t-muted { stroke: var(--muted); }
.t-accent { stroke: var(--accent); }

.r-top { fill: var(--top); }
.r-left { fill: var(--left); }
.r-right { fill: var(--right); }
.r-top.t-muted { fill: var(--floor); }
.r-left.t-muted, .r-right.t-muted { fill: var(--floor); }
.r-top.t-accent, .r-left.t-accent, .r-right.t-accent { fill: var(--accent-fill); }
.r-none { fill: none; }
.r-none.t-accent { fill: var(--accent-fill); }
path.r-none:not([d$='Z']) { fill: none; }

.r-flow {
  fill: none;
  stroke-width: 1.4px;
  stroke-dasharray: 1.2 2.6;
  animation: iso-flow 1.6s linear infinite;
}
.r-dot { fill: var(--accent); stroke: none; }
.r-dot.t-muted { fill: var(--muted); }
.r-dot.t-line { fill: var(--top); stroke: var(--stroke); }
.r-dot.t-accent { animation: iso-pulse 2.4s ease-in-out infinite; }

@keyframes iso-flow { to { stroke-dashoffset: -7.6; } }
@keyframes iso-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

@media (prefers-reduced-motion: reduce) {
  .r-flow, .r-dot.t-accent { animation: none; }
}
</style>
