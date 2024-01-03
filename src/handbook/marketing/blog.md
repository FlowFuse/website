---
meta:
    title: Marketing - Blog
---

# Blog

## Blogging Process

Content creation and blogging are an effective way to communicate with our community. The process for publishing a blog is as follows:

1. Raise an issue for the content in our private [Github repository](https://github.com/FlowFuse/customer){rel="nofollow"}.
2. If the content is date specific create an 'all day' event on the Google Calendar [FlowFuse Publishing Schedule](https://calendar.google.com/calendar/u/0?cid=Y18yMGFjMmM5MmMwYmE0YTYwNDg4NDE1MjBmMGU2YWE0MGFhZGUxNTlkNThjZGY0ZGMwMjA0NTI4ZjFjMTcxZmQ0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20){rel="nofollow"}, include a link to the issue in the event description. If you don't have the permission to create events please ask our Google Workspace admin to give you access.
3. If you want to work on the content immediately please triage the issue into our [development board](https://github.com/orgs/FlowFuse/projects/1/views/33).
4. Create the draft blog post in a Google Doc. The document should be stored in the [Marketing -> Content](https://drive.google.com/drive/folders/1sdyVfD29dFE74i7zfmL0Cp9tPmPyK0-8?usp=share_link){rel="nofollow"} folder. Everyone at FlowFuse should be given access to comment on the document.  Add a link to the document in the GitHub issue.
5. Ask people to review the document draft by sharing it directly with them using the Share button in the document. This will send your reviewers an email notification. 
6. As a document reviewer, you should leave red-line edits in the document or add comments to the document.
7. Once the document is finished, create a new branch of the website repository and then follow our standard [development processes](/handbook/development/releases/planning/#development-board). Google Docs has an [extension to convert the document to markdown](https://workspace.google.com/marketplace/app/docs_to_markdown/700168918607?hl=en&pann=docs_addon_widget).
5. It is OK for you to merge your own PR to main without review where the content is urgent or has been reviewed outside of Git but where it is practical to follow the
[standard process](/handbook/development/releases/planning/#development-board) we encourage you to do so.

## Blog CMS

When creating a blog post there are several headers which are used by the CMS to populate the blog article as well as the blog index page. e.g:


```njk
---
title: The title
subtitle: The subtitle
description: The description
date: 2022-12-20
authors: ["rob-marcer"]
tags:
    - posts
    - node-red
    - how-to
---

above more
<!--more-->
below more
```

### Title

The title of the page can be seen on both the blog index and the articles.

### Subtitle

The subtitle is only shown on the articles.

### Description

Provides the (OpenGraph) description used when sharing a post on social media. Also used on the `/blog` page for past articles.

### Date

The data can be seen on both the blog index and the articles.

### Authors

The author can be seen on both the blog index and the articles.

### Tags

Tag your content appropriately from the collection of tags that help us manage our blog content. They are:

- `node-red`
- `flowfuse`
- `how-to`
- `dashboard`
- `community`
- `releases`
- `news`

### More tag

The '\<\!\-\-more\-\-\>' tag is used to define the text shown in the blog index from each article.

### Example blog index item based on the header above

![Example of how the headers are shown on the blog index](../images/blog-index.png)

### Example blog article based on the header above

![Example of how the headers are shown on blog articles](../images/blog-article.png)

### Writing content

FlowFuse blog posts are written in markdown. To learn how to style content and
have a nice markup for your content, please read the [markdown guide](/handbook/company/guides/markdown/)
