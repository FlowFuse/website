<script setup lang="ts">
import type { CertifiedCollection } from '../../types/integrations'
import { PRODUCT_LABELS } from '../../types/integrations'

type Option = 'all' | CertifiedCollection

const props = withDefaults(defineProps<{
    active: Option
    options: Option[]
    variant?: 'solid' | 'soft'
    label?: string
}>(), { variant: 'soft', label: 'Filter by product' })

const emit = defineEmits<{ select: [Option] }>()

const labelFor = (o: Option) => o === 'all' ? 'All' : PRODUCT_LABELS[o]
const productColor = (o: Option) => o === 'hub' ? 'bg-indigo-600' : 'bg-red-600'

const containerClass = computed(() =>
    `inline-flex ${props.variant === 'solid' ? 'rounded-full' : 'rounded-lg'} bg-gray-100 border border-gray-200 p-1 gap-1`
)

function buttonClass (o: Option) {
    const isActive = props.active === o
    const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
    if (props.variant === 'solid') {
        const base = `inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition ${focus}`
        if (!isActive) return `${base} text-gray-600 hover:text-gray-800`
        return `${base} text-white ${o === 'hub' ? 'bg-indigo-600' : 'bg-red-600'}`
    }
    const base = `inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-semibold transition ${focus}`
    if (!isActive) return `${base} text-gray-600 hover:text-gray-800`
    const text = o === 'hub' ? 'text-indigo-600' : o === 'edge' ? 'text-red-600' : 'text-gray-900'
    return `${base} bg-white shadow-sm ${text}`
}

const dotClass = (o: Option) => (props.variant === 'solid' && props.active === o) ? 'bg-white' : productColor(o)
</script>

<template>
    <div :class="containerClass" role="group" :aria-label="label">
        <button
            v-for="o in options"
            :key="o"
            type="button"
            :aria-pressed="active === o"
            :class="buttonClass(o)"
            @click="emit('select', o)"
        >
            <span v-if="o !== 'all'" class="w-2 h-2 rounded-full" :class="dotClass(o)" />
            {{ labelFor(o) }}
        </button>
    </div>
</template>
