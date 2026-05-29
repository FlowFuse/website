import { readFileSync } from 'fs'
import { resolve } from 'path'

const headHtml = readFileSync(resolve(process.cwd(), '../src/_includes/analytics/head.html'), 'utf-8')
const bodyHtml = readFileSync(resolve(process.cwd(), '../src/_includes/analytics/body.html'), 'utf-8')
    .replace('{{ POSTHOG_APIKEY }}', process.env.POSTHOG_APIKEY || '')

export default defineNitroPlugin((nitroApp) => {
    if (process.env.NODE_ENV !== 'production') return

    nitroApp.hooks.hook('render:html', (html) => {
        // Guard against double injection from dev mode plugin reloads
        if (html.bodyAppend.some(s => s.includes('cc.min.js'))) return
        html.head.push(headHtml)
        html.bodyAppend.push(bodyHtml)
    })
})
