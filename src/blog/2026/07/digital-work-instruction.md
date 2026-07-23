---
title: "Building Digital Work Instructions for the Shop Floor"
subtitle: ""
description: ""
date: 2026-07-08
authors: ["sumit-shinde"]
image: https://placehold.co/1200x630/eef2f7/475569?text=Digital+Work+Instructions
tags:
  - flowfuse
---

An operator walks up to a station and needs to know what to build, how to build it, and what to do when something breaks. Digital work instructions put all of that on a screen, guided steps, a checklist, and buttons to finish or flag a defect, and retire the paper binder for good.

But a screen that guides work raises a question paper never had to: who's using it? Stations get shared across shifts, and if the app can't tell operators apart, the work order, the current step, and the record of what happened all blur together.

Authentication draws the line. Log the operator in, and their identity becomes the thread the app hangs on, the work orders they see, the step they resume at, and the name on every operation they finish and every defect they raise.

In this article, we'll build a digital work instructions application using FlowFuse. We'll create a simple operator interface that displays work orders, guides assembly with step-by-step instructions, allows defects to be reported, and shows how authentication enables traceability across shared production stations.

You can interact with the live demo here: **[Try the Digital Work Instructions Demo](https://expensive-pied-flycatcher-5052.flowfuse.cloud/dashboard/home)**.

## What You'll Need

Before you start building, get these ready:

- **A FlowFuse account.** [Sign up](https://app.flowfuse.com/account/create) for FlowFuse Cloud, or use a self-hosted instance.
- **A FlowFuse instance up and running.** If you don't have one yet, create a new instance from your FlowFuse Platform.
- **FlowFuse Dashboard installed.** This tutorial uses `@flowfuse/node-red-dashboard` nodes (`ui-template`, `ui-table`, `ui-form`, `ui-button`, `ui-control`, `ui-event`, `ui-text`) to build the operator interface. Install it from the Palette Manager if it isn't already in your instance.
- **The FlowFuse Dashboard user addon.** This is what attaches the logged-in user to every dashboard message. We'll install it in the first section.

> Note: The Multi-User addon is available to Teams and Enterprise Self-Hosted customers. If you're on a different tier, [contact us](/contact-us/) for the configuration to get started.

## How the Application Works

Before we build anything, let's walk through what the app does and how the pieces fit together. There are three pages, and one idea holding them together.

1. **Home.** After logging in, the application uses the operator's username to retrieve only the work orders assigned to them from the ERP or MES. It displays their station, production summary, the highest-priority work order, and the remaining queue. Selecting **Start Work Order** opens the instructions.
2. **Instructions.** Operators follow step-by-step instructions with images, checklists, and target cycle times. They can progress through each step, complete the operation, or report an issue at any time.
3. **Report Issue.** Operators can quickly log defects by selecting the issue type, severity, affected part, and description, with the issue automatically linked to the current work order.

![Placeholder: overview diagram of the Home, Instructions, and Report Issue pages and how they connect](https://placehold.co/1200x600/eef2f7/475569?text=App+Overview%3A+Home+%E2%86%92+Instructions+%E2%86%92+Report+Issue) *A quick overview of the three pages and how an operator moves between them.*

The logged-in username acts as the application's lookup key. It retrieves the operator's assigned work orders and stores their active work order and current step, allowing them to resume exactly where they left off, even on shared production stations.

## Importing the Simulated Flow

Instead of connecting to a real ERP or MES, we'll use a simple simulated backend that serves sample work orders through an HTTP API.

1. Import the following flow into FlowFuse and click **Deploy**.

{% renderFlow 300 %}
[{"id":"83cd1b1c4cc8e310","type":"group","z":"3012f9c2796b5b41","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["40f06650e63decd4","e2029fe905afc20a","5a2c1cb7932accb9","f2334a5d527a684a","f65db363fdde0eba","cdda81f6a2701b7c","8554ad9dfdb36f54","6dd109a105da5dd5","439862e5c86675cd","9d853fad37785bec","3506d88cd094d44c","wo_stats_http_in","wo_stats_func","wo_stats_response"],"x":44,"y":59,"w":652,"h":482},{"id":"40f06650e63decd4","type":"inject","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":170,"y":100,"wires":[["e2029fe905afc20a"]]},{"id":"e2029fe905afc20a","type":"change","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"","rules":[{"t":"set","p":"#:(persistent)::workOrders","pt":"global","to":"[{\"workOrderId\":\"WO-10245\",\"stationId\":\"ST12\",\"status\":\"Ready\",\"priority\":\"High\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567890\",\"model\":\"Sedan X\",\"variant\":\"Premium\",\"color\":\"White\"},\"operation\":{\"operationId\":\"OP_WHEEL_FL\",\"name\":\"Install Front Left Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS001\"}},{\"workOrderId\":\"WO-10246\",\"stationId\":\"ST12\",\"status\":\"Waiting\",\"priority\":\"Normal\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567891\",\"model\":\"SUV Y\",\"variant\":\"Standard\",\"color\":\"Black\"},\"operation\":{\"operationId\":\"OP_WHEEL_FR\",\"name\":\"Install Front Right Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS002\"}},{\"workOrderId\":\"WO-10247\",\"stationId\":\"ST12\",\"status\":\"Queued\",\"priority\":\"Low\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567892\",\"model\":\"Sedan X\",\"variant\":\"Sport\",\"color\":\"Red\"},\"operation\":{\"operationId\":\"OP_WHEEL_FL\",\"name\":\"Install Front Left Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS001\"}},{\"workOrderId\":\"WO-10248\",\"stationId\":\"ST12\",\"status\":\"Ready\",\"priority\":\"Critical\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567893\",\"model\":\"Truck Z\",\"variant\":\"Heavy Duty\",\"color\":\"Blue\"},\"operation\":{\"operationId\":\"OP_WHEEL_FR\",\"name\":\"Install Front Right Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS002\"}},{\"workOrderId\":\"WO-10249\",\"stationId\":\"ST12\",\"status\":\"Waiting\",\"priority\":\"Normal\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567894\",\"model\":\"Hatchback W\",\"variant\":\"Base\",\"color\":\"Silver\"},\"operation\":{\"operationId\":\"OP_WHEEL_FL\",\"name\":\"Install Front Left Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS001\"}},{\"workOrderId\":\"WO-10250\",\"stationId\":\"ST12\",\"status\":\"Ready\",\"priority\":\"High\",\"assignedTo\":\"operator4\",\"vehicle\":{\"vin\":\"MH01AB1234567895\",\"model\":\"SUV Y\",\"variant\":\"Premium\",\"color\":\"Grey\"},\"operation\":{\"operationId\":\"OP_WHEEL_FR\",\"name\":\"Install Front Right Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS002\"}},{\"workOrderId\":\"WO-10251\",\"stationId\":\"ST12\",\"status\":\"Waiting\",\"priority\":\"Normal\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567896\",\"model\":\"Sedan X\",\"variant\":\"Standard\",\"color\":\"Blue\"},\"operation\":{\"operationId\":\"OP_WHEEL_FL\",\"name\":\"Install Front Left Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS001\"}},{\"workOrderId\":\"WO-10252\",\"stationId\":\"ST12\",\"status\":\"Queued\",\"priority\":\"Low\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567897\",\"model\":\"Truck Z\",\"variant\":\"Standard\",\"color\":\"White\"},\"operation\":{\"operationId\":\"OP_WHEEL_FR\",\"name\":\"Install Front Right Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS002\"}},{\"workOrderId\":\"WO-10253\",\"stationId\":\"ST12\",\"status\":\"Ready\",\"priority\":\"Critical\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567898\",\"model\":\"Hatchback W\",\"variant\":\"Sport\",\"color\":\"Yellow\"},\"operation\":{\"operationId\":\"OP_WHEEL_FL\",\"name\":\"Install Front Left Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS001\"}},{\"workOrderId\":\"WO-10254\",\"stationId\":\"ST12\",\"status\":\"Waiting\",\"priority\":\"Normal\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567899\",\"model\":\"SUV Y\",\"variant\":\"Base\",\"color\":\"Black\"},\"operation\":{\"operationId\":\"OP_WHEEL_FR\",\"name\":\"Install Front Right Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS002\"}},{\"workOrderId\":\"WO-10255\",\"stationId\":\"ST12\",\"status\":\"Ready\",\"priority\":\"High\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567900\",\"model\":\"Sedan X\",\"variant\":\"Premium\",\"color\":\"Red\"},\"operation\":{\"operationId\":\"OP_WHEEL_FL\",\"name\":\"Install Front Left Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS001\"}},{\"workOrderId\":\"WO-10256\",\"stationId\":\"ST12\",\"status\":\"Waiting\",\"priority\":\"Normal\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567901\",\"model\":\"Truck Z\",\"variant\":\"Heavy Duty\",\"color\":\"Green\"},\"operation\":{\"operationId\":\"OP_WHEEL_FR\",\"name\":\"Install Front Right Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS002\"}},{\"workOrderId\":\"WO-10257\",\"stationId\":\"ST12\",\"status\":\"Ready\",\"priority\":\"High\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567902\",\"model\":\"SUV Y\",\"variant\":\"Sport\",\"color\":\"White\"},\"operation\":{\"operationId\":\"OP_WHEEL_FL\",\"name\":\"Install Front Left Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS001\"}},{\"workOrderId\":\"WO-10258\",\"stationId\":\"ST12\",\"status\":\"Waiting\",\"priority\":\"Normal\",\"assignedTo\":\"sumitshindeflowfuse\",\"vehicle\":{\"vin\":\"MH01AB1234567903\",\"model\":\"Sedan X\",\"variant\":\"Standard\",\"color\":\"Black\"},\"operation\":{\"operationId\":\"OP_WHEEL_FR\",\"name\":\"Install Front Right Wheel\",\"estimatedCycleTime\":45,\"instructionSetId\":\"INS002\"}}]","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":440,"y":100,"wires":[[]]},{"id":"5a2c1cb7932accb9","type":"http in","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"GET Work Orders","url":"/workorders","method":"get","upload":false,"skipBodyParsing":false,"swaggerDoc":"","x":160,"y":300,"wires":[["f2334a5d527a684a"]]},{"id":"f2334a5d527a684a","type":"function","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"Generate Work Orders","func":"const stationId = msg.req.query.stationId;\n\nconst workOrders = global.get('workOrders', 'persistent') || [];\n\nconst result = workOrders.filter(w =>\n    w.stationId === stationId &&\n    w.status !== 'defect' &&\n    w.status !== 'completed'\n);\n\nmsg.payload = result;\n\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":400,"y":300,"wires":[["f65db363fdde0eba"]]},{"id":"f65db363fdde0eba","type":"http response","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"","statusCode":"","headers":{"Content-Type":"application/json"},"x":610,"y":300,"wires":[]},{"id":"cdda81f6a2701b7c","type":"http in","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"POST Mark Defect","url":"/workorders/defect","method":"post","upload":false,"skipBodyParsing":false,"swaggerDoc":"","x":160,"y":400,"wires":[["8554ad9dfdb36f54"]]},{"id":"8554ad9dfdb36f54","type":"function","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"Mark Defect","func":"const { workOrderId, issueType, severity, affectedPart, description } = msg.payload || {};\n\nif (!workOrderId || !issueType || !severity || !affectedPart) {\n    msg.statusCode = 400;\n    msg.payload = { error: 'workOrderId, issueType, severity, and affectedPart are required' };\n    return msg;\n}\n\nconst workOrders = global.get('workOrders', 'persistent') || [];\nconst idx = workOrders.findIndex(w => w.workOrderId === workOrderId);\n\nif (idx === -1) {\n    msg.statusCode = 404;\n    msg.payload = { error: 'Work order not found' };\n    return msg;\n}\n\nworkOrders[idx].status = 'defect';\nworkOrders[idx].defect = {\n    issueType,\n    severity,\n    affectedPart,\n    description: description || null,\n    reportedAt: new Date().toISOString()\n};\n\nglobal.set('workOrders', workOrders, 'persistent');\n\nmsg.statusCode = 200;\nmsg.payload = { success: true, workOrder: workOrders[idx] };\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":400,"y":400,"wires":[["6dd109a105da5dd5"]]},{"id":"6dd109a105da5dd5","type":"http response","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"","statusCode":"","headers":{"Content-Type":"application/json"},"x":610,"y":400,"wires":[]},{"id":"439862e5c86675cd","type":"http in","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"POST Complete Order","url":"/workorders/complete","method":"post","upload":false,"skipBodyParsing":false,"swaggerDoc":"","x":170,"y":500,"wires":[["9d853fad37785bec"]]},{"id":"9d853fad37785bec","type":"function","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"Complete Work Order","func":"const { workOrderId } = msg.payload || {};\n\nif (!workOrderId) {\n    msg.statusCode = 400;\n    msg.payload = { error: 'workOrderId is required' };\n    return msg;\n}\n\nconst workOrders = global.get('workOrders', 'persistent') || [];\nconst idx = workOrders.findIndex(w => w.workOrderId === workOrderId);\n\nif (idx === -1) {\n    msg.statusCode = 404;\n    msg.payload = { error: 'Work order not found' };\n    return msg;\n}\n\nworkOrders[idx].status = 'completed';\nworkOrders[idx].completedAt = new Date().toISOString();\n\nglobal.set('workOrders', workOrders, 'persistent');\n\nmsg.statusCode = 200;\nmsg.payload = { success: true, workOrder: workOrders[idx] };\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":410,"y":500,"wires":[["3506d88cd094d44c"]]},{"id":"3506d88cd094d44c","type":"http response","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"","statusCode":"","headers":{"Content-Type":"application/json"},"x":620,"y":500,"wires":[]},{"id":"wo_stats_http_in","type":"http in","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"GET Work Order Stats","url":"/workorders/stats","method":"get","upload":false,"skipBodyParsing":false,"swaggerDoc":"","x":180,"y":220,"wires":[["wo_stats_func"]]},{"id":"wo_stats_func","type":"function","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"Compute Stats","func":"const workOrders = global.get('workOrders', 'persistent') || [];\nnode.warn(msg.req.query);\nconst stationId = msg.req.query.stationId;\nconst username = msg.req.query.username;\n\n// Filter only by station\nconst stationWorkOrders = stationId\n    ? workOrders.filter(w => w.stationId === stationId)\n    : workOrders;\n\nconst total = stationWorkOrders.length;\nconst completed = stationWorkOrders.filter(w => w.status === \"completed\").length;\nconst defected = stationWorkOrders.filter(w => w.status === \"defect\").length;\n\n// Filter by user within the station\nconst assignedToMe = username\n    ? stationWorkOrders.filter(w => w.assignedTo === username).length\n    : 0;\n\nmsg.statusCode = 200;\nmsg.payload = {\n    total,\n    completed,\n    defected,\n    assignedToMe\n};\n\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":400,"y":220,"wires":[["wo_stats_response"]]},{"id":"wo_stats_response","type":"http response","z":"3012f9c2796b5b41","g":"83cd1b1c4cc8e310","name":"","statusCode":"","headers":{"Content-Type":"application/json"},"x":610,"y":220,"wires":[]}]
{% endrenderFlow 300 %}

The flow initializes a set of sample work orders and exposes REST APIs that the Digital Work Instructions application uses throughout this tutorial. The `GET /workorders` endpoint returns the active work orders, while the other endpoints simulate completing a work order, reporting defects, and retrieving production statistics. This lets you build and test the application without a live ERP or MES. Later, you can replace these endpoints with calls to your production system while keeping the rest of the application unchanged.

## Setting Up the Dashboard Layout

The app spans three pages. Most widgets sit in a named group on a page, but a couple render without one, the app-bar greeting is UI-scoped, and the work instruction widget is page-scoped so it fills the Instructions page on its own. Create the base, the pages, and the groups the grid widgets need first, so everything has somewhere to land as you build.

1. Add a **ui-base** node and name it "My Dashboard". Every page and widget attaches to it.
2. Create three **ui-page** nodes on that base:
   - **Home** (path `/home`), where the operator lands after login.
   - **Instructions** (path `/instructions`), the step-by-step guide.
   - **Report Issue** (path `/report-issue`), the defect form.
3. On the **Home** page, add four **ui-group** nodes: "Current Station", "Stats", "Current Work Order", and "Up Next".
4. On the **Report Issue** page, add one **ui-group** named "Report Issue" for the form and its buttons.

The **Instructions** page needs no group, its widget is page-scoped and renders across the whole page. With the layout in place, every step below drops its widget into the group it names, or onto the page directly where noted.

![Placeholder: dashboard layout showing the Home page groups (Current Station, Stats, Current Work Order, Up Next)](https://placehold.co/1200x700/eef2f7/475569?text=Home+Page+Layout%3A+Groups) *The four groups on the Home page, before any widgets are added.*

## Enabling FlowFuse User Authentication

Everything starts with a login. Without it, there's no user to key anything on, and the screen is shared by anyone who opens it.

1. Open your instance **Settings**.
2. Select the **Security** tab.
3. Enable **FlowFuse User Authentication**.

Now the first time anyone opens the dashboard, they sign in with their FlowFuse username and password. That login is what unlocks the personalization for the rest of this tutorial.

![Screenshot: the Security tab in instance settings with FlowFuse User Authentication enabled](https://flowfuse.com/img/displaying-logged-in-user-flowfuse-instance-setting.png) *Enable FlowFuse User Authentication in the instance Security settings. This is the switch that turns the shared screen into a per-operator one.*

## Installing the User Addon

Login secures the screen, but the flow still can't see who signed in. The user addon closes that gap: it attaches the current user to every message a Dashboard widget emits.

1. Open **Manage Palette** from the editor settings menu.
2. Switch to the **Install** tab.
3. Search for `@flowfuse/node-red-dashboard-2-user-addon`.
4. Click **Install**.

![Placeholder: Manage Palette install screen showing the user addon search result](https://placehold.co/1200x650/eef2f7/475569?text=Manage+Palette%3A+Install+User+Addon) *Installing `@flowfuse/node-red-dashboard-2-user-addon` from the Palette Manager.*

With the addon in place, every widget message carries a `msg._client.user` object:

```json
{
  "userId": "",   // unique identifier for the user
  "username": "", // FlowFuse username — our lookup key
  "email": "",    // email on their FlowFuse account
  "name": "",     // full name
  "image": ""     // avatar from FlowFuse
}
```

The same data is available inside any `ui-template` widget through the setup store: `setup.socketio.auth.user` in the `<template>`, or `this.setup.socketio.auth.user` in the script.

One setting to confirm: open the **FF Auth** tab in the Dashboard sidebar and make sure **Include Client Data** is enabled. It's on by default, and it's what puts `_client.user` on the message.

## Greeting the Logged-In Operator

The first, simplest payoff: show the operator their name and avatar in the app bar, so it's obvious who's signed in at this station. This uses Vue's [Teleport](https://dashboard.flowfuse.com/nodes/widgets/ui-template.html#teleports) to render into the header's action area from a single widget that lives on every page, so you don't have to add it per page.

1. Add a `ui-template` node and name it "App Bar User Info".
2. Set its type to **Widget (UI-Scoped)** and select your "My Dashboard" ui-base. UI-scoped widgets render on every page automatically, so one widget covers the whole app, no group needed.
3. Paste in the snippet below:

```html
<template>
    <!-- Teleport into #app-bar-actions, the action bar's right-hand corner -->
    <Teleport v-if="loaded" to="#app-bar-actions">
        <div class="user-info">
            <img :src="setup.socketio.auth.user.image" />
            <span>Hi, {{ setup.socketio.auth.user.name }}</span>
        </div>
    </Teleport>
</template>

<script>
export default {
    data() {
        return { loaded: false };
    },
    mounted() {
        // Wait for mount so #app-bar-actions exists before teleporting into it.
        this.loaded = true;
    }
}
</script>

<style>
.user-info { display: flex; align-items: center; gap: 8px; }
.user-info img { width: 24px; height: 24px; }
</style>
```

Deploy and open the dashboard. The signed-in operator's name and avatar appear in the top-right corner. You don't redeploy when a different operator logs in, the addon fetches each user's data at runtime, so everyone sees their own.

![Screenshot: the dashboard app bar showing the logged-in operator's avatar and greeting](https://placehold.co/1200x300/eef2f7/475569?text=App+Bar%3A+Hi%2C+%7BOperator+Name%7D) *The signed-in operator greeted by name and avatar in the app bar, rendered from a single UI-scoped widget.*

## Seeding the Operator into Context on Login

Greeting the operator is the visible half. The other half is making their identity available to every function node in the flow, not just the widgets. The move: the moment a client connects, copy the user object into persistent global context under the key `user`. From then on, any node reads `global.get('user', 'persistent')` to find who's active, without waiting for a specific widget to fire.

1. Add a `ui-event` node, name it "Client connected", and select the "My Dashboard" ui-base. It fires the moment a browser session connects to the dashboard.
2. Add a `change` node and name it "Seed globals". Add these `set` rules, in order:
   - Set `user` (global, persistent) to `msg._client.user`. This is the line that makes the logged-in operator available everywhere.
   - Set `StationContext.stationName` (global) to your station's name, e.g. `Wheel Assembly Station 12`. The Home page reads this to show the operator where they are.
   - Set `StationContext.stationId` (global, persistent) to this station's ID, e.g. `ST12`. The work-order and stats requests read this to fetch only what belongs to this station.
   - Set `Instructions` (global, persistent) to the instruction set for this station's operation, the step list, images, target times, and checklists. Caching it in context means the Instructions page loads instantly instead of re-fetching on every visit.
3. Wire "Client connected" into "Seed globals".

That one `set user` rule is the hinge of the whole app. From here on, "the current operator" is always a single `global.get` away.

![Placeholder: flow diagram of Client connected → Seed globals wiring](https://placehold.co/1000x400/eef2f7/475569?text=Client+Connected+%E2%86%92+Seed+Globals) *The "Client connected" event wired into "Seed globals", writing user, station, and instruction context.*

## Showing the Station and the Stat Cards on Home

Before the work orders, the Home page gives the operator two pieces of context: which station they're at, and a quick count of what's happening there. Both react to page load, so they're current every time Home opens.

**The station name:**

1. From the "Client connected" event, add a second `change` node named "Read station name". Set `payload` (msg) to `StationContext.stationName` (global).
2. Add a `ui-text` node named "Current Station" and assign it to the **Current Station** group on the Home page. Set its value to `msg.payload`.

**The stat cards:**

1. Add a `ui-control` node, name it "Page changed", and select the "My Dashboard" ui-base with its event set to **change**. It fires whenever the operator navigates to a page, so the stats refresh each time Home opens.
2. Add a `function` node named "build /stats request URL". It reads the station and the logged-in operator from context and builds the request:

```javascript
const StationContext = global.get('StationContext', 'persistent');
const user = global.get('user', 'persistent');

const stationId = StationContext?.stationId;
const username = user?.username;

const params = new URLSearchParams();
params.set('stationId', stationId);
if (username) params.set('username', username);

// Swap this host for your own Instance url when you go live.
msg.url = `https://your-instance.flowfuse.cloud/workorders/stats?${params.toString()}`;
msg.method = 'GET';
return msg;
```

3. Add an `http request` node. Set the method to **use `msg.method`** and leave the URL blank so it takes `msg.url` from the function above. Set the return type to a parsed JSON object, and authentication to **bearer**.
4. In the `http request` node, paste your access token into the bearer token field so the request is authenticated. Keep the token out of the flow itself, store it as an environment variable and reference it here, so it isn't exposed if you export or share the flow.
5. Add a `ui-template` node named "Stats Cards" and assign it to the **Stats** group. It renders four numbers from the response, total, assigned to me, completed, and defected:

```html
<template>
  <div class="ws-grid">
    <div class="ws-card"><span class="ws-num">{{ msg?.payload?.total ?? 0 }}</span><span class="ws-lbl">Total</span></div>
    <div class="ws-card"><span class="ws-num">{{ msg?.payload?.assignedToMe ?? 0 }}</span><span class="ws-lbl">Assigned to me</span></div>
    <div class="ws-card"><span class="ws-num">{{ msg?.payload?.completed ?? 0 }}</span><span class="ws-lbl">Completed</span></div>
    <div class="ws-card"><span class="ws-num">{{ msg?.payload?.defected ?? 0 }}</span><span class="ws-lbl">Defected</span></div>
  </div>
</template>

<style>
.ws-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.ws-card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 2px; }
.ws-num { font-size: 28px; font-weight: 700; color: #0f172a; }
.ws-lbl { font-size: 12px; font-weight: 600; color: #64748b; }
</style>
```

6. Wire "Page changed" into "build /stats request URL", that into the `http request`, and the `http request` into the "Stats Cards" template.

The username rides along in the request, so "assigned to me" reflects this operator's workload, not the whole station's.

![Placeholder: Stats Cards widget rendered on the Home page](https://placehold.co/1200x260/eef2f7/475569?text=Stats+Cards%3A+Total+%7C+Assigned+to+Me+%7C+Completed+%7C+Defected) *The four stat cards rendered on Home: total, assigned to me, completed, and defected.*

## Loading the Operator's Work Orders

Now the main event on Home: fetch the work orders and show them. Because the request carries the logged-in username, the operator only ever sees the jobs assigned to them at this station.

1. Add a `ui-control` node, name it "Page changed", and select the "My Dashboard" ui-base with its event set to **change**. It fires when the operator navigates to Home, triggering the fetch.
2. Add a `function` node named "build /workorders request URL". It reads the station and operator from context and builds the request, the same pattern as the stats URL:

```javascript
const StationContext = global.get('StationContext', 'persistent');
const user = global.get('user', 'persistent');

const stationId = StationContext?.stationId;
const username = user?.username;

const params = new URLSearchParams();
params.set('stationId', stationId);
if (username) params.set('username', username);

// Swap this host for your own Instance url when you go live.
msg.url = `https://your-instance.flowfuse.cloud/workorders?${params.toString()}`;
msg.method = 'GET';
return msg;
```

3. Add an `http request` node. Set the method to **use `msg.method`**, leave the URL blank so it takes `msg.url`, return type a parsed JSON object, and authentication to **bearer** with your access token.
4. Add a `link out` node named "work orders out" after the request. The widgets that display the orders connect to it with their own `link in`, so one response reaches them all without wires stretched across the canvas.

The username in that query string is the whole point. The same page, opened by two operators, returns two different lists, the app didn't change, the identity did.

## Splitting the Current Order From the Queue

The Home page shows one work order front and centre and the rest as a queue. A function splits the list, sorting by priority so the most urgent job is the one the operator sees first.

1. Add a `link in` node named "link in 6" and point it at the "work orders out" link.
2. Add a `function` node named "split current vs queue (by priority)" with **2 outputs**:

```javascript
const orders = Array.isArray(msg.payload) ? msg.payload : [];

// Sort by priority (High -> Normal -> Low). API order breaks ties.
const prio = { critical: 0, urgent: 0, high: 1, medium: 2, normal: 3, low: 4 };
const sorted = [...orders].sort(
    (a, b) => (prio[(a.priority || '').toLowerCase()] ?? 5)
            - (prio[(b.priority || '').toLowerCase()] ?? 5)
);

return [
    { payload: sorted[0] || null },  // output 1: current order (for card)
    { payload: sorted.slice(1) }     // output 2: remaining orders (queue)
];
```

3. Import the "Current Work Order Card" widget. It's a large Vue template, so rather than build it by hand, import the node below and assign it to the Current Work Order group.

> Tip: You don't have to write this Vue code yourself. Use [FlowFuse Expert](https://flowfuse.com/docs/user/expert/node-red-embedded-ai/#css-and-html-generation-for-flowfuse-dashboard) and describe the card in plain English, a work order header, station and vehicle panels, a priority chip, and a Start button, and it will generate the ui-template for you.

{% renderFlow 300 %}
[{"id":"eb41d1ba8e4bfb01","type":"ui-template","z":"c50b1b501a74c081","g":"3e9b1176168ca254","group":"","page":"","ui":"","name":"Current Work Order Card","order":1,"width":0,"height":0,"head":"","format":"<template>\n  <div class=\"wi-root\">\n    <!-- Top status bar -->\n    <div class=\"wi-topbar\">\n      <div class=\"wi-topbar-left\">\n        <span class=\"wi-wo-label\">WORK ORDER</span>\n        <span class=\"wi-wo-id\">{{ msg?.payload?.workOrderId ?? '—' }}</span>\n      </div>\n      <div class=\"wi-topbar-right\">\n        <v-chip size=\"large\" variant=\"flat\" label :color=\"priorityColor\" class=\"wi-chip\">\n          <v-icon start icon=\"mdi-flag\"></v-icon>\n          {{ (msg?.payload?.priority ?? 'Normal').toUpperCase() }} PRIORITY\n        </v-chip>\n      </div>\n    </div>\n\n    <v-row no-gutters class=\"wi-body\">\n      <!-- Left: Station + Operation -->\n      <v-col cols=\"12\" md=\"5\" class=\"wi-col\">\n        <v-card flat class=\"wi-card wi-card-station\">\n          <div class=\"wi-card-head\">\n            <v-icon icon=\"mdi-map-marker-radius\" size=\"22\"></v-icon>\n            <span>STATION</span>\n          </div>\n          <div class=\"wi-station-id\">{{ msg?.payload?.stationId ?? '—' }}</div>\n\n          <v-divider class=\"wi-divider\"></v-divider>\n\n          <div class=\"wi-card-head\">\n            <v-icon icon=\"mdi-clipboard-text-outline\" size=\"22\"></v-icon>\n            <span>OPERATION</span>\n          </div>\n          <div class=\"wi-operation-name\">\n            {{ msg?.payload?.operation?.name ?? 'Awaiting operation' }}\n          </div>\n\n          <div class=\"wi-cycle\">\n            <v-icon icon=\"mdi-timer-outline\" size=\"26\"></v-icon>\n            <div class=\"wi-cycle-text\">\n              <span class=\"wi-cycle-label\">ESTIMATED CYCLE TIME</span>\n              <span class=\"wi-cycle-value\">\n                {{ msg?.payload?.operation?.estimatedCycleTime ?? '—' }}\n              </span>\n            </div>\n          </div>\n        </v-card>\n      </v-col>\n\n      <!-- Right: Vehicle -->\n      <v-col cols=\"12\" md=\"7\" class=\"wi-col\">\n        <v-card flat class=\"wi-card wi-card-vehicle\">\n          <div class=\"wi-card-head\">\n            <v-icon icon=\"mdi-car-side\" size=\"22\"></v-icon>\n            <span>VEHICLE</span>\n          </div>\n\n          <div class=\"wi-vehicle-model\">\n            {{ msg?.payload?.vehicle?.model ?? 'Unknown model' }}\n          </div>\n          <div class=\"wi-vehicle-variant\">\n            {{ msg?.payload?.vehicle?.variant ?? '' }}\n          </div>\n\n          <v-row no-gutters class=\"wi-spec-grid\">\n            <v-col cols=\"12\" sm=\"7\">\n              <div class=\"wi-spec\">\n                <span class=\"wi-spec-label\">VIN</span>\n                <span class=\"wi-spec-value wi-vin\">\n                  {{ msg?.payload?.vehicle?.vin ?? '—' }}\n                </span>\n              </div>\n            </v-col>\n            <v-col cols=\"12\" sm=\"5\">\n              <div class=\"wi-spec\">\n                <span class=\"wi-spec-label\">COLOR</span>\n                <span class=\"wi-spec-value\">\n                  <v-icon\n                    icon=\"mdi-circle\"\n                    size=\"18\"\n                    class=\"wi-color-dot\"\n                  ></v-icon>\n                  {{ msg?.payload?.vehicle?.color ?? '—' }}\n                </span>\n              </div>\n            </v-col>\n          </v-row>\n        </v-card>\n      </v-col>\n    </v-row>\n\n    <!-- Start button -->\n    <v-btn block size=\"x-large\" color=\"green-darken-1\" class=\"wi-start-btn\" :disabled=\"!msg?.payload?.workOrderId\"\n      @click=\"send({ payload: { action: 'start', workOrderId: msg?.payload?.workOrderId, stationId: msg?.payload?.stationId } })\">\n      <v-icon start icon=\"mdi-play-circle\" size=\"34\"></v-icon>\n      START WORK ORDER\n    </v-btn>\n  </div>\n</template>\n\n<script>\n  export default {\n  computed: {\n    priorityColor () {\n      const p = (this.msg?.payload?.priority ?? '').toLowerCase()\n      if (p === 'high' || p === 'urgent' || p === 'critical') return 'red-darken-1'\n      if (p === 'medium') return 'amber-darken-2'\n      return 'blue-grey-darken-1'\n    }\n  }\n}\n</script>\n\n<style>\n  .wi-root {\n    font-family: 'Roboto', system-ui, sans-serif;\n    color: #1f2933;\n    padding: 4px;\n  }\n\n  .wi-topbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    gap: 12px;\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    border-left: 6px solid #1565c0;\n    border-radius: 10px;\n    padding: 14px 20px;\n    margin-bottom: 14px;\n  }\n\n  .wi-topbar-left {\n    display: flex;\n    flex-direction: column;\n    line-height: 1.1;\n  }\n\n  .wi-wo-label {\n    font-size: 12px;\n    letter-spacing: 2px;\n    color: #64748b;\n    font-weight: 600;\n  }\n\n  .wi-wo-id {\n    font-size: 30px;\n    font-weight: 700;\n    color: #0f172a;\n    font-variant-numeric: tabular-nums;\n  }\n\n  .wi-topbar-right {\n    display: flex;\n    gap: 10px;\n    flex-wrap: wrap;\n  }\n\n  .wi-chip {\n    font-weight: 700 !important;\n    letter-spacing: 0.5px;\n  }\n\n  .wi-body {\n    gap: 0;\n  }\n\n  .wi-col {\n    padding: 6px;\n  }\n\n  .wi-card {\n    background: #ffffff !important;\n    border: 1px solid #e2e8f0 !important;\n    border-radius: 10px !important;\n    padding: 20px 22px;\n    height: 100%;\n  }\n\n  .wi-card-vehicle {\n    border-left: 6px solid #00897b !important;\n  }\n\n  .wi-card-station {\n    border-left: 6px solid #5e35b1 !important;\n  }\n\n  .wi-card-head {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 13px;\n    letter-spacing: 2px;\n    font-weight: 700;\n    color: #64748b;\n    margin-bottom: 6px;\n  }\n\n  .wi-station-id {\n    font-size: 44px;\n    font-weight: 700;\n    color: #4527a0;\n    line-height: 1;\n    margin-bottom: 6px;\n  }\n\n  .wi-divider {\n    margin: 16px 0;\n    border-color: #edf2f7 !important;\n  }\n\n  .wi-operation-name {\n    font-size: 24px;\n    font-weight: 600;\n    color: #0f172a;\n    margin-bottom: 18px;\n  }\n\n  .wi-cycle {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    background: #f1f5f9;\n    border-radius: 8px;\n    padding: 12px 16px;\n  }\n\n  .wi-cycle-text {\n    display: flex;\n    flex-direction: column;\n    line-height: 1.2;\n  }\n\n  .wi-cycle-label {\n    font-size: 11px;\n    letter-spacing: 1.5px;\n    font-weight: 600;\n    color: #64748b;\n  }\n\n  .wi-cycle-value {\n    font-size: 22px;\n    font-weight: 700;\n    color: #0f172a;\n    font-variant-numeric: tabular-nums;\n  }\n\n  .wi-vehicle-model {\n    font-size: 34px;\n    font-weight: 700;\n    color: #0f172a;\n    line-height: 1.05;\n  }\n\n  .wi-vehicle-variant {\n    font-size: 18px;\n    font-weight: 500;\n    color: #00695c;\n    margin-bottom: 20px;\n  }\n\n  .wi-spec-grid {\n    gap: 0;\n  }\n\n  .wi-spec {\n    display: flex;\n    flex-direction: column;\n    padding: 10px 0;\n  }\n\n  .wi-spec-label {\n    font-size: 11px;\n    letter-spacing: 1.5px;\n    font-weight: 600;\n    color: #64748b;\n    margin-bottom: 2px;\n  }\n\n  .wi-spec-value {\n    font-size: 20px;\n    font-weight: 600;\n    color: #0f172a;\n    display: flex;\n    align-items: center;\n    gap: 6px;\n  }\n\n  .wi-vin {\n    font-family: 'Roboto Mono', monospace;\n    font-size: 18px;\n    letter-spacing: 1px;\n  }\n\n  .wi-color-dot {\n    color: #cbd5e1;\n  }\n\n  .wi-start-btn {\n    margin-top: 16px;\n    height: 84px !important;\n    font-size: 24px !important;\n    font-weight: 700 !important;\n    letter-spacing: 1px;\n    border-radius: 12px !important;\n  }\n</style>","storeOutMessages":true,"passthru":false,"resendOnRefresh":true,"templateScope":"local","className":"","x":570,"y":620,"wires":[["455c7536a9adcfe6"]]},{"id":"77ecf88a48f8c4f0","type":"global-config","env":[],"modules":{"@flowfuse/node-red-dashboard":"1.30.2"}}]
{% endrenderFlow 300 %}

4. Wire **output 1** to the "Current Work Order Card" `ui-template` in the **Current Work Order** group. It shows the work order ID, station, operation and estimated cycle time, the vehicle (model, variant, VIN, colour), a priority chip, and a **Start Work Order** button. On click, the button sends `{ action: 'start', workOrderId, stationId }`.

![Placeholder: Current Work Order Card rendered on the Home page](https://placehold.co/1200x600/eef2f7/475569?text=Current+Work+Order+Card) *The Current Work Order card: work order ID, priority chip, station, operation, vehicle details, and the Start button.*

5. Add a `ui-table` node and assign it to the **Up Next** group. Turn off auto-columns and add two text columns as shown below: Work Order (workOrderId) and Priority (priority). Wire output 2 of the split function into it.

![Placeholder: Up Next table listing queued work orders](https://placehold.co/1200x400/eef2f7/475569?text=Up+Next%3A+Work+Order+%7C+Priority) *The Up Next table showing the remaining queued work orders with their priority.*

6. From the card, wire a `change` node named "go to Instructions" that sets `payload` (msg) to `Instructions`, then into a `ui-control` node with its event set to **change** to switch the page.

When the operator taps **Start Work Order**, the card sends them to the Instructions page.

## Loading the Cached Instruction Set

The Instructions page needs the steps to show. Because the instruction set was cached in context on login, the page can paint it instantly without another round trip.

1. Add a `ui-event` node named "Page opened" for the Instructions page.
2. Add a `change` node named "Load cached instruction set". Set `payload` (msg) to the persistent global `Instructions`.
3. Wire "Page opened" into it, and its output into the "Work Instruction Widget" you build next.

## Remembering Each Operator's Step

This is the feature paper can't do and a shared screen gets wrong. An operator works through the five-step wheel install, reaches step 3, and walks away. When they, or the next person, come back, the app should reopen at step 3, not step 1. We do that by saving the step against the operator's username.

The instruction widget emits two housekeeping actions: `save_step` whenever the operator moves between steps, and `load_step` when the page opens and needs to know where to resume. One function node handles both.

1. Import the "Work Instruction Widget" `ui-template` from the flow below, and set its page to Instructions with the type set to Widget (Page-Scoped). It shows one step at a time with its image, target time, and checklist, disables Next Step until every checklist item is ticked, and turns the last step's button into Complete Operation.

{% renderFlow 300 %}
[{"id":"d3492b9665d71f27","type":"ui-template","z":"c50b1b501a74c081","g":"96f12d35d68b430e","group":"","page":"","ui":"","name":"Work Instruction Widget","order":1,"width":0,"height":0,"head":"","format":"<template>\n  <div class=\"wi-root\">\n    <!-- Context header with live timer -->\n    <div class=\"wi-topbar\">\n      <div class=\"wi-topbar-left\">\n        <span class=\"wi-op-label\">OPERATION</span>\n        <span class=\"wi-op-name\">{{ payload?.operation ?? 'Work Instruction' }}</span>\n        <span class=\"wi-op-sub\">\n          {{ payload?.instructionSetId ?? '—' }} &nbsp;·&nbsp; v{{ payload?.version ?? '—' }}\n        </span>\n      </div>\n      <div class=\"wi-topbar-right\">\n        <div class=\"wi-timer\">\n          <v-icon icon=\"mdi-timer-outline\" size=\"26\"></v-icon>\n          <div class=\"wi-timer-text\">\n            <span class=\"wi-timer-label\">TARGET TIME</span>\n            <span class=\"wi-timer-value\">{{ currentStep?.estimatedTime ?? '—' }}s</span>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step progress -->\n    <v-card flat class=\"wi-card wi-stepper-card\">\n      <div class=\"wi-stepper-head\">\n        <span class=\"wi-step-count\">\n          STEP {{ (currentIndex + 1) }} OF {{ steps.length }}\n        </span>\n        <span class=\"wi-step-percent\">{{ progressPercent }}% COMPLETE</span>\n      </div>\n      <v-progress-linear :model-value=\"progressPercent\" color=\"green-darken-1\" height=\"8\" rounded></v-progress-linear>\n    </v-card>\n\n    <!-- Main instruction pane: image left, instruction + checklist right -->\n    <v-card flat class=\"wi-card wi-card-instruction\">\n      <div class=\"wi-instruction-flex\">\n        <!-- Reference image (left) -->\n        <div class=\"wi-img-col\">\n          <div class=\"wi-image-wrap\">\n            <img\n              :src=\"stepImage\"\n              :alt=\"currentStep?.title\"\n              class=\"wi-image\"\n              @error=\"onImageError\"\n            />\n          </div>\n        </div>\n\n        <!-- Instruction + checklist (right) -->\n        <div class=\"wi-text-col\">\n          <div class=\"wi-card-head\">\n            <v-icon icon=\"mdi-clipboard-text-outline\" size=\"20\"></v-icon>\n            <span>INSTRUCTION</span>\n          </div>\n          <div class=\"wi-step-title\">{{ currentStep?.title ?? '—' }}</div>\n          <p class=\"wi-step-instruction\">{{ currentStep?.instruction ?? '' }}</p>\n\n          <div class=\"wi-card-head wi-checklist-head\">\n            <v-icon icon=\"mdi-format-list-checks\" size=\"20\"></v-icon>\n            <span>CHECKLIST</span>\n          </div>\n          <div class=\"wi-checklist\">\n            <label\n              v-for=\"(item, i) in (currentStep?.checklist ?? [])\"\n              :key=\"i\"\n              class=\"wi-check-row\"\n              :class=\"{ 'wi-check-row-done': checkedState[i] }\"\n            >\n              <v-checkbox-btn\n                :model-value=\"checkedState[i]\"\n                color=\"green-darken-1\"\n                density=\"comfortable\"\n                @update:model-value=\"toggleCheck(i)\"\n              ></v-checkbox-btn>\n              <span>{{ item }}</span>\n            </label>\n          </div>\n        </div>\n      </div>\n    </v-card>\n\n    <!-- Controls -->\n    <v-row no-gutters class=\"wi-controls\">\n      <v-col cols=\"12\" sm=\"3\" class=\"wi-ctrl-col\">\n        <v-btn block size=\"x-large\" variant=\"outlined\" color=\"blue-grey-darken-1\" class=\"wi-nav-btn\"\n          :disabled=\"currentIndex === 0\" @click=\"prevStep\">\n          <v-icon start icon=\"mdi-chevron-left\" size=\"30\"></v-icon>\n          PREVIOUS\n        </v-btn>\n      </v-col>\n\n      <v-col cols=\"12\" sm=\"3\" class=\"wi-ctrl-col\">\n        <v-btn block size=\"x-large\" variant=\"flat\" color=\"red-darken-1\" class=\"wi-nav-btn\" @click=\"reportDefect\">\n          <v-icon start icon=\"mdi-alert-octagon-outline\" size=\"28\"></v-icon>\n          REPORT ISSUE\n        </v-btn>\n      </v-col>\n\n      <v-col cols=\"12\" sm=\"6\" class=\"wi-ctrl-col\">\n        <v-btn block size=\"x-large\" variant=\"flat\" :color=\"isLastStep ? 'green-darken-2' : 'green-darken-1'\"\n          class=\"wi-nav-btn wi-next-btn\" :disabled=\"!allChecked\" @click=\"nextStep\">\n          <v-icon start :icon=\"isLastStep ? 'mdi-check-circle' : 'mdi-chevron-right'\" size=\"30\"></v-icon>\n          {{ isLastStep ? 'COMPLETE OPERATION' : 'NEXT STEP' }}\n        </v-btn>\n      </v-col>\n    </v-row>\n\n    <div v-if=\"!allChecked\" class=\"wi-hint\">\n      <v-icon icon=\"mdi-information-outline\" size=\"18\"></v-icon>\n      Complete all checklist items to continue.\n    </div>\n  </div>\n</template>\n\n<script>\n  export default {\n  data () {\n    return {\n      currentIndex: 0,\n      checked: {},\n      assetBase: '/assets/',\n      placeholder: 'https://placehold.co/800x600/eef2f7/475569?text=Step+Reference',\n      instruction: null\n    }\n  },\n  computed: {\n    payload () {\n      return this.instruction ?? {}\n    },\n    steps () {\n      return this.instruction?.steps ?? []\n    },\n    currentStep () {\n      return this.steps[this.currentIndex] ?? null\n    },\n    isLastStep () {\n      return this.currentIndex === this.steps.length - 1\n    },\n    progressPercent () {\n      if (!this.steps.length) return 0\n      return Math.round((this.currentIndex / this.steps.length) * 100)\n    },\n    checkedState () {\n      return this.checked[this.currentIndex] ?? []\n    },\n    allChecked () {\n      const list = this.currentStep?.checklist ?? []\n      if (!list.length) return true\n      const state = this.checkedState\n      return list.every((_, i) => state[i])\n    },\n    stepImage () {\n      return this.resolveImage(this.currentStep?.image)\n    }\n  },\n  methods: {\n    resolveImage (img) {\n      if (!img) return this.placeholder\n      if (/^https?:\\/\\//.test(img) || img.startsWith('/')) return img\n      return this.assetBase + img\n    },\n    preloadImages () {\n      for (const step of this.steps) {\n        const url = this.resolveImage(step?.image)\n        if (url && url !== this.placeholder) {\n          const im = new Image()\n          im.src = url\n        }\n      }\n    },\n    saveStep () {\n      this.send({\n        payload: {\n          action: 'save_step',\n          stepIndex: this.currentIndex,\n          stepName: this.currentStep?.title ?? null,\n          stepId: this.currentStep?.stepId ?? null\n        }\n      })\n    },\n    toggleCheck (i) {\n      const arr = (this.checked[this.currentIndex] ?? []).slice()\n      arr[i] = !arr[i]\n      this.checked = { ...this.checked, [this.currentIndex]: arr }\n    },\n    onImageError (e) {\n      if (e?.target && e.target.src !== this.placeholder) {\n        e.target.src = this.placeholder\n      }\n    },\n    goToStep (i) {\n      const max = this.steps.length - 1\n      this.currentIndex = Math.min(Math.max(i, 0), Math.max(max, 0))\n      this.saveStep()\n    },\n    nextStep () {\n      if (this.isLastStep) {\n        this.send({ payload: { action: 'complete_operation', stepIndex: this.currentIndex } })\n        return\n      }\n      this.goToStep(this.currentIndex + 1)\n    },\n    prevStep () {\n      if (this.currentIndex === 0) return\n      this.goToStep(this.currentIndex - 1)\n    },\n    reportDefect () {\n      this.send({\n        payload: {\n          action: 'Report Issue',\n        }\n      })\n    }\n  },\n  watch: {\n    msg: {\n      immediate: true,\n      handler (m) {\n        const pl = m?.payload\n        if (!pl) return\n        if (Array.isArray(pl.steps)) {\n          // Instruction-set data: cache it so later messages can't wipe it.\n          this.instruction = pl\n          // Preload every step image so navigation is instant.\n          this.$nextTick(() => this.preloadImages())\n        } else if (typeof pl.stepIndex === 'number') {\n          // Resume reply from the tracker: jump to the saved step.\n          this.currentIndex = Math.min(\n            Math.max(pl.stepIndex, 0),\n            Math.max(this.steps.length - 1, 0)\n          )\n        }\n      }\n    }\n  },\n  mounted () {\n    // Ask the tracker which step this work order was left on.\n    this.send({ payload: { action: 'load_step' } })\n  }\n}\n</script>\n\n<style>\n  .wi-root {\n    font-family: 'Roboto', system-ui, sans-serif;\n    color: #1f2933;\n    padding: 2px;\n  }\n\n  /* Header */\n  .wi-topbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-wrap: wrap;\n    gap: 12px;\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    border-left: 6px solid #1565c0;\n    border-radius: 10px;\n    padding: 10px 16px;\n    margin-bottom: 10px;\n  }\n\n  .wi-topbar-left {\n    display: flex;\n    flex-direction: column;\n    line-height: 1.15;\n  }\n\n  .wi-op-label {\n    font-size: 11px;\n    letter-spacing: 2px;\n    color: #64748b;\n    font-weight: 600;\n  }\n\n  .wi-op-name {\n    font-size: 21px;\n    font-weight: 700;\n    color: #0f172a;\n  }\n\n  .wi-op-sub {\n    font-size: 12px;\n    color: #94a3b8;\n    font-weight: 500;\n    margin-top: 2px;\n  }\n\n  .wi-timer {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 8px 14px;\n    border-radius: 10px;\n    background: #f1f5f9;\n    color: #0f172a;\n  }\n\n  .wi-timer-text {\n    display: flex;\n    flex-direction: column;\n    line-height: 1.1;\n  }\n\n  .wi-timer-label {\n    font-size: 10px;\n    letter-spacing: 1.5px;\n    font-weight: 600;\n    opacity: 0.75;\n  }\n\n  .wi-timer-value {\n    font-size: 20px;\n    font-weight: 700;\n    font-variant-numeric: tabular-nums;\n  }\n\n  /* Cards */\n  .wi-card {\n    background: #ffffff !important;\n    border: 1px solid #e2e8f0 !important;\n    border-radius: 10px !important;\n    padding: 14px 18px !important;\n    height: 100%;\n    box-sizing: border-box;\n  }\n\n  .wi-card-head {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 13px;\n    letter-spacing: 2px;\n    font-weight: 700;\n    color: #64748b;\n    margin-bottom: 8px;\n  }\n\n  /* Stepper (compact) */\n  .wi-stepper-card {\n    margin-bottom: 10px;\n    padding: 10px 16px;\n  }\n\n  .wi-stepper-head {\n    display: flex;\n    justify-content: space-between;\n    align-items: baseline;\n    margin-bottom: 8px;\n  }\n\n  .wi-step-count {\n    font-size: 14px;\n    font-weight: 700;\n    letter-spacing: 1px;\n    color: #0f172a;\n  }\n\n  .wi-step-percent {\n    font-size: 12px;\n    font-weight: 600;\n    letter-spacing: 1px;\n    color: #64748b;\n  }\n\n  /* Instruction card */\n  .wi-card-instruction {\n    border-left: 5px solid #5e35b1 !important;\n    padding: 16px 20px !important;\n    box-sizing: border-box;\n  }\n\n  /* Desktop: keep the instruction card a consistent size across every step,\n     so navigating between steps does not make the layout jump. The card\n     still grows taller when the reference image needs more room. */\n  @media (min-width: 701px) {\n    .wi-card-instruction {\n      min-height: 360px;\n    }\n  }\n\n  .wi-step-title {\n    font-size: 19px;\n    font-weight: 700;\n    color: #0f172a;\n    margin-bottom: 6px;\n    line-height: 1.15;\n  }\n\n  .wi-step-instruction {\n    font-size: 15px;\n    line-height: 1.55;\n    color: #334155;\n    margin: 0 0 16px;\n  }\n\n  .wi-checklist-head {\n    margin-top: 6px;\n    padding-top: 12px;\n    border-top: 1px solid #edf2f7;\n  }\n\n  .wi-checklist {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n  }\n\n  .wi-check-row {\n    display: flex;\n    align-items: center;\n    justify-content: flex-start;\n    gap: 10px;\n    padding: 6px 4px;\n    border-radius: 8px;\n    font-size: 15px;\n    font-weight: 500;\n    color: #1f2933;\n    cursor: pointer;\n  }\n\n  .wi-check-row>span {\n    flex: 1;\n    line-height: 1.35;\n  }\n\n  .wi-check-row .v-selection-control {\n    flex: none;\n    min-width: 0;\n  }\n\n  .wi-check-row-done>span {\n    color: #94a3b8;\n  }\n\n  /* Instruction two-column layout (plain flexbox, no Vuetify grid) */\n  .wi-instruction-flex {\n    display: flex;\n    gap: 20px;\n    align-items: stretch;\n    width: 100%;\n    height: 100%;\n  }\n\n  .wi-img-col {\n    flex: 0 0 40%;\n    display: flex;\n    min-width: 0;\n  }\n\n  .wi-text-col {\n    flex: 1 1 60%;\n    padding-top: 4px;\n    min-width: 0;\n  }\n\n  /* Reference image (left) */\n  .wi-image-wrap {\n    border-radius: 10px;\n    overflow: hidden;\n    background: #f1f5f9;\n    border: 1px solid #e2e8f0;\n    width: 100%;\n    height: 100%;\n    min-height: 210px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  /* Desktop: image box tracks a fixed aspect ratio based on its column\n     width, so the card height scales with the image. The text column\n     stretches to match via align-items: stretch on the flex container. */\n  @media (min-width: 701px) {\n    .wi-image-wrap {\n      aspect-ratio: 4 / 3;\n      height: auto;\n      align-self: flex-start;\n    }\n  }\n\n  .wi-image {\n    width: 100%;\n    height: 100%;\n    object-fit: contain;\n  }\n\n  @media (max-width: 700px) {\n    .wi-instruction-flex {\n      flex-direction: column;\n    }\n\n    .wi-img-col {\n      flex: none;\n    }\n\n    .wi-image-wrap {\n      min-height: 150px;\n    }\n  }\n\n  /* Controls */\n  .wi-controls {\n    margin-top: 12px;\n    gap: 0;\n  }\n\n  .wi-ctrl-col {\n    padding: 6px 8px;\n  }\n\n  .wi-nav-btn {\n    height: 52px !important;\n    font-size: 15px !important;\n    font-weight: 700 !important;\n    letter-spacing: 0.5px;\n    border-radius: 12px !important;\n  }\n\n  .wi-nav-btn .v-btn__content {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .wi-next-btn {\n    font-size: 17px !important;\n  }\n\n  .wi-hint {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    margin-top: 8px;\n    font-size: 14px;\n    font-weight: 500;\n    color: #94a3b8;\n  }\n</style>","storeOutMessages":true,"passthru":true,"resendOnRefresh":true,"templateScope":"widget:page","className":"","x":670,"y":780,"wires":[["c67ea1f6c0580816","effed3f3a008aef7"]]},{"id":"e51561215326fafd","type":"global-config","env":[],"modules":{"@flowfuse/node-red-dashboard":"1.30.2"}}]
{% endrenderFlow 300 %}

> Tip: You don't have to write this Vue code yourself. Use [FlowFuse Expert](https://flowfuse.com/docs/user/expert/node-red-embedded-ai/#css-and-html-generation-for-flowfuse-dashboard) and describe the widget in plain English, a step image and instruction, a checklist that must be fully ticked before advancing, Previous/Next controls, and a Complete Operation button on the last step, and it will generate the ui-template for you.

![Placeholder: Work Instruction Widget showing a step with image, checklist, and navigation controls](https://placehold.co/1200x700/eef2f7/475569?text=Work+Instruction+Widget%3A+Step+View) *The Instructions page: step image, checklist, target time, and Previous / Report Issue / Next controls.*

1. Add a `function` node named "Track step (save/load per user)":

```javascript
// Remembers the current step per user for the active work order.
const p = msg.payload || {};
const username = global.get('user', 'persistent')?.username;
if (!username) return null;

const woId = global.get('currentWork', 'persistent')?.workOrderId || 'unknown-wo';
const s = global.get(username, 'persistent') || { stepIndex: 0 };
s.workOrderId = woId;

const save = () => global.set(username, s, 'persistent');

switch (p.action) {
    case 'save_step':
        s.stepIndex = p.stepIndex ?? 0; save(); return null;

    case 'load_step':
        msg.payload = { workOrderId: woId, stepIndex: s.stepIndex ?? 0 }; return msg;

    default:
        return null;
}
```

3. Wire the "Work Instruction Widget" output into this node, and wire the node's output back into the widget so the `load_step` reply can jump it to the saved step.

> Tip: You don't have to write this JavaScript yourself. Use [FlowFuse Expert](https://flowfuse.com/docs/user/expert/node-red-embedded-ai/#function-code-generation) and describe the logic in plain English, save the step index against the logged-in username on `save_step`, and reply with the saved index on `load_step`, and it will generate the function code for you.

Look at the store key: `global.get(username, ...)` and `global.set(username, ...)`. The operator's own username is the storage key, so two operators at the same station never overwrite each other, their progress lives under different keys.

Deploy, walk halfway through an operation, then reload the page. It reopens where you left off, because the step is filed under your name.

## Completing the Operation as the Logged-In User

When the operator finishes the last step, the widget sends `{ action: 'complete_operation' }`. The completion has to tell the ERP which work order closed, and it reads that from the operator's own stored state, not a shared value another user might have changed.

1. Add a `link in` node and point it at the widget's actions link.
2. Add a `switch` node named "route by action" that checks `payload.action` and routes `complete_operation`.
3. Add a `function` node named "build complete request":

```javascript
const user = global.get('user', 'persistent');
const username = user?.username;
if (!username) {
    node.warn('No logged-in user found — cannot complete operation');
    return null;
}

const stored = global.get(username, 'persistent') || {};
const workOrderId = stored.workOrderId || null;
msg.payload = { workOrderId };
return msg;
```

4. Add an `http request` node, **POST** to `/workorders/complete` (your instance host, swap it later), method **POST**, authentication **bearer**.
5. Add a `change` node that sets `payload` to `Home`, then a `link out` so the result flows on to the reset step below, which returns the operator to Home.

The completion is keyed to the operator's own stored work order, so the record the ERP receives is unambiguous about what finished and who finished it.

## Capturing a Defect Against the Operator

The **Report Issue** button opens the Report Issue page. The operator fills in a form, and on submit the defect is stamped with the work order the logged-in operator is on.

Getting there is itself an action. The widget's **Report Issue** button sends `{ action: 'Report Issue' }`, so:

1. Add a `link in` node named "widget action in" pointed at the widget's actions link.
2. Add a `switch` node named "action == Report Issue?" that routes when `payload.action` equals `Report Issue`.
3. Add a `change` node that sets `payload` to `Report Issue`, then a `ui-control` node to navigate to the Report Issue page.

Now the form:

4. Add a `ui-form` node named "Report Issue Form" to the **Report Issue** group, with four required fields: Issue Type (dropdown), Severity (dropdown), Affected Part (text), and Description (multiline). Fill the dropdowns with your issue types and severities.

![Placeholder: Report Issue form with Issue Type, Severity, Affected Part, and Description fields](https://placehold.co/1200x700/eef2f7/475569?text=Report+Issue+Form) *The Report Issue form: Issue Type, Severity, Affected Part, and Description, submitted against the operator's current work order.*

5. Add a `function` node named "Prepare Defect Report":

```javascript
const p = msg.payload || {};

const user = global.get('user', 'persistent');
const username = user?.username;
if (!username) {
    node.warn('No logged-in user found — cannot report defect');
    return null;
}

const stored = global.get(username, 'persistent') || {};
const workOrderId = stored.workOrderId || null;

const issueType = p.type;
const severity = p.severity;
const affectedPart = p['affected-part'];
const description = p.description || null;

if (!workOrderId || !issueType || !severity || !affectedPart) {
    node.warn('Missing required defect fields — defect not sent');
    return null;
}

msg.payload = { workOrderId, issueType, severity, affectedPart, description };
return msg;
```

6. Add an `http request` node, **POST** to `/workorders/defect`, authentication **bearer**, then a `link out` so the result flows to the reset step.
7. Add a `ui-button` named "Back to Work Instruction" to the same group, wired to a `ui-control` that returns to the Instructions page, so an operator who opened it by mistake can go back without losing their place, their step is safe in context.

The work order never gets typed. It's read straight from `global.get(username)`, so the operator can't attach a defect to the wrong job.

## Clearing State When Work Ends

One last piece keeps the app honest. When an operation completes or a defect closes out the job, the operator's saved step should be wiped, so their next work order starts clean at step 1 instead of resuming a finished one.

1. Add a `link in` node named "complete / defect result in", pointed at the link outs from the complete and defect steps.
2. Add a `function` node named "Clear user step state, target Home":

```javascript
// Work order finished (completed or flagged defect):
// wipe the user's saved step progress and send them Home.
const user = global.get('user', 'persistent');
const username = user?.username;
global.set(username, {}, 'persistent');

msg.payload = "Home";
return msg;
```

3. Add a `switch` node that checks `statusCode` equals 200, so state only resets on a successful response.
4. Wire it into a `ui-control` node that navigates the operator to Home.

Because the reset is keyed by username too, clearing one operator's progress never touches another's.

Deploy and open the dashboard. Log in, and Home shows your station, your counts, and the work orders assigned to you. Start one, work through the steps, and reload, it resumes where you were. Complete it or report a defect, and you land back on Home with a clean slate, while a colleague logged in elsewhere sees their own work untouched.

## Extending This Further

You've built a digital work instructions app where identity threads through everything, the work orders an operator sees, the step they resume at, and the name on every operation and defect. That last part is the foundation for traceability: because every action is tied to a logged-in user, you can build the record of who did what, and when, that quality and compliance processes depend on.

Right now it runs against a simulator, but that was only ever a stand-in for your ERP or MES. To go live, point the request nodes at your real `/workorders`, `/workorders/complete`, and `/workorders/defect` endpoints and keep the bearer token flowing. Everything downstream keeps working, because the flow only ever reads identity from one place: the logged-in user in context.

From here, the same pattern extends naturally. Log every completion and defect to a database and you have a full production and quality history per operator. Add role checks and a supervisor sees a different view than a line operator. Feed the completions into an OEE or [defect tracking dashboard](/blog/2026/07/defect-and-quality-monitoring/) and the shop floor's work becomes the shop floor's data.