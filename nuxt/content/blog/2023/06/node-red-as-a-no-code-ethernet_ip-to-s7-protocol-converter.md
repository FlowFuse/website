---
title: Node-RED as a No-Code EtherNet/IP to S7 Protocol Converter
navTitle: Node-RED as a No-Code EtherNet/IP to S7 Protocol Converter
---

Frequently in industrial automation, there's a need for two devices that use different protocols to communicate with each other, requiring protocol conversion.  
In this tutorial, we present a mock scenario where Node-RED is used to enable an Allen Bradley PLC, which uses ethernet/IP, to communicate with a Siemens PLC, which uses S7, using a no-code solution. This example is geared toward beginners and assumes that the end-user knows how to use PLCs, but may be using FlowFuse or Node-RED for the first time.

<!--more-->

## Premise

![Mock production facility](/blog/2023/06/images/ethip-to-S7/e-to-p-1.png "FlowFuse Mock production facility")

The figure above shows the layout of a mock production facility. Inside this facility, operations suggested adding stack lights as an extra visual aid for operators to get a quick status of its 4 conveyor lines, avoiding the need to constantly monitor the HMI/SCADA displays.  
Engineering has suggested adding a siemens S7 1200 PLC with an IO link connection to 4 stacklights, with each line PLC sending basic status information to the stacklight PLC to control the stack light outputs.  
Line 1-3 PLCs are Siemens-based, and can communicate with the stacklight PLC natively over S7. But line 4 is an Allen Bradley PLC that uses ethernet/IP, and can't communicate with the stacklight PLC without some form of protocol conversion.  
Traditionally, we'd use protocol gateway hardware, like Anybus or Red Lion, to convert ethernet/IP to S7.  
But for this application, we will instead use FlowFuse, a pure software-based approach, to convert ethernet/IP to S7. Let's walk through the process.

## Pre-Requisites and Set Up

### FlowFuse

