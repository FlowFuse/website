---
title: Static File Service Navigation and Visibility
description: Navigate static files with better navigation and visibility selector
date: 2024-09-19 13:00:00.0
authors: ["serban-costin"]
tags:
    - changelog
---

Users of FlowFuse Cloud and self-hosted enterprise users can now make use of an enhanced navigation tool and visibility selector when using the static file service feature.

Starting with the v2.9.0 release self-hosted enterprise and FlowFuse Cloud Team tier users have the ability to set the visibility of their static files through a new navigation tool.

This update means that users can set the visibility of their uploaded files to public and make them accessible outside the node-red instance itself.

This capability enhances the current static file service which only made uploaded files accessible to the node-red instance 
itself while also allowing users to set a static path map on which the node-red instance will expose the files. 

Considerations:
- Visibility and static path maps can be set on folders only.
- Any change in visibility settings require an instance restart in order for the changes to take effect.
- URL's and file paths are copiable


![static-file-service-navigation-visibility](images/static-file-service-navigation-visibility/1-selector.png)
![static-file-service-navigation-visibility](images/static-file-service-navigation-visibility/2-select-static-path.png)
![static-file-service-navigation-visibility](images/static-file-service-navigation-visibility/3-public-visibility.png)

