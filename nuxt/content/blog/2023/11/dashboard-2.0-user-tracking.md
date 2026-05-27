---
title: Tracking Who Has Opened a Dashboard
navTitle: Tracking Who Has Opened a Dashboard
---

As we continue to add features to the Node-RED Dashboard v2 one feature request that came in was to track which users had visited a Dashboard. Multi user support for the Dashboard is on the backlog but this could be solved with the parts that are currently available.

<!--more-->

## FlowFuse Authentication

One of the features we offer on FlowFuse is the ability to protect HTTP endpoints and Dashboards using the same FlowFuse user authentication that protects access to the FlowFuse Application and the Node-RED instances.

We even offer a specific RBAC 'viewer' role that just allows access to these endpoints but not the FlowFuse application.

FlowFuse authentication can be enabled from the Instance Settings page on the Security tab

This can be used to secure access to a Dashboard hosted in a Node-RED Instance. At the moment the Dashboard while protected by this authentication, it is not aware of which user is accessing it.

But if we include an element in the Dashboard loaded via a HTTP-in/HTTP-response node we gain access to details of the authenticated user.

## Implementation

First we will create a HTTP-in/HTTP-response pair to serve up a single pixel SVG image. I chose SVG as it doesn't require creating a binary image file to load.

The following flow snippet includes both the HTTP-in/HTTP-response nodes and a change node to set the `msg.payload` to the SVG content and to set the HTTP headers to include the correct mime type.

There is also a second change node which extracts the user information.



::render-flow
---
height: 200
flow: "W3siaWQiOiI3ZjIyZGM4MWQ4MTkyZDRkIiwidHlwZSI6Imh0dHAgaW4iLCJ6IjoiOThjOGQ3ZWE2NjE0OTI5MSIsIm5hbWUiOiIiLCJ1cmwiOiIvdHJhY2tlciIsIm1ldGhvZCI6ImdldCIsInVwbG9hZCI6ZmFsc2UsInN3YWdnZXJEb2MiOiIiLCJ4IjoyMTAsInkiOjQ2MCwid2lyZXMiOltbIjdkMzY3MzljMDJjZDA0ZWMiLCI1ZjQ2NDdjOTc5MTdjY2UxIl1dfSx7ImlkIjoiNThmZDMwNTE2YTA3N2UyOSIsInR5cGUiOiJodHRwIHJlc3BvbnNlIiwieiI6Ijk4YzhkN2VhNjYxNDkyOTEiLCJuYW1lIjoiIiwic3RhdHVzQ29kZSI6IiIsImhlYWRlcnMiOnt9LCJ4Ijo2MzAsInkiOjQ2MCwid2lyZXMiOltdfSx7ImlkIjoiN2QzNjczOWMwMmNkMDRlYyIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiOThjOGQ3ZWE2NjE0OTI5MSIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6Ijxzdmcgd2lkdGg9XCIxXCIgaGVpZ2h0PVwiMVwiPiA8cmVjdCB3aWR0aD1cIjFcIiBoZWlnaHQ9XCIxXCIgc3R5bGU9XCJmaWxsOnJnYigyNTUsMjU1LDI1NSk7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlOnJnYigwLDAsMClcIiAvPiBTb3JyeSwgeW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgaW5saW5lIFNWRy48L3N2Zz4iLCJ0b3QiOiJzdHIifSx7InQiOiJzZXQiLCJwIjoiaGVhZGVycyIsInB0IjoibXNnIiwidG8iOiJ7XCJDb250ZW50LVR5cGVcIjpcImltYWdlL3N2Zyt4bWxcIn0iLCJ0b3QiOiJqc29uIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjQyMCwieSI6NDYwLCJ3aXJlcyI6W1siNThmZDMwNTE2YTA3N2UyOSJdXX0seyJpZCI6IjVmNDY0N2M5NzkxN2NjZTEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6Ijk4YzhkN2VhNjYxNDkyOTEiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJyZXEuc2Vzc2lvbi51c2VyIiwidG90IjoibXNnIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjQyMCwieSI6NTIwLCJ3aXJlcyI6W1siZGRjMDJiNGU5YzMwYzgwNyJdXX0seyJpZCI6ImRkYzAyYjRlOWMzMGM4MDciLCJ0eXBlIjoiZGVidWciLCJ6IjoiOThjOGQ3ZWE2NjE0OTI5MSIsIm5hbWUiOiJkZWJ1ZyAyIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjYwMCwieSI6NTIwLCJ3aXJlcyI6W119XQ=="
---
::



Next we need to add the SVG to the Dashboard, this can be done by adding a Template node with the following HTML content.

```html
<div>
    <object data="/tracker" height="1" width="1"></object>
</div>
```

This will load the image every time the Dashboard page loads and hence trigger the earlier flow allowing the user to be logged.

## Linking to SSO Users

With the release of FlowFuse v1.14.0 the session object will also include the users email address which is the shared identifier between FlowFuse and the SSO system. This will allow the logging to use a single unified identifier.
