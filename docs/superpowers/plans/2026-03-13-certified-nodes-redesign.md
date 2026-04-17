# Certified Nodes Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform `/integrations/` into a premium enterprise integration hub where certified integrations are the hero, with community Node-RED nodes as secondary.

**Architecture:** Data-driven Eleventy pagination generates integration detail pages from a YAML manifest. The existing `certifiedNodes.js` API data is enriched with marketing content from the YAML. The catalog index page gets a complete redesign with a dark hero, category filters, and a two-tier card layout separating certified from community nodes.

**Tech Stack:** Eleventy 2.0, Nunjucks, Tailwind CSS, YAML data files, client-side JS for filtering

**Spec:** `docs/superpowers/specs/2026-03-13-certified-nodes-redesign-design.md`

**Branch:** `certified-nodes-redesign` (based on `solutions-scaffolding`)

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/_data/certifiedIntegrations.yaml` | Master data: integration definitions with marketing content |
| `src/_data/integrationPairs.js` | Generates all pair combinations for Connect X to Y pages |
| `src/integrations/integrations-certified.njk` | Eleventy pagination template for integration detail pages |
| `src/_includes/layouts/certified-integration.njk` | Layout for integration detail pages |
| `src/_includes/layouts/integration-connect.njk` | Layout for Connect X to Y pages |
| `src/integrations/connect/connect.njk` | Pagination template for connect pair pages |
| `src/integrations/connect/index.njk` | Index listing all connect pair pages |

### Modified Files
| File | Change |
|------|--------|
| `src/integrations/index.njk` | Complete redesign: new hero, category filters, dual-section layout |

---

## Chunk 1: Data Layer

### Task 1: Create the Certified Integrations YAML Data File

**Files:**
- Create: `src/_data/certifiedIntegrations.yaml`

This is the master content file. Each integration groups certified node packages with marketing content.

- [ ] **Step 1: Create the YAML data file**

Create `src/_data/certifiedIntegrations.yaml` with:
- A `categories` array defining: industrial-protocols, cloud-and-data, enterprise-systems, edge-and-iot
- An `integrations` array with 6 integrations: opc-ua, mqtt, modbus, s7, ethernet-ip, http-rest
- Each integration has: slug, name, shortName, icon, category, description, heroDescription, certifiedNodes (array of npm package names), useCases (3 per integration), benefits (3 per integration), trustSignals (sla, supportResponse, updateFrequency, certificationLevel), relatedIntegrations, meta (title, description, keywords)

Follow the exact YAML structure from the design spec. Key content per integration:
- **OPC-UA**: certifiedNodes: [node-red-contrib-opcua], use cases: SCADA Modernization, IT/OT Convergence, Predictive Maintenance
- **MQTT**: certifiedNodes: [@flowfuse/node-red-contrib-aedes], use cases: Unified Namespace, IoT Data Ingestion, Event-Driven Automation
- **Modbus**: certifiedNodes: [node-red-contrib-modbus], use cases: Legacy Equipment Integration, Energy Monitoring, Process Data Collection
- **S7**: certifiedNodes: [node-red-contrib-s7], use cases: PLC Data Visualization, MES Integration, Cloud Connectivity
- **Ethernet/IP**: certifiedNodes: [], use cases: Rockwell Integration, Production Monitoring, Multi-Vendor Bridging
- **HTTP/REST**: certifiedNodes: [], use cases: Cloud Platform Integration, ERP Connectivity, Webhook Automation

- [ ] **Step 2: Verify YAML is valid**

Run: `cd /home/sprite/website && node -e "const yaml = require('js-yaml'); const fs = require('fs'); yaml.load(fs.readFileSync('src/_data/certifiedIntegrations.yaml', 'utf8')); console.log('YAML valid')"`
Expected: `YAML valid`

- [ ] **Step 3: Commit**

```bash
git add src/_data/certifiedIntegrations.yaml
git commit -m "feat: add certified integrations YAML data file with 6 integrations"
```

---

### Task 2: Create the Integration Pairs Data Generator

**Files:**
- Create: `src/_data/integrationPairs.js`

Follows the exact pattern of `src/_data/protocolPairs.js`.

- [ ] **Step 1: Create integrationPairs.js**

Read `certifiedIntegrations.yaml`, generate all N*(N-1) pairs. Each pair has: slug (`{from}-and-{to}`), from (full integration object), to (full integration object), title, description, meta (title, description, keywords).

Use `js-yaml` and `fs` to read the YAML, same as `protocolPairs.js` reads `protocols.yaml`.

- [ ] **Step 2: Verify it runs**

Run: `cd /home/sprite/website && node -e "const pairs = require('./src/_data/integrationPairs.js')(); console.log(pairs.length + ' pairs generated'); console.log(pairs[0].slug)"`
Expected: `30 pairs generated` and a slug like `opc-ua-and-mqtt`

- [ ] **Step 3: Commit**

```bash
git add src/_data/integrationPairs.js
git commit -m "feat: add integration pairs data generator for Connect X to Y pages"
```

---

## Chunk 2: Integration Detail Pages

### Task 3: Create the Certified Integration Detail Layout

**Files:**
- Create: `src/_includes/layouts/certified-integration.njk`

Layout extending `layouts/base.njk` with sitemapPriority 0.9. Sections top-to-bottom:

1. **Hero** (dark gradient `linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)`):
   - Green "Certified" badge + "Enterprise Integration" label
   - `h1` with `integrationName`, white text
   - `heroDescription` paragraph in gray-300
   - Trust signal pills row (SLA, support response, update frequency) — white/10 bg with white/20 border
   - Two CTAs: "TALK TO AN EXPERT" (primary) + "START FREE TRIAL" (outlined, white border)
   - Uses `capture()` analytics with `page: 'integration-{slug}'`

2. **Use Cases** ("What You Can Build"):
   - 3-column card grid from `useCasesJson` (parsed with `| fromJson` filter)
   - Each card: white bg, gray-200 border, title + description

3. **How It Works** (gray-50 bg):
   - Architecture diagram: `[integrationShortName]` → `[FlowFuse]` → `[Any System]`
   - Same visual pattern as `layouts/connect.njk` connection diagram
   - Explanatory paragraph below

4. **Benefits** ("Why Choose FlowFuse Certified"):
   - 3-column card grid from `benefitsJson` (parsed with `| fromJson`)
   - Each card: green certified checkmark icon, title, description

5. **Included Nodes** (gray-50 bg):
   - Lists `certifiedNodeIds` as code elements
   - Links to npm package pages
   - "Certified" badge per node

6. **Related Integrations** ("Connect {name} to..."):
   - Grid of links to other certified integrations' connect pages
   - Pattern: iterate `certifiedIntegrations.integrations`, skip self, link to `/integrations/{self}/and/{other}/`

7. **CTA**: `{% include "common-cta.njk" %}`

Template variables consumed: `integrationName`, `integrationShortName`, `integrationSlug`, `heroDescription`, `useCasesJson`, `benefitsJson`, `certifiedNodeIds`, `trustSla`, `trustSupportResponse`, `trustUpdateFrequency`

- [ ] **Step 1: Create the layout file**

- [ ] **Step 2: Commit**

```bash
git add src/_includes/layouts/certified-integration.njk
git commit -m "feat: add certified integration detail page layout"
```

---

### Task 4: Create the Pagination Template for Integration Detail Pages

**Files:**
- Create: `src/integrations/integrations-certified.njk`

Follows the exact pattern of `src/solutions/protocols/protocols.njk`.

- [ ] **Step 1: Create the pagination template**

```yaml
pagination:
    data: certifiedIntegrations.integrations
    size: 1
    alias: integration
