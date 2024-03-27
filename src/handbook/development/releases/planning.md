---
navTitle: Planning
---

# Planning

This page provides a comprehensive overview of the planning processes and procedures that guide our product development at FlowFuse. As a continuously evolving software, FlowFuse employs a structured planning method to ensure timely releases, both for the FlowFuse Cloud and for our self-hosting users.

Our planning process is continuously evolving as we find the best way to accommodate both a growing team and an expanding set of requirements for how and what we deliver.



## Retrospective/Kick-Off

The day after each FlowFuse NPM release, always a Friday, a meeting is scheduled
by the CTO. This meeting includes 2 parts:

 1. A retrospective on the last release. This should capture feedback on what
    went well and what could be improved and generate action items to act on the
    feedback.
 2. Kicking off the next release. The involves:
    1. The Product Manager describing the themes, goals and priorities of the upcoming issues
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

When picking up an unassigned item assign it to yourself and move it to the
**In Progress** state.


### Feature Demos

Part of finishing an item is being able to demonstrate it in action. This allows
others to see it in action, generate material for the release announcement and
help identify any gaps or places for improvement.

Each feature demo is recorded by the developer responsible for the feature, detailing its functions and operations. If problems, challenges, or improvement ideas arise during the review of the demo, everyone is encouraged to post a comment under the video within the Slack channel. Additionally, a corresponding GitHub issue should be opened to track and prioritize these points for further discussion and action.

Demos must be done in good time and as early as possible to allow for any follow-up action.

Demos should consist of:

 - A short (< 5 minute where possible) screen capture walk through of the feature with commentary.
 - It should cover the feature from a users perspective - what value do they get from it.
 - The video should be uploaded to, or linked to, in the relevant issue.
 - A link should be posted to the `#feature-demos` channel in slack. This will allow the whole team to be notified of the demo without having to subscribe to every issue comment.

For some features, it may be necessary to create multiple demos of different aspects.
