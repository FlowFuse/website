let headHtml: string | null = null
let bodyHtml: string | null = null

export default defineNitroPlugin((nitroApp) => {
    // TEMP: bypassed to verify sendBeacon/pageshow/hbspt fixes locally - revert before
    // merging. Real production PostHog project and real HubSpot portal, not a sandbox.
    // if (import.meta.dev || !useRuntimeConfig().public.isProductionContext) return

    nitroApp.hooks.hook('render:html', async (html) => {
        if (html.bodyAppend.some(s => s.includes('cc.min.js'))) return

        if (!headHtml || !bodyHtml) {
            const storage = useStorage('assets:analytics')
            headHtml = await storage.getItem<string>('head.html') ?? ''
            // TEMP: prefer the dev PostHog project's key in dev - revert before merging.
            const posthogKey = (import.meta.dev && process.env.POSTHOG_APIKEY_DEV) || process.env.POSTHOG_APIKEY || ''
            bodyHtml = (await storage.getItem<string>('body.html') ?? '')
                .replace('{{ POSTHOG_APIKEY }}', posthogKey)
        }

        html.head.push(headHtml)
        html.bodyAppend.push(bodyHtml)
    })
})
