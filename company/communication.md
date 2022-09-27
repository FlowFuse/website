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

## Asynchronous communication

### Slack

When using Slack, prefer to keep discussions in a thread. This reduces scroll
back, and focusses channels.

Note that knowledge in Slack is empemeral, it's not a great storage of information.
As such knowledge on a decision made in Slack, or elswhere, should always be recorded
in the GitHub issue or Google Doc on that topic to keep a log that also works
for asynchronous communication.

### Standup meetings

Standup meetings are hard to scale across multiple timezones. To make standups
async, we're using [Geekbot](https://geekbot.com/). Geekbot will trigger each
workday morning at 9:00 local time, when online in Slack. Everyone who's a
member of the #standup channel in Slack will be prompted.

Pro-tips:
- When a questions doesn't need answering, fill in `-` to skip
- When you want to report earlier that day, message Geekbot `report`

### Current meetings

#### Wednesday Team meeting

Weekly a meeting is held to announce company wide updates, get to know each
other, and share things you want to share both professionally and personally.

The meeting starts with announcements and reporting on [key metrics](../company/strategy.md#key-metrics)
These should be written down in the agenda as participation is not required.
Reading the agenda the day after the meeting should be enough to stay in the
loop on company updates. Announcements and work related topics are timeboxed to
the first 15 minutes of the meeting to allow plenty time to talk about other
topics.

Personal updates don't have to be documented in the agenda, but please do keep a
list of names in the agenda so everyone gets the opportunity to share.

## Node-RED community interactions.

As an employee of FlowForge, when we interact with the OSS Node-RED community we 
must be mindful of our position.  For example, when offering advice on the Node-RED 
forum or the Node-RED slack, the first answer we offer should be how a solution can 
be achieved using Node-RED.  If a native Node-RED solution is not possible or the 
user would benefit from the advantages that FlowForge offers, then, like any other 
person or company, we can offer FlowForge as a potential solution.

## Feedback & Thanks

In FlowForge, we strongly encourage the sharing of feedback and thank you's. We have
a custom-built SlackBot (built in Node-RED and hosted in FlowForge of course), that 
enables users to message `@Feedback` with:

- `/give-thanks @to_user <message>` - for short thank you messages
- `/give-feedback` - to be prompted with a more formal template, within which you can provide structured feedback to a particular person. This template contains sections for _"Keep Doing"_, _"Do More Of"_, _"Do Less Of"_ and _"General Comments"_, of which you can complete, and send, the relevant sections.

All feedback is then sent directly to the relevant user via the Slack App, meaning that feedback and thank you messages are all nicely stored in a single place for future review.
