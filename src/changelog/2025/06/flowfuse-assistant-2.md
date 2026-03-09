---
title: FlowFuse Expert just got smarter
description: "Understand what your teams flows are doing with the power of AI"
date: 2025-06-30 12:00:00.0  
authors: ['stephen-mclaughlin']
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/nr-assistant/pull/44
---

Following on from the recent improvements we made earlier this month, we have added even more goodness to the FlowFuse Expert:

We have: 
- Added a menu for quick access to the new features
- Improved the look and feel of the Flow Explainer
- Added a codelens to assist you creating HTML, VUE, Vuetify & CSS in FlowFuse Node-RED Dashboard templates

And there more to come in the next week - stay tuned!

#### New Menu

![Screenshot of the new Assistant Menu](./images/assistant-new-menu.png){data-zoomable}
_Screenshot of the new Assistant Menu_

#### Flow Explainer updated look & feel

![Animated GIF showing the Flow Explainer Updated Layout](./images/assistant-0-3-0-flow-explainer.gif){data-zoomable}
_Animated GIF showing the Flow Explainer Updated Layout_


#### New Codelens for building ui-templates

![Animated GIF showing the Assistant building HTML & VUE template code](./images/assistant-0-3-0-ui-template-vue.gif){data-zoomable}
_Animated GIF showing the Assistant building HTML & VUE template code_

![Animated GIF showing the Assistant building CSS styles](./images/assistant-0-3-0-ui-template-css.gif){data-zoomable}
_Animated GIF showing the Assistant building CSS styles_



#### Updating the Assistant
If you are running Node-RED v4.x, head over to the Palette Manager, update the plugin and restart your instance.

![Updating assistant on Node-RED 4](./images/assistant-0-3-0-update-nr4.png){data-zoomable}
_Screenshot of Updating the Assistant for a Node-RED 4 instance_

If you are still running Node-RED v3.x we strogly recommend you update your stack to use Node-RED v4.x but you can
still manually update the plugin by adding `@flowfuse/nr-assistant` to the instance settings then restart it.

![Updating assistant on Node-RED 3](./images/assistant-update-nr3.png){data-zoomable}
_Screenshot of Updating Assistant for a Node-RED 3 instance_
