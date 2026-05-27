---
title: 'Statistical Process Control (SPC): Benefits and Implementation Guide'
navTitle: 'Statistical Process Control (SPC): Benefits and Implementation Guide'
---

Leading manufacturers are quietly saving thousands, sometimes millions, of dollars annually with a quality control method that's been proven since the 1920s. The difference today? Modern tools make it simple to implement.

<!--more-->

Consider this real example: A manufacturer shared on Practical Machinist forum that they process 400,000 parts per year with a 4% scrap rate. That's 16,000 parts discarded annually. At even a conservative $10 per part, this represents $160,000 in direct losses from a single production line. They accepted this as normal because industry reports confirm 4-5% scrap rates are standard.

What separates industry leaders from the rest? They refuse to accept "normal" waste. Using Statistical Process Control (SPC), they detect problems as they occur, not after producing defective parts. When a process begins drifting, they receive immediate alerts and correct it before generating scrap.

This guide shows you exactly how to build a real-time SPC system using FlowFuse. You'll create a live dashboard that tracks measurements and alerts operators the moment something goes wrong. No statistics degree needed, just practical steps you can implement today.

## Why Traditional Quality Control Falls Short                   

Most manufacturers still rely on end-of-line inspection. Make parts, check parts, scrap the bad ones. This reactive approach creates three expensive problems:

**Problem 1: You're always too late**
When inspection finds a defect, you've already invested in material, machine time, labor, and energy. That investment is now scrap. Worse, how many parts did you make between when the problem started and when you caught it?

**Problem 2: The borderline parts you miss**
Not all defects are obvious. Parts that barely pass inspection today might fail in the field tomorrow. These marginal parts slip through because traditional inspection only catches clear failures, not process degradation.

**Problem 3: No insight into root causes**
Finding bad parts tells you nothing about why they're bad. Was it temperature drift? Tool wear? Material variation? Without process data, you're guessing at solutions.

**The Proactive Alternative: Statistical Process Control**

SPC flips the entire approach. Instead of checking parts after production, it monitors your process during production. The NIST Engineering Statistics Handbook explains it simply:

> "The underlying concept of statistical process control is based on a comparison of what is happening today with what happened previously."

When your process starts to drift from its normal behavior, SPC alerts you immediately. You fix the issue before making defective parts, not after.

Walter Shewhart developed this method at Bell Labs in the 1920s, proving its effectiveness across industries. Today, FlowFuse makes it accessible to any manufacturer, regardless of size or technical expertise.

## Building Your First SPC System with FlowFuse

Let's build a real example. This guide shows you how to create a SPC control chart for individual measurements - perfect for monitoring critical dimensions in real-time.

First, open your FlowFuse Node-RED instance. If you don't have one yet, you can [sign up for a free account](https://app.flowfuse.com/account/create) and have an instance running in minutes.

### What We're Building

A real-time SPC control chart that monitors individual measurements and automatically calculates control limits. Perfect for scenarios where you measure one part at a time - like bearing dimensions on a CNC line. When measurements drift outside the calculated limits, you'll know instantly.

### Step 1: Get Your Tools Ready

First, we need two nodes for SPC monitoring.

1. Open FlowFuse's palette manager (hamburger menu → Manage palette)

2. Go to the Install tab

3. Search for and install these nodes:
   - `node-red-contrib-simple-spc` - This is your statistics engine
   - `@flowfuse/node-red-dashboard` - For that slick real-time chart

4. Click Install for each node and wait for completion

### Step 2: Simulate Your Machine Data

In production, you'd connect to your PLC. For now, let's simulate a bearing measurement around 10mm nominal.

1. Drag an **inject** node onto your canvas. This is your "sensor."

2. Double-click it and set:
   - Repeat: `interval` → `2 seconds` (mimics real sensor timing)
   - Payload: switch to JSONata mode and enter: `$random() * 0.2 + 10`

This generates readings like 10.05, 9.98, 10.11 - realistic variation around 10mm.

### Step 3: Add the Statistical Brain

