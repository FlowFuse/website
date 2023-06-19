---
title: "Flowforge as a No-Code Ethernet/IP to Profinet Protocol Converter"
subtitle: Beginner tutorial for using Node-RED as free industrial protocol converter
description: step-by-step guide for using flowforge as an industrial protocol converter
date: 2023-06-19
authors: ["richard-meyer"]
image:
tags:
  - posts
  - how-to
---


Frequently in industrial automation, there's a need for two devices that use different protocols to communicate with each other, requiring protocol conversion.  
In this article, we present a mock scenario where flowforge is used to enable an Allen Bradley PLC, which uses ethernet/IP, to communicate with a Siemens PLC, which uses Profinet, using a no-code solution. This example is geared toward beginners and assumes that the end-user knows how to use PLCs, but may be using flowforge/node-red for the first time.

<!--more-->

# Premise

![1](./images/ethip-to-profinet/e-to-p-1.png)

Figure 1 above shows the layout of a mock production facility. Inside our facility, operations suggested adding stacklights as an extra visual aid for operators to get a quick status of its 4 conveyor lines, avoiding the need to constantly monitor the HMI/SCADA displays.  
Engineering has suggested adding a siemens S7 1200 PLC with an IO link connection to 4 stacklights, with each line PLC sending basic status information to the stacklight PLC to control the stacklight outputs.  
Line 1-3 PLCs are Siemens-based, and can communicate with the stacklight PLC natively over Profinet. But line 4 is an Allen Bradley PLC that uses ethernet/IP, and can't communicate with the stacklight PLC without some form of protocol conversion.  
Traditionally, we'd use protocol gateway hardware, like anybus or red lion, to convert ethernet/IP to profinet.  
But for this application, we will instead use flowforge, a pure software-based approach, to convert ethernet/IP to Profinet. Let's walk through the process.

# Pre-Requisites and Set Up

## Flowforge

In addition to our two PLCs, we’ll need access to flowforge software. You can either self-host, or have flowforge manage your flowforge instance.

In this example, we will be using a self-hosted flowforge instance running in a docker container.

