import { ctaDestinationKey, type CTA_DESTINATIONS } from './cta-destinations'

export const CTA_IMAGE_DESTINATIONS: Record<string, keyof typeof CTA_DESTINATIONS> = {
    'sign-up': 'signUp',
    demo: 'bookDemo',
    contact: 'contactUs',
    pricing: 'pricing',
}

const CTA_VALUES = [...Object.keys(CTA_IMAGE_DESTINATIONS), 'custom']

export function ctaImageError (cta: string, href?: string) {
    if (cta === 'custom') {
        if (!href) return 'cta="custom" requires an href'
        const key = ctaDestinationKey(href)
        if (!key) return undefined
        const value = Object.keys(CTA_IMAGE_DESTINATIONS).find(name => CTA_IMAGE_DESTINATIONS[name] === key)
        return value
            ? `href "${href}" is the "${value}" destination - use cta="${value}" instead of cta="custom"`
            : `href "${href}" is the reserved "${key}" destination, which an image CTA can't link to`
    }
    if (!CTA_IMAGE_DESTINATIONS[cta]) return `invalid cta "${cta}" - must be one of: ${CTA_VALUES.join(', ')}`
    if (href) return `cta="${cta}" already sets the link - use cta="custom" to pass an href`
    return undefined
}
