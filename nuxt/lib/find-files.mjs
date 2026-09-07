// Recursively finds files under `dir` whose name ends with one of `extensions`. Symlinks
// are skipped entirely rather than followed, so a symlink cycle can't crash the walk with
// an uncaught ELOOP.

import { readdirSync, lstatSync } from 'node:fs'
import { join } from 'node:path'

export function findFiles (dir, extensions, found = []) {
    for (const name of readdirSync(dir)) {
        const path = join(dir, name)
        const stats = lstatSync(path)
        if (stats.isSymbolicLink()) continue
        if (stats.isDirectory()) findFiles(path, extensions, found)
        else if (extensions.some(ext => name.endsWith(ext))) found.push(path)
    }
    return found
}
