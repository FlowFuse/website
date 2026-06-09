// Build-time data source for the handbook "Recent Changes" page.
//
// Reads git history for the handbook content and groups the changes by ISO
// week (Monday start), newest week first, so the team can review "last week's
// changes" at the Monday review.
//
// The handbook used to live under `src/handbook` (11ty) and now lives under
// `nuxt/content/handbook` (@nuxt/content). Both prefixes are scanned so the
// full history survives the Nuxt migration; both map onto the same
// `/handbook/...` URLs the live site serves.
//
// This module deliberately depends only on Node built-ins so it can be
// imported by the Nitro server route AND executed standalone for verification.

import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'

const REPO_URL = 'https://github.com/FlowFuse/website'
// `\x01` separates the commit-header fields; it never appears in commit
// subjects, so subjects containing spaces or pipes parse cleanly.
const SEP = '\x01'

// Path prefixes that count as handbook content. Order matters only for display
// labels; both fold onto the same handbook-relative path.
const HANDBOOK_PREFIXES = ['nuxt/content/handbook/', 'src/handbook/']
// Where the CURRENT version of a page lives, used for title lookups.
const CONTENT_ROOT = 'nuxt/content/handbook'

const CHANGE_TYPES = { A: 'Added', M: 'Updated', D: 'Removed', R: 'Renamed', C: 'Added', T: 'Updated' }

/** Strip a handbook prefix; return the handbook-relative path or null if not handbook content we track. */
export function toHandbookRel (path) {
    let rel = null
    for (const prefix of HANDBOOK_PREFIXES) {
        if (path.startsWith(prefix)) { rel = path.slice(prefix.length); break }
    }
    if (rel === null) return null
    // Keep only authored pages; skip images, handbook.json and other *.json.
    if (!(rel.endsWith('.md') || rel.endsWith('.njk'))) return null
    if (basename(rel) === 'handbook.json') return null
    return rel
}

/** Map a handbook-relative file path to the URL the site serves (trailing slash, like the rest of the handbook). */
export function relToUrl (rel) {
    let noExt = rel.replace(/\.(md|njk)$/, '')
    if (noExt === 'index') return '/handbook/'
    if (noExt.endsWith('/index')) noExt = noExt.slice(0, -'/index'.length)
    return `/handbook/${noExt}/`
}

