import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { resolveSource, syncDocsPath } from './docs-sync.mjs'

const repoRoot = '/repo/website'

const resolve = (env, present = []) => resolveSource({
    repoRoot,
    env,
    exists: (path) => present.includes(path),
})

test('an explicit path wins over a sibling checkout', () => {
    const source = resolve(
        { FLOWFUSE_DOCS_LOCAL: '/elsewhere/flowfuse' },
        ['/elsewhere/flowfuse/docs', '/repo/flowfuse/docs'],
    )

    assert.deepEqual(source, { kind: 'local', docsDir: '/elsewhere/flowfuse/docs' })
})

test('an explicit path already ending in /docs is used as given', () => {
    const source = resolve(
        { FLOWFUSE_DOCS_LOCAL: '/elsewhere/flowfuse/docs' },
        ['/elsewhere/flowfuse/docs'],
    )

    assert.equal(source.docsDir, '/elsewhere/flowfuse/docs')
})

test('a mistyped explicit path throws rather than falling back', () => {
    assert.throws(
        () => resolve({ FLOWFUSE_DOCS_LOCAL: '/typo' }, ['/repo/flowfuse/docs']),
        /FLOWFUSE_DOCS_LOCAL is set but/,
    )
})

test('a sibling checkout is found without configuration', () => {
    const source = resolve({}, ['/repo/flowfuse/docs'])

    assert.deepEqual(source, { kind: 'sibling', docsDir: '/repo/flowfuse/docs' })
})

test('the dev-env checkout is preferred over a bare sibling', () => {
    const source = resolve({}, ['/repo/dev-env/packages/flowfuse/docs', '/repo/flowfuse/docs'])

    assert.equal(source.docsDir, '/repo/dev-env/packages/flowfuse/docs')
})

test('cloning falls back to main and honours an explicit ref', () => {
    assert.deepEqual(resolve({}), { kind: 'clone', ref: 'main' })
    assert.equal(resolve({ FLOWFUSE_DOCS_REF: 'maintenance' }).ref, 'maintenance')
})

// A flowfuse checkout next to a website checkout, as the dev watcher sees it. Outside a
// git repo, so the `git log` that dates a page returns nothing and the output is stable.
function fixture (t) {
    const root = mkdtempSync(join(tmpdir(), 'docs-sync-'))
    t.after(() => rmSync(root, { recursive: true, force: true }))

    const docsDir = join(root, 'flowfuse', 'docs')
    const nuxtRoot = join(root, 'website', 'nuxt')

    mkdirSync(join(docsDir, 'cloud'), { recursive: true })
    mkdirSync(join(nuxtRoot, 'content', 'docs'), { recursive: true })
    mkdirSync(join(nuxtRoot, 'public', 'docs'), { recursive: true })
    writeFileSync(join(root, 'flowfuse', 'package.json'), JSON.stringify({ version: '2.34.0' }))

    return {
        docsDir,
        nuxtRoot,
        content: (...parts) => join(nuxtRoot, 'content', 'docs', ...parts),
        public: (...parts) => join(nuxtRoot, 'public', 'docs', ...parts),
    }
}

test('an edited page is written with its provenance frontmatter', (t) => {
    const fx = fixture(t)
    writeFileSync(join(fx.docsDir, 'cloud', 'billing.md'), '# Billing\n')

    syncDocsPath({ docsDir: fx.docsDir, nuxtRoot: fx.nuxtRoot, relPath: 'cloud/billing.md' })

    const page = readFileSync(fx.content('cloud', 'billing.md'), 'utf8')
    assert.match(page, /^---\noriginalPath: cloud\/billing\.md\n/)
    assert.match(page, /^version: 2\.34\.0$/m)
    assert.match(page, /# Billing/)
})

test('a README becomes the index page of its section', (t) => {
    const fx = fixture(t)
    writeFileSync(join(fx.docsDir, 'cloud', 'README.md'), '# Cloud\n')

    syncDocsPath({ docsDir: fx.docsDir, nuxtRoot: fx.nuxtRoot, relPath: 'cloud/README.md' })

    assert.ok(existsSync(fx.content('cloud', 'index.md')))
    assert.ok(!existsSync(fx.content('cloud', 'README.md')))
})

test('a non-markdown file is copied to the public tree unchanged', (t) => {
    const fx = fixture(t)
    writeFileSync(join(fx.docsDir, 'cloud', 'diagram.svg'), '<svg/>')

    syncDocsPath({ docsDir: fx.docsDir, nuxtRoot: fx.nuxtRoot, relPath: 'cloud/diagram.svg' })

    assert.equal(readFileSync(fx.public('cloud', 'diagram.svg'), 'utf8'), '<svg/>')
    assert.ok(!existsSync(fx.content('cloud', 'diagram.svg')))
})

test('a deleted page is removed rather than left stale', (t) => {
    const fx = fixture(t)
    writeFileSync(fx.content('gone.md'), 'stale\n')

    syncDocsPath({ docsDir: fx.docsDir, nuxtRoot: fx.nuxtRoot, relPath: 'gone.md' })

    assert.ok(!existsSync(fx.content('gone.md')))
})

test('a deleted asset is removed from the public tree', (t) => {
    const fx = fixture(t)
    mkdirSync(fx.public('cloud'), { recursive: true })
    writeFileSync(fx.public('cloud', 'gone.png'), 'stale')

    syncDocsPath({ docsDir: fx.docsDir, nuxtRoot: fx.nuxtRoot, relPath: 'cloud/gone.png' })

    assert.ok(!existsSync(fx.public('cloud', 'gone.png')))
})

// The reason this function exists. Re-running the whole sync on every keystroke deletes and
// recreates all 130-odd pages, and @nuxt/content's dev watcher runs out of heap re-indexing
// them. One edit has to cost one write.
test('syncing one page leaves every other page untouched', (t) => {
    const fx = fixture(t)
    writeFileSync(join(fx.docsDir, 'first.md'), '# First\n')
    writeFileSync(join(fx.docsDir, 'second.md'), '# Second\n')
    writeFileSync(fx.content('first.md'), 'previously synced first\n')
    writeFileSync(fx.content('second.md'), 'previously synced second\n')

    syncDocsPath({ docsDir: fx.docsDir, nuxtRoot: fx.nuxtRoot, relPath: 'first.md' })

    assert.match(readFileSync(fx.content('first.md'), 'utf8'), /# First/)
    assert.equal(readFileSync(fx.content('second.md'), 'utf8'), 'previously synced second\n')
})
