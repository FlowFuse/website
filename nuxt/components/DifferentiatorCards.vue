<script setup lang="ts">
// Extracted from the "Differentiator cards" block on the product page
// (nuxt/pages/product/index.vue) so it can be reused elsewhere, e.g. book-demo.
interface Differentiator {
    heading: string
    // Short bolded hook sentence between the heading and the description.
    // Optional: added for the ROI calculator's audience cards, existing callers don't set it.
    lead?: string
    description: string
    icon: string
}

withDefaults(defineProps<{
    items?: Differentiator[]
    // Class for the description paragraph. Optional: existing callers (product page,
    // book-demo) rely on the default size; the ROI calculator's descriptions run much
    // longer and need a smaller size, which a parent-level class can't reach — Vue's
    // attrs fallthrough only lands on this component's root, not this nested <p>, and
    // a legacy global `p { font-size: 1rem }` rule (src/css/style.css) blocks simple
    // inheritance from an ancestor too.
    descriptionClass?: string
}>(), {
    descriptionClass: '',
    items: () => [
        {
            heading: 'Vendor-Free Open Source',
            description: 'Every factory is different, so why deploy the same solution as everyone else? Build your way with <a class="text-indigo-600 hover:underline" href="/blueprints/">ready-made blueprints</a>, your own app store, or anything in between — we never dictate your tools.',
            icon: 'i-lucide-puzzle',
        },
        {
            heading: 'Flexible and Secure',
            description: 'From whole-factory rollouts to last-mile fixes across any industry. Build your solution, then secure it with <a class="text-indigo-600 hover:underline" href="/blog/2024/04/role-based-access-control-rbac-for-node-red-with-flowfuse/">granular RBAC</a>, auditing, <a class="text-indigo-600 hover:underline" href="/blog/2024/09/node-red-version-control-with-snapshots/">version control</a>, and traceability.',
            icon: 'i-lucide-shield-check',
        },
        {
            heading: 'Seamless Collaboration',
            description: 'OT teams prototype and deploy fast while IT keeps the governance, security, and auditability they need — no trade-offs.',
            icon: 'i-lucide-handshake',
        },
    ],
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div
      v-for="diff in items"
      :key="diff.heading"
      class="rounded-lg bg-gradient-to-br from-indigo-50/50 to-red-50/50 p-6 pt-8 flex flex-col gap-4 text-center md:text-left"
    >
      <Icon :name="diff.icon" class="w-6 h-6 text-indigo-600 mx-auto md:mx-0" />
      <h3 class="text-xl font-semibold text-indigo-600">{{ diff.heading }}</h3>
      <p v-if="diff.lead" class="font-medium leading-snug m-0 -mb-6">{{ diff.lead }}</p>
      <p class="mb-0" :class="descriptionClass" v-html="diff.description" />
    </div>
  </div>
</template>
