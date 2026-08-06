// Lookups over nuxt/content/feature-catalog.yml. Kept free of Nuxt and Vue imports so it
// can be unit tested with `node --test`; the composable in composables/useFeatureCatalog.ts
// is the thin Vue wrapper around this.

// Mirrors the plan files in nuxt/content/plans/. Order is the order badges render in, which
// is the same left-to-right order the pricing table uses. A test asserts the two stay in step.
export const PLANS = [
    { id: 'edge', label: 'Edge' },
    { id: 'hub', label: 'Hub' },
    { id: 'fleet', label: 'Fleet' },
]

/**
 * Reduce a site path to a comparable form: no origin, no fragment, exactly one trailing slash.
 *
 * Catalog entries are hand written, so `/docs/user/expert`, `/docs/user/expert/` and
 * `https://flowfuse.com/docs/user/expert/#chat` all turn up and all mean the same page.
 */
export function normalizePath (url) {
    if (typeof url !== 'string' || !url) return null

    const withoutOrigin = url.replace(/^https?:\/\/flowfuse\.com/, '')
    // An off-site docsLink (dashboard.flowfuse.com) can never match a page on this site.
    if (/^https?:\/\//.test(withoutOrigin)) return null

    const withoutFragment = withoutOrigin.replace(/#.*$/, '')
    return withoutFragment.replace(/\/+$/, '') + '/'
}

/**
 * Flatten the catalog's sections into a single ordered feature list.
 */
export function allFeatures (catalog) {
    return (catalog?.sections ?? []).flatMap(section => section.features ?? [])
}

function changelogPaths (feature) {
    return (feature.changelog ?? []).map(entry => normalizePath(entry.url)).filter(Boolean)
}

/**
 * Find the feature a changelog post shipped, or null when the post is not catalogued.
 *
 * Most posts are not catalogued, and that is the intended default: a post only gets a badge
 * once someone has decided which plans the feature belongs to.
 */
export function findFeatureByChangelog (catalog, changelogPath) {
    const target = normalizePath(changelogPath)
    if (!target) return null

    return allFeatures(catalog).find(feature => changelogPaths(feature).includes(target)) ?? null
}

/**
 * Find the feature a docs page documents, or null.
 *
 * Subfeatures are skipped because their docsLink points at a heading on a parent's page
 * (`/docs/user/expert/chat/#support-mode`); matching them here would badge the whole page
 * with a subfeature's availability. The first match wins, which matters for the pages two
 * features share, e.g. Edge Devices and Device Fleet Updates both document the device agent.
 */
export function findFeatureByDocsPage (catalog, docsPath) {
    const target = normalizePath(docsPath)
    if (!target) return null

    return allFeatures(catalog).find(feature =>
        !feature.subfeature && normalizePath(feature.docsLink) === target,
    ) ?? null
}

/**
 * The plans a feature is included in, as render-ready labels.
 *
 * Returns an empty array when the feature has no `tiers` at all (availability not settled)
 * and when it is in no plan, so callers can treat "nothing to say" as one case.
 */
export function planLabels (tiers) {
    if (!tiers) return []
    return PLANS.filter(plan => tiers[plan.id]).map(plan => plan.label)
}
