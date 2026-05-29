import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'

// DIMENSION 1 — SLUGGER.
//
// Reproduce the heading `id` that the legacy 11ty build produced via
// markdown-it-anchor's DEFAULT slugify, so that the prose anchors authors wrote
// against those ids still resolve under @nuxt/content.
//
// markdown-it-anchor default:
//     encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))
//
// We deliberately DROP the encodeURIComponent step and emit the RAW slug:
// every in-page anchor in this repo is written raw (e.g. `#what-is-udp?`,
// `#ideal-customer-profile-(icp)`, `#🔁-iterative-improvement`,
// `#step-3:-set-up-mqtt-with-flowfuse`), so a raw id is byte-identical to the
// raw href fragment and matches without any decoding ambiguity. The default
// @nuxt/content slugger (github-slugger) instead strips `?:()&`, periods and
// emoji, which is the core mismatch this plugin fixes.
//
// This runs in the rehype stage BEFORE MDC's compileHast, which assigns ids as
// `node.properties?.id || githubSlugger(text)` — so pre-setting the id here
// wins. MDC still applies a fixed post-pass (`.replace(/-+/g,'-')`, trim `-`,
// and a leading-digit `_` prefix) to whatever id is present; the residual
// cases that pass mangles (consecutive dashes, leading digits) are caught by
// the post-build anchor-repair step. The table of contents is generated from
// these same compiled ids, so it stays consistent automatically.
function slugify (s) {
  return String(s).trim().toLowerCase().replace(/\s+/g, '-')
}

export default function rehypeAnchorSlugs () {
  return (tree) => {
    // markdown-it-anchor de-dupes repeated slugs by appending `-2`, `-3`, ...
    const seen = Object.create(null)
    visit(tree, 'element', (node) => {
      if (!/^h[1-6]$/.test(node.tagName || '')) return
      const base = slugify(toString(node))
      if (!base) return
      let uniq = base
      let i = 2
      while (uniq in seen) uniq = `${base}-${i++}`
      seen[uniq] = true
      node.properties = node.properties || {}
      node.properties.id = uniq
    })
  }
}
