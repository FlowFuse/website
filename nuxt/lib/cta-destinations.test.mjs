import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)
const { ctaDestinationKey } = await jiti.import('./cta-destinations.ts')
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
        '/book-demo/#calendar': 'bookDemo',
        '/pricing': 'pricing',
    }
    for (const [href, key] of Object.entries(cases)) assert.equal(ctaDestinationKey(href), key, href)
})

test('does not match other URLs', () => {
    for (const href of ['/pricing/request-quote/', 'https://app.flowfuse.com/team/x/', 'pricing/', './pricing.md', '#pricing', '/', 'https://www.mongodb.com/pricing', undefined]) {
        assert.equal(ctaDestinationKey(href), undefined, String(href))
    }
})

test('no custom CTA destination points at one of the five reserved destinations', async () => {
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
