import { test } from 'node:test'
import assert from 'node:assert/strict'
import { internalHref } from './internal-href.mjs'

test('flowfuse.com links become internal paths', () => {
    assert.equal(internalHref('https://flowfuse.com/contact-us/'), '/contact-us/')
    assert.equal(internalHref('https://www.flowfuse.com/pricing/?plan=team'), '/pricing/?plan=team')
})

test('other sites, files and section links are left as they are', () => {
    for (const url of [
        'https://app.flowfuse.com/account/create',
        'https://flowfuse.com.evil.example/',
        'https://flowfuse.com/img/screenshot.avif',
        'https://flowfuse.com/docs/user/mcp/#setup',
    ]) assert.equal(internalHref(url), url)
})
