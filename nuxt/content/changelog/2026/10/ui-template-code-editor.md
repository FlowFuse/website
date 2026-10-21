---
title: Vue and Vuetify Editing for Templates
description: The FlowFuse Dashboard ui-template editor now understands Vue and Vuetify, making templates faster to write.
date: 2026-10-21 12:00:00
release: "3.3"
authors: ["stephen-mclaughlin"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/node-red-dashboard/pull/2290
  - https://github.com/FlowFuse/node-red-dashboard/pull/2291
---

You can now write `ui-template` nodes with an editor that understands Vue and Vuetify. Start typing a component, a prop, or `this.` and the editor suggests what fits.

Previously, the editor treated a template as plain HTML. You kept the Vuetify docs open in another tab to look up prop names and values, and a typo in your script only showed up once the dashboard failed to render.

What's new:

- **Vuetify completions.** Type `<v-` to list every component. Inside a tag you get its props, events, and slots, plus the allowed values for props like `variant`.
- **Docs on hover.** Hover a prop to see its type, default, and a link to the Vuetify docs.
- **Vue syntax highlighting.** Directives, `:bindings`, `@events`, and `{{ }}` expressions are highlighted, along with `<script>` and `<style>` blocks.
- **`this` knows your component.** In `<script>`, `this.` suggests your data, computed values, and methods, then Dashboard's own `send()`, `msg`, and friends.
- **Errors before you deploy.** Mistakes in `<script>` and `<style>` are underlined as you type, and a template saved with errors is flagged in the workspace, just like a Function node.

<video autoplay loop muted playsinline aria-label="Writing a ui-template with Vue and Vuetify support in the code editor" style="border: 2px solid #E5E7EB;" width="1280" height="800" preload="none"><source src="/changelog/2026/10/images/ui-template-code-editor.webm" type="video/webm" /></video>

*Building a ui-template with help from the editor along the way.*

There's nothing to configure. Update Dashboard and it works in the default Monaco editor. Script and style checking needs Node-RED 5.0.9 or later. If you use the FlowFuse Expert, update it to v0.21.0 or later to keep its completions in the template editor.

This feature is available to all FlowFuse Dashboard users from v1.34.0, on FlowFuse Cloud and Self Hosted.
