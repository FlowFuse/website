// src/ was Eleventy's input tree. Eleventy is gone and nothing reads src/ any more, so a
// file that lands there is never built and nothing else says so. That happens when a
// branch cut before the move is merged after it: a new post in a new month directory
// merges cleanly into src/blog/, and the only sign is a page that never appears.
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

test('nothing is tracked under src/', (t) => {
    let tracked
    try {
        tracked = execFileSync('git', ['ls-files', '--', 'src'], { cwd: repo, encoding: 'utf8' }).trim()
    } catch {
        t.skip('not a git checkout')
        return
    }
    assert.equal(tracked, '',
        'src/ is retired: these files are never built. Move content into nuxt/content/, '
        + 'served files into nuxt/public/, data into nuxt/data/:\n' + tracked)
})
