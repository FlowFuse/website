import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { MAX_META_TITLE_LENGTH, findOverlongMetaTitles, isDirectory } from './meta-title-length.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..')
const blogDir = join(repoRoot, 'src/blog')
const changelogDir = join(repoRoot, 'src/changelog')

// Guards the fixture-free tests below against a silent no-op if the source layout moves.
test('src/blog and src/changelog exist where these tests expect them', () => {
    assert.ok(isDirectory(blogDir), `expected ${blogDir} to exist`)
    assert.ok(isDirectory(changelogDir), `expected ${changelogDir} to exist`)
})

test('every blog post metaTitle fits within the handbook-documented length limit', () => {
    const violations = findOverlongMetaTitles(blogDir)
    assert.deepEqual(violations, [], formatViolations(violations))
})

test('every changelog entry metaTitle fits within the handbook-documented length limit', () => {
    const violations = findOverlongMetaTitles(changelogDir)
    assert.deepEqual(violations, [], formatViolations(violations))
})

function formatViolations (violations) {
    return violations
        .map(({ file, metaTitle, length }) => `${file}: "${metaTitle}" is ${length} chars (max ${MAX_META_TITLE_LENGTH})`)
        .join('\n')
}
