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
 * The page a plan badge links to: that plan's product page, e.g. /product/edge/.
 *
 * The product page explains what the plan is and carries its own "View pricing" CTA, so a
 * reader who wants the comparison table is one click further on. Linking the table directly
 * sets up the wrong expectation, that the badge leads to the feature it was clicked from.
 *
 * `id` is the plan file's `tierId`, which is also the product page's route parameter, so the
 * test that keeps PLANS in step with nuxt/content/plans/ covers these paths too.
 *
 * Returns null for a label that names no plan, so a caller renders it as plain text rather
 * than as a link to a page that does not exist.
 */
export function planHref (label) {
    const plan = PLANS.find(candidate => candidate.label === label)
    return plan ? `/product/${plan.id}/` : null
}

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

/**
 * Whether a feature has a row in the pricing comparison table.
 *
 * The catalog also carries features that exist only to hang a changelog or docs link off
 * (subfeatures, shipped improvements), marked `showOnPricing: false`. Pricing shows the rest.
 */
export function onPricing (feature) {
    return feature?.showOnPricing !== false
}

/**
 * A feature's plan labels, whether or not it has a row on the pricing page.
 *
 * Being off the pricing page used to suppress the badge, back when a badge linked to the
 * comparison table: clicking through and finding no row for the feature read as deprecated
 * or as a mistake. A badge now links to that plan's product page, which makes no promise of
 * a feature list, so the reader is never sent looking for a row that is not there. Stating
 * availability wherever we know it beats stating it nowhere.
 *
 * Still empty for a missing feature and for one whose `tiers` are unset, which is the only
 * remaining "publish no badge" case.
 */
export function featurePlanLabels (feature) {
    return planLabels(feature?.tiers)
}
