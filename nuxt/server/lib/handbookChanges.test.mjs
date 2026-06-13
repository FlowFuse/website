// Tests for the handbook recent-changes data module.
// Run with: node --test nuxt/server/lib/handbookChanges.test.mjs   (from the repo root)
//
// The integration tests exercise the module against the repo's real git
// history, so they must be run from inside the FlowFuse/website git checkout.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getHandbookChanges, toHandbookRel, relToUrl, mondayOf, prsFromCommits } from './handbookChanges.mjs'

// --- pure helpers -----------------------------------------------------------

test('prsFromCommits collapses multiple commits of one PR into a single entry', () => {
    // Two commits, different shas, same PR number in the subject -> one PR row.
    const commits = [
        { sha: 'aaa1111', date: '2026-06-02', subject: 'handbook: tweak onboarding (#4321)', commitUrl: 'https://github.com/FlowFuse/website/commit/aaa1111', prUrl: 'https://github.com/FlowFuse/website/pull/4321' },
        { sha: 'bbb2222', date: '2026-06-04', subject: 'handbook: more onboarding edits (#4321)', commitUrl: 'https://github.com/FlowFuse/website/commit/bbb2222', prUrl: 'https://github.com/FlowFuse/website/pull/4321' }
    ]
    const prs = prsFromCommits(commits)
    assert.equal(prs.length, 1, 'one PR despite two commits')
    assert.equal(prs[0].prNumber, 4321)
    assert.equal(prs[0].url, 'https://github.com/FlowFuse/website/pull/4321')
    assert.equal(prs[0].title, 'handbook: more onboarding edits', 'newest commit is representative, (#nnn) stripped')
    assert.equal(prs[0].sha, 'bbb2222', 'newest commit sha kept as representative')
})

test('prsFromCommits keeps direct (PR-less) commits keyed by their own sha', () => {
    const commits = [
        { sha: 'ccc3333', date: '2026-06-05', subject: 'handbook: hotfix typo', commitUrl: 'https://github.com/FlowFuse/website/commit/ccc3333', prUrl: null },
        { sha: 'ddd4444', date: '2026-06-05', subject: 'handbook: another hotfix', commitUrl: 'https://github.com/FlowFuse/website/commit/ddd4444', prUrl: null }
    ]
    const prs = prsFromCommits(commits)
    assert.equal(prs.length, 2, 'direct commits are not collapsed together')
    for (const pr of prs) {
        assert.equal(pr.prNumber, null)
        assert.match(pr.url, /\/commit\/[0-9a-f]+$/, 'direct commit links to its commit')
    }
})

test('prsFromCommits dedupes a single commit shared across pages and sorts newest-first', () => {
    const shared = { sha: 'eee5555', date: '2026-06-03', subject: 'handbook: cross-page edit (#4400)', commitUrl: 'https://github.com/FlowFuse/website/commit/eee5555', prUrl: 'https://github.com/FlowFuse/website/pull/4400' }
    const newer = { sha: 'fff6666', date: '2026-06-06', subject: 'handbook: later change (#4500)', commitUrl: 'https://github.com/FlowFuse/website/commit/fff6666', prUrl: 'https://github.com/FlowFuse/website/pull/4500' }
    // `shared` appears twice (touched two pages); it must surface once.
    const prs = prsFromCommits([shared, newer, shared])
    assert.equal(prs.length, 2)
    assert.deepEqual(prs.map(p => p.prNumber), [4500, 4400], 'newest PR first')
})

test('toHandbookRel keeps tracked handbook pages and strips the prefix', () => {
    assert.equal(toHandbookRel('nuxt/content/handbook/company/values.md'), 'company/values.md')
    assert.equal(toHandbookRel('src/handbook/company/values.md'), 'company/values.md')
    assert.equal(toHandbookRel('src/handbook/engineering/product/features.njk'), 'engineering/product/features.njk')
})

test('toHandbookRel rejects non-handbook, non-page and excluded files', () => {
    assert.equal(toHandbookRel('nuxt/content/ebooks/foo.md'), null) // not handbook
    assert.equal(toHandbookRel('nuxt/content/handbook/company/diagram.png'), null) // image
    assert.equal(toHandbookRel('nuxt/content/handbook/handbook.json'), null) // config
    assert.equal(toHandbookRel('src/handbook/data.json'), null) // other json
})

test('relToUrl maps file paths to trailing-slash handbook URLs', () => {
    assert.equal(relToUrl('company/values.md'), '/handbook/company/values/')
    assert.equal(relToUrl('company/index.md'), '/handbook/company/')
    assert.equal(relToUrl('index.md'), '/handbook/')
    assert.equal(relToUrl('engineering/product/features.njk'), '/handbook/engineering/product/features/')
})

test('mondayOf returns the Monday of the ISO week (UTC)', () => {
    // 2026-06-09 is a Tuesday -> Monday is 2026-06-08
    assert.equal(mondayOf('2026-06-09').toISOString().slice(0, 10), '2026-06-08')
    // 2026-06-08 (Monday) -> itself
    assert.equal(mondayOf('2026-06-08').toISOString().slice(0, 10), '2026-06-08')
    // 2026-06-07 (Sunday) -> previous Monday 2026-06-01
    assert.equal(mondayOf('2026-06-07').toISOString().slice(0, 10), '2026-06-01')
})

