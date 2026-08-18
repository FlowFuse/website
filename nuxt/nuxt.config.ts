import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join, basename } from 'node:path'
import { parse as parseYaml } from 'yaml'
import remarkHandbookLinks from './utils/remark-handbook-links'
import remarkDocsLinks from './utils/remark-docs-links'
import { BLOG_TAGS } from './composables/useBlogList'
import { redirects } from './redirects'
import site from '../src/_data/site.json'

// Collect all handbook routes from content files for SSG prerendering
function collectHandbookRoutes(dir: string, basePath: string): string[] {
    const routes: string[] = []
    for (const file of readdirSync(dir)) {
        const fullPath = join(dir, file)
        if (statSync(fullPath).isDirectory()) {
            routes.push(...collectHandbookRoutes(fullPath, `${basePath}/${file}`))
        } else if (file.endsWith('.md')) {
            const slug = basename(file, '.md')
            routes.push(slug === 'index' ? `${basePath}/` : `${basePath}/${slug}/`)
        }
    }
    return routes
}

// Same idea for changelog entries, plus the paginated listing (19 entries/page, newest first)
function collectChangelogRoutes(dir: string, basePath: string): { routes: string[], entryCount: number } {
    const routes: string[] = []
    let entryCount = 0
    for (const file of readdirSync(dir)) {
        const fullPath = join(dir, file)
        if (statSync(fullPath).isDirectory()) {
            const nested = collectChangelogRoutes(fullPath, `${basePath}/${file}`)
            routes.push(...nested.routes)
            entryCount += nested.entryCount
        } else if (file.endsWith('.md')) {
            entryCount += 1
            routes.push(`${basePath}/${basename(file, '.md')}/`)
        }
    }
    return { routes, entryCount }
}

// The Application Guide pages are a `data` collection (see content.config.ts), so their routes
// are not discoverable from @nuxt/content page paths. Derive them from the file names, which
// are NN-<slug>.yml and match each file's `slug` field.
function collectApplicationGuideRoutes(dir: string): string[] {
    const routes = ['/application-guide/']
    for (const guide of readdirSync(dir)) {
        const guideDir = join(dir, guide)
        if (!statSync(guideDir).isDirectory()) continue
        for (const file of readdirSync(guideDir)) {
            if (!file.endsWith('.yml')) continue
            routes.push(`/application-guide/${guide}/${basename(file, '.yml').replace(/^\d+-/, '')}/`)
        }
    }
    return routes
}

// The product tier pages (/product/[tier]/) are a `data` collection (see content.config.ts),
// so their routes aren't discoverable from @nuxt/content page paths either. Derive them from
// each file's `tierId` field rather than the filename, since that's the field the page route
// actually queries on.
function collectProductRoutes (dir: string): string[] {
    const routes: string[] = []
    for (const file of readdirSync(dir)) {
        if (!file.endsWith('.yml')) continue
        const { tierId } = parseYaml(readFileSync(join(dir, file), 'utf8'))
        routes.push(`/product/${tierId}/`)
    }
    return routes
}

// Same idea as collectApplicationGuideRoutes above, for customer stories (flat
// src/customer-stories/ dir, see content.config.ts).
function collectStoryRoutes(dir: string): string[] {
    const routes = ['/customer-stories/']
    for (const file of readdirSync(dir)) {
        if (!file.endsWith('.md')) continue
        routes.push(`/customer-stories/${basename(file, '.md')}/`)
    }
    return routes
}

// Same idea for blog posts. Each entry also carries its `tags` so the 13 tag-listing
// pages (and their own pagination, 19 entries/page) can be sized correctly, and its
// `authors` so the /blog/author/{slug}/ pages can be enumerated.
function collectBlogFiles(dir: string, basePath: string): Array<{ route: string, tags: string[], authors: string[] }> {
    const results: Array<{ route: string, tags: string[], authors: string[] }> = []
    for (const file of readdirSync(dir)) {
        const fullPath = join(dir, file)
        if (statSync(fullPath).isDirectory()) {
            results.push(...collectBlogFiles(fullPath, `${basePath}/${file}`))
        } else if (file.endsWith('.md')) {
            const raw = readFileSync(fullPath, 'utf-8')
            const match = raw.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---/)
            const frontmatter = match ? (parseYaml(match[1]) || {}) : {}
            const date = frontmatter.date ? new Date(frontmatter.date) : new Date(0)
            if (date.getTime() > Date.now() && process.env.CONTEXT === 'production') continue
            results.push({ route: `${basePath}/${basename(file, '.md')}/`, tags: frontmatter.tags || [], authors: frontmatter.authors || [] })
        }
    }
    return results
}

