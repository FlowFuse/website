---
title: "Working with Dates and Times in Node-RED"
description: "Learn how to handle dates and times in Node-RED without coding. Master timestamps, formatting, timezones, calculations, and time-based automation with visual nodes."
---

# {{meta.title}}

Working with dates and times comes up constantly in Node-RED. Whether you're logging events, scheduling tasks, checking business hours, displaying the current time, or pulling historical data, it all relies on handling timestamps correctly. The best part is that you can manage all of this using visual nodes, without writing any code.

This documentation walks you through everything you need to know about working with dates and times in Node-RED. You'll learn how to generate timestamps, format them for display, work with different timezones, and perform time-based calculations.

## Getting the Current Time in Node-RED

The most straightforward way to get the current time is with the **inject** node or **change** node.

### Using Inject and Change Nodes

Both the **inject** node and **change** node can generate timestamps. Use **inject** when you want to trigger a flow with a timestamp, and use **change** when you need to add a timestamp to a message that's already flowing through.

#### Basic Timestamp Options (Step-by-Step):

1.  Open an **inject** or **change** node configuration window.
2.  Locate the dropdown menu next to `msg.payload`.
3.  Select **timestamp**. This setting gives you the current time as milliseconds since the epoch (e.g., `1702310400000`).
4.  To see other formats, click the small arrow on the right side to expand more options:

    - **milliseconds since epoch** - A number representing the timestamp (`1702310400000`)
    - **YYYY-MM-DDTHH:mm:ss.sssZ** - An ISO 8601 string (`"2024-12-11T15:45:30.000Z"`)
    - **JavaScript Date object** - Shows as `[object Object]` in the debug panel

> **Tip:** For most work, use **milliseconds since epoch**. It's the simplest format and works everywhere.

#### Using JSONata:

Both inject and change nodes support JSONata expressions, which gives you more control:

  - `$millis()` - Gets the current timestamp (Unix Epoch in milliseconds)
  - `$now()` - Gets the current time as an ISO string
  - `$moment()` - Gets a date object using the Moment library

In the inject/change node, select **JSONata expression** from the payload type dropdown, then enter your expression.

This JSONata approach works identically in both nodes—use whichever fits your flow better.



