---
navTitle: Planning
---

## Planning

Instructions for creating a release are [here](./process.md).

### Cadence

FlowForge is released every four weeks, on a Thursday. We track releases using
GitHub Milestones. The current schedule of releases can be seen [here](https://github.com/flowforge/flowforge/milestones).

Our planning process is continually evolving as we find the right way to accommodate
both a growing team and a growing set of requirements on both how and what we deliver.

The following reflects both where we are at today and where we want to get to.

We use GitHub issues for planning the work in a release. A Milestone should exist
for the current release (N) and the next one (N+1). We do not schedule work beyond
that as priorities can change through a release.

There are three types of issue used for planning work:

 - **Epic**: a significant feature or piece of work that doesn't easily fit into
   a single release. It will typically have a number of Stories
   and/or Tasks associated with it that can be delivered iteratively.

 - **Story**: a *user-oriented* description of a feature. It should describe what
   a user should be able to do and identify the value that brings to the user.
   A story should be deliverable in a single release.

 - **Task**: a piece of work that isn't necessarily tied to a specific Epic or Story.
   For example, items related to technical debt or house-keeping chores.

Whenever an issue is raised, it will be reviewed by the Product Owner/CTO and added
to the Product Board for prioritization and planning. The exception to this are
tasks/bugs related to work already in progress and that need to be addressed in
the current milestone. They should be added to the Development Board and current
milestone directly.

We label some items as `headline`. These are items we want to highlight in the release
announcement material and should clearly describe the value they bring to our users.

### Project Boards

We use three project boards to plan and track our work.

 - [Roadmap Board](https://github.com/orgs/flowforge/projects/5)
 - [Product Board](https://github.com/orgs/flowforge/projects/3/views/1)
 - [Development Board](https://github.com/orgs/flowforge/projects/1/views/1)

#### Roadmap Board

This is a high-level view of our product roadmap over the coming releases. It 
identifies the themes and priorities for the releases.

#### Product Backlog Board

[This board](https://github.com/orgs/flowforge/projects/3/views/1) is maintained
by the Product Owner (PO) and CTO. It is the main entry point for all epics and
stories.

Items on this board are put into one of the following states to indicate their priority in the backlog, they can move up or down the priority depending on business needs.

 - 'No Status' This is where all new items initially land so that they can be appropriately triaged and assigned by the PO and CTO
 - 'Long' This is the long term horizon, items that we know we will want to do one day but at the moment are long term goals, typically this could be 12 months away or more.
 - 'Medium' These are items that are in the 6-12 month time frame. 
 - 'Short' These are items in the 3-6 month time frame, Often these items will get pulled into a milestone from this point depending on capacity.
 - 'Next' These are items which we should be targeting for the next milestone to be planned, We plan milestones 2-3 iterations ahead so this time frame will typically be 2-3 months. 
 - 'Ready' This is for items which could be developed today but for various reasons have not been added to a milestone, often this will be items which have been descoped from a previous milestone but could be picked up if there is spare development capacity.

As items move up the list and get closer to Next we should have a greater understanding of what the detail and demand is for that feature. This is an iterative approach and as we gain understanding on an item we will use that information to aid in reviewing its position on the board.
Once an Item is assigned to a milestone it will be removed from the Product Board and added to the Development board, with appropriate iterations allocated for design and development.
Largely the position within the individual column is irrelevant, it may be used to aid in reviews or groupings but does not indicate any priority.

A weekly review is held to keep the backlog in order - triaging new items that
have been raised and not yet added to the backlog, reflecting on changing priorities
and requirements.

#### Development Board

The [Development Board](https://github.com/orgs/flowforge/projects/1/views/1) is
used to plan and track the work within the current milestone release.

Within the board we use:

 - Milestones to indicate what release an item is planned to be released in
 - Iterations to indicate when an item is being worked on

By separating these two out, we can have a single view of everything the team
is working on at a particular time (iteration) without it being part of the current
release (milestone).

For example, Design work needed for a future milestone can be assigned to an Iteration
for when that work needs to happen.

The board has the following states:

 - `ToDo` - items assigned to the milestone or iteration but not yet started
 - `In Design` - items being designed
 - `In Progress` - items being developed
 - `Review` - items that are ready to be reviewed (PR open)
 - `Verify` - items that have been merged and can be verified once deployed to the Staging environment
 - `Done` - items that are [Done](#defining-done)

#### 'In Design' Deliverables

Both UX/UI work and engineering work can be "In Design". For both instances there should still be defined deliverables. 

It is important to use Design as a tool for conversation, verification, or to ensure engineers and the wider team are on the same page, but it should rarely be a blocker given our [Bias for Action](../../) value.

- **UI/UX Work:** This is generally work in Figma for product, website or the components library. Deliverables should be well-defined as an MVP prototype, or at least enough for engineering to get started, on which we can iterate.
- **Engineering:**  Questions that need answers should be formulated up front, and answered as the deliverable. Questions around what technology to use, how to scope down the feature set, and how to deliver the results
are thus required before the design sprint start.

### Retrospective/Kick-Off

The day after each FlowForge release, always a Friday, a meeting is scheduled
by the CTO. This meeting includes 2 parts:

 1. A retrospective on the last release. This should capture feedback on what
    went well and what could be improved and generate action items to act on the
    feedback.
 2. Kicking off the next release. The involves:
    1. The Product Owner describing the themes, goals and priorities of the new release
    2. Reviewing the [Development Board](https://github.com/orgs/flowforge/projects/1/views/1)
       for the new milestone.
       High-priority items are assigned owners so that everyone has something to
       get started on.
    3. Identifying the release manager - the person who will co-ordinate things
       on release day.
         - Once identified, they take the action to create the next release issue
           using the [Release Template](https://github.com/flowforge/admin/issues/new?assignees=&labels=&template=release.md&title=Release%3A)
           in the `flowforge/admin` repo.

### What to work on

Work comes the ToDo column of the [Development Board](https://github.com/orgs/flowforge/projects/1/views/1).

We use a set of labels to identify the high/medium/low priority of an item. We tend to
flag the more important stuff and treat an unlabelled item is implicitly low priority.

Naturally there will be items that crop up unexpectedly and have to be dealt with
pragmatically. For example, we may realise an item is needed for the current release
that needs to be expedited through the process. We should remain flexible in how
we work.

When picking up an unassigned item assign it to yourself and move it to the
**In Progress** state.

#### Milestones are overscheduled

As stories and tasks are assigned to milestones, it's unlikely there's not
enough work to be done. On the flip side, this means that not all scheduled epics
or stories will be completed.

The Product Owner/CTO have overall responsibility to ensure any 'must-have' items
are making progress in a release.

### Defining Done

An item should only be marked as 'Done' on the Development board when the following
criteria are met:

 - All related code changes have been merged
 - Suitable unit/system level tests have been added
 - Documentation has been updated
 - Acceptance criteria identified in the Story have been met
 - Product Owner accepts the story is complete

#### Feature Demos

Part of finishing an item is being able to demonstrate it in action. This allows others
to see it in action, generate material for the release announcement and help identify
any gaps or places for improvement.

All `headline` item or significant piece of functionality should be demoed.

Demos must be done in good time within the release cycle to allow for any follow-up
action. It is better to demo something 90% complete and get feedback on it, than it
is to rush a demo without time to do anything with it.

Demos should consist of:

 - A short (< 5 minute where possible) screen capture walk through of the feature with commentary.
 - It should cover the feature from a users perspective - what value do they get from it.
 - The video should be uploaded to, or linked to, in the relevant issue.
 - A link should be posted to the `#feature-demos` channel in slack. This will allow the whole team to be notified of the demo without having to subscribe to every issue comment.

For some features, it may be necessary to create multiple demos of different aspects.