// `authors` values that mean "no individual author" - they have no data file by design.
const ORG_AUTHOR_SLUGS = new Set(['-', 'FlowFuse', 'flowfuse', 'flowfuseteam'])

// Author pages are rendered by pages/blog/author/[slug].vue from src/_data/{team,guests}
// rather than from an @nuxt/content collection, so neither prerendering nor the sitemap
// can discover them - enumerate the authors who both have a data file and a published post.
function collectAuthorRoutes(blogFiles: Array<{ authors: string[] }>, dataDirs: string[]): string[] {
    const known = new Set(dataDirs.flatMap(dir => readdirSync(dir).filter(f => f.endsWith('.json')).map(f => basename(f, '.json'))))
    const withPosts = new Set(blogFiles.flatMap(f => f.authors))

    // Anything left is either a former team member or a typo - surface it in the build log.
    const missing = [...withPosts].filter(slug => !known.has(slug) && !ORG_AUTHOR_SLUGS.has(slug)).sort()
    if (missing.length) {
        console.warn(`[blog] ${missing.length} author slug(s) in blog frontmatter have no data file in src/_data/{team,guests}; these posts fall back to the "FlowFuse" byline and get no author page: ${missing.join(', ')}`)
    }

    return [...withPosts].filter(slug => known.has(slug)).sort().map(slug => `/blog/author/${slug}/`)
}

function paginatedListingRoutes(basePath: string, entryCount: number): string[] {
    const pageCount = Math.max(1, Math.ceil(entryCount / 19))
    return [`${basePath}/`, ...Array.from({ length: pageCount - 1 }, (_, i) => `${basePath}/${i + 2}/`)]
}

