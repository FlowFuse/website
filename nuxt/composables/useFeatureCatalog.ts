import { parse as parseYaml } from 'yaml'
import featureCatalogRaw from '../../src/_data/featureCatalog.yaml?raw'

interface TierValue {
    value?: boolean | string | null
    dimmed?: boolean
}

interface FeatureTier {
    enterprise?: TierValue
}

export interface CatalogFeature {
    id: string
    cloud?: FeatureTier
    selfHosted?: FeatureTier
    changelog?: string | { url: string, release?: string } | Array<string | { url: string, release?: string }>
}

// `yaml`'s parse() is a pure parser (no arbitrary type construction); featureCatalog.yaml is trusted in-repo data.
const featureCatalog = parseYaml(featureCatalogRaw) || { sections: [] }

function allFeatures(): CatalogFeature[] {
    return (featureCatalog.sections || []).flatMap((section: any) => section.features || [])
}

function changelogUrls(feature: CatalogFeature): string[] {
    if (!feature.changelog) return []
    const entries = Array.isArray(feature.changelog) ? feature.changelog : [feature.changelog]
    return entries.map(entry => typeof entry === 'string' ? entry : entry.url)
}

export function findFeatureByChangelog(changelogUrl: string): CatalogFeature | null {
    const normalized = changelogUrl.replace(/\/$/, '') + '/'
    for (const feature of allFeatures()) {
        if (changelogUrls(feature).some(url => (url.replace(/\/$/, '') + '/') === normalized)) return feature
    }
    return null
}

export function deriveTierLabel(tierData?: FeatureTier): string | null {
    if (!tierData) return null
    const enterprise = tierData.enterprise?.value
    const enterpriseDimmed = tierData.enterprise?.dimmed
    if (enterprise === 'contact' || (typeof enterprise === 'string' && enterprise.toLowerCase().includes('contact'))) return 'Enterprise (contact us)'
    if (enterpriseDimmed) return 'Enterprise (on request)'
    if (enterprise === 'time') return 'Coming soon'
    if (enterprise) return 'Enterprise'
    return 'Not available'
}
