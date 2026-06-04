import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        pages: defineCollection({
            type: 'page',
            source: '*.md'
        }),
        handbook: defineCollection({
            type: 'page',
            source: 'handbook/**/*.md',
            schema: z.object({
                navTitle: z.string().optional(),
                navGroup: z.string().optional(),
                navOrder: z.number().optional(),
            })
        }),
        ebooks: defineCollection({
            type: 'page',
            source: 'ebooks/*.md',
            schema: z.object({
                contentTitle: z.string(),
                image: z.string(),
                coverImage: z.string().optional(),
                secondaryImage: z.string().optional(),
                tertiaryImage: z.string().optional(),
                meta: z.object({
                    title: z.string().optional(),
                    description: z.string().optional(),
                }).optional(),
                hubspot: z.object({
                    formId: z.string(),
                    cta: z.string().optional(),
                    reference: z.string().optional(),
                }),
                contentTable: z.array(z.string()),
            })
        })
    }
})
