---
title: "FlowFuse 2.33: AI That Acts on Your Systems, With You in Control"
subtitle: "Human-in-the-loop permissions, a full MCP audit trail, and scoped access tokens make AI on industrial systems governable"
description: "FlowFuse 2.33 adds human-in-the-loop tool permissions for the Expert, an MCP audit trail, scoped Personal Access Tokens, and SAML group management for granular RBAC."
date: 2026-07-30
authors: ["jamie-strusz"]
image: /blog/2026/07/images/[TBD].png
tags:
  - flowfuse
  - news
  - releases
---

FlowFuse 2.33 is about trust. The FlowFuse Expert can now take real action on your instances, and this release adds the controls that make that safe: you approve what the AI does, every action leaves an audit trail, and access tokens carry only the permissions you grant them.

<!--more-->

## You Decide What the Expert Can Do

The FlowFuse Expert now asks before it acts. When the Expert wants to use a tool on your behalf, you choose: allow it once, deny it, or always allow it. Permissions follow your team role, so an operator and a team owner see different options.

Letting an AI assistant modify flows on a production system is a different proposition from letting it answer questions. Until now, the choice was binary: enable the Expert or don't. Human-in-the-loop permissions give you the middle ground. The Expert stays fast for the actions you trust it with and pauses for the ones you want eyes on.

[SCREENSHOT: allow / deny / always allow prompt]

*Availability: [CONFIRM tier] users of FlowFuse Cloud and [CONFIRM licence] Self Hosted users from v2.33.*

## Every MCP Action, on the Record

FlowFuse now keeps an audit trail of MCP activity. When an AI client reads data or invokes a tool through FlowFuse, the action is logged: what happened, when, and under whose authority.

If you answer to an OT security team or an auditor, "the AI did it" is not an acceptable line in an incident report. The audit trail turns AI activity into the same kind of accountable, reviewable record you already expect from human operators.

*Availability: [CONFIRM tier] from v2.33.*

## Scoped Personal Access Tokens

Personal Access Tokens now carry scopes. Create a token that can do exactly what its integration needs and nothing more.

Previously a PAT carried the full permissions of the user who created it. If you generated a token for a read-only dashboard integration, that token could still modify your instances. Scoped tokens close that gap and follow the least-privilege pattern your security team already applies everywhere else.

**Getting started:** [CONFIRM: Team Settings path and scope options]

*Availability: [CONFIRM tier] from v2.33.*

## Manage Granular RBAC Through Your Identity Provider

SSO admins can now map SAML groups to FlowFuse's granular roles. When someone joins the "Plant Floor Operators" group in your identity provider, they get the matching FlowFuse permissions automatically. No manual role assignment, no drift between your IdP and your platform.

*Availability: Enterprise [CONFIRM] from v2.33.*

## Modbus Certified Node

The certified Modbus node joins the FlowFuse certified nodes catalog. Connect to Modbus TCP/RTU devices with a node that carries FlowFuse's support and maintenance commitment behind it.

## Smoother Edge Onboarding Starts Here

Getting a device from unboxed to running its first flow is getting an overhaul, and 2.33 ships the first pieces. When the Device Agent can't reach the FlowFuse platform, it now tells you exactly why instead of failing silently. Connection problems that used to mean digging through logs are now diagnosed at the source.

More of the from-scratch onboarding experience lands in upcoming releases.

## Also in This Release

- The Expert is better at telling when you want it to act versus when you want guidance. [CONFIRM #411 landed]
- MCP server enumeration is much faster for teams with many instances.
- Fixed dropdown inputs rejecting values that matched the start of a suggestion.
- Plus dependency updates and smaller fixes.

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.32, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.32) to us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.
[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).

## What's Next

2.33 closes out the 2.x line. Something bigger arrives in August. 📈
