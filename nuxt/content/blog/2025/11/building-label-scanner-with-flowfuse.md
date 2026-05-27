---
title: Building a Label Scanner with FlowFuse for Product Labels & Serial Numbers
navTitle: Building a Label Scanner with FlowFuse for Product Labels & Serial Numbers
---

In production environments, labels are everywhere! Products have Serial Numbers and Lot Codes, Packages have Batch IDs and Dates. These are often critical to the processes for packaging, tracking, logging, inventory and so on.

<!--more-->

Many companies still do this manually. Someone types in each code as products move through the line. It's repetitive, time-consuming work - mistakes are inevitable.

That's where OCR comes in. Optical Character Recognition (OCR) uses cameras to automatically read and extract text from labels and product markings. Instead of manual data entry, a camera simply captures the image and the system pulls out the information you need. It's a straightforward solution that's already being deployed in modern manufacturing facilities worldwide.

![Part with Serial No](/blog/2025/11/images/serial-no-on-part.png){width="400" data-zoomable}
*Part with Serial No*

For example, take a look at the image above. When processed with OCR, it returns the following text:

```
Serial No: XYZ123456789
```

This tutorial shows you how you can build an OCR system using FlowFuse that can capture images from cameras, extract text from product labels, lot codes, and serial numbers, validate and parse the extracted data, store results in a database or trigger downstream workflows.

## Getting Started

