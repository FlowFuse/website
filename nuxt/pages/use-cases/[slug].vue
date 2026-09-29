<script setup lang="ts">
// Ported from src/_includes/layouts/use-case.njk (11ty), which this replaces.
//
// The .njk was a content-driven layout: a fixed set of optional blocks, each rendered
// only when its frontmatter key was present. That maps onto a data collection plus one
// component per block, so this file is just resolution and ordering.
//
// Only the two operational use-cases (production-monitoring, shop-floor-communication)
// come through here - they had no template body at all. The six architecture pages had
// real markup and are hand-written Vue pages alongside this one; Nuxt matches those
// static routes ahead of this dynamic one, and the guard below makes that explicit
// rather than load-bearing-by-accident.
//
// The .njk's legacy `gap`/`workflow`/`outcomes` fall-back skeleton is not ported: no
// remaining page used it, and it rendered visible "Placeholder copy" text.
const route = useRoute()
const slug = String(route.params.slug)

const { data: page } = await useAsyncData(`use-case-${slug}`, () =>
    queryCollection('useCases').where('slug', '=', slug).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Use case not found' })
}

// The .njk assembled this list by testing each block in turn, and numbered the entries
// by position, so a page missing a block does not leave a gap in the numbering.
const navItems = computed(() => {
    const p = page.value
    if (!p) return []
    return [
        p.customerPain && { id: 'customer-pain', label: 'Customer Pain' },
        p.outcomeFirst && { id: 'outcome-first', label: 'Outcome First' },
        p.whyItMatters && { id: 'why-it-matters', label: 'Why It Matters' },
        p.competition && { id: 'competition', label: 'Why Off-the-Shelf Fails' },
        p.comparison && { id: 'with-without', label: 'With / Without FlowFuse' },
        p.aiBuildLayer && { id: 'ai-build-layer', label: 'Build It With AI' },
    ].filter(Boolean) as Array<{ id: string, label: string }>
})

const seoTitle = computed(() => page.value?.seoMeta?.title || page.value?.title)
const seoDescription = computed(() => page.value?.seoMeta?.description || page.value?.problem || '')

useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogDescription: seoDescription,
    ogUrl: computed(() => `https://flowfuse.com/use-cases/${slug}/`),
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div v-if="page" class="w-full">
    <UseCaseHero :title="page.title" :problem="page.problem" />
    <UseCaseSectionNav :items="navItems" />

    <UseCasePain v-if="page.customerPain" :block="page.customerPain" />
    <UseCaseOutcomes v-if="page.outcomeFirst" :block="page.outcomeFirst" />
    <UseCaseWhyItMatters v-if="page.whyItMatters" :block="page.whyItMatters" />
    <UseCaseCompetition v-if="page.competition" :block="page.competition" />
    <UseCaseComparison v-if="page.comparison" :block="page.comparison" />
    <UseCaseAiBuildLayer v-if="page.aiBuildLayer" :block="page.aiBuildLayer" :slug="slug" />

    <UseCaseIndustryChips :industries="page.industries" />

    <UseCaseClosingCta
        :heading="page.closingCta?.heading"
        :description="page.closingCta?.description"
    />
  </div>
</template>
