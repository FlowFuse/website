---
title: "Product Roadmap"
---

# Product Roadmap

The product roadmap sets out what we are building towards with FlowFuse over the next three years, and why.
It is a statement of intent that we can work towards as a company.

We expect this roadmap to evolve as we progress along it - and this is reflected in the granularity of detail at each stage.

- **Vision** — the destination we are working towards.
- **Foundations** — the pillars, lanes and customer problems that every roadmap item is measured against.
- **Year 1** — specific items, quarter by quarter. Deliberately granular: this is work we intend to do.
- **Year 2** — half-year themes, no dates. Each names what has to be true in Year 1 for it to start.
- **Year 3** — a small number of bets, stated as hypotheses.

## Vision

**FlowFuse provides the platform for Industrial Applications. Applications that can access data from any machine or asset within the organization; applications that can provide meaningful visualizations where they are needed; applications that are infused with AI to bring greater insight and value. FlowFuse becomes the natural language interface to manage your industrial organization: MCP tooling, standardized data models, and custom skills combining so that anything FlowFuse can connect to can be asked a question.**

## Foundations

This roadmap is built on strategy, principles and structure established in other parts of the handbook.

Source pages:

- [Company Strategy](https://flowfuse.com/handbook/company/strategy/) — mission, market, problems, value, KPIs
- [Company Messaging](https://flowfuse.com/handbook/marketing/messaging/) — pillars, ICP, positioning  
- [Product](https://flowfuse.com/handbook/engineering/product/) — outcomes model  
- [Product Swimlanes](https://flowfuse.com/handbook/engineering/product/product-swimlanes/) — lane definitions
- [Product Principles](https://flowfuse.com/handbook/engineering/product/principles/) — configuration and open-core rules

### Aligning with our Company Strategy

Our [Company Strategy](https://flowfuse.com/handbook/company/strategy/) highlights four key customer problems we set out to solve.

Here is how those problems can be ranked to align with where we are today and where we want to get to:

| Rank | Problem | Our position | Pillar | Roadmap posture |
| :---- | :---- | :---- | :---- | :---- |
| **1** | Barriers to building solutions | The gap we most want to close — via AI and the platform tooling. | Build · Govern | **Invest** |
| **2** | Lack of visualization and feedback loops | Needs improvement | Build · Govern | **Invest** |
| **3** | Data is in silos and inaccessible | Well served already | Deploy | **Maintain** |
| **4** | Overwhelming complexity of protocols | Well served by Node-RED integrations; AI helps simplify for the end user | Build · Deploy | **Maintain** |

Note - **Maintain** does not mean low priority. They are problems we already serve well within the product, but we must not lose ground. They still require capacity within the roadmap.

### AI

AI is not a singular line item. It cuts across all three pillars and every lane, and exists to help the user reach their goal, whether by guiding them through their work or removing that work entirely.

It is the driving force of achieving our vision - but needs the foundational work behind it to be successful.

Each new feature needs to be shaped by the two-part question:

1. How do humans use this feature?  
2. How does the AI do it for them?

AI is not the only route to a capability, but an acceleration to the value.

There are three distinct roles for AI within the platform.

 - **Support mode** - help the engineer to build and manage their applications
 - **Insights mode** - help the operator to understand what's happening
 - **Operational mode** - bring intelligence to the applications being built

Our current model places Support and Insights mode under the responsibility of FlowFuse Expert.
The Operational mode falls to AI capabilities being built into flows.

### Certified Nodes

Certified Nodes is where FlowFuse provides additional Governance assurance to customers about the nodes they are using. The product roadmap will continue to accommodate time and resources to sustain the Certified Nodes program. We will be customer-led when choosing what nodes to bring into the Certified Nodes program; there are costs and overheads for maintaining the nodes, so we must be led by demand to justify the ongoing investment.

This roadmap does not highlight any specific nodes for the roadmap; that will be managed separately.

## Year 1 — Q4 2026 to Q3 2027

### Year 1 outcomes

1. FlowFuse provides a data layer that underpins the applications built on the platform  
2. A seamless onboarding journey from standalone Node-RED to FlowFuse managed  
3. Dashboard tooling that gets the job done without a steep learning curve  
4. An AI experience encompassing these things

**Note:** the sequencing of the items below is a work in progress.

#### Q4 2026

| Item | Lane | Pillar | Scope | Problem | Product outcome |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Data Modeling** — team-level versioned schema registry (JSON Schema) + NR validator node | 3 Data layer | Build · Govern | FlowFuse | Functional gap against competitors | A team defines a shared model once and validates against it in more than one flow |
| **FlowFuse Node-RED** — supported distribution, drop-in for OSS Node-RED, runs standalone, FF features on connect | 1 Edge & device | Deploy | FlowFuse | Friction moving from standalone Node-RED to managed | A standalone user connects to the platform without rebuilding |
| **FlowFuse Node-RED Plugin** — connects an existing NR install to the platform, subset of Device Agent capability | 1 Edge & device | Deploy | FlowFuse | High barrier to connecting an existing install | An existing install connects without migration |
| **Dashboard: usable by default** — better out-of-the-box defaults | 4 Application & UX | Build | FF Dashboard | Too much work required to reach a good-looking dashboard | A first dashboard looks presentable without configuration |

#### Q1 2027

| Item | Lane | Pillar | Scope | Problem | Product outcome |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Time Series Database** — team-scoped TSDB + NR nodes to read/write; management UI in a later iteration | 3 Data layer | Build | FlowFuse | Repeated customer signal from Fleet/Edge: nowhere to put event data that doesn't fit a relational model | A team stores event data on the platform instead of standing up their own store |
| **Dashboard: data-binding layer** — widgets bind to tagged data values; flows update the data layer | 4 Application & UX | Build | FF Dashboard | Widgets only update when a message arrives, so users wire messages into each one - overt complexity | A flow updates a value once and every bound widget reflects it |
| **Dashboard: canvas pages** — freeform WYSIWYG drawing with elements bound to live data | 4 Application & UX | Build | FF Dashboard | Grid layout can't represent a production line visually | A builder produces an HMI that mirrors the physical line |

#### Q2 2027

| Item | Lane | Pillar | Scope | Problem | Product outcome |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Multi-user editing** — extend multiplayer mode to interactive concurrent editing | 4 Application & UX | Build | Node-RED | Collaboration on a single runtime is limited | Two people edit the same runtime without coordinating out of band |
| **Dynamic Flow Configuration** — platform UX for key/value config + NR node to pull and cache at runtime | 1 Edge & device | Deploy | FlowFuse | Environment variables are static and require a full redeploy to change | A team changes device-specific configuration without redeploying |
| **Dashboard: WYSIWYG layout authoring** — drag, arrange, resize, configure, connect to data | 4 Application & UX | Build | FF Dashboard | Page and layout authoring is unintuitive and the visual editor is limited | A builder lays out a page without trial-and-error redeploys |

#### Q3 2027

| Item | Lane | Pillar | Scope | Problem | Product outcome |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Data Mapping Tooling** — NR nodes for mapping message structure between models, UX-led | 3 Data layer | Build | FlowFuse | Mapping between models is manual and error-prone | A builder maps between two models without hand-writing transforms |

#### Not yet scheduled - work in progress

| Item | Lane | Pillar | Scope | Problem | Product outcome |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **AI: chat history** — persistent history, separate chats each with their own context | 5 AI | Build | FlowFuse | Context is lost between sessions | A user can have multiple chats and switch between them |
| **AI: custom team skills** — teams author skills specific to their use cases | 5 AI | Govern · Build | FlowFuse | Organizational standards aren't encoded anywhere the AI can apply them | Standardization of custom use-cases within an organization |
| **AI: custom models** — connect the agent to customer-hosted models | 5 AI | Build · Govern | FlowFuse | Sovereignty requirements rule out vendor-hosted models | Orgs with specific model requirements are able to use our AI services |
| **Bill of Material reports** - downloadable SBOM | 6 Governance and Operability | Govern | FlowFuse | Existing BoM is a readonly page - cannot be snapshotted for audit or automated checks | Compliance requirements can be met |
| **Managed Dependency Updates** - actionable updates based on the SBoM at both a team and instance level | 6 Enterprise readiness | Govern · Deploy | FlowFuse | SBom identifies out of data dependencies, but doesn't help users resolve them | Software easier to keep up to date - either automatically or by policy |

## Year 2 — Q4 2027 to Q3 2028

Half-year themes. No dates. Each names what has to be true in Year 1 for it to start.

### Year 2 outcomes

1. An IT team can evidence what is running, where, and whether it is compliant, without asking OT  
2. The AI knows the organization's own standards and data, not just the product's  
3. The data layer holds context, not just values

### H1 (Q4 2027 – Q1 2028)

| Theme | Lane | Pillar | Outcome | Depends on (Y1) |
| ----- | ----- | ----- | ----- | ----- |
| **FlowFuse Node-RED becomes the default install** — the standard way an industrial engineer installs Node-RED, not an alternative to it | 1 Edge & device | Deploy | New estates arrive connectable rather than needing to be connected | FlowFuse Node-RED and FlowFuse Node-RED Plugin (Q4 26), plus partner uptake |
| **FlowFuse provides a digital twin of an organization** — sites, lines and assets modeled on the platform and bound to live data | 3 Data layer · 4 Application & UX | Build · Deploy | An OT engineer can model their environment to gain insight | Data Modeling (Q4 26) |
| **Governance becomes purchasable** — downloadable SBOM, managed dependency updates, audit trail | 6 Governance and Operability | Govern | An IT buyer can satisfy an audit from the platform rather than around it | Bill of Material reports · Managed Dependency Updates |
| **AI knows the organization** — custom team skills, custom models, persistent chat context | 5 AI | Govern · Build | Organizational standards are encoded where the AI applies them, and sovereignty requirements stop being a blocker | Data Modeling (Q4 26) gives the AI something structured to reason over |

### H2 (Q2 2028 – Q3 2028)

| Theme | Lane | Pillar | Outcome | Depends on (Y1) |
| ----- | ----- | ----- | ----- | ----- |
| **The data layer holds context** — contextualization, Unified Namespace, models shared across instances rather than per team, TSDB management UI | 3 Data layer | Build · Govern | A model defined once is used estate-wide, and event data is queryable without a separate stack | Data Modeling, Time Series Database and Data Mapping Tooling — all three Year 1 items |
| **DevOps for OT at fleet scale** — promotion, environments, rollback across sites | 2 DevOps for OT | Deploy | A change is promoted to fifty sites with the same confidence as one | Dynamic Flow Configuration (Q2 27) |

## Year 3 — Q4 2028 to Q3 2029

Three bets. Each is a hypothesis with evidence conditions, not a commitment.

### Natural language as the interface to the estate

|  |  |
| ----- | ----- |
| Lane(s) | 5 AI · 3 Data layer |
| Hypothesis | With standardized models, MCP tooling and team skills in place, asking the estate a question becomes the primary way non-builders interact with what has been built. If true, Insights mode is a product line rather than a feature of Expert |
| What's genuinely uncertain | Whether customers will stand up and maintain their own MCP servers, and whether the end-user persona actually adopts a chat surface over a dashboard |
| Evidence that advances it | Insights mode usage by end users rather than builders. Number of customer-authored MCP servers connected |
| Kill criteria | If adoption of MCP tooling is still low by the end of Year 2, this is a feature and not a bet |
| Decision point | Q2 2028 |

### FlowFuse Node-RED becomes the standard industrial distribution

|  |  |
| ----- | ----- |
| Lane(s) | 1 Edge & device · 8 Ecosystem |
| Hypothesis | If the supported distribution is a genuine drop-in, it becomes what hardware partners ship and what engineers install by default, which collapses acquisition and deployment into one motion |
| What's genuinely uncertain | Partner trust. The barrier with vendors is not capability, it is willingness to ship someone else's distribution |
| Evidence that advances it | Share of new connections arriving via the distribution rather than migration. Partners shipping it preinstalled |
| Kill criteria | If by end of Year 2 the distribution is a minority of new connections, we are running two onboarding paths permanently and should pick one |
| Decision point | Q4 2027 |

### Governed fleet at sovereign and air-gapped scale

|  |  |
| ----- | ----- |
| Lane(s) | 6 Governance and Operability · 2 DevOps for OT |
| Hypothesis | Air-gapped and sovereign deployment is a distinct product with its own economics, not a hardening checklist on the existing one |
| What's genuinely uncertain | Whether the demand is a handful of named accounts or a segment. Sovereign requirements also pull against the hosted-service assumptions the AI work depends on |
| Evidence that advances it | Sovereign or air-gapped requirements appearing as a qualification gate rather than a late-stage objection |
| Kill criteria | If it stays concentrated in a small number of accounts, it is bespoke delivery and should be priced that way rather than roadmapped |
| Decision point | Q1 2029 |