Before we dive in, make sure you have a running FlowFuse instance.
If you do not have one yet, you can [sign up for the 14-day free trial](https://app.flowfuse.com/) and get a hosted instance running in under two minutes.

### Installing Required Nodes

To perform text extraction from images, you’ll need to install the `@sumit_shinde_84/node-red-contrib-simple-ocr` node in your FlowFuse instance.
This node uses the Tesseract OCR engine under the hood to recognize text from image files or image buffers.
To capture images and build a dashboard, you’ll also need the **FlowFuse Dashboard** and **Webcam** packages.

1. Open your **FlowFuse** editor.
2. From the main menu, select **Manage palette → Install**.
3. Search for and install the following packages one by one:

   * `@sumit_shinde_84/node-red-contrib-simple-ocr`
   * `@flowfuse/node-red-dashboard`
   * `@sumit_shinde_84/node-red-dashboard-2-ui-webcam`

Once installed, you’ll see the **simple-ocr** node under the **Function** category and the **Webcam** widget under the **dashboard 2.0** category in the left sidebar.

### Building the Scanner

Now, let’s build a scanner dashboard that you can open on a mobile device, allowing the phone to act as a scanner for capturing product labels and serial numbers.

![Label Scanner Built with FlowFuse](/blog/2025/11/images/flowfuse-scanner.gif)
_[Label Scanner Built with FlowFuse]_

To capture images directly from your browser, you can use the **FlowFuse Dashboard** along with the **Webcam widget**, let's install them first.

#### Configuring the Webcam Node

1. Drag the **Webcam** widget onto your canvas.
2. Double-click the node to open its configuration.
3. Create a new ui group for it to render the feed (for example, *OCR Scanner*).
5. Drag the **Button** widget onto the canvas and set its label to **Scan**. Select the appropriate **group**, check **Enable pointerdown event**, and set the **payload** to `"capture"`. 
6. Click **Done**. When the button is clicked, it will send the `"capture"` payload, which will trigger the **Webcam** widget to capture an image.

![Scan Label Button Widget Configuration](/blog/2025/11/images/scan-label-button.png){data-zoomable}
_Scan Label Button Widget Configuration_

6. Deploy the flow

When deployed, this flow creates a dashboard interface with a live camera preview and a large Scan Label button. Each time you click Scan Label, the captured image is sent as a `msg.payload.image` containing a image buffer.

> *Tip: To correct a flipped or mirrored camera preview, open the three-dot menu (⋮) on the webcam widget and enable "Mirror Image".*

##### Handling High-Resolution Images

When capturing an image, if you encounter an error stating that the image size exceeds **Dashboard 2.0’s** `maxHttpBufferSize`, you’ll need to reduce the image resolution or quality — otherwise, the dashboard connection may reset.

To fix this:

1. Double-click the **Webcam** widget.
2. Adjust the **image width**, **height**, and **quality** parameters.
3. By default, these are set to **640×480** resolution and **0.8** quality.

You can also check the image size from the webcam output using `msg.payload.sizeBytes`.

#### Adding the OCR Node

Now, let’s add an OCR node to extract text from the captured images.

1. Drag a **Change** node onto the canvas and set `msg.payload` to `msg.payload.image`.
2. Drag a **Simple OCR** node onto the canvas.
3. Connect the output of the **Webcam** widget to the **Change** node, and then connect the **Change** node’s output to the **Simple OCR** node.
4. Add a **Debug** node and connect it to the **Simple OCR** node to view the results.
5. Click **Done**, then **Deploy**.

Next, open the dashboard by clicking the **Dashboard 2.0** button in the right sidebar. Then, click the **Scan Label** button — the first click will activate your camera (make sure to grant your browser permission to access it).

Position the label in front of the camera, focus on it, and click **Scan** again. The recognized text will appear in the **Debug** panel.
Now, you need to validate and trim the recognized text, and add a visual indicator to show a successful scan. Let’s set that up next.

#### Validating and Parsing the Extracted Text

The OCR node returns raw text that may contain extra whitespace, line breaks, or unwanted characters. Let's add validation and parsing logic:

1. Drag another **Function** node onto the canvas.
2. Connect it after the **simple-ocr** node.
3. Add the following code:

```javascript
// Extract and clean OCR text
let text = (msg.payload.text || msg.payload || "")
  .replace(/[\r\n]+/g, ' ')
  .replace(/[^\w\s:]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

// Match part number
let match = text.match(/(?:Part\s*No|No)[:\s]+([0-9A-Z]{6,12})/i);
let part = match?.[1]?.trim() || null;

// Validate format: 6 digits + 2 letters + 2 digits
let valid = part ? /^\d{6}[A-Z]{2}\d{2}$/.test(part) : false;

// Build payload
msg.payload = {
  success: valid,
  partNumber: valid ? part : null,
  timestamp: new Date().toISOString(),
  notificationMsg: valid
    ? `Label successfully scanned: ${part}`
    : "Scan failed — Invalid or unreadable label."
};

return msg;
```

> Tip: You don’t need to know JavaScript to create a function for validating and extracting the label text you’re scanning — just tell the [FlowFuse Expert](/blog/2025/07/flowfuse-ai-assistant-better-node-red-manufacturing/) what you want, and it will generate it for you.

4. Click **Done**.

This function cleans the text, validates that something was detected, and attempts to extract structured data like serial numbers or part numbers using regular expressions.

#### Adding Visual Feedback

Users need immediate feedback when a scan succeeds or fails. Let's add both visual indicators:

1. Drag a **Change** node onto the canvas and connect it to the validation Function node.
2. Configure the Change node to set `msg.payload` to `msg.payload.notificationMsg`.
3. Drag a **ui-notification** widget onto the canvas.
4. Double-click the ui-notification node to configure it:
   - Select or create a **UI Base** configuration
   - Set the **position** to **center**
   - Optionally, configure the **timeout** duration (e.g., 3000ms for 3 seconds)
5. Connect the Change node output to the ui-notification node input.
6. Click **Done** and **Deploy** the flow.

Now when you scan a label:
- If the scan is successful, you'll see a green notification with "Label successfully scanned: [part number]"
- If the scan fails, you'll see a warning notification with "Scan failed — Invalid or unreadable label"

Your OCR scanning system is now complete! You can test it by opening the dashboard on your mobile device, positioning a product label in front of the camera, and clicking the Scan button. The system will capture the image, extract the text, validate it, and provide immediate visual feedback on the scan result.



::render-flow
---
height: 300
flow: "W3siaWQiOiI2MDRmNDY2ZDIyZTExNTdiIiwidHlwZSI6Imdyb3VwIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyJhMjFjM2M0N2QxZjFjZjEwIiwiM2E3MWU4MDA0MTVhMzk2NiIsImNlMzgzODU2MjkzZmU3ZTgiLCI4ODU4ZGE5ZDAxNjdmYTU5IiwiNDUwOTNmZGQ5ZThjNzM3NCIsIjIyM2JiMDYwYmQ4OTZiZTAiLCJjNGE5MWY1YjUyYTljNDY5IiwiMDIwZTExZTc0MDE1NDQ4OSIsIjZhZDZiYWQ2OTVjMzRjN2IiLCIzMWQyZWIzNTg5ZTA1ZDAxIl0sIngiOjg0LCJ5IjoyNzksInciOjgyMiwiaCI6MjQyfSx7ImlkIjoiYTIxYzNjNDdkMWYxY2YxMCIsInR5cGUiOiJzaW1wbGUtb2NyIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiNjA0ZjQ2NmQyMmUxMTU3YiIsIm5hbWUiOiIiLCJ4Ijo3NTAsInkiOjMyMCwid2lyZXMiOltbImM0YTkxZjViNTJhOWM0NjkiXV19LHsiaWQiOiIzYTcxZTgwMDQxNWEzOTY2IiwidHlwZSI6InVpLXdlYmNhbSIsInoiOiI5Y2Y4MmI2OGJiODllOGNlIiwiZyI6IjYwNGY0NjZkMjJlMTE1N2IiLCJuYW1lIjoiIiwiZ3JvdXAiOiI1YTg5YWM3MTcxZjUxY2MzIiwid2lkdGgiOjAsImhlaWdodCI6MCwicGFzc3RocnUiOmZhbHNlLCJxckRldGVjdGlvbiI6ZmFsc2UsImltYWdlV2lkdGgiOiIxNTAiLCJpbWFnZUhlaWdodCI6IjE1MCIsImltYWdlUXVhbGl0eSI6IiIsIngiOjM4MCwieSI6MzIwLCJ3aXJlcyI6W1siMzFkMmViMzU4OWUwNWQwMSJdXX0seyJpZCI6ImNlMzgzODU2MjkzZmU3ZTgiLCJ0eXBlIjoidWktYnV0dG9uIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiNjA0ZjQ2NmQyMmUxMTU3YiIsImdyb3VwIjoiNWE4OWFjNzE3MWY1MWNjMyIsIm5hbWUiOiJTY2FuIExhYmVsIEJ1dHRvbiIsImxhYmVsIjoiU0NBTiIsIm9yZGVyIjoyLCJ3aWR0aCI6MCwiaGVpZ2h0IjowLCJlbXVsYXRlQ2xpY2siOmZhbHNlLCJ0b29sdGlwIjoiIiwiY29sb3IiOiIiLCJiZ2NvbG9yIjoiIiwiY2xhc3NOYW1lIjoiIiwiaWNvbiI6IiIsImljb25Qb3NpdGlvbiI6ImxlZnQiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ0b3BpYyI6InRvcGljIiwidG9waWNUeXBlIjoibXNnIiwiYnV0dG9uQ29sb3IiOiIiLCJ0ZXh0Q29sb3IiOiIiLCJpY29uQ29sb3IiOiIiLCJlbmFibGVDbGljayI6ZmFsc2UsImVuYWJsZVBvaW50ZXJkb3duIjp0cnVlLCJwb2ludGVyZG93blBheWxvYWQiOiJjYXB0dXJlIiwicG9pbnRlcmRvd25QYXlsb2FkVHlwZSI6InN0ciIsImVuYWJsZVBvaW50ZXJ1cCI6ZmFsc2UsInBvaW50ZXJ1cFBheWxvYWQiOiIiLCJwb2ludGVydXBQYXlsb2FkVHlwZSI6InN0ciIsIngiOjIwMCwieSI6MzIwLCJ3aXJlcyI6W1siM2E3MWU4MDA0MTVhMzk2NiJdXX0seyJpZCI6Ijg4NThkYTlkMDE2N2ZhNTkiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI2MDRmNDY2ZDIyZTExNTdiIiwibmFtZSI6IkV4dHJhY3QgYW5kIFZhbGlkYXRlIFBhcnQgTnVtYmVyIiwiZnVuYyI6Ii8vIEV4dHJhY3QgYW5kIGNsZWFuIE9DUiB0ZXh0XG5sZXQgdGV4dCA9IChtc2cucGF5bG9hZC50ZXh0IHx8IG1zZy5wYXlsb2FkIHx8IFwiXCIpXG4gIC5yZXBsYWNlKC9bXFxyXFxuXSsvZywgJyAnKVxuICAucmVwbGFjZSgvW15cXHdcXHM6XS9nLCAnJylcbiAgLnJlcGxhY2UoL1xccysvZywgJyAnKVxuICAudHJpbSgpO1xuXG4vLyBNYXRjaCBwYXJ0IG51bWJlclxubGV0IG1hdGNoID0gdGV4dC5tYXRjaCgvKD86UGFydFxccypOb3xObylbOlxcc10rKFswLTlBLVpdezYsMTJ9KS9pKTtcbmxldCBwYXJ0ID0gbWF0Y2g/LlsxXT8udHJpbSgpIHx8IG51bGw7XG5cbi8vIFZhbGlkYXRlIGZvcm1hdDogNiBkaWdpdHMgKyAyIGxldHRlcnMgKyAyIGRpZ2l0c1xubGV0IHZhbGlkID0gcGFydCA/IC9eXFxkezZ9W0EtWl17Mn1cXGR7Mn0kLy50ZXN0KHBhcnQpIDogZmFsc2U7XG5cbi8vIEJ1aWxkIHBheWxvYWRcbm1zZy5wYXlsb2FkID0ge1xuICBzdWNjZXNzOiB2YWxpZCxcbiAgcGFydE51bWJlcjogdmFsaWQgPyBwYXJ0IDogbnVsbCxcbiAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gIG5vdGlmaWNhdGlvbk1zZzogdmFsaWRcbiAgICA/IGDinIUgTGFiZWwgc3VjY2Vzc2Z1bGx5IHNjYW5uZWQ6ICR7cGFydH1gXG4gICAgOiBcIuKaoO+4jyBTY2FuIGZhaWxlZCDigJQgSW52YWxpZCBvciB1bnJlYWRhYmxlIGxhYmVsLlwiXG59O1xuXG5yZXR1cm4gbXNnO1xuIiwib3V0cHV0cyI6MSwidGltZW91dCI6MCwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4IjozMTAsInkiOjQyMCwid2lyZXMiOltbIjIyM2JiMDYwYmQ4OTZiZTAiLCI2YWQ2YmFkNjk1YzM0YzdiIl1dfSx7ImlkIjoiNDUwOTNmZGQ5ZThjNzM3NCIsInR5cGUiOiJ1aS1ub3RpZmljYXRpb24iLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI2MDRmNDY2ZDIyZTExNTdiIiwidWkiOiJhZmVhMDRjZTg3MzVjMGE2IiwicG9zaXRpb24iOiJjZW50ZXIgY2VudGVyIiwiY29sb3JEZWZhdWx0Ijp0cnVlLCJjb2xvciI6IiMwMDAwMDAiLCJkaXNwbGF5VGltZSI6IjMiLCJzaG93Q291bnRkb3duIjp0cnVlLCJvdXRwdXRzIjoxLCJhbGxvd0Rpc21pc3MiOnRydWUsImRpc21pc3NUZXh0IjoiQ2xvc2UiLCJhbGxvd0NvbmZpcm0iOmZhbHNlLCJjb25maXJtVGV4dCI6IkNvbmZpcm0iLCJyYXciOmZhbHNlLCJjbGFzc05hbWUiOiIiLCJuYW1lIjoiIiwieCI6NzgwLCJ5Ijo0MjAsIndpcmVzIjpbW11dfSx7ImlkIjoiMjIzYmIwNjBiZDg5NmJlMCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI2MDRmNDY2ZDIyZTExNTdiIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5ub3RpZmljYXRpb25Nc2ciLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTcwLCJ5Ijo0MjAsIndpcmVzIjpbWyI0NTA5M2ZkZDllOGM3Mzc0Il1dfSx7ImlkIjoiYzRhOTFmNWI1MmE5YzQ2OSIsInR5cGUiOiJsaW5rIG91dCIsInoiOiI5Y2Y4MmI2OGJiODllOGNlIiwiZyI6IjYwNGY0NjZkMjJlMTE1N2IiLCJuYW1lIjoibGluayBvdXQgMSIsIm1vZGUiOiJsaW5rIiwibGlua3MiOlsiMDIwZTExZTc0MDE1NDQ4OSJdLCJ4Ijo4NjUsInkiOjMyMCwid2lyZXMiOltdfSx7ImlkIjoiMDIwZTExZTc0MDE1NDQ4OSIsInR5cGUiOiJsaW5rIGluIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiNjA0ZjQ2NmQyMmUxMTU3YiIsIm5hbWUiOiJsaW5rIGluIDEiLCJsaW5rcyI6WyJjNGE5MWY1YjUyYTljNDY5Il0sIngiOjEyNSwieSI6NDIwLCJ3aXJlcyI6W1siODg1OGRhOWQwMTY3ZmE1OSJdXX0seyJpZCI6IjZhZDZiYWQ2OTVjMzRjN2IiLCJ0eXBlIjoiZGVidWciLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI2MDRmNDY2ZDIyZTExNTdiIiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo1NDAsInkiOjQ4MCwid2lyZXMiOltdfSx7ImlkIjoiMzFkMmViMzU4OWUwNWQwMSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiI2MDRmNDY2ZDIyZTExNTdiIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5pbWFnZSIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1NjAsInkiOjMyMCwid2lyZXMiOltbImEyMWMzYzQ3ZDFmMWNmMTAiXV19LHsiaWQiOiI1YTg5YWM3MTcxZjUxY2MzIiwidHlwZSI6InVpLWdyb3VwIiwibmFtZSI6IlNjYW5uZXIiLCJwYWdlIjoiZjFlYjk5YjFlNzE0ZDQxMSIsIndpZHRoIjo2LCJoZWlnaHQiOjEsIm9yZGVyIjoxLCJzaG93VGl0bGUiOnRydWUsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSIsImdyb3VwVHlwZSI6ImRlZmF1bHQifSx7ImlkIjoiYWZlYTA0Y2U4NzM1YzBhNiIsInR5cGUiOiJ1aS1iYXNlIiwibmFtZSI6IlVJIE5hbWUiLCJwYXRoIjoiL2Rhc2hib2FyZCIsImluY2x1ZGVDbGllbnREYXRhIjp0cnVlLCJhY2NlcHRzQ2xpZW50Q29uZmlnIjpbInVpLWNvbnRyb2wiLCJ1aS1ub3RpZmljYXRpb24iXSwiaGVhZGVyQ29udGVudCI6InBhZ2UiLCJ0aXRsZUJhclN0eWxlIjoiZGVmYXVsdCIsInNob3dSZWNvbm5lY3ROb3RpZmljYXRpb24iOnRydWUsIm5vdGlmaWNhdGlvbkRpc3BsYXlUaW1lIjo1LCJzaG93RGlzY29ubmVjdE5vdGlmaWNhdGlvbiI6dHJ1ZSwiYWxsb3dJbnN0YWxsIjp0cnVlfSx7ImlkIjoiZjFlYjk5YjFlNzE0ZDQxMSIsInR5cGUiOiJ1aS1wYWdlIiwibmFtZSI6IlBhZ2UgTmFtZSIsInVpIjoiYWZlYTA0Y2U4NzM1YzBhNiIsInBhdGgiOiIvcGFnZTEiLCJpY29uIjoiaG9tZSIsImxheW91dCI6ImdyaWQiLCJ0aGVtZSI6IjkzODIyYTdiNDM2NzNjNTgiLCJicmVha3BvaW50cyI6W3sibmFtZSI6IkRlZmF1bHQiLCJweCI6IjAiLCJjb2xzIjoiMyJ9LHsibmFtZSI6IlRhYmxldCIsInB4IjoiNTc2IiwiY29scyI6IjYifSx7Im5hbWUiOiJTbWFsbCBEZXNrdG9wIiwicHgiOiI3NjgiLCJjb2xzIjoiOSJ9LHsibmFtZSI6IkRlc2t0b3AiLCJweCI6IjEwMjQiLCJjb2xzIjoiMTIifV0sIm9yZGVyIjoxLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UifSx7ImlkIjoiOTM4MjJhN2I0MzY3M2M1OCIsInR5cGUiOiJ1aS10aGVtZSIsIm5hbWUiOiJEZWZhdWx0IFRoZW1lIiwiY29sb3JzIjp7InN1cmZhY2UiOiIjMDBhM2Q3IiwicHJpbWFyeSI6IiMwMDk0Y2UiLCJiZ1BhZ2UiOiIjZWVlZWVlIiwiZ3JvdXBCZyI6IiNmZmZmZmYiLCJncm91cE91dGxpbmUiOiIjY2NjY2NjIn0sInNpemVzIjp7ImRlbnNpdHkiOiJkZWZhdWx0IiwicGFnZVBhZGRpbmciOiIxMnB4IiwiZ3JvdXBHYXAiOiIxMnB4IiwiZ3JvdXBCb3JkZXJSYWRpdXMiOiI0cHgiLCJ3aWRnZXRHYXAiOiIxMnB4In19LHsiaWQiOiJiNWI4YmZiZTU2Yzg3NjA1IiwidHlwZSI6Imdsb2JhbC1jb25maWciLCJlbnYiOltdLCJtb2R1bGVzIjp7IkBzdW1pdF9zaGluZGVfODQvbm9kZS1yZWQtY29udHJpYi1zaW1wbGUtb2NyIjoiMC4xLjEiLCJAc3VtaXRfc2hpbmRlXzg0L25vZGUtcmVkLWRhc2hib2FyZC0yLXVpLXdlYmNhbSI6IjEuMS4yIiwiQGZsb3dmdXNlL25vZGUtcmVkLWRhc2hib2FyZCI6IjEuMjkuMCJ9fV0="
---
::



If you want to fully automate this process, you can set up a fixed camera positioned where products pass through on the production line. This approach eliminates manual scanning, but it will require proper camera mounting, lighting setup, and trigger mechanisms to capture images at the right moment as products move past the camera.

Furthermore, you can push scanned label data to a database. The easiest way to do this is using [FlowFuse Tables](/blog/2025/08/getting-started-with-flowfuse-tables/), which is a built-in database service managed by FlowFuse. You'll find the **query** node in the palette that not only simplifies setup by connecting to the FlowFuse Tables database without any setup, it also has access to the integrated FlowFuse Expert, allowing you to [generate queries using natural language](/blog/2025/09/ai-assistant-flowfuse-tables/) — no SQL skills required!

## What's Next?

You've just built a working OCR system that turns any mobile device into a label scanner. It captures images, reads text, validates the data, and gives instant feedback—all without writing hundreds of lines of code.

This is just the starting point. Your system can grow with your needs: connect it to your inventory database, add support for different label formats, set up multiple scanning stations, or integrate it with your existing ERP system. The foundation is there.

Also, this OCR scanner is just one piece of what's possible with FlowFuse. Imagine connecting all your manufacturing systems—machine data, quality checks, inventory tracking, production metrics—into a unified industrial data platform where everything flows together seamlessly.

FlowFuse helps manufacturers like you break down data silos and build connected, intelligent operations. From shop floor to top floor, your data works together.

**See it in action.** [Book a demo](/book-demo/) and discover how FlowFuse can transform your entire facility—not just your label scanning.

Or start building today with our [14-day free trial](https://app.flowfuse.com/).
