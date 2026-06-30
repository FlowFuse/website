import { readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve, relative, basename } from 'node:path'

const PAGE_SIZE = 19

// Normalise YAML dates ("2022-03-17 1:00:00.0", "2026-04-24") to ISO strings.
function normalizeDate(s: string): string {
    const m = String(s).trim().match(/^(\d{4}-\d{2}-\d{2})(?:\s+(\d{1,2}):(\d{2}):(\d{2}))?/)
    if (!m) return s
    if (!m[2]) return `${m[1]}T00:00:00.000Z`
    return `${m[1]}T${m[2].padStart(2, '0')}:${m[3]}:${m[4]}.000Z`
}

export interface BlogPost {
    title: string
    date: string
    url: string
    description: string
    image: string | null
    authors: Array<{ id: string; name: string }>
}

function parseFrontmatter(src: string): Record<string, unknown> {
    const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!m) return {}

    const result: Record<string, unknown> = {}
    const lines = m[1].split('\n')
    let i = 0

    while (i < lines.length) {
        const line = lines[i]
        if (!line.trim() || line.trim().startsWith('#')) { i++; continue }

        if (!/^\s/.test(line)) {
            const kv = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/)
            if (kv) {
                const key = kv[1]
                const val = kv[2].trim()

                if (!val) {
                    // Block sequence: collect indented "- item" lines
                    const items: string[] = []
                    while (i + 1 < lines.length && /^\s+-\s/.test(lines[i + 1])) {
                        i++
                        items.push(lines[i].trim().replace(/^-\s+/, '').replace(/^["']|["']$/g, ''))
                    }
                    result[key] = items
                } else if (val.startsWith('[')) {
                    // Inline sequence: ["item1", "item2"]
                    result[key] = val.slice(1, -1)
                        .split(',')
                        .map(s => s.trim().replace(/^["']|["']$/g, ''))
                        .filter(Boolean)
                } else if (val.startsWith('"') || val.startsWith("'")) {
                    result[key] = val.slice(1, -1)
                } else {
                    result[key] = val
                }
            }
        }
        i++
    }

    return result
}

function loadPeople(srcDir: string): Record<string, string> {
    const people: Record<string, string> = {}
    for (const subdir of ['_data/team', '_data/guests']) {
        try {
            const fullDir = resolve(srcDir, subdir)
            for (const file of readdirSync(fullDir)) {
                if (!file.endsWith('.json')) continue
                const data = JSON.parse(readFileSync(resolve(fullDir, file), 'utf-8'))
                people[basename(file, '.json')] = data.name
            }
        } catch {
            // directory may not exist
        }
    }
    return people
}

function collectPosts(dir: string, base: string): Array<Record<string, unknown>> {
    const posts: Array<Record<string, unknown>> = []
    for (const entry of readdirSync(dir)) {
        const full = resolve(dir, entry)
        if (statSync(full).isDirectory()) {
            posts.push(...collectPosts(full, base))
        } else if (entry.endsWith('.md')) {
            const content = readFileSync(full, 'utf-8')
            const data = parseFrontmatter(content)
            if (!data.title || !data.date) continue
            const rel = relative(base, full).replace(/\\/g, '/')
            data.url = `/blog/${rel.replace(/\.md$/, '/')}`
            posts.push(data)
        }
    }
    return posts
}

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const page = Math.max(1, Number(query.page) || 1)
    const tag = query.tag ? String(query.tag) : ''

    const srcDir = resolve(process.cwd(), '../src')
    const blogDir = resolve(srcDir, 'blog')
    const people = loadPeople(srcDir)

    const now = new Date()
    const all = collectPosts(blogDir, blogDir)
        .map(p => ({ ...p, _date: normalizeDate(String(p.date)) }))
        .filter(p => process.env.NODE_ENV !== 'production' || new Date(p._date) <= now)
        .filter(p => !tag || (Array.isArray(p.tags) && (p.tags as string[]).includes(tag)))
        .sort((a, b) => new Date(b._date).getTime() - new Date(a._date).getTime())

    const total = all.length
    const pageCount = Math.ceil(total / PAGE_SIZE)

    const posts: BlogPost[] = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(p => ({
        title: String(p.title),
        date: p._date,
        url: String(p.url),
        description: String(p.description || ''),
        image: p.image ? String(p.image).replace(/^(?!\/)/, '/') : null,
        authors: ((p.authors as string[]) || []).map(id => ({ id, name: people[id] || id })),
    }))

    return { posts, total, pageCount }
})
