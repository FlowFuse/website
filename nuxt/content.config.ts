import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
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
        }),
        blog: defineCollection({
            type: 'page',
            source: 'blog/**',
            schema: z.object({
                subtitle: z.string().optional(),
                description: z.string().optional(),
                date: z.date(),
                lastUpdated: z.date().optional(),
                authors: z.array(z.string()).default([]),
                image: z.string().optional(),
                video: z.string().optional(),
                tags: z.array(z.string()).default([]),
                tldr: z.union([z.string(), z.array(z.string())]).optional(),
                keywords: z.string().optional(),
                cta: z.object({
                    type: z.string().optional(),
                    title: z.string().optional(),
                    description: z.string().optional(),
                }).optional(),
                meta: z.record(z.string(), z.any()).optional(),
            })
        }),
        // Author data — reads directly from 11ty's src/_data (not duplicated).
        blogTeam: defineCollection({
            type: 'data',
            source: {
                include: '*.json',
                cwd: '../src/_data/team',
            },
            schema: z.object({
                order: z.number().optional(),
                name: z.string(),
                title: z.string().optional(),
                github: z.string().optional(),
                linkedin: z.string().optional(),
                twitter: z.string().optional(),
                country: z.string().optional(),
                email: z.string().optional(),
                headshot: z.string().optional(),
                bio: z.string().optional(),
            })
        }),
        blogGuests: defineCollection({
            type: 'data',
            source: {
                include: '*.json',
                cwd: '../src/_data/guests',
            },
            schema: z.object({
                name: z.string(),
                title: z.string().optional(),
                github: z.string().optional(),
                linkedin: z.string().optional(),
                twitter: z.string().optional(),
                country: z.string().optional(),
                headshot: z.string().optional(),
                bio: z.string().optional(),
            })
        })
    }
})
