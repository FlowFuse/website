---
title: "Node-RED - Sort Node"
---
# Sort

Sorts an array or a sequence of messages.

## Where and why do we use the Sort node?

The Sort node arranges data in ascending or descending order. You can sort either an array within a message payload or a sequence of messages based on their properties. This is essential when you need to organize data before displaying it, process items by priority, or find top/bottom values in datasets.

## Modes of operation

The Sort node operates in two different modes:

### Array Sorting

Sorts an array stored in a message property. The entire array gets arranged based on element values or a JSONata expression. Use this when you have a complete dataset in one message that needs ordering.

### Message Sequence Sorting

Sorts a sequence of messages that have a `msg.parts` property. Messages need these fields in `msg.parts`:
- **id** - identifier for the message group
- **index** - position within the group
- **count** - total messages in the group

The Split node automatically creates `msg.parts`, but you can set it manually if needed. Use this mode when processing streams of individual messages that need to be reordered based on their properties.

## How the node handles messages

The Sort node buffers messages internally when working with message sequences. For array sorting, it processes the array immediately and outputs the sorted result. For message sequences, it collects all messages in the sequence before sorting and releasing them in the new order.

When sorting, you can specify:
- **Element value** - Sorts based on the element's value directly
- **Expression** - Uses a JSONata expression to extract the sort value from complex objects

The sort direction can be:
- **Ascending** - Smallest to largest (A to Z)
- **Descending** - Largest to smallest (Z to A)

Enable **As numbers** to sort numerically instead of alphabetically. Without this, "10" comes before "2" because it's treated as text.

## Examples

### Sorting arrays

This example sorts numbers and letters in ascending order. The arrays get arranged from smallest to largest, or A to Z.



::render-flow
---
height: 200
flow: "W3siaWQiOiJiNWVhNmQyYS42ZTdiYiIsInR5cGUiOiJ0YWIiLCJsYWJlbCI6Im9wZW5WYWx2ZSIsImRpc2FibGVkIjpmYWxzZSwiaW5mbyI6IiJ9LHsiaWQiOiI0MTZkNmQzMmRmNDExYWJlIiwidHlwZSI6InNvcnQiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwib3JkZXIiOiJhc2NlbmRpbmciLCJhc19udW0iOmZhbHNlLCJ0YXJnZXQiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsIm1zZ0tleSI6InBheWxvYWQiLCJtc2dLZXlUeXBlIjoiZWxlbSIsInNlcUtleSI6InBheWxvYWQucXVhbnRpdHkiLCJzZXFLZXlUeXBlIjoibXNnIiwieCI6NTcwLCJ5IjozMjAsIndpcmVzIjpbWyJlYjkyM2JkZTc4MjQ3ZGM1Il1dfSx7ImlkIjoiYzhiZDY0MTc2NzI1ZjQzZiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJbNyw4LDQxLDkwLDIsNCwyXSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjM2MCwieSI6MzIwLCJ3aXJlcyI6W1siNDE2ZDZkMzJkZjQxMWFiZSJdXX0seyJpZCI6ImViOTIzYmRlNzgyNDdkYzUiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiZGVidWcgMiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NjAsInkiOjMyMCwid2lyZXMiOltdfSx7ImlkIjoiNjdmMmU2MmVlYzk1MDljNSIsInR5cGUiOiJjb21tZW50IiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwibmFtZSI6Ik9yZGVyaW5nIG51bWJlcnMgaW4gYXNjZW5kaW5nIG9yZGVyIiwiaW5mbyI6IiIsIngiOjUzMCwieSI6MjQwLCJ3aXJlcyI6W119LHsiaWQiOiI0ODFlMzgyYWJhYzdhNzMwIiwidHlwZSI6InNvcnQiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwib3JkZXIiOiJhc2NlbmRpbmciLCJhc19udW0iOmZhbHNlLCJ0YXJnZXQiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsIm1zZ0tleSI6InBheWxvYWQiLCJtc2dLZXlUeXBlIjoiZWxlbSIsInNlcUtleSI6InBheWxvYWQucXVhbnRpdHkiLCJzZXFLZXlUeXBlIjoibXNnIiwieCI6NTcwLCJ5Ijo0NDAsIndpcmVzIjpbWyJmNDMwOTMxNjBlNDM2MDI1Il1dfSx7ImlkIjoiMjE1MDJiMjEyYTljMGY4MCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJbXCJHXCIsIFwiRlwiLCBcIlRcIiwgXCJBXCIsIFwiUlwiLCBcIlBcIiwgXCJIXCIsIFwiV1wiLCBcIkNcIiwgXCJZXCIsIFwiTlwiLCBcIkJcIiwgXCJMXCIsIFwiT1wiLCBcIlhcIiwgXCJJXCIsIFwiVlwiLCBcIkVcIiwgXCJKXCIsIFwiVVwiLCBcIktcIiwgXCJNXCIsIFwiU1wiLCBcIlpcIiwgXCJEXCIsIFwiUVwiXSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjMzMCwieSI6NDQwLCJ3aXJlcyI6W1siNDgxZTM4MmFiYWM3YTczMCJdXX0seyJpZCI6ImY0MzA5MzE2MGU0MzYwMjUiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiZGVidWcgMyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NjAsInkiOjQ0MCwid2lyZXMiOltdfSx7ImlkIjoiZGJhNjI0YWMyMGE3NTU4MCIsInR5cGUiOiJjb21tZW50IiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwibmFtZSI6Ik9yZGVyaW5nIGFscGhhYmV0cyBpbiBhc2NlbmRpbmcgb3JkZXIiLCJpbmZvIjoiIiwieCI6NTEwLCJ5IjozODAsIndpcmVzIjpbXX1d"
---
::



