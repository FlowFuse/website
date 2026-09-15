<script setup lang="ts">
// Ported from src/_includes/components/device-agent-install-commands.njk, shared by
// /platform/device-agent/ and /node-red/.
//
// Both commands are byte-identical to docs/device-agent/quickstart.md: get.sh and
// get.ps1 only download the installer, so the run step is part of the command. Keep them
// that way, they drifted apart once already.
//
// The .njk carried its own delegated copy-button script, guarded against double-binding
// because two includes on one page would otherwise bind twice. <FfCommand> owns copying
// now, per instance, so that whole script is gone.
withDefaults(defineProps<{
    // Phrases the heading for the page. /node-red/ uses it to present this as the
    // alternative to signing up.
    heading?: string
}>(), {
    heading: 'Install on edge, straight from your terminal',
})

const LINUX_COMMAND = '/bin/bash -c "$(curl -fsSL https://flowfuse.github.io/device-agent/get.sh)" && ./flowfuse-device-agent-installer'
const WINDOWS_COMMAND = 'Set-Location $env:USERPROFILE; powershell -c "irm https://flowfuse.github.io/device-agent/get.ps1 | iex"; .\\flowfuse-device-agent-installer.exe'
</script>

<template>
  <div class="ff-blue-card max-md:max-w-md max-md:mx-auto">
    <h2 class="font-medium w-full text-center md:text-left mb-6">{{ heading }}</h2>
    <p class="font-medium mb-2">Linux and macOS</p>
    <FfCommand :command="LINUX_COMMAND" class="mb-6" />
    <p class="font-medium mb-2">Windows (run elevated)</p>
    <FfCommand :command="WINDOWS_COMMAND" />
    <p class="font-light mt-6">
      Installing with npm or Docker instead? The
      <NuxtLink to="/docs/device-agent/install/overview/">installation docs</NuxtLink> cover every route.
    </p>
  </div>
</template>
