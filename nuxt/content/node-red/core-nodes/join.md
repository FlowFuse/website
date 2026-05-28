---
title: "Node-RED - Join Node"
---
# Join

Joins sequences of messages into a single message.

## Where and why do we use the Join node?

The Join node combines multiple messages into one. It's the counterpart to the Split node and can automatically reverse a split operation, or you can configure it to merge messages from different sources based on specific rules. This is essential when you need to aggregate data from multiple sources, reassemble split sequences, or reduce message streams into summary values.

## Modes of operation

The Join node operates in three different modes, each suited for different use cases.

### Automatic Mode

When paired with the Split node, automatically joins messages to reverse the split that was performed. Uses the `msg.parts` property of incoming messages to determine how the sequence should be joined.

The `msg.parts` property should contain:
- **id** - identifier for the message group
- **index** - position within the group
- **count** - total number of messages in the group
- **type** - the message type (string, array, object, or buffer)
- **ch** - for strings or buffers, the delimiter used to split
- **key** - for objects, the property key this message came from
- **len** - the length when split using fixed length

### Manual Mode

Configure how to join sequences by selecting which message property to join and choosing the output format:
- **String or buffer** - joins the selected property with specified join characters or buffer
- **Array** - adds each selected property or entire message to an output array
- **Key/value object** - uses a property of each message as the key for storing the required value
- **Merged object** - merges the property of each message under a single object

You can define when to send the combined message:
- After a specific number of message parts
- After a timeout following the first message
- After receiving a message with `msg.complete` property set

### Reduce Sequence Mode

Applies a JSONata expression to each message in a sequence and accumulates the result to produce a single message. This is useful for calculations like sums, averages, or any custom aggregation logic.

The reduce expression runs for each message with special variables available:
- `$A` - the accumulated value
- `$I` - index of the message in the sequence
- `$N` - number of messages in the sequence

An optional fix-up expression can be applied after all messages have been processed to perform final calculations.

## How the node handles messages

The Join node buffers messages internally to work across sequences. The Node-RED runtime setting `nodeMessageBufferMaxLength` limits how many messages can be buffered to prevent memory issues.

If you send a message with the `msg.reset` property set, the node clears the partly complete message without sending it and resets any part counts. When using manual mode with timeout, send a message with `msg.restartTimeout` set to restart the timeout.

For manual mode, the other properties of the output message come from the last message received before sending.

## Examples

### Automatic mode

This example shows automatic mode. The Split node breaks an array into individual messages, then Join automatically reassembles them back into the original array.



::render-flow
---
height: 200
flow: "W3siaWQiOiJiNWVhNmQyYS42ZTdiYiIsInR5cGUiOiJ0YWIiLCJsYWJlbCI6Im9wZW5WYWx2ZSIsImRpc2FibGVkIjpmYWxzZSwiaW5mbyI6IiJ9LHsiaWQiOiI4NGVkMjI3NTUyYjRlNmViIiwidHlwZSI6ImpvaW4iLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwibW9kZSI6ImF1dG8iLCJidWlsZCI6Im9iamVjdCIsInByb3BlcnR5IjoicGF5bG9hZCIsInByb3BlcnR5VHlwZSI6Im1zZyIsImtleSI6InRvcGljIiwiam9pbmVyIjoiXFxuIiwiam9pbmVyVHlwZSI6InN0ciIsImFjY3VtdWxhdGUiOnRydWUsInRpbWVvdXQiOiIiLCJjb3VudCI6IjMiLCJyZWR1Y2VSaWdodCI6ZmFsc2UsInJlZHVjZUV4cCI6IiIsInJlZHVjZUluaXQiOiIiLCJyZWR1Y2VJbml0VHlwZSI6Im51bSIsInJlZHVjZUZpeHVwIjoiIiwieCI6NTkwLCJ5IjozMDAsIndpcmVzIjpbWyJmMmRiYTI4NWQ3YTA2N2NkIl1dfSx7ImlkIjoiNTIyYjRlMjQ3ZTg0YWMwZSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiU2VuZCBhcnJheSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiWyAgIHsgICAgIFwiaWRcIjogMSwgICAgIFwidGFza1wiOiBcIkNvbXBsZXRlIHByb2plY3QgcHJvcG9zYWxcIiwgICAgIFwiY29tcGxldGVkXCI6IGZhbHNlICAgfSwgICB7ICAgICBcImlkXCI6IDIsICAgICBcInRhc2tcIjogXCJSZXZpZXcgcHJlc2VudGF0aW9uIHNsaWRlc1wiLCAgICAgXCJjb21wbGV0ZWRcIjogdHJ1ZSAgIH0sICAgeyAgICAgXCJpZFwiOiAzLCAgICAgXCJ0YXNrXCI6IFwiUHJlcGFyZSBmb3IgY2xpZW50IG1lZXRpbmdcIiwgICAgIFwiY29tcGxldGVkXCI6IGZhbHNlICAgfSBdIiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MjIwLCJ5IjozMDAsIndpcmVzIjpbWyIzNTFlOThhNTVlNWE1MGM2Il1dfSx7ImlkIjoiZjJkYmEyODVkN2EwNjdjZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiNWVhNmQyYS42ZTdiYiIsIm5hbWUiOiJkZWJ1ZyAxIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6MzAwLCJ3aXJlcyI6W119LHsiaWQiOiJkNDdhNWVkYjJkNWQ1YjcwIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiSm9pbmluZyB0aGUgbWVzc2FnZXMgdG8gcmV2ZXJzZSB0aGUgc3BsaXQgdGhhdCB3YXMgcGVyZm9ybWVkLiIsImluZm8iOiIiLCJ4Ijo1MDAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiMzUxZTk4YTU1ZTVhNTBjNiIsInR5cGUiOiJzcGxpdCIsInoiOiJiNWVhNmQyYS42ZTdiYiIsIm5hbWUiOiIiLCJzcGx0IjoiXFxuIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOjEsImFycmF5U3BsdFR5cGUiOiJsZW4iLCJzdHJlYW0iOmZhbHNlLCJhZGRuYW1lIjoiIiwieCI6NDEwLCJ5IjozMDAsIndpcmVzIjpbWyI4NGVkMjI3NTUyYjRlNmViIl1dfV0="
---
::



