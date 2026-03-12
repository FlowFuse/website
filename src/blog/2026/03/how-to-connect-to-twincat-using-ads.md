---
title: "How to Connect to Beckhoff TwinCAT Using ADS ( 2026 )"
subtitle: "Read and write TwinCAT PLC variables from FlowFuse using the ADS protocol, no additional licensing required."
description: "Learn how to connect Beckhoff TwinCAT to FlowFuse using ADS. This guide covers AMS routing, TwinCAT software PLC setup, and reading and writing PLC variables with node-red-contrib-ads-client."
date: 2026-02-13
authors: ["sumit-shinde"]
tags:
- flowfuse
---

If you need to read or write Beckhoff TwinCAT PLC variables from an external system, ADS is the protocol to use. It is built into every TwinCAT 3 installation, requires no additional licensing, and gives you direct access to PLC variables over a standard TCP network connection.

<!--more-->

This guide shows how to do that using FlowFuse. If you are not familiar with it, [FlowFuse](https://flowfuse.com) is an industrial data platform built for exactly this kind of integration: connecting PLCs, historian systems, databases, dashboards, and cloud services without custom middleware. It handles the connectivity layer so you can focus on what to do with the data.

ADS, Automation Device Specification, is not an add-on. It is the internal communication backbone of TwinCAT itself the same channel TwinCAT XAE uses when you go online with a PLC, the same one an HMI uses to read variables. Connecting from FlowFuse means tapping into that same bus.

The hard part is never the FlowFuse side. It is always the routing layer. AMS Net IDs, route tables, firewall rules get any of those wrong and ADS fails silently. This guide covers routing first, before touching a single node, because that is where most people get stuck.

By the end you will have live TwinCAT variables flowing into FlowFuse, with the ability to read, subscribe to changes, and write back to the PLC.

## Prerequisites

Before you begin, make sure you have the following in place:

- TwinCAT 3.1 runtime running on a Beckhoff IPC
- FlowFuse running on an edge device with network access to the TwinCAT machine
- Both devices on the same network
- Port 48898 open between the two devices
- Symbol creation enabled in PlcTask properties on the TwinCAT machine (ask the controls engineer to confirm this if you do not have direct access without it, ADS will connect but fail to find any variables by name)
- Symbol paths of the variables you want to read or write, available from whoever wrote the PLC program

> If you don't have a real PLC available and want to follow along with a test setup, see [Setting Up a Test PLC](#setting-up-a-test-plc) at the end of this guide before continuing.

## What is ADS and Why It Matters

ADS, Automation Device Specification, is not an integration layer Beckhoff added for external tools. It is the internal communication backbone of the TwinCAT runtime itself. The same protocol TwinCAT XAE uses when you go online with a PLC, the same one the HMI uses to read variables, the same one the NC task uses to talk to the PLC task. When you connect from FlowFuse, you are using that same channel.

Every TwinCAT device has an AMS Net ID. It looks like an IP address with two extra octets: `192.168.1.10.1.1`. The first four typically match the device IP, the last two are almost always `1.1` by convention. This is how the ADS router identifies devices on the network, and it is what you will configure in every connection you make from FlowFuse.

Within a device, different TwinCAT components are reachable on different ADS ports. The PLC runtime listens on port `851` by default. If your machine runs multiple PLC tasks, each task gets its own port: the first task is `851`, the second is `852`, and so on. Check with the controls engineer which port corresponds to the task containing your variables.

Three things cause silent failures: wrong AMS Net ID, missing route, blocked port 48898. ADS gives you nothing when any of these are wrong. No error, no timeout message, just silence. That is why we cover routing before touching a single FlowFuse node.

## Configuring ADS Routes

TwinCAT will not accept an ADS connection from an unknown host. Every external device that needs to connect must be explicitly trusted in TwinCAT's route table. This is stored in a file called `StaticRoutes.xml` on the TwinCAT machine.

TwinCAT provides a route manager in the system tray under **Router > Edit Routes**. However it does not expose the Flags setting, which defaults to `64` and will silently block connections from non-Windows devices such as Linux or Mac based edge devices. Editing `StaticRoutes.xml` directly is the only way to set Flags to `0`, which allows connections from any trusted device on your network.

Before adding the route you need two pieces of information:

- The IP address of your FlowFuse edge device
- The AMS Net ID you will assign to it, which is the IP address with `.1.1` appended

For example if your FlowFuse device IP is `192.168.1.50`, its AMS Net ID is `192.168.1.50.1.1`.

**Edit StaticRoutes.xml:**

> If you do not have direct access to the TwinCAT machine, ask the controls engineer or machine builder to make this change. Share this section with them so they know exactly what needs to be set, particularly the `Flags` value of `0`.

1. On the TwinCAT machine open PowerShell as administrator
2. Run the following command, replacing `YOUR_EDGE_DEVICE_IP` with the actual IP of your FlowFuse device:

```powershell
$xml = @"
<?xml version="1.0"?>
<TcConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <RemoteConnections>
    <Route>
      <Name>flowfuse-edge</Name>
      <Address>YOUR_EDGE_DEVICE_IP</Address>
      <NetId>YOUR_EDGE_DEVICE_IP.1.1</NetId>
      <Type>TCP_IP</Type>
      <Flags>0</Flags>
    </Route>
  </RemoteConnections>
</TcConfig>
"@
$xml | Set-Content "C:\Program Files (x86)\Beckhoff\TwinCAT\3.1\Target\StaticRoutes.xml"
```

3. Restart the TwinCAT router from the system tray by right clicking the TwinCAT icon and selecting **Router > Restart**.

4. Make sure port 48898 is open on the TwinCAT machine firewall before proceeding.

After completing these steps, verify that port 48898 is reachable from your FlowFuse edge device. If the connection is blocked, check that both devices are on the same network and that the firewall rule was applied correctly.

> **In a real factory:** StaticRoutes.xml is typically managed by the machine builder or controls engineer who commissioned the system. What you need from them is confirmation that your FlowFuse edge device IP has been added to the route table with Flags set to 0. That one detail is what makes the difference between a working connection and hours of silent debugging.

## Installing node-red-contrib-ads-client in FlowFuse

1. In your FlowFuse instance open the Node-RED editor
2. Click the hamburger menu in the top right and select **Manage Palette**
3. Go to the **Install** tab
4. Search for `node-red-contrib-ads-client`
5. Click **Install** and wait for it to complete
6. Click **Close**

Once the installation is complete, a few nodes will appear in the right-hand palette under the TwinCAT ADS category.

![)](./images/twincat-ads-nodes.png "")

