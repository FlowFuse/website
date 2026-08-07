import { defineEventHandler, proxyRequest } from 'h3'

// Routes still served by 11ty (not yet migrated to Nuxt).
// Shrink this list as pages are migrated; once empty, this middleware can be deleted.
// Trailing slashes are matched automatically.
const LEGACY_ROUTES = new Set(['/', '/sitemap-legacy.xml'])

// Path prefixes still served by 11ty (all paths starting with these are proxied).
const LEGACY_PREFIXES = ['/customer-stories', '/industries', '/jobs', '/landing', '/node-red', '/partners', '/platform', '/use-cases', '/vs', '/webinars', '/events', '/community', '/ask-me-anything', '/sign-up']

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV !== 'development') return

    const path = event.path ?? '/'

    // Let Nuxt handle its own internal assets and API routes
    if (path.startsWith('/_nuxt/') || path.startsWith('/api/') || path.startsWith('/__') || path.startsWith('/_studio') || path.startsWith('/_og/')) return

    // Let Nuxt handle migrated pages (strip trailing slash and query string before matching)
    const queryIndex = path.indexOf('?')
    const pathWithoutQuery = queryIndex === -1 ? path : path.slice(0, queryIndex)
    const normalised = pathWithoutQuery.replace(/\/$/, '') || '/'

    // Changelog and blog post images still live alongside their markdown in src/{changelog,blog}/**/images
    // and are only synced into nuxt/public by the 11ty passthrough during a production build -
    // proxy them to 11ty in dev even though /changelog and /blog are otherwise Nuxt-handled.
    if (/^\/(changelog|blog)\/\d{4}\/\d{2}\/images\//.test(normalised)) return proxyRequest(event, `http://localhost:8080${path}`)

    // Note: /sitemap-legacy.xml is deliberately not routed to Nuxt — it only exists in
    // nuxt/public/ after a production build, so in dev it must keep proxying to 11ty's _site/.
    if (LEGACY_ROUTES.has(normalised)) return proxyRequest(event, `http://localhost:8080${path}`)
    if (LEGACY_PREFIXES.some(prefix => normalised === prefix || normalised.startsWith(prefix + '/'))) return proxyRequest(event, `http://localhost:8080${path}`)

    // Everything else is a migrated Nuxt route.
})