::render-flow
---
height: 200
flow: "W3siaWQiOiI5MzQxY2VjMWExZjllNTBlIiwidHlwZSI6Imdyb3VwIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJuYW1lIjoiR2V0dGluZyB0aGUgQ3VycmVudCBUaW1lIGluIE5vZGUtUkVEIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI4OWNiMzBhZmI3ZmVjNDUxIiwiNTE5MzdiZWYwNjdmNTI1NyIsIjU0N2VjNGI5ZDZhMzg5YzkiXSwieCI6MTA4LCJ5Ijo3MywidyI6ODA0LCJoIjo2OTR9LHsiaWQiOiI4OWNiMzBhZmI3ZmVjNDUxIiwidHlwZSI6Imdyb3VwIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiOTM0MWNlYzFhMWY5ZTUwZSIsIm5hbWUiOiJVc2luZyBDaGFuZ2Ugbm9kZSAoIEpTT05hdGEgICkiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbImI1YmRmZDFiMmEzYjljMjciLCI0NDRkMTdjMzJiOGJkMWMxIiwiMjc2ZTBmY2Y2MDdjOTQ0ZCIsIjA3ZmJjODNmODk1YjdhYTQiLCJhYzhlNWUyOGE4OTZmNTJjIiwiOGQ0MTQzZmI4MzYxYzQ2OSIsImFmZjUyOGM2NGI5NTY4YWQiXSwieCI6MTM0LCJ5Ijo1MzksInciOjc1MiwiaCI6MjAyfSx7ImlkIjoiYjViZGZkMWIyYTNiOWMyNyIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI4OWNiMzBhZmI3ZmVjNDUxIiwibmFtZSI6IkluamVjdCIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyMzAsInkiOjY0MCwid2lyZXMiOltbIjQ0NGQxN2MzMmI4YmQxYzEiLCIyNzZlMGZjZjYwN2M5NDRkIiwiMDdmYmM4M2Y4OTViN2FhNCJdXX0seyJpZCI6IjQ0NGQxN2MzMmI4YmQxYzEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiODljYjMwYWZiN2ZlYzQ1MSIsIm5hbWUiOiJtaWxsaXNlY29uZHMgc2luY2UgZXBvY2giLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IiRtaWxsaXMoKSIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NDkwLCJ5Ijo1ODAsIndpcmVzIjpbWyJhYzhlNWUyOGE4OTZmNTJjIl1dfSx7ImlkIjoiMjc2ZTBmY2Y2MDdjOTQ0ZCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI4OWNiMzBhZmI3ZmVjNDUxIiwibmFtZSI6IllZWVktTU0tRERUSEg6bW06c3Muc3NzWiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiJG5vdygpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1MjAsInkiOjY0MCwid2lyZXMiOltbIjhkNDE0M2ZiODM2MWM0NjkiXV19LHsiaWQiOiIwN2ZiYzgzZjg5NWI3YWE0IiwidHlwZSI6ImNoYW5nZSIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6Ijg5Y2IzMGFmYjdmZWM0NTEiLCJuYW1lIjoiSmF2YVNjcmlwdCBEYXRlIG9iamVjdCIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiJG1vbWVudCgpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo0OTAsInkiOjcwMCwid2lyZXMiOltbImFmZjUyOGM2NGI5NTY4YWQiXV19LHsiaWQiOiJhYzhlNWUyOGE4OTZmNTJjIiwidHlwZSI6ImRlYnVnIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiODljYjMwYWZiN2ZlYzQ1MSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzgwLCJ5Ijo1ODAsIndpcmVzIjpbXX0seyJpZCI6IjhkNDE0M2ZiODM2MWM0NjkiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI4OWNiMzBhZmI3ZmVjNDUxIiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3ODAsInkiOjY0MCwid2lyZXMiOltdfSx7ImlkIjoiYWZmNTI4YzY0Yjk1NjhhZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6Ijg5Y2IzMGFmYjdmZWM0NTEiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6NzAwLCJ3aXJlcyI6W119LHsiaWQiOiI1MTkzN2JlZjA2N2Y1MjU3IiwidHlwZSI6Imdyb3VwIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiOTM0MWNlYzFhMWY5ZTUwZSIsIm5hbWUiOiJVc2luZyBDaGFuZ2Ugbm9kZSAoIFRpbWVzdGFtcCBvcHRpb24gKSIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiMzc1ZDE0M2Q0ODY5NWQzNyIsIjcyZmNiYTgxNWZhNWNmZGQiLCI0ZTUwZTBhMmU0MzZiNjU4IiwiZDQxYWE2MWI0NTZiZDNhMSIsImY1YmVjOTUxMWJjOGY3N2YiLCI5ZDNmYjdiODlhZGFmYThkIiwiN2U2MGZiMjI0ZTRmZjc0NyJdLCJ4IjoxMzQsInkiOjMxOSwidyI6NzUyLCJoIjoyMDJ9LHsiaWQiOiIzNzVkMTQzZDQ4Njk1ZDM3IiwidHlwZSI6ImluamVjdCIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjUxOTM3YmVmMDY3ZjUyNTciLCJuYW1lIjoiSW5qZWN0IiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjIzMCwieSI6NDIwLCJ3aXJlcyI6W1siNzJmY2JhODE1ZmE1Y2ZkZCIsIjRlNTBlMGEyZTQzNmI2NTgiLCJkNDFhYTYxYjQ1NmJkM2ExIl1dfSx7ImlkIjoiNzJmY2JhODE1ZmE1Y2ZkZCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI1MTkzN2JlZjA2N2Y1MjU3IiwibmFtZSI6Im1pbGxpc2Vjb25kcyBzaW5jZSBlcG9jaCIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiIiwidG90IjoiZGF0ZSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo0OTAsInkiOjM2MCwid2lyZXMiOltbImY1YmVjOTUxMWJjOGY3N2YiXV19LHsiaWQiOiI0ZTUwZTBhMmU0MzZiNjU4IiwidHlwZSI6ImNoYW5nZSIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjUxOTM3YmVmMDY3ZjUyNTciLCJuYW1lIjoiWVlZWS1NTS1ERFRISDptbTpzcy5zc3NaIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJpc28iLCJ0b3QiOiJkYXRlIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjUyMCwieSI6NDIwLCJ3aXJlcyI6W1siOWQzZmI3Yjg5YWRhZmE4ZCJdXX0seyJpZCI6ImQ0MWFhNjFiNDU2YmQzYTEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiNTE5MzdiZWYwNjdmNTI1NyIsIm5hbWUiOiJKYXZhU2NyaXB0IERhdGUgb2JqZWN0IiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJvYmplY3QiLCJ0b3QiOiJkYXRlIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjQ5MCwieSI6NDgwLCJ3aXJlcyI6W1siN2U2MGZiMjI0ZTRmZjc0NyJdXX0seyJpZCI6ImY1YmVjOTUxMWJjOGY3N2YiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI1MTkzN2JlZjA2N2Y1MjU3IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3ODAsInkiOjM2MCwid2lyZXMiOltdfSx7ImlkIjoiOWQzZmI3Yjg5YWRhZmE4ZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjUxOTM3YmVmMDY3ZjUyNTciLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6NDIwLCJ3aXJlcyI6W119LHsiaWQiOiI3ZTYwZmIyMjRlNGZmNzQ3IiwidHlwZSI6ImRlYnVnIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiNTE5MzdiZWYwNjdmNTI1NyIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzgwLCJ5Ijo0ODAsIndpcmVzIjpbXX0seyJpZCI6IjU0N2VjNGI5ZDZhMzg5YzkiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI5MzQxY2VjMWExZjllNTBlIiwibmFtZSI6IlVzaW5nIEluamVjdCBOb2RlcyAoIFRpbWVzdGFtcCBPcHRpb24gKSIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiNDk5YWI1ODE1MzdmNTU5OCIsImI5YmQ0ZmRjMmY0MjRjYmYiLCJiOTY5ZGI5MjMxOTM1NWYzIiwiY2NjOTY5Y2QxZWQ4NWVkYSIsImFiMTc4ZTRlMzEwOWY5YjAiLCJjZGIwY2ZkODc5ODQ2NDIwIl0sIngiOjEzNCwieSI6OTksInciOjc1MiwiaCI6MjAyfSx7ImlkIjoiNDk5YWI1ODE1MzdmNTU5OCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI1NDdlYzRiOWQ2YTM4OWM5IiwibmFtZSI6Im1pbGxpc2Vjb25kcyBzaW5jZSBlcG9jaCIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MzEwLCJ5IjoxNDAsIndpcmVzIjpbWyJiOWJkNGZkYzJmNDI0Y2JmIl1dfSx7ImlkIjoiYjliZDRmZGMyZjQyNGNiZiIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjU0N2VjNGI5ZDZhMzg5YzkiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6MTQwLCJ3aXJlcyI6W119LHsiaWQiOiJiOTY5ZGI5MjMxOTM1NWYzIiwidHlwZSI6ImluamVjdCIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjU0N2VjNGI5ZDZhMzg5YzkiLCJuYW1lIjoiWVlZWS1NTS1ERFRISDptbTpzcy5zc3NaIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJpc28iLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjozNDAsInkiOjIwMCwid2lyZXMiOltbImNjYzk2OWNkMWVkODVlZGEiXV19LHsiaWQiOiJjY2M5NjljZDFlZDg1ZWRhIiwidHlwZSI6ImRlYnVnIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiNTQ3ZWM0YjlkNmEzODljOSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzgwLCJ5IjoyMDAsIndpcmVzIjpbXX0seyJpZCI6ImFiMTc4ZTRlMzEwOWY5YjAiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiNTQ3ZWM0YjlkNmEzODljOSIsIm5hbWUiOiJKYXZhU2NyaXB0IERhdGUgb2JqZWN0IiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJvYmplY3QiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjozMDAsInkiOjI2MCwid2lyZXMiOltbImNkYjBjZmQ4Nzk4NDY0MjAiXV19LHsiaWQiOiJjZGIwY2ZkODc5ODQ2NDIwIiwidHlwZSI6ImRlYnVnIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiNTQ3ZWM0YjlkNmEzODljOSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzgwLCJ5IjoyNjAsIndpcmVzIjpbXX1d"
---
::



