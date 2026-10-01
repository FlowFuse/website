import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)
const { ctaImageError } = await jiti.import('./cta-image.ts')
const nuxtDir = fileURLToPath(new URL('..', import.meta.url))

test('accepts the four fixed destinations without an href', () => {
    for (const cta of ['sign-up', 'demo', 'contact', 'pricing']) assert.equal(ctaImageError(cta), undefined, cta)
})

test('accepts a custom href that is not a reserved destination', () => {
    for (const href of ['/blueprints/', '/blog/2026/09/layered-process-audit-checklist-template/', '/pricing/#comparison', 'https://example.com/contact-us/']) {
        assert.equal(ctaImageError('custom', href), undefined, href)
    }
})

test('rejects a custom href that is a reserved destination', () => {
    assert.match(ctaImageError('custom', '/book-demo/?utm_source=blog'), /use cta="demo"/)
    assert.match(ctaImageError('custom', 'https://flowfuse.com/pricing'), /use cta="pricing"/)
    assert.match(ctaImageError('custom', 'https://app.flowfuse.com/account/create'), /use cta="sign-up"/)
    assert.match(ctaImageError('custom', 'https://app.flowfuse.com'), /reserved "signIn"/)
})

test('rejects a missing href, an href on a fixed destination, and an unknown cta', () => {
    assert.match(ctaImageError('custom'), /requires an href/)
    assert.match(ctaImageError('demo', '/blueprints/'), /use cta="custom"/)
    assert.match(ctaImageError('book-demo'), /invalid cta/)
})

const markdownFiles = dir => readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? markdownFiles(path) : path.endsWith('.md') ? [path] : []
})

const attribute = (attrs, name) => attrs.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1]

test('every ::cta-image in content is valid', () => {
    const files = ['content/blog', 'content/changelog', 'content/handbook', 'content/webinars', 'content/customer-stories', 'content-guides']
        .flatMap(dir => markdownFiles(join(nuxtDir, dir)))
    const offenders = files.flatMap((file) => {
        const body = readFileSync(file, 'utf8').replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1/gm, '')
        return [...body.matchAll(/::cta-image\{([^}]*)\}/g)].flatMap(([, attrs]) => {
            const error = ctaImageError(attribute(attrs, 'cta') ?? '', attribute(attrs, 'href'))
            return error ? [`${relative(nuxtDir, file)}: ${error}`] : []
        })
    })
    assert.deepEqual(offenders, [])
})
