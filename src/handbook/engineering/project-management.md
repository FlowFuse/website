---
navTitle: Project Management
---

# Project Management

## Overview

Engineering at FlowFuse operates through a small set of intentional weekly rhythms.

These rhythms help us:

* surface what matters
* align on shared understanding
* commit to work realistically
* support engineers as they execute

Meetings, boards, and labels exist to support this workflow, not replace judgment or collaboration.

## TL;DR

* Engineering work is guided by clear weekly rhythms, not ad hoc urgency.
* The Monday engineering meeting is the highest-level forum for alignment and discussion.
* Sprint planning (Friday) is where we commit to already-prioritized work and assign timeboxes.
* Each engineer commits to 24 hours of timeboxed work per sprint.
* Issue labels make work visible and sprint-ready; anything in a sprint must be fully labeled.
* We are async-first, but pragmatic about using sync time when it helps.

## Cadence

Engineering work follows a consistent weekly cadence designed to create alignment and focus.

That cadence is anchored by two core meetings:

* the Monday Engineering Meeting
* Sprint Planning on Friday

## Weekly Engineering Meeting (Monday)

The Monday engineering meeting is the highest-level forum for alignment and discussion.

It is dedicated engineering time to talk through what is top of mind for the team, share context, and surface concerns that need collective attention.

This meeting is not about status or reporting. It exists to ensure the team starts the week on the same page.

Notes and agenda live in a running Google Doc shared with the team.

### Agenda & Preparation

The meeting follows a lightweight, repeatable agenda inspired by the Bloom meeting format, typically including:

* headlines
* goals
* issues to discuss
* follow-ups or todos

Before the meeting:

* engineers add topics they want to discuss to the issues list in the agenda document
* topics should include enough context for others to understand why they matter

This ensures the agenda reflects real concerns, not just the loudest voices.

### Issue Selection & Discussion

At the start of the meeting:

* engineers vote on which issues to discuss
* issues are discussed in order of most votes first

This makes priority explicit and shared.

### Timeboxing & Carryover

* Every agenda item is timeboxed.
* When time expires, discussion stops.
* Unfinished topics carry over to the next meeting.

This keeps the meeting focused and protects collective time.

## Sprint Planning (Friday)

Sprint planning is a one-hour weekly meeting, typically held on Fridays (or the last business day of the week if there is a holiday).

This is where engineering commits to work.

Sprint planning has two goals:

1. Close the sprint that is finishing
2. Commit work for the sprint that begins the next business day

### Closing the Current Sprint

We review:

* what was completed
* what was not
* whether any work is overflowing into the next sprint

The project board is updated to reflect reality. This is about accuracy and learning, not blame.

## Development Board

We use a GitHub Project board to make work visible and to reflect sprint reality.

The board shows what work is in progress, what is blocked, and what has shipped.

It is updated during sprint planning and throughout the week as work progresses.

### Prioritization Happens Outside Sprint Planning

Sprint planning is not a prioritization meeting.

Prioritization happens elsewhere, in conversations involving:

* Product
* Engineering Management
* the CTO

Sprint planning assumes this work has already been prioritized.

If new priorities surface during sprint planning, they are handled outside the meeting and brought back later.

### Planning the Next Sprint

During sprint planning:

* engineers select from already-prioritized work
* scope is confirmed
* timeboxes are assigned
* blockers and dependencies are surfaced
* work is committed or deferred

Each engineer commits to up to 24 hours of timeboxed work per sprint.

Timeboxes represent expected effort, not performance targets.

## Feature Demos

Completing a meaningful piece of work often includes demonstrating it.

Feature demos help to:

* share context across the team
* validate that work delivers the intended value
* surface gaps or follow-up ideas early
* support release communication and storytelling

Demos should be lightweight and timely.

If questions, issues, or improvement ideas come up during a demo, they should be captured as GitHub issues and planned like any other work.

## Changelog & Release Communication

Some completed work is communicated externally via the FlowFuse changelog and release highlights.

Work may be changelog-worthy when it:

* delivers visible user value
* introduces new functionality or behavior
* significantly improves an existing workflow
* fixes an impactful or user-facing bug

Ownership of publishing changelog entries may evolve over time. Regardless of ownership, engineering is responsible for surfacing notable work and relevant context.

### Communicating Highlights to Product & Marketing

Engineering shares release highlights through the standing Product ↔ Marketing Sync, a fortnightly meeting held during weeks 2 and 4 of the release cycle.

The Engineering Manager represents engineering in this meeting.

Issue labels are used to help Engineering Managers identify which completed or in-flight items may be relevant to share.

## Issue Labels (How We Make Work Visible)

Issue labels are a shared contract that support planning and execution.

From the labels alone, an engineer should be able to understand:

* what kind of work an issue represents
* where it lives in the system
* how much effort it is expected to take
* whether it is ready to be worked

### When Labels Are Applied

