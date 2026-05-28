---
title: "Node-RED - Split Node"
---
# Split

Splits a message into a sequence of messages.

## Where and why do we use the Split node?

The Split node breaks one message into multiple messages. This is essential when you receive bulk data that needs individual processing. For example, a SQL query might return hundreds of rows, or an API might send multiple sensor readings in one payload. The Split node turns that single message into a stream of messages you can process one at a time.

## Modes of operation

The Split node's behavior depends on what type of data is in `msg.payload`:

### String/Buffer

Splits on a specified character (default is `\n` for newlines), a buffer sequence, or into fixed lengths. You can use spaces for words, commas for CSV data, or any character. Also supports multi-character strings and buffer sequences.

### Array

Splits into individual array elements, or into arrays of a fixed length. Useful when APIs have batch size limits and you need to chunk data into smaller groups.

### Object

Sends one message for each key-value pair. By default, the key name goes into `msg.topic` and the value goes into `msg.payload`.

## How the node handles messages

Each output message gets a `msg.parts` property with information about how it was split from the original. This lets the Join node reassemble the sequence back into a single message.

The property contains:

- **id** - identifier for the message group
- **index** - position within the group
- **count** - total messages in the group (not set in streaming mode since the total is unknown)
- **type** - the original data type (string, array, object, or buffer)
- **ch** - for strings or buffers, the delimiter used to split the message
- **key** - for objects, the key name this message came from (also copied to `msg.topic` by default)
- **len** - when using fixed length splitting, the length of each segment

### Streaming mode

In streaming mode, the node processes incomplete data across multiple messages. Say a serial device sends newline-terminated commands but a message ends mid-command. The node splits and sends the complete parts, then holds the incomplete part and prepends it to the next message that arrives.

Because streaming mode doesn't know how many messages to expect, it doesn't set `msg.parts.count`. This means you can't use it with the Join node in automatic mode, since Join needs to know when the sequence is complete.

## Examples

### Splitting arrays

Arrays are the simplest case. Feed in an array and get one message per element. Here an array `[1, 2, 3, 4]` becomes four messages.



::render-flow
---
height: 200
flow: "W3siaWQiOiI2MzU0ZGFhY2NmMmIyNTA0IiwidHlwZSI6ImluamVjdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiWzEsIDIsIDMsIDRdIiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MTQwLCJ5IjoxMDAsIndpcmVzIjpbWyI4MmFiNTJjN2Y4OTRmNzI1Il1dfSx7ImlkIjoiODJhYjUyYzdmODk0ZjcyNSIsInR5cGUiOiJzcGxpdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IlNwbGl0IEFycmF5Iiwic3BsdCI6IlxcbiIsInNwbHRUeXBlIjoic3RyIiwiYXJyYXlTcGx0IjoxLCJhcnJheVNwbHRUeXBlIjoibGVuIiwic3RyZWFtIjpmYWxzZSwiYWRkbmFtZSI6IiIsIngiOjMxMCwieSI6MTAwLCJ3aXJlcyI6W1siODBlZTc5Yjc1ZTM3M2JhOSJdXX0seyJpZCI6IjgwZWU3OWI3NWUzNzNiYTkiLCJ0eXBlIjoiZGVidWciLCJ6IjoiMjg2MmJmNWMyNzhmZjViZCIsIm5hbWUiOiJQcmludCBpbmRpdmlkdWFsIHZhbHVlcyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo1MjAsInkiOjEwMCwid2lyZXMiOltdfV0="
---
::



### Regrouping elements

Sometimes you need to chunk data into smaller groups. Say an API only accepts 20 records at a time but you have 100. Set `Fixed length of` to split the array into chunks of that size.

With input `[1, 2, 3, 4, 5]` and `Fixed length of` set to 2, you get three messages: `[1, 2]`, `[3, 4]`, and `[5]`.



