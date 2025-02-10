--- 
title: "Interacting with Arduino using Node-RED" 
subtitle: "Control and Automate Arduino with Node-RED"
description: "Learn how to set up and control your Arduino remotely using Node-RED and FlowFuse. Explore the simplicity of automation flows"
date: 2025-02-11
authors: ["sumit-shinde"]
image: 
keywords: Arduino, Node-RED, Firmata, Node-RED IoT, automation, FlowFuse, LED control with Node-RED, IR sensor, input-output, serial communication, microcontroller, Arduino Uno, remote control, object detection, dashboard.
tags: 
 - node-red
---

Arduino is an open-source hardware board that enables users to create interactive projects and control physical devices. Various affordable boards and sensors offer endless possibilities for both simple and advanced systems.

Although Arduino can be programmed using the Arduino platform, it lacks one feature compared to devices like the Raspberry Pi or ESP32: internet connectivity. This limitation makes it difficult for some users to send commands remotely. Typically, you need to write a program that runs continuously. Additionally, you'll need programming knowledge to program the board, which can be a barrier for some.

In this post, I will show you how to interact with and control an Arduino remotely using FlowFuse (Node-RED). You'll be able to send commands and receive input data without programming knowledge. We will achieve this using the Firmata protocol, enabling seamless communication between your Arduino and Node-RED.

## Prerequisites

To follow this tutorial, you'll need the following:

- Arduino Board: The hardware you'll be using for this project.
- USB cable: To connect the Arduino to your computer.
- Arduino IDE: Installed and set up to program your Arduino. Download the Arduino IDE if you haven't already done so. we will be using this for initial firmata implementation, not for programming
- FlowFuse Account: You will need a FlowFuse instance running on the device connected to the Arduino. FlowFuse allows you to access that remote instance, build flows, create remotely available dashboards, collaborate with your team on the instance, provide robust security, and much more.

If you haven't created an account yet, you can create one and take advantage of our free tier, which allows you to create and manage up to two edge devices. [Sign up now](https://app.flowfuse.com/account/create).

## Getting Started with Arduino and Node-RED

In this section, we’ll set up Node-RED on FlowFuse and download the Firmata protocol setup on the Arduino using Arduino IDE. We will also create a flow that will control an LED on the Arduino and read input data. We will later control the LED based on object detection using an object sensor to make it more interesting. If you don’t have the sensor, don't worry— you can still follow the article. The goal of this example is to demonstrate both reading and writing operations, as well as build an automation flow that reacts to input.

## Step 1: Creating Node-RED instance on FlowFuse Cloud

