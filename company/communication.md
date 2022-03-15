As a distributed company we should be mindful of how we communicate.

## Timezones

### Use UTC for times

Unless explicitly stated otherwise, communicate times in UTC. This allows each
team member to remember just their offset to UTC and makes communication around
timezones less error-prone (e.g. misremembering your own offset to a collegues
timezone) and more efficient. **Exception**: When communicating to meet in 
phisical locations, the timezone of that location will be assumed as default.

### Time of day

A 24 hour clock is assumed in time notations like `10:00`, when referencing a
time in the afternoon either use e.g. `15:00` or explicitly `3 PM`.

## Meetings

### General guidance

Each meeting should have an agenda. This allows potential participants to prepare
and decide whether attendance is required. Any partipant can add items to the
agenda, please prefix your item with your name or initials to communcate who's
going to talk and lead the discussion. Adding new items to the agenda while the
meeting is started is good practise and can be leveraged to keep the currently
discussed item focussed and on-rails.

### During the meeting

Meetings start on time by the person with the first item on the agenda, verbalize
and discuss the item. Once done, hand over to the owner of the next agenda item.

During the meeting notes should be taken in an inline fashion. Non-participants
can then read the agenda after the meeting and are up-to-date without having to
scroll to a notes section.

### Coffee calls

Coffee calls are social of nature and thus are the exception to the rule that
each meeting should have an agenda.

### Async standup meetings

To make the standup meeting async, we're using [Geekbot](https://geekbot.com/).
Geekbot will trigger each workday morning at 9:00 local time, when online in
Slack. Everyone who's a member of the #standup channel in Slack will be
prompted.

Pro-tips:
- When a questions doesn't need answering, fill in `-` to skip
- When you want to report earlier that day, message Geekbot `report`

### Current meetings

#### Tuesday Kick Off

Weekly kick off meetings have the intention to set goals for the week, create
accountability, and discover blockers before they occur. Each participant will
get the opportunity to share:

1. (optional) Personal updates, show-and-tell of side projects etc.
1. The goals for this week
1. What challenges they're faced with, and discuss who will help

The meeting itself is wrapped up with an 'Open Mic' section, for ideas, problems,
and smaller discussion items that can be discussed in a group in few minutes.

#### Friday Wrap up

To review the week, and learn from the progress made by the team, each week is
closed out with another meeting. Each participant reviews their goals of the week
and takes a moment to briefly review on those goals.

The meeting is also leveraged to walk the [project board][gh-board] on GitHub.

[gh-board]: https://github.com/orgs/flowforge/projects/1/views/1

## Node-RED community interactions.

As an employee of FlowForge, when we interact with the OSS Node-RED community we 
must be mindful of our position.  For example, when offering advice on the Node-RED 
forum or the Node-RED slack, the first answer we offer should be how a solution can 
be achieved using Node-RED.  If a native Node-RED solution is not possible or the 
user would benefit from the advantages that FlowForge offers, then, like any other 
person or company, we can offer FlowForge as a potential solution.
