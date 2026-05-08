import { proxyRequest } from 'h3'

// Routes that are handled by Nuxt pages (not proxied to 11ty).
// Extend this list as pages are migrated.
const NUXT_ROUTES = new Set(['/terms', '/terms/', '/privacy-policy', '/privacy-policy/'])

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV !== 'development') return

    const path = event.path ?? '/'

    // Let Nuxt handle its own internal assets and API routes
    if (path.startsWith('/_nuxt/') || path.startsWith('/api/') || path.startsWith('/__')) return

    // Let Nuxt handle migrated pages
    if (NUXT_ROUTES.has(path.split('?')[0])) return

    // Proxy everything else to the 11ty dev server
    return proxyRequest(event, `http://localhost:8080${path}`)
})
