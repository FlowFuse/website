<script setup lang="ts">
// A looping "clip" for the IT/OT middleware page's Standardized Data row. On the left, the same
// reading (line F1 running at 119) arrives in one format after another, the format named large
// in the card header. On the right is the one model the receiving system needs, which never
// changes; its border pulses each time FlowFuse converts a new format into it. Brand colours
// only: neutral grays for the source, indigo for the model. Sized with container units so it
// scales with the frame. Reduced motion shows the first format, still.

type Step = { format: string, raw: string }

// Every sample carries the same two values, line "F1" and speed 119, so the output can be fixed.
const STEPS: Step[] = [
    { format: 'JSON', raw: '{ "ln": "F1",\n  "spd": 119 }' },
    { format: 'CSV', raw: 'ln,spd\nF1,119' },
    { format: 'XML', raw: '<m ln="F1"\n   spd="119"/>' },
    { format: 'YAML', raw: 'ln: F1\nspd: 119' },
    { format: 'Protobuf', raw: '0a 02 46 31 10 77' },
    { format: 'Parquet', raw: 'PAR1 ln[F1]\n     spd[119]' },
]

const STEP_MS = 1900

const index = ref(0)
const root = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setInterval> | undefined
let observer: IntersectionObserver | undefined

function start() {
    if (timer) return
    timer = setInterval(() => {
        index.value = (index.value + 1) % STEPS.length
    }, STEP_MS)
}
function stop() {
    clearInterval(timer)
    timer = undefined
}

onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
  <div
      ref="root"
      class="clip w-full h-full flex items-center justify-center bg-white"
      role="img"
      aria-label="The same reading arriving as JSON, CSV, XML, YAML, Protobuf and Parquet, and FlowFuse converting each one into the single model the receiving system needs: line Filler 1, speed 119, unit bottles/min"
  >
    <div class="w-full grid grid-cols-[1fr_auto_1fr] items-end" style="gap: 2.6cqw; padding-inline: 5cqw">
      <!-- In: the format changes every step -->
      <div>
        <p class="label m-0 text-gray-400">Input</p>
        <div class="card rounded-lg border border-gray-200 bg-gray-50">
          <div class="card-head border-b border-gray-200">
            <Transition name="swap" mode="out-in">
              <span :key="index" class="block font-semibold text-gray-900">{{ STEPS[index]!.format }}</span>
            </Transition>
          </div>
          <div class="card-body">
            <Transition name="swap" mode="out-in">
              <pre :key="index" class="m-0 bg-transparent p-0 font-mono text-gray-600 whitespace-pre">{{ STEPS[index]!.raw }}</pre>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Through FlowFuse -->
      <div class="flex flex-col items-center self-center" style="gap: 1.6cqw; margin-top: 4cqw">
        <img src="/images/ff-logo--wordmark--light.svg" alt="FlowFuse" style="height: 2.6cqw">
        <div class="track relative" aria-hidden="true">
          <span :key="index" class="dot absolute rounded-full bg-indigo-600" />
        </div>
      </div>

      <!-- Out: always the same model -->
      <div>
        <p class="label m-0 text-indigo-600">Output</p>
        <div :key="index" class="card model rounded-lg border border-indigo-200 bg-white">
          <div class="card-head border-b border-indigo-100">
            <span class="block font-semibold text-indigo-600">Your model</span>
          </div>
          <div class="card-body">
            <pre :key="index" class="m-0 bg-transparent p-0 font-mono text-gray-400 whitespace-pre">{<br>  <span class="text-gray-500">"line"</span>: <span class="val">"Filler 1"</span>,<br>  <span class="text-gray-500">"speed"</span>: <span class="val">119</span>,<br>  <span class="text-gray-500">"unit"</span>: <span class="val">"bottles/min"</span><br>}</pre>
          </div>
        </div>
      </div>

      <!-- Which format this is, of how many -->
      <div class="flex items-center justify-center" style="gap: 1cqw" aria-hidden="true">
        <span
            v-for="(step, i) in STEPS"
            :key="step.format"
            class="progress rounded-full"
            :class="i === index ? 'bg-gray-700' : 'bg-gray-200'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.clip {
    container-type: size;
}
.label {
    font-size: 2cqw;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.4cqw;
}
.card {
    height: 34cqw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.card-head {
    font-size: 3.6cqw;
    line-height: 1.2;
    padding: 1.8cqw 2.4cqw;
}
.card-body {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 2.4cqw;
}
.card-body pre {
    font-size: 2.3cqw;
    line-height: 1.55;
}
.swap-enter-active,
.swap-leave-active {
    transition: opacity 250ms ease, transform 250ms ease;
}
.swap-enter-from {
    opacity: 0;
    transform: translateY(6px);
}
.swap-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
.model {
    animation: flash 900ms ease 250ms;
}
.val {
    color: var(--color-gray-900);
    animation: val 1100ms ease 300ms;
}
@keyframes val {
    0%, 100% { color: var(--color-gray-900); }
    25% { color: var(--color-indigo-600); }
}
.track {
    width: 9cqw;
    height: 1.5px;
    background: var(--color-indigo-100);
}
.dot {
    width: 1.4cqw;
    height: 1.4cqw;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    animation: travel 700ms ease-in-out both;
}
@keyframes travel {
    from { left: 0; opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    to { left: 100%; opacity: 0; }
}
.progress {
    width: 1cqw;
    height: 1cqw;
    margin-top: 2.2cqw;
    transition: background-color 300ms ease;
}
@keyframes flash {
    0% { border-color: var(--color-indigo-200); }
    30% { border-color: var(--color-indigo-500); }
    100% { border-color: var(--color-indigo-200); }
}
@media (prefers-reduced-motion: reduce) {
    .swap-enter-active,
    .swap-leave-active {
        transition: none;
    }
    .model,
    .val,
    .dot {
        animation: none;
    }
}
</style>