In addition to our two PLCs, we’ll be using FlowFuse software to serve our Node-RED instance. You can either self-host, on-premise or in the cloud. Or use the managed service [FlowFuse Cloud](https://app.flowfuse.com).

In this example, we will be using a self-hosted FlowFuse instance running on [Docker](/docs/install/docker/).

### Data Treatment on Ethernet/IP PLC

In our Allen Bradley line 4 PLC, we will send some arbitrary tags of various datatypes to the stacklight PLC for illustrative purposes, described in table 1 below -

| **Tag** | **Data Type** | **Description** |
| --- | --- | --- |
| Conveyor\_RTS | BOOL | Conveyor Ready to Start |
| Robot\_RTS | BOOL | Robot is Ready to Start |
| Robot\_Position | REAL | Robot Arm position (degrees) |
| Conveyor\_Running | BOOL | Conveyor is running |
| Line4\_State | DINT | Line 4 Machine State |
| Line4\_Fault | BOOL | Line 4 is faulted |

Table 1 - Line 4 Tags to be sent to Stacklight PLC

We can send any atomic data type we want, but it must be globally (controller) scoped.

!["Screenshot showing the AB Controller Tags"](/blog/2023/06/images/ethip-to-S7/e-to-p-2.png "Screenshot showing the AB Controller Tags")

Each tag must also have external read/write access enabled.

!["Screenshot showing the AB Tag Properties"](/blog/2023/06/images/ethip-to-S7/e-to-p-3.png "Screenshot showing the AB Tag Properties")

### Data Treatment on S7 PLC

In the Siemens PLC, we have a DB for the data from the Line 4 PLC to be written to.

*   In the DBs attributes, “optimized block access” must be disabled.
    
*   The tags must be writeable and accessible
    
*   !["Screenshot showing the Siemens Tag DB Properties"](/blog/2023/06/images/ethip-to-S7/e-to-p-4.png "Screenshot showing the Siemens Tag DB Properties")
    
    “No protection” must be set in the CPU properties
    
*   !["Screenshot showing the Siemens CPU Properties"](/blog/2023/06/images/ethip-to-S7/e-to-p-5.png "Screenshot showing the Siemens CPU Properties")

## Create The Flow

With both PLCs up and running and properly set up to send/receive remote data, we can now create a flow to act as our protocol converter.

### Install Custom Nodes

First, we need to add two custom nodes that will give Node-RED the ability to read/write ethernet/IP and S7 data.

Click the hamburger icon → manage pallette

![Screenshot showing the 'Manage palette option' in the menu](/blog/2023/06/images/ethip-to-S7/e-to-p-6.png)

On the `install` tab, search for `s7` and install the `node-red-contrib-s7` node.

!["Installing S7 node"](/blog/2023/06/images/ethip-to-S7/e-to-p-7.png "Installing S7 node")

Next, search for `ethernet` and install the `node-red-contrib-cip-ethernet-ip` node.

!["InstallING EthernetIP Node"](/blog/2023/06/images/ethip-to-S7/e-to-p-8.png "InstallING EthernetIP Node")
Go to the `nodes` tab and confirm both custom nodes have been properly installed.

!["Screenshot of 'Nodes' tab showing Installed nodes List"](/blog/2023/06/images/ethip-to-S7/e-to-p-9.png "Screenshot of 'Nodes' tab showing Installed nodes List")

### Set Up Ethernet/IP Data

Let’s start by dragging a `eth-ip in` node onto the pallette. Then add a new endpoint, which will point to our Line4 PLC.

!["Screenshot showing dragged 'eth-ip in' node and it's config tab"](/blog/2023/06/images/ethip-to-S7/e-to-p-10.png "Screenshot showing dragged 'eth-ip in' node and it's config tab")

In the endpoint `connection` properties, the connection information must match the PLC, so set the IP address and CPU slot number appropriately. Also, the default cycle time is 500ms. Depending on your application, polling the CPU at 500ms may be appropriate. But being that this is a simple stacklight, 500ms is unnecessarily fast. So we will change it to 1000ms, which is a more appropriate polling rate for this type of application.

!["Screenshot showing the eth-ip Endpoint config"](/blog/2023/06/images/ethip-to-S7/e-to-p-11.png "Screenshot showing the eth-ip Endpoint config")

On the `Tags` tab, populate the tag information to match our Allen Bradley PLC. Then select `Update` to complete configuration of the `eth-ip endpoint`.

!["Screenshot showing eth-ip Endpoint Tags"](/blog/2023/06/images/ethip-to-S7/e-to-p-12.png "Screenshot showing eth-ip Endpoint Tags")

Now that we have our endpoint, let’s finish configuring the `eth-ip in` node.

1.  select the endpoint we just created
    
2.  select the first tag in the drop-down
    
3.  give the node a descriptive name
    

![Screeshot showing the eth-ip in Node config](/blog/2023/06/images/ethip-to-S7/e-to-p-13.png "Screeshot showing the eth-ip in Node config")

Now let’s set up a quick test to confirm our PLC connection is valid by adding a `debug` node to the `eth-ip in` node. Then hit `deploy`.

*   note - you can see we also have a `comment` above the nodes that describes what is happening. This is optional but good practice to help organize and understand your flow.
    

The output of the debug console did not report any errors so communication appears to be okay.

![Screenshot showing the output of eth-ip in Debug panel](/blog/2023/06/images/ethip-to-S7/e-to-p-14.png "Screenshot showing the output of eth-ip in Debug panel")

But just to confirm, let’s toggle the value and see if comes through.

![Screenshot showing the eth-ip node output in Debug panel after Toggle](/blog/2023/06/images/ethip-to-S7/e-to-p-15.png "Screenshot showing the eth-ip node output in Debug panel after Toggle")

So by toggling the value and see the result, here we confirmed 2 things:

*   We can detect changes in value
    
*   the `eth-ip in` node only sends a message when the value changes, also known as Report by Exception.
    

Because the `eth-ip in` node implicitly uses report by exception, and the protocol doesn't rely on contiguous data consistency (unlike modbus, for instance), we can receive our data one tag at a time to keep our flow simple.

Now we can remove the debug node and add the additional `eth-ip in` nodes to receive the remaining tags from our Line 4 PLC.

Here’s how the the flow should look at this point.

![Screenshot of Line 4 PLC Nodes](/blog/2023/06/images/ethip-to-S7/e-to-p-16.png "Screenshot of Line 4 PLC Nodes")

### Set Up S7 Data

Now we’ll set up the S7 endpoint, using an `s7 out` node.

![Screenshot of s7 out Node on Palette](/blog/2023/06/images/ethip-to-S7/e-to-p-17.png "Screenshot of s7 out Node on Palette")

Populate the connection properties to match your hardware. The cycle time is updated to 1000ms to match the cycle time of our `eth-ip in` nodes. You can adjust this value to match your intended application.

!["Screenshot showing the S7 endpoint Connection"](/blog/2023/06/images/ethip-to-S7/e-to-p-18.png "Screenshot showing the S7 endpoint Connection")

On the `Variables` tab, some special formatting is required to point to the absolute reference of the tag DB location in the S7 PLC.

For information on how to format S7 absolute tag references in a way the `s7 endpoint` node is expecting, refer to the [node documentation](https://flows.nodered.org/node/node-red-contrib-s7) for further information.

For reference, here is an example of how we set the tags in our stacklight PLC example and how it looks in our `s7 endpoint`.

!["Screenshot of s7 endpoint Variables"](/blog/2023/06/images/ethip-to-S7/e-to-p-19.png "Screenshot of s7 endpoint Variables")

Once the tags are populated we can select our configured endpoint from the dropdown list, point to our first variable, `Conveyor_RTS`, and give the node a name.

!["Screenshot of S7 out Config"](/blog/2023/06/images/ethip-to-S7/e-to-p-20.png "Screenshot of S7 out Config")

Repeat this process for the remaining tags.

!["Screenshot of Stacklight PLC Nodes"](/blog/2023/06/images/ethip-to-S7/e-to-p-21.png "Screenshot of Stacklight PLC Nodes")

## Test the Conversion

The only thing remaining is to simply wire the nodes together, and confirm the values pass through.

!["Screenshot of the complete flow with live Data"](/blog/2023/06/images/ethip-to-S7/e-to-p-22.png "Screenshot of the complete flow with live Data")

Manipulate the incoming values and confirm the data passes through as expected. Because of the report by exception nature of the `eth-ip in` node, tag changes should be near instantaneous on the receiving PLC.

We can stop here, but we can improve this flow by adding a `filter` node on our REAL data-type, `Robot_Position`.

### Add Filter to REAL data

Depending on how noisy the REAL data is, which is common with unfiltered 4-20mA field transmitters, and how much granularity you need to capture, it is good practice to add a filter on REAL data to reduce FieldBus traffic coming out of our soft protocol converter.

!["Screenshot showing the Filter node Configuration"](/blog/2023/06/images/ethip-to-S7/e-to-p-23.png "Screenshot showing the Filter node Configuration")

In the example above, we arbitrarily applied a 3% [deadband](/node-red/core-nodes/filter/)
to the `Robot_Position` value, which means that the value must change by greater than or equal to 3% compared to the last input value, or else the data will be discarded before being sent to the stacklight PLC.

You can adjust the deadband to find the right balance for your particular application.

We can see the effect the deadband filter had by adding debug nodes before and after the filter.

![Filter Node Debug](/blog/2023/06/images/ethip-to-S7/e-to-p-24.png "Filter Node Debug")

As shown above, when `Robot_Position` changed from 15.6 to 15.6999..., the value was captured on the input of the filter, but was discarded on the output.

When the `Robot_Position` went from 15.6999 to 18, the filter allowed it to pass as it exceeded the deadband limit we had set.

Use filters to optimize your fieldbus converter network performance, especially if dealing with noisy signals or large quantities of REAL datatypes.

## Conclusion

In this tutorial, we demonstrated how to use Node-RED as a free Ethernet/IP to S7 protocol converter using a simple no-code approach.  We showed how to configure PLC tags to be sent remotely using Ethernet/IP, how to configure PLC tags to be received remotely using S7, and how to create the flow to use Node-RED to seamlessly convert incoming PLC data between the two protocols using `node-red-contrib-cip-ethernet-ip` and `node-red-contrib-s7` custom nodes.  We also took things one step further and added a `filter` node to optimize FieldBus network traffic by putting a deadband on REAL data being sent to the receiving PLC.

The end result is a simple to set up, free and performant industrial protocol converter that requires minimal PLC configuration, which allows this application to be applied in non-mission critical production systems with minimal, if any downtime.  Additionally, the protocol traffic can be visually observed in real-time for easy trouble-shooting and fault analysis by simply accessing the Node-RED UI. 

In later tutorials, we can show ways this simple flow can be extended to add additional capabilities not normally available in traditional off-the-shelf protocol gateways. If you found this tutorial helpful, or have any questions or comments, please leave us a comment and let us know your thoughts.

JSON source code for the flow used in this tutorial is provided below - 


::render-flow
---
height: 500
flow: "W3siaWQiOiJhZDdiMTc0MTFjOGU4M2FhIiwidHlwZSI6InRhYiIsImxhYmVsIjoiTGluZSA0IHRvIFN0YWNrbGlnaHQgUExDIiwiZGlzYWJsZWQiOmZhbHNlLCJpbmZvIjoiIiwiZW52IjpbXX0seyJpZCI6ImM5N2E0YzliZDE5ODE3NTciLCJ0eXBlIjoiY29tbWVudCIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwibmFtZSI6IkFCIEVJUC9DSVAgLSBMaW5lIDQgUExDIiwiaW5mbyI6IiIsIngiOjE5MCwieSI6MTQwLCJ3aXJlcyI6W119LHsiaWQiOiIyY2M1MjI3ZWY2YTkwODE0IiwidHlwZSI6ImV0aC1pcCBpbiIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwiZW5kcG9pbnQiOiI0YWIyOTEwYjY2ZTE2MjIwIiwibW9kZSI6InNpbmdsZSIsInZhcmlhYmxlIjoiQ29udmV5b3JfUlRTIiwicHJvZ3JhbSI6IiIsIm5hbWUiOiJSZWFkIENvbnZleW9yX1JUUyIsIngiOjIwMCwieSI6MjAwLCJ3aXJlcyI6W1siZmUxOGVmODBmOWUxOGMxMyJdXX0seyJpZCI6IjkzMDhkY2JkYTE3Mjc0YzciLCJ0eXBlIjoiY29tbWVudCIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwibmFtZSI6IlNpZW1lbnMgUzcgLSBTdGFja2xpZ2h0IFBMQyIsImluZm8iOiIiLCJ4Ijo2MjAsInkiOjE0MCwid2lyZXMiOltdfSx7ImlkIjoiZmUxOGVmODBmOWUxOGMxMyIsInR5cGUiOiJzNyBvdXQiLCJ6IjoiYWQ3YjE3NDExYzhlODNhYSIsImVuZHBvaW50IjoiYTFiZWMyNTg1OGM2ZjNlZiIsInZhcmlhYmxlIjoiQ29udmV5b3JfUlRTIiwibmFtZSI6IldyaXRlIENvbnZleW9yX1JUUyIsIngiOjYyMCwieSI6MjAwLCJ3aXJlcyI6W119LHsiaWQiOiI5NGZlNmI3M2VmYTFjNTZiIiwidHlwZSI6ImV0aC1pcCBpbiIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwiZW5kcG9pbnQiOiI0YWIyOTEwYjY2ZTE2MjIwIiwibW9kZSI6InNpbmdsZSIsInZhcmlhYmxlIjoiUm9ib3RfUlRTIiwicHJvZ3JhbSI6IiIsIm5hbWUiOiJSZWFkIFJvYm90X1JUUyIsIngiOjE4MCwieSI6MjgwLCJ3aXJlcyI6W1siNzc3NGQ2Y2UxODhjMjg4YyJdXX0seyJpZCI6IjdlOTU2NGNkNTllM2QwYTIiLCJ0eXBlIjoiZXRoLWlwIGluIiwieiI6ImFkN2IxNzQxMWM4ZTgzYWEiLCJlbmRwb2ludCI6IjRhYjI5MTBiNjZlMTYyMjAiLCJtb2RlIjoic2luZ2xlIiwidmFyaWFibGUiOiJSb2JvdF9Qb3NpdGlvbiIsInByb2dyYW0iOiIiLCJuYW1lIjoiUmVhZCBSb2JvdF9Qb3NpdGlvbiIsIngiOjIwMCwieSI6MzYwLCJ3aXJlcyI6W1siODMyODA3YmZkYzRiNzZmMCJdXX0seyJpZCI6ImMwZjcxMmI5ZTM1NWYxZjgiLCJ0eXBlIjoiZXRoLWlwIGluIiwieiI6ImFkN2IxNzQxMWM4ZTgzYWEiLCJlbmRwb2ludCI6IjRhYjI5MTBiNjZlMTYyMjAiLCJtb2RlIjoic2luZ2xlIiwidmFyaWFibGUiOiJDb252ZXlvcl9SdW5uaW5nIiwicHJvZ3JhbSI6IiIsIm5hbWUiOiJSZWFkIENvbnZleW9yX1J1bm5pbmciLCJ4IjoyMTAsInkiOjQ0MCwid2lyZXMiOltbImZiZjFiM2UzODg5N2E5YzciXV19LHsiaWQiOiJkYjc3NjIxZTQxOGYxMjIyIiwidHlwZSI6ImV0aC1pcCBpbiIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwiZW5kcG9pbnQiOiI0YWIyOTEwYjY2ZTE2MjIwIiwibW9kZSI6InNpbmdsZSIsInZhcmlhYmxlIjoiTGluZTRfU3RhdGUiLCJwcm9ncmFtIjoiIiwibmFtZSI6IlJlYWQgTGluZTRfU3RhdGUiLCJ4IjoxOTAsInkiOjUyMCwid2lyZXMiOltbImNkZWZmZDllNTJjYzQzODQiXV19LHsiaWQiOiI4NDhhZjliNzZmOTY5ZGQyIiwidHlwZSI6ImV0aC1pcCBpbiIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwiZW5kcG9pbnQiOiI0YWIyOTEwYjY2ZTE2MjIwIiwibW9kZSI6InNpbmdsZSIsInZhcmlhYmxlIjoiTGluZTRfRmF1bHQiLCJwcm9ncmFtIjoiIiwibmFtZSI6IlJlYWQgTGluZTRfRmF1bHQiLCJ4IjoxOTAsInkiOjYwMCwid2lyZXMiOltbIjBjNTk1YjBhYzI1NTA1OTMiXV19LHsiaWQiOiI3Nzc0ZDZjZTE4OGMyODhjIiwidHlwZSI6InM3IG91dCIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwiZW5kcG9pbnQiOiJhMWJlYzI1ODU4YzZmM2VmIiwidmFyaWFibGUiOiJSb2JvdF9SVFMiLCJuYW1lIjoiV3JpdGUgUm9ib3RfUlRTIiwieCI6NjEwLCJ5IjoyODAsIndpcmVzIjpbXX0seyJpZCI6ImYxNTcyNDYzYzUwYmI0Y2IiLCJ0eXBlIjoiczcgb3V0IiwieiI6ImFkN2IxNzQxMWM4ZTgzYWEiLCJlbmRwb2ludCI6ImExYmVjMjU4NThjNmYzZWYiLCJ2YXJpYWJsZSI6IlJvYm90X1Bvc2l0aW9uIiwibmFtZSI6IldyaXRlIFJvYm90X1Bvc2l0aW9uIiwieCI6NjIwLCJ5IjozNjAsIndpcmVzIjpbXX0seyJpZCI6ImZiZjFiM2UzODg5N2E5YzciLCJ0eXBlIjoiczcgb3V0IiwieiI6ImFkN2IxNzQxMWM4ZTgzYWEiLCJlbmRwb2ludCI6ImExYmVjMjU4NThjNmYzZWYiLCJ2YXJpYWJsZSI6IkNvbnZleW9yX1J1bm5pbmciLCJuYW1lIjoiV3JpdGUgQ29udmV5b3JfUnVubmluZyIsIngiOjYzMCwieSI6NDQwLCJ3aXJlcyI6W119LHsiaWQiOiJjZGVmZmQ5ZTUyY2M0Mzg0IiwidHlwZSI6InM3IG91dCIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwiZW5kcG9pbnQiOiJhMWJlYzI1ODU4YzZmM2VmIiwidmFyaWFibGUiOiJMaW5lNF9TdGF0ZSIsIm5hbWUiOiJXcml0ZSBMaW5lNF9TdGF0ZSIsIngiOjYxMCwieSI6NTIwLCJ3aXJlcyI6W119LHsiaWQiOiIwYzU5NWIwYWMyNTUwNTkzIiwidHlwZSI6InM3IG91dCIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwiZW5kcG9pbnQiOiJhMWJlYzI1ODU4YzZmM2VmIiwidmFyaWFibGUiOiJMaW5lNF9GYXVsdCIsIm5hbWUiOiJXcml0ZSBMaW5lNF9GYXVsdCIsIngiOjYxMCwieSI6NjAwLCJ3aXJlcyI6W119LHsiaWQiOiI4MzI4MDdiZmRjNGI3NmYwIiwidHlwZSI6InJiZSIsInoiOiJhZDdiMTc0MTFjOGU4M2FhIiwibmFtZSI6IiIsImZ1bmMiOiJkZWFkYmFuZEVxIiwiZ2FwIjoiMyUiLCJzdGFydCI6IiIsImlub3V0IjoiaW4iLCJzZXB0b3BpY3MiOnRydWUsInByb3BlcnR5IjoicGF5bG9hZCIsInRvcGkiOiJ0b3BpYyIsIngiOjQyMCwieSI6MzYwLCJ3aXJlcyI6W1siZjE1NzI0NjNjNTBiYjRjYiJdXX0seyJpZCI6IjRhYjI5MTBiNjZlMTYyMjAiLCJ0eXBlIjoiZXRoLWlwIGVuZHBvaW50IiwiYWRkcmVzcyI6IjE5Mi4xNjguMC41Iiwic2xvdCI6IjAiLCJjeWNsZXRpbWUiOiIxMDAwIiwibmFtZSI6IkxpbmU0IiwidmFydGFibGUiOnsiIjp7IkNvbnZleW9yX1JUUyI6eyJ0eXBlIjoiQk9PTCJ9LCJSb2JvdF9SVFMiOnsidHlwZSI6IkJPT0wifSwiUm9ib3RfUG9zaXRpb24iOnsidHlwZSI6IlJFQUwifSwiQ29udmV5b3JfUnVubmluZyI6eyJ0eXBlIjoiQk9PTCJ9LCJMaW5lNF9TdGF0ZSI6eyJ0eXBlIjoiRElOVCJ9LCJMaW5lNF9GYXVsdCI6eyJ0eXBlIjoiQk9PTCJ9fX19LHsiaWQiOiJhMWJlYzI1ODU4YzZmM2VmIiwidHlwZSI6InM3IGVuZHBvaW50IiwidHJhbnNwb3J0IjoiaXNvLW9uLXRjcCIsImFkZHJlc3MiOiIxOTIuMTY4LjAuMTAiLCJwb3J0IjoiMTAyIiwicmFjayI6IjAiLCJzbG90IjoiMSIsImxvY2FsdHNhcGhpIjoiMDEiLCJsb2NhbHRzYXBsbyI6IjAwIiwicmVtb3RldHNhcGhpIjoiMDEiLCJyZW1vdGV0c2FwbG8iOiIwMCIsImNvbm5tb2RlIjoicmFjay1zbG90IiwiYWRhcHRlciI6IiIsImJ1c2FkZHIiOiIyIiwiY3ljbGV0aW1lIjoiMTAwMCIsInRpbWVvdXQiOiIzMDAwIiwibmFtZSI6IlN0YWNrbGlnaHQgUExDIiwidmFydGFibGUiOlt7ImFkZHIiOiJEQjEsWDAuMCIsIm5hbWUiOiJDb252ZXlvcl9SVFMifSx7ImFkZHIiOiJEQjEsWDAuMSIsIm5hbWUiOiJSb2JvdF9SVFMifSx7ImFkZHIiOiJEQjEsUjIiLCJuYW1lIjoiUm9ib3RfUG9zaXRpb24ifSx7ImFkZHIiOiJEQjEsWDYuMCIsIm5hbWUiOiJDb252ZXlvcl9SdW5uaW5nIn0seyJhZGRyIjoiREIxLERJOCIsIm5hbWUiOiJMaW5lNF9TdGF0ZSJ9LHsiYWRkciI6IkRCMSxYMTIuMCIsIm5hbWUiOiJMaW5lNF9GYXVsdCJ9XX1d"
---
::



