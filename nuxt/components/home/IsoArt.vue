<script setup lang="ts">
// Renders one of the homepage's isometric wireframe scenes (nuxt/lib/home-iso-scenes.ts)
// as inline SVG. Decorative, so it's hidden from assistive tech; the copy beside it
// carries the meaning. Animation is CSS only and stops under prefers-reduced-motion.
//
// `animated` is for the hero: `active` names one group (see IsoScene.tag) that turns
// orange, and an orange trace redraws its outline each time `active` changes. The
// scene itself renders fully drawn, so the first step can start on page load.
// The trace draws with stroke-dashoffset on pathLength="1". Chrome ignores pathLength
// on non-scaling strokes, so an animated scene uses ordinary strokes instead, sized
// from the viewBox to land near the static scenes' 1.15px at desktop width.
import { renderScene, type SceneName } from '../../lib/home-iso-scenes'

const props = withDefaults(defineProps<{
    scene: SceneName
    variant?: 'dark' | 'light'
    animated?: boolean
    active?: string
}>(), { variant: 'light', animated: false, active: undefined })

const art = computed(() => renderScene(props.scene))

// Stroke width in viewBox units: 1.2px when the picture is drawn ~640px wide.
const strokeWidth = computed(() => {
    const width = Number(art.value.viewBox.split(' ')[2])
    return (1.2 * width) / 640
})

// Flow lines keep their own dash pattern, and dots have no outline, so neither is traced.
function traceable (role: string) {
    return role !== 'flow' && role !== 'dot'
}
</script>

<template>
  <svg
      :viewBox="art.viewBox"
      class="iso-art"
      :class="[`iso-${props.variant}`, { 'iso-animated': props.animated }]"
      :style="props.animated ? { '--sw': strokeWidth } : undefined"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
  >
    <template v-for="(s, i) in art.shapes" :key="i">
      <polygon
          v-if="s.kind === 'poly'"
          :points="s.points"
          :class="[`r-${s.role}`, `t-${s.tone}`, { 'is-on': props.active && s.group === props.active }]"
      />
      <path
          v-else-if="s.kind === 'path'"
          :d="s.d"
          :class="[`r-${s.role}`, `t-${s.tone}`, { 'is-on': props.active && s.group === props.active }]"
      />
      <circle
          v-else
          :cx="s.cx"
          :cy="s.cy"
          :r="s.r"
          :class="[`r-${s.role}`, `t-${s.tone}`, { 'is-on': props.active && s.group === props.active }]"
      />
      <!-- The orange trace: a stroke-only twin drawn straight after the shape it traces,
           so anything in front of it still covers it. Keyed on `active` to replay. -->
      <template v-if="props.animated && props.active && s.group === props.active && traceable(s.role)">
        <polygon v-if="s.kind === 'poly'" :key="`t${i}-${props.active}`" :points="s.points" pathLength="1" class="trace" />
        <path v-else-if="s.kind === 'path'" :key="`t${i}-${props.active}`" :d="s.d" pathLength="1" class="trace" />
      </template>
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
.r-dot.t-line { fill: var(--stroke); }
.r-dot.t-accent { animation: iso-pulse 2.4s ease-in-out infinite; }

@keyframes iso-flow { to { stroke-dashoffset: -7.6; } }
@keyframes iso-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

/* ---- Animated scenes (the hero) ---- */

.iso-animated polygon, .iso-animated path, .iso-animated circle {
  vector-effect: none;
  stroke-width: calc(var(--sw) * 1px);
  transition: stroke 0.5s ease, fill 0.5s ease;
}
.iso-animated .r-flow {
  stroke-width: calc(var(--sw) * 1.25px);
  stroke-dasharray: calc(var(--sw) * 1.1px) calc(var(--sw) * 2.4px);
  animation: iso-flow-scaled 1.6s linear infinite;
}
@keyframes iso-flow-scaled { to { stroke-dashoffset: calc(var(--sw) * -7px); } }

/* The highlighted group: orange outline, warm fill, its data path running orange */
.iso-animated .is-on { stroke: var(--accent); }
.iso-animated .is-on.r-top, .iso-animated .is-on.r-left, .iso-animated .is-on.r-right { fill: var(--accent-fill); }
.iso-animated .is-on.r-dot { fill: var(--accent); animation: iso-pulse 1.2s ease-in-out infinite; }
.iso-animated .r-flow.is-on { stroke-width: calc(var(--sw) * 1.6px); }

/* The trace: a brighter, heavier orange line that draws itself around the group */
.trace {
  fill: none;
  stroke: var(--accent);
  stroke-width: calc(var(--sw) * 1.9px);
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  filter: drop-shadow(0 0 calc(var(--sw) * 2.5px) rgba(255, 123, 107, 0.65));
  animation: iso-draw 0.9s cubic-bezier(0.5, 0, 0.2, 1) forwards;
}

@keyframes iso-draw { to { stroke-dashoffset: 0; } }

@media (prefers-reduced-motion: reduce) {
  .r-flow, .r-dot.t-accent { animation: none; }
  .iso-animated polygon, .iso-animated path, .iso-animated circle, .iso-animated .r-flow, .trace {
    animation: none !important;
    stroke-dashoffset: 0;
    transition: none;
  }
}
</style>
