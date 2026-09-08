// Serves one core node's built-in help, mirrored from the Node-RED project.
//
// Runs at build time during prerender, so the help is inlined into the static page and a
// visitor (or a crawler) never waits on GitHub. Live during `nuxt dev`. Responses are
// cached per locale file rather than per node, because one file often serves several.
//
// This replaces a build-time generator that fetched the same content and baked it into
// generated markdown. The pages are ordinary content files now: each asks for its help by
// name through the ::node-red-help component, and this answers.
import sanitizeHtml from 'sanitize-html'

import { extractHelp, helpUrlFor, isSafeHelpRef } from '../../lib/node-red-help.mjs'
import { cachedFetch } from '../utils/build-cache'

// A day. The help changes rarely, and a stale hour costs nothing; the point of caching is
// that a full prerender asks GitHub for ~20 files rather than one per page.
const TTL_MS = 24 * 60 * 60 * 1000

// Node-RED's help is prose and simple tables. Nothing here needs script, style, iframes or
// event handlers, so the allowlist is the shape of the content rather than a denylist of
// the dangerous parts: this is third-party HTML rendered with v-html.
const ALLOWED_TAGS = [
    'p', 'br', 'b', 'strong', 'i', 'em', 'code', 'pre', 'kbd', 'span',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'h3', 'h4', 'h5',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'a', 'blockquote',
]

export default defineEventHandler(async (event) => {
    const { category, file, node } = getQuery(event)

    // The upstream URL is built from these, so they are validated before they reach it
    // rather than trusted: a path segment is all they may be.
    if (!isSafeHelpRef({ category, file }) || typeof node !== 'string' || !node.trim()) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid Node-RED help reference' })
    }

    const url = helpUrlFor({ category: String(category), file: String(file) })
    const localeFile = await cachedFetch<string>(url, {
        type: 'text',
        ttlMs: TTL_MS,
        namespace: 'node-red-help',
    })

    const help = extractHelp(localeFile, node)
    if (!help) {
        // Loud rather than an empty section. Upstream reorganising a locale file is the
        // one failure that used to ship a page with a "Node help" heading and nothing
        // under it, and it is not something a retry fixes.
        throw createError({
            statusCode: 502,
            statusMessage: `Node-RED has no help named "${node}" in ${category}/${file}.html`,
        })
    }

    return {
        html: sanitizeHtml(help, {
            allowedTags: ALLOWED_TAGS,
            allowedAttributes: { a: ['href', 'title'], th: ['scope'] },
            allowedSchemes: ['http', 'https', 'mailto'],
        }),
    }
})
