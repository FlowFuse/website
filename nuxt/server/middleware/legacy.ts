import { proxyRequest } from 'h3'

// Routes that are handled by Nuxt pages (not proxied to 11ty).
// Extend this list as pages are migrated. Trailing slashes are matched automatically.
const NUXT_ROUTES = new Set(['/terms', '/privacy-policy'])

// Route prefixes handled by Nuxt (all paths starting with these are served by Nuxt).
const NUXT_PREFIXES = ['/handbook']

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV !== 'development') return

    const path = event.path ?? '/'

    // Let Nuxt handle its own internal assets and API routes
    if (path.startsWith('/_nuxt/') || path.startsWith('/api/') || path.startsWith('/__') || path.startsWith('/_studio')) return

    // Let Nuxt handle migrated pages (strip trailing slash and query string before matching)
    const normalised = path.split('?')[0].replace(/\/$/, '') || '/'
    if (NUXT_ROUTES.has(normalised)) return

    // Let Nuxt handle migrated path prefixes
    if (NUXT_PREFIXES.some(prefix => normalised === prefix || normalised.startsWith(prefix + '/'))) return

    // Proxy everything else to the 11ty dev server
    return proxyRequest(event, `http://localhost:8080${path}`)
})
