<script setup lang="ts">
// Internal building block for the destination-specific Cta* components
// (CtaSignUp, CtaSignIn, CtaContactUs, CtaBookDemo). Not meant to be used
// directly outside that folder — event name, href, and copy are fixed per
// destination on purpose, so this component only ever handles *how it looks*.
import { useCapture } from '~/composables/useCapture'

const props = withDefaults(defineProps<{
    event: string
    href: string
    // Whether `href` points at a route Nuxt actually serves. NuxtLink/UButton's
    // `to` otherwise treats any same-origin-looking path as an internal Vue
    // Router route, so a destination still on 11ty (e.g. /contact-us/,
    // /book-demo/) 404s on click instead of navigating - it never reaches the
    // server-side proxy that would have served it. Fixed per destination by
    // each Cta* wrapper, not caller-configurable.
    external: boolean
    label: string
    variant: 'primary' | 'primary-outlined' | 'highlight' | 'highlight-outlined' | 'nav-text' | 'ghost'
    position: string
    plan?: string
    icon?: string
    // Only meaningful for variant="ghost" - which text color to use, since a
    // ghost button has no background of its own to imply one. "white" exists
    // because the homepage hero's "Try it out" sits on a dark photo.
    color?: 'primary' | 'highlight' | 'white'
    // Only meaningful for variant="nav-text" - a real button (solid/outline)
    // stays uppercase per the site's ff-btn convention, but a nav text link
    // (e.g. "Free Trial" in the nav, "Sign In" in the utility bar) was never
    // uppercase before, so let each insertion choose.
    // Explicit `undefined` default: Vue auto-defaults unspecified boolean
    // props to `false`, which would make our `??` fallback below always take
    // the `false` branch instead of falling through to the variant-based default.
    uppercase?: boolean
    // Only meaningful for variant="nav-text". Two different nav text links
    // exist on the site: the utility bar's "Sign In" is truly padding-less
    // inline text, but the main nav's "Free Trial" sits inside a header
    // `<ul>` and inherits that context's link padding (12px/16px, confirmed
    // via the Computed tab - it's not plain text, it just has no visible
    // background/border).
    padded?: boolean
    // For documentation/gallery usage (e.g. the handbook's live CTA examples)
    // - looks and behaves identically, but doesn't navigate anywhere and never
    // calls capture(), so clicking an example button can't send a real
    // PostHog event or send a reader off to /book-demo/ etc. Defaults to
    // false, so omitting it is the normal, unchanged production behavior.
    preview?: boolean
}>(), { uppercase: undefined })

// Maps our ff-btn-style variant names to UButton's color/variant pair, plus
// the hover/active classes that reproduce .ff-btn's original 11ty behavior:
// a real shade-700 fill with white text, not UButton's default of lightening
// via opacity (hover:bg-primary/75 - the *same* color at 75% opacity reads as
// lighter against a white page, the opposite of 11ty's darker hover). Written
// out as complete literal strings (not built from a `${hue}` template) since
// Tailwind's build-time class scanner can't see interpolated class names.
const VARIANT_MAP: Record<string, { color: string, variant: string, hover: string }> = {
    primary: {
        color: 'primary',
        variant: 'solid',
        hover: 'hover:bg-indigo-700 hover:text-white active:bg-indigo-700 active:text-white',
    },
    'primary-outlined': {
        color: 'primary',
        variant: 'outline',
        // ring-indigo-600 (no opacity) overrides the default's ring-primary/50,
        // matching .ff-btn's solid 1px border instead of a half-opacity ring.
        hover: 'ring-indigo-600 hover:bg-indigo-700 hover:text-white hover:ring-indigo-700 active:bg-indigo-700 active:text-white active:ring-indigo-700',
    },
    highlight: {
        color: 'highlight',
        variant: 'solid',
        hover: 'hover:bg-red-700 hover:text-white active:bg-red-700 active:text-white',
    },
    'highlight-outlined': {
        color: 'highlight',
        variant: 'outline',
        hover: 'ring-red-600 hover:bg-red-700 hover:text-white hover:ring-red-700 active:bg-red-700 active:text-white active:ring-red-700',
    },
    'nav-text': { color: 'primary', variant: 'link', hover: '' },
    ghost: { color: 'primary', variant: 'ghost', hover: '' },
}

