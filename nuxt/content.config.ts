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
        }),
        // Changelog entries are generated from src/changelog by
        // scripts/copy_changelog.js (relative links/images rewritten).
        changelog: defineCollection({
            type: 'page',
            source: 'changelog/**/*.md'
        }),
        // Customer stories are generated from src/customer-stories by
        // scripts/copy_customer_stories.js (relative links/images rewritten).
        customerStories: defineCollection({
            type: 'page',
            source: 'customer-stories/**/*.md'
        }),
        // Webinars + AMAs are generated from src/webinars and
        // src/ask-me-anything by scripts/copy_events.js.
        webinars: defineCollection({
            type: 'page',
            source: 'webinars/**/*.md'
        }),
        ama: defineCollection({
            type: 'page',
            source: 'ask-me-anything/**/*.md'
        }),
        // Ebooks are generated from src/ebooks by scripts/copy_ebooks.js.
        ebooks: defineCollection({
            type: 'page',
            source: 'ebooks/**/*.md'
        })
    }
})
