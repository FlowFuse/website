---
title: "Node-RED - HTTP request Node"
---
# HTTP request

## What are HTTP request nodes used for in Node-RED

In Node-RED, an HTTP Request node allows you to make HTTP requests to external servers or services. This allows you to interact with web services, APIs, or any other HTTP-based endpoints.

When you configure an HTTP Request node, you typically specify the method (GET, POST, PUT, DELETE, among others), the URL of the endpoint you want to communicate with, any headers you need to include, and the payload if applicable. Once configured, this node will send the HTTP request when triggered by an incoming message or event.

## Configuring HTTP Request node

Below, you'll find a range of settings to tailor HTTP requests to fit the needs of different APIs or web services. Depending on the service you're working with, some options might be crucial, while others could be optional.

- **Method:** Select the HTTP method for the request (e.g., GET, POST, PUT, DELETE). You can dynamically set it using `msg.method`.
- **URL:** Specify the endpoint URL to communicate with. Dynamic URL setting is allowed using `msg.url`. additionally, if you want to construct a URL with the message's property you can utilize Mustache-style tags with double braces `{{ }}`. For example, `example.com/{{topic}}`, where the value of `msg.topic` will be automatically inserted. Using double braces `{{ }}` performs HTML escaping by default, so special characters in the substituted value will be escaped. However, if you want to preserve special characters like `/` and `&` in the constructed URL, you can use triple braces `{{{ }}}`.
- **Payload:** Allows to choose how received payload from the previous node will be sent with the request:
  - **Ignore:** If enabled Payload will be ignored.
  - **Append to query-string parameter:** Enabling this option will Allow sending URL query string parameters using `msg.payload`.
  - **Send as request:** Send payload data as part of the request body.
- **Enable Secure Connection:** Allows to activate SSL/TLS for secure communication. TLS configuration options are available, For more information refer to [TLS config node](/node-red/core-nodes/tls).
- **Use Authentication:** If required, allow to provide credentials for authentication.
  - **Type:** Select the authentication type.
    - **basic:** Uses Basic authentication where the username and password are sent in the request headers in Base64-encoded form.
      - **Username:** Provide the username for authentication.
      - **Password:** Provide the password for authentication.
    - **digest:** Uses Digest authentication, which is more secure than Basic authentication as it sends hashed passwords rather than plaintext.
    - **bearer:** Uses Bearer token authentication where a bearer token, typically a JSON Web Token (JWT), is sent in the Authorization header.
      - **Token:** Provide the bearer token if bearer authentication is selected.
- **Enable Connection Keep-Alive:** Enabling this option will allow Maintain persistent connections for efficiency.
- **Use Proxy:** Allows to Route requests through a proxy server if necessary, for more information on the configuration of [HTTP Proxy](/node-red/core-nodes/http-proxy/) config node
- **Only send non-2xx responses to Catch node:** Enabling this option will send only non-success responses to the Catch node.
- **Disable Strict HTTP Parsing:** Enabling this option relaxes how Node-RED interprets HTTP responses. It's handy when dealing with responses that don't perfectly match the standard HTTP format.
- **Return:** Allows to Choose the format for response data conversion
    - **A UTF-8 string:** Return response data as a UTF-8 string.
    - **A binary buffer:** Return response data as a binary buffer.
    - **A parsed JSON object:** Parse response data as JSON and return the object.
- **Headers:** Allows to  Add headers to the HTTP request such as content-type, accept, user agent, etc. You can dynamically set headers using `msg.headers`. However Reset `msg.headers` to avoid unintended header inheritance when using multiple HTTP request nodes in the same flow. Moreover, If `msg.payload` is an Object, the node automatically sets the `Content-Type` to `application/json`.

## Usecase

1. **API Integration:** The HTTP request node allows seamless integration with external APIs. Developers can utilize it to fetch data from APIs using GET requests or send data to APIs using POST/PUT requests. For instance, fetching weather data from a weather API or posting data to a messaging service like Slack are common scenarios.

2. **Webhooks:** With the HTTP request node, users can set up webhooks to trigger actions in response to specific events. This enables real-time communication between different applications. For example, triggering a webhook to notify a third-party service when certain conditions are met or when data is received from a sensor. For more information, refer to [Using webhook with Node-RED](/node-red/integration-technologies/webhook/)

