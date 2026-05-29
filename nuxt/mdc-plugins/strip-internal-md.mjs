import { visit } from 'unist-util-visit'

// DIMENSION 2 — INTERNAL LINKS (.md / README stripping).
//
// The legacy 11ty build rewrote internal links so they pointed at the rendered
// directory route rather than the source markdown file:
//     */abc.md(#x)    -> */abc/(#x)
//     */README(#x)    -> */(#x)
// Source content (notably the externally-synced docs and the handbook) still
// contains absolute links written against the source tree, e.g.
//     [Raspberry Pi](/docs/hardware/raspbian.md)
//     <a href="/docs/install/docker/README#upgrade">
//     [Disagree & commit](/handbook/company/values.md#disagreeandcommit)
// The per-collection copy scripts only normalise RELATIVE markdown links, so
// these absolute ones (and any raw-HTML <a> tags, which the copy scripts'
// markdown-only regexes never matched) leaked through with a `.md`/`README`
// segment and 404'd.
//
// Doing this in rehype rather than a copy script fixes every collection at once
// AND catches raw-HTML <a> tags (rehype-raw has parsed them into the hast tree
// by this point). We only touch ABSOLUTE internal links (href starting with
// '/'): relative links are already resolved by the copy scripts / @nuxt/content
// and must not be disturbed here.
export default function rehypeStripInternalMd () {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' || !node.properties) return
      const orig = node.properties.href
      if (typeof orig !== 'string' || !orig.startsWith('/') || orig.startsWith('//')) return

      // Preserve any #fragment (and ?query) untouched.
      let path = orig
      let suffix = ''
      const cut = path.search(/[#?]/)
      if (cut !== -1) { suffix = path.slice(cut); path = path.slice(0, cut) }

      // */abc.md -> */abc , then */README -> */
      path = path.replace(/\.md$/i, '')
      path = path.replace(/(^|\/)README$/i, (_m, lead) => lead)

      // Routes are directories: ensure a trailing slash, but never append one
      // to a path that still carries a real file extension (e.g. .zip, .pdf).
      if (path && !path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) path += '/'

      const next = path + suffix
      if (next !== orig) node.properties.href = next
    })
  }
}
