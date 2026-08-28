// Single source of truth for the /getting-started page. Used by the hub page,
// the left nav, and the progress rail so all three stay in lockstep.
//
// Organised around the product lanes (Edge / Hub / Fleet): find your product,
// then follow the get-started guide for it. The "how it works" tour stays below
// as a primer for newcomers.
export const GS_BASE = '/getting-started'

export type GsTone = 'ot' | 'it' | 'fleet' | 'all'
export interface GsSection {
  slug: string
  title: string
  persona: string
  blurb: string
  tone: GsTone
}

export const GS_SECTIONS: GsSection[] = [
  // ── Get started (action) ──
  { slug: 'find-your-product', title: 'Find your product', persona: 'Start here', tone: 'all',
    blurb: 'Answer four quick questions and we point you to Edge, Hub, or Fleet.' },
  { slug: 'get-started', title: 'Get started', persona: 'Edge · Hub · Fleet', tone: 'it',
    blurb: 'A step-by-step guide to your first application, tailored to your product.' },
  // ── Understand it (primer, below) ──
  { slug: 'what-flowfuse-is', title: 'What FlowFuse is', persona: 'The big idea', tone: 'it',
    blurb: 'The platform where you build the applications that run your operation — open, and yours to own.' },
  { slug: 'building-blocks', title: 'The pieces you build with', persona: 'The building blocks', tone: 'it',
    blurb: 'Six pieces make up every FlowFuse application. Learn these and you understand the whole platform.' },
  { slug: 'fits-your-team', title: 'It fits every team', persona: 'OT · IT · Fleet', tone: 'all',
    blurb: 'Plant floor, business systems, or devices in the field — one platform, arranged for how each team works.' },
  { slug: 'build-and-own', title: 'Why it pays off', persona: 'The payoff', tone: 'it',
    blurb: 'Ship in days, govern centrally, scale without rework — and never get locked in.' },
  { slug: 'in-action', title: 'See it in action', persona: 'End to end', tone: 'fleet',
    blurb: 'One real application — OEE from the edge to the dashboard — with every piece working together.' },
]
