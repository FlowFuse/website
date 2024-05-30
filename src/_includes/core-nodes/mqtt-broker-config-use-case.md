## What's the MQTT-broker config Node in Node-RED Used For?

The MQTT-Broker config node in Node-RED is used to define the connection settings for an MQTT broker. This will create a single connection to the broker which can then be reused by MQTT In and MQTT Out nodes.

## Configuring the MQTT-broker Node

### Connection

- **Server**: The hostname or IP address of the MQTT broker, The node can be configured to use a WebSocket connection. To do so, the Server field should be configured with a full URI for the connection. For example, `ws://broker.example.com:1883.`
- **Port**: The port number of the MQTT broker (default is 1883 for non-TLS and 8883 for TLS).
- **Connect automatically**: If enabled, the node will automatically connect to the broker when Node-RED starts.
- **Protocol**: The version of the MQTT protocol to use.
  - **MQTT V3.1.1 (legacy)**
  - **MQTT V3.1.1**
  - **MQTT V5**
- **Use TLS**: Enabling this option node will use TLS, for more information TLS refer to [TLS node docs](/node-red/core-nodes/tls/)
- **Client ID**: The client identifier to use when connecting to the broker. If left blank, a random ID will be generated.
- **Keep Alive**: This setting defines the interval (in seconds) at which the MQTT client sends a "keep alive" message to the broker to maintain the connection. It ensures that the connection remains active even if there is no other data being transmitted. If you set this to 0, the client will not send keep-alive messages.
- **Session**:
  - **Use clean session**: If enabled, the broker will not store session information across connections.

### Security

- **Username**: The username to authenticate with the broker.
- **Password**: The password to authenticate with the broker.

### Messages

- **Message sent on connection (birth message)**:
  - **Topic**: The MQTT topic to publish the birth message to.
  - **Payload**: The payload of the birth message.
  - **Retain**: Whether the message should be retained by the broker.
  - **QoS**: The Quality of Service level for the birth message.
  
- **Message sent before disconnecting**:
  - **Topic**: The MQTT topic to publish the will message to.
  - **Payload**: The payload of the will message.
  - **Retain**: Whether the message should be retained by the broker.
  - **QoS**: The Quality of Service level for the will message.

- **Message sent on unexpected disconnection**:
  - **Topic**: The MQTT topic to publish the last will message to.
  - **Payload**: The payload of the last will message.
  - **Retain**: Whether the message should be retained by the broker.
  - **QoS**: The Quality of Service level for the last will message.

## Usecases

1. **Setting Up the Broker**: Use the MQTT-Broker config node to specify the broker details, such as server address, port, and security credentials. This node can be used to add a broker for MQTT nodes, ensuring that all MQTT-In and MQTT-Out nodes share the same configuration.

2. **Centralized Configuration Management:** By using the MQTT-Broker config node, you can manage connection settings in one place. If the broker details change, you only need to update the configuration in the config node, and all associated nodes will use the updated settings.