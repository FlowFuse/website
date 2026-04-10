---
title: "RTSP Camera Feeds for Industrial Edge Vision in FlowFuse"
subtitle: "Connect IP cameras to Node-RED, extract frames in real time, and route visual data across your industrial flows"
description: "Learn how to connect RTSP camera streams in FlowFuse, extract frames at configurable intervals, and build real-time industrial vision pipelines — from conveyor inspection to thermal anomaly detection."
date: 2026-04-10
keywords: RTSP, Node-RED, FlowFuse, industrial edge vision, IP camera, FFmpeg, IIoT, edge computing
authors: ["sumit-shinde"]
image:
tags:
  - flowfuse
cta:
  type:
  title:
  description:
---

Most industrial facilities already have cameras. They were installed for safety, for compliance, or for someone's quarterly review. The footage exists. It gets reviewed after something goes wrong.

<!--more-->

That is not edge vision. That is a recording.

Edge vision is when the camera feed becomes live data, when a frame from a conveyor inspection camera triggers a rejection signal before the part reaches the end of the line, when a thermal camera detects an anomaly and writes a timestamped record to a historian, when what the camera sees becomes something a flow can act on in real time.

The protocol that makes this possible is RTSP. Real Time Streaming Protocol is how IP cameras, industrial, ONVIF-compliant, or otherwise, expose their video streams over a network. It is supported by virtually every IP camera manufactured in the last fifteen years. Getting that stream into FlowFuse and turning it into structured, actionable data is what this guide covers.

You will connect an RTSP stream in FlowFuse, extract frames at a configurable interval, and wire the output into a processing pipeline, whether that is an AI inference step, a dashboard, an MQTT topic, or a database write. By the end, the camera is not just recording. It is part of your flow.

## What Is RTSP and Why It Matters on the Edge

RTSP is not a streaming format. That distinction matters more than it sounds.

When a camera sends video over a network, the actual media, the compressed frames, travels over RTP (Real-time Transport Protocol). RTSP sits on top of that. It is the control protocol: the thing that tells the camera to start streaming, stop streaming, pause, or seek. Think of RTSP as the remote control and RTP as the actual broadcast. When engineers say "the camera has an RTSP feed," what they mean is the camera exposes an RTSP endpoint that a client can connect to, negotiate a session with, and then receive a continuous RTP stream from.

Port 554 is the default. The URL follows a predictable pattern: `rtsp://username:password@camera-ip:554/stream-path`. The stream path varies by vendor, which is where most of the friction is, but the protocol underneath is consistent.

Why does this matter on the industrial edge specifically? Because RTSP runs over standard TCP/IP on the same network infrastructure already in place on the floor. There is no proprietary gateway required, no vendor cloud in the middle, no subscription to activate streaming. If the camera is on the network and RTSP is enabled, any device on the same network segment can connect to it. A FlowFuse instance running on an edge device next to the line can pull that stream directly, process frames locally, and act on what it sees without the frame ever leaving the facility.

That local processing is what makes it edge vision rather than cloud vision. Latency drops from seconds to milliseconds. The pipeline keeps working when the WAN link goes down. Sensitive visual data, a production line, a worker's face, a quality defect, never leaves the plant network.

The camera has been there the whole time. RTSP is how you finally read it.

## Prerequisites

Before building the flow, make sure the following are in place.

- **A running FlowFuse instance.** If you do not have an account yet, [sign up]({% include "sign-up-url.njk" %}) and follow this [quick setup article](/blog/2025/09/installing-node-red/) to get Node-RED running on your edge device.
- **An IP camera with RTSP enabled.** Most industrial and ONVIF-compliant cameras support RTSP out of the box but it is sometimes disabled by default. Check your camera's web interface and confirm RTSP is active. If you do not have a physical camera, Step 1 covers how to generate a test stream locally.

## Finding Your Camera's RTSP URL

Before building the flow, you need a working RTSP URL. This is the address FlowFuse will connect to in order to pull the stream.

The format is always the same:

```
rtsp://username:password@camera-ip:554/stream-path
```

The part that varies by vendor is the stream path. Here are the most common ones you will encounter on the industrial floor:

