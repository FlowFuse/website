## What are HTTP request nodes used for in Node-RED

In Node-RED, an HTTP Request node allows you to make HTTP requests to external servers or services. This allows you to interact with web services, APIs, or any other HTTP-based endpoints.

When you configure an HTTP Request node, you typically specify the method (GET, POST, PUT, DELETE, among others), the URL of the endpoint you want to communicate with, any headers you need to include, and the payload if applicable. Once configured, this node will send the HTTP request when triggered by an incoming message or event.

## Configuring HTTP Request node

Below, you'll find a range of settings to tailor HTTP requests to fit the needs of different APIs or web services. Depending on the service you're working with, some options might be crucial, while others could be optional.

- **Method:** Select the HTTP method for the request (e.g., GET, POST, PUT, DELETE). You can dynamically set it using `msg.method`.
- **URL:** Specify the endpoint URL to communicate with. Dynamic URL setting is allowed using `msg.url`. additionally, if you want to construct a URL with the message's property you can utilize Mustache-style tags with double braces `{% raw %}{{ }}{% endraw %}`. For example, `example.com/{% raw %}{{topic}}{% endraw %}`, where the value of `msg.topic` will be automatically inserted. Using double braces `{% raw %}{{ }}{% endraw %}` performs HTML escaping by default, so special characters in the substituted value will be escaped. However, if you want to preserve special characters like `/` and `&` in the constructed URL, you can use triple braces `{% raw %}{{{ }}}{% endraw %}`.
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

{% renderFlow %}
[{"id":"b152a914653d9fce","type":"tab","label":"Flow 1","disabled":false,"info":"","env":[]},{"id":"dce407bcce963567","type":"inject","z":"b152a914653d9fce","name":"Get post ","props":[{"p":"topic","v":"1","vt":"num"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":200,"y":220,"wires":[["ea91769386ca7b48"]]},{"id":"ea91769386ca7b48","type":"http request","z":"b152a914653d9fce","name":"","method":"GET","ret":"obj","paytoqs":"ignore","url":"https://jsonplaceholder.typicode.com/posts/{{topic}}","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":490,"y":220,"wires":[["2f597047663e2964"]]},{"id":"2f597047663e2964","type":"debug","z":"b152a914653d9fce","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":740,"y":220,"wires":[]},{"id":"9f40509b6642d082","type":"comment","z":"b152a914653d9fce","name":"The HTTP request node retrieves posts from a mock API using the ID passed as a query parameter with `msg.topic` by the inject node.","info":"","x":510,"y":140,"wires":[]}]
{% endrenderFlow %}

2. Below is an example showing how you can send an HTTP POST request to a mock API. This example includes registering a user.

{% renderFlow %}
[{"id":"dce407bcce963567","type":"inject","z":"b152a914653d9fce","name":"Register With Mock API","props":[{"p":"payload.email","v":"eve.holt@reqres.in","vt":"str"},{"p":"payload.password","v":"password","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":220,"y":220,"wires":[["ea91769386ca7b48"]]},{"id":"ea91769386ca7b48","type":"http request","z":"b152a914653d9fce","name":"","method":"POST","ret":"txt","paytoqs":"ignore","url":"https://reqres.in/api/login","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":490,"y":220,"wires":[["2f597047663e2964"]]},{"id":"2f597047663e2964","type":"debug","z":"b152a914653d9fce","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":740,"y":220,"wires":[]},{"id":"9f40509b6642d082","type":"comment","z":"b152a914653d9fce","name":"The HTTP request node sends a POST request to register a user.","info":"","x":430,"y":140,"wires":[]}]
{% endrenderFlow %}

3. Below is an example demonstrating how you can dynamically set the URL, method, and headers for the HTTP request node. Additionally, this example illustrates sending a GET request to a mock API with an authorization token.

{% renderFlow %}
[{"id":"dce407bcce963567","type":"inject","z":"b152a914653d9fce","name":"make request ","props":[{"p":"url","v":"https://postman-echo.com/basic-auth","vt":"str"},{"p":"method","v":"GET","vt":"str"},{"p":"headers.Authorization","v":"Basic cG9zdG1hbjpwYXNzd29yZA","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":210,"y":220,"wires":[["ea91769386ca7b48"]]},{"id":"ea91769386ca7b48","type":"http request","z":"b152a914653d9fce","name":"","method":"use","ret":"obj","paytoqs":"ignore","url":"","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":490,"y":220,"wires":[["2f597047663e2964"]]},{"id":"2f597047663e2964","type":"debug","z":"b152a914653d9fce","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":740,"y":220,"wires":[]},{"id":"9f40509b6642d082","type":"comment","z":"b152a914653d9fce","name":"The HTTP request node retrieves posts from a mock API using the ID passed as a query parameter with `msg.topic` by the inject node.","info":"","x":510,"y":140,"wires":[]}]
{% endrenderFlow %}

4. Below is an example showing how you can send a PUT request using the HTTP request node. 

{% renderFlow %}
 [{"id":"dce407bcce963567","type":"inject","z":"b152a914653d9fce","name":"Update post","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"id\":1,\"title\":\"foo\",\"body\":\"bar\",\"userId\":1}","payloadType":"json","x":210,"y":220,"wires":[["ea91769386ca7b48"]]},{"id":"ea91769386ca7b48","type":"http request","z":"b152a914653d9fce","name":"","method":"PUT","ret":"obj","paytoqs":"ignore","url":"https://jsonplaceholder.typicode.com/posts/1","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":490,"y":220,"wires":[["2f597047663e2964"]]},{"id":"2f597047663e2964","type":"debug","z":"b152a914653d9fce","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":740,"y":220,"wires":[]},{"id":"9f40509b6642d082","type":"comment","z":"b152a914653d9fce","name":"The HTTP request node sends a PUT request to update the post.","info":"","x":470,"y":140,"wires":[]}]
{% endrenderFlow %}

5. Below is an example showing how you can send a DELETE request using the HTTP request node.

{% renderFlow %}
[{"id":"dce407bcce963567","type":"inject","z":"b152a914653d9fce","name":"delete post","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"str","x":200,"y":220,"wires":[["ea91769386ca7b48"]]},{"id":"ea91769386ca7b48","type":"http request","z":"b152a914653d9fce","name":"","method":"DELETE","ret":"obj","paytoqs":"ignore","url":"https://jsonplaceholder.typicode.com/posts/1","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":490,"y":220,"wires":[["2f597047663e2964"]]},{"id":"2f597047663e2964","type":"debug","z":"b152a914653d9fce","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":740,"y":220,"wires":[]},{"id":"9f40509b6642d082","type":"comment","z":"b152a914653d9fce","name":"The HTTP request node sends a DELETE request to delete a post.","info":"","x":440,"y":140,"wires":[]}]
{% endrenderFlow %}

## Output

- **payload:** The body of the response can be returned as a string, parsed JSON object, or a binary buffer.
- **statusCode:** Indicates the status code of the response or the error code if the request couldn't be completed.
- **headers:** An object containing the response headers.
- **responseURL:** Provides the final redirected URL if any redirects occurred during processing; otherwise, it shows the URL of the original request.
- **responseCookies:** If the response includes cookies, this property is an object containing name/value pairs for each cookie.
- **redirectList:** Accumulated information about redirects, including the next redirect destination (`location`) and cookies returned from the redirect source.
