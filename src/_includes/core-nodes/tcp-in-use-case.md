## What are TCP-In nodes used for in Node-RED

The TCP node in Node-RED allows you to establish connections to remote TCP ports, serving as a TCP client for communication with external services or devices. Additionally, it facilitates the creation of a TCP server that can accept incoming connections. This functionality supports various applications, such as interacting with web servers or receiving data streams from IoT devices. Whether you're working on IoT projects, industrial automation, or networked systems, this node seamlessly integrates TCP/IP communication into your Node-RED workflows.

### What is TCP

TCP (Transmission Control Protocol) is one of the core protocols of the Internet Protocol Suite (commonly known as TCP/IP). It is a connection-oriented protocol that provides reliable, ordered, and error-checked delivery of data packets over a network. TCP guarantees the delivery of data packets in the same order they were sent. For more information on TCP, refer to [RFC 9293](https://www.ietf.org/rfc/rfc9293.html).

## Configuring TCP-In Node

- **Type:**
    - **Listen on:** Allows the TCP node to act as a server, listening for incoming connections.
    - **Connect to:** Enables the TCP node to act as a client, establishing connections to remote servers.
- **Hostname:** Specifies the hostname or IP address of the remote server when using the "Connect to" type.
- **Port:** Specifies the TCP port number to listen on (when using "Listen on" type) or to connect to (when using "Connect to" type).
- **Enable secure (SSL/TLS) connection:** Enabling this option activates SSL/TLS for secure communication. In Node-RED we have TLS config node which allows to activate TLS secure communication, refer to [TLS config node](/node-red/core-nodes/tls/) for details on configurations.
- **Output:**
    - **Streams of:** Selecting this option will outputs the data stream received from the TCP connection as a continuous stream of messages.
    - **Single:** Selecting this option will outputs a single message containing the data received from the TCP connection.
- **Payloads:**  Stream or single message of the data you're sending/receiving:
    - **buffer:** Data is sent/received as a buffer object.
    - **String:** Data is sent/received as a string.
    - **Base64 String:** Data is sent/received as a Base64 String.
        - **delimited by:** Specify the delimiter for splitting incoming data streams. Specify the delimiter for splitting incoming data streams. Commonly, `,`, `\r`, `\n`.
        - **re-attach delimiter:** Enabling this option will reattach the delimiter to its original place.

**Note: The default TCP nodes have been removed from the Node-RED palette in the FlowFuse Cloud due to limitations in routing connections to the container running Node-RED inside the FlowFuse platform**

## Usecases

**Communicating with Servers:** The TCP-In node allows Node-RED to interact with various servers through TCP/IP communication. This enables applications such as fetching data from web servers or exchanging information with other networked services.

**Integration with TCP-based Devices:** Node-RED can integrate seamlessly with TCP-based devices like industrial sensors, PLCs (Programmable Logic Controllers), or custom hardware controllers. The TCP-In node enables bidirectional communication, facilitating tasks such as sending commands to devices or receiving real-time data streams.

## Examples 

1. In the example flow below, we create a basic TCP server using the tcp-in node.

{% renderFlow %}
[{"id":"a8c5eab2876f058e","type":"group","z":"5b972161c4e0464e","style":{"stroke":"#999999","stroke-opacity":"1","fill":"none","fill-opacity":"1","label":true,"label-position":"nw","color":"#a4a4a4"},"nodes":["e286c8cf0f18b990","279de14c4fcb638c","15e102f80cf28535","c4d2ad15a31bd520","aaea81c136a207e0","64a84ea2a47d4ccf"],"x":194,"y":179,"w":672,"h":222},{"id":"e286c8cf0f18b990","type":"tcp in","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"TCP Server","server":"server","host":"","port":"2000","datamode":"stream","datatype":"utf8","newline":"","topic":"","trim":false,"base64":false,"tls":"","x":330,"y":280,"wires":[["aaea81c136a207e0"]]},{"id":"279de14c4fcb638c","type":"inject","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"Send data to tcp server","props":[{"p":"payload"}],"repeat":"2","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":350,"y":360,"wires":[["15e102f80cf28535"]]},{"id":"15e102f80cf28535","type":"tcp request","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"TCP request","server":"127.0.0.1","port":"2000","out":"sit","ret":"string","splitc":" ","newline":"","trim":false,"tls":"","x":570,"y":360,"wires":[["c4d2ad15a31bd520"]]},{"id":"c4d2ad15a31bd520","type":"debug","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":760,"y":360,"wires":[]},{"id":"aaea81c136a207e0","type":"debug","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":720,"y":280,"wires":[]},{"id":"64a84ea2a47d4ccf","type":"comment","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"Creating TCP server uisng TCP In node","info":"","x":510,"y":220,"wires":[]}]
{% endrenderFlow %}

2. In the example flow below, we demonstrate how to utilize the TCP-In node alongside other TCP nodes to enable bidirectional communication.

{% renderFlow %}
[{"id":"a8c5eab2876f058e","type":"group","z":"5b972161c4e0464e","style":{"stroke":"#999999","stroke-opacity":"1","fill":"none","fill-opacity":"1","label":true,"label-position":"nw","color":"#a4a4a4"},"nodes":["e286c8cf0f18b990","279de14c4fcb638c","15e102f80cf28535","c4d2ad15a31bd520","aaea81c136a207e0","64a84ea2a47d4ccf","bb1fcbe5804228d7","f0962665b353693f","e9d80655226685f3","0d400b0bcd290e30","dc8d47a4e642899f","4ed5c064fef77a4b"],"x":194,"y":199,"w":672,"h":382},{"id":"e286c8cf0f18b990","type":"tcp in","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"TCP Server","server":"server","host":"","port":"2000","datamode":"stream","datatype":"utf8","newline":"","topic":"","trim":false,"base64":false,"tls":"","x":290,"y":300,"wires":[["aaea81c136a207e0"]]},{"id":"279de14c4fcb638c","type":"inject","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"Send data to tcp server","props":[{"p":"payload"}],"repeat":"2","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":350,"y":420,"wires":[["15e102f80cf28535"]]},{"id":"15e102f80cf28535","type":"tcp request","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"TCP request","server":"127.0.0.1","port":"2000","out":"sit","ret":"string","splitc":" ","newline":"","trim":false,"tls":"","x":570,"y":420,"wires":[["c4d2ad15a31bd520"]]},{"id":"c4d2ad15a31bd520","type":"debug","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":760,"y":420,"wires":[]},{"id":"aaea81c136a207e0","type":"debug","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":740,"y":300,"wires":[]},{"id":"64a84ea2a47d4ccf","type":"comment","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"Creating TCP server uisng TCP In node","info":"","x":530,"y":240,"wires":[]},{"id":"bb1fcbe5804228d7","type":"tcp in","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"TCP Server","server":"server","host":"","port":"2000","datamode":"stream","datatype":"utf8","newline":"","topic":"","trim":false,"base64":false,"tls":"","x":290,"y":440,"wires":[[]]},{"id":"f0962665b353693f","type":"debug","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":680,"y":460,"wires":[]},{"id":"e9d80655226685f3","type":"inject","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"","props":[{"p":"payload"}],"repeat":"5","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":310,"y":540,"wires":[["0d400b0bcd290e30"]]},{"id":"0d400b0bcd290e30","type":"tcp out","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"","host":"","port":"","beserver":"reply","base64":false,"end":false,"tls":"","x":750,"y":540,"wires":[]},{"id":"dc8d47a4e642899f","type":"comment","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"Sending data to tcp server","info":"","x":510,"y":340,"wires":[]},{"id":"4ed5c064fef77a4b","type":"comment","z":"5b972161c4e0464e","g":"a8c5eab2876f058e","name":"Sending data to client ","info":"","x":500,"y":500,"wires":[]}]
{% endrenderFlow %}