| Vendor | RTSP URL |
|--------|----------|
| Hikvision | `rtsp://admin:password@192.168.1.64:554/Streaming/Channels/101` |
| Dahua | `rtsp://admin:password@192.168.1.64:554/cam/realmonitor?channel=1&subtype=0` |
| Axis | `rtsp://admin:password@192.168.1.64:554/axis-media/media.amp` |
| ONVIF generic | `rtsp://admin:password@192.168.1.64:554/stream1` |

If your camera is not listed here, check the vendor documentation or search for your camera model and "RTSP URL".

**Test the URL before wiring it into a flow.** Open VLC, go to Media, then Open Network Stream, paste the URL, and click Play. If the stream opens, the URL is correct and the camera is reachable. If it does not, confirm the IP address, credentials, and that RTSP is enabled on the camera before moving further.

## Building It

In this section, we will build the complete flow step by step. The architecture has five components:

1. A test RTSP stream (if you do not have a physical camera)
2. FFmpeg installed on the edge device
3. The `@kevingodell/node-red-ffmpeg` node
4. A function node to reassemble JPEG frames from the piped byte stream
5. A FlowFuse Dashboard to display the live feed

Every step below maps directly to one part of that architecture. Follow it in order.

### Step 1: Set Up a Test RTSP Stream (Optional)

If you have a physical camera with RTSP enabled, skip this step. If you do not, follow these steps to simulate a local RTSP stream using MediaMTX and FFmpeg.

MediaMTX is a zero-dependency RTSP server that runs as a single binary. It accepts incoming streams and serves them out to any client that connects.

Download and run it:

```bash
# Download
curl -L https://github.com/bluenviron/mediamtx/releases/download/v1.16.3/mediamtx_v1.16.3_darwin_arm64.tar.gz -o mediamtx.tar.gz

# Extract
tar -xzf mediamtx.tar.gz

# Run
./mediamtx
```

Once MediaMTX is running, open a second terminal and push a test stream to it using FFmpeg:

```bash
ffmpeg -re -f lavfi -i testsrc=size=1280x720:rate=25 \
  -c:v libx264 -preset ultrafast -tune zerolatency \
  -f rtsp rtsp://localhost:8554/test
```

Your test stream is now available at `rtsp://localhost:8554/test`. Use this URL as your camera URL throughout the rest of this guide.

### Step 2: Install FFmpeg

FFmpeg is what connects to the RTSP stream and extracts frames. Install it on the same machine running your Node-RED instance.

```bash
sudo apt update && sudo apt install ffmpeg   # Ubuntu/Debian
sudo dnf install ffmpeg                      # RHEL/Rocky
ffmpeg -version                              # verify
```

### Step 3: Install the Node

Install `@kevingodell/node-red-ffmpeg` in your FlowFuse instance. This node wraps FFmpeg as a persistent spawned process, keeps the RTSP connection alive, handles reconnects, and streams JPEG frames as buffers directly into your flow. That is what makes it suitable for 24/7 industrial operation.

1. Open your Node-RED instance in FlowFuse.
2. Click the main menu in the top right corner.
3. Select **Manage Palette**.
4. Go to the **Install** tab.
5. Search for `@kevingodell/node-red-ffmpeg`.
6. Click **Install**.

Alternatively, install it via the terminal on your edge device:

```bash
cd ~/.node-red && npm install @kevingodell/node-red-ffmpeg
```

Restart your Node-RED instance after installing. Once restarted, you will find the **ffmpeg** node available in the node palette on the left side of the editor.

### Step 4: Add Start and Stop Controls

Drag two **inject** nodes onto the canvas.

For the first inject node:

1. Set **Name** to `Start`.
2. Add a property, set it to `msg.action` with JSON value `{"command":"start"}`.
3. Enable **Inject once after 0.1 seconds** so the stream starts automatically on deploy.

For the second inject node:

1. Set **Name** to `Stop`.
2. Add a property, set it to `msg.action` with JSON value `{"command":"stop"}`.

### Step 5: Configure the FFmpeg Node

Drag a **ffmpeg** node onto the canvas and double-click to configure it.

- **Name:** `RTSP Camera`
- **cmdPath:** path to your FFmpeg binary. Run `which ffmpeg` in your terminal to find it.
- **cmdArgs:**

