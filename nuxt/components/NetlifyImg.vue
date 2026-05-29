<script setup>
const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    width: { type: [String, Number], default: undefined },
    height: { type: [String, Number], default: undefined },
    format: { type: String, default: 'webp' },
    quality: { type: Number, default: 80 },
    loading: { type: String, default: 'lazy' },
    sizes: { type: String, default: undefined }
})

// /.netlify/* doesn't exist in dev — serve the original src.
const isDev = import.meta.dev

const buildUrl = (w, h) => {
    if (isDev) return props.src
    const params = new URLSearchParams({ url: props.src, fm: props.format, q: String(props.quality) })
    if (w) params.set('w', String(w))
    if (h) params.set('h', String(h))
    return `/.netlify/images?${params.toString()}`
}

const baseW = computed(() => (props.width ? Number(props.width) : null))
const baseH = computed(() => (props.height ? Number(props.height) : null))
const src = computed(() => buildUrl(baseW.value, baseH.value))
const srcset = computed(() => {
    if (isDev || !baseW.value) return undefined
    return [1, 2]
        .map(d => `${buildUrl(baseW.value * d, baseH.value ? baseH.value * d : null)} ${d}x`)
        .join(', ')
})
</script>

<template>
    <img
        :src="src"
        :srcset="srcset"
        :sizes="sizes"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="loading"
    />
</template>
