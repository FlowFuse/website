import { type MaybeRefOrGetter, toValue } from 'vue'
import { OG_IMAGE, buildJsonLd } from '../utils/seo'

export interface FlowFuseSeoOptions {
    title: MaybeRefOrGetter<string>
    description: MaybeRefOrGetter<string>
    url: MaybeRefOrGetter<string>
}

export function useFlowFuseSeo (opts: FlowFuseSeoOptions) {
    useSeoMeta({
        title: () => toValue(opts.title),
        description: () => toValue(opts.description),
        ogTitle: () => toValue(opts.title),
        ogDescription: () => toValue(opts.description),
        ogUrl: () => toValue(opts.url),
        ogImage: OG_IMAGE,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        twitterImage: OG_IMAGE,
        twitterDescription: () => toValue(opts.description),
    })

    useHead(() => ({
        link: [{ rel: 'canonical', href: toValue(opts.url) }],
        script: [{
            type: 'application/ld+json',
            innerHTML: JSON.stringify(buildJsonLd({
                url: toValue(opts.url),
                title: toValue(opts.title),
                description: toValue(opts.description),
            }))
        }]
    }))
}
