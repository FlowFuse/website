---
title: "How to Build Industrial Apps With FlowFuse AI Expert"
subtitle: "A practical guide to prompting, context, and iteration"
description: "FlowFuse Expert now builds applications from a description. Here's what it sees, how to prompt it well, and how to iterate without backtracking."
date: 2026-05-12
keywords:
authors: ["sumit-shinde"]
image: /blog/2026/05/images/flowfuse-ai-expert-tile.png
video: DR9OTIVtBLU
tags:
- flowfuse
cta:
    type: contact
    title: Try FlowFuse Expert on your team
    description: Available in soft launch on FlowFuse Cloud. Reach out to get it enabled.
---

FlowFuse Expert now builds applications for you. Describe what you need, and the flow shows up on the canvas, wired and configured. Ask for a change, it updates on the spot. No dragging, no wiring, no hunting through the palette.

We shared the initial announcement in the [2.30 release post](/blog/2026/05/flowfuse-release-2-30/#expert-application-building). This post expands on that introduction by covering how Expert interprets your environment, techniques for writing clearer prompts, and ways to iterate on generated flows to get closer to your intended outcome.

![FlowFuse Expert building a simulated packaging conveyor monitoring application](./images/expert-application-building.gif)
_Expert building a packaging conveyor monitoring application — MQTT alerts, dashboard indicators, and real-time event simulation, from a single prompt._

## What FlowFuse Expert sees before it builds

Before the first node lands on the canvas, Expert reads your environment:

- **Your canvas state**: the nodes you've placed, how they connect, what they do.
- **Your available nodes**: which nodes are installed and at what version.
- **Your infrastructure**: the databases, APIs, MQTT brokers, and services you've connected.
- **Specific configurations**: MQTT topics, SQL queries, API endpoints, auth schemes, and UI settings.
- **Your debug context**: when you attach it from the debug sidebar, Expert sees the `msg` data, errors, and values flowing through each node. It reasons about runtime behavior, not just wiring.

This is why Expert doesn't suggest impossible things. It won't reference nodes you don't have installed, and it won't rebuild work you've already done. It builds on what's already there.

## Try it in two minutes

Open the editor, find the FlowFuse Expert chat, and paste this:

*"Build me an overview dashboard for three machines (Machine 1, Machine 2, Machine 3). Use an inject node set to repeat every 4 seconds to trigger a function node that randomly assigns each machine one of three states: Running, Idle, or Fault. Display each machine on a dashboard page as a ui-template card showing the machine name, current state, and a colored circle indicator: green for Running, yellow for Idle, red for Fault."*

A few seconds later the flow is on the canvas, wired up. Hit Deploy, open the dashboard, and the cards start cycling through Running, Idle, and Fault.

You didn't go hunting through the palette or keep the documentation open in another tab. The flow just showed up.

From there, you can replace simulated data with live machine data, redesign the dashboard, add alarms, connect MQTT or OPC UA sources, and keep refining the application through prompts instead of manual building.

<lite-youtube
  videoid=""
  style="width: 1024px; overflow: hidden; background-image: url('/blog/2026/05/images/flowfuse-expert-video-thumbnail.jpg'); background-size: cover; background-position: center;"
  title="Building Industrial Apps With FlowFuse Expert">
</lite-youtube>

That prompt builds on the first try because it's specific. The next section is about why specificity matters, and what else changes the quality of what Expert produces.

## How to prompt FlowFuse Expert well

Expert builds what you describe. The clearer you are, the less you'll fix later.

### Spell out what you want

Tell Expert exactly what you're after. Intervals, logic, colors, names. Anything you've already decided, put it in the prompt. The conveyor example works on the first try because it doesn't leave anything to interpretation.

If you just say *"build me a machine dashboard"*, Expert has to guess at all of it. And if you call them "the machines" instead of giving them names, the names won't line up between your nodes, your topics, and your dashboard a few prompts later.

### Show Expert the data when something's off

If a card's blank or a value's wrong, don't ask Expert to figure it out from the wiring. Open the debug sidebar, [attach the context](/docs/user/expert/chat/#debug-context), and now Expert can see what's actually flowing through. The empty payload, the error, whatever. Guessing turns into reading.

### One change per prompt

Build it in pieces. Get the data flowing. Then bind the dashboard. Then add alerts. Check each piece before moving on.

If you ask for four things in one prompt and something breaks, good luck figuring out which one. Slower in the moment, faster overall.

### Read the flow before you deploy

Before you hit Deploy, look at what Expert built. Open the function and read it. Glance at the topics. Make sure no random nodes ended up in there. A half-minute now is cheaper than catching it at runtime and prompting your way back.

### Start over when it gets messy

Long chats get tangled. If Expert keeps making the same mistake or referencing stuff that's not on the canvas anymore, just start a new chat. Tell it what's there now, tell it what you want next. Way easier than digging out of a bad thread.

## Where to go next

For the full reference on what FlowFuse Expert reads, how it interacts with your canvas, and advanced usage, see the [FlowFuse Expert documentation](/docs/user/expert/).

FlowFuse Expert is in **soft launch** on FlowFuse Cloud. To enable it for your team, [contact us](/contact-us/). If you don't have a FlowFuse account, [sign up]({% include "sign-up-url.njk" %}) first.