Log into your [FlowFuse](/) account and create a new Node-RED instance. For more information on creating a Node-RED instance, refer to the [FlowFuse documentation](/docs/user/introduction/#creating-a-node-red-instance).

Once the instance is created, open the Node-RED editor.

## Step 2: Downloading Firmata protocol setup to Arduino.

[Firmata](https://github.com/firmata/protocol) is a protocol for communicating between an Arduino (and other microcontrollers) and the host computer, providing direct access to the IO pins.

Now, let's download the setup to Arduino. Before proceeding, ensure your Arduino is connected to your laptop or computer via the correct USB cable. The USB connection is essential for uploading the code (sketch) to the Arduino.

**Setting up Arduino IDE and Download the setup from examples:**

1. Open the Arduino IDE on your computer.
2. Ensure you have selected the correct board and port in the Tools menu. I have selected an Arduino Uno since I have used one.
3. Go to File → Examples → Firmata, and then click on StandardFirmata. This will open the Firmata setup code.
4. Click the Upload button in the Arduino IDE to upload the setup to your Arduino board.

![Importing Standard Firmata setup sketch from examples in Arduino IDE](./images/firmata-import.png){data-zoomable}
_Importing Standard Firmata setup sketch from examples in Arduino IDE_

Once the upload is complete, the Arduino can communicate via the Firmata protocol.

## Step 3: Connecting Node-RED to Arduino via Serial Communication

Firmata typically works over a serial connection (like USB), enabling communication between the Arduino board and your Node-RED instance. The serial communication allows Node-RED to send commands to and receive data from the Arduino.

First of all, we will need to install a node that will allow us to communicate with node-red via firmata, 

**Installing Arduino Node**

1. Open the main menu by clicking the three horizontal lines in the top-right corner.
2. Click "Manage Palette" from the menu.
3. Switch to the "Install" tab and type "node-red-node-arduino" in the search field.
4. Click "Install" next to the node name.

After installing the required node for Arduino, we will set up the flow in Node-RED to establish communication with the Arduino. This flow will allow us to control the connected Arduino board via Node-RED.

**Establishing Connection with Arduino**

1. Drag any Arduino node onto the canvas
2. Double-click the node to open its configuration window.
3. In the new window that opens, enter the port name for your Arduino (for example, COM5 on Windows or /dev/ttyUSB0 on Linux/macOS). You can find the correct port in the Arduino IDE or your system’s device manager.

![Adding the port to the Arduino node](./images/serial-port-config.png){data-zoomable}
_Adding the port to the Arduino node_

4. Click and deploy by clicking the top-right deploy button

Once deployed, after a few seconds, the node will establish a connection with the Arduino board. You should see a green square below the node, indicating that the connection is successful and the status is "Connected."

## Step 4: Sending Commands to Arduino

In this section, I'll show you how to send commands to your Arduino. For this practical demonstration, we will control the default Arduino LED, which is typically connected to pin 13.

1. Drag the Arduino-out node onto the canvas
2. Double-click the node to open its configuration window.
3. Select the correct configuration (serial port) you added in Step 3.
4. Next, choose the type of pin you want to interact with (e.g., digital, analog, servo, etc.); since in my example, I am interacting with an LED, which only requires on or off commands, I have selected Digital(0/1).

Based on the type of data you want to send, select the appropriate pin type:

- Digital(0/1) - accepts 0, 1, true, false, on, off
- Analogue(0-255) (PWM) - accepts Integer 0 to 255
- Servo(0-180) - accepts Integer 0 - 180
- String - to send a String to the Arduino

5. Once you've configured the pin type.
6. Once you've configured the pin type, enter the pin number (e.g., 13 for the built-in LED).
7. Click done.

![Configuring Arduino-out node](./images/control-led.png){data-zoomable}
_Configuring Arduino-out node_

1. Drag two Inject nodes onto the canvas. For one Inject node, set the Payload to true (to turn the LED on), and for the other, set the Payload to false (to turn the LED off).
2. Connect the Inject node output to the input of both Change nodes, and connect the outputs of the Change nodes to the input of the Arduino-out node.
3. Deploy the flow.

{% renderFlow %}
[{"id":"fbe0eb6547cbfed7","type":"arduino out","z":"FFF0000000000001","name":"","pin":"13","state":"OUTPUT","arduino":"d7663aaf.47194","x":739.8345947265625,"y":645.8272094726562,"wires":[]},{"id":"e222d2df8c62483d","type":"inject","z":"FFF0000000000001","name":"Turn LED on","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"true","payloadType":"bool","x":530,"y":580,"wires":[["fbe0eb6547cbfed7"]]},{"id":"c82bd0280ee45b3b","type":"inject","z":"FFF0000000000001","name":"Turn LED off","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"false","payloadType":"bool","x":530,"y":680,"wires":[["fbe0eb6547cbfed7"]]},{"id":"d7663aaf.47194","type":"arduino-board","device":"COM5"}]
{% endrenderFlow %}

Now, you can turn the LED on and off by clicking the inject buttons. Instead of using the inject node, you can also use the FlowFuse dashboard to build an interactive dashboard. The dashboard will allow you to control the LED directly from a web interface.

If you're interested in learning how to create a dashboard, you can refer to the [Getting Started Guide](/blog/2024/03/dashboard-getting-started/). It will help clarify basic dashboard concepts and guide you through building a simple dashboard interface.

## Step 5: Receiving Inputs from the Arduino

In this step, we’ll focus on receiving inputs from the Arduino to Node-RED. For this practical demonstration, we will use the input from the IR object detection sensor connected to my Arduino.

1. Drag the Arduino-in node onto the canvas.
2. Double-click the node to open its configuration window.
3. Select the serial port that you connected the Arduino to.
4. Based on the input type, choose the correct pin type (e.g., digital, analog). Since we are using the IR sensor, which usually provides a digital output, select the "Digital pin" type.
5. Enter the pin number (pin 9 if your sensor is connected to pin 9 on the Arduino).

![Configuring Arduino-in node](./images/read-sensor-data.png){data-zoomable}
_Configuring Arduino-in node_

*Note: You cannot use the same pin for output and input on the Arduino simultaneously. Ensure the pin you use for input (like the IR sensor) is separate from the pin you're using for output (like the LED).*

1. Click Done.
2. Drag the Debug node onto the canvas and connect its input to the output of the Arduino-in node.
3. Deploy the flow.

{% renderFlow %}
[{"id":"2b871fb5d0923355","type":"arduino in","z":"FFF0000000000001","name":"Read Sensor Data","pin":"9","state":"INPUT","arduino":"d7663aaf.47194","x":170,"y":360,"wires":[["e3e52e51a2e4e058"]]},{"id":"e3e52e51a2e4e058","type":"debug","z":"FFF0000000000001","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":360,"y":360,"wires":[]},{"id":"d7663aaf.47194","type":"arduino-board","device":"COM5"}]
{% endrenderFlow %}

Now, the Arduino will send the sensor input data to Node-RED. If a change is detected in the input, the Arduino will output that input, and you will see it in the debug panel.

## Step 6: Creating an Automation Flow

Now that you've learned how to send commands and read inputs from the Arduino, let’s move on to creating an automation flow. This section aims to show you how to program the Arduino without writing a single line of code—using only Node-RED.

The idea is to trigger an action, such as turning on an LED, when the sensor detects an object.

1. Drag a Switch node onto the canvas.
2. Double-click on the Switch node to open its configuration window and add the following conditions:
- msg.payload == 1
- msg.payload == 0
3. Click Done to save the configuration.

![Adding conditions in the Switch node to check if the object is detected or not.](./images/switch.png){data-zoomable}
_Adding conditions in the Switch node to check if the object is detected or not._

4. Connect the Switch node's input to the Arduino-in node's output.
5. Next, drag two Change nodes onto the canvas. Set the payload to false for the first Change node and true for the second Change node.
6. Connect the first output of the Switch node to the input of the first Change node, and the second output of the Switch node to the input of the second Change node.

{% renderFlow %}
[{"id":"2b871fb5d0923355","type":"arduino in","z":"FFF0000000000001","name":"Read Sensor Data","pin":"9","state":"INPUT","arduino":"d7663aaf.47194","x":130,"y":460,"wires":[["8ad3d1504ba05942"]]},{"id":"49b04d8b6f015846","type":"change","z":"FFF0000000000001","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":530,"y":480,"wires":[["d6e251e983f908ac"]]},{"id":"8f56a3d6ac64e87c","type":"change","z":"FFF0000000000001","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"false","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":530,"y":440,"wires":[["d6e251e983f908ac"]]},{"id":"8ad3d1504ba05942","type":"switch","z":"FFF0000000000001","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"1","vt":"num"},{"t":"else"}],"checkall":"true","repair":false,"outputs":2,"x":330,"y":460,"wires":[["8f56a3d6ac64e87c"],["49b04d8b6f015846"]]},{"id":"d6e251e983f908ac","type":"arduino out","z":"FFF0000000000001","name":"Control LED","pin":"13","state":"OUTPUT","arduino":"d7663aaf.47194","x":770,"y":460,"wires":[]},{"id":"d7663aaf.47194","type":"arduino-board","device":"COM5"}]
{% endrenderFlow %}

Since IR object detection sensors output a LOW (0) signal when an object is detected and a HIGH (1) signal when no object is detected, this flow will turn the LED on when an object is detected (when msg.payload is equal to 0) and turn the LED off  object is not detected (when msg.payload is equal to 1).

## Conclusion

In this tutorial, you’ve learned how to connect your Arduino to Node-RED and control it using the Firmata protocol. We started by turning an LED on and off, reading sensor data, and building a flow to automate actions based on input from an IR sensor.

This approach is so powerful that you don’t need to write any code; FlowFuse lets you create automation flows with just a few clicks. You can quickly expand this setup to include more sensors, devices, and dashboards to build your IoT projects.

It’s a simple yet powerful way to interact with your Arduino, with endless possibilities. Enjoy exploring and building!