const blogFiles = collectBlogFiles(join(__dirname, '../src/blog'), '/blog')
const blogAuthorRoutes = collectAuthorRoutes(blogFiles, [join(__dirname, '../src/_data/team'), join(__dirname, '../src/_data/guests')])

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/seo', 'nuxt-studio', '@nuxt/image', './modules/docs-source', 'nuxt-llms'],

    // Captured at build time (Netlify sets CONTEXT during the build, not necessarily
    // in the deployed Function's runtime), then baked into the server bundle via
    // runtimeConfig so analytics.ts doesn't depend on a process.env read at request time.
    runtimeConfig: {
        isProductionContext: process.env.CONTEXT === 'production'
    },

    css: ['~/assets/css/theme.css'],

    // Heebo is already loaded via the Google Fonts <link> in app.head.
    // @nuxt/fonts is a transitive dep of @nuxt/ui; disable all provider downloads
    // so it never fetches font files at build time (which exhausts Netlify's memory).
    fonts: { providers: { google: false, bunny: false, fontshare: false, adobe: false } },

    site: {
        url: site.baseURL,
        name: 'FlowFuse',
        description: site.messaging.subtitle,
        defaultLocale: 'en',
    },

    // Only covers content already served by Nuxt. The handbook is deliberately excluded
    // (internal company content, not product documentation) - see README.md. Everything
    // still on the legacy Eleventy site (customer-stories, use-cases, platform, etc.) isn't
    // visible to @nuxt/content, so it's absent here too until those pages are migrated.
    llms: {
        domain: site.baseURL,
        title: 'FlowFuse',
        description: `${site.messaging.tagLine} - ${site.messaging.subtitle}`,
        full: {
            title: 'FlowFuse - Full Documentation',
            description: 'Complete FlowFuse documentation, blog, changelog, and resources in a single markdown document.',
        },
        notes: [
            'This file only covers pages served by the Nuxt frontend. Some sections of flowfuse.com are still served by a legacy Eleventy site not represented here.',
        ],

        // /raw/<path>.md, the per-page markdown endpoint the links below point at, is served
        // by @nuxt/content's own llms feature rather than by nuxt-llms, and it searches every
        // page-type collection by default. That included the handbook, so the exclusion above
        // only held for llms.txt while /raw/handbook/company.md answered with the same content
        // in markdown. Same reasoning applies to both surfaces.
        contentRawMarkdown: {
            excludeCollections: ['handbook'],
        },

        sections: [
            {
                title: 'Documentation',
                description: 'FlowFuse and Node-RED product documentation.',
                contentCollection: 'docs',
                contentFilters: [
                    { field: 'redirect', operator: 'IS NULL' },
                ],
            },
            {
                title: 'Blog',
                description: 'Tutorials, product updates, and industrial application guides.',
                contentCollection: 'blog',
            },
            {
                title: 'Changelog',
                description: 'Release notes for the FlowFuse platform.',
                contentCollection: 'changelog',
            },
            {
                title: 'Ebooks',
                description: 'Long-form guides on Node-RED and industrial applications.',
                contentCollection: 'ebooks',
            },
            {
                title: 'Whitepapers',
                description: 'Long-form guides on Node-RED and industrial applications.',
                contentCollection: 'whitepapers',
            },
            {
                title: 'Product & Company',
                links: [
                    { title: 'Home', href: `${site.baseURL}/`, description: 'FlowFuse platform overview' },
                    { title: 'Pricing', href: `${site.baseURL}/pricing/`, description: 'Plans and pricing information' },
                    { title: 'Integrations', href: `${site.baseURL}/integrations/`, description: 'Supported integrations and connectors' },
                    { title: 'Application Guide', href: `${site.baseURL}/application-guide/`, description: 'Patterns for building FlowFuse applications' },
                    { title: 'Create an account', href: `${site.appURL}/account/create`, description: 'Start a free trial' },
                    { title: 'Terms of Service', href: `${site.baseURL}/terms/` },
                    { title: 'Privacy Policy', href: `${site.baseURL}/privacy-policy/` },
                ],
            },
        ],
    },

    ogImage: {
        zeroRuntime: true,
        // resvg's default (loadSystemFonts: true) scans and parses every installed system
        // font on every single render — measured at ~1.1-1.3s per image, over 2/3 of total
        // render time. Satori already embeds all glyphs as vector paths (embedFont: true,
        // the module default) before resvg ever sees the SVG, so resvg needs zero font
        // resolution of its own at rasterization time.
        resvgOptions: { font: { loadSystemFonts: false } },
        // Content-addressed (hash of component + props + module version), so a build cache
        // hit skips font-load/render-satori/render-resvg entirely and just returns the
        // cached bytes — only pages whose title/section actually changed pay to re-render.
        // A sibling of the font cache dir, not nested inside it: nuxt-og-image's own
        // build-cache pruning does a flat readdirSync+readFileSync over this directory,
        // which throws EISDIR if it also contains the font cache's fonts-ttf/ subdirectory.
        // netlify.toml/test.yml cache both directories under one cache step.
        buildCache: { base: 'node_modules/.cache/nuxt/.nuxt/cache/og-image-render' },
    },

    sitemap: {
        sources: [
            // Nuxt-native dynamic routes (integrations) that
            // @nuxtjs/seo's static-route auto-discovery can't see
            '/api/__sitemap__/dynamic-urls',
            // docs/handbook/changelog/blog/ebooks/whitepapers with lastmod/images -
            // see content-urls.get.ts for why this isn't done via a `sitemap` schema
            // field on the collections instead.
            '/api/__sitemap__/content-urls',
        ],
        urls: blogAuthorRoutes.map(loc => ({ loc, priority: 0.6 })),
        exclude: ['/_studio/**', '/api/**'],
    },

    robots: {
        groups: [
            { userAgent: ['*'], allow: ['/'] },
            { userAgent: ['Algolia Crawler'], allow: ['/'] },
        ],
        // sitemap.xml covers Nuxt-native pages; sitemap-legacy.xml (generated by 11ty,
        // served as a static file from nuxt/public/) covers everything still on 11ty.
        sitemap: [`${site.baseURL}/sitemap.xml`, `${site.baseURL}/sitemap-legacy.xml`],
    },

    linkChecker: {
        failOnError: true,
        // trailing-slash: 11ty pages use trailing slashes intentionally
        // no-error-response: links to 11ty pages return 404 in the Nuxt-only static output
        skipInspections: ['trailing-slash', 'no-error-response'],
        // By default the module re-inspects every prerendered page once the build finishes,
        // and that pass has grown with the page count: 4m34s over 251 routes on 28 Jul,
        // 10m10s over 563 on 30 Jul, 19m15s over 2363 now, which is most of a 24m CI job.
        // What it buys us there is small. Only three of its inspections are error scope, and
        // no-error-response is already skipped above, leaving missing-hash and no-javascript;
        // everything else is a warning that no ruleset gates on. The CI build workflow also
        // runs hyperlink with --check-anchors over the built nuxt/dist tree in well under a
        // second, and that already covers broken links and anchors. Switching this off keeps
        // the module's dev-time and devtools checking, it only drops the build-time pass.
        runOnBuild: false,
    },

    // @nuxt/content generates import statements for remark plugin keys.
    // These aliases make them resolvable in the Vite bundle context.
    alias: {
        'handbook-links': join(__dirname, 'utils/remark-handbook-links'),
        'docs-links': join(__dirname, 'utils/remark-docs-links'),
    },

    app: {
        head: {
            // nuxt-seo-utils' default title template is `%s %separator %siteName`; the
            // separator defaults to '|' if unset. This makes every page's <title>/og:title
            // "{page title} • FlowFuse" without each page having to append the brand itself.
            templateParams: { separator: '•' },
            link: [
                { rel: 'stylesheet', href: '/css/style.css' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Heebo:wght@100..900&display=swap' },
                { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css', integrity: 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+', crossorigin: 'anonymous' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#aa4444' },
            ],
            meta: [
                { name: 'msapplication-TileColor', content: '#00aba9' },
                { name: 'theme-color', content: '#ffffff' },
            ],
            script: [
                // Explicit nav-click tracking. Source is src/js/nav-tracking.js;
                // prod:eleventy-nuxt copies the 11ty output into nuxt/public/.
                { src: '/js/nav-tracking.js', defer: true },
            ]
        }
    },

    image: {
        // The Netlify image provider proxies through a Netlify Image CDN function that only
        // exists on deployed/Netlify-run infra, so it 404s under plain `nuxt dev`. Fall back to
        // the passthrough provider outside production builds, or when SKIP_IMAGES is set.
        provider: (process.env.NODE_ENV !== 'production' || process.env.SKIP_IMAGES === 'true') ? 'none' : 'netlify',
        domains: ['flowfuse.com', 'www.flowfuse.com'],
        quality: 80,
    },

    routeRules: {
        '/terms': { robots: false },
        '/privacy-policy': { robots: false },
        '/thank-you/**': { robots: false },
        ...redirects,
    },

    nitro: {
        preset: 'netlify',
        serverAssets: [
            {
                baseName: 'analytics',
                // Nitro resolves this dir against nitro.srcDir (Nuxt's serverDir, i.e. nuxt/server),
                // not against the nuxt/ root — so this needs one more level up than it looks like.
                dir: '../../src/_includes/analytics'
            },
            {
                baseName: 'team',
                dir: '../src/_data/team'
            },
            {
                baseName: 'guests',
                dir: '../src/_data/guests'
            }
        ],
        prerender: {
            routes: (() => {
                // The changelog listing is a single page now (grouped by release, revealed
                // as you scroll), so there are no /changelog/<n>/ pages to enumerate.
                const changelog = collectChangelogRoutes(join(__dirname, '../src/changelog'), '/changelog')

                const blogListingRoutes = paginatedListingRoutes('/blog', blogFiles.length)
                const blogTagRoutes = BLOG_TAGS.flatMap(tag =>
                    paginatedListingRoutes(`/blog/${tag}`, blogFiles.filter(f => f.tags.includes(tag)).length)
                )

                return [
                    '/terms',
                    '/privacy-policy',
                    '/integrations',
                    '/pricing',
                    '/product',
                    ...collectProductRoutes(join(__dirname, 'content/products')),
                    // Without this, @nuxtjs/sitemap only bakes /sitemap.xml statically when
                    // isNuxtGenerate() is true, which checks for nitro.static/preset "static" -
                    // the netlify preset here is hybrid (prerendered pages + a fallback
                    // function), so it doesn't qualify and /sitemap.xml gets served live by
                    // that function instead. There, /var/task has no `git` binary, so every
                    // git-derived lastmod (handbook/changelog/blog/ebooks/whitepapers, see
                    // content-urls.get.ts) silently resolves to undefined. Explicitly listing
                    // it here bakes it at build time instead, inside the git checkout.
                    '/sitemap.xml',
                    '/contact-us',
                    '/book-demo',
                    '/ebooks/beginner-guide-to-a-professional-nodered/',
                    '/ebooks/ultimate-guide-to-building-applications-with-flowfuse-dashboard-for-node-red/',
                    '/whitepaper/uns-decoupling-data-producers-and-consumers/',
                    '/whitepaper/open-source-software-for-manufacturing/',
                    '/whitepaper/accelerating-innovation-in-manufacturing-with-flowfuse/',
                    '/whitepaper/accelerating-industrial-innovation-with-low-code-platforms/',
                    '/resources/publications/',
                    ...collectApplicationGuideRoutes(join(__dirname, 'content/application-guide')),
                    '/changelog/index.xml',
                    '/changelog/',
                    ...changelog.routes,
                    '/blog/index.xml',
                    ...blogListingRoutes,
                    ...blogTagRoutes,
                    ...blogFiles.map(f => f.route),
                    ...blogAuthorRoutes,
                    ...collectHandbookRoutes(join(__dirname, 'content/handbook'), '/handbook'),
                    ...collectStoryRoutes(join(__dirname, '../src/customer-stories')),
                ]
            })(),
            crawlLinks: false,
            // Nitro renders one route at a time by default, which serialises much the
            // longest phase of the build. A sizeable share of that phase is fixed per-route
            // overhead rather than render work, and that part overlaps away as soon as
            // several routes render at once. Matched to the vCPU count on GitHub's standard
            // runner. Raising it further trades peak memory for wall time.
            concurrency: 4
        }
    },

    hooks: {
        // Enumerate /integrations/{id}/ routes at config-time so SSG prerenders them.
        // Can't use Nuxt's $fetch here — it only exists at nitro runtime.
        async 'nitro:config' (nitroConfig: import('nitropack').NitroConfig) {
            if (nitroConfig.dev) return
            const { buildEnrichedIntegrations } = await import('./server/utils/integrations-enrich')
            const integrations = await buildEnrichedIntegrations()
            if (integrations.length === 0) {
                throw new Error('[nuxt] integrations enumeration returned 0 nodes — refusing to build a site with no detail pages')
            }
            const routes = integrations.map(node => `/integrations/${node._id}/`)
            nitroConfig.prerender = nitroConfig.prerender || {}
            nitroConfig.prerender.routes = [...new Set([...(nitroConfig.prerender.routes || []), ...routes])]
            console.log(`[nuxt] enumerated ${routes.length} /integrations/{id}/ routes for prerender`)
        }
    },

    studio: {
        route: '/_studio',
        repository: {
            provider: 'github',
            owner: 'FlowFuse',
            repo: 'website',
            branch: 'main',
            branchStrategy: 'feature-branch',
        }
    },

    content: {
        build: {
            markdown: {
                toc: {
                    depth: 4,
                    searchDepth: 4,
                },
                remarkPlugins: {
                    'handbook-links': { instance: remarkHandbookLinks },
                    'docs-links': { instance: remarkDocsLinks },
                    'remark-math': {},
                },
                rehypePlugins: {
                    'rehype-katex': {},
                },
            },
        },
    },

    vue: {
        compilerOptions: {
            // lite-youtube-embed is a web component loaded client-side by LiteYoutube.vue,
            // not a Vue component - stop Vue from warning about an unresolved <lite-youtube>.
            isCustomElement: (tag) => tag === 'lite-youtube',
        },
    },

    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ],
        },
    },
    
    ui: {
        // Dark mode isn't implemented across the site yet. Disabling the color-mode
        // module here (rather than just setting a light `colorMode` preference) is
        // what actually stops Nuxt UI from switching to dark for visitors whose OS
        // prefers it — see https://ui.nuxt.com/docs/getting-started/integrations/color-mode/nuxt#configuration
        colorMode: false,
        theme: {
            colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'highlight']
        }
    },
    // Dev proxying to 11ty is handled by server/middleware/legacy.ts
    // to allow per-route exclusions as pages are migrated.
})
