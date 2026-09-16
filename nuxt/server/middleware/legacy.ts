import { defineEventHandler, proxyRequest } from 'h3'

// Routes that are handled by Nuxt pages (not proxied to 11ty).
// Extend this list as pages are migrated. Trailing slashes are matched automatically.
// Note: /sitemap-legacy.xml is deliberately NOT listed here — it only exists in
// nuxt/public/ after a production build, so in dev it must keep proxying to 11ty's _site/.
const NUXT_ROUTES = new Set(['/', '/ai', '/terms', '/privacy-policy', '/integrations', '/sitemap.xml', '/robots.txt', '/llms.txt', '/llms-full.txt', '/contact-us', '/book-demo', '/support', '/professional-services', '/dashboard/tags-and-canvas-feedback'])

// Path prefixes handled by Nuxt. Used for dynamic routes like /integrations/{id}.
const NUXT_ROUTE_PREFIXES = ['/integrations/', '/raw/']

// Route prefixes handled by Nuxt (all paths starting with these are served by Nuxt).
// /application-guide and /free-consultation no longer have pages of their own (the guides
// moved under /docs, /free-consultation was retired outright - it had no internal links
// left once its one referring blog post pointed at /contact-us/ instead) - but they stay
// listed so their 301s in nuxt/redirects.ts are served by Nitro in dev rather than being
// proxied to 11ty, which has nothing there either.
// /node-red is the same case one level down: the documentation below it moved into /docs
// and every old URL now 301s from nuxt/redirects-node-red.ts, so those requests have to
// reach Nitro rather than 11ty. Its own index is a Nuxt page now too, so the prefix covers
// both and the carve-out that used to keep /node-red itself on 11ty is gone.
const NUXT_PREFIXES = ['/handbook', '/ebooks', '/whitepaper', '/pricing', '/docs', '/changelog', '/application-guide', '/blog', '/product', '/customer-stories', '/thank-you', '/resources', '/webinars', '/free-consultation', '/vs', '/use-cases', '/industries', '/platform', '/partners', '/events', '/landing', '/blueprints', '/node-red']

// Top-level routes still on 11ty, not yet ported to Nuxt (everything not listed above
// already falls through to the 11ty proxy by default). Remove entries here as they migrate:
// /about, /careers, /community

// New pages should never grow that fallback set: nuxt/lib/legacy-pages.test.mjs fails
// `npm test` if a PR adds a new .njk file under src/ that doesn't already exist on main,
// regardless of which route it's under — so there's nothing to keep in sync with the
// list above, it's informational only.

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV !== 'development') return

    const path = event.path ?? '/'

    // Let Nuxt handle its own internal assets and API routes
    if (path.startsWith('/_nuxt/') || path.startsWith('/api/') || path.startsWith('/__') || path.startsWith('/_studio') || path.startsWith('/_og/')) return

    // Let Nuxt handle migrated pages (strip trailing slash and query string before matching)
    const queryIndex = path.indexOf('?')
    const pathWithoutQuery = queryIndex === -1 ? path : path.slice(0, queryIndex)
    const normalised = pathWithoutQuery.replace(/\/$/, '') || '/'
    if (NUXT_ROUTES.has(normalised)) return
    if (NUXT_ROUTE_PREFIXES.some(prefix => pathWithoutQuery.startsWith(prefix))) return

    // Changelog and blog post images still live alongside their markdown in src/{changelog,blog}/**/images
    // and are only synced into nuxt/public by the 11ty passthrough during a production build -
    // proxy them to 11ty in dev even though /changelog and /blog are Nuxt-handled prefixes.
    if (/^\/(changelog|blog)\/\d{4}\/\d{2}\/images\//.test(normalised)) return proxyRequest(event, `http://localhost:8080${path}`)

    // Same story for src/resources/images/** (whitepaper/ebook cover images, referenced
    // from still-11ty pages like use-cases/uns.njk) - /resources is otherwise a Nuxt prefix.
    if (normalised.startsWith('/resources/images/')) return proxyRequest(event, `http://localhost:8080${path}`)

    // src/{vs,events,landing,whitepaper}/images/** and src/events/hm25-invite.ics are still
    // 11ty-owned files: they only reach nuxt/public/ through the passthrough in a production
    // build, so dev has to ask 11ty for them even though those are Nuxt prefixes now.
    if (/^\/(vs|events|landing|whitepaper)\/images\//.test(normalised) || normalised === '/events/hm25-invite.ics') {
        return proxyRequest(event, `http://localhost:8080${path}`)
    }

    // Let Nuxt handle migrated path prefixes
    if (NUXT_PREFIXES.some(prefix => normalised === prefix || normalised.startsWith(prefix + '/'))) return

    // Proxy everything else to the 11ty dev server
    return proxyRequest(event, `http://localhost:8080${path}`)
})
