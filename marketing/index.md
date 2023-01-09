---
navTitle: Marketing & Communication
navGroup: Sales & Marketing
---

## Marketing & Communication 

### Websites

- All written content should be in UK English.
- All page titles should summarise the content, keep the URL length as short as practical and use [Kebab Case](https://en.wiktionary.org/wiki/kebab_case).
- All images should use informative [alt tags](https://www.w3.org/WAI/tutorials/images/tips/) which clearly describe the point of an image rather than all the details. Alt tags should be no longer than 60 characters.
- When mentioning [FlowForge Concepts](https://flowforge.com/docs/user/concepts/) (terminology) where possible we should link to an explanation of that concept.
- All written content should use the [Oxford Comma](https://en.wikipedia.org/wiki/Serial_comma). We believe the Oxford Comma reduces the ambiguity of written technical content.

### Blogging Process

When adding content to our blog we follow a similar process as when making changes to our other codebases, with a few minor changes. The process is as follows:

1. Raise an issue for the content in our private [Github repository](https://github.com/flowforge/content).
2. If the content is date specific create an 'all day' event on the Google Calendar [FlowForge Publishing Schedule](https://calendar.google.com/calendar/u/0?cid=Y18yMGFjMmM5MmMwYmE0YTYwNDg4NDE1MjBmMGU2YWE0MGFhZGUxNTlkNThjZGY0ZGMwMjA0NTI4ZjFjMTcxZmQ0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20), include a link to the issue in the event description. If you don't have the permission to create events please ask our Google Workspace admin to give you access.
3. If you want to work on the content immediately please triage the issue into our [development board](https://github.com/orgs/flowforge/projects/1/views/33).
4. Create a new branch of the website repository and then follow our standard [development processes](https://flowforge.com/handbook/development/#development-board).
5. It is OK for you to merge your own PR to main without review where the content is urgent or has been reviewed outside of Git but where it is practical to follow the [standard process](https://flowforge.com/handbook/development/#development-board) we encourage you to do so.

### Social Media, Marketing & Public Relations

It's important we understand what we communicate, to whom, how, and when. This sets out our principles for social media, marketing, and PR communications.

### Content Types

Content should be published to the appropriate channels, the types of published content we currently produce are as follows.

#### Release

Major releases of FlowForge, the timing of these releases are governed by our [development cadence](https://flowforge.com/handbook/development/#cadence).

#### Patch

Patch between releases, these will happen as needed and may be at short notice.

#### Planned Downtime

As soon as we are aware of planned downtime we should publish the information, that should be at least one week before the downtime.

#### Outage

If we experience unplanned downtime we should communicate in near real time to keep our users and stakeholders up to date with the situation.

#### Corporate Comms

Major company news such as investment rounds should be communicated at the time agreed with the relevant parties involved. We strive to make this information public as soon as practical and effective.

#### Newsletter

Monthly newsletter published at the start of each calendar month covering news from the prior month.

#### How To

Technical guides, published once per week.


### Content Channels

Each content type has channels which are appropriate, this table sets out which content should be posted on each channel.

|Content          |Blog  |Mailing List |Twitter  |Youtube  |LinkedIn |Reddit |Node-RED Slack|Node-RED Discorse |
|---              |---   |---          |---      |---      |---      |---    |---           |---               |
|Release          |*     |             |*        |*        |*        |*      |*             |*                 |
|Patch            |*     |             |*        |         |         |*      |*             |                  | 
|Planned Downtime |*     |             |*        |         |*        |*      |*             |                  |
|Outage           |      |             |         |         |         |       |              |                  |
|Corporate Comms  |*     |             |*        |         |*        |       |              |                  |
|Newsletter       |*     |*            |*        |         |*        |*      |*             |*                 |
|How To           |*     |             |*        |         |*        |*      |*             |*                 |

### Channel Content Guidance

#### Blog

Content should be eloquent and an appropriate length to communicate the message.

#### Mailing List

Content should be eloquent and an appropriate length to communicate the message.

#### Twitter

Keep it short, Tweets should be factual, informal and have a call to action (a link) where a user can read more.

#### Youtube

Videos should:

- Include opening and closing idents.
- Be clear in what they are communicating.
- Have an appropriate thumbnail.
- Have a call to action in the description.
- Be publicly listed.

#### LinkedIn

Posts should be framed in the context of FlowForge as an organisation and a team, don't get too technical. A relevant photo or image should be included in every post. Where the post is primarily of a video it should be embedded from Youtube. Where possible include the content in the post rather than linking out to external content.

#### Reddit

Keep it short, Reddit posts should be factual, informal and have a call to action (a link) where a user can read more. If the content is a video we should post that directly on Reddit as that should result in greater interaction.

#### Node-RED Slack (FlowForge section)

Keep it short, Slack messages should be factual, informal and have a call to action (a link) where a user can read more.

#### Discourse (Node-RED Forums)

Keep content short, posts to the Node-RED discord should be factual, informal and have a call to action (a link) where a user can read more.

### Blog CMS

When creating a blog post there are several headers which are used by the CMS to populate the blog article as well as the blog index page. The headers are as follows:

#### Title

The title of the page can be seen on both the blog index and the articles.

#### Subtitle

The subtitle is only shown on the articles.

#### Description

The description is unused currently

#### Date

The data can be seen on both the blog index and the articles.

#### Authors

The author can be seen on both the blog index and the articles.

#### More tag

The '\<\!\-\-more\-\-\>' tag is used to define the text shown in the blog index from each article.

#### Example header content

```
---
title: The title
subtitle: The subtitle
description: The description
date: 2022-12-20
authors: ["rob-marcer"]
---

above more
<!--more-->
below more
```

#### Example blog index item based on the header above

![Example of how the headers are shown on the blog index](../images/blog-index.png)

#### Example blog article based on the header above

![Example of how the headers are shown on blog articles](../images/blog-article.png)
