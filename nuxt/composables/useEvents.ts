import { parse as parseYaml } from 'yaml'
import eventsRaw from '../../src/_data/events.yaml?raw'

export interface SiteEvent {
    type: string
    title: string
    buttonText: string
    link: string
    expire?: string
}

// `yaml`'s parse() is a pure parser (no arbitrary type construction); events.yaml is trusted in-repo data.
const events: SiteEvent[] = parseYaml(eventsRaw) || []

// Mirrors the `isFutureDate` Eleventy filter (.eleventy.js) so the same events.yaml
// entries surface here as on the 11ty-rendered pages. Entries with no `expire`
// (standing promos) are always shown.
export function useEvents(): SiteEvent[] {
    return events.filter(event => !event.expire || new Date(event.expire) > new Date())
}
