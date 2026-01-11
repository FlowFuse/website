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
| Customer discussion  | `#cust-` | Discuss deals and continued adoption for customers |

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

Standup meetings are difficult to run across many time zones, so we run standups asynchronously using [Geekbot](https://geekbot.com/). Geekbot sends a prompt each workday at 9:00 in your local time, or when you first become active in Slack after that time.

Previously, all standups were posted in a single #standup channel. That channel is now archived, and standups live in departmental channels (Sales, Marketing, BizOps, and Engineering, which currently includes Product).

This keeps signal-to-noise healthy as we grow and ensures updates are shared where the most relevant stakeholders can easily find them, without scrolling through standups from other teams.

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

We hold an optional team catchup every Monday. This meeting is a chance to share company updates, get to know each other, and talk about anything you want to share, both professionally and personally.

You can add simple items to the agenda, such as what you did over the weekend or anything that kept you busy. Adding items also helps set the order of conversation and makes sure everyone has space to speak.

#### Strategy Call

The Strategy Call brings team leadership together each week to check in and discuss important topics. We spend the first 5-10 minutes reviewing [key metrics](./strategy/#kpi). The rest of the agenda changes based on current priorities.

This call takes place on Tuesdays.

## 1:1 meetings

Each employee at FlowFuse has regular one-on-one meetings with their manager. For individual contributors, 1:1s should happen at least once a month. Depending on role, tenure, and current needs, a biweekly (every two weeks) or weekly cadence may be more appropriate and should be agreed upon by the manager and direct report.

The direct report owns the agenda. Use this time to talk about anything that helps you succeed, such as personal updates, challenges, feedback, or decisions you need support with.

Keep your agenda in a shared Google Doc. Both you and your manager should add items as they come to mind, instead of waiting until the day before. During the meeting, you can walk through the topics in whatever order is most useful.

A 1:1 should not turn into a status update meeting. Share status updates in GitHub issues, standups, or other async channels. Use your 1:1 to get alignment, talk through difficulties, or brainstorm solutions.

When preparing your agenda, you can reflect on questions like:
- What went well in the last few weeks?
- What did not go well?
- Which problems were difficult, and what would have made them easier?
- What important but not urgent tasks need attention?
- How did you receive feedback, and did that approach work for you?
- Where do you want to improve, and do you want help creating a plan?

Include an “Action Items” section in your agenda to track follow-up tasks from the meeting. Add timelines when they are helpful.

## Skip level meetings

Skip level meetings give team members a chance to speak directly with their manager's manager. These meetings help you stay connected to broader strategy and give space to share feedback based on your own experience.

The frequency of skip level meetings depends on your needs, but a good guideline is once every 6 to 8 weeks. As FlowFuse grows, these meetings may happen less often.
