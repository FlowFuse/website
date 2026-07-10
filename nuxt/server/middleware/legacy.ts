import { defineEventHandler, proxyRequest } from 'h3'

// Routes that are handled by Nuxt pages (not proxied to 11ty).
// Extend this list as pages are migrated. Trailing slashes are matched automatically.
const NUXT_ROUTES = new Set(['/terms', '/privacy-policy', '/integrations', '/resources/publications'])

// Path prefixes handled by Nuxt. Used for dynamic routes like /integrations/{id}.
const NUXT_ROUTE_PREFIXES = ['/integrations/']

// Route prefixes handled by Nuxt (all paths starting with these are served by Nuxt).
const NUXT_PREFIXES = ['/handbook', '/ebooks', '/whitepaper', '/blog']

// Blog post images still live under src/blog/**/images and are only passthrough-copied
// into nuxt/public/ during a production 11ty build — in dev they only exist via 11ty's
// own dev server output, so keep proxying them there even though /blog is Nuxt-owned.
const BLOG_IMAGE_PATTERN = /^\/blog\/\d{4}\/\d{2}\/images\//

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

    // Blog post images: always proxy to 11ty, even though /blog is otherwise Nuxt-owned.
    if (BLOG_IMAGE_PATTERN.test(pathWithoutQuery)) return proxyRequest(event, `http://localhost:8080${path}`)

    // Let Nuxt handle migrated path prefixes
    if (NUXT_PREFIXES.some(prefix => normalised === prefix || normalised.startsWith(prefix + '/'))) return

    // Proxy everything else to the 11ty dev server
    return proxyRequest(event, `http://localhost:8080${path}`)
})
