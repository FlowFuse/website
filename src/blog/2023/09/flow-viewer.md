---
title: Share & Preview Flows on flows.nodered.org
subtitle: FlowFuse has just contributed an interactive "Flow Viewer" to flows.nodered.org, allowing users to preview flows, and embed them in articles & forum posts.
description: FlowFuse has just contributed an interactive "Flow Viewer" to flows.nodered.org, allowing users to preview flows, and embed them in articles & forum posts.
date: 2023-09-20
authors: ["joe-pavitt"]
image: "/blog/2023/09/images/tile-flowviewer.jpg"
tags:
    - posts
    - news
    - community
---

For years, Node-RED's website has provided functionality to share flows through [flows.nodered.org](https://flows.nodered.org)

This week, we at FlowFuse have contributed a new feature to the site that allows users to visually preview those flows, and embed/share those flows in articles and on forum posts.

<!--more-->

## Visual Flow Previews

A huge thank you for this work needs to go Gerrit Riessen's work published on his [Open Mind Map Blog](https://blog.openmindmap.org/). He recently open-sourced some great work to GitHub ([repo](https://github.com/gorenje/node-red-flowviewer-js)), and with some adaptation and collaboration, we've been able to utilise this as a foundation for the functionality we've added into the flows site.

Adding this to [flows.nodered.org](https://flows.nodered.org) will make it far easier to learn how others use Node-RED, and to share your own flows with others too. The embedding functionality should also make talking about Node-RED in your own articles & forums much easier.

### Example: Simple Flow

Here's a demonstration of a simple `Inject` > `Debug` node:

<iframe width="100%" height="200px" src="https://flows.nodered.org/flow/500ee13719e54e42493c8ec96fa733b6/share?height=100" allow="clipboard-read; clipboard-write" style="border: none;"></iframe>

### Example: Subflows, Groups, Links & Switches

Here's a non-functional flow that just demonstrates how FlowViewer renders the range of node types available in Node-RED:

<iframe width="100%" height="500px" src="https://flows.nodered.org/flow/82a8602b615740491d30c083e5292e5f/share" allow="clipboard-read; clipboard-write" style="border: none;"></iframe>

## Sharing & Embedding Flows

Any flow on [flows.nodered.org](https://flows.nodered.org) now has a `Share Flow` option in the `Actions` section on the right side of the flows page. Clicking this will provide you with an iframe like:

```html
<iframe width="100%" height="100%"
    src="https://flows.nodered.org/flow/7c2dd3ccde70746a40ef8f5aa58c591c/share"
    allow="clipboard-read; clipboard-write" style="border: none;"></iframe>
```

Which you can paste/embed into any website or blog post. Nick has also [enabled the Node-RED forums to support these embeds too](https://discourse.nodered.org/t/previewing-flows-on-the-flow-library/), and is also how we've embeded the above flows too.

If you want more control over the sizing of the viewer, you can also include a `?height=` query parameter on the `src` value of the `iframe`. You may also need to hardcode the `height` property of the `iframe` itself to account for this change, depending on where you're embedding it to. For example:

```html
<iframe width="100%" height="250px"
    src="https://flows.nodered.org/flow/7c2dd3ccde70746a40ef8f5aa58c591c/share?height=100"
    allow="clipboard-read; clipboard-write" style="border: none;"></iframe>
```

We know it's still not perfect, and there's plenty more we can do with it, but hopefully this is a welcome contribution to the Node-RED community.