* Labels are applied before and during sprint planning.
* Sprint planning is where labeling is finalized.
* Any issue committed to a sprint must be fully labeled.

If required information is missing, the issue is not ready to be worked.

### Effort & Timeboxing

Timeboxes indicate expected effort, not complexity or importance.

* Timeboxes are intentionally small.
* Work larger than a few hours must be broken down.
* Unclear work is marked explicitly.

## Defining Done

An issue is considered done when it is merged and deployed, and any required follow-up (documentation, validation, or release communication) is complete.

If work is not shipped or not validated, it is not done.

## Ad Hoc Collaboration (Async-First, Flexible)

Engineering at FlowFuse is async-first by default.

We prefer written context, Slack threads, issues, and docs that preserve focus time.

At the same time, we are pragmatic and flexible.

Engineers are encouraged to use quick Slack huddles, pairing sessions, or short syncs when they are the fastest way to unblock work or align.

## Worked Example

### Scenario

A recurring issue where Node-RED flows sometimes fail to deploy after an upgrade.

### Monday Engineering Meeting

* An engineer adds the topic to the agenda issues list with brief context.
* The team votes and discusses the issue.
* The group agrees it needs investigation, but scope is unclear.

No sprint commitment is made. The meeting creates alignment, not assignments.

### Issue Creation

A GitHub issue is created with:

* a clear work item type
* a single work type
* relevant area labels
* time:TBD

The issue is visible but intentionally not sprint-ready.

### Sprint Planning

* The work has been prioritized outside sprint planning.
* During planning, the team agrees to break it into smaller tasks.
* An investigation task is created, timeboxed, and pulled into the sprint.

### Execution

<<<<<<< HEAD:src/handbook/engineering/project-management.md
As per our [Product Strategy](/handbook/engineering/product/strategy/), our product is broken into three pillars - Build, Manage and Deploy. Within these pillars we have a collection of [Areas](/handbook/engineering/product/strategy/#product-pillars).
=======
* The investigation task is worked.
* Any additional work discovered is brought back through planning.
>>>>>>> origin/main:src/handbook/development/project-management.md

This keeps work small, explicit, and intentional.

## How the Pieces Fit Together

* The Monday engineering meeting builds alignment and shared understanding.
* Sprint planning commits to a realistic slice of already-prioritized work.
* Issue labels make that work explicit and visible.
* Async-first collaboration supports day-to-day execution.

Together, these create a system that favors clarity over urgency, small work over heroic effort, and shared understanding over silent assumptions.

## Engineering KPIs

These metrics help us observe how well the engineering system described above is functioning over time.

They are used to understand trends and surface constraints, not to evaluate individual performance or enforce targets.

- **UI/UX Work:** This is generally work in Figma for product, website or the components library. Deliverables should be well-defined as an MVP prototype, or at least enough for engineering to get started, on which we can iterate.
- **Engineering:**  Questions that need answers should be formulated up front, and answered as the deliverable. Questions around what technology to use, how to scope down the feature set, and how to deliver the results
are thus required before the design sprint start.

##### Defining Done

An item should only be marked as 'Done' on the Development board when the following
criteria are met:

 - All related code changes have been merged
 - Suitable unit/system level tests have been added
 - Documentation has been updated
 - Acceptance criteria identified in the Story have been met
 - Feature Demo

##### Feature Demos

Part of finishing an item is being able to demonstrate it in action. This allows
others to see it in action, generate material for the release announcement and
help identify any gaps or places for improvement.

Each feature demo is recorded by the developer responsible for the feature, detailing its functions and operations. If problems, challenges, or improvement ideas arise during the review of the demo, everyone is encouraged to post a comment under the video within the Slack channel. Additionally, a corresponding GitHub issue should be opened to track and prioritize these points for further discussion and action.

Demos must be done in good time and as early as possible to allow for any follow-up action.

Demos should consist of:

 - A short (< 5 minute where possible) screen capture walk through of the feature with commentary.
 - It should cover the feature from a users perspective - what value do they get from it.
 - The video should be uploaded to, or linked to, in the relevant issue.
 - A post in the [`#feature-demos`](https://flowfuse.slack.com/archives/C04GW82DJFK) Slack channel once work is ready to be delivered. 
 - Intermediate demos used to refine scope or gather feedback during a sprint should be shared in the relevant `#proj-` channel instead (see [Communication](/handbook/company/communication/#project-channels)).

We no longer use Engineering Throughput as a primary metric.

Instead, we track Engineering Time to Value (median and P75) and ticket type distribution to understand delivery speed and bottlenecks.

### Engineering Time to Value (Median)

**TL;DR**  
How long a typical piece of engineering work takes to go from started to done.

### Engineering Time to Value (P75)

**TL;DR**  
How long the slowest 25% of engineering work takes to go from started to done.

### Ticket Type Distribution

**TL;DR**  
The ratio of feature work to other work (bugs, chores, maintenance).
