---
title: "Node-RED - Complete Node"
---
# Complete

## What is the Complete Node?

The Complete Node in Node-RED is used to trigger a flow after a specified node completes its execution or a certain task. This is achieved by informing the Node-RED runtime about the completion of a task performed by the node itself.

In custom nodes, this support is typically implemented by calling the `done()` callback function after the execution of the task. This signals to the runtime that the task has been completed and triggers the Complete Node.

**Note:** While this node is supported by all nodes, only nodes that have implemented support by informing the runtime about the completion of a certain task can utilize it.

This node must be configured to handle events for selected nodes; it does not provide an option to enable event handling from all nodes automatically.

For notifying task completion in the middle of a function, you can use node.call in a function node.


## Use Cases

- **Asynchronous Task Completion:**

Suppose you have a flow where one node performs an asynchronous task, such as fetching data from an API. You can use the Complete Node to trigger the next set of actions in the flow only after the data has been successfully fetched.

- **Long-running Process Completion:**

For processes that take a significant amount of time to complete, such as batch jobs, data transformations, or machine learning tasks, the Complete Node can be used to mark the end of these processes and trigger follow-up actions or notifications.

- **Batch Processing:**

For batch processing tasks, the Complete Node can be used to signal the completion of a batch process. This could be useful in data processing workflows where data is processed in batches, and you need to know when each batch is finished before starting the next one.

- **Output-less Node:**

In Node-RED, certain nodes like WebSocket-out and MQTT-out do not have outputs to connect with. The Complete node in Node-RED can be helpful when you need to know when a process is done by those nodes.

# Example

1. In the example flow below, we have a WebSocket server, the Inject node sends data to the WebSocket server, and upon successful transmission to the WebSocket server, a Complete node handles the event.



::render-flow
---
height: 200
flow: "W3siaWQiOiJjMTA2NTFhMzBiZjJkNmFiIiwidHlwZSI6ImluamVjdCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6InNlbmQgZGF0YSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOnRydWUsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjozMDAsInkiOjIyMCwid2lyZXMiOltbIjkxNWYxODZhMGEyYjk2NjMiXV19LHsiaWQiOiI5MTVmMTg2YTBhMmI5NjYzIiwidHlwZSI6IndlYnNvY2tldCBvdXQiLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiJ3ZWJzb2NrZXQgc2VydmVyIiwic2VydmVyIjoiNjViYjBjZmU3NWU5NDUzOSIsImNsaWVudCI6IiIsIngiOjU5MCwieSI6MjIwLCJ3aXJlcyI6W119LHsiaWQiOiJhZDhiMzYwYWI2Y2ZlYjAyIiwidHlwZSI6ImNvbXBsZXRlIiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiY29tcGxldGUiLCJzY29wZSI6WyI5MTVmMTg2YTBhMmI5NjYzIl0sInVuY2F1Z2h0IjpmYWxzZSwieCI6MjgwLCJ5IjozNDAsIndpcmVzIjpbWyIzYTFlMzhjNDZlOWUyZTQ3Il1dfSx7ImlkIjoiM2ExZTM4YzQ2ZTllMmU0NyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjQwLCJ5IjozNDAsIndpcmVzIjpbXX0seyJpZCI6ImE4YmMyODc5NmIyNjU0MDUiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IlNlbmRpbmcgZGF0YSB0byB3ZWJzb2NrZXQgc2VydmVyIiwiaW5mbyI6IiIsIngiOjQyMCwieSI6MTYwLCJ3aXJlcyI6W119LHsiaWQiOiI0MDMyMGI0YmRiMGEyOTRkIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiJVcG9uIHN1Y2Nlc3NmdWwgZGF0YSB0cmFuc21pc3Npb24gdG8gdGhlIFdlYlNvY2tldCBzZXJ2ZXIsIHRoZSBDb21wbGV0ZSBub2RlIGhhbmRsZXMgdGhlIGV2ZW50LiIsImluZm8iOiIiLCJ4Ijo0NjAsInkiOjI4MCwid2lyZXMiOltdfSx7ImlkIjoiNjViYjBjZmU3NWU5NDUzOSIsInR5cGUiOiJ3ZWJzb2NrZXQtbGlzdGVuZXIiLCJwYXRoIjoiL3dzL3Jlc3BvbnNlIiwid2hvbGVtc2ciOiJmYWxzZSJ9XQ=="
---
::



