import { proxyRequest } from 'h3'

// Routes that are handled by Nuxt pages (not proxied to 11ty).
// Extend this list as pages are migrated. Trailing slashes are matched automatically.
const NUXT_ROUTES = new Set(['/terms', '/privacy-policy'])

// Whole sub-trees owned by Nuxt (everything under the prefix).
const NUXT_PREFIXES = ['/handbook', '/handbook-media', '/changelog', '/changelog-media', '/customer-stories', '/customer-stories-media', '/webinars', '/ask-me-anything', '/events-media', '/ebooks', '/solutions', '/vs', '/whitepaper']

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV !== 'development') return

    const path = event.path ?? '/'

    // Let Nuxt handle its own internal assets and API routes
    if (path.startsWith('/_nuxt/') || path.startsWith('/api/') || path.startsWith('/__')) return

    // Let Nuxt handle migrated pages (strip trailing slash and query string before matching)
    const normalised = path.split('?')[0].replace(/\/$/, '') || '/'
    if (NUXT_ROUTES.has(normalised)) return
    if (NUXT_PREFIXES.some((p) => normalised === p || normalised.startsWith(p + '/'))) return

    // Proxy everything else to the 11ty dev server
    return proxyRequest(event, `http://localhost:8080${path}`)
})
