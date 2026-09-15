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
test('the App credentials route to a clone, ahead of the published tree', () => {
    assert.deepEqual(
        resolveSource({
            repoRoot: '/repo',
            env: { GH_BOT_APP_ID: 'id', GH_BOT_APP_KEY: 'key' },
            exists: () => false,
        }),
        { kind: 'clone', ref: 'main' },
    )
})

test('BLUEPRINTS_REF picks the ref the clone checks out', () => {
    assert.equal(
        resolveSource({
            repoRoot: '/repo',
            env: { GH_BOT_APP_ID: 'id', GH_BOT_APP_KEY: 'key', BLUEPRINTS_REF: 'staging' },
            exists: () => false,
        }).ref,
        'staging',
    )
})

// A sibling checkout is cheaper and is what CI provides, so it must win even where the
// credentials are also present - otherwise every CI build would clone needlessly.
test('a sibling checkout wins over the App credentials', () => {
    assert.equal(
        resolveSource({
            repoRoot: '/repo',
            env: { GH_BOT_APP_ID: 'id', GH_BOT_APP_KEY: 'key' },
            exists: (path) => path === join('/repo', '..', 'blueprint-library'),
        }).kind,
        'sibling',
    )
})

test('no checkout anywhere falls back to the published tree', () => {
    assert.deepEqual(resolve({}, []), { kind: 'prebuilt' })
})