```json
["-loglevel","error","-i","rtsp://localhost:8554/test","-f","image2pipe","-vcodec","mjpeg","-vf","fps=1","-"]
```

- **outputs:** `2`
- **cmdOutputs:** `1`

Replace `rtsp://localhost:8554/test` with your camera's RTSP URL. Wire both inject nodes to the ffmpeg node input.

### Step 6: Reassemble JPEG Frames

FFmpeg pipes frames as a continuous byte stream. Each frame arrives in multiple chunks split at the OS pipe buffer limit of 8192 bytes. This function node waits for a complete JPEG by detecting the start marker `0xFF 0xD8` and end marker `0xFF 0xD9`, then outputs one complete frame per message.

1. Drag a **function** node onto the canvas.
2. Double-click it to open its settings.
3. In the **Name** field, enter `Assemble JPEG Frames`.
4. In the **Function** tab, paste the following:

```javascript
const SOI = Buffer.from([0xFF, 0xD8]);
const EOI = Buffer.from([0xFF, 0xD9]);

let buffer = context.get('buffer') || Buffer.alloc(0);
buffer = Buffer.concat([buffer, msg.payload]);

const msgs = [];
let start = 0;

while (true) {
    const soi = buffer.indexOf(SOI, start);
    if (soi === -1) break;
    const eoi = buffer.indexOf(EOI, soi + 2);
    if (eoi === -1) break;
    msgs.push({ payload: buffer.slice(soi, eoi + 2) });
    start = eoi + 2;
}

buffer = buffer.slice(start);
context.set('buffer', buffer);

return msgs.length > 0 ? msgs : null;
```

5. Click **Done**.
6. Wire the **first output** of the ffmpeg node to this function node.

### Step 7: Convert to Base64

The FlowFuse Dashboard cannot render a raw buffer directly as an image. This function node converts the JPEG buffer to a base64 data URL that the dashboard can display.

1. Drag a **function** node onto the canvas.
2. Double-click it to open its settings.
3. In the **Name** field, enter `To Base64`.
4. In the **Function** tab, paste:

```javascript
msg.payload = 'data:image/jpeg;base64,' + msg.payload.toString('base64');
return msg;
```

5. Click **Done**.
6. Wire the **Assemble JPEG Frames** output to this node.

### Step 8: Display on Dashboard

1. Drag a **ui-template** node onto the canvas.
2. Double-click it to open its settings.
3. Assign it to a group and page in your FlowFuse Dashboard.
4. In the template field, paste the following:

```html
<template>
  <img :src="msg.payload" style="width:100%;height:auto;" />
</template>
```

5. Click **Done**.
6. Wire the **To Base64** output to the ui-template node.

### Step 9: Deploy and Verify

Click **Deploy**. The stream starts automatically. Open your FlowFuse Dashboard and you will see live frames from your RTSP camera updating every second.

To change the frame rate, update the `fps=1` value in `cmdArgs`. Setting it to `fps=5` gives you five frames per second. Keep in mind that higher frame rates consume more CPU on the edge device.

Here is the complete importable flow:

