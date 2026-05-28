---
title: "Node-RED - Delay Node"
---
# Delay

## What's the Delay node in Node-RED used for?

The Delay node allows you to introduce a delay in the flow of messages between nodes. It can be useful in various scenarios where you need to control the timing of message processing. For example, the delay node can limit the rate at which messages are processed downstream or throttle the flow of messaging. Both can be useful for interacting with external systems that may have limitations in place. 

Here are some other use cases for using the Delay node:

**Batch Processing**: If you're dealing with a stream of incoming data that you want to process in batches, you can use the Delay node to introduce a delay between groups of messages. This can be helpful when you need to aggregate or analyze data in chunks.

**Sequential Processing**: Sometimes you need to ensure that messages are processed in a specific order. The Delay node can be used to enforce a sequence of message processing, especially when dealing with asynchronous systems that might not guarantee order.

**Simulation and Testing**: In testing and simulation scenarios, you might want to mimic real-world timing conditions. The Delay node can help you introduce delays that simulate actual conditions, allowing you to test how your system behaves over time.

**Time-based Triggers**: You can use the Delay node to trigger actions at specific time intervals. For instance, you might want to send a status update every hour or perform a cleanup task at the end of the day.

**Circuit Breaker**: The Delay node can be employed as a simple form of circuit breaker. If a downstream system is failing or experiencing issues, you can introduce a delay before retrying, giving the system some time to recover.


## Examples for the Delay node

An example of using the Delay node to rate limit http request to an external API.

![Delay node properties](/node-red/core-nodes/images/delay-node-2.png)



::render-flow
---
height: 200
flow: "W3siaWQiOiIxZjgyNWFmYy44NjZlZmMiLCJ0eXBlIjoiZGVsYXkiLCJ6IjoiZTkyZmI2YzNiMzA0ZmQ3YyIsIm5hbWUiOiJSYXRlIExpbWl0IiwicGF1c2VUeXBlIjoicmF0ZSIsInRpbWVvdXQiOiIyMCIsInRpbWVvdXRVbml0cyI6InNlY29uZHMiLCJyYXRlIjoiMTAiLCJuYlJhdGVVbml0cyI6IiIsInJhdGVVbml0cyI6Im1pbnV0ZSIsInJhbmRvbUZpcnN0IjoiMSIsInJhbmRvbUxhc3QiOiI1IiwicmFuZG9tVW5pdHMiOiJzZWNvbmRzIiwiZHJvcCI6ZmFsc2UsImFsbG93cmF0ZSI6ZmFsc2UsIm91dHB1dHMiOjEsIngiOjYyMCwieSI6MTIwLCJ3aXJlcyI6W1siMjZmMWYwZTMuNjVlM2M4Il1dfV0="
---
::



### Reset the queue for the delay node

The Delay node might create a queue that will continue their journey to the connected output nodes.
There's situations however where the queue needs to be cleared. This is done by resetting the queue.
When a `reset` property is set, the queue will be empty.

This is useful for when the lack of an event might need to send a notification. Schedule the notification
to be sent but allow a positive event to cancel the notification. In the example below; say you want to turn off the lights if no movement was detected for a period of time, you set the delay node to that time. When there's motion detected, you than send a `msg.reset` message to the delay node to cancel them turning of the light. This depends on an inject node set to [send a message on an interval](/node-red/core-nodes/inject/#run-a-flow-daily-at-midnight) to turn the lights off.



