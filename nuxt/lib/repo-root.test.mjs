import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { findRepoRoot } from './repo-root.mjs'

test('findRepoRoot returns the closest directory holding package-lock.json', (t) => {
    const root = mkdtempSync(join(tmpdir(), 'repo-root-'))
    t.after(() => rmSync(root, { recursive: true, force: true }))
    // An outer checkout with a worktree nested inside it, as .claude/worktrees/ does.
    const worktree = join(root, '.claude', 'worktrees', 'topic')
    mkdirSync(join(worktree, 'nuxt', 'lib'), { recursive: true })
    writeFileSync(join(root, 'package-lock.json'), '{}')
    writeFileSync(join(worktree, 'package-lock.json'), '{}')

    assert.equal(findRepoRoot(join(worktree, 'nuxt', 'lib')), worktree)
    assert.equal(findRepoRoot(worktree), worktree)
    assert.equal(findRepoRoot(join(root, '.claude')), root)
})

test('findRepoRoot fails loudly when there is no package-lock.json above', (t) => {
    const root = mkdtempSync(join(tmpdir(), 'repo-root-'))
    t.after(() => rmSync(root, { recursive: true, force: true }))
    assert.throws(() => findRepoRoot(root), /No package-lock.json/)
})
