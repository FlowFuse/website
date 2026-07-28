import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'

const tierValue = z.object({
    value: z.union([z.boolean(), z.null(), z.string()]),
    dimmed: z.boolean().optional(),
    tag: z.string().optional(),
    tagPrefix: z.string().optional(),
    note: z.string().optional(),
    options: z.array(z.string()).optional(),
})

const ctaButton = z.object({
    cta: z.string(),
    url: z.string(),
    onclick: z.string().optional(),
})

export default defineContentConfig({
    collections: {
        // Rendered via pages/[...slug].vue, which sets `robots: noindex` on every page —
        // deliberately has no `sitemap` field, so @nuxtjs/sitemap skips this collection.
        pages: defineCollection({
            type: 'page',
            source: '*.md'
        }),
        handbook: defineCollection({
            type: 'page',
            source: 'handbook/**',
            schema: z.object({
                description: z.string().optional(),
                navigation: z.object({
                    group: z.string().optional(),
                    icon: z.string().optional(),
                    // Read by useHandbookNav for sort order; without it declared
                    // here @nuxt/content strips the key from frontmatter.
                    order: z.number().optional(),
                }).optional(),
                sitemap: defineSitemapSchema(),
            })
        }),
        ebooks: defineCollection({
            type: 'page',
            source: 'ebooks/*.md',
            schema: z.object({
                contentTitle: z.string().optional(),
                usecase: z.array(z.string()).optional(),
                image: z.string(),
                thumbnail: z.string().optional(),
                coverImage: z.string().optional(),
                secondaryImage: z.string().optional(),
                tertiaryImage: z.string().optional(),
                meta: z.object({
                    title: z.string(),
                    description: z.string().optional(),
                }),
                hubspot: z.object({
                    formId: z.string(),
                    cta: z.string().optional(),
                    reference: z.string().optional(),
                }),
                contentTable: z.array(z.string()),
                sitemap: defineSitemapSchema(),
            })
        }),
        whitepapers: defineCollection({
            type: 'page',
            source: 'whitepapers/*.md',
            schema: z.object({
                meta: z.object({
                    title: z.string(),
                    description: z.string().optional(),
                }),
                image: z.string(),
                thumbnail: z.string(),
                hubspot: z.object({
                    formId: z.string(),
                    cta: z.string().optional(),
                    reference: z.string().optional(),
                }),
                heroTitle: z.string(),
                heroContent: z.string(),
                whitepaperTitle: z.string(),
                whitepaperSubtitle: z.string().optional(),
                formTitle: z.string().optional(),
                formSubtitle: z.string().optional(),
                // Content lives under /whitepapers/* but the page route is singular:
                // /whitepaper/[slug].vue — rewrite the sitemap loc to match.
                sitemap: defineSitemapSchema({
                    name: 'whitepapers',
                    onUrl: (url) => {
                        url.loc = url.loc.replace(/^\/whitepapers\//, '/whitepaper/')
                    },
                }),
            }),
        }),
        plans: defineCollection({
            type: 'data',
            source: 'plans/*.yml',
            schema: z.object({
                tierId: z.string(),
                title: z.string(),
                description: z.string().optional(),
                price: z.string(),
                billingCycle: z.string().optional(),
                note: z.string().optional(),
                badge: z.string().optional(),
                highlight: z.boolean().optional(),
                order: z.number(),
                features: z.array(z.string()),
                button: z.object({
                    label: z.string(),
                    to: z.string(),
                    external: z.boolean().optional(),
                    color: z.enum(['primary', 'secondary', 'highlight']).optional(),
                    variant: z.enum(['solid', 'outline', 'soft', 'subtle', 'ghost', 'link']).optional(),
                }),
            })
        }),
        featureCatalog: defineCollection({
            type: 'data',
            source: 'feature-catalog.yml',
            schema: z.object({
                sections: z.array(z.object({
                    id: z.string(),
                    title: z.string(),
                    features: z.array(z.object({
                        id: z.string(),
                        title: z.string(),
                        note: z.string().optional(),
                        tiers: z.object({
                            edge: z.boolean(),
                            hub: z.boolean(),
                        }),
                    })),
                })),
            })
        }),
        certifiedNodes: defineCollection({
            type: 'data',
            source: 'certified-nodes.yml',
            schema: z.object({
                title: z.string(),
                intro: z.string().optional(),
                bundles: z.array(z.object({
                    id: z.enum(['it', 'ot']),
                    label: z.string(),
                    tier: z.string(),
                    accent: z.enum(['indigo', 'red']),
                    tagline: z.string(),
                    groups: z.array(z.object({
                        label: z.string(),
                        nodes: z.array(z.object({
                            name: z.string(),
                            abbr: z.string(),
                            description: z.string(),
                        })),
                    })),
                })),
            })
        }),
        faq: defineCollection({
            type: 'data',
            source: 'faq/*.yml',
            schema: z.object({
                page: z.string(),
                title: z.string(),
                items: z.array(z.object({
                    question: z.string(),
                    answer: z.string(),
                })),
            })
        })
    }
})
