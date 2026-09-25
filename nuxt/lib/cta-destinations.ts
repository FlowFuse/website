import site from '../../src/_data/site.json'

// A trailing slash shouldn't make two otherwise identical URLs count as different destinations.
export const normalizeHref = (href: string) => href.replace(/\/+$/, '')

// Single source of truth for the five reserved CTA destinations' event name,
// href, and fixed label - read by each Cta*.vue component (instead of each
// one hardcoding its own copy of this) and by CtaCustom.vue, which uses the
// hrefs to guard against a caller pointing it at one of these five.
export const CTA_DESTINATIONS = {
    signUp: {
        component: 'CtaSignUp',
        event: 'cta-sign-up',
        href: `${site.appURL}/account/create`,
        // Copy varies by placement, per the PostHog CTA analysis: the nav's
        // sitewide "Free Trial" and everywhere else's "Try it out" were the
        // two highest-volume variants for this destination, each proven in
        // its own context.
        label: 'Try it out',
        navLabel: 'Free Trial',
        navPositions: ['main-nav', 'mobile-cta-bar'],
    },
    signIn: {
        component: 'CtaSignIn',
        event: 'cta-sign-in',
        href: site.appURL,
        label: 'Sign In',
    },
    contactUs: {
        component: 'CtaContactUs',
        event: 'cta-contact-us',
        href: '/contact-us/',
        label: 'Contact Us',
    },
    bookDemo: {
        component: 'CtaBookDemo',
        event: 'cta-book-demo',
        href: '/book-demo/',
        label: 'Book a Demo',
    },
    pricing: {
        component: 'CtaPricing',
        event: 'cta-pricing',
        href: '/pricing/',
        label: 'View Pricing',
    },
} as const

const DESTINATION_KEY_BY_HREF = new Map(
    (Object.keys(CTA_DESTINATIONS) as (keyof typeof CTA_DESTINATIONS)[])
        .map(key => [normalizeHref(new URL(CTA_DESTINATIONS[key].href, site.baseURL).href), key]),
)

export function ctaDestinationKey (href?: string) {
    if (!href?.match(/^(https?:)?\//i)) return undefined
    try {
        const url = new URL(href, site.baseURL)
        if (url.hash) return undefined
        return DESTINATION_KEY_BY_HREF.get(normalizeHref(url.origin.replace(/^http:/, 'https:') + url.pathname))
    } catch {
        return undefined
    }
}

export type CtaQuery = Record<string, string | string[]>

export function withCtaQuery (href: string, query?: CtaQuery) {
    const search = Object.entries(query ?? {})
        .flatMap(([name, values]) => [values].flat().map(value => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`))
        .join('&')
    return search ? `${href}?${search}` : href
}

export function ctaQuery (href: string): CtaQuery {
    const query: CtaQuery = Object.create(null)
    for (const [name, value] of new URL(href, site.baseURL).searchParams) {
        query[name] = name in query ? [query[name]].flat().concat(value) : value
    }
    return { ...query }
}
