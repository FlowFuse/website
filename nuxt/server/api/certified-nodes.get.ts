// The FlowFuse Certified Nodes list, in the shape /node-red/ renders it.
//
// This replaces src/_data/certifiedNodes.js, whose own comment said it "deliberately
// duplicates the fetch rather than importing across the boundary" while the site was
// mid-migration. That boundary is gone: fetchCatalogue() already reads the same two
// certified feeds (CERTIFIED_HUB_API and CERTIFIED_EDGE_API), so this derives the display
// shape from it instead of fetching the feeds a second time.
//
// A feed being unreachable returns an empty list rather than failing: fetchCatalogueFeed
// already swallows per-feed errors, and the page skips its whole section when the list is
// empty, as the .njk's `{% if certifiedNodes.all.length %}` did.
import { fetchCertifiedCatalogues } from '../../utils/integrations'
import type { CertifiedCollection } from '../../types/integrations'

export interface CertifiedNode {
    id: string
    name: string
    description: string
    version: string
    collection: CertifiedCollection
    collectionLabel: string
    docsPath: string
}

// The catalogues carry no display `name`, and the ids are lowercase slugs, so
// title-casing alone gives "Opcua" and "Rtsp". Acronyms cannot be inferred.
const NAME_OVERRIDES: Record<string, string> = {
    '@flowfuse-certified-nodes/opcua': 'OPC UA',
    '@flowfuse-certified-nodes/rtsp': 'RTSP',
    '@flowfuse-certified-nodes/cip-suite': 'CIP Suite',
}

const COLLECTION_LABELS: Record<CertifiedCollection, string> = {
    hub: 'Hub',
    edge: 'Edge',
}

// Last resort when there is neither an override nor a catalogue name:
// "@flowfuse-certified-nodes/cip-suite" becomes "Cip Suite", which reads correctly for
// names that are ordinary words ("Redis", "Modbus", "Kafka").
function displayNameFromId(id: string): string {
    return (id.split('/').pop() ?? id)
        .split('-')
        .map(word => word.replace(/^\w/, char => char.toUpperCase()))
        .join(' ')
}

export default defineEventHandler(async (): Promise<CertifiedNode[]> => {
    const feeds = await fetchCertifiedCatalogues()

    // One card per (node, collection) pair, because the badge names the collection and a
    // node can be certified in both. That is what the .njk rendered.
    const nodes = feeds.flat().flatMap(entry => (entry.collections ?? []).map(collection => ({
        id: entry._id,
        // Not entry.name: normalizeCatalogueModule falls back to the id's last segment
        // when the feed carries no name, which every one of these does, so trusting it
        // would print "modbus" and "rtsp" rather than "Modbus" and "RTSP".
        name: NAME_OVERRIDES[entry._id] ?? displayNameFromId(entry._id),
        description: entry.description,
        version: entry.version,
        collection,
        collectionLabel: COLLECTION_LABELS[collection],
        // docsUrl is already normalised (flowfuse.com paths only, trailing slash added,
        // per-node overrides applied); the collection index is the fallback, as it was in
        // the .njk. Some publisher URLs still point at /node-red/flowfuse/… paths that
        // now 301 into /docs/ - that is true of production too, and it is the catalogue
        // entries that need updating, not this.
        docsPath: entry.docsUrl ?? `/docs/flowfuse-nodes/${collection}/`,
    })))

    nodes.sort((a, b) => a.name.localeCompare(b.name))
    return nodes
})
