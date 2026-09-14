// Selecting one node's built-in help out of the Node-RED project's locale files.
//
// The core-node pages are ordinary content files that ask for their help by name, via the
// ::node-red-help component; this is the part that knows how to find it. Kept in nuxt/lib
// as plain JS so `node --test` can exercise the selection rules without the network.

import sanitizeHtml from 'sanitize-html'

export const UPSTREAM = 'https://raw.githubusercontent.com/node-red/node-red/master/packages/node_modules/%40node-red/nodes/locales/en-US'

/**
 * Hyphen-versus-space is not cosmetic here. The old catalogue asked for `mqtt-in` while
 * upstream's file says `mqtt in`; the Eleventy version matched on the literal string,
 * found nothing, and rendered an empty help section, which is how the live mqtt-in and
 * mqtt-out pages came to ship no help at all.
 */
const normalise = (s) => String(s).toLowerCase().replace(/[\s-]+/g, ' ').trim()

/** Every `<script data-help-name="...">` block in a locale file, in document order. */
function helpBlocks (html) {
    return [...String(html).matchAll(
        /<script[^>]*\bdata-help-name="([^"]*)"[^>]*>([\s\S]*?)<\/script>/g
    )].map(([, name, body]) => ({ name, body }))
}

/**
 * The help for one node, or '' if the file has nothing matching.
 *
 * An exact name wins on its own: asking for `file` (Write File) must not also drag in
 * `file in` (Read File) and put two nodes' help on one page.
 *
 * Otherwise every name starting with the requested one, joined in document order. Several
 * pages cover a whole family rather than a single node - `link` covers link in, link out
 * and link call; `websocket` covers four - and the Eleventy page showed all of them, its
 * xpath being a starts-with() over a node set. Taking only the first match dropped most of
 * those pages' help while still captioning it as the node's complete built-in help.
 */
export function extractHelp (html, helpName) {
    const blocks = helpBlocks(html)
    const want = normalise(helpName)

    const exact = blocks.find(b => normalise(b.name) === want)
    if (exact) return exact.body.trim()

    return blocks
        .filter(b => normalise(b.name).startsWith(want))
        .map(b => b.body.trim())
        .filter(Boolean)
        .join('\n\n')
}

/**
 * Names a locale file offers that nothing asked for.
 *
 * The reverse of the lookup, and the only check that catches being quietly *wrong* rather
 * than quietly stale: a request that matches the wrong block succeeds, so no error is
 * raised. `read-file` pointed at `watch` for years, which matched, while `file in` - its
 * actual help - sat unclaimed in a different file entirely.
 */
export function unclaimedHelpNames (html, requestedNames) {
    const wanted = requestedNames.map(normalise)
    return helpBlocks(html)
        .map(b => b.name)
        .filter(name => !wanted.some(w => normalise(name) === w || normalise(name).startsWith(w)))
}

/**
 * Guards the upstream URL against anything but a locale path.
 *
 * Upper case is part of that path, not a mistake to reject: five of the parser locale
 * files are named 70-CSV, 70-HTML, 70-JSON, 70-XML and 70-YAML upstream. A lower-case-only
 * guard rejected all five before the fetch, the route answered 400, and the component fell
 * back to its "could not be read" notice - so the CSV, HTML, JSON, XML and YAML pages each
 * shipped with the whole Node help section replaced by an error, and nothing failed.
 *
 * What matters is that neither part can be anything but a single path segment: no slash, no
 * dot, no percent, no query. That is unchanged.
 */
export function isSafeHelpRef ({ category, file }) {
    return /^[A-Za-z0-9-]+$/.test(String(category)) && /^[A-Za-z0-9-]+$/.test(String(file))
}

export function helpUrlFor ({ category, file }) {
    if (!isSafeHelpRef({ category, file })) {
        throw new Error(`Unsafe Node-RED help reference: category=${category} file=${file}`)
    }
    return `${UPSTREAM}/${category}/${file}.html`
}

