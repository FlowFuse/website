import { type MaybeRefOrGetter, toValue } from 'vue'
import { OG_IMAGE, buildJsonLd } from '../utils/seo'

export interface FlowFuseSeoOptions {
    title: MaybeRefOrGetter<string>
    description: MaybeRefOrGetter<string>
    url: MaybeRefOrGetter<string>
    image?: MaybeRefOrGetter<string | undefined>
}

export function useFlowFuseSeo (opts: FlowFuseSeoOptions) {
    const image = () => toValue(opts.image) ?? OG_IMAGE

    useSeoMeta({
        title: () => toValue(opts.title),
        description: () => toValue(opts.description),
        ogTitle: () => toValue(opts.title),
        ogDescription: () => toValue(opts.description),
        ogUrl: () => toValue(opts.url),
        ogImage: image,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        twitterImage: image,
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
                image: toValue(opts.image),
            }))
        }]
    }))
}