### Manual mode

Here manual mode combines three separate sensor readings into one object. Each message has a different `msg.topic` (temperature, humidity, pressure) and those topics become the keys in the output object.



::render-flow
---
height: 200
flow: "W3siaWQiOiJiNWVhNmQyYS42ZTdiYiIsInR5cGUiOiJ0YWIiLCJsYWJlbCI6Im9wZW5WYWx2ZSIsImRpc2FibGVkIjpmYWxzZSwiaW5mbyI6IiJ9LHsiaWQiOiI4NGVkMjI3NTUyYjRlNmViIiwidHlwZSI6ImpvaW4iLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwibW9kZSI6ImN1c3RvbSIsImJ1aWxkIjoib2JqZWN0IiwicHJvcGVydHkiOiJwYXlsb2FkIiwicHJvcGVydHlUeXBlIjoibXNnIiwia2V5IjoidG9waWMiLCJqb2luZXIiOiJcXG4iLCJqb2luZXJUeXBlIjoic3RyIiwiYWNjdW11bGF0ZSI6dHJ1ZSwidGltZW91dCI6IiIsImNvdW50IjoiMyIsInJlZHVjZVJpZ2h0IjpmYWxzZSwicmVkdWNlRXhwIjoiIiwicmVkdWNlSW5pdCI6IiIsInJlZHVjZUluaXRUeXBlIjoibnVtIiwicmVkdWNlRml4dXAiOiIiLCJ4Ijo0OTAsInkiOjMwMCwid2lyZXMiOltbImYyZGJhMjg1ZDdhMDY3Y2QiXV19LHsiaWQiOiI1MjJiNGUyNDdlODRhYzBlIiwidHlwZSI6ImluamVjdCIsInoiOiJiNWVhNmQyYS42ZTdiYiIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6InRlbXBlcmF0dXJlIiwicGF5bG9hZCI6IjQwIiwicGF5bG9hZFR5cGUiOiJudW0iLCJ4IjoyNjAsInkiOjI0MCwid2lyZXMiOltbIjg0ZWQyMjc1NTJiNGU2ZWIiXV19LHsiaWQiOiIxMmU1NGU0MDY2YmFjN2EzIiwidHlwZSI6ImluamVjdCIsInoiOiJiNWVhNmQyYS42ZTdiYiIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6Imh1bWlkaXR5IiwicGF5bG9hZCI6IjMzIiwicGF5bG9hZFR5cGUiOiJudW0iLCJ4IjoyNzAsInkiOjMwMCwid2lyZXMiOltbIjg0ZWQyMjc1NTJiNGU2ZWIiXV19LHsiaWQiOiJiMDRkNGY1MWYwNjAyNjA3IiwidHlwZSI6ImluamVjdCIsInoiOiJiNWVhNmQyYS42ZTdiYiIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6InByZXNzdXJlIiwicGF5bG9hZCI6IjEwMDAiLCJwYXlsb2FkVHlwZSI6Im51bSIsIngiOjI3MCwieSI6MzYwLCJ3aXJlcyI6W1siODRlZDIyNzU1MmI0ZTZlYiJdXX0seyJpZCI6ImYyZGJhMjg1ZDdhMDY3Y2QiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3MjAsInkiOjMwMCwid2lyZXMiOltdfSx7ImlkIjoiZDQ3YTVlZGIyZDVkNWI3MCIsInR5cGUiOiJjb21tZW50IiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwibmFtZSI6IkNvbWJpbmluZyB0aHJlZSBwYXlsb2FkIGludG8gb25lIG9iamVjdCAiLCJpbmZvIjoiIiwieCI6NTIwLCJ5IjoxODAsIndpcmVzIjpbXX1d"
---
::



