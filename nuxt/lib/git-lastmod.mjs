// Resolves a file's sitemap `lastmod` from git history rather than build time, so a
// static-generated site doesn't stamp every URL with the deploy timestamp. Builds the
// whole repo-root -> commit-date map in one `git log` walk (memoized per repoRoot)
// instead of spawning `git log` per file, which would be one process per content page -
// the same N+1 GitLab hit in Gitaly's ListLastCommitsForTree RPC (used to render a
// "last commit" column per file in the web file browser), which originally ran
// `git log -1` once per tree entry. GitLab's fix - upstreamed into git.git as the
// `git last-modified` builtin (Git 2.52, née GitHub's internal "blame-tree", used for
// GitHub's own file-browser column since 2012) - walks commit history once and, at each
// commit, diffs trees to see which of the *still-unresolved* requested paths changed,
// pruning whole unchanged subtrees via tree-object-id ("treesame") comparisons instead of
// diffing file-by-file, and stops early once every path has been resolved. That is a
// more efficient shared walk (matches Gitaly/GitHub's write-up: revisiting the same
// commits per file is "twice the necessary" work); this module's `--name-only` walk
// below shares the same core insight - one walk, not one process per file, and the first
// occurrence of a path scanning newest-first is its most recent commit - but reads the
// whole history as flat text and dedupes in JS rather than pruning the walk itself, which
// is fine at this repo's history size (a few seconds, once, memoized) but wouldn't scale
// to a git-last-modified-sized monorepo.
import { execFileSync } from 'node:child_process'

// A NUL byte can't appear in a file path, so it safely marks a commit-date line apart
// from the `--name-only` file lines that follow it. `%x00` asks git to emit the byte
// into its output; the argv string itself only ever contains the ASCII text "%x00".
const NUL = '\u0000'
const mapCache = new Map()

/**
 * Pure parser for `git log --pretty=format:%x00%ci --name-only` output - split out from
 * buildLastmodMap so the newest-first/first-occurrence-wins logic can be unit tested
 * against fixture strings without shelling out to git or touching a real repo.
 *
 * @param {string} output raw stdout from the git log invocation above
 * @returns {Map<string, string>} file path -> most recent commit date
 */
export function parseGitLogOutput (output) {
    const map = new Map()
    let currentDate = null
    for (const line of output.split('\n')) {
        if (line.startsWith(NUL)) {
            currentDate = line.slice(1)
            continue
        }
        if (!line || map.has(line)) continue
        map.set(line, currentDate)
    }
    return map
}

function buildLastmodMap (repoRoot) {
    let output
    try {
        // Newest-first (git log's default order): the first time a path is seen while
        // walking top-to-bottom is its most recent commit.
        output = execFileSync(
            'git',
            ['log', '--pretty=format:%x00%ci', '--name-only'],
            { cwd: repoRoot, encoding: 'utf8', maxBuffer: 1024 * 1024 * 256 }
        )
    } catch (err) {
        console.warn(`[sitemap] git log failed in ${repoRoot}, lastmod will be omitted: ${err.message}`)
        return new Map()
    }

    return parseGitLogOutput(output)
}

/**
 * @param {string} repoRoot absolute path to the git repository root
 * @param {string} relativePath path to the file, relative to repoRoot (e.g. "src/blog/2024/01/post.md")
 * @returns {string|undefined} the ISO-ish commit date git log reports, or undefined if unknown
 */
export function getGitLastmod (repoRoot, relativePath) {
    if (!mapCache.has(repoRoot)) {
        mapCache.set(repoRoot, buildLastmodMap(repoRoot))
    }
    return mapCache.get(repoRoot).get(relativePath)
}
