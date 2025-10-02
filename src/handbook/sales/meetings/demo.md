# Demo

This document explains the process of delivering a sales demo of the features of FlowFuse. It is not intended to cover all features but to give potential customers a good understanding of FlowFuse's value.

## Setup - Before the Demo

We have a team prepared on FlowFuse Cloud called [Acme Manufacturing Corp](https://app.flowfuse.com/team/acme-man-corp/overview) which includes everything you will need to complete this demo.

## Script for FlowFuse Demo

1.  **Introduction to FlowFuse**
    *   Explain that FlowFuse is a platform that allows users to host and manage instances of Node-RED, a popular open-source flow-based programming tool.
    *   Mention that FlowFuse can be deployed in the cloud (e.g., AWS), on-premises, or in air-gapped networks, and the workflows demonstrated will work the same way regardless of the deployment model.
    *   Highlight that FlowFuse provides a centralized way to manage multiple instances of Node-RED, both hosted directly on the FlowFuse server and remote instances running on edge devices.

2.  **Interacting with Remote Node-RED Instances**
    *   Demonstrate accessing a remote instance of Node-RED running on an edge device.
    *   Explain the secure tunnel connection established from the web browser to the edge instance using HTTPS, which allows outbound-only connectivity from the edge to the FlowFuse server.
    *   Open the Node-RED editor for the remote instance and show the flow that is simulating data from a production cell, including information about the current shift, temperature, cycle time, recipe, and production progress.
    *   Highlight that the remote instances can continue to operate and collect data even when network connectivity to the FlowFuse server is intermittent, as the data is buffered and sent when the connection is restored.

3.  **DevOps Workflows**
    *   Make a simple change to the Node-RED flow, such as adding an inject node that outputs the string "hello demo".
    *   Demonstrate the process of creating a new snapshot of the flow, which captures the specific versions of Node-RED and all dependencies.
    *   Explain how the "target" setting ensures that the development instance will continue to run the new snapshot after the deployment, rather than reverting to a previous version.
    *   Use the language model feature to automatically generate a concise description of the changes made to the flow.
    *   Show how to deploy the new version from the development environment to the staging environment, highlighting the separation of concerns between the development and testing teams.
    *   Explain the use of environment variables to manage different configurations (e.g., database credentials) for each stage (development, staging, production).
    *   Deploy the new version from staging to the production environments in Japan, Europe, and the USA, demonstrating the speed and consistency of the deployment process.
    *   Validate the deployment by opening a tunnel to one of the production instances and verifying that the "hello demo" change is present.

4.  **Data Aggregation and Visualization**
    *   Explain how the data from the remote Node-RED instances is being published to an MQTT topic using the Project Link nodes, which abstract away the complexity of setting up the MQTT broker.
    *   Demonstrate a hosted instance of Node-RED that is subscribing to the MQTT topic and formatting the data, including identifying the source of each payload based on the environment variables.
    *   Show the dashboard that is displaying the aggregated data from all the production cells, including the status (running, stopped), production metrics (actual vs. projected), temperature, and the ability to acknowledge and log stoppages.
    *   Highlight the benefits of the Unified Namespace (UNS) approach, which makes the data easily accessible to any authorized application or user within the organization.

5.  **Additional Features**
    *   Discuss the Bill of Materials feature, which provides an audit of all the software dependencies (Node-RED versions, custom nodes, etc.) used in the application.
    *   Explain how this information can be used to quickly identify and update dependencies if a security vulnerability is discovered in a specific version.
    *   Demonstrate the user management and role-based access control features, and how they integrate with the organization's identity provider (e.g., Microsoft, Google) for seamless user provisioning and de-provisioning.
    *   Showcase the Team Library and Blueprints features, which allow sharing of best practices and reusable Node-RED flows within the organization.
    *   Highlight how the Team Library can be used to share code snippets, while Blueprints provide complete, ready-to-use Node-RED flows for common use cases.

6.  **Conclusion**
    *   Summarize the key capabilities of the FlowFuse platform demonstrated in the demo, such as remote Node-RED management, DevOps workflows, data aggregation, visualization, and the additional features that enhance collaboration and governance.
    *   Emphasize how the platform can help organizations streamline their industrial automation and IoT initiatives by providing a centralized, secure, and scalable solution for managing their Node-RED deployments.
    *   Encourage the audience to explore the FlowFuse platform further and consider how it could benefit their own use cases, whether in manufacturing, energy, transportation, or other industries.

## More Resources

A video recording of this demo can be [accessed here](https://drive.google.com/file/d/1cHSSQVFol-EyfhHUYtJxSZp4_O7KMYhp/view?usp=sharing).

The technical setup for this demo is [documented here](https://github.com/FlowFuse/CloudProject/blob/main/infrastructure/docs/sales_demo_environment.md).