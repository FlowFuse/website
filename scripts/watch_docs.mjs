#!/usr/bin/env node
// Keeps the docs collection's two sources in step while the dev server runs.
//
// The flowfuse docs are still a copy (nuxt/lib/docs-sync.mjs materializes them into
// nuxt/content/docs, once, at Nuxt module setup), so an edit to a local checkout of them
// only shows up after a restart without this watcher re-running that copy per file.
//
// The guides, by contrast, are a native content-collection source read straight out of
// nuxt/content-guides/ (see content.config.ts) - @nuxt/content's own dev-mode watcher
// re-parses a changed guide page on its own, incrementally, so this script only still
// needs to watch that tree for its non-markdown assets, which nuxt/lib/guides-sync.mjs
// copies to public/docs and which nothing else watches.
//
// One edit syncs one file. Re-running a whole sync instead would delete and recreate all
// 130-odd flowfuse pages on every save, and @nuxt/content re-indexing the entire collection
// that way exhausts the dev server's heap.

import { basename, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import chokidar from 'chokidar'

import { resolveSource, syncDocsPath } from '../nuxt/lib/docs-sync.mjs'
import { GUIDES_SOURCE, syncGuideAssetPath } from '../nuxt/lib/guides-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const nuxtRoot = join(repoRoot, 'nuxt')

const verbs = { add: 'Added', change: 'Synced', unlink: 'Removed' }

/**
 * @param {string} root directory to watch
 * @param {(relPath: string) => void} sync
 */
function watch (root, sync, { ignoreMarkdown = false } = {}) {
    const watcher = chokidar.watch(root, {
        // The Nuxt module has already synced by the time this starts.
        ignoreInitial: true,
        ignored: (path) => basename(path).startsWith('.') || (ignoreMarkdown && path.endsWith('.md')),
        // Editors write a file in more than one step, so wait for it to settle rather than
        // publish a half-written page.
        awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 50 },
        // Host file events do not cross the macOS podman VM, which is why compose.yaml sets
        // these for every other watcher in this repo.
        usePolling: Boolean(process.env.CHOKIDAR_USEPOLLING),
        interval: Number(process.env.CHOKIDAR_INTERVAL) || 100,
    })

    // No extension allowlist: the build copies every non-markdown file into public/docs, so
    // watching everything is what keeps the dev tree matching a build.
    for (const [event, verb] of Object.entries(verbs)) {
        watcher.on(event, (path) => {
            const relPath = relative(root, path)
            try {
                sync(relPath)
                console.log(`${verb} ${relPath}`)
            } catch (err) {
                // One bad file must not take the watcher down; the next save retries it.
                console.error(`Could not sync ${relPath}: ${err.message}`)
            }
        })
    }

    watcher.on('ready', () => console.log(`Watching ${root} for docs changes`))
}

// Assets only - see the module comment above for why markdown is @nuxt/content's job now.
watch(join(repoRoot, GUIDES_SOURCE), relPath => syncGuideAssetPath({ repoRoot, nuxtRoot, relPath }), { ignoreMarkdown: true })

// The same precedence the build uses, rather than a second hardcoded path that could drift
// from it: FLOWFUSE_DOCS_LOCAL, then a sibling checkout, then a clone.
const source = resolveSource({ repoRoot })

if (source.kind === 'clone') {
    console.log(`Product docs resolve to a clone of ${source.ref}, so there is nothing local to watch for them`)
} else {
    const { docsDir } = source
    watch(docsDir, relPath => syncDocsPath({ docsDir, nuxtRoot, relPath }))
}
