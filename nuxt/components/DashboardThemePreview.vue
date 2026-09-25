<script setup lang="ts">
// The live theme preview from src/platform/dashboard.njk: a mock FlowFuse Dashboard whose
// five presets are the real shipped themes. Extracted from the page so the page reads as
// its sections rather than 170 lines of chart markup.
//
// The .njk drove this with a DOM script: querySelectorAll over the preset buttons,
// setAttribute on the gauge paths, and the event table built by assigning an innerHTML
// string. All three are reactive state here, which is the same behaviour with no string
// concatenation into the DOM.
type Preset = 'light' | 'dark' | 'dracula' | 'nord' | 'sepia'

const PRESETS: Array<{ id: Preset, label: string }> = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'dracula', label: 'Dracula' },
    { id: 'nord', label: 'Nord' },
    { id: 'sepia', label: 'Sepia' },
]

const preset = ref<Preset>('light')

// Nudges the needles so a theme switch reads as live instrumentation.
const JITTER: Record<Preset, number> = { light: 0, dark: 6, dracula: -5, nord: 4, sepia: -3 }
const ovenOffset = computed(() => 62 + JITTER[preset.value])
const coolantOffset = computed(() => 118 - JITTER[preset.value])

// Real epoch values, formatted in the visitor's own locale and timezone - which is exactly
// what the date/time column types do.
const EVENTS = [
    { machine: 'Filler 2', event: 'Recipe changeover', at: 1787839200000, state: 'ok', stateLabel: 'Complete' },
    { machine: 'Capper 1', event: 'Torque out of band', at: 1787842740000, state: 'warn', stateLabel: 'Warning' },
    { machine: 'Labeller', event: 'Web break', at: 1787846280000, state: 'crit', stateLabel: 'Stopped' },
    { machine: 'Palletiser', event: 'Cycle resumed', at: 1787849820000, state: 'ok', stateLabel: 'Running' },
]

// Rendered after mount, not during setup: Intl resolves against the visitor's locale and
// timezone, so formatting on the server would bake in the build machine's and then differ
// from the client on hydration.
const formatted = ref<string[]>(EVENTS.map(() => ''))
onMounted(() => {
    const fmt = new Intl.DateTimeFormat(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    })
    formatted.value = EVENTS.map(row => fmt.format(new Date(row.at)))
})

const OVEN_AREA = '40,114.3 78.3,104.5 116.7,93.1 155,80.1 193.3,86.6 231.7,73.6 270,62.3 308.3,70.4 346.7,59 385,50.9 423.3,55.8 461.7,44.4 500,49.3 500,150 40,150'
const OVEN_LINE = '40,114.3 78.3,104.5 116.7,93.1 155,80.1 193.3,86.6 231.7,73.6 270,62.3 308.3,70.4 346.7,59 385,50.9 423.3,55.8 461.7,44.4 500,49.3'
const COOLANT_LINE = '40,130.5 78.3,125.6 116.7,132.1 155,120.8 193.3,124 231.7,115.9 270,119.1 308.3,111 346.7,114.3 385,106.1 423.3,109.4 461.7,102.9 500,104.5'
const GAUGE_ARC = 'M 28.9 91.1 A 44 44 0 1 1 91.1 91.1'
</script>

