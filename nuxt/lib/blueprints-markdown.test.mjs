import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
    assetBaseFor,
    processBlueprint,
    resolveAssetPath,
    rewriteBodyImages,
    rewriteFrontmatterImage,
    splitFrontmatter,
    stripLayout,
} from './blueprints-markdown.mjs'

const BASE = assetBaseFor('manufacturing', 'oee-calculator')

test('assetBaseFor builds the public prefix for a blueprint', () => {
    assert.equal(BASE, '/blueprints/manufacturing/oee-calculator')
})

test('resolveAssetPath resolves the shapes the library actually authors', () => {
    assert.equal(resolveAssetPath(BASE, 'oee-calculator.png'), `${BASE}/oee-calculator.png`)
    assert.equal(resolveAssetPath(BASE, './oee-calculator.png'), `${BASE}/oee-calculator.png`)
    assert.equal(resolveAssetPath(BASE, '"./oee-calculator.png"'), `${BASE}/oee-calculator.png`)
    assert.equal(resolveAssetPath(BASE, 'images/flow.png'), `${BASE}/images/flow.png`)
})

test('resolveAssetPath leaves anything that is not blueprint-relative alone', () => {
    assert.equal(resolveAssetPath(BASE, '/images/og-blog.jpg'), '/images/og-blog.jpg')
    assert.equal(resolveAssetPath(BASE, 'https://example.com/a.png'), 'https://example.com/a.png')
    assert.equal(resolveAssetPath(BASE, '//example.com/a.png'), '//example.com/a.png')
    assert.equal(resolveAssetPath(BASE, 'data:image/png;base64,AAAA'), 'data:image/png;base64,AAAA')
})

test('splitFrontmatter keeps a file with no frontmatter entirely in the body', () => {
    const { frontmatter, body } = splitFrontmatter('# Title\n\nbody\n')
    assert.equal(frontmatter, '')
    assert.equal(body, '# Title\n\nbody\n')
})

test('rewriteFrontmatterImage rewrites only the image key', () => {
    const input = '---\ntitle: OEE Calculator\nimage: "./oee-calculator.png"\nblueprintId: PaRL4JNeBM\n---\n![shot](./oee-calculator.png)\n'
    const out = rewriteFrontmatterImage(input, BASE)
    assert.match(out, /^image: \/blueprints\/manufacturing\/oee-calculator\/oee-calculator\.png$/m)
    assert.match(out, /^title: OEE Calculator$/m)
    // The body is this function's business only through rewriteBodyImages.
    assert.match(out, /!\[shot\]\(\.\/oee-calculator\.png\)/)
})

test('rewriteBodyImages rewrites relative destinations and leaves absolute ones', () => {
    const input = '---\nimage: ./a.png\n---\n![one](./images/flow.png)\n![two](b.png)\n![three](/images/og-blog.jpg)\n'
    const out = rewriteBodyImages(input, BASE)
    assert.match(out, /!\[one\]\(\/blueprints\/manufacturing\/oee-calculator\/images\/flow\.png\)/)
    assert.match(out, /!\[two\]\(\/blueprints\/manufacturing\/oee-calculator\/b\.png\)/)
    assert.match(out, /!\[three\]\(\/images\/og-blog\.jpg\)/)
    // Frontmatter is left to rewriteFrontmatterImage.
    assert.match(out, /^image: \.\/a\.png$/m)
})

test('rewriteBodyImages keeps the {attr} suffix markdown-it-attrs authored', () => {
    const out = rewriteBodyImages('![shot](./images/a.png){data-zoomable}\n', BASE)
    assert.equal(out, `![shot](${BASE}/images/a.png){data-zoomable}\n`)
})

test('rewriteBodyImages keeps a parenthesised filename whole', () => {
    const out = rewriteBodyImages('![admin view](./multi-users-dashboard(1).png)\n', BASE)
    assert.equal(out, `![admin view](${BASE}/multi-users-dashboard(1).png)\n`)
})

test('rewriteBodyImages puts a title string back after the rewritten path', () => {
    // The form multi-user-dashboard authors: a balanced-paren filename *and* a title.
    const out = rewriteBodyImages('![user view](./multi-users-dashboard(1).png "User view")\n', BASE)
    assert.equal(out, `![user view](${BASE}/multi-users-dashboard(1).png "User view")\n`)
    assert.equal(
        rewriteBodyImages("![shot](./a.png 'A title')\n", BASE),
        `![shot](${BASE}/a.png 'A title')\n`
    )
})

test('stripLayout drops the Nunjucks layout field', () => {
    const out = stripLayout('---\ntitle: x\nlayout: layouts/blueprint.njk\nblueprintId: y\n---\nbody\n')
    assert.equal(out, '---\ntitle: x\nblueprintId: y\n---\nbody\n')
})

test('processBlueprint applies every transform once', () => {
    const input = [
        '---',
        'title: Multi-User Dashboard',
        'image: multi-users-dashboard(1).png',
        'layout: layouts/blueprint.njk',
        'blueprintId: MaEL1KN326',
        '---',
        '![user view](./multi-users-dashboard(1).png "User view")',
        '',
    ].join('\n')

    const base = assetBaseFor('flowfuse-dashboard', 'multi-user-dashboard')
    const out = processBlueprint(input, { assetBase: base, updated: '2026-06-16 18:32:27 +0200' })

    assert.equal(out, [
        '---',
        'updated: 2026-06-16 18:32:27 +0200',
        'title: Multi-User Dashboard',
        `image: ${base}/multi-users-dashboard(1).png`,
        'blueprintId: MaEL1KN326',
        '---',
        `![user view](${base}/multi-users-dashboard(1).png "User view")`,
        '',
    ].join('\n'))
})

test('processBlueprint gives a README with no frontmatter one, rather than dropping the date', () => {
    const out = processBlueprint('# Title\n', { assetBase: BASE, updated: '2026-01-01 00:00:00 +0000' })
    assert.equal(out, '---\nupdated: 2026-01-01 00:00:00 +0000\n---\n# Title\n')
})
