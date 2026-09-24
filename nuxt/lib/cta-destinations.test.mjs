import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)
const { ctaDestinationKey, ctaQuery, withCtaQuery } = await jiti.import('./cta-destinations.ts')
const nuxtDir = fileURLToPath(new URL('..', import.meta.url))

test('matches every way of writing a destination URL', () => {
    const cases = {
        'https://app.flowfuse.com/account/create': 'signUp',
        'https://app.flowfuse.com/account/create/?code=RELEASE11': 'signUp',
        'https://app.flowfuse.com': 'signIn',
        'https://app.flowfuse.com/': 'signIn',
        '/contact-us': 'contactUs',
        '/contact-us/?subject=Certified%20Nodes': 'contactUs',
        'https://flowfuse.com/contact-us/': 'contactUs',
        'http://flowfuse.com/pricing/': 'pricing',
        'http://app.flowfuse.com': 'signIn',
        'HTTPS://flowfuse.com/pricing/': 'pricing',
        '/book-demo/?utm_source=blog': 'bookDemo',
        '/pricing': 'pricing',
    }
    for (const [href, key] of Object.entries(cases)) assert.equal(ctaDestinationKey(href), key, href)
})

test('does not match other URLs', () => {
    for (const href of ['/pricing/#comparison', '/pricing/request-quote/', 'https://app.flowfuse.com/team/x/', 'pricing/', './pricing.md', '#pricing', '/', 'https://www.mongodb.com/pricing', 'https://example.com/contact-us/', undefined]) {
        assert.equal(ctaDestinationKey(href), undefined, String(href))
    }
})

test('adds a query to a destination without touching the path', () => {
    assert.equal(withCtaQuery('/contact-us/', { subject: 'FlowFuse Expert for Self-Hosted' }), '/contact-us/?subject=FlowFuse%20Expert%20for%20Self-Hosted')
    assert.equal(withCtaQuery('https://app.flowfuse.com/account/create', { code: 'RELEASE11', utm_source: 'blog' }), 'https://app.flowfuse.com/account/create?code=RELEASE11&utm_source=blog')
    assert.equal(withCtaQuery('/pricing/', {}), '/pricing/')
    assert.equal(withCtaQuery('/pricing/'), '/pricing/')
})

test('reads the query back out of a link, so rebuilding it gives the same URL', () => {
    const href = '/contact-us/?subject=FlowFuse%20Expert%20Application%20Building'
    assert.deepEqual(ctaQuery(href), { subject: 'FlowFuse Expert Application Building' })
    assert.equal(withCtaQuery('/contact-us/', ctaQuery(href)), href)
})

test('keeps every value of a repeated query parameter', () => {
    const href = '/contact-us/?tag=one&tag=two&tag=three'
    assert.deepEqual(ctaQuery(href), { tag: ['one', 'two', 'three'] })
    assert.equal(withCtaQuery('/contact-us/', ctaQuery(href)), href)
})

test('a parameter named like a built-in object property round-trips unchanged', () => {
    const href = '/pricing/?toString=a&constructor=b&__proto__=c'
    assert.equal(withCtaQuery('/pricing/', ctaQuery(href)), href)
})

test('custom CTA registry has no duplicate URLs and none of the five reserved destinations', async () => {
    await jiti.import('./custom-cta-destinations.ts')
})

const vueFiles = dir => readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (['.nuxt', '.output', 'node_modules', 'public'].includes(name)) return []
    return statSync(path).isDirectory() ? vueFiles(path) : path.endsWith('.vue') ? [path] : []
})

test('no .vue file hard-codes a link to a CTA destination', () => {
    const offenders = vueFiles(nuxtDir).flatMap(file => readFileSync(file, 'utf8').split('\n').flatMap((line, i) =>
        [...line.matchAll(/\b(?:href|to)\s*[:=]\s*(["'])(.*?)\1/g)]
            .filter(([, , href]) => ctaDestinationKey(href))
            .map(([, , href]) => `${relative(nuxtDir, file)}:${i + 1} ${href}`),
    ))
    assert.deepEqual(offenders, [], 'Link to a CTA destination with <CtaLink destination="..."> or the matching Cta* button, so the click is tracked under that destination\'s event.')
})
