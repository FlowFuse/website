<script setup lang="ts">
// A looping "clip" for the IT/OT middleware page's Connected Operations row, in two beats:
//   1. Protocols: plant protocols on the left and IT protocols on the right connect to FlowFuse
//      one by one, with data moving both ways on every link (results toward the business in
//      slate, decisions toward the line in indigo).
//   2. Systems: each pair of protocol boxes slides together and becomes the system that speaks
//      them (S7 + EtherNet/IP become PLCs, OData + SOAP become ERP, ...), still connected both ways.
// Then the picture fades and plays again. Drawn as one SVG on the frame's 430x289 shape so it
// scales with the frame. With reduced motion on, the systems picture shows, still.

type Side = 'ot' | 'it'

// Protocols are listed in pairs; pair j merges into SYSTEMS[side][j]. Keep the pairings true.
const PROTOCOLS: Record<Side, string[]> = {
    ot: ['Siemens S7', 'EtherNet/IP', 'OPC UA', 'Modbus', 'OPC HDA', 'PI Web API', 'MQTT', 'IO-Link'],
    it: ['OData', 'SOAP', 'REST', 'SQL', 'GraphQL', 'Webhooks', 'Kafka', 'AMQP'],
}
const SYSTEMS: Record<Side, string[]> = {
    ot: ['PLCs', 'SCADA', 'Historians', 'Sensors'],
    it: ['ERP', 'MES', 'CMMS', 'Cloud'],
}

const W = 430
const H = 289
const CHIP_W = 96
const CHIP_H = 22
const SYS_H = 30
const HUB = { x: 160, y: 122, w: 110, h: 44 }
const HUB_CY = HUB.y + HUB.h / 2
const ROW_Y = (i: number) => 44 + i * 29 // protocol chip centers
const SYS_Y = (j: number) => (ROW_Y(2 * j) + ROW_Y(2 * j + 1)) / 2 // midway between its pair
const CHIP_X: Record<Side, number> = { ot: 14, it: W - 14 - CHIP_W }

const uid = useId()

// Interleave the sides so both connect together: OT 1, IT 1, OT 2, IT 2, ...
const ORDER = PROTOCOLS.ot.flatMap((_, i) => [{ side: 'ot' as Side, i }, { side: 'it' as Side, i }])

// Every path runs from the plant side toward the business side, so "toward the business" is
// always keyPoints 0;1 and "toward the line" is always 1;0, on either side of the hub.
function path(side: Side, y: number) {
    if (side === 'ot') {
        const x1 = CHIP_X.ot + CHIP_W
        const x2 = HUB.x
        return `M${x1},${y} C${x1 + 30},${y} ${x2 - 30},${HUB_CY} ${x2},${HUB_CY}`
    }
    const x1 = HUB.x + HUB.w
    const x2 = CHIP_X.it
    return `M${x1},${HUB_CY} C${x1 + 30},${HUB_CY} ${x2 - 30},${y} ${x2},${y}`
}

// Merge choreography, in ms from the moment the merge starts.
const SLIDE_MS = 600 // the two boxes of a pair slide onto each other
const PAIR_STAGGER_MS = 220 // pairs merge one after another, top to bottom
const REVEAL_MS = SLIDE_MS - 100 // the system label appears as the boxes meet
const LINK_MS = SLIDE_MS + 150 // then its link draws to the hub

const STEP_MS = 480
const BEFORE_MERGE_MS = 1300
const MERGED_MS = 4200
const FADE_MS = 450

const shown = ref(0) // how many protocols are connected
const merged = ref(false) // protocol pairs have become systems
const fading = ref(false)
const root = ref<SVGSVGElement | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let observer: IntersectionObserver | undefined

const orderIndex = (side: Side, i: number) => ORDER.findIndex(o => o.side === side && o.i === i)
const isShown = (side: Side, i: number) => orderIndex(side, i) < shown.value
function isLatest(side: Side, i: number) {
    return orderIndex(side, i) === shown.value - 1 && shown.value < ORDER.length
}
const pairOf = (i: number) => Math.floor(i / 2)
const pairDelay = (j: number) => j * PAIR_STAGGER_MS

function chipStyle(i: number) {
    if (!merged.value) return undefined
    const j = pairOf(i)
    return {
        transform: `translateY(${SYS_Y(j) - ROW_Y(i)}px)`,
        transitionDelay: `${pairDelay(j)}ms, ${pairDelay(j) + REVEAL_MS}ms`,
    }
}

