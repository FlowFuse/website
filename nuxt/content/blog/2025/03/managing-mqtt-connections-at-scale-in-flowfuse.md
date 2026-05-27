---
title: Managing MQTT Connections at Scale in FlowFuse
navTitle: Managing MQTT Connections at Scale in FlowFuse
---

FlowFuse makes it easy to deploy Node-RED flows at scale using DevOps pipelines and device groups. However, different stages in a pipeline may need different MQTT brokers—for example, one for development and another for production. Manually configuring each stage can be time-consuming, especially when a stage has multiple remote instances (devices).

<!--more-->

This article shows how to continue using FlowFuse’s one-click deployment while ensuring that remote instances in each stage of your pipeline connect to the desired MQTT broker without manual configuration.

## Goal and Prerequisites

This article explains how to deploy Node-RED flows across different pipeline stages while ensuring each stage connects to its appropriate MQTT broker.

To proceed, ensure that the DevOps pipeline is created with the correct stages. If a stage includes remote instances, verify that all instances are running the FlowFuse Device Agent and are connected to your team.

For more information on how to create a DevOps pipeline, refer to [How to Build and Automate DevOps Pipelines for Node-RED Deployments](/blog/2024/10/how-to-build-automate-devops-pipelines-node-red-deployments/). For instructions on how to create a device group, refer to the [Device Groups Documentation](/docs/user/device-groups/).

## Setting Environment Variables for Development Instance

For this guide, environment variables will be the key tool to ensure each pipeline stage connects to the correct MQTT broker without manual intervention, allowing for a smooth deployment process.

Since the development remote instance is where the flow will be built and tested, start by adding the necessary environment variables for its MQTT configuration. Setting these up first ensures the flow runs as expected before deploying it to other pipeline stages.

1. Go to the remote/hosted instance settings in the FlowFuse platform.
2. Switch to the **Environment** settings.
3. Add the following environment variables with the appropriate values for that specific device:

   - `HOST` – The MQTT broker's hostname or IP address.
   - `PORT` – The port number the broker is listening on.
   - `USERNAME` – The authentication username for the MQTT broker.
   - `PASSWORD` – The authentication password for the MQTT broker.
   - `CLIENT_ID` – A unique identifier for the device connecting to the broker.
   - `CLIENT_ID_SUFFIX` – A suffix shared among client IDs within the broker.
   - `TOPIC` – The MQTT topic used for message communication.

4. Click **Save Settings** to apply the changes and restart the device.

## Configuring MQTT in Node-RED with Environment Variables

Now, let's explore how these environment variables can be used within Node-RED to configure the MQTT broker. Node-RED offers multiple ways to reference environment variables. Here are two primary methods to configure MQTT nodes using environment variables:

### 1. Using the Configuration Dialog: 

Environment variables can be directly referenced in the MQTT node properties using the `${ENV_NAME}` syntax as shown in the following images.

![Setting up MQTT connection using environment variables.](/blog/2025/03/images/mqtt-config-with-env.png){data-zoomable}
_Setting up MQTT connection using environment variables._

![Configuring MQTT node security settings using environment variables in Node-RED.](/blog/2025/03/images/mqtt-node-security-config.png){data-zoomable}
_Configuring MQTT node security settings using environment variables in Node-RED._

![Configuring the MQTT topic in Node-RED using environment variables.](/blog/2025/03/images/mqtt-broker-out-config.png){data-zoomable}
_Configuring the MQTT topic in Node-RED using environment variables._

### 2. Setting Values Dynamically via the `msg` Object

In this approach, a **Change node** is used to retrieve environment variables and set the necessary MQTT configuration properties in the `msg` object. These properties include:

- `msg.broker.broker` – The MQTT broker’s URL or IP address.
- `msg.action` – Must be set to `"connect"` when establishing a connection.
- `msg.broker.force` – Must be set to `true` to enforce the connection.
- `msg.broker.port` – The port number for the MQTT connection.
- `msg.broker.clientid` – The unique client identifier for the device.
- `msg.broker.username` – The MQTT username for authentication.
- `msg.broker.password` – The MQTT password for authentication.
- `msg.topic` – The MQTT topic to which the device will publish or subscribe.

While the first method (direct reference in the MQTT node) is simpler and does not require additional nodes, it has limitations. It works well when there is only a single instance in the pipeline stage. However, when multiple instances exist within the same stage, the client ID, username, password, and topics often vary from device to device. The second method provides greater flexibility by dynamically adjusting these values, ensuring each device connects with the correct credentials and configurations. This approach makes the setup scalable and adaptable, eliminating the need for manual updates during deployment.

