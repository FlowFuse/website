---
title: "RTSP Camera Feeds for Industrial Edge Vision in FlowFuse"
subtitle: "Connect IP cameras to Node-RED, extract frames in real time, and route visual data across your industrial flows"
description: "Learn how to connect RTSP camera streams in FlowFuse, extract frames at configurable intervals, and build real-time industrial vision pipelines, from conveyor inspection to thermal anomaly detection."
date: 2026-04-14
keywords: RTSP, Node-RED, FlowFuse, industrial edge vision, IP camera, FFmpeg, IIoT, edge computing
authors: ["sumit-shinde"]
image:
tags:
  - flowfuse
cta:
  type: signup
  title: "Start Building Edge Vision Pipelines"
  description: "Connect your IP cameras to FlowFuse and turn live footage into actionable flow data, no cloud required."
---

Most industrial facilities already have cameras. They were installed for safety, for compliance, or for someone's quarterly review. The footage exists. It gets reviewed after something goes wrong.

<!--more-->

That is not edge vision. That is a recording.

Edge vision is when the camera feed becomes live data, when a frame from a conveyor inspection camera triggers a rejection signal before the part reaches the end of the line, when a thermal camera detects an anomaly and writes a timestamped record to a historian, when what the camera sees becomes something a flow can act on in real time.

The protocol that makes this possible is RTSP. Real Time Streaming Protocol is how IP cameras (industrial, ONVIF-compliant, or otherwise) expose their video streams over a network. It is supported by virtually every IP camera manufactured in the last fifteen years. Getting that stream into FlowFuse and turning it into structured, actionable data is what this guide covers.

You will connect an RTSP stream in FlowFuse, extract frames at a configurable interval, and wire the output into a processing pipeline: whether that is an AI inference step, a dashboard, an MQTT topic, or a database write. By the end, the camera is not just recording. It is part of your flow.

## What Is RTSP and Why It Matters on the Edge

RTSP is not a streaming format. That distinction matters more than it sounds.

When a camera sends video over a network, the actual media (the compressed frames) travels over RTP (Real-time Transport Protocol), with session quality feedback handled by RTCP (Real-time Transport Control Protocol). RTSP and RTP are independent protocols that operate at the application layer, each serving a distinct role. RTSP handles session control (typically over TCP, though UDP is also valid per RFC 2326), while RTP carries the media stream independently, typically over UDP. Think of RTSP as the remote control and RTP as the broadcast channel. When engineers say "the camera has an RTSP feed," what they mean is the camera exposes an RTSP endpoint that a client can connect to, negotiate a session with, and then receive a continuous RTP stream from.

The default port for RTSP is 554, though many cameras and servers use non-standard ports. 8554 is common enough that you will encounter it regularly; it is the default for MediaMTX, the test server used later in this guide. The URL follows a predictable pattern: `rtsp://username:password@camera-ip:port/stream-path`. The stream path varies by vendor, which is where most of the friction is, but the protocol underneath is consistent.

One practical note for industrial networks: RTP media travels over UDP by default. Some plant networks block UDP, which can cause streams to connect but deliver no frames. If you hit that issue, add `-rtsp_transport tcp` to your FFmpeg arguments to force TCP transport. Note that this flag must appear **before** the `-i` input argument in your args array, because FFmpeg applies input options to the source that immediately follows them. If the flag is placed after `-i`, it silently has no effect rather than producing an error, which makes it a difficult bug to spot.

Why does this matter on the industrial edge specifically? Because RTSP runs over standard TCP/IP on the same network infrastructure already in place on the floor. There is no proprietary gateway required, no vendor cloud in the middle, no subscription to activate streaming. If the camera is on the network and RTSP is enabled, any device on the same network segment can connect to it. A FlowFuse instance running on an edge device next to the line can pull that stream directly, process frames locally, and act on what it sees without the frame ever leaving the facility.