<template>
  <div class="flex flex-col gap-3 min-w-0">
    <div class="flex flex-wrap gap-2.5 items-center justify-center md:justify-start">
      <div class="ffd-seg" role="group" aria-label="Theme preset">
        <button
            v-for="option in PRESETS"
            :key="option.id"
            type="button"
            :aria-pressed="preset === option.id"
            @click="preset = option.id"
        >{{ option.label }}</button>
      </div>
    </div>

    <div class="ffd-frame">
      <div class="ffd-chrome">
        <i /><i /><i />
        <span>Line 3 &mdash; Packaging &middot; FlowFuse Dashboard</span>
      </div>

      <div id="ffd-dash" class="ffd-dash" :data-preset="preset">
        <div class="ffd-head">
          <span class="ffd-title">Line 3 &mdash; Packaging</span>
          <span class="ffd-tagchip">Live</span>
        </div>

        <div class="ffd-kpis">
          <div class="ffd-card">
            <div class="ffd-lbl">OEE</div>
            <div class="ffd-kpi-val">78.4<small>%</small></div>
            <div class="ffd-kpi-delta ffd-up">&#9650; 2.1 vs shift avg</div>
          </div>
          <div class="ffd-card">
            <div class="ffd-lbl">Units / hr</div>
            <div class="ffd-kpi-val">1,246</div>
            <div class="ffd-kpi-delta ffd-up">&#9650; 38</div>
          </div>
          <div class="ffd-card">
            <div class="ffd-lbl">Downtime</div>
            <div class="ffd-kpi-val">11<small>min</small></div>
            <div class="ffd-kpi-delta ffd-down">&#9660; 4 vs target</div>
          </div>
        </div>

        <div class="ffd-card">
          <div class="ffd-chart-title">
            <span class="ffd-lbl" style="margin:0">Zone temperature &mdash; last 12 h</span>
            <span class="ffd-legend">
              <span><i style="background:var(--ffd-accent)" />Oven</span>
              <span><i style="background:var(--ffd-accent2)" />Coolant</span>
            </span>
          </div>
          <svg
              class="ffd-chart"
              viewBox="0 0 520 170"
              role="img"
              aria-label="Line chart of oven and coolant temperature over the last twelve hours"
          >
            <g class="ffd-grid">
              <line x1="40" y1="20" x2="505" y2="20" />
              <line x1="40" y1="52" x2="505" y2="52" />
              <line x1="40" y1="85" x2="505" y2="85" />
              <line x1="40" y1="117" x2="505" y2="117" />
              <line x1="40" y1="150" x2="505" y2="150" />
            </g>
            <g class="ffd-axis">
              <text x="34" y="23" text-anchor="end">240</text>
              <text x="34" y="88" text-anchor="end">200</text>
              <text x="34" y="153" text-anchor="end">160</text>
              <text x="40" y="165">08:00</text>
              <text x="270" y="165" text-anchor="middle">14:00</text>
              <text x="500" y="165" text-anchor="end">20:00</text>
            </g>
            <line x1="40" y1="150" x2="505" y2="150" stroke="var(--ffd-border)" stroke-width="1" />
            <line x1="40" y1="20" x2="40" y2="150" stroke="var(--ffd-border)" stroke-width="1" />
            <polygon :points="OVEN_AREA" fill="var(--ffd-accent)" opacity=".13" />
            <polyline :points="OVEN_LINE" fill="none" stroke="var(--ffd-accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
            <polyline :points="COOLANT_LINE" fill="none" stroke="var(--ffd-accent2)" stroke-width="2" stroke-dasharray="4 3" stroke-linejoin="round" stroke-linecap="round" />
            <circle cx="500" cy="49.3" r="3.2" fill="var(--ffd-accent)" />
          </svg>
        </div>

        <div class="ffd-row3">
          <div class="ffd-card ffd-gauge-card">
            <div class="ffd-lbl">Oven</div>
            <svg class="ffd-gauge" viewBox="0 0 120 112" role="img" aria-label="Oven temperature gauge, 222 degrees Celsius">
              <path class="ffd-gauge-arc" :d="GAUGE_ARC" />
              <path class="ffd-gauge-val" :d="GAUGE_ARC" stroke="var(--ffd-warn)" stroke-dasharray="207.3" :stroke-dashoffset="ovenOffset" />
              <text class="ffd-gauge-num" x="60" y="64" text-anchor="middle">222</text>
              <text class="ffd-gauge-unit" x="60" y="79" text-anchor="middle">&deg;C</text>
            </svg>
          </div>
          <div class="ffd-card ffd-gauge-card">
            <div class="ffd-lbl">Coolant</div>
            <svg class="ffd-gauge" viewBox="0 0 120 112" role="img" aria-label="Coolant pressure gauge, 4.1 bar">
              <path class="ffd-gauge-arc" :d="GAUGE_ARC" />
              <path class="ffd-gauge-val" :d="GAUGE_ARC" stroke="var(--ffd-good)" stroke-dasharray="207.3" :stroke-dashoffset="coolantOffset" />
              <text class="ffd-gauge-num" x="60" y="64" text-anchor="middle">4.1</text>
              <text class="ffd-gauge-unit" x="60" y="79" text-anchor="middle">bar</text>
            </svg>
          </div>
          <div class="ffd-card ffd-ctl">
            <div class="ffd-lbl">Shift actions</div>
            <button type="button" class="ffd-btn">Acknowledge compressor fault</button>
            <button type="button" class="ffd-btn ffd-btn--ghost">Reset counter</button>
            <label class="ffd-lbl" for="ffd-date" style="margin:0">Shift date</label>
            <input id="ffd-date" class="ffd-picker" type="date" value="2026-08-27">
          </div>
        </div>

        <div class="ffd-card">
          <div class="ffd-lbl">Event log</div>
          <div class="ffd-scroll">
            <table class="ffd-table">
              <thead>
                <tr><th>Machine</th><th>Event</th><th>Timestamp</th><th>State</th></tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in EVENTS" :key="row.machine">
                  <td>{{ row.machine }}</td>
                  <td>{{ row.event }}</td>
                  <td class="ffd-ts">{{ formatted[i] }}</td>
                  <td><span class="ffd-chip" :class="`ffd-chip--${row.state}`">{{ row.stateLabel }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
