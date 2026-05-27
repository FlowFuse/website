<script setup>
const props = defineProps({ dataSrc: { type: String, required: true } })
const el = ref(null)
onMounted(() => {
    const s = document.createElement('script')
    s.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
    s.async = true
    document.body.appendChild(s)
})
</script>

<template>
  <div ref="el" class="meetings-iframe-container -mb-20 md:-mb-6" :data-src="dataSrc" />
</template>
