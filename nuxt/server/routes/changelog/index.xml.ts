import { queryCollection } from '@nuxt/content/server'
// @ts-ignore untyped module
import { findFeatureByChangelog, featurePlanLabels, planBadges } from '../../../lib/feature-catalog.mjs'

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

// entry.body is a minimark tree: { value: MinimarkNode[] } where a node is
// either a text string or an element array [tag, props, ...children].
type MinimarkNode = string | [string, Record<string, unknown> | null, ...MinimarkNode[]]

const VOID_TAGS = new Set(['img', 'br', 'hr'])

function absoluteUrl(url: string): string {
    // Any URI with a scheme (https:, mailto:, tel:, ...) or an in-page anchor
    // is already a complete reference - only a bare site-relative path needs
    // the origin prepended.
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('#')) return url
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
    // Custom Vue components have no meaningful standalone markup, so the
    // feed omits them entirely.
    if (tag.includes('-')) return ''
    const innerHtml = children.map(minimarkToHtml).join('')
    if (VOID_TAGS.has(tag)) return `<${tag}${attrsToHtml(props)}/>`
    return `<${tag}${attrsToHtml(props)}>${innerHtml}</${tag}>`
}

function renderBodyToHtml(body: { value?: MinimarkNode[] } | undefined): string {
    return (body?.value || []).map(minimarkToHtml).join('')
}

export default defineEventHandler(async (event) => {
    // Full entry bodies are heavy - cap the feed to the most recent entries rather
    // than shipping the entire multi-megabyte changelog archive on every request.
    const [entries, teamPeople, guestPeople, catalog] = await Promise.all([
        queryCollection(event, 'changelog').order('date', 'DESC').limit(20).all(),
        loadPeople('team'),
        loadPeople('guests'),
        queryCollection(event, 'featureCatalog').first(),
    ])
    const people = { ...teamPeople, ...guestPeople }

    const updated = entries[0]?.date ? new Date(entries[0].date).toISOString() : new Date(0).toISOString()

    const items = entries.map((entry) => {
        const entryUrl = `https://flowfuse.com${entry.path}/`
        const authorTags = (entry.authors || [])
            .map(username => people[username]?.name)
            .filter(Boolean)
            .map(name => `<author><name>${escapeXml(name)}</name></author>`)
            .join('\n        ')
        // Mirrors the changelog page: FeatureTierBadges is looked up by this entry's own
        // path against the feature catalog, not embedded in the markdown body.
        const feature = catalog ? findFeatureByChangelog(catalog, entry.path) : null
        const badges = planBadges(featurePlanLabels(feature)) as Array<{ plan: string, href: string }>
        const badgesHtml = badges.length
            ? `<p>Available in: ${badges.map(badge => `<a href="${escapeXml(absoluteUrl(badge.href))}">${escapeXml(badge.plan)}</a>`).join(', ')}</p>`
            : ''
        const bodyHtml = badgesHtml + renderBodyToHtml(entry.body).replace(/]]>/g, ']]&gt;')
        return `    <entry>
        <id>${entryUrl}</id>
        <title>${escapeXml(entry.title)}</title>
        <summary>${escapeXml(entry.subtitle || entry.description || '')}</summary>
        <content type="html"><![CDATA[${bodyHtml}]]></content>
        <updated>${new Date(entry.date).toISOString()}</updated>
        <link href="${entryUrl}"/>
        ${authorTags}
    </entry>`
    }).join('\n')

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>FlowFuse - Changelog</title>
    <link href="https://flowfuse.com/changelog/index.xml" rel="self"/>
    <link href="https://flowfuse.com/changelog"/>
    <updated>${updated}</updated>
    <id>https://flowfuse.com/changelog</id>
${items}
</feed>`

    setResponseHeader(event, 'content-type', 'application/atom+xml; charset=utf-8')
    return xml
})
