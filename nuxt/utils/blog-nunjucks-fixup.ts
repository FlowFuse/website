// Blog posts are 11ty markdown, so ~150 of them embed raw Nunjucks tags that 11ty
// resolves at build time. @nuxt/content parses markdown as-is, so these need
// resolving here (in a content:file:beforeParse hook) before parsing:
//  - {% include "sign-up-url.njk" %} → the sign-up URL it always resolves to (also
//    fixes a crash: @nuxtjs/mdc's link sanitizer calls decodeURIComponent on href
//    values and throws on the literal "%" characters in the unresolved tag).
//  - {% raw %}/{% endraw %} → stripped (Nunjucks-only escape hatch, no markdown meaning).
//  - {% renderFlow [height] %}<json>{% endrenderFlow %} → an MDC component block
//    rendered client-side by components/blog/BlogFlowRenderer.vue.
const SIGN_UP_URL = 'https://app.flowfuse.com/account/create'

export function fixupBlogNunjucks(body: string): string {
    let result = body.replaceAll('{% include "sign-up-url.njk" %}', SIGN_UP_URL)

    result = result
        .replace(/\{%-?\s*raw\s*-?%\}/g, '')
        .replace(/\{%-?\s*endraw\s*-?%\}/g, '')

    result = result.replace(
        /\{%\s*renderFlow\s*(\d+)?\s*%\}\s*([\s\S]*?)\{%\s*endrenderFlow\s*%\}/g,
        (_match, height: string | undefined, json: string) => {
            const encoded = Buffer.from(json.trim(), 'utf-8').toString('base64')
            const heightAttr = height ? ` height="${height}"` : ''
            return `\n::blog-flow-renderer{flow="${encoded}"${heightAttr}}\n::\n`
        }
    )

    return result
}
