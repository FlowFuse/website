import site from '../../src/_data/site.json'

// Mirrors the "resolveHref" Eleventy filter: an href of "site:<key>" is a
// pointer into site.json rather than a literal URL, so values like the job
// board link stay single-sourced there instead of duplicated in chrome.json.
// A dotted key walks into a nested object, as SiteValue's `path` does.
export function useResolveHref() {
    return (href?: string): string | undefined => href?.startsWith('site:')
        ? href.slice('site:'.length).split('.').reduce<any>((value, key) => value?.[key], site)
        : href
}