> For more advanced date/time operations and formatting, see the [JSONata documentation](https://docs.jsonata.org/date-time-functions).

## Formatting Dates for Display

Raw timestamps like `1702310400000` or ISO strings like `2024-12-11T15:45:30.000Z` work great for machines, but people need something readable: "December 11, 2024" or "3:45 PM" or "5 minutes ago."

Node-RED gives you two excellent options: the moment nodes for heavy lifting, and JSONata for quick, built-in one-offs.

### The Moment Nodes

The Moment node handles formatting, timezones, relative time, and date math. It is built on the popular **Moment.js** library.

#### Installation

1.  Click the menu in the top-right corner (the three horizontal lines).
2.  Select **Manage palette** from the dropdown.
3.  Open the **Install** tab.
4.  Search for `node-red-contrib-moment`.
5.  Click **Install** next to the package.

Once installed, you’ll see two new nodes in the palette: **Date/Time Formatter** and **Humanizer**. For this documentation, we’ll be using the **Date/Time Formatter** node.

#### Your First Format

1.  Drag a **Date/Time Formatter** node onto the canvas and double-click to open its configuration.
2.  Look at the three key fields: **Input** (where your date lives, usually `msg.payload`), **Output Format** (your pattern), and **Output** (where the result goes, usually `msg.payload`).
3.  Type this into the **Format** field: `MMMM D, YYYY`.
4.  Connect an inject node (set to timestamp) to the **Date/Time Formatter** node, then connect the **Date/Time Formatter** node to a debug node.
5.  Click the inject button.

The debug panel will show something like `"December 11, 2024"`.

#### Format Patterns

The letters in your format string are placeholders that get replaced with parts of the date. You can mix them however you want.

| Category | Code | Example (Dec 11, 2024 at 3:45 PM) | Description |
| :--- | :--- | :--- | :--- |
| **Years** | `YYYY` | 2024 | Full year |
| | `YY` | 24 | Two-digit year |
| **Months** | `MMMM` | December | Full month name |
| | `MMM` | Dec | Short month name |
| | `MM` | 12 | Month number (leading zero) |
| **Days** | `DD` | 11 | Day of month (leading zero) |
| | `D` | 11 | Day of month (no leading zero) |
| | `dddd` | Wednesday | Full day name |
| **Time** | `HH` | 15 | 24-hour clock (leading zero) |
| | `hh` | 03 | 12-hour clock (leading zero) |
| | `mm` | 45 | Minutes (leading zero) |
| | `A` | PM | AM/PM marker (uppercase) |

**Common Patterns:**

  - `YYYY-MM-DD` → 2024-12-11 (Good for logs and databases)
  - `MMMM D, YYYY` → December 11, 2024 (Formal style)
  - `h:mm A` → 3:45 PM (Standard time)
  - `HH:mm:ss` → 15:45:30 (24-hour time)

#### Adding Custom Text

You can include literal text in your format by wrapping it in square brackets. The text inside the brackets will appear exactly as you wrote it.

```
MMMM D, YYYY [at] h:mm A
```

This gives you something like **"December 11, 2024 at 3:45 PM"**.

More examples:

  - `[Last updated:] MMM D [at] h:mm A` → Last updated: Dec 11 at 3:45 PM

#### Relative Time

Sometimes you want to show how long ago something happened instead of the exact time. If you want **"5 minutes ago"** instead of a specific time, put this in the **Output Format** field:

```
fromNow
```

The **Date/Time Formatter** node will calculate the time difference and give you results like:

  - "a few seconds ago"
  - "5 minutes ago"
  - "3 days ago"

This works really well for activity feeds, notifications, or any "last updated" display.

### JSONata Formatting

If you don't want to add another node to your flow, you can use JSONata instead. It's already built into the **change** node, so you don't need to install anything.

1.  Open a **change** node and set it to modify `msg.payload`.
2.  In the "to" dropdown, pick **JSONata expression**.
3.  Use JSONata's date functions to format your timestamp.

Basic syntax for a timestamp in `msg.payload`:

```
$fromMillis(payload, '[M]/[D]/[Y]')
```

This takes the timestamp in `msg.payload` and converts it to **"12/11/2024"**.

#### JSONata Codes

JSONata uses square brackets, but the codes are different from the **Date/Time Formatter** node.

  - `[Y]` or `[Y0001]` → 2024 (Year)
  - `[M]` or `[M01]` → 12 (Month; use [M01] to force a leading zero)
  - `[D]` or `[D01]` → 11 (Day of month; use [D01] to force a leading zero)
  - `[h]` or `[h01]` → 3 (12-hour)
  - `[m01]` → 45 (Minutes, with leading zero for 0–9)
  - `[P]` → AM or PM

**Common Patterns:**

  - `$fromMillis(payload, '[M]/[D]/[Y]')` → 12/11/2024
  - `$fromMillis(payload, '[h]:[m01] [P]')` → 3:45 PM



::render-flow
---
height: 200
flow: "W3siaWQiOiIxZThhMTExMGQzNmQzZjMzIiwidHlwZSI6Imdyb3VwIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJuYW1lIjoiRm9ybWF0dGluZyBEYXRlcyBmb3IgRGlzcGxheSIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiZjAxOWMyZjVlZDlkODEwNCIsIjE2OTk1NzcxNTAxNjdlYjUiXSwieCI6MTA4LCJ5Ijo3OTMsInciOjgwNCwiaCI6NDE0fSx7ImlkIjoiZjAxOWMyZjVlZDlkODEwNCIsInR5cGUiOiJncm91cCIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjFlOGExMTEwZDM2ZDNmMzMiLCJuYW1lIjoiVGhlIE1vbWVudCBOb2RlcyIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiYmQwNjU2NTc2NTE0MTg2OCIsIjg5OGIyM2ZhNTFmOTVlZGYiLCJmNzM0ZDllODk3OWIyMGIyIiwiZjNhM2E1YTk5NzQ4MTZkMyIsIjJkZTk1MzAwZWUwNzAyNzYiLCJkNWYzZDhhZWFhZWZmYTdkIiwiYjcxM2IxOTZiNDhjNjJkMyJdLCJ4IjoxMzQsInkiOjgxOSwidyI6NzUyLCJoIjoyMDJ9LHsiaWQiOiJiZDA2NTY1NzY1MTQxODY4IiwidHlwZSI6Im1vbWVudCIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6ImYwMTljMmY1ZWQ5ZDgxMDQiLCJuYW1lIjoiTU1NTSBELCBZWVlZIiwidG9waWMiOiIiLCJpbnB1dCI6InBheWxvYWQiLCJpbnB1dFR5cGUiOiJtc2ciLCJpblR6IjoiQWZyaWNhL0FiaWRqYW4iLCJhZGpBbW91bnQiOjAsImFkalR5cGUiOiJkYXlzIiwiYWRqRGlyIjoiYWRkIiwiZm9ybWF0IjoiTU1NTSBELCBZWVlZIiwibG9jYWxlIjoiZW4tVVMiLCJvdXRwdXQiOiJwYXlsb2FkIiwib3V0cHV0VHlwZSI6Im1zZyIsIm91dFR6IjoiQWZyaWNhL0FiaWRqYW4iLCJ4Ijo0NjAsInkiOjg2MCwid2lyZXMiOltbIjg5OGIyM2ZhNTFmOTVlZGYiXV19LHsiaWQiOiI4OThiMjNmYTUxZjk1ZWRmIiwidHlwZSI6ImRlYnVnIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiZjAxOWMyZjVlZDlkODEwNCIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzgwLCJ5Ijo4NjAsIndpcmVzIjpbXX0seyJpZCI6ImY3MzRkOWU4OTc5YjIwYjIiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiZjAxOWMyZjVlZDlkODEwNCIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjI1MCwieSI6OTIwLCJ3aXJlcyI6W1siZjNhM2E1YTk5NzQ4MTZkMyIsImQ1ZjNkOGFlYWFlZmZhN2QiLCJiZDA2NTY1NzY1MTQxODY4Il1dfSx7ImlkIjoiZjNhM2E1YTk5NzQ4MTZkMyIsInR5cGUiOiJtb21lbnQiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiJmMDE5YzJmNWVkOWQ4MTA0IiwibmFtZSI6Ik1NTU0gRCwgWVlZWSBbYXRdIGg6bW0gQSIsInRvcGljIjoiIiwiaW5wdXQiOiJwYXlsb2FkIiwiaW5wdXRUeXBlIjoibXNnIiwiaW5UeiI6IkFmcmljYS9BYmlkamFuIiwiYWRqQW1vdW50IjowLCJhZGpUeXBlIjoiZGF5cyIsImFkakRpciI6ImFkZCIsImZvcm1hdCI6Ik1NTU0gRCwgWVlZWSBbYXRdIGg6bW0gQSIsImxvY2FsZSI6ImVuLVVTIiwib3V0cHV0IjoicGF5bG9hZCIsIm91dHB1dFR5cGUiOiJtc2ciLCJvdXRUeiI6IkFmcmljYS9BYmlkamFuIiwieCI6NTEwLCJ5Ijo5MjAsIndpcmVzIjpbWyIyZGU5NTMwMGVlMDcwMjc2Il1dfSx7ImlkIjoiMmRlOTUzMDBlZTA3MDI3NiIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6ImYwMTljMmY1ZWQ5ZDgxMDQiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6OTIwLCJ3aXJlcyI6W119LHsiaWQiOiJkNWYzZDhhZWFhZWZmYTdkIiwidHlwZSI6Im1vbWVudCIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6ImYwMTljMmY1ZWQ5ZDgxMDQiLCJuYW1lIjoiZnJvbU5vdyIsInRvcGljIjoiIiwiaW5wdXQiOiJwYXlsb2FkIiwiaW5wdXRUeXBlIjoibXNnIiwiaW5UeiI6IkFmcmljYS9BYmlkamFuIiwiYWRqQW1vdW50IjowLCJhZGpUeXBlIjoiZGF5cyIsImFkakRpciI6ImFkZCIsImZvcm1hdCI6ImZyb21Ob3ciLCJsb2NhbGUiOiJlbi1VUyIsIm91dHB1dCI6InBheWxvYWQiLCJvdXRwdXRUeXBlIjoibXNnIiwib3V0VHoiOiJBZnJpY2EvQWJpZGphbiIsIngiOjQzMCwieSI6OTgwLCJ3aXJlcyI6W1siYjcxM2IxOTZiNDhjNjJkMyJdXX0seyJpZCI6ImI3MTNiMTk2YjQ4YzYyZDMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiJmMDE5YzJmNWVkOWQ4MTA0IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3ODAsInkiOjk4MCwid2lyZXMiOltdfSx7ImlkIjoiMTY5OTU3NzE1MDE2N2ViNSIsInR5cGUiOiJncm91cCIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjFlOGExMTEwZDM2ZDNmMzMiLCJuYW1lIjoiSlNPTmF0YSBGb3JtYXR0aW5nIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI2NzhmMTNhOWZhZDljMzk3IiwiY2Y4MTBjYmQzMDFmZGRiMCIsIjk0NDNjYjMzZWE0MmUyNWIiLCIyNTViMTM1MDMyODYyODE2IiwiMmQzYjlhZWU4YjBlYmU1YiJdLCJ4IjoxMzQsInkiOjEwMzksInciOjc1MiwiaCI6MTQyfSx7ImlkIjoiNjc4ZjEzYTlmYWQ5YzM5NyIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiIxNjk5NTc3MTUwMTY3ZWI1IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MjUwLCJ5IjoxMTIwLCJ3aXJlcyI6W1siY2Y4MTBjYmQzMDFmZGRiMCIsIjJkM2I5YWVlOGIwZWJlNWIiXV19LHsiaWQiOiJjZjgxMGNiZDMwMWZkZGIwIiwidHlwZSI6ImNoYW5nZSIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjE2OTk1NzcxNTAxNjdlYjUiLCJuYW1lIjoiJGZyb21NaWxsaXMocGF5bG9hZCwgJ1tNXS9bRF0vW1ldJykiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IiRmcm9tTWlsbGlzKHBheWxvYWQsICdbTV0vW0RdL1tZXScpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1MjAsInkiOjEwODAsIndpcmVzIjpbWyI5NDQzY2IzM2VhNDJlMjViIl1dfSx7ImlkIjoiOTQ0M2NiMzNlYTQyZTI1YiIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjE2OTk1NzcxNTAxNjdlYjUiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6MTA4MCwid2lyZXMiOltdfSx7ImlkIjoiMjU1YjEzNTAzMjg2MjgxNiIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjE2OTk1NzcxNTAxNjdlYjUiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6MTE0MCwid2lyZXMiOltdfSx7ImlkIjoiMmQzYjlhZWU4YjBlYmU1YiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiIxNjk5NTc3MTUwMTY3ZWI1IiwibmFtZSI6IiRmcm9tTWlsbGlzKHBheWxvYWQsICdbaF06W20wMV0gW1BdJykiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IiRmcm9tTWlsbGlzKHBheWxvYWQsICdbaF06W20wMV0gW1BdJykiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjUzMCwieSI6MTE0MCwid2lyZXMiOltbIjI1NWIxMzUwMzI4NjI4MTYiXV19LHsiaWQiOiI1ZTk3YTg2MjEzYjkwNmJmIiwidHlwZSI6Imdsb2JhbC1jb25maWciLCJlbnYiOltdLCJtb2R1bGVzIjp7Im5vZGUtcmVkLWNvbnRyaWItbW9tZW50IjoiNS4wLjAifX1d"
---
::



## Handling Time Zones

When you're working inside Node-RED, the timezone for any operation follows the system timezone of the machine running Node-RED. If your server is in New York, timestamps will show Eastern time. If it's in London, you'll see GMT/BST.

But what if you need to display times in a different timezone? The **Date/Time Formatter** node handles all of this.

### Converting to a Different Timezone

Open your **Date/Time Formatter** node and you'll see two timezone fields:

  - **Input Timezone** - The timezone your timestamp is currently in.
  - **Output Timezone** - The timezone you want to convert to.

Type in the timezone you want—like `America/New_York` or `Asia/Tokyo`.

#### Finding Timezone Names:

The **Date/Time Formatter** node uses the IANA timezone database. These are names like:

  - `America/New_York` (Eastern time)
  - `Europe/London` (GMT/BST)
  - `Asia/Tokyo` (Japan time)

You can find the complete list at [wikipedia.org/wiki/List\_of\_tz\_database\_time\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

### Working Example

Let's display the current time in three different timezones:

1.  Add an **Inject** node (set to timestamp).
2.  Add three **Date/Time Formatter** nodes after it.
3.  Set a common **Output Format** in all three: `MMMM D, YYYY h:mm A z`
4.  Set the **Output Timezone** in each:
      - First node: `America/New_York`
      - Second node: `Europe/London`
      - Third node: `Asia/Tokyo`
5.  Connect a **debug** node to each **Date/Time Formatter** node.

When you click **Inject**, you’ll see the formatted time in three different timezones.

### JSONata Timezone Handling

JSONata can also handle timezones by providing the offset in the third parameter of `$fromMillis()`:

```
$fromMillis(payload, '[M]/[D]/[Y] [h]:[m01] [P]', '-0500')
```

The offset is a string like `-0500` (5 hours behind UTC). This works, but you have to know the offset and manage daylight saving time yourself. The **Date/Time Formatter** node handles all of that automatically.



::render-flow
---
height: 200
flow: "W3siaWQiOiI4OTRmYjlkM2RkZmExNGQ3IiwidHlwZSI6Imdyb3VwIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJuYW1lIjoiSGFuZGxpbmcgVGltZSBab25lcyIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiNGQ3MzViMWY3MWY3OTE4OSIsIjBjMzFiYjk3NWQxNjYxMjgiXSwieCI6MTA4LCJ5IjoxMjMzLCJ3Ijo4MDQsImgiOjQ3NH0seyJpZCI6IjRkNzM1YjFmNzFmNzkxODkiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI4OTRmYjlkM2RkZmExNGQ3IiwibmFtZSI6IkNvbnZlcnRpbmcgdG8gYSBEaWZmZXJlbnQgVGltZXpvbmUgVXNpbmcgTW9tZW50IG5vZGVzIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI5OTVjZjA1NDhhYzY2YWYxIiwiOTYzZGIxZDgzOGMxYTM0ZCIsImZhZWZkMjVlMjY4ZjY4ZTkiLCI5MjU5ZWJmZDEzN2ExNmIwIiwiMzJmMmI4MjllN2E2ZGU4NCIsIjZhNGEyNzI0MDFkNDVlNjEiLCI0OGJmMzkyN2UxNzU5MDRjIl0sIngiOjEzNCwieSI6MTI1OSwidyI6NzUyLCJoIjoyMDJ9LHsiaWQiOiI5OTVjZjA1NDhhYzY2YWYxIiwidHlwZSI6ImluamVjdCIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjRkNzM1YjFmNzFmNzkxODkiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjoyNTAsInkiOjEzNjAsIndpcmVzIjpbWyI5NjNkYjFkODM4YzFhMzRkIiwiNmE0YTI3MjQwMWQ0NWU2MSIsIjQ4YmYzOTI3ZTE3NTkwNGMiXV19LHsiaWQiOiI5NjNkYjFkODM4YzFhMzRkIiwidHlwZSI6Im1vbWVudCIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjRkNzM1YjFmNzFmNzkxODkiLCJuYW1lIjoiQW1lcmljYS9OZXdfWW9yayIsInRvcGljIjoiIiwiaW5wdXQiOiJwYXlsb2FkIiwiaW5wdXRUeXBlIjoibXNnIiwiaW5UeiI6IkFmcmljYS9BYmlkamFuIiwiYWRqQW1vdW50IjowLCJhZGpUeXBlIjoiZGF5cyIsImFkakRpciI6ImFkZCIsImZvcm1hdCI6Ik1NTU0gRCwgWVlZWSBoOm1tIEEgeiIsImxvY2FsZSI6ImVuLVVTIiwib3V0cHV0IjoicGF5bG9hZCIsIm91dHB1dFR5cGUiOiJtc2ciLCJvdXRUeiI6IkFtZXJpY2EvTmV3X1lvcmsiLCJ4Ijo0NzAsInkiOjEzMDAsIndpcmVzIjpbWyJmYWVmZDI1ZTI2OGY2OGU5Il1dfSx7ImlkIjoiZmFlZmQyNWUyNjhmNjhlOSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjRkNzM1YjFmNzFmNzkxODkiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6MTMwMCwid2lyZXMiOltdfSx7ImlkIjoiOTI1OWViZmQxMzdhMTZiMCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjRkNzM1YjFmNzFmNzkxODkiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6MTM2MCwid2lyZXMiOltdfSx7ImlkIjoiMzJmMmI4MjllN2E2ZGU4NCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjRkNzM1YjFmNzFmNzkxODkiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6MTQyMCwid2lyZXMiOltdfSx7ImlkIjoiNmE0YTI3MjQwMWQ0NWU2MSIsInR5cGUiOiJtb21lbnQiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI0ZDczNWIxZjcxZjc5MTg5IiwibmFtZSI6IkV1cm9wZS9Mb25kb24iLCJ0b3BpYyI6IiIsImlucHV0IjoicGF5bG9hZCIsImlucHV0VHlwZSI6Im1zZyIsImluVHoiOiJBZnJpY2EvQWJpZGphbiIsImFkakFtb3VudCI6MCwiYWRqVHlwZSI6ImRheXMiLCJhZGpEaXIiOiJhZGQiLCJmb3JtYXQiOiJNTU1NIEQsIFlZWVkgaDptbSBBIHoiLCJsb2NhbGUiOiJlbi1VUyIsIm91dHB1dCI6InBheWxvYWQiLCJvdXRwdXRUeXBlIjoibXNnIiwib3V0VHoiOiJFdXJvcGUvTG9uZG9uIiwieCI6NDYwLCJ5IjoxMzYwLCJ3aXJlcyI6W1siOTI1OWViZmQxMzdhMTZiMCJdXX0seyJpZCI6IjQ4YmYzOTI3ZTE3NTkwNGMiLCJ0eXBlIjoibW9tZW50IiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiNGQ3MzViMWY3MWY3OTE4OSIsIm5hbWUiOiJBc2lhL1Rva3lvIiwidG9waWMiOiIiLCJpbnB1dCI6InBheWxvYWQiLCJpbnB1dFR5cGUiOiJtc2ciLCJpblR6IjoiQWZyaWNhL0FiaWRqYW4iLCJhZGpBbW91bnQiOjAsImFkalR5cGUiOiJkYXlzIiwiYWRqRGlyIjoiYWRkIiwiZm9ybWF0IjoiTU1NTSBELCBZWVlZIGg6bW0gQSB6IiwibG9jYWxlIjoiZW4tVVMiLCJvdXRwdXQiOiJwYXlsb2FkIiwib3V0cHV0VHlwZSI6Im1zZyIsIm91dFR6IjoiQXNpYS9Ub2t5byIsIngiOjQ0MCwieSI6MTQyMCwid2lyZXMiOltbIjMyZjJiODI5ZTdhNmRlODQiXV19LHsiaWQiOiIwYzMxYmI5NzVkMTY2MTI4IiwidHlwZSI6Imdyb3VwIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiODk0ZmI5ZDNkZGZhMTRkNyIsIm5hbWUiOiJDb252ZXJ0aW5nIHRvIGEgRGlmZmVyZW50IFRpbWV6b25lIFVzaW5nIEpTT05hdGEiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbImVlNzgyMmYyNGEyNzkyY2IiLCIwYTAwNmM5ZTg3NjU2Y2ZjIiwiMzExMjJiNzIyN2RiOGNlNyIsImM2MmM3ZTdiM2I0NTBlODUiLCI2ZGZkZTk4M2M3Njg5NGMzIiwiNzRlMzdhN2NjMjA4MDIzOCIsImYwYzc4NmU2ZGIzMGZmYWQiXSwieCI6MTM0LCJ5IjoxNDc5LCJ3Ijo3NTIsImgiOjIwMn0seyJpZCI6ImVlNzgyMmYyNGEyNzkyY2IiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiMGMzMWJiOTc1ZDE2NjEyOCIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjI1MCwieSI6MTU4MCwid2lyZXMiOltbIjZkZmRlOTgzYzc2ODk0YzMiLCI3NGUzN2E3Y2MyMDgwMjM4IiwiZjBjNzg2ZTZkYjMwZmZhZCJdXX0seyJpZCI6IjBhMDA2YzllODc2NTZjZmMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiIwYzMxYmI5NzVkMTY2MTI4IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3ODAsInkiOjE1MjAsIndpcmVzIjpbXX0seyJpZCI6IjMxMTIyYjcyMjdkYjhjZTciLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiIwYzMxYmI5NzVkMTY2MTI4IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3ODAsInkiOjE1ODAsIndpcmVzIjpbXX0seyJpZCI6ImM2MmM3ZTdiM2I0NTBlODUiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiIwYzMxYmI5NzVkMTY2MTI4IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3ODAsInkiOjE2NDAsIndpcmVzIjpbXX0seyJpZCI6IjZkZmRlOTgzYzc2ODk0YzMiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiMGMzMWJiOTc1ZDE2NjEyOCIsIm5hbWUiOiJBbWVyaWNhL05ld19Zb3JrICggV2ludGVyICkiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IiRmcm9tTWlsbGlzKHBheWxvYWQsICdbTV0vW0RdL1tZXSBbaF06W20wMV0gW1BdJywgJy0wNTAwJykiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjUxMCwieSI6MTUyMCwid2lyZXMiOltbIjBhMDA2YzllODc2NTZjZmMiXV19LHsiaWQiOiI3NGUzN2E3Y2MyMDgwMjM4IiwidHlwZSI6ImNoYW5nZSIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjBjMzFiYjk3NWQxNjYxMjgiLCJuYW1lIjoiRXVyb3BlL0xvbmRvbiAoIFdpbnRlciApIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiIkZnJvbU1pbGxpcyhwYXlsb2FkLCAnW01dL1tEXS9bWV0gW2hdOlttMDFdIFtQXScsICcrMDAwMCcpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo0OTAsInkiOjE1ODAsIndpcmVzIjpbWyIzMTEyMmI3MjI3ZGI4Y2U3Il1dfSx7ImlkIjoiZjBjNzg2ZTZkYjMwZmZhZCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiIwYzMxYmI5NzVkMTY2MTI4IiwibmFtZSI6IkFzaWEvVG9reW8gKCBXaW50ZXIgKSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiJGZyb21NaWxsaXMocGF5bG9hZCwgJ1tNXS9bRF0vW1ldIFtoXTpbbTAxXSBbUF0nLCAnKzA5MDAnKSIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NDgwLCJ5IjoxNjQwLCJ3aXJlcyI6W1siYzYyYzdlN2IzYjQ1MGU4NSJdXX0seyJpZCI6ImRjYjI4MDZiZGQwOTkxNzMiLCJ0eXBlIjoiZ2xvYmFsLWNvbmZpZyIsImVudiI6W10sIm1vZHVsZXMiOnsibm9kZS1yZWQtY29udHJpYi1tb21lbnQiOiI1LjAuMCJ9fV0="
---
::



## Doing Math with Dates

You'll need date calculations for things like historical dashboards showing the last 7 days of data or checking how many days until a deadline.

### Adding and Subtracting Time

Open the **Date/Time Formatter** node and you'll see the **Adjustment** field. This lets you modify the incoming date by a specific unit of time.

  - On the left, there's a dropdown for `+` or `-`.
  - On the right, there's a dropdown with units: **days, hours, minutes, weeks, months, years,** etc.

#### Adjustment Examples:

| Goal | Operation | Value | Unit |
| :--- | :--- | :--- | :--- |
| **Tomorrow** | `+` | 1 | days |
| **Yesterday** | `-` | 1 | days |
| **2 hours ago** | `-` | 2 | hours |
| **Next week** | `+` | 7 | days |

**How to Set it Up:**

1.  Drag an **Inject** node onto the workspace (set payload to **timestamp**).
2.  Connect a **Date/Time Formatter** node and double-click to open it.
3.  Configure your desired adjustment (e.g., `+ 1 days`).
4.  Set the **Output Format** field, maybe to `YYYY-MM-DD`.
5.  Connect the Formatter to a **Debug** node and Deploy the flow.

Hit the Inject button to see the adjusted date.

There’s a lot more you can do with the Moment node, including advanced formatting options and additional date/time transformations. For more information, read the node’s [README documentation](https://flows.nodered.org/node/node-red-contrib-moment).

### Calculating Time Differences

Sometimes you need to know the duration between two timestamps. The moment node doesn't directly calculate differences, so for this, you'll want to use a **Change** node with JSONata.

JSONata can calculate differences with simple subtraction, as timestamps are in milliseconds.

#### JSONata Difference Formula

The basic formula is to subtract the earlier timestamp from the later one, then divide to convert the result into your desired unit.

| Unit | Division Value (ms) | Example Formula |
| :--- | :--- | :--- |
| **Seconds** | `1000` | `(ts1 - ts2) / 1000` |
| **Minutes** | `60000` | `(ts1 - ts2) / 60000` |
| **Hours** | `3600000` | `(ts1 - ts2) / 3600000` |
| **Days** | `86400000` | `(ts1 - ts2) / 86400000` |

#### Working Example (Difference in Days)

This example calculates the difference between a timestamp seven days ago and the current time (7 days).

1.  Drag an **Inject** node onto the workspace (set payload to **timestamp**).

2.  Drag a **Change** node and connect it. Use this node to set up our two reference times (`msg.start_time` and `msg.end_time`).

      - **Rule 1:**
          - **Action:** `Move`
          - **From:** `msg.payload`
          - **To:** `msg.end_time`
      - **Rule 2:**
          - **Action:** `Set`
          - **Property:** `msg.start_time`
          - **To:** `JSONata expression`
          - **Expression:** `msg.end_time - (7 * 86400000)` (This calculates a timestamp exactly 7 days earlier).

3.  Drag a second **Change** node and connect it. This node performs the final calculation.

      - **Action:** `Set`
      - **Property:** `msg.days_difference`
      - **To:** `JSONata expression`
      - **Expression:**

        ```
        (msg.end_time - msg.start_time) / 86400000
        ```

4.  Connect this second Change node to a **Debug** node and **Deploy** the flow.

Hit the **Inject** button. The **Debug** tab will show the number of days difference (**7**).



::render-flow
---
height: 200
flow: "W3siaWQiOiI0OGI0OGRlYTVhZWYwNzAxIiwidHlwZSI6Imdyb3VwIiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJuYW1lIjoiRG9pbmcgTWF0aCB3aXRoIERhdGVzIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyJhMjEzNzc2NmE2N2ZhZjY3IiwiYmIzNzAxNjI1MjBlOTVkNyJdLCJ4IjoxMDgsInkiOjE3MzMsInciOjk2NCwiaCI6MjU0fSx7ImlkIjoiYTIxMzc3NjZhNjdmYWY2NyIsInR5cGUiOiJncm91cCIsInoiOiJkNzEwMWYzYTRkNDVkZWVkIiwiZyI6IjQ4YjQ4ZGVhNWFlZjA3MDEiLCJuYW1lIjoiVXNpbmcgTW9tZW50IG5vZGVzIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyJhYTcxNzExMTYwYjFiNTQ1IiwiZjc2ZTA1NTU3ZjgwNzU2MiIsImJmZDMzYjg3OGZlZmU4NTIiXSwieCI6MTM0LCJ5IjoxNzU5LCJ3Ijo5MTIsImgiOjgyfSx7ImlkIjoiYWE3MTcxMTE2MGIxYjU0NSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiJhMjEzNzc2NmE2N2ZhZjY3IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MjUwLCJ5IjoxODAwLCJ3aXJlcyI6W1siZjc2ZTA1NTU3ZjgwNzU2MiJdXX0seyJpZCI6ImY3NmUwNTU1N2Y4MDc1NjIiLCJ0eXBlIjoibW9tZW50IiwieiI6ImQ3MTAxZjNhNGQ0NWRlZWQiLCJnIjoiYTIxMzc3NjZhNjdmYWY2NyIsIm5hbWUiOiIrIDEgZGF5cyIsInRvcGljIjoiIiwiaW5wdXQiOiJwYXlsb2FkIiwiaW5wdXRUeXBlIjoibXNnIiwiaW5UeiI6IkFmcmljYS9BYmlkamFuIiwiYWRqQW1vdW50IjoiMSIsImFkalR5cGUiOiJkYXlzIiwiYWRqRGlyIjoiYWRkIiwiZm9ybWF0IjoiWVlZWS1NTS1ERCIsImxvY2FsZSI6ImVuLVVTIiwib3V0cHV0IjoicGF5bG9hZCIsIm91dHB1dFR5cGUiOiJtc2ciLCJvdXRUeiI6IkFmcmljYS9BYmlkamFuIiwieCI6NDMwLCJ5IjoxODAwLCJ3aXJlcyI6W1siYmZkMzNiODc4ZmVmZTg1MiJdXX0seyJpZCI6ImJmZDMzYjg3OGZlZmU4NTIiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiJhMjEzNzc2NmE2N2ZhZjY3IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5NDAsInkiOjE4MDAsIndpcmVzIjpbXX0seyJpZCI6ImJiMzcwMTYyNTIwZTk1ZDciLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiI0OGI0OGRlYTVhZWYwNzAxIiwibmFtZSI6IlVzaW5nIEpTT05hdGEiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbIjU1MWIyNmYxYmZkYTJkODgiLCI0ODgxZmZhZmViNWRhNjRjIiwiODJjMDM3MDEyOGExZjgwZCIsIjI5ZjYzMmE1YzY4ZWNjNTUiXSwieCI6MTM0LCJ5IjoxODc5LCJ3Ijo5MTIsImgiOjgyfSx7ImlkIjoiNTUxYjI2ZjFiZmRhMmQ4OCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiJiYjM3MDE2MjUyMGU5NWQ3IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MjUwLCJ5IjoxOTIwLCJ3aXJlcyI6W1siODJjMDM3MDEyOGExZjgwZCJdXX0seyJpZCI6IjQ4ODFmZmFmZWI1ZGE2NGMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiJiYjM3MDE2MjUyMGU5NWQ3IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImRheXNfZGlmZmVyZW5jZSIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjk0MCwieSI6MTkyMCwid2lyZXMiOltdfSx7ImlkIjoiODJjMDM3MDEyOGExZjgwZCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiJiYjM3MDE2MjUyMGU5NWQ3IiwibmFtZSI6IlNldCBTdGFydCBhbmQgRW5kIFRpbWUiLCJydWxlcyI6W3sidCI6Im1vdmUiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJlbmRfdGltZSIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJzdGFydF90aW1lIiwicHQiOiJtc2ciLCJ0byI6Im1zZy5lbmRfdGltZSAtICg3ICogODY0MDAwMDApIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo0OTAsInkiOjE5MjAsIndpcmVzIjpbWyIyOWY2MzJhNWM2OGVjYzU1Il1dfSx7ImlkIjoiMjlmNjMyYTVjNjhlY2M1NSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZDcxMDFmM2E0ZDQ1ZGVlZCIsImciOiJiYjM3MDE2MjUyMGU5NWQ3IiwibmFtZSI6IkRpZmZlcmVuY2UgaW4gRGF5cyIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImRheXNfZGlmZmVyZW5jZSIsInB0IjoibXNnIiwidG8iOiIobXNnLmVuZF90aW1lIC0gbXNnLnN0YXJ0X3RpbWUpIC8gODY0MDAwMDAiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjc1MCwieSI6MTkyMCwid2lyZXMiOltbIjQ4ODFmZmFmZWI1ZGE2NGMiXV19LHsiaWQiOiJjY2MwODFlNGNjYWJhODc5IiwidHlwZSI6Imdsb2JhbC1jb25maWciLCJlbnYiOltdLCJtb2R1bGVzIjp7Im5vZGUtcmVkLWNvbnRyaWItbW9tZW50IjoiNS4wLjAifX1d"
---
::