That local processing is what makes it edge vision rather than cloud vision. Latency drops from seconds to milliseconds. The pipeline keeps working when the WAN link goes down. Sensitive visual data (a production line, a worker's face, a quality defect) never leaves the plant network.

The camera has been there the whole time. RTSP is how you finally read it.

## A Note on Frame Extraction and CPU

When a camera streams H.264 (the most common codec on industrial IP cameras), FFmpeg decodes the H.264 stream and re-encodes each frame as a JPEG before piping it to your flow. This is not a passthrough; it is a decode-and-re-encode step, and it carries a real CPU cost on edge hardware. At 5 fps on a single camera, this is manageable on a modern edge device. At 10+ fps, or across multiple cameras, profile the CPU load before deploying to production. For thermal logging use cases where 1 fps is sufficient, the overhead is negligible.

One useful tuning knob: FFmpeg's default MJPEG output uses near-lossless quality (`-q:v 2`), which produces large buffers and high encoding overhead. Adding `-q:v 5` to your args is a modest quality reduction that meaningfully decreases buffer sizes and encoding overhead with minimal visual quality loss for inspection purposes. The `-q:v` scale runs from 2 (highest quality, largest buffers) to 31 (lowest quality, smallest buffers), so higher values mean less overhead. For the conveyor inspection and thermal use cases described in this guide, quality 5–10 is a practical starting point. Use `-q:v 10` to further reduce pressure on constrained hardware. Add it after `-c:v mjpeg` in your args array:

```json
["-loglevel","error","-rtsp_transport","tcp","-i","rtsp://SECRET@192.168.1.64:554/Streaming/Channels/101","-f","image2pipe","-c:v","mjpeg","-q:v","5","-vf","fps=5","-"]
```

If downstream processing — such as base64 conversion, dashboard rendering, or inference — cannot keep up with the incoming frame rate, frames may be dropped or memory usage may increase. Ensure the configured FPS aligns with the processing capacity of your flow and edge hardware.

## Prerequisites

Before building the flow, make sure the following are in place.

- **A running FlowFuse instance.** If you do not have an account yet, [sign up]({% include "sign-up-url.njk" %}) and follow this [quick setup article](/blog/2025/09/installing-node-red/) to get Node-RED running on your edge device.
- **An IP camera with RTSP enabled.** Most industrial and ONVIF-compliant cameras support RTSP out of the box but it is sometimes disabled by default. Check your camera's web interface and confirm RTSP is active. If you do not have a physical camera, Step 1 covers how to generate a test stream locally.

## Finding Your Camera's RTSP URL

Before building the flow, you need a working RTSP URL. This is the address FlowFuse will connect to in order to pull the stream.

The format is always the same:

```
rtsp://username:password@camera-ip:port/stream-path
```

The part that varies by vendor is the stream path. The table below lists the most common patterns you will encounter on the industrial floor. These are examples, not guaranteed defaults; always verify against your camera's documentation before wiring them into a flow.

| Vendor | RTSP URL |
|--------|----------|
| Hikvision | `rtsp://admin:password@192.168.1.64:554/Streaming/Channels/101` |
| Dahua | `rtsp://admin:password@192.168.1.64:554/cam/realmonitor?channel=1&subtype=1` |
| Axis | `rtsp://admin:password@192.168.1.64:554/axis-media/media.amp?videocodec=h264` |

A note on the table above: the Axis path shown works for many models but varies, so check your camera's documentation. ONVIF defines a broad set of device interoperability profiles covering discovery, media configuration, PTZ control, and events, but it does not define a fixed RTSP stream path. If your camera is ONVIF-compliant, use the vendor-specific path from its documentation or use an ONVIF Device Manager tool to discover the stream URI.

For the Dahua URL, note the `subtype=1` parameter, which requests the sub-stream rather than the main stream. On many industrial Dahua cameras the main stream (`subtype=0`) is 4K H.264, which will be expensive to decode on constrained edge hardware. The sub-stream is typically 720p or lower and is the right choice for frame extraction on the edge.

Many cameras use digest authentication rather than basic auth. FFmpeg handles both automatically when credentials are included in the URL, but if you get an authentication error despite correct credentials, confirm which auth method your camera requires.

**Test the URL before wiring it into a flow.** Open VLC, go to Media, then Open Network Stream, paste the URL, and click Play. If the stream opens, the URL is correct and the camera is reachable. If it does not, confirm the IP address, credentials, and that RTSP is enabled on the camera before moving further.

## Keeping Credentials Out of Your Flow

Embedding camera credentials directly in the FFmpeg Args field is a security risk: they appear in plaintext in `flows.json`, in version control, and in any flow export.

The `@kevingodell/node-red-ffmpeg` node has a built-in **Secret** credential field that solves this cleanly. It stores a value separately from the flow JSON and substitutes it at runtime wherever the literal string `SECRET` appears in your Args array.

In the ffmpeg node's Args, write your RTSP URL with `SECRET` as a placeholder for the credentials:

```json
["-loglevel","error","-rtsp_transport","tcp","-i","rtsp://SECRET@192.168.1.64:554/Streaming/Channels/101","-f","image2pipe","-c:v","mjpeg","-q:v","5","-vf","fps=5","-"]
```

Then in the **Secret** field, enter your credentials in `username:password` format:

```
admin:password
```

At spawn time the node replaces `SECRET` with the stored value. The credential is stored in Node-RED's encrypted credentials file, not in `flows.json`. It will not appear in exported flow JSON or version control.

Note that `SECRET` is a single global substitution across the entire args string. If any other argument in your array happened to contain the literal string `SECRET` (for example, in a templated deployment with auto-generated paths), it would also be replaced. Keep this in mind if you are building flows programmatically.

## Building It

In this section, we will build the complete flow step by step. The architecture has seven components:

1. A test RTSP stream (if you do not have a physical camera)
2. FFmpeg installed on the edge device
3. The `@kevingodell/node-red-ffmpeg` node configured with the Secret field
4. Start and stop inject nodes
5. A function node to reassemble JPEG frames from the piped byte stream
6. A function node to convert frames to base64
7. A FlowFuse Dashboard to display the live feed

Every step below maps directly to one part of that architecture. Follow it in order.

### Step 1: Set Up a Test RTSP Stream (Optional)

If you have a physical camera with RTSP enabled, skip this step. If you do not, follow these steps to simulate a local RTSP stream using MediaMTX and FFmpeg.

MediaMTX is an RTSP server that ships as a self-contained binary for most platforms. It accepts incoming streams and serves them out to any client that connects. Download the release for your platform from the [MediaMTX releases page](https://github.com/bluenviron/mediamtx/releases) and select the correct archive for your operating system and architecture (Linux amd64, Linux arm64, macOS arm64, and so on).

```bash
# Extract (adjust filename to match your downloaded archive)
tar -xzf mediamtx_*.tar.gz

# Run
./mediamtx
```

Once MediaMTX is running, open a second terminal and push a test stream to it using FFmpeg. The `testsrc2` source generates a synthetic color pattern with moving elements, which is better for testing frame extraction and downstream processing logic than the static `testsrc` pattern. For a more realistic test, replace `-f lavfi -i testsrc2=size=1280x720:rate=25` with `-re -i /path/to/your/video.mp4` to stream a real video file at its native rate.

```bash
ffmpeg -re -f lavfi -i testsrc2=size=1280x720:rate=25 \
  -c:v libx264 -preset ultrafast -tune zerolatency \
  -f rtsp rtsp://localhost:8554/test
```

Your test stream is now available at `rtsp://localhost:8554/test`. Note that 8554 is MediaMTX's default port; your physical cameras will almost certainly use 554. Use this URL as your RTSP URL in the FFmpeg node configuration.

### Step 2: Install FFmpeg

FFmpeg is what connects to the RTSP stream and extracts frames. Install it on the same machine running your Node-RED instance.

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# RHEL/Rocky
sudo dnf install ffmpeg

# Verify
ffmpeg -version

# Note the full path; you will need it in Step 5
which ffmpeg        # Linux/macOS
where ffmpeg        # Windows
```

### Step 3: Install the Node

Install `@kevingodell/node-red-ffmpeg` in your FlowFuse instance. This node wraps FFmpeg as a persistent spawned process, keeps the RTSP connection alive, handles reconnects, and streams JPEG frames as buffers directly into your flow.

1. Open your Node-RED instance in FlowFuse.
2. Click the main menu in the top right corner.
3. Select **Manage Palette**.
4. Go to the **Install** tab.
5. Search for `@kevingodell/node-red-ffmpeg`.
6. Click **Install**.

### Step 4: Add Start and Stop Controls

> **Windows note:** Node.js on Windows does not reliably propagate POSIX signals like SIGTERM to child processes, so the Stop inject node described below will have no effect on Windows. If you are running FlowFuse on a Windows edge device, use a process manager or the Node-RED runtime restart to stop the stream instead.

Drag two **inject** nodes onto the canvas.

For the Start inject node:

1. Set **Name** to `Start`.
2. Click the **+** button to add a property, set it to `msg.action` with JSON value `{"command":"start"}`.
3. Enable **Inject once after 0.1 seconds** so the stream starts automatically on deploy.

For the Stop inject node:

1. Set **Name** to `Stop`.
2. Click the **+** button to add a property, set it to `msg.action` with JSON value `{"command":"stop"}`.

Wire both inject nodes to the ffmpeg node input.

The node also supports a `restart` command. The `start` and `restart` commands accept optional `path` and `args` properties; `stop` and `restart` accept an optional `signal` property. This means you can override the FFmpeg binary path or arguments per-message at runtime, which is useful if you need to switch camera streams or change encoding parameters without redeploying the flow.

### Step 5: Configure the FFmpeg Node

Drag a **ffmpeg** node onto the canvas and double-click to configure it.

- **Name:** `RTSP Camera`
- **Path:** Full path to your FFmpeg binary. Run `which ffmpeg` (Linux/macOS) or `where ffmpeg` (Windows) to find it (e.g. `/usr/bin/ffmpeg`). Using just `ffmpeg` without a full path will fail if Node-RED is running as a service and does not inherit your shell's PATH.
- **Args:**

```json
["-loglevel","error","-rtsp_transport","tcp","-i","rtsp://SECRET@192.168.1.64:554/Streaming/Channels/101","-f","image2pipe","-c:v","mjpeg","-q:v","5","-vf","fps=5","-"]
```

Replace `192.168.1.64:554/Streaming/Channels/101` with your camera's IP, port, and stream path.

- **Secret:** Enter your camera credentials in the format `username:password`. This value replaces the `SECRET` placeholder in the Args at spawn time and is stored encrypted, not in the flow JSON.

The `-rtsp_transport tcp` flag appears before `-i` in the args array, which is required because FFmpeg applies input options to the source that immediately follows them. If you move it after `-i`, it silently has no effect rather than producing an error. Leave it in its current position.

To change the frame rate, update `fps=5`. For conveyor inspection, 5–10 fps is a practical starting point. For thermal logging, 1 fps is sufficient. Higher frame rates consume more CPU, both for FFmpeg's decode/re-encode step and for downstream processing. The `-q:v 5` setting controls JPEG quality; remember the scale runs 2–31 where lower means higher quality and larger buffers. Increase to `-q:v 10` to further reduce CPU and memory pressure on constrained hardware.

If downstream processing — such as base64 conversion, dashboard rendering, or inference — cannot keep up with the incoming frame rate, frames may be dropped or memory usage may increase. Ensure the configured FPS aligns with the processing capacity of your flow and edge hardware.

- **Outputs:** `1`
- **Signal:** `SIGTERM` (Linux/macOS only — see Windows note in Step 4)

**Understanding the node's outputs:** The **Outputs** field controls how many stdio streams from the ffmpeg process are wired as node outputs. Setting it to `1` wires stdout only. The node then adds one extra output on top for status messages, giving you **two outputs total**. Looking at the node on the canvas: the **top output (output 1) carries status events** (`spawn`, `close`, `error`) and the **bottom output (output 2) carries the stdout frame data**. Wire output 1 to a debug node so you can monitor when the process starts, stops, or errors — this is essential for keeping a long-running pipeline healthy.

**Handling stream disconnections:** When the RTSP connection drops, the ffmpeg process may exit or stop producing frames, and output 1 emits a `close` status event. Note that after a disconnection, FFmpeg takes several seconds to reconnect and resume emitting frames — the exact delay depends on the camera and network conditions. To keep the pipeline running unattended, add a watchdog: connect a **switch** node to output 1 that checks `msg.payload.status === 'close'`, then wire its output back to the ffmpeg node input with `msg.action = {"command":"start"}`. This restarts the stream automatically whenever the connection is lost.

> **Note:** The importable flow at the end of this guide does not include the watchdog node, to keep it easy to read. For a production deployment, add it as described above.

### Step 6: Reassemble JPEG Frames

FFmpeg pipes frames as a continuous byte stream. Each frame arrives in multiple chunks split into chunks based on the OS pipe buffer behavior. This function node waits for a complete JPEG by detecting the start marker `0xFF 0xD8` (SOI) and end marker `0xFF 0xD9` (EOI), then outputs one complete frame per message.

Note: within valid JPEG scan data, any `0xFF` byte that is not a marker is followed by a stuffed `0x00` byte per the JPEG spec, which means a literal `0xFF 0xD9` sequence cannot appear inside well-formed scan data. In practice this implementation is reliable for the MJPEG output FFmpeg produces. If you encounter corrupted frames with malformed streams, consider a more robust framing strategy such as FFmpeg's segment muxer, which produces self-contained JPEG files rather than a continuous byte stream.

1. Drag a **function** node onto the canvas.
2. Double-click it to open its settings.
3. In the **Name** field, enter `Assemble JPEG Frames`.
4. In the **Function** tab, paste the following:

```javascript
const SOI = Buffer.from([0xFF, 0xD8]);
const EOI = Buffer.from([0xFF, 0xD9]);

let buffer = context.get('buffer') || Buffer.alloc(0);
buffer = Buffer.concat([buffer, msg.payload]);

// Guard against unbounded buffer growth if frames arrive
// faster than they are consumed (e.g. downstream bottleneck).
// Note: when the limit is hit, all frames accumulated before
// the most recent SOI are silently dropped.
const MAX_BUFFER = 2 * 1024 * 1024; // 2MB
if (buffer.length > MAX_BUFFER) {
    const soi = buffer.lastIndexOf(SOI);
    // Buffer.from() copies the slice rather than referencing shared memory,
    // preventing corruption when multiple frames are in-flight simultaneously.
    buffer = soi !== -1 ? Buffer.from(buffer.slice(soi)) : Buffer.alloc(0);
}

const msgs = [];
let start = 0;

while (true) {
    const soi = buffer.indexOf(SOI, start);
    if (soi === -1) break;
    const eoi = buffer.indexOf(EOI, soi + 2);
    if (eoi === -1) break;
    // Buffer.from() copies the slice rather than referencing shared memory,
    // preventing corruption when multiple frames are in-flight simultaneously.
    msgs.push({ payload: Buffer.from(buffer.slice(soi, eoi + 2)) });
    start = eoi + 2;
}

buffer = buffer.slice(start);
context.set('buffer', buffer);

return msgs.length > 0 ? msgs : null;
```

5. Click **Done**.
6. Wire the **bottom output (output 2)** of the ffmpeg node to this function node. This is the stdout output that carries frame data. Wire the **top output (output 1)** to a debug node (and optionally to a watchdog as described in Step 5) to monitor process lifecycle events.

Note: the frame buffer is stored in node context, which means it resets cleanly if Node-RED restarts. No frames are lost in a corrupted state — the buffer simply starts fresh from the next incoming chunk. This is the expected behavior for a production deployment.

### Step 7: Convert to Base64

The FlowFuse Dashboard cannot render a raw buffer directly as an image. This function node converts the JPEG buffer to a base64 data URL that the dashboard can display. Note that base64 encoding increases the data size by roughly 33% per frame — this is fine for dashboard monitoring at 5 fps, but if you are also routing frames to an AI inference endpoint or a database, send the raw buffer from the Assemble JPEG Frames node directly to those downstream nodes before the base64 step. Inference endpoints expect raw buffers, not data URLs. To fan out from the Assemble node to both paths simultaneously, simply wire its output to both the To Base64 node and your inference node in parallel — Node-RED will send a copy of each message to all connected downstream nodes.

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

### Step 8: Install FlowFuse Dashboard

1. Open your Node-RED instance in FlowFuse.
2. Click the main menu in the top right corner.
3. Select **Manage Palette**.
4. Go to the **Install** tab.
5. Search for `@flowfuse/node-red-dashboard`.
6. Click **Install**.

Once installed, a **Dashboard 2.0** section will appear in your node palette on the left, containing the `ui-template` and other dashboard nodes used in the next step.

### Step 9: Display on Dashboard

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

### Step 10: Deploy and Verify

Click **Deploy**. The stream starts automatically. Open your FlowFuse Dashboard and you will see live frames from your RTSP camera updating at 5 fps.

**If you imported the flow** rather than building it manually, open the ffmpeg node and update two things before deploying: set the **Path** to the full path of your FFmpeg binary (`which ffmpeg` on Linux/macOS, `where ffmpeg` on Windows), and enter your camera credentials in the **Secret** field. The `-i` value in Args already uses the `SECRET` placeholder — update the IP, port, and stream path to match your camera.

Here is the complete importable flow:

{% renderFlow 300 %}
[{"id":"inject1","type":"inject","z":"c885ae9b2f264b31","name":"Start","props":[{"p":"action","v":"{\"command\":\"start\"}","vt":"json"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"x":1090,"y":540,"wires":[["ffmpeg1"]]},{"id":"inject2","type":"inject","z":"c885ae9b2f264b31","name":"Stop","props":[{"p":"action","v":"{\"command\":\"stop\"}","vt":"json"}],"repeat":"","crontab":"","once":false,"x":1090,"y":600,"wires":[["ffmpeg1"]]},{"id":"ffmpeg1","type":"ffmpeg","z":"c885ae9b2f264b31","name":"RTSP Camera","outputs":2,"cmdPath":"/usr/bin/ffmpeg","cmdArgs":"[\"-loglevel\",\"error\",\"-rtsp_transport\",\"tcp\",\"-i\",\"rtsp://SECRET@192.168.1.64:554/Streaming/Channels/101\",\"-f\",\"image2pipe\",\"-c:v\",\"mjpeg\",\"-q:v\",\"5\",\"-vf\",\"fps=5\",\"-\"]","cmdOutputs":1,"killSignal":"SIGTERM","x":1290,"y":540,"wires":[["event_output"],["2a60c97492701f20"]]},{"id":"2a60c97492701f20","type":"function","z":"c885ae9b2f264b31","name":"Assemble JPEG Frames","func":"const SOI = Buffer.from([0xFF, 0xD8]);\nconst EOI = Buffer.from([0xFF, 0xD9]);\n\nlet buffer = context.get('buffer') || Buffer.alloc(0);\nbuffer = Buffer.concat([buffer, msg.payload]);\n\nconst MAX_BUFFER = 2 * 1024 * 1024;\nif (buffer.length > MAX_BUFFER) {\n    const soi = buffer.lastIndexOf(SOI);\n    buffer = soi !== -1 ? Buffer.from(buffer.slice(soi)) : Buffer.alloc(0);\n}\n\nconst msgs = [];\nlet start = 0;\n\nwhile (true) {\n    const soi = buffer.indexOf(SOI, start);\n    if (soi === -1) break;\n    const eoi = buffer.indexOf(EOI, soi + 2);\n    if (eoi === -1) break;\n    msgs.push({ payload: Buffer.from(buffer.slice(soi, eoi + 2)) });\n    start = eoi + 2;\n}\n\nbuffer = buffer.slice(start);\ncontext.set('buffer', buffer);\n\nreturn msgs.length > 0 ? msgs : null;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":1490,"y":540,"wires":[["to_base64"]]},{"id":"ui_template1","type":"ui-template","z":"c885ae9b2f264b31","group":"8ff65abef5f9c829","page":"","ui":"","name":"Camera Feed","order":1,"width":0,"height":0,"head":"","format":"<template>\n  <img :src=\"msg.payload\" style=\"width:100%;height:auto;\" />\n</template>","storeOutMessages":false,"passthru":false,"resendOnRefresh":true,"templateScope":"local","className":"","x":1890,"y":540,"wires":[[]]},{"id":"to_base64","type":"function","z":"c885ae9b2f264b31","name":"To Base64","func":"msg.payload = 'data:image/jpeg;base64,' + msg.payload.toString('base64');\nreturn msg;","outputs":1,"x":1680,"y":540,"wires":[["ui_template1"]]},{"id":"event_output","type":"debug","z":"c885ae9b2f264b31","name":"FFmpeg Events","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1490,"y":600,"wires":[]},{"id":"8ff65abef5f9c829","type":"ui-group","name":"Group 1","page":"8de6be5847cdf45d","width":6,"height":1,"order":1,"showTitle":true,"className":"","visible":true,"disabled":false,"groupType":"default"},{"id":"8de6be5847cdf45d","type":"ui-page","name":"Page 1","ui":"0a3541d66d5094a8","path":"/page1","icon":"home","layout":"grid","theme":"6d8b3208020c71e2","breakpoints":[{"name":"Default","px":0,"cols":3},{"name":"Tablet","px":576,"cols":6},{"name":"Small Desktop","px":768,"cols":9},{"name":"Desktop","px":1024,"cols":12}],"order":1,"className":"","visible":"true","disabled":"false"},{"id":"0a3541d66d5094a8","type":"ui-base","name":"My Dashboard","path":"/dashboard","appIcon":"","includeClientData":true,"acceptsClientConfig":["ui-notification","ui-control"],"showPathInSidebar":false,"headerContent":"page","navigationStyle":"default","titleBarStyle":"default","showReconnectNotification":true,"notificationDisplayTime":1,"showDisconnectNotification":true,"allowInstall":false},{"id":"6d8b3208020c71e2","type":"ui-theme","name":"Default Theme","colors":{"surface":"#ffffff","primary":"#0094CE","bgPage":"#eeeeee","groupBg":"#ffffff","groupOutline":"#cccccc"},"sizes":{"density":"default","pagePadding":"12px","groupGap":"12px","groupBorderRadius":"4px","widgetGap":"12px"}},{"id":"4e2df064375c571d","type":"global-config","env":[],"modules":{"@kevingodell/node-red-ffmpeg":"0.1.1-beta.3","@flowfuse/node-red-dashboard":"1.30.2"}}]
{% endrenderFlow %}

## What's Next

You connected an RTSP stream, extracted frames in real time, secured your credentials, and wired the output into a live dashboard. The camera is no longer just recording. It is part of your flow.

But capturing frames is only the first half. The value is in what you do with them. The next step is running AI inference at the edge, scoring every frame against a model trained on your own production data, catching defects, anomalies, and deviations the moment they appear, before the part moves on, before the shift ends, before someone has to go back and review footage after something already went wrong.

FlowFuse supports this directly. The `@flowfuse-nodes/nr-ai-nodes` package brings ONNX runtime support into FlowFuse, which means any model you can train and export sits inside your flow like any other node. The frame comes in, the model scores it, the result routes wherever it needs to go. No cloud round trip. No external inference server to manage. No data leaving the plant network.

To see the full pattern end to end, read [Building an AI Vibration Anomaly Detector for Industrial Motors](https://flowfuse.com/blog/2026/02/motor-anomaly-detector-ai/). It walks through training a custom model on real equipment data, exporting it to ONNX, and wiring it into a live FlowFuse inference flow using FlowFuse's AI nodes. The deployment approach is the same for any model you train, on any signal you can get into a flow.

The camera is already there. The pipeline is already running. The next step is making it think.
