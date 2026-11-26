import { test } from 'node:test'
import assert from 'node:assert/strict'

import { internalHref } from './internal-href.mjs'

test('full flowfuse.com links become site-relative paths', () => {
    assert.equal(internalHref('https://flowfuse.com/contact-us/'), '/contact-us/')
    assert.equal(internalHref('https://www.flowfuse.com/blog/2023/01/getting-started-with-node-red/'), '/blog/2023/01/getting-started-with-node-red/')
    assert.equal(internalHref('http://flowfuse.com/pricing/'), '/pricing/')
})

test('query strings and anchors are kept', () => {
    assert.equal(internalHref('https://flowfuse.com/docs/user/mcp/#setup'), '/docs/user/mcp/#setup')
    assert.equal(internalHref('https://flowfuse.com/contact-us/?subject=demo'), '/contact-us/?subject=demo')
    assert.equal(internalHref('https://flowfuse.com'), '/')
    assert.equal(internalHref('https://flowfuse.com?x=1'), '/?x=1')
})

test('other hosts and relative links are left alone', () => {
    // app.flowfuse.com is the product, a different site: it stays external.
    assert.equal(internalHref('https://app.flowfuse.com/account/create'), 'https://app.flowfuse.com/account/create')
    assert.equal(internalHref('https://flowfuse.community/'), 'https://flowfuse.community/')
    assert.equal(internalHref('https://flowfuse.com.evil.example/'), 'https://flowfuse.com.evil.example/')
    assert.equal(internalHref('https://nodered.org/docs/'), 'https://nodered.org/docs/')
    assert.equal(internalHref('/docs/user/'), '/docs/user/')
    assert.equal(internalHref('#top'), '#top')
})