Unlike the first approach, which restricts direct combinations (e.g., string + environment variables or environment variables + environment variables), the second method enables dynamic modifications.

#### Ensuring Unique MQTT Credentials and Topics

As we mentioned in the multi-device deployment scenario, each device needs to establish its own connection to the MQTT broker while maintaining unique credentials and topics. If multiple devices in the same stage use identical configurations, connection conflicts—such as client ID duplication—may occur. To avoid these issues, each device must be assigned a unique client ID, username, password for security, and topic.

To ensure uniqueness, we can use the default environment variables available for each remote instance, such as:

- `FF_DEVICE_NAME`
- `FF_DEVICE_ID`

When generating the client ID for the MQTT broker, the device name (`FF_DEVICE_NAME`) can be used as the username. Since all client IDs share the same suffix, this suffix can be stored as a device-level environment variable (`CLIENT_ID_SUFFIX`). By combining both values, we can get the client ID of the device without manual intervention.

For the password, you can use the device ID (`FF_DEVICE_ID`), which is assigned when creating the client. Alternatively, you can set a common password for all clients by defining it as a device group-level environment variable.

![Using a Change node to dynamically set MQTT broker connection properties.](/blog/2025/03/images/CHANGE-NODE-1.png){data-zoomable}
_Using a Change node to dynamically set MQTT broker connection properties._

For topics, a combination of a string and `FF_DEVICE_NAME` can be used to ensure uniqueness.

![Configuring MQTT topics dynamically using a Change node in Node-RED.](/blog/2025/03/images/CHANGE-NODE-TOPIC-1.png){data-zoomable}
_Configuring MQTT topics dynamically using a Change node in Node-RED._

*Note: Ensure that the topic configuration is set dynamically when sending the payload, not when establishing the connection.*

Once you have built your flow to connect to the intended MQTT broker using environment variables, deploy it and verify that it works as expected.

Also, if you need an example flow to test and explore in more detail, the following flow is provided. It demonstrates how to configure the MQTT connection dynamically using environment variables and, where needed, generate some settings by combining strings with environment variables.



