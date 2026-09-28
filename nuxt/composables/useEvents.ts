import { parse as parseYaml } from 'yaml'
import eventsRaw from '../data/events.yaml?raw'

export interface SiteEvent {
    type: string
    title: string
    buttonText: string
    link: string
    expire?: string
}

// `yaml`'s parse() is a pure parser (no arbitrary type construction); events.yaml is trusted in-repo data.
const events: SiteEvent[] = parseYaml(eventsRaw) || []

// The same rule as Eleventy's `isFutureDate` filter, which this replaced: an event shows
// until its `expire` date. Entries with no `expire` (standing promos) are always shown.
export function useEvents(): SiteEvent[] {
    return events.filter(event => !event.expire || new Date(event.expire) > new Date())
}
