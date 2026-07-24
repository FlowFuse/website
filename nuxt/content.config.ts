import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
    collections: {
        // Rendered via pages/[...slug].vue, which sets `robots: noindex` on every page —
        // deliberately has no `sitemap` field, so @nuxtjs/sitemap skips this collection.
        pages: defineCollection({
            type: 'page',
            source: '*.md'
        }),
        docs: defineCollection({
            type: 'page',
            source: 'docs/**/*.md',
            schema: z.object({
                navTitle: z.string().optional(),
                navGroup: z.string().optional(),
                navOrder: z.number().optional(),
                originalPath: z.string().optional(),
                updated: z.string().optional(),
                version: z.string().optional(),
                layout: z.string().optional(),
                redirect: z.object({
                    to: z.string(),
                }).optional(),
                meta: z.object({
                    description: z.string().optional(),
                }).optional(),
            })
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
            })
        })
    }
})