Find the **spc** node in your palette (it'll be under "function" category after install).

1. Drag it over and wire your inject node to it.

2. Double-click to configure:
   - Control Limit Multiplier: `3` (for 3-sigma limits)
   - Timer: `10` (seconds before alerting out-of-control)
  
Once configured, the node outputs an object like this:

```javascript
{
    value: 10.020214950604476,      // Current measurement
    avg: 10.089877376434453,         // Running average
    ucl: 10.344067494423967,         // Upper control limit
    lcl: 9.835687258444938,          // Lower control limit
    outOfControl: false              // Alert status
}
```

### Step 4: Make the Data Chart-Ready

Charts need data in a specific format. Add a **change** node between SPC and your chart.

1. Drag a **change** node onto the canvas

2. Wire it between the SPC node and where your chart will go

3. Double-click to configure and set one rule: `Set msg.payload` to this JSONata expression:
```json
[
    {"series": "Measurement", "x": $millis(), "y": payload.value},
    {"series": "UCL", "x": $millis(), "y": payload.ucl},
    {"series": "LCL", "x": $millis(), "y": payload.lcl},
    {"series": "Average", "x": $millis(), "y": payload.avg}
]
```

This creates four lines on your chart, your actual measurements plus the three control lines.

### Step 5: Build Your Control Room Dashboard

Now we'll create the dashboard that displays your SPC control chart. This is what operators will watch to spot problems in real-time.

1. Drag a **chart** widget from the dashboard section and set:
   - Type: `Line Chart` 
   - X-axis: `HH:mm:ss` (shows time)
   - Series: Set to `series` (as key)
   - X: Set to `x` (as key)
   - Y: Set to `y` (as key)
   - Legend: `Show`
   - Label: "SPC Chart: Bearing Diameter (mm)"

2. Connect the change node to it.

3. Deploy the flow.

![Node-RED flow showing SPC monitoring setup with inject node, SPC calculations, data formatting, and dashboard chart configuration](/blog/2025/07/images/spc.png){data-zoomable}
_Complete SPC monitoring flow with real-time chart display_

### Step 6: Add the Alert System

A chart is nice, but you need immediate alerts. Here's the clever bit:

1. Add a **switch** node connected to your SPC output

2. Set it to check `msg.payload.outOfControl`

3. Create two outputs: true and false

4. Now add a **text** nodes from dashboard. Wire it to your switch outputs.

For the "true" path, set the text to something attention-grabbing using change node:
`⚠️ PROCESS OUT OF CONTROL - CHECK MACHINE!`

For the "false" path:
`✓ Process Stable`

5. Deploy the flow.

![Node-RED alert system with switch node: Process stable](/blog/2025/07/images/spc-visual-alert.png){data-zoomable}
_Node-RED alert system with switch node: Process stable_

### Step 7: Test Your SPC System

Open your dashboard (switch to the Dashboard 2.0 tab → click Open Dashboard button on the top-right of the right sidebar).

**What you'll see initially:**
- First 20 measurements: Chart builds up baseline data
- After 20 points: Control limits appear automatically
- Blue line bouncing between red lines: Process is stable

Let the system run for a minute to establish your baseline. The control limits aren't arbitrary - they're calculated from your actual process data.

**Now test it with a simulated process shift:**

1. Double-click the Inject node

2. Change the formula to `$random() * 0.2 + 10.5` (this shifts the mean up by 0.5mm)

3. Click Done to close the node

4. Deploy only the modified nodes:
   - Click the down arrow next to the **Deploy** button
   - Select **Modified Nodes**
   - Click the **Deploy** button 

![Node-RED deploy menu showing Modified Nodes option for selective deployment](/blog/2025/07/images/modifed-nodes-deploy.png){data-zoomable}
_Deploy menu with Modified Nodes option for updating only changed nodes_

Once done You will see the chart detect the change within seconds.

![SPC chart showing process shift with measurements exceeding upper control limit and alert triggered](/blog/2025/07/images/spc-visual-alert2.png){data-zoomable}
_SPC chart detecting process shift - measurements above UCL trigger immediate alert_



::render-flow
---
height: 300
flow: "W3siaWQiOiIxMjRmNTMxMzY1YjgyZTFjIiwidHlwZSI6Imdyb3VwIiwieiI6IjA3MTUyNGE4ZmQ0ODIxMTYiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyI0MDgyZjg5NjA1NzkzNjY2IiwiMmVjODM1MWYwMWY5NTdhNCIsImM5MGQ2N2M1N2QxYWYzYmQiLCI1M2VmODQ5YTQxYWVlMmIzIiwiZDc4ZmYzZGJlOTdhNWJlOSIsIjk4ZTc2NjE2YzI4ZWQ5Y2EiLCI1ZmQzNDE1ZWY0YzM2YjZlIiwiOTc2MzYzMjYwNmMyYTE2NSJdLCJ4IjoyMTQsInkiOjE1OSwidyI6ODcyLCJoIjoxNjJ9LHsiaWQiOiI0MDgyZjg5NjA1NzkzNjY2IiwidHlwZSI6ImluamVjdCIsInoiOiIwNzE1MjRhOGZkNDgyMTE2IiwiZyI6IjEyNGY1MzEzNjViODJlMWMiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIyIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiJHJhbmRvbSgpICogMC4yICsgMTAuNSIsInBheWxvYWRUeXBlIjoianNvbmF0YSIsIngiOjMxMCwieSI6MjQwLCJ3aXJlcyI6W1siMmVjODM1MWYwMWY5NTdhNCJdXX0seyJpZCI6IjJlYzgzNTFmMDFmOTU3YTQiLCJ0eXBlIjoic3BjIiwieiI6IjA3MTUyNGE4ZmQ0ODIxMTYiLCJnIjoiMTI0ZjUzMTM2NWI4MmUxYyIsIm5hbWUiOiIiLCJsaW1pdE11bHRpcGxpZXIiOiIzIiwidGltZXIiOiIxMCIsIngiOjQzMCwieSI6MjQwLCJ3aXJlcyI6W1siYzkwZDY3YzU3ZDFhZjNiZCIsImQ3OGZmM2RiZTk3YTViZTkiXV19LHsiaWQiOiJjOTBkNjdjNTdkMWFmM2JkIiwidHlwZSI6ImNoYW5nZSIsInoiOiIwNzE1MjRhOGZkNDgyMTE2IiwiZyI6IjEyNGY1MzEzNjViODJlMWMiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJbICAgICB7XCJzZXJpZXNcIjogXCJNZWFzdXJlbWVudFwiLCBcInhcIjogJG1pbGxpcygpLCBcInlcIjogcGF5bG9hZC52YWx1ZX0sICAgICB7XCJzZXJpZXNcIjogXCJVQ0xcIiwgXCJ4XCI6ICRtaWxsaXMoKSwgXCJ5XCI6IHBheWxvYWQudWNsfSwgICAgIHtcInNlcmllc1wiOiBcIkxDTFwiLCBcInhcIjogJG1pbGxpcygpLCBcInlcIjogcGF5bG9hZC5sY2x9LCAgICAge1wic2VyaWVzXCI6IFwiQXZlcmFnZVwiLCBcInhcIjogJG1pbGxpcygpLCBcInlcIjogcGF5bG9hZC5hdmd9IF0iLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjYwMCwieSI6MjAwLCJ3aXJlcyI6W1siNTNlZjg0OWE0MWFlZTJiMyJdXX0seyJpZCI6IjUzZWY4NDlhNDFhZWUyYjMiLCJ0eXBlIjoidWktY2hhcnQiLCJ6IjoiMDcxNTI0YThmZDQ4MjExNiIsImciOiIxMjRmNTMxMzY1YjgyZTFjIiwiZ3JvdXAiOiIzYWYyMWNmMmNlYTYzOGM4IiwibmFtZSI6IiIsImxhYmVsIjoiSS1NUiBDaGFydDogQmVhcmluZyBEaWFtZXRlciAobW0pIiwib3JkZXIiOjEsImNoYXJ0VHlwZSI6ImxpbmUiLCJjYXRlZ29yeSI6InNlcmllcyIsImNhdGVnb3J5VHlwZSI6InByb3BlcnR5IiwieEF4aXNMYWJlbCI6IiIsInhBeGlzUHJvcGVydHkiOiJ4IiwieEF4aXNQcm9wZXJ0eVR5cGUiOiJwcm9wZXJ0eSIsInhBeGlzVHlwZSI6InRpbWUiLCJ4QXhpc0Zvcm1hdCI6IiIsInhBeGlzRm9ybWF0VHlwZSI6ImF1dG8iLCJ4bWluIjoiIiwieG1heCI6IiIsInlBeGlzTGFiZWwiOiIiLCJ5QXhpc1Byb3BlcnR5IjoieSIsInlBeGlzUHJvcGVydHlUeXBlIjoicHJvcGVydHkiLCJ5bWluIjoiIiwieW1heCI6IiIsImJpbnMiOjEwLCJhY3Rpb24iOiJhcHBlbmQiLCJzdGFja1NlcmllcyI6ZmFsc2UsInBvaW50U2hhcGUiOiJjaXJjbGUiLCJwb2ludFJhZGl1cyI6NCwic2hvd0xlZ2VuZCI6dHJ1ZSwicmVtb3ZlT2xkZXIiOjEsInJlbW92ZU9sZGVyVW5pdCI6IjM2MDAiLCJyZW1vdmVPbGRlclBvaW50cyI6IiIsImNvbG9ycyI6WyIjMDA5NWZmIiwiI2ZmMDAwMCIsIiNmZjdmMGUiLCIjMmNhMDJjIiwiI2EzNDdlMSIsIiNkNjI3MjgiLCIjZmY5ODk2IiwiIzk0NjdiZCIsIiNjNWIwZDUiXSwidGV4dENvbG9yIjpbIiM2NjY2NjYiXSwidGV4dENvbG9yRGVmYXVsdCI6dHJ1ZSwiZ3JpZENvbG9yIjpbIiNlNWU1ZTUiXSwiZ3JpZENvbG9yRGVmYXVsdCI6dHJ1ZSwid2lkdGgiOiIxMiIsImhlaWdodCI6IjciLCJjbGFzc05hbWUiOiIiLCJpbnRlcnBvbGF0aW9uIjoibGluZWFyIiwieCI6ODQwLCJ5IjoyMDAsIndpcmVzIjpbW11dfSx7ImlkIjoiZDc4ZmYzZGJlOTdhNWJlOSIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiMDcxNTI0YThmZDQ4MjExNiIsImciOiIxMjRmNTMxMzY1YjgyZTFjIiwibmFtZSI6IiIsInByb3BlcnR5IjoicGF5bG9hZC5vdXRPZkNvbnRyb2wiLCJwcm9wZXJ0eVR5cGUiOiJtc2ciLCJydWxlcyI6W3sidCI6InRydWUifSx7InQiOiJmYWxzZSJ9XSwiY2hlY2thbGwiOiJ0cnVlIiwicmVwYWlyIjpmYWxzZSwib3V0cHV0cyI6MiwieCI6NTcwLCJ5IjoyNjAsIndpcmVzIjpbWyI5OGU3NjYxNmMyOGVkOWNhIl0sWyI1ZmQzNDE1ZWY0YzM2YjZlIl1dfSx7ImlkIjoiOThlNzY2MTZjMjhlZDljYSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiMDcxNTI0YThmZDQ4MjExNiIsImciOiIxMjRmNTMxMzY1YjgyZTFjIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoi4pqg77iPIFBST0NFU1MgT1VUIE9GIENPTlRST0wgLSBDSEVDSyBNQUNISU5FISIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo3ODAsInkiOjI0MCwid2lyZXMiOltbIjk3NjM2MzI2MDZjMmExNjUiXV19LHsiaWQiOiI1ZmQzNDE1ZWY0YzM2YjZlIiwidHlwZSI6ImNoYW5nZSIsInoiOiIwNzE1MjRhOGZkNDgyMTE2IiwiZyI6IjEyNGY1MzEzNjViODJlMWMiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiLinJMgUHJvY2VzcyBTdGFibGUiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NzgwLCJ5IjoyODAsIndpcmVzIjpbWyI5NzYzNjMyNjA2YzJhMTY1Il1dfSx7ImlkIjoiOTc2MzYzMjYwNmMyYTE2NSIsInR5cGUiOiJ1aS10ZXh0IiwieiI6IjA3MTUyNGE4ZmQ0ODIxMTYiLCJnIjoiMTI0ZjUzMTM2NWI4MmUxYyIsImdyb3VwIjoiM2FmMjFjZjJjZWE2MzhjOCIsIm9yZGVyIjoyLCJ3aWR0aCI6MCwiaGVpZ2h0IjowLCJuYW1lIjoiVmlzdWFsIEFsZXJ0IiwibGFiZWwiOiIiLCJmb3JtYXQiOiJ7e21zZy5wYXlsb2FkfX0iLCJsYXlvdXQiOiJjb2wtY2VudGVyIiwic3R5bGUiOnRydWUsImZvbnQiOiJBcmlhbCxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZiIsImZvbnRTaXplIjoiMjQiLCJjb2xvciI6IiM3MTcxNzEiLCJ3cmFwVGV4dCI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsIngiOjk5MCwieSI6MjYwLCJ3aXJlcyI6W119LHsiaWQiOiIzYWYyMWNmMmNlYTYzOGM4IiwidHlwZSI6InVpLWdyb3VwIiwibmFtZSI6Ikdyb3VwIDEiLCJwYWdlIjoiNzM1MTAyZjIyOWYxYTQ1YiIsIndpZHRoIjoiMTIiLCJoZWlnaHQiOiI3Iiwib3JkZXIiOjEsInNob3dUaXRsZSI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSIsImdyb3VwVHlwZSI6ImRlZmF1bHQifSx7ImlkIjoiNzM1MTAyZjIyOWYxYTQ1YiIsInR5cGUiOiJ1aS1wYWdlIiwibmFtZSI6IlNQQyIsInVpIjoiM2MyZTdjNmY0MzgzNDllNCIsInBhdGgiOiIvcGFnZTEiLCJpY29uIjoiaG9tZSIsImxheW91dCI6ImdyaWQiLCJ0aGVtZSI6ImRhZmY4NGI2ZjdmZTFmOTciLCJicmVha3BvaW50cyI6W3sibmFtZSI6IkRlZmF1bHQiLCJweCI6IjAiLCJjb2xzIjoiMyJ9LHsibmFtZSI6IlRhYmxldCIsInB4IjoiNTc2IiwiY29scyI6IjYifSx7Im5hbWUiOiJTbWFsbCBEZXNrdG9wIiwicHgiOiI3NjgiLCJjb2xzIjoiOSJ9LHsibmFtZSI6IkRlc2t0b3AiLCJweCI6IjEwMjQiLCJjb2xzIjoiMTIifV0sIm9yZGVyIjoxLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UifSx7ImlkIjoiM2MyZTdjNmY0MzgzNDllNCIsInR5cGUiOiJ1aS1iYXNlIiwibmFtZSI6Ik15IERhc2hib2FyZCIsInBhdGgiOiIvZGFzaGJvYXJkIiwiYXBwSWNvbiI6IiIsImluY2x1ZGVDbGllbnREYXRhIjp0cnVlLCJhY2NlcHRzQ2xpZW50Q29uZmlnIjpbInVpLW5vdGlmaWNhdGlvbiIsInVpLWNvbnRyb2wiXSwic2hvd1BhdGhJblNpZGViYXIiOmZhbHNlLCJoZWFkZXJDb250ZW50IjoicGFnZSIsIm5hdmlnYXRpb25TdHlsZSI6ImRlZmF1bHQiLCJ0aXRsZUJhclN0eWxlIjoiZGVmYXVsdCIsInNob3dSZWNvbm5lY3ROb3RpZmljYXRpb24iOnRydWUsIm5vdGlmaWNhdGlvbkRpc3BsYXlUaW1lIjoxLCJzaG93RGlzY29ubmVjdE5vdGlmaWNhdGlvbiI6dHJ1ZSwiYWxsb3dJbnN0YWxsIjp0cnVlfSx7ImlkIjoiZGFmZjg0YjZmN2ZlMWY5NyIsInR5cGUiOiJ1aS10aGVtZSIsIm5hbWUiOiJEZWZhdWx0IFRoZW1lIiwiY29sb3JzIjp7InN1cmZhY2UiOiIjZmZmZmZmIiwicHJpbWFyeSI6IiMwMDk0Q0UiLCJiZ1BhZ2UiOiIjZWVlZWVlIiwiZ3JvdXBCZyI6IiNmZmZmZmYiLCJncm91cE91dGxpbmUiOiIjY2NjY2NjIn0sInNpemVzIjp7ImRlbnNpdHkiOiJkZWZhdWx0IiwicGFnZVBhZGRpbmciOiIxMnB4IiwiZ3JvdXBHYXAiOiIxMnB4IiwiZ3JvdXBCb3JkZXJSYWRpdXMiOiI0cHgiLCJ3aWRnZXRHYXAiOiIxMnB4In19XQ=="
---
::



## SPC Chart Rules That Actually Matter

Control limits catch obvious problems. But subtle issues need pattern recognition. Here are the four rules that catch 95% of real problems:

- **Rule 1: Any point outside limits**
This one is fairly obvious:  If a measurement point falls outside of the established upper or lower limits, something is wrong.

- **Rule 2: Seven points on one side**
Seven consecutive points above or below the center line means your process has shifted. Maybe a new material lot, maybe tool wear.

- **Rule 3: Seven points trending**
Seven points in a row going up or down. Classic sign of tool wear or temperature drift.

- **Rule 4: Repeating and Cyclical Patterns**
This rule is for recurring behaviors that the other rules miss. Cycles that repeat over time, like a regular pattern that appears at the start of every shift change or every Monday. Speak with your operators, they will likely know what these mean.

Here's how to implement these rules in FlowFuse:

1. Drag a **Function** node onto the workspace and add the following JavaScript code to it.
2. Replace switch node with this **Function** node.
3. Deploy the flow.

```javascript
const buffer = context.get('measurements') || [];
const current = msg.payload;

// Rule 1: Out-of-control point (handled by SPC node)
if (msg.payload.outOfControl) {
    msg.payload = "⚠️ PROCESS OUT OF CONTROL – CHECK MACHINE!";
    return msg;
}

// Store the current measurement
buffer.push({
    value: current.value,
    avg: current.avg,
    timestamp: new Date()
});

// Keep only the last 20 measurements
if (buffer.length > 20) {
    buffer.shift();
}
context.set('measurements', buffer);

// Initialize alert message
let alertMessage = "✓ Process Stable";

// Check rules if we have enough data
if (buffer.length >= 7) {
    const recent = buffer.slice(-7);
    const values = recent.map(r => r.value);

    // Rule 2: Seven points on one side of the center line
    const allAbove = values.every(v => v > current.avg);
    const allBelow = values.every(v => v < current.avg);
    if (allAbove || allBelow) {
        alertMessage = "⚠️ Process shift detected – 7 points on one side of center";
    }

    // Rule 3: Seven points trending up or down
    let trending = true;
    const increasing = values[1] > values[0];
    for (let i = 2; i < values.length; i++) {
        if ((increasing && values[i] <= values[i - 1]) ||
            (!increasing && values[i] >= values[i - 1])) {
            trending = false;
            break;
        }
    }
    if (trending) {
        alertMessage = increasing
            ? "⚠️ Increasing trend – check for tool wear"
            : "⚠️ Decreasing trend – check material quality";
    }
}

msg.payload = alertMessage;
return msg;
```

The following image demonstrates the advanced alerting system in action, detecting specific patterns beyond simple control limit violations:

![SPC system detecting process drift in real-time, showing chart responding to simulated measurement changes and triggering alerts](/blog/2025/07/images/simulated-drift-alert.gif){data-zoomable}
_Real-time SPC monitoring detecting process drift and triggering appropriate alerts based on trend analysis_

## Connecting to Real Equipment

Time to connect your actual machines. The approach depends on what equipment you have.

For modern PLCs - anything from the last decade like Siemens S7-1200/1500, Allen-Bradley ControlLogix, or Omron NX - you'll use OPC UA. It's already built into these PLCs. Enable it in the configuration, install `node-red-contrib-opcua` from the FlowFuse palette, and point it at your PLC. The endpoint looks like `opc.tcp://192.168.1.100:4840`. Browse for your measurement tags and connect them to your SPC flow. [Full OPC UA guide here](/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/).

Older equipment speaks Modbus TCP. Check your manual's appendix for the register map. Install `node-red-contrib-modbus`, configure it with your device's IP address and the register holding your measurement (like 40001 for holding registers). Almost every industrial device from the last 30 years supports this. [Modbus tutorial here](/node-red/protocol/modbus/).

For everything else, get creative. Old gauges with RS-232 ports work fine with a USB adapter and the serial node - [see our serial port guide](/blog/2025/07/connect-legacy-equipment-serial-flowfuse/). Machines that dump CSV files can be monitored with the watch node. Manual measurements need just a simple dashboard form, one input field, one submit button. Don't overcomplicate it.

Before connecting to SPC, always test with inject → protocol node → debug to make sure data flows. Once you see measurements in the debug panel, wire it to your SPC node and you're monitoring real processes.

## The Money You're Leaving on the Table

Remember that manufacturer from the forum processing 400,000 parts annually with a 4% scrap rate? That's 16,000 parts straight to the trash. At just $10 per part, that's $160,000 in annual waste. Cut that rate to 2% with SPC and you save $80,000 yearly.

But here's what most people miss - the $10 part cost is just the beginning. Consider what every defective part also burned through:
- **Machine time**: Say 3 minutes at $200/hour = another $10 gone
- **Labor**: About 15 minutes handling the defect at $30/hour = $7.50 more
- **Materials**: The raw stock you'll never get back

That "$10 part" actually cost you around $27.50 to scrap. Those 16,000 defects? Try $440,000 in real losses.

SPC attacks all of this simultaneously. When your process stays in control, you're not just saving parts - you're saving machine capacity, labor hours, and materials. Plus stable processes need less inspection, letting you redeploy quality staff to improvement projects instead of firefighting.

**Quick ROI calculation**: Take your annual defect count, multiply by your true cost per defect (part + machine + labor), then multiply by 0.5 for a conservative estimate. That's your yearly savings potential with SPC. Most manufacturers see payback in under 3 months.

SPC works. It's not magic, it's not complicated, and it doesn't have to be expensive. It's just math applied to manufacturing data in real-time.

The tools exist. Node-RED gets you started, but FlowFuse keeps you running in production. With built-in high availability, your SPC charts stay live even if a server fails. Multiple engineers can work on the same flows without conflicts. Deploy updates to 50 production lines with one click. When downtime costs thousands per hour, you need a platform built for manufacturing.

## Start Preventing Defects Today

Every day without SPC is money left on the table. Those 16,000 scrapped parts per year? The warranty claims from undetected drift? All preventable.

Here's your path to production-ready SPC:

1. **[Start Free with FlowFuse](https://app.flowfuse.com/account/create)** - Get your instance running in minutes
2. **Follow this tutorial** - Build your first SPC chart today
3. **Connect one machine** - Start with your most critical measurement
4. **Expand gradually** - Add more parameters as you prove value

Don't wait for the perfect plan. Don't form another committee. Pick one measurement that matters and start monitoring it today. Need help getting started? [Book a demo](/book-demo/) to discuss your specific requirements or [contact our team](/contact-us/) for enterprise deployment guidance.

Because somewhere right now, one of your machines is drifting out of spec. The only question is whether you'll catch it in time.

**[Build Your First SPC Dashboard Now →](https://app.flowfuse.com/account/create)**

## References

1. [Six Sigma Online - Statistical Process Control](https://www.sixsigmaonline.org/six-sigma-statistical-process-control/) - Background on manufacturers saving thousands with quality control methods
2. [Practical Machinist Forum - Scrap Rates Discussion](https://www.practicalmachinist.com/forum/threads/scrap-rates.234251/) - Real manufacturer example: 400,000 parts/year with 4% scrap rate
3. [ServiceChannel - Industry Scrap Rate Report](https://servicechannel.com/reports/scrap-rate/) - Industry data confirming 4-5% scrap rates are standard
4. [NIST Engineering Statistics Handbook - Statistical Process Control](https://www.itl.nist.gov/div898/handbook/pmc/section1/pmc12.htm) - Official definition and explanation of SPC principles
5. [Walter Shewhart - Wikipedia](https://en.wikipedia.org/wiki/Walter_A._Shewhart) - SPC creator at Bell Labs in the 1920s
