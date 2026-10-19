import site from '../data/site.json'

// A trailing slash shouldn't make two otherwise identical URLs count as different destinations.
export const normalizeHref = (href: string) => href.replace(/\/+$/, '')

// Single source of truth for the five reserved CTA destinations' event name,
// href, and fixed label - read by each Cta*.vue component (instead of each
// one hardcoding its own copy of this) and by CtaCustom.vue, which uses the
// hrefs to guard against a caller pointing it at one of these five.
export const CTA_DESTINATIONS = {
    // The self-serve free trial is retired. This destination used to be the app's
    // sign-up form; it now leads to /build-with-us/, which explains the new model and
    // books a call with sales. The key, component and event keep their sign-up names
    // so existing call sites and PostHog history carry on unchanged.
    signUp: {
        component: 'CtaSignUp',
        event: 'cta-sign-up',
        href: '/build-with-us/',
        label: 'Build With Us',
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

// Old addresses still matched to a destination. Content written before the trial was
// retired links straight to the app's sign-up form (over a hundred blog posts, plus the
// synced docs); matching it here means ProseA and InlineMarkdown render those links
// through CtaLink, which sends them to signUp's current href instead.
const LEGACY_HREFS: Record<string, keyof typeof CTA_DESTINATIONS> = {
    [`${site.appURL}/account/create`]: 'signUp',
}

const DESTINATION_KEY_BY_HREF = new Map([
    ...(Object.keys(CTA_DESTINATIONS) as (keyof typeof CTA_DESTINATIONS)[])
        .map(key => [normalizeHref(new URL(CTA_DESTINATIONS[key].href, site.baseURL).href), key] as const),
    ...Object.entries(LEGACY_HREFS)
        .map(([href, key]) => [normalizeHref(new URL(href, site.baseURL).href), key] as const),
])

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

// What ProseA and InlineMarkdown pass to <CtaLink> for a link to one of the five destinations.
export function ctaLink (href?: string) {
    const destination = ctaDestinationKey(href)
    return destination ? { destination, query: ctaQuery(href!) } : undefined
}
