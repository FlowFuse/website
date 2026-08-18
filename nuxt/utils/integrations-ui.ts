import type { CertifiedCollection, IntegrationCatalogEntry } from '../types/integrations'

export function nodeProducts (node: Pick<IntegrationCatalogEntry, 'collections'>): CertifiedCollection[] {
    return node.collections ?? []
}

/*
    Documentation target for a certified node. An entry only carries a docsUrl
    when the publisher pointed the catalogue `url` at flowfuse.com or it has a
    DOCS_URL_OVERRIDES entry (see nuxt/utils/integrations.ts) — opcua, for one,
    points at Sterfive's repository. Fall back to the collection index, which
    always exists, rather than rendering a card that goes nowhere.
*/
export function certifiedHref (node: Pick<IntegrationCatalogEntry, 'docsUrl' | 'collections'>): string | null {
    if (node.docsUrl) return node.docsUrl
    const collection = nodeProducts(node)[0]
    return collection ? `/node-red/flowfuse/${collection}/` : null
}

export function tileClass (node: Pick<IntegrationCatalogEntry, 'collections' | 'tier'>): string {
    const products = nodeProducts(node)
    if (products.includes('hub') && products.includes('edge')) return 'bg-gradient-to-br from-indigo-600 to-red-600'
    if (products[0] === 'hub') return 'bg-indigo-600'
    if (products[0] === 'edge') return 'bg-red-600'
    if (node.tier === 'recommended') return 'bg-blue-600'
    return 'bg-gray-500'
}

export function monogram (name: string): string {
    const clean = name
        .replace(/^@[^/]+\//, '')
        .replace(/node-red-(contrib-|node-)?/i, '')
        .replace(/[^A-Za-z0-9 /-]/g, ' ')
        .trim()
    const parts = clean.split(/[ /-]+/).filter(Boolean)
    const mono = (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
    return (mono || clean.slice(0, 2)).toUpperCase()
}
