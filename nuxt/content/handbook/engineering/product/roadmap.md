---
title: "Product Roadmap"
---

# Product Roadmap

The product roadmap sets out what we are building towards with FlowFuse, and why.
It is a statement of intent that we can work towards as a company.

We expect this roadmap to evolve as we progress along it.

- **Vision** — the destination we are working towards.
- **Foundations** — the pillars, lanes and customer problems that every roadmap item is measured against.
- **Direction** — the headline items we are considering over the next year.

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

## Direction

These are the outcomes we are working towards:

1. FlowFuse provides a data layer that underpins the applications built on the platform
2. A seamless onboarding journey from standalone Node-RED to FlowFuse managed
3. Dashboard tooling that gets the job done without a steep learning curve
4. An AI experience encompassing these things

### Items under consideration

Below are the headline items we are considering over the next year. 

They are not listed in any order and they are not commitments. The list will change as strategic priorities evolve, and items may be dropped.

Where a delivery date has been committed to a customer, that commitment lives in the relevant issue, not here.

| Item | Lane | Pillar | Scope | Problem | Product outcome |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Data Modeling** — team-level versioned schema registry (JSON Schema) + NR validator node | 3 Data layer | Build · Govern | FlowFuse | Functional gap against competitors | A team defines a shared model once and validates against it in more than one flow |
| **FlowFuse Node-RED** — supported distribution, drop-in for OSS Node-RED, runs standalone, FF features on connect | 1 Edge & device | Deploy | FlowFuse | Friction moving from standalone Node-RED to managed | A standalone user connects to the platform without rebuilding |
| **FlowFuse Node-RED Plugin** — connects an existing NR install to the platform, subset of Device Agent capability | 1 Edge & device | Deploy | FlowFuse | High barrier to connecting an existing install | An existing install connects without migration |
| **Dashboard: usable by default** — better out-of-the-box defaults | 4 Application & UX | Build | FF Dashboard | Too much work required to reach a good-looking dashboard | A first dashboard looks presentable without configuration |

