// Display helpers for the Blueprint Library, ported from src/_includes/blueprints/.
// Kept free of Nuxt and Vue imports so it can be unit tested with `node --test`; the
// blueprint pages and cards are the only callers.
//
// Everything here reads data that lives in FlowFuse/blueprint-library, so each helper is
// deliberately tolerant of a value it has never seen.

// Was src/_data/companies/*.json, read only by the two blueprint templates. A blueprint
// names its author in frontmatter (`author: signl`); everything unattributed is FlowFuse's,
// which is the fallback both templates spelled out as `companies["flowfuse"]`.
const COMPANIES = {
    flowfuse: { name: 'FlowFuse', img: '/images/flowfuse-icon.png', url: 'https://flowfuse.com' },
    signl: { name: 'SIGNL4', img: '/images/signl4_logo.png', url: 'https://www.signl4.com/' },
}

export function blueprintAuthor (author) {
    return COMPANIES[author] || COMPANIES.flowfuse
}

// Every blueprint carries the `blueprints` tag, which is what put it in the collection;
// only the rest describe it.
export function blueprintTags (tags) {
    return (tags || []).filter(tag => tag !== 'blueprints')
}

/**
 * The label for one tag, reproducing what the Nunjucks card built with
 * `replace('-', ' ') | replace('20', '2.0') | title`.
 *
 * An already-uppercase tag is printed as authored, which is how MES and HMI keep their
 * capitals. That check is also why `ai` renders as "Ai": the fix for that is to capitalise
 * the tag in the library's frontmatter, not to keep a list of acronyms here.
 */
export function blueprintTagLabel (tag) {
    if (tag === tag.toUpperCase()) return tag
    return tag
        .replace(/-/g, ' ')
        .replace(/20/g, '2.0')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

/** The "Deploy" button target. The id comes from the library, so it is encoded here. */
export function deployUrl (blueprintId) {
    return `https://app.flowfuse.com/deploy/blueprint?blueprintId=${encodeURIComponent(blueprintId ?? '')}`
}
