---
title: Dashboards That Stay Connected
description: FlowFuse Dashboard now reconnects on its own after a network drop or server restart of any length, so always-on screens come back without anyone touching them.
date: 2026-09-24 12:00:00
release: "3.1"
authors: ["noley-holland"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/node-red-dashboard/issues/2203
  - https://github.com/FlowFuse/node-red-dashboard/issues/1344
  - https://github.com/FlowFuse/node-red-dashboard/issues/2149
  - https://github.com/FlowFuse/node-red-dashboard/issues/2074
  - https://github.com/FlowFuse/node-red-dashboard/issues/2068
  - https://github.com/FlowFuse/node-red-dashboard/issues/2135
---

A dashboard that loses its connection to Node-RED now comes back on its own, however long the outage lasts. You don't need to refresh it or walk over to the screen.

Previously, a dashboard retried for about five minutes and then reloaded the page. If the server was still down, the screen landed on a browser error page and stayed there. A ten-minute maintenance window meant someone had to visit every always-on display to bring it back.

What's new:

- **The dashboard keeps trying.** It retries until the server is back, then reconnects. It no longer reloads into a browser error page.
- **Screens stagger their retries.** Each client adds a small random delay to its retries, so 50 screens coming back after an outage don't hit the server at the same moment.
- **Waking a device reconnects right away.** When a backgrounded tab, tablet, or phone comes back to the foreground, the dashboard reconnects straight away instead of waiting for its next retry.
- **Expired sessions go to login.** Behind an authentication proxy, an expired session now takes you to the login page instead of showing "Connection Lost" for five minutes. This includes dashboards installed as an app (PWA), which could previously get stuck on a cached page. Installed dashboards still open from cache when offline.
- **Custom paths reload correctly.** If your dashboard doesn't live at `/dashboard` (a custom `httpNodeRoot` or dashboard path, say), a reload now returns to your dashboard instead of a 404.

There's nothing to configure. Update Dashboard and it works.

Your flows can also react when a screen connects or goes away. See [Track Client Presence in Your Flows](/changelog/2026/09/client-presence-events/).

Thanks to [@colinl](https://github.com/colinl), [@Saithej2k](https://github.com/Saithej2k), and [@pakerfeldt](https://github.com/pakerfeldt) for their contributions.

This feature is available to all FlowFuse Dashboard users from v1.32.0, wherever you run Node-RED.
