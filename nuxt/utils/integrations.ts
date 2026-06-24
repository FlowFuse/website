import { ofetch } from 'ofetch'
import type {
    CertifiedCatalogueModule,
    CertifiedCatalogueResponse,
    CertifiedCollection,
    IntegrationCatalogEntry
} from '../types/integrations'
import { CERTIFIED_EDGE_API, CERTIFIED_HUB_API, INTEGRATIONS_API } from '../types/integrations'

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

function normalizeCertifiedModule (m: CertifiedCatalogueModule, collection: CertifiedCollection): IntegrationCatalogEntry {
    return {
        _id: m.id,
        name: m.name ?? m.id.split('/').pop() ?? m.id,
        description: m.description,
        categories: m.categories ?? [],
        npmScope: scopeFromId(m.id),
        tier: 'certified',
        collection,
        version: m.version,
        downloads: { week: 0 },
        updatedAt: m.updated_at,
        docsUrl: docPathFromCatalogueUrl(m.url)
    }
}

async function fetchCertified (url: string, collection: CertifiedCollection): Promise<IntegrationCatalogEntry[]> {
    try {
        const data = await ofetch<CertifiedCatalogueResponse>(url)
        return (data.modules ?? []).map(m => normalizeCertifiedModule(m, collection))
    } catch {
        return []
    }
}

export async function fetchCatalogue (): Promise<IntegrationCatalogEntry[]> {
    const [api, hub, edge] = await Promise.all([
        ofetch<CatalogApiResponse>(INTEGRATIONS_API).catch(() => ({ catalogue: [] as IntegrationCatalogEntry[] })),
        fetchCertified(CERTIFIED_HUB_API, 'hub'),
        fetchCertified(CERTIFIED_EDGE_API, 'edge')
    ])

    const recommended = (api.catalogue ?? []).map(n => ({
        ...n,
        tier: n.ffCertified ? 'recommended' as const : undefined
    }))

    const certified = [...hub, ...edge]
    const certifiedIds = new Set(certified.map(n => n._id))
    return [...certified, ...recommended.filter(n => !certifiedIds.has(n._id))]
}
