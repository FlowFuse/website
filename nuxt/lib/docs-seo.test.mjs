import { test } from 'node:test'
import assert from 'node:assert/strict'

import { docsSeo } from './docs-seo.mjs'

const page = (fields = {}) => ({ ...fields })

test('a page below /docs qualifies the brand the title template appends', () => {
    const seo = docsSeo(page({ navTitle: 'Bill of Materials' }), '/docs/user/bill-of-materials', ['user', 'bill-of-materials'])
    assert.equal(seo.heading, 'Bill of Materials')
    assert.equal(seo.siteName, 'FlowFuse Docs')
})

test('the docs root leaves the brand unqualified', () => {
    // Its own title already reads Documentation, so "FlowFuse Docs" would repeat it.
    const seo = docsSeo(page({ navTitle: 'Documentation' }), '/docs', [])
    assert.equal(seo.siteName, 'FlowFuse')
})

test('prefers navTitle over the heading @nuxt/content derives from the H1', () => {
    const seo = docsSeo(page({ navTitle: 'Changing the Stack', title: 'Changing the stack of an instance' }), '/docs/user/changestack', ['user', 'changestack'])
    assert.equal(seo.heading, 'Changing the Stack')
})

test('falls back to the H1 title, then the last slug segment, then Documentation', () => {
    assert.equal(docsSeo(page({ title: 'Concepts' }), '/docs/user/concepts', ['user', 'concepts']).heading, 'Concepts')
    assert.equal(docsSeo(page(), '/docs/user/concepts', ['user', 'concepts']).heading, 'concepts')
    assert.equal(docsSeo(null, '/docs', []).heading, 'Documentation')
})

test('reads the description from nested meta, where docs-sync writes it', () => {
    const seo = docsSeo(page({ meta: { description: 'Explore comprehensive documentation for FlowFuse.' } }), '/docs', [])
    assert.equal(seo.description, 'Explore comprehensive documentation for FlowFuse.')
})

test('leaves the description undefined rather than empty when a page has none', () => {
    // Most synced docs pages carry no description at all. An empty string would put
    // <meta name="description" content=""> on the page, which is worse than no tag.
    assert.equal(docsSeo(page({ navTitle: 'Custom Hostnames' }), '/docs/user/custom-hostnames', ['user', 'custom-hostnames']).description, undefined)
    assert.equal(docsSeo(page({ meta: { description: '' } }), '/docs', []).description, undefined)
})

test('canonical url is absolute on the production host', () => {
    assert.equal(docsSeo(page(), '/docs/user/concepts', ['user', 'concepts']).canonicalUrl, 'https://flowfuse.com/docs/user/concepts')
})

test('the og image gets the bare heading, since the card already prints the section', () => {
    const seo = docsSeo(page({ navTitle: 'Bill of Materials' }), '/docs/user/bill-of-materials', ['user', 'bill-of-materials'])
    assert.deepEqual(seo.ogImage, { title: 'Bill of Materials', section: 'Docs' })
})

test('normalises the git commit stamp docs-sync writes into dateModified', () => {
    const seo = docsSeo(page({ updated: '2026-08-11 15:07:47 +0200' }), '/docs', [])
    assert.equal(seo.dateModified, '2026-08-11T15:07:47+02:00')
})

test('dateModified is undefined when the updated stamp is blank or unparseable', () => {
    // The synced frontmatter always carries the key; the value is empty whenever
    // git could not date the file.
    assert.equal(docsSeo(page({ updated: '' }), '/docs', []).dateModified, undefined)
    assert.equal(docsSeo(page({ updated: 'last tuesday' }), '/docs', []).dateModified, undefined)
    assert.equal(docsSeo(page(), '/docs', []).dateModified, undefined)
})
