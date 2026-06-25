---
eleventyNavigation:
  key: Ethernet IP Node
  parent: Edge
  order: 2
meta:
  title: Ethernet IP Node
  description: A Ethernet IP node for communicating with Rockwell Automation and Allen-Bradley PLCs using the EtherNet/IP (Ethernet Industrial Protocol) protocol.
---

# {{ meta.title }}

A Ethernet IP node for communicating with Rockwell Automation and Allen-Bradley PLCs using the EtherNet/IP (Ethernet Industrial Protocol) protocol.

## Overview

This node provides a robust interface for connecting FlowFuse flows to industrial control systems, specifically Rockwell Automation and Allen-Bradley programmable logic controllers (PLCs). It wraps the [st-ethernet-ip](https://www.npmjs.com/package/st-ethernet-ip) library to enable real-time tag monitoring and data collection from industrial automation equipment.

> **ℹ Note:** The Ethernet IP node is not available by default. It is part of the **FlowFuse Edge Certified Nodes** paid add-on. Please contact our sales team at [Contact us](/contact-us/) to learn more or to request access.

## What is EtherNet/IP?

EtherNet/IP (Ethernet Industrial Protocol) is an industrial network protocol that adapts the Common Industrial Protocol (CIP) to standard Ethernet. It's the primary communication protocol used by Rockwell Automation and Allen-Bradley industrial controllers, including:

- **ControlLogix** PLCs
- **CompactLogix** PLCs
- **MicroLogix** PLCs
- **PowerFlex** Drives
- **PanelView** HMIs
- Other Rockwell Automation/Allen-Bradley devices

## How It Works with Rockwell/Allen-Bradley Hardware

This node establishes a client connection to Allen-Bradley PLCs over EtherNet/IP and provides the following capabilities:

### 1. **Controller Discovery**
When connecting, the node automatically:
- Reads controller properties (model, serial number, firmware version)
- Discovers available tags in the controller
- Retrieves controller time and status

### 2. **Tag Subscription**
The node subscribes to specific tags (variables) in the PLC and monitors them for changes:
- **BOOL** tags (Boolean/Digital I/O)
- **DINT** tags (Double Integer/32-bit integers)
- **REAL** tags (Floating-point values)
- **STRING** tags (Text data)
- **Custom data types** (UDTs)

### 3. **Real-Time Monitoring**
- Polls the PLC at a configurable scan rate (50ms to 36000s)
- Emits messages only when tag values change
- Maintains a cache of current tag values
- Handles Allen-Bradley string encoding (82-character strings with 4-byte length prefix)

### 4. **Connection Management**
- Automatic connection lifecycle management
- Proper cleanup on deployment or shutdown
- Error handling and status reporting
- Support for different slot configurations (backplane addressing)

## Installation

Because this node is part of the **FlowFuse Edge Certified Nodes** add-on, make sure your account has access before installing. Contact our [sales team](/contact-us/) if you don't.

> **ℹ Note:** Existing devices and hosted instances will not see newly added nodes until they are restarted. Restart any instance you plan to install nodes on so it picks up the updated catalogue.

### Install via the Palette Manager (recommended)

1. Open the **Palette Manager** from the top-right menu in the FlowFuse editor.
2. Switch to the **Install** tab.
3. Search for the **FlowFuse Edge Certified Nodes** collection.
4. Locate `@flowfuse-certified-nodes/ethernet-ip` and click **Install**.

### Install via npm

If you manage your palette from the command line, install the package directly:

```bash
npm install @flowfuse-certified-nodes/ethernet-ip
```

## Usage

### Input Message Format

Send a message with the following payload structure to initiate a PLC connection:

```json
{
  "address": "192.168.1.100",
  "slot": 0,
  "scanRate": 500,
  "tagConfig": [
    {
      "scope": "",
      "tags": [
        {
          "tagName": "ProductionCount",
          "tagType": "DINT"
        },
        {
          "tagName": "ConveyorRunning",
          "tagType": "BOOL"
        },
        {
          "tagName": "Temperature",
          "tagType": "REAL"
        },
        {
          "tagName": "PartNumber",
          "tagType": "STRING"
        }
      ]
    }
  ]
}
```

#### Configuration Parameters

- **address**: IP address of the PLC (required)
- **slot**: Backplane slot number where the processor is located (typically 0 for CompactLogix, varies for ControlLogix)
- **scanRate**: Polling interval in milliseconds (50-36000000ms)
- **tagConfig**: Array of tag scopes containing tags to monitor
  - **scope**: Tag scope in the controller (empty string for controller-scoped tags)
  - **tags**: Array of tag objects
    - **tagName**: Name of the tag in the PLC program
    - **tagType**: Data type (BOOL, DINT, REAL, STRING, etc.)

### Outputs

#### Output 1: PLC Data

Emits updated tag values when changes are detected:

```json
{
  "payload": {
    "ProductionCount": 1250,
    "ConveyorRunning": true,
    "Temperature": 72.5,
    "PartNumber": "ABC-123-XYZ"
  },
  "changedTagName": "ProductionCount",
  "changedTagValue": 1250
}
```

#### Output 2: Debug/Metadata

Provides diagnostic information and PLC metadata:

```json
{
  "payload": {
    "category": "plcProps",
    "value": {
      "name": "CompactLogix Controller",
      "serial": "12345678",
      "slot": 0,
      "version": "31.011"
    }
  }
}
```

**Categories:**
- `plcConfig`: Echoes the input configuration
- `plcProps`: Controller properties (model, serial, etc.)
- `plcTime`: Controller clock time
- `plcTags`: Complete list of available tags
- `debug`: Diagnostic messages
- `error`: Error information

### Connection States

Monitor the node status to track connection health:

| State | Color | Meaning |
|-------|-------|---------|
| connecting | blue | Initiating connection to PLC |
| reading props | blue | Reading controller properties |
| discovering tags | blue | Scanning for available tags |
| connected | green | Active and monitoring tags |
| closing | gray | Shutting down connection |
| closed | red | Disconnected and idle |
| warn - end | yellow | PLC terminated connection |
| warn - closed | yellow | Connection closed |
| error - config | red | Invalid input message |
| error - connect | red | Cannot reach PLC |
| error - prop read | red | Cannot read properties |
| error - tag discovery | red | Cannot read tag list |
| error - scan | red | Error during tag scanning |
| error - disconnect | red | Error during shutdown |
| error - controller | red | Incompatible controller type |

## Example Flow

```json
[
  {
    "id": "inject1",
    "type": "inject",
    "name": "Connect to PLC",
    "topic": "",
    "payload": "{\"address\":\"192.168.1.100\",\"slot\":0,\"scanRate\":500,\"tagConfig\":[{\"scope\":\"\",\"tags\":[{\"tagName\":\"Tag1\",\"tagType\":\"DINT\"}]}]}",
    "payloadType": "json",
    "wires": [["plcNode"]]
  },
  {
    "id": "plcNode",
    "type": "eth-ip",
    "name": "Production Line PLC",
    "wires": [["output"], ["debug"]]
  }
]
```

## Best Practices

### Connection Management
- Any new input message will close the existing connection and establish a new one
- Use a **status node** to monitor connection health and implement retry logic
- Handle reconnection logic externally to the node

### Network Configuration
- Ensure your FlowFuse instance can reach the PLC IP address
- Configure firewall rules to allow TCP port 44818 (EtherNet/IP)
- Use static IP addresses for PLCs in production environments

### Tag Selection
- Only subscribe to tags you need to minimize network traffic
- Use appropriate scan rates based on how quickly data changes
- Faster scan rates increase CPU and network load

### Error Handling
- Connect a **catch node** to handle errors gracefully
- Monitor the debug output for diagnostic information
- Implement reconnection strategies for production reliability

## Compatibility

### Tested Hardware
- Allen-Bradley ControlLogix (L7x, L8x series)
- Allen-Bradley CompactLogix (L1x, L2x, L3x series)
- Allen-Bradley MicroLogix (1100, 1400, 1500 series)

### Supported Data Types
- BOOL (Boolean)
- SINT (Short Integer)
- INT (Integer)
- DINT (Double Integer)
- REAL (Floating Point)
- STRING (82-character Allen-Bradley strings)
- Custom UDTs (User Defined Types)

## Troubleshooting

### Cannot Connect to PLC
- Verify IP address and network connectivity (ping test)
- Check slot number matches your controller configuration
- Ensure PLC firmware supports EtherNet/IP messaging
- Verify firewall settings allow TCP 44818

### Tags Not Updating
- Confirm tag names match exactly (case-sensitive)
- Verify tag scope is correct
- Check scan rate isn't too slow for your application
- Ensure tags exist in the controller

### Connection Drops Frequently
- Reduce scan rate to decrease network load
- Check network stability and switch configuration
- Verify PLC isn't overloaded with connections
- Consider using unconnected messaging for multiple clients

## Technical Details

This node uses **unconnected messaging** mode by default with a 5064ms timeout, which:
- Reduces timeout issues with multiple clients
- Works better in high-latency networks
- Allows multiple nodes to connect to the same PLC

String handling automatically decodes Allen-Bradley's proprietary format:
- First 4 bytes contain Little-Endian INT32 length
- Remaining bytes contain ASCII character data
- Maximum length of 82 characters