---
eleventyNavigation:
  key: "ESP32"
  parent: "Peripheral Devices"
meta:
  title: Connect ESP32 with Node-RED using MQTT
  description: Learn how to send and receive MQTT messages between ESP32 and Node-RED using FlowFuse.
  keywords: node-red, flowfuse, esp32, mqtt, esp32 node-red
---

# {{meta.title}}

This document outlines the procedure for establishing MQTT communication between an ESP32 microcontroller and a Node-RED instance.

## Requirements

* An ESP32 development board.
* An active MQTT broker with access credentials.
* A running Node-RED instance. The quickest way to get started is with **[FlowFuse](/)**, which allows you to effortlessly deploy and manage Node-RED instances and also includes a built-in MQTT broker service.
* Arduino IDE configured with the ESP32 core and the **PubSubClient** library installed.

## Node-RED Configuration

1.  In your Node-RED flow, add an **`mqtt out`** node.
2.  Configure the node's properties with your MQTT broker's server address, port, and client credentials.
3.  Assign a **Topic** for publishing commands (e.g., `/esp32/control`).
4.  Deploy the changes. A "connected" status should appear under the node.

## ESP32 Programming

The ESP32 firmware must perform the following actions:

1.  Establish a connection to the local Wi-Fi network.
2.  Connect to the MQTT broker using its designated client credentials.
3.  Subscribe to the topic specified in Node-RED (`/esp32/control`).
4.  Implement a callback function to process received messages and execute corresponding actions.

## Live Demo: Remote LED Control

<iframe width="100%" height="315" src="https://www.youtube.com/embed/ecfJ-9MxyVE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This section provides a practical demonstration with an importable Node-RED flow and corresponding ESP32 code to remotely control the onboard LED. For more detailed, practical steps, please refer to our article [Interacting with ESP32 Using Node-RED and MQTT](/blog/2024/11/esp32-with-node-red/)

### 1. Node-RED Demo Flow

Import the following JSON into your Node-RED editor. This flow creates a simple dashboard with ON/OFF buttons that publish to the `/esp32/led` topic. You must configure the **`mqtt out`** node with your specific broker credentials.

