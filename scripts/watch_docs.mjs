#!/usr/bin/env node
// Keeps nuxt/content/docs in step with its two sources while the dev server runs:
// a local flowfuse checkout (when the docs resolve to one) and this repo's own
// nuxt/content-guides tree. nuxt/modules/docs-source.ts syncs once during setup and never
// again, so without this an edit to either only shows up after a restart.
//
// One edit syncs one file. Re-running a whole sync instead would delete and recreate all
// 130-odd pages on every save, and @nuxt/content re-indexing the entire collection that way
// exhausts the dev server's heap.

import { basename, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import chokidar from 'chokidar'

import { resolveSource, syncDocsPath } from '../nuxt/lib/docs-sync.mjs'
import { GUIDES_SOURCE, syncGuidePath } from '../nuxt/lib/guides-sync.mjs'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const nuxtRoot = join(repoRoot, 'nuxt')

const verbs = { add: 'Added', change: 'Synced', unlink: 'Removed' }

/**
 * @param {string} root directory to watch
 * @param {(relPath: string) => void} sync
 */
function watch (root, sync) {
    const watcher = chokidar.watch(root, {
        // The Nuxt module has already synced by the time this starts.
        ignoreInitial: true,
        ignored: (path) => basename(path).startsWith('.'),
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

// The guides live in this repo, so unlike the flowfuse docs there is always something
// local to watch.
watch(join(repoRoot, GUIDES_SOURCE), relPath => syncGuidePath({ repoRoot, nuxtRoot, relPath }))

// The same precedence the build uses, rather than a second hardcoded path that could drift
// from it: FLOWFUSE_DOCS_LOCAL, then a sibling checkout, then a clone.
const source = resolveSource({ repoRoot })

if (source.kind === 'clone') {
    console.log(`Product docs resolve to a clone of ${source.ref}, so there is nothing local to watch for them`)
} else {
    const { docsDir } = source
    watch(docsDir, relPath => syncDocsPath({ docsDir, nuxtRoot, relPath }))
}
