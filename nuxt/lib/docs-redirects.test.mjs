import { test } from 'node:test'
import assert from 'node:assert/strict'

import { docsRedirectRules, prerenderableRoutes } from './docs-redirects.mjs'

// Shape of what docs-source reads off disk after syncDocs: the route it would have
// prerendered, plus the raw markdown behind it.
function page (route, frontmatter, body = '') {
    return { route, source: `---\n${frontmatter}\n---\n${body}` }
}

const redirectPage = (route, to) => page(route, `navTitle: Installing FlowFuse\nredirect:\n  to: ${to}\nlayout: redirect`)

test('a redirect page becomes a 301 route rule keyed on its route', () => {
    const rules = docsRedirectRules([redirectPage('/docs/install/', '/docs/install/introduction')])

    assert.deepEqual(rules, {
        '/docs/install/': { redirect: { to: '/docs/install/introduction', statusCode: 301 } },
    })
})

test('the key is the route verbatim, so docs-source can reuse it to skip prerendering', () => {
    // collectRoutes emits a trailing slash for index.md and for nested pages alike; the
    // skip list is Object.keys(rules), so any normalisation here would silently prerender
    // a meta-refresh stub next to the rule and the stub would win.
    const rules = docsRedirectRules([
        redirectPage('/docs/install/', '/docs/install/introduction'),
        redirectPage('/docs/community-support/', 'https://discourse.nodered.org/c/vendors/flowfuse/24'),
    ])

    assert.deepEqual(Object.keys(rules), ['/docs/install/', '/docs/community-support/'])
})

test('an off-site target is a 301 like any other', () => {
    // docs/community-support.md points at the Node-RED forum, and docs/admin/licensing.md
    // at /pricing/, which is still served by Eleventy. Neither is a docs page.
    const rules = docsRedirectRules([
        redirectPage('/docs/community-support/', 'https://discourse.nodered.org/c/vendors/flowfuse/24'),
    ])

    assert.equal(rules['/docs/community-support/'].redirect.to, 'https://discourse.nodered.org/c/vendors/flowfuse/24')
    assert.equal(rules['/docs/community-support/'].redirect.statusCode, 301)
})

test('an ordinary docs page produces no rule', () => {
    const rules = docsRedirectRules([
        page('/docs/install/introduction/', 'navTitle: Introduction\nnavOrder: 1', '# Installing\n'),
    ])

    assert.deepEqual(rules, {})
})

test('redirect.to without layout: redirect is ignored', () => {
    // Same pair of conditions the page component required, so this changes no behaviour:
    // a `to` on a page that still renders itself is not a redirect.
    const rules = docsRedirectRules([page('/docs/somewhere/', 'redirect:\n  to: /docs/elsewhere/')])

    assert.deepEqual(rules, {})
})

test('layout: redirect without a target produces no rule, so the page keeps prerendering', () => {
    // A rule of { redirect: { to: undefined } } would answer the URL with a broken 301.
    // Emitting nothing leaves the route in the prerender list, which is the safe failure.
    const rules = docsRedirectRules([page('/docs/half-done/', 'layout: redirect')])

    assert.deepEqual(rules, {})
})

test('an empty redirect target is treated as absent', () => {
    const rules = docsRedirectRules([page('/docs/half-done/', 'layout: redirect\nredirect:\n  to: ""')])

    assert.deepEqual(rules, {})
})

test('trailing whitespace after the redirect key still parses', () => {
    // docs/community-support.md is synced with `redirect: ` including the trailing space.
    const rules = docsRedirectRules([page('/docs/community-support/', 'redirect: \n  to: /docs/support/\nlayout: redirect')])

    assert.equal(rules['/docs/community-support/'].redirect.to, '/docs/support/')
})

test('a page with no frontmatter is skipped rather than throwing', () => {
    const rules = docsRedirectRules([{ route: '/docs/plain/', source: '# Just a heading\n' }])

    assert.deepEqual(rules, {})
})

