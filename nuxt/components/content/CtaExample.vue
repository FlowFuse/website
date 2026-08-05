<script setup lang="ts">
// Handbook-only doc widget: renders one live Cta* button plus a collapsible
// code block (passed in via the default slot, so it's the same Shiki-rendered
// block used everywhere else in the handbook - copy button included), so the
// "Call-to-Action Buttons" section can be a compact gallery instead of a long
// stack of button-then-code-block pairs.
import CtaSignUp from '../CtaSignUp.vue'
import CtaSignIn from '../CtaSignIn.vue'
import CtaContactUs from '../CtaContactUs.vue'
import CtaBookDemo from '../CtaBookDemo.vue'

const COMPONENTS = { CtaSignUp, CtaSignIn, CtaContactUs, CtaBookDemo }

const props = defineProps<{
    component: keyof typeof COMPONENTS
    variant: string
    color?: string
    icon?: string
    // For variant="ghost" color="white" - shows the button on a dark card so
    // white text is actually visible, e.g. the homepage hero's "Try it out".
    dark?: boolean
}>()

const resolved = computed(() => COMPONENTS[props.component])
const showCode = ref(false)
</script>

<template>
  <div
    class="flex flex-col items-center gap-3 rounded-lg border p-5"
    :class="dark ? 'border-gray-700 bg-gray-800' : 'border-gray-200'"
  >
    <div class="flex min-h-11 items-center justify-center">
      <component :is="resolved" :variant="variant" position="handbook-example" :color="color" :icon="icon" />
    </div>
    <button
      type="button"
      class="flex items-center gap-1 text-xs font-medium"
      :class="dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'"
      @click="showCode = !showCode"
    >
      <UIcon :name="showCode ? 'i-lucide-eye-off' : 'i-lucide-code-2'" class="size-3.5" />
      {{ showCode ? 'Hide code' : 'Show code' }}
    </button>
    <div v-show="showCode" class="w-full cta-example-code">
      <slot />
    </div>
  </div>
</template>

<style>
/* These snippets are 1-2 short lines - there's no reason to preserve them
   unwrapped and force horizontal scroll like a real multi-line code sample,
   especially in a narrow grid card where the scrollbar is the first thing
   you'd see. Wrap instead. */
.cta-example-code pre {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}
</style>