async function withTempDirs (run) {
    const root = mkdtempSync(join(tmpdir(), 'blueprints-sync-'))
    try {
        await run(root)
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

test('syncBlueprints publishes the markdown, its assets and nothing else', async () => {
    await withTempDirs(async (root) => {
        const libraryDir = join(root, 'blueprint-library')
        const nuxtRoot = join(root, 'website', 'nuxt')
        writeLibrary(libraryDir)

        const manifest = await syncBlueprints({
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
        // The fixture is a plain directory, not a git checkout, so there is no date to
        // record and the key is left out entirely rather than written empty. See
        // injectUpdated in blueprints-markdown.mjs for why that matters.
        assert.doesNotMatch(page, /^updated:/m)

        const publicDir = join(nuxtRoot, 'public', 'blueprints', 'manufacturing', 'oee-calculator')
        assert.ok(existsSync(join(publicDir, 'oee-calculator.png')))
        assert.ok(existsSync(join(publicDir, 'images', 'flow.png')))
        assert.ok(existsSync(join(publicDir, 'flow.json')))
        assert.ok(!existsSync(join(publicDir, 'package.json')))
    })
})

test('syncBlueprints replaces a page that has gone from the library', async () => {
    await withTempDirs(async (root) => {
        const libraryDir = join(root, 'blueprint-library')
        const nuxtRoot = join(root, 'website', 'nuxt')
        writeLibrary(libraryDir)

        const stale = join(nuxtRoot, 'content', 'blueprints', 'other', 'retired.md')
        mkdirSync(join(stale, '..'), { recursive: true })
        writeFileSync(stale, '---\ntitle: Retired\n---\n')

        await syncBlueprints({
            repoRoot: join(root, 'website'),
            nuxtRoot,
            env: { FLOWFUSE_BLUEPRINTS_LOCAL: libraryDir },
            logger: silentLogger,
        })

        assert.ok(!existsSync(stale))
    })
})

test('syncBlueprints keeps the published tree when no library is available', async () => {
    await withTempDirs(async (root) => {
        const nuxtRoot = join(root, 'website', 'nuxt')
        const contentDir = join(nuxtRoot, 'content', 'blueprints')
        mkdirSync(join(contentDir, 'other'), { recursive: true })
        writeFileSync(join(contentDir, 'other', 'mobile-alerting.md'), '---\ntitle: Mobile Alerting\n---\n')

        const manifest = await syncBlueprints({
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

test('syncBlueprints warns when the published pages have no screenshots beside them', async () => {
    await withTempDirs(async (root) => {
        const nuxtRoot = join(root, 'website', 'nuxt')
        const contentDir = join(nuxtRoot, 'content', 'blueprints')
        mkdirSync(join(contentDir, 'other'), { recursive: true })
        writeFileSync(join(contentDir, 'other', 'mobile-alerting.md'), '---\ntitle: Mobile Alerting\n---\n')

        const warnings = []
        await syncBlueprints({
            repoRoot: join(root, 'website'),
            nuxtRoot,
            env: {},
            logger: { info () {}, warn: (message) => warnings.push(message) },
        })

        assert.equal(warnings.length, 1)
        assert.match(warnings[0], /screenshots will 404/)
    })
})

// The Build Site workflow commits whatever the sync leaves on disk and force-pushes it, so
// an incomplete library unpublishes live pages on a green build. Only zero entries is fatal,
// which makes the log the one place a shrink can show up.
test('syncBlueprints names the pages a shrunken library would unpublish', async () => {
    await withTempDirs(async (root) => {
        const nuxtRoot = join(root, 'website', 'nuxt')
        const contentDir = join(nuxtRoot, 'content', 'blueprints')
        mkdirSync(join(contentDir, 'other'), { recursive: true })
        writeFileSync(join(contentDir, 'other', 'mobile-alerting.md'), '---\ntitle: Mobile Alerting\n---\n')

        const libraryDir = join(root, 'blueprint-library')
        writeLibrary(libraryDir)

        const warnings = []
        await syncBlueprints({
            repoRoot: join(root, 'website'),
            nuxtRoot,
            env: { FLOWFUSE_BLUEPRINTS_LOCAL: libraryDir },
            logger: { info () {}, warn: (message) => warnings.push(message) },
        })

        assert.equal(warnings.length, 2)
        assert.ok(warnings.some(message => /will be unpublished: other\/mobile-alerting/.test(message)))
    })
})

// A README renamed upstream looks identical to a directory that was never a blueprint.
test('syncBlueprints names a library directory it skipped for a missing README', async () => {
    await withTempDirs(async (root) => {
        const nuxtRoot = join(root, 'website', 'nuxt')
        const libraryDir = join(root, 'blueprint-library')
        writeLibrary(libraryDir)
        // A blueprint directory whose README has been renamed away upstream. Named rather
        // than lowercased, because a case-insensitive filesystem would still find readme.md.
        mkdirSync(join(libraryDir, 'manufacturing', 'downtime-tracker'), { recursive: true })
        writeFileSync(join(libraryDir, 'manufacturing', 'downtime-tracker', 'index.md'), '# Downtime\n')

        const warnings = []
        await syncBlueprints({
            repoRoot: join(root, 'website'),
            nuxtRoot,
            env: { FLOWFUSE_BLUEPRINTS_LOCAL: libraryDir },
            logger: { info () {}, warn: (message) => warnings.push(message) },
        })

        assert.equal(warnings.length, 1)
        assert.match(warnings[0], /manufacturing\/downtime-tracker/)
        assert.match(warnings[0], /other\/work-in-progress/)
    })
})

// An empty-but-present library is what a stale or half-finished checkout looks like. It has
// to reach the callers as zero entries, which is what they are written to report on, rather
// than as an ENOENT from writing the manifest into a directory the sync just deleted.
test('syncBlueprints reports zero entries for a library that holds no blueprints', async () => {
    await withTempDirs(async (root) => {
        const libraryDir = join(root, 'blueprint-library')
        mkdirSync(libraryDir, { recursive: true })

        const manifest = await syncBlueprints({
            repoRoot: join(root, 'website'),
            nuxtRoot: join(root, 'website', 'nuxt'),
            env: { FLOWFUSE_BLUEPRINTS_LOCAL: libraryDir },
            logger: silentLogger,
        })

        assert.equal(manifest.source, 'local')
        assert.deepEqual(manifest.entries, [])
    })
})

test('collectPublishedBlueprints reports nothing for a tree that was never written', () => {
    assert.deepEqual(collectPublishedBlueprints('/nonexistent/content/blueprints'), [])
})
