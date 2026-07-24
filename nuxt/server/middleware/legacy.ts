import { defineEventHandler, proxyRequest } from 'h3'

// Routes that are handled by Nuxt pages (not proxied to 11ty).
// Extend this list as pages are migrated. Trailing slashes are matched automatically.
// Note: /sitemap-legacy.xml is deliberately NOT listed here — it only exists in
// nuxt/public/ after a production build, so in dev it must keep proxying to 11ty's _site/.
const NUXT_ROUTES = new Set(['/terms', '/privacy-policy', '/integrations', '/resources/publications', '/sitemap.xml', '/robots.txt'])

// Path prefixes handled by Nuxt. Used for dynamic routes like /integrations/{id}.
const NUXT_ROUTE_PREFIXES = ['/integrations/']

// Route prefixes handled by Nuxt (all paths starting with these are served by Nuxt).
const NUXT_PREFIXES = ['/handbook', '/ebooks', '/whitepaper', '/docs']

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV !== 'development') return

    const path = event.path ?? '/'

    // Let Nuxt handle its own internal assets and API routes
    if (path.startsWith('/_nuxt/') || path.startsWith('/api/') || path.startsWith('/__') || path.startsWith('/_studio') || path.startsWith('/_og/')) return

    // Let Nuxt handle migrated pages (strip trailing slash and query string before matching)
    const pathWithoutQuery = path.split('?')[0]
    const normalised = pathWithoutQuery.replace(/\/$/, '') || '/'
    if (NUXT_ROUTES.has(normalised)) return
    if (NUXT_ROUTE_PREFIXES.some(prefix => pathWithoutQuery.startsWith(prefix))) return

    // Let Nuxt handle migrated path prefixes
    if (NUXT_PREFIXES.some(prefix => normalised === prefix || normalised.startsWith(prefix + '/'))) return

    // Proxy everything else to the 11ty dev server
    return proxyRequest(event, `http://localhost:8080${path}`)
})
