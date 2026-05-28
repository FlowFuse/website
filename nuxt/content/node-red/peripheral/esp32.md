---
title: "Connect ESP32 with Node-RED using MQTT"
description: "Learn how to send and receive MQTT messages between ESP32 and Node-RED using FlowFuse."
---

# {{meta.title}}

This document outlines the procedure for establishing MQTT communication between an ESP32 microcontroller and a Node-RED instance.

## Requirements

* An ESP32 development board.
* An active MQTT broker with access credentials.
* A running Node-RED instance. The quickest way to get started is with **[FlowFuse](/)**, which allows you to effortlessly deploy and manage Node-RED instances and also includes a built-in MQTT broker service.
* Arduino IDE configured with the ESP32 core and the **PubSubClient** library installed.
* Two MQTT clients configured

## Set Up MQTT Clients

To create the necessary MQTT clients (one for ESP32 and one for Node-RED), follow the official guide: [Creating MQTT Clients in FlowFuse](/docs/cloud/introduction/#enterprise-team-broker)

Once created, note down the client ID, username, and password for each client. These credentials will be used later to establish communication.

## Node-RED Configuration

1. Open your Node-RED editor.
2. Drag either an **`mqtt in`** node (to receive data from ESP32) or an **`mqtt out`** node (to send commands to ESP32) into your flow.
3. Double-click the node and configure the MQTT connection:
   - **Server**: Your MQTT broker’s address (e.g., `broker.flowfuse.cloud`)
   - **Port**: Typically `1883` or `8883` for TLS
   - **Client ID**, **Username**, and **Password**: Use the credentials created for the Node-RED client in your broker
4. Specify a **Topic** such as `/esp32/control` for sending commands or `/esp32/data` for receiving sensor data.
5. Click **Deploy**. Once configured properly, the MQTT node should display a “connected” status.

## ESP32 Programming

The ESP32 firmware must perform the following actions:

1.  Establish a connection to the local Wi-Fi network.
2.  Connect to the MQTT broker using its designated client credentials.
3.  Subscribe to the topic specified in Node-RED (`/esp32/control`).
4.  Implement a callback function to process received messages and execute corresponding actions.

Make sure to program the ESP32 accordingly using the Arduino IDE and the PubSubClient library to ensure reliable communication with the MQTT broker.

## Live Demo: Remote LED Control

<lite-youtube videoid="ecfJ-9MxyVE" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

This section provides a practical demonstration with an importable Node-RED flow and corresponding ESP32 code to remotely control the onboard LED. For more detailed, practical steps, please refer to our article [Interacting with ESP32 Using Node-RED and MQTT](/blog/2024/11/esp32-with-node-red/)

### 1. Node-RED Demo Flow

Import the following JSON into your Node-RED editor. This flow creates a simple dashboard with ON/OFF buttons that publish to the `/esp32/led` topic. You must configure the **`mqtt out`** node with your specific broker credentials.



::render-flow
---
height: 300
flow: "W3siaWQiOiI1OTg4N2E4MTE1Yzk1ZWFlIiwidHlwZSI6InRhYiIsImxhYmVsIjoiRmxvdyAxIiwiZGlzYWJsZWQiOmZhbHNlLCJpbmZvIjoiIiwiZW52IjpbXX0seyJpZCI6IjAyYzI1ZThhMzBmOTM3OWQiLCJ0eXBlIjoidWktYmFzZSIsIm5hbWUiOiJNeSBEYXNoYm9hcmQiLCJwYXRoIjoiL2Rhc2hib2FyZCIsImFwcEljb24iOiIiLCJpbmNsdWRlQ2xpZW50RGF0YSI6dHJ1ZSwiYWNjZXB0c0NsaWVudENvbmZpZyI6WyJ1aS1ub3RpZmljYXRpb24iLCJ1aS1jb250cm9sIl0sInNob3dQYXRoSW5TaWRlYmFyIjpmYWxzZSwic2hvd1BhZ2VUaXRsZSI6dHJ1ZSwibmF2aWdhdGlvblN0eWxlIjoiZGVmYXVsdCIsInRpdGxlQmFyU3R5bGUiOiJkZWZhdWx0In0seyJpZCI6ImNmYjJhYjlmZjMwNjYwZmMiLCJ0eXBlIjoidWktdGhlbWUiLCJuYW1lIjoiRGVmYXVsdCBUaGVtZSIsImNvbG9ycyI6eyJzdXJmYWNlIjoiI2ZmZmZmZiIsInByaW1hcnkiOiIjMDA5NENFIiwiYmdQYWdlIjoiI2VlZWVlZSIsImdyb3VwQmciOiIjZmZmZmZmIiwiZ3JvdXBPdXRsaW5lIjoiI2NjY2NjYyJ9LCJzaXplcyI6eyJkZW5zaXR5IjoiZGVmYXVsdCIsInBhZ2VQYWRkaW5nIjoiMTJweCIsImdyb3VwR2FwIjoiMTJweCIsImdyb3VwQm9yZGVyUmFkaXVzIjoiNHB4Iiwid2lkZ2V0R2FwIjoiMTJweCJ9fSx7ImlkIjoiZDI2MzU3NGFmNjg3NmM3YSIsInR5cGUiOiJ1aS1wYWdlIiwibmFtZSI6IkVTUDMyIiwidWkiOiIwMmMyNWU4YTMwZjkzNzlkIiwicGF0aCI6Ii9wYWdlMSIsImljb24iOiJob21lIiwibGF5b3V0IjoiZ3JpZCIsInRoZW1lIjoiY2ZiMmFiOWZmMzA2NjBmYyIsImJyZWFrcG9pbnRzIjpbeyJuYW1lIjoiRGVmYXVsdCIsInB4IjoiMCIsImNvbHMiOiIzIn0seyJuYW1lIjoiVGFibGV0IiwicHgiOiI1NzYiLCJjb2xzIjoiNiJ9LHsibmFtZSI6IlNtYWxsIERlc2t0b3AiLCJweCI6Ijc2OCIsImNvbHMiOiI5In0seyJuYW1lIjoiRGVza3RvcCIsInB4IjoiMTAyNCIsImNvbHMiOiIxMiJ9XSwib3JkZXIiOjEsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSJ9LHsiaWQiOiIzYWUxMTVlYTdlZGU2ODI3IiwidHlwZSI6InVpLWdyb3VwIiwibmFtZSI6Ikdyb3VwIDEiLCJwYWdlIjoiZDI2MzU3NGFmNjg3NmM3YSIsIndpZHRoIjoiNiIsImhlaWdodCI6IjEiLCJvcmRlciI6MSwic2hvd1RpdGxlIjpmYWxzZSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIiwiZ3JvdXBUeXBlIjoiZGVmYXVsdCJ9LHsiaWQiOiJkZWY5N2IyOWY1ZjdiYWFiIiwidHlwZSI6Im1xdHQtYnJva2VyIiwibmFtZSI6IiIsImJyb2tlciI6ImJyb2tlci5mbG93ZnVzZS5jbG91ZCIsInBvcnQiOiIxODgzIiwiY2xpZW50aWQiOiIiLCJhdXRvQ29ubmVjdCI6dHJ1ZSwidXNldGxzIjpmYWxzZSwicHJvdG9jb2xWZXJzaW9uIjoiNCIsImtlZXBhbGl2ZSI6IjYwIiwiY2xlYW5zZXNzaW9uIjp0cnVlLCJhdXRvVW5zdWJzY3JpYmUiOnRydWUsImJpcnRoVG9waWMiOiIiLCJiaXJ0aFFvcyI6IjAiLCJiaXJ0aFJldGFpbiI6ImZhbHNlIiwiYmlydGhQYXlsb2FkIjoiIiwiYmlydGhNc2ciOnt9LCJjbG9zZVRvcGljIjoiIiwiY2xvc2VRb3MiOiIwIiwiY2xvc2VSZXRhaW4iOiJmYWxzZSIsImNsb3NlUGF5bG9hZCI6IiIsImNsb3NlTXNnIjp7fSwid2lsbFRvcGljIjoiIiwid2lsbFFvcyI6IjAiLCJ3aWxsUmV0YWluIjoiZmFsc2UiLCJ3aWxsUGF5bG9hZCI6IiIsIndpbGxNc2ciOnt9LCJ1c2VyUHJvcHMiOiIiLCJzZXNzaW9uRXhwaXJ5IjoiIn0seyJpZCI6IjVhOTE2Mjk4NmEzNGE0ZDYiLCJ0eXBlIjoidWktYnV0dG9uIiwieiI6IjU5ODg3YTgxMTVjOTVlYWUiLCJncm91cCI6IjNhZTExNWVhN2VkZTY4MjciLCJuYW1lIjoiIiwibGFiZWwiOiJPTiIsIm9yZGVyIjoxLCJ3aWR0aCI6IjMiLCJoZWlnaHQiOiIyIiwiZW11bGF0ZUNsaWNrIjpmYWxzZSwidG9vbHRpcCI6IiIsImNvbG9yIjoiIiwiYmdjb2xvciI6IiIsImNsYXNzTmFtZSI6IiIsImljb24iOiIiLCJpY29uUG9zaXRpb24iOiJsZWZ0IiwicGF5bG9hZCI6IjEiLCJwYXlsb2FkVHlwZSI6Im51bSIsInRvcGljIjoidG9waWMiLCJ0b3BpY1R5cGUiOiJtc2ciLCJidXR0b25Db2xvciI6ImdyZWVuIiwidGV4dENvbG9yIjoiIiwiaWNvbkNvbG9yIjoiIiwiZW5hYmxlQ2xpY2siOnRydWUsImVuYWJsZVBvaW50ZXJkb3duIjpmYWxzZSwicG9pbnRlcmRvd25QYXlsb2FkIjoiIiwicG9pbnRlcmRvd25QYXlsb2FkVHlwZSI6InN0ciIsImVuYWJsZVBvaW50ZXJ1cCI6ZmFsc2UsInBvaW50ZXJ1cFBheWxvYWQiOiIiLCJwb2ludGVydXBQYXlsb2FkVHlwZSI6InN0ciIsIngiOjE5MCwieSI6MTIwLCJ3aXJlcyI6W1siOTIzOWY4YTdjY2E1Yzg1OCJdXX0seyJpZCI6ImY5YzE5NDk5NGQ5NDkxYTgiLCJ0eXBlIjoidWktYnV0dG9uIiwieiI6IjU5ODg3YTgxMTVjOTVlYWUiLCJncm91cCI6IjNhZTExNWVhN2VkZTY4MjciLCJuYW1lIjoiIiwibGFiZWwiOiJPRkYiLCJvcmRlciI6Miwid2lkdGgiOiIzIiwiaGVpZ2h0IjoiMiIsImVtdWxhdGVDbGljayI6ZmFsc2UsInRvb2x0aXAiOiIiLCJjb2xvciI6IiIsImJnY29sb3IiOiIiLCJjbGFzc05hbWUiOiIiLCJpY29uIjoiIiwiaWNvblBvc2l0aW9uIjoibGVmdCIsInBheWxvYWQiOiIyIiwicGF5bG9hZFR5cGUiOiJudW0iLCJ0b3BpYyI6InRvcGljIiwidG9waWNUeXBlIjoibXNnIiwiYnV0dG9uQ29sb3IiOiJyZWQiLCJ0ZXh0Q29sb3IiOiIiLCJpY29uQ29sb3IiOiIiLCJlbmFibGVDbGljayI6dHJ1ZSwiZW5hYmxlUG9pbnRlcmRvd24iOmZhbHNlLCJwb2ludGVyZG93blBheWxvYWQiOiIiLCJwb2ludGVyZG93blBheWxvYWRUeXBlIjoic3RyIiwiZW5hYmxlUG9pbnRlcnVwIjpmYWxzZSwicG9pbnRlcnVwUGF5bG9hZCI6IiIsInBvaW50ZXJ1cFBheWxvYWRUeXBlIjoic3RyIiwieCI6MTkwLCJ5IjoxNjAsIndpcmVzIjpbWyI5MjM5ZjhhN2NjYTVjODU4Il1dfSx7ImlkIjoiOTIzOWY4YTdjY2E1Yzg1OCIsInR5cGUiOiJtcXR0IG91dCIsInoiOiI1OTg4N2E4MTE1Yzk1ZWFlIiwibmFtZSI6IiIsInRvcGljIjoiL0xlZENvbnRyb2wiLCJxb3MiOiIiLCJyZXRhaW4iOiIiLCJyZXNwVG9waWMiOiIiLCJjb250ZW50VHlwZSI6IiIsInVzZXJQcm9wcyI6IiIsImNvcnJlbCI6IiIsImV4cGlyeSI6IiIsImJyb2tlciI6ImRlZjk3YjI5ZjVmN2JhYWIiLCJ4IjozOTAsInkiOjE0MCwid2lyZXMiOltdfV0="
---
::



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
