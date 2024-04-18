---
title: Running the FlowFuse Device Agent as a service on a Raspberry Pi
subtitle: Step by step guide to run the device agent as a service
description: Learn how to run the FlowFuse Device Agent as a service on your Raspberry Pi with this step-by-step guide. Ensure uninterrupted operation even after device restarts.
date: 2023-05-02
authors: ["rob-marcer"]
image: /blog/2023/05/images/agent-on-pi.png
tags:
    - posts
    - flowfuse
    - how-to
    - raspberry pi 
---

FlowFuse's device agent allows you to manage and run your Node-RED instances on
your own hardware such as a Raspberry Pi. This can be very useful where an
application you've written needs to run flows with direct access to hardware sensors.

In this article I'm going to explain the steps to configure our device agent to run as a service in Raspbian OS,
or any other OS that uses systemd.

<!--more-->

## Why run the device agent as a service?

The standard process for running FlowFuse's device agent is to start it on the
command line using the command `flowforge-device-agent`. This works fine for testing
but for long-term installations it's useful to run the device agent as a service.
Once running as a service, the device agent will continue to run even if your
device is restarted or your SSH connection to your Pi fails. 

## Set up steps

### Create the Service File

The first step is creating the systemd unit file for your service. You can start by creating a new file in the 
`/etc/systemd/system` directory with a .service file extension:

`sudo nano /etc/systemd/system/flowforge-device-agent.service`

### Define the Service

In the service file, you'll need to define the following parameters:

- `Description`: A brief description of what the service does.
- `ExecStart`: The command(s) to execute to start the service.
- `User and Group`: The user and group that the service runs as.
- `Type`: Whether the service is a simple or a forking type.

We've created the content you'll need for this file and shared it via [this GitHub page](https://github.com/FlowFuse/device-agent/blob/main/service/flowfuse-device.service).

Copy the code from that page into the nano window you created in step 1, then save and exit out of nano.

### Starting the service on boot (optional)

If you want Node-RED to run when the Pi is turned on, or re-booted, you can enable the service to autostart by running the command:

`sudo systemctl enable flowforge-device-agent.service`

To disable the service, run the command:

`sudo systemctl disable flowforge-device-agent.service`

### Using your new service

You can now start your service with the start command:

`sudo systemctl start flowforge-device-agent`

You can check the current status with the status command:

`sudo systemctl status flowforge-device-agent`

Finally, if you need to stop your agent you can do so with the command:

`sudo systemctl stop flowforge-device-agent`

## Further reading

If you'd like to learn about using services via the systemctl command you can access
the help text by running `systemctl -h` from your Pi terminal.
