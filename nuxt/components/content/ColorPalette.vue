<template>
  <div class="space-y-6">
    <div v-for="(group, gi) in colorPalette" :key="gi" class="ff-color-grid">
      <div
        v-for="color in group"
        :key="color.hex"
        class="ff-color-card cursor-pointer"
        @click="copyHex(color.hex)"
      >
        <div
          class="cc-swatch"
          :style="{ background: color.hex, borderBottom: color.light ? '1px solid #E5E7EB' : undefined }"
        >
          <span class="cc-btn">
            <span v-if="copied !== color.hex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </span>
            <span v-else>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </span>
          </span>
        </div>
        <div class="cc-info">
          <p class="cc-name">{{ color.name }}</p>
          <p class="cc-hex">{{ color.hex }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const copied = ref(null)

function copyHex(hex) {
  navigator.clipboard.writeText(hex)
  copied.value = hex
  setTimeout(() => { copied.value = null }, 1500)
}

const colorPalette = [
  [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF', light: true }
  ],
  [
    { name: 'Grey 50',  hex: '#F9FAFB', light: true },
    { name: 'Grey 100', hex: '#F3F4F6', light: true },
    { name: 'Grey 200', hex: '#E5E7EB', light: true },
    { name: 'Grey 300', hex: '#D1D5DB' },
    { name: 'Grey 400', hex: '#9CA3AF' },
    { name: 'Grey 500', hex: '#6B7280' },
    { name: 'Grey 600', hex: '#4B5563' },
    { name: 'Grey 700', hex: '#374151' },
    { name: 'Grey 800', hex: '#1F2937' },
    { name: 'Grey 900', hex: '#111827' }
  ],
  [
    { name: 'Red 50',  hex: '#FFE8E5', light: true },
    { name: 'Red 100', hex: '#FFBFB5', light: true },
    { name: 'Red 200', hex: '#FF8A7B', light: true },
    { name: 'Red 300', hex: '#FF604F' },
    { name: 'Red 400', hex: '#FF3B27' },
    { name: 'Red 500', hex: '#FF2400' },
    { name: 'Red 600', hex: '#DA3D0B' },
    { name: 'Red 700', hex: '#B32E09' },
    { name: 'Red 800', hex: '#8D1F06' },
    { name: 'Red 900', hex: '#671506' }
  ],
  [
    { name: 'Indigo 50',  hex: '#EEF2FF', light: true },
    { name: 'Indigo 100', hex: '#E0E7FF', light: true },
    { name: 'Indigo 200', hex: '#C7D2FE', light: true },
    { name: 'Indigo 300', hex: '#A5B4FC' },
    { name: 'Indigo 400', hex: '#818CF8' },
    { name: 'Indigo 500', hex: '#6366F1' },
    { name: 'Indigo 600', hex: '#4F46E5' },
    { name: 'Indigo 700', hex: '#4338CA' },
    { name: 'Indigo 800', hex: '#3730A3' },
    { name: 'Indigo 900', hex: '#312E81' }
  ],
  [
    { name: 'Blue 50',  hex: '#EFF6FF', light: true },
    { name: 'Blue 100', hex: '#DBEAFE', light: true },
    { name: 'Blue 200', hex: '#BFDBFE', light: true },
    { name: 'Blue 300', hex: '#93C5FD' },
    { name: 'Blue 400', hex: '#60A5FA' },
    { name: 'Blue 500', hex: '#3B82F6' },
    { name: 'Blue 600', hex: '#2563EB' },
    { name: 'Blue 700', hex: '#1D4ED8' },
    { name: 'Blue 800', hex: '#1E40AF' },
    { name: 'Blue 900', hex: '#1E3A8A' }
  ]
]
</script>
