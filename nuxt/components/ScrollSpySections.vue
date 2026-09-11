<script setup lang="ts" generic="T extends { id: string; label: string; icon?: string }">
// Sticky left nav + stacked, always-visible content sections, with the nav
// link highlighted for whichever section the reader has scrolled to. Shared by
// /product ("Find the product for how you work"), /integrations/opcua
// ("What is OPC UA") and /platform (the five stages of the platform).
//
// Deliberately not @nuxt/ui's UContentToc/useScrollspy: that tracks active
// headings via IntersectionObserver on the heading elements themselves, which
// works for dense docs TOCs but breaks here - when the gap between sections
// (padding + divider) is wider than the heading, scrolling through that gap
// leaves no heading intersecting and the indicator sticks on the previous
// section. Walking sections in DOM order and taking whichever one's top has
// crossed the viewport's vertical midpoint (overwriting on each match, so the
// deepest/furthest-scrolled section wins) doesn't have that gap.
//
// Generic over T (not just { id, label }) so a scoped slot can read whatever
// extra fields a caller's item carries (e.g. /product's heading/image/slug)
// without a cast. `icon` is read by the boxed variant only.
const props = withDefaults(defineProps<{
    items: T[]
    ariaLabel?: string
    gapClass?: string
    dividerClass?: string
    // Viewport width at which the nav switches from stacked-above-content to
    // beside it. 'lg' is /product's original width (its item content is
    // wider - text + image per step); opcua's items are text-only and have
    // room to go side-by-side sooner, at 'md'. Literal class strings below
    // (not a template-interpolated breakpoint) since Tailwind's build-time
    // scanner only picks up classes it can see written out in full.
    breakpoint?: 'md' | 'lg'
    // 'rail' is the original: a hairline down the left with the active label
    // and its 2px segment inked. 'boxed' puts the same list in a bordered
    // panel, one row per stage with its icon, and inks the whole active row -
    // /platform needs the nav to read as the platform's five stages rather
    // than as a table of contents beside them.
    variant?: 'rail' | 'boxed'
}>(), {
    ariaLabel: undefined,
    gapClass: 'gap-16',
    dividerClass: 'pt-16 border-t border-gray-200',
    breakpoint: 'lg',
    variant: 'rail',
})

const rowClass = computed(() => props.breakpoint === 'md' ? 'flex flex-col md:flex-row gap-10' : 'flex flex-col lg:flex-row gap-10')
// The boxed variant carries an icon and a trailing arrow per row, so w-44
// clips its labels; 15rem is the narrowest width that holds "Deliver" plus
// both glyphs without wrapping.
const navClass = computed(() => {
    if (props.variant === 'boxed') return props.breakpoint === 'md' ? 'hidden md:block md:w-60 shrink-0' : 'hidden lg:block lg:w-60 shrink-0'
    return props.breakpoint === 'md' ? 'hidden md:block md:w-44 shrink-0' : 'hidden lg:block lg:w-44 shrink-0'
})

const active = ref(props.items[0]?.id ?? '')
const stepRefs = ref<Record<string, HTMLElement | null>>({})

function updateActive () {
    const steps = Object.entries(stepRefs.value).filter((entry): entry is [string, HTMLElement] => !!entry[1])
    if (!steps.length) return
    const mid = window.innerHeight / 2
    let current = steps[0][0]
    for (const [id, el] of steps) {
        if (el.getBoundingClientRect().top <= mid) current = id
    }
    active.value = current
}

let ticking = false
function onScroll () {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; updateActive() }) }
}

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateActive()
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div :class="rowClass">
    <nav :class="navClass" :aria-label="ariaLabel">
      <ul v-if="variant === 'boxed'" class="sticky top-24 flex list-none flex-col border border-gray-200 bg-white p-0">
        <li v-for="(item, index) in items" :key="item.id" class="m-0" :class="index > 0 ? 'border-t border-gray-200' : ''">
          <a
              :href="`#${item.id}`"
              class="flex items-center gap-3 px-4 py-3 no-underline transition-colors duration-200 hover:no-underline"
              :class="active === item.id ? 'bg-indigo-50 text-gray-900' : 'text-gray-500 hover:text-gray-900'"
              :aria-current="active === item.id ? 'true' : undefined"
          >
            <UIcon
                v-if="item.icon"
                :name="item.icon"
                class="size-4 flex-none"
                :class="active === item.id ? 'text-indigo-600' : 'text-gray-400'"
                aria-hidden="true"
            />
            <span class="flex-1 font-medium">{{ item.label }}</span>
            <UIcon v-if="active === item.id" name="i-lucide-arrow-right" class="size-4 flex-none text-indigo-600" aria-hidden="true" />
          </a>
        </li>
      </ul>
      <ul v-else class="sticky top-24 flex flex-col border-l border-gray-200">
        <li v-for="item in items" :key="item.id">
          <a
              :href="`#${item.id}`"
              class="block py-[0.6rem] pl-5 -ml-px border-l-2 font-medium transition-colors duration-200"
              :class="active === item.id ? 'text-indigo-600 border-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'"
          >{{ item.label }}</a>
        </li>
      </ul>
    </nav>

    <div class="flex-1 min-w-0 flex flex-col" :class="gapClass">
      <div
          v-for="(item, index) in items"
          :id="item.id"
          :key="item.id"
          :ref="(el) => { stepRefs[item.id] = el as HTMLElement | null }"
          class="scroll-mt-24"
          :class="index > 0 ? dividerClass : ''"
      >
        <!-- Per-id named slot for callers whose stages each need their own markup
             (/product, /integrations/opcua). Falling back to one `item` slot lets a
             caller whose stages are uniform - /platform's five - write the template
             once instead of five near-identical named slots. -->
        <slot :name="item.id" :item="item" :index="index">
          <slot name="item" :item="item" :index="index" />
        </slot>
      </div>
    </div>
  </div>
</template>
