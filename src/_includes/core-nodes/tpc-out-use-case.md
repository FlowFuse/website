# What is TCP-Out Nodes in Node-RED ?

TCP-Out nodes in Node-RED facilitate communication over TCP/IP networks by providing options to connect to remote TCP ports, accept incoming connections, or reply to messages received from a TCP In node.

If you dont know what is TCP, refer to [What is TCP](/node-red/core-nodes/tcp-in/#what-is-udp/).

## Configuring TCP-Out Node

To configure a TCP-Out node in Node-RED, follow these steps:

1. **Type**: Choose the type of connection:
    - **Listen on**: Set up the node to listen for incoming connections.
    - **Connect to**: Specify the host and port to connect to.
        - **at host:** Enter the host address or domain name to connect to.
    - **Reply to TCP**: Configure the node to reply to incoming TCP messages.

2. **Port**: Specify the port number for the TCP connection.

3. **Enable Secure (SSL/TLS) Connection**: Activate SSL/TLS for secure communication. If enabled, Node-RED provides a TLS config node for configuring TLS settings. Refer to the [TLS config node](/node-red/core-nodes/tls/) documentation for details on configurations.

4. **Close Connection After Each Message is Sent**: Choose whether to close the connection after sending each message.

5. **Decode Base64 Message**: Enable this option if you expect incoming messages to be encoded in Base64 format.

**Note: The default TCP nodes have been removed from the Node-RED palette in the FlowFuse Cloud due to limitations in routing connections to the container running Node-RED inside the FlowFuse platform**

## Usecases

1. **Bidirectional Communication:** Reply to messages received from TCP In nodes, enabling bidirectional communication between nodes in a flow.

2. **Sending Data to Remote Servers**: Connect to external servers or services to send data over TCP/IP.

3. **Building TCP Servers**: Listen for incoming connections and process data from remote clients.

### Examples

1. In the example flow below, we demonstrate how to utilize the TCP-Out node to Reply to messages received from TCP In nodes.

{% renderFlow %}
[{"id":"7a40a42225c1bcd7","type":"group","z":"5b972161c4e0464e","style":{"stroke":"#999999","stroke-opacity":"1","fill":"none","fill-opacity":"1","label":true,"label-position":"nw","color":"#a4a4a4"},"nodes":["e286c8cf0f18b990","279de14c4fcb638c","15e102f80cf28535","c4d2ad15a31bd520","aaea81c136a207e0","64a84ea2a47d4ccf","e9d80655226685f3","0d400b0bcd290e30","dc8d47a4e642899f","4ed5c064fef77a4b"],"x":274,"y":219,"w":672,"h":382},{"id":"e286c8cf0f18b990","type":"tcp in","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"TCP Server","server":"server","host":"","port":"2000","datamode":"stream","datatype":"utf8","newline":"","topic":"","trim":false,"base64":false,"tls":"","x":370,"y":320,"wires":[["aaea81c136a207e0"]]},{"id":"279de14c4fcb638c","type":"inject","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"Send data to tcp server","props":[{"p":"payload"}],"repeat":"2","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":430,"y":440,"wires":[["15e102f80cf28535"]]},{"id":"15e102f80cf28535","type":"tcp request","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"TCP request","server":"127.0.0.1","port":"2000","out":"sit","ret":"string","splitc":" ","newline":"","trim":false,"tls":"","x":650,"y":440,"wires":[["c4d2ad15a31bd520"]]},{"id":"c4d2ad15a31bd520","type":"debug","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":840,"y":440,"wires":[]},{"id":"aaea81c136a207e0","type":"debug","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":820,"y":320,"wires":[]},{"id":"64a84ea2a47d4ccf","type":"comment","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"Creating TCP server uisng TCP In node","info":"","x":610,"y":260,"wires":[]},{"id":"e9d80655226685f3","type":"inject","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"","props":[{"p":"payload"}],"repeat":"5","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":390,"y":560,"wires":[["0d400b0bcd290e30"]]},{"id":"0d400b0bcd290e30","type":"tcp out","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"","host":"","port":"","beserver":"reply","base64":false,"end":false,"tls":"","x":830,"y":560,"wires":[]},{"id":"dc8d47a4e642899f","type":"comment","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"Sending data to tcp server","info":"","x":590,"y":360,"wires":[]},{"id":"4ed5c064fef77a4b","type":"comment","z":"5b972161c4e0464e","g":"7a40a42225c1bcd7","name":"Sending data to client ","info":"","x":580,"y":520,"wires":[]}]
{% endrenderFlow %}