In the example flow below, we have an inject node sending an HTTP GET request to a mock API. After successful completion of the request, the complete node will handle the event.



::render-flow
---
height: 200
flow: "W3siaWQiOiIxYmUzNmI3ZTJiNjBkMjI0IiwidHlwZSI6ImluamVjdCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IkdldCBUb2RvbGlzdCAiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjp0cnVlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MjkwLCJ5IjoyNDAsIndpcmVzIjpbWyI5NDY3YmUxNjkyYTFhZTdiIl1dfSx7ImlkIjoiOTNlZWRjMDlmNmM1NWE3YSIsInR5cGUiOiJjb21wbGV0ZSIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IiIsInNjb3BlIjpbIjk0NjdiZTE2OTJhMWFlN2IiXSwidW5jYXVnaHQiOmZhbHNlLCJ4IjoyOTAsInkiOjM2MCwid2lyZXMiOltbIjVmMWE5MGU5M2ZhZDE1NjciXV19LHsiaWQiOiI1ZjFhOTBlOTNmYWQxNTY3IiwidHlwZSI6ImRlYnVnIiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo1ODAsInkiOjM2MCwid2lyZXMiOltdfSx7ImlkIjoiNzQxMmRlN2MxNGUxNjk0MiIsInR5cGUiOiJjb21tZW50IiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiU2VuZGluZyBnZXQgcmVxdWVzdCB0byBBUEkgIiwiaW5mbyI6IiIsIngiOjQxMCwieSI6MTgwLCJ3aXJlcyI6W119LHsiaWQiOiI2NjY4MTM2ZDUzZjNjNjUwIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiJIYW5kbGUgdGhlIHJlcXVlc3QgY29tcGxldGlvbiBldmVudC4iLCJpbmZvIjoiIiwieCI6NDEwLCJ5IjozMDAsIndpcmVzIjpbXX0seyJpZCI6Ijk0NjdiZTE2OTJhMWFlN2IiLCJ0eXBlIjoiaHR0cCByZXF1ZXN0IiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiIiwibWV0aG9kIjoiR0VUIiwicmV0Ijoib2JqIiwicGF5dG9xcyI6Imlnbm9yZSIsInVybCI6Imh0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS90b2RvcyIsInRscyI6IiIsInBlcnNpc3QiOmZhbHNlLCJwcm94eSI6IiIsImluc2VjdXJlSFRUUFBhcnNlciI6ZmFsc2UsImF1dGhUeXBlIjoiIiwic2VuZGVyciI6ZmFsc2UsImhlYWRlcnMiOltdLCJ4Ijo1NzAsInkiOjI0MCwid2lyZXMiOltbXV19XQ=="
---
::



## Output Message:

When a task is completed by a specified node in the Complete Node, it emits the same message object emitted by that specified node.


## Node Documentation

<div class="core-node-doc">

<p>Trigger a flow when another node completes its handling of a message.</p> <h3>Details</h3> <p>If a node tells the runtime when it has finished handling a message,
this node can be used to trigger a second flow.</p> <p>For example, this can be used alongside a node with no output port,
such as the Email sending node, to continue the flow.</p> <p>This node must be configured to handle the event for selected nodes in the
flow. Unlike the Catch node, it does not provide a 'handle all' mode automatically
applies to all nodes in the flow.</p> <p>Not all nodes will trigger this event - it will depend on whether they
have been implemented to support this feature as introduced in Node-RED 1.0.</p>

</div>