<script setup lang="ts">
// What hidden losses cost the buyer, from the buyer's own numbers: lines, minutes lost per
// shift to stops and slow running that never reach a report, shifts, days and the value of
// an hour of output. It makes the need concrete without FlowFuse claiming an outcome, so the
// result is labelled as their estimate. Styled after RoiCalculator's result card.
const f = reactive({
    lines: 3,
    minutes: 20,      // minutes lost per line per shift, unlogged
    shifts: 2,        // shifts per day
    days: 240,        // production days per year
    hourValue: 3000,  // $ value of one hour of a line's output
})

const hoursPerYear = computed(() => f.lines * f.minutes * f.shifts * f.days / 60)
const perYear = computed(() => hoursPerYear.value * f.hourValue)
const perWeek = computed(() => perYear.value / 52)

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const FIELDS = [
    { key: 'lines', label: 'Production lines', step: 1 },
    { key: 'shifts', label: 'Shifts per day', step: 1 },
    { key: 'days', label: 'Production days per year', step: 5 },
    { key: 'hourValue', label: 'Value of one hour of a line\'s output', step: 500, money: true, hint: 'Margin on the product the line would have made in that hour.' },
] as const
</script>

<template>
  <section class="w-full py-16 md:py-24 px-6">
    <div class="max-w-screen-lg mx-auto">
      <h2 class="m-0 max-md:text-center">What are your lines losing <span class="text-indigo-600">while you wait?</span></h2>
      <p class="mt-4 text-gray-600 max-w-3xl max-md:text-center">
        Short stops, slow running and starved machines rarely reach a downtime log, so they never reach a budget either.
        Put in your own numbers and see what they add up to before next year's plan is set.
      </p>
      <div class="mt-10 grid lg:grid-cols-2 gap-6 items-start">
        <div class="rounded-lg border border-gray-200 bg-white p-6 flex flex-col gap-5">
          <label class="block">
            <span class="flex justify-between text-sm text-gray-700 font-semibold mb-2">
              Minutes lost per line, per shift, that nobody logs
              <b class="text-indigo-600">{{ f.minutes }} min</b>
            </span>
            <input v-model.number="f.minutes" type="range" min="0" max="120" step="5" class="w-full accent-indigo-600">
            <span class="block text-xs text-gray-400 mt-1.5">Stops under a few minutes and slow running. Not sure? Start with a guess: the loss review measures it.</span>
          </label>
          <label v-for="fld in FIELDS" :key="fld.key" class="block">
            <span class="block text-sm text-gray-700 font-semibold mb-1.5">{{ fld.label }}</span>
            <span class="relative block">
              <span v-if="'money' in fld" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                  v-model.number="f[fld.key]"
                  type="number"
                  min="0"
                  :step="fld.step"
                  class="w-full rounded-md border border-gray-300 py-2 pr-3 text-gray-800 focus:border-indigo-500 focus:outline-none"
                  :class="'money' in fld ? 'pl-6' : 'pl-3'"
              >
            </span>
            <span v-if="'hint' in fld" class="block text-xs text-gray-400 mt-1.5">{{ fld.hint }}</span>
          </label>
        </div>
        <div class="rounded-2xl p-7 text-white bg-gradient-to-b from-indigo-600 via-indigo-800 via-60% to-indigo-950 shadow-2xl shadow-indigo-600/30 lg:sticky lg:top-20">
          <div class="text-xs tracking-widest uppercase text-indigo-200 font-semibold">Output you're losing</div>
          <div class="text-5xl tracking-tight leading-none mt-2 font-semibold">{{ fmt(perYear) }}<span class="text-base text-indigo-200 ml-1.5 font-medium">/ year</span></div>
          <div class="mt-6 pt-5 border-t border-white/20 flex flex-col gap-3 text-sm text-indigo-100">
            <div class="flex justify-between gap-4">
              <span>Every week you wait</span>
              <b class="text-white text-lg">{{ fmt(perWeek) }}</b>
            </div>
            <div class="flex justify-between gap-4">
              <span>Production hours lost a year</span>
              <b class="text-white text-lg">{{ Math.round(hoursPerYear).toLocaleString('en-US') }} h</b>
            </div>
          </div>
          <p class="mt-6 mb-0 text-sm text-indigo-100">
            Your estimate, from your numbers. A loss review on one line replaces it with what your data actually shows.
          </p>
          <div class="mt-6">
            <CtaBookDemo variant="highlight" position="loss-calculator" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
