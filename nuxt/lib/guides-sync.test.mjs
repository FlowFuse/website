import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'

import {
    GUIDES_SOURCE,
    injectFrontmatter,
    injectGuideFrontmatter,
    isGuidePath,
    listGuideFiles,
    syncGuideAssetPath,
    syncGuideAssets,
} from './guides-sync.mjs'

const silent = { info: () => {}, warn: () => {}, error: () => {} }

function scratch () {
    const root = mkdtempSync(join(tmpdir(), 'guides-sync-'))
    return {
        root,
        nuxtRoot: join(root, 'nuxt'),
        contentDocsDir: join(root, 'nuxt', 'content', 'docs'),
        publicDocsDir: join(root, 'nuxt', 'public', 'docs'),
        cleanup: () => rmSync(root, { recursive: true, force: true }),
    }
}

function write (path, content) {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, content, 'utf8')
}

test('a timestamp git could not supply is left out, not emitted empty', () => {
    // `updated:` with no value is YAML null. The collection schema takes the key as
    // optional but not nullable, so an empty value turns "git was unavailable" into a
    // parse complaint on every guide page at once. Reachable whenever .git is absent or
    // the commit touching the file falls outside a shallow fetch.
    const withTimestamp = injectFrontmatter('---\ntitle: T\n---\n', { editUrl: 'u', updated: '2026-09-08' })
    assert.match(withTimestamp, /^---\neditUrl: u\nupdated: 2026-09-08\ntitle: T\n/)

    const without = injectFrontmatter('---\ntitle: T\n---\n', { editUrl: 'u', updated: '' })
    assert.match(without, /^---\neditUrl: u\ntitle: T\n/)
    assert.ok(!/updated:/.test(without), 'an empty timestamp must not leave a valueless key')
})

