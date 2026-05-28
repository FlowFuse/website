---
title: "Building Secure OPC-UA Server in Node-RED."
description: "Learn how to build Build and Deploy a custom OPC UA Server in Node-RED"
---

# {{meta.title}}

OPC-UA (OPC Unified Architecture) is a communication protocol designed for industrial automation. It enables seamless data exchange and interoperability between various devices, systems, and software applications in the industrial domain. OPC-UA offers secure and reliable communication, making it a preferred choice for building robust industrial solutions. In this document, we will delve into the creation of a fully custom secure OPC-UA Server for PLCs in Node-RED.

If you're not familiar with OPC-UA, you can learn more about it [here](/blog/2023/07/how-to-deploy-a-basic-opc-ua-server-in-node-red/).

## Introduction

While it's typical to find PLCs that have built-in OPC-UA server capabilities, such as Omron and Siemens, this is not an industry-wide practice. One notable exception is Allen Bradley PLCs. For Allen Bradley, you have to buy FactoryTalk Linx Gateway (formally RSLinx Enterprise) for OPC-UA Server capability, or you need to employ a 3rd party OPC-UA Server. This documentation will guide you through the process of using Node-RED as a 3rd party OPC-UA Server for Allen Bradley, by creating a custom Information Model for the PLC data, publishing it, then securing the server with SSL to make it production-ready.

## PLC to OPC-UA Server Architecture Overview

A visual representation of our PLC to OPC-UA Server architecture is shown in the drawing below, consisting of 6 major parts.

![PLC-Information-Model-1.png](/node-red-media/protocol/images/PLC-Information-Model-1.png)
1. Set up the PLC tags to be sent to the OPC Server
2. Read the PLC tags into Node-RED
3. Copy the PLC tags into Node-RED context memory
4. Program the OPC Server address space
5. Encrypt the OPC Server with SSL
6. Set up the OPC Client  

The PLC is an Allen Bradley, and an instance of Node-RED running on the same OT network as the PLC will act as the OPC UA Server. In our Allen Bradley PLC, we will re-use an example from a [Node-RED as a No-Code EtherNet/IP to S7 Protocol Converter](/blog/2023/06/node-red-as-a-no-code-ethernet_ip-to-s7-protocol-converter/) where the PLC is simulating a conveyor line, called *Line 4 PLC,* depicted as number 1 architecture drawing above. The tags below represent the data to be transferred from the Line 4 PLC to the Node-RED OPC UA server, depicted as number 2 in the architecture drawing.

| **Tag**          | **Data Type** | **Description**               |
| ---------------- | ------------- | ----------------------------- |
| Conveyor_RTS     | BOOL          | Conveyor Ready to Start       |
| Robot_RTS        | BOOL          | Conveyor Robot Ready to Start |
| Robot_Position   | REAL          | Robot Arm position (degrees)  |
| Conveyor_Running | BOOL          | Conveyor is running           |
| Line4_State      | DINT          | Line 4 Machine State          |
| Line4_Fault      | BOOL          | Line 4 is faulted             |

A simple ladder application has been built in the PLC to simulate our conveyor values.

![image-20230717-212515.png](/node-red-media/protocol/images/image-20230717-212515.png)
The Line 4 PLC tags will be read by Node-RED using an Ethernet/IP driver, with each PLC tag copied to flow context memory as part of an object named `conveyorData`, depicted in number 3 of the architecture drawing. Using the `node-red-contrib-opcua-server` node, the `conveyorData` object will become part of a hierarchical OPA UA Information Model representing the Line 4 PLC conveyor data, and stored into the *OPC UA Server Address Space,* depicted as number 4 in the architecture drawing. The OPC Server will publish the Line 4 PLC conveyor data, implementing a self-signed SSL certificate to encrypt the OPC traffic and establish a secure connection with an OPC Client application, depicted as number 5 in the architecture drawing.

- note - if you prefer not to secure the server, you can skip this step and still connect to the server anonymously for testing purposes.

