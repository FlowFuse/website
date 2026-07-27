---
title: "Processing RTSP Camera Feeds at the Edge"
subtitle: "Turn idle camera streams into live views and AI-driven decisions, all on the plant floor"
description: "Learn how to use the FlowFuse RTSP Video Feed node to pull frames from a camera stream, display them on a dashboard, and feed them to local AI models, without sending video off-site."
date: 2026-06-23
authors: ["sumit-shinde"]
image: /blog/2026/06/images/rtsp-feeds-at-edge.png
tags:
    - flowfuse
    - post
meta:
  howto:
    name: "How to Process RTSP Camera Feeds at the Edge with FlowFuse"
    description: "Turn an idle RTSP camera stream into still frames you can route through your flows, show on a dashboard, and pass to local AI models, all at the edge with nothing leaving the plant, using the FlowFuse RTSP Video Feed node."
    tool:
      - "FlowFuse"
      - "FlowFuse Device Agent"
      - "RTSP camera"
      - "FlowFuse Dashboard 2.0"
    steps:
      - name: "Install the RTSP Video Feed node"
        text: "The RTSP Video Feed node is part of the FlowFuse Edge Certified Nodes, which are part of the FlowFuse Edge offering and have to be enabled for your team first, including on FlowFuse Cloud, by talking to the FlowFuse sales team. Once it's enabled, open the Palette Manager in the FlowFuse editor, switch to the Install tab, and find the FlowFuse Edge Certified Nodes collection. Locate @flowfuse-certified-nodes/rtsp and click install. ffmpeg is pulled in automatically, so there is nothing else to set up. After the catalogue is enabled, restart any existing devices or hosted instances so they pick up the new catalogue."
        url: "installing-the-node"
      - name: "Configure the node to capture frames"
        text: "Drag the RTSP Feed node onto the canvas and open its settings. Enter your camera's RTSP URL, add a username and password if the camera needs them, set the FPS to match your use case, and leave Output image as msg.payload enabled so each frame is emitted as a message."
        url: "configuring-the-node"
      - name: "Put the live feed on a dashboard"
        text: "Install the base64 node (node-red-node-base64) from the Palette Manager, then add it to convert each PNG buffer to a string, then a change node to prepend the data URI prefix the browser needs, then a ui-template node with a single image element bound to the payload. Deploy and open the dashboard to watch the line refresh with every new frame."
        url: "putting-the-feed-on-a-dashboard"
      - name: "Turn frames into decisions with local AI"
        text: "Wire the camera's PNG output straight into the FlowFuse AI Object Detection node, which runs vision models locally with nothing sent to an outside service. Each detection returns structured data, a label, a confidence score, and a position, which you handle like any other signal in FlowFuse."
        url: "from-a-view-to-a-decision"
      - name: "Record frames to disk instead"
        text: "Turn off Output image as msg.payload and the node stops emitting messages. Instead ffmpeg writes a continuous numbered sequence of PNGs straight to the directory set in the File path field, handy for on-site recording where the footage shouldn't leave the building. The node does not delete these frames, so at a high frame rate they will fill the drive over time."
        url: "recording-frames-to-disk"
  faq:
  - question: "What is an RTSP camera feed?"
    answer: "RTSP (Real Time Streaming Protocol) is the standard most IP and CCTV cameras use to deliver a continuous video stream over a network. It gives you a raw stream rather than discrete values, which is why it's hard to plug directly into dashboards or logic the way you would a PLC tag or sensor reading. To act on it, you first turn the stream into something workable, such as still frames."
  - question: "How do you process an RTSP stream in a flow?"
    answer: "Use a node that connects to the camera's RTSP URL and pulls still frames out of the stream as images. The FlowFuse RTSP Video Feed node does this by driving ffmpeg under the hood, emitting each frame as a PNG in msg.payload. From there you can display the frame on a dashboard, pass it to a local AI node, or write it to disk, handling it like any other message in your flow."
  - question: "Why process video at the edge instead of the cloud?"
    answer: "A single camera streaming continuously can push tens of gigabytes a day, so sending every camera's raw video off-site around the clock is expensive when most of it shows nothing worth keeping. Plant networks are often segmented so camera footage can't leave the site anyway, and privacy or compliance rules can mean it legally shouldn't. Processing at the edge pulls a frame where the camera lives, acts on it there, and sends out only what matters: a count, a status, an alert."
  - question: "Can you run object detection on a camera feed locally?"
    answer: "Yes. Once a frame is a PNG buffer moving through your flow, you can wire it into a local vision model instead of an outside service. The FlowFuse AI Object Detection node takes a PNG buffer as input and runs the model on the edge device, returning structured data for each detection: a label, a confidence score, and a position. Nothing leaves the plant."
  - question: "How much bandwidth does an RTSP camera use?"
    answer: "It varies with resolution, frame rate, and codec, but a single continuously streaming camera can push tens of gigabytes a day, and that multiplies with every camera in the building. Capturing frames at the edge and sending out only the result, rather than hauling raw video off-site, is what keeps that bandwidth cost from scaling with your camera count."
