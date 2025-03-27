---
title: Local Login for Remote Instances
description: "Local Login option for Remote Instances, powered by Device Agent"
date: 2025-03-27 12:00:00.0  
authors: ["stephen-mclaughlin"]
tags:
  - changelog
---


We have introduced a new Local Login option for Remote Instances.

This feature allows you to enable or disable local login for you Remote Instance, which is particularly useful in air-gapped environments or times when the FlowFuse platform is unreachable.

When local login is enabled, users can log in to Node-RED locally using the specified credentials.

Please note that this feature is not the recommended method for accessing your Remote Instance. However, we acknowledge that some users may require this functionality for specific use cases.

You can configure this option in your Remote Instance Settings tab under the Security section.
![Screenshot of local login options](./images/device-agent-local-login-settings.png){data-zoomable}
_Screenshot of local login options_

Additionally, you can enable or disable local login for in the Device Agents YAML configuration file. For more information, refer to the (Node-RED Settings)[https://flowfuse.com/docs/device-agent/register/#node-red-settings] in our documentation.