### Sorting message sequences

Here the Sort node arranges a sequence of messages in descending order by the quantity property. The Split node breaks the array into individual messages, each gets sorted by its quantity value, and higher quantities come first.



::render-flow
---
height: 200
flow: "W3siaWQiOiI0MTZkNmQzMmRmNDExYWJlIiwidHlwZSI6InNvcnQiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwib3JkZXIiOiJkZXNjZW5kaW5nIiwiYXNfbnVtIjpmYWxzZSwidGFyZ2V0IjoiIiwidGFyZ2V0VHlwZSI6InNlcSIsIm1zZ0tleSI6InBheWxvYWQiLCJtc2dLZXlUeXBlIjoiZWxlbSIsInNlcUtleSI6InBheWxvYWQucXVhbnRpdHkiLCJzZXFLZXlUeXBlIjoibXNnIiwieCI6NTUwLCJ5IjozMjAsIndpcmVzIjpbWyJlYjkyM2JkZTc4MjQ3ZGM1Il1dfSx7ImlkIjoiYzhiZDY0MTc2NzI1ZjQzZiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJbICAgeyAgICAgXCJpZFwiOiAxLCAgICAgXCJuYW1lXCI6IFwiTGFwdG9wXCIsICAgICBcInF1YW50aXR5XCI6IDE1ICAgfSwgICB7ICAgICBcImlkXCI6IDIsICAgICBcIm5hbWVcIjogXCJQcmludGVyXCIsICAgICBcInF1YW50aXR5XCI6IDUgICB9LCAgIHsgICAgIFwiaWRcIjogMywgICAgIFwibmFtZVwiOiBcIk1vbml0b3JcIiwgICAgIFwicXVhbnRpdHlcIjogMTAgICB9IF0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjoyNzAsInkiOjMyMCwid2lyZXMiOltbIjA1ZTMzMDc5NDY0YTkyNDMiXV19LHsiaWQiOiJlYjkyM2JkZTc4MjQ3ZGM1IiwidHlwZSI6ImRlYnVnIiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwibmFtZSI6ImRlYnVnIDIiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzIwLCJ5IjozMjAsIndpcmVzIjpbXX0seyJpZCI6IjA1ZTMzMDc5NDY0YTkyNDMiLCJ0eXBlIjoic3BsaXQiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJuYW1lIjoiIiwic3BsdCI6IlxcbiIsInNwbHRUeXBlIjoic3RyIiwiYXJyYXlTcGx0IjoxLCJhcnJheVNwbHRUeXBlIjoibGVuIiwic3RyZWFtIjpmYWxzZSwiYWRkbmFtZSI6IiIsIngiOjQxMCwieSI6MzIwLCJ3aXJlcyI6W1siNDE2ZDZkMzJkZjQxMWFiZSJdXX0seyJpZCI6IjY3ZjJlNjJlZWM5NTA5YzUiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJiNWVhNmQyYS42ZTdiYiIsIm5hbWUiOiJPcmRlcmluZyBzZXF1ZW5jZSBvZiBtZXNzYWdlcyBpbiBkZXNjZW5kaW5nIG9yZGVyIGJhc2VkIG9uIHRoZSBxdWFudGl0eSBwcm9wZXJ0eSBvZiBlYWNoIG1lc3NhZ2UuIiwiaW5mbyI6IiIsIngiOjUzMCwieSI6MjQwLCJ3aXJlcyI6W119XQ=="
---
::



## Node Documentation

<div class="core-node-doc">

<p>A function that sorts message property or a sequence of messages.</p> <p>When configured to sort message property, the node sorts array data pointed to by specified message property.</p> <p>When configured to sort a sequence of messages, it will reorder the messages.</p> <p>The sorting order can be:</p> <ul>
<li><b>ascending</b>,</li>
<li><b>descending</b>.</li>
</ul> <p>For numbers, numerical ordering can be specified by a checkbox.</p> <p>Sort key can be element value or JSONata expression for sorting property value, or message property or JSONata expression for sorting a message sequence.<p>
<p>When sorting a message sequence, the sort node relies on the received messages to have <code>msg.parts</code> set.  The split node generates this property, but can be manually created.  It has the following properties:</p>
<p>
<ul>
<li><code>id</code> - an identifier for the group of messages</li>
<li><code>index</code> - the position within the group</li>
<li><code>count</code> - the total number of messages in the group</li>
</ul>
</p>
<p><b>Note:</b> This node internally keeps messages for its operation.  In order to prevent unexpected memory usage, maximum number of messages kept can be specified.  Default is no limit on number of messages.
<ul>
<li><code>nodeMessageBufferMaxLength</code> property set in <b>settings.js</b>.</li>
</ul>
</p>

</p></p>

</div>