// Node-RED's help is prose and simple tables. Nothing here needs script, style, iframes or
// event handlers, so the allowlist is the shape of the content rather than a denylist of
// the dangerous parts: this is third-party HTML rendered with v-html.
//
// The list below is not guesswork. Every tag and attribute upstream actually uses inside a
// `<script data-help-name=...>` block, across all 36 en-US locale files, is:
//
//   tags  a b center code dd dl dt h3 h4 i li ol p pre span table td th tr ul
//   attrs a@href a@target dl@class dt@class ol@class span@class table@style th@width
//
// so anything here beyond that (br, strong, em, kbd, h5, thead, tbody, blockquote) is only
// headroom, and img/hr/h6/sup/sub/del/tt/var/samp/abbr appear nowhere and are not needed.
const ALLOWED_TAGS = [
    'p', 'br', 'b', 'strong', 'i', 'em', 'code', 'pre', 'kbd', 'span',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'h3', 'h4', 'h5',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    // Deprecated, and upstream uses it 12 times - inside the Range node's table cells.
    // Dropping the tag kept the text but lost the centring it was there for.
    'center',
    'a', 'blockquote',
]

// `class` is allowed on everything rather than on the four tags that carry one today,
// because the class is the only thing that says WHICH of two visually identical items is
// which: upstream writes `<dt class="optional">` to mark an optional message property, and
// `<span class="property-type">` to mark a type rather than more prose. Stripping those
// stripped meaning, not styling - the live Eleventy pages keep them, so this was a
// regression the move would have shipped. It cannot execute anything.
//
// `style` is deliberately NOT allowed. Upstream's only use of it is a single malformed
// `<table style="outline-width:#888 solid thin">` on the Range node; letting arbitrary
// third-party CSS into a page for that is a bad trade, and no text depends on it.
const ALLOWED_ATTRIBUTES = {
    // `target="_blank"` is on all 7 of upstream's links out to nodered.org and mustache's
    // docs, and is how they have always opened. Upstream sets no `rel`, so the transform
    // below adds one rather than passing reverse-tabnabbing through. `rel` has to be listed
    // here as well as produced there: sanitize-html runs transformTags first and filters
    // the result against this list afterwards, so an attribute the transform adds but this
    // list omits is added and then dropped again, silently.
    a: ['href', 'title', 'target', 'rel'],
    th: ['scope', 'width', 'align'],
    td: ['width', 'align'],
    '*': ['class'],
}

/**
 * Node-RED's help, reduced to the tags and attributes it actually uses.
 *
 * The route renders the result with v-html, so this is the boundary that decides what
 * third-party HTML can reach the page. It is also the boundary where content goes missing
 * without anything failing: sanitize-html keeps a dropped tag's TEXT, so an over-tight
 * allowlist reads as a styling glitch rather than as an error.
 */
export function sanitiseHelp (html) {
    return sanitizeHtml(String(html), {
        allowedTags: ALLOWED_TAGS,
        allowedAttributes: ALLOWED_ATTRIBUTES,
        allowedSchemes: ['http', 'https', 'mailto'],
        transformTags: {
            a: sanitizeHtml.simpleTransform('a', { rel: 'noreferrer noopener' }),
        },
    })
}

/**
 * Every `::node-red-help{...}` a content file asks for, with its attributes.
 *
 * Exists so `npm test` can check the requests the tree makes against the rules above
 * without a server or a network. Nothing else validates them: a bad `category`/`file` pair
 * is rejected by the route at request time, the component turns that rejection into its
 * "could not be read" notice, and the page prerenders successfully with the whole Node help
 * section replaced by that notice. Nitro's prerender has no failOnError here, so the build
 * stays green - which is exactly how the five parser pages shipped with no help.
 */
export function helpRefsIn (markdown) {
    return [...String(markdown).matchAll(/::node-red-help\{([^}]*)\}/g)].map(([, attrs]) => ({
        attrs: Object.fromEntries([...attrs.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, k, v]) => [k, v])),
        raw: attrs,
    }))
}
