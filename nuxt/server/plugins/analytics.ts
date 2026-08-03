let headHtml: string | null = null
let bodyHtml: string | null = null

export default defineNitroPlugin((nitroApp) => {
    if (import.meta.dev || !useRuntimeConfig().isProductionContext) return

    nitroApp.hooks.hook('render:html', async (html) => {
        if (html.bodyAppend.some(s => s.includes('cc.min.js'))) return

        if (!headHtml || !bodyHtml) {
            const storage = useStorage('assets:analytics')
            headHtml = await storage.getItem<string>('head.html') ?? ''
            bodyHtml = (await storage.getItem<string>('body.html') ?? '')
                .replace('{{ POSTHOG_APIKEY }}', process.env.POSTHOG_APIKEY || '')
        }

        html.head.push(headHtml)
        html.bodyAppend.push(bodyHtml)
    })
})
