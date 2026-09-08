---
title: "PoV Workbook"
navigation:
  order: 13.5
  icon: i-lucide-clipboard-list
---

## PoV Workbook

The **PoV workbook** is the single document that runs a Proof of Value — the
"FlowFuse PoV Collaboration" Google Sheet. **Start from the
[FlowFuse — POV Template](https://docs.google.com/spreadsheets/d/1QAglAay1ikyBdWJRGSEiQfHCsFDz9TCt4lyJ4x0Ds38/edit){rel="nofollow"}** —
copy it per engagement, don't edit the template. Completed workbooks and the
source docs for the use cases we build live in
[this shared folder](https://drive.google.com/drive/folders/12BjizVCMc5O6KeBN5Ce7j1yxdHiq0wzM){rel="nofollow"}.
It is the through-line across the whole
engagement: every [sales meeting](/handbook/sales/meetings/) stage either *produces*
or *executes* a portion of it. Because it spans all the stages, it — and the shared
vocabulary below — live here rather than inside any one stage.

It is filled out *with* the customer, not for them — the conversation is the point.
Complete it live on the calls, tie every criterion back to a Discovery pain, and
agree the next step before testing starts.

## How the stages fill the workbook

Each SE stage owns a portion of the workbook:

| Stage | Portion of the workbook |
|-------|-------------------------|
| **[Discovery](/handbook/sales/meetings/discovery/)** | The **use case** — the pain. May surface candidate apps, but they don't take form yet. |
| **[Demo](/handbook/sales/meetings/demo/)** | No workbook portion directly — introduces the [Application Guide](/docs/application-guide/), establishing the **fundamentals** and **app delivery methods** via a relatable use-case hook, so the apps *can* take form in Solution. |
| **[Solution](/handbook/sales/meetings/solution/)** | Tailors the guide to the customer's environment (**app pattern, data plane, architecture**), then fills the **apps**, **scoping criteria / pass signals** and **plan** — the bulk of it. |
| **[PoV / Validate](/handbook/sales/meetings/pov/)** | **Executes** the workbook: proves each criterion, runs the plan, works the Questions. |

## Definitions

| Term | Meaning |
|------|---------|
| **Proof of Value (PoV)** | A time-boxed, criteria-driven engagement to prove FlowFuse delivers the value the customer needs. Formerly a "PoC" (Proof of Concept) — we say PoV to keep the focus on business value, not just technical feasibility. |
| **Use case** | A defined customer *pain*. A customer may have many use cases, but a PoV usually covers **one** — proving we can solve it is what the PoV is for. |
| **App** | The *solution* delivered on FlowFuse. A single use case may take one app or several to solve — the pain defines the use case, the apps are how we address it. |
| **Scoping criteria** | The specific things the PoV sets out to prove for the use case. Each one ties back to a pain raised in Discovery. |
| **Pass signal** | The concrete, observable outcome that shows a criterion is met (e.g. "a change made centrally reaches every target instance through a pipeline, with no one logging into an edge node"). Not a feature — a demonstrated result. |
| **Pre-PoV gate** | Something that must be true before the PoV can start (licenses issued, plan agreed, environment ready). Gates are tracked as a checklist and block kickoff until cleared. |
| **Delivery method** | How an app reaches the edge. The two we prove are **Whole App Pipeline** (promote dev → staging → production) and **Edge App + Components** (publish reusable components to the Team Library and consume them by reference). |
| **Sponsor / champion** | The customer owner of the PoV outcome, who takes the business case to the budget holders after a successful exit. |
| **Cloud trial** | A 30-day self-service trial of FlowFuse Cloud. |
| **Self-hosted trial** | A trial run on the customer's own infrastructure, unlocked with a trial license key. |

## The tabs

The workbook is deliberately split into tabs, each handled its own way. The value
is in *why* each tab exists:

| Tab | What it's for | Why it matters |
|-----|---------------|----------------|
| **Overview** | The team (FlowFuse and customer roles), the commercial picture, and the key links — one place for who's involved and what the deal looks like. | Names the sponsor and the budget holders up front, so a successful PoV has a clear path to a decision instead of stalling. |
| **Use Cases** | The use case (usually one per PoV), its goal and architecture stack, and the **scoping criteria** — each pain paired with the pass signal that proves it's solved. | This is the contract of the PoV. It defines the pain and what "success" means so there is no ambiguity when the PoV ends, and it keeps testing anchored to real pains, not a feature tour. |
| **App** (one or more tabs) | Defines one app — its **delivery method**, **app pattern**, where it runs, its component architecture, and its own success criteria. A PoV may have several — one per app or delivery method being proven. | Turns the use case into concrete, working apps the customer can see and run — the proof that FlowFuse builds and ships real applications, not just manages Node-RED. |
| **Plan** | The pre-PoV gates, the scheduled tasks by phase, and the post-PoV commercial steps. | Turns "let's try it" into a dated plan with owners. Gates stop a PoV starting before it can succeed; the post-PoV section keeps the commercial motion moving the moment testing passes. |
| **Timeline** | A visual (Gantt-style) view of the Plan. | Gives the sponsor something concrete to take to stakeholders and set expectations against. |
| **Questions** | An async channel for open technical, functional and commercial questions, each with an owner, date and status. | Keeps blockers out of scattered email threads and visible to both sides, so nothing quietly stalls the PoV. |
