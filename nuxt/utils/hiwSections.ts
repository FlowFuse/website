export const HIW_BASE = '/product/how-it-works'

export type HiwTone = 'ot' | 'it' | 'fleet' | 'all'
export interface HiwSection {
  slug: string
  title: string
  persona: string
  blurb: string
  tone: HiwTone
}

export const HIW_SECTIONS: HiwSection[] = [
  { slug: 'what-flowfuse-is', title: 'What FlowFuse Is', persona: 'The Big Idea', tone: 'it',
    blurb: 'The platform where you build the applications that run your operation — open, and yours to own.' },
  { slug: 'building-blocks', title: 'The Pieces You Build With', persona: 'The Building Blocks', tone: 'it',
    blurb: 'Six pieces make up every FlowFuse application. Learn these and you understand the whole platform.' },
  { slug: 'fits-your-team', title: 'It Fits Every Team', persona: 'OT · IT · Fleet', tone: 'all',
    blurb: 'Plant floor, business systems, or devices in the field — one platform, arranged for how each team works.' },
  { slug: 'build-and-own', title: 'Why It Pays Off', persona: 'The Payoff', tone: 'it',
    blurb: 'Ship in days, govern centrally, scale without rework — and never get locked in.' },
  { slug: 'in-action', title: 'See It in Action', persona: 'End to End', tone: 'fleet',
    blurb: 'One real application — OEE from the edge to the dashboard — with every piece working together.' },
]
