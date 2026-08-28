<script setup lang="ts">
// Animated flow connector between diagram lanes.
// A faint track + continuously flowing dashes (stroke-dashoffset) + a GPU-driven
// glow "packet" (transform: translateY) travelling the line. Reduced-motion aware.
const props = defineProps<{ label: string; tone?: 'ot' | 'it' | 'fleet' | 'broker' | 'indigo' }>()
const TONE: Record<string, string> = {
  ot: '#DA3D0B', it: '#4f46e5', fleet: '#35AAB0', broker: '#35AAB0', indigo: '#4f46e5',
}
const color = computed(() => TONE[props.tone ?? 'indigo'])
</script>

<template>
  <div class="gs-flow" :style="{ '--flow': color }">
    <svg class="gs-flow__svg" width="24" height="104" viewBox="0 0 24 104" preserveAspectRatio="none" aria-hidden="true">
      <line x1="12" y1="2" x2="12" y2="102" class="gs-flow__track" />
      <line x1="12" y1="2" x2="12" y2="102" class="gs-flow__dash" />
    </svg>
    <span class="gs-flow__dot" aria-hidden="true"></span>
    <span class="gs-flow__pill">{{ label }}</span>
    <svg class="gs-flow__arrow" width="16" height="9" viewBox="0 0 16 9" aria-hidden="true">
      <path d="M1.5 1.5L8 7.5l6.5-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </div>
</template>

<style scoped>
.gs-flow { position: relative; height: 104px; display: grid; place-items: center; margin: .2rem 0; }
.gs-flow__svg { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 24px; height: 104px; overflow: visible; }
.gs-flow__track { stroke: #dfe3ee; stroke-width: 2; stroke-linecap: round; }
.gs-flow__dash { stroke: var(--flow); stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 2 11; stroke-dashoffset: 0; opacity: .85; animation: gs-flow-dash .85s linear infinite; }

/* glow packet — transform-animated for buttery smoothness */
.gs-flow__dot { position: absolute; top: 0; left: 50%; width: 9px; height: 9px; border-radius: 9999px; background: var(--flow); box-shadow: 0 0 10px 2px color-mix(in srgb, var(--flow) 55%, transparent); transform: translate(-50%, 0); animation: gs-flow-dot 2.1s linear infinite; will-change: transform, opacity; }

.gs-flow__pill { position: relative; z-index: 2; padding: .42rem .9rem; border-radius: 9999px; background: #fff; border: 1px solid #e2e6f0; box-shadow: 0 2px 8px rgba(2,6,13,0.07); font-size: .63rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #64748b; text-align: center; max-width: 92%; }
.gs-flow__arrow { position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); z-index: 1; color: var(--flow); opacity: .75; }

@keyframes gs-flow-dash { to { stroke-dashoffset: -13; } }
@keyframes gs-flow-dot {
  0% { transform: translate(-50%, 2px); opacity: 0; }
  14% { opacity: 1; }
  86% { opacity: 1; }
  100% { transform: translate(-50%, 96px); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .gs-flow__dash { animation: none; }
  .gs-flow__dot { display: none; }
}
</style>
