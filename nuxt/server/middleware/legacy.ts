import { proxyRequest } from 'h3'

// Routes that are handled by Nuxt pages (not proxied to 11ty).
// Extend this list as pages are migrated. Trailing slashes are matched automatically.
const NUXT_ROUTES = new Set(['/', '/terms', '/privacy-policy', '/careers', '/sign-up', '/email-signature', '/free-consultation', '/contact-us', '/book-demo', '/education', '/professional-services', '/support', '/resources/publications', '/pricing/request-quote', '/about', '/landing/building-and-scaling-industrial-applications', '/landing/coordinating-industrial-systems-at-scale', '/landing/unified-real-time-data-platform', '/landing/enterprise-integration', '/landing/edge-connectivity', '/landing/line-control', '/landing/plant-orchestration', '/events/proveit-2026', '/events/hannover-messe-2025', '/events/hannover-messe-2026', '/platform/dashboard', '/platform/device-agent', '/platform/features', '/platform/why-flowfuse', '/landing/accelerating-industrial-innovation-with-low-code-platforms', '/landing/factory-efficiency', '/landing/plc', '/landing/tulip', '/community/newsletter'])

// Whole sub-trees owned by Nuxt (everything under the prefix).
const NUXT_PREFIXES = ['/handbook', '/handbook-media', '/changelog', '/changelog-media', '/customer-stories', '/customer-stories-media', '/webinars', '/ask-me-anything', '/events-media', '/ebooks', '/solutions', '/vs', '/whitepaper', '/jobs', '/partners', '/docs', '/docs-media', '/integrations', '/node-red', '/node-red-media', '/thank-you']

export default defineEventHandler(async (event) => {
    if (process.env.NODE_ENV !== 'development') return

    const path = event.path ?? '/'

    // Let Nuxt handle its own internal assets and API routes
    if (path.startsWith('/_nuxt/') || path.startsWith('/api/') || path.startsWith('/__')) return

    // Let Nuxt handle migrated pages (strip trailing slash and query string before matching)
    const normalised = path.split('?')[0].replace(/\/$/, '') || '/'

    // Blog: Nuxt owns the post/index/category pages, but blog image assets
    // (/blog/YYYY/MM/images/...) are still served by the 11ty passthrough build,
    // so proxy those to 11ty in dev. The feed (/blog/index.xml) is a Nuxt route.
    if (normalised === '/blog' || normalised.startsWith('/blog/')) {
        const isAsset = /\/images\//.test(normalised) || /\.(png|jpe?g|gif|svg|webp|avif|mp4|webm|json)$/i.test(normalised)
        if (!isAsset) return
    }

    if (NUXT_ROUTES.has(normalised)) return
    if (NUXT_PREFIXES.some((p) => normalised === p || normalised.startsWith(p + '/'))) return

    // Proxy everything else to the 11ty dev server
    return proxyRequest(event, `http://localhost:8080${path}`)
})
