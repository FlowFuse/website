## Planning

Instructions for creating a release are [here](./process.md).

FlowForge is released every four weeks, on a Thursday. There are 13 releases each
year. The initial release was published on 2022-01-20. This implies releases
will be scheduled on the following dates.

 -  2022/07/07 (0.7)
 -  2022/08/04 (0.8)
 -  2022/09/01 (0.9)
 -  2022/09/29 (0.10)
 -  2022/10/27 (1.0)
 -  2022/11/24 (1.1)
 -  2022/12/22 (1.2)

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
 - 'Next' These are items which we should be targeting for the next milestone to be planned, We plan milestones 2-3 iterations ahead so this timeframe will typically be 2-3 months. 
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

Work comes from two places:

 - Items assigned for Design/Estimation on the Product Board
 - Items from the ToDo status on the Development Board

It is important we make progress on both sides to ensure a steady velocity across
milestones.

Naturally there will be items that crop up unexpectedly and have to be dealt with
pragmatically. For example, we may realise an item is needed for the current release
that needs to be expedited through the process. We should remain flexible in how
we work.

When picking up an unassigned item assign it to yourself and move it to the
**In Progress** state (for Development items) or the appropriate Product board state.

#### Milestones are overscheduled

As stories and tasks are assigned to milestones, it's unlikely there's not
enough work to be done. On the flipside, this means that not all scheduled epics
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

