---
title: Hidden ENV Vars
summary: Users can now hide ENV var values in the UI when creating or editing them.
date: 2025-01-21 14:00:00.0
authors: ["serban-costin"]
tags:
  - changelog
---

We’ve expanded the functionality of managing Node-RED ENV vars by introducing a visibility property.

### What’s new?
This feature is supported by both hosted and remote Node-RED instances.
- Users can now designate ENV vars as hidden during creation or editing.
- Hidden ENV vars will have their values concealed in the UI for enhanced privacy.
- Once marked as hidden and saved:
    - The ENV var’s **name** cannot be changed.
    - The ENV var’s **value** can only be updated, not viewed.
- To make an ENV var public/visible again, users must delete the hidden variable and recreate it as a visible one.

This feature enhances security and allows for more control over sensitive configuration data, ensuring better management in your Node-RED workflows.

![Screenshot of the new hidden ENV vars feature - Hosted Instances](./images/hidden-env-var-instances.png){data-zoomable}
_Screenshot of the new hidden ENV vars feature - Hosted Instances_

![Screenshot of the new hidden ENV vars feature - Remote Instances](./images/hidden-env-var-devices.png){data-zoomable}
_Screenshot of the new hidden ENV vars feature - Remote Instances_

