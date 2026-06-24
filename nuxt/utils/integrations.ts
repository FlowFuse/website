import { ofetch } from 'ofetch'
import type { IntegrationCatalogEntry } from '../types/integrations'
import { INTEGRATIONS_API } from '../types/integrations'
import { MANUAL_CERTIFIED_NODES } from './manual-certified-nodes'

export async function fetchCatalogue (): Promise<IntegrationCatalogEntry[]> {
    interface ApiResponse { catalogue: IntegrationCatalogEntry[] }
    const data = await ofetch<ApiResponse>(INTEGRATIONS_API)
    return [...MANUAL_CERTIFIED_NODES, ...(data.catalogue ?? [])]
}
