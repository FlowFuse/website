import { test } from 'node:test'
import assert from 'node:assert/strict'

import { docsPageTitle } from './docs-page-title.mjs'

test('metaTitle wins, because navTitle is only the sidebar label', () => {
    // The defect this pins: with navTitle first, every migrated library page's title
    // collapsed to its nav label and "Using MySQL with Node-RED (2026 Updated)" shipped
    // as "MySQL". Nothing failed; the pages just had the wrong title.
    assert.equal(
        docsPageTitle({
            metaTitle: 'Using MySQL with Node-RED (2026 Updated)',
            navTitle: 'MySQL',
            title: 'Using MySQL with Node-RED (2026 Updated)',
        }),
        'Using MySQL with Node-RED (2026 Updated)'
    )
})

test('a page from FlowFuse/flowfuse still titles by its nav label', () => {
    // Nothing in that repo sets metaTitle, so adding the field must not move their titles.
    assert.equal(docsPageTitle({ navTitle: 'Getting Started', title: 'Getting Started' }), 'Getting Started')
})

test('title carries the page when there is no nav label', () => {
    assert.equal(docsPageTitle({ title: 'Concepts' }), 'Concepts')
})

test('the last path segment is the last resort, then a generic name', () => {
    assert.equal(docsPageTitle(null, ['user', 'concepts']), 'concepts')
    assert.equal(docsPageTitle(null, []), 'Documentation')
    assert.equal(docsPageTitle(undefined), 'Documentation')
})

test('an empty string is skipped rather than winning', () => {
    assert.equal(docsPageTitle({ metaTitle: '', navTitle: 'MySQL' }), 'MySQL')
})
