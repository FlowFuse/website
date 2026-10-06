import { test } from 'node:test'
import assert from 'node:assert/strict'

import { rawMarkdownCanonical } from './raw-canonical.mjs'

const SITE = 'https://flowfuse.com'

test('a raw docs page points at its html page, with the trailing slash every page has', () => {
    assert.equal(rawMarkdownCanonical('/raw/docs/user/mcp.md', SITE), 'https://flowfuse.com/docs/user/mcp/')
})

test('a trailing /index is the section page itself, as the route handler reads it', () => {
    assert.equal(rawMarkdownCanonical('/raw/docs/user/expert/index.md', SITE), 'https://flowfuse.com/docs/user/expert/')
    assert.equal(rawMarkdownCanonical('/raw/index.md', SITE), 'https://flowfuse.com/')
})

test('a raw whitepaper points at the singular /whitepaper/ route its page is served at', () => {
    assert.equal(
        rawMarkdownCanonical('/raw/whitepapers/open-source-software-for-manufacturing.md', SITE),
        'https://flowfuse.com/whitepaper/open-source-software-for-manufacturing/'
    )
})

test('a reserved character comes out percent-encoded, as the sitemap spells the url', () => {
    const expected = 'https://flowfuse.com/blog/2025/11/flowfuse%2Bllm%2Bmcp-equals-text-driven-operations/'
    assert.equal(rawMarkdownCanonical('/raw/blog/2025/11/flowfuse%2Bllm%2Bmcp-equals-text-driven-operations.md', SITE), expected)
    // Netlify hands the function the decoded path, so the same request arrives with a "+".
    assert.equal(rawMarkdownCanonical('/raw/blog/2025/11/flowfuse+llm+mcp-equals-text-driven-operations.md', SITE), expected)
})

test('a malformed escape is encoded like any other character rather than throwing', () => {
    assert.equal(rawMarkdownCanonical('/raw/docs/a%zz.md', SITE), 'https://flowfuse.com/docs/a%25zz/')
})

test('a query string is not part of the canonical', () => {
    assert.equal(rawMarkdownCanonical('/raw/docs/user/mcp.md?utm_source=x', SITE), 'https://flowfuse.com/docs/user/mcp/')
})

test('a site url written with a trailing slash does not double it', () => {
    assert.equal(rawMarkdownCanonical('/raw/docs/user/mcp.md', 'https://flowfuse.com/'), 'https://flowfuse.com/docs/user/mcp/')
})

test('anything that is not a raw markdown url gets no header', () => {
    for (const path of ['/docs/user/mcp/', '/raw/docs/user/mcp', '/raw/.md', '/rawx/docs/user/mcp.md', '/llms.txt']) {
        assert.equal(rawMarkdownCanonical(path, SITE), null, path)
    }
})

test('a path that could break out of the Link header value gets no header', () => {
    for (const path of ['/raw/docs/a>b.md', '/raw/docs/a<b.md', '/raw/docs/a"b.md', '/raw/docs/a b.md', '/raw/docs/a\r\nX-Evil: 1.md']) {
        assert.equal(rawMarkdownCanonical(path, SITE), null, JSON.stringify(path))
    }
})
