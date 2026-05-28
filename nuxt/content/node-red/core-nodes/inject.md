---
title: "Node-RED - Inject Node"
description: "Guide on the Node-RED core node that injects a message into a flow"
---
# Inject

Triggers flows by injecting messages manually or automatically.

## Where and why do we use the Inject node?

The Inject node starts flows either manually by clicking the button on its left side or automatically on a schedule. This makes it essential for testing and debugging flows, triggering automated tasks, initializing system state on startup, or running periodic data processing jobs. It's often the first node in a flow, providing the initial message that kicks off the entire process.

## Modes of operation

The Inject node can trigger flows in several different ways:

### Manual Trigger

Click the button on the left side of the node to send a message on demand. This is the most common mode for testing, debugging, or manually initiating processes. The message can contain any configured payload and properties.

### On Startup

Configure the node to inject a message automatically when Node-RED starts or when flows are deployed. This is useful for initializing flow state, setting default values, or starting background processes. You can add a delay before the injection occurs. When configured to inject once on start, a small '1' appears after the label inside the node.

### Interval

Send messages repeatedly at a fixed time interval. Set the interval in seconds, minutes, hours, or days. The interval must be greater than 1 and less than 2^31. When the repeat value is 0 or below, Node-RED will not display an error but the interval won't function.

### Scheduled

Inject messages at specific times using cron-like scheduling. This allows complex schedules like "every Monday at 9am" or "the first day of each month at midnight". Make sure to set the correct timezone in the [editor settings](/docs/user/instance-settings/#editor).

## How the node handles messages

The Inject node creates a new message object with configured properties. By default, it sets `msg.payload` to the current timestamp and `msg.topic` to an empty string, but you can configure any message properties.

Message properties can be set to:
- Static values (strings, numbers, booleans, JSON objects)
- Flow or global context variables
- Environment variables
- JSONata expressions for dynamic values
- Current timestamp
- Empty values

The node can set multiple message properties at once, allowing you to construct complete message objects that subsequent nodes need.

## Examples

### Inject on Node-RED start

To setup state when starting Node-RED, the inject node can be set to trigger a flow once with minimal delay. This example injects a timestamp immediately after deployment or restart.



::render-flow
---
height: 200
flow: "W3siaWQiOiI3M2NjNTEwYmVlNjg2MDBmIiwidHlwZSI6ImluamVjdCIsInoiOiI4MDk4N2YyNzc4NTI0NWE3IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOnRydWUsIm9uY2VEZWxheSI6IjAuMSIsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjE5MCwieSI6MjAwLCJ3aXJlcyI6W1siN2Y4M2JmMjRiZGY3YmM2OCJdXX0seyJpZCI6IjdmODNiZjI0YmRmN2JjNjgiLCJ0eXBlIjoiZGVidWciLCJ6IjoiODA5ODdmMjc3ODUyNDVhNyIsIm5hbWUiOiJPdXRwdXQgb25jZSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjozNzAsInkiOjIwMCwid2lyZXMiOltdfV0="
---
::



### Run a flow daily at midnight

By selecting "at a specific time" in the Repeat section, the inject node can generate a message at set times. This example triggers at 23:59 (11:59 PM) every day, useful for daily data processing tasks.



::render-flow
---
height: 200
flow: "W3siaWQiOiI5OThlODQ0YTdlNTBlMjc1IiwidHlwZSI6ImluamVjdCIsInoiOiI4MDk4N2YyNzc4NTI0NWE3IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IjU5IDIzICogKiAqIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6IjAiLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjoxOTAsInkiOjMyMCwid2lyZXMiOltbIjFlODBmNTIyOTUxNmU5MTAiXV19LHsiaWQiOiIxZTgwZjUyMjk1MTZlOTEwIiwidHlwZSI6ImRlYnVnIiwieiI6IjgwOTg3ZjI3Nzg1MjQ1YTciLCJuYW1lIjoiT3V0cHV0IGRhaWx5IGF0IG5pZ2h0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjQwMCwieSI6MzIwLCJ3aXJlcyI6W119XQ=="
---
::



### Inject a static string

The Inject node can set the payload to static data like strings, numbers, or JSON objects. This example injects the string "Hello FlowFuse!" when triggered manually.



::render-flow
---
height: 200
flow: "W3siaWQiOiJjMDQ1MWUxNGY2YjdlZmYwIiwidHlwZSI6ImluamVjdCIsInoiOiI4MDk4N2YyNzc4NTI0NWE3IiwibmFtZSI6IkluamVjdCBhIHN0cmluZyIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiSGVsbG8gRmxvd0Z1c2UhIiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4IjoxOTAsInkiOjI4MCwid2lyZXMiOltbIjlmYmQ4YTBhOWQyMTU2MmEiXV19LHsiaWQiOiI5ZmJkOGEwYTlkMjE1NjJhIiwidHlwZSI6ImRlYnVnIiwieiI6IjgwOTg3ZjI3Nzg1MjQ1YTciLCJuYW1lIjoiT3V0cHV0IFwiSGVsbG8gRmxvd0Z1c2VcIiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo0MTAsInkiOjI4MCwid2lyZXMiOltdfV0="
---
::



## Node Documentation

<div class="core-node-doc">

<p>Injects a message into a flow either manually or at regular intervals. The message
payload can be a variety of types, including strings, JavaScript objects or the current time.</p> <h3>Outputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">various</span></dt>
<dd>The configured payload of the message.</dd>
<dt class="optional">topic <span class="property-type">string</span></dt>
<dd>An optional property that can be configured in the node.</dd>
</dl> <h3>Details</h3> <p>The Inject node can initiate a flow with a specific payload value.
The default payload is a timestamp of the current time in millisecs since January 1st, 1970.</p> <p>The node also supports injecting strings, numbers, booleans, JavaScript objects, or flow/global context values.</p> <p>By default, the node is triggered manually by clicking on its button within the editor. It can also be set to
inject at regular intervals or according to a schedule.</p> <p>It can also be configured to inject once each time the flows are started.</p> <p>The maximum <i>Interval</i> that can be specified is about 596 hours / 24 days. However if you are looking at intervals
greater than one day you should consider using a scheduler node that can cope with power outages and restarts.</p> <p><b>Note</b>: The <i>"Interval between times"</i> and <i>"at a specific time"</i> options use the standard cron system.
This means that 20 minutes will be at the next hour, 20 minutes past and 40 minutes past - not in 20 minutes time.
If you want every 20 minutes from now - use the <i>"interval"</i> option.</p> <p><b>Note</b>: To include a newline in a string you must use the Function or Template node to create the payload.</p>

</div>