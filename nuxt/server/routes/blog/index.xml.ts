import { queryCollection } from '@nuxt/content/server'
import site from '../../../../src/_data/site.json'
// @ts-ignore untyped module
import { planBadges } from '../../../lib/feature-catalog.mjs'
// @ts-ignore untyped module
import { resolveReleaseFeatures, injectReleaseFeatures } from '../../../lib/release-features.mjs'

// Mirrors nuxt/components/content/CtaImage.vue's DESTINATIONS map - kept in
// sync manually since the feed can't import a .vue component's script setup.
const CTA_IMAGE_DESTINATIONS: Record<string, string> = {
    'sign-up': `${site.appURL}/account/create`,
    demo: '/book-demo/',
    contact: '/contact-us/',
    pricing: '/pricing',
}

// Mirrors nuxt/components/BlogPostCta.vue's CTA_VARIANTS and fixed Cta*
// button labels (see CtaSignUp/CtaBookDemo/CtaContactUs) - every post ends
// with this block, defaulting to 'sign-up' when frontmatter `cta` is unset
// or names an unrecognised type.
const END_CTA_VARIANTS: Record<string, { title: string, description: string, label: string }> = {
    'sign-up': {
        title: 'Start building with your own industrial data',
        description: 'Connect your systems, automate workflows, and see what’s possible in your environment.',
        label: 'Try it out',
    },
    demo: {
        title: 'See how FlowFuse works in real environments',
        description: 'Walk through real use cases and see how teams connect systems, automate workflows, and deploy at scale.',
        label: 'Book a Demo',
    },
    contact: {
        title: 'Discuss your use case with our team',
        description: 'See how FlowFuse can support your architecture, integrations, and deployment needs.',
        label: 'Contact Us',
    },
    pricing: {
        title: 'Explore plans that fit your deployment',
        description: 'Compare options based on your scale, infrastructure, and security requirements.',
        label: 'View Pricing',
    },
}

function buildEndCta(entry: { cta?: { type?: string, title?: string, description?: string } | null }): string {
    const type = entry.cta?.type && END_CTA_VARIANTS[entry.cta.type] ? entry.cta.type : 'sign-up'
    const variant = END_CTA_VARIANTS[type]
    const title = entry.cta?.title || variant.title
    const description = entry.cta?.description || variant.description
    const href = CTA_IMAGE_DESTINATIONS[type]
    return `<p><strong>${escapeXml(title)}</strong></p><p>${escapeXml(description)}</p><p><a href="${escapeXml(absoluteUrl(href))}">${escapeXml(variant.label)}</a></p>`
}

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

// See useBlogList.ts: the production flag is baked at build time, not read from
// process.env, which is empty of it inside the deployed Netlify function.
function isFuturePost(date: string | Date, isProductionContext: boolean): boolean {
    return new Date(date) > new Date() && isProductionContext
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
    // ::cta-image{...} carries its own src/alt/cta, so it renders as a real
    // <img> (linked to its destination) instead of being dropped like other
    // custom components.
    if (tag === 'cta-image' && props) {
        const src = typeof props.src === 'string' ? props.src : ''
        const alt = typeof props.alt === 'string' ? props.alt : ''
        const href = CTA_IMAGE_DESTINATIONS[props.cta as string]
        const img = `<img src="${escapeXml(absoluteUrl(src))}" alt="${escapeXml(alt)}"/>`
        return href ? `<a href="${escapeXml(absoluteUrl(href))}">${img}</a>` : img
    }
    // Injected into release-blog bodies by injectReleaseFeatures (see below) - each
    // plan names its own product page, mirroring FeatureTierBadges.vue.
    if (tag === 'feature-tier-badges' && props) {
        const plans = typeof props.plans === 'string' ? props.plans.split(',').map(p => p.trim()).filter(Boolean) : []
        const badges = planBadges(plans) as Array<{ plan: string, href: string }>
        if (!badges.length) return ''
        const links = badges.map(badge => `<a href="${escapeXml(absoluteUrl(badge.href))}">${escapeXml(badge.plan)}</a>`).join(', ')
        return `<p>Available in: ${links}</p>`
    }
    // Also injected by injectReleaseFeatures, mirroring FeatureReleaseLinks.vue.
    if (tag === 'feature-release-links' && props) {
        const changelog = Array.isArray(props.changelog) ? props.changelog as Array<{ url: string, label: string }> : []
        const docs = props.docs as { href: string, label: string } | null | undefined
        const parts: string[] = []
        if (changelog.length) {
            const links = changelog.map(entry => `<a href="${escapeXml(absoluteUrl(entry.url))}">${escapeXml(entry.label)}</a>`).join(' | ')
            parts.push(`<p>Changelog: ${links}</p>`)
        }
        if (docs) {
            parts.push(`<p>Docs: <a href="${escapeXml(absoluteUrl(docs.href))}">${escapeXml(docs.label)}</a></p>`)
        }
        return parts.join('')
    }
    // Other custom Vue components have no meaningful standalone markup, so the
    // feed omits them entirely.
    if (tag.includes('-')) return ''
    const innerHtml = children.map(minimarkToHtml).join('')
    if (VOID_TAGS.has(tag)) return `<${tag}${attrsToHtml(props)}/>`
    return `<${tag}${attrsToHtml(props)}>${innerHtml}</${tag}>`
}

