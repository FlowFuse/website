---
eleventyNavigation:
  key: "HTTP Response"
  parent : Network
---

# Node-RED HTTP Response Node

## What is the HTTP Response node in Node-RED?

The HTTP Response node allows you to send tailored HTTP responses back to clients that make requests to your application. It enables you to customize status codes, headers, and response bodies, facilitating dynamic communication between your application and its users.

## Configuring HTTP Response node

- **Status code:** This field allows you to specify the HTTP status code to be included in the response. You can also set it with `msg.statusCode`. For more information on status codes, refer to [MDN Docs on HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).
- **Headers:** With this field you can add any custom HTTP headers to be included in the response. Headers provide additional information about the data being transferred between the client and server. You might use headers to specify the content type (Content-Type), set cookies, or provide caching directives. to set headers dynamically you can use `msg.headers` with JSON object containing headers.
- **Cookies:** To set cookies, you need to pass `msg.cookies` to the response node. The `msg.cookies` object should contain key-value pairs where the keys represent the names of the cookies, The value can be either a string to set the value of the cookie with default options, or it can be an object of options

The valid options include:

- **domain:** (String) Optional. Specifies the domain name for the cookie.
- **expires:** (Date) Optional. Specifies the expiration date for the cookie in GMT. If not specified or set to 0, it creates a session cookie. Setting the expiry to 0 means the cookie has no defined expiration time and will be discarded at the end of the browsing session.
- **maxAge:** (Number) Optional. Specifies the expiry date as relative to the current time in milliseconds.
- **path:** (String) Optional. Specifies the path for the cookie. Defaults to '/'.
- **value:** (String) Required. Specifies the value to use for the cookie.

To delete a cookie, set its value to `null`.

**Note: The messages sent to this node must originate from an HTTP input node**

## Usecases 

1. **Building RESTful APIs**: Use the HTTP Response node to send appropriate responses to incoming API requests. Customize status codes, headers, and response bodies based on the API endpoint and request parameters.
Authentication and Authorization:

2. **Implement authentication and authorization mechanisms in your application.** Utilize the HTTP Response node to set cookies upon successful authentication and to enforce access control by sending 401 Unauthorized or 403 Forbidden responses when necessary.

3. **Dynamic Content Generation:** Generate dynamic content for web applications and APIs. Respond to client requests with dynamically generated data by setting the response body dynamically in the HTTP Response node based on user input or backend computations.

4. **Error Handling:** Handle errors gracefully by configuring the HTTP Response node to send appropriate error responses. Use different status codes (e.g., 404 Not Found, 500 Internal Server Error) and include relevant error messages in the response body to aid troubleshooting and debugging.

5. **Session Management:** Manage user sessions by setting cookies with session identifiers and expiration dates using the HTTP Response node. Maintain user state across multiple requests and ensure secure session handling to enhance the user experience and application security.

6. **Content Negotiation:** Implement content negotiation mechanisms to serve different representations of resources (e.g., JSON, XML) based on client preferences. Use the HTTP Response node to set appropriate Content-Type headers and deliver the requested content format to the client.

7. **Cross-Origin Resource Sharing (CORS):** Enable Cross-Origin Resource Sharing (CORS) in your application to allow controlled access to resources from different origins. Configure the HTTP Response node to include CORS headers (e.g., Access-Control-Allow-Origin, Access-Control-Allow-Methods) to define the permitted cross-origin requests.

## Examples

1. In the example flow below, we demonstrate how you can set cookies using the HTTP Response node.

{% renderFlow %}
[{"id":"6eda375547f05f47","type":"group","z":"b5ea6d2a.6e7bb","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["2bd5d08c8203ed60","75ed75867c5f6920","fe6a06ebc6814dde","80b9896e7089da9b"],"x":174,"y":99,"w":612,"h":162},{"id":"2bd5d08c8203ed60","type":"http response","z":"b5ea6d2a.6e7bb","g":"6eda375547f05f47","name":"","statusCode":"200","headers":{},"x":700,"y":220,"wires":[]},{"id":"75ed75867c5f6920","type":"http in","z":"b5ea6d2a.6e7bb","g":"6eda375547f05f47","name":"","url":"/test","method":"get","upload":false,"swaggerDoc":"","x":260,"y":220,"wires":[["fe6a06ebc6814dde"]]},{"id":"fe6a06ebc6814dde","type":"change","z":"b5ea6d2a.6e7bb","g":"6eda375547f05f47","name":"set cookies","rules":[{"t":"set","p":"cookies","pt":"msg","to":"{\"name\":\"nick\",\"session\":{\"value\":\"1234\",\"maxAge\":900000}}","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":470,"y":220,"wires":[["2bd5d08c8203ed60"]]},{"id":"80b9896e7089da9b","type":"comment","z":"b5ea6d2a.6e7bb","g":"6eda375547f05f47","name":"Setting cookies using response node","info":"","x":480,"y":140,"wires":[]}]
{% endrenderFlow %}

2. In the following example, we demonstrate how you can send a response back to the requesting client and set headers using the HTTP Response node.

{% renderFlow %}
[{"id":"e7285a491834f67f","type":"group","z":"246014ec93295463","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["2bd5d08c8203ed60","75ed75867c5f6920","80b9896e7089da9b","414c874caa4abe9c"],"x":254,"y":199,"w":532,"h":162},{"id":"2bd5d08c8203ed60","type":"http response","z":"246014ec93295463","g":"e7285a491834f67f","name":"","statusCode":"200","headers":{"content-type":"text/html"},"x":700,"y":320,"wires":[]},{"id":"75ed75867c5f6920","type":"http in","z":"246014ec93295463","g":"e7285a491834f67f","name":"","url":"/test","method":"get","upload":false,"swaggerDoc":"","x":340,"y":320,"wires":[["414c874caa4abe9c"]]},{"id":"80b9896e7089da9b","type":"comment","z":"246014ec93295463","g":"e7285a491834f67f","name":"Sending html as response data","info":"","x":510,"y":240,"wires":[]},{"id":"414c874caa4abe9c","type":"template","z":"246014ec93295463","g":"e7285a491834f67f","name":"","field":"payload","fieldType":"msg","format":"html","syntax":"mustache","template":"<!DOCTYPE html>\n<html>\n<head>\n    <title>Simple HTML Example</title>\n</head>\n<body>\n    <h1>This is a Header</h1>\n    <p>This is a paragraph of text under the header.</p>\n</body>\n</html>","output":"str","x":520,"y":320,"wires":[["2bd5d08c8203ed60"]]}]
{% endrenderFlow %}