::render-flow
---
height: 200
flow: "W3siaWQiOiIwMzAxYmJlNjExYTIyZTZkIiwidHlwZSI6ImNwdSIsInoiOiJhZWFmZjYyYjkxYTk4N2Q0IiwibmFtZSI6IiIsIm1zZ0NvcmUiOmZhbHNlLCJtc2dPdmVyYWxsIjp0cnVlLCJtc2dBcnJheSI6ZmFsc2UsIm1zZ1RlbXAiOmZhbHNlLCJ4Ijo0NTAsInkiOjM4MCwid2lyZXMiOltbIjBjMGVlNTk2NTQ5MjcyZDQiXV19LHsiaWQiOiI0YjhmNGZlYzM5ODNkNTU4IiwidHlwZSI6ImluamVjdCIsInoiOiJhZWFmZjYyYjkxYTk4N2Q0IiwibmFtZSI6IlRyaWdnZXIgZXZlcnkgNS1zZWNvbmQgaW50ZXJ2YWwuIiwicHJvcHMiOltdLCJyZXBlYXQiOiI1IiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoxOTAsInkiOjQ0MCwid2lyZXMiOltbIjAzMDFiYmU2MTFhMjJlNmQiLCJlMTI3NjVkMTg3YTdiNTAyIiwiNDNlODNiODdlMjAyNDI4YiIsIjU1MmI0OWI1NWZiZjgwNzEiXV19LHsiaWQiOiJlMTI3NjVkMTg3YTdiNTAyIiwidHlwZSI6Ik1lbW9yeSIsInoiOiJhZWFmZjYyYjkxYTk4N2Q0IiwibmFtZSI6IiIsInNjYWxlIjoiR2lnYWJ5dGUiLCJ4Ijo0NDAsInkiOjQyMCwid2lyZXMiOltbImZlM2QwN2NkOWY0ZjFiMjAiXV19LHsiaWQiOiI0M2U4M2I4N2UyMDI0MjhiIiwidHlwZSI6IlVwdGltZSIsInoiOiJhZWFmZjYyYjkxYTk4N2Q0IiwibmFtZSI6IiIsIngiOjQ0MCwieSI6NDYwLCJ3aXJlcyI6W1siMjk1NDFmM2RhZmQ4NWRiOSJdXX0seyJpZCI6IjU1MmI0OWI1NWZiZjgwNzEiLCJ0eXBlIjoiTG9hZGF2ZyIsInoiOiJhZWFmZjYyYjkxYTk4N2Q0IiwibmFtZSI6IiIsIngiOjQ0MCwieSI6NTAwLCJ3aXJlcyI6W1siN2IwOWIxZWFlMTRmYWMxNiJdXX0seyJpZCI6IjBjMGVlNTk2NTQ5MjcyZDQiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImFlYWZmNjJiOTFhOTg3ZDQiLCJuYW1lIjoiQ1BVIFVTQUdFIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoiZGF0YSIsInB0IjoibXNnIiwidG8iOiJ7fSIsInRvdCI6Impzb24ifSx7InQiOiJzZXQiLCJwIjoiZGF0YS5DUFVfVVNBR0UiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZCIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo2NTAsInkiOjM4MCwid2lyZXMiOltbIjc1NDQ1YTYyYmFjMmUwYzciXV19LHsiaWQiOiJmZTNkMDdjZDlmNGYxYjIwIiwidHlwZSI6ImNoYW5nZSIsInoiOiJhZWFmZjYyYjkxYTk4N2Q0IiwibmFtZSI6Ik1FTU9SWSBVU0FHRSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImRhdGEiLCJwdCI6Im1zZyIsInRvIjoie30iLCJ0b3QiOiJqc29uIn0seyJ0Ijoic2V0IiwicCI6ImRhdGEuTUVNT1JZX1VTQUdFIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NjcwLCJ5Ijo0MjAsIndpcmVzIjpbWyI3NTQ0NWE2MmJhYzJlMGM3Il1dfSx7ImlkIjoiMjk1NDFmM2RhZmQ4NWRiOSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYWVhZmY2MmI5MWE5ODdkNCIsIm5hbWUiOiJTWVNURU0gVVBUSU1FIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoiZGF0YSIsInB0IjoibXNnIiwidG8iOiJ7fSIsInRvdCI6Impzb24ifSx7InQiOiJzZXQiLCJwIjoiZGF0YS5VUFRJTUUiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC51cHRpbWUiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NjcwLCJ5Ijo0NjAsIndpcmVzIjpbWyI3NTQ0NWE2MmJhYzJlMGM3Il1dfSx7ImlkIjoiN2IwOWIxZWFlMTRmYWMxNiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYWVhZmY2MmI5MWE5ODdkNCIsIm5hbWUiOiJMT0FEIEFWRVJBR0UiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJkYXRhIiwicHQiOiJtc2ciLCJ0byI6Int9IiwidG90IjoianNvbiJ9LHsidCI6InNldCIsInAiOiJkYXRhLkxPQURfQVZFUkFHRS5PTkVfTUlOIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQubG9hZGF2Z1swXSIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJkYXRhLkxPQURfQVZFUkFHRS5GSVZFX01JTiIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLmxvYWRhdmdbMV0iLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoiZGF0YS5MT0FEX0FWRVJBR0UuRklGVEVFTl9NSU4iLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5sb2FkYXZnWzJdIiwidG90IjoibXNnIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjY3MCwieSI6NTAwLCJ3aXJlcyI6W1siNzU0NDVhNjJiYWMyZTBjNyJdXX0seyJpZCI6Ijc1NDQ1YTYyYmFjMmUwYzciLCJ0eXBlIjoiam9pbiIsInoiOiJhZWFmZjYyYjkxYTk4N2Q0IiwibmFtZSI6IiIsIm1vZGUiOiJjdXN0b20iLCJidWlsZCI6Im1lcmdlZCIsInByb3BlcnR5IjoiZGF0YSIsInByb3BlcnR5VHlwZSI6Im1zZyIsImtleSI6InRvcGljIiwiam9pbmVyIjoiXFxuIiwiam9pbmVyVHlwZSI6InN0ciIsInVzZXBhcnRzIjpmYWxzZSwiYWNjdW11bGF0ZSI6ZmFsc2UsInRpbWVvdXQiOiIiLCJjb3VudCI6IjQiLCJyZWR1Y2VSaWdodCI6ZmFsc2UsInJlZHVjZUV4cCI6IiIsInJlZHVjZUluaXQiOiIiLCJyZWR1Y2VJbml0VHlwZSI6IiIsInJlZHVjZUZpeHVwIjoiIiwieCI6ODcwLCJ5Ijo0NDAsIndpcmVzIjpbWyJhY2YzYjc5MWQ2ODJhMTNkIl1dfSx7ImlkIjoiMjcyZWM3NDIyN2ExNTFkYiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYWVhZmY2MmI5MWE5ODdkNCIsIm5hbWUiOiJEeW5hbWljYWxseSBDb25maWd1cmUgTVFUVCBDb25uZWN0aW9uIFVzaW5nIEVudmlyb25tZW50IFZhcmlhYmxlcyIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImFjdGlvbiIsInB0IjoibXNnIiwidG8iOiJjb25uZWN0IiwidG90Ijoic3RyIn0seyJ0Ijoic2V0IiwicCI6ImJyb2tlci5icm9rZXIiLCJwdCI6Im1zZyIsInRvIjoiSE9TVCIsInRvdCI6ImVudiJ9LHsidCI6InNldCIsInAiOiJicm9rZXIucG9ydCIsInB0IjoibXNnIiwidG8iOiJQT1JUIiwidG90IjoiZW52In0seyJ0Ijoic2V0IiwicCI6ImJyb2tlci5jbGllbnRpZCIsInB0IjoibXNnIiwidG8iOiIke0ZGX0RFVklDRV9OQU1FfSR7Q2xpZW50X0lEX1NVRkZJWH0iLCJ0b3QiOiJlbnYifSx7InQiOiJzZXQiLCJwIjoiYnJva2VyLnVzZXJuYW1lIiwicHQiOiJtc2ciLCJ0byI6ImJyb2tlci5jbGllbnRpZCIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJicm9rZXIucGFzc3dvcmQiLCJwdCI6Im1zZyIsInRvIjoiRkZfREVWSUNFX0lEIiwidG90IjoiZW52In0seyJ0Ijoic2V0IiwicCI6ImJyb2tlci5mb3JjZSIsInB0IjoibXNnIiwidG8iOiJ0cnVlIiwidG90IjoiYm9vbCJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo4MjAsInkiOjU4MCwid2lyZXMiOltbIjQ4NjBjYzIzZGZjYTk3MjAiXV19LHsiaWQiOiI0ODYwY2MyM2RmY2E5NzIwIiwidHlwZSI6Im1xdHQgb3V0IiwieiI6ImFlYWZmNjJiOTFhOTg3ZDQiLCJuYW1lIjoiIiwidG9waWMiOiIiLCJxb3MiOiIwIiwicmV0YWluIjoiIiwicmVzcFRvcGljIjoiIiwiY29udGVudFR5cGUiOiIiLCJ1c2VyUHJvcHMiOiIiLCJjb3JyZWwiOiIiLCJleHBpcnkiOiIiLCJicm9rZXIiOiJmNDg0NzAyOTAzZTI5OGU3IiwieCI6MTI3MCwieSI6NTgwLCJ3aXJlcyI6W119LHsiaWQiOiJhY2YzYjc5MWQ2ODJhMTNkIiwidHlwZSI6ImNoYW5nZSIsInoiOiJhZWFmZjYyYjkxYTk4N2Q0IiwibmFtZSI6IlNldCBwYXlsb2FkIGFuZCB0b3BpYyIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiZGF0YSIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJ0b3BpYyIsInB0IjoibXNnIiwidG8iOiJmYWN0b3J5L2xpbmUyLyR7RkZfREVWSUNFX05BTUV9IiwidG90IjoiZW52In1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjEwODAsInkiOjQ0MCwid2lyZXMiOltbIjQ4NjBjYzIzZGZjYTk3MjAiXV19LHsiaWQiOiI3OWRmYzYyYjRiMjFkMjBiIiwidHlwZSI6ImluamVjdCIsInoiOiJhZWFmZjYyYjkxYTk4N2Q0IiwibmFtZSI6IlRyaWdnZXIgb24gZGVwbG95IiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6dHJ1ZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjEwLCJ5Ijo1ODAsIndpcmVzIjpbWyIyNzJlYzc0MjI3YTE1MWRiIl1dfSx7ImlkIjoiZjQ4NDcwMjkwM2UyOThlNyIsInR5cGUiOiJtcXR0LWJyb2tlciIsIm5hbWUiOiIiLCJicm9rZXIiOiJsb2NhbGhvc3QiLCJwb3J0IjoxODgzLCJjbGllbnRpZCI6IiIsImF1dG9Db25uZWN0IjpmYWxzZSwidXNldGxzIjpmYWxzZSwicHJvdG9jb2xWZXJzaW9uIjo0LCJrZWVwYWxpdmUiOjYwLCJjbGVhbnNlc3Npb24iOnRydWUsImF1dG9VbnN1YnNjcmliZSI6dHJ1ZSwiYmlydGhUb3BpYyI6IiIsImJpcnRoUW9zIjoiMCIsImJpcnRoUmV0YWluIjoiZmFsc2UiLCJiaXJ0aFBheWxvYWQiOiIiLCJiaXJ0aE1zZyI6e30sImNsb3NlVG9waWMiOiIiLCJjbG9zZVFvcyI6IjAiLCJjbG9zZVJldGFpbiI6ImZhbHNlIiwiY2xvc2VQYXlsb2FkIjoiIiwiY2xvc2VNc2ciOnt9LCJ3aWxsVG9waWMiOiIiLCJ3aWxsUW9zIjoiMCIsIndpbGxSZXRhaW4iOiJmYWxzZSIsIndpbGxQYXlsb2FkIjoiIiwid2lsbE1zZyI6e30sInVzZXJQcm9wcyI6IiIsInNlc3Npb25FeHBpcnkiOiIifV0="
---
::



