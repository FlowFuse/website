import { defineConfig } from '@nuxtjs/mdc/config'
import rehypeAnchorSlugs from './mdc-plugins/anchor-slugs.mjs'
import rehypeStripInternalMd from './mdc-plugins/strip-internal-md.mjs'

// MDC (the markdown engine behind @nuxt/content v3) loads this file from the
// app srcDir and applies the `unified` hooks while building the processor. The
// `rehype` hook runs after remark→rehype and before MDC's compileHast (which
// assigns heading ids / builds the TOC), which is exactly where we need to
// override heading ids to match the legacy 11ty (markdown-it-anchor) output.
//
// See nuxt/mdc-plugins/*.mjs for the per-dimension rationale.
export default defineConfig({
  unified: {
    rehype (processor) {
      return processor
        .use(rehypeAnchorSlugs)
        .use(rehypeStripInternalMd)
    }
  }
})