3. **Remote Control and Device Management:** In smart home systems, the HTTP request node can be used to facilitates remote device management. It allows users to control various devices such as lights, thermostats, and security cameras via web or mobile interfaces by interacting with device APIs. Actions like toggling devices, adjusting settings, and receiving real-time updates can be achieved through the HTTP request node.

These are a few use cases of the HTTP Request node, but its ability to communicate with other services is a significant and core capability. This capability alone opens the door to a diverse array of different use cases.

## Examples

1. Below is an example showing how you can construct a URL with message properties in the HTTP request node, an example includes sending a GET request.



::render-flow
---
height: 200
flow: "W3siaWQiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwidHlwZSI6InRhYiIsImxhYmVsIjoiRmxvdyAxIiwiZGlzYWJsZWQiOmZhbHNlLCJpbmZvIjoiIiwiZW52IjpbXX0seyJpZCI6ImRjZTQwN2JjY2U5NjM1NjciLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiR2V0IHBvc3QgIiwicHJvcHMiOlt7InAiOiJ0b3BpYyIsInYiOiIxIiwidnQiOiJudW0ifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjAwLCJ5IjoyMjAsIndpcmVzIjpbWyJlYTkxNzY5Mzg2Y2E3YjQ4Il1dfSx7ImlkIjoiZWE5MTc2OTM4NmNhN2I0OCIsInR5cGUiOiJodHRwIHJlcXVlc3QiLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiIiLCJtZXRob2QiOiJHRVQiLCJyZXQiOiJvYmoiLCJwYXl0b3FzIjoiaWdub3JlIiwidXJsIjoiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzL3t7dG9waWN9fSIsInRscyI6IiIsInBlcnNpc3QiOmZhbHNlLCJwcm94eSI6IiIsImluc2VjdXJlSFRUUFBhcnNlciI6ZmFsc2UsImF1dGhUeXBlIjoiIiwic2VuZGVyciI6ZmFsc2UsImhlYWRlcnMiOltdLCJ4Ijo0OTAsInkiOjIyMCwid2lyZXMiOltbIjJmNTk3MDQ3NjYzZTI5NjQiXV19LHsiaWQiOiIyZjU5NzA0NzY2M2UyOTY0IiwidHlwZSI6ImRlYnVnIiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NDAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiOWY0MDUwOWI2NjQyZDA4MiIsInR5cGUiOiJjb21tZW50IiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiVGhlIEhUVFAgcmVxdWVzdCBub2RlIHJldHJpZXZlcyBwb3N0cyBmcm9tIGEgbW9jayBBUEkgdXNpbmcgdGhlIElEIHBhc3NlZCBhcyBhIHF1ZXJ5IHBhcmFtZXRlciB3aXRoIGBtc2cudG9waWNgIGJ5IHRoZSBpbmplY3Qgbm9kZS4iLCJpbmZvIjoiIiwieCI6NTEwLCJ5IjoxNDAsIndpcmVzIjpbXX1d"
---
::



2. Below is an example showing how you can send an HTTP POST request to a mock API. This example includes registering a user.



::render-flow
---
height: 200
flow: "W3siaWQiOiJkY2U0MDdiY2NlOTYzNTY3IiwidHlwZSI6ImluamVjdCIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6IlJlZ2lzdGVyIFdpdGggTW9jayBBUEkiLCJwcm9wcyI6W3sicCI6InBheWxvYWQuZW1haWwiLCJ2IjoiZXZlLmhvbHRAcmVxcmVzLmluIiwidnQiOiJzdHIifSx7InAiOiJwYXlsb2FkLnBhc3N3b3JkIiwidiI6InBhc3N3b3JkIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjIwLCJ5IjoyMjAsIndpcmVzIjpbWyJlYTkxNzY5Mzg2Y2E3YjQ4Il1dfSx7ImlkIjoiZWE5MTc2OTM4NmNhN2I0OCIsInR5cGUiOiJodHRwIHJlcXVlc3QiLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiIiLCJtZXRob2QiOiJQT1NUIiwicmV0IjoidHh0IiwicGF5dG9xcyI6Imlnbm9yZSIsInVybCI6Imh0dHBzOi8vcmVxcmVzLmluL2FwaS9sb2dpbiIsInRscyI6IiIsInBlcnNpc3QiOmZhbHNlLCJwcm94eSI6IiIsImluc2VjdXJlSFRUUFBhcnNlciI6ZmFsc2UsImF1dGhUeXBlIjoiIiwic2VuZGVyciI6ZmFsc2UsImhlYWRlcnMiOltdLCJ4Ijo0OTAsInkiOjIyMCwid2lyZXMiOltbIjJmNTk3MDQ3NjYzZTI5NjQiXV19LHsiaWQiOiIyZjU5NzA0NzY2M2UyOTY0IiwidHlwZSI6ImRlYnVnIiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NDAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiOWY0MDUwOWI2NjQyZDA4MiIsInR5cGUiOiJjb21tZW50IiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiVGhlIEhUVFAgcmVxdWVzdCBub2RlIHNlbmRzIGEgUE9TVCByZXF1ZXN0IHRvIHJlZ2lzdGVyIGEgdXNlci4iLCJpbmZvIjoiIiwieCI6NDMwLCJ5IjoxNDAsIndpcmVzIjpbXX1d"
---
::