// --- integration against real git history -----------------------------------

test('getHandbookChanges is resilient when git is unavailable', () => {
    // A non-existent cwd makes `git rev-parse` fail; the module must swallow it.
    assert.deepEqual(getHandbookChanges('/nonexistent-path-xyz'), [])
})

test('getHandbookChanges produces well-formed, newest-first weekly data', () => {
    const weeks = getHandbookChanges(process.cwd())
    assert.ok(Array.isArray(weeks) && weeks.length > 0, 'expected a non-empty weeks array')

    let prevStart = null
    for (const week of weeks) {
        // weekStart must be a Monday and weekEnd exactly six days later.
        assert.equal(mondayOf(week.weekStart).toISOString().slice(0, 10), week.weekStart, 'weekStart is a Monday')
        const expectedEnd = new Date(week.weekStart + 'T00:00:00Z')
        expectedEnd.setUTCDate(expectedEnd.getUTCDate() + 6)
        assert.equal(week.weekEnd, expectedEnd.toISOString().slice(0, 10), 'weekEnd = weekStart + 6 days')
        assert.match(week.label, /^Week of /)

        // Weeks are ordered newest-first.
        if (prevStart) assert.ok(week.weekStart < prevStart, 'weeks sorted descending by start')
        prevStart = week.weekStart

        // Pages are deduped by URL within a week and well-formed.
        const urls = new Set()
        assert.ok(week.pages.length > 0, 'week has at least one page')
        for (const page of week.pages) {
            assert.ok(!urls.has(page.url), `url ${page.url} appears once per week`)
            urls.add(page.url)
            assert.match(page.url, /^\/handbook\/.*\/$|^\/handbook\/$/)
            assert.ok(['Added', 'Updated', 'Removed', 'Renamed'].includes(page.changeType), `valid changeType: ${page.changeType}`)
            assert.match(page.date, /^\d{4}-\d{2}-\d{2}$/)
            assert.match(page.commitUrl, /^https:\/\/github\.com\/FlowFuse\/website\/commit\/[0-9a-f]+$/)
            if (page.prUrl !== null) assert.match(page.prUrl, /^https:\/\/github\.com\/FlowFuse\/website\/pull\/\d+$/)
            assert.equal(typeof page.exists, 'boolean')
        }

        // Each week exposes a deduped pull-request list, newest first.
        assert.ok(Array.isArray(week.prs), 'week has a prs array')
        const shas = new Set()
        const prNumbers = new Set()
        let prevPrDate = null
        for (const pr of week.prs) {
            assert.ok(!shas.has(pr.sha), `pr sha ${pr.sha} appears once per week`)
            shas.add(pr.sha)
            if (pr.prNumber !== null) {
                assert.ok(!prNumbers.has(pr.prNumber), `pr #${pr.prNumber} appears once per week (collapsed across its commits)`)
                prNumbers.add(pr.prNumber)
            }
            assert.equal(typeof pr.title, 'string')
            assert.ok(pr.title.length > 0, 'pr title is non-empty')
            assert.doesNotMatch(pr.title, /\(#\d+\)\s*$/, 'trailing (#nnn) reference stripped from title')
            assert.match(pr.date, /^\d{4}-\d{2}-\d{2}$/)
            if (pr.prNumber !== null) {
                assert.equal(typeof pr.prNumber, 'number')
                assert.equal(pr.url, `https://github.com/FlowFuse/website/pull/${pr.prNumber}`)
            } else {
                assert.match(pr.url, /^https:\/\/github\.com\/FlowFuse\/website\/commit\/[0-9a-f]+$/)
            }
            // Newest first within the week.
            if (prevPrDate) assert.ok(pr.date <= prevPrDate, 'prs sorted newest-first')
            prevPrDate = pr.date
        }
        // The PRs are derived from the same commits that produced the pages, so a
        // non-empty week must surface at least one contributing PR/commit.
        assert.ok(week.prs.length > 0, 'a week with pages has at least one PR/commit')
    }
})

test('known recent handbook changes appear in the most recent week', () => {
    const weeks = getHandbookChanges(process.cwd())
    const recent = weeks[0]
    // #5158 (Release Process) landed in the most recent week of activity.
    const releaseProcess = recent.pages.find(p => p.url === '/handbook/engineering/releases/process/')
    assert.ok(releaseProcess, 'Release Process page present in most recent week')
    assert.equal(releaseProcess.prUrl, 'https://github.com/FlowFuse/website/pull/5158')

    // The same week's PR list surfaces #5158 as a deduped entry.
    const pr5158 = recent.prs.find(p => p.prNumber === 5158)
    assert.ok(pr5158, 'PR #5158 present in most recent week prs')
    assert.equal(pr5158.url, 'https://github.com/FlowFuse/website/pull/5158')
})