layout: layouts/certified-integration.njk
eleventyComputed:
    permalink: /integrations/{{ integration.slug }}/
    title: "{{ integration.name }} Integration | FlowFuse"
    integrationName: "{{ integration.name }}"
    integrationShortName: "{{ integration.shortName }}"
    integrationSlug: "{{ integration.slug }}"
    heroDescription: "{{ integration.heroDescription }}"
    useCasesJson: "{{ integration.useCases | json }}"
    benefitsJson: "{{ integration.benefits | json }}"
    certifiedNodeIds: "{{ integration.certifiedNodes }}"
    trustSla: "{{ integration.trustSignals.sla }}"
    trustSupportResponse: "{{ integration.trustSignals.supportResponse }}"
    trustUpdateFrequency: "{{ integration.trustSignals.updateFrequency }}"
    meta:
        title: "{{ integration.meta.title }}"
        description: "{{ integration.meta.description }}"
        keywords: "{{ integration.meta.keywords }}"
```

Note: `useCases` and `benefits` are arrays of objects. Serialize to JSON via `| json` filter so the layout can parse them back with `| fromJson`. Both filters exist in `.eleventy.js`.

- [ ] **Step 2: Commit**

```bash
git add src/integrations/integrations-certified.njk
git commit -m "feat: add pagination template for certified integration detail pages"
```

---

### Task 5: Create Connect Pages for Integration Pairs

**Files:**
- Create: `src/_includes/layouts/integration-connect.njk`
- Create: `src/integrations/connect/connect.njk`
- Create: `src/integrations/connect/index.njk`

- [ ] **Step 1: Create the connect page layout**

`src/_includes/layouts/integration-connect.njk` — extends `layouts/base.njk`, sitemapPriority 0.7. Same dark gradient hero as the detail page. Sections:
- Hero with "Certified Integration" badges, "Connect {fromName} to {toName}" heading, connection diagram (from → FlowFuse → to), CTAs
- Content body (`{{ content | safe }}`)
- Reverse direction link to `/integrations/{to}/and/{from}/`
- "Learn More" section linking to both integration detail pages
- Common CTA include

Template variables: `fromName`, `fromShortName`, `fromSlug`, `toName`, `toShortName`, `toSlug`, `pairDescription`

- [ ] **Step 2: Create the pagination template**

`src/integrations/connect/connect.njk` — pagination over `integrationPairs`, size 1. Permalink: `/integrations/{{ pair.from.slug }}/and/{{ pair.to.slug }}/`. Content body includes:
- "How to Connect {from} to {to}" heading
- 3-step guide (same pattern as `src/solutions/connect/connect.njk` but with green accent colors and "certified" language)
- "Why use FlowFuse Certified nodes" callout box (green-50 bg, green-200 border)

- [ ] **Step 3: Create the connect index page**

`src/integrations/connect/index.njk` — layout `nohero.njk`. Lists all pairs grouped by source integration.

- [ ] **Step 4: Commit**

```bash
git add src/_includes/layouts/integration-connect.njk src/integrations/connect/
git commit -m "feat: add Connect X to Y pages for certified integration pairs"
```

---

## Chunk 3: Catalog Index Page Redesign

### Task 6: Redesign the Integrations Catalog Index Page

**Files:**
- Modify: `src/integrations/index.njk`

Complete rewrite. Extends `layouts/catalog.njk` (same as current). New structure:

1. **Hero** (dark gradient, same as detail pages):
   - Green "Enterprise-Grade Connectivity" eyebrow
   - "Certified Integrations for Node-RED" h1
   - Enterprise value proposition subtitle
   - Stats bar: integration count (from `certifiedIntegrations.integrations | length`), "99.9%" SLA, "24h" support, "5,000+" community nodes

2. **Category filter bar** (sticky, gray-50 bg):
   - Pill buttons: "All" (active by default) + one per category from `certifiedIntegrations.categories`
   - JS `filterIntegrations(category, btn)` toggles `.certified-integration-card` visibility by `data-category`
   - CSS: `.integration-filter-pill` (white bg, gray border) + `.integration-filter-pill.active` (gray-900 bg, white text)

3. **Certified integrations grid**:
   - "Certified" green badge + "Enterprise Integrations" heading
   - Server-rendered 3-column grid of `certifiedIntegrations.integrations`
   - Each card: `<a>` to `/integrations/{slug}/`, green-100 border, certified checkmark icon, "Certified" badge, name, description (line-clamp-2), category tag, node count, trust signal pills (SLA Backed, Commercial Support)
   - `data-category` attribute for JS filtering

4. **Divider**

5. **Community nodes section**:
   - "Community" grey badge + "Node-RED Ecosystem" heading + "5,000+ nodes" subtitle
   - Search input for filtering
   - Client-side rendered 4-column grid fetching from `https://ff-integrations.flowfuse.cloud/api/nodes`
   - Filter out certified node IDs (embedded from YAML at build time via Nunjucks set)
   - Each community tile: simple card with node name, description (line-clamp-2), weekly download count
   - Links to `https://flows.nodered.org/node/{id}`
   - Pagination with Previous/Next

   Note on XSS safety: Community node data (names, descriptions) from the API are rendered using `textContent` or template literals that are inserted via DOM text nodes. The API data is from a trusted first-party FlowFuse service. The existing codebase already uses this same pattern for community nodes.

