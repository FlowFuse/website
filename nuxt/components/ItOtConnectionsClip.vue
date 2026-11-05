<script setup lang="ts">
// A looping "clip" for the IT/OT middleware page's Connected Operations row: plant protocols
// on the left and business systems on the right connect to FlowFuse one by one, with data
// moving both ways on every link (results toward the business, decisions toward the line), then the
// whole picture resets and plays again. Drawn as one SVG on the frame's 430x289 shape so it
// scales with the frame. With reduced motion on, everything shows connected and still.

const OT = ['OPC UA', 'Modbus', 'Siemens S7', 'EtherNet/IP', 'MQTT', 'BACnet']
const IT = ['ERP', 'MES', 'CMMS', 'SQL Server', 'Kafka', 'Azure']

const W = 430
const H = 289
const CHIP_W = 96
const CHIP_H = 24
const HUB = { x: 160, y: 122, w: 110, h: 44 }
const ROW_Y = (i: number) => 52 + i * 39 // chip centers
const HUB_CY = HUB.y + HUB.h / 2

const uid = useId()

// Interleave the sides so both connect together: OT 1, IT 1, OT 2, IT 2, ...
const ORDER = OT.flatMap((_, i) => [{ side: 'ot' as const, i }, { side: 'it' as const, i }])

function path(side: 'ot' | 'it', i: number) {
    const y = ROW_Y(i)
    if (side === 'ot') {
        const x1 = 14 + CHIP_W
        const x2 = HUB.x
        return `M${x1},${y} C${x1 + 30},${y} ${x2 - 30},${HUB_CY} ${x2},${HUB_CY}`
    }
    const x1 = HUB.x + HUB.w
    const x2 = W - 14 - CHIP_W
    return `M${x1},${HUB_CY} C${x1 + 30},${HUB_CY} ${x2 - 30},${y} ${x2},${y}`
}

const STEP_MS = 650
const HOLD_MS = 2600
const FADE_MS = 450

const shown = ref(0) // how many of ORDER are connected
const fading = ref(false)
const root = ref<SVGSVGElement | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let observer: IntersectionObserver | undefined

function isShown(side: 'ot' | 'it', i: number) {
    const idx = ORDER.findIndex(o => o.side === side && o.i === i)
    return idx < shown.value
}
function isLatest(side: 'ot' | 'it', i: number) {
    const last = ORDER[shown.value - 1]
    return !!last && last.side === side && last.i === i && shown.value < ORDER.length
}

function tick() {
    if (shown.value < ORDER.length) {
        shown.value++
        timer = setTimeout(tick, shown.value === ORDER.length ? HOLD_MS : STEP_MS)
    } else {
        fading.value = true
        timer = setTimeout(() => {
            shown.value = 0
            fading.value = false
            timer = setTimeout(tick, 400)
        }, FADE_MS)
    }
}

function start() {
    if (timer) return
    timer = setTimeout(tick, 300)
}
function stop() {
    clearTimeout(timer)
    timer = undefined
}

onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        shown.value = ORDER.length
        return
    }
    observer = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) start()
        else stop()
    }, { threshold: 0.3 })
    if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => {
    stop()
    observer?.disconnect()
})
</script>

