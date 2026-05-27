<script setup>
const props = defineProps({
    formId: { type: String, required: true },
    region: { type: String, default: 'eu1' },
    portalId: { type: String, default: '26586079' },
})

const el = ref(null)
const targetId = computed(() => `hs-form-${props.formId.replace(/-/g, '')}`)

onMounted(() => {
    const create = () => {
        if (window.hbspt && el.value) {
            window.hbspt.forms.create({
                region: props.region,
                portalId: props.portalId,
                formId: props.formId,
                target: `#${targetId.value}`,
            })
        }
    }
    if (window.hbspt) {
        create()
        return
    }
    const existing = document.querySelector('script[data-hs-forms]')
    if (existing) {
        existing.addEventListener('load', create)
        return
    }
    const s = document.createElement('script')
    s.src = `https://js-${props.region}.hsforms.net/forms/embed/v2.js`
    s.async = true
    s.defer = true
    s.setAttribute('data-hs-forms', '')
    s.addEventListener('load', create)
    document.head.appendChild(s)
})
</script>

<template>
  <div :id="targetId" ref="el" />
</template>
