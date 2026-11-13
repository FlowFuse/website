<script setup lang="ts">
// The homepage hero picture: the wireframe plant draws itself in, then steps through
// the six FlowFuse solutions. Each step lights one part of the plant in orange (with
// its data path to the hub), and a callout above it shows the kind of readout that
// solution gives: OEE on a machining centre, throughput on a packaging line, a
// vision reject, a vibration alert, a plunger cycle, a remote battery command.
//
// The readouts are illustrative: they show what each solution surfaces, not a
// customer result, and carry no customer names.
//
// The plant renders fully drawn with the first step already lit (server-side too), so
// nothing waits on load.
//
// Timing has one clock: the active segment's fill animation. When it ends, the next
// step starts (after the last, the first), so the bar and the picture never drift.
// Hovering pauses that animation, which pauses everything. Picking a segment jumps to
// it and carries on from there. Under prefers-reduced-motion the fill doesn't
// animate, so nothing advances on its own; the first step shows still, and the step
// buttons still work.
import { renderScene, HERO_GROUPS, type HeroGroup } from '../../lib/home-iso-scenes'

interface Step {
    group: HeroGroup
    solution: string
    value: string
    detail: string
    kind: 'ring' | 'bars' | 'alert' | 'spark-up' | 'spark-wave' | 'command'
}

const STEPS: Step[] = [
    { group: 'cnc', solution: 'CNC performance', value: 'OEE 78%', detail: 'Machining centre 1, this shift', kind: 'ring' },
    { group: 'packaging', solution: 'Packaging performance', value: '142 packs/min', detail: 'Micro-stop on Line 2, 3 min', kind: 'bars' },
    { group: 'inspection', solution: 'Visual inspection response', value: 'Reject flagged', detail: 'Lane 2 held, QA notified', kind: 'alert' },
    { group: 'vibration', solution: 'Vibration condition monitoring', value: '6.2 mm/s', detail: 'Pump bearing above alert level', kind: 'spark-up' },
    { group: 'well', solution: 'Well & plunger-lift optimization', value: 'Arrival 42 s', detail: 'Plunger cycle tuned for this pad', kind: 'spark-wave' },
    { group: 'energy', solution: 'Remote energy service', value: 'Balance charge sent', detail: 'Battery string 3, approved remotely', kind: 'command' },
]

const STEP_MS = 3600

const boxes = renderScene('hero').groups
const current = ref(0)
const step = computed(() => STEPS[current.value])

// Where the callout points: the top centre of the highlighted part, in % of the picture.
const anchor = computed(() => {
    const b = boxes[step.value.group]
    return { left: (b.x + b.w / 2) * 100, top: b.y * 100 }
})

const hovering = ref(false)

function advance () {
    current.value = (current.value + 1) % STEPS.length
}

// Paths for the small line charts in the callouts (viewBox 0 0 120 36)
const SPARK_UP = 'M2,30 L14,29 L26,30 L38,28 L50,29 L62,27 L74,25 L86,20 L98,14 L110,8 L118,5'
const SPARK_WAVE = 'M2,24 C10,8 18,8 26,24 C34,30 38,30 46,24 C54,8 62,8 70,24 C78,30 82,30 90,24 C98,8 106,8 114,24'
const BARS = [22, 25, 24, 26, 23, 8, 6, 22, 25, 24]
</script>