function renderBodyToHtml(body: { value?: MinimarkNode[] } | undefined): string {
    return (body?.value || []).map(minimarkToHtml).join('')
}

function buildSummary(entry: { tldr?: string | string[], description?: string, meta?: { description?: string }, subtitle?: string }): string {
    const tldr = Array.isArray(entry.tldr) ? entry.tldr.join(' ') : entry.tldr
    return tldr || entry.description || entry.meta?.description || entry.subtitle || ''
}

export default defineEventHandler(async (event) => {
    const [allEntries, teamPeople, guestPeople, catalog, changelogPosts] = await Promise.all([
        queryCollection(event, 'blog').order('date', 'DESC').all(),
        loadPeople('team'),
        loadPeople('guests'),
        queryCollection(event, 'featureCatalog').first(),
        queryCollection(event, 'changelog').select('path', 'title').all(),
    ])
    const people = { ...teamPeople, ...guestPeople }
    // Full post bodies are heavy - cap the feed to the most recent posts rather
    // than shipping the entire multi-megabyte blog archive on every request.
    const { isProductionContext } = useRuntimeConfig(event).public
    const entries = allEntries.filter(entry => !isFuturePost(entry.date, isProductionContext)).slice(0, 20)

    // Mirrors useReleaseFeaturePage: splices plan-availability badges and changelog/docs
    // links into a release blog's body, resolved from its `features:` frontmatter.
    const changelogTitles: Record<string, string> = Object.fromEntries(
        changelogPosts.map(post => [`${post.path.replace(/\/+$/, '')}/`, post.title]),
    )
    function withReleaseFeatures(entry: typeof entries[number]) {
        if (!catalog || !entry.release || !entry.features?.length || !entry.body?.value) return entry.body
        const resolved = resolveReleaseFeatures(entry.features, catalog, entry.release, changelogTitles)
        return { ...entry.body, value: injectReleaseFeatures(entry.body.value, resolved) }
    }

    const updated = entries[0]?.date ? new Date(entries[0].date).toISOString() : new Date(0).toISOString()

    const items = entries.map((entry) => {
        const absoluteUrl = `https://flowfuse.com${entry.path}/`
        const authorTags = (entry.authors || [])
            .map(username => people[username]?.name)
            .filter(Boolean)
            .map(name => `<author><name>${escapeXml(name)}</name></author>`)
            .join('\n        ')
        const bodyHtml = (renderBodyToHtml(withReleaseFeatures(entry)) + buildEndCta(entry)).replace(/]]>/g, ']]&gt;')
        return `    <entry>
        <id>${absoluteUrl}</id>
        <title>${escapeXml(entry.title)}</title>
        <summary>${escapeXml(buildSummary(entry))}</summary>
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