::render-flow
---
height: 200
flow: "W3siaWQiOiIwNmI5MzE1N2ZmMDdjOWIxIiwidHlwZSI6ImRlbGF5IiwieiI6ImU1MTIwMDNkZjNjOTcxYzciLCJuYW1lIjoiIiwicGF1c2VUeXBlIjoiZGVsYXkiLCJ0aW1lb3V0IjoiNSIsInRpbWVvdXRVbml0cyI6InNlY29uZHMiLCJyYXRlIjoiMSIsIm5iUmF0ZVVuaXRzIjoiMSIsInJhdGVVbml0cyI6InNlY29uZCIsInJhbmRvbUZpcnN0IjoiMSIsInJhbmRvbUxhc3QiOiI1IiwicmFuZG9tVW5pdHMiOiJzZWNvbmRzIiwiZHJvcCI6ZmFsc2UsImFsbG93cmF0ZSI6ZmFsc2UsIm91dHB1dHMiOjEsIngiOjQ2MCwieSI6MTAwLCJ3aXJlcyI6W1siZjM0NWM5MDJkMDlhYWY3NiJdXX0seyJpZCI6IjE5NjVlNTg1NjI5NDNkNjkiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImU1MTIwMDNkZjNjOTcxYzciLCJuYW1lIjoiTW90aW9uIGRldGVjdGVkIiwicHJvcHMiOlt7InAiOiJyZXNldCIsInYiOiJ0cnVlIiwidnQiOiJib29sIn1dLCJyZXBlYXQiOiI1IiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyNTAsInkiOjE2MCwid2lyZXMiOltbIjA2YjkzMTU3ZmYwN2M5YjEiXV19LHsiaWQiOiJmMzQ1YzkwMmQwOWFhZjc2IiwidHlwZSI6ImRlYnVnIiwieiI6ImU1MTIwMDNkZjNjOTcxYzciLCJuYW1lIjoiTmV2ZXIgcmVjZWl2ZSBhIG1lc3NhZ2UiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjcwLCJ5IjoxMDAsIndpcmVzIjpbXX0seyJpZCI6IjgzNGYwODEyYTAxYmU3YTQiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImU1MTIwMDNkZjNjOTcxYzciLCJuYW1lIjoiVHVybiBvZmYgbGlnaHRzIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIxMCIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjI2MCwieSI6MTAwLCJ3aXJlcyI6W1siMDZiOTMxNTdmZjA3YzliMSJdXX1d"
---
::




## Node Documentation

<div class="core-node-doc">

<p>Delays each message passing through the node or limits the rate at which they can pass.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt class="optional">delay <span class="property-type">number</span></dt>
<dd>Sets the delay, in milliseconds, to be applied to the message. This
option only applies if the node is configured to allow the message to
override the configured default delay interval.</dd>
<dt class="optional">rate <span class="property-type">number</span></dt>
<dd>Sets the rate value in milliseconds between messages.
This node overwrites the existing rate value defined in the node configuration
when it receives the message which contains <code>msg.rate</code> value in milliSeconds.
This option only applies if the node is configured to allow the message to
override the configured default rate interval.</dd>
<dt class="optional">reset</dt>
<dd>If the received message has this property set to any value, all
outstanding messages held by the node are cleared without being sent.</dd>
<dt class="optional">flush</dt>
<dd>If the received message has this property set to a numeric value then that many messages
will be released immediately. If set to any other type (e.g. boolean), then all
outstanding messages held by the node are sent immediately.</dd>
<dt class="optional">toFront</dt>
<dd>When in rate limit mode, if the received message has this property set to boolean <code>true</code>,
then the message is pushed to the front of the queue and will be released next.
This can be used in combination with <code>msg.flush=1</code> to resend immediately.
</dd>
</dl> <h3>Details</h3> <p>When configured to delay messages, the delay interval can be a fixed value,
a random value within a range or dynamically set for each message.
Each message is delayed independently of any other message, based on
the time of its arrival.
</p> <p>When configured to rate limit messages, their delivery is spread across
the configured time period. The status shows the number of messages currently in the queue.
It can optionally discard intermediate messages as they arrive.</p> <p>If set to allow override of the rate, the new rate will be applied immediately,
and will remain in effect until changed again, the node is reset, or the flow is restarted.</p> <p>The rate limiting can be applied to all messages, or group them according to
their <code>msg.topic</code> value. When grouping, intermediate messages are
automatically dropped. At each time interval, the node can either release
the most recent message for all topics, or release the most recent message
for the next topic.
</p> <p><b>Note</b>: In rate limit mode the maximum queue depth can be set by a property in your
<i>settings.js</i> file. For example <code>nodeMessageBufferMaxLength: 1000,</code></p>

</div>