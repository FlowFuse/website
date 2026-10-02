<script setup lang="ts">
// Every /use-cases/<slug>/ page. A use case is one content/use-cases/<slug>.yml entry: its
// listing metadata plus an ordered `sections` list, each entry rendered by the component
// its `type` names below. No use case has a .vue file of its own, so adding one, or
// moving a band, is a YAML change. The schema lives in content.config.ts (`useCases`).
const route = useRoute()
const slug = String(route.params.slug)

const { data: page } = await useAsyncData(`use-case-${slug}`, () =>
    queryCollection('useCases').where('slug', '=', slug).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Use case not found' })
}

// The numbered sections from layouts/use-case.njk. Each one carries an anchor and a
// section-nav label; its number is its position among them, so a page that leaves one
// out does not leave a gap.
const NUMBERED: Record<string, { id: string, label: string }> = {
    pain: { id: 'customer-pain', label: 'Customer Pain' },
    outcomes: { id: 'outcome-first', label: 'Outcome First' },
    whyItMatters: { id: 'why-it-matters', label: 'Why It Matters' },
    competition: { id: 'competition', label: 'Why Off-the-Shelf Fails' },
    comparison: { id: 'with-without', label: 'With / Without FlowFuse' },
    aiBuildLayer: { id: 'ai-build-layer', label: 'Build It With AI' },
}

const COMPONENTS: Record<string, ReturnType<typeof resolveComponent>> = {
    pain: resolveComponent('UseCasePain'),
    outcomes: resolveComponent('UseCaseOutcomes'),
    whyItMatters: resolveComponent('UseCaseWhyItMatters'),
    competition: resolveComponent('UseCaseCompetition'),
    comparison: resolveComponent('UseCaseComparison'),
    aiBuildLayer: resolveComponent('UseCaseAiBuildLayer'),
    prose: resolveComponent('UseCaseProse'),
    features: resolveComponent('UseCaseFeatures'),
    results: resolveComponent('UseCaseResults'),
    resources: resolveComponent('UseCaseResources'),
}

const sections = computed(() => page.value?.sections || [])

const navItems = computed(() =>
    sections.value.filter(s => s.type in NUMBERED).map(s => NUMBERED[s.type]!)
)

// Only the numbered sections take a number, and only the AI build layer the slug (for
// its CTA's tracking props); passing either to the rest would fall through as an HTML
// attribute on their root element.
function propsFor(section: { type: string }) {
    const props: Record<string, unknown> = { block: section }
    if (section.type in NUMBERED) {
        const index = navItems.value.findIndex(item => item.id === NUMBERED[section.type]!.id)
        props.number = String(index + 1).padStart(2, '0')
    }
    if (section.type === 'aiBuildLayer') props.slug = slug
    return props
}

const seoTitle = computed(() => page.value?.seoMeta?.title || page.value?.title)
const seoDescription = computed(() => page.value?.seoMeta?.description || page.value?.problem || '')

useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogDescription: seoDescription,
    ogImage: computed(() => page.value?.seoMeta?.image ? `https://flowfuse.com${page.value.seoMeta.image}` : undefined),
    keywords: computed(() => page.value?.seoMeta?.keywords),
    ogUrl: `https://flowfuse.com/use-cases/${slug}/`,
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div v-if="page" class="w-full">
    <template v-for="(section, i) in sections" :key="i">
      <UseCaseHero v-if="section.type === 'hero'" :hero="section" :title="page.title" :problem="page.problem" />
      <UseCaseSectionNav v-else-if="section.type === 'sectionNav'" :items="navItems" />
      <UseCaseIndustryChips v-else-if="section.type === 'industries'" :industries="page.industries" />
      <UseCaseDeploymentOptions v-else-if="section.type === 'deploymentOptions'" />
      <FaqSection v-else-if="section.type === 'faq'" :items="section.items" :heading="section.heading" />
      <StepList
          v-else-if="section.type === 'steps'"
          :eyebrow="section.eyebrow"
          :heading="section.heading"
          :intro="section.intro"
          :link="section.link"
          :steps="section.steps"
      />
      <!-- A card with no copy of its own gets the line layouts/use-case.njk defaulted to. -->
      <ClosingCta
          v-else-if="section.type === 'cta'"
          :layout="section.layout"
          :heading="section.heading || 'See it on your operations'"
          :description="section.description || (section.layout === 'banner' ? undefined : 'Talk to an expert, or get started with FlowFuse today.')"
          :ctas="section.ctas"
      />
      <component :is="COMPONENTS[section.type]" v-else v-bind="propsFor(section)" />
    </template>
  </div>
</template>