The OPC client will be a windows-based [Prosys OPC UA Browser](https://www.prosysopc.com/products/opc-ua-browser/), depicted on the far right as number 6 in our architecture drawing.

Now that we have laid out a concept for our application, let’s build it.

## Install Custom Nodes

First, we need to add three custom nodes that will allow Node-RED to read Ethernet/IP data and add OPC UA Server functionality.

Click the hamburger icon → manage palette

![flow-manage-palette.png](/node-red-media/protocol/images/flow-manage-palette.png)
 

On the `install` tab, search for `ethernet` and install the `node-red-contrib-cip-ethernet-ip` node, which will be used to read the Ethernet/IP fieldbus data from our Allen Bradley PLC.

![install-eth-ip-node.png](/node-red-media/protocol/images/install-eth-ip-node.png)
Next, search for `opc` and install `node-red-contrib-opcua` and `node-red-contrib-opc-ua-server`. These nodes take a particularly long time to install, as they require a lot of dependencies. Expect anywhere from 2 to 10 minutes to complete installation, depending on the speed of your system. You will not be able to track the progress of the installation unless you are monitoring the logs on the back-end, so just be patient.

![opc-nodes-install.png](/node-red-media/protocol/images/opc-nodes-install.png)
Go to the `Nodes` tab and confirm the 3 custom nodes have been properly installed.

![custom-nodes-installed.png](/node-red-media/protocol/images/custom-nodes-installed.png)

## Set Up Ethernet/IP Data 

Note: this process is largely a recap from the first part of a article where [Node-RED is used as an Ethernet/IP to S7 protocol converter](/blog/2023/06/node-red-as-a-no-code-ethernet_ip-to-s7-protocol-converter/).

Let’s start by dragging a `eth-ip in` node onto the palette. Then add a new endpoint, which will point to our Line4 PLC.

![eth-ip-in-palette.png](/node-red-media/protocol/images/eth-ip-in-palette.png)
In the endpoint `Connection` properties, the connection information must match the PLC, so set the IP address and CPU slot number appropriately. Also, the default cycle time is 500ms. Depending on your application, polling the CPU at 500ms may be appropriate. But for our OPC UA application, we will change it to 1000ms, which is a more appropriate polling rate for this type of application.

![ethip-node-connection.png](/node-red-media/protocol/images/ethip-node-connection.png)
On the `Tags` tab, populate the tag information to match our Allen Bradley PLC. Then select `Update` to complete configuration of the `eth-ip endpoint`.

![eth-ip-endpoint-tags.png](/node-red-media/protocol/images/eth-ip-endpoint-tags.png)
Now that we have our endpoint, let’s finish configuring the `eth-ip in` node.

1. select the endpoint we just created
2. Change `Mode` To `All tags`
3. Give the node a descriptive name.

![eth-ip-in-properties.png](/node-red-media/protocol/images/eth-ip-in-properties.png)
As configured, the node is going to read all PLC tags any time a value is changed. Press done to complete the configuration.

Before we deploy this flow, let’s wire a `debug` node to our `eth-ip in` node to confirm Node-RED can read the tags from our PLC.

![eth-ip-debug.png](/node-red-media/protocol/images/eth-ip-debug.png)
Deploy the flow.

![deploy-flow.png](/node-red-media/protocol/images/deploy-flow.png)
Click the `debug` tab and confirm data is flowing in from our PLC.

![debug-data.png](/node-red-media/protocol/images/debug-data.png)
We can see that all tags are being read from the PLC in one message as a key/value hash table, or dict.

After confirming the PLC data acquisition is working, we can remove the `debug` node and continue building the rest of our flow. Referring back to our architecture drawing, we’ve now taken care of the first 2 objectives of our application.

![PLC-Information-Model-2-of-6-1.png](/node-red-media/protocol/images/PLC-Information-Model-2-of-6-1.png)

<input type="checkbox" checked> Set up the PLC tags to be sent to the OPC Server<br>
<input type="checkbox" checked> Read the PLC tags into Node-RED<br>

Let’s move on to objective 3.

## Store the PLC Data In Flow Context Memory

Drag a `change` node onto the palette and wire it to the `eth-ip in` node.

![change-node-palette.png](/node-red-media/protocol/images/change-node-palette.png)

We’re going move the data from the PLC into flow context memory, by setting each element of the outgoing `msg.payload` to `flow.conveyorData`. To do this, refer back to the structure of the `msg.payload` from the `debug` node we connected to the `eth-ip in` node earlier - 
![msg-payload.png](/node-red-media/protocol/images/msg-payload.png)

Now open up the change node, and press the `+add` button to add a rule for each PLC tag in our `msg.payload` object (6), and `set` each rule so that you're setting a `flow` value to a `msg` value.  Then populate each rule as shown - 
![change-node-properties.png](/node-red-media/protocol/images/change-node-properties.png)

We've now configured the `change` node to move the data from our PLC into a dict called `conveyorData`, stored in flow context memory.

Give the node an appripriate name, hit done and deploy the flow. 

Our flow should now look like below - 
![flow-with-change-palette.png](/node-red-media/protocol/images/flow-with-change-palette.png)

Let’s look at the flow context memory to confirm the data from our PLC is being written to the `conveyorData` object we created.

![context-data-1.png](/node-red-media/protocol/images/context-data-1.png)
![context-refresh.png](/node-red-media/protocol/images/context-refresh.png)
Every time we hit refresh, the values in `conveyorData` change as the value in the PLC changes, confirming things are working as expected.

Looking back at the application architecture we laid out, we’ve achieved 3 out of the 6 objectives.

![PLC-Information-Model-3-of-6-1.png](/node-red-media/protocol/images/PLC-Information-Model-3-of-6-1.png)

<input type="checkbox" checked> Set up the PLC tags to be sent to the OPC Server<br>
<input type="checkbox" checked> Read the PLC tags into Node-RED<br>
<input type="checkbox" checked> Copy the PLC tags into Node-RED context memory<br>

Let’s now tackle the OPC Server address space.

## Program the OPC UA Server Address Space

To make our lives significantly easier, we’re going to start from a template, the same template used in [part 1 of our OPC UA Series](/blog/2023/07/how-to-deploy-a-basic-opc-ua-server-in-node-red/).

Copy the content of the [example template](https://github.com/BiancoRoyal/node-red-contrib-opcua-server/blob/master/examples/server-with-context.json), then paste it into Node-RED to import it.

![import.png](/node-red-media/protocol/images/import.png)
![import-context.png](/node-red-media/protocol/images/import-context.png)
You end up with a new flow that looks like the one below.

![example-flow.png](/node-red-media/protocol/images/example-flow.png)
All we care about here is the `Compact-Server` node.  In fact, we’ll just copy that node and paste it into the current flow we’ve been building.  Once we’ve copied the server node into our custom flow, we can discard the example flow.  The whole purpose of this was to simply populate the `address space` of the `Compact-Server` node with template code that will trivialize the programming for our custom application.

Our custom flow should now look something like this.

![flow-with-compact-server.png](/node-red-media/protocol/images/flow-with-compact-server.png)
- note - I’ve added some comments to make the flow even easier to follow.  Similar to commenting code, commenting flows is good practice.

Open up the `Compact-Server` node and jump straight to the address space.  

![compact-server-node-address-space.png](/node-red-media/protocol/images/compact-server-node-address-space.png)
- note - we won’t go into detail on what the address space actually is in this documentation, or the details of the `Compact-Server` node, as it was covered in [part 1 of this OPC UA series](/blog/2023/07/how-to-deploy-a-basic-opc-ua-server-in-node-red/).  Please read that documentation if you are unfamiliar with it.

There are 4 key things we’ll modify in the address space template code - 

1. Bring in our `conveyorData` context variables 
2. create our custom folder structure
3. define our context variables as OPC UA nodes
4. create custom browser views for our nodes

### Bring in Context Variables

Starting from the section of code where it’s bringing in the context variables defined in the example, delete that code

```javascript 
  this.sandboxFlowContext.set("isoInput1", 0);
  this.setInterval(() => {
    flexServerInternals.sandboxFlowContext.set(
      "isoInput1",
      Math.random() + 50.0
    );
  }, 500);
  this.sandboxFlowContext.set("isoInput2", 0);
 ...
 this.sandboxFlowContext.set("isoOutput8", 0);
```

and replace it with our `conveyorData` context variables.

```javascript 
  this.sandboxFlowContext.set("conveyorData.Conveyor_RTS", false);
  this.sandboxFlowContext.set("conveyorData.Robot_RTS", false);
  this.sandboxFlowContext.set("conveyorData.Robot_Position", 0);
  this.sandboxFlowContext.set("conveyorData.Conveyor_Running", false);
  this.sandboxFlowContext.set("conveyorData.Line4_State", 0);
  this.sandboxFlowContext.set("conveyorData.Line4_Fault", false);
```

### Create Custom Folder Structure

Starting from the section of code where the example folder structure is defined, delete it and replace it with our custom folder structure defined in our architecture - 

![opc-folder-structure.png](/node-red-media/protocol/images/opc-folder-structure.png)
Delete the section of code starting from here - 

```javascript 
  const myDevice = namespace.addFolder(rootFolder.objects, {
    "browseName": "RaspberryPI-Zero-WLAN"
  });
  const gpioFolder = namespace.addFolder(myDevice, { "browseName": "GPIO" });
  const isoInputs = namespace.addFolder(gpioFolder, {
    "browseName": "Inputs"
  });
  const isoOutputs = namespace.addFolder(gpioFolder, {
    "browseName": "Outputs"
  });
```

and replace it with the folder structure shown above - 

```javascript 
  const myDevice = namespace.addFolder(rootFolder.objects, {
    "browseName": "Line 4 PLC"
  });
  const conveyorFolder = namespace.addFolder(myDevice, { 
  "browseName": "Conveyor" 
  });
  const conveyorBools = namespace.addFolder(conveyorFolder, {
    "browseName": "Bools"
  });
  const conveyorDINTs = namespace.addFolder(conveyorFolder, {
    "browseName": "DINTs"
  });
  const conveyorFloats = namespace.addFolder(conveyorFolder, {
    "browseName": "Floats"
  });
```

### Define OPC UA Nodes

Now we can construct the nodes for each context variable.

![opc-nodes.png](/node-red-media/protocol/images/opc-nodes.png)

Delete the section of code defining the nodes for `isoInput1` through `isoOutput8`  - 

```javascript 
  const gpioDI1 = namespace.addVariable({
    "organizedBy": isoInputs,
    "browseName": "I1",
    "nodeId": "ns=1;s=Isolated_Input1",
    "dataType": "Double",
    "value": {
    ...
      "set": function(variant) {
        flexServerInternals.sandboxFlowContext.set(
          "isoOutput8",
          parseFloat(variant.value)
        );
        return opcua.StatusCodes.Good;
      }
    }
  });   
```

And replace it with our custom nodes, paying respect to the folder structure we defined in our architecture - 

```javascript 
  // Construct Nodes
  const Conveyor_RTS = namespace.addVariable({
    "organizedBy": conveyorBools,
    "browseName": "Conveyor Ready to Start",
    "nodeId": "ns=1;s=Conveyor_RTS",
    "dataType": "Boolean",
    "value": {
      "get": function () {
        return new Variant({
          "dataType": DataType.Boolean,
          "value": flexServerInternals.sandboxFlowContext.get("conveyorData.Conveyor_RTS")
        });
      },
      "set": function (variant) {
        flexServerInternals.sandboxFlowContext.set(
          "conveyorData.Conveyor_RTS",
          variant.value
        );
        return opcua.StatusCodes.Good;
      }
    }
  });

  const Robot_RTS = namespace.addVariable({
    "organizedBy": conveyorBools,
    "browseName": "Robot Ready to Start",
    "nodeId": "ns=1;s=Robot_RTS",
    "dataType": "Boolean",
    "value": {
      "get": function () {
        return new Variant({
          "dataType": DataType.Boolean,
          "value": flexServerInternals.sandboxFlowContext.get("conveyorData.Robot_RTS")
        });
      },
      "set": function (variant) {
        flexServerInternals.sandboxFlowContext.set(
          "conveyorData.Robot_RTS",
          variant.value
        );
        return opcua.StatusCodes.Good;
      }
    }
  });

  const Conveyor_Running = namespace.addVariable({
    "organizedBy": conveyorBools,
    "browseName": "Conveyor Running",
    "nodeId": "ns=1;s=Conveyor_Running",
    "dataType": "Boolean",
    "value": {
      "get": function () {
        return new Variant({
          "dataType": DataType.Boolean,
          "value": flexServerInternals.sandboxFlowContext.get("conveyorData.Conveyor_Running")
        });
      },
      "set": function (variant) {
        flexServerInternals.sandboxFlowContext.set(
          "conveyorData.Conveyor_Running",
          variant.value
        );
        return opcua.StatusCodes.Good;
      }
    }
  });

  const Line4_Fault = namespace.addVariable({
    "organizedBy": conveyorBools,
    "browseName": "Line 4 Faulted",
    "nodeId": "ns=1;s=Line4_Fault",
    "dataType": "Boolean",
    "value": {
      "get": function () {
        return new Variant({
          "dataType": DataType.Boolean,
          "value": flexServerInternals.sandboxFlowContext.get("conveyorData.Line4_Fault")
        });
      },
      "set": function (variant) {
        flexServerInternals.sandboxFlowContext.set(
          "conveyorData.Line4_Fault",
          variant.value
        );
        return opcua.StatusCodes.Good;
      }
    }
  });

  const Line4_State = namespace.addVariable({
    "organizedBy": conveyorDINTs,
    "browseName": "Line 4 State",
    "nodeId": "ns=1;s=Line4_State",
    "dataType": "Int32",
    "value": {
      "get": function () {
        return new Variant({
          "dataType": DataType.Int32,
          "value": flexServerInternals.sandboxFlowContext.get("conveyorData.Line4_State")
        });
      },
      "set": function (variant) {
        flexServerInternals.sandboxFlowContext.set(
          "conveyorData.Line4_State",
          variant.value
        );
        return opcua.StatusCodes.Good;
      }
    }
  });

  const Robot_Position = namespace.addVariable({
    "organizedBy": conveyorFloats,
    "browseName": "Robot Axis A1 Position",
    "nodeId": "ns=1;s=Robot_Position",
    "dataType": "Float",
    "value": {
      "get": function () {
        return new Variant({
          "dataType": DataType.Float,
          "value": flexServerInternals.sandboxFlowContext.get("conveyorData.Robot_Position")
        });
      },
      "set": function (variant) {
        flexServerInternals.sandboxFlowContext.set(
          "conveyorData.Robot_Position",
          parseFloat(variant.value)
        );
        return opcua.StatusCodes.Good;
      }
    }
  });
```

### Define Browser Views

Last, let’s create some custom views. Delete the code starting from - 

```javascript 
  //------------------------------------------------------------------------------
  // Add a view
  //------------------------------------------------------------------------------
  const viewDI = namespace.addView({
    "organizedBy": rootFolder.views,
    "browseName": "RPIW0-Digital-Ins"
  });
  ...
    viewDO.addReference({
    "referenceType": "Organizes",
    "nodeId": gpioDO8.nodeId
  });
```

And replace with a custom view of your choice.  I’ve defined a view that splits the bools, DINTs, and Reals.

```javascript 
  const viewBools = namespace.addView({
    "organizedBy": rootFolder.views,
    "browseName": "Line 4 Conveyor Bools"
  });

  const viewDINTs = namespace.addView({
    "organizedBy": rootFolder.views,
    "browseName": "Line4 Conveyor DINTs"
  });

  const viewFloats = namespace.addView({
    "organizedBy": rootFolder.views,
    "browseName": "Line4 Conveyor Floats"
  });

  viewBools.addReference({
    "referenceType": "Organizes",
    "nodeId": Conveyor_RTS.nodeId
  });

  viewBools.addReference({
    "referenceType": "Organizes",
    "nodeId": Robot_RTS.nodeId
  });

  viewBools.addReference({
    "referenceType": "Organizes",
    "nodeId": Conveyor_Running.nodeId
  });

  viewBools.addReference({
    "referenceType": "Organizes",
    "nodeId": Line4_Fault.nodeId
  });


  viewDINTs.addReference({
    "referenceType": "Organizes",
    "nodeId": Line4_State.nodeId
  });

  viewFloats.addReference({
    "referenceType": "Organizes",
    "nodeId": Robot_Position.nodeId
  });
```

We’ve now completed the address space, so all that’s left is to define the OPC UA endpoint.

## Wrap Up Server Configuration

Go to the discovery tab and define an endpoint following the convention below, with the ip address matching the ip address of your Node-RED instance.

![image-20230718-155245.png](/node-red-media/protocol/images/image-20230718-155245.png)


Now, our OPC UA Server is set up and ready to be browsable by an OPC UA Client.

Deploy the changes and make sure the `Compact-Server` is reporting `active`.  

![compact-server-active.png](/node-red-media/protocol/images/compact-server-active.png)
If not, go back and check your code for errors.  The Node-RED logfiles will come in handy to track down issues if your server isn’t activating.

This wraps up the 4th objective of our application.

![PLC-Information-Model-4-of-6-1.png](/node-red-media/protocol/images/PLC-Information-Model-4-of-6-1.png)

<input type="checkbox" checked> Set up the PLC tags to be sent to the OPC Server<br>
<input type="checkbox" checked> Read the PLC tags into Node-RED<br>
<input type="checkbox" checked> Copy the PLC tags into Node-RED context memory<br>
<input type="checkbox" checked> Program the OPC Server address space<br>

## Security (Optional)

At this point, our OPC UA Server will accept a client connection, but it won’t be secure, so we should take the extra step and encrypt our OPC UA traffic.

To do this, go to the `Security` tab of the `Compact-Server` properties.

![security-tab-default.png](/node-red-media/protocol/images/security-tab-default.png)
By default, the server is using no security, and allowing anonymous connections.  Let’s fix that by unchecking `Allow Anonymous` , and checking `Use invididual Certificate Files`. 

![individual-cert-file-option.png](/node-red-media/protocol/images/individual-cert-file-option.png)
The node gives us some clues on how we can populate this section.  When `node-red-contrib-opcua-server` was installed, it created self-signed ssl certificates that are bound to our host system.  Let’s make use of them. 

navigate to `./node-red-contrib-opcua-server/certificates` directory, where the node-red instance has installed the Node-RED module. 

- I have Node-RED installed in the root path of my server, so my full path to the certs folder is `/root/.node-red/node_modules/node-red-contrib-opcua-server/certificates`
- If you’re having trouble finding the directory, do a search for the file `server_selfsigned_cert_2048.pem`.  

Once you’ve navigated to the correct directory, it should be full of various cert files.

![cert-list.png](/node-red-media/protocol/images/cert-list.png)
The two cert files we care about, which were already pre-defined in the node, are `server_selfsigned_cert_2048.pem`, which is the public cert file, and `server_key_2048.pem`, which is the private cert file.

Go back to the node configuration and populate the `Security` tab with the *full absolute path* to the files.

![cert-tab-filled.png](/node-red-media/protocol/images/cert-tab-filled.png)
Hit done and redeploy the node.  Make sure the server reports `active`.  If not, check the cert paths and try again.  

You may also run into file permission issues, depending on how you set up your Node-RED instance, so make sure Node-RED also has read access to the files.

We’re not done yet.  The server is happy, but the OPC Client will need access to these cert files as well.  So copy the files to a location that will make the two cert files accessible to the OPC Client.  In my case, the OPC Client is being ran on a personal Windows machine on the same network.  So I copied the cert files to a nas, which both my Node-RED instance and my Windows machine have access to.

![copy-certs.png](/node-red-media/protocol/images/copy-certs.png)
![copied-certs.png](/node-red-media/protocol/images/copied-certs.png)
Now we can move on to OPC Client Configuration.  We’ve achieved 5 out of 6 objectives.

![PLC-Information-Model-5-of-6-1.png](/node-red-media/protocol/images/PLC-Information-Model-5-of-6-1.png)

<input type="checkbox" checked> Set up the PLC tags to be sent to the OPC Server<br>
<input type="checkbox" checked> Read the PLC tags into Node-RED<br>
<input type="checkbox" checked> Copy the PLC tags into Node-RED context memory<br>
<input type="checkbox" checked> Program the OPC Server address space<br>
<input type="checkbox" checked> Encrypt the OPC Server with SSL<br>

## OPC UA Client Configuration and Testing


To connect to our Node-RED OPC server, enter the endpoint url and press “connect to server”.

![opc-client-connect.png](/node-red-media/protocol/images/opc-client-connect.png)
Security settings are displayed.

We’re going to select `Sign & Encrypt` and change the security policy to `Aes128Sha256RsaOaep`

![sign&encrypt.png](/node-red-media/protocol/images/sign&encrypt.png)
When we try to connect, our connection to the server is rejected, because we haven’t pointed the client to our ssl cert files.  Press Okay to acknowledge the error and we can fix that problem.

![connect-rejected.png](/node-red-media/protocol/images/connect-rejected.png)
When you acknowledge the connection error, you are taken to the `User Authentication` properties.  Select `Certificate and Private key`.  We need to point to our certificate and private key files.

![client-cert-path.png](/node-red-media/protocol/images/client-cert-path.png)
When we browse for our certificate file, the client software tells us it’s expecting a `*.der` file, which we don’t have yet.  

![der-file.png](/node-red-media/protocol/images/der-file.png)
However, we can create one from our existing cert file using `openssl`.  

If you don’t already have openssl installed, [install it](https://www.openssl.org/).  

Then from a command prompt, run the following command in the directory where your client-side cert files are stored - 

``` 
openssl x509 -in server_selfsigned_cert_2048.pem -out server_selfsigned_cert_2048.der -outform DER
```

![ssl-pub-keygen.png](/node-red-media/protocol/images/ssl-pub-keygen.png)
This command will generate the .der file the opc client is expecting to see.  

![copied-certs-with-pubkey.png](/node-red-media/protocol/images/copied-certs-with-pubkey.png)
Now we can go back and point to the public key file, which is the `server_selfsigned_cert_2048.der` file, and the private key file, which is the `server_key_2048.pem` file.

![client-cert-path-filled.png](/node-red-media/protocol/images/client-cert-path-filled.png)
The first time you do this, you will be asked to accept the server certificate. 

![opc-client-accept-cert.png](/node-red-media/protocol/images/opc-client-accept-cert.png)
If you choose accept permanently, you won’t see this prompt again.  You should now have access to browse the OPC Server.

As can be seen, our OPC Client sees the data from our PLC matching our OPC Information Model we defined in our Node-RED server address space.

![image-20230718-164326.png](/node-red-media/protocol/images/image-20230718-164326.png)
We’ve now achieved all of our design objectives.

![PLC-Information-Model-6-of-6-1.png](/node-red-media/protocol/images/PLC-Information-Model-6-of-6-1.png)

<input type="checkbox" checked> Set up the PLC tags to be sent to the OPC Server<br>
<input type="checkbox" checked> Read the PLC tags into Node-RED<br>
<input type="checkbox" checked> Copy the PLC tags into Node-RED context memory<br>
<input type="checkbox" checked> Program the OPC Server address space<br>
<input type="checkbox" checked> Encrypt the OPC Server with SSL<br>
<input type="checkbox" checked> Set up the OPC Client<br>

Our custom OPC UA application is complete and production-ready.

Test the application by confirming values changed in the PLC are reflected in the OPC UA Client.

In my PLC code, I created a sine wave generator that changes the `Robot Axis A1 Position` value continuously, so the value is always changing, making it easy to confirm that the server is passing OPC traffic correctly.

![sine-wave-gen.png](/node-red-media/protocol/images/sine-wave-gen.png)

In this documentation, we covered in detail how to create an OPC UA application that pulls data from an Allen Bradley PLC over Ethernet/IP, store the PLC data in Node-RED context memory, then publish the PLC data from context memory onto a ssl secured OPC UA Server.  An OPC Client can subscribe to the OPC UA Server over an encrypted connection, making the application deployable in a production environment, including in the cloud if desired.  

With the foundation laid in this documentation, you can customize the application to fit your individual needs, with an understanding of what is going on “under the hood” of an OPC UA Server.  This application only scratches the surface of what features OPC UA has available.  Refer to the [NodeOPCUA sdk](https://node-opcua.github.io/) and experiment by building on top of this example if you desire to learn more or want to add features this application is lacking.

In the next documentation of the OPC UA series, we will establish how to create an OPC UA Client application in Node-RED.

OPC UA is one of several industrial protocols FlowFuse uses to connect PLCs to the modern stack. For EtherNet/IP, Siemens S7, Modbus, MQTT, and more, see the [FlowFuse PLC integration overview](/landing/plc/).

Source code for flow used in this documentation - 



::render-flow
---
height: 200
flow: "W3siaWQiOiIyZThjN2Y1Yy5hYjczZCIsInR5cGUiOiJ0YWIiLCJsYWJlbCI6Ik9QQy1VQSBDdXN0b20gQ29udGV4dCBTZXJ2ZXIiLCJkaXNhYmxlZCI6ZmFsc2UsImluZm8iOiIifSx7ImlkIjoiMzhjZTEwZGUuN2Q4YyIsInR5cGUiOiJvcGN1YS1jb21wYWN0LXNlcnZlciIsInoiOiIyZThjN2Y1Yy5hYjczZCIsInBvcnQiOiI1NDg0NSIsImVuZHBvaW50IjoiIiwicHJvZHVjdFVyaSI6IiIsImFjY2VwdEV4dGVybmFsQ29tbWFuZHMiOnRydWUsIm1heEFsbG93ZWRTZXNzaW9uTnVtYmVyIjoiMTAiLCJtYXhDb25uZWN0aW9uc1BlckVuZHBvaW50IjoiMTAiLCJtYXhBbGxvd2VkU3Vic2NyaXB0aW9uTnVtYmVyIjoiMTAwIiwiYWx0ZXJuYXRlSG9zdG5hbWUiOiIiLCJuYW1lIjoiIiwic2hvd1N0YXR1c0FjdGl2aXRpZXMiOmZhbHNlLCJzaG93RXJyb3JzIjp0cnVlLCJhbGxvd0Fub255bW91cyI6ZmFsc2UsImluZGl2aWR1YWxDZXJ0cyI6dHJ1ZSwiaXNBdWRpdGluZyI6ZmFsc2UsInNlcnZlckRpc2NvdmVyeSI6dHJ1ZSwidXNlcnMiOltdLCJ4bWxzZXRzT1BDVUEiOltdLCJwdWJsaWNDZXJ0aWZpY2F0ZUZpbGUiOiIvcm9vdC8ubm9kZS1yZWQvbm9kZV9tb2R1bGVzL25vZGUtcmVkLWNvbnRyaWItb3BjdWEtc2VydmVyL2NlcnRpZmljYXRlcy9zZXJ2ZXJfc2VsZnNpZ25lZF9jZXJ0XzIwNDgucGVtIiwicHJpdmF0ZUNlcnRpZmljYXRlRmlsZSI6Ii9yb290Ly5ub2RlLXJlZC9ub2RlX21vZHVsZXMvbm9kZS1yZWQtY29udHJpYi1vcGN1YS1zZXJ2ZXIvY2VydGlmaWNhdGVzL3NlcnZlcl9rZXlfMjA0OC5wZW0iLCJyZWdpc3RlclNlcnZlck1ldGhvZCI6IjEiLCJkaXNjb3ZlcnlTZXJ2ZXJFbmRwb2ludFVybCI6Im9wYy50Y3A6Ly8xOTIuMTY4LjAuMTE0OjU0ODQ1IiwiY2FwYWJpbGl0aWVzRm9yTUROUyI6IiIsIm1heE5vZGVzUGVyUmVhZCI6MTAwMCwibWF4Tm9kZXNQZXJXcml0ZSI6MTAwMCwibWF4Tm9kZXNQZXJIaXN0b3J5UmVhZERhdGEiOjEwMCwibWF4Tm9kZXNQZXJCcm93c2UiOjMwMDAsIm1heEJyb3dzZUNvbnRpbnVhdGlvblBvaW50cyI6IjEwIiwibWF4SGlzdG9yeUNvbnRpbnVhdGlvblBvaW50cyI6IjEwIiwiZGVsYXlUb0luaXQiOiIxMDAwIiwiZGVsYXlUb0Nsb3NlIjoiMjAwIiwic2VydmVyU2h1dGRvd25UaW1lb3V0IjoiMTAwIiwiYWRkcmVzc1NwYWNlU2NyaXB0IjoiZnVuY3Rpb24gY29uc3RydWN0QWxhcm1BZGRyZXNzU3BhY2Uoc2VydmVyLCBhZGRyZXNzU3BhY2UsIGV2ZW50T2JqZWN0cywgZG9uZSkge1xuICAvLyBzZXJ2ZXIgPSB0aGUgY3JlYXRlZCBub2RlLW9wY3VhIHNlcnZlclxuICAvLyBhZGRyZXNzU3BhY2UgPSBhZGRyZXNzIHNwYWNlIG9mIHRoZSBub2RlLW9wY3VhIHNlcnZlclxuICAvLyBldmVudE9iamVjdHMgPSBhZGQgZXZlbnQgdmFyaWFibGVzIGhlcmUgdG8gaG9sZCB0aGVtIGluIG1lbW9yeSBmcm9tIHRoaXMgc2NyaXB0XG5cbiAgLy8gaW50ZXJuYWwgc2FuZGJveCBvYmplY3RzIGFyZTpcbiAgLy8gbm9kZSA9IHRoZSBjb21wYWN0IHNlcnZlciBub2RlLFxuICAvLyBjb3JlU2VydmVyID0gY29yZSBjb21wYWN0IHNlcnZlciBvYmplY3QgZm9yIGRlYnVnIGFuZCBhY2Nlc3MgdG8gTm9kZU9QQ1VBXG4gIC8vIHRoaXMuc2FuZGJveE5vZGVDb250ZXh0ID0gbm9kZSBjb250ZXh0IG5vZGUtcmVkXG4gIC8vIHRoaXMuc2FuZGJveEZsb3dDb250ZXh0ID0gZmxvdyBjb250ZXh0IG5vZGUtcmVkXG4gIC8vIHRoaXMuc2FuZGJveEdsb2JhbENvbnRleHQgPSBnbG9iYWwgY29udGV4dCBub2RlLXJlZFxuICAvLyB0aGlzLnNhbmRib3hFbnYgPSBlbnYgdmFyaWFibGVzXG4gIC8vIHRpbWVvdXQgYW5kIGludGVydmFsIGZ1bmN0aW9ucyBhcyBleHBlY3RlZCBmcm9tIG5vZGVqc1xuXG4gIGNvbnN0IG9wY3VhID0gY29yZVNlcnZlci5jaG9yZUNvbXBhY3Qub3BjdWE7XG4gIGNvbnN0IExvY2FsaXplZFRleHQgPSBvcGN1YS5Mb2NhbGl6ZWRUZXh0O1xuICBjb25zdCBuYW1lc3BhY2UgPSBhZGRyZXNzU3BhY2UuZ2V0T3duTmFtZXNwYWNlKCk7XG5cbiAgY29uc3QgVmFyaWFudCA9IG9wY3VhLlZhcmlhbnQ7XG4gIGNvbnN0IERhdGFUeXBlID0gb3BjdWEuRGF0YVR5cGU7XG4gIGNvbnN0IERhdGFWYWx1ZSA9IG9wY3VhLkRhdGFWYWx1ZTtcblxuICB2YXIgZmxleFNlcnZlckludGVybmFscyA9IHRoaXM7XG5cbiAgdGhpcy5zYW5kYm94Rmxvd0NvbnRleHQuc2V0KFwiY29udmV5b3JEYXRhLkNvbnZleW9yX1JUU1wiLCBmYWxzZSk7XG4gIHRoaXMuc2FuZGJveEZsb3dDb250ZXh0LnNldChcImNvbnZleW9yRGF0YS5Sb2JvdF9SVFNcIiwgZmFsc2UpO1xuICB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJjb252ZXlvckRhdGEuUm9ib3RfUG9zaXRpb25cIiwgMCk7XG4gIHRoaXMuc2FuZGJveEZsb3dDb250ZXh0LnNldChcImNvbnZleW9yRGF0YS5Db252ZXlvcl9SdW5uaW5nXCIsIGZhbHNlKTtcbiAgdGhpcy5zYW5kYm94Rmxvd0NvbnRleHQuc2V0KFwiY29udmV5b3JEYXRhLkxpbmU0X1N0YXRlXCIsIDApO1xuICB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJjb252ZXlvckRhdGEuTGluZTRfRmF1bHRcIiwgZmFsc2UpO1xuXG4gIC8vIHRoaXMuc2FuZGJveEZsb3dDb250ZXh0LnNldChcImlzb0lucHV0MVwiLCAwKTtcbiAgLy8gdGhpcy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gIC8vICAgZmxleFNlcnZlckludGVybmFscy5zYW5kYm94Rmxvd0NvbnRleHQuc2V0KFxuICAvLyAgICAgXCJpc29JbnB1dDFcIixcbiAgLy8gICAgIE1hdGgucmFuZG9tKCkgKyA1MC4wXG4gIC8vICAgKTtcbiAgLy8gfSwgNTAwKTtcbiAgLy8gdGhpcy5zYW5kYm94Rmxvd0NvbnRleHQuc2V0KFwiaXNvSW5wdXQyXCIsIDApO1xuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29JbnB1dDNcIiwgMCk7XG4gIC8vIHRoaXMuc2FuZGJveEZsb3dDb250ZXh0LnNldChcImlzb0lucHV0NFwiLCAwKTtcbiAgLy8gdGhpcy5zYW5kYm94Rmxvd0NvbnRleHQuc2V0KFwiaXNvSW5wdXQ1XCIsIDApO1xuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29JbnB1dDZcIiwgMCk7XG4gIC8vIHRoaXMuc2FuZGJveEZsb3dDb250ZXh0LnNldChcImlzb0lucHV0N1wiLCAwKTtcbiAgLy8gdGhpcy5zYW5kYm94Rmxvd0NvbnRleHQuc2V0KFwiaXNvSW5wdXQ4XCIsIDApO1xuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29PdXRwdXQxXCIsIDApO1xuICAvLyB0aGlzLnNldEludGVydmFsKCgpID0+IHtcbiAgLy8gICBmbGV4U2VydmVySW50ZXJuYWxzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXG4gIC8vICAgICBcImlzb091dHB1dDFcIixcbiAgLy8gICAgIE1hdGgucmFuZG9tKCkgKyAxMC4wXG4gIC8vICAgKTtcbiAgLy8gfSwgNTAwKTtcblxuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29PdXRwdXQyXCIsIDApO1xuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29PdXRwdXQzXCIsIDApO1xuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29PdXRwdXQ0XCIsIDApO1xuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29PdXRwdXQ1XCIsIDApO1xuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29PdXRwdXQ2XCIsIDApO1xuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29PdXRwdXQ3XCIsIDApO1xuICAvLyB0aGlzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXCJpc29PdXRwdXQ4XCIsIDApO1xuXG4gIGNvcmVTZXJ2ZXIuZGVidWdMb2coXCJpbml0IGR5bmFtaWMgYWRkcmVzcyBzcGFjZVwiKTtcbiAgY29uc3Qgcm9vdEZvbGRlciA9IGFkZHJlc3NTcGFjZS5maW5kTm9kZShcIlJvb3RGb2xkZXJcIik7XG5cbiAgbm9kZS53YXJuKFwiY29uc3RydWN0IG5ldyBhZGRyZXNzIHNwYWNlIGZvciBPUEMgVUFcIik7XG5cbiAgY29uc3QgbXlEZXZpY2UgPSBuYW1lc3BhY2UuYWRkRm9sZGVyKHJvb3RGb2xkZXIub2JqZWN0cywge1xuICAgIFwiYnJvd3NlTmFtZVwiOiBcIkxpbmUgNCBQTENcIlxuICB9KTtcbiAgY29uc3QgY29udmV5b3JGb2xkZXIgPSBuYW1lc3BhY2UuYWRkRm9sZGVyKG15RGV2aWNlLCB7IFwiYnJvd3NlTmFtZVwiOiBcIkNvbnZleW9yXCIgfSk7XG4gIGNvbnN0IGNvbnZleW9yQm9vbHMgPSBuYW1lc3BhY2UuYWRkRm9sZGVyKGNvbnZleW9yRm9sZGVyLCB7XG4gICAgXCJicm93c2VOYW1lXCI6IFwiQm9vbHNcIlxuICB9KTtcbiAgY29uc3QgY29udmV5b3JESU5UcyA9IG5hbWVzcGFjZS5hZGRGb2xkZXIoY29udmV5b3JGb2xkZXIsIHtcbiAgICBcImJyb3dzZU5hbWVcIjogXCJESU5Uc1wiXG4gIH0pO1xuICBjb25zdCBjb252ZXlvckZsb2F0cyA9IG5hbWVzcGFjZS5hZGRGb2xkZXIoY29udmV5b3JGb2xkZXIsIHtcbiAgICBcImJyb3dzZU5hbWVcIjogXCJGbG9hdHNcIlxuICB9KTtcblxuICAvLyBDb25zdHJ1Y3QgTm9kZXNcbiAgY29uc3QgQ29udmV5b3JfUlRTID0gbmFtZXNwYWNlLmFkZFZhcmlhYmxlKHtcbiAgICBcIm9yZ2FuaXplZEJ5XCI6IGNvbnZleW9yQm9vbHMsXG4gICAgXCJicm93c2VOYW1lXCI6IFwiQ29udmV5b3IgUmVhZHkgdG8gU3RhcnRcIixcbiAgICBcIm5vZGVJZFwiOiBcIm5zPTE7cz1Db252ZXlvcl9SVFNcIixcbiAgICBcImRhdGFUeXBlXCI6IFwiQm9vbGVhblwiLFxuICAgIFwidmFsdWVcIjoge1xuICAgICAgXCJnZXRcIjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZhcmlhbnQoe1xuICAgICAgICAgIFwiZGF0YVR5cGVcIjogRGF0YVR5cGUuQm9vbGVhbixcbiAgICAgICAgICBcInZhbHVlXCI6IGZsZXhTZXJ2ZXJJbnRlcm5hbHMuc2FuZGJveEZsb3dDb250ZXh0LmdldChcImNvbnZleW9yRGF0YS5Db252ZXlvcl9SVFNcIilcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgXCJzZXRcIjogZnVuY3Rpb24gKHZhcmlhbnQpIHtcbiAgICAgICAgZmxleFNlcnZlckludGVybmFscy5zYW5kYm94Rmxvd0NvbnRleHQuc2V0KFxuICAgICAgICAgIFwiY29udmV5b3JEYXRhLkNvbnZleW9yX1JUU1wiLFxuICAgICAgICAgIHZhcmlhbnQudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9wY3VhLlN0YXR1c0NvZGVzLkdvb2Q7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBSb2JvdF9SVFMgPSBuYW1lc3BhY2UuYWRkVmFyaWFibGUoe1xuICAgIFwib3JnYW5pemVkQnlcIjogY29udmV5b3JCb29scyxcbiAgICBcImJyb3dzZU5hbWVcIjogXCJSb2JvdCBSZWFkeSB0byBTdGFydFwiLFxuICAgIFwibm9kZUlkXCI6IFwibnM9MTtzPVJvYm90X1JUU1wiLFxuICAgIFwiZGF0YVR5cGVcIjogXCJCb29sZWFuXCIsXG4gICAgXCJ2YWx1ZVwiOiB7XG4gICAgICBcImdldFwiOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmFyaWFudCh7XG4gICAgICAgICAgXCJkYXRhVHlwZVwiOiBEYXRhVHlwZS5Cb29sZWFuLFxuICAgICAgICAgIFwidmFsdWVcIjogZmxleFNlcnZlckludGVybmFscy5zYW5kYm94Rmxvd0NvbnRleHQuZ2V0KFwiY29udmV5b3JEYXRhLlJvYm90X1JUU1wiKVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBcInNldFwiOiBmdW5jdGlvbiAodmFyaWFudCkge1xuICAgICAgICBmbGV4U2VydmVySW50ZXJuYWxzLnNhbmRib3hGbG93Q29udGV4dC5zZXQoXG4gICAgICAgICAgXCJjb252ZXlvckRhdGEuUm9ib3RfUlRTXCIsXG4gICAgICAgICAgdmFyaWFudC52YWx1ZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gb3BjdWEuU3RhdHVzQ29kZXMuR29vZDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IENvbnZleW9yX1J1bm5pbmcgPSBuYW1lc3BhY2UuYWRkVmFyaWFibGUoe1xuICAgIFwib3JnYW5pemVkQnlcIjogY29udmV5b3JCb29scyxcbiAgICBcImJyb3dzZU5hbWVcIjogXCJDb252ZXlvciBSdW5uaW5nXCIsXG4gICAgXCJub2RlSWRcIjogXCJucz0xO3M9Q29udmV5b3JfUnVubmluZ1wiLFxuICAgIFwiZGF0YVR5cGVcIjogXCJCb29sZWFuXCIsXG4gICAgXCJ2YWx1ZVwiOiB7XG4gICAgICBcImdldFwiOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmFyaWFudCh7XG4gICAgICAgICAgXCJkYXRhVHlwZVwiOiBEYXRhVHlwZS5Cb29sZWFuLFxuICAgICAgICAgIFwidmFsdWVcIjogZmxleFNlcnZlckludGVybmFscy5zYW5kYm94Rmxvd0NvbnRleHQuZ2V0KFwiY29udmV5b3JEYXRhLkNvbnZleW9yX1J1bm5pbmdcIilcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgXCJzZXRcIjogZnVuY3Rpb24gKHZhcmlhbnQpIHtcbiAgICAgICAgZmxleFNlcnZlckludGVybmFscy5zYW5kYm94Rmxvd0NvbnRleHQuc2V0KFxuICAgICAgICAgIFwiY29udmV5b3JEYXRhLkNvbnZleW9yX1J1bm5pbmdcIixcbiAgICAgICAgICB2YXJpYW50LnZhbHVlXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBvcGN1YS5TdGF0dXNDb2Rlcy5Hb29kO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgTGluZTRfRmF1bHQgPSBuYW1lc3BhY2UuYWRkVmFyaWFibGUoe1xuICAgIFwib3JnYW5pemVkQnlcIjogY29udmV5b3JCb29scyxcbiAgICBcImJyb3dzZU5hbWVcIjogXCJMaW5lIDQgRmF1bHRlZFwiLFxuICAgIFwibm9kZUlkXCI6IFwibnM9MTtzPUxpbmU0X0ZhdWx0XCIsXG4gICAgXCJkYXRhVHlwZVwiOiBcIkJvb2xlYW5cIixcbiAgICBcInZhbHVlXCI6IHtcbiAgICAgIFwiZ2V0XCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWYXJpYW50KHtcbiAgICAgICAgICBcImRhdGFUeXBlXCI6IERhdGFUeXBlLkJvb2xlYW4sXG4gICAgICAgICAgXCJ2YWx1ZVwiOiBmbGV4U2VydmVySW50ZXJuYWxzLnNhbmRib3hGbG93Q29udGV4dC5nZXQoXCJjb252ZXlvckRhdGEuTGluZTRfRmF1bHRcIilcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgXCJzZXRcIjogZnVuY3Rpb24gKHZhcmlhbnQpIHtcbiAgICAgICAgZmxleFNlcnZlckludGVybmFscy5zYW5kYm94Rmxvd0NvbnRleHQuc2V0KFxuICAgICAgICAgIFwiY29udmV5b3JEYXRhLkxpbmU0X0ZhdWx0XCIsXG4gICAgICAgICAgdmFyaWFudC52YWx1ZVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gb3BjdWEuU3RhdHVzQ29kZXMuR29vZDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IExpbmU0X1N0YXRlID0gbmFtZXNwYWNlLmFkZFZhcmlhYmxlKHtcbiAgICBcIm9yZ2FuaXplZEJ5XCI6IGNvbnZleW9yRElOVHMsXG4gICAgXCJicm93c2VOYW1lXCI6IFwiTGluZSA0IFN0YXRlXCIsXG4gICAgXCJub2RlSWRcIjogXCJucz0xO3M9TGluZTRfU3RhdGVcIixcbiAgICBcImRhdGFUeXBlXCI6IFwiSW50MzJcIixcbiAgICBcInZhbHVlXCI6IHtcbiAgICAgIFwiZ2V0XCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWYXJpYW50KHtcbiAgICAgICAgICBcImRhdGFUeXBlXCI6IERhdGFUeXBlLkludDMyLFxuICAgICAgICAgIFwidmFsdWVcIjogZmxleFNlcnZlckludGVybmFscy5zYW5kYm94Rmxvd0NvbnRleHQuZ2V0KFwiY29udmV5b3JEYXRhLkxpbmU0X1N0YXRlXCIpXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIFwic2V0XCI6IGZ1bmN0aW9uICh2YXJpYW50KSB7XG4gICAgICAgIGZsZXhTZXJ2ZXJJbnRlcm5hbHMuc2FuZGJveEZsb3dDb250ZXh0LnNldChcbiAgICAgICAgICBcImNvbnZleW9yRGF0YS5MaW5lNF9TdGF0ZVwiLFxuICAgICAgICAgIHZhcmlhbnQudmFsdWVcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9wY3VhLlN0YXR1c0NvZGVzLkdvb2Q7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBSb2JvdF9Qb3NpdGlvbiA9IG5hbWVzcGFjZS5hZGRWYXJpYWJsZSh7XG4gICAgXCJvcmdhbml6ZWRCeVwiOiBjb252ZXlvckZsb2F0cyxcbiAgICBcImJyb3dzZU5hbWVcIjogXCJSb2JvdCBBeGlzIEExIFBvc2l0aW9uXCIsXG4gICAgXCJub2RlSWRcIjogXCJucz0xO3M9Um9ib3RfUG9zaXRpb25cIixcbiAgICBcImRhdGFUeXBlXCI6IFwiRmxvYXRcIixcbiAgICBcInZhbHVlXCI6IHtcbiAgICAgIFwiZ2V0XCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWYXJpYW50KHtcbiAgICAgICAgICBcImRhdGFUeXBlXCI6IERhdGFUeXBlLkZsb2F0LFxuICAgICAgICAgIFwidmFsdWVcIjogZmxleFNlcnZlckludGVybmFscy5zYW5kYm94Rmxvd0NvbnRleHQuZ2V0KFwiY29udmV5b3JEYXRhLlJvYm90X1Bvc2l0aW9uXCIpXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIFwic2V0XCI6IGZ1bmN0aW9uICh2YXJpYW50KSB7XG4gICAgICAgIGZsZXhTZXJ2ZXJJbnRlcm5hbHMuc2FuZGJveEZsb3dDb250ZXh0LnNldChcbiAgICAgICAgICBcImNvbnZleW9yRGF0YS5Sb2JvdF9Qb3NpdGlvblwiLFxuICAgICAgICAgIHBhcnNlRmxvYXQodmFyaWFudC52YWx1ZSlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9wY3VhLlN0YXR1c0NvZGVzLkdvb2Q7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBBZGQgYSB2aWV3XG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IHZpZXdCb29scyA9IG5hbWVzcGFjZS5hZGRWaWV3KHtcbiAgICBcIm9yZ2FuaXplZEJ5XCI6IHJvb3RGb2xkZXIudmlld3MsXG4gICAgXCJicm93c2VOYW1lXCI6IFwiTGluZSA0IENvbnZleW9yIEJvb2xzXCJcbiAgfSk7XG5cbiAgY29uc3Qgdmlld0RJTlRzID0gbmFtZXNwYWNlLmFkZFZpZXcoe1xuICAgIFwib3JnYW5pemVkQnlcIjogcm9vdEZvbGRlci52aWV3cyxcbiAgICBcImJyb3dzZU5hbWVcIjogXCJMaW5lNCBDb252ZXlvciBESU5Uc1wiXG4gIH0pO1xuXG4gIGNvbnN0IHZpZXdGbG9hdHMgPSBuYW1lc3BhY2UuYWRkVmlldyh7XG4gICAgXCJvcmdhbml6ZWRCeVwiOiByb290Rm9sZGVyLnZpZXdzLFxuICAgIFwiYnJvd3NlTmFtZVwiOiBcIkxpbmU0IENvbnZleW9yIEZsb2F0c1wiXG4gIH0pO1xuXG4gIHZpZXdCb29scy5hZGRSZWZlcmVuY2Uoe1xuICAgIFwicmVmZXJlbmNlVHlwZVwiOiBcIk9yZ2FuaXplc1wiLFxuICAgIFwibm9kZUlkXCI6IENvbnZleW9yX1JUUy5ub2RlSWRcbiAgfSk7XG5cbiAgdmlld0Jvb2xzLmFkZFJlZmVyZW5jZSh7XG4gICAgXCJyZWZlcmVuY2VUeXBlXCI6IFwiT3JnYW5pemVzXCIsXG4gICAgXCJub2RlSWRcIjogUm9ib3RfUlRTLm5vZGVJZFxuICB9KTtcblxuICB2aWV3Qm9vbHMuYWRkUmVmZXJlbmNlKHtcbiAgICBcInJlZmVyZW5jZVR5cGVcIjogXCJPcmdhbml6ZXNcIixcbiAgICBcIm5vZGVJZFwiOiBDb252ZXlvcl9SdW5uaW5nLm5vZGVJZFxuICB9KTtcblxuICB2aWV3Qm9vbHMuYWRkUmVmZXJlbmNlKHtcbiAgICBcInJlZmVyZW5jZVR5cGVcIjogXCJPcmdhbml6ZXNcIixcbiAgICBcIm5vZGVJZFwiOiBMaW5lNF9GYXVsdC5ub2RlSWRcbiAgfSk7XG5cblxuICB2aWV3RElOVHMuYWRkUmVmZXJlbmNlKHtcbiAgICBcInJlZmVyZW5jZVR5cGVcIjogXCJPcmdhbml6ZXNcIixcbiAgICBcIm5vZGVJZFwiOiBMaW5lNF9TdGF0ZS5ub2RlSWRcbiAgfSk7XG5cbiAgdmlld0Zsb2F0cy5hZGRSZWZlcmVuY2Uoe1xuICAgIFwicmVmZXJlbmNlVHlwZVwiOiBcIk9yZ2FuaXplc1wiLFxuICAgIFwibm9kZUlkXCI6IFJvYm90X1Bvc2l0aW9uLm5vZGVJZFxuICB9KTtcbiAgY29yZVNlcnZlci5kZWJ1Z0xvZyhcImNyZWF0ZSBkeW5hbWljIGFkZHJlc3Mgc3BhY2UgZG9uZVwiKTtcbiAgbm9kZS53YXJuKFwiY29uc3RydWN0aW9uIG9mIG5ldyBhZGRyZXNzIHNwYWNlIGZvciBPUEMgVUEgZG9uZVwiKTtcblxuICBkb25lKCk7XG59XG4iLCJ4Ijo5NjAsInkiOjYwMCwid2lyZXMiOltdfSx7ImlkIjoiN2FlODlmMTM0NDE1YzUxZSIsInR5cGUiOiJldGgtaXAgaW4iLCJ6IjoiMmU4YzdmNWMuYWI3M2QiLCJlbmRwb2ludCI6ImYwMTIwNDJiNzUxNzNiNzciLCJtb2RlIjoiYWxsIiwidmFyaWFibGUiOiIiLCJwcm9ncmFtIjoiIiwibmFtZSI6IlJlYWQgTGluZTQgQ29udmV5b3IgdGFncyIsIngiOjE1MCwieSI6NjAwLCJ3aXJlcyI6W1siMGM1MWY0NGJhYTA4YTNiMiJdXX0seyJpZCI6ImEwNTkyMjgwYmFlYTk3NWIiLCJ0eXBlIjoiY29tbWVudCIsInoiOiIyZThjN2Y1Yy5hYjczZCIsIm5hbWUiOiJyZWFkIGRhdGEgZnJvbSBQTEMgJiBzdG9yZSBpbiBjb252ZXlvckRhdGEgY29udGV4dCBmbG93IG1lbW9yeSIsImluZm8iOiIiLCJ4IjozNTAsInkiOjU0MCwid2lyZXMiOltdfSx7ImlkIjoiYjQxMWE1Y2U0NzQ5ZmE2MSIsInR5cGUiOiJjb21tZW50IiwieiI6IjJlOGM3ZjVjLmFiNzNkIiwibmFtZSI6IlNlY3VyZSBPUEMgVUEgU2VydmVyIFB1Ymxpc2hpbmcgUExDIGNvbnZleW9yRGF0YSIsImluZm8iOiIiLCJ4Ijo5ODAsInkiOjU0MCwid2lyZXMiOltdfSx7ImlkIjoiMGM1MWY0NGJhYTA4YTNiMiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiMmU4YzdmNWMuYWI3M2QiLCJuYW1lIjoic3RvcmUgUExDIERhdGEgaW4gZmxvdyBjb250ZXh0IG1lbW9yeSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImNvbnZleW9yRGF0YS5Db252ZXlvcl9SVFMiLCJwdCI6ImZsb3ciLCJ0byI6InBheWxvYWQuQ29udmV5b3JfUlRTIiwidG90IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6ImNvbnZleW9yRGF0YS5Db252ZXlvcl9SdW5uaW5nIiwicHQiOiJmbG93IiwidG8iOiJwYXlsb2FkLkNvbnZleW9yX1J1bm5pbmciLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoiY29udmV5b3JEYXRhLkxpbmU0X0ZhdWx0IiwicHQiOiJmbG93IiwidG8iOiJwYXlsb2FkLkxpbmU0X0ZhdWx0IiwidG90IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6ImNvbnZleW9yRGF0YS5MaW5lNF9TdGF0ZSIsInB0IjoiZmxvdyIsInRvIjoicGF5bG9hZC5MaW5lNF9TdGF0ZSIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJjb252ZXlvckRhdGEuUm9ib3RfUG9zaXRpb24iLCJwdCI6ImZsb3ciLCJ0byI6InBheWxvYWQuUm9ib3RfUG9zaXRpb24iLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoiY29udmV5b3JEYXRhLlJvYm90X1JUUyIsInB0IjoiZmxvdyIsInRvIjoicGF5bG9hZC5Sb2JvdF9SVFMiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTMwLCJ5Ijo2MDAsIndpcmVzIjpbW11dfSx7ImlkIjoiZjAxMjA0MmI3NTE3M2I3NyIsInR5cGUiOiJldGgtaXAgZW5kcG9pbnQiLCJhZGRyZXNzIjoiMTkyLjE2OC4wLjUiLCJzbG90IjoiMCIsImN5Y2xldGltZSI6IjEwMDAiLCJuYW1lIjoiTGluZSA0IFBMQyIsInZhcnRhYmxlIjp7IiI6eyJDb252ZXlvcl9SVFMiOnsidHlwZSI6IkJPT0wifSwiQ29udmV5b3JfUnVubmluZyI6eyJ0eXBlIjoiQk9PTCJ9LCJMaW5lNF9GYXVsdCI6eyJ0eXBlIjoiQk9PTCJ9LCJMaW5lNF9TdGF0ZSI6eyJ0eXBlIjoiRElOVCJ9LCJSb2JvdF9Qb3NpdGlvbiI6eyJ0eXBlIjoiUkVBTCJ9LCJSb2JvdF9SVFMiOnsidHlwZSI6IkJPT0wifX19fV0="
---
::