### Reduce sequence mode

This example uses reduce mode to calculate total inventory. The expression `$A+payload.quantity` adds each item's quantity to the running total, starting from 0.



::render-flow
---
height: 200
flow: "W3siaWQiOiJiNWVhNmQyYS42ZTdiYiIsInR5cGUiOiJ0YWIiLCJsYWJlbCI6Im9wZW5WYWx2ZSIsImRpc2FibGVkIjpmYWxzZSwiaW5mbyI6IiJ9LHsiaWQiOiI4NGVkMjI3NTUyYjRlNmViIiwidHlwZSI6ImpvaW4iLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwibW9kZSI6InJlZHVjZSIsImJ1aWxkIjoib2JqZWN0IiwicHJvcGVydHkiOiJwYXlsb2FkIiwicHJvcGVydHlUeXBlIjoibXNnIiwia2V5IjoidG9waWMiLCJqb2luZXIiOiJcXG4iLCJqb2luZXJUeXBlIjoic3RyIiwiYWNjdW11bGF0ZSI6dHJ1ZSwidGltZW91dCI6IiIsImNvdW50IjoiMyIsInJlZHVjZVJpZ2h0IjpmYWxzZSwicmVkdWNlRXhwIjoiJEErcGF5bG9hZC5xdWFudGl0eSIsInJlZHVjZUluaXQiOiIwIiwicmVkdWNlSW5pdFR5cGUiOiJudW0iLCJyZWR1Y2VGaXh1cCI6IiRBIiwieCI6NTkwLCJ5IjozMDAsIndpcmVzIjpbWyJmMmRiYTI4NWQ3YTA2N2NkIl1dfSx7ImlkIjoiNTIyYjRlMjQ3ZTg0YWMwZSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiU2VuZCBhcnJheSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiWyAgIHsgICAgIFwiaWRcIjogMSwgICAgIFwibmFtZVwiOiBcIkxhcHRvcFwiLCAgICAgXCJxdWFudGl0eVwiOiAxNSAgIH0sICAgeyAgICAgXCJpZFwiOiAyLCAgICAgXCJuYW1lXCI6IFwiUHJpbnRlclwiLCAgICAgXCJxdWFudGl0eVwiOiA1ICAgfSwgICB7ICAgICBcImlkXCI6IDMsICAgICBcIm5hbWVcIjogXCJNb25pdG9yXCIsICAgICBcInF1YW50aXR5XCI6IDEwICAgfSBdIiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MjIwLCJ5IjozMDAsIndpcmVzIjpbWyIzNTFlOThhNTVlNWE1MGM2Il1dfSx7ImlkIjoiZjJkYmEyODVkN2EwNjdjZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiNWVhNmQyYS42ZTdiYiIsIm5hbWUiOiJkZWJ1ZyAxIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6MzAwLCJ3aXJlcyI6W119LHsiaWQiOiJkNDdhNWVkYjJkNWQ1YjcwIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiQ2FsY3VsYXRpbmcgdG90YWwgc3RvY2tzIHVzaW5nIEpvaW4gbm9kZSByZWR1Y2VkIGV4cHJlc3Npb24gbW9kZSIsImluZm8iOiIiLCJ4Ijo1MTAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiMzUxZTk4YTU1ZTVhNTBjNiIsInR5cGUiOiJzcGxpdCIsInoiOiJiNWVhNmQyYS42ZTdiYiIsIm5hbWUiOiIiLCJzcGx0IjoiXFxuIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOjEsImFycmF5U3BsdFR5cGUiOiJsZW4iLCJzdHJlYW0iOmZhbHNlLCJhZGRuYW1lIjoiIiwieCI6NDEwLCJ5IjozMDAsIndpcmVzIjpbWyI4NGVkMjI3NTUyYjRlNmViIl1dfV0="
---
::



## Node Documentation

<div class="core-node-doc">