## Connecting to TwinCAT

Before building the flow, collect the following values from the controls engineer or machine builder who manages the TwinCAT machine:

* **TwinCAT machine IP** – IP address of the TwinCAT machine
* **TwinCAT AMS Net ID** – AMS Net ID of the TwinCAT machine
* **Target ADS Port** – The port of the PLC task you want to connect to (`851` for the first task, `852` for the second, etc.)
* **FlowFuse device IP** – IP address of the FlowFuse edge device
* **FlowFuse AMS Net ID** – The FlowFuse device IP with `.1.1` appended

**Add the connection node:**

1. In Node-RED drag an **ADS – Connection Status** node onto the canvas.
2. Double click it to open the configuration.
3. Next to the **Connection** field click **+** to create a new connection.

In the **Required Settings** tab fill in:

| Field             | Value                                                       |
| ----------------- | ----------------------------------------------------------- |
| Target AMS Net ID | AMS Net ID of your TwinCAT machine, e.g. `192.168.1.10.1.1` |
| Target ADS Port   | Port of the PLC task, e.g. `851`                            |

Switch to the **Optional Settings** tab and fill in:

| Field            | Value                                                            |
| ---------------- | ---------------------------------------------------------------- |
| Router Address   | IP address of your TwinCAT machine, e.g. `192.168.1.10`          |
| Router TCP Port  | `48898`                                                          |
| Local AMS Net ID | AMS Net ID of your FlowFuse edge device, e.g. `192.168.1.50.1.1` |
| Local ADS Port   | `32750`                                                          |

