// Resolves the FlowFuse Blueprint Library for a build and copies it into
// nuxt/content/blueprints (the markdown) and nuxt/public/blueprints (the screenshots and
// flow exports). Kept free of Nuxt imports so `node --test` can exercise it directly.
//
// This replaces scripts/copy_blueprints.js, which wrote into src/blueprints/ for 11ty.
// The library is a separate, private repository, so unlike the product docs there is no
// clone fallback: a contributor without access to FlowFuse/blueprint-library cannot
// produce these pages, and pretending otherwise would fail the build for them.
//
// Instead the last resort is the tree already sitting in nuxt/content/blueprints. The
// `Build Site` workflow checks the library out beside this repo, runs this sync and
// force-commits its output to the `live` branch that Netlify deploys, so on a production
// build the pages are already present and there is nothing to resolve. A local checkout
// without the library gets that same committed tree, or an empty library and a warning.

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

import { assetBaseFor, processBlueprint } from './blueprints-markdown.mjs'

// Whatever checkout sits next to the website repo wins, which is where the Build Site
// workflow puts it.
export const SIBLING_PATHS = ['../blueprint-library']

// What a blueprint directory is allowed to publish. Everything production served came
// down to screenshots and the flow export; an allowlist keeps a stray file in the library
// from being republished from flowfuse.com by accident. `package.json` carries each
// blueprint's Node-RED dependencies and is deliberately not one of them.
const ASSET_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.json'])
const ASSET_DENYLIST = new Set(['package.json', 'package-lock.json'])

export const MANIFEST_FILE = '.source.json'

/**
 * Decide where the blueprints come from. Pure: touches nothing but `exists`, so the
 * precedence is testable.
 *
 * 1. `FLOWFUSE_BLUEPRINTS_LOCAL` - an explicit checkout path
 * 2. a sibling checkout of blueprint-library
 * 3. nothing, in which case the caller keeps the tree it already has
 */
export function resolveSource ({ repoRoot, env = process.env, exists = existsSync }) {
    const local = env.FLOWFUSE_BLUEPRINTS_LOCAL
    if (local) {
        // A typo here would otherwise fall through to the committed tree and quietly
        // publish yesterday's blueprints while looking like it honoured the variable.
        if (!exists(local)) {
            throw new Error(`FLOWFUSE_BLUEPRINTS_LOCAL is set but ${local} does not exist`)
        }
        return { kind: 'local', libraryDir: local }
    }

    for (const sibling of SIBLING_PATHS) {
        const libraryDir = join(repoRoot, sibling)
        if (exists(libraryDir)) {
            return { kind: 'sibling', libraryDir }
        }
    }

    return { kind: 'prebuilt' }
}

function gitOutput (cwd, args) {
    try {
        return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
    } catch {
        return ''
    }
}

function isAsset (name) {
    if (ASSET_DENYLIST.has(name)) return false
    const dot = name.lastIndexOf('.')
    return dot > 0 && ASSET_EXTENSIONS.has(name.slice(dot).toLowerCase())
}

/**
 * A blueprint is `<category>/<slug>/README.md`. Directory names are lower-cased on the way
 * out, as copy_blueprints.js did, so the published URL never depends on how the directory
 * happened to be capitalised in the library.
 */
function collectSourceBlueprints (libraryDir) {
    const found = []
    for (const category of readdirSync(libraryDir, { withFileTypes: true })) {
        if (!category.isDirectory() || category.name.startsWith('.')) continue
        for (const slug of readdirSync(join(libraryDir, category.name), { withFileTypes: true })) {
            if (!slug.isDirectory() || slug.name.startsWith('.')) continue
            if (!existsSync(join(libraryDir, category.name, slug.name, 'README.md'))) continue
            found.push({
                sourceDir: join(category.name, slug.name),
                category: category.name.toLowerCase(),
                slug: slug.name.toLowerCase(),
            })
        }
    }
    return found
}

