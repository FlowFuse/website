// Resolves the FlowFuse Blueprint Library for a build and copies it into
// nuxt/content/blueprints (the markdown) and nuxt/public/blueprints (the screenshots and
// flow exports). Kept free of Nuxt imports so `node --test` can exercise it directly.
//
// This replaces scripts/copy_blueprints.mjs, which wrote into src/blueprints/ for 11ty.
// The library is a separate, private repository, so the clone step authenticates with a
// minted GitHub App installation token rather than cloning anonymously - the same path
// nuxt/lib/docs-sync.mjs takes for the public docs repo, with credentials added.
//
// Precedence is local -> sibling -> clone -> whatever is already on disk. That last case
// is a contributor without access to FlowFuse/blueprint-library: the build continues and
// /blueprints/ is empty rather than failing for them. A production deploy has the App
// credentials and so always reaches the clone, which is why an empty result there is
// fatal (see nuxt/modules/blueprints-source.ts).

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
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

const REPO_OWNER = 'FlowFuse'
const REPO_NAME = 'blueprint-library'
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}.git`
const DEFAULT_REF = 'main'
const CLONE_ATTEMPTS = 3
const CLONE_BACKOFF_MS = 2000

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const MANIFEST_FILE = '.source.json'

/**
 * Decide where the blueprints come from. Pure: touches nothing but `exists`, so the
 * precedence is testable.
 *
 * 1. `FLOWFUSE_BLUEPRINTS_LOCAL` - an explicit checkout path
 * 2. a sibling checkout of blueprint-library
 * 3. an authenticated clone, when the GitHub App credentials are configured
 * 4. nothing, in which case the caller keeps the tree it already has
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

    // Only a build with the App credentials can reach the private library; everyone else
    // falls through to whatever is already on disk.
    if (env.GH_BOT_APP_ID && env.GH_BOT_APP_KEY) {
        return { kind: 'clone', ref: env.BLUEPRINTS_REF || DEFAULT_REF }
    }

    return { kind: 'prebuilt' }
}

/**
 * Sparse-clone the blueprint library into a temp dir and return its path.
 *
 * A transient network failure here would otherwise fail the entire production deploy, so
 * each attempt gets a clean temp dir and the network steps are retried with backoff. The
 * caller owns cleanup of the returned dir. Never let the minted token reach a thrown
 * error's message - execFileSync embeds the full command (URL included) in its own
 * error, so failures are reported from stderr text with the token stripped out.
 */
async function cloneBlueprints (ref, env, logger) {
    const { mintInstallationToken } = await import('./github-app-token.mjs')

    let lastMessage = 'unknown error'
    for (let attempt = 1; attempt <= CLONE_ATTEMPTS; attempt++) {
        const tmpDir = join(tmpdir(), `blueprint-library-${process.pid}-${attempt}`)
        if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })

        // Minted fresh each attempt so a transient failure here gets the same retry +
        // redaction as the clone/checkout below, rather than failing the build outright.
        let token
        try {
            token = await mintInstallationToken({
                appId: env.GH_BOT_APP_ID,
                privateKey: env.GH_BOT_APP_KEY,
                owner: REPO_OWNER,
                repo: REPO_NAME,
            })
        } catch (err) {
            lastMessage = err?.message || String(err)
            if (attempt === CLONE_ATTEMPTS) break

            const wait = CLONE_BACKOFF_MS * attempt
            logger.warn(`Blueprint token mint attempt ${attempt}/${CLONE_ATTEMPTS} failed, retrying in ${wait}ms`)
            await sleep(wait)
            continue
        }

        const authedUrl = REPO_URL.replace('https://', `https://x-access-token:${token}@`)
        const redact = (text) => text.split(token).join('***')

        try {
            // Blobless but not shallow: dating a blueprint page needs that page's history,
            // and a --depth=1 clone stamps every page with the same commit date.
            execFileSync('git', ['clone', '--filter=blob:none', '--no-checkout', authedUrl, tmpDir], { stdio: 'pipe' })
            execFileSync('git', ['checkout', ref], { cwd: tmpDir, stdio: 'pipe' })
            return tmpDir
        } catch (err) {
            lastMessage = redact(err?.stderr?.toString() || err?.message || String(err))
            if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })

            if (attempt === CLONE_ATTEMPTS) break

            const wait = CLONE_BACKOFF_MS * attempt
            logger.warn(`Blueprint clone attempt ${attempt}/${CLONE_ATTEMPTS} failed, retrying in ${wait}ms`)
            await sleep(wait)
        }
    }

    throw new Error(`Failed to clone ${REPO_OWNER}/${REPO_NAME} after ${CLONE_ATTEMPTS} attempts: ${lastMessage}`)
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
function collectSourceBlueprints (libraryDir, skipped = []) {
    const found = []
    for (const category of readdirSync(libraryDir, { withFileTypes: true })) {
        if (!category.isDirectory() || category.name.startsWith('.')) continue
        for (const slug of readdirSync(join(libraryDir, category.name), { withFileTypes: true })) {
            if (!slug.isDirectory() || slug.name.startsWith('.')) continue
            // A directory with no README.md is not a blueprint page. Record it: a rename
            // upstream (README.markdown, readme.md on a case-sensitive runner) looks exactly
            // like this and would otherwise drop a live page with nothing in the log.
            if (!existsSync(join(libraryDir, category.name, slug.name, 'README.md'))) {
                skipped.push(join(category.name, slug.name))
                continue
            }
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

function writeBlueprints ({ libraryDir, contentDir, publicDir, skipped = [] }) {
    const sources = collectSourceBlueprints(libraryDir, skipped)

    rmSync(contentDir, { recursive: true, force: true })
    rmSync(publicDir, { recursive: true, force: true })
    // Only the per-blueprint loop below recreates contentDir, so a library that resolves but
    // holds nothing would leave the manifest write with nowhere to go - a raw ENOENT, after
    // the committed trees are already gone, instead of the "no blueprints" report the
    // callers are written to give.
    mkdirSync(contentDir, { recursive: true })

    const entries = []
    for (const { sourceDir, category, slug } of sources) {
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
/**
 * Write one resolved checkout into nuxt/content/blueprints and nuxt/public/blueprints.
 * Split out of syncBlueprints so the cloned and already-on-disk routes share it.
 */
function publish ({ libraryDir, kind, contentDir, publicDir, logger }) {

    // What the last sync published, read before writeBlueprints clears the tree. The
    // workflow commits whatever is on disk afterwards, so a library that resolves but is
    // incomplete would quietly unpublish live pages on a green build. Only zero entries is
    // fatal (modules/blueprints-source.ts), so a shrink has to be visible in the log.
    const published = collectPublishedBlueprints(contentDir)

    const skipped = []
    const entries = writeBlueprints({ libraryDir: libraryDir, contentDir, publicDir, skipped })

    if (skipped.length) {
        logger.warn(`Skipped ${skipped.length} director(ies) under ${libraryDir} with no README.md: ${skipped.join(', ')}`)
    }
    const synced = new Set(entries.map(({ category, slug }) => `${category}/${slug}`))
    const dropped = published
        .map(({ category, slug }) => `${category}/${slug}`)
        .filter(key => !synced.has(key))
    if (dropped.length) {
        logger.warn(`${dropped.length} blueprint page(s) published before are not in this sync and will be unpublished: ${dropped.join(', ')}`)
    }

    const manifest = {
        source: kind,
        ref: gitOutput(libraryDir, ['rev-parse', '--abbrev-ref', 'HEAD']),
        sha: gitOutput(libraryDir, ['rev-parse', 'HEAD']),
        syncedAt: new Date().toISOString(),
        count: entries.length,
    }
    writeFileSync(join(contentDir, MANIFEST_FILE), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

    logger.info(`Blueprints synced from ${manifest.source} (${manifest.ref || 'unknown'} ${manifest.sha.slice(0, 8) || 'unknown'}): ${entries.length} page(s)`)
    return { ...manifest, entries }
}

/**
 * Populate nuxt/content/blueprints and nuxt/public/blueprints, and return a manifest
 * describing what was published.
 *
 * Async because the clone route awaits a minted installation token; the callers in
 * scripts/sync_blueprints.mjs and nuxt/modules/blueprints-source.ts await it.
 */
export async function syncBlueprints ({ repoRoot, nuxtRoot, env = process.env, logger = console } = {}) {
    const contentDir = join(nuxtRoot, 'content', 'blueprints')
    const publicDir = join(nuxtRoot, 'public', 'blueprints')
    const source = resolveSource({ repoRoot, env })

    if (source.kind === 'prebuilt') {
        const entries = collectPublishedBlueprints(contentDir)
        logger.info(`No blueprint-library checkout found; using the ${entries.length} blueprint page(s) already in nuxt/content/blueprints`)
        // The two trees are committed together by the Build Site workflow. Pages without
        // their screenshots would build and deploy silently, showing broken images on
        // every blueprint, so say so here rather than leave it to be noticed on the site.
        if (entries.length && !existsSync(publicDir)) {
            logger.warn(`${entries.length} blueprint page(s) are published but ${publicDir} is missing, so their screenshots will 404`)
        }
        return { source: source.kind, ref: '', sha: '', entries }
    }

    if (source.kind === 'clone') {
        logger.info(`Cloning ${REPO_OWNER}/${REPO_NAME} from ${source.ref}...`)
        const tmpDir = await cloneBlueprints(source.ref, env, logger)
        try {
            return publish({ libraryDir: tmpDir, kind: source.kind, contentDir, publicDir, logger })
        } finally {
            // The clone is a few hundred MB of blobless history; a build that runs this
            // twice would otherwise leave both copies behind in the runner's tmp.
            if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })
        }
    }

    logger.info(`Using ${source.kind} blueprints from ${source.libraryDir}`)
    return publish({ libraryDir: source.libraryDir, kind: source.kind, contentDir, publicDir, logger })
}