<template>
  <svg
      ref="root"
      :viewBox="`0 0 ${W} ${H}`"
      class="w-full h-full block bg-gray-50"
      role="img"
      aria-label="OPC UA, Modbus, Siemens S7, EtherNet/IP, MQTT and BACnet on the plant side, and ERP, MES, CMMS, SQL Server, Kafka and Azure on the business side, each connecting to FlowFuse in the middle, with decisions flowing down to the line and results flowing up to the business"
  >
    <defs>
      <pattern :id="`${uid}-grid`" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" class="fill-gray-200" />
      </pattern>
    </defs>
    <rect :width="W" :height="H" :fill="`url(#${uid}-grid)`" />

    <g class="clip-scene" :class="{ 'is-fading': fading }">
      <!-- Column headers -->
      <text x="62" y="26" text-anchor="middle" class="fill-gray-400 text-[8px] font-semibold tracking-widest">OT · PLANT</text>
      <text :x="W - 62" y="26" text-anchor="middle" class="fill-gray-400 text-[8px] font-semibold tracking-widest">IT · BUSINESS</text>

      <!-- Links and the data moving along them -->
      <template v-for="o in ORDER" :key="`l-${o.side}-${o.i}`">
        <path
            :id="`${uid}-${o.side}-${o.i}`"
            :d="path(o.side, o.i)"
            pathLength="1"
            fill="none"
            stroke-width="1.5"
            class="clip-link"
            :class="[o.side === 'ot' ? 'stroke-slate-400' : 'stroke-indigo-400', { 'is-on': isShown(o.side, o.i) }]"
        />
        <!-- Both ways on every link: results travel toward the business (slate), decisions toward the line (indigo) -->
        <template v-if="isShown(o.side, o.i)">
          <circle r="2.2" class="fill-slate-500">
            <animateMotion :dur="`${2 + (o.i % 3) * 0.3}s`" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath :href="`#${uid}-${o.side}-${o.i}`" />
            </animateMotion>
          </circle>
          <circle r="2.2" class="fill-indigo-600">
            <animateMotion :dur="`${2 + (o.i % 3) * 0.3}s`" :begin="`${0.9 + (o.i % 2) * 0.4}s`" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath :href="`#${uid}-${o.side}-${o.i}`" />
            </animateMotion>
          </circle>
        </template>
      </template>

      <!-- Chips -->
      <template v-for="(label, i) in OT" :key="`ot-${label}`">
        <g class="clip-chip" :class="{ 'is-on': isShown('ot', i), 'is-latest': isLatest('ot', i) }">
          <rect x="14" :y="ROW_Y(i) - CHIP_H / 2" :width="CHIP_W" :height="CHIP_H" rx="5" class="fill-white stroke-slate-300" stroke-width="1" />
          <text :x="14 + CHIP_W / 2" :y="ROW_Y(i) + 3.5" text-anchor="middle" class="fill-gray-700 text-[10px] font-medium">{{ label }}</text>
        </g>
      </template>
      <template v-for="(label, i) in IT" :key="`it-${label}`">
        <g class="clip-chip" :class="{ 'is-on': isShown('it', i), 'is-latest': isLatest('it', i) }">
          <rect :x="W - 14 - CHIP_W" :y="ROW_Y(i) - CHIP_H / 2" :width="CHIP_W" :height="CHIP_H" rx="5" class="fill-white stroke-indigo-200" stroke-width="1" />
          <text :x="W - 14 - CHIP_W / 2" :y="ROW_Y(i) + 3.5" text-anchor="middle" class="fill-gray-700 text-[10px] font-medium">{{ label }}</text>
        </g>
      </template>

      <!-- FlowFuse in the middle -->
      <rect :x="HUB.x" :y="HUB.y" :width="HUB.w" :height="HUB.h" rx="8" class="fill-white stroke-indigo-500" stroke-width="1.5" />
      <image href="/images/ff-logo--wordmark--light.svg" :x="HUB.x + 16" :y="HUB.y + 12" :width="HUB.w - 32" height="20" preserveAspectRatio="xMidYMid meet" />

      <!-- Running count under the hub -->
      <text :x="W / 2" :y="HUB.y + HUB.h + 20" text-anchor="middle" class="fill-gray-500 text-[9px]">
        {{ shown }} {{ shown === 1 ? 'system' : 'systems' }} connected
      </text>
      <g class="fill-gray-500 text-[8px]">
        <circle :cx="W / 2 - 86" :cy="H - 16" r="2.6" class="fill-indigo-600" />
        <text :x="W / 2 - 80" :y="H - 13">decisions to the line</text>
        <circle :cx="W / 2 + 6" :cy="H - 16" r="2.6" class="fill-slate-500" />
        <text :x="W / 2 + 12" :y="H - 13">results to the business</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.clip-scene {
    transition: opacity 450ms ease;
}
.clip-scene.is-fading {
    opacity: 0;
}
.clip-link {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset 500ms ease-out;
}
.clip-link.is-on {
    stroke-dashoffset: 0;
}
.clip-chip {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    transform: scale(0.92);
    transition: opacity 300ms ease, transform 300ms ease;
}
.clip-chip.is-on {
    opacity: 1;
    transform: scale(1);
}
.clip-chip.is-latest rect {
    stroke: var(--color-indigo-500);
    stroke-width: 1.5;
}
@media (prefers-reduced-motion: reduce) {
    .clip-scene, .clip-link, .clip-chip {
        transition: none;
    }
}
</style>
