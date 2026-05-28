---
title: "Node-RED - Range Node"
---
# Range

## What's the Range node in Node-RED used for?

The "Range" node in Node-RED allows you to map a numeric value from one range to another. For example, if you wanted to map miles to kilometers, you can specific the input range at 1 to 100 and the target range as 1 to 160.

Besides unit conversion, the range node can be used for:

**Data Scaling**: Use the "Range" node to scale or normalize data. For example, if you have sensor readings that range from 0 to 1023 but you want to convert them to a 0-100 percentage scale, you can use the "Range" node for this transformation.

**Data Compression**: Reduce the range of data values while preserving the relationships between values. This can be useful for displaying data on a smaller scale without losing important variations.

**Analog-to-Digital Conversion**: When interfacing with analog sensors, you can map the analog voltage range to a digital value range for processing.

**Data Smoothing**: Smooth out data fluctuations by mapping values within a range to a single value.


## Examples for the Range node

An example of a change node that converts from miles to kilometers.

![Range properties](./images/range-node2.png)



::render-flow
---
height: 200
flow: "W3siaWQiOiIxODM3MzlhZWNkYTdkYzQzIiwidHlwZSI6InJhbmdlIiwieiI6ImU5MmZiNmMzYjMwNGZkN2MiLCJtaW5pbiI6IjEiLCJtYXhpbiI6IjEwMCIsIm1pbm91dCI6IjAiLCJtYXhvdXQiOiIxNjAiLCJhY3Rpb24iOiJzY2FsZSIsInJvdW5kIjp0cnVlLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJuYW1lIjoiTWlsZXMgPkttIiwieCI6MzkwLCJ5IjoyMjAsIndpcmVzIjpbWyI5YzRlZGY3MjUwYzM0Y2RiIl1dfV0="
---
::



## Node Documentation

<div class="core-node-doc">

<p>Maps a numeric value to a different range.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt>payload <span class="property-type">number</span></dt>
<dd>The payload <i>must</i> be a number. Anything else will try to be
parsed into a number and rejected if that fails.</dd>
</dl> <h3>Outputs</h3> <dl class="message-properties">
<dt>payload <span class="property-type">number</span></dt>
<dd>The value mapped to the new range.</dd>
</dl> <h3>Details</h3> <p>This node will linearly scale the received value. By default, the result
is not constrained to the range defined in the node.</p> <p><i>Scale and limit to target range</i> means that the result will never be outside
the range specified within the target range.</p> <p><i>Scale and wrap within the target range</i> means that the result will
be wrapped within the target range.</p> <p><i>Scale, but drop if outside input range</i> means that the result will
be scaled, but any inputs outside of the inout range will be dropped.</p> <p>For example an input 0 - 10 mapped to 0 - 100.</p> <table style="outline-width:#888 solid thin">
<tr><th width="80px">mode</th><th width="80px">input</th><th width="80px">output</th></tr>
<tr><td><center>scale</center></td><td><center>12</center></td><td><center>120</center></td></tr>
<tr><td><center>limit</center></td><td><center>12</center></td><td><center>100</center></td></tr>
<tr><td><center>wrap</center></td><td><center>12</center></td><td><center>20</center></td></tr>
<tr><td><center>drop</center></td><td><center>12</center></td><td><center><i>(no output)</i></center></td></tr>
</table>

</div>