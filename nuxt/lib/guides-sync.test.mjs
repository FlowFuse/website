import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'

import {
    GUIDES_SOURCE,
    destinationFor,
    injectFrontmatter,
    listGuideFiles,
    syncGuides,
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

test('a README becomes its section index, so a directory of guides nests like a directory of docs', () => {
    assert.equal(
        destinationFor('application-guide/README.md', '/content/docs', '/public/docs'),
        '/content/docs/application-guide/index.md'
    )
    assert.equal(
        destinationFor('application-guide/architectures/it.md', '/content/docs', '/public/docs'),
        '/content/docs/application-guide/architectures/it.md'
    )
})

test('non-markdown files are served as assets rather than parsed as pages', () => {
    assert.equal(
        destinationFor('application-guide/images/oee.png', '/content/docs', '/public/docs'),
        '/public/docs/application-guide/images/oee.png'
    )
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

test('the whole guides tree lands in the docs content tree, stamped with an edit link back to this repo', () => {
    const { root, nuxtRoot, contentDocsDir, publicDocsDir, cleanup } = scratch()
    try {
        write(join(root, GUIDES_SOURCE, 'application-guide/README.md'), '---\ntitle: Guide\n---\n\n# Guide\n')
        write(join(root, GUIDES_SOURCE, 'application-guide/architectures/it.md'), '---\ntitle: IT\n---\n\n# IT\n')
        write(join(root, GUIDES_SOURCE, 'application-guide/diagram.svg'), '<svg/>')
        mkdirSync(contentDocsDir, { recursive: true })

        const { count } = syncGuides({ repoRoot: root, nuxtRoot, logger: silent })

        assert.equal(count, 3)
        const index = readFileSync(join(contentDocsDir, 'application-guide/index.md'), 'utf8')
        assert.match(index, /editUrl: https:\/\/github\.com\/FlowFuse\/website\/edit\/main\/nuxt\/content-guides\/application-guide\/README\.md/)
        assert.match(index, /title: Guide/)
        assert.ok(readFileSync(join(contentDocsDir, 'application-guide/architectures/it.md'), 'utf8'))
        assert.equal(readFileSync(join(publicDocsDir, 'application-guide/diagram.svg'), 'utf8'), '<svg/>')
    } finally {
        cleanup()
    }
})

test('a guide that would overwrite a page from FlowFuse/flowfuse fails the build', () => {
    const { root, nuxtRoot, contentDocsDir, cleanup } = scratch()
    try {
        // The overlay runs after the product docs are copied in, so without this guard a
        // colliding guide would silently replace a docs page and the loss would only show
        // up as a page missing from production.
        write(join(root, GUIDES_SOURCE, 'user/concepts.md'), '# Concepts\n')
        write(join(contentDocsDir, 'user/concepts.md'), '# Concepts from flowfuse\n')

        assert.throws(
            () => syncGuides({ repoRoot: root, nuxtRoot, logger: silent }),
            /collide with pages from FlowFuse\/flowfuse/
        )
    } finally {
        cleanup()
    }
})

test('a missing guides directory is reported, not fatal', () => {
    const { root, nuxtRoot, cleanup } = scratch()
    try {
        assert.deepEqual(syncGuides({ repoRoot: root, nuxtRoot, logger: silent }), { count: 0 })
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