function copyAssets ({ libraryDir, sourceDir, destDir, relDir = '' }) {
    for (const entry of readdirSync(join(libraryDir, sourceDir, relDir), { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue
        const relPath = join(relDir, entry.name)
        if (entry.isDirectory()) {
            copyAssets({ libraryDir, sourceDir, destDir, relDir: relPath })
        } else if (isAsset(entry.name)) {
            const destPath = join(destDir, relPath)
            mkdirSync(join(destPath, '..'), { recursive: true })
            cpSync(join(libraryDir, sourceDir, relPath), destPath)
        }
    }
}

function writeBlueprints ({ libraryDir, contentDir, publicDir }) {
    rmSync(contentDir, { recursive: true, force: true })
    rmSync(publicDir, { recursive: true, force: true })

    const entries = []
    for (const { sourceDir, category, slug } of collectSourceBlueprints(libraryDir)) {
        // Argument array, not a shell string: the path comes from directory names in the
        // source repo, so quoting it into a shell command would be an injection path.
        const updated = gitOutput(libraryDir, ['log', '-1', '--pretty=format:%ci', '--', join(sourceDir, 'README.md')])
        const raw = readFileSync(join(libraryDir, sourceDir, 'README.md'), 'utf8')

        const destPath = join(contentDir, category, `${slug}.md`)
        mkdirSync(join(destPath, '..'), { recursive: true })
        writeFileSync(destPath, processBlueprint(raw, { assetBase: assetBaseFor(category, slug), updated }), 'utf8')

        copyAssets({ libraryDir, sourceDir, destDir: join(publicDir, category, slug) })
        entries.push({ category, slug })
    }
    return entries.sort((a, b) => `${a.category}/${a.slug}`.localeCompare(`${b.category}/${b.slug}`))
}

/** What is already on disk, for the case where no library checkout is available. */
export function collectPublishedBlueprints (contentDir) {
    if (!existsSync(contentDir)) return []
    const entries = []
    for (const category of readdirSync(contentDir, { withFileTypes: true })) {
        if (!category.isDirectory() || category.name.startsWith('.')) continue
        for (const file of readdirSync(join(contentDir, category.name))) {
            if (file.endsWith('.md')) entries.push({ category: category.name, slug: basename(file, '.md') })
        }
    }
    return entries.sort((a, b) => `${a.category}/${a.slug}`.localeCompare(`${b.category}/${b.slug}`))
}

/**
 * Populate nuxt/content/blueprints and nuxt/public/blueprints, and return a manifest
 * describing what was published.
 */
export function syncBlueprints ({ repoRoot, nuxtRoot, env = process.env, logger = console } = {}) {
    const contentDir = join(nuxtRoot, 'content', 'blueprints')
    const publicDir = join(nuxtRoot, 'public', 'blueprints')
    const source = resolveSource({ repoRoot, env })

    if (source.kind === 'prebuilt') {
        const entries = collectPublishedBlueprints(contentDir)
        logger.info(`No blueprint-library checkout found; using the ${entries.length} blueprint page(s) already in nuxt/content/blueprints`)
        return { source: source.kind, ref: '', sha: '', entries }
    }

    logger.info(`Using ${source.kind} blueprints from ${source.libraryDir}`)
    const entries = writeBlueprints({ libraryDir: source.libraryDir, contentDir, publicDir })

    const manifest = {
        source: source.kind,
        ref: gitOutput(source.libraryDir, ['rev-parse', '--abbrev-ref', 'HEAD']),
        sha: gitOutput(source.libraryDir, ['rev-parse', 'HEAD']),
        syncedAt: new Date().toISOString(),
        count: entries.length,
    }
    writeFileSync(join(contentDir, MANIFEST_FILE), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

    logger.info(`Blueprints synced from ${manifest.source} (${manifest.ref || 'unknown'} ${manifest.sha.slice(0, 8) || 'unknown'}): ${entries.length} page(s)`)
    return { ...manifest, entries }
}