The **Target AMS Net ID** identifies the TwinCAT device you want to communicate with. The **Target ADS Port** specifies which PLC task runtime you are connecting to `851` for the first task, `852` for the second, and so on.

The **Router Address** and **Router TCP Port** allow the ADS client to reach the TwinCAT router over the network. The **Local AMS Net ID** identifies your FlowFuse edge device inside the ADS routing system and must match the route configured in `StaticRoutes.xml`. The **Local ADS Port** defines the local ADS endpoint used by the client and normally does not need to be changed.

> **Note:** The connection node also includes additional options such as auto reconnect, timeout control, and symbol caching. These can usually be left at their default values unless you have a specific reason to change them.

4. Click **Add** to save the connection configuration.
5. Click **Done**.
6. Click **Deploy**.

Within a few seconds the connection status node should show **connected**, indicating that FlowFuse successfully established an ADS session with the TwinCAT runtime.

![)](./images/connection-status.png "")

## Reading PLC Variables

With the connection working, reading a variable takes three nodes: an inject node to trigger the read, a read symbol node to fetch the value, and a debug node to see the output.

1. Drag an **inject** node onto the canvas
2. Double click it and leave the default settings so it triggers manually
3. Click **Done**
4. Drag an **ADS - Read Value** node onto the canvas
5. Double click it to configure
6. Select your TwinCAT connection from the **Connection** dropdown
7. Set the **Variable name** to the full symbol path of the variable you want to read, for example `MAIN.YourVariableName`
8. Click **Done**
9. Drag a **debug** node onto the canvas
10. Connect the inject node output to the read symbol node input
11. Connect the read symbol node output to the debug node input
12. Click **Deploy**

Click the Inject node's button. You should see the variable value appear in the debug panel.

Variable symbol paths are always in the format `ProgramName.VariableName`. If you are following along with the test PLC setup, use `MAIN.temperature`. If you are connecting to a real PLC, use the symbol paths provided by the controls engineer.

## Subscribing to Variable Changes

Polling on a fixed timer works but is inefficient. For live data the better approach is to subscribe to variable changes. TwinCAT sends a new value to FlowFuse only when the value actually changes, which reduces unnecessary network traffic and gives you lower latency updates.

1. Drag an **ADS - Subscribe Value** node onto the canvas
2. Double click it to configure
3. Select your TwinCAT connection from the **Connection** dropdown
4. Set the **Variable name** to the full symbol path of the variable you want to monitor
5. Set the **Cycle time** to `100` milliseconds. This is how frequently TwinCAT checks for changes on its side.
6. Click **Done**
7. Connect its output to a debug node
8. Click **Deploy**

The debug node will now receive a message every time the variable value changes in the PLC, with no polling required from FlowFuse.

## Writing to PLC Variables

Writing back to the PLC closes the loop. This is useful for sending setpoints, commands, or reset signals from FlowFuse back to TwinCAT.

1. Drag an **ADS - Write Value** node onto the canvas
2. Double click it to configure
3. Select your TwinCAT connection
4. Set the **Variable name** to the full symbol path of the variable you want to write to, for example `MAIN.YourVariableName`
5. Click **Done**
6. Drag an **inject** node onto the canvas
7. Double click it and set the payload type to **Number** with the value you want to write
8. Click **Done**
9. Connect the inject node output to the write symbol node input
10. Click **Deploy**
11. Click the inject button to trigger the write

To verify the write worked, add a read symbol node for the same variable and check that the value updated in the debug panel.

## Troubleshooting

**Connection fails silently with no error**
The FlowFuse device IP is not in StaticRoutes.xml or Flags is set to 64 instead of 0. Edit the file using the PowerShell command in the routing section, then restart the TwinCAT router.

