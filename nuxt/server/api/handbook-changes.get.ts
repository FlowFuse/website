// Exposes the git-derived handbook change log to the Recent Changes page.
//
// Runs at build time during prerender (the data is then inlined into the
// static page) and live during `nuxt dev`. The work itself lives in a
// framework-agnostic module so it can also be exercised standalone.
import { getHandbookChanges } from '../lib/handbookChanges.mjs'

// Cap the window served to the page. The module returns the full history (and
// stays reusable/testable that way); the page only needs recent weeks, so we
// avoid inlining the entire history into the prerendered payload.
const MAX_WEEKS = 26

export default defineEventHandler(() => {
    // process.cwd() is the Nuxt workspace; the module resolves the real git
    // repo root via `git rev-parse --show-toplevel`, so this works from either
    // the workspace or the repo root.
    const weeks = getHandbookChanges(process.cwd()).slice(0, MAX_WEEKS).map(week => ({
        label: week.label,
        weekStart: week.weekStart,
        weekEnd: week.weekEnd,
        // Project to just what the page renders (drop the per-page commits list).
        pages: week.pages.map(({ commits, ...page }) => page),
        // Deduped pull requests that contributed to this week.
        prs: week.prs
    }))
    return { weeks }
})
