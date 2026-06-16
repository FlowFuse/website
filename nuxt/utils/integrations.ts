import { ofetch } from 'ofetch'
import type { IntegrationCatalogEntry } from '../types/integrations'
import { INTEGRATIONS_API } from '../types/integrations'

export async function fetchCatalogue (): Promise<IntegrationCatalogEntry[]> {
    interface ApiResponse { catalogue: IntegrationCatalogEntry[] }
    const data = await ofetch<ApiResponse>(INTEGRATIONS_API)
    return data.catalogue ?? []
}
