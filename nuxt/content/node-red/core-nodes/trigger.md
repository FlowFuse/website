---
title: "Node-RED - Trigger Node"
---
# Trigger

## What is the Trigger Node in Node-RED?

The Trigger node in Node-RED facilitates the initiation and repetition of messages at customizable intervals, offering precise control over when messages are sent, their recurrence frequency, and optional delays. This functionality is valuable for automating tasks and efficiently managing communication flow within Node-RED flows.

## Inject Node Vs Trigger Node

The Inject node lets you send messages at specific intervals but it starts immediately and continues indefinitely unless manually configured to stop. With the Trigger node, you have control over when the node starts and stops sending messages. Nonetheless, both nodes possess distinct use cases and limitations.

## Configuring the Trigger Node

- **Send:** Message to be passed to subsequent nodes.

- **Then:**
  - **Wait For:** Allows sending a message when triggered and then optionally a second message. You can also set it to send nothing when triggered or for the second message.
    - **Extend Delay if New Message Arrives:** Enabling this option will extend the delay time if a new message is received.
    - **Then Send:** Allows setting the second message to be sent after a specific delay, or you can set it to send nothing.
    - **Send Second Message to Separate Output:** Enabling this option will add a second output to receive the second message from the trigger node.
  - **Resend it Every:** Allows resending a message at specific intervals of time.
  - **Wait to be Reset:** Selecting this option will send a message once when triggered and will wait until it is reset. If not reset, it will not send any message with the same property specified in **handling** config property. If **all messages** are selected, it will not send any message if not reset.

- **Reset the Trigger if:** Allows setting msg.payload that, when received, will reset the trigger node. Alternatively, sending a message containing a reset property will reset the node (which is the default behavior).
   
- **Override Delay with `msg.delay`:** Enabling this option will allow sending the delay time dynamically with the `msg.delay`. The value must be provided in milliseconds.
- **Handling:** Allows configuring the node to treat messages as separate streams, using a `msg` property to identify each stream. Selecting "All Messages" will handle all types of messages separately.

## Trigger node Use cases:

- Repetitive Tasks: If you have tasks that need to be repeated at regular intervals, such as data polling or device status checks when triggered, the Trigger node can handle this by configuring it to resend messages at specified time intervals.

- Timeout Handling: You can utilize the Trigger node to manage timeouts within your flow. For example, you could trigger an action if a response is not received within a certain time frame, or set up a timeout mechanism for user interactions.

- Resource Conservation: The Trigger node can conserve energy or system resources by automatically initiating actions, such as turning off lights or closing valves, after a predefined period of inactivity or completion of a task

## Examples

1. In the example flow below, we've simulated a door lock system. We employ an inject node to input a password, which is then verified against a specified password in a switch node. If the input password is correct, a trigger node sends a payload to open the door. After 4 seconds, a second message is sent to close the door. This can also be utilized for scenarios involving turning an LED on and off.



::render-flow
---
height: 200
flow: "W3siaWQiOiIzOTMzM2MwNTU4MjhiMTM4IiwidHlwZSI6ImluamVjdCIsInoiOiIzOWQwMjlmOGJiMjZiODIwIiwibmFtZSI6InN3YXAgY2FyZCIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoicGFzczEyMyIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MjAwLCJ5IjoyNDAsIndpcmVzIjpbWyI3ZmVjMjMzM2I5MjlkNDI0Il1dfSx7ImlkIjoiNmU2YmMxODQxMTkwNjVmYyIsInR5cGUiOiJ0cmlnZ2VyIiwieiI6IjM5ZDAyOWY4YmIyNmI4MjAiLCJuYW1lIjoiIiwib3AxIjoib3BlbmluZyBkb29yIiwib3AyIjoiY2xvc2luZyBkb29yIiwib3AxdHlwZSI6InN0ciIsIm9wMnR5cGUiOiJzdHIiLCJkdXJhdGlvbiI6IjQiLCJleHRlbmQiOmZhbHNlLCJvdmVycmlkZURlbGF5IjpmYWxzZSwidW5pdHMiOiJzIiwicmVzZXQiOiIiLCJieXRvcGljIjoiYWxsIiwidG9waWMiOiJ0b3BpYyIsIm91dHB1dHMiOjEsIngiOjU0MCwieSI6MjQwLCJ3aXJlcyI6W1siZDBjY2QxZTdkZDllMzEzYSJdXX0seyJpZCI6IjdmZWMyMzMzYjkyOWQ0MjQiLCJ0eXBlIjoic3dpdGNoIiwieiI6IjM5ZDAyOWY4YmIyNmI4MjAiLCJuYW1lIjoiIiwicHJvcGVydHkiOiJwYXlsb2FkIiwicHJvcGVydHlUeXBlIjoibXNnIiwicnVsZXMiOlt7InQiOiJlcSIsInYiOiJwYXNzMTIzIiwidnQiOiJzdHIifV0sImNoZWNrYWxsIjoidHJ1ZSIsInJlcGFpciI6ZmFsc2UsIm91dHB1dHMiOjEsIngiOjM1MCwieSI6MjQwLCJ3aXJlcyI6W1siNmU2YmMxODQxMTkwNjVmYyJdXX0seyJpZCI6ImQwY2NkMWU3ZGQ5ZTMxM2EiLCJ0eXBlIjoiZGVidWciLCJ6IjoiMzlkMDI5ZjhiYjI2YjgyMCIsIm5hbWUiOiJkZWJ1ZyAxIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6MjQwLCJ3aXJlcyI6W119LHsiaWQiOiI1NjYyMjc0ZTMxNmQ5MzE3IiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiMzlkMDI5ZjhiYjI2YjgyMCIsIm5hbWUiOiJTaW11bGF0aW5nIGEgZG9vciBsb2NrIHN5c3RlbSB3aGVyZSBlbnRlcmluZyB0aGUgY29ycmVjdCBwYXNzd29yZCB3aWxsIG9wZW4gdGhlIGRvb3IgZm9yIDUgc2Vjb25kcyBhbmQgdGhlbiB3aWxsIGNsb3NlLiIsImluZm8iOiIiLCJ4Ijo0ODAsInkiOjE0MCwid2lyZXMiOltdfV0="
---
::



