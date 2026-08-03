import { test } from 'node:test'
import assert from 'node:assert/strict'

import { MANIFEST_FILE, resolveSource } from './docs-sync.mjs'

const repoRoot = '/repo/website'
const contentDocsDir = '/repo/website/nuxt/content/docs'

const resolve = (env, present = []) => resolveSource({
    repoRoot,
    contentDocsDir,
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

test('a sibling checkout wins over a committed snapshot', () => {
    const source = resolve(
        { FLOWFUSE_DOCS_SNAPSHOT: '1' },
        ['/repo/flowfuse/docs', `${contentDocsDir}/${MANIFEST_FILE}`],
    )

    assert.equal(source.kind, 'sibling')
})

test('the committed snapshot is used when a build asks for it', () => {
    const source = resolve({ FLOWFUSE_DOCS_SNAPSHOT: '1' }, [`${contentDocsDir}/${MANIFEST_FILE}`])

    assert.deepEqual(source, { kind: 'snapshot' })
})

test('a snapshot left on disk is ignored unless the build asks for it', () => {
    const source = resolve({}, [`${contentDocsDir}/${MANIFEST_FILE}`])

    assert.equal(source.kind, 'clone')
})

test('cloning falls back to main and honours an explicit ref', () => {
    assert.deepEqual(resolve({}), { kind: 'clone', ref: 'main' })
    assert.equal(resolve({ FLOWFUSE_DOCS_REF: 'maintenance' }).ref, 'maintenance')
})
