---
navTitle: Communications
---

# Communication

As a distributed company, we rely on clear, consistent, and intentional communication so teams can stay aligned, make effective decisions, and collaborate smoothly across timezones.

## Company-wide announcements

We post company-wide announcements in the `#announcements` channel in Slack. Everyone should follow this channel. Some announcements include a short video to give extra context or to explain the change in a more personal way. If the change requires a Handbook update, we include the pull request link so you can review the source of truth.

## AI-Assisted Communication

AI tools, including Large Language Models (LLMs), can help you communicate better. For example, a non-native English speaker can use an LLM to improve word choice or adjust tone. People can often notice when AI wrote a message, and it may feel impersonal. It can help to edit AI output so it reflects your personal tone and clearly shows your intent.

Remember that communication is always between humans. We are responsible for the messages we send and for how others might understand them. Always review and confirm AI suggestions before sending a message. AI should support your communication, not replace your judgment or your voice.

## Date and time

### Use UTC for times

Unless stated otherwise, communicate times in UTC. This helps everyone avoid timezone mistakes and makes coordination easier. Each person only needs to [remember their own offset from UTC](https://en.wikipedia.org/wiki/List_of_UTC_offsets).

**Exception:** When planning to meet in a physical location, use that location’s timezone.

### Time of day

Use the 24 hour clock for all times. For example, write `10:00` or `15:00`. If you need to include a 12 hour format for clarity, write it explicitly, such as `3 PM`.

### Formatting dates

Different countries use different date formats, so be explicit. Use the YYYY-MM-DD format by default. This format is unambiguous, follows the ISO 8601 standard, and works well in tools like Google Sheets.

## Meetings

### General guidance

Each meeting should have an agenda. An agenda helps participants prepare and decide whether they need to attend. Any participant may add items to the agenda. Please prefix your item with your name or initials so it is clear who will introduce and lead that topic.

It is fine to add new items while the meeting is happening. Doing this can keep the discussion focused and help the group stay on track.

Record customer-facing meetings with Fathom. See the [Sales Meetings guide](/handbook/sales/meetings/) for details) for details.

### During the meeting

Meetings start on time, and the initiator is the person who owns the first agenda item. When they finish, they hand over to the owner of the next item.

Take notes directly in the agenda during the meeting. This improves readability and flow, and it removes the need to scroll to a separate notes section.

### No Agenda, No Attenda

Most meetings are scheduled to discuss items and make decisions. There's meetings
that just shouldn't take place when there's nothing to discuss on the agenda
5 minutes prior to the meeting.

### Google Calendar Delegation

You can allow other team members to manage created events on your calendar by adjusting the modify permissions on a per event basis or have it enabled by default. Having it enabled by default allows co-management of your created events which is particularly helpful if the person who created the event is unable to edit it when needed. Allowing broader permissions works well for most events in an async remote work environment.

