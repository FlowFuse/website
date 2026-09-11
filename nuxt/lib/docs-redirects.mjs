// Turns the `layout: redirect` pages synced from FlowFuse/flowfuse into Nitro route
// rules. Kept free of Nuxt and filesystem imports so it can be unit tested with
// `node --test`; modules/docs-source.ts is the thin filesystem wrapper around this.
//
// Before this existed the pages redirected from inside the docs page component, which
// the prerenderer turns into an HTML file holding a `<meta http-equiv="refresh">`. That
// answers the URL with a 200 and no redirect status at all, so an inbound link to
// /docs/install/ passes nothing on to /docs/install/introduction. A route rule gives
// Netlify a real 301, the same way nuxt/redirects.ts does for the retired 11ty paths.

// js-yaml rather than yaml: it is the declared root dependency, and `node --test`
// resolves it as raw ESM without Vite's CommonJS interop in the way. Same reasoning as
// feature-catalog.test.mjs.
import jsYaml from 'js-yaml'

// Only the leading block, so a `---` used as a horizontal rule in the body is not read as
// the closing fence. Docs synced from another repo may end at `---` with no trailing
// newline, hence the `$` alternative.
const FRONTMATTER = /^---[ \t]*\r?\n([\s\S]*?)\r?\n?---[ \t]*(?:\r?\n|$)/

function frontmatterOf (source) {
    const block = FRONTMATTER.exec(source ?? '')
    if (!block) return null

    let data
    try {
        data = jsYaml.load(block[1])
    } catch {
        // The docs are authored in another repo, so one malformed page must not fail the
        // build. It keeps prerendering as an ordinary page instead.
        return null
    }

    return data && typeof data === 'object' && !Array.isArray(data) ? data : null
}

/**
 * @param {Array<{route: string, source: string}>} pages route docs-source would prerender,
 *   plus the raw markdown behind it
 * @returns {Record<string, {redirect: {to: string, statusCode: number}}>} keyed by route,
 *   ready to spread into `nuxt.options.routeRules`
 */
export function docsRedirectRules (pages) {
    const rules = {}

    for (const { route, source } of pages) {
        const data = frontmatterOf(source)

        // Both keys, the same pair the page component required: a `to` on a page that
        // still renders content of its own is not a redirect.
        if (data?.layout !== 'redirect') continue

        const to = data.redirect?.to
        if (typeof to !== 'string' || !to) continue

        // The key stays the caller's route verbatim, so the same string can be matched
        // against the prerender list. Normalising here would leave a meta-refresh stub
        // sitting next to the rule, and the static file wins.
        rules[route] = { redirect: { to, statusCode: 301 } }
    }

    return rules
}

// Route rules are matched by Nitro without caring about a trailing slash, and
// nuxt/redirects.ts holds both `/docs/user/assistant` and `/docs/user/assistant/`, so
// comparing raw strings would miss half of them.
function withoutTrailingSlash (route) {
    return route.length > 1 && route.endsWith('/') ? route.slice(0, -1) : route
}

/**
 * The docs routes that are safe to prerender: everything a route rule does not already
 * answer with a redirect.
 *
 * Prerendering a route that redirects writes an HTML file holding a
 * `<meta http-equiv="refresh">`, served with a 200, and that static file answers the URL
 * before the route rule is ever consulted. It happens whenever a docs page exists at a
 * path some rule redirects: `nuxt/redirects.ts` maps `/docs/install/email_providers/` to
 * the hyphenated slug, so an upstream docs tree that still carries the underscored
 * filename silently loses the 301.
 *
 * @param {string[]} routes candidate prerender routes
 * @param {Record<string, {redirect?: unknown}>} routeRules `nuxt.options.routeRules`, read
 *   after this module has added its own, so one pass covers both sources
 */
export function prerenderableRoutes (routes, routeRules) {
    const exact = new Set()
    const prefixes = []

    for (const [pattern, rule] of Object.entries(routeRules ?? {})) {
        if (!rule || typeof rule !== 'object' || !rule.redirect) continue
        // `/certified-nodes/**` style keys: a redirect on a whole subtree covers every
        // route under it. Only this one wildcard form is recognised, which is the only
        // one the site uses.
        if (pattern.endsWith('/**')) prefixes.push(withoutTrailingSlash(pattern.slice(0, -3)))
        else exact.add(withoutTrailingSlash(pattern))
    }

    return routes.filter(route => {
        const path = withoutTrailingSlash(route)
        if (exact.has(path)) return false
        return !prefixes.some(prefix => path === prefix || path.startsWith(`${prefix}/`))
    })
}
