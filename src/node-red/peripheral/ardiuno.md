---
eleventyNavigation:
  key: "Arduino"
  parent: "Peripheral Devices"
meta:
   title: Connecting Arduino to Node-RED
   description: Learn how to control and monitor Arduino hardware using Node-RED
   keywords: node-red, flowfuse, ardiuno
image: /node-red/peripheral/images/barcode-scanner.png
---

# {{meta.title}}

This documentation explains how to use Node-RED to interact with an Arduino board via serial communication using the Firmata protocol. It covers how to write to and read from digital and analog pins using the `node-red-node-arduino` package.

## Requirements

- An Arduino board connected via USB to the device running Node-RED.
- The [StandardFirmata](https://github.com/firmata/protocol) sketch uploaded to the Arduino board.
- Node-RED installed and running on the connected device. The quickest way to set up and run Node-RED is [FlowFuse](/).
- The Node-RED package [`node-red-node-arduino`](https://flows.nodered.org/node/node-red-node-arduino) installed.

## Step 1: Install Arduino Nodes

1. Open the Node-RED editor.
2. Open the main menu and select **Manage Palette**.
3. Switch to the **Install** tab.
4. Search for `node-red-node-arduino` and install it.

This will add `arduino in` and `arduino out` nodes to the palette.

## Step 2: Configure Arduino Connection

1. Drag either an `arduino in` or `arduino out` node onto the canvas.
2. Double-click the node to open the configuration window.
3. Click the pencil icon next to the **Arduino board** field.
4. Enter the correct serial port:
   - Windows: `COMx` (e.g., `COM5`)
   - Linux/macOS: `/dev/ttyUSB0`, `/dev/ttyACM0`, etc.
5. Click **Add** and then **Done**.
6. Click **Deploy**. A green status indicator confirms successful connection.

## Step 3: Write to Arduino Pins

### 3.1 Write Digital Output

To write a digital value (`0` or `1`) to a pin:

1. Drag an `arduino out` node to the canvas.
2. Double-click and set:
   - **Pin**: e.g., `13`
   - **Type**: `Digital`
3. Use `inject` nodes to send `true` (HIGH) and `false` (LOW) payloads.
4. Connect the inject nodes to the `arduino out` node.
5. Deploy and test.

### 3.2 Write Analog Output (PWM)

To write a PWM signal (`0–255`) to a supported pin:

1. Use an `arduino out` node.
2. Set:
   - **Pin**: e.g., `5` (PWM-capable)
   - **Type**: `Analog`
3. Use an `inject` node to send a numeric payload (e.g., `128`).
4. Connect and deploy.

### 3.3 Write Servo Angle

To control a servo:

1. Use an `arduino out` node.
2. Set:
   - **Pin**: e.g., `9`
   - **Type**: `Servo`
3. Use `inject` nodes to send values between `0–180`.
4. Connect and deploy.

## Step 4: Read from Arduino Pins

### 4.1 Read Digital Input

To read a digital value from a pin:

1. Drag an `arduino in` node.
2. Set:
   - **Pin**: e.g., `9`
   - **Type**: `Digital`
3. Connect the output to a `debug` node.
4. Deploy to see input values in real-time.

### 4.2 Read Analog Input

To read from an analog input pin:

1. Use an `arduino in` node.
2. Set:
   - **Pin**: e.g., `A0`
   - **Type**: `Analog`
3. Connect to a `debug` node.
4. Deploy and monitor readings in the debug sidebar.


🔗 If you are looking for a more practical, step-by-step article with examples and a video demo, refer to this guide:  
[Interacting with Arduino using Node-RED](/blog/2025/02/interacting-with-arduino-using-node-red/)
