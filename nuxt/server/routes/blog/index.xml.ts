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

export default defineEventHandler(async (event) => {
    const [allEntries, teamPeople, guestPeople] = await Promise.all([
        queryCollection(event, 'blog').order('date', 'DESC').all(),
        loadPeople('team'),
        loadPeople('guests'),
    ])
    const people = { ...teamPeople, ...guestPeople }
    const entries = allEntries.filter(entry => !isFuturePost(entry.date))

    const updated = entries[0]?.date ? new Date(entries[0].date).toISOString() : new Date(0).toISOString()

    const items = entries.map((entry) => {
        const absoluteUrl = `https://flowfuse.com${entry.path}/`
        const authorTags = (entry.authors || [])
            .map(username => people[username]?.name)
            .filter(Boolean)
            .map(name => `<author><name>${escapeXml(name)}</name></author>`)
            .join('\n        ')
        return `    <entry>
        <id>${absoluteUrl}</id>
        <title>${escapeXml(entry.title)}</title>
        <summary>${escapeXml(entry.subtitle || entry.description || '')}</summary>
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
