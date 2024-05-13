## What are HTTP Proxy Nodes in Node-RED?

The HTTP Proxy Config node in Node-RED allows you to configure settings for an HTTP proxy server. It enables routing outgoing HTTP requests through a specified proxy. This is useful for scenarios where internet access requires passing through a proxy server. However, this node is not directly available in the Node-RED palette; it may be accessible within Node-RED core nodes and custom nodes used for communicating with other services over the internet.

### What is an HTTP Proxy?

An HTTP proxy is a server that sits between a client and one or more other servers. The HTTP proxy intercepts all HTTP(S) requests from that client and decides to which server the request needs to be forwarded. Once the server has responded, the HTTP proxy returns the response to the client.

### Why Use a Proxy When Requesting to Other Services?

- **Privacy:** Proxy servers can hide the requester's IP address, enhancing privacy online.
- **Security and Encryption:** Proxies can provide an additional layer of security by encrypting communication between the client and the destination server. This helps safeguard sensitive data from potential threats or eavesdropping.

## Configuring the HTTP Proxy Config Node

- **URL:** The URL of the proxy server through which outgoing HTTP requests will be routed. This could be an IP address or a domain name.
- **Use Proxy Authentication:** Whether the proxy server requires authentication credentials for access. If this option is enabled, you'll need to provide a username and password.
- **Ignore Hosts:** An optional setting that allows you to specify hosts that should bypass the proxy and connect directly to the destination server. This can be useful for accessing local resources or services that don't need to pass through the proxy.

*Note: When accessing to the host in the ignored host list, no proxy will be used.*
