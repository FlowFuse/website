import { buildEnrichedIntegrations } from '../../utils/integrations-enrich'

// Integrations detail pages aren't @nuxt/content — they're built from the npm/GitHub
// catalogue at request/build time — so they can't carry a `sitemap` schema field like
// handbook/ebooks/whitepapers do. Enumerate them explicitly instead.
export default defineSitemapEventHandler(async () => {
    const integrations = await buildEnrichedIntegrations().catch(() => [])
    return integrations.map(node => ({ loc: `/integrations/${node._id}/` }))
})
