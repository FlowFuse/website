<script setup lang="ts">
const props = withDefaults(defineProps<{
    formId: string
    cta?: string
    reference?: string
    region?: string
    portalId?: string
    /** Optional heading shown above the embed, e.g. "Submit a ticket". Renders the embed inside a centered gray-band section instead of bare. */
    title?: string
    description?: string
    /** Tighter vertical spacing for the title/description section, matching professional-services' original layout. Only relevant when `title` is set. */
    compact?: boolean
}>(), {
    compact: false,
})

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
  <div :class="title ? ['w-full bg-gray-50 px-0', compact ? 'py-8' : 'py-16'] : ''">
    <template v-if="title">
      <div class="text-center m-auto md:max-w-xl px-6" :class="compact ? 'pt-10 md:pt-8 mb-6 md:mb-12' : 'mb-6'">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
    </template>
    <div :class="title ? 'container m-auto md:max-w-xl' : ''">
      <div :class="title ? ['px-6', { 'mb-16': compact }] : ''">
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
    </div>
  </div>
</template>
