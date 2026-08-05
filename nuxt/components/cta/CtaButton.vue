<script setup lang="ts">
// Internal building block for the destination-specific Cta* components
// (CtaSignUp, CtaSignIn, CtaContactUs, CtaBookDemo). Not meant to be used
// directly outside that folder — event name, href, and copy are fixed per
// destination on purpose, so this component only ever handles *how it looks*.
import { useCapture } from '~/composables/useCapture'

const props = withDefaults(defineProps<{
    event: string
    href: string
    label: string
    variant: 'primary' | 'primary-outlined' | 'highlight' | 'highlight-outlined' | 'text'
    position: string
    plan?: string
    icon?: string
    size?: 'sm' | 'md' | 'lg'
    // Only meaningful for variant="text" - a real button (solid/outline) stays
    // uppercase per the site's ff-btn convention, but a text-only link (e.g.
    // "Free Trial" in the nav, "Sign In" in the utility bar) was never
    // uppercase before, so let each insertion choose.
    // Explicit `undefined` default: Vue auto-defaults unspecified boolean
    // props to `false`, which would make our `??` fallback below always take
    // the `false` branch instead of falling through to the variant-based default.
    uppercase?: boolean
    // Only meaningful for variant="text". Two different text links exist on
    // the site: the utility bar's "Sign In" is truly padding-less inline text,
    // but the main nav's "Free Trial" sits inside a header `<ul>` and inherits
    // that context's link padding (12px/16px, confirmed via the Computed tab -
    // it's not plain text, it just has no visible background/border).
    padded?: boolean
}>(), { uppercase: undefined })

// Maps our ff-btn-style variant names to UButton's color/variant pair.
// UButton's own "variant" means solid/outline/link, so it's a different axis
// than ours - keep the naming distinct to avoid confusing the two.
const VARIANT_MAP: Record<string, { color: string, variant: string }> = {
    primary: { color: 'primary', variant: 'solid' },
    'primary-outlined': { color: 'primary', variant: 'outline' },
    highlight: { color: 'highlight', variant: 'solid' },
    'highlight-outlined': { color: 'highlight', variant: 'outline' },
    text: { color: 'primary', variant: 'link' },
}

const uiVariant = computed(() => VARIANT_MAP[props.variant])
const capture = useCapture()

// app.config.ts's base slot ("uppercase font-semibold no-underline") suits a
// real button, but not a text-only link - those read as plain inline text
// elsewhere on the site (nav "Free Trial", utility bar "Sign In"): no button
// padding, font-medium instead of bold, and lowercase by default.
// Passing `ui.base` to UButton REPLACES the app.config slot rather than
// merging with it (tailwind-merge only runs within a single source string),
// so this always spells out the full base string rather than trying to
// layer a partial override on top of the default.
const isTextVariant = computed(() => props.variant === 'text')
const showUppercase = computed(() => props.uppercase ?? !isTextVariant.value)
// .ff-btn's padding (8px/16px = px-4 py-2) and font-size (16px = text-base)
// are fixed everywhere on the site, nav included - confirmed via the
// Computed tab, not just the Styles cascade (a `header ul a.ff-btn { text-sm }`
// rule exists but loses to `.ff-btn`'s own font-size:16px at matching
// specificity, so the nav button renders text-base same as everywhere else).
const uiOverrides = computed(() => {
    if (isTextVariant.value) {
        const padding = props.padded ? 'px-3 py-4' : 'p-0'
        return { base: `${showUppercase.value ? 'uppercase' : 'normal-case'} font-medium no-underline ${padding}` }
    }
    return { base: `${showUppercase.value ? 'uppercase' : 'normal-case'} font-bold no-underline px-4 py-2 text-base` }
})

function onClick () {
    capture(props.event, { position: props.position, variant: props.variant, ...(props.plan ? { plan: props.plan } : {}) })
}
</script>

<template>
  <UButton
    :to="href"
    :color="uiVariant.color"
    :variant="uiVariant.variant"
    :trailing-icon="icon"
    :size="size || 'lg'"
    :ui="uiOverrides"
    @click="onClick"
  >
    {{ label }}
  </UButton>
</template>
