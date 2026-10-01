import site from '../../data/site.json'
import { rawMarkdownCanonical } from '../../lib/raw-canonical.mjs'

// Points each /raw/<path>.md copy at its html page, see nuxt/lib/raw-canonical.mjs for why.
// /raw/** is not prerendered, so every request for it reaches the function and passes
// through here first. The @nuxt/content handler after this sets only Content-Type, so the
// Link header set here reaches the response.
export default defineEventHandler((event) => {
    const canonical = rawMarkdownCanonical(event.path, site.baseURL)
    if (canonical) setResponseHeader(event, 'Link', `<${canonical}>; rel="canonical"`)
})
