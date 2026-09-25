<script setup lang="ts">
const SYSTEMS = [
    {
        id: 'linux-macos',
        name: 'Linux and macOS',
        logos: [
            { src: '/images/device-agent/linux.svg' },
            { src: '/images/device-agent/apple.svg', mono: true },
        ],
        command: '/bin/bash -c "$(curl -fsSL https://flowfuse.github.io/device-agent/get.sh)" && ./flowfuse-device-agent-installer',
    },
    {
        id: 'windows',
        name: 'Windows',
        logos: [{ src: '/images/device-agent/windows.svg' }],
        note: 'Run PowerShell as administrator:',
        command: 'Set-Location $env:USERPROFILE; powershell -c "irm https://flowfuse.github.io/device-agent/get.ps1 | iex"; .\\flowfuse-device-agent-installer.exe',
    },
]

const capture = useCapture()

const activeSystem = ref(SYSTEMS[0].id)

function selectSystem (id: string) {
    activeSystem.value = id
    capture('cta-device-agent-install-tab', { position: id })
}

onMounted(() => {
    const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform || navigator.userAgent
    if (/windows/i.test(platform)) activeSystem.value = 'windows'
})
</script>

<template>
  <div class="ff-agent-card overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm">
    <div class="ff-agent-tabs border-b border-indigo-100 bg-indigo-50/60" role="tablist" aria-label="Choose your operating system">
      <button
        v-for="system in SYSTEMS"
        :id="`ff-install-tab-${system.id}`"
        :key="system.id"
        type="button"
        role="tab"
        class="ff-agent-tab"
        :class="{ 'ff-agent-tab--active': activeSystem === system.id }"
        :aria-controls="`ff-install-panel-${system.id}`"
        :aria-selected="activeSystem === system.id"
        @click="selectSystem(system.id)"
      >
        <img
          v-for="logo in system.logos"
          :key="logo.src"
          :src="logo.src"
          :class="{ 'ff-agent-tab__mark--mono': logo.mono }"
          alt=""
          aria-hidden="true"
        >
        <span>{{ system.name }}</span>
      </button>
    </div>

    <div
      v-for="system in SYSTEMS"
      v-show="activeSystem === system.id"
      :id="`ff-install-panel-${system.id}`"
      :key="`panel-${system.id}`"
      role="tabpanel"
      :aria-labelledby="`ff-install-tab-${system.id}`"
      class="p-6 text-left"
    >
      <p v-if="system.note" class="font-light mt-0 mb-2">{{ system.note }}</p>
      <FfCommand :command="system.command" event="cta-copy-device-agent-install" :position="system.id" />
    </div>

    <p class="font-light text-left border-t border-indigo-100 px-6 py-4 m-0">Installing with npm or Docker instead? <a href="/docs/device-agent/install/overview/">The installation docs cover every route</a>.</p>
  </div>
</template>
