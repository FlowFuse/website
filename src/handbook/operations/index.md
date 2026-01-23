---
navTitle: Operations
navGroup: Company
---

# Operations

This covers how we run our business and deliver service to our customers.

- [Data](../operations/data.md)
- [Billing](../operations/billing.md)
- [Accounts](../operations/accounts.md)
- [Change Control](../operations/change.md)
- [Vendors](../operations/vendors.md)
- [Insurance](https://drive.google.com/drive/folders/1Q2UqEmusDIpBD4-4Km1eFksHaRkVzl7O?usp=drive_link)

### Services used at FlowFuse

At FlowFuse there's a couple of services that are vital to the operation of the
business. As a matter of having a plan before these services are taken offline
or go bankrupt a table is maintained with where to go in case of service disruption.

| Primary service | Goal | Backup Service | Do not use |
| --------------- | ---- | -------------- | ---------- |
| Slack | Emphemeral internal communication | Google Spaces (in Gmail) | Email (only for legal items) |
| Slack Huddles | Internal face to face commuication | Google Meet | - |
| Google Meet / Zoom | External video calls | Google Meet / Zoom | - |
| [Google Appointment Schedules](https://support.google.com/calendar/answer/10729749?hl=en) | Scheduling meetings with external parties | Calendly | - |
| AWS | Hosting for FlowFuse Cloud | ? | - |
| GitHub | Task management, planning and code development | - | - |

## Calendar Conventions

To help team members quickly identify meeting types in calendar apps and menubar tools, use these emoji conventions when creating calendar entries:

- 🎥 - Google Meet meetings (add this emoji to the event title for quick visual identification)

This convention is particularly helpful for:
- Quick visual scanning in menubar calendar apps
- Distinguishing Google Meet from Slack Huddles at a glance
- Identifying external-facing meetings quickly

**Note:** For internal face-to-face discussions, prefer Slack Huddles in public channels over Google Meet when possible, as noted in the services table above.

## Email

While there are a number of email aliases and google groups used throughout the organization, there is some activities across operations, people operations, and finance management that requires that activities be done with external parties. As a redundancy, rather than use a person's individual email (e.g. zj@), we use a google group to avoid the risk of information getting lost. For example, for some government filings, we use ops@.

## GitHub

We use GitHub for task management, planning and code development across the company. The following is a high-level guide to the core repositories.

The Engineering team maintains a large number of repositories related to individual components of the product.

| Repository | Purpose | Public/Private |
| -- | -- | -- |
| FlowFuse/admin | Company Admin tasks; onboarding/offboarding employees, access requests, release checklists | private |
| FlowFuse/website | The FlowFuse Website, including handbook | public |
| FlowFuse/CloudProject | Task management for FlowFuse Cloud platform | private |
| FlowFuse/customer | Task management for events and customer-specific work; webinars, artwork requests | private |
| FlowFuse/dev-env | FlowFuse development environment tooling | public |
| FlowFuse/flowfuse | The core product code repository| public |
| FlowFuse/product | A higher level planning and strategising repository for FlowFuse | private |
| FlowFuse/node-red | A planning repository for upstream Node-RED tasks | private |

To create a new repository, first open an issue in the [Admin](https://github.com/FlowFuse/admin) repository using the New Repository checklist. This ensures all required security controls are applied.