## Setting Environment Variables for a Device Group

After confirming that your flow in the development stage remote instance works as expected and connects to the broker correctly, the next step is to add environment variables.

If your target stage has only a single instance, you can set the environment variables at the instance level, as shown in the image below, and use the first method discussed earlier. This approach is straightforward and efficient for configuring a single instance using environment variables.

![Setting environment variables at the instance level in FlowFuse.](/blog/2025/03/images/env-vars-blur.png){data-zoomable}
_Setting environment variables at the instance level in FlowFuse._

However, when multiple remote instances exist within the same stage, such as in a device group, configuring them individually can be impractical, especially when most settings remain the same. To simplify this process, FlowFuse allows you to set environment variables at the device group level, and you can use the second method to make the configuration quick and easy while using remote instance default environment variables.

To add the device group level environment variables follow the steps:

1. Go to your **device group’s settings** in the FlowFuse platform.
2. Add the following environment variables with the appropriate values:

   - `HOST`
   - `PORT`
   - `CLIENT_ID_SUFFIX`

3. Click **Save Settings** to apply the changes.

![Configuring environment variables at the device group level.](/blog/2025/03/images/env-settings.png){data-zoomable}
_Configuring environment variables at the device group level._

With this approach, you do not need to set environment variables separately for each instance. Instead, the environment variables defined at the device group level will apply to all remote instances within the group, ensuring a consistent and efficient configuration.

