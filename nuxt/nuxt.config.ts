import { readdirSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'
import remarkHandbookLinks from './utils/remark-handbook-links'

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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui', '@nuxt/content', '@nuxtjs/seo', 'nuxt-studio', '@nuxt/image'],

    css: ['~/assets/css/theme.css'],

    // Heebo is already loaded via the Google Fonts <link> in app.head.
    // @nuxt/fonts is a transitive dep of @nuxt/ui; disable all provider downloads
    // so it never fetches font files at build time (which exhausts Netlify's memory).
    fonts: { providers: { google: false, bunny: false, fontshare: false, adobe: false } },

    site: {
        url: 'https://flowfuse.com',
        name: 'FlowFuse',
        description: 'Low-code application development platform for Node-RED and industrial IoT.',
        defaultLocale: 'en',
    },

    sitemap: {
        // Pull all 11ty-served URLs from the legacy partial sitemap generated at build time
        sources: ['/api/__sitemap__/urls'],
        exclude: ['/_studio/**', '/api/**'],
    },

    robots: {
        groups: [
            { userAgent: ['*'], allow: ['/'] },
            { userAgent: ['Algolia Crawler'], allow: ['/'] },
        ],
        sitemap: ['https://flowfuse.com/sitemap.xml'],
    },

    ogImage: {
        defaults: { component: 'Default' },
    },

    linkChecker: {
        failOnError: true,
        // trailing-slash: 11ty pages use trailing slashes intentionally
        // no-error-response: links to 11ty pages return 404 in the Nuxt-only static output
        skipInspections: ['trailing-slash', 'no-error-response'],
    },

    // @nuxt/content generates `import X from 'handbook-links'` for the remark plugin key.
    // This alias makes that import resolvable in the Vite bundle context.
    alias: {
        'handbook-links': join(__dirname, 'utils/remark-handbook-links'),
    },

    app: {
        head: {
            link: [
                { rel: 'stylesheet', href: '/css/style.css' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Heebo:wght@100..900&display=swap' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#aa4444' },
            ],
            meta: [
                { name: 'msapplication-TileColor', content: '#00aba9' },
                { name: 'theme-color', content: '#ffffff' },
            ]
        }
    },

    image: {
        provider: process.env.SKIP_IMAGES === 'true' ? 'none' : 'netlify',
        domains: ['flowfuse.com', 'www.flowfuse.com'],
        quality: 80,
    },

    nitro: {
        preset: 'netlify',
        serverAssets: [
            {
                baseName: 'analytics',
                dir: '../src/_includes/analytics'
            }
        ],
        prerender: {
            routes: [
                '/terms',
                '/privacy-policy',
                '/integrations',
                '/ebooks/beginner-guide-to-a-professional-nodered/',
                '/ebooks/ultimate-guide-to-building-applications-with-flowfuse-dashboard-for-node-red/',
                '/whitepaper/uns-decoupling-data-producers-and-consumers/',
                '/whitepaper/open-source-software-for-manufacturing/',
                '/whitepaper/accelerating-innovation-in-manufacturing-with-flowfuse/',
                '/whitepaper/accelerating-industrial-innovation-with-low-code-platforms/',
                '/resources/publications/',
                ...collectHandbookRoutes(join(__dirname, 'content/handbook'), '/handbook'),
            ],
            crawlLinks: false
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
            const routes = integrations.map(n => `/integrations/${n._id}/`)
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
                },
            },
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

    // Dev proxying to 11ty is handled by server/middleware/legacy.ts
    // to allow per-route exclusions as pages are migrated.
})