3. Below is an example demonstrating how you can dynamically set the URL, method, and headers for the HTTP request node. Additionally, this example illustrates sending a GET request to a mock API with an authorization token.



::render-flow
---
height: 200
flow: "W3siaWQiOiJkY2U0MDdiY2NlOTYzNTY3IiwidHlwZSI6ImluamVjdCIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6Im1ha2UgcmVxdWVzdCAiLCJwcm9wcyI6W3sicCI6InVybCIsInYiOiJodHRwczovL3Bvc3RtYW4tZWNoby5jb20vYmFzaWMtYXV0aCIsInZ0Ijoic3RyIn0seyJwIjoibWV0aG9kIiwidiI6IkdFVCIsInZ0Ijoic3RyIn0seyJwIjoiaGVhZGVycy5BdXRob3JpemF0aW9uIiwidiI6IkJhc2ljIGNHOXpkRzFoYmpwd1lYTnpkMjl5WkEiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyMTAsInkiOjIyMCwid2lyZXMiOltbImVhOTE3NjkzODZjYTdiNDgiXV19LHsiaWQiOiJlYTkxNzY5Mzg2Y2E3YjQ4IiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6IiIsIm1ldGhvZCI6InVzZSIsInJldCI6Im9iaiIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiIiLCJ0bHMiOiIiLCJwZXJzaXN0IjpmYWxzZSwicHJveHkiOiIiLCJpbnNlY3VyZUhUVFBQYXJzZXIiOmZhbHNlLCJhdXRoVHlwZSI6IiIsInNlbmRlcnIiOmZhbHNlLCJoZWFkZXJzIjpbXSwieCI6NDkwLCJ5IjoyMjAsIndpcmVzIjpbWyIyZjU5NzA0NzY2M2UyOTY0Il1dfSx7ImlkIjoiMmY1OTcwNDc2NjNlMjk2NCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc0MCwieSI6MjIwLCJ3aXJlcyI6W119LHsiaWQiOiI5ZjQwNTA5YjY2NDJkMDgyIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiJUaGUgSFRUUCByZXF1ZXN0IG5vZGUgcmV0cmlldmVzIHBvc3RzIGZyb20gYSBtb2NrIEFQSSB1c2luZyB0aGUgSUQgcGFzc2VkIGFzIGEgcXVlcnkgcGFyYW1ldGVyIHdpdGggYG1zZy50b3BpY2AgYnkgdGhlIGluamVjdCBub2RlLiIsImluZm8iOiIiLCJ4Ijo1MTAsInkiOjE0MCwid2lyZXMiOltdfV0="
---
::



4. Below is an example showing how you can send a PUT request using the HTTP request node. 



