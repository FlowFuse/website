---
title: "Product Swimlanes"
---

# Product Swimlanes

## What are they
[Product swimlanes](https://en.wikipedia.org/wiki/Swimlane) are areas of focus and expertise within the Flowfuse product.

## Why we use them

They allow us to:
1. identify the functional areas we work within
2. provide enough granuality so that every feature has a natural home
3. ensure we are iterating across the whole product surface

As a team, we work across all of the lanes over time, but not all of them in any one release. A release will typically invest heavily in two or three lanes, touch a few others lightly, and do nothing in the rest. That's intentional prioritisation.

## Our swimlanes

| # | Lane | Scope |
| :---- | :---- | :---- |
| 1 | Edge & device | Device agent, fleet-scale provisioning, offline resilience, OS/hardware/container support matrix, brownfield protocol coverage |
| 2 | DevOps for OT | Environments, promotion pipelines, snapshots, git workflows, testing, rollback |
| 3 | Data layer | Broker, historian, contextualisation, Unified Namespace |
| 4 | Application & UX | Dashboard, HMI, blueprints, the build surface for non-technical users |
| 5 | AI | FlowFuse Expert, assisted authoring, data insights, MCP access to live data, agents at the edge |
| 6 | Governance and Operability | SSO/SCIM, RBAC granularity, audit, HA, air-gapped, multi-tenancy |
| 7 | Security & product hardening | Hardening, vulnerability posture, secure defaults |
| 8 | Ecosystem & extensibility | Certified nodes, catalogue, plugin/extension architecture, partner and OEM/white-label paths |
| 9 | Platform health | Debt, migrations, scalability, upgrade paths |

Not all of these lanes can be handled equally.

- **AI** is pervasive across the whole product surface.
- **Platform Health** is the ongoing background work that customers do not notice unless it doesn't happen.  
- **Security & product hardening** splits into value delivered under the Govern pillar, as well as our own, non-discretionary compliance work.