2. In the example flow below, we have a trigger node polling data continuously from an API. It polls data at specific interval when a message is received and stops if a message is received with the property of 'reset'. This can also be used in scenarios where you want to read sensor data with custom control. 



::render-flow
---
height: 200
flow: "W3siaWQiOiJlNjgyYjQ4ZWVhMzhjMzE5IiwidHlwZSI6ImluamVjdCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IlN0YXJ0IHBvbGxpbmciLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjE3MCwieSI6MjAwLCJ3aXJlcyI6W1siYjlhZTU0NjUyMjZlYWUzYSJdXX0seyJpZCI6IjVlYjY0OThiNDQ3ZTU1Y2QiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiU3RvcCBwb2xsaW5nIiwicHJvcHMiOlt7InAiOiJyZXNldCIsInYiOiIiLCJ2dCI6ImRhdGUifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MTcwLCJ5IjozNDAsIndpcmVzIjpbWyJiOWFlNTQ2NTIyNmVhZTNhIl1dfSx7ImlkIjoiODBhZDA2OTUyZjZkY2FlNyIsInR5cGUiOiJodHRwIHJlcXVlc3QiLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiIiLCJtZXRob2QiOiJHRVQiLCJyZXQiOiJ0eHQiLCJwYXl0b3FzIjoiaWdub3JlIiwidXJsIjoiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLyIsInRscyI6IiIsInBlcnNpc3QiOmZhbHNlLCJwcm94eSI6IiIsImluc2VjdXJlSFRUUFBhcnNlciI6ZmFsc2UsImF1dGhUeXBlIjoiIiwic2VuZGVyciI6ZmFsc2UsImhlYWRlcnMiOltdLCJ4Ijo2OTAsInkiOjI4MCwid2lyZXMiOltbIjYxODJmZDlkYjFhOTI3MGEiXV19LHsiaWQiOiJiOWFlNTQ2NTIyNmVhZTNhIiwidHlwZSI6InRyaWdnZXIiLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiIiLCJvcDEiOiIxIiwib3AyIjoiMCIsIm9wMXR5cGUiOiJzdHIiLCJvcDJ0eXBlIjoic3RyIiwiZHVyYXRpb24iOiItNTAwIiwiZXh0ZW5kIjpmYWxzZSwib3ZlcnJpZGVEZWxheSI6ZmFsc2UsInVuaXRzIjoibXMiLCJyZXNldCI6IiIsImJ5dG9waWMiOiJhbGwiLCJ0b3BpYyI6InRvcGljIiwib3V0cHV0cyI6MSwieCI6NDQwLCJ5IjoyODAsIndpcmVzIjpbWyI4MGFkMDY5NTJmNmRjYWU3Il1dfSx7ImlkIjoiNjE4MmZkOWRiMWE5MjcwYSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6ImRlYnVnIDIiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTAwLCJ5IjoyODAsIndpcmVzIjpbXX0seyJpZCI6IjA0ODkzZjg2ZmJmMDZkZWUiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IlBvbGxpbmcgZGF0YSBmcm9tIEFQSSB3aXRoIGNvbnRyb2wgdG8gc3RhcnQgYW5kIHN0b3AiLCJpbmZvIjoiIiwieCI6NTYwLCJ5IjoyMDAsIndpcmVzIjpbXX1d"
---
::






## Node Documentation

<div class="core-node-doc">

<p>When triggered, can send a message, and then optionally a second message, unless extended or reset.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt class="optional">delay <span class="property-type">number</span></dt>
<dd>Sets the delay, in milliseconds, to be applied to the message. This option only applies if the node is configured to allow the message to override the configured default delay interval.</dd>
<dt class="optional">reset</dt>
<dd>If a message is received with this property, any timeout or repeat
currently in progress will be cleared and no message triggered.</dd>
</dl> <h3>Details</h3> <p>This node can be used to create a timeout within a flow. By default, when
it receives a message, it sends on a message with a <code>payload</code> of <code>1</code>.
It then waits 250ms before sending a second message with a <code>payload</code> of <code>0</code>.
This could be used, for example, to blink an LED attached to a Raspberry Pi GPIO pin.</p> <p>The payloads of each message sent can be configured to a variety of values, including
the option to not send anything. For example, setting the initial message to <i>nothing</i> and
selecting the option to extend the timer with each received message, the node will
act as a watchdog timer; only sending a message if nothing is received within the
set interval.</p> <p>If set to a <i>string</i> type, the node supports the mustache template syntax.</p> <p>The delay between sending messages can be overridden by <code>msg.delay</code> if that option is enabled in the node. The value must be provided in milliseconds.</p> <p>If the node receives a message with a <code>reset</code> property, or a <code>payload</code>
that matches that configured in the node, any timeout or repeat currently in
progress will be cleared and no message triggered.</p> <p>The node can be configured to resend a message at a regular interval until it
is reset by a received message.</p> <p>Optionally, the node can be configured to treat messages as if they are separate streams,
using a msg property to identify each stream. Default <code>msg.topic</code>.</p> <p>The status indicates the node is currently active. If multiple streams are used the status
indicates the number of streams being held.</p>

</div>