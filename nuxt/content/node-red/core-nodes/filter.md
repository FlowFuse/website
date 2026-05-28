---
title: "Node-RED - Filter Node"
---
# Filter

## What's the Filter node in Node-RED used for?

The Filter node, previously called "Report by Exception" (RBE), has two modes of
operation, called deadband and narrowband. These modes allow users to limit network
traffic, write operations to historians, or limit reporting of values outside
a range that is worth reporting on. It's very versatile, once you fully understand the
node.

The Filter node is part of the core nodes in Node-RED, meaning it is installed
by default.

### Deadband Mode

In deadband mode, the data transmission is triggered only when the measured
value changes beyond a specified threshold value. This threshold value is known
as the deadband, and it is used to prevent frequent data transmissions when the
value fluctuates around a certain point. The deadband is typically set to a
percentage of the measurement range or an absolute value.

For example, if the temperature sensor measures a range of 0-100 degrees Celsius,
and the deadband is set to 2 degrees, then the system will only report temperature
changes greater than 2 degrees. This helps reduce unnecessary network traffic
and save processing power.

### Narrowband Mode

In narrowband mode, the data transmission is triggered only when the measured
value falls outside a specified range of values. This range is known as the
narrowband or hysteresis, and it is used to prevent unnecessary data
transmissions when the value fluctuates within a certain range.

For example, if the temperature sensor measures a range of 0-100 degrees Celsius,
and the narrowband is set to 5 degrees, then the system will only report
temperature changes greater than 5 degrees above or below the last reported
value.

Both deadband and narrowband modes are used to optimize data transmission and
reduce the number of unnecessary data transmissions.

## Examples

### Report all changes

With 3 messages send to the filter node; 1, 2, 2, the following flow will send 
through the first messages, `1` and `2` respectively. Then filter out the last
`2` message as no changes were observed since it sent on the previous message.



::render-flow
---
height: 200
flow: "W3siaWQiOiI1YWRmNmI3NTdlMmE3YmIyIiwidHlwZSI6InJiZSIsInoiOiI5N2EyNjY4NTQwZTJmM2JhIiwibmFtZSI6Ik9ubHkgcmVwb3J0IGNoYW5nZXMiLCJmdW5jIjoicmJlIiwiZ2FwIjoiIiwic3RhcnQiOiIiLCJpbm91dCI6Im91dCIsInNlcHRvcGljcyI6dHJ1ZSwicHJvcGVydHkiOiJwYXlsb2FkIiwidG9waSI6InRvcGljIiwieCI6NDIwLCJ5IjoxMDAsIndpcmVzIjpbWyI2NjgyYTllODgyNmFkMDliIl1dfSx7ImlkIjoiZjYwZGMyNmY4ZDYzNDMxMiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOTdhMjY2ODU0MGUyZjNiYSIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IlsxLDIsMl0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjoxMzAsInkiOjEwMCwid2lyZXMiOltbIjViMmI2MWJiMTEyYjIzZTciXV19LHsiaWQiOiI2NjgyYTllODgyNmFkMDliIiwidHlwZSI6ImRlYnVnIiwieiI6Ijk3YTI2Njg1NDBlMmYzYmEiLCJuYW1lIjoiUHJpbnQgY2hhbmdlcyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2MjAsInkiOjEwMCwid2lyZXMiOltdfSx7ImlkIjoiNWIyYjYxYmIxMTJiMjNlNyIsInR5cGUiOiJzcGxpdCIsInoiOiI5N2EyNjY4NTQwZTJmM2JhIiwibmFtZSI6IiIsInNwbHQiOiJcXG4iLCJzcGx0VHlwZSI6InN0ciIsImFycmF5U3BsdCI6MSwiYXJyYXlTcGx0VHlwZSI6ImxlbiIsInN0cmVhbSI6ZmFsc2UsImFkZG5hbWUiOiIiLCJ4IjoyNTAsInkiOjEwMCwid2lyZXMiOltbIjVhZGY2Yjc1N2UyYTdiYjIiXV19XQ=="
---
::



### Report changes, ignore the initial value

With 3 messages send to the filter node; 1, 2, 2, the initial value is used as
sentinel value. Each change afterwards is send onwards. In this case printing just
2 once. The first message; `1` is remembered, and the next message afterwards is
the only change in the stream of values.



