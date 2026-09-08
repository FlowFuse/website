// Selecting one node's built-in help out of the Node-RED project's locale files.
//
// The core-node pages are ordinary content files that ask for their help by name, via the
// ::node-red-help component; this is the part that knows how to find it. Kept in nuxt/lib
// as plain JS so `node --test` can exercise the selection rules without the network.

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

/** Guards the upstream URL against anything but a locale path. */
export function isSafeHelpRef ({ category, file }) {
    return /^[a-z0-9-]+$/.test(String(category)) && /^[a-z0-9-]+$/.test(String(file))
}

export function helpUrlFor ({ category, file }) {
    if (!isSafeHelpRef({ category, file })) {
        throw new Error(`Unsafe Node-RED help reference: category=${category} file=${file}`)
    }
    return `${UPSTREAM}/${category}/${file}.html`
}
