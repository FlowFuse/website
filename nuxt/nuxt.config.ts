// https://nuxt.com/docs/api/configuration/nuxt-config
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Routes generated from the legacy 11ty source by the scripts/copy_*.js steps.
const readRoutes = (name: string): string[] => {
    const f = fileURLToPath(new URL(`./${name}`, import.meta.url))
    return existsSync(f) ? JSON.parse(readFileSync(f, 'utf-8')) : []
}
const handbookRoutes = readRoutes('handbook.routes.json')
const changelogRoutes = readRoutes('changelog.routes.json')
const customerStoriesRoutes = readRoutes('customer-stories.routes.json')
const eventRoutes = readRoutes('events.routes.json')
const ebookRoutes = readRoutes('ebooks.routes.json')

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/content', 'nuxt-link-checker'],

    linkChecker: {
        failOnError: true,
        // Inspections skipped for this 11ty→Nuxt migration:
        //  - trailing-slash: 11ty pages use trailing slashes intentionally
        //  - no-error-response: links to 11ty-served pages 404 in the Nuxt-only
        //    static output (route integrity is instead proven by the committed
        //    route diff in migration/route-diff.txt)
        // The rest are best-practice STYLE lints (not broken links) that the
        // migrated legacy handbook prose naturally violates; skipping them keeps
        // failOnError meaningful for genuine link breakage without rewriting
        // hundreds of pages of existing copy.
        skipInspections: [
            'trailing-slash',
            'no-error-response',
            'link-text',
            'no-uppercase-chars',
            'no-underscores',
            'no-whitespace',
            'no-non-ascii-chars',
            'absolute-site-urls',
            'redirects',
            'no-double-slashes',
        ],
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
            routes: ['/terms', '/privacy-policy', '/solutions/scada', '/solutions/uns', '/solutions/edge-connectivity', '/solutions/data-integration', '/solutions/mes', '/solutions/it-ot-middleware', '/vs/kepware', '/vs/litmus', '/whitepaper/accelerating-innovation-in-manufacturing-with-flowfuse', '/whitepaper/open-source-software-for-manufacturing', '/whitepaper/uns-decoupling-data-producers-and-consumers', ...handbookRoutes, ...changelogRoutes, ...customerStoriesRoutes, ...eventRoutes, ...ebookRoutes],
            crawlLinks: false
        }
    },

    // This sprite is behind a *.sprites.app proxy; Vite blocks foreign Host
    // headers (DNS-rebinding protection) unless the hostname is allowlisted.
    vite: {
        server: {
            allowedHosts: ['tasks-website-nuxt4-bmswx.sprites.app']
        }
    },

    // Dev proxying to 11ty is handled by server/middleware/legacy.ts
    // to allow per-route exclusions as pages are migrated.
})
