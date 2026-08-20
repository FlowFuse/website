// Enforces the metaTitle length guidance documented in
// nuxt/content/handbook/marketing/content-strategy/blog.md#meta-title.
// Kept free of Nuxt imports so `node --test` can run it directly.

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import yaml from 'js-yaml'

// Google truncates search-result titles at roughly this width; metaTitle is meant to fit
// on its own, before the ` • FlowFuse Blog`/`FlowFuse Changelog` suffix is appended.
export const MAX_META_TITLE_LENGTH = 60

/** Recursively lists every `.md` file under `dir`. */
function listMarkdownFiles (dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const path = join(dir, entry.name)
        if (entry.isDirectory()) return listMarkdownFiles(path)
        return entry.isFile() && entry.name.endsWith('.md') ? [path] : []
    })
}

/** Parses the YAML frontmatter of a markdown file, or `null` if it has none. */
export function readFrontmatter (filePath) {
    const content = readFileSync(filePath, 'utf8')
    const match = content.match(/^---\n([\s\S]*?)\n---/)
    return match ? yaml.load(match[1]) : null
}

/**
 * Every `metaTitle` under `dir` (recursively) that exceeds MAX_META_TITLE_LENGTH characters.
 * Files with no `metaTitle` set are skipped - only authors who set the field are held to it.
 */
export function findOverlongMetaTitles (dir) {
    return listMarkdownFiles(dir)
        .map(file => ({ file, metaTitle: readFrontmatter(file)?.metaTitle }))
        .filter(({ metaTitle }) => typeof metaTitle === 'string' && metaTitle.length > MAX_META_TITLE_LENGTH)
        .map(({ file, metaTitle }) => ({ file, metaTitle, length: metaTitle.length }))
}

export function isDirectory (path) {
    try {
        return statSync(path).isDirectory()
    } catch {
        return false
    }
}
