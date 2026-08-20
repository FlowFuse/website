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
const showFallback = ref(false)

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
        showFallback.value = true
    }
})
</script>

<template>
  <div>
    <div :id="containerId" />
    <div v-if="showFallback" class="ff-hubspot-consent-fallback text-center border bg-red-50/25 border-red-300 rounded-lg px-6 pt-8 pb-4">
      <p class="text-red-400">
        <strong>Hmm… there was supposed to be a form here</strong>
      </p>
      <p class="text-gray-600">
        If this form does not load, try adjusting your privacy settings or switching browsers.
      </p>
    </div>
  </div>
</template>
