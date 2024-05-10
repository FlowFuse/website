## What is TLS config node in Node-RED?

In Node-RED, the TLS Config node is used to configure Transport Layer Security (TLS) settings for secure communication over networks. TLS ensures that data transmitted between applications, servers, devices is encrypted and secure. However, this node is not directly available in the Node-RED palette; it is accessible within Node-RED core nodes and custom nodes used for communicating with other services over the internet.

## Configuring TLS config node

- **Use key and certificates from local files:** Enabling this option will allow you to enter the path of the certificate files if not, allows to upload directly from the device
- **Certificate:** the server's certificate( PEM FORMAT) .
- **Private Key:** the private key associated with the certificate ( PEM FORMAT).
- **Passphrase (optional):** If the private key is encrypted, provide the passphrase.
- **CA Certificate:** Optionally provide a CA certificate for certificate verification ( PEM FORMAT).
- **Verify server certificate:** Enabling this option will verify the server certificate.
- **Server Name:** Specify the server name for SNI (Server Name Indication).
- **ALPN Protocol:** Specify the ALPN (Application-Layer Protocol Negotiation) protocol.

Additionally, it's worth noting that TLS configuration details can also be provided by cloud services such as Kafka broker, MQTT, or databases when using cloud-based solutions. These services often offer TLS configuration options as part of their service settings, which you can integrate with Node-RED as needed.

## Usecases

The TLS Config node primarily facilitates secure communication over the network. Below are some scenarios:

**Web Server Security:** When building web servers using Node-RED, it's essential to secure communication between clients and the server. The TLS Config node can be used to configure TLS settings for nodes such as HTTP , TCP, enabling HTTPS communication and encrypting data exchanged between clients and the server.

**Database Connection Security:** Node-RED is frequently used to interact with databases for storing and retrieving data. When connecting to databases, such as MongoDB or MySQL, it's crucial to ensure that data is transmitted securely. The TLS Config node can be used to configure TLS settings for database nodes, securing communication with the database server.