::render-flow
---
height: 200
flow: "W3siaWQiOiJkY2U0MDdiY2NlOTYzNTY3IiwidHlwZSI6ImluamVjdCIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6IlVwZGF0ZSBwb3N0IiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJ7XCJpZFwiOjEsXCJ0aXRsZVwiOlwiZm9vXCIsXCJib2R5XCI6XCJiYXJcIixcInVzZXJJZFwiOjF9IiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MjEwLCJ5IjoyMjAsIndpcmVzIjpbWyJlYTkxNzY5Mzg2Y2E3YjQ4Il1dfSx7ImlkIjoiZWE5MTc2OTM4NmNhN2I0OCIsInR5cGUiOiJodHRwIHJlcXVlc3QiLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiIiLCJtZXRob2QiOiJQVVQiLCJyZXQiOiJvYmoiLCJwYXl0b3FzIjoiaWdub3JlIiwidXJsIjoiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzLzEiLCJ0bHMiOiIiLCJwZXJzaXN0IjpmYWxzZSwicHJveHkiOiIiLCJpbnNlY3VyZUhUVFBQYXJzZXIiOmZhbHNlLCJhdXRoVHlwZSI6IiIsInNlbmRlcnIiOmZhbHNlLCJoZWFkZXJzIjpbXSwieCI6NDkwLCJ5IjoyMjAsIndpcmVzIjpbWyIyZjU5NzA0NzY2M2UyOTY0Il1dfSx7ImlkIjoiMmY1OTcwNDc2NjNlMjk2NCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc0MCwieSI6MjIwLCJ3aXJlcyI6W119LHsiaWQiOiI5ZjQwNTA5YjY2NDJkMDgyIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiJUaGUgSFRUUCByZXF1ZXN0IG5vZGUgc2VuZHMgYSBQVVQgcmVxdWVzdCB0byB1cGRhdGUgdGhlIHBvc3QuIiwiaW5mbyI6IiIsIngiOjQ3MCwieSI6MTQwLCJ3aXJlcyI6W119XQ=="
---
::



5. Below is an example showing how you can send a DELETE request using the HTTP request node.



::render-flow
---
height: 200
flow: "W3siaWQiOiJkY2U0MDdiY2NlOTYzNTY3IiwidHlwZSI6ImluamVjdCIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6ImRlbGV0ZSBwb3N0IiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjIwMCwieSI6MjIwLCJ3aXJlcyI6W1siZWE5MTc2OTM4NmNhN2I0OCJdXX0seyJpZCI6ImVhOTE3NjkzODZjYTdiNDgiLCJ0eXBlIjoiaHR0cCByZXF1ZXN0IiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiIiwibWV0aG9kIjoiREVMRVRFIiwicmV0Ijoib2JqIiwicGF5dG9xcyI6Imlnbm9yZSIsInVybCI6Imh0dHBzOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS9wb3N0cy8xIiwidGxzIjoiIiwicGVyc2lzdCI6ZmFsc2UsInByb3h5IjoiIiwiaW5zZWN1cmVIVFRQUGFyc2VyIjpmYWxzZSwiYXV0aFR5cGUiOiIiLCJzZW5kZXJyIjpmYWxzZSwiaGVhZGVycyI6W10sIngiOjQ5MCwieSI6MjIwLCJ3aXJlcyI6W1siMmY1OTcwNDc2NjNlMjk2NCJdXX0seyJpZCI6IjJmNTk3MDQ3NjYzZTI5NjQiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYjE1MmE5MTQ2NTNkOWZjZSIsIm5hbWUiOiJkZWJ1ZyAxIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoidHJ1ZSIsInRhcmdldFR5cGUiOiJmdWxsIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NDAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiOWY0MDUwOWI2NjQyZDA4MiIsInR5cGUiOiJjb21tZW50IiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiVGhlIEhUVFAgcmVxdWVzdCBub2RlIHNlbmRzIGEgREVMRVRFIHJlcXVlc3QgdG8gZGVsZXRlIGEgcG9zdC4iLCJpbmZvIjoiIiwieCI6NDQwLCJ5IjoxNDAsIndpcmVzIjpbXX1d"
---
::



## Output

- **payload:** The body of the response can be returned as a string, parsed JSON object, or a binary buffer.
- **statusCode:** Indicates the status code of the response or the error code if the request couldn't be completed.
- **headers:** An object containing the response headers.
- **responseURL:** Provides the final redirected URL if any redirects occurred during processing; otherwise, it shows the URL of the original request.
- **responseCookies:** If the response includes cookies, this property is an object containing name/value pairs for each cookie.
- **redirectList:** Accumulated information about redirects, including the next redirect destination (`location`) and cookies returned from the redirect source.


## Node Documentation

<div class="core-node-doc">

