import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { collectPublishedBlueprints, resolveSource, syncBlueprints } from './blueprints-sync.mjs'

const repoRoot = '/repo/website'

const resolve = (env, present = []) => resolveSource({
    repoRoot,
    env,
    exists: (path) => present.includes(path),
})

test('an explicit path wins over a sibling checkout', () => {
    const source = resolve(
        { FLOWFUSE_BLUEPRINTS_LOCAL: '/elsewhere/blueprint-library' },
        ['/elsewhere/blueprint-library', '/repo/blueprint-library'],
    )

    assert.deepEqual(source, { kind: 'local', libraryDir: '/elsewhere/blueprint-library' })
})

test('a mistyped explicit path throws rather than falling back', () => {
    assert.throws(
        () => resolve({ FLOWFUSE_BLUEPRINTS_LOCAL: '/typo' }, ['/repo/blueprint-library']),
        /FLOWFUSE_BLUEPRINTS_LOCAL is set but/,
    )
})

test('a sibling checkout is used when no path is set', () => {
    const source = resolve({}, ['/repo/blueprint-library'])
    assert.deepEqual(source, { kind: 'sibling', libraryDir: '/repo/blueprint-library' })
})

// The library is private, so there is no clone fallback: a checkout without it keeps
// whatever pages the build workflow already committed.
test('no checkout anywhere falls back to the published tree', () => {
    assert.deepEqual(resolve({}, []), { kind: 'prebuilt' })
})

function withTempDirs (run) {
    const root = mkdtempSync(join(tmpdir(), 'blueprints-sync-'))
    try {
        run(root)
    } finally {
        rmSync(root, { recursive: true, force: true })
    }
}

const silentLogger = { info () {}, warn () {} }

function writeLibrary (libraryDir) {
    mkdirSync(join(libraryDir, 'manufacturing', 'oee-calculator', 'images'), { recursive: true })
    writeFileSync(join(libraryDir, 'manufacturing', 'oee-calculator', 'README.md'), [
        '---',
        'title: OEE Calculator',
        'image: "./oee-calculator.png"',
        'layout: layouts/blueprint.njk',
        'blueprintId: PaRL4JNeBM',
        '---',
        '![flow](./images/flow.png)',
        '',
    ].join('\n'))
    writeFileSync(join(libraryDir, 'manufacturing', 'oee-calculator', 'oee-calculator.png'), 'png')
    writeFileSync(join(libraryDir, 'manufacturing', 'oee-calculator', 'images', 'flow.png'), 'png')
    writeFileSync(join(libraryDir, 'manufacturing', 'oee-calculator', 'flow.json'), '{}')
    writeFileSync(join(libraryDir, 'manufacturing', 'oee-calculator', 'package.json'), '{}')
    // A category directory holding no README is not a blueprint.
    mkdirSync(join(libraryDir, 'other', 'work-in-progress'), { recursive: true })
}

test('syncBlueprints publishes the markdown, its assets and nothing else', () => {
    withTempDirs((root) => {
        const libraryDir = join(root, 'blueprint-library')
        const nuxtRoot = join(root, 'website', 'nuxt')
        writeLibrary(libraryDir)

        const manifest = syncBlueprints({
            repoRoot: join(root, 'website'),
            nuxtRoot,
            env: { FLOWFUSE_BLUEPRINTS_LOCAL: libraryDir },
            logger: silentLogger,
        })

        assert.equal(manifest.source, 'local')
        assert.deepEqual(manifest.entries, [{ category: 'manufacturing', slug: 'oee-calculator' }])

        const page = readFileSync(join(nuxtRoot, 'content', 'blueprints', 'manufacturing', 'oee-calculator.md'), 'utf8')
        assert.match(page, /^image: \/blueprints\/manufacturing\/oee-calculator\/oee-calculator\.png$/m)
        assert.match(page, /!\[flow\]\(\/blueprints\/manufacturing\/oee-calculator\/images\/flow\.png\)/)
        assert.doesNotMatch(page, /layout:/)
        assert.match(page, /^updated: /m)

        const publicDir = join(nuxtRoot, 'public', 'blueprints', 'manufacturing', 'oee-calculator')
        assert.ok(existsSync(join(publicDir, 'oee-calculator.png')))
        assert.ok(existsSync(join(publicDir, 'images', 'flow.png')))
        assert.ok(existsSync(join(publicDir, 'flow.json')))
        assert.ok(!existsSync(join(publicDir, 'package.json')))
    })
})

test('syncBlueprints replaces a page that has gone from the library', () => {
    withTempDirs((root) => {
        const libraryDir = join(root, 'blueprint-library')
        const nuxtRoot = join(root, 'website', 'nuxt')
        writeLibrary(libraryDir)

        const stale = join(nuxtRoot, 'content', 'blueprints', 'other', 'retired.md')
        mkdirSync(join(stale, '..'), { recursive: true })
        writeFileSync(stale, '---\ntitle: Retired\n---\n')

        syncBlueprints({
            repoRoot: join(root, 'website'),
            nuxtRoot,
            env: { FLOWFUSE_BLUEPRINTS_LOCAL: libraryDir },
            logger: silentLogger,
        })

        assert.ok(!existsSync(stale))
    })
})

test('syncBlueprints keeps the published tree when no library is available', () => {
    withTempDirs((root) => {
        const nuxtRoot = join(root, 'website', 'nuxt')
        const contentDir = join(nuxtRoot, 'content', 'blueprints')
        mkdirSync(join(contentDir, 'other'), { recursive: true })
        writeFileSync(join(contentDir, 'other', 'mobile-alerting.md'), '---\ntitle: Mobile Alerting\n---\n')

        const manifest = syncBlueprints({
            repoRoot: join(root, 'website'),
            nuxtRoot,
            env: {},
            logger: silentLogger,
        })

        assert.equal(manifest.source, 'prebuilt')
        assert.deepEqual(manifest.entries, [{ category: 'other', slug: 'mobile-alerting' }])
        assert.ok(existsSync(join(contentDir, 'other', 'mobile-alerting.md')))
    })
})

test('collectPublishedBlueprints reports nothing for a tree that was never written', () => {
    assert.deepEqual(collectPublishedBlueprints('/nonexistent/content/blueprints'), [])
})
