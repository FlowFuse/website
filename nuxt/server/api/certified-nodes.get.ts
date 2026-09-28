// The FlowFuse Certified Nodes list, in the shape /node-red/ renders it.
//
// This replaces src/_data/certifiedNodes.js, whose own comment said it "deliberately
// duplicates the fetch rather than importing across the boundary" while the site was
// mid-migration. That boundary is gone: fetchCatalogue() already reads the same two
// certified feeds (CERTIFIED_HUB_API and CERTIFIED_EDGE_API), so this derives the display
// shape from it instead of fetching the feeds a second time. The derivation itself (names,
// one card per collection, docs fallback, order) is in lib/certified-nodes.mjs, where
// `npm test` covers it.
//
// A feed being unreachable returns an empty list rather than failing: fetchCatalogueFeed
// already swallows per-feed errors, and the page skips its whole section when the list is
// empty, as the .njk's `{% if certifiedNodes.all.length %}` did.
import { certifiedNodeCards } from '../../lib/certified-nodes.mjs'
import { fetchCertifiedCatalogues } from '../../utils/integrations'
import { COLLECTION_LABELS, type CertifiedCollection } from '../../types/integrations'

export interface CertifiedNode {
    id: string
    name: string
    description: string
    version: string
    collection: CertifiedCollection
    collectionLabel: string
    docsPath: string
}

export default defineEventHandler(async (): Promise<CertifiedNode[]> => {
    const feeds = await fetchCertifiedCatalogues()
    return certifiedNodeCards(feeds).map((card: Omit<CertifiedNode, 'collectionLabel'>) => ({
        ...card,
        collectionLabel: COLLECTION_LABELS[card.collection],
    }))
})
