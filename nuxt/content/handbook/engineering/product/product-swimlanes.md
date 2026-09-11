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
| 1 | AI | FlowFuse Expert, assisted authoring, data insights, MCP access to live data, agents at the edge |
| 2 | Dashboard | Dashboard, HMI, blueprints, the build surface for non-technical users |
| 3 | Certified Nodes | Certified nodes, catalogue, plugin/extension architecture, partner and OEM/white-label paths |
| 4 | Platform | Everything else the product needs. See the areas below |

Platform covers a wide surface. These are the areas within it:

- **Data layer:** broker, historian, contextualisation, Unified Namespace
- **Edge & device:** device agent, fleet-scale provisioning, offline resilience, OS/hardware/container support matrix, brownfield protocol coverage
- **DevOps for OT:** environments, promotion pipelines, snapshots, git workflows, testing, rollback
- **Enterprise readiness:** SSO/SCIM, RBAC granularity, audit, HA, air-gapped, multi-tenancy
- **Security & product hardening:** hardening, vulnerability posture, secure defaults
- **Platform health:** debt, migrations, scalability, upgrade paths
- **The editor:** the Node-RED editing experience itself, including collaborative editing

Not all of these lanes can be handled equally.

- **AI** is pervasive across the whole product surface.
- **Platform Health** is the ongoing background work that customers do not notice unless it doesn't happen.  
- **Security & product hardening** splits into value delivered under the Govern pillar, as well as our own, non-discretionary compliance work.

