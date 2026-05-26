import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        pages: defineCollection({
            type: 'page',
            source: '*.md'
        }),
        // Handbook markdown is generated from src/handbook by
        // scripts/copy_handbook.js (relative links/images rewritten).
        handbook: defineCollection({
            type: 'page',
            source: 'handbook/**/*.md'
        })
    }
})
