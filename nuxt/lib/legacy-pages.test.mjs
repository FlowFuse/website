// Fails when a PR adds a brand-new .njk file under src/ (11ty). 11ty is being phased out
// (see CLAUDE.md's migration status) — Nuxt pages are .vue/.md under nuxt/, never .njk,
// so a new .njk file anywhere in src/ can only mean a page built in the legacy stack
// instead of Nuxt. See /handbook/marketing/website#new-pages-must-be-built-in-nuxt.
//
// No allowlist to maintain: this fetches main's current tip and checks, for every .njk
// file that exists in this checkout, whether that same path already exists there. A path
// main doesn't have is new and fails the test; editing an existing .njk is unaffected.
//
// This file is picked up by the top-level `npm test` glob, so a failure here fails the
// "test_website / Build and check" status check that main's ruleset already requires —
// unlike a standalone workflow, this one actually blocks the PR.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const SRC_DIR = join(REPO_ROOT, 'src')

function git (args) {
    return execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8' })
}

function njkFiles (path, found = []) {
    if (statSync(path).isDirectory()) {
        for (const name of readdirSync(path)) njkFiles(join(path, name), found)
    } else if (path.endsWith('.njk')) {
        found.push(path)
    }
    return found
}

const currentPages = njkFiles(SRC_DIR)
    .map(path => relative(REPO_ROOT, path).split('\\').join('/'))
    .sort()

test('no new .njk pages were added under src/ (11ty)', async (t) => {
    try {
        // A plain, unnamed ref (not origin/main or refs/remotes/...) so this works
        // whether or not the checkout configured a remote-tracking branch for it.
        git(['fetch', '--depth=1', 'origin', 'main:refs/main-tip'])
    } catch (err) {
        // CI always has network — a failed fetch there means something is actually
        // broken, so it must fail loud rather than silently let a new page through.
        // Locally (offline, no remote configured, etc.) it's fine to just skip.
        if (process.env.CI) throw new Error(`couldn't fetch origin main to compare against: ${err.message}`)
        t.skip(`couldn't fetch origin main to compare against, skipping (${err.message})`)
        return
    }

    try {
        // One call for the whole tree beats spawning `git cat-file` per page — with
        // src/_includes's ~80 layout partials included, that's 136 files today.
        const pagesOnMain = new Set(
            git(['ls-tree', '-r', '--name-only', 'main-tip', '--', 'src'])
                .split('\n')
                .filter(path => path.endsWith('.njk'))
        )

        const newPages = currentPages.filter(path => !pagesOnMain.has(path))

        assert.deepEqual(newPages, [], [
            'New .njk page(s) found under src/ that do not exist on main:',
            ...newPages.map(p => `  - ${p}`),
            '',
            '11ty is being phased out — build new pages in Nuxt (nuxt/pages/) instead.',
            'See /handbook/marketing/website#new-pages-must-be-built-in-nuxt for context.',
            'If this page genuinely must ship on 11ty first, a member of the GitHub "admin"',
            'team can merge anyway via "Merge without waiting for requirements to be met".'
        ].join('\n'))
    } finally {
        git(['update-ref', '-d', 'refs/main-tip'])
    }
})
