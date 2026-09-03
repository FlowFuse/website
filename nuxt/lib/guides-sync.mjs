// Overlays the website-authored guides onto the docs content tree.
//
// /docs is assembled from two repos. FlowFuse/flowfuse owns the product documentation -
// how-to and reference, versioned with the code it describes - and docs-sync.mjs copies
// it in. This module copies the second source: the guides authored in *this* repo under
// nuxt/content-guides/, which explain how to shape an application rather than how to
// drive a feature, and so are not tied to a product release.
//
// Both land in nuxt/content/docs, so @nuxt/content sees a single `docs` collection and
// the sidebar, breadcrumbs, prerender list, sitemap and search treat the two sources
// identically. nuxt/content/docs is gitignored and wiped on every sync, which is why the
// guides cannot simply be authored there.
//
// Kept free of Nuxt imports, like docs-sync.mjs, so `scripts/sync_docs.mjs` can run it
// before `npm install` and `node --test` can exercise it directly.

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'

// Repo-relative, so it can be both the source directory and the tail of the edit URL.
export const GUIDES_SOURCE = 'nuxt/content-guides'

const EDIT_BASE = 'https://github.com/FlowFuse/website/edit/main'

function gitOutput (cwd, args) {
    try {
        // stderr is discarded rather than inherited: outside a git checkout (a unit test,
        // a tarball build) git's "not a git repository" is expected and handled below.
        return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    } catch {
        return ''
    }
}

/**
 * Where one guide file lands. Same rules docs-sync uses for the flowfuse tree - markdown
 * becomes a page, README.md becomes its section index, anything else is a public asset -
 * so a directory of guides nests in the sidebar exactly like a directory of docs.
 */
export function destinationFor (relPath, contentDocsDir, publicDocsDir) {
    const name = basename(relPath)
    const dir = dirname(relPath)
    const prefix = dir === '.' ? '' : dir

    return name.endsWith('.md')
        ? join(contentDocsDir, prefix, name === 'README.md' ? 'index.md' : name)
        : join(publicDocsDir, prefix, name)
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
    const injected = `editUrl: ${editUrl}\nupdated: ${updated}\n`

    return /^---/.test(content)
        ? content.replace(/^---\n/, `---\n${injected}`)
        : `---\n${injected}---\n${content}`
}

/**
 * Copy one guide file into the docs tree.
 *
 * Deliberately does NOT run docs-markdown's processMarkdown: that exists to repair
 * Eleventy-era markup in the flowfuse docs (Nunjucks callouts, inline custom-element
 * scripts, blank lines inside raw HTML blocks). The guides are authored as MDC against
 * the components in nuxt/components/content/, and those transforms would mangle them.
 */
export function writeGuideFile ({ guidesDir, repoRoot, contentDocsDir, publicDocsDir, relPath }) {
    const srcPath = join(guidesDir, relPath)
    const destPath = destinationFor(relPath, contentDocsDir, publicDocsDir)

    mkdirSync(dirname(destPath), { recursive: true })

    if (!relPath.endsWith('.md')) {
        cpSync(srcPath, destPath)
        return destPath
    }

    const sourcePath = `${GUIDES_SOURCE}/${relPath}`
    // Argument array, not a shell string: the path comes from filenames on disk, so
    // interpolating it into a shell command would be an injection path.
    const updated = gitOutput(repoRoot, ['log', '-1', '--pretty=format:%ci', '--', sourcePath])

    const raw = readFileSync(srcPath, 'utf8')
    writeFileSync(destPath, injectFrontmatter(raw, {
        editUrl: `${EDIT_BASE}/${sourcePath}`,
        updated,
    }), 'utf8')

    return destPath
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
 * Copy the whole guides tree into nuxt/content/docs, after docs-sync has populated it.
 *
 * A guide that lands on a path the flowfuse docs already occupy would silently replace
 * that page - the overlay runs second - and the loss would only show up as a docs page
 * mysteriously missing from production. Collisions therefore fail the build.
 */
export function syncGuides ({ repoRoot, nuxtRoot, logger = console } = {}) {
    const guidesDir = join(repoRoot, GUIDES_SOURCE)
    const contentDocsDir = join(nuxtRoot, 'content', 'docs')
    const publicDocsDir = join(nuxtRoot, 'public', 'docs')

    if (!existsSync(guidesDir)) {
        logger.warn(`No guides to overlay: ${GUIDES_SOURCE} does not exist`)
        return { count: 0 }
    }

    const files = listGuideFiles(guidesDir)
    const collisions = files.filter(relPath =>
        existsSync(destinationFor(relPath, contentDocsDir, publicDocsDir)))

    if (collisions.length) {
        throw new Error(
            `Guide files collide with pages from FlowFuse/flowfuse and would overwrite them: ${collisions.join(', ')}`
        )
    }

    for (const relPath of files) {
        writeGuideFile({ guidesDir, repoRoot, contentDocsDir, publicDocsDir, relPath })
    }

    logger.info(`Overlaid ${files.length} guide files from ${GUIDES_SOURCE} onto content/docs`)
    return { count: files.length }
}

/**
 * Sync a single guide file, for the dev watcher. Mirrors syncDocsPath: a full re-sync on
 * every save would delete and recreate every page in the collection, and @nuxt/content
 * re-indexing all of them at once exhausts the dev server's heap.
 */
export function syncGuidePath ({ repoRoot, nuxtRoot, relPath }) {
    const guidesDir = join(repoRoot, GUIDES_SOURCE)
    const contentDocsDir = join(nuxtRoot, 'content', 'docs')
    const publicDocsDir = join(nuxtRoot, 'public', 'docs')

    if (!existsSync(join(guidesDir, relPath))) {
        // Same destination mapping as the write, so deleting a README removes its index.md.
        rmSync(destinationFor(relPath, contentDocsDir, publicDocsDir), { force: true })
        return
    }

    writeGuideFile({ guidesDir, repoRoot, contentDocsDir, publicDocsDir, relPath })
}
