---
navTitle: Planning
---

# Planning

This page provides a comprehensive overview of the planning processes and procedures that guide our product development at FlowFuse. As a continuously evolving software, FlowFuse employs a structured planning method to ensure timely releases, both for the FlowFuse Cloud and for our self-hosting users.

Instructions for creating a NPM package release are [here](./process.md).

Our planning process is continuously evolving as we find the best way to accommodate both a growing team and an expanding set of requirements for how and what we deliver.

## Cadence

FlowFuse is continuously released to FlowFuse Cloud, and every four weeks, on a Thursday, it is packaged for users who are self-hosting FlowFuse. 

### Milestones

We track packages using GitHub Milestones. We utilize GitHub issues for planning work. Issues are continuously scheduled by the PM. Releases are structured following the [Semantic Versioning](https://semver.org/#semantic-versioning-200).

Milestones indicate the week of the release instead of a Patch version. This leads to a specific structure for Milestones: **MAJORversion.MINORversion.WEEK**. For example, 1.14.2 would represent the second week of the release of 1.14. This method ensures that Milestones can be used as deadlines while allowing continuous planning.

## Planning & Prioritization

The planning process is continuous, allowing the engineering team to consistently release new functionalities.

### Step 1 - Backlog prioritization and refinement
Based on customer feedback, input from the FlowFuse team, and all stakeholders, issues are continuously raised and prioritized [in our Backlog](#product-backlog-board).

### Step 2 - Assignment to the To-Do section
Once an issue is refined, the PM continuously assigns issues to the [Development Board's](#development-board) `To-Do` Section. This is the first indication that this particular item is planned and will be the one of the next items for the `Up Next` section. It also signals the engineering and UX team to raise any open design or architectural clarifications if required.

This section should include a maximum of 40 [effort estimation points](#effort-estimation).

### Step 3 - Assignment to the Up Next section
This section is most relevant for the engineering team because it includes the issues which should be picked up next. The issues should generally be ready for pickup. Both the PM and CTO are responsible for directly assigning the issues in this section to an engineer.

**Milestone Assignment:** the CTO and PM are responsible for assigning a milestone to the items in this section based on the [effort estimation](#effort-estimation), indicating the week when this issue is expected to be released to FlowFuse Cloud.

The `Up Next` section should consistently contain sufficient items, ensuring that members of the engineering team can immediately transition to a new task once other issues have been [successfully developed](#defining-done). Every available engineer should have exactly one pre-assigned task, providing clear visibility for everyone on their subsequent responsibility.

## UX Planning

 Every four weeks this meeting is conducted between the Product Manager (PM) and the Head of User Experience (UX), it is designed to discuss and identify potential UX issues and requirements that need to be addressed in the upcoming iteration. The goal is to be proactive in identifying and resolving UX-related challenges before the start of the development phase.

 See also ['In Design' Deliverables](#in-design-deliverables)

## Issues

Issues are the building blocks of planning activities, helping the team to manage and prioritize work. 

### Types

 - **Epic**: a significant feature or piece of work that doesn't easily fit into
   a single release. It will typically have a number of Stories
   and/or Tasks associated with it that can be delivered iteratively.

 - **Story**: a *user-oriented* description of a feature. It should describe what
   a user should be able to do and identify the value that brings to the user.
   A story should be deliverable in a single release.

 - **Task**: a piece of work that isn't necessarily tied to a specific Epic or Story.
   For example, items related to technical debt or house-keeping chores.

  - **Bugs**: issues that arise from errors, flaws, or unintended behavior in the existing code or system. Bugs negatively impact the user experience or the functionality of the software. They should be addressed and resolved by the development team, prioritized based on their severity, and included in the appropriate release for fixes.

  - **Feature Requests**: suggestions or ideas submitted by users or stakeholders for new functionalities, enhancements, or improvements to the existing software or system. Feature requests should be evaluated, prioritized, and potentially incorporated into the product roadmap, often being transformed into Epics or Stories for implementation in future releases.

Whenever an issue is raised, it will be reviewed by the Product Manager/CTO and added
to the Product Board for prioritization and planning. The exception to this are
tasks/bugs related to work already in progress and that need to be addressed in
the current milestone. They should be added to the Development Board and current
milestone directly.

We label some items as `headline`. These are items we want to highlight in the changelog and further
announcements and should clearly describe the value they bring to our users.

### Effort Estimation

To more accurately understand which tasks can be scheduled without overloading our team, everyone conducts an initial, high-level analysis when creating an issue to assign weight estimates. We recognize that these estimates might not be precise. If the person who creates an issue cannot provide an estimate, any FlowFuse team member is welcome to contribute one.

If a developer, who is an expert in a field, wants to change an estimation, they are encouraged to do so immediately. There is no blame for "wrong" estimation; we all have to work together to achieve good planning. It is better to have a rough estimation than no estimation at all. The final decision on estimations in general lies with the CTO.

If a larger number of not estimated tasks need to be estimated, e.g. for a complex epic, the CTO and PM can initiate a [Planning Poker](https://en.wikipedia.org/wiki/Planning_poker) session.

There are two crucial elements to consider when determining an issue's weight: the scope of the work and its complexity. The amount of work pertains to the anticipated extent of modifications to the codebase. A minor adjustment might only require a single alteration in a single file, whereas a more extensive modification could necessitate multiple alterations across numerous files and sections of our codebase. Complexity can be divided into two components in practice: the degree to which the problem is understood and the expected level of problem-solving challenges.

See [labels section](../packaging.md#labels) for sizing options.

Epics do not necessarily need an estimation, as long as all subissues have estimations, Epics are the sum of all subtasks, as a result, it is possible to handle epics larger than XXL.

## Project Boards

We use three project boards to plan and track our work.

 - [Roadmap Board](https://github.com/orgs/FlowFuse/projects/5)
 - [Product Board](https://github.com/orgs/FlowFuse/projects/3/views/1)
 - [Development Board](https://github.com/orgs/FlowFuse/projects/1/views/1)

### Roadmap Board

This is a high-level view of our product roadmap over the coming releases. 

### Product Backlog Board

[This board](https://github.com/orgs/FlowFuse/projects/3/views/1) is maintained
by the Product Manager (PM) and CTO. It is the main entry point for all issues.

Items on this board are put into one of the following states to indicate their priority in the backlog, they can move up or down the priority depending on business needs.

 - `No Status` - This is where all new items initially land so that they can be appropriately triaged and assigned by the PM and CTO
 - `Unplanned`- Not all issues will be planned immediately. Issues can should be assigned to this section if there is no decision yet on the planning.
 - `Long` - This is the long term horizon, items that we know we will want to do one day but at the moment are long term goals, typically this could be 12 months away or more.
 - `Medium` - These are items that are in the 6-12 month time frame. 
 - `Short` - These are items in the 3-6 month time frame, Often these items will get pulled into a milestone from this point depending on capacity.
 - `Next` - These are items which we should be targeting for the next milestone to be planned, We plan milestones 2-3 iterations ahead so this time frame will typically be 2-3 months. 
 - `Closed` - All closed items are assigned to this section or beeing removed from th backlog.
 - `Support & Under Review` - Customers often ask questions via GitHub issues. From these questions, new insightful requirements sometimes arise. Initially, to clarify the situation with the users, issues belong to this category.

As items move up the list and get closer to Next we should have a greater understanding of what the detail and demand is for that feature. This is an iterative approach and as we gain understanding on an item we will use that information to aid in reviewing its position on the board.

 A continuous review is held by the PM to keep the backlog in order - triaging new items that have been raised and not yet added to the backlog, and reflecting on changing priorities and requirements.

### Development Board

The [Development Board](https://github.com/orgs/FlowFuse/projects/1/views/1) is
used to plan and track the work within the current Iteration.

Within the board, we use iterations to indicate when an item is being worked on. The `Up Next` section clearly indicates to everyone which item should be picked up next.

Design work should be handled in a sub-task linked to the development issue.

The board has the following states:

 - `ToDo` - items already be planned but not yet started
 - `Up Next` - items that should be picked up next
 - `In Design` - items being designed
 - `In Progress` - items being developed
 - `Review` - items that are ready to be reviewed (PR open, [feature demo](#feature-demos) created)
 - `Verify` - items that have been merged and can be verified once deployed to the Staging and Production environment
 - `Done` - items that are [Done](#defining-done)

### In Design Deliverables

Both UX/UI work and engineering work can be "In Design". For both instances there should still be defined deliverables. 

It is important to use Design as a tool for conversation, verification, or to ensure engineers and the wider team are on the same page, but it should rarely be a blocker given our [Bias for Action](../../) value.

- **UI/UX Work:** This is generally work in Figma for product, website or the components library. Deliverables should be well-defined as an MVP prototype, or at least enough for engineering to get started, on which we can iterate.
- **Engineering:**  Questions that need answers should be formulated up front, and answered as the deliverable. Questions around what technology to use, how to scope down the feature set, and how to deliver the results
are thus required before the design sprint start.

## Retrospective/Kick-Off

The day after each FlowFuse NPM release, always a Friday, a meeting is scheduled
by the CTO. This meeting includes 2 parts:

 1. A retrospective on the last release. This should capture feedback on what
    went well and what could be improved and generate action items to act on the
    feedback.
 2. Kicking off the next release. The involves:
    1. The Product Manager describing the themes, goals and priorities of the upcomming issues
    2. Reviewing the [Development Board](https://github.com/orgs/FlowFuse/projects/1/views/1)
       for the new milestone.
       High-priority items are assigned owners so that everyone has something to
       get started on.
    3. Identifying the release manager - the person who will co-ordinate things
       on release day.
         - Once identified, they take the action to create the next release issue
           using the [Release Template](https://github.com/FlowFuse/admin/issues/new?assignees=&labels=&template=release.md&title=Release%3A){rel="nofollow"}
           in the `flowforge/admin` repo.

## What to work on

Work comes the `Up Next` column of the [Development Board](https://github.com/orgs/FlowFuse/projects/1/views/1).

Naturally there will be items that crop up unexpectedly and have to be dealt with
pragmatically. For example, we may realise an item is needed for the current release
that needs to be expedited through the process. We should remain flexible in how
we work.

When picking up an unassigned item assign it to yourself and move it to the
**In Progress** state.

## Defining Done

An item should only be marked as 'Done' on the Development board when the following
criteria are met:

 - All related code changes have been merged
 - Suitable unit/system level tests have been added
 - Documentation has been updated
 - Acceptance criteria identified in the Story have been met
 - Feature Demo

### Feature Demos

Part of finishing an item is being able to demonstrate it in action. This allows
others to see it in action, generate material for the release announcement and
help identify any gaps or places for improvement.

Each feature demo is recorded by the developer responsible for the feature, detailing its functions and operations. If problems, challenges, or improvement ideas arise during the review of the demo, everyone is encouraged to post a comment under the video within the Slack channel. Additionally, a corresponding GitHub issue should be opened to track and prioritize these points for further discussion and action.

Demos must be done in good time as ealry as possbile to allow for any follow-up action.

Demos should consist of:

 - A short (< 5 minute where possible) screen capture walk through of the feature with commentary.
 - It should cover the feature from a users perspective - what value do they get from it.
 - The video should be uploaded to, or linked to, in the relevant issue.
 - A link should be posted to the `#feature-demos` channel in slack. This will allow the whole team to be notified of the demo without having to subscribe to every issue comment.

For some features, it may be necessary to create multiple demos of different aspects.
