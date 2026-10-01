import type { CTA_DESTINATIONS } from './cta-destinations'
import { CUSTOM_CTA_DESTINATIONS } from './custom-cta-destinations'

export const CTA_IMAGE_DESTINATIONS: Record<string, keyof typeof CTA_DESTINATIONS> = {
    'sign-up': 'signUp',
    demo: 'bookDemo',
    contact: 'contactUs',
    pricing: 'pricing',
}

const CTA_VALUES = [...Object.keys(CTA_IMAGE_DESTINATIONS), 'custom']

export function customCtaImageDestination (destinationKey?: string) {
    const dest = destinationKey ? (CUSTOM_CTA_DESTINATIONS as Record<string, { href?: string, event: string }>)[destinationKey] : undefined
    return dest?.href ? { href: dest.href, event: dest.event } : undefined
}

export function ctaImageError (cta: string, destinationKey?: string) {
    if (cta === 'custom') {
        if (!destinationKey) return 'cta="custom" requires a destination-key from lib/custom-cta-destinations.ts'
        if (!(destinationKey in CUSTOM_CTA_DESTINATIONS)) return `destination-key "${destinationKey}" isn't in lib/custom-cta-destinations.ts - add an entry there first`
        if (!customCtaImageDestination(destinationKey)) return `destination-key "${destinationKey}" has no fixed href in lib/custom-cta-destinations.ts, and image CTAs don't support dynamic URLs`
        return undefined
    }
    if (!CTA_IMAGE_DESTINATIONS[cta]) return `invalid cta "${cta}" - must be one of: ${CTA_VALUES.join(', ')}`
    if (destinationKey) return `cta="${cta}" already sets the link - use cta="custom" to pass a destination-key`
    return undefined
}
