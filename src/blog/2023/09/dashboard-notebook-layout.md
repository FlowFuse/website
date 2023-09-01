---
title: Writing Notebooks with Dashboard 2.0
subtitle: With a new "Notebook" layout available, here we deepdive into how the Markdown, Template & other widgets can be used to build an interactive Notebook
description: With a new "Notebook" layout available, here we deepdive into how the Markdown, Template & other widgets can be used to build an interactive Notebook
date: 2023-09-01
authors: ["joe-pavitt"]
image: "/blog/2023/08/images/Dashboard Community Update-Aug23.jpg"
tags:
    - posts
    - releases
    - community
---

Whilst we're still busy backporting through the existing Dashboard 1.0 features, we did want to highlight something new we've built in Dashboard 2.0. 

In our v0.3.1 release, we've introduced a new "Notebook" layout. 

This layout is designed to allow users to create Dashboards structured like a Notebook (most often seen with the likes of [Jupyter Notebooks](https://jupyter.org/) or [ObservableHQ](https://observablehq.com/)).

Here we will deepdive into the Notebook layout, and show how, alongside our new **Markdown Node** ([docs](https://flowforge.github.io/flowforge-nr-dashboard/nodes/widgets/ui-markdown.html)) and others, it's becoming easier to create dynamic and interactive Dashboards.

_Note: If you're not familiar with Markdown, it's a simple markup language that allows you to format text. You can learn more about it [here](https://www.markdownguide.org/cheat-sheet/)._

## Dashboard Hierarchy

Each Dashboard is structured accordingly:

- **Widget**: An individual functional block, e.g. button, chart, slider
- **Group**: A collection of widgets that render together
- **Page**: A single page/tab in your Dashboard. Each page can have it's own Layout, in this case we'll use "Notebook"
- **UI**: Contains a collection of pages, deployed from Node-RED, provides the basic side navigation to switch between Pages.

## Building a Notebook

To get started, drop on your first widget (in this case, we'll add a `ui-markdown`). This in turn will prompt us to create our first Group/Page/Dashboard which we can name & configure accordingly.

Let's add the following Markdown to our first widget:

```md
# Markdown Content

Here we can render dynamic Markdown content that is
easily _styled_.
```

Whilst this shows a basic example of static content, the joy of `ui-markdown` in Dashboard is _dynamic_ content, i.e. content that can be updated by passing in messages to the `ui-markdown` node.

Let's add an `inject` node, set it up to repeat every 1s, and wire it to `ui-markdown`. Now, we can update our Markdown content to show this value, which will update every 1s:

```md
We can inject `msg.payload`. For example, here is a
timestamp updating every second: {{ msg.payload }}
```

Resulting in:

![Dynamic markdown with an updating timestamp every 1 second](./images/md-timestamp.gif)


## Join Our Team

If you'd like to be paid to directly contribute to Dashboard 2.0, we are hiring for a 2-3 month position to do just that:

- [Contract Front-End Engineer – Node-RED Dashboard](https://boards.greenhouse.io/flowfuse/jobs/4911532004)