<template>
  <div class="relative" :class="{ paused: hovering }" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="relative" aria-hidden="true">
      <HomeIsoArt scene="hero" variant="dark" animated :active="step.group" class="w-full" />

      <!-- Callout: a leader line rising from the highlighted part, and a card on top -->
      <Transition name="callout" mode="out-in">
        <div :key="step.group" class="callout-wrap" :style="{ left: `${anchor.left}%`, top: `${anchor.top}%` }">
          <span class="leader" />
          <div class="callout" :style="{ '--nudge': anchor.left < 22 ? '30%' : anchor.left > 78 ? '-30%' : '0%' }">
            <p class="m-0 text-[11px] font-semibold uppercase tracking-wide text-[#ff9d90] whitespace-nowrap">{{ step.solution }}</p>
            <div class="flex items-center gap-3 mt-2">
              <!-- ring: OEE gauge -->
              <svg v-if="step.kind === 'ring'" viewBox="0 0 36 36" class="w-10 h-10 shrink-0">
                <circle cx="18" cy="18" r="15" pathLength="100" class="viz-track" />
                <circle cx="18" cy="18" r="15" pathLength="100" class="viz-ring" transform="rotate(-90 18 18)" />
              </svg>
              <!-- alert: pulsing warning -->
              <svg v-else-if="step.kind === 'alert'" viewBox="0 0 36 36" class="w-10 h-10 shrink-0">
                <path d="M18 4 L33 31 H3 Z" pathLength="1" class="viz-draw viz-warn" />
                <path d="M18 14 V22 M18 26 V26.5" class="viz-warn-mark" />
              </svg>
              <!-- command: approved and sent -->
              <svg v-else-if="step.kind === 'command'" viewBox="0 0 36 36" class="w-10 h-10 shrink-0">
                <circle cx="18" cy="18" r="15" pathLength="1" class="viz-draw viz-ok" />
                <path d="M11 18.5 L16 23.5 L25.5 13" pathLength="1" class="viz-draw viz-ok viz-late" />
              </svg>
              <div class="min-w-0">
                <p class="m-0 text-white text-lg font-medium leading-6 whitespace-nowrap">{{ step.value }}</p>
                <p class="m-0 text-indigo-200 text-xs leading-4">{{ step.detail }}</p>
              </div>
            </div>
            <!-- charts sit under the value -->
            <svg v-if="step.kind === 'spark-up' || step.kind === 'spark-wave' || step.kind === 'bars'" viewBox="0 0 120 36" class="w-full h-9 mt-3">
              <template v-if="step.kind === 'spark-up'">
                <path d="M2,14 H118" class="viz-limit" />
                <path :d="SPARK_UP" pathLength="1" class="viz-draw viz-line-hot" />
              </template>
              <path v-else-if="step.kind === 'spark-wave'" :d="SPARK_WAVE" pathLength="1" class="viz-draw viz-line" />
              <template v-else>
                <rect
                    v-for="(h, i) in BARS"
                    :key="i"
                    :x="4 + i * 11.6"
                    :y="34 - h"
                    width="7"
                    :height="h"
                    class="viz-bar"
                    :class="{ 'viz-bar-hot': h < 10 }"
                    :style="{ animationDelay: `${i * 45}ms` }"
                />
              </template>
            </svg>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Readout for small screens, where a floating card would cover the plant -->
    <div class="sm:hidden mt-2 mx-auto max-w-xs callout callout-static" aria-hidden="true">
      <p class="m-0 text-[11px] font-semibold uppercase tracking-wider text-[#ff9d90]">{{ step.solution }}</p>
      <p class="m-0 mt-1 text-white text-base font-medium">{{ step.value }}</p>
      <p class="m-0 text-indigo-200 text-xs">{{ step.detail }}</p>
    </div>

    <!-- Step control: one segment per solution; the active one fills over its turn -->
    <div class="flex gap-1.5 mt-4 max-w-md mx-auto" role="group" aria-label="Solutions shown in the picture">
      <button
          v-for="(s, i) in STEPS"
          :key="s.group"
          type="button"
          class="seg"
          :class="{ 'seg-on': i === current, 'seg-done': i < current }"
          :aria-label="`Show ${s.solution}`"
          :aria-pressed="i === current"
          :title="s.solution"
          @click="current = i"
      >
        <span
            :key="`${current}-${i}`"
            class="seg-fill"
            :style="{ animationDuration: `${STEP_MS}ms` }"
            @animationend="i === current && advance()"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.callout-wrap {
  position: absolute;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  pointer-events: none;
}
.leader {
  width: 1.5px;
  height: 34px;
  background: linear-gradient(to top, #ff7b6b, rgba(255, 123, 107, 0.15));
  transform-origin: bottom;
  animation: grow 0.45s ease-out both;
}
.callout {
  width: 264px;
  padding: 0.75rem 0.875rem;
  border-radius: 0.75rem;
  background: rgba(20, 27, 64, 0.92);
  border: 1px solid rgba(255, 123, 107, 0.55);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), 0 0 0 4px rgba(255, 123, 107, 0.08);
  backdrop-filter: blur(4px);
  transform: translateX(var(--nudge, 0%));
}
.callout-static { width: auto; transform: none; }
/* Phones: the floating card would cover the plant, so the readout sits under it instead */
@media (max-width: 639px) { .callout-wrap { display: none; } }

.callout-enter-active { transition: opacity 0.35s ease 0.35s, transform 0.35s ease 0.35s; }
.callout-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.callout-enter-from { opacity: 0; transform: translate(-50%, calc(-100% + 8px)); }
.callout-leave-to { opacity: 0; transform: translate(-50%, calc(-100% - 6px)); }

/* Readout drawings: thin lines that draw themselves, like the plant */
.viz-draw { fill: none; stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 0.9s ease-out 0.55s forwards; }
.viz-late { animation-delay: 1.1s; }
.viz-track { fill: none; stroke: #34406e; stroke-width: 3; }
.viz-ring {
  fill: none; stroke: #ff7b6b; stroke-width: 3; stroke-linecap: round;
  stroke-dasharray: 0 100;
  animation: ring 1.1s ease-out 0.55s forwards;
}
.viz-warn { stroke: #ff7b6b; stroke-width: 2; stroke-linejoin: round; }
.viz-warn-mark { stroke: #ff7b6b; stroke-width: 2.4; stroke-linecap: round; animation: blink 1s ease-in-out 1.3s infinite; }
.viz-ok { stroke: #6ee7b7; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.viz-line { stroke: #a5b4fc; stroke-width: 1.6; }
.viz-line-hot { stroke: #ff7b6b; stroke-width: 1.8; }
.viz-limit { stroke: #ff7b6b; stroke-width: 1; stroke-dasharray: 3 3; opacity: 0.5; }
.viz-bar { fill: #3c4a8a; transform-origin: bottom; transform-box: fill-box; animation: rise 0.5s ease-out both; }
.viz-bar-hot { fill: #ff7b6b; }

.seg {
  position: relative;
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(165, 180, 252, 0.18);
  overflow: hidden;
  padding: 0;
  border: 0;
  cursor: pointer;
}
.seg::before { content: ''; position: absolute; inset: -8px 0; } /* bigger hit area */
.seg-done { background: rgba(165, 180, 252, 0.45); }
.seg-fill { position: absolute; inset: 0; width: 0; background: #ff7b6b; }
.seg-on .seg-fill { animation: fill linear forwards; }
.paused .seg-on .seg-fill { animation-play-state: paused; }

@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes ring { to { stroke-dasharray: 78 100; } }
@keyframes grow { from { transform: scaleY(0); } }
@keyframes rise { from { transform: scaleY(0); } }
@keyframes blink { 50% { opacity: 0.25; } }
@keyframes fill { to { width: 100%; } }

@media (prefers-reduced-motion: reduce) {
  .leader, .viz-draw, .viz-ring, .viz-bar, .viz-warn-mark { animation: none; stroke-dashoffset: 0; }
  .viz-ring { stroke-dasharray: 78 100; }
  .seg-on .seg-fill { animation: none; width: 100%; }
  .callout-enter-active, .callout-leave-active { transition: none; }
}
</style>
