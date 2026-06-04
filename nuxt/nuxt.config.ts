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
    modules: ['@nuxt/content', 'nuxt-link-checker', 'nuxt-studio'],

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
                ...collectHandbookRoutes(join(__dirname, 'content/handbook'), '/handbook'),
            ],
            crawlLinks: false
        }
    },

    studio: {
        route: '/_studio',
        repository: {
            provider: 'github',
            owner: 'FlowFuse',
            repo: 'website',
            branch: 'main',
        }
    },

    content: {
        build: {
            markdown: {
                remarkPlugins: {
                    'handbook-links': { instance: remarkHandbookLinks },
                },
            },
        },
    },

    // Dev proxying to 11ty is handled by server/middleware/legacy.ts
    // to allow per-route exclusions as pages are migrated.
})
