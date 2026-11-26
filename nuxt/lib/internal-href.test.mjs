import { test } from 'node:test'
import assert from 'node:assert/strict'

import { internalHref } from './internal-href.mjs'

test('full flowfuse.com links become site-relative paths', () => {
    assert.equal(internalHref('https://flowfuse.com/contact-us/'), '/contact-us/')
    assert.equal(internalHref('https://www.flowfuse.com/blog/2023/01/getting-started-with-node-red/'), '/blog/2023/01/getting-started-with-node-red/')
    assert.equal(internalHref('http://flowfuse.com/pricing/'), '/pricing/')
})

test('query strings and anchors are kept', () => {
    assert.equal(internalHref('https://flowfuse.com/contact-us/?subject=demo'), '/contact-us/?subject=demo')
    assert.equal(internalHref('https://flowfuse.com'), '/')
    assert.equal(internalHref('https://flowfuse.com?x=1'), '/?x=1')
})

test('other hosts and relative links are left alone', () => {
    assert.equal(internalHref('https://app.flowfuse.com/account/create'), 'https://app.flowfuse.com/account/create')
    assert.equal(internalHref('https://flowfuse.community/'), 'https://flowfuse.community/')
    assert.equal(internalHref('https://flowfuse.com.evil.example/'), 'https://flowfuse.com.evil.example/')
    assert.equal(internalHref('https://nodered.org/docs/'), 'https://nodered.org/docs/')
    assert.equal(internalHref('/docs/user/'), '/docs/user/')
    assert.equal(internalHref('#top'), '#top')
})

test('links to files keep their full URL, so the browser loads the file instead of the router', () => {
    assert.equal(internalHref('https://flowfuse.com/img/ANDON-Screenshot-650.avif'), 'https://flowfuse.com/img/ANDON-Screenshot-650.avif')
    assert.equal(internalHref('https://flowfuse.com/changelog/index.xml'), 'https://flowfuse.com/changelog/index.xml')
    assert.equal(internalHref('https://flowfuse.com/files/guide.pdf?v=2'), 'https://flowfuse.com/files/guide.pdf?v=2')
    assert.equal(internalHref('https://flowfuse.com/blog/2025/09/node-red-4.1/'), '/blog/2025/09/node-red-4.1/')
})

test('links to a section of a page keep their full URL', () => {
    assert.equal(internalHref('https://flowfuse.com/docs/user/mcp/#setup'), 'https://flowfuse.com/docs/user/mcp/#setup')
})
