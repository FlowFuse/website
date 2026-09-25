// Wires the website-authored guides into the docs content tree.
//
// /docs is assembled from two repos. FlowFuse/flowfuse owns the product documentation -
// how-to and reference, versioned with the code it describes - and docs-sync.mjs copies
// it into nuxt/content/docs. This module covers the second source: the guides authored in
// *this* repo under nuxt/content-guides/, which explain how to shape an application rather
// than how to drive a feature, and so are not tied to a product release.
//
// Unlike the flowfuse docs, the guides are already MDC and already live in this repo, so
// they do not need copying to become a `docs` collection page: nuxt/content.config.ts
// declares nuxt/content-guides/ as a second source of the `docs` collection (its own `cwd`,
// prefixed onto the `docs/` path so it lands next to the flowfuse pages), and the
// `content:file:beforeParse` hook in nuxt.config.ts calls injectGuideFrontmatter below to
// stamp each guide page with the same `editUrl`/`updated` provenance this module used to
// write by hand. What is left here is what a content-collection source cannot do by
// itself: copying the guides' non-markdown assets (images, mostly) to nuxt/public/docs so
// they resolve at runtime, and failing the build if a guide's path would collide with a
// page FlowFuse/flowfuse already publishes.
//
// Kept free of Nuxt imports, like docs-sync.mjs, so `scripts/sync_docs.mjs` can run it
// before `npm install` and `node --test` can exercise it directly.

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'

// Repo-relative, so it can be both the source directory and the tail of the edit URL.
export const GUIDES_SOURCE = 'nuxt/content-guides'

export const EDIT_BASE = 'https://github.com/FlowFuse/website/edit/main'

export function gitOutput (cwd, args) {
    try {
        // stderr is discarded rather than inherited: outside a git checkout (a unit test,
        // a tarball build) git's "not a git repository" is expected and handled below.
        return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    } catch {
        return ''
    }
}

/**
 * Stamp build-time provenance onto a guide page.
 *
 * `editUrl` is what separates the two sources at render time: docs-sync stamps
 * `originalPath` and the page builds a FlowFuse/flowfuse edit link from it, while a page
 * carrying `editUrl` links back to this repo instead. `updated` is the same field the
 * docs pages use for their "Updated" stamp and for sitemap lastmod, taken here from this
 * repo's history rather than flowfuse's.
 */
export function injectFrontmatter (content, { editUrl, updated }) {
    // `updated` is omitted rather than emitted empty when git could not answer. YAML reads
    // a valueless key as null, which the collection schema (`z.string().optional()`)
    // accepts as absent but not as null, so an empty value turns a missing timestamp into
    // a parse complaint on every guide page at once.
    const injected = [
        `editUrl: ${editUrl}`,
        updated ? `updated: ${updated}` : null,
    ].filter(Boolean).join('\n') + '\n'

    return /^---/.test(content)
        ? content.replace(/^---\n/, `---\n${injected}`)
        : `---\n${injected}---\n${content}`
}

/**
 * Called from the `content:file:beforeParse` hook for every file @nuxt/content reads out
 * of the content-guides source. `absPath` is that hook's `file.path` - the real path on
 * disk, which is what lets this run entirely inside the hook rather than needing a
 * separate copy step: the git history it reads is this repo's own, at the guide's real
 * location, not a location this module chose.
 */
export function injectGuideFrontmatter (content, { repoRoot, absPath }) {
    const guidesDir = join(repoRoot, GUIDES_SOURCE)
    const sourcePath = `${GUIDES_SOURCE}/${stripPrefix(guidesDir, absPath)}`
    const updated = gitOutput(repoRoot, ['log', '-1', '--pretty=format:%ci', '--', sourcePath])

    return injectFrontmatter(content, {
        editUrl: `${EDIT_BASE}/${sourcePath}`,
        updated,
    })
}

/** Whether a `content:file:beforeParse` file came from the guides source. */
export function isGuidePath (absPath, repoRoot) {
    const guidesDir = join(repoRoot, GUIDES_SOURCE)
    return absPath === guidesDir || absPath.startsWith(guidesDir + '/')
}

// The guide's path under GUIDES_SOURCE, with no leading slash.
function stripPrefix (from, to) {
    return to.startsWith(from) ? to.slice(from.length).replace(/^\/+/, '') : to
}

/** Every file under the guides tree, as paths relative to it. */
export function listGuideFiles (guidesDir, relDir = '') {
    const files = []
    for (const entry of readdirSync(join(guidesDir, relDir), { withFileTypes: true })) {
        if (entry.name.startsWith('.')) continue
        const relPath = relDir ? join(relDir, entry.name) : entry.name
        if (entry.isDirectory()) {
            files.push(...listGuideFiles(guidesDir, relPath))
        } else {
            files.push(relPath)
        }
    }
    return files
}

/**
 * Copy one guide asset (a non-markdown file) into nuxt/public/docs, or remove it if it has
 * gone. Markdown is not handled here: @nuxt/content reads it straight out of
 * nuxt/content-guides/ as a source of the `docs` collection.
 */
export function syncGuideAssetPath ({ repoRoot, nuxtRoot, relPath }) {
    if (relPath.endsWith('.md')) return

    const guidesDir = join(repoRoot, GUIDES_SOURCE)
    const destPath = join(nuxtRoot, 'public', 'docs', relPath)

    if (!existsSync(join(guidesDir, relPath))) {
        rmSync(destPath, { force: true })
        return
    }

    mkdirSync(dirname(destPath), { recursive: true })
    cpSync(join(guidesDir, relPath), destPath)
}

/**
 * Copy the guides' non-markdown assets into nuxt/public/docs, and fail the build if a
 * guide's path would collide with a page FlowFuse/flowfuse already publishes.
 *
 * The collision check used to be the only thing standing between a colliding guide and a
 * docs page it would silently replace, because both were written into the same directory
 * and the second write won. Now that guides are a separate content-collection source, a
 * real collision - the same `docs` path served by both sources - fails anyway (the `docs`
 * table's `id` is a primary key), but as a SQL constraint error naming a key, not a guide
 * file. Checking here first keeps the friendlier message.
 */
export function syncGuideAssets ({ repoRoot, nuxtRoot, logger = console } = {}) {
    const guidesDir = join(repoRoot, GUIDES_SOURCE)
    const contentDocsDir = join(nuxtRoot, 'content', 'docs')

    if (!existsSync(guidesDir)) {
        logger.warn(`No guides to overlay: ${GUIDES_SOURCE} does not exist`)
        return { pages: 0, assets: 0 }
    }

    const files = listGuideFiles(guidesDir)
    const pages = files.filter(relPath => relPath.endsWith('.md'))
    const assets = files.filter(relPath => !relPath.endsWith('.md'))

    const collisions = pages.filter(relPath => existsSync(join(contentDocsDir, relPath)))
    if (collisions.length) {
        throw new Error(
            `Guide files collide with pages from FlowFuse/flowfuse and would overwrite them: ${collisions.join(', ')}`
        )
    }

    for (const relPath of assets) {
        syncGuideAssetPath({ repoRoot, nuxtRoot, relPath })
    }

    logger.info(`Copied ${assets.length} guide assets to public/docs; ${pages.length} guide pages read directly from ${GUIDES_SOURCE}`)
    return { pages: pages.length, assets: assets.length }
}
