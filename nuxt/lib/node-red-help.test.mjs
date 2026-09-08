import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { findFiles } from './find-files.mjs'
import { GUIDES_SOURCE } from './guides-sync.mjs'
import { isDirectory } from './meta-title-length.mjs'
import {
    extractHelp, helpRefsIn, helpUrlFor, isSafeHelpRef, sanitiseHelp, unclaimedHelpNames,
} from './node-red-help.mjs'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const GUIDES_DIR = join(REPO_ROOT, GUIDES_SOURCE)

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

// Guards the real-tree tests below against passing because they found nothing to check.
test('the guides tree exists where these tests expect it', () => {
    assert.ok(isDirectory(GUIDES_DIR), `expected ${GUIDES_DIR} to exist`)
})

test('an upper-case locale file name is a valid reference', () => {
    // Five of the six parser locale files are upper case upstream. The guard was
    // lower-case-only, so isSafeHelpRef rejected all five before the fetch, the route
    // answered 400 rather than the help, and the component swapped the whole Node help
    // section for its "could not be read from the Node-RED project" notice. Nothing failed:
    // the pages prerendered, and the CSV, HTML, JSON, XML and YAML pages each shipped with
    // that notice where their built-in help should have been.
    for (const file of ['70-CSV', '70-HTML', '70-JSON', '70-XML', '70-YAML']) {
        assert.ok(isSafeHelpRef({ category: 'parsers', file }), `${file} should be accepted`)
    }
    assert.match(helpUrlFor({ category: 'parsers', file: '70-JSON' }), /\/parsers\/70-JSON\.html$/)

    // Still one path segment, still nothing that can steer the URL.
    for (const file of ['../etc', '70-JSON?x=1', '70 JSON', '70/JSON', '70.JSON', '']) {
        assert.ok(!isSafeHelpRef({ category: 'parsers', file }), `${file} should be rejected`)
    }
})

test('every help reference the guides make is one the route will accept', () => {
    // The check that would have caught the upper-case guard offline. A reference the route
    // rejects does not fail a build - the component renders its error notice and the page
    // prerenders fine - so nothing else in the pipeline notices a page losing its help.
    const bad = []
    for (const path of findFiles(GUIDES_DIR, ['.md'])) {
        for (const { attrs, raw } of helpRefsIn(readFileSync(path, 'utf8'))) {
            const where = relative(REPO_ROOT, path)
            for (const key of ['category', 'file', 'node']) {
                if (!attrs[key]) bad.push(`${where}: ::node-red-help is missing ${key}= (${raw})`)
            }
            if (attrs.category && attrs.file && !isSafeHelpRef(attrs)) {
                bad.push(`${where}: the route rejects category="${attrs.category}" file="${attrs.file}"`)
            }
        }
    }
    assert.deepEqual(bad, [], bad.join('\n'))
})

test('the sanitiser keeps the classes that carry meaning rather than styling', () => {
    // The allowlist let no `class` through at all, which cost more than styling: upstream
    // marks an OPTIONAL message property with `<dt class="optional">` and a type (rather
    // than more prose) with `<span class="property-type">`. Both render as plain text
    // without the class, so an optional property became indistinguishable from a required
    // one. The live Eleventy pages keep both, so dropping them was a regression.
    const html = sanitiseHelp(
        '<dl class="message-properties">'
        + '<dt class="optional">template <span class="property-type">string</span></dt>'
        + '<dd>A template.</dd></dl>'
    )

    assert.match(html, /<dl class="message-properties">/)
    assert.match(html, /<dt class="optional">/)
    assert.match(html, /<span class="property-type">/)
})

test('the sanitiser keeps the tags and attributes upstream actually uses', () => {
    // Enumerated from all 36 en-US locale files rather than guessed. `center` is the Range
    // node's table cells (12 uses) and `target` is on every one of upstream's 7 outbound
    // links; dropping a tag keeps its text, so both losses read as a styling glitch.
    assert.match(sanitiseHelp('<td><center>scale</center></td>'), /<center>scale<\/center>/)
    assert.match(sanitiseHelp('<th width="80px">mode</th>'), /width="80px"/)
    assert.match(sanitiseHelp('<ol class="node-ports"><li>one</li></ol>'), /<ol class="node-ports">/)

    const link = sanitiseHelp('<a href="http://mustache.github.io/" target="_blank">mustache</a>')
    assert.match(link, /target="_blank"/)
    // `rel` has to be in the allowlist as well as produced by the transform: sanitize-html
    // filters the transform's output afterwards, so an attribute added there and missing
    // here is added and then dropped again, with nothing said.
    assert.match(link, /rel="noreferrer noopener"/)
})

test('the sanitiser still drops what can execute', () => {
    assert.doesNotMatch(sanitiseHelp('<p onclick="alert(1)">hi</p>'), /onclick/)
    assert.doesNotMatch(sanitiseHelp('<script>alert(1)</script><p>hi</p>'), /alert/)
    assert.doesNotMatch(sanitiseHelp('<a href="javascript:alert(1)">x</a>'), /javascript:/)
    // Deliberately not allowed, even though upstream has one (malformed) use of it on the
    // Range node's table: no text depends on it, and it is third-party CSS.
    assert.doesNotMatch(sanitiseHelp('<table style="outline-width:#888 solid thin">'), /style=/)
})