## Deploying Flow with Stage-Specific Configurations via DevOps Pipeline

Now that everything is set up, trigger the deployment pipeline for the development stage. This will push the flow and settings to the next-stage instances while preserving the existing environment variables. Before applying the new configuration, all remote instances in the target stage will restart automatically.

![Deploying Node-RED flows using FlowFuse's DevOps pipeline.](/blog/2025/03/images/devops-pipeline.png){data-zoomable}
_Deploying Node-RED flows using FlowFuse's DevOps pipeline._

If everything is configured correctly, the MQTT nodes in each remote Node-RED instance will connect to the appropriate broker configured at the device group level.

## Monitoring MQTT Topic Hierarchy with FlowFuse

Once the Node-RED flow is deployed on all remote instances in the device group and the MQTT nodes in each instance are connected to the broker, you can monitor and manage all topics across all brokers directly in FlowFuse.

![Monitoring MQTT topics in FlowFuse across multiple brokers.](/blog/2025/03/images/mqtt-broker-monitoring.png){data-zoomable}
_Monitoring MQTT topics in FlowFuse across multiple brokers._

Watch this short video to learn how to bring your own brokers for topic monitoring in FlowFuse: [https://youtube.com/shorts/-8TPXb0h0vA?si=wi3wghi4vUWlXJTZ](https://youtube.com/shorts/-8TPXb0h0vA?si=wi3wghi4vUWlXJTZ)

## Conclusion

FlowFuse makes it easy to deploy Node-RED flows while ensuring each stage connects to the right MQTT broker. By using environment variables at both the instance and device group levels, you can automate MQTT configurations, reducing manual setup and ensuring consistency.

[Get Started Now](https://app.flowfuse.com/account/create)
