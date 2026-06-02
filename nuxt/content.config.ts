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
        })
    }
})
