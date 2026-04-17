# Certified Nodes Redesign — Design Spec

## Context

FlowFuse is relaunching its certified nodes offering under the "Trusted Nodes" initiative. The current certified nodes page is a simple paginated grid. The goal is to transform `/integrations/` into a premium enterprise integration hub where certified integrations are the hero, with community Node-RED nodes as secondary.

This builds on the `solutions-scaffolding` branch (PR #4641) which already provides data-driven pagination for protocols, use cases, teams, and connect pages.

## Decisions Made

| Decision | Choice |
|----------|--------|
| Page grouping | Integration-level (e.g., one "OPC-UA" page covering client + server nodes) |
| Primary audience | Enterprise/procurement teams |
| Relationship to existing integrations | Replace — certified nodes become THE integrations story |
| Content depth per integration | Solution-oriented — use cases, architecture, trust signals, CTAs |
| Number of integrations | 10+ (scalable, data-driven) |
| Pricing on pages | None — CTAs drive to Contact Sales / Start Free Trial |
| Starting point | Build on PR #4641 scaffolding |

## Information Architecture

### URL Structure

```
/integrations/                          → Catalog page (filterable grid)
/integrations/{slug}/                   → Integration detail page (solution landing page)
/integrations/{slug}/and/{slug}/        → "Connect X to Y" cross-sell page
```

### Integration Content Model

Each integration groups multiple certified node packages into a single marketable entity. Defined in a new YAML data file:

```yaml
# src/_data/certifiedIntegrations.yaml
integrations:
  - slug: opc-ua
    name: OPC-UA
    shortName: OPC-UA
    icon: opc-ua.svg
    category: industrial-protocols
    description: >
      Industrial automation protocol for secure, reliable
      machine-to-machine communication
    heroDescription: >
      Connect to any OPC-UA enabled device with commercially
      supported, SLA-backed Node-RED nodes.
    certifiedNodes:
      - "@flowfuse/node-red-contrib-opcua-client"
      - "@flowfuse/node-red-contrib-opcua-server"
    useCases:
      - title: SCADA Modernization
        description: Bridge legacy SCADA to modern cloud platforms
      - title: IT/OT Convergence
        description: Connect shop floor data to enterprise IT systems
      - title: Predictive Maintenance
        description: Stream machine telemetry for real-time analytics
    benefits:
      - title: Commercial Support
        description: 24h response SLA with dedicated engineering team
      - title: Rigorous Testing
        description: Tested against 50+ OPC-UA server implementations
      - title: Guaranteed Compatibility
        description: Validated with every FlowFuse release
    trustSignals:
      sla: "99.9% uptime"
      supportResponse: "24h"
      updateFrequency: "Monthly"
      certificationLevel: "Enterprise"
    relatedIntegrations: [mqtt, modbus]
    meta:
      title: "OPC-UA Integration for Node-RED | FlowFuse"
      description: "Enterprise-grade OPC-UA connectivity..."
      keywords: "opc-ua, node-red, industrial automation"
```

### Categories

- **Industrial Protocols** — OPC-UA, MQTT, Modbus, S7, BACnet
- **Cloud & Data** — AWS, Azure, GCP, databases
- **Enterprise Systems** — SAP, Salesforce, ServiceNow
- **Edge & IoT** — GPIO, serial, BLE, sensors

## Page Designs

### 1. Catalog Page (`/integrations/`)

Replaces the existing integrations index. Structure top-to-bottom:

1. **Hero section** — Dark gradient background. "Enterprise-Grade Connectivity" eyebrow, "Certified Integrations for Node-RED" headline, enterprise value proposition subtitle. Stats bar: integration count, SLA, support response time, community node count.

2. **Filter bar** — Search input + category pill filters (All, Industrial Protocols, Cloud & Data, Enterprise Systems, Edge & IoT). Client-side filtering without page reload.

3. **Certified integrations section** — "Certified / Enterprise Integrations" header with green badge. 3-column card grid. Each card: green border, certified badge, icon, name, short description, category tag, node count, trust signal pills (SLA Backed, Commercial Support). Cards link to `/integrations/{slug}/`.

4. **Divider**

5. **Community nodes section** — "Community / Node-RED Ecosystem" header with grey badge + "5,000+ nodes" subtitle. 4-column compact card grid (muted styling: grey border, smaller, less detail). Shows top community nodes by downloads. "View all community nodes" link.

6. **Bottom CTA** — "Need a custom integration?" with Contact Sales + Start Free Trial buttons.

### 2. Integration Detail Page (`/integrations/{slug}/`)

Solution landing page per certified integration, designed for procurement teams:

1. **Hero** — Integration icon + name, certified badge, one-line tagline, heroDescription paragraph, two CTAs (Contact Sales, Start Free Trial). Trust signal pills row (SLA, support response, update frequency).

2. **Use cases section** — "What You Can Build" header. 3-column card grid showing use cases with title, description, and optional icon.

3. **How it works** — "How FlowFuse Connects [Integration]" header. Visual architecture showing: Source System → FlowFuse (with Node-RED) → Target System. Brief explanation of the data flow.

4. **Benefits section** — 3-column grid of benefit cards with icon, title, description. Sourced from the `benefits` array in the data file.

5. **Included nodes** — "Certified Nodes Included" header. Lists the actual npm packages with version, last updated, download count. Links to npm. This is the technical detail layer for engineers who accompany procurement teams.

6. **Related integrations** — "Connect OPC-UA to..." grid linking to other certified integrations and to `/integrations/{slug}/and/{slug}/` connect pages.

7. **CTA** — Reuse `common-cta.njk` pattern. Contact Sales focus.

### 3. Connect Pages (`/integrations/{slug}/and/{slug}/`)

Reuse the existing connect page pattern from PR #4641's `protocolPairs.js` but generate from the certified integrations data instead of (or in addition to) protocols.

## Data Pipeline

### New Files

| File | Purpose |
|------|---------|
| `src/_data/certifiedIntegrations.yaml` | Integration definitions with marketing content |
| `src/_data/integrationPairs.js` | Generates all integration pair combinations for connect pages |
| `src/integrations/integrations-certified.njk` | Pagination template for certified integration detail pages |
| `src/_includes/layouts/certified-integration.njk` | Layout for integration detail pages |

### Modified Files

| File | Change |
|------|--------|
| `src/integrations/index.njk` | Complete redesign — new hero, filter bar, dual-section layout |
| `src/_data/integrations.js` | Add `certifiedIntegrations` data merge, mark certified nodes with integration parent |
| Navigation includes | Add certified integrations to Solutions mega-menu |

### Data Flow

```
certifiedIntegrations.yaml
    ↓
certifiedIntegrations.js (reads YAML, enriches with live npm data from certifiedNodes.js)
    ↓
Eleventy pagination → /integrations/{slug}/ pages
    ↓
integrationPairs.js (generates pairs) → /integrations/{slug}/and/{slug}/ pages
```

The existing `certifiedNodes.js` continues to fetch live data from `catalog.flowfuse.com`. The new `certifiedIntegrations` data file maps those nodes into integration groups and adds the marketing layer.

## Technical Approach

- Follow the exact same pattern as `protocols.yaml` → `protocols.njk` → `layouts/protocol.njk`
- Nunjucks templates with Tailwind CSS classes
- Eleventy pagination for page generation
- Client-side JS for catalog filtering (same pattern as current integrations index)
- Responsive: mobile-first, 1-col → 2-col → 3-col grid breakpoints
- SEO: meta title, description, keywords, Open Graph, canonical URLs per integration page

## Visual Design

- Follow existing FlowFuse design system (Heebo font, indigo/teal/red accent colors)
- Certified integrations: green (#2e7d32) border + badge for trust signaling
- Community nodes: grey/muted styling for clear visual hierarchy
- Dark gradient hero (consistent with modern FlowFuse pages)
- Card-based layout throughout
- Trust signal pills as small badges (SLA Backed, Commercial Support, etc.)

## Out of Scope

- Per-integration pricing or licensing
- User reviews or ratings
- Automated node certification pipeline
- Changes to flows.nodered.org
- Blog content or customer stories (can be added later via `relatedPosts` field)
