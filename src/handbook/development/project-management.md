---
navTitle: Project Management
---

# Project Management

This page provides a comprehensive overview of the project management processes and procedures that guide product development at FlowFuse.

## Responsibilities

The roles primarily involved in product planning and development at FlowFuse are **Product**, **CTO**, **Engineering Manager**, and **Design Engineer, Discovery & Initiatives**.

- **Product** is responsible for defining product strategy, setting priorities, and shaping the roadmap to achieve desired outcomes.
- The **CTO** determines technical feasibility, architectural direction, and long-term technical strategy.
- The **Engineering Manager** plans execution, assigns work, and is accountable for delivery.
- The **Design Engineer, Discovery & Initiatives** (referred to as **Design Engineer** below) operates upstream, partnering closely with Product to explore problem spaces, shape solutions, and reduce uncertainty through design and technical discovery.

### Role Collaboration and Accountability

Following the RACI framework articulated elsewhere in the [Handbook](https://flowfuse.com/handbook/company/decisions/#projects), responsibilities are as follows:

- **Overall product roadmap and strategy**  
  Product: Responsible & Accountable  
  CTO: Consulted  
  Engineering Manager: Consulted  
  Design Engineer: Consulted

- **Problem discovery, solution shaping, and early design**  
  Product: Responsible  
  Design Engineer: Responsible  
  CTO: Consulted  
  Engineering Manager: Consulted

- **Technical feasibility and architectural direction**  
  CTO: Responsible & Accountable  
  Design Engineer: Consulted  
  Engineering Manager: Consulted  
  Product: Informed

- **Delivery quality and schedule**  
  Engineering Manager: Responsible & Accountable  
  Product: Informed  
  CTO: Informed  
  Design Engineer: Informed

### How the Roles Work Together

On a day-to-day basis:

- **Product** defines outcomes, prioritizes initiatives, and provides direction based on customer and business needs.
- The **Design Engineer** partners with Product to explore ideas, validate approaches, prototype solutions, and provide early technical and design context.
- The **CTO** provides architectural guidance, technical strategy, and long-term vision.
- The **Engineering Manager** translates defined work into executable tasks and delivers it with the engineering team.

Product, the Engineering Manager, the Design Engineer, and the CTO meet regularly in Product Planning to review progress, refine upcoming work, and ensure alignment before execution begins.

## Product Planning Schedule

Each four-week release cycle includes four Product Planning meetings:

- **Week 1**  
  Review ongoing work and explore opportunities for future development.

- **Week 2**  
  Product assigns a milestone to all prioritized epics and stories for the upcoming release, informed by discovery and design work.

- **Week 3**  
  The Engineering Manager breaks stories into tasks and validates feasibility with the CTO. The Design Engineer provides context from discovery, design exploration, and technical investigation.

- **Week 4**  
  Final review of what is shipping, what is slipping, and why.

## Hierarchy

As defined in our [Product Strategy](../product/strategy.md), FlowFuse is organized into three pillars:

- Build
- Manage
- Deploy

The planning hierarchy is:

- **Pillar** – One of the three product pillars
- **Area** – A specific product capability within a pillar
- **Epic** – A significant body of work delivered iteratively
- **Story** – A user-oriented feature deliverable within a release
- **Task** – A concrete unit of engineering work

## Planning

FlowFuse operates on a **continuous delivery model** with **weekly sprints (Monday–Friday)**.

While we deploy to FlowFuse Cloud on every merge to `main`, we package formal releases every four weeks. GitHub milestones are used to track release scope.

### Cadence

- Continuous delivery to FlowFuse Cloud  
- Four-week release cadence for self-hosted users  
- Sprint planning on Fridays  
- Weekly refinement sessions  

### Prioritization

Planning is continuous and adaptive. While most work follows the standard planning flow, bugs and urgent issues may bypass parts of the process when necessary.

#### Step 1 – Backlog Prioritization and Refinement

Issues are raised and prioritized continuously on the Product Planning Board based on customer feedback, internal input, and strategic goals.

Design discovery, technical exploration, and early prototyping led by the Design Engineer may inform prioritization and scope at this stage.

#### Step 2 – Assignment to To-Do

Refined issues are added to the Development Board’s `Todo` column. This signals upcoming work and invites design or architectural clarification.

#### Step 3 – Assignment to Up Next

Product prioritizes issues into `Up Next`.  
The Engineering Manager assigns ownership where appropriate.

This column should always contain enough work for engineers to move forward without waiting.

#### Step 4 – Development

When ready for new work, engineers should select **tasks** from `Up Next`.

While Stories provide user context, **tasks are the unit of execution** and should be what actively moves through the board.

##### Mark In Progress

When starting work, engineers must move the **task** to `In Progress` and record the Started date. This signals ownership and enables progress tracking.

##### Record Expected Date

Engineers should provide a rough expected completion date.  
If not provided, the Engineering Manager will assign one based on estimates and availability.

## Issues

Issues are the core planning unit.

### Types

- **Epic** – Large initiatives composed of multiple stories or tasks  
- **Story** – User-facing value delivered within a release  
- **Task** – A concrete engineering activity  
- **Bug** – Defects impacting functionality or user experience  
- **Feature Request** – Suggested enhancements or new capabilities  

Issues are reviewed by Product and Engineering and routed to the appropriate board.

### Headline Features

Items labeled `headline` are highlighted in release communications and changelogs.

### Changelog

Changelog entries are created via PRs to the website repository and include links to related GitHub issues.

## Sizing Issues

FlowFuse estimates work using **time-based estimates**, not story points.

Our goal is clarity, not precision:

- Keep work small and flowing  
- Surface risk early  
- Avoid large, opaque tasks  

### Core Principles

- **Tasks and subtasks must be 4 hours or less**
- Anything larger must be broken down
- Estimates are expressed in time
- Estimates evolve as understanding improves

### How Estimation Works

#### Initial Estimation

A rough time estimate should be provided during issue creation or refinement. This includes implementation, testing, and documentation.

#### Refinement and Breakdown

Weekly refinement sessions are used to:

- Break stories into tasks
- Clarify scope and acceptance criteria
- Discuss technical approaches
- Ensure tasks are ≤ 4 hours

The Design Engineer may contribute discovery findings or technical context to reduce uncertainty.

#### Sprint Planning

Sprint planning happens weekly on Fridays. Work is selected based on capacity and availability.

### Task Sizing Guidelines

- **≤ 4 hours** → acceptable  
- **> 4 hours** → break it down  

Stories may span multiple days, but **tasks must remain small and well-defined**.

### Ownership and Adjustments

- Engineers may re-estimate or split tasks as needed
- Tasks that grow should be split, not stretched
- The Engineering Manager helps rebalance work

## What makes a good issue?

A good issue is clear in scope, intent, and value.

### Defining a Story

Stories should follow:

> As a _[type of user]_, I want to _[do something]_, so that _[value]_.

### What makes a good Task?

A good task is small, explicit, and independently completable.

A task should:

- Be ≤ 4 hours
- Have a clear outcome
- Be independently startable
- Make progress visible

**Good examples**

- “Add validation for device name length”
- “Wire feature flag for metrics panel”
- “Add unit tests for token refresh”

**Avoid**

- “Implement backend”
- “Refactor auth”
- “Polish UI”

If a task feels vague or hard to estimate, it should be split.

## Project Boards

We use two GitHub project boards:

- [Product Planning Board](https://github.com/orgs/FlowFuse/projects/3/views/1)
- [Development Board](https://github.com/orgs/FlowFuse/projects/1/views/1)

### Product Planning Board

Maintained by Product and the CTO. Used for long-term planning and prioritization.

### Development Board

Tracks active and near-term work.

#### States

- Todo
- Up Next
- In Design
- In Progress
- Review
- Done

##### In Design

Design work (UX or engineering) must have clear deliverables and should not block progress unnecessarily.

##### Defining Done

An item is Done when:

- Code is merged
- Tests are added
- Documentation is updated
- Acceptance criteria are met
- A feature demo is recorded

##### Feature Demos

Each completed feature includes a short demo video shared in `#feature-demos` with a link in the issue.

#### Timeline

The Timeline view uses Started and Expected dates to visualize near-term execution rather than long-range prediction.

## Engineering Throughput

Engineering throughput measures delivered value and is tracked via merged PRs across core repositories.

An interactive dashboard is available at:  
https://github-stats.flowfuse.cloud/dashboard/analysis