[https://github.com/flowforge/flowforge](https://github.com/flowforge/flowforge)

## Data Treatment on Ethenet/IP PLC

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

![2](./images/ethip-to-profinet/e-to-p-2.png)

Each tag must also have external read/write access enabled.

![3](./images/ethip-to-profinet/e-to-p-3.png)

## Data Treatment on Profinet PLC

In the Siemens PLC, we have a DB for the data from the Line 4 PLC to be written to.

*   In the DBs attributes, “optimized block access” must be disabled.
    
*   The tags must be writeable and accessible
    
*   ![4](./images/ethip-to-profinet/e-to-p-4.png)
    
    “No protection” must be set in the CPU properties
    
*   ![5](./images/ethip-to-profinet/e-to-p-5.png)

# Create The Flow

With both PLCs up and running and properly set up to send/receive remote data, we can now create a flow to act as our protocol converter.

## Install Custom Nodes

First, we need to add two custom nodes that will give node-red the ability to read/write ethernet/IP and profinet data.

Click the hamburger icon → manage pallette

![6](./images/ethip-to-profinet/e-to-p-6.png)

On the `install` tab, search for `s7` and install the `node-red-contrib-s7` node.

![7](./images/ethip-to-profinet/e-to-p-7.png)

Next, search for `ethernet` and install the `node-red-contrib-cip-ethernet-ip` node.

![8](./images/ethip-to-profinet/e-to-p-8.png)
Go to the `nodes` tab and confirm both custom nodes have been properly installed.

![9](./images/ethip-to-profinet/e-to-p-9.png)

## Set Up Ethernet/IP Data

Let’s start by dragging a `eth-ip in` node onto the pallette. Then add a new endpoint, which will point to our Line4 PLC.

![10](./images/ethip-to-profinet/e-to-p-10.png)

In the endpoint `connection` properties, the connection information must match the PLC, so set the IP address and CPU slot number appropriately. Also, the default cycle time is 500ms. Depending on your application, polling the CPU at 500ms may be appropriate. But being that this is a simple stacklight, 500ms is unnecessarily fast. So we will change it to 1000ms, which is a more appropriate polling rate for this type of application.

![11](./images/ethip-to-profinet/e-to-p-11.png)

On the `Tags` tab, populate the tag information to match our Allen Bradley PLC. Then select `Update` to complete configuration of the `eth-ip endpoint`.

![12](./images/ethip-to-profinet/e-to-p-12.png)

Now that we have our endpoint, let’s finish configuring the `eth-ip in` node.

1.  select the endpoint we just created
    
2.  select the first tag in the drop-down
    
3.  give the node a descriptive name
    

![13](./images/ethip-to-profinet/e-to-p-13.png)

Now let’s set up a quick test to confirm our PLC connection is valid by adding a `debug` node to the `eth-ip in` node. Then hit `deploy`.

*   note - you can see we also have a `comment` above the nodes that describes what is happening. This is optional but good practice to help organize and understand your flow.
    

The output of the debug console did not report any errors so communication appears to be okay.

![14](./images/ethip-to-profinet/e-to-p-14.png)

But just to confirm, let’s toggle the value and see if comes through.

![15](./images/ethip-to-profinet/e-to-p-15.png)

So by toggling the value and see the result, here we confirmed 2 things:

*   We can detect changes in value
    
*   the `eth-ip in` node only sends a message when the value changes, also known as Report by Exception.
    

Because the `eth-ip in` node implicitly uses report by exception, and the protocol doesn't rely on contiguous data consistency (unlike modbus, for instance), we can receive our data one tag at a time to keep our flow simple.

Now we can remove the debug node and add the additional `eth-ip in` nodes to receive the remaining tags from our Line 4 PLC.

Here’s how the the flow should look at this point.

![16](./images/ethip-to-profinet/e-to-p-16.png)

## Set Up Profinet Data

Now we’ll set up the S7 profinet endpoint, using an `s7 out` node.

![17](./images/ethip-to-profinet/e-to-p-17.png)

Populate the connection properties to match your hardware. The cycle time is updated to 1000ms to match the cycle time of our `eth-ip in` nodes. You can adjust this value to match your intended application.

![18](./images/ethip-to-profinet/e-to-p-18.png)

On the `Variables` tab, some special formatting is required to point to the absolute reference of the tag DB location in the S7 PLC.

For information on how to format S7 absolute tag references in a way the `s7 endpoint` node is expecting, refer to the node documentation for further information.

[https://flows.nodered.org/node/node-red-contrib-s7](https://flows.nodered.org/node/node-red-contrib-s7)

For reference, here is an example of how we set the tags in our stacklight PLC example and how it looks in our `s7 endpoint`.

![19](./images/ethip-to-profinet/e-to-p-19.png)

Once the tags are populated we can select our configured endpoint from the dropdown list, point to our first variable, `Conveyor_RTS`, and give the node a name.

![20](./images/ethip-to-profinet/e-to-p-20.png)

Repeat this process for the remaining tags.

![21](./images/ethip-to-profinet/e-to-p-21.png)

# Test the Conversion

The only thing remaining is to simply wire the nodes together, and confirm the values pass through.

![22](./images/ethip-to-profinet/e-to-p-22.png)

Manipulate the incoming values and confirm the data passes through as expected. Because of the report by exception nature of the `eth-ip in` node, tag changes should be near instantaneous on the receiving PLC.

We can stop here, but we can improve this flow by adding a `filter` node on our REAL data-type, `Robot_Position`.

## Add Filter to REAL data

Depending on how noisy the REAL data is (common with unfiltered 4-20mA field transmitters), and how much granularity you need to capture, it is good practice to add a filter on REAL data to reduce fieldbus traffic coming out of our soft protocol converter.

![23](./images/ethip-to-profinet/e-to-p-23.png)

In the example above, we arbitrarily applied a 3% deadband to the `Robot_Position` value, which means that the value must change by greater than or equal to 3% compared to the last input value, or else the data will be discarded before being sent to the stacklight PLC.

You can adjust the deadband to find the right balance for your particular application.

We can see the effect the deadband filter had by adding debug nodes before and after the filter.

![24](./images/ethip-to-profinet/e-to-p-24.png)

As shown above, when `Robot_Position` changed from 15.6 to 15.6999..., the value was captured on the input of the filter, but was discarded on the output.

When the `Robot_Position` went from 15.6999 to 18, the filter allowed it to pass as it exceeded the deadband limit we had set.

Use filters to optimize your fieldbus converter network performance, especially if dealing with noisy signals or large quantities of REAL datatypes.