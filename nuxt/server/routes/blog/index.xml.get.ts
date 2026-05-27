// Atom feed for /blog/index.xml — replaces the legacy 11ty feed.njk.
// Newest-first over every blog post, from the generated blog.index.json.
import indexData from '../../../blog.index.json'
import authors from '../../../blog.authors.json'

const SITE = 'https://flowfuse.com'
const esc = (s: string) =>
    String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export default defineEventHandler((event) => {
    const cards = (indexData as any).cards as Array<any>
    const updated = cards[0]?.date || new Date().toISOString()

    const entries = cards.map((c) => {
        const abs = SITE + c.url
        const authorTags = (c.authors || [])
            .map((a: string) => (authors as any)[a]?.name)
            .filter(Boolean)
            .map((n: string) => `\n        <author><name>${esc(n)}</name></author>`)
            .join('')
        return `    <entry>
        <id>${abs}</id>
        <title>${esc(c.title)}</title>
        <summary>${esc(c.description)}</summary>
        <updated>${c.date || updated}</updated>
        <link href="${abs}"/>${authorTags}
        <content type="html">${esc(c.description)}</content>
    </entry>`
    }).join('\n')

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>FlowFuse</title>
    <link href="${SITE}/blog/index.xml" rel="self"/>
    <link href="${SITE}/blog"/>
    <updated>${updated}</updated>
    <id>${SITE}/blog</id>
${entries}
</feed>`

    setHeader(event, 'content-type', 'application/xml; charset=utf-8')
    return xml
})
