<script setup lang="ts">
// The shared page body for every industry page built on the automotive.vue template.
// A thin pages/industries/<slug>.vue queries its own `industries` collection entry and
// renders it through this one component, so the band markup lives in exactly one place.
const props = defineProps<{
    page: {
        slug: string
        industryName: string
        seoMeta: { title: string, description: string }
        hero: {
            eyebrow: string
            eyebrowIcon: string
            heading: string
            description: string
            quote?: { text: string, author: string, role?: string, company: string, image: string, imageAlt: string } | null
            image?: { src: string, alt: string } | null
        }
        socialProof?: string
        metrics: Array<{ number: string, text: string }>
        metricsBridge?: { heading: string, description: string, linkText?: string, linkHref?: string }
        roi: { heading: string, description: string }
        applications: {
            heading: string
            description: string
            items: Array<{ title: string, description: string, linkText: string, linkHref: string, image: string, imageAlt: string, variant: 'indigo' | 'red' | 'mixed' }>
        }
        compliance: {
            heading?: string
            subtitle?: string
            description: string
            items: Array<{ title: string, text: string, linkText: string, linkHref: string, icon?: string }>
        }
        faqs: Array<{ question: string, answer: string }>
        closingCta: { heading: string, description: string }
    }
}>()

useSeoMeta({
    title: props.page.seoMeta.title,
    description: props.page.seoMeta.description,
    ogUrl: `https://flowfuse.com/industries/${props.page.slug}/`,
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...props.page.faqs.map(item => defineQuestion(item)),
])
</script>

<template>
  <div class="w-full">
    <IndustryPageHero :hero="page.hero" :social-proof="page.socialProof" />

    <IndustryPageMetrics :metrics="page.metrics" :metrics-bridge="page.metricsBridge" />

    <IndustryPageRoi :heading="page.roi.heading" :description="page.roi.description" />

    <IndustryPageApplications
        :heading="page.applications.heading"
        :description="page.applications.description"
        :items="page.applications.items"
    />

    <EnterpriseSecurity />

    <IndustryPageCompliance
        :industry-name="page.industryName"
        :heading="page.compliance.heading ?? undefined"
        :subtitle="page.compliance.subtitle ?? undefined"
        :description="page.compliance.description"
        :items="page.compliance.items"
    />

    <!-- Dynamic, not page data: every use-case whose own `industries[]` field names this
         slug shows up here. Shared with the industriesLegacy [slug].vue's own band. -->
    <IndustryPageUseCases :slug="page.slug" :display-name="page.industryName" />

    <div class="w-full px-6 pt-20 pb-10">
      <div class="max-w-screen-lg mx-auto">
        <h2 class="mb-1 text-center md:text-left">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <Faq :faq="page.faqs" />
      </div>
    </div>

    <IndustryPageCta :heading="page.closingCta.heading" :description="page.closingCta.description" />
  </div>
</template>