{% renderFlow 300 %}
[{"id":"inject1","type":"inject","z":"c885ae9b2f264b31","name":"Start","props":[{"p":"action","v":"{\"command\":\"start\"}","vt":"json"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"x":1090,"y":540,"wires":[["ffmpeg1"]]},{"id":"inject2","type":"inject","z":"c885ae9b2f264b31","name":"Stop","props":[{"p":"action","v":"{\"command\":\"stop\"}","vt":"json"}],"repeat":"","crontab":"","once":false,"x":1090,"y":600,"wires":[["ffmpeg1"]]},{"id":"ffmpeg1","type":"ffmpeg","z":"c885ae9b2f264b31","name":"RTSP Camera","outputs":2,"cmdPath":"/opt/homebrew/bin/ffmpeg","cmdArgs":"[\"-loglevel\",\"error\",\"-i\",\"rtsp://localhost:8554/test\",\"-f\",\"image2pipe\",\"-vcodec\",\"mjpeg\",\"-vf\",\"fps=1\",\"-\"]","cmdOutputs":1,"killSignal":"SIGTERM","x":1290,"y":540,"wires":[[],["2a60c97492701f20"]]},{"id":"2a60c97492701f20","type":"function","z":"c885ae9b2f264b31","name":"function 1","func":"const SOI = Buffer.from([0xFF, 0xD8]);\nconst EOI = Buffer.from([0xFF, 0xD9]);\n\nlet buffer = context.get('buffer') || Buffer.alloc(0);\nbuffer = Buffer.concat([buffer, msg.payload]);\n\nconst msgs = [];\nlet start = 0;\n\nwhile (true) {\n    const soi = buffer.indexOf(SOI, start);\n    if (soi === -1) break;\n    const eoi = buffer.indexOf(EOI, soi + 2);\n    if (eoi === -1) break;\n    msgs.push({ payload: buffer.slice(soi, eoi + 2) });\n    start = eoi + 2;\n}\n\nbuffer = buffer.slice(start);\ncontext.set('buffer', buffer);\n\nreturn msgs.length > 0 ? msgs : null;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":1490,"y":540,"wires":[["to_base64"]]},{"id":"ui_template1","type":"ui-template","z":"c885ae9b2f264b31","group":"8ff65abef5f9c829","page":"","ui":"","name":"Camera Feed","order":1,"width":0,"height":0,"head":"","format":"<template>\n  <img :src=\"msg.payload\" style=\"width:100%;height:auto;\" />\n</template>","storeOutMessages":false,"passthru":false,"resendOnRefresh":true,"templateScope":"local","className":"","x":1890,"y":540,"wires":[[]]},{"id":"to_base64","type":"function","z":"c885ae9b2f264b31","name":"To Base64","func":"msg.payload = 'data:image/jpeg;base64,' + msg.payload.toString('base64');\nreturn msg;","outputs":1,"x":1680,"y":540,"wires":[["ui_template1"]]},{"id":"8ff65abef5f9c829","type":"ui-group","name":"Group 1","page":"8de6be5847cdf45d","width":6,"height":1,"order":1,"showTitle":true,"className":"","visible":true,"disabled":false,"groupType":"default"},{"id":"8de6be5847cdf45d","type":"ui-page","name":"Page 1","ui":"0a3541d66d5094a8","path":"/page1","icon":"home","layout":"grid","theme":"6d8b3208020c71e2","breakpoints":[{"name":"Default","px":0,"cols":3},{"name":"Tablet","px":576,"cols":6},{"name":"Small Desktop","px":768,"cols":9},{"name":"Desktop","px":1024,"cols":12}],"order":1,"className":"","visible":"true","disabled":"false"},{"id":"0a3541d66d5094a8","type":"ui-base","name":"My Dashboard","path":"/dashboard","appIcon":"","includeClientData":true,"acceptsClientConfig":["ui-notification","ui-control"],"showPathInSidebar":false,"headerContent":"page","navigationStyle":"default","titleBarStyle":"default","showReconnectNotification":true,"notificationDisplayTime":1,"showDisconnectNotification":true,"allowInstall":false},{"id":"6d8b3208020c71e2","type":"ui-theme","name":"Default Theme","colors":{"surface":"#ffffff","primary":"#0094CE","bgPage":"#eeeeee","groupBg":"#ffffff","groupOutline":"#cccccc"},"sizes":{"density":"default","pagePadding":"12px","groupGap":"12px","groupBorderRadius":"4px","widgetGap":"12px"}},{"id":"4e2df064375c571d","type":"global-config","env":[],"modules":{"@kevingodell/node-red-ffmpeg":"0.1.1-beta.3","@flowfuse/node-red-dashboard":"1.30.2"}}]
{% endrenderFlow %}

## Closing Thoughts

The camera has been on your floor for years. What changed today is that it is now part of your flow. Every frame is a message. Every message can trigger a decision, write a record, or feed an inference model, without leaving the plant network and without waiting for a cloud round trip.

The pattern you built here is the foundation. From here, wire the frame output to an AI inference endpoint and route the result to an MQTT topic. Add a change node to attach metadata like camera ID, timestamp, and line number before the frame goes downstream. Connect multiple cameras by duplicating the flow and changing the RTSP URL. The architecture stays the same. The flow grows with what the operation needs.

FlowFuse runs this at the edge, where the camera is, close to the process, with the visibility and control your team needs to keep it running.