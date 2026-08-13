// Resolves the FlowFuse product docs for a build and copies them into nuxt/content/docs.
// Kept free of Nuxt imports so `scripts/sync_docs.mjs` can run it before `npm install`.

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { tmpdir } from 'node:os'

import { processMarkdown } from './docs-markdown.mjs'

const REPO_URL = 'https://github.com/FlowFuse/flowfuse.git'
const DEFAULT_REF = 'main'
const CLONE_ATTEMPTS = 3
const CLONE_BACKOFF_MS = 2000

// Whatever checkout sits next to the website repo wins. CI puts the flowfuse repo there,
// so a build validates the docs of the caller's checkout rather than whatever main
// happens to be. The `Test Documentation with website` job in FlowFuse/flowfuse checks
// both repos out side by side and relies on this.
const SIBLING_PATHS = ['../dev-env/packages/flowfuse', '../flowfuse', '../flowforge']

export const MANIFEST_FILE = '.source.json'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Decide where the docs come from. Pure: touches nothing, so the precedence is testable.
 *
 * 1. `FLOWFUSE_DOCS_LOCAL` - an explicit checkout path
 * 2. a sibling checkout of flowfuse
 * 3. a clone of `FLOWFUSE_DOCS_REF`
 */
export function resolveSource ({ repoRoot, env = process.env, exists = existsSync }) {
    const local = env.FLOWFUSE_DOCS_LOCAL
    if (local) {
        const docsDir = local.endsWith('/docs') ? local : join(local, 'docs')
        // A typo here would otherwise fall through and quietly publish main's docs.
        if (!exists(docsDir)) {
            throw new Error(`FLOWFUSE_DOCS_LOCAL is set but ${docsDir} does not exist`)
        }
        return { kind: 'local', docsDir }
    }

    for (const sibling of SIBLING_PATHS) {
        const docsDir = join(repoRoot, sibling, 'docs')
        if (exists(docsDir)) {
            return { kind: 'sibling', docsDir }
        }
    }

    return { kind: 'clone', ref: env.FLOWFUSE_DOCS_REF || DEFAULT_REF }
}

/**
 * Sparse-clone the docs into a temp dir and return its path.
 *
 * A transient network failure here would otherwise fail the entire production deploy, so
 * each attempt gets a clean temp dir and the network steps are retried with backoff. The
 * caller owns cleanup of the returned dir.
 */
async function cloneDocs (ref, logger) {
    let lastError

    for (let attempt = 1; attempt <= CLONE_ATTEMPTS; attempt++) {
        const tmpDir = join(tmpdir(), `flowfuse-docs-${process.pid}-${attempt}`)
        if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })

        try {
            // Blobless but not shallow: dating a page needs that page's history, and a
            // --depth=1 clone stamps every page with the same commit date.
            execFileSync('git', ['clone', '--filter=blob:none', '--no-checkout', REPO_URL, tmpDir], { stdio: 'pipe' })
            execFileSync('git', ['sparse-checkout', 'set', 'docs'], { cwd: tmpDir, stdio: 'pipe' })
            execFileSync('git', ['checkout', ref], { cwd: tmpDir, stdio: 'pipe' })
            return tmpDir
        } catch (err) {
            lastError = err
            if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })

            if (attempt === CLONE_ATTEMPTS) break

            const wait = CLONE_BACKOFF_MS * attempt
            logger.warn(`Docs clone attempt ${attempt}/${CLONE_ATTEMPTS} failed, retrying in ${wait}ms`)
            await sleep(wait)
        }
    }

    const reason = lastError instanceof Error ? lastError.message : String(lastError)
    throw new Error(`Failed to clone FlowFuse docs from ${REPO_URL} after ${CLONE_ATTEMPTS} attempts: ${reason}`)
}

function gitOutput (cwd, args) {
    try {
        return execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
    } catch {
        return ''
    }
}

function copyDocsDir (srcDir, repoRoot, contentDir, publicDir, version) {
    mkdirSync(contentDir, { recursive: true })
    mkdirSync(publicDir, { recursive: true })

    for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue

        const srcPath = join(srcDir, entry.name)
        const destName = entry.name === 'README.md' ? 'index.md' : entry.name

        if (entry.isDirectory()) {
            copyDocsDir(srcPath, repoRoot, join(contentDir, entry.name), join(publicDir, entry.name), version)
        } else if (entry.name.endsWith('.md')) {
            const relFromRepo = relative(repoRoot, srcPath)
            const originalPath = relative(join(repoRoot, 'docs'), srcPath)

            // Argument array, not a shell string: relFromRepo comes from filenames in the
            // source repo, so quoting it into a shell command would be an injection path.
            const updated = gitOutput(repoRoot, ['log', '-1', '--pretty=format:%ci', '--', relFromRepo])

            const raw = readFileSync(srcPath, 'utf8')
            writeFileSync(join(contentDir, destName), processMarkdown(raw, originalPath, updated, version), 'utf8')
        } else {
            cpSync(srcPath, join(publicDir, entry.name))
        }
    }
}

function writeDocs ({ docsDir, sourceRoot, contentDocsDir, publicDocsDir, kind, ref }) {
    let version = ''
    try {
        version = JSON.parse(readFileSync(join(sourceRoot, 'package.json'), 'utf8')).version || ''
    } catch { /* not fatal */ }

    rmSync(contentDocsDir, { recursive: true, force: true })
    rmSync(publicDocsDir, { recursive: true, force: true })
    copyDocsDir(docsDir, sourceRoot, contentDocsDir, publicDocsDir, version)

    const manifest = {
        source: kind,
        ref: ref || gitOutput(sourceRoot, ['rev-parse', '--abbrev-ref', 'HEAD']),
        sha: gitOutput(sourceRoot, ['rev-parse', 'HEAD']),
        version,
        syncedAt: new Date().toISOString(),
    }
    writeFileSync(join(contentDocsDir, MANIFEST_FILE), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

    return manifest
}

/**
 * Populate nuxt/content/docs and nuxt/public/docs, and return the manifest describing
 * what was published.
 */
export async function syncDocs ({ repoRoot, nuxtRoot, env = process.env, logger = console } = {}) {
    const contentDocsDir = join(nuxtRoot, 'content', 'docs')
    const publicDocsDir = join(nuxtRoot, 'public', 'docs')
    const source = resolveSource({ repoRoot, env })

    let manifest
    if (source.kind === 'clone') {
        logger.info(`Cloning FlowFuse docs from ${source.ref}...`)
        const tmpDir = await cloneDocs(source.ref, logger)
        try {
            manifest = writeDocs({
                docsDir: join(tmpDir, 'docs'),
                sourceRoot: tmpDir,
                contentDocsDir,
                publicDocsDir,
                kind: source.kind,
                ref: source.ref,
            })
        } finally {
            if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true, force: true })
        }
    } else {
        logger.info(`Using ${source.kind} docs from ${source.docsDir}`)
        manifest = writeDocs({
            docsDir: source.docsDir,
            sourceRoot: join(source.docsDir, '..'),
            contentDocsDir,
            publicDocsDir,
            kind: source.kind,
        })
    }

    logger.info(`Docs synced from ${manifest.source} (${manifest.ref} ${manifest.sha.slice(0, 8) || 'unknown'}, version ${manifest.version || 'unknown'})`)
    return manifest
}