test('provenance is added to existing frontmatter without disturbing it', () => {
    const out = injectFrontmatter('---\ntitle: Foundations\n---\n\n# Foundations\n', {
        editUrl: 'https://example.test/edit',
        updated: '2026-09-03 10:00:00 +0200',
    })

    assert.match(out, /^---\neditUrl: https:\/\/example\.test\/edit\nupdated: 2026-09-03 10:00:00 \+0200\ntitle: Foundations\n---\n/)
    assert.match(out, /# Foundations/)
})

test('a guide with no frontmatter still gets a block', () => {
    const out = injectFrontmatter('# Foundations\n', { editUrl: 'e', updated: 'u' })
    assert.equal(out, '---\neditUrl: e\nupdated: u\n---\n# Foundations\n')
})

test('isGuidePath matches only files under the guides source', () => {
    const root = '/repo'
    assert.equal(isGuidePath(join(root, GUIDES_SOURCE, 'application-guide/index.md'), root), true)
    assert.equal(isGuidePath(join(root, 'nuxt/content/docs/user/index.md'), root), false)
    // Not a false-positive on a directory that merely shares the prefix.
    assert.equal(isGuidePath(join(root, 'nuxt/content-guides-other/index.md'), root), false)
})

test('injectGuideFrontmatter stamps an edit URL back to this repo, keyed off the real file path', () => {
    const { root, cleanup } = scratch()
    try {
        write(join(root, GUIDES_SOURCE, 'application-guide/index.md'), '---\ntitle: Guide\n---\n\n# Guide\n')

        const out = injectGuideFrontmatter('---\ntitle: Guide\n---\n\n# Guide\n', {
            repoRoot: root,
            absPath: join(root, GUIDES_SOURCE, 'application-guide/index.md'),
        })

        assert.match(out, /editUrl: https:\/\/github\.com\/FlowFuse\/website\/edit\/main\/nuxt\/content-guides\/application-guide\/index\.md/)
        // Not a git checkout, so gitOutput has nothing to report and the key is left out
        // rather than written empty: a valueless key is YAML null, which the collection
        // schema takes as neither a string nor absent.
        assert.ok(!/updated:/.test(out), 'an unanswerable timestamp must not leave a valueless key')
        assert.match(out, /title: Guide/)
    } finally {
        cleanup()
    }
})

test('injectGuideFrontmatter reads this repo\'s own git history for the guide, not flowfuse\'s', () => {
    const { root, cleanup } = scratch()
    try {
        execFileSync('git', ['init', '-q'], { cwd: root })
        execFileSync('git', ['config', 'user.email', 'test@example.test'], { cwd: root })
        execFileSync('git', ['config', 'user.name', 'Test'], { cwd: root })
        write(join(root, GUIDES_SOURCE, 'application-guide/index.md'), '# Guide\n')
        execFileSync('git', ['add', '.'], { cwd: root })
        execFileSync('git', ['commit', '-q', '-m', 'add guide'], { cwd: root })

        const out = injectGuideFrontmatter('# Guide\n', {
            repoRoot: root,
            absPath: join(root, GUIDES_SOURCE, 'application-guide/index.md'),
        })

        assert.doesNotMatch(out, /updated: \n/)
        assert.match(out, /updated: \d{4}-\d{2}-\d{2}/)
    } finally {
        cleanup()
    }
})

test('syncGuideAssetPath copies a non-markdown asset to public/docs', () => {
    const { root, nuxtRoot, publicDocsDir, cleanup } = scratch()
    try {
        write(join(root, GUIDES_SOURCE, 'application-guide/diagram.svg'), '<svg/>')

        syncGuideAssetPath({ repoRoot: root, nuxtRoot, relPath: 'application-guide/diagram.svg' })

        assert.equal(readFileSync(join(publicDocsDir, 'application-guide/diagram.svg'), 'utf8'), '<svg/>')
    } finally {
        cleanup()
    }
})

test('syncGuideAssetPath removes the copy when the asset is gone', () => {
    const { root, nuxtRoot, publicDocsDir, cleanup } = scratch()
    try {
        write(join(publicDocsDir, 'application-guide/diagram.svg'), '<svg/>')

        syncGuideAssetPath({ repoRoot: root, nuxtRoot, relPath: 'application-guide/diagram.svg' })

        assert.throws(() => readFileSync(join(publicDocsDir, 'application-guide/diagram.svg')))
    } finally {
        cleanup()
    }
})

test('syncGuideAssetPath ignores markdown - that is @nuxt/content\'s job now', () => {
    const { root, nuxtRoot, publicDocsDir, cleanup } = scratch()
    try {
        write(join(root, GUIDES_SOURCE, 'application-guide/index.md'), '# Guide\n')

        syncGuideAssetPath({ repoRoot: root, nuxtRoot, relPath: 'application-guide/index.md' })

        assert.throws(() => readFileSync(join(publicDocsDir, 'application-guide/index.md')))
    } finally {
        cleanup()
    }
})

test('syncGuideAssets copies only the non-markdown files', () => {
    const { root, nuxtRoot, publicDocsDir, cleanup } = scratch()
    try {
        write(join(root, GUIDES_SOURCE, 'application-guide/index.md'), '# Guide\n')
        write(join(root, GUIDES_SOURCE, 'application-guide/diagram.svg'), '<svg/>')

        const result = syncGuideAssets({ repoRoot: root, nuxtRoot, logger: silent })

        assert.deepEqual(result, { pages: 1, assets: 1 })
        assert.equal(readFileSync(join(publicDocsDir, 'application-guide/diagram.svg'), 'utf8'), '<svg/>')
    } finally {
        cleanup()
    }
})

test('a guide that would collide with a page from FlowFuse/flowfuse fails the build', () => {
    const { root, nuxtRoot, contentDocsDir, cleanup } = scratch()
    try {
        // @nuxt/content would also refuse this - the docs collection's `id` is a primary
        // key - but as a SQL constraint error, not a message naming the file. This check
        // runs first so the build fails with the friendlier one.
        write(join(root, GUIDES_SOURCE, 'user/concepts.md'), '# Concepts\n')
        write(join(contentDocsDir, 'user/concepts.md'), '# Concepts from flowfuse\n')

        assert.throws(
            () => syncGuideAssets({ repoRoot: root, nuxtRoot, logger: silent }),
            /collide with pages from FlowFuse\/flowfuse/
        )
    } finally {
        cleanup()
    }
})

test('a missing guides directory is reported, not fatal', () => {
    const { root, nuxtRoot, cleanup } = scratch()
    try {
        assert.deepEqual(syncGuideAssets({ repoRoot: root, nuxtRoot, logger: silent }), { pages: 0, assets: 0 })
    } finally {
        cleanup()
    }
})

test('listGuideFiles walks nested directories and skips dotfiles', () => {
    const { root, cleanup } = scratch()
    try {
        write(join(root, GUIDES_SOURCE, 'a.md'), 'a')
        write(join(root, GUIDES_SOURCE, 'nested/b.md'), 'b')
        write(join(root, GUIDES_SOURCE, '.hidden.md'), 'x')

        assert.deepEqual(
            listGuideFiles(join(root, GUIDES_SOURCE)).sort(),
            ['a.md', join('nested', 'b.md')]
        )
    } finally {
        cleanup()
    }
})
