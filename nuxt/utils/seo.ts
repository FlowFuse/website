// Parity with src/_includes/jsonld.njk.

export const SITE_URL = 'https://flowfuse.com'
export const OG_IMAGE = `${SITE_URL}/images/og-social-tile.jpg`

const SITE_TAGLINE = 'Build workflows and integrations that optimize your industrial operations'

export function buildJsonLd (opts: { url: string, title: string, description: string, image?: string }) {
    const pageImage = opts.image || OG_IMAGE
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: 'FlowFuse',
                url: SITE_URL,
                description: SITE_TAGLINE,
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/handbook/images/logos/ff-logo--square--dark.png` },
                sameAs: [
                    'https://www.g2.com/products/flowfuse/reviews',
                    'https://www.linkedin.com/company/flowfuse',
                    'https://www.youtube.com/@FlowFuseInc',
                    'https://github.com/FlowFuse'
                ]
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: 'FlowFuse',
                description: SITE_TAGLINE,
                publisher: { '@id': `${SITE_URL}/#organization` }
            },
            {
                '@type': 'WebPage',
                '@id': `${opts.url}#webpage`,
                url: opts.url,
                name: opts.title,
                headline: opts.title,
                description: opts.description,
                isPartOf: { '@id': `${SITE_URL}/#website` },
                primaryImageOfPage: { '@type': 'ImageObject', url: pageImage },
                publisher: { '@id': `${SITE_URL}/#organization` }
            },
            {
                '@type': 'SoftwareApplication',
                '@id': `${SITE_URL}/#software`,
                name: 'FlowFuse',
                url: SITE_URL,
                applicationCategory: 'DeveloperApplication',
                publisher: { '@id': `${SITE_URL}/#organization` },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.8',
                    ratingCount: '3',
                    bestRating: '5',
                    worstRating: '0'
                }
            }
        ]
    }
}
