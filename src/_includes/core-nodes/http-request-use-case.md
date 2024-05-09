## What are Http request nodes used for in Node-RED

In Node-RED, an HTTP Request node is a node that allows you to make HTTP requests to external servers or services. This node allows you to interact with web services, APIs, or any other HTTP-based endpoints.

When you configure an HTTP Request node, you typically specify the method (GET, POST, PUT, DELETE, etc.), the URL of the endpoint you want to communicate with, any headers you need to include, and the payload if applicable. Once configured, this node will send the HTTP request when triggered by an incoming message or event.

## Configuring HTTP Request node

Below, you'll find a range of settings to tailor HTTP requests to fit the needs of different APIs or web services. Depending on the service you're working with, some options might be crucial, while others could be optional.

- **Method:** Select the HTTP method for the request (e.g., GET, POST, PUT, DELETE). You can dynamically set it using `msg.method`.
- **URL:** Specify the endpoint URL to communicate with. Dynamic URL setting is allowed using `msg.url`. additionally, if you want to construct url with the message's property you can utilize Mustache-style tags in the URL. ex - example.com/{{{topic}}}, it will have the value of `msg.topic` automatically inserted. Using {{{...}}} prevents mustache from escaping characters like / & etc.
- **Payload:** Allows to choose how received payload from the previous node will be sent with the request:
  - **Ignore:** If enabled Payload will be ignored.
  - **Append to query-string parameter:** Enabling this option will Allow sending URL query string parameters using `msg.payload`.
  - **Send as request:** Send payload data as part of the request body.
- **Enable Secure Connection:** Activate SSL/TLS for secure communication. TLS configuration options are available.
  - **TLS Configuration:**
    - **Use key and certificates from local files:** If this option is enabled it will allow you to enter the path of the certificate files. if not, it allows to upload directly from the device
    - **Certificate:** the server's certificate( PEM FORMAT).
    - **Private Key:** the private key associated with the certificate ( PEM FORMAT).
    - **Passphrase (optional):** If the private key is encrypted, provide the passphrase.
    - **CA Certificate:** Optionally provide a CA certificate for certificate verification ( PEM FORMAT).
    - **Verify server certificate:** Enabling this option will verify the server certificate.
    - **Server Name:** Specify the server name for SNI (Server Name Indication).
    - **ALPN Protocol:** Specify the ALPN (Application-Layer Protocol Negotiation) protocol.
- **Use Authentication:** If required, allow to provide credentials for authentication.
  - **Type:** Select the authentication type.
    - **basic:** Uses Basic authentication where the username and password are sent in the request headers in Base64-encoded form.
      - **Username:** Provide the username for authentication.
      - **Password:** Provide the password for authentication.
    - **digest:** Uses Digest authentication, which is more secure than Basic authentication as it sends hashed passwords rather than plaintext.
    - **bearer:** Uses Bearer token authentication where a bearer token, typically a JSON Web Token (JWT), is sent in the Authorization header.
      - **Token:** Provide the bearer token if bearer authentication is selected.
- **Enable Connection Keep-Alive:** Enabling this option will allow Maintain persistent connections for efficiency.
- **Use Proxy:** Allows to Route requests through a proxy server if necessary. Utilize either the standard http_proxy environment variable or Node-RED's Proxy Configuration. However, note that Node-RED's configuration always takes precedence.
- **Only send non-2xx responses to Catch node:** Enabling this option will send only non-success responses to the Catch node.
- **Disable Strict HTTP Parsing:** Enabling this option relaxes how Node-RED interprets HTTP responses. It's handy when dealing with responses that don't perfectly match the standard HTTP format.
- **Return:** Allows to Choose the format for response data conversion
    - **A UTF-8 string:** Return response data as a UTF-8 string.
    - **A binary buffer:** Return response data as a binary buffer.
    - **A parsed JSON object:** Parse response data as JSON and return the object.
- **Headers:** Allows to  Add headers to the HTTP request such as content-type, accept, user agent, etc. You can dynamically set headers using `msg.headers`. However Reset `msg.headers` to avoid unintended header inheritance when using multiple http request nodes in the same flow. Moreover, If `msg.payload` is an Object, the node automatically sets the content-type to application/json.

## Output

- **Payload:** The body of the response can be returned as a string, parsed JSON object, or a binary buffer.
- **statusCode:** Indicates the status code of the response or the error code if the request couldn't be completed.
- **headers:** An object containing the response headers.
- **responseURL:** Provides the final redirected URL if any redirects occurred during processing; otherwise, it shows the URL of the original request.
- **responseCookies:** If the response includes cookies, this property is an object containing name/value pairs for each cookie.
- **redirectList:** Accumulated information about redirects, including the next redirect destination (`location`) and cookies returned from the redirect source.
