import { test } from 'node:test'
import assert from 'node:assert/strict'

import { parseGitLogOutput } from './git-lastmod.mjs'

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
    const map = parseGitLogOutput(
        commit('2026-09-25', 'R087\tsrc/css/style.css\tnuxt/assets/css/style.css') +
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
