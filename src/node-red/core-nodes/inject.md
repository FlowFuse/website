---
title: Inject
description: Starting a flow with a click of a button, on a schedule, or just once.
updated: git last modified
image: "/images/nodes/inject.png"
---
The Inject node is the beginning of many flows that are triggered manually. The box to the left of the node sends a message to connected nodes. For that reason it's often used for debugging too, to inject values at a point of chosing. The message item can be empty too. The message to send defaults to the timestamp as payload and an empty topic.

Flows can also be triggered once right after Node-RED starts the flows or with a delay. This is useful to set an initial state from a flow on boot.

An inject node can also start a flow based on a schedule. The schedules have capabilities mimicing cron. In the bottom section of the properties pane the repeat section one can select "at a specific time".

Repeating the measure on an interval is done by selecting "interval" in the "repeat" section. On a schedule requires an input higher than 1 and below 2^31. When the repeat value is 0 or below Node-RED will not display an error.

## Examples

### Inject on Node-RED start

To setup state when starting Node-RED, the inject node can be set to a zero delay to trigger a flow. When an Inject node is set to run only once, a small '1' is displayed after the label inside the node.

```json
[{"id":"73cc510bee68600f","type":"inject","z":"bed5c3b8210c7f12","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":true,"onceDelay":"0","topic":"","payload":"","payloadType":"date","x":410,"y":240,"wires":[[]]}]
```

### Run a flow daily at midnight

By selecting "at a specific" time in the Repeat section the inject node can generate a message at set times. Useful for data processing at set times.

Do set the correct timezone in the [editor settings](https://flowforge.com/docs/user/project-settings/#editor).

```json
[{"id":"998e844a7e50e275","type":"inject","z":"bed5c3b8210c7f12","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"59 23 * * *","once":false,"onceDelay":"0","topic":"","payload":"","payloadType":"date","x":410,"y":260,"wires":[[]]}]
```