/** Best-effort human title from the CURRENT file: front-matter title/navTitle, else first H1. */
function readTitle (rel, repoRoot) {
    // The page may have been authored as .njk historically but exist as .md now.
    const candidates = [rel, rel.replace(/\.njk$/, '.md')]
    for (const candidate of candidates) {
        const abs = join(repoRoot, CONTENT_ROOT, candidate)
        if (!existsSync(abs)) continue
        const content = readFileSync(abs, 'utf8')
        const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
        if (fm) {
            const t = fm[1].match(/^\s*(?:navTitle|title):\s*["']?(.+?)["']?\s*$/m)
            if (t) return t[1].trim()
        }
        const h1 = content.match(/^#\s+(.+?)\s*$/m)
        if (h1) return h1[1].trim()
        return null // file exists but no title found
    }
    return undefined // file no longer exists
}

/** Fallback title derived from the path when no current file/title is available. */
function fallbackTitle (rel) {
    const noExt = rel.replace(/\.(md|njk)$/, '')
    const name = noExt.endsWith('/index') || noExt === 'index'
        ? (noExt.replace(/\/?index$/, '').split('/').pop() || 'Handbook')
        : noExt.split('/').pop()
    return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/** Monday (UTC) of the ISO week containing the given YYYY-MM-DD date. */
export function mondayOf (dateStr) {
    const d = new Date(dateStr + 'T00:00:00Z')
    const day = d.getUTCDay() // 0=Sun .. 6=Sat
    d.setUTCDate(d.getUTCDate() + (day === 0 ? -6 : 1 - day))
    return d
}

function fmtDate (d) {
    return d.toISOString().slice(0, 10)
}

const LABEL_FMT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

/** Strip a trailing PR/issue reference like " (#123)" from a commit subject. */
function stripRef (subject) {
    return subject.replace(/\s*\(#\d+\)\s*$/, '').trim()
}

/**
 * Collapse a flat list of contributing commits into the deduped pull-request
 * rows shown per week. One PR can land as several commits (#NNNN appears on
 * each), and one commit can touch several pages — both must surface ONCE.
 *
 * Dedup key: the PR number from the trailing `(#NNNN)` in the subject; a direct
 * commit with no PR number falls back to its own sha (so unrelated direct
 * commits never merge). The newest commit of a PR is kept as the representative
 * (its title/sha/date). Returned newest-first.
 *
 * @param {Array<{sha:string,date:string,subject:string,commitUrl:string,prUrl:string|null}>} commits
 * @returns {Array<{title:string,url:string,prNumber:number|null,sha:string,date:string}>}
 */
export function prsFromCommits (commits) {
    const map = new Map()
    for (const c of commits) {
        const m = c.subject.match(/\(#(\d+)\)\s*$/)
        const prNumber = m ? Number(m[1]) : null
        const key = prNumber !== null ? `pr:${prNumber}` : `sha:${c.sha}`
        const entry = {
            title: stripRef(c.subject),
            url: c.prUrl || c.commitUrl,
            prNumber,
            sha: c.sha,
            date: c.date
        }
        const existing = map.get(key)
        // First sighting, or a newer commit of the same PR — keep the newest.
        if (!existing || entry.date > existing.date) map.set(key, entry)
    }
    return [...map.values()].sort(
        (a, b) => (b.date.localeCompare(a.date)) || a.sha.localeCompare(b.sha)
    )
}

/**
 * Returns an array of weeks, newest first:
 *   { label, weekStart, weekEnd,
 *     pages: [{ url, title, path, changeType, date, commitUrl, prUrl, exists, commits }],
 *     prs:   [{ title, url, prNumber, sha, date }] }
 * Resilient by design: any failure (e.g. git missing) yields [].
 */
export function getHandbookChanges (repoRoot = process.cwd()) {
    let output
    try {
        // Resolve the repo root so the command works regardless of the cwd Nitro runs in.
        const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: repoRoot })
            .toString().trim() || repoRoot
        repoRoot = root
        output = execFileSync('git', [
            'log', '--no-merges', '-M', '--name-status', '--date=short',
            `--pretty=format:${SEP}%H${SEP}%ad${SEP}%s`,
            '--', 'nuxt/content/handbook', 'src/handbook'
        ], { cwd: repoRoot, maxBuffer: 64 * 1024 * 1024 }).toString()
    } catch (err) {
        // Never break the build/render if git is unavailable.
        // eslint-disable-next-line no-console
        console.warn('[handbookChanges] git log failed:', err?.message)
        return []
    }

    // Parse the log into commits with their changed files.
    const commits = []
    let cur = null
    for (const line of output.split('\n')) {
        if (line.startsWith(SEP)) {
            const [, sha, date, subject] = line.split(SEP)
            cur = { sha, date, subject, files: [] }
            commits.push(cur)
        } else if (line.trim() && cur) {
            const parts = line.split('\t')
            const status = parts[0]
            const path = status.startsWith('R') || status.startsWith('C') ? parts[2] : parts[1]
            if (path) cur.files.push({ status, path })
        }
    }

    const titleCache = new Map()
    const getTitle = (rel) => {
        if (!titleCache.has(rel)) titleCache.set(rel, readTitle(rel, repoRoot))
        return titleCache.get(rel)
    }

    // weekStart -> { ...week, pageMap: Map<url, page> }; insertion order is newest-first.
    const weeks = new Map()

    for (const commit of commits) {
        const prMatch = commit.subject.match(/\(#(\d+)\)\s*$/)
        const prUrl = prMatch ? `${REPO_URL}/pull/${prMatch[1]}` : null
        const commitUrl = `${REPO_URL}/commit/${commit.sha}`
        const monday = mondayOf(commit.date)
        const weekStart = fmtDate(monday)

        let week = weeks.get(weekStart)
        if (!week) {
            const end = new Date(monday)
            end.setUTCDate(end.getUTCDate() + 6)
            week = {
                label: `Week of ${LABEL_FMT.format(monday)}`,
                weekStart,
                weekEnd: fmtDate(end),
                pageMap: new Map()
            }
            weeks.set(weekStart, week)
        }

        for (const file of commit.files) {
            const rel = toHandbookRel(file.path)
            if (!rel) continue
            const url = relToUrl(rel)
            const changeType = CHANGE_TYPES[file.status[0]] || 'Updated'
            const contribution = { sha: commit.sha, date: commit.date, subject: commit.subject, commitUrl, prUrl }

            const existing = week.pageMap.get(url)
            if (existing) {
                // Page already changed (more recently) this week: just record the extra commit.
                existing.commits.push(contribution)
                continue
            }

            const title = getTitle(rel)
            week.pageMap.set(url, {
                url,
                path: rel,
                title: (title || fallbackTitle(rel)),
                changeType,
                date: commit.date,
                exists: title !== undefined, // current file present?
                commitUrl,
                prUrl,
                commits: [contribution]
            })
        }
    }

    // Drop empty weeks (commits that touched only non-tracked files) and finalise shape.
    const result = []
    for (const week of weeks.values()) {
        if (week.pageMap.size === 0) continue
        const pages = [...week.pageMap.values()].sort(
            (a, b) => (b.date.localeCompare(a.date)) || a.title.localeCompare(b.title)
        )

        // Collect every commit that contributed to this week's pages and collapse
        // them to one row per pull request (deduped by PR number; direct commits
        // keyed by sha). See prsFromCommits.
        const prs = prsFromCommits(pages.flatMap(page => page.commits))

        result.push({ label: week.label, weekStart: week.weekStart, weekEnd: week.weekEnd, pages, prs })
    }
    // Sort newest week first. Insertion order follows commit traversal (by commit
    // date) but weeks are keyed by author date, so the two can diverge — sort
    // explicitly to guarantee the "newest week first" contract.
    result.sort((a, b) => b.weekStart.localeCompare(a.weekStart))
    return result
}

export default getHandbookChanges