<p>Joins sequences of messages into a single message.</p> <p>There are three modes available:</p> <dl>
<dt>automatic</dt>
<dd>When paired with the <b>split</b> node, it will automatically join the messages to reverse the split that was performed.</dd>
<dt>manual</dt>
<dd>Join sequences of messages in a variety of ways.</dd>
<dt>reduce sequence</dt>
<dd>Apply an expression against all messages in a sequence to reduce it to a single message.</dd>
</dl> <h3>Inputs</h3> <dl class="message-properties">
<dt class="optional">parts<span class="property-type">object</span></dt>
<dd>To automatically join a sequence of messages, they should all have
this property set. The <b>split</b> node generates this property but it
can be manually created. It has the following properties:
<ul>
<li><code>id</code> - an identifier for the group of messages</li>
<li><code>index</code> - the position within the group</li>
<li><code>count</code> - the total number of messages in the group</li>
<li><code>type</code> - the type of message - string/array/object/buffer</li>
<li><code>ch</code> - for a string or buffer, the data used to the split the message as either the string or an array of bytes</li>
<li><code>key</code> - for an object, the key of the property this message was created from</li>
<li><code>len</code> - the length of each message when split using a fixed length value</li>
</ul>
</dd>
<dt class="optional">complete</dt>
<dd>If set, the node will append the payload, and then send the output message in its current state.
If you don't wish to append the payload, delete it from the msg.</dd>
<dt class="optional">reset</dt>
<dd>If set, the node will clear any partially complete message and not send it.</dd>
<dt class="optional">restartTimeout</dt>
<dd>If set, and the node has a timeout configured, that timeout will be restarted.</dd>
</dl> <h3>Details</h3> <h4>Automatic mode</h4> <p>Automatic mode uses the <code>parts</code> property of incoming messages to
determine how the sequence should be joined. This allows it to automatically
reverse the action of a <b>split</b> node.</p> <h4>Manual mode</h4> <p>When configured to join in manual mode, the node is able to join sequences
of messages into a number of different results:</p> <ul>
<li>a <b>string</b> or <b>buffer</b> - created by joining the selected property of each message with the specified join characters or buffer.</li>
<li>an <b>array</b> - created by adding each selected property, or entire message, to the output array.</li>
<li>a <b>key/value object</b> - created by using a property of each message to determine the key under which
the required value is stored.</li>
<li>a <b>merged object</b> - created by merging the property of each message under a single object.</li>
</ul> <p>The other properties of the output message are taken from the last message received before the result is sent.</p> <p>A <i>count</i> can be set for how many messages should be received before generating the output message.
For object outputs, once this count has been reached, the node can be configured to send a message for each subsequent message
received.</p> <p>A <i>timeout</i> can be set to trigger sending the new message using whatever has been received so far.
This timeout can be restarted by sending a message with the <code>msg.restartTimeout</code> property set.</p> <p>If a message is received with the <code>msg.complete</code> property set, the output message is finalised and sent.
This resets any part counts.</p> <p>If a message is received with the <code>msg.reset</code> property set, the partly complete message is deleted and not sent.
This resets any part counts.</p> <h4>Reduce Sequence mode</h4> <p>When configured to join in reduce mode, an expression is applied to each
message in a sequence and the result accumulated to produce a single message.</p> <dl class="message-properties">
<dt>Initial value</dt>
<dd>The initial value of the accumulated value (<code>$A</code>).</dd>
<dt>Reduce expression</dt>
<dd>A JSONata expression that is called for each message in the sequence.
The result is passed to the next call of the expression as the accumulated value.
In the expression, the following special variables can be used:
<ul>
<li><code>$A</code>: the accumulated value, </li>
<li><code>$I</code>: index of the message in the sequence, </li>
<li><code>$N</code>: number of messages in the sequence.</li>
</ul>
</dd>
<dt>Fix-up expression</dt>
<dd>An optional JSONata expression that is applied after the reduce expression
has been applied to all messages in the sequence.
In the expression, following special variables can be used:
<ul>
<li><code>$A</code>: the accumulated value, </li>
<li><code>$N</code>: number of messages in the sequence.</li>
</ul>
</dd>
<p>By default, the reduce expression is applied in order, from the first
to the last message of the sequence. It can optionally be applied in
reverse order.</p>
<p>$N is the number of messages that arrive - even if they are identical.</p>
</dl> <p><b>Example:</b> the following settings, given a sequence of numeric values,
calculates the average value:
<ul>
<li><b>Reduce expression</b>: <code>$A+payload</code></li>
<li><b>Initial value</b>: <code>0</code></li>
<li><b>Fix-up expression</b>: <code>$A/$N</code></li>
</ul>
</p> <h4>Storing messages</h4> <p>This node will buffer messages internally in order to work across sequences. The
runtime setting <code>nodeMessageBufferMaxLength</code> can be used to limit how many messages nodes
will buffer.</p>

</div>