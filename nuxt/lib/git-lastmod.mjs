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
// commits per file is "twice the necessary" work); this module's `--name-status` walk
// below shares the same core insight - one walk, not one process per file, and the first
// occurrence of a path scanning newest-first is its most recent commit - but reads the
// whole history as flat text and dedupes in JS rather than pruning the walk itself, which
// is fine at this repo's history size (a few seconds, once, memoized) but wouldn't scale
// to a git-last-modified-sized monorepo.
import { execFileSync } from 'node:child_process'

// A NUL byte can't appear in a file path, so it safely marks a commit-date line apart
// from the `--name-status` file lines that follow it. `%x00` asks git to emit the byte
// into its output; the argv string itself only ever contains the ASCII text "%x00".
const NUL = '\u0000'
const mapCache = new Map()

/**
 * Pure parser for `git log --first-parent -m --pretty=format:%x00%ci --name-status -M100%`
 * output - split out from buildLastmodMap so the newest-first/first-occurrence-wins logic
 * can be unit tested against fixture strings without shelling out to git or touching a
 * real repo.
 *
 * A move is not an edit. When a file was moved without changing it (an `R100` line), its
 * history under the old path still counts as its own, so moving a content tree (src/blog
 * to nuxt/content/blog, say) does not stamp every page in it with the date of the move.
 * With `-M100%` every rename line is an R100: a move that also edited the file comes out
 * as an add and a delete, so the add dates it. A lower rename score, should the flag ever
 * change, is counted as an edit. Deletions are skipped: a path that is gone has no page
 * to date.
 *
 * @param {string} output raw stdout from the git log invocation above
 * @returns {Map<string, string>} file path -> most recent commit date
 */
export function parseGitLogOutput (output) {
    const map = new Map()
    // Older names of a moved file, pointing at the name it has now. The walk is main's own
    // history, newest first, so a move is always seen before anything that happened under
    // the old name.
    const movedTo = new Map()
    const currentName = path => movedTo.get(path) ?? path
    let currentDate = null
    for (const line of output.split('\n')) {
        if (line.startsWith(NUL)) {
            currentDate = line.slice(1)
            continue
        }
        if (!line) continue
        const [status, ...paths] = line.split('\t')
        if (status.startsWith('R')) {
            const [from, to] = paths
            const name = currentName(to)
            movedTo.set(from, name)
            if (status !== 'R100' && !map.has(name)) map.set(name, currentDate)
            continue
        }
        if (status === 'D') continue
        const name = currentName(paths[paths.length - 1])
        if (!map.has(name)) map.set(name, currentDate)
    }
    return map
}

function buildLastmodMap (repoRoot) {
    let output
    try {
        // Newest-first: the first time a path is seen while walking top-to-bottom is its
        // most recent commit. `--first-parent -m` walks main's own history and lists what
        // each merge changed against main, so a change merged in from a branch is dated
        // when it reached main, and is listed under the path it has there. Without it, a
        // branch commit made after a move but still naming the old path is interleaved by
        // date, filed under the old name, and the page keeps its pre-move date. `-M100%`
        // detects only exact moves, which git finds by blob id without the pairwise content
        // scoring a looser threshold would run on every commit.
        output = execFileSync(
            'git',
            ['log', '--first-parent', '-m', '--pretty=format:%x00%ci', '--name-status', '-M100%'],
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
 * @param {string} relativePath path to the file, relative to repoRoot (e.g. "nuxt/content/blog/2024/01/post.md")
 * @returns {string|undefined} the ISO-ish commit date git log reports, or undefined if unknown
 */
export function getGitLastmod (repoRoot, relativePath) {
    if (!mapCache.has(repoRoot)) {
        mapCache.set(repoRoot, buildLastmodMap(repoRoot))
    }
    return mapCache.get(repoRoot).get(relativePath)
}