To enable it by default for all your future created events:
1. Sign in to https://calendar.google.com with your FlowFuse email address.
1. In the top right click on the Gear icon to go into the [pGoogle Calendar Settings](https://support.google.com/calendar/answer/6084644?hl=en&co=GENIE.Platform%3DDesktop&oco=0)
1. Go to `Event settings`
1. Adjust `Guest permissions` to include `Modify event`

### Coffee calls

Coffee calls are social of nature and thus are the exception to the rule that
each meeting should have an agenda. If you want to be matched to a random team
member every two weeks for a coffee call, join the #virtual-coffee channel on
Slack to be matched automatically.

## Asynchronous communication

Communication through different timezones or due to differences in availability
requires knowledge to be persistent in sources that are approachable to others
and non-ephemeral.

Information should thus be stored in:
1. Handbook
1. GitHub issues
1. Git Repositories pushed to GitHub
1. Google Drive (Docs / Sheets / etc.)

Don't store information in:
1. Slack
2. Figma

### Email

Email for internal communication is only used for discussions that need
a 'paper'-trail. Compensation, underperformance, and other made decisions.
In _all_ other cases, use [Slack](#slack).

### Slack

When using Slack, prefer to keep discussions in a thread. This reduces scroll
back, and focusses channels.

To keep everyone on the same page and to allow others to collaborate you should favour
public channels over DMs.

Our recommended Slack (light) theme is:
`#F2F2F2,#FFC806,#779FA1,#FFFFFF,#F0D36C,#111111,#2AB052,#FD0B00,#AA4444,#FFFFFF`

#### Recommended channels

Not all channels are joined by default when you join Slack. We've added a bunch
below so you get to decide if you want more channels or not.

- `#announcements` is for company-wide announcements.
- `#feature-demos` is where product updates are shared. All team members should keep a pulse of product changes, independent of their roles.
- `#ops-metrics` will output sales and engagement metrics.
- `#virtual-coffee` to schedule coffee calls with other team members.
- `#gh-handbook` to follow changes in the handbook.
- `#thanks` is for sharing appreciation and thanks with team members. Saying thanks often is especially important in remote companies to maintain positive team culture.

#### Channel name structure

To make it easier to find your way around in Slack, we have some rules for naming channels. This will help give everything some context and implicit sense of purpose.

|Type | Slack prefix | Purpose |
|:--- |:--- |:---|
| Department           | `#dept-` | For each company department and ask them questions |
| Project based work   | `#proj-` | Work scoped to a project with an finite horizon |
| GitHub notifications | `#gh-`   | For many updates around the website and product development a notification is sent to the corresponding channel |
| Ops notifications    | `#ops-`  | Channels receiving notifications from operations-related services |

All team members are advised to put prefix type channels into [their own section](https://slack.com/help/articles/360043207674-Organize-your-sidebar-with-custom-sections).

There are also channels for specific subsets of people. For example, there is `#people-managers` for people managers and `#us-hr` HR-specific topics to US-team members.

Channel creators should include a description of the channel so that all employees are able to browse channels and select the ones that are relevant to their work.

### GitHub

All code at FlowFuse is stored in Git, and GitHub hosts our repositories. As
such all our changes, feature ideas/requests, etc. are stored there. It also
holds task lists for onboarding, [art requests](../design/art-requests.md), and
other projects not necessarily code related. It's important to stay in the loop
on GitHub and its notifications.

Recommended views to keep track of items requiring your attention:
- [PRs that mention you](https://github.com/pulls/mentioned)
- [Questions and comments that need your attention](https://github.com/issues/mentioned)
- [Reviews of PRs](https://github.com/pulls/review-requested)

Please respond to mentions, review requests, etc within 2 business days.

### Standup meetings

Standup meetings are hard to scale across multiple timezones. To make stand-ups
async, we're using [Geekbot](https://geekbot.com/). Geekbot will trigger each
workday morning at 9:00 local time, when online in Slack. Everyone who's a
member of the #standup channel in Slack will be prompted.

A good standup message reduces the need for status updates in live meetings.
When writing a standup message, please mind the following:
1. Bridge the gap between high-level strategies and actionable daily tasks. Explain what you do today and how it helps the strategic objectives of the company.
2. Focus on specific, measurable actions for the day, providing clarity and accountability, instead of vague updates.

Pro-tips:
- When a questions doesn't need answering, fill in `-` to skip
- When you want to report earlier that day, message Geekbot `report`

Example Standup: 
* Bad: "More work on the special feature"
* Better: "Align on plan for building special feature with Manny and work on it"
* Best:
   * Get Manny's sign off on plan for special feature
   * Break Issue 1234 into relevant tasks

### Current meetings

#### Monday Team Catchup

Weekly an optional meeting is held to announce company wide updates, get to know each
other, and share things you want to share both professionally and personally.

On the agenda you might want to add what you did the past weekend, and what kept
you busy. It's also great for setting the order of the chatting and ensuring
everyone gets the opportunity to share.

#### Strategy Call

The Strategy call is a chance to team leadership to touchbase on a weekly basis. 
The other topics change and are based on whatever issues are pressing.
The first 5-10 minutes is [a review of metrics](./achieving-success/#kpi). This call currently occurs on Tuesdays.

## 1:1 meetings

Each employee at FlowFuse will have weekly one-on-one meetings with their
manager. It is the responsibility of the direct report to set the agenda for the 
meeting. This is a great opportunity to communicate with your manager on how to 
set you up for success. Topics might include changes in one's personal life, how 
one is feeling, or ongoing challenges.

An agenda is kept in a closed off Google Doc for this meeting to which both parties 
should add items to the discussion list. It's generally recommended to add items to 
the agenda as they come to your mind, rather than wait to prep the agenda the day before. 
During the meeting, the direct report can filter through relevant discussion topics. 

It is important for 1:1s to not turn into a status update meeting. Statuses are best shared
in the issue where work is being done, in regular standup, or in other async updates. 
Projects are discussed in 1:1s when there needs to be alignment, a difficulty needs to be 
discussed, or a solution needs to be brainstormed

When preparing an agenda for a 1:1, consider the following questions:
- What has changed in the last few weeks that worked out well?
- What has changed in the last few weeks that didn't work out?
- Were there difficult problems to be solved last week? What would've made it easier to solve?
- What's important but not urgent that's left undone?
- How did you receive feedback and was that the best way?
- Where do you feel there is an area to improve? Do you want to work with your manager on brainstorming a plan to improve it? 

Your 1:1 agenda should include an "Action Items" list to track what follow on actions 
were committed to by each of the different parties. It is also helpful include a
timeline if one was committed.

## Skip level meetings

Meetings between levels of the organization happen in regular 1:1s, usually held
weekly between the manager and report. The report however might want to
also communicate with the manager's manager to keep in touch with the strategy and
communicate feedback on what they observe directly.

The advised cadance to have these meetings depends on the wants of the report,
but generally advised once every 6-8 weeks. As FlowFuse scales, the number of
weeks between these meetings is likely increasing.