test('unparseable frontmatter is skipped rather than failing the build', () => {
    // The docs come from another repo, so a malformed page must not take the site down.
    const rules = docsRedirectRules([
        { route: '/docs/broken/', source: '---\nlayout: redirect\n  to: [unclosed\n---\n' },
        redirectPage('/docs/install/', '/docs/install/introduction'),
    ])

    assert.deepEqual(Object.keys(rules), ['/docs/install/'])
})

test('frontmatter that parses to a scalar rather than a map is skipped', () => {
    const rules = docsRedirectRules([{ route: '/docs/odd/', source: '---\njust a string\n---\n' }])

    assert.deepEqual(rules, {})
})

test('a redirect page whose body has its own --- fence still reads the frontmatter', () => {
    const rules = docsRedirectRules([
        page('/docs/install/', 'redirect:\n  to: /docs/install/introduction\nlayout: redirect', 'text\n\n---\n\nmore text\n'),
    ])

    assert.equal(rules['/docs/install/'].redirect.to, '/docs/install/introduction')
})

test('no pages means no rules, and spreading {} into routeRules is a no-op', () => {
    assert.deepEqual(docsRedirectRules([]), {})
})

const redirect = to => ({ redirect: { to, statusCode: 301 } })

test('a route a rule redirects is dropped from the prerender list', () => {
    const routes = prerenderableRoutes(
        ['/docs/install/introduction/', '/docs/install/'],
        { '/docs/install/': redirect('/docs/install/introduction/') },
    )

    assert.deepEqual(routes, ['/docs/install/introduction/'])
})

test('the trailing slash does not have to match on either side', () => {
    // nuxt/redirects.ts carries /docs/user/assistant and /docs/user/assistant/ as separate
    // keys, and collectPages always emits the trailing slash, so raw string equality would
    // miss whichever form the rule happens to use.
    const routes = prerenderableRoutes(
        ['/docs/user/assistant/', '/docs/admin/user_management/', '/docs/user/expert/'],
        {
            '/docs/user/assistant': redirect('/docs/user/expert/'),
            '/docs/admin/user_management/': redirect('/docs/admin/user-management/'),
        },
    )

    assert.deepEqual(routes, ['/docs/user/expert/'])
})

test('a /** rule covers every route beneath it', () => {
    const routes = prerenderableRoutes(
        ['/docs/legacy/', '/docs/legacy/install/', '/docs/legacy-notes/', '/docs/current/'],
        { '/docs/legacy/**': redirect('/docs/') },
    )

    // /docs/legacy-notes/ only shares a prefix as text, not as a path segment, so it stays.
    assert.deepEqual(routes, ['/docs/legacy-notes/', '/docs/current/'])
})

test('rules that are not redirects leave the prerender list alone', () => {
    const routes = prerenderableRoutes(
        ['/docs/install/introduction/'],
        { '/docs/install/introduction/': { robots: false }, '/docs/other/': {} },
    )

    assert.deepEqual(routes, ['/docs/install/introduction/'])
})

test('no route rules at all is not an error', () => {
    assert.deepEqual(prerenderableRoutes(['/docs/a/'], undefined), ['/docs/a/'])
    assert.deepEqual(prerenderableRoutes(['/docs/a/'], {}), ['/docs/a/'])
})

test('the rules this module generates are themselves enough to skip their routes', () => {
    // docs-source extends routeRules first and filters afterwards, so one pass covers both
    // the frontmatter redirects and the hand-written ones in nuxt/redirects.ts.
    const pages = [
        page('/docs/install/', 'redirect:\n  to: /docs/install/introduction\nlayout: redirect'),
        page('/docs/install/introduction/', 'navTitle: Introduction'),
    ]
    const rules = docsRedirectRules(pages)

    assert.deepEqual(prerenderableRoutes(pages.map(p => p.route), rules), ['/docs/install/introduction/'])
})