**Error: Connection to 127.0.0.1:48898 failed**
The Router Address field in the connection node is empty or not saved correctly. Open the connection node, verify the Router Address contains the TwinCAT machine IP, and redeploy.

**Error 1808: Symbol not found**
The variable name is wrong or does not exist in the PLC program. Double check the full symbol path including the program name prefix. Also confirm that symbol creation is enabled in PlcTask properties and the PLC is in Run mode without symbol creation enabled, ADS will connect successfully but no variables will be accessible by name.

**Error 1804: Failed to get fingerprint**
TwinCAT could not complete the route handshake. The FlowFuse device IP is missing from StaticRoutes.xml or the TwinCAT router was not restarted after editing the file.

**Port 48898 not reachable**
Make sure port 48898 is open on the TwinCAT machine firewall and that both devices are on the same network.

**PLC variables not updating**
Make sure the PLC is in Run mode. The TwinCAT system tray icon should be green. A blue icon means the runtime is stopped.

## Setting Up a Test PLC (Optional)

This section is for readers who do not have a real TwinCAT PLC available and want to set up a minimal test environment to follow along with this guide. If you already have a PLC running, you do not need this section.

### What You Need

- A Windows machine or laptop
- TwinCAT XAE Shell installed. Download it from the [Beckhoff website](https://www.beckhoff.com)

> **Important:** If your Windows machine has Hyper-V enabled, TwinCAT will not run in KM mode and the system tray icon will stay blue instead of turning green. Make sure Hyper-V is disabled before proceeding. You may need to restart the machine after disabling it.

### Create the Project

1. Open TwinCAT XAE Shell
2. Click **File > New > Project**
3. Select **TwinCAT Projects** then **TwinCAT XAE Project**
4. Give the project a name, for example `AdsDemo`, and click **OK**

### Add a PLC Project

5. In Solution Explorer right click the project name and select **Add New Item**
6. Select **Standard PLC Project**, give it a name, and click **Add**

### Write the PLC Program

7. In Solution Explorer expand **PLC > your project > POUs** and double click **MAIN**
8. In the declaration section (top panel) replace the existing content with:

```
PROGRAM MAIN
VAR
    temperature : REAL := 23.5;
    motorRunning : BOOL := FALSE;
    setpoint : INT := 100;
END_VAR
```

9. In the program body (bottom panel) add:

```
temperature := temperature + 0.1;
IF temperature > 100.0 THEN
    temperature := 0.0;
END_IF

motorRunning := NOT motorRunning;
```

This gives you three live variables to work with. `temperature` increments continuously, `motorRunning` toggles every PLC cycle, and `setpoint` stays static until you write to it from FlowFuse.

### Enable Symbol Creation

Symbol creation must be enabled for ADS to access variables by name. Without this step the ADS client will connect successfully but fail to find any variables.

> **Important:** This setting is not in the project properties. It is inside PlcTask. Open the wrong properties dialog and you will not find it.

10. In Solution Explorer expand the PLC instance and right click **PlcTask**
11. Select **Properties**
12. Check **Create symbols**
13. Click **OK**

### Build and Activate

14. Press **Ctrl+Shift+B** to build the project. Check the output window for any errors before continuing.
15. Right click the PLC instance in Solution Explorer and select **Login**

> **Note:** If Login is not visible in the right click menu, find it in the top menu bar under **PLC > Login**.

16. When TwinCAT prompts you to create the application on port 851, click **Yes**. Do not skip this step or change the port.
17. Press **F5** to start the PLC

The TwinCAT system tray icon must be green before you proceed. A blue icon means the runtime is not running and ADS connections will fail.

Your test PLC is now running. Go back to the [Configuring ADS Routes](#configuring-ads-routes) section and continue from there. The variable paths you will use throughout this guide are `MAIN.temperature`, `MAIN.motorRunning`, and `MAIN.setpoint`.
