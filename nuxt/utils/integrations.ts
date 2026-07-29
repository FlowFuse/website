import { ofetch } from 'ofetch'
import type {
    CertifiedCatalogueModule,
    CertifiedCatalogueResponse,
    CertifiedCollection,
    IntegrationCatalogEntry,
    IntegrationTier
} from '../types/integrations'
import {
    CERTIFIED_EDGE_API,
    CERTIFIED_HUB_API,
    FLOWFUSE_NODES_API,
    INTEGRATIONS_API
} from '../types/integrations'

interface CatalogApiResponse { catalogue: IntegrationCatalogEntry[] }

function scopeFromId (id: string): string | null {
    return id.startsWith('@') ? id.slice(1).split('/')[0] ?? null : null
}

function docPathFromCatalogueUrl (url: string | undefined): string | undefined {
    if (!url) return undefined
    try {
        const parsed = new URL(url)
        if (parsed.hostname !== 'flowfuse.com' && parsed.hostname !== 'www.flowfuse.com') return undefined
        return parsed.pathname + parsed.search + parsed.hash
    } catch {
        return undefined
    }
}

const DOCS_URL_OVERRIDES: Record<string, string> = {
    '@flowfuse-certified-nodes/opcua': '/node-red/flowfuse/edge/opcua/'
}

function normalizeCatalogueModule (
    m: CertifiedCatalogueModule,
    tier: IntegrationTier,
    collection?: CertifiedCollection
): IntegrationCatalogEntry {
    return {
        _id: m.id,
        name: m.name ?? m.id.split('/').pop() ?? m.id,
        description: m.description,
        categories: m.categories ?? [],
        npmScope: scopeFromId(m.id),
        tier,
        collection,
        version: m.version,
        downloads: { week: 0 },
        updatedAt: m.updated_at,
        docsUrl: DOCS_URL_OVERRIDES[m.id] ?? docPathFromCatalogueUrl(m.url)
    }
}

/*
    A catalogue feed is unreachable often enough (private registry, transient
    network) that a failure must degrade to an empty list rather than take the
    whole page down with it.
*/
async function fetchCatalogueFeed (
    url: string,
    tier: IntegrationTier,
    collection?: CertifiedCollection
): Promise<IntegrationCatalogEntry[]> {
    try {
        const data = await ofetch<CertifiedCatalogueResponse>(url)
        return (data.modules ?? []).map(m => normalizeCatalogueModule(m, tier, collection))
    } catch {
        return []
    }
}

export async function fetchCatalogue (): Promise<IntegrationCatalogEntry[]> {
    const [api, hub, edge, flowfuseNodes] = await Promise.all([
        ofetch<CatalogApiResponse>(INTEGRATIONS_API).catch(() => ({ catalogue: [] as IntegrationCatalogEntry[] })),
        fetchCatalogueFeed(CERTIFIED_HUB_API, 'certified', 'hub'),
        fetchCatalogueFeed(CERTIFIED_EDGE_API, 'certified', 'edge'),
        fetchCatalogueFeed(FLOWFUSE_NODES_API, 'recommended')
    ])

    const recommended = (api.catalogue ?? []).map(n => ({
        ...n,
        tier: n.ffCertified ? 'recommended' as const : undefined
    }))

    const certified = [...hub, ...edge]
    const certifiedIds = new Set(certified.map(n => n._id))
    const apiIds = new Set(recommended.map(n => n._id))

    /*
        The FlowFuse Nodes feed overlaps the other two sources: most of its
        modules are @flowfuse packages the library API already returns, with
        download counts and author data this feed does not carry. Those richer
        entries win, so only modules missing from both other sources are taken
        from here. Today that is the AI and MCP server node packages, which are
        published to the private registry and so never reach the public library.
    */
    const flowfuseOnly = flowfuseNodes.filter(
        n => !certifiedIds.has(n._id) && !apiIds.has(n._id)
    )

    return [
        ...certified,
        ...flowfuseOnly,
        ...recommended.filter(n => !certifiedIds.has(n._id))
    ]
}
