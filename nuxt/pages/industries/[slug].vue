<script setup lang="ts">
// Ported from src/_includes/layouts/industry.njk (11ty), which this replaces.
//
// The .njk was a content-driven layout over pure frontmatter, so this file is resolution
// and ordering; the bands live in components/industry/.
//
// /industries/automotive/ does NOT come through here - it had a bespoke markup body and
// is its own Vue page. Nuxt matches that static route ahead of this dynamic one.
//
// What the port changes on purpose:
//  - The problem and solution illustrations were {% include %}d as inline SVG from
//    src/_includes/images/. They are public assets served as <img> now, which is what the
//    layout's `[&>svg]:max-w-full [&>svg]:h-auto` was reaching for anyway. Neither file
//    uses currentColor, so nothing depended on being inline.
//  - The eyebrow and list glyphs resolve through <NavIcon> against the same SVG files.
//  - Frontmatter that carried <strong>/<br>/<span class="text-red-600"> went through
//    Nunjucks' `| safe`. It goes through renderRichText here, which escapes the string
//    and re-enables only those three.
//  - social-proof.njk becomes <SocialProof>, already shared with the homepage.
const route = useRoute()
const slug = String(route.params.slug)

const { data: page } = await useAsyncData(`industry-${slug}`, () =>
    queryCollection('industries').where('slug', '=', slug).first()
)

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Industry not found' })
}

// industry-use-cases.njk titled its band with `industryDisplayName or hero.eyebrow or
// title`; no page sets the first, so the eyebrow is what actually shows.
const displayName = computed(() => page.value?.hero?.eyebrow || page.value?.seoMeta?.title || slug)

const seoTitle = computed(() => page.value?.metaTitle || page.value?.seoMeta?.title)

useSeoMeta({
    title: seoTitle,
    description: computed(() => page.value?.seoMeta?.description || ''),
    ogDescription: computed(() => page.value?.seoMeta?.description || ''),
    ogImage: computed(() => page.value?.hero?.image ? `https://flowfuse.com${page.value.hero.image}` : undefined),
    ogUrl: computed(() => `https://flowfuse.com/industries/${slug}/`),
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div v-if="page" class="w-full">
    <IndustryHero :hero="page.hero" />

    <IndustryProblem
        :problems="page.problems"
        :image="page.problemImage"
        :title="page.problemTitle"
        :industry="displayName"
    />

    <IndustrySolution :solution="page.solution" :image="page.solutionImage" :industry="displayName" />

    <IndustryOutcomes :outcomes="page.outcomes" />

    <IndustryUseCaseTiles :use-cases="page.useCases" />

    <IndustryMatchingUseCases :slug="slug" :display-name="displayName" />

    <div class="w-full py-12 px-6">
      <div class="max-w-screen-lg mx-auto">
        <div class="max-md:max-w-xl max-md:mx-auto">
          <SocialProof :eyebrow="page.socialProofText" />
        </div>
      </div>
    </div>

    <IndustryCta :cta="page.cta" />
  </div>
</template>