cta:
    type: contact
    title: "Bring vision to the edge with FlowFuse"
    description: "Put your idle camera feeds to work at the edge, from live views to local AI, all without sending video off-site, with FlowFuse"
tldr: "Camera feeds usually sit idle in an NVR. The new RTSP Video Feed node turns an RTSP stream into still frames you can route through your flows, display on a dashboard, or pass to local AI nodes, all at the edge with nothing leaving the plant."
---

RTSP is the protocol used by most IP cameras to deliver video streams over a network. While these streams are easy to view in an NVR or camera application, they're much harder to integrate into dashboards, automation, or AI workflows.

<!--more-->

The **RTSP Video Feed** certified node published by FlowFuse solves that problem by converting a live RTSP stream into individual image frames that can be processed directly within your flows. Once a frame is available as a message, you can display it on a dashboard, send it to AI models for analysis, trigger actions based on its content, or store it locally.

In this tutorial, you'll connect to an RTSP camera and display the live feed on a dashboard. You'll also see how the captured frames can be passed to local AI models or recorded straight to disk.

## Prerequisites

Before you begin, ensure the FlowFuse Device Agent is installed and running on an edge device that can access the camera. This device will be managed through FlowFuse and serves as the environment where you'll install the required nodes and build the flow. If you haven't configured a device yet, complete the [Device Agent Quickstart](/docs/device-agent/quickstart/#setup-%26-installation) before continuing.

The RTSP Video Feed node is part of the **FlowFuse Edge Certified Nodes**, which are part of the **FlowFuse Edge** offering and aren't enabled by default. This applies to FlowFuse Cloud customers too, so the catalogue won't appear in your Palette Manager until it's switched on for your team. [Talk to our sales team](/contact-us/) to get access before you start.

## How the node works

The **RTSP Video Feed** node does one job well: it connects to a camera and pulls still frames out of the stream as PNG images. It uses `ffmpeg` under the hood to handle the video decoding and frame extraction.

You give it an RTSP URL, credentials if the camera needs them, and a capture rate. It can then run in one of two modes: emit each frame as a message with the PNG in `msg.payload`, ready to wire into anything that takes an image, or write a numbered sequence of PNGs straight to disk for plain on-site recording. We'll use the message mode for most of this tutorial, since we want the frames in the flow, and cover disk recording at the end.

The capture rate and image resolution have a direct impact on performance. While `ffmpeg` handles the video decoding, higher frame rates and resolutions result in more images being generated, transferred, and processed by downstream nodes, increasing CPU, memory, and I/O usage. For best results, configure the node to capture only as many frames as your application requires.

## Build it: A Live Line View

Let's turn a camera into something an operator can actually monitor—without ever opening the NVR.

### Installing the node

> The catalogue must be enabled for your team before you can install the node (see the note above). Once it is, enabling the certified nodes package updates the catalogue, but existing devices and hosted instances won't see the new nodes until they restart. Restart any device or hosted instance you plan to install the node on so it picks up the updated catalogue.

1. In the FlowFuse editor, open the Palette Manager from the top-right menu.
2. Switch to the Install tab and find the "FlowFuse Edge Certified Nodes".
3. Locate the `@flowfuse-certified-nodes/rtsp` and click install. `ffmpeg` is pulled in automatically, so there's nothing else to set up.

![FlowFuse Palette Manager open on the Install tab, with the FlowFuse Edge Certified Nodes catalogue selected and the RTSP node's Install button highlighted](./images/rtsp-edge-catalog.png)
*Installing the RTSP Video Feed node from the FlowFuse Edge Certified Nodes catalogue in the Palette Manager.*

Once it's installed, you'll find the **RTSP Feed** node in the left palette sidebar, ready to drag onto your canvas.

### Configuring the node

1. Drag the **RTSP Feed** node onto your canvas and double-click to open its settings.
2. In the RTSP URL field, enter your camera's stream address, for example `rtsp://192.168.1.50:554/ballmill-a2`.
3. If the camera requires a login, fill in Username and Password. These are stored as credentials and are never written into the flow file.
4. Set FPS to 10. Ten frames a second is smooth enough to watch a line in near real time. If your use case doesn't need that, lower it to ease the load: 1 is plenty for periodic monitoring. You can always raise it later.

> **FPS drives the load.** In message mode, every captured frame becomes a message in your flow, so a high FPS means more, larger messages to move and process; keep it no higher than your use case needs. In disk-writing mode no messages are emitted, so the rate instead governs how fast frames pile up on disk.

5. Leave Output image as `msg.payload` enabled so each frame is emitted as a message.

> You'll also see a **File path** field. In this mode, the node keeps a single working image in that location, or falls back to the operating system's temporary directory if the field is left blank. You can safely ignore it for now, as it only becomes important in disk-writing mode, covered in [Recording frames to disk](#recording-frames-to-disk). In that mode, frames are written to the specified path and are not automatically deleted.

![The RTSP Feed node settings panel showing the RTSP URL, optional Username and Password credential fields, the FPS selector set to 10, and the Output image as msg.payload option enabled](./images/rtsp-config.png)
_The RTSP Feed node settings panel showing the RTSP URL, optional Username and Password credential fields, the FPS selector set to 10, and the Output image as msg.payload option enabled_

6. Click Done, name the node **RTSP Feed**, wire a debug node to the output, and deploy.

Once the node connects, it shows a green Running status underneath it on the canvas. Capturing begins the moment the flow is deployed, and within a second PNG buffers start arriving in the debug sidebar, confirming the camera is connected and frames are flowing.

![Debug sidebar showing a stream of PNG buffer messages arriving from the RTSP Feed, one per captured frame](./images/rtsp-debug-output.png)
*A buffer per frame in the debug sidebar. The feed is connected and the frames are now inside the flow.*

### Putting the feed on a dashboard

A buffer in the debug sidebar confirms the feed works, but it's no use to an operator. Let's get the frame onto a screen anyone can open in a browser.

This assumes you have FlowFuse Dashboard 2.0 installed. If you don't, follow the [Getting Started guide](https://dashboard.flowfuse.com/getting-started.html#installation) to add it and set up your first page, then come back.

FlowFuse Dashboard has no built-in widget that takes a raw image buffer, so we turn each PNG into a base64 data URI and render it with a standard image tag. The conversion is handled by the **base64** node, which you'll need to install: add `node-red-node-base64` from the Palette Manager.

1. Add a **base64** node after the **RTSP Feed** node. With its default action, it converts the incoming PNG buffer into a base64 string.

2. Add a **Change** node after it. The RTSP Video Feed node outputs the image as a Base64-encoded string. To display it in a dashboard image widget, prepend the required Data URI prefix using the following JSONata expression:

   ```
   "data:image/png;base64," & payload
   ```

3. Add a **ui-template** node and assign it to a dashboard group and page. Set its Type to *Widget* and drop in a single image element bound to the payload:

   ```html
   <template>
     <img
       :src="msg?.payload"
       v-if="msg?.payload"
       style="max-width: 100%; display: block; margin: 0 auto;"
       alt="Live frame from the A2 ball mill camera"
     />
   </template>
   ```

4. Deploy and open your dashboard. If you're working on the edge device, browse to `http://<flowfuse-agent-ip>:<port>/dashboard/`, using the IP and port your instance runs on. The view refreshes with every new frame.

That's a live line view anyone can pull up in a browser, with no NVR login and no separate video client.

![FlowFuse Dashboard 2.0 page showing a live frame from the mill camera, with the grinding mill, feed conveyor and flotation line visible](./images/dashboard-view.gif)
*FlowFuse Dashboard 2.0 page showing a live frame from the mill camera, with the grinding mill, feed conveyor and flotation line visible*

> **Watch the message size.** FlowFuse Dashboard sends data over a socket connection capped at about 1 MB per message by default, and a full-resolution frame can exceed that. When it does, the message is silently dropped and the image just doesn't appear. If that happens, lower the camera resolution, keep the FPS low, or raise [`maxHttpBufferSize`](https://dashboard.flowfuse.com/user/settings.html#maxhttpbuffersize) in your instance settings.

## From a view to a decision

A live view is a real win, but notice what you have now: the camera's output is a PNG buffer moving through your flow, one message per frame. Once a frame is just another message, you can do more than display it. You can ask what's in it.

That's what the [**FlowFuse AI** nodes](https://flowfuse.com/node-red/flowfuse/ai/) are for. They run vision models locally, inside your flow, with nothing sent to an outside service. The **Object Detection** node takes a PNG buffer as its input, which is exactly what the camera node outputs, so you wire the camera straight into it, no conversion step in between. From there the flow stops watching and starts acting: counting material on the conveyor, flagging a person near the flotation cells, or catching a stopped belt before the line backs up. Each detection comes back as structured data, a label, a confidence score, and a position, which you handle like any other signal in FlowFuse.

## Recording frames to disk

One last mode worth knowing. Sometimes you don't need frames in the flow at all, just a local record of what the camera saw. Turn off **Output image as `msg.payload`** and the node stops emitting messages. Instead `ffmpeg` writes a continuous numbered sequence of PNGs (`rtsp-<node-id>-<counter>.png`) straight to disk.

Where they land is set by the **File path** field. Point it at a directory you control and the frames are written there. Leave it empty and the node falls back to the OS temp directory, typically `/tmp`. On many modern Linux distributions `/tmp` is a RAM-backed disk, though not on all, so frames there consume memory rather than disk and are cleared on reboot. Either way it's fine for a quick test but not for anything you need to keep.

## Wrapping up

Camera feeds don't have to sit in a silo while the rest of the floor gets connected. With the **RTSP Video Feed** node, a stream becomes still frames; with a dashboard, those frames become a live view; and with the **FlowFuse AI** nodes, they become decisions, all at the edge, with nothing leaving the plant.
