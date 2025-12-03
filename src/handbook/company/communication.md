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

Most meetings exist to discuss items and make decisions. If a meeting has no agenda items five minutes before the meeting, don't have it.

### Google Calendar Delegation

You can allow other team members to manage events you create on your calendar. You can set this permission for each event or enable it by default. Enabling it by default is especially helpful in an async remote work environment.

To enable this for all future events you create:
1. Sign in to https://calendar.google.com with your FlowFuse email address.
1. In the top right, click the Gear icon and open [Google Calendar Settings](https://calendar.google.com/calendar/u/0/r/settings).
1. Go to `Event settings`.
1. Under `Guest permissions`, enable `Modify event`.

### Coffee calls

Coffee calls are social and do not require an agenda. If you want to be matched with a random team member every two weeks for a coffee chat, join the `#virtual-coffee` channel on Slack.

## Asynchronous communication

Working across timezones and different schedules can be challenging. It helps to organize information so it is easy to find later. Important information should live in places that are persistent and searchable.

Information should thus be stored in:
1. The handbook
1. GitHub issues
1. GitHub repositories
1. Google Drive (Docs, Sheets, and similar)

Do not store information in:
1. Slack
2. Figma

### Email

Use email for internal communication only when you need a written record. This is helpful for topics like compensation, underperformance, or other formal decisions where clarity and traceability matter. For everything else, use [Slack](#slack) so conversations stay quick, open, and easy to follow.

### Slack

Use threads in Slack whenever possible. Threads keep conversations organized and reduce the need to scroll through long channels.

Prefer public channels over direct messages. Public channels help everyone stay informed and make it easier for others to join or support the conversation.

Our recommended Slack (light) theme is:
`#F2F2F2,#FFC806,#779FA1,#FFFFFF,#F0D36C,#111111,#2AB052,#FD0B00,#AA4444,#FFFFFF`

#### Recommended channels

You will not automatically join every Slack channel when you start. Below are some helpful channels you may want to join depending on your interests and work.

- `#announcements` for company-wide announcements.
- `#feature-demos` for product updates. Everyone should stay aware of product changes, no matter their role.
- `#ops-metrics` for sales and engagement metrics.
- `#virtual-coffee` to join the coffee call rotation.
- `#gh-handbook` to follow updates to the handbook.
- `#thanks` for sharing appreciation with teammates. Expressing thanks often is especially important in remote teams to help maintain a positive culture.

#### Channel name structure

We use a simple naming structure in Slack to make channels easier to find and understand. These prefixes help show the purpose of each channel.

|Type | Slack prefix | Purpose |
|:--- |:--- |:---|
| Department           | `#dept-` | Conversations for each company department |
| Project based work   | `#proj-` | Work related to a project with a clear end point |
| GitHub notifications | `#gh-`   | Automated updates from our GitHub repositories |
| Ops notifications    | `#ops-`  | Alerts and notifications from operations tools |

We recommend organizing these channels into [custom Slack sections](https://slack.com/help/articles/360043207674-Organize-your-sidebar-with-custom-sections) for easier navigation.

We also have channels for specific groups, such as `#people-managers` for managers and `#us-hr` for HR topics specific to US team members.

When you create a new channel, add a clear description. This helps everyone browse channels and decide which ones are relevant to their work.

### GitHub

All code at FlowFuse is stored in Git, and GitHub hosts our repositories. All changes, feature ideas, and requests are tracked there. GitHub also holds task lists for onboarding, [art requests](../design/art-requests.md), and other work that is not code related. It is important to stay up to date with GitHub and its notifications.

You can use the following views to keep track of items that need your attention:
- [Pull requests that mention you](https://github.com/pulls/mentioned)
- [Issues that mention you](https://github.com/issues/mentioned)
- [Pull requests that need your review](https://github.com/pulls/review-requested)

Please respond to mentions and review requests within two business days.

### Standup meetings

Standup meetings are difficult to run across many timezones, so we use [Geekbot](https://geekbot.com/) to make standups async. Geekbot sends a prompt each workday at 9:00 in your local timezone when you are active in Slack. Everyone in the `#standup` channel will receive the prompt.

A good standup update reduces the need for status updates in live meetings. When writing your update, keep the following in mind:
1.	Connect your work to our broader goals. Explain what you plan to do today and how it supports the company’s priorities.
1.	Focus on clear, specific actions rather than vague updates. This helps with accountability and shared understanding.

Pro tips:
- If a question does not apply to you, enter `-` to skip.
- If you want to submit your update earlier in the day, message Geekbot with `report`.

Example standup messages: 
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
