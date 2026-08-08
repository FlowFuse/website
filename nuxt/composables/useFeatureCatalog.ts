// The lookups live in nuxt/lib/ as plain JS so `node --test` can run them directly
// (same reason as docs-nav.mjs); this file is the typed surface components import.
// @ts-ignore untyped module
import { findFeatureByChangelog, findFeatureByDocsPage, planLabels } from '../lib/feature-catalog.mjs'
// @ts-ignore untyped module
import { injectReleaseFeatures, resolveReleaseFeatures } from '../lib/release-features.mjs'

export interface FeatureTiers {
    edge: boolean
    hub: boolean
    fleet: boolean
}

export interface CatalogFeature {
    id: string
    title: string
    description?: string
    docsLink?: string
    changelog?: Array<{ url: string, release?: string }>
    subfeature?: boolean
    beta?: boolean
    showOnPricing?: boolean
    tiers?: FeatureTiers
}

/**
 * The whole catalog. Every caller shares the `featureCatalog` key, so the pricing page and
 * a page full of changelog rows all read one fetch.
 */
export function useFeatureCatalog () {
    const { data } = useAsyncData('featureCatalog', () => queryCollection('featureCatalog').first())
    return data
}

/**
 * The plans that include the feature a changelog post shipped.
 *
 * Empty whenever the post is not tied to a catalog feature, or the feature's availability
 * has not been settled. Both mean "publish no badge" rather than "publish an empty one".
 */
export function useChangelogPlans (path: MaybeRefOrGetter<string | undefined>) {
    const catalog = useFeatureCatalog()
    return computed<string[]>(() => planLabels(findFeatureByChangelog(catalog.value, toValue(path))?.tiers))
}

/**
 * The plans that include the feature a docs page documents. Empty on the many docs pages
 * that are not tied to a catalog feature.
 */
export function useDocsPlans (path: MaybeRefOrGetter<string | undefined>) {
    const catalog = useFeatureCatalog()
    return computed<string[]>(() => planLabels(findFeatureByDocsPage(catalog.value, toValue(path))?.tiers))
}

/**
 * A release blog with its `features:` frontmatter rendered: plan badges under each named
 * heading, changelog and docs links at the end of that section.
 *
 * Returns the page unchanged for every post without a `release` and `features:` block, which
 * is all of them except the release blogs.
 */
export function useReleaseFeaturePage (page: MaybeRefOrGetter<any>) {
    const catalog = useFeatureCatalog()

    // Titles for the changelog links. Metadata only, and shared with the changelog pages by key.
    const { data: changelogPosts } = useAsyncData(
        'changelog-titles',
        () => queryCollection('changelog').select('path', 'title').all(),
    )
    const changelogTitles = computed<Record<string, string>>(() =>
        Object.fromEntries((changelogPosts.value ?? []).map(post => [`${post.path.replace(/\/+$/, '')}/`, post.title])),
    )

    return computed(() => {
        const value = toValue(page)
        if (!value?.release || !value?.features?.length || !value?.body?.value) return value

        const resolved = resolveReleaseFeatures(value.features, catalog.value, value.release, changelogTitles.value)
        const body = injectReleaseFeatures(value.body.value, resolved)
        return body === value.body.value ? value : { ...value, body: { ...value.body, value: body } }
    })
}
