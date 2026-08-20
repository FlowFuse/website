import { join } from 'node:path'
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

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
        docs: defineCollection({
            type: 'page',
            source: 'docs/**/*.md',
            schema: z.object({
                navTitle: z.string().optional(),
                navGroup: z.string().optional(),
                // Read by useDocsNav to rank the sidebar group headings; without it
                // declared here @nuxt/content strips the key from frontmatter.
                navGroupOrder: z.number().optional(),
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
                // No `sitemap` schema field here on purpose - @nuxtjs/sitemap's own
                // @nuxt/content integration only accepts *plain* onUrl/filter functions
                // (it re-splices their source text into a generated file with no closure
                // over this module's imports/helpers), which git-based lastmod needs.
                // docs/handbook/changelog/blog/ebooks/whitepapers are all enriched instead
                // by server/api/__sitemap__/content-urls.get.ts, a normal Nitro route.
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
            })
        }),
        // Markdown-driven Application Guide pages, rendered by
        // pages/application-guide/[guide]/[slug].vue via ContentRenderer, like /docs.
        // The sidebar/order is driven by frontmatter (guide, slug, navOrder, navTitle).
        applicationGuideDoc: defineCollection({
            type: 'page',
            source: 'application-guide/**/*.md',
            schema: z.object({
                guide: z.enum(['flowfuse', 'node-red']),
                slug: z.string(),
                navTitle: z.string().optional(),
                navOrder: z.number().optional(),
                // slug of the parent page — nests this page under it in the sidebar.
                parent: z.string().optional(),
                blurb: z.string().optional(),
                meta: z.object({
                    description: z.string().optional(),
                }).optional(),
            })
        }),
        // Source files stay at src/changelog/ (11ty's historical location) rather than
        // being copied into nuxt/content/ - keeps this migration a content-config-only change.
        changelog: defineCollection({
            type: 'page',
            source: {
                cwd: join(__dirname, '../src'),
                include: 'changelog/**/*.md',
            },
            schema: z.object({
                description: z.string().optional(),
                subtitle: z.string().optional(),
                date: z.coerce.date(),
                authors: z.array(z.string()).optional(),
                issues: z.array(z.string()).optional(),
                metaTitle: z.string().optional(),
                // The release an entry ships in, e.g. "2.33". Quoted in frontmatter so
                // 2.30 does not parse as the number 2.3. Must be declared here or
                // @nuxt/content strips it from the entry, which is what silently
                // happened to `tags` on every changelog post.
                release: z.string().regex(/^\d+\.\d+$/),
            })
        }),
        // Source files stay at src/blog/ (11ty's historical location) rather than
        // being copied into nuxt/content/ - keeps this migration a content-config-only change.
        blog: defineCollection({
            type: 'page',
            source: {
                cwd: join(__dirname, '../src'),
                include: 'blog/**/*.md',
            },
            schema: z.object({
                subtitle: z.string().optional(),
                description: z.string().optional(),
                metaTitle: z.string().optional(),
                date: z.coerce.date(),
                lastUpdated: z.coerce.date().optional(),
                authors: z.array(z.string()).optional(),
                image: z.string().optional(),
                video: z.string().optional(),
                tags: z.array(z.string()).optional(),
                // Release blogs only. Read by nuxt/lib/release-features.mjs to hang plan
                // badges and changelog links off the matching section heading. Undeclared
                // keys are stripped by @nuxt/content, so both have to be listed here.
                release: z.string().optional(),
                features: z.array(z.object({
                    heading: z.string(),
                    // A string, or several ids when one heading covers several catalog features.
                    id: z.union([z.string(), z.array(z.string())]).optional(),
                    // For a section that is not a catalog feature at all, e.g. "What else is new?".
                    tiers: z.object({
                        edge: z.boolean(),
                        hub: z.boolean(),
                        fleet: z.boolean(),
                    }).optional(),
                })).optional(),
                tldr: z.union([z.string(), z.array(z.string())]).optional(),
                cta: z.object({
                    type: z.string().optional(),
                    title: z.string().optional(),
                    description: z.string().optional(),
                }).optional(),
                meta: z.object({
                    title: z.string().optional(),
                    description: z.string().optional(),
                    faq: z.array(z.object({
                        question: z.string(),
                        answer: z.string(),
                    })).optional(),
                    howto: z.object({
                        name: z.string().optional(),
                        description: z.string().optional(),
                        totalTime: z.string().optional(),
                        tool: z.array(z.string()).optional(),
                        steps: z.array(z.object({
                            name: z.string(),
                            text: z.string(),
                            url: z.string().optional(),
                        })).optional(),
                    }).optional(),
                }).optional(),
            })
        }),
        // Source files stay at src/customer-stories/ (11ty's historical location) rather than
        // being copied into nuxt/content/ - keeps this migration a content-config-only change.
        // The directory data file (src/customer-stories/customer-stories.json) sets
        // `permalink: false` so 11ty keeps these in `collections.stories` (still read by a
        // few live 11ty pages - src/landing/tulip.njk, src/node-red/index.njk,
        // src/_includes/stories-block.njk) without also writing output files for them.
        stories: defineCollection({
            type: 'page',
            source: {
                cwd: join(__dirname, '../src'),
                include: 'customer-stories/**/*.md',
            },
            schema: z.object({
                description: z.string().optional(),
                image: z.string().optional(),
                date: z.coerce.date(),
                // Card-badge logo shown on the listing/related-stories tiles - distinct from
                // story.logo below (the sidebar logo on the detail page). Most stories leave
                // this unset even when story.logo is set; that's existing 11ty behaviour, not
                // a migration bug. Nullable because most story files write the key with no
                // value ("logo:"), which YAML parses as null rather than omitting the key.
                logo: z.string().nullable().optional(),
                usecase: z.array(z.string()).optional(),
                subtitle: z.string().optional(),
                hubspot: z.object({
                    formId: z.string(),
                }),
                story: z.object({
                    brand: z.string(),
                    // Nullable for the same blank-key-in-YAML reason as top-level `logo` above.
                    url: z.string().nullable().optional(),
                    logo: z.string().optional(),
                    quote: z.string().optional(),
                    challenge: z.string(),
                    solution: z.string(),
                    products: z.array(z.string()),
                    results: z.array(z.string()),
                }),
            })
        }),
        // ThankYouStoriesBlock.vue also queries this `stories` collection - no separate one needed.
        // Source files stay at src/webinars/ (still served by 11ty, see LEGACY_PREFIXES
        // in nuxt/server/middleware/legacy.ts) - only queried for the "Latest/Upcoming
        // Webinar" tile on the thank-you pages, so no `sitemap` field either.
        webinars: defineCollection({
            type: 'page',
            source: {
                cwd: join(__dirname, '../src'),
                include: 'webinars/**/*.md',
            },
            schema: z.object({
                date: z.coerce.date(),
                time: z.string().optional(),
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
                // Content lives under /whitepapers/* but the page route is singular
                // (/whitepaper/[slug].vue) - content-urls.get.ts rewrites the sitemap loc.
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
                bestFitFor: z.array(z.string()).optional(),
            })
        }),
        products: defineCollection({
            type: 'data',
            source: 'products/*.yml',
            schema: z.object({
                tierId: z.string(),
                label: z.string(),
                metaDescription: z.string(),
                eyebrow: z.string(),
                headingLead: z.string(),
                headingHighlight: z.string(),
                description: z.string(),
                heroImage: z.object({
                    src: z.string(),
                    alt: z.string(),
                }),
                quote: z.object({
                    text: z.string(),
                    author: z.string(),
                    role: z.string(),
                    avatar: z.string().optional(),
                }),
                fitYes: z.array(z.string()),
                fitNo: z.array(z.string()),
                included: z.array(z.object({
                    title: z.string(),
                    chips: z.array(z.union([
                        z.string(),
                        z.object({ label: z.string(), href: z.string() }),
                    ])),
                })),
                certifiedDefault: z.enum(['it', 'ot']).optional(),
                crossLinkEyebrow: z.string(),
                crossLinkDescription: z.string(),
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
                        description: z.string().optional(),
                        docsLink: z.string().optional(),
                        changelog: z.array(z.object({
                            url: z.string(),
                            release: z.string().optional(),
                        })).optional(),
                        subfeature: z.boolean().optional(),
                        beta: z.boolean().optional(),
                        // Defaults to true. False keeps the feature off /pricing while it
                        // still carries a changelog or docs link for the badge lookups.
                        showOnPricing: z.boolean().optional(),
                        // Optional so a feature whose availability is not settled yet can
                        // omit it and publish no badge at all. Everything /pricing renders
                        // must have it, which the refine below enforces.
                        tiers: z.object({
                            edge: z.boolean(),
                            hub: z.boolean(),
                            fleet: z.boolean(),
                        }).optional(),
                    }).refine(
                        feature => feature.showOnPricing === false || !!feature.tiers,
                        { message: 'tiers is required unless showOnPricing is false', path: ['tiers'] },
                    )),
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
                            both: z.boolean().optional(),
                            url: z.string(),
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
