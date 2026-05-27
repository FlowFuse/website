---
title: Building a Flexible Node-RED Scheduler with Cron-Plus
navTitle: Building a Flexible Node-RED Scheduler with Cron-Plus
---

Automation isn’t just about reacting to events—sometimes it’s about doing things at the right time. In Node-RED, the Inject node is great for triggering flows at set intervals, but it’s limited when you need more control. Cron jobs offer precise scheduling, letting you set up custom times for your tasks. In this guide, we'll show you how to create flexible cron schedules in FlowFuse with Node-RED, so your flows run exactly when needed.

<!--more-->

## What is a Cron Job?

Let’s kick things off by demystifying what a cron job actually is. You’ve probably heard the term before, and while it might sound complex, it’s really just a way of setting up tasks to run at specific times — automatically.

Think of it this way: with Node-RED’s Inject node, you can trigger tasks at intervals like every 5 seconds, every minute, or even on specific weekdays at set times (for example, every Monday, Tuesday, or Sunday). But when you use cron jobs, you gain much more control over the timing.

For example, you can trigger a task every two hours, only on weekdays, but skip holidays or run a job every 5 minutes during business hours, but only in the first week of each quarter. You can even schedule flows to run at 6:45 AM on the last Friday of every month, or at 11:59 PM on the last day of the year — these kinds of patterns are either extremely complex or completely unachievable using just the Inject node.

The magic of cron lies in its ability to express complex time logic in a simple, compact format — perfect for orchestrating automation schedules that go well beyond what the basic Inject node can offer.

## Prerequisites

Before we start building flexible cron schedules in FlowFuse, make sure you have the following in place:

- **Running FlowFuse Instance:** Make sure you have a FlowFuse instance set up and running. If you don't have an account, check out our [free trial](https://app.flowfuse.com/account/create) and learn how to create an instance in FlowFuse.
- **node-red-contrib-cron-plus:** Ensure you have [node-red-contrib-cron-plus](https://flows.nodered.org/node/node-red-contrib-cron-plus) installed, It’s developed by Steve, a software engineer here at FlowFuse and one of the core maintainers of Node-RED.

## Building Scheduled Automations with cron-plus

Now that you understand what cron jobs are and why they’re useful, let’s dive into building them inside Node-RED using the cron-plus node. When working with cron-plus, you’ll encounter different types of schedules—each suited for different needs—and varying levels of complexity depending on what you're trying to automate.

At the most basic level, you can define static schedules using familiar cron expressions (like "every 5 minutes" or "at 8:00 AM daily"). As you progress, you’ll learn to use solar event triggers (like sunrise or sunset), create date-specific schedules, and even manage schedules dynamically at runtime—adding, removing, or modifying them based on incoming data or user interactions.

In this section, we’ll walk through each of these layers step by step, starting with the simplest use cases and gradually moving into more powerful and flexible scheduling techniques—giving you full control over when and how your flows run.

> Tip: This article draws information from the node’s [README](https://flows.nodered.org/node/node-red-contrib-cron-plus), which is highly informative. I recommend going through it as well for more details.

### Static Schedules

The most straightforward way to use cron-plus is to define static schedules using cron expressions. These are pre-configured inside the node and run on a fixed pattern—perfect for predictable, repetitive tasks. For example we need to Trigger a flow every day at 8:00 AM.

1. Drag and drop the cron-plus node onto your Node-RED workspace.

2. Double-click on the cron-plus node to open its configuration panel.

3. If no schedules are configured yet, click the +add button to add a new schedule. Enter the following:
   - Schedule Name: e.g., "Daily 8 AM"
   - Topic: Enter a topic to send with the message when triggered, such as "daily-trigger".
   - Payload: Choose what payload you want to send when the cron job triggers, such as "Triggering Flow at 8 AM".

4. Select Cron from the Schedule Type dropdown.

5. In the Schedule field, enter the following cron expression to run the task at 8:00 AM every day:

```
   0 8 * * *
```

A cron expression is composed of five fields (sometimes six or seven, depending on the system) that determine the schedule for executing tasks.
Below is a breakdown of each field that node-red-contrib-cron-plus supports:

| Field              | Possible Values      | Special Symbols   |
|--------------------|----------------------|-------------------|
| Second  (optional) | `0-59`               | `* / , -`         |
| Minute             | `0-59`               | `* / , -`         |
| Hour               | `0-23`               | `* / , -`         |
| Day of Month       | `1-31`               | `* / , - ? L W`   |
| Month              | `1-12` or `JAN-DEC`  | `* / , -`         |
| Day of Week        | `0-6` or `SUN-SAT`   | `* / , - ? L #`   |
| Year (optional)    | `1970-2099`          | `* / , -`         |

Here are some examples of how you can use the special symbols and shorthand's:

| Symbol | Meaning                  | Example             | Explanation                                                 |
|--------|--------------------------|---------------------|-------------------------------------------------------------|
| `*`    | All possible values      | `* * * * *`         | Every minute of every hour, day, month, and weekday         |
| `?`    | No specific value        | `0 0 12 ? * MON`    | At 12 PM Only on Mondays (no specific day of the month)     |
| `-`    | Range                    | `0 10-12 * * * *`     | Minutes 10, 11, and 12 of every hour                      |
| `,`    | List of values           | `0 0 12 * 1,3,5 *`  | At 12 PM only in January, March, and May                    |
| `/`    | Step values              | `*/15 * * * *`      | Every 15 minutes (00, 15, 30, 45)                           |
| `L`    | Last                     | `0 0 12 L * *`      | 12 PM on the last day of the month                          |
| `W`    | Nearest weekday          | `0 0 0 15W * * *`   | At midnight on the nearest weekday to the 15th of the month |
| `#`    | nth weekday of the month | `0 0 0 * * MON#1 *` | At midnight on the first Monday of the month                |

6. Connect the cron-plus node to other nodes (e.g., a debug node or an action node) to specify the actions when the flow is triggered.

7. Click Deploy to save and activate your flow. The cron-plus node will now trigger your flow every day at 8:00 AM.



::render-flow
---
height: 200
flow: "W3siaWQiOiJjYmExNWJkMzJjNTQzNGE1IiwidHlwZSI6Imdyb3VwIiwieiI6ImIzNzQyODY5NGU5MGIyYzUiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyIyYWYyZTkyNzRmZTEzMjFhIiwiNDU4Yzk1MzNhMTQzN2VlMSJdLCJ4Ijo5NCwieSI6MTc5LCJ3IjozOTIsImgiOjgyfSx7ImlkIjoiMmFmMmU5Mjc0ZmUxMzIxYSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiMzc0Mjg2OTRlOTBiMmM1IiwiZyI6ImNiYTE1YmQzMmM1NDM0YTUiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjozODAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiNDU4Yzk1MzNhMTQzN2VlMSIsInR5cGUiOiJjcm9ucGx1cyIsInoiOiJiMzc0Mjg2OTRlOTBiMmM1IiwiZyI6ImNiYTE1YmQzMmM1NDM0YTUiLCJuYW1lIjoiQ3JvbiBQbHVzIiwib3V0cHV0RmllbGQiOiJwYXlsb2FkIiwidGltZVpvbmUiOiIiLCJzdG9yZU5hbWUiOiIiLCJjb21tYW5kUmVzcG9uc2VNc2dPdXRwdXQiOiJvdXRwdXQxIiwiZGVmYXVsdExvY2F0aW9uIjoiIiwiZGVmYXVsdExvY2F0aW9uVHlwZSI6ImRlZmF1bHQiLCJvdXRwdXRzIjoxLCJvcHRpb25zIjpbeyJuYW1lIjoiRGFpbHkgOCBBTSIsInRvcGljIjoiZGFpbHktdHJpZ2dlciIsInBheWxvYWRUeXBlIjoiZGVmYXVsdCIsInBheWxvYWQiOiIiLCJleHByZXNzaW9uVHlwZSI6ImNyb24iLCJleHByZXNzaW9uIjoiIDAgOCAqICogKiIsImxvY2F0aW9uIjoiIiwib2Zmc2V0IjoiMCIsInNvbGFyVHlwZSI6ImFsbCIsInNvbGFyRXZlbnRzIjoic3VucmlzZSxzdW5zZXQifV0sIngiOjIwMCwieSI6MjIwLCJ3aXJlcyI6W1siMmFmMmU5Mjc0ZmUxMzIxYSJdXX1d"
---
::



Here are some advance patterns: 

**Every weekday at 9:30 AM**
```
30 9 * * 1-5
```

**Every hour**
```
0 * * * *
```

**Every 15 min during work hours (Mon–Fri, 9–5)**
```
*/15 9-16 * * 1-5
```

**First Monday of the month at 10:00 AM**
```
0 10 * * MON#1
```

**Last Friday of the month at 6:45 AM**
```
45 6 ? * FRIL
```

#### Easy Builder Feature 

To make it even easier to create and customize cron patterns, the cron-plus node includes a feature called Easy Builder. This feature provides a user-friendly interface that lets you quickly generate and adjust cron expressions without needing to write them manually. You can select options like time intervals, days of the week, and more, and the Easy Builder will generate the correct cron syntax for you.

![Image showing the easy builder feature](/blog/2025/05/images/easy-builder.gif){data-zoomable}
_Image showing the easy builder feature_

### Solar Event Schedules

Solar event-based triggers are a great feature in cron-plus for automating tasks based on sunlight events like sunrise, sunset, dawn, and dusk. You can fine-tune your triggers with offsets, like triggering an action 30 minutes after sunset.

Here are the solar events you can use:

   - **nightEnd**: End of night, start of twilight.
   - **nauticalDawn**: Horizon becomes faintly visible, used by sailors.
   - **civilDawn**: Light enough for outdoor activities without lights.
   - **sunrise**: Sun first visible on the horizon.
   - **sunriseEnd**: Full sun above the horizon.
   - **morningGoldenHourEnd**: End of the morning golden hour.
   - **solarNoon**: Sun is at its highest point in the sky.
   - **eveningGoldenHourStart**: Start of the evening golden hour.
   - **sunsetStart**: Sun starts to set.
   - **sunset**: Sun is fully below the horizon.
   - **civilDusk**: Last light before it gets dark.
   - **nauticalDusk**: Horizon is no longer visible, dark sky.
   - **nightStart**: Full darkness after twilight.
   - **nadir**: Darkest point of the night.
  
Let's start and learn how to use it. Suppose we need to trigger the flow 30 minutes after sunset. Here's how you do it:

Let’s start by setting up a flow that triggers 30 minutes after sunset. Here’s how:

1. Drag a new `cron-plus` node onto your Node-RED canvas.

2. Set the location — solar events depend on your geographic location. You can configure this at the node level or per schedule. In the Location field, either:
   - Enter your latitude and longitude manually, or  
   - Click the three-dot icon to open a map and select your location.

3. Add a new schedule. Enter the following Schedule Name, Topic, Payload

4. Choose the solar event — set the Schedule Type to `solar`.  
   You can choose "All Solar Events" or "Selected Solar Events" to pick specific ones.  
   For this example, choose "sunset".

5. Set the offset — this defines how much earlier or later the trigger should happen compared to the solar event.  
   For 30 minutes after sunset, enter:
   ```
   30
   ```
   You can also use negative numbers (like `-10` for 10 minutes before sunset) or larger values like `60` for 1 hour after.

6. Click Done, connect the node to the rest of your flow, and Deploy.



::render-flow
---
height: 200
flow: "W3siaWQiOiJjYmExNWJkMzJjNTQzNGE1IiwidHlwZSI6Imdyb3VwIiwieiI6ImIzNzQyODY5NGU5MGIyYzUiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyIyYWYyZTkyNzRmZTEzMjFhIiwiNDU4Yzk1MzNhMTQzN2VlMSJdLCJ4Ijo5NCwieSI6MTc5LCJ3IjozOTIsImgiOjgyfSx7ImlkIjoiMmFmMmU5Mjc0ZmUxMzIxYSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiMzc0Mjg2OTRlOTBiMmM1IiwiZyI6ImNiYTE1YmQzMmM1NDM0YTUiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjozODAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiNDU4Yzk1MzNhMTQzN2VlMSIsInR5cGUiOiJjcm9ucGx1cyIsInoiOiJiMzc0Mjg2OTRlOTBiMmM1IiwiZyI6ImNiYTE1YmQzMmM1NDM0YTUiLCJuYW1lIjoiQ3JvbiBQbHVzIiwib3V0cHV0RmllbGQiOiJwYXlsb2FkIiwidGltZVpvbmUiOiIiLCJzdG9yZU5hbWUiOiIiLCJjb21tYW5kUmVzcG9uc2VNc2dPdXRwdXQiOiJvdXRwdXQxIiwiZGVmYXVsdExvY2F0aW9uIjoiIiwiZGVmYXVsdExvY2F0aW9uVHlwZSI6ImRlZmF1bHQiLCJvdXRwdXRzIjoxLCJvcHRpb25zIjpbeyJuYW1lIjoiZXQiLCJ0b3BpYyI6IjMwbWluIEFmdGVyIFN1bnNldCIsInBheWxvYWRUeXBlIjoiZGVmYXVsdCIsInBheWxvYWQiOiIiLCJleHByZXNzaW9uVHlwZSI6InNvbGFyIiwiZXhwcmVzc2lvbiI6IiAwIDggKiAqICoiLCJsb2NhdGlvbiI6IjIwLjcwODE2NTk0NTI0NjAxIDc1LjY3MzgyODEyNSIsIm9mZnNldCI6IjMwIiwic29sYXJUeXBlIjoic2VsZWN0ZWQiLCJzb2xhckV2ZW50cyI6InN1bnNldCJ9XSwieCI6MjAwLCJ5IjoyMjAsIndpcmVzIjpbWyIyYWYyZTkyNzRmZTEzMjFhIl1dfV0="
---
::



Your flow will now trigger 30 minutes after sunset every day — automatically adjusting for seasonal changes based on your location.

### Date Sequence Schedules

While cron expressions and solar events are great for recurring patterns, sometimes you need to schedule flows to run at very specific, one-time moments—like a product launch, system maintenance window, or a holiday-specific action. This is where the Date Sequence schedule type in cron-plus comes in.

With this method, you can define exact dates and times (including timezone support), and the node will trigger your flow at those precise moments—once or multiple times, depending on the list you define.

The sequence field supports:

   - UNIX timestamps (in milliseconds)
   ```
   1767225600000 
   ```

   - Date and time (in plain text)
   ```
   2026-04-03 00:00
   ```

   - Date and time with timezone
   ```
   2026-04-06 12:00 GMT+0
   ```

You can list multiple times, separated by commas:

```
1767225600000, 2026-04-03 00:00, 2026-04-06 12:00 GMT+0
```

Let’s learn how to set this up:

1. Drag a new cron-plus node onto the canvas.
2. Double-click the node to open its settings.
3. Click +add to create a new schedule.
4. Give the schedule a name and configure the topic — this is the value that will be sent with the message when the schedule triggers.
5. Set the payload to whatever message or data you want to send when triggered.
6. Choose Date Sequence from the Schedule Type dropdown.
7. In the Expression field, enter one or more dates using any of the 8. supported formats we discussed above (UNIX timestamp, plain date/time, or date/time with timezone). You can separate multiple values with commas.
9. Click Done, then connect the cron-plus node to the rest of your flow (e.g., a debug node to see it trigger, or an action node to perform something).
10. Finally, click Deploy to save and start your schedule.



::render-flow
---
height: 200
flow: "W3siaWQiOiIyZmYzNDFjZWMzMTE0YzUzIiwidHlwZSI6ImNyb25wbHVzIiwieiI6ImIzNzQyODY5NGU5MGIyYzUiLCJnIjoiMmFhMmQ1OWEzNmJmMGZhNyIsIm5hbWUiOiJEYXRlIFNlcXVlbmNlIiwib3V0cHV0RmllbGQiOiJwYXlsb2FkIiwidGltZVpvbmUiOiIiLCJzdG9yZU5hbWUiOiIiLCJjb21tYW5kUmVzcG9uc2VNc2dPdXRwdXQiOiJvdXRwdXQxIiwiZGVmYXVsdExvY2F0aW9uIjoiIiwiZGVmYXVsdExvY2F0aW9uVHlwZSI6ImRlZmF1bHQiLCJvdXRwdXRzIjoxLCJvcHRpb25zIjpbeyJuYW1lIjoic2NoZWR1bGUxIiwidG9waWMiOiJmaXhlZCBkYXRlcyIsInBheWxvYWRUeXBlIjoic3RyIiwicGF5bG9hZCI6ImZpeGVkIiwiZXhwcmVzc2lvblR5cGUiOiJkYXRlcyIsImV4cHJlc3Npb24iOiIxNzY3MjI1NjAwMDAwLCAyMDI2LTA0LTAzIDAwOjAwLCAyMDI2LTA0LTA2IDEyOjAwIEdNVCswIiwibG9jYXRpb24iOiIiLCJvZmZzZXQiOiIwIiwic29sYXJUeXBlIjoiYWxsIiwic29sYXJFdmVudHMiOiJzdW5yaXNlLHN1bnNldCJ9XSwieCI6MzAwLCJ5Ijo3ODAsIndpcmVzIjpbWyJiNjZlYmU5MWRmODRiNGNlIl1dfSx7ImlkIjoiYjY2ZWJlOTFkZjg0YjRjZSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiMzc0Mjg2OTRlOTBiMmM1IiwiZyI6IjJhYTJkNTlhMzZiZjBmYTciLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo1NjAsInkiOjc4MCwid2lyZXMiOltdfV0="
---
::



The flow will now trigger exactly at each date and time you've specified.

### Handling Time Zones and Daylight Saving Time (DST)

When dealing with scheduled tasks, managing time zones and Daylight Saving Time (DST) is crucial to ensure your cron jobs trigger at the correct local time. With cron-plus in Node-RED, this is made easy. Cron-plus provides global time zone support, allowing you to specify the time zone for all schedules within a particular cron-plus node. When configuring the cron-plus node, you'll see an input field labeled "Timezone", where you can start typing your desired time zone and select from suggested options.

![Screenshot showing the Timezone input field in the cron-plus node configuration with auto-suggestions while typing](/blog/2025/05/images/timezone-selection.png){data-zoomable}
_Screenshot showing the Timezone input field in the cron-plus node configuration with auto-suggestions while typing_

For example, if your tasks need to run in the Eastern Time Zone, you would enter "America/New_York" in the Timezone field. Similarly, for the UK time zone, you would enter "Europe/London".

When scheduling tasks in a time zone that observes Daylight Saving Time (DST), cron-plus will automatically adjust your task’s execution times to account for the DST changes. If you set a schedule for 8:00 AM daily, cron-plus will ensure that the task triggers at 8:00 AM local time, whether it's during Standard Time (e.g., EST) or Daylight Saving Time (e.g., EDT).

When DST begins (e.g., in spring), cron-plus will shift the scheduled task forward by one hour. Similarly, when DST ends (e.g., in fall), the task will shift back by one hour. This automatic adjustment is handled based on the time zone you enter.

### Understanding Node Status Symbols and Their Descriptions

The cron-plus node visually indicates its state using status markers in the flow editor:

- **● (Dot):** Indicates a static schedule configured directly in the node.
- **○ (Ring):** Indicates a dynamic schedule added via input messages.

Also, the node indicates the next event, along with the type of schedule. For example, node in the following image specifies that the next event is on May 26, 2025, at 12:00 AM GMT +5:30. It is a static schedule, and its name is 'Schedule1'

![A node showing the next event scheduled for May 26, 2025, at 12:00 AM GMT +5:30 with a static schedule named 'Schedule1'.](/blog/2025/05/images/node-status-event.png){data-zoomable}
_A node showing the next event scheduled for May 26, 2025, at 12:00 AM GMT +5:30 with a static schedule named 'Schedule1'._

### Dynamic Schedule Control via Input Messages

In some cases, you might not know your schedule ahead of time—or you may want it to change based on user actions or incoming data. The cron-plus node supports this with dynamic control using input messages. This means you can add, update, or remove schedules while your flow is running, without opening the editor. It’s a powerful way to make your automations more responsive and adaptable.

Each control message is sent to the `cron-plus` node using a specially formatted `msg.payload` with a command and associated configuration.

Below are some examples of dynamic commands. Please refer to the built-in help of the cron-plus node for more details:

| Command   | Description                                                           | Example                                                                                      |
|-----------|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `trigger` | Triggers a schedule by name.                                          | `{ "command": "trigger", "name": "dynamic-1" }`                                              |
| `add`     | Add (or update) a dynamic schedule.                                   | `{ "command": "add", "name": "dynamic-1", "topic": "dynamic-schedule", "payloadType": "default", "expressionType": "cron", "expression": "*/2 * * * *" }` |
| `remove`  | Removes a specific schedule by name.                                  | `{ "command": "remove", "name": "dynamic-1" }`                                               |
| `start`   | Starts a specific schedule by name.                                   | `{ "command": "start", "name": "dynamic-1" }`                                                |
| `stop`    | Stops a specific schedule by name.                                    | `{ "command": "stop", "name": "dynamic-1" }`                                                 |
| `pause`   | Pauses a specific schedule by name.                                   | `{ "command": "pause", "name": "dynamic-1" }`                                                |
| `export`  | Exports a schedule by name.                                           | `{ "command": "export", "name": "dynamic-1" }`                                               |
| `status`  | Provides the status of a specific schedule by name.                   | `{ "command": "status", "name": "dynamic-1" }`                                               |
| `describe`| Provides a human-readable description of a cron or solar expression.  | `{ "command": "describe", "expression": "0 8 * * 1-5", "expressionType": "cron" }`           |

Commands can also include a `filter` to operate on multiple schedules at once. Below are a few examples. Please refer to the built-in help of the cron-plus node for more details:

| Filter                    | Description                                          | Example                                       |
|---------------------------|------------------------------------------------------|-----------------------------------------------|
| `-all`                    | Operate a command on all schedules.                  | `{ "command": "start-all" }`                  |
| `-all-dynamic`            | Operate a command on all dynamic schedules.          | `{ "command": "export-all-dynamic" }`         |
| `-all-static`             | Operate a command on all static schedules.           | `{ "command": "pause-all-static" }`           |
| `-all-active`             | Operate a command on all active schedules.           | `{ "command": "stop-all-active" }`            |
| `-all-inactive`           | Operate a command on all inactive schedules.         | `{ "command": "start-all-inactive" }`         |
| `-all-active-static`      | Operate a command on all active static schedules.    | `{ "command": "stop-all-active-static" }`     |
| `-all-active-dynamic`     | Operate a command on all active dynamic schedules.   | `{ "command": "stop-all-active-dynamic" }`    |
| `-all-inactive-static`    | Operate a command on all inactive static schedules.  | `{ "command": "start-all-inactive-static" }`  |
| `-all-inactive-dynamic`   | Operate a command on all inactive dynamic schedules. | `{ "command": "remove-all-inactive-dynamic" }`|

#### Dynamic Demo 1

For example, we need to build a flow that triggers on UK public holidays to stop recording the OEE (Overall Equipment Efficiency) or lock the entry gates of the factory. To achieve this, we can integrate a UK public holiday API into our Node-RED flow, fetch the holiday data, and then trigger actions based on those holidays.

1. Drag the Inject node onto the canvas and set it to trigger on deploy after `0.1` seconds.
2. Next, drag the HTTP request node onto the canvas, set the method to GET, and use the URL `https://www.gov.uk/bank-holidays.json`. Set the return to "parsed JSON object".
3. Drag the Function node onto the canvas and add the following JavaScript code into it:

```javascript
// Retrieve public holidays for England and Wales from the API response
const engHols = msg.payload["england-and-wales"].events;

// Clear out any existing schedules before adding new ones
node.send({ topic: 'remove-all' });

// Create an array to hold the new holiday schedules
const newSchedules = [];

// Loop through all the holiday events
for (let index = 0; index < engHols.length; index++) {
    const hol = engHols[index]; // Get the current holiday
    const date = new Date(hol.date); // Convert the holiday date to a Date object

    // Skip holidays that are in the past (before the current date)
    if (date.valueOf() < Date.now()) {
        continue; // Skip to the next holiday
    }

    // Create a new schedule for upcoming holidays
    const newSchedule = {
        "command": "add", // Command to add a new schedule
        "name": hol.title + ` (${date.getFullYear()})`, // Holiday name with year
        "topic": hol.title, // Holiday title as topic
        "expression": hol.date, // Holiday date to use as an expression
        "expressionType": "dates", // Define the type as dates
        "payload": hol, // Send the holiday details as the payload
        "payloadType": "json" // Specify that the payload is in JSON format
    };

    // Add the new schedule to the list of new schedules
    newSchedules.push(newSchedule);    
}

// Set the topic as empty (not used for now)
msg.topic = '';
// Set the payload to the new schedules array created above
msg.payload = newSchedules;

// Return the updated message with new schedules
return msg;
```

4. Drag a cron-plus node onto the canvas. Connect the Inject node to the HTTP request node, the HTTP request node to the Function node, and the Function node to the cron-plus node.
5. Deploy the flow.

Now you can check the dynamic schedules list (see how at the end of this section).



::render-flow
---
height: 200
flow: "W3siaWQiOiIzNjA4ZGIwZDFiZDU5YWE1IiwidHlwZSI6ImluamVjdCIsInoiOiIxNzkxYTdiZDU3NmIzYTE1IiwibmFtZSI6IlVwZGF0ZSBiYW5rIGhvbGlkYXlzIiwicHJvcHMiOlt7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiMDAgMDIgKiAqIDEiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MTYwLCJ5Ijo2MCwid2lyZXMiOltbIjI1MmNiN2M4OGRlNzhlNDUiXV19LHsiaWQiOiIyNTJjYjdjODhkZTc4ZTQ1IiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiIxNzkxYTdiZDU3NmIzYTE1IiwibmFtZSI6IiIsIm1ldGhvZCI6IkdFVCIsInJldCI6Im9iaiIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiJodHRwczovL3d3dy5nb3YudWsvYmFuay1ob2xpZGF5cy5qc29uIiwidGxzIjoiIiwicGVyc2lzdCI6ZmFsc2UsInByb3h5IjoiIiwiaW5zZWN1cmVIVFRQUGFyc2VyIjpmYWxzZSwiYXV0aFR5cGUiOiIiLCJzZW5kZXJyIjpmYWxzZSwiaGVhZGVycyI6W10sIngiOjM3MCwieSI6NjAsIndpcmVzIjpbWyJjZjcxZTZhZDBhOTgzZDgwIl1dfSx7ImlkIjoiY2Y3MWU2YWQwYTk4M2Q4MCIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiIxNzkxYTdiZDU3NmIzYTE1IiwibmFtZSI6ImVuZ2xhbmQgYmFuayBob2xpZGF5IHNjaGVkdWxlcyIsImZ1bmMiOiJjb25zdCBlbmdIb2xzID0gbXNnLnBheWxvYWRbXCJlbmdsYW5kLWFuZC13YWxlc1wiXS5ldmVudHNcblxuLy8gY2xlYXIgb3V0IGV4aXN0aW5nIHNjaGVkdWxlc1xubm9kZS5zZW5kKHt0b3BpYzoncmVtb3ZlLWFsbCd9KVxuXG5jb25zdCBuZXdTY2hlZHVsZXMgPSBbXVxuZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZW5nSG9scy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBob2wgPSBlbmdIb2xzW2luZGV4XTtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoaG9sLmRhdGUpXG4gICAgaWYgKGRhdGUudmFsdWVPZigpIDwgRGF0ZS5ub3coKSkge1xuICAgICAgICBjb250aW51ZVxuICAgIH1cbiAgICBjb25zdCBuZXdTY2hlZHVsZSA9IHtcbiAgICAgICAgXCJjb21tYW5kXCI6IFwiYWRkXCIsXG4gICAgICAgIFwibmFtZVwiOiBob2wudGl0bGUgKyBgICgke2RhdGUuZ2V0RnVsbFllYXIoKX0pYCxcbiAgICAgICAgXCJ0b3BpY1wiOiBob2wudGl0bGUsXG4gICAgICAgIFwiZXhwcmVzc2lvblwiOiBob2wuZGF0ZSxcbiAgICAgICAgXCJleHByZXNzaW9uVHlwZVwiOiBcImRhdGVzXCIsXG4gICAgICAgIFwicGF5bG9hZFwiOiBob2wsXG4gICAgICAgIFwicGF5bG9hZFR5cGVcIjogXCJqc29uXCJcbiAgICB9XG4gICAgbmV3U2NoZWR1bGVzLnB1c2gobmV3U2NoZWR1bGUpICAgIFxufVxuXG5tc2cudG9waWMgPSAnJ1xubXNnLnBheWxvYWQgPSBuZXdTY2hlZHVsZXNcblxucmV0dXJuIG1zZzsiLCJvdXRwdXRzIjoxLCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjQzMCwieSI6MTIwLCJ3aXJlcyI6W1siYWJlYTM2MGYzMzZiYmY1YyJdXX0seyJpZCI6ImFiZWEzNjBmMzM2YmJmNWMiLCJ0eXBlIjoiY3JvbnBsdXMiLCJ6IjoiMTc5MWE3YmQ1NzZiM2ExNSIsIm5hbWUiOiIiLCJvdXRwdXRGaWVsZCI6InBheWxvYWQiLCJ0aW1lWm9uZSI6IiIsInN0b3JlTmFtZSI6IiIsImNvbW1hbmRSZXNwb25zZU1zZ091dHB1dCI6Im91dHB1dDIiLCJkZWZhdWx0TG9jYXRpb24iOiIiLCJkZWZhdWx0TG9jYXRpb25UeXBlIjoiZGVmYXVsdCIsIm91dHB1dHMiOjIsIm9wdGlvbnMiOltdLCJ4IjozNjAsInkiOjIwMCwid2lyZXMiOltbImRmZmY1ZGFlM2RlOWU3ZGUiXSxbIjc4MzRlNDdhMTYzMTM0NmYiXV19LHsiaWQiOiJiNWE1M2RmMmRlZGRlMWQyIiwidHlwZSI6ImluamVjdCIsInoiOiIxNzkxYTdiZDU3NmIzYTE1IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiJsaXN0LWFsbCIsIngiOjExMCwieSI6MTgwLCJ3aXJlcyI6W1siYWJlYTM2MGYzMzZiYmY1YyJdXX0seyJpZCI6Ijc4MzRlNDdhMTYzMTM0NmYiLCJ0eXBlIjoiZGVidWciLCJ6IjoiMTc5MWE3YmQ1NzZiM2ExNSIsIm5hbWUiOiJsaXN0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc1MCwieSI6MjIwLCJ3aXJlcyI6W119LHsiaWQiOiJkZmZmNWRhZTNkZTllN2RlIiwidHlwZSI6ImRlYnVnIiwieiI6IjE3OTFhN2JkNTc2YjNhMTUiLCJuYW1lIjoiYWN0aW9uIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc1MCwieSI6MTgwLCJ3aXJlcyI6W119LHsiaWQiOiIwNDFmNzMwNjA4OGRhZjI0IiwidHlwZSI6ImluamVjdCIsInoiOiIxNzkxYTdiZDU3NmIzYTE1IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiJyZW1vdmUtYWxsIiwieCI6MTIwLCJ5IjoyMjAsIndpcmVzIjpbWyJhYmVhMzYwZjMzNmJiZjVjIl1dfV0="
---
::



#### Dynamic Demo 2

Additionally, I'd like to share another demo that Steve has prepared for the community, which demonstrates dynamic scheduling based on the best energy prices:



::render-flow
---
height: 200
flow: "W3siaWQiOiIwZjk2OWNkOTZkYTg0YjJlIiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwibmFtZSI6IiIsIm1ldGhvZCI6IkdFVCIsInJldCI6Im9iaiIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiJodHRwczovL2FwaS5hd2F0dGFyLmF0L3YxL21hcmtldGRhdGEiLCJ0bHMiOiIiLCJwZXJzaXN0IjpmYWxzZSwicHJveHkiOiIiLCJpbnNlY3VyZUhUVFBQYXJzZXIiOmZhbHNlLCJhdXRoVHlwZSI6IiIsInNlbmRlcnIiOmZhbHNlLCJoZWFkZXJzIjpbXSwieCI6NDUwLCJ5IjoyMjAsIndpcmVzIjpbWyIzMmUwODUzOWQ4MzM5Zjc0Il1dfSx7ImlkIjoiMmE3NDY1ZDY3ZGVhZTI3OCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZjU1OWNmMGViNGVjYTExYyIsIm5hbWUiOiJnZXQgbGl2ZURhdGEiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjkwLCJ5IjoyMjAsIndpcmVzIjpbWyIwZjk2OWNkOTZkYTg0YjJlIl1dfSx7ImlkIjoiMzJlMDg1MzlkODMzOWY3NCIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwibmFtZSI6IkJpbGxpZ3N0ZW4gNSBTdHVuZGVuIC0+IG1zZy5saXZlRGF0YSIsImZ1bmMiOiJ2YXIgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbnZhciBtYXhMb2FkaW5nRHVyYXRpb24gPSA1O1xuXG52YXIgY2hlYXBlc3RIb3VycyA9IG1zZy5wYXlsb2FkLmRhdGFcbiAgICAuc29ydCgoYSxiKSA9PiBhLm1hcmtldHByaWNlIC0gYi5tYXJrZXRwcmljZSlcbiAgICAuc2xpY2UoMCxtYXhMb2FkaW5nRHVyYXRpb24pXG4gICAgLnNvcnQoKGEsYikgPT4gYS5zdGFydF90aW1lc3RhbXAgLSBiLnN0YXJ0X3RpbWVzdGFtcCk7XG4gICAgdmFyIGN1cnJlbnRIb3VyID0gY2hlYXBlc3RIb3Vycy5maWx0ZXIoZCA9PiBkLnN0YXJ0X3RpbWVzdGFtcCA8IHRpbWVzdGFtcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIGQuZW5kX3RpbWVzdGFtcCA+IHRpbWVzdGFtcCk7XG5tc2cubGl2ZURhdGEgPSB7XG4gICAgc29jOm1zZy5wYXlsb2FkLFxuICAgIGNoZWFwZXN0SG91cnM6IGNoZWFwZXN0SG91cnNcbn1cbnJldHVybiBtc2c7XG4iLCJvdXRwdXRzIjoxLCJ0aW1lb3V0IjoiIiwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4IjozNzAsInkiOjI4MCwid2lyZXMiOltbIjVjNTZiM2NhNWFjNGY3YzIiXV19LHsiaWQiOiI4OWMyYWNmNTFlN2ZiYzljIiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6ImY1NTljZjBlYjRlY2ExMWMiLCJuYW1lIjoibWVyZ2UgYWN0aXZlIGFuZCBuZXcgc2NoZWR1bGVzIiwiZnVuYyI6IlxuY29uc3QgaW5wdXREYXRhID0gbXNnLmxpdmVEYXRhLmNoZWFwZXN0SG91cnNcbmNvbnN0IGFjdGl2ZVNjaGVkdWxlcyA9IG1zZy5hY3RpdmVTY2hlZHVsZXMgfHwgW11cblxuLy8gQ2xlYXIgZXhpc3Rpbmcgc2NoZWR1bGVzXG5ub2RlLnNlbmQoeyB0b3BpYzogXCJyZW1vdmUtYWxsLWR5bmFtaWNcIiB9KTtcblxuLy8gaGVscGVyIGZ1bmN0aW9uXG5jb25zdCBtYWtlU2NoZWR1bGUgPSAoc3RhcnQsIHRpbWUsIHN1ZmZpeCkgPT4ge1xuICAgIGNvbnN0IGlzU3RhcnQgPSBzdGFydCA9PSB0cnVlIHx8IHN0YXJ0ID09PSBcInN0YXJ0XCIgfHwgc3RhcnQgPT09IFwib25cIiB8fCBzdGFydCA9PSAxXG4gICAgY29uc3QgdGl0bGUgPSBmb3JtYXRUaW1lKHRpbWUpICsgKGlzU3RhcnQgPyBcIi1vblwiIDogXCItb2ZmXCIpXG4gICAgY29uc3QgbmFtZSA9IHN1ZmZpeCA/IGAke3RpdGxlfSAoJHtzdWZmaXh9KSBgIDogdGl0bGVcbiAgICByZXR1cm4ge1xuICAgICAgICBcImNvbW1hbmRcIjogXCJhZGRcIixcbiAgICAgICAgXCJuYW1lXCI6IG5hbWUsXG4gICAgICAgIFwiZXhwcmVzc2lvblwiOiB0aW1lLFxuICAgICAgICBcImV4cHJlc3Npb25UeXBlXCI6IFwiZGF0ZXNcIixcbiAgICAgICAgXCJwYXlsb2FkVHlwZVwiOiBcInN0clwiLFxuICAgICAgICBcInBheWxvYWRcIjogaXNTdGFydCA/IFwic3RhcnRcIiA6IFwic3RvcFwiLFxuICAgIH1cbn1cbi8vIGhlbHBlciBmdW5jdGlvblxuY29uc3QgZm9ybWF0VGltZSA9IChkYXRlKSA9PiB7XG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpXG4gICAgY29uc3QgaGggPSAoXCJcIiArIGQuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgXCIwXCIpXG4gICAgY29uc3QgbW0gPSAoXCJcIiArIGQuZ2V0TWludXRlcygpKS5wYWRTdGFydCgyLCBcIjBcIilcbiAgICByZXR1cm4gYCR7aGh9OiR7bW19YFxufVxuXG4vLyB2YXJzXG5jb25zdCBuZXdTY2hlZHVsZXMgPSBbXVxuY29uc3QgbWVyZ2VkU2NoZWR1bGVzID0gW11cbmNvbnN0IGtlZXBTY2hlZHVsZXMgPSBbXVxuXG5mb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgaW5wdXREYXRhLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBpbnB1dERhdGFbaW5kZXhdO1xuICAgIGxldCBzdWZmaXggPSAnJ1xuICAgIHN1ZmZpeCA9IGVsZW1lbnQubWFya2V0cHJpY2UgKyBcIiBcIiArIGVsZW1lbnQudW5pdFxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKGVsZW1lbnQuc3RhcnRfdGltZXN0YW1wKVxuICAgIGNvbnN0IGVuZFRpbWUgPSBuZXcgRGF0ZShlbGVtZW50LmVuZF90aW1lc3RhbXApXG4gICAgbmV3U2NoZWR1bGVzLnB1c2gobWFrZVNjaGVkdWxlKFwic3RhcnRcIiwgc3RhcnRUaW1lLnZhbHVlT2YoKSwgc3VmZml4KSlcbiAgICBuZXdTY2hlZHVsZXMucHVzaChtYWtlU2NoZWR1bGUoXCJzdG9wXCIsIGVuZFRpbWUudmFsdWVPZigpLCBzdWZmaXgpKVxufVxuXG5cbi8vIGlmIHRoZXJlIGFyZSBhbnkgZXhpc3Rpbmcgc2NoZWR1bGVzIG5vdCB5ZXQgb3BlcmF0ZWRcbi8vIGFuZCB0aGV5IGFyZSBiZWZvcmUgdGhlIGZpcnN0IGluIHRoZSBuZXcgZGF0YSwgbGV0cyBrZWVwIHRoZW1cbmlmIChuZXdTY2hlZHVsZXM/Lmxlbmd0aCkge1xuICAgIGNvbnN0IGZpcnN0TmV3U2NoZWR1bGUgPSBuZXdTY2hlZHVsZXNbMF1cbiAgICBjb25zdCBleGlzdGluZ1NjaGVkdWxlc0JlZm9yZUZpcnN0TmV3ID0gYWN0aXZlU2NoZWR1bGVzPy5maWx0ZXIoZSA9PiBlLmV4cHJlc3Npb24gPCBmaXJzdE5ld1NjaGVkdWxlLmV4cHJlc3Npb24pXG4gICAgaWYgKGV4aXN0aW5nU2NoZWR1bGVzQmVmb3JlRmlyc3ROZXc/Lmxlbmd0aCkge1xuICAgICAgICBrZWVwU2NoZWR1bGVzLnB1c2goLi4uZXhpc3RpbmdTY2hlZHVsZXNCZWZvcmVGaXJzdE5ldy5tYXAoZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuID0gZS5uYW1lXG4gICAgICAgICAgICBjb25zdCBrID0gbWFrZVNjaGVkdWxlIChlLnBheWxvYWQsIGUuZXhwcmVzc2lvbikgXG4gICAgICAgICAgICBrLm5hbWUgPSBuLnJlcGxhY2UoJyAoa2VlcCknLCAnJykgKyBcIiAoa2VlcClcIlxuICAgICAgICAgICAgcmV0dXJuIGtcbiAgICAgICAgfSkpXG4gICAgfVxufSBlbHNlIHtcbiAgICAvLyBrZWVwIGFsbCBleGlzdGluZyBhY3RpdmUgc2NoZWR1bGVzIChhcyB0aGVyZSBhcmUgbm8gbmV3IG9uZXMpXG4gICAga2VlcFNjaGVkdWxlcy5wdXNoKC4uLmFjdGl2ZVNjaGVkdWxlcylcbn1cblxubWVyZ2VkU2NoZWR1bGVzLnB1c2goLi4ubmV3U2NoZWR1bGVzLCAuLi5rZWVwU2NoZWR1bGVzKVxubWVyZ2VkU2NoZWR1bGVzLnNvcnQoKGEsIGIpID0+IGEuZXhwcmVzc2lvbiAtIGIuZXhwcmVzc2lvbikgLy8gb3JkZXIgYnkgZXhwcmVzc2lvbiBhc2NcblxuLy8gZGVkdXBsaWNhdGUgdGhlIHNjaGVkdWxlcyBieSBzZWVpbmcgaWYgdGhlcmUgYXJlIGNvbnNlY3V0aXZlIG9uL29mZiBzY2hlZHVsZXNcbmxldCBkZWR1cGxpY2F0ZWRTY2hlZHVsZXMgPSBbXTtcbmxldCBwcmV2U2NoZWR1bGVcbmZvciAobGV0IGkgPSAwOyBpIDwgbWVyZ2VkU2NoZWR1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudFNjaGVkdWxlID0gbWVyZ2VkU2NoZWR1bGVzW2ldXG4gICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgZGVkdXBsaWNhdGVkU2NoZWR1bGVzLnB1c2goY3VycmVudFNjaGVkdWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY3VycmVudFNjaGVkdWxlLnBheWxvYWQgPT09IHByZXZTY2hlZHVsZS5wYXlsb2FkKSB7XG4gICAgICAgICAgICAvLyB0byBzY2hldWxlcyBhcmUgdGhlIHNhbWUgKHN0YXJ0L3N0YXJ0IG9yIHN0b3Avc3RvcClcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2NoZWR1bGUucGF5bG9hZCA9PT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIHRoaXMgb25lIGFzIHRoZSBwcmV2aW91cyBvbmUgd2FzIGEgXCJzdGFydFwiIChhbmQgZHVlIHRvIHNvcnRpbmcsIHRoaXMgb25lIGlzIHN1cGVyZmx1b3VzKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U2NoZWR1bGUucGF5bG9hZCA9PT0gXCJzdG9wXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBzaW5jZSB0aGUgcHJldmlvdXMgb25lIHdhcyBhIFwic3RvcFwiLCB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgcHJldmlvdXMgc2NoZWR1bGUgdG8gdGhlIG5ldyBzdG9wIHRpbWVcbiAgICAgICAgICAgICAgICBwcmV2U2NoZWR1bGUuZXhwcmVzc2lvbiA9IGN1cnJlbnRTY2hlZHVsZS5leHByZXNzaW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWR1cGxpY2F0ZWRTY2hlZHVsZXMucHVzaChjdXJyZW50U2NoZWR1bGUpOyAvLyBwdXNoIHRoZSBjdXJyZW50IHNjaGVkdWxlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJldlNjaGVkdWxlID0gY3VycmVudFNjaGVkdWxlXG59XG5cbi8vIG5vZGUud2Fybih7bmV3U2NoZWR1bGVzLCBrZWVwU2NoZWR1bGVzLCBtZXJnZWRTY2hlZHVsZXMsIGRlZHVwbGljYXRlZFNjaGVkdWxlc30pIC8vIGRlYnVnXG5tc2cucGF5bG9hZCA9IGRlZHVwbGljYXRlZFNjaGVkdWxlc1xubXNnLnRvcGljID0gXCJ1cGRhdGUgc2NoZWR1bGVzXCJcblxucmV0dXJuIG1zZztcbiIsIm91dHB1dHMiOjEsInRpbWVvdXQiOjAsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6NzQwLCJ5IjozNDAsIndpcmVzIjpbWyJiNmE1ZDQyYzc3NTFmYWUyIl1dfSx7ImlkIjoiODI3ZTE2YzNmMDJkMTk2MiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZjU1OWNmMGViNGVjYTExYyIsIm5hbWUiOiJDbGVhciBhbGwgc2NlZHVsZXMiLCJwcm9wcyI6W3sicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoicmVtb3ZlLWFsbC1keW5hbWljIiwieCI6MzEwLCJ5IjozODAsIndpcmVzIjpbWyJiNmE1ZDQyYzc3NTFmYWUyIl1dfSx7ImlkIjoiMzJhODg4MjVmZTNlZGYzNyIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiZjU1OWNmMGViNGVjYTExYyIsIm5hbWUiOiJzdGFydCIsInByb3BlcnR5IjoicGF5bG9hZCIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiZXEiLCJ2Ijoic3RhcnQiLCJ2dCI6InN0ciJ9XSwiY2hlY2thbGwiOiJ0cnVlIiwicmVwYWlyIjpmYWxzZSwib3V0cHV0cyI6MSwieCI6MTI1MCwieSI6MjgwLCJ3aXJlcyI6W1siZTg0YmE1MDFhMTQwNTkwNyJdXX0seyJpZCI6IjVlNTQ5N2NmZjc1NGVmNzMiLCJ0eXBlIjoic3dpdGNoIiwieiI6ImY1NTljZjBlYjRlY2ExMWMiLCJuYW1lIjoic3RvcCIsInByb3BlcnR5IjoidG9waWMiLCJwcm9wZXJ0eVR5cGUiOiJtc2ciLCJydWxlcyI6W3sidCI6ImVxIiwidiI6InBheWxvYWQiLCJ2dCI6InN0ciJ9XSwiY2hlY2thbGwiOiJ0cnVlIiwicmVwYWlyIjpmYWxzZSwib3V0cHV0cyI6MSwieCI6MTI1MCwieSI6MzIwLCJ3aXJlcyI6W1siYjJlOGMzNjA2YmQwNDg5NyJdXX0seyJpZCI6ImU4NGJhNTAxYTE0MDU5MDciLCJ0eXBlIjoiZGVidWciLCJ6IjoiZjU1OWNmMGViNGVjYTExYyIsIm5hbWUiOiJzdGFydCBzb21ldGhpbmciLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjp0cnVlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoicGF5bG9hZCIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTQ2MCwieSI6MjgwLCJ3aXJlcyI6W119LHsiaWQiOiJiMmU4YzM2MDZiZDA0ODk3IiwidHlwZSI6ImRlYnVnIiwieiI6ImY1NTljZjBlYjRlY2ExMWMiLCJuYW1lIjoic3RvcCBzb21ldGhpbmciLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjp0cnVlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoicGF5bG9hZCIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTQ2MCwieSI6MzIwLCJ3aXJlcyI6W119LHsiaWQiOiJiNmE1ZDQyYzc3NTFmYWUyIiwidHlwZSI6ImNyb25wbHVzIiwieiI6ImY1NTljZjBlYjRlY2ExMWMiLCJuYW1lIjoiIiwib3V0cHV0RmllbGQiOiJwYXlsb2FkIiwidGltZVpvbmUiOiIiLCJzdG9yZU5hbWUiOiIiLCJjb21tYW5kUmVzcG9uc2VNc2dPdXRwdXQiOiJvdXRwdXQyIiwiZGVmYXVsdExvY2F0aW9uIjoiIiwiZGVmYXVsdExvY2F0aW9uVHlwZSI6ImRlZmF1bHQiLCJvdXRwdXRzIjoyLCJvcHRpb25zIjpbXSwieCI6MTAyMCwieSI6MzgwLCJ3aXJlcyI6W1siMzJhODg4MjVmZTNlZGYzNyIsIjVlNTQ5N2NmZjc1NGVmNzMiXSxbImZlNTFhYWJhOTAzNjEyZWIiXV19LHsiaWQiOiI1YzU2YjNjYTVhYzRmN2MyIiwidHlwZSI6ImxpbmsgY2FsbCIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwibmFtZSI6IiIsImxpbmtzIjpbImVlNTdkNzhkMWM3NjlkMWIiXSwibGlua1R5cGUiOiJzdGF0aWMiLCJ0aW1lb3V0IjoiMzAiLCJ4Ijo3MzAsInkiOjI4MCwid2lyZXMiOltbIjg5YzJhY2Y1MWU3ZmJjOWMiXV19LHsiaWQiOiJiNGNmNDRmNmM3YmQxNDYxIiwidHlwZSI6ImxpbmsgaW4iLCJ6IjoiZjU1OWNmMGViNGVjYTExYyIsIm5hbWUiOiJsaW5rIGluIDQiLCJsaW5rcyI6WyIyOWRjZjA4NzJkM2Y3Y2E0Il0sIngiOjUwNSwieSI6MzIwLCJ3aXJlcyI6W1siNWM1NmIzY2E1YWM0ZjdjMiJdXX0seyJpZCI6ImZlNTFhYWJhOTAzNjEyZWIiLCJ0eXBlIjoibGluayBvdXQiLCJ6IjoiZjU1OWNmMGViNGVjYTExYyIsIm5hbWUiOiJsaW5rIG91dCAxNyIsIm1vZGUiOiJsaW5rIiwibGlua3MiOlsiYTFjMTI0MDRmNzI2YjAyZiJdLCJ4IjoxMjE1LCJ5IjozODAsIndpcmVzIjpbXX0seyJpZCI6IjUxYjNkZTAyYmNmNDYzYTMiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZjU1OWNmMGViNGVjYTExYyIsIm5hbWUiOiJ0ZXN0IGRhdGEiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbIjZiMzllMzYwNTRlZGNjMjIiLCIzMjM4OGM0YjBhZjdhNWIxIiwiNzNhNTI5YmZkMzc0MjUwMyIsIjQzYWE4NjkwYjQxNjdiY2MiLCJkYWU4MDMxZWU1ZjM3ZWI1IiwiMjlkY2YwODcyZDNmN2NhNCJdLCJ4IjoyMTQsInkiOjU3OSwidyI6NTIyLCJoIjoxMjJ9LHsiaWQiOiI2YjM5ZTM2MDU0ZWRjYzIyIiwidHlwZSI6ImluamVjdCIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwiZyI6IjUxYjNkZTAyYmNmNDYzYTMiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MzIwLCJ5Ijo2MjAsIndpcmVzIjpbWyIzMjM4OGM0YjBhZjdhNWIxIl1dfSx7ImlkIjoiMzIzODhjNGIwYWY3YTViMSIsInR5cGUiOiJ0ZW1wbGF0ZSIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwiZyI6IjUxYjNkZTAyYmNmNDYzYTMiLCJuYW1lIjoiY2hlYXBlc3RIb3VycyBzYW1wbGUiLCJmaWVsZCI6ImxpdmVEYXRhIiwiZmllbGRUeXBlIjoibXNnIiwiZm9ybWF0IjoianNvbiIsInN5bnRheCI6Im11c3RhY2hlIiwidGVtcGxhdGUiOiJ7XG4gICAgICBcInNvY1wiOiB7fSxcbiAgICAgIFwiY2hlYXBlc3RIb3Vyc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInN0YXJ0X3RpbWVzdGFtcFwiOiBcIjIwMjUtMDUtMDcgMDc6MDA6MDBcIixcbiAgICAgICAgICBcImVuZF90aW1lc3RhbXBcIjogXCIyMDI1LTA1LTA3IDEyOjAwOjAwXCIsXG4gICAgICAgICAgXCJtYXJrZXRwcmljZVwiOiA2Ni4wMixcbiAgICAgICAgICBcInVuaXRcIjogXCJFdXIvTVdoXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwic3RhcnRfdGltZXN0YW1wXCI6IFwiMjAyNS0wNS0wNyAyMDowMDowMFwiLFxuICAgICAgICAgIFwiZW5kX3RpbWVzdGFtcFwiOiBcIjIwMjUtMDUtMDcgMjE6MDA6MDBcIixcbiAgICAgICAgICBcIm1hcmtldHByaWNlXCI6IDYyLjQ4LFxuICAgICAgICAgIFwidW5pdFwiOiBcIkV1ci9NV2hcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSIsIm91dHB1dCI6Impzb24iLCJ4Ijo1MDAsInkiOjYyMCwid2lyZXMiOltbImRhZTgwMzFlZTVmMzdlYjUiXV19LHsiaWQiOiI3M2E1MjliZmQzNzQyNTAzIiwidHlwZSI6ImluamVjdCIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwiZyI6IjUxYjNkZTAyYmNmNDYzYTMiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MzIwLCJ5Ijo2NjAsIndpcmVzIjpbWyI0M2FhODY5MGI0MTY3YmNjIl1dfSx7ImlkIjoiNDNhYTg2OTBiNDE2N2JjYyIsInR5cGUiOiJ0ZW1wbGF0ZSIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwiZyI6IjUxYjNkZTAyYmNmNDYzYTMiLCJuYW1lIjoiY2hlYXBlc3RIb3VycyBvdmVybGFwIiwiZmllbGQiOiJsaXZlRGF0YSIsImZpZWxkVHlwZSI6Im1zZyIsImZvcm1hdCI6Impzb24iLCJzeW50YXgiOiJtdXN0YWNoZSIsInRlbXBsYXRlIjoie1xuICAgICAgXCJzb2NcIjoge30sXG4gICAgICBcImNoZWFwZXN0SG91cnNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJzdGFydF90aW1lc3RhbXBcIjogXCIyMDI1LTA1LTA3IDA4OjAwOjAwXCIsXG4gICAgICAgICAgXCJlbmRfdGltZXN0YW1wXCI6IFwiMjAyNS0wNS0wNyAxMTowMDowMFwiLFxuICAgICAgICAgIFwibWFya2V0cHJpY2VcIjogNjYuMDIsXG4gICAgICAgICAgXCJ1bml0XCI6IFwiRXVyL01XaFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInN0YXJ0X3RpbWVzdGFtcFwiOiBcIjIwMjUtMDUtMDcgMjA6MDA6MDBcIixcbiAgICAgICAgICBcImVuZF90aW1lc3RhbXBcIjogXCIyMDI1LTA1LTA3IDIxOjAwOjAwXCIsXG4gICAgICAgICAgXCJtYXJrZXRwcmljZVwiOiA2Mi40OCxcbiAgICAgICAgICBcInVuaXRcIjogXCJFdXIvTVdoXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0iLCJvdXRwdXQiOiJqc29uIiwieCI6NTEwLCJ5Ijo2NjAsIndpcmVzIjpbWyJkYWU4MDMxZWU1ZjM3ZWI1Il1dfSx7ImlkIjoiZGFlODAzMWVlNWYzN2ViNSIsInR5cGUiOiJqdW5jdGlvbiIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwiZyI6IjUxYjNkZTAyYmNmNDYzYTMiLCJ4Ijo2NjAsInkiOjY0MCwid2lyZXMiOltbIjI5ZGNmMDg3MmQzZjdjYTQiXV19LHsiaWQiOiIyOWRjZjA4NzJkM2Y3Y2E0IiwidHlwZSI6Imxpbmsgb3V0IiwieiI6ImY1NTljZjBlYjRlY2ExMWMiLCJnIjoiNTFiM2RlMDJiY2Y0NjNhMyIsIm5hbWUiOiJsaW5rIG91dCAxNiIsIm1vZGUiOiJsaW5rIiwibGlua3MiOlsiYjRjZjQ0ZjZjN2JkMTQ2MSJdLCJ4Ijo2OTUsInkiOjY0MCwid2lyZXMiOltdfSx7ImlkIjoiZjNmZjUzMzE2OThlMTc1MCIsInR5cGUiOiJncm91cCIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwibmFtZSI6IlN1YnJvdXRpbmUgZm9yIGdldHRpbmcgYWN0aXZlIHNjaGVkdWxlcyIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiZWU1N2Q3OGQxYzc2OWQxYiIsIjk5NTZlMzUyYjE3MjgxNjAiLCJhYmEzZTBmN2RlN2M2ZjU0IiwiY2M3NTNhMzQ2MDJkYWY3MCIsImU0YjBjYjVkYmYxZmNiY2MiLCJhMWMxMjQwNGY3MjZiMDJmIl0sIngiOjU5NCwieSI6NDM5LCJ3Ijo3MTIsImgiOjgyfSx7ImlkIjoiZWU1N2Q3OGQxYzc2OWQxYiIsInR5cGUiOiJsaW5rIGluIiwieiI6ImY1NTljZjBlYjRlY2ExMWMiLCJnIjoiZjNmZjUzMzE2OThlMTc1MCIsIm5hbWUiOiJnZXQtYWN0aXZlLWR5bmFtaWMgc2NoZWR1bGVzIiwibGlua3MiOltdLCJ4Ijo3NDAsInkiOjQ4MCwid2lyZXMiOltbIjk5NTZlMzUyYjE3MjgxNjAiXV0sImwiOnRydWV9LHsiaWQiOiI5OTU2ZTM1MmIxNzI4MTYwIiwidHlwZSI6ImNoYW5nZSIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwiZyI6ImYzZmY1MzMxNjk4ZTE3NTAiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoidG9waWMiLCJwdCI6Im1zZyIsInRvIjoiZXhwb3J0LWFjdGl2ZS1keW5hbWljIiwidG90Ijoic3RyIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjkwNSwieSI6NDgwLCJ3aXJlcyI6W1siYjZhNWQ0MmM3NzUxZmFlMiJdXSwibCI6ZmFsc2V9LHsiaWQiOiJhYmEzZTBmN2RlN2M2ZjU0IiwidHlwZSI6ImNoYW5nZSIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwiZyI6ImYzZmY1MzMxNjk4ZTE3NTAiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJtb3ZlIiwicCI6InBheWxvYWQucmVzdWx0IiwicHQiOiJtc2ciLCJ0byI6ImFjdGl2ZVNjaGVkdWxlcyIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjoxMjE1LCJ5Ijo0ODAsIndpcmVzIjpbWyJjYzc1M2EzNDYwMmRhZjcwIl1dLCJsIjpmYWxzZX0seyJpZCI6ImNjNzUzYTM0NjAyZGFmNzAiLCJ0eXBlIjoibGluayBvdXQiLCJ6IjoiZjU1OWNmMGViNGVjYTExYyIsImciOiJmM2ZmNTMzMTY5OGUxNzUwIiwibmFtZSI6ImxpbmstcmV0dXJuIiwibW9kZSI6InJldHVybiIsImxpbmtzIjpbXSwieCI6MTI2NSwieSI6NDgwLCJ3aXJlcyI6W119LHsiaWQiOiJlNGIwY2I1ZGJmMWZjYmNjIiwidHlwZSI6InN3aXRjaCIsInoiOiJmNTU5Y2YwZWI0ZWNhMTFjIiwiZyI6ImYzZmY1MzMxNjk4ZTE3NTAiLCJuYW1lIjoiIiwicHJvcGVydHkiOiJfbGlua1NvdXJjZSIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiaXN0eXBlIiwidiI6ImFycmF5IiwidnQiOiJhcnJheSJ9XSwiY2hlY2thbGwiOiJ0cnVlIiwicmVwYWlyIjpmYWxzZSwib3V0cHV0cyI6MSwieCI6MTE2NSwieSI6NDgwLCJ3aXJlcyI6W1siYWJhM2UwZjdkZTdjNmY1NCJdXSwibCI6ZmFsc2V9LHsiaWQiOiJhMWMxMjQwNGY3MjZiMDJmIiwidHlwZSI6ImxpbmsgaW4iLCJ6IjoiZjU1OWNmMGViNGVjYTExYyIsImciOiJmM2ZmNTMzMTY5OGUxNzUwIiwibmFtZSI6ImxpbmsgaW4gMTIiLCJsaW5rcyI6WyJmZTUxYWFiYTkwMzYxMmViIl0sIngiOjExMDUsInkiOjQ4MCwid2lyZXMiOltbImU0YjBjYjVkYmYxZmNiY2MiXV19XQ=="
---
::



If you need to see the dynamic schedules of a specific node, double-click on it and click on the 'Dynamic Schedules' button from the configuration panel. This will show all of the dynamic schedules associated with that node.

![Image showing the 'Dynamic Schedules' button and the list of all dynamically scheduled events.](/blog/2025/05/images/dynamic-schedules-list.gif){data-zoomable}
_Image showing the 'Dynamic Schedules' button and the list of all dynamically scheduled events._

As you can see, creating flexible and dynamic cron schedules Node-RED can give you complete control over your automation tasks. Whether it's simple, recurring events, or complex, time-sensitive triggers, the combination of cron expressions and dynamic controls allows for smarter, more efficient workflows.

Take some time to explore these features and experiment with your own schedules. The more you play around with them, the better you'll understand how to tailor your flows to meet your exact needs.

Thanks for reading, and happy automating! If you run into any questions or need assistance along the way, don’t hesitate to reach out. We’re here to help!

If you’re using Node-RED in your production environment, it’s important to keep your instances organized, scalable, and secure. FlowFuse can help with that by making it easier to manage and maintain your Node-RED setup, while also supporting faster deployment, scaling, and improved security.

[Contact us](/contact-us/) now to learn more.

## Wrapping Up

Designing flexible and intelligent schedules is a key part of building robust automation with Node-RED. Whether you’re triggering actions based on time, solar events, or dynamic runtime conditions, the cron-plus node gives you a powerful set of tools to fine-tune when your flows should run.

By combining these scheduling techniques with the management features of FlowFuse, you can confidently build and operate reliable automation systems at any scale.
