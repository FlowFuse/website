// Resolves the FlowFuse blueprint library for a build and copies its content into
// src/blueprints (11ty's blueprint source - see .eleventy.js's setUseGitIgnore(false)
// note). Mirrors nuxt/lib/docs-sync.mjs's local -> sibling -> clone precedence, but the
// source repo (FlowFuse/blueprint-library) is private, so the clone step authenticates
// with a minted GitHub App installation token instead of cloning anonymously.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, cpSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { tmpdir } from 'node:os'

// Imported lazily (inside cloneBlueprints, not here) because it pulls in @octokit/auth-app.
// CI checks out blueprint-library as a sibling and calls `npm run blueprints` before
// `npm install` runs - see nuxt/lib/docs-sync.mjs's own note on staying dependency-free -
// so a static import here would crash a build that never even takes the clone path. Only
// Netlify's production build (no sibling checkout) reaches the clone path, and by then
// npm install has already completed.

const REPO_OWNER = 'FlowFuse'
const REPO_NAME = 'blueprint-library'
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}.git`
const DEFAULT_REF = 'main'
const CLONE_ATTEMPTS = 3
const CLONE_BACKOFF_MS = 2000

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Decide where the blueprints come from. Pure: touches nothing, so the precedence is
 * testable.
 *
 * 1. `BLUEPRINTS_LOCAL` - an explicit checkout path
 * 2. a sibling checkout of blueprint-library
 * 3. a clone, authenticated with the GitHub App - only if credentials are configured
 * 4. skip - matches the previous copy_blueprints.js behaviour for contributors without
 *    access to the (private) blueprint-library repo
 */
export function resolveSource ({ repoRoot, env = process.env, exists = existsSync }) {
    const local = env.BLUEPRINTS_LOCAL
    if (local) {
        if (!exists(local)) {
            throw new Error(`BLUEPRINTS_LOCAL is set but ${local} does not exist`)
        }
        return { kind: 'local', dir: local }
    }

    const sibling = join(repoRoot, '..', 'blueprint-library')
    if (exists(sibling)) {
        return { kind: 'sibling', dir: sibling }
    }

    if (env.GH_BOT_APP_ID && env.GH_BOT_APP_KEY) {
        return { kind: 'clone', ref: env.BLUEPRINTS_REF || DEFAULT_REF }
    }

    return { kind: 'skip' }
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
    const token = await mintInstallationToken({
        appId: env.GH_BOT_APP_ID,
        privateKey: env.GH_BOT_APP_KEY,
        owner: REPO_OWNER,
        repo: REPO_NAME,
    })
    const authedUrl = REPO_URL.replace('https://', `https://x-access-token:${token}@`)
    const redact = (text) => text.split(token).join('***')

    let lastMessage = 'unknown error'
    for (let attempt = 1; attempt <= CLONE_ATTEMPTS; attempt++) {
        const tmpDir = join(tmpdir(), `blueprint-library-${process.pid}-${attempt}`)
        if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })

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

/**
 * Copy one blueprint markdown file, stamping it with its last-commit date and rewriting
 * its `image:` frontmatter path to match where it lands under src/blueprints. Ported
 * as-is from the previous scripts/copy_blueprints.js.
 */
function writeBlueprintMarkdown ({ sourceRoot, srcPath, destPath, inputRelDir }) {
    const relPath = relative(sourceRoot, srcPath)
    const updated = gitOutput(sourceRoot, ['log', '-1', '--pretty=format:%ci', '--', relPath])

    const content = readFileSync(srcPath, 'utf8')
    let body = `---\nupdated: ${updated}\n---\n${content}`
    if (/^---/.test(content)) {
        // The original file starts with yaml front-matter, so remove the double-delimiter
        // we've just introduced.
        body = body.replace(/---\r?\n---\r?\n/s, '')
    }

    // tileImage's shortcode (.eleventy.js) resolves item.data.image relative to 11ty's
    // input folder (src/), not as a filesystem or site-root path - so this stays relative,
    // e.g. "blueprints/foo/bar/img.png", never "src/blueprints/..." or "/blueprints/...".
    const imageRegex = /^image:\s*(\S.+)$/m
    if (imageRegex.test(body)) {
        body = body.replace(imageRegex, (match, p1) => {
            const relImage = p1.replace(/^"\.\//, '').replace(/"$/, '')
            return `image: ${join(inputRelDir, relImage)}`
        })
    }

    writeFileSync(destPath, body)
}

function copyTree (srcDir, destDir, sourceRoot, inputRelDir) {
    mkdirSync(destDir, { recursive: true })
    for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue

        const srcPath = join(srcDir, entry.name)
        if (entry.isDirectory()) {
            const lowerCaseName = entry.name.toLowerCase()
            copyTree(srcPath, join(destDir, lowerCaseName), sourceRoot, join(inputRelDir, lowerCaseName))
            continue
        }

        const destPath = join(destDir, entry.name.replace(/README/, 'index'))
        if (entry.name.endsWith('.md')) {
            writeBlueprintMarkdown({ sourceRoot, srcPath, destPath, inputRelDir })
        } else {
            cpSync(srcPath, destPath)
        }
    }
}

/**
 * Populate src/blueprints from `dir` (one folder per blueprint) and return the manifest
 * describing what was published.
 */
function writeBlueprints ({ dir, websiteRoot, kind, ref }) {
    const destRoot = join(websiteRoot, 'src', 'blueprints')

    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (!entry.isDirectory() || entry.name.startsWith('.')) continue
        const srcDir = join(dir, entry.name)
        copyTree(srcDir, join(destRoot, basename(srcDir)), dir, join('blueprints', basename(srcDir)))
    }

    return {
        source: kind,
        ref: ref || gitOutput(dir, ['rev-parse', '--abbrev-ref', 'HEAD']),
        sha: gitOutput(dir, ['rev-parse', 'HEAD']),
        syncedAt: new Date().toISOString(),
    }
}

/**
 * Populate src/blueprints and return the manifest describing what was published, or null
 * if there was no source to sync from (matches the previous copy_blueprints.js's
 * "skipping" behaviour for contributors without access to blueprint-library).
 */
export async function syncBlueprints ({ repoRoot, env = process.env, logger = console } = {}) {
    const source = resolveSource({ repoRoot, env })

    if (source.kind === 'skip') {
        logger.info('Blueprint library not found and no GH_BOT_APP_ID/GH_BOT_APP_KEY configured - skipping')
        return null
    }

    let manifest
    if (source.kind === 'clone') {
        logger.info(`Cloning ${REPO_OWNER}/${REPO_NAME} from ${source.ref}...`)
        const tmpDir = await cloneBlueprints(source.ref, env, logger)
        try {
            manifest = writeBlueprints({ dir: tmpDir, websiteRoot: repoRoot, kind: source.kind, ref: source.ref })
        } finally {
            if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })
        }
    } else {
        logger.info(`Using ${source.kind} blueprints from ${source.dir}`)
        manifest = writeBlueprints({ dir: source.dir, websiteRoot: repoRoot, kind: source.kind })
    }

    logger.info(`Blueprints synced from ${manifest.source} (${manifest.ref} ${manifest.sha.slice(0, 8) || 'unknown'})`)
    return manifest
}
