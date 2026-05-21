export interface IntegrationAuthor {
    name?: string
    email?: string
    url?: string
}

export interface IntegrationDownloads {
    week: number
}

export interface IntegrationCatalogEntry {
    _id: string
    name: string
    description: string
    categories: string[]
    author?: IntegrationAuthor | string
    /** Some catalog entries lack npmOwners entirely — defensive optional. */
    npmOwners?: string[]
    npmScope: string | null
    ffCertified?: boolean
    downloads: IntegrationDownloads
    version: string
    updatedAt: string
}

export interface IntegrationExample {
    name: string
    path: string
    url: string
    downloadUrl: string
    /** JSON-encoded flow content, already escaped for safe HTML embedding. */
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
    /** Rendered README (HTML) with relative-to-absolute image rewriting. */
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