<p>Sends HTTP requests and returns the response.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt class="optional">url <span class="property-type">string</span></dt>
<dd>If not configured in the node, this optional property sets the url of the request.</dd>
<dt class="optional">method <span class="property-type">string</span></dt>
<dd>If not configured in the node, this optional property sets the HTTP method of the request.
Must be one of <code>GET</code>, <code>PUT</code>, <code>POST</code>, <code>PATCH</code> or <code>DELETE</code>.</dd>
<dt class="optional">headers <span class="property-type">object</span></dt>
<dd>Sets the HTTP headers of the request. NOTE: Any headers set in the node configuration will overwrite any matching headers in <code>msg.headers</code> </dd>
<dt class="optional">cookies <span class="property-type">object</span></dt>
<dd>If set, can be used to send cookies with the request.</dd>
<dt class="optional">payload</dt>
<dd>Sent as the body of the request.</dd>
<dt class="optional">rejectUnauthorized</dt>
<dd>If set to <code>false</code>, allows requests to be made to https sites that use
self signed certificates.</dd>
<dt class="optional">followRedirects</dt>
<dd>If set to <code>false</code> prevent following Redirect (HTTP 301).<code>true</code> by default</dd>
<dt class="optional">requestTimeout</dt>
<dd>If set to a positive number of milliseconds, will override the globally set <code>httpRequestTimeout</code> parameter.</dd>
</dl> <h3>Outputs</h3> <dl class="message-properties">
<dt>payload <span class="property-type">string | object | buffer</span></dt>
<dd>The body of the response. The node can be configured to return the body
as a string, attempt to parse it as a JSON string or leave it as a
binary buffer.</dd>
<dt>statusCode <span class="property-type">number</span></dt>
<dd>The status code of the response, or the error code if the request could not be completed.</dd>
<dt>headers <span class="property-type">object</span></dt>
<dd>An object containing the response headers.</dd>
<dt>responseUrl <span class="property-type">string</span></dt>
<dd>In case any redirects occurred while processing the request, this property is the final redirected url.
Otherwise, the url of the original request.</dd>
<dt>responseCookies <span class="property-type">object</span></dt>
<dd>If the response includes cookies, this property is an object of name/value pairs for each cookie.</dd>
<dt>redirectList <span class="property-type">array</span></dt>
<dd>If the request was redirected one or more times, the accumulated information will be added to this property. `location` is the next redirect destination. `cookies` is the cookies returned from the redirect source.</dd>
</dl> <h3>Details</h3> <p>When configured within the node, the URL property can contain <a href="http://mustache.github.io/mustache.5.html" target="_blank">mustache-style</a> tags. These allow the
url to be constructed using values of the incoming message. For example, if the url is set to
<code>example.com/{{{topic}}}</code>, it will have the value of <code>msg.topic</code> automatically inserted.
Using {{{...}}} prevents mustache from escaping characters like / &amp; etc.</p> <p>The node can optionally automatically encode <code>msg.payload</code> as query string parameters for a GET request, in which case <code>msg.payload</code> has to be an object.</p> <p><b>Note</b>: If running behind a proxy, the standard <code>http_proxy=...</code> environment variable should be set and Node-RED restarted, or use Proxy Configuration. If Proxy Configuration was set, the configuration take precedence over environment variable.</p> <h4>Using multiple HTTP Request nodes</h4> <p>In order to use more than one of these nodes in the same flow, care must be taken with
the <code>msg.headers</code> property. The first node will set this property with
the response headers. The next node will then use those headers for its request - this
is not usually the right thing to do. If <code>msg.headers</code> property is left unchanged
between nodes, it will be ignored by the second node. To set custom headers, <code>msg.headers</code>
should first be deleted or reset to an empty object: <code>{}</code>.
<h4>Cookie handling</h4>
<p>The <code>cookies</code> property passed to the node must be an object of name/value pairs.
The value can be either a string to set the value of the cookie or it can be an
object with a single <code>value</code> property.</p>
<p>Any cookies returned by the request are passed back under the <code>responseCookies</code> property.</p>
<h4>Content type handling</h4>
<p>If <code>msg.payload</code> is an Object, the node will automatically set the content type
of the request to <code>application/json</code> and encode the body as such.</p>
<p>To encode the request as form data, <code>msg.headers["content-type"]</code> should be set to <code>application/x-www-form-urlencoded</code>.</p>
<h4>File Upload</h4>
<p>To perform a file upload, <code>msg.headers["content-type"]</code> should be set to <code>multipart/form-data</code>
and the <code>msg.payload</code> passed to the node must be an object with the following structure:</p>
<pre><code>{
"KEY": {
"value": FILE_CONTENTS,
"options": {
"filename": "FILENAME"
}
}
}</code></pre>
<p>The values of <code>KEY</code>, <code>FILE_CONTENTS</code> and <code>FILENAME</code>
should be set to the appropriate values.</p>


</p>

</div>