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
            routes: ['/terms', '/privacy-policy'],
            crawlLinks: false
        }
    },

    // public/ (11ty static output) and .output/ (nuxt build) are large generated
    // directory trees. On macOS, chokidar falls back to kqueue which opens file
    // descriptors for each watched path, causing spawn EBADF when esbuild tries
    // to start its service process.

    ignore: ['public/**', '.output/**'],

    // Dev proxying to 11ty is handled by server/middleware/legacy.ts
    // to allow per-route exclusions as pages are migrated.
})
