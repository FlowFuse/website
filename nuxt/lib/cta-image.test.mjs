import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url)
const { ctaImageError, customCtaImageDestination } = await jiti.import('./cta-image.ts')
const nuxtDir = fileURLToPath(new URL('..', import.meta.url))

test('accepts the four fixed destinations without a destination-key', () => {
    for (const cta of ['sign-up', 'demo', 'contact', 'pricing']) assert.equal(ctaImageError(cta), undefined, cta)
})

test('accepts a custom destination-key with a fixed href in the registry', () => {
    for (const key of ['homepage', 'communityForum', 'deviceAgentInstall']) assert.equal(ctaImageError('custom', key), undefined, key)
})

test('the registry supplies the link and event for a custom destination', () => {
    assert.deepEqual(customCtaImageDestination('homepage'), { href: '/', event: 'cta-homepage' })
    assert.equal(customCtaImageDestination('latestWebinar'), undefined)
    assert.equal(customCtaImageDestination('notAKey'), undefined)
})

test('rejects a custom destination-key that is missing, unregistered, or dynamic', () => {
    assert.match(ctaImageError('custom'), /requires a destination-key/)
    assert.match(ctaImageError('custom', 'notAKey'), /isn't in lib\/custom-cta-destinations.ts/)
    assert.match(ctaImageError('custom', 'latestWebinar'), /no fixed href/)
})

test('rejects a destination-key on a fixed destination and an unknown cta', () => {
    assert.match(ctaImageError('demo', 'homepage'), /use cta="custom"/)
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
            const error = ctaImageError(attribute(attrs, 'cta') ?? '', attribute(attrs, 'destination-key'))
            return error ? [`${relative(nuxtDir, file)}: ${error}`] : []
        })
    })
    assert.deepEqual(offenders, [])
})