function tick() {
    if (shown.value < ORDER.length) {
        shown.value++
        timer = setTimeout(tick, shown.value === ORDER.length ? BEFORE_MERGE_MS : STEP_MS)
    } else if (!merged.value) {
        merged.value = true
        timer = setTimeout(tick, MERGED_MS)
    } else {
        fading.value = true
        timer = setTimeout(() => {
            shown.value = 0
            merged.value = false
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
        merged.value = true
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
      aria-label="Plant protocols (Siemens S7, EtherNet/IP, OPC UA, Modbus, OPC HDA, PI Web API, MQTT, IO-Link) and IT protocols (OData, SOAP, REST, SQL, GraphQL, Webhooks, Kafka, AMQP) connect to FlowFuse, then merge in pairs into the systems that speak them: PLCs, SCADA, historians and sensors on the plant side, ERP, MES, CMMS and cloud on the business side, with decisions flowing to the line and results flowing to the business"
  >
    <defs>
      <pattern :id="`${uid}-grid`" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" class="fill-gray-200" />
      </pattern>
    </defs>
    <rect :width="W" :height="H" :fill="`url(#${uid}-grid)`" />

    <g class="clip-scene" :class="{ 'is-fading': fading, 'is-merged': merged }">
      <!-- Column headers: PROTOCOLS, then SYSTEMS -->
      <g class="fill-gray-400 text-[8px] font-semibold tracking-widest" text-anchor="middle">
        <text :x="CHIP_X.ot + CHIP_W / 2" y="20" class="beat-protocols">OT · PROTOCOLS</text>
        <text :x="CHIP_X.ot + CHIP_W / 2" y="20" class="beat-systems">OT · SYSTEMS</text>
        <text :x="CHIP_X.it + CHIP_W / 2" y="20" class="beat-protocols">IT · PROTOCOLS</text>
        <text :x="CHIP_X.it + CHIP_W / 2" y="20" class="beat-systems">IT · SYSTEMS</text>
      </g>

      <!-- Beat 1: protocol links, with data both ways -->
      <g class="beat-protocols protocol-links">
        <template v-for="o in ORDER" :key="`l-${o.side}-${o.i}`">
          <path
              :id="`${uid}-p-${o.side}-${o.i}`"
              :d="path(o.side, ROW_Y(o.i))"
              pathLength="1"
              fill="none"
              stroke-width="1.5"
              class="clip-link"
              :class="[o.side === 'ot' ? 'stroke-slate-400' : 'stroke-indigo-400', { 'is-on': isShown(o.side, o.i) }]"
          />
          <template v-if="isShown(o.side, o.i)">
            <circle r="2.2" class="fill-slate-500">
              <animateMotion :dur="`${2 + (o.i % 3) * 0.3}s`" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath :href="`#${uid}-p-${o.side}-${o.i}`" />
              </animateMotion>
            </circle>
            <circle r="2.2" class="fill-indigo-600">
              <animateMotion :dur="`${2 + (o.i % 3) * 0.3}s`" :begin="`${0.9 + (o.i % 2) * 0.4}s`" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath :href="`#${uid}-p-${o.side}-${o.i}`" />
              </animateMotion>
            </circle>
          </template>
        </template>
      </g>

      <!-- Beat 2: system links, drawn once each pair has merged -->
      <g v-if="merged">
        <template v-for="side in (['ot', 'it'] as Side[])" :key="`sl-${side}`">
          <template v-for="(name, j) in SYSTEMS[side]" :key="`sl-${side}-${name}`">
            <path
                :id="`${uid}-s-${side}-${j}`"
                :d="path(side, SYS_Y(j))"
                pathLength="1"
                fill="none"
                stroke-width="1.75"
                class="clip-link draw"
                :class="side === 'ot' ? 'stroke-slate-400' : 'stroke-indigo-400'"
                :style="{ animationDelay: `${pairDelay(j) + LINK_MS}ms` }"
            />
            <!-- SMIL timing runs from page load, so the dots stay hidden until their link has drawn -->
            <g class="sys-dots" :style="{ animationDelay: `${pairDelay(j) + LINK_MS + 500}ms` }">
              <circle r="2.4" class="fill-slate-500">
                <animateMotion :dur="`${2.2 + (j % 2) * 0.3}s`" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                  <mpath :href="`#${uid}-s-${side}-${j}`" />
                </animateMotion>
              </circle>
              <circle r="2.4" class="fill-indigo-600">
                <animateMotion :dur="`${2.2 + (j % 2) * 0.3}s`" :begin="`${1.1 + (j % 2) * 0.4}s`" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                  <mpath :href="`#${uid}-s-${side}-${j}`" />
                </animateMotion>
              </circle>
            </g>
          </template>
        </template>
      </g>

      <!-- System boxes: sit behind the protocol pair and show as the pair meets -->
      <template v-for="side in (['ot', 'it'] as Side[])" :key="`sb-${side}`">
        <g
            v-for="(name, j) in SYSTEMS[side]"
            :key="`sb-${side}-${name}`"
            class="sys-box"
            :class="{ 'is-on': merged }"
            :style="{ transitionDelay: merged ? `${pairDelay(j) + REVEAL_MS}ms` : '0ms' }"
        >
          <rect :x="CHIP_X[side]" :y="SYS_Y(j) - SYS_H / 2" :width="CHIP_W" :height="SYS_H" rx="6" class="fill-white" :class="side === 'ot' ? 'stroke-slate-500' : 'stroke-indigo-500'" stroke-width="1.5" />
          <text :x="CHIP_X[side] + CHIP_W / 2" :y="SYS_Y(j) + 4" text-anchor="middle" class="text-[11px] font-semibold" :class="side === 'ot' ? 'fill-slate-700' : 'fill-indigo-700'">{{ name }}</text>
        </g>
      </template>

      <!-- Protocol chips: in one by one, then each pair slides together into its system -->
      <template v-for="side in (['ot', 'it'] as Side[])" :key="`pc-${side}`">
        <g
            v-for="(label, i) in PROTOCOLS[side]"
            :key="`pc-${side}-${label}`"
            class="clip-chip"
            :class="{ 'is-on': isShown(side, i), 'is-latest': isLatest(side, i), 'is-merging': merged }"
            :style="chipStyle(i)"
        >
          <rect :x="CHIP_X[side]" :y="ROW_Y(i) - CHIP_H / 2" :width="CHIP_W" :height="CHIP_H" rx="5" class="fill-white" :class="side === 'ot' ? 'stroke-slate-300' : 'stroke-indigo-200'" stroke-width="1" />
          <text :x="CHIP_X[side] + CHIP_W / 2" :y="ROW_Y(i) + 3.3" text-anchor="middle" class="fill-gray-700 text-[9.5px] font-medium">{{ label }}</text>
        </g>
      </template>

      <!-- FlowFuse in the middle -->
      <rect :x="HUB.x" :y="HUB.y" :width="HUB.w" :height="HUB.h" rx="8" class="fill-white stroke-indigo-500" stroke-width="1.5" />
      <image href="/images/ff-logo--wordmark--light.svg" :x="HUB.x + 16" :y="HUB.y + 12" :width="HUB.w - 32" height="20" preserveAspectRatio="xMidYMid meet" />

      <!-- Caption under the hub -->
      <g class="fill-gray-500 text-[9px]" text-anchor="middle">
        <text :x="W / 2" :y="HUB.y + HUB.h + 20" class="beat-protocols">{{ shown }} {{ shown === 1 ? 'protocol' : 'protocols' }} connected</text>
        <text :x="W / 2" :y="HUB.y + HUB.h + 20" class="beat-systems">Every system, one platform</text>
      </g>

      <!-- Legend -->
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

/* Headers and caption swap once the merge is under way; protocol links clear as it starts */
.beat-protocols,
.beat-systems {
    transition: opacity 350ms ease;
}
.beat-systems {
    opacity: 0;
}
.is-merged .beat-protocols {
    opacity: 0;
}
.is-merged .beat-systems {
    opacity: 1;
    transition-delay: 700ms;
}

.clip-link {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset 500ms ease-out;
}
.clip-link.is-on {
    stroke-dashoffset: 0;
}
.clip-link.draw {
    animation: draw 500ms ease-out both;
}
@keyframes draw {
    to { stroke-dashoffset: 0; }
}
.sys-dots {
    animation: appear 300ms ease both;
}
@keyframes appear {
    from { opacity: 0; }
    to { opacity: 1; }
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
/* Slide onto the partner (transform), then hand over to the system box (opacity) */
.clip-chip.is-merging {
    opacity: 0;
    transition: transform 600ms cubic-bezier(0.6, 0, 0.3, 1), opacity 250ms ease;
}

.sys-box {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    transform: scale(0.9);
    transition: opacity 250ms ease, transform 400ms cubic-bezier(0.2, 0.9, 0.3, 1.3);
}
.sys-box.is-on {
    opacity: 1;
    transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
    .clip-scene, .beat-protocols, .beat-systems, .clip-link, .clip-chip, .sys-box {
        transition: none;
    }
    .clip-link.draw, .sys-dots {
        animation: none;
        stroke-dashoffset: 0;
    }
}
</style>
