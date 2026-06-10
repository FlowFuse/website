import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
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
            source: 'handbook/**/*.md',
            schema: z.object({
                navigation: z.object({
                    group: z.string().optional(),
                }).optional(),
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
            })
        })
    }
})
