---
title: "Node-RED - HTTP in Node"
---
# HTTP in

## What are Http-in nodes used for in Node-RED

The "HTTP In" node in Node-RED is a core node that allows you to create an HTTP endpoint within your flow. It essentially sets up an HTTP server that listens for incoming HTTP requests on a specified URL path and HTTP method (e.g., GET, POST). When a request is received at this endpoint, it triggers the flow and allows you to process the request and generate a response using other nodes in the flow. you can send any type of data as a response whether it is html page, JSON, string, etc.

The baseurl will be the URL of the Node-RED instance at which your flow is deployed or the URL of the Node-RED editor.

## Configuring http-in node

- **Method:** Specify the HTTP method (e.g., GET, POST, PUT, DELETE) that the node should listen for, for more information on [Http request methods](https://devdoc.net/web/developer.mozilla.org/en-US/docs/Web/HTTP/Methods.html).
- **URL:** Define the endpoint at which it should listen. The path should look like "/test", and you can also set parameters like "/test/:id" to access them using `msg.params.id`.

## Sending response

*Note: This node does not send any response to the request. The flow must include an **HTTP Response node** to complete the request.*

## Examples

1. In the example flow below, we have an HTTP In node configured with the GET method and "/test" as the URL path. This node returns an HTML page as a response when a request is received.



::render-flow
---
height: 200
flow: "W3siaWQiOiJkNzA1YjZjYTIwNDgxYTE4IiwidHlwZSI6Imh0dHAgaW4iLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiIiLCJ1cmwiOiIvdGVzdCIsIm1ldGhvZCI6ImdldCIsInVwbG9hZCI6ZmFsc2UsInN3YWdnZXJEb2MiOiIiLCJ4IjoyMjAsInkiOjIyMCwid2lyZXMiOltbIjUwMGJjZjVkYjMyNWYxODgiXV19LHsiaWQiOiJmNzRjMzYyNjEwYTFmNGRkIiwidHlwZSI6ImRlYnVnIiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzgwLCJ5IjoxNjAsIndpcmVzIjpbXX0seyJpZCI6IjEwMmVjYWNiZjAyOWZhNjEiLCJ0eXBlIjoiaHR0cCByZXNwb25zZSIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IiIsInN0YXR1c0NvZGUiOiIyMDAiLCJoZWFkZXJzIjp7fSwieCI6ODAwLCJ5IjoyODAsIndpcmVzIjpbXX0seyJpZCI6IjUwMGJjZjVkYjMyNWYxODgiLCJ0eXBlIjoidGVtcGxhdGUiLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiIiLCJmaWVsZCI6InBheWxvYWQiLCJmaWVsZFR5cGUiOiJtc2ciLCJmb3JtYXQiOiJodG1sIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IjwhRE9DVFlQRSBodG1sPlxuPGh0bWwgbGFuZz1cImVuXCI+XG5cbjxoZWFkPlxuICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wXCI+XG4gICAgPHRpdGxlPkRldnMgcGFnZTwvdGl0bGU+XG48L2hlYWQ+XG5cbjxib2R5PlxuICAgIDxoMT5IZWxsbywgRGV2czwvaDE+XG48L2JvZHk+XG5cbjwvaHRtbD4iLCJvdXRwdXQiOiJzdHIiLCJ4Ijo0ODAsInkiOjIyMCwid2lyZXMiOltbImY3NGMzNjI2MTBhMWY0ZGQiLCIxMDJlY2FjYmYwMjlmYTYxIl1dfSx7ImlkIjoiZDBiZDBlNDMwMTFhMzNiMSIsInR5cGUiOiJjb21tZW50IiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiVGhlIEhUVFAgSW4gbm9kZSByZXR1cm5zIGFuIEhUTUwgcGFnZSBhcyByZXNwb25zZSB3aGVuIGEgcmVxdWVzdCBpcyByZWNlaXZlZCBhdCB0aGUgc3BlY2lmaWVkIHBhdGguIiwiaW5mbyI6IiIsIngiOjUxMCwieSI6MTAwLCJ3aXJlcyI6W119XQ=="
---
::



2. In the example flow below, we have an HTTP In node configured to return the todo item as a JSON object stored in the global context, associated with the requested ID provided as a request parameter.



::render-flow
---
height: 200
flow: "W3siaWQiOiJkNzA1YjZjYTIwNDgxYTE4IiwidHlwZSI6Imh0dHAgaW4iLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiIiLCJ1cmwiOiIvdG9kby86aWQiLCJtZXRob2QiOiJnZXQiLCJ1cGxvYWQiOmZhbHNlLCJzd2FnZ2VyRG9jIjoiIiwieCI6MjcwLCJ5IjozNjAsIndpcmVzIjpbWyJjYzI4YTRhZTA4MDQyY2QyIl1dfSx7ImlkIjoiZjc0YzM2MjYxMGExZjRkZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjg4MCwieSI6MzAwLCJ3aXJlcyI6W119LHsiaWQiOiIxMDJlY2FjYmYwMjlmYTYxIiwidHlwZSI6Imh0dHAgcmVzcG9uc2UiLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiIiLCJzdGF0dXNDb2RlIjoiMjAwIiwiaGVhZGVycyI6e30sIngiOjg4MCwieSI6NDIwLCJ3aXJlcyI6W119LHsiaWQiOiJkMGJkMGU0MzAxMWEzM2IxIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiJUaGUgSFRUUCBJbiBub2RlIHJldHVybnMgdGhlIHRvZG8gaXRlbSBhc3NvY2lhdGVkIHdpdGggdGhlIHJlcXVlc3RlZCBJRCBwcm92aWRlZCBhcyBhIHJlcXVlc3QgcGFyYW1ldGVyLiIsImluZm8iOiIiLCJ4Ijo1NDAsInkiOjE2MCwid2lyZXMiOltdfSx7ImlkIjoiMjU1MDI4Y2FjZjY5OGE0ZiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjp0cnVlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiWyAgIHsgICAgIFwiaWRcIjogMSwgICAgIFwidGFza1wiOiBcIkNvbXBsZXRlIGhvbWV3b3JrXCIsICAgICBcImNvbXBsZXRlZFwiOiBmYWxzZSAgIH0sICAgeyAgICAgXCJpZFwiOiAyLCAgICAgXCJ0YXNrXCI6IFwiR28gZm9yIGEgcnVuXCIsICAgICBcImNvbXBsZXRlZFwiOiB0cnVlICAgfSwgICB7ICAgICBcImlkXCI6IDMsICAgICBcInRhc2tcIjogXCJCdXkgZ3JvY2VyaWVzXCIsICAgICBcImNvbXBsZXRlZFwiOiBmYWxzZSAgIH0gXSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjI3MCwieSI6MjQwLCJ3aXJlcyI6W1siNTYwNDg0ZGJmOWRhOWYyNyJdXX0seyJpZCI6IjU2MDQ4NGRiZjlkYTlmMjciLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiU3RvcmUgc2ltdWxhdGVkIHRvZG8gSlNPTiAgaW4gZ2xvYmFsIGNvbnRleHQiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJ0b2RvcyIsInB0IjoiZ2xvYmFsIiwidG8iOiJwYXlsb2FkIiwidG90IjoibXNnIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjU5MCwieSI6MjQwLCJ3aXJlcyI6W1tdXX0seyJpZCI6ImNjMjhhNGFlMDgwNDJjZDIiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiJGaWx0ZXIgZGF0YSBiYXNlZCBvbiByZWNpdmVkIHBhcmFtIGkiLCJmdW5jIjoibGV0IGlkID0gTnVtYmVyKG1zZy5yZXEucGFyYW1zLmlkKTtcbmxldCB0b2RvTGlzdCA9IGdsb2JhbC5nZXQoJ3RvZG9zJyk7XG5sZXQgdG9kbyA9IHRvZG9MaXN0LmZpbHRlcigodGFzayk9PnRhc2suaWQ9PT1pZCk7XG5tc2cucGF5bG9hZCA9IHRvZG87XG5yZXR1cm4gbXNnOyIsIm91dHB1dHMiOjEsInRpbWVvdXQiOjAsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6NjAwLCJ5IjozNjAsIndpcmVzIjpbWyJmNzRjMzYyNjEwYTFmNGRkIiwiMTAyZWNhY2JmMDI5ZmE2MSJdXX1d"
---
::



3. In the example flow below, we have an HTTP In node configured with the POST method and "/todo" as the URL path. When a POST request containing a todo JSON object is received, it stores it in the todo list within the global context.



::render-flow
---
height: 200
flow: "W3siaWQiOiIyMDMxOTUyNTJmNzFkOWY0IiwidHlwZSI6Imh0dHAgaW4iLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiIiLCJ1cmwiOiIvdG9kbyIsIm1ldGhvZCI6InBvc3QiLCJ1cGxvYWQiOnRydWUsInN3YWdnZXJEb2MiOiIiLCJ4IjoyMjAsInkiOjI4MCwid2lyZXMiOltbIjkzZGYzYzA3YWU0YWQyMjgiLCI5OTVkYTE0ZTJhNjg4NzU4Il1dfSx7ImlkIjoiOTNkZjNjMDdhZTRhZDIyOCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjUwMCwieSI6MjQwLCJ3aXJlcyI6W119LHsiaWQiOiJlYjQ0N2E1YTYxZjY2NTRkIiwidHlwZSI6Imh0dHAgcmVzcG9uc2UiLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiIiLCJzdGF0dXNDb2RlIjoiMjAxIiwiaGVhZGVycyI6e30sIngiOjgyMCwieSI6MzIwLCJ3aXJlcyI6W119LHsiaWQiOiI5OTVkYTE0ZTJhNjg4NzU4IiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoic3RvcmUgdG9kbyBpbiB0b2RvbGlzdCAiLCJmdW5jIjoibGV0IHRvZG9MaXN0ID0gZ2xvYmFsLmdldCgndG9kb3MnKSB8fCBbXTtcbmxldCBuZXdUb2RvID0gbXNnLnBheWxvYWQ7XG5cbnRvZG9MaXN0LnB1c2gobmV3VG9kbyk7XG5nbG9iYWwuc2V0KCd0b2RvcycsdG9kb0xpc3QpXG5yZXR1cm4gbXNnOyIsIm91dHB1dHMiOjEsInRpbWVvdXQiOjAsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6NTIwLCJ5IjozMjAsIndpcmVzIjpbWyJlYjQ0N2E1YTYxZjY2NTRkIl1dfSx7ImlkIjoiNTAzOTM3YzRmYzhiNzkwMiIsInR5cGUiOiJjb21tZW50IiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiVGhlIEhUVFAgSW4gbm9kZSBzdG9yZXMgdGhlIHRvZG8gb2JqZWN0IGluIHRoZSB0b2RvbGlzdCB3aGVuIGEgUE9TVCByZXF1ZXN0IHdpdGggYSB0b2RvIG9iamVjdCBpcyByZWNlaXZlZC4iLCJpbmZvIjoiIiwieCI6NTIwLCJ5IjoxODAsIndpcmVzIjpbXX1d"
---
::



## Output 

- **payload:**
  For a GET request, contains an object of any query string parameters. Otherwise, contains the body of the HTTP request.
- **req object:**
  An HTTP request object. This object contains multiple properties that provide information about the request.
  - **body:** The body of the incoming request. The format will depend on the request.
  - **headers:** An object containing the HTTP request headers.
  - **query:** An object containing any query string parameters.
  - **params:** An object containing any route parameters.
  - **cookies:** An object containing the cookies for the request.
  - **files:** If enabled within the node, an object containing any files uploaded as part of a POST request.
- **res object:** An HTTP response object. This property should not be used directly;





## Node Documentation

<div class="core-node-doc">

<p>Creates an HTTP end-point for creating web services.</p> <h3>Outputs</h3> <dl class="message-properties">
<dt>payload</dt>
<dd>For a GET request, contains an object of any query string parameters.
Otherwise, contains the body of the HTTP request.</dd>
<dt>req<span class="property-type">object</span></dt>
<dd>An HTTP request object. This object contains multiple properties that
provide information about the request.
<ul>
<li><code>body</code> - the body of the incoming request. The format
will depend on the request.</li>
<li><code>headers</code> - an object containing the HTTP request headers.</li>
<li><code>query</code> - an object containing any query string parameters.</li>
<li><code>params</code> - an object containing any route parameters.</li>
<li><code>cookies</code> - an object containing the cookies for the request.</li>
<li><code>files</code> - if enabled within the node, an object containing
any files uploaded as part of a POST request.</li>
</ul>
</dd>
<dt>res<span class="property-type">object</span></dt>
<dd>An HTTP response object. This property should not be used directly;
the <code>HTTP Response</code> node documents how to respond to a request.
This property must remain attached to the message passed to the response node.</dd>
</dl> <h3>Details</h3> <p>The node will listen on the configured path for requests of a particular type.
The path can be fully specified, such as <code>/user</code>, or include
named parameters that accept any value, such as <code>/user/:name</code>.
When named parameters are used, their actual value in a request can be accessed under <code>msg.req.params</code>.</p> <p>For requests that include a body, such as a POST or PUT, the contents of
the request is made available as <code>msg.payload</code>.</p> <p>If the content type of the request can be determined, the body will be parsed to
any appropriate type. For example, <code>application/json</code> will be parsed to
its JavaScript object representation.</p> <p>The node can be configured to not parse the body, in which case it will be provided as a Buffer object.</p> <p><b>Note:</b> this node does not send any response to the request. The flow
must include an HTTP Response node to complete the request.</p>

</div>