::render-flow
---
height: 200
flow: "W3siaWQiOiJkNWMyMDQ0MWZjMDEyOTRiIiwidHlwZSI6InJiZSIsInoiOiI5N2EyNjY4NTQwZTJmM2JhIiwibmFtZSI6Iklnbm9yZSBmaXJzdCBtZXNzYWdlLCBvbmx5IHJlcG9ydCBjaGFuZ2VzIiwiZnVuYyI6InJiZWkiLCJnYXAiOiIiLCJzdGFydCI6IiIsImlub3V0Ijoib3V0Iiwic2VwdG9waWNzIjp0cnVlLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJ0b3BpIjoidG9waWMiLCJ4Ijo0ODAsInkiOjE4MCwid2lyZXMiOltbImM1ODQ1Y2M2M2M4MWY4MWQiXV19LHsiaWQiOiJlZWYyNGQ5YjhjM2Y5OGM3IiwidHlwZSI6ImluamVjdCIsInoiOiI5N2EyNjY4NTQwZTJmM2JhIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiWzEsMiwyXSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjEzMCwieSI6MTgwLCJ3aXJlcyI6W1siOWU4ZTc5ODAxMjI4YzNiYiJdXX0seyJpZCI6ImM1ODQ1Y2M2M2M4MWY4MWQiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOTdhMjY2ODU0MGUyZjNiYSIsIm5hbWUiOiJQcmludCBjaGFuZ2VzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc0MCwieSI6MTgwLCJ3aXJlcyI6W119LHsiaWQiOiI5ZThlNzk4MDEyMjhjM2JiIiwidHlwZSI6InNwbGl0IiwieiI6Ijk3YTI2Njg1NDBlMmYzYmEiLCJuYW1lIjoiIiwic3BsdCI6IlxcbiIsInNwbHRUeXBlIjoic3RyIiwiYXJyYXlTcGx0IjoxLCJhcnJheVNwbHRUeXBlIjoibGVuIiwic3RyZWFtIjpmYWxzZSwiYWRkbmFtZSI6IiIsIngiOjI1MCwieSI6MTgwLCJ3aXJlcyI6W1siZDVjMjA0NDFmYzAxMjk0YiJdXX1d"
---
::



### Report changes larger than a certain percentage "Deadband"

If the filter node is configured to "block unless value change is great or equal than"
mode with a 50% threshold configured as "compared to last valid output value" and it's
send `1, 2, 2, 1` it will send on the messages `2, 1`.

The initial message `1` is set as sentinel value. The second message `2` is an
increase of 100% against the sentinel which updates the sentinel value to two,
and sends it on.
The third message is equal to the sentinel value and thus filtered. The last value, `1`,
is a 50% change compared to the sentinel value of `2` and send forward.



::render-flow
---
height: 200
flow: "W3siaWQiOiJhZjkzOTBhODQwYTBiMjhhIiwidHlwZSI6InJiZSIsInoiOiI5N2EyNjY4NTQwZTJmM2JhIiwibmFtZSI6IlJlcG9ydCBjaGFuZ2VzIG92ZXIgIiwiZnVuYyI6ImRlYWRiYW5kRXEiLCJnYXAiOiI1MCUiLCJzdGFydCI6IiIsImlub3V0Ijoib3V0Iiwic2VwdG9waWNzIjp0cnVlLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJ0b3BpIjoidG9waWMiLCJ4Ijo0MjAsInkiOjI2MCwid2lyZXMiOltbImY3NmYwNGJmYjczYWQ4ZGIiXV19LHsiaWQiOiIyYTI4ZDQ4ZTQ0ZmQ2NDUwIiwidHlwZSI6ImluamVjdCIsInoiOiI5N2EyNjY4NTQwZTJmM2JhIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiWzEsMiwyLDFdIiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MTMwLCJ5IjoyNjAsIndpcmVzIjpbWyI5MTU1YWRlMjgzZTc2YWI2Il1dfSx7ImlkIjoiZjc2ZjA0YmZiNzNhZDhkYiIsInR5cGUiOiJkZWJ1ZyIsInoiOiI5N2EyNjY4NTQwZTJmM2JhIiwibmFtZSI6IlByaW50IGNoYW5nZXMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjIwLCJ5IjoyNjAsIndpcmVzIjpbXX0seyJpZCI6IjkxNTVhZGUyODNlNzZhYjYiLCJ0eXBlIjoic3BsaXQiLCJ6IjoiOTdhMjY2ODU0MGUyZjNiYSIsIm5hbWUiOiIiLCJzcGx0IjoiXFxuIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOjEsImFycmF5U3BsdFR5cGUiOiJsZW4iLCJzdHJlYW0iOmZhbHNlLCJhZGRuYW1lIjoiIiwieCI6MjUwLCJ5IjoyNjAsIndpcmVzIjpbWyJhZjkzOTBhODQwYTBiMjhhIl1dfV0="
---
::



### Report only on one specific value

As the filter node can block all messages where the change is too large, it can
used to only report a single value when it occurs. For example, to only report
integers that are equal to 2, the start value is set to 2 and the change cannot be
greater of equal to 1.



::render-flow
---
height: 200
flow: "W3siaWQiOiI2YjcwYmVkM2U3MzYwZjU4IiwidHlwZSI6InJiZSIsInoiOiI5N2EyNjY4NTQwZTJmM2JhIiwibmFtZSI6Ik9ubHkgc2VuZCAyJ3MiLCJmdW5jIjoibmFycm93YmFuZEVxIiwiZ2FwIjoiMSIsInN0YXJ0IjoiMiIsImlub3V0Ijoib3V0Iiwic2VwdG9waWNzIjpmYWxzZSwicHJvcGVydHkiOiJwYXlsb2FkIiwidG9waSI6InRvcGljIiwieCI6NDAwLCJ5IjozNDAsIndpcmVzIjpbWyI1ZjAyYWEyYjQzNDk5Y2E4Il1dfSx7ImlkIjoiYTViMDVmY2JlNmZkZjUzZSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOTdhMjY2ODU0MGUyZjNiYSIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IlsxLDIsMl0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjoxMzAsInkiOjM0MCwid2lyZXMiOltbImU1OGY5OGVjYjIyMGQ3ZjMiXV19LHsiaWQiOiI1ZjAyYWEyYjQzNDk5Y2E4IiwidHlwZSI6ImRlYnVnIiwieiI6Ijk3YTI2Njg1NDBlMmYzYmEiLCJuYW1lIjoiUHJpbnQgdGhlIHNhbWUgdmFsdWVzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjYwMCwieSI6MzQwLCJ3aXJlcyI6W119LHsiaWQiOiJlNThmOThlY2IyMjBkN2YzIiwidHlwZSI6InNwbGl0IiwieiI6Ijk3YTI2Njg1NDBlMmYzYmEiLCJuYW1lIjoiIiwic3BsdCI6IlxcbiIsInNwbHRUeXBlIjoic3RyIiwiYXJyYXlTcGx0IjoxLCJhcnJheVNwbHRUeXBlIjoibGVuIiwic3RyZWFtIjpmYWxzZSwiYWRkbmFtZSI6IiIsIngiOjI1MCwieSI6MzQwLCJ3aXJlcyI6W1siNmI3MGJlZDNlNzM2MGY1OCJdXX1d"
---
::



## Node Documentation

<div class="core-node-doc">

<p>filter node - only passes on data if the payload has changed.
It can also block unless, or ignore if the value changes by a specified amount (Dead- and Narrowband mode).</p> <h3>Inputs</h3> <dl class="message-properties">
<dt>payload
<span class="property-type">number | string | (object)</span>
</dt>
<dd>RBE mode will accept numbers, strings, and simple objects.
Other modes must provide a parseable number.</dd>
<dt class="optional">topic <span class="property-type">string</span>
</dt>
<dd>if specified the function will work on a per topic basis. This property can be set by configuration.</dd>
<dt class="optional">reset<span class="property-type">any</span></dt>
<dd>if set clears the stored value for the specified <code>msg.topic</code>, or
all topics if msg.topic is not specified.</dd>
</dl> <h3>Outputs</h3> <dl class="message-properties">
<dt>payload
<span class="property-type">as per input</span>
</dt>
<dd>If triggered the output will be the same as the input.</dd>
</dl> <h3>Details</h3> <p>In RBE mode this node will block until the <code>msg.payload</code>,
(or selected property) value is different to the previous one.
If required it can ignore the initial value, so as not to send anything at start.</p> <p>The <a href="https://en.wikipedia.org/wiki/Deadband" target="_blank">Deadband</a> modes will block the incoming value
<i>unless</i> its change is greater or greater-equal than &amp;plusmn; the band gap away from a previous value.</p> <p>The Narrowband modes will block the incoming value,
<i>if</i> its change is greater or greater-equal than &amp;plusmn; the band gap away from the previous value.
It is useful for ignoring outliers from a faulty sensor for example.</p> <p>Both in Deadband and Narrowband modes the incoming value must contain a parseable number and
both also supports % - only sends if/unless the input differs by more than x% of the original value.</p> <p>Both Deadband and Narrowband allow comparison against either the previous valid output value, thus
ignoring any values out of range, or the previous input value, which resets the set point, thus allowing
gradual drift (deadband), or a step change (narrowband).</p> <p><b>Note:</b> This works on a per <code>msg.topic</code> basis, though this can be changed to another property if desired.
This means that a single filter node can handle multiple different topics at the same time.</p>

</div>