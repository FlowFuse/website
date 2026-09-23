import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { findDuplicateSiblingNavTitles, findPagesWithUnreachableTitle } from './guides-frontmatter.mjs'
import { GUIDES_SOURCE } from './guides-sync.mjs'
import { isDirectory } from './meta-title-length.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..')
const guidesDir = join(repoRoot, GUIDES_SOURCE)

function scratch (files) {
    const root = mkdtempSync(join(tmpdir(), 'guides-frontmatter-'))
    for (const [relPath, content] of Object.entries(files)) {
        const path = join(root, relPath)
        mkdirSync(dirname(path), { recursive: true })
        writeFileSync(path, content, 'utf8')
    }
    return root
}

function page (fm) {
    const lines = Object.entries(fm).map(([k, v]) => `${k}: "${v}"`)
    return `---\n${lines.join('\n')}\n---\n\n# Heading\n`
}

// Guards the real-tree tests below against a silent no-op if the source layout moves.
test('the guides tree exists where these tests expect it', () => {
    assert.ok(isDirectory(guidesDir), `expected ${guidesDir} to exist`)
})

test('every sidebar entry is distinguishable from the ones beside it', () => {
    const duplicates = findDuplicateSiblingNavTitles(guidesDir)
    assert.deepEqual(duplicates, [], duplicates
        .map(d => `under ${d.under}/: ${d.files.length} nav entries all labelled "${d.navTitle}" (${d.files.join(', ')})`)
        .join('\n'))
})

test('every page whose title is longer than its nav label says which one Google gets', () => {
    const unreachable = findPagesWithUnreachableTitle(guidesDir)
    assert.deepEqual(unreachable, [], unreachable
        .map(p => `${p.file}: title "${p.title}" can never render, navTitle "${p.navTitle}" wins; set metaTitle`)
        .join('\n'))
})

test('a directory index competes with its parent\'s children, not with its own', () => {
    // The exact shape the migration got wrong: three nested indexes carrying the nav label
    // of the section they sit under, which is already used by that section's own index.
    const root = scratch({
        'node-red/README.md': page({ navTitle: 'Using Node-RED' }),
        'node-red/getting-started/README.md': page({ navTitle: 'Getting started' }),
        'node-red/getting-started/editor/README.md': page({ navTitle: 'Getting started' }),
        'node-red/getting-started/library/README.md': page({ navTitle: 'Getting started' }),
    })

    try {
        const [group, ...rest] = findDuplicateSiblingNavTitles(root)
        assert.deepEqual(rest, [])
        assert.equal(group.navTitle, 'Getting started')
        // The section's own index is named alongside its children: the reader sees one
        // "Getting started" indented under another, which is what the reviewer screenshotted.
        assert.deepEqual(group.files, [
            'node-red/getting-started/README.md',
            'node-red/getting-started/editor/README.md',
            'node-red/getting-started/library/README.md',
        ].sort())
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('a directory index is recognised under either name, so the rename cannot blind this', () => {
    // #5752 renames every guide README.md to index.md. Keying only off README.md put each
    // nested index in a bucket of its own, and this check went green with the duplicate
    // labels still in place.
    for (const indexName of ['README.md', 'index.md']) {
        const root = scratch({
            [`node-red/getting-started/${indexName}`]: page({ navTitle: 'Getting started' }),
            [`node-red/getting-started/editor/${indexName}`]: page({ navTitle: 'Getting started' }),
        })

        try {
            const [group, ...rest] = findDuplicateSiblingNavTitles(root)
            assert.deepEqual(rest, [], `${indexName}: expected exactly one clash`)
            assert.deepEqual(group.files, [
                `node-red/getting-started/${indexName}`,
                `node-red/getting-started/editor/${indexName}`,
            ].sort())
        } finally {
            rmSync(root, { recursive: true, force: true })
        }
    }
})

test('the same nav label in two different sections is fine', () => {
    const root = scratch({
        'application-guide/worked-examples/README.md': page({ navTitle: 'Worked examples' }),
        'node-red-guide/worked-examples/README.md': page({ navTitle: 'Worked examples' }),
    })

    try {
        assert.deepEqual(findDuplicateSiblingNavTitles(root), [])
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})

test('a short nav label beside a long title needs a metaTitle, an identical one does not', () => {
    const root = scratch({
        'node-red/database/mysql.md': page({ title: 'Using MySQL with Node-RED (2026 Updated)', navTitle: 'MySQL' }),
        'node-red/database/redis.md': page({ title: 'Using Redis with Node-RED', navTitle: 'Redis', metaTitle: 'Using Redis with Node-RED' }),
        'application-guide/data-plane.md': page({ title: 'Data plane', navTitle: 'Data plane' }),
    })

    try {
        assert.deepEqual(findPagesWithUnreachableTitle(root), [{
            file: 'node-red/database/mysql.md',
            title: 'Using MySQL with Node-RED (2026 Updated)',
            navTitle: 'MySQL',
        }])
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
})
