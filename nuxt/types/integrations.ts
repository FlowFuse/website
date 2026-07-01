export interface IntegrationAuthor {
    name?: string
    email?: string
    url?: string
}

export interface IntegrationDownloads {
    week: number
}

export type IntegrationTier = 'recommended' | 'certified'

export type CertifiedCollection = 'hub' | 'edge'

export const COLLECTION_LABELS: Record<CertifiedCollection, string> = {
    hub: 'Hub',
    edge: 'Edge'
}

export interface IntegrationCatalogEntry {
    _id: string
    name: string
    description: string
    categories: string[]
    author?: IntegrationAuthor | string
    npmOwners?: string[]
    npmScope: string | null
    ffCertified?: boolean
    downloads: IntegrationDownloads
    version: string
    updatedAt: string
    tier?: IntegrationTier
    collection?: CertifiedCollection
    docsUrl?: string
}

export interface CertifiedCatalogueModule {
    id: string
    version: string
    description: string
    updated_at: string
    url: string
    types: string[]
    keywords: string[]
    name?: string
    categories?: string[]
}

export interface CertifiedCatalogueResponse {
    name: string
    updated_at: string
    modules: CertifiedCatalogueModule[]
}

export interface IntegrationExample {
    name: string
    path: string
    url: string
    downloadUrl: string
    flow?: string
}

export interface IntegrationRepository {
    type?: string
    url?: string
}

export interface IntegrationMaintainer {
    name?: string
    email?: string
}

export interface IntegrationTimeMap {
    created?: string
    modified?: string
    [version: string]: string | undefined
}

export interface Integration extends IntegrationCatalogEntry {
    readme?: string
    homepage?: string
    bugs?: { url?: string }
    repository?: IntegrationRepository
    maintainers?: IntegrationMaintainer[]
    license?: string
    time?: IntegrationTimeMap
    lastUpdated?: string
    created?: string
    githubOwner?: string
    githubRepo?: string
    examples?: IntegrationExample[]
}

export const INTEGRATION_CATEGORIES: Record<string, string> = {
    ai: 'AI',
    communication: 'Communication',
    'data-and-analytics': 'Data & Analysis',
    database: 'Database',
    hardware: 'Hardware',
    'home-automation': 'Home Automation',
    industrial: 'Industrial',
    security: 'Security',
    storage: 'Storage',
    tools: 'Tools',
    ui: 'UI',
    utility: 'Utility'
}

export const INTEGRATIONS_API = 'https://ff-integrations.flowfuse.cloud/api/nodes'
export const CERTIFIED_HUB_API = 'https://ff-certified-nodes.flowfuse.cloud/ff-it.json'
export const CERTIFIED_EDGE_API = 'https://ff-certified-nodes.flowfuse.cloud/ff-ot.json'
