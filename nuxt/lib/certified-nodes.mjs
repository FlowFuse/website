// Turns the two FlowFuse Certified catalogue feeds into the cards /node-red/ renders.
// Kept free of Nuxt imports so it can be unit tested with `node --test`;
// server/api/certified-nodes.get.ts is the only caller and does the fetching.

// The catalogues carry no display `name`, and the ids are lowercase slugs, so
// title-casing alone gives "Opcua" and "Rtsp". Acronyms cannot be inferred.
const NAME_OVERRIDES = {
    '@flowfuse-certified-nodes/opcua': 'OPC UA',
    '@flowfuse-certified-nodes/rtsp': 'RTSP',
    '@flowfuse-certified-nodes/cip-suite': 'CIP Suite',
}

// Last resort when there is no override: "@flowfuse-certified-nodes/google-sheets"
// becomes "Google Sheets", which reads correctly for names that are ordinary words
// ("Redis", "Modbus", "Kafka").
function displayNameFromId (id) {
    return (id.split('/').pop() ?? id)
        .split('-')
        .map(word => word.replace(/^\w/, char => char.toUpperCase()))
        .join(' ')
}

// Not entry.name: normalizeCatalogueModule falls back to the id's last segment when the
// feed carries no name, which every one of these does, so trusting it would print
// "modbus" and "rtsp" rather than "Modbus" and "RTSP".
export function certifiedNodeName (id) {
    return NAME_OVERRIDES[id] ?? displayNameFromId(id)
}

// One card per (node, collection) pair, because the badge names the collection and a node
// can be certified in both. That is what the .njk rendered. `feeds` is one entry list per
// catalogue, as fetchCertifiedCatalogues() returns them.
export function certifiedNodeCards (feeds) {
    const cards = feeds.flat().flatMap(entry => (entry.collections ?? []).map(collection => ({
        id: entry._id,
        name: certifiedNodeName(entry._id),
        description: entry.description,
        version: entry.version,
        collection,
        // docsUrl is already normalised (flowfuse.com paths only, trailing slash added,
        // per-node overrides applied); the collection index is the fallback, as it was in
        // the .njk. Some publisher URLs still point at /node-red/flowfuse/… paths that now
        // 301 into /docs/ - that is true of production too, and it is the catalogue
        // entries that need updating, not this.
        docsPath: entry.docsUrl ?? `/docs/flowfuse-nodes/${collection}/`,
    })))

    // Stable, so a node certified in both collections keeps feed order: Hub, then Edge.
    cards.sort((a, b) => a.name.localeCompare(b.name))
    return cards
}
