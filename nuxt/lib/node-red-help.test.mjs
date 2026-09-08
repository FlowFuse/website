import { test } from 'node:test'
import assert from 'node:assert/strict'

import { extractHelp, helpUrlFor, isSafeHelpRef, unclaimedHelpNames } from './node-red-help.mjs'

const block = (name, body) => `<script type="text/html" data-help-name="${name}">${body}</script>`

test('help is selected by name out of a file holding several nodes', () => {
    const html = [
        block('mqtt in', 'IN'),
        block('mqtt out', 'OUT'),
        block('mqtt-broker', 'BROKER'),
    ].join('\n')

    assert.equal(extractHelp(html, 'mqtt out'), 'OUT')
})

test('a hyphenated request still finds a space-separated help name', () => {
    // The catalogue asked for `mqtt-in` while upstream says `mqtt in`. Eleventy matched on
    // the literal string, found nothing, and shipped two pages with no help at all.
    assert.equal(extractHelp(block('mqtt in', 'IN'), 'mqtt-in'), 'IN')
})

test('an exact name does not drag in its longer siblings', () => {
    // `file` is Write File and `file in` is Read File. Prefix-matching alone would put both
    // nodes' help on the Write File page.
    const html = [block('file', 'WRITE'), block('file in', 'READ')].join('\n')

    assert.equal(extractHelp(html, 'file'), 'WRITE')
    assert.equal(extractHelp(html, 'file in'), 'READ')
})

test('a name covering a family returns the whole family, in document order', () => {
    // /docs/node-red/core-nodes/common/link/ documents link in, link out and link call, as
    // the Eleventy page did: its xpath was a starts-with() over a node set, joined. Taking
    // only the first match dropped most of the page while still captioning it as the
    // node's complete built-in help.
    const html = [
        block('link in', 'IN'),
        block('link out', 'OUT'),
        block('link call', 'CALL'),
    ].join('\n')

    assert.equal(extractHelp(html, 'link'), 'IN\n\nOUT\n\nCALL')
})

test('a name that matches nothing returns empty rather than the wrong node', () => {
    assert.equal(extractHelp(block('tcp in', 'TCP'), 'udp in'), '')
})

test('help upstream offers that nothing asked for is reported', () => {
    // The only check that catches being quietly *wrong* rather than quietly stale. Asking
    // for `watch` in 23-watch.html succeeds, so nothing errors, while `file in` - Read
    // File's actual help - sits unclaimed. That shipped the Watch node's help under the
    // Read File title for years.
    const html = [block('file', 'WRITE'), block('file in', 'READ')].join('\n')

    assert.deepEqual(unclaimedHelpNames(html, ['file']), [])
    assert.deepEqual(unclaimedHelpNames(html, ['file in']), ['file'])
    assert.deepEqual(unclaimedHelpNames(html, ['nothing']), ['file', 'file in'])
})

test('the upstream URL cannot be steered outside the locale tree', () => {
    // category and file reach this from a request's query string, and they are pasted into
    // a URL, so a path segment is all they may be.
    assert.ok(isSafeHelpRef({ category: 'network', file: '10-mqtt' }))
    assert.ok(!isSafeHelpRef({ category: '../../etc', file: '10-mqtt' }))
    assert.ok(!isSafeHelpRef({ category: 'network', file: '10-mqtt?x=1' }))
    assert.ok(!isSafeHelpRef({ category: 'net work', file: '10-mqtt' }))

    assert.match(helpUrlFor({ category: 'network', file: '10-mqtt' }), /\/network\/10-mqtt\.html$/)
    assert.throws(() => helpUrlFor({ category: '..', file: 'x' }), /Unsafe Node-RED help reference/)
})
