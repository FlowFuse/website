import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'

import { getGitLastmod, parseGitLogOutput } from './git-lastmod.mjs'

const commit = (date, ...lines) => [`\u0000${date}`, ...lines, ''].join('\n')

test('the newest commit touching a path wins', () => {
    const map = parseGitLogOutput(
        commit('2026-03-01', 'M\tblog/a.md') +
        commit('2026-01-01', 'A\tblog/a.md', 'A\tblog/b.md')
    )
    assert.equal(map.get('blog/a.md'), '2026-03-01')
    assert.equal(map.get('blog/b.md'), '2026-01-01')
})

test('a pure move keeps the date the content last changed', () => {
    const map = parseGitLogOutput(
        commit('2026-09-25', 'R100\tsrc/blog/a.md\tnuxt/content/blog/a.md') +
        commit('2025-06-01', 'M\tsrc/blog/a.md') +
        commit('2024-01-01', 'A\tsrc/blog/a.md')
    )
    assert.equal(map.get('nuxt/content/blog/a.md'), '2025-06-01')
})

test('an edit after the move is newer than anything before it', () => {
    const map = parseGitLogOutput(
        commit('2026-10-01', 'M\tnuxt/content/blog/a.md') +
        commit('2026-09-25', 'R100\tsrc/blog/a.md\tnuxt/content/blog/a.md') +
        commit('2025-06-01', 'M\tsrc/blog/a.md')
    )
    assert.equal(map.get('nuxt/content/blog/a.md'), '2026-10-01')
})

test('history follows a file through several moves', () => {
    const map = parseGitLogOutput(
        commit('2026-09-25', 'R100\tsrc/blog/a.md\tnuxt/content/blog/a.md') +
        commit('2025-01-01', 'R100\tblog/a.md\tsrc/blog/a.md') +
        commit('2024-05-01', 'M\tblog/a.md')
    )
    assert.equal(map.get('nuxt/content/blog/a.md'), '2024-05-01')
})

test('a move that also changed the file counts as a change', () => {
    // -M100% only pairs exact moves, so an edited move is listed as an add and a delete.
    const map = parseGitLogOutput(
        commit('2026-09-25', 'A\tnuxt/assets/css/style.css', 'D\tsrc/css/style.css') +
        commit('2025-06-01', 'M\tsrc/css/style.css')
    )
    assert.equal(map.get('nuxt/assets/css/style.css'), '2026-09-25')
})

test('a path created where a file was moved away from is dated on its own', () => {
    const map = parseGitLogOutput(
        commit('2026-10-01', 'A\tsrc/blog/a.md') +
        commit('2026-09-25', 'R100\tsrc/blog/a.md\tnuxt/content/blog/a.md') +
        commit('2025-06-01', 'M\tsrc/blog/a.md')
    )
    assert.equal(map.get('src/blog/a.md'), '2026-10-01')
    assert.equal(map.get('nuxt/content/blog/a.md'), '2025-06-01')
})

test('a deletion does not date anything', () => {
    const map = parseGitLogOutput(
        commit('2026-09-25', 'D\tblog/gone.md') +
        commit('2025-06-01', 'A\tblog/gone.md')
    )
    assert.equal(map.get('blog/gone.md'), '2025-06-01')
})

test('against a real repository: moves, edited moves, and a branch merged after the move', () => {
    const repo = mkdtempSync(join(tmpdir(), 'git-lastmod-'))
    const git = (date, ...args) => execFileSync('git', [
        '-c', 'user.name=test', '-c', 'user.email=test@example.com',
        '-c', 'commit.gpgsign=false', '-c', 'init.defaultBranch=main', ...args
    ], { cwd: repo, env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date }, stdio: 'pipe' })
    const write = (path, text) => {
        mkdirSync(dirname(join(repo, path)), { recursive: true })
        writeFileSync(join(repo, path), text)
    }

    git('2024-01-01T12:00:00Z', 'init', '-q')
    write('src/blog/a.md', 'a')
    write('src/blog/b.md', 'b')
    write('src/blog/c.md', 'c')
    git('2024-01-01T12:00:00Z', 'add', '.')
    git('2024-01-01T12:00:00Z', 'commit', '-q', '-m', 'posts')
    write('src/blog/a.md', 'a, edited')
    git('2025-01-01T12:00:00Z', 'commit', '-q', '-am', 'edit a')

    // A branch cut before the move, which edits b under its old path after the move.
    git('2025-01-01T12:00:00Z', 'checkout', '-q', '-b', 'feature')

    git('2026-09-25T12:00:00Z', 'checkout', '-q', 'main')
    mkdirSync(join(repo, 'nuxt/content'), { recursive: true })
    git('2026-09-25T12:00:00Z', 'mv', 'src/blog', 'nuxt/content/blog')
    write('nuxt/content/blog/c.md', 'c, edited while moving')
    git('2026-09-25T12:00:00Z', 'commit', '-q', '-am', 'move')

    git('2026-10-01T12:00:00Z', 'checkout', '-q', 'feature')
    write('src/blog/b.md', 'b, edited on a branch')
    git('2026-10-01T12:00:00Z', 'commit', '-q', '-am', 'edit b')
    git('2026-10-02T12:00:00Z', 'checkout', '-q', 'main')
    git('2026-10-02T12:00:00Z', 'merge', '-q', '--no-ff', '-m', 'merge feature', 'feature')

    const date = path => getGitLastmod(repo, path)?.slice(0, 10)
    // Moved untouched: dated by its last edit, not by the move.
    assert.equal(date('nuxt/content/blog/a.md'), '2025-01-01')
    // Edited on a branch after the move: dated when the edit reached main.
    assert.equal(date('nuxt/content/blog/b.md'), '2026-10-02')
    // Edited in the same commit that moved it: that commit is its last change.
    assert.equal(date('nuxt/content/blog/c.md'), '2026-09-25')
})