{% renderFlow 300 %}
[{"id":"59887a8115c95eae","type":"tab","label":"Flow 1","disabled":false,"info":"","env":[]},{"id":"02c25e8a30f9379d","type":"ui-base","name":"My Dashboard","path":"/dashboard","appIcon":"","includeClientData":true,"acceptsClientConfig":["ui-notification","ui-control"],"showPathInSidebar":false,"showPageTitle":true,"navigationStyle":"default","titleBarStyle":"default"},{"id":"cfb2ab9ff30660fc","type":"ui-theme","name":"Default Theme","colors":{"surface":"#ffffff","primary":"#0094CE","bgPage":"#eeeeee","groupBg":"#ffffff","groupOutline":"#cccccc"},"sizes":{"density":"default","pagePadding":"12px","groupGap":"12px","groupBorderRadius":"4px","widgetGap":"12px"}},{"id":"d263574af6876c7a","type":"ui-page","name":"ESP32","ui":"02c25e8a30f9379d","path":"/page1","icon":"home","layout":"grid","theme":"cfb2ab9ff30660fc","breakpoints":[{"name":"Default","px":"0","cols":"3"},{"name":"Tablet","px":"576","cols":"6"},{"name":"Small Desktop","px":"768","cols":"9"},{"name":"Desktop","px":"1024","cols":"12"}],"order":1,"className":"","visible":"true","disabled":"false"},{"id":"3ae115ea7ede6827","type":"ui-group","name":"Group 1","page":"d263574af6876c7a","width":"6","height":"1","order":1,"showTitle":false,"className":"","visible":"true","disabled":"false","groupType":"default"},{"id":"def97b29f5f7baab","type":"mqtt-broker","name":"","broker":"broker.flowfuse.cloud","port":"1883","clientid":"","autoConnect":true,"usetls":false,"protocolVersion":"4","keepalive":"60","cleansession":true,"autoUnsubscribe":true,"birthTopic":"","birthQos":"0","birthRetain":"false","birthPayload":"","birthMsg":{},"closeTopic":"","closeQos":"0","closeRetain":"false","closePayload":"","closeMsg":{},"willTopic":"","willQos":"0","willRetain":"false","willPayload":"","willMsg":{},"userProps":"","sessionExpiry":""},{"id":"5a9162986a34a4d6","type":"ui-button","z":"59887a8115c95eae","group":"3ae115ea7ede6827","name":"","label":"ON","order":1,"width":"3","height":"2","emulateClick":false,"tooltip":"","color":"","bgcolor":"","className":"","icon":"","iconPosition":"left","payload":"1","payloadType":"num","topic":"topic","topicType":"msg","buttonColor":"green","textColor":"","iconColor":"","enableClick":true,"enablePointerdown":false,"pointerdownPayload":"","pointerdownPayloadType":"str","enablePointerup":false,"pointerupPayload":"","pointerupPayloadType":"str","x":190,"y":120,"wires":[["9239f8a7cca5c858"]]},{"id":"f9c194994d9491a8","type":"ui-button","z":"59887a8115c95eae","group":"3ae115ea7ede6827","name":"","label":"OFF","order":2,"width":"3","height":"2","emulateClick":false,"tooltip":"","color":"","bgcolor":"","className":"","icon":"","iconPosition":"left","payload":"2","payloadType":"num","topic":"topic","topicType":"msg","buttonColor":"red","textColor":"","iconColor":"","enableClick":true,"enablePointerdown":false,"pointerdownPayload":"","pointerdownPayloadType":"str","enablePointerup":false,"pointerupPayload":"","pointerupPayloadType":"str","x":190,"y":160,"wires":[["9239f8a7cca5c858"]]},{"id":"9239f8a7cca5c858","type":"mqtt out","z":"59887a8115c95eae","name":"","topic":"/LedControl","qos":"","retain":"","respTopic":"","contentType":"","userProps":"","correl":"","expiry":"","broker":"def97b29f5f7baab","x":390,"y":140,"wires":[]}]
{% endrenderFlow %}

### 2. ESP32 Demo Code

The following code should be uploaded to your ESP32 board. Replace the placeholder values with your specific network and MQTT credentials.

### 2. ESP32 Demo Code

The following code should be uploaded to your ESP32 board. Replace the placeholder values with your specific network and MQTT credentials.

```cpp
#include <WiFi.h>
#include <PubSubClient.h>

// --- User-defined Credentials ---
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "YOUR_MQTT_BROKER_IP"; // e.g., "192.168.1.100"
const char* mqtt_user = "YOUR_MQTT_USERNAME";
const char* mqtt_pass = "YOUR_MQTT_PASSWORD";

// --- Pin Definitions ---
#define LED_PIN 2 // Onboard LED pin

// --- Global Objects ---
WiFiClient espClient;
PubSubClient client(espClient);

// --- MQTT Message Handler ---
void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  if (String(topic) == "/esp32/led") {
    if (message == "ON") {
      digitalWrite(LED_PIN, HIGH);
    } else if (message == "OFF") {
      digitalWrite(LED_PIN, LOW);
    }
  }
}

// --- MQTT Reconnection Logic ---
void reconnect() {
  while (!client.connected()) {
    if (client.connect("esp32-client-demo", mqtt_user, mqtt_pass)) {
      client.subscribe("/esp32/led");
    } else {
      delay(5000); // Wait 5 seconds before retrying
    }
  }
}

// --- Setup Function ---
void setup() {
  pinMode(LED_PIN, OUTPUT);
  WiFi.begin(ssid, password);
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

// --- Main Loop ---
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
```

### 3. Verification

1. Deploy the imported flow in Node-RED and open the dashboard interface.
2. Upload the configured sketch to the ESP32 board.
3. Operate the ON and OFF buttons on the dashboard to toggle the ESP32's onboard LED.
