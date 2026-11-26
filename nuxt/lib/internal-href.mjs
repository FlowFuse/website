const SITE_HOST = /^https?:\/\/(?:www\.)?flowfuse\.com(?=[/?#]|$)/i

export function internalHref (url) {
    if (typeof url !== 'string' || !SITE_HOST.test(url) || url.includes('#')) return url
    const rest = url.replace(SITE_HOST, '')
    const path = rest.split(/[?#]/)[0]
    if (/\.[a-z0-9]+$/i.test(path.split('/').pop() || '')) return url
    return rest.startsWith('/') ? rest : `/${rest}`
}
