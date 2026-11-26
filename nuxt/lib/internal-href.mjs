// Turns a full https://flowfuse.com/... link into the site-relative path it points at.
//
// Nuxt's markdown parser runs rehype-external-links, which adds rel="nofollow" to every
// link that starts with http(s)://. Writers often paste full flowfuse.com URLs into docs,
// blog and changelog posts, so those internal links shipped as nofollow and Semrush
// reported "Nofollow attributes in internal links". A relative path is not touched by
// that plugin, so rewriting these first makes them ordinary internal links again.
// Other hosts, including app.flowfuse.com, are left alone.

const SITE_HOST = /^https?:\/\/(?:www\.)?flowfuse\.com(?=[/?#]|$)/i

/**
 * @param {string} url
 * @returns {string} the path (with query and hash) for a flowfuse.com URL, else the url unchanged
 */
export function internalHref (url) {
    if (typeof url !== 'string' || !SITE_HOST.test(url)) return url
    const rest = url.replace(SITE_HOST, '')
    return rest.startsWith('/') ? rest : `/${rest}`
}
