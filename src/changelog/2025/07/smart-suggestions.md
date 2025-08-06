---
title: Smart Suggestions
description: Next Node Smart Suggestions to speed up flow development
date: 2025-07-31 13:00:00.0
authors: ['stephen-mclaughlin']
tags:
  - changelog
---

In conjunction with the release of Node-RED 4.1.0 and FlowFuse 2.20.0, we have added smart suggestions to the Editor.

When you drop a node onto the editor workspace, the upstream connected nodes in your flow are analysed and a next node suggestion is presented for quick insertion via the <kbd>TAB</kbd> key.
It presents up to 5 most common options which can be cycled through using <kbd>UP</kbd> and <kbd>DOWN</kbd>, so even if the first suggestion isn't correct, it's very likely that the correct choice is only a keyboard shortcut away.

To achieve this, we processed thousands of real working flows and built a decision tree model for the greatest accuracy possible.

### Let's see it in action

![Demo of smart suggestions](./images/smart-suggestion.gif){data-zoomable}
_Demo of smart suggestions_

We hope this new feature makes the process of writing flows for Node-RED flows in FlowFuse even easier.
