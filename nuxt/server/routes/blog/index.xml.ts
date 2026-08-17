import { queryCollection } from '@nuxt/content/server'

async function loadPeople(mount: string): Promise<Record<string, { name: string }>> {
    const storage = useStorage(`assets:${mount}`)
    const people: Record<string, { name: string }> = {}
    for (const key of await storage.getKeys()) {
        if (!key.endsWith('.json')) continue
        const raw = await storage.getItem<string | { name: string }>(key)
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
        people[key.replace(/^.*:/, '').replace(/\.json$/, '')] = parsed as { name: string }
    }
    return people
}

function escapeXml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

function isFuturePost(date: string | Date): boolean {
    return new Date(date) > new Date() && process.env.CONTEXT === 'production'
}

// entry.body is a minimark tree: { value: MinimarkNode[] } where a node is
// either a text string or an element array [tag, props, ...children].
type MinimarkNode = string | [string, Record<string, unknown> | null, ...MinimarkNode[]]

const VOID_TAGS = new Set(['img', 'br', 'hr'])

function absoluteUrl(url: string): string {
    if (/^https?:\/\//.test(url)) return url
    return `https://flowfuse.com${url.startsWith('/') ? '' : '/'}${url}`
}

function toKebabCase(key: string): string {
    return key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

function attrsToHtml(props: Record<string, unknown> | null): string {
    if (!props) return ''
    const attrs: string[] = []
    for (const [rawKey, value] of Object.entries(props)) {
        if (value == null || value === false) continue
        const key = rawKey === 'className' ? 'class' : toKebabCase(rawKey)
        if (key === 'class') {
            attrs.push(`class="${escapeXml(String(Array.isArray(value) ? value.join(' ') : value))}"`)
            continue
        }
        if ((key === 'href' || key === 'src') && typeof value === 'string') {
            attrs.push(`${key}="${escapeXml(absoluteUrl(value))}"`)
            continue
        }
        if (value === true) {
            attrs.push(key)
            continue
        }
        attrs.push(`${key}="${escapeXml(String(value))}"`)
    }
    return attrs.length ? ` ${attrs.join(' ')}` : ''
}

function minimarkToHtml(node: MinimarkNode): string {
    if (typeof node === 'string') return escapeXml(node)
    const [tag, props, ...children] = node
    // Custom Vue components (e.g. cta-image, feature-tier-badges) have no
    // meaningful standalone markup, so the feed omits them entirely.
    if (tag.includes('-')) return ''
    const innerHtml = children.map(minimarkToHtml).join('')
    if (VOID_TAGS.has(tag)) return `<${tag}${attrsToHtml(props)}/>`
    return `<${tag}${attrsToHtml(props)}>${innerHtml}</${tag}>`
}

function renderBodyToHtml(body: { value?: MinimarkNode[] } | undefined): string {
    return (body?.value || []).map(minimarkToHtml).join('')
}

export default defineEventHandler(async (event) => {
    const [allEntries, teamPeople, guestPeople] = await Promise.all([
        queryCollection(event, 'blog').order('date', 'DESC').all(),
        loadPeople('team'),
        loadPeople('guests'),
    ])
    const people = { ...teamPeople, ...guestPeople }
    // Full post bodies are heavy - cap the feed to the most recent posts rather
    // than shipping the entire multi-megabyte blog archive on every request.
    const entries = allEntries.filter(entry => !isFuturePost(entry.date)).slice(0, 20)

    const updated = entries[0]?.date ? new Date(entries[0].date).toISOString() : new Date(0).toISOString()

    const items = entries.map((entry) => {
        const absoluteUrl = `https://flowfuse.com${entry.path}/`
        const authorTags = (entry.authors || [])
            .map(username => people[username]?.name)
            .filter(Boolean)
            .map(name => `<author><name>${escapeXml(name)}</name></author>`)
            .join('\n        ')
        const bodyHtml = renderBodyToHtml(entry.body).replace(/]]>/g, ']]&gt;')
        return `    <entry>
        <id>${absoluteUrl}</id>
        <title>${escapeXml(entry.title)}</title>
        <summary>${escapeXml(entry.subtitle || entry.description || '')}</summary>
        <content type="html"><![CDATA[${bodyHtml}]]></content>
        <updated>${new Date(entry.date).toISOString()}</updated>
        <link href="${absoluteUrl}"/>
        ${authorTags}
    </entry>`
    }).join('\n')

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>FlowFuse</title>
    <link href="https://flowfuse.com/blog/index.xml" rel="self"/>
    <link href="https://flowfuse.com/blog"/>
    <updated>${updated}</updated>
    <id>https://flowfuse.com/blog</id>
${items}
</feed>`

    setResponseHeader(event, 'content-type', 'application/atom+xml; charset=utf-8')
    return xml
})
