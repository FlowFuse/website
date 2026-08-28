// Fails when a PR adds a brand-new .njk file under src/ (11ty). 11ty is being phased out
// (see CLAUDE.md's migration status) — Nuxt pages are .vue/.md under nuxt/, never .njk,
// so a new .njk file can only mean a page built in the legacy stack instead of Nuxt.
// See /handbook/marketing/website#new-pages-must-be-built-in-nuxt.
//
// Scope: .njk only, deliberately. This does not (and is not meant to) catch a new page
// built as a bare .md file against an existing layout — content directories like
// src/blog/, src/changelog/, src/webinars/ and src/blueprints/ need to keep adding new
// .md files all the time as routine content work, most of them already managed by Nuxt
// regardless of where the source file lives, and reliably telling "a new content entry"
// apart from "a new page wearing an existing layout" isn't something this check does.
// CLAUDE.md and the handbook call this out explicitly.
//
// No allowlist to maintain: this fetches main and checks, for every .njk file that
// exists in this checkout, whether that path already existed on main — at its current
// tip, or within the last MAIN_LOOKBACK commits, so an unrelated rename/delete elsewhere
// on main after this branch forked doesn't retroactively fail a PR that never touched
// that file. A path missing from both fails; editing an existing .njk is unaffected.
//
// This file is picked up by the top-level `npm test` glob, so a failure here fails the
// "test_website / Build and check" status check that main's ruleset already requires —
// unlike a standalone workflow, this one actually blocks the PR.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readdirSync, lstatSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { findFiles } from './find-files.mjs'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const SRC_DIR = join(REPO_ROOT, 'src')

// Not pages at all: global data and layout partials/macros other pages include. A new
// file here is never itself "a new page" the way a new top-level .njk is.
const NON_PAGE_DIRS = ['_data', '_includes']

const MAIN_LOOKBACK = 30

function git (args, options = {}) {
    return execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, ...options })
}

function currentPageFiles () {
    const found = []
    for (const name of readdirSync(SRC_DIR)) {
        if (NON_PAGE_DIRS.includes(name)) continue
        const path = join(SRC_DIR, name)
        if (lstatSync(path).isSymbolicLink()) continue
        if (lstatSync(path).isDirectory()) findFiles(path, ['.njk'], found)
        else if (name.endsWith('.njk')) found.push(path)
    }
    return found.map(path => relative(REPO_ROOT, path).split('\\').join('/')).sort()
}

function pagesOnRef (ref) {
    try {
        return git(['ls-tree', '-r', '--name-only', ref, '--', 'src'])
            .split('\n')
            .filter(path => path.endsWith('.njk'))
    } catch {
        // ref doesn't resolve (main has fewer than MAIN_LOOKBACK commits) — fine, the
        // tip check alone still covers it.
        return []
    }
}

test('no new .njk pages were added under src/ (11ty)', async (t) => {
    try {
        // Force the update (+): a shallow, single-commit fetch into this ref has no
        // parent info, so a plain fetch can refuse a previous run's leftover ref as
        // "not a fast-forward" even though it's simply an older snapshot of main.
        git(['fetch', `--depth=${MAIN_LOOKBACK + 5}`, 'origin', '+main:refs/main-tip'])
    } catch (err) {
        // CI always has network — a failed fetch there means something is actually
        // broken, so it must fail loud rather than silently let a new page through.
        // Locally (offline, no remote configured, etc.) it's fine to just skip.
        if (process.env.CI) throw new Error(`couldn't fetch origin main to compare against: ${err.message}`)
        t.skip(`couldn't fetch origin main to compare against, skipping (${err.message})`)
        return
    }

    try {
        const pagesOnMain = new Set([
            ...pagesOnRef('refs/main-tip'),
            ...pagesOnRef(`refs/main-tip~${MAIN_LOOKBACK}`)
        ])

        const newPages = currentPageFiles().filter(path => !pagesOnMain.has(path))

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
        try {
            git(['update-ref', '-d', 'refs/main-tip'])
        } catch {
            // Best-effort cleanup only — must never mask a real assertion failure above.
        }
    }
})