// UButton's own "ghost" variant compoundVariants add a faint hover background
// (hover:bg-{color}/10) - that's Nuxt UI's default ghost affordance, but a
// ghost CTA here should have no background at any point, hover included, so
// every entry explicitly cancels it with hover:bg-transparent.
const GHOST_COLOR_CLASSES: Record<string, string> = {
    primary: 'text-primary hover:text-primary/75 hover:bg-transparent',
    highlight: 'text-highlight hover:text-highlight/75 hover:bg-transparent',
    white: 'text-white hover:text-gray-200 hover:bg-transparent',
}

const uiVariant = computed(() => VARIANT_MAP[props.variant])
const capture = useCapture()

// app.config.ts's base slot ("uppercase font-semibold no-underline") suits a
// real button, but not a nav text link - those read as plain inline text
// (nav "Free Trial", utility bar "Sign In"): no button padding, font-medium
// instead of bold, and lowercase by default.
// Passing `ui.base` to UButton REPLACES the app.config slot rather than
// merging with it (tailwind-merge only runs within a single source string),
// so this always spells out the full base string rather than trying to
// layer a partial override on top of the default.
const isNavTextVariant = computed(() => props.variant === 'nav-text')
const showUppercase = computed(() => props.uppercase ?? !isNavTextVariant.value)
// .ff-btn's padding (8px/16px = px-4 py-2) and font-size (16px = text-base)
// are fixed everywhere on the site, nav included - confirmed via the
// Computed tab, not just the Styles cascade (a `header ul a.ff-btn { text-sm }`
// rule exists but loses to `.ff-btn`'s own font-size:16px at matching
// specificity, so the nav button renders text-base same as everywhere else).
const uiOverrides = computed(() => {
    if (isNavTextVariant.value) {
        const padding = props.padded ? 'px-3 py-4' : 'p-0'
        // font-normal (400): matches the Eleventy nav link's inherited weight.
        return { base: `${showUppercase.value ? 'uppercase' : 'normal-case'} font-normal no-underline ${padding}` }
    }
    // Same metrics as a real button (bold, uppercase, text-base, 8px/16px
    // padding) since a ghost button IS one visually - it just has no
    // background/border, e.g. the homepage hero's "Try it out" over a photo.
    if (props.variant === 'ghost') {
        const colorClass = GHOST_COLOR_CLASSES[props.color || 'primary']
        return { base: `${showUppercase.value ? 'uppercase' : 'normal-case'} font-bold no-underline justify-center rounded-sm px-4 py-2 text-base ${colorClass}` }
    }
    // rounded-sm = 4px, matching .ff-btn (UButton's default rounded-md is 6px).
    return { base: `${showUppercase.value ? 'uppercase' : 'normal-case'} font-bold no-underline justify-center rounded-sm px-4 py-2 text-base ${uiVariant.value.hover}` }
})

function onClick () {
    if (props.preview) return
    capture(props.event, { position: props.position, variant: props.variant, ...(props.plan ? { plan: props.plan } : {}) })
}
</script>

<template>
  <UButton
    :to="preview ? undefined : href"
    :external="external"
    :color="uiVariant.color"
    :variant="uiVariant.variant"
    :trailing-icon="icon"
    size="lg"
    :ui="uiOverrides"
    @click="onClick"
  >
    <!-- The main nav's "Free Trial" (.ff-nav-freetrial) keys its rest color
         and animated hover underline off a `.ff-nav-label` child span - see
         src/css/style.css's `.ff-website header .ff-nav-freetrial .ff-nav-label`
         rules. UButton's default slot would otherwise render the label as a
         bare text node, so those rules silently never match. Scoped to
         nav-text since it's the only variant `.ff-nav-label` styling reaches. -->
    <span v-if="isNavTextVariant" class="ff-nav-label">{{ label }}</span>
    <template v-else>{{ label }}</template>
  </UButton>
</template>
