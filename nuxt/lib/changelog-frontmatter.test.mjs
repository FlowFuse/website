// Validates the frontmatter of every changelog entry in src/changelog/.
//
// These entries are hand-authored by engineering and product (see the handbook,
// Writing Changelog Posts), and the listing page groups them by release. A wrong or
// missing `release` puts an entry under the wrong heading, so it is worth failing CI
// over rather than discovering on the live site.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const CHANGELOG_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../src/changelog')

function markdownFiles (dir, found = []) {
    for (const name of readdirSync(dir)) {
        const path = join(dir, name)
        if (statSync(path).isDirectory()) markdownFiles(path, found)
        else if (name.endsWith('.md')) found.push(path)
    }
    return found
}

function frontmatter (text) {
    const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)
    if (!match) return null
    const fields = {}
    for (const line of match[1].split(/\r?\n/)) {
        const field = /^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/.exec(line)
        if (field) fields[field[1]] = field[2].trim().replace(/^["']|["']$/g, '')
        // A `tags:` block is a list on following lines, so collect its items too. YAML
        // allows those items at the same indentation as the key, and entries here use
        // both styles, so do not require leading whitespace.
        const item = /^\s*-\s*(.+)$/.exec(line)
        if (item) (fields._list ??= []).push(item[1].trim().replace(/^["']|["']$/g, ''))
    }
    return fields
}

const entries = markdownFiles(CHANGELOG_DIR).sort().map(path => ({
    name: relative(CHANGELOG_DIR, path),
    fields: frontmatter(readFileSync(path, 'utf8')),
}))

test('there are changelog entries to check', () => {
    assert.ok(entries.length > 100, `expected the changelog archive, found ${entries.length} entries`)
})

test('every entry has parseable frontmatter', () => {
    const broken = entries.filter(e => !e.fields).map(e => e.name)
    assert.deepEqual(broken, [], 'entries whose frontmatter block could not be read')
})

test('every entry has a non-empty title and description', () => {
    for (const field of ['title', 'description']) {
        const missing = entries.filter(e => !e.fields?.[field]).map(e => e.name)
        assert.deepEqual(missing, [], `entries missing ${field}`)
    }
})

test('every entry is tagged changelog', () => {
    const untagged = entries.filter(e => !(e.fields?._list || []).includes('changelog')).map(e => e.name)
    assert.deepEqual(untagged, [], 'entries whose tags do not include changelog')
})

// Zero-padded so the date sorts and parses the same everywhere. `date: 2025-06-5`
// shipped once and read as valid to some parsers but not others.
test('every date is a zero-padded, real calendar date', () => {
    const bad = []
    for (const { name, fields } of entries) {
        const raw = fields?.date ?? ''
        const match = /^(\d{4})-(\d{2})-(\d{2})(?:[ T]|$)/.exec(raw)
        if (!match) { bad.push(`${name}: ${raw || '(none)'}`); continue }
        const [, y, m, d] = match
        const parsed = new Date(`${y}-${m}-${d}T00:00:00Z`)
        if (parsed.getUTCMonth() + 1 !== +m || parsed.getUTCDate() !== +d) bad.push(`${name}: ${raw}`)
    }
    assert.deepEqual(bad, [], 'dates that are not zero-padded YYYY-MM-DD, or not real dates')
})

test('every entry declares a release as MAJOR.MINOR', () => {
    const bad = entries
        .filter(e => !/^\d+\.\d+$/.test(e.fields?.release ?? ''))
        .map(e => `${e.name}: ${e.fields?.release ?? '(none)'}`)
    assert.deepEqual(bad, [], 'releases that are not MAJOR.MINOR (quote it, so 2.30 stays "2.30")')
})

// The strongest check available without a release calendar in the repo: releases ship
// in order, so sorting entries by date must not make the release number go backwards.
// A release typo shows up here as a dip against its neighbours.
test('release numbers never decrease as dates increase', () => {
    const order = entries
        .filter(e => /^\d+\.\d+$/.test(e.fields?.release ?? ''))
        .map(e => ({
            name: e.name,
            date: e.fields.date,
            release: e.fields.release,
            rank: e.fields.release.split('.').map(Number),
        }))
        .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))

    const dips = []
    for (let i = 1; i < order.length; i++) {
        const prev = order[i - 1]
        const curr = order[i]
        const back = prev.rank[0] > curr.rank[0] || (prev.rank[0] === curr.rank[0] && prev.rank[1] > curr.rank[1])
        if (back) dips.push(`${prev.date} ${prev.release} (${prev.name}) then ${curr.date} ${curr.release} (${curr.name})`)
    }
    assert.deepEqual(dips, [], 'a later entry claims an earlier release than the entry before it')
})
