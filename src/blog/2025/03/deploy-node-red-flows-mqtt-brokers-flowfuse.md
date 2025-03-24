---
title: "How to Deploy Node-RED Flows with MQTT Brokers Per Pipeline Stage Using FlowFuse"
subtitle: Automating MQTT Configuration in FlowFuse Using Environment Variables
description: Learn how to configure MQTT brokers dynamically in FlowFuse using environment variables at both instance and device group levels. Streamline deployments across pipeline stages and monitor MQTT topics efficiently.
date: 2025-03-24
authors: ["sumit-shinde"]
image:
tags:
   - flowfuse
---

FlowFuse simplifies deploying Node-RED flows at scale with its DevOps pipelines and device groups feature. However, different pipeline stages may require separate MQTT brokers, such as one for development and another for production. Manually configuring each stage can be tedious, especially when managing multiple remote instances (devices).

<!--more-->

## Goal and Prerequisites

This article shows how to continue using FlowFuse’s one-click deployment while ensuring that remote instances in each stage of your pipeline connect to the desired MQTT broker without manual configuration.

To proceed, ensure the DevOps pipeline is created with the correct stages. If a stage includes remote instances, verify that all instances are running the [FlowFuse Device Agent](/docs/device-agent/install/) and are connected to your FlowFuse team.

For more information on how to create a DevOps pipeline, refer to [How to Build and Automate DevOps Pipelines for Node-RED Deployments](/blog/2024/10/how-to-build-automate-devops-pipelines-node-red-deployments/). For instructions on creating a device group, refer to the [Device Groups Documentation](/docs/user/device-groups/).

## Setting Environment Variables for Development Instance

In this guide, environment variables will ensure that each pipeline stage connects to the correct MQTT broker without manual intervention, enabling a seamless deployment process.

Since the flow will be built and tested in the development instance, start by configuring the necessary environment variables for its MQTT settings. Setting these up first ensures the flow functions correctly before deploying it to other pipeline stages.

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

Now, let's explore how these environment variables can be used in Node-RED to configure the MQTT connection. Node-RED provides multiple ways to reference environment variables. Here are two primary methods for configuring MQTT nodes using environment variables, each with a different approach to accessing them:

### 1. Using the Configuration Dialog: 

Environment variables can be directly referenced in the MQTT node properties using the `${ENV_NAME}` syntax as shown in the following images.

![Configuring MQTT node security settings using environment variables in Node-RED.](./images/mqtt-node-security-config.png){data-zoomable}
_Configuring MQTT node security settings using environment variables in Node-RED._

![Setting up MQTT connection using environment variables.](./images/mqtt-node-security-config.png){data-zoomable}
_Setting up MQTT connection using environment variables._

![Configuring the MQTT topic in Node-RED using environment variables.](./images/mqtt-broker-out-config.png){data-zoomable}
_Configuring the MQTT topic in Node-RED using environment variables._

### 2. Setting Values Dynamically via the `msg` Object

In this approach, a **Change node** retrieves environment variables and sets the necessary MQTT configuration properties in the `msg` object. These properties include:

- `msg.broker.broker` – The MQTT broker’s URL or IP address.
- `msg.action` – Must be set to `"connect"` when establishing a connection.
- `msg.broker.force` – Must be set to `true` to enforce the connection.
- `msg.broker.port` – The port number for the MQTT connection.
- `msg.broker.clientid` – The unique client identifier for the device.
- `msg.broker.username` – The MQTT username for authentication.
- `msg.broker.password` – The MQTT password for authentication.
- `msg.topic` – The MQTT topic to which the device will publish or subscribe.

While the first method (direct reference in the MQTT node) is more straightforward and does not require additional nodes, it has limitations. It works well when only a single instance is in the pipeline stage. However, when multiple instances exist within the same stage, the client ID, username, password, and topics often vary from device to device. The second method provides greater flexibility by dynamically adjusting these values, ensuring each device connects with the correct credentials and configurations. This approach makes the setup scalable and adaptable, eliminating the need for manual updates during deployment.

#### Ensuring Unique MQTT Credentials and Topics

As mentioned in the multi-device deployment scenario, each device must establish its connection to the MQTT broker while maintaining unique credentials and topics. If multiple devices within the same stage share identical configurations, connection conflicts—such as client ID duplication—can occur, causing the MQTT node to connect and disconnect repeatedly, potentially leading to data loss.

To ensure uniqueness, we can use the default environment variables available for each remote instance, such as:

- `FF_DEVICE_NAME`
- `FF_DEVICE_ID`

When generating the client ID for the MQTT broker, the device name (value of  the`FF_DEVICE_NAME` environment variable) can be used as the username. Since all client IDs share the same suffix, this suffix can be stored as a device-level environment variable (as `CLIENT_ID_SUFFIX`). By combining both values, we can get the client ID for the device without manual intervention.

