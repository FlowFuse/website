import { ofetch } from 'ofetch'
import type { IntegrationCatalogEntry } from '../types/integrations'
import { INTEGRATIONS_API } from '../types/integrations'

/**
 * Fetch the full integrations catalog (all ~6000 nodes), unenriched.
 * Used by the catalog page for filtering/listing. Runs on the client to avoid
 * inlining ~1.2MB of node data into the page payload.
 */
export async function fetchCatalogue (): Promise<IntegrationCatalogEntry[]> {
    interface ApiResponse { catalogue: IntegrationCatalogEntry[] }
    const data = await ofetch<ApiResponse>(INTEGRATIONS_API)
    return data.catalogue ?? []
}
