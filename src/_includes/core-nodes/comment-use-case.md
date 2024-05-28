## What's the Comment node in Node-RED used for?

When maintaining flows over longer periods of time it can save you time and
interpretation errors if you add the comment node to your flows.

There's 4 core benefits to adding the Comment node to your Node-RED flows:

1. Improved readability: Comments can help to make flows easier to understand, especially when adding
easy to miss context and explanation like implicit requirements of the flow. This can be especially
helpful for complex flows with link nodes, or when you're editing in many tabs.
1. Enhanced maintainability: Comments can help to make flows easier to maintain
by providing a record of the flows purpose and functionality. This can be helpful
when making changes to the flow or when troubleshooting problems, particularly
if you collaborate with multiple team members.
1. Improved debugging: Comments can help to make debugging easier by providing
information about the expected behavior. This can be helpful when tracking down
errors and identifying the source of problems, or reasoning errors when previously
developing the flow.
1. Increased documentation: Comments can be used to document the code, providing
additional information about the code's purpose, functionality, and usage. Beyond
what the flow or nodes do in the sequence, business logic and requirements documented
next to the flow increased developer effeciency.

The comment node can be added to any open space in the editor, and it's advised
to add a comment to all [flow groups](/node-red/quick-tips/node-red-tips-5/#3.-group-nodes-together-to-make-your-flows-easier-to-read).

As the comment node will not take up more space if your write a larger comment,
Node-RED allows you to be more explicit and elaborate further in your comments.
ASCII diagrams or so do not distract from your flow, and as such you're encouraged
to add these.

### Examples

{% renderFlow %}
[{"id":"fc32e2266a87c07d","type":"comment","z":"1adbd550af387f9c","name":"Flow Explanation","info":"This comment can explain what nodes near to\nthis one are intended to do.\n\nComments are written in a WYSIWYG editor.","x":500,"y":320,"wires":[]}]
{% endrenderFlow %}

When you double click the node, the full text is revealed:

![Comment node editor](./images/comment-node-full-text.png)
