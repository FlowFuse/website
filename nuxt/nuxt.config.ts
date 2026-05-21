// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/content', 'nuxt-link-checker'],

    linkChecker: {
        failOnError: true,
        // trailing-slash: 11ty pages use trailing slashes intentionally
        // no-error-response: links to 11ty pages return 404 in the Nuxt-only static output
        skipInspections: ['trailing-slash', 'no-error-response'],
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

    nitro: {
        preset: 'static',
        prerender: {
            routes: ['/terms', '/privacy-policy', '/integrations'],
            crawlLinks: false
        }
    },

    hooks: {
        // Enumerate dynamic /integrations/{id}/ routes at build time so SSG generates them all.
        // Uses `ofetch`/`cachedFetch` (NOT Nuxt's $fetch) because $fetch is only initialised
        // at nitro runtime — this hook runs at config-time.
        async 'nitro:config' (nitroConfig: import('nitropack').NitroConfig) {
            if (nitroConfig.dev) return
            const { buildEnrichedIntegrations } = await import('./server/utils/integrations-enrich')
            const integrations = await buildEnrichedIntegrations()
            if (integrations.length === 0) {
                throw new Error('[nuxt] integrations enumeration returned 0 nodes — refusing to build a site with no detail pages')
            }
            const routes = integrations.map(n => `/integrations/${n._id}/`)
            nitroConfig.prerender = nitroConfig.prerender || {}
            // Dedup defensively in case the hook fires more than once.
            nitroConfig.prerender.routes = [...new Set([...(nitroConfig.prerender.routes || []), ...routes])]
            console.log(`[nuxt] enumerated ${routes.length} /integrations/{id}/ routes for prerender`)
        }
    },

    // Dev proxying to 11ty is handled by server/middleware/legacy.ts
    // to allow per-route exclusions as pages are migrated.
})
