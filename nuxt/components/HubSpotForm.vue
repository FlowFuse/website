<script setup lang="ts">
const props = defineProps<{
    formId: string
    cta?: string
    reference?: string
    region?: string
    portalId?: string
}>()

const containerId = `hs-form-${props.formId.replace(/-/g, '')}`
const region = props.region ?? 'eu1'
const portalId = props.portalId ?? '26586079'

function loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        if ((window as any).hbspt?.forms?.create) {
            resolve()
            return
        }
        const existing = document.querySelector('script[src*="hsforms.net"]') as HTMLScriptElement | null
        if (existing) {
            existing.addEventListener('load', () => resolve(), { once: true })
            return
        }
        const script = document.createElement('script')
        script.src = '//js-eu1.hsforms.net/forms/embed/v2.js'
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('HubSpot forms script failed to load'))
        document.head.appendChild(script)
    })
}

onMounted(async () => {
    try {
        await loadScript()
        ;(window as any).hbspt.forms.create({
            target: `#${containerId}`,
            region,
            portalId,
            formId: props.formId,
            ...(props.cta ? {
                onFormSubmit: () => {
                    if (typeof (window as any).capture === 'function') {
                        (window as any).capture(props.cta, { page: props.reference ?? props.cta })
                    }
                }
            } : {}),
        })
    } catch {
        // silently fail if HubSpot cannot load
    }
})
</script>

<template>
  <div :id="containerId" />
</template>
