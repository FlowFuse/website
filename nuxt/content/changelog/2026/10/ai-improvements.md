---
title: AI Improvements in FlowFuse
description: Tidy flows in one click, undo and redo through the Expert, let AI test its own changes, and rate Expert answers.
date: 2026-10-22 12:00:00
release: "3.2"
authors: ["serban-costin", "andrea-palmieri", "stephen-mclaughlin"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/nr-assistant/pull/426
  - https://github.com/FlowFuse/nr-assistant/pull/433
  - https://github.com/FlowFuse/nr-assistant/pull/434
  - https://github.com/FlowFuse/nr-assistant/pull/438
  - https://github.com/FlowFuse/nr-assistant/pull/440
  - https://github.com/FlowFuse/nr-assistant/pull/441
  - https://github.com/FlowFuse/flowfuse/pull/8987
---

## Tidy flows

Select some nodes, or nothing to take the whole tab, and choose **Layout Flows** from the FlowFuse Expert menu, or press `alt-shift-l`. The nodes are arranged into clean left-to-right columns that follow the wires, with groups kept together and multi-output nodes keeping their output order.

Each flow keeps its first node where it is and other nodes move out of the way to make room. Flows wider than 1600px wrap onto new rows. Both can be changed in the dialog, and the whole layout is a single undo step.

The Expert uses the same layout when it builds flows for you, so new nodes land tidy instead of stacked.

<video autoplay loop muted playsinline aria-label="A messy Node-RED flow tidied into clean columns with Layout Flows" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/10/images/ai-improvements-layout-flows.webm" type="video/webm" /></video>

*Tidying a tab with Layout Flows.*

## Undo and redo with the Expert

Ask the Expert to undo a change and it does, even several steps back. It reads the editor's change history first, so it knows which steps were its own and which were yours, and tells you what it reverted. Changed your mind? Ask it to redo.

<video autoplay loop muted playsinline aria-label="Asking the FlowFuse Expert to undo the nodes it just added in the Node-RED editor, then redo them" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/10/images/ai-improvements-undo-redo.webm" type="video/webm" /></video>

*Undoing and redoing a change through the Expert.*

## Let AI test its own changes

Until now, flow changes made by AI waited for you to click **Deploy**, and checking that they worked was up to you. With **AI Flow Deploy and Inject** on, the FlowFuse Expert and third-party agents deploy the changes they make, inject a test message into any node with an input, and read the Debug sidebar to check the result. They fix what is wrong and try again, without you in the loop for every step.

Injected messages run the real flow, so downstream nodes act on them as usual. Turn it on for a team in **Team Settings**, once **AI Features** is enabled.

<video autoplay loop muted playsinline aria-label="Turning on AI Flow Deploy and Inject, then the FlowFuse Expert adds a function node, deploys it, injects a test message and reads the debug output" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/10/images/ai-improvements-deploy-inject.webm" type="video/webm" /></video>

*Turning on AI Flow Deploy and Inject, then letting the Expert test its own change.*

## Rate Expert answers

Every Expert answer now has a thumbs up and a thumbs down. Add a comment if you like, and choose whether to include the conversation so we can see exactly what happened. Prefer not to say more? Select **Skip** and your vote still counts. This is on FlowFuse Cloud.

<video autoplay loop muted playsinline aria-label="Rating a FlowFuse Expert answer with a thumbs up and a short comment" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/10/images/ai-improvements-rate-answers.webm" type="video/webm" /></video>

*Rating an Expert answer.*

## Smarter code suggestions

We have updated the AI model behind the editor suggestions. In Function and `ui-template` nodes, a suggestion now starts where your line stops and ends where your code carries on, without repeating brackets, tags or indentation that are already there. Ask for JSON in plain English and you get the data back indented and ready to use.

## Vue and Vuetify in ui-template

The `ui-template` editor now understands Vue and Vuetify, and Expert suggestions work there too. See [Vue and Vuetify Editing for Templates](/changelog/2026/10/ui-template-code-editor) for the details.

<video autoplay loop muted playsinline aria-label="Writing a ui-template with Vuetify completions, prop values, this members and an AI suggestion" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/10/images/ui-template-code-editor.webm" type="video/webm" /></video>

*Writing a ui-template with Vue and Vuetify support.*

---

These features are available on FlowFuse Cloud now and in FlowFuse v3.2 for Self Hosted, except answer rating, which is Cloud only.

- _All features need `@flowfuse/nr-assistant` v0.21.0 or later. Update it in the Palette Manager._
- _Vue and Vuetify support needs Dashboard v1.34.0 or later and Node-RED v5.0.9 or later._