6. **Bottom CTA**: "Need a custom integration?" with Contact Sales + Start Free Trial

- [ ] **Step 1: Rewrite `src/integrations/index.njk`**

- [ ] **Step 2: Commit**

```bash
git add src/integrations/index.njk
git commit -m "feat: redesign integrations catalog with certified hero and community section"
```

---

## Chunk 4: Build Verification

### Task 7: Verify the Build

- [ ] **Step 1: Install dependencies**

Run: `cd /home/sprite/website && npm install`

- [ ] **Step 2: Run the Eleventy build**

Run: `cd /home/sprite/website && npx @11ty/eleventy --dryrun 2>&1 | tail -30`

Should generate pages including `/integrations/`, `/integrations/opc-ua/`, `/integrations/opc-ua/and/mqtt/`, etc.

- [ ] **Step 3: Verify generated page count**

Run: `cd /home/sprite/website && npx @11ty/eleventy --dryrun 2>&1 | grep -c "integrations/"`

Expected: ~38 pages (6 detail + 30 pairs + 1 catalog + 1 connect index).

- [ ] **Step 4: Fix any build errors and commit**

### Task 8: Handle Permalink Conflicts

The existing `src/integrations/integrations.njk` generates pages at `/integrations/{node-id}/`. Our slugs (opc-ua, mqtt, modbus, s7, ethernet-ip, http-rest) should not conflict with npm package names (node-red-contrib-*). Verify no conflicts exist.

- [ ] **Step 1: Check for conflicts**

Run: `cd /home/sprite/website && node -e "const yaml = require('js-yaml'); const fs = require('fs'); const data = yaml.load(fs.readFileSync('src/_data/certifiedIntegrations.yaml', 'utf8')); console.log('Slugs:', data.integrations.map(i => i.slug).join(', '))"`

If any slug matches an npm package name from `integrations.js`, rename the slug.

### Task 9: Start Dev Server and Verify

- [ ] **Step 1: Start the development server via Sprite service**

- [ ] **Step 2: Verify key pages render correctly**

Check: `/integrations/`, `/integrations/opc-ua/`, `/integrations/opc-ua/and/mqtt/`, `/integrations/connect/`

- [ ] **Step 3: Create a checkpoint**

Run: `sprite-env checkpoints create --comment "Certified nodes redesign complete: catalog, detail pages, connect pages"`
