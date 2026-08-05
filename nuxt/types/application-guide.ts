// Shapes for the /application-guide guides. The content lives in nuxt/content/application-guide/**.yml
// as a `data` collection, so these types are the contract between the YAML and the Guide*
// components that render it.

export interface DiagramNode {
    title: string
    sub?: string
    /** Zone/box colour: ot, it, cloud, dmz, broker, muted, strong, neutral. */
    tone?: string
}

export interface DiagramLane {
    label?: string
    tone?: string
    nodes?: DiagramNode[]
    /** A connector row rather than a zone: renders the arrow and this as its label. */
    link?: string
}

export interface DiagramLegendItem {
    label: string
    tone?: string
}

export interface GuideDiagramContent {
    lanes: DiagramLane[]
    legend?: DiagramLegendItem[]
    note?: string
}

export interface GuideCallout {
    /** 'good' reads as an endorsement, 'watch' as a warning. */
    tone: 'good' | 'watch'
    text: string
}

export interface GuideList {
    heading: string
    items: string[]
}

export interface GuideLink {
    label: string
    to: string
}

export interface GuideFootnote {
    text: string
    link?: GuideLink
}

/** One tab of a tabbed pattern set. */
export interface GuidePanelContent {
    label: string
    kicker?: string
    kickerNote?: string
    diagramTitle?: string
    diagram?: GuideDiagramContent
    summary?: string
    useWhenHeading?: string
    useWhen?: string
    howHeading?: string
    how?: string
    lists?: GuideList[]
    callout?: GuideCallout
    footnote?: GuideFootnote
}

export type GuideBlockType =
    | 'prose'
    | 'diagram'
    | 'cards'
    | 'steps'
    | 'linkCards'
    | 'tabs'
    | 'note'
    | 'sentence'

export interface GuideBlockItem {
    title: string
    body?: string
    link?: GuideLink
}

export interface GuideBlock {
    type: GuideBlockType
    heading?: string
    kicker?: string
    body?: string
    /** diagram */
    lanes?: DiagramLane[]
    legend?: DiagramLegendItem[]
    note?: string
    /** cards / steps / linkCards */
    items?: GuideBlockItem[]
    columns?: number
    /** tabs */
    panels?: GuidePanelContent[]
    /** note */
    link?: GuideLink
}

export interface ApplicationGuidePage {
    guide: string
    slug: string
    title: string
    navOrder: number
    blurb?: string
    blocks: GuideBlock[]
}

/** The subset the left nav and the section landing page need. */
export interface ApplicationGuidePageSummary {
    guide: string
    slug: string
    title: string
    navOrder: number
    blurb?: string
    path: string
}
