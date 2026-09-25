import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// The root of the checkout: the closest directory at or above `start` that holds
// package-lock.json. Found rather than written as a fixed run of `..`, so a caller keeps
// working when the file it lives in moves up or down a level. Closest rather than
// furthest, so a git worktree nested inside another checkout (.claude/worktrees/)
// resolves to itself and not to the checkout around it.
export function findRepoRoot (start) {
    let dir = start
    while (!existsSync(join(dir, 'package-lock.json'))) {
        const parent = dirname(dir)
        if (parent === dir) throw new Error(`No package-lock.json at or above ${start}`)
        dir = parent
    }
    return dir
}

export const REPO_ROOT = findRepoRoot(dirname(fileURLToPath(import.meta.url)))