For the password, you can use the device ID (value of `FF_DEVICE_ID` environment variable), which is assigned when creating the broker client. Alternatively, you can set a common password for all clients by defining it as a device group-level environment variable.

![Using a Change node to set MQTT broker connection properties dynamically.](./images/CHANGE-NODE.png){data-zoomable}
_Using a Change node to set MQTT broker connection properties dynamically._

For topics, a combination of a string and `FF_DEVICE_NAME` can be used to ensure uniqueness.

![Configuring MQTT topics dynamically using a Change node in Node-RED.](./images/CHANGE-NODE-TOPIC.png){data-zoomable}
_Configuring MQTT topics dynamically using a Change node in Node-RED._

*Note: Ensure that the topic configuration is set dynamically when sending the payload, not when establishing the connection.*

Once you have built your flow to connect to the intended MQTT broker using environment variables, deploy it and verify that it works as expected.

The following flow is provided as an example for testing and further exploration. It demonstrates how to dynamically configure the MQTT connection using environment variables and, where necessary, generate settings by combining strings with environment variables.

{% renderFlow %}
[{"id":"aeaff62b91a987d4","type":"tab","label":"FlowFuse Device Flow","disabled":false,"info":""},{"id":"f484702903e298e7","type":"mqtt-broker","name":"","broker":"localhost","port":1883,"clientid":"","autoConnect":false,"usetls":false,"protocolVersion":4,"keepalive":60,"cleansession":true,"autoUnsubscribe":true,"birthTopic":"","birthQos":"0","birthRetain":"false","birthPayload":"","birthMsg":{},"closeTopic":"","closeQos":"0","closeRetain":"false","closePayload":"","closeMsg":{},"willTopic":"","willQos":"0","willRetain":"false","willPayload":"","willMsg":{},"userProps":"","sessionExpiry":""},{"id":"0301bbe611a22e6d","type":"cpu","z":"aeaff62b91a987d4","name":"","msgCore":false,"msgOverall":true,"msgArray":false,"msgTemp":false,"x":450,"y":380,"wires":[["0c0ee596549272d4"]]},{"id":"4b8f4fec3983d558","type":"inject","z":"aeaff62b91a987d4","name":"Trigger every 5-second interval.","props":[],"repeat":"5","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":190,"y":440,"wires":[["0301bbe611a22e6d","e12765d187a7b502","43e83b87e202428b","552b49b55fbf8071"]]},{"id":"e12765d187a7b502","type":"Memory","z":"aeaff62b91a987d4","name":"","scale":"Gigabyte","x":440,"y":420,"wires":[["fe3d07cd9f4f1b20"]]},{"id":"43e83b87e202428b","type":"Uptime","z":"aeaff62b91a987d4","name":"","x":440,"y":460,"wires":[["29541f3dafd85db9"]]},{"id":"552b49b55fbf8071","type":"Loadavg","z":"aeaff62b91a987d4","name":"","x":440,"y":500,"wires":[["7b09b1eae14fac16"]]},{"id":"0c0ee596549272d4","type":"change","z":"aeaff62b91a987d4","name":"CPU USAGE","rules":[{"t":"set","p":"data","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"data.CPU_USAGE","pt":"msg","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":650,"y":380,"wires":[["75445a62bac2e0c7"]]},{"id":"fe3d07cd9f4f1b20","type":"change","z":"aeaff62b91a987d4","name":"MEMORY USAGE","rules":[{"t":"set","p":"data","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"data.MEMORY_USAGE","pt":"msg","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":670,"y":420,"wires":[["75445a62bac2e0c7"]]},{"id":"29541f3dafd85db9","type":"change","z":"aeaff62b91a987d4","name":"SYSTEM UPTIME","rules":[{"t":"set","p":"data","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"data.UPTIME","pt":"msg","to":"payload.uptime","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":670,"y":460,"wires":[["75445a62bac2e0c7"]]},{"id":"7b09b1eae14fac16","type":"change","z":"aeaff62b91a987d4","name":"LOAD AVERAGE","rules":[{"t":"set","p":"data","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"data.LOAD_AVERAGE.ONE_MIN","pt":"msg","to":"payload.loadavg[0]","tot":"msg"},{"t":"set","p":"data.LOAD_AVERAGE.FIVE_MIN","pt":"msg","to":"payload.loadavg[1]","tot":"msg"},{"t":"set","p":"data.LOAD_AVERAGE.FIFTEEN_MIN","pt":"msg","to":"payload.loadavg[2]","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":670,"y":500,"wires":[["75445a62bac2e0c7"]]},{"id":"75445a62bac2e0c7","type":"join","z":"aeaff62b91a987d4","name":"","mode":"custom","build":"merged","property":"data","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","useparts":false,"accumulate":false,"timeout":"","count":"4","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"","reduceFixup":"","x":870,"y":440,"wires":[["acf3b791d682a13d"]]},{"id":"272ec74227a151db","type":"change","z":"aeaff62b91a987d4","name":"","rules":[{"t":"set","p":"action","pt":"msg","to":"connect","tot":"str"},{"t":"set","p":"broker.broker","pt":"msg","to":"HOST","tot":"env"},{"t":"set","p":"broker.port","pt":"msg","to":"PORT","tot":"env"},{"t":"set","p":"broker.username","pt":"msg","to":"$env(\"FF_DEVICE_NAME\") & $env(\"Client_ID_SUFFIX\")","tot":"jsonata"},{"t":"set","p":"broker.password","pt":"msg","to":"PASSWORD","tot":"env"},{"t":"set","p":"broker.clientid","pt":"msg","to":"$string($env(\"FF_DEVICE_NAME\")) & $string($env(\"Client_ID_SUFFIX\"))","tot":"jsonata"},{"t":"set","p":"broker.force","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":580,"y":580,"wires":[["4860cc23dfca9720"]]},{"id":"4860cc23dfca9720","type":"mqtt out","z":"aeaff62b91a987d4","name":"","topic":"","qos":"0","retain":"","respTopic":"","contentType":"","userProps":"","correl":"","expiry":"","broker":"f484702903e298e7","x":1170,"y":580,"wires":[]},{"id":"acf3b791d682a13d","type":"change","z":"aeaff62b91a987d4","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"data","tot":"msg"},{"t":"set","p":"topic","pt":"msg","to":"\"/factory/line2/\" & $string($env(\"FF_DEVICE_NAME\"))","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":1040,"y":440,"wires":[["4860cc23dfca9720"]]},{"id":"79dfc62b4b21d20b","type":"inject","z":"aeaff62b91a987d4","name":"Trigger on deploy","props":[],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","x":210,"y":580,"wires":[["272ec74227a151db"]]}]
{% endrenderFlow %}

## Setting Environment Variables for a Device Group

After confirming that your flow in the development instance works as expected and connects to the broker correctly, the next step is to add environment variables.

If your target stage has only one instance, you can set the environment variables at the instance level, as shown in the image below, and use the first method discussed above. This approach is straightforward and efficient.

However, when multiple remote instances exist within the same stage, such as in a device group, configuring them individually can be impractical, especially when most settings remain the same. To simplify this process, FlowFuse allows you to set environment variables at the device group level, and you can use the second method to make the configuration quick and easy while using remote instance default environment variables.

To add the device group level environment variables, follow the steps:

1. Go to your **device group’s settings** in the FlowFuse platform.
2. Add the following environment variables with the appropriate values:

   - `HOST`
   - `PORT`
   - `CLIENT_ID_SUFFIX`

3. Click **Save Settings** to apply the changes.

![Configuring environment variables at the device group level.](./images/env-settings.png){data-zoomable}
_Configuring environment variables at the device group level._

With this approach, you do not need to set environment variables separately for each instance. Instead, the environment variables defined at the device group level will apply to all remote instances within the group, ensuring a consistent and efficient configuration.

## Deploying Flow with Stage-Specific Configurations via DevOps Pipeline

Now that everything is set up trigger the deployment pipeline for the development stage. This will push the flow and settings to the next stage while preserving the existing environment variables. Before applying the new configuration, all remote instances in the target stage will restart automatically.

![Deploying Node-RED flows using FlowFuse's DevOps pipeline.](./images/devops-pipeline.png){data-zoomable}
_Deploying Node-RED flows using FlowFuse's DevOps pipeline._

If everything is configured correctly, the MQTT nodes in each remote Node-RED instance will connect to the appropriate broker configured at the environment settings.

## Monitoring MQTT Topic Hierarchy with FlowFuse

Once the Node-RED flow is deployed on all remote instances in the device group and the MQTT nodes in each instance are connected to the broker, you can monitor and manage all topics across all brokers directly in FlowFuse.

![Monitoring MQTT topics in FlowFuse across multiple brokers.](./images/broker-topic-monitoring.png){data-zoomable}
_Monitoring MQTT topics in FlowFuse across multiple brokers._

Watch this short video to learn how to bring your brokers for topic monitoring in FlowFuse: [https://youtube.com/shorts/-8TPXb0h0vA?si=wi3wghi4vUWlXJTZ](https://youtube.com/shorts/-8TPXb0h0vA?si=wi3wghi4vUWlXJTZ)

## Conclusion

FlowFuse makes it easy to deploy Node-RED flows while ensuring each stage connects to the right MQTT broker. You can automate MQTT configurations by using environment variables at both the instance and device group levels, reducing manual setup and ensuring consistency.

🚀 [Get Started Now](https://app.flowfuse.com/account/create/)
