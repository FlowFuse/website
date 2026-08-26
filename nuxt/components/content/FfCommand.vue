<script setup lang="ts">
// The copyable command / URL block. Lives in components/content/ so markdown can
// use it as ::ff-command{command="..."} as well as pages using it directly, which
// is the point: before this, the markup was hand-copied into every 11ty page that
// wanted one (src/platform/device-agent.njk, and /ai) with a per-page copy script.
//
// Styling comes from .ff-command in src/css/style.css, which nuxt.config.ts already
// links on every Nuxt page, so there is no duplicated CSS here either.
const props = withDefaults(defineProps<{
    command: string
    // Optional PostHog event fired on a successful copy. The 11ty version fired on
    // click whether or not the copy landed; this only counts real copies.
    event?: string
    position?: string
}>(), { event: undefined, position: undefined })

const capture = useCapture()
const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function writeToClipboard (text: string) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        return
    }
    // Fallback for a non-secure context, where navigator.clipboard is undefined.
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'absolute'
    field.style.left = '-9999px'
    document.body.appendChild(field)
    field.select()
    document.execCommand('copy')
    document.body.removeChild(field)
}

async function copy () {
    try {
        await writeToClipboard(props.command)
    } catch {
        return
    }
    if (props.event) capture(props.event, props.position ? { position: props.position } : undefined)
    copied.value = true
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => { copied.value = false }, 2000)
}

onUnmounted(() => clearTimeout(resetTimer))
</script>

<template>
  <div class="ff-command">
    <code class="ff-command__text">{{ command }}</code>
    <button
      type="button"
      class="ff-command__copy"
      :class="{ 'ff-command__copy--done': copied }"
      @click="copy"
    >{{ copied ? 'Copied' : 'Copy' }}</button>
  </div>
</template>
