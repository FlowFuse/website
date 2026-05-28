---
title: "Node-RED - Comment Node"
---
# Comment

Adds documentation and explanatory notes directly within your flows.

## Where and why do we use the Comment node?

The Comment node helps document your flows by adding explanatory text that appears on the canvas. This is essential for maintaining flows over time, especially when working in teams or returning to flows after extended periods. By documenting the purpose, requirements, and logic of flow sections, you make flows more understandable, reduce interpretation errors, and speed up troubleshooting and modifications. Comments are particularly valuable for complex flows with link nodes, multi-tab workflows, or business logic that isn't obvious from the nodes alone.

> If you need help documenting your flows, [FlowFuse Assistant](/docs/user/expert/) can automatically generate documentation with Comment nodes. Simply select your flow and click the "Explain Flow" button, the AI will analyze your flow and create comprehensive documentation that you can add directly to your canvas.

## Modes of operation

The Comment node provides flexible documentation capabilities:

### Canvas Labels

Display brief explanatory text directly on the canvas. The node shows a single line of text in its name field, providing quick context without cluttering the visual layout. This is useful for labeling flow sections, marking decision points, or highlighting important considerations.

### Detailed Documentation

Store longer explanations in the node's info panel. Double-clicking the Comment node reveals a WYSIWYG editor where you can write detailed documentation, including formatting, lists, and even ASCII diagrams. This detailed content doesn't take up canvas space but remains accessible when needed.

### Group Annotations

Place Comment nodes within flow groups to document the group's purpose and functionality. This creates self-contained, well-documented sections of your flow that are easier to understand and maintain. It's recommended to add comments to all flow groups for comprehensive documentation.

## How the node handles messages

The Comment node is purely documentary and doesn't participate in message flows. It has no input or output connections and doesn't process, modify, or generate messages. You can place Comment nodes anywhere on the canvas without affecting flow execution or performance.

Because Comment nodes don't impact runtime behavior, you can be as detailed and explicit as needed in your documentation. Multiple Comment nodes can be used throughout a flow to explain different sections, decision logic, or implementation details.

## Examples

### Documenting flow sections

Add comments to explain what groups of nodes accomplish and why they're structured that way. This example shows a comment documenting an input validation section, helping future developers understand the requirements and logic.



::render-flow
---
height: 200
flow: "W3siaWQiOiJjb21tZW50LXZhbGlkYXRpb24iLCJ0eXBlIjoiY29tbWVudCIsInoiOiJhMWIyYzNkNGU1ZjZnN2g4IiwibmFtZSI6IklucHV0IFZhbGlkYXRpb24gU2VjdGlvbiIsImluZm8iOiJUaGlzIHNlY3Rpb24gdmFsaWRhdGVzIGluY29taW5nIHNlbnNvciBkYXRhIGJlZm9yZSBwcm9jZXNzaW5nLlxuXG5SZXF1aXJlbWVudHM6XG4tIFRlbXBlcmF0dXJlIG11c3QgYmUgYmV0d2VlbiAtNTAgYW5kIDEwMMKwQ1xuLSBIdW1pZGl0eSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwJVxuLSBCb3RoIHZhbHVlcyBtdXN0IGJlIHByZXNlbnRcblxuSW52YWxpZCBkYXRhIGlzIGxvZ2dlZCBhbmQgZGlzY2FyZGVkIHRvIHByZXZlbnRcbmRvd25zdHJlYW0gcHJvY2Vzc2luZyBlcnJvcnMuIiwieCI6MjEwLCJ5IjoxNDAsIndpcmVzIjpbXX0seyJpZCI6ImlucHV0LWluamVjdCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYTFiMmMzZDRlNWY2ZzdoOCIsIm5hbWUiOiJTZW5zb3IgRGF0YSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoie1widGVtcGVyYXR1cmVcIjoyMixcImh1bWlkaXR5XCI6NjV9IiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MTkwLCJ5IjoyMDAsIndpcmVzIjpbWyJ2YWxpZGF0ZS10ZW1wIl1dfSx7ImlkIjoidmFsaWRhdGUtdGVtcCIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiYTFiMmMzZDRlNWY2ZzdoOCIsIm5hbWUiOiJDaGVjayBUZW1wZXJhdHVyZSIsInByb3BlcnR5IjoicGF5bG9hZC50ZW1wZXJhdHVyZSIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiYnR3biIsInYiOiItNTAiLCJ2dCI6Im51bSIsInYyIjoiMTAwIiwidnQyIjoibnVtIn1dLCJjaGVja2FsbCI6InRydWUiLCJyZXBhaXIiOmZhbHNlLCJvdXRwdXRzIjoxLCJ4Ijo0MDAsInkiOjIwMCwid2lyZXMiOltbInZhbGlkYXRlLWh1bWlkaXR5Il1dfSx7ImlkIjoidmFsaWRhdGUtaHVtaWRpdHkiLCJ0eXBlIjoic3dpdGNoIiwieiI6ImExYjJjM2Q0ZTVmNmc3aDgiLCJuYW1lIjoiQ2hlY2sgSHVtaWRpdHkiLCJwcm9wZXJ0eSI6InBheWxvYWQuaHVtaWRpdHkiLCJwcm9wZXJ0eVR5cGUiOiJtc2ciLCJydWxlcyI6W3sidCI6ImJ0d24iLCJ2IjoiMCIsInZ0IjoibnVtIiwidjIiOiIxMDAiLCJ2dDIiOiJudW0ifV0sImNoZWNrYWxsIjoidHJ1ZSIsInJlcGFpciI6ZmFsc2UsIm91dHB1dHMiOjEsIngiOjYyMCwieSI6MjAwLCJ3aXJlcyI6W1sib3V0cHV0LWRlYnVnIl1dfSx7ImlkIjoib3V0cHV0LWRlYnVnIiwidHlwZSI6ImRlYnVnIiwieiI6ImExYjJjM2Q0ZTVmNmc3aDgiLCJuYW1lIjoiVmFsaWQgRGF0YSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo4MTAsInkiOjIwMCwid2lyZXMiOltdfV0="
---
::



## Node Documentation

<div class="core-node-doc">

<p>A node you can use to add comments to your flows.</p> <h3>Details</h3> <p>The edit panel will accept Markdown syntax. The text will be rendered into
the information side panel.</p>

</div>