::render-flow
---
height: 200
flow: "W3siaWQiOiI1NzA4N2M4MDI5ZDQ0ZmEyIiwidHlwZSI6ImluamVjdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiWzEsIDIsIDMsIDQsIDVdIiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MTUwLCJ5IjoxNjAsIndpcmVzIjpbWyJiOGQwYWVjN2YwY2JhNmM1Il1dfSx7ImlkIjoiYjhkMGFlYzdmMGNiYTZjNSIsInR5cGUiOiJzcGxpdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IlJlZ3JvdXAgYXJyYXkiLCJzcGx0IjoiXFxuIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOiIyIiwiYXJyYXlTcGx0VHlwZSI6ImxlbiIsInN0cmVhbSI6ZmFsc2UsImFkZG5hbWUiOiIiLCJ4IjozNDAsInkiOjE2MCwid2lyZXMiOltbImQ0NWQ2OThiYWU4YjU3NWQiXV19LHsiaWQiOiJkNDVkNjk4YmFlOGI1NzVkIiwidHlwZSI6ImRlYnVnIiwieiI6IjI4NjJiZjVjMjc4ZmY1YmQiLCJuYW1lIjoiUHJpbnQgaW5kaXZpZHVhbCB2YWx1ZXMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NTYwLCJ5IjoxNjAsIndpcmVzIjpbXX1d"
---
::



### Splitting strings

The default string split uses `\n` (newline) as the delimiter, which splits text by line. This works for processing logs, CSV data, or any line-based format.

Here we split a list of European cities, one per line.



::render-flow
---
height: 200
flow: "W3siaWQiOiIzOWEwYTA1M2EzNjk2Y2Q3IiwidHlwZSI6ImluamVjdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IlRyaWdnZXIiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MTMwLCJ5IjoyMjAsIndpcmVzIjpbWyI2MGJmMDEyNDM4YWJiNGViIl1dfSx7ImlkIjoiNGI1NmEzZWQ4MzFkZjU5ZSIsInR5cGUiOiJzcGxpdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IlNwbGl0IGJ5IGxpbmUiLCJzcGx0IjoiXFxuIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOjEsImFycmF5U3BsdFR5cGUiOiJsZW4iLCJzdHJlYW0iOmZhbHNlLCJhZGRuYW1lIjoiIiwieCI6NDcwLCJ5IjoyMjAsIndpcmVzIjpbWyIzMWY4Y2EyMjg4MmIyOTdmIl1dfSx7ImlkIjoiMzFmOGNhMjI4ODJiMjk3ZiIsInR5cGUiOiJkZWJ1ZyIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IlByaW50IGVhY2ggbGluZSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2NjAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiNjBiZjAxMjQzOGFiYjRlYiIsInR5cGUiOiJ0ZW1wbGF0ZSIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IkRhdGEgaW4gbGluZXMiLCJmaWVsZCI6InBheWxvYWQiLCJmaWVsZFR5cGUiOiJtc2ciLCJmb3JtYXQiOiJoYW5kbGViYXJzIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IkFtc3RlcmRhbVxuQW5kb3JyYSBsYSBWZWxsYVxuQXRoZW5zIiwib3V0cHV0Ijoic3RyIiwieCI6MjkwLCJ5IjoyMjAsIndpcmVzIjpbWyI0YjU2YTNlZDgzMWRmNTllIl1dfV0="
---
::



### Splitting by word

Change the delimiter to a space and you can split sentences into words. Put a space character in the `Split using` field. It won't be visible in the form but it's there.



::render-flow
---
height: 200
flow: "W3siaWQiOiI2MTkyMDlkNmUzZjAyNDczIiwidHlwZSI6ImluamVjdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiZm9vIGJhciIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MTMwLCJ5IjoyODAsIndpcmVzIjpbWyIxNWI5YjNkMTdhNjRlMmM3Il1dfSx7ImlkIjoiMTViOWIzZDE3YTY0ZTJjNyIsInR5cGUiOiJzcGxpdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IlNwbGl0IGJ5IHNwYWNlIiwic3BsdCI6IiAiLCJzcGx0VHlwZSI6InN0ciIsImFycmF5U3BsdCI6MSwiYXJyYXlTcGx0VHlwZSI6ImxlbiIsInN0cmVhbSI6ZmFsc2UsImFkZG5hbWUiOiIiLCJ4IjozMDAsInkiOjI4MCwid2lyZXMiOltbIjEyNjA3ZTg3MDhlZjU4ZjIiXV19LHsiaWQiOiIxMjYwN2U4NzA4ZWY1OGYyIiwidHlwZSI6ImRlYnVnIiwieiI6IjI4NjJiZjVjMjc4ZmY1YmQiLCJuYW1lIjoiUHJpbnQgZWFjaCB3b3JkIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjUwMCwieSI6MjgwLCJ3aXJlcyI6W119XQ=="
---
::



### Splitting objects

When you split an object, you get one message per key-value pair. The key goes into `msg.topic` and the value goes into `msg.payload`.

This example splits a simple object mapping words to numbers.



::render-flow
---
height: 200
flow: "W3siaWQiOiIzYzRjNTUzNWVjM2IyMTM4IiwidHlwZSI6ImluamVjdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoie1wib25lXCI6IDEsIFwidHdvXCI6IDJ9IiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MTcwLCJ5IjozNDAsIndpcmVzIjpbWyJlYjMyMjdjOTU0ZGViYjk1Il1dfSx7ImlkIjoiZWIzMjI3Yzk1NGRlYmI5NSIsInR5cGUiOiJzcGxpdCIsInoiOiIyODYyYmY1YzI3OGZmNWJkIiwibmFtZSI6IlNwbGl0IG1hcCIsInNwbHQiOiJcXG4iLCJzcGx0VHlwZSI6InN0ciIsImFycmF5U3BsdCI6IjEiLCJhcnJheVNwbHRUeXBlIjoibGVuIiwic3RyZWFtIjpmYWxzZSwiYWRkbmFtZSI6IiIsIngiOjM2MCwieSI6MzQwLCJ3aXJlcyI6W1siOGM4Mjg3N2NkYWZmOGYwZCJdXX0seyJpZCI6IjhjODI4NzdjZGFmZjhmMGQiLCJ0eXBlIjoiZGVidWciLCJ6IjoiMjg2MmJmNWMyNzhmZjViZCIsIm5hbWUiOiJQcmludCBwcm9wZXJ0eSB2YWx1ZXMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NTYwLCJ5IjozNDAsIndpcmVzIjpbXX1d"
---
::



## Node Documentation

<div class="core-node-doc">

<p>Splits a message into a sequence of messages.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">object | string | array | buffer</span></dt>
<dd>The behaviour of the node is determined by the type of <code>msg.payload</code>:
<ul>
<li><b>string</b>/<b>buffer</b> - the message is split using the specified character (default: <code>\n</code>), buffer sequence or into fixed lengths.</li>
<li><b>array</b> - the message is split into either individual array elements, or arrays of a fixed-length.</li>
<li><b>object</b> - a message is sent for each key/value pair of the object.</li>
</ul>
</dd>
</dl> <h3>Outputs</h3> <dl class="message-properties">
<dt>parts<span class="property-type">object</span></dt>
<dd>This property contains information about how the message was split from
the original message. If passed to the <b>join</b> node, the sequence can be
reassembled into a single message. The property has the following properties:
<ul>
<li><code>id</code> - an identifier for the group of messages</li>
<li><code>index</code> - the position within the group</li>
<li><code>count</code> - if known, the total number of messages in the group. See 'streaming mode' below.</li>
<li><code>type</code> - the type of message - string/array/object/buffer</li>
<li><code>ch</code> - for a string or buffer, the data used to the split the message as either the string or an array of bytes</li>
<li><code>key</code> - for an object, the key of the property this message was created from. The node can be configured to also copy this value to another message properties, such as <code>msg.topic</code>.</li>
<li><code>len</code> - the length of each message when split using a fixed length value</li>
</ul>
</dd>
</dl> <h3>Details</h3> <p>This node makes it easy to create a flow that performs common actions across
a sequence of messages before, using the <b>join</b> node, recombining the
sequence into a single message.</p> <p>It uses the <code>msg.parts</code> property to track the individual parts
of a sequence.</p> <h4>Streaming mode</h4> <p>The node can also be used to reflow a stream of messages. For example, a
serial device that sends newline-terminated commands may deliver a single message
with a partial command at its end. In 'streaming mode', this node will split
a message and send each complete segment. If there is a partial segment at the end,
the node will hold on to it and prepend it to the next message that is received.
</p> <p>When operating in this mode, the node will not set the <code>msg.parts.count</code>
property as it does not know how many messages to expect in the stream. This
means it cannot be used with the <b>join</b> node in its automatic mode.</p>

</div>