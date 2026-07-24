import { selectTopIntegrationNodes } from '../../utils/integrations-enrich'

// Integrations detail pages aren't @nuxt/content — they're built from the npm/GitHub
// catalogue at request/build time — so they can't carry a `sitemap` schema field like
// handbook/ebooks/whitepapers do. Enumerate them explicitly instead.
//
// Deliberately uses selectTopIntegrationNodes() (one cached catalogue fetch), not
// buildEnrichedIntegrations() (which also fetches npm/GitHub README/examples per node) —
// the sitemap only needs `_id`, and the full enrichment is slow enough to risk timing
// out on a cold serverless invocation.
export default defineSitemapEventHandler(async () => {
    try {
        const nodes = await selectTopIntegrationNodes()
        return nodes.map(node => ({ loc: `/integrations/${node._id}/` }))
    } catch (err) {
        console.error('[sitemap] failed to fetch integrations catalogue for dynamic-urls:', err)
        return []
    }
})
