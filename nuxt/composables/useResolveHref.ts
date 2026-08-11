import site from '../../src/_data/site.json'

// Mirrors the "resolveHref" Eleventy filter: an href of "site:<key>" is a
// pointer into site.json rather than a literal URL, so values like the job
// board link stay single-sourced there instead of duplicated in chrome.json.
export function useResolveHref() {
    return (href?: string) => href?.startsWith('site:') ? site[href.slice('site:'.length)] : href
}
