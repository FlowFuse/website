## Demo

This document explains the process of delivering a sales demo of the features of FlowFuse. It is not intended to cover all features but to give potential customers a good understanding of FlowFuse's value.

### Setup - Before the demo

Before we begin a sales demo we need to set up an environment. Make sure you are
already logged into your flowforge account (@flowfuse.com email) on production, not as an administrator.

Create a new team for this demo, you need to do this before the demo so that
you don’t have to show your credit card details on screen. After creating the
team, apply [this coupon](https://dashboard.stripe.com/coupons/zkNy9DxL) to your
newly created team. On the stripe team page, click "Actions" > "Apply Coupon".

Please also make this team your 'default team' under your user settings.

Create one instance called ‘central-<demo-customer-name>’, leave the rest to be created in the demo.

Make sure you have an example device ready, [install the latest device agent](/docs/user/devices/).

Create a new device in your team, download the `.yml`. Do not yet install the
agent, that's done during the demo using the web ui.

```
cd /tmp
```
```
mkdir demo-<company-name>
```
```
cd demo-<company-name>
```
```
flowforge-device-agent -d . --ui --ui-user foo --ui-pass bar
```

The script should not be followed word for word, it's more a suggestion of what to say which fits with what will be displayed. Be natural, use your own words.

### Script

FlowFuse makes it easy for teams of developers to collaborate on creating, maintaining, and improving applications built in Node-RED.

It can manage instances of Node-RED running on FlowFuse Cloud, a version of FlowFuse hosted by yourselves, and on your own hardware, for example devices running sensors on your shop floor.

In this demo we're going to focus on the key features of FlowFuse, there is a lot that we're not going to cover to keep this suitably brief but we will have some time after the demo for any questions.

#### Key Concepts

To start, let’s cover some [key concepts](/docs/user/concepts/) which are:
1. [Teams](/docs/user/concepts/#team)
1. [Applications](/docs/user/concepts/#application)
1. [Instances](/docs/user/concepts/#instance)
1. [Devices](/docs/user/concepts/#device)
1. [Snapshots](/docs/user/concepts/#instance-snapshot)

#### Live Demo

Now we’ve covered off some of the key concepts, let's run through some common tasks on how FlowFuse makes them easier.

Firstly, we’ll create a new application with 3 instances.

The first instance is going to be a central data processing system.

The second is going to be deployed to PLCs in a factory. Each device has access to hardware sensors on a piece of manufacturing equipment.

The third instance will provide a HMI which would be accessed via installed devices on the shop floor (mounted tablets) as well as via mobile devices carried by managers and engineers.

So, I’ve now spun up three instances with descriptive names. At this time all the instances are running on FlowFuse, we’ll look at how to deploy the instance to the PLC once we have a system up and running.

FlowFuse has a fantastic feature build in which is called Project Link Nodes. These nodes leverage the MQTT protocol to pass data securely from each of the instances within an application. We are going to be using the project link nodes to pass data from the on-site devices to the central processing system. The HMI will also use this same communication method to pull down the data needed to populate its interface.

I’m going to install [node-red-contrib-os](https://flows.nodered.org/node/node-red-contrib-os), it’s a great node which can pull data from the hardware Node-RED is running on. I’m using that to simulate data coming from the shop floor device. In a real world example we’d usually be collecting data via USB or GPIO sensors but the data from the device is a good proxy.

I’m now going to set the device to poll the device every second and send the payload over the project link to the central server. I’ve added a local debug so we can see the data.

You can map the data from each instance to another as well as giving the data a topic so you can have multiple sets of data flowing from the same device.

Now that’s in place I’m going to configure the central server to receive and output that data to the debug. 

Let’s now move the device instance to the actual device it’s going to run on.

To do that I’m going to take a snapshot of the instance, associate the device with it then set the snapshot as a target.

OK, we can now see the flow being deployed to the device and the data is now coming in from two places, from the instance on FlowFuse as well as the device. 

To save on resources I’m going to pause the instance on FlowFuse, you can leave an instance paused on FlowFuse, you are only charged for the time it is running.

We can now see we are only getting one payload per second.

Maybe once a second is a little too often, let’s make that change directly on the device.

I’m going to put the device into development mode then open up the design interface directly on that device. What’s great about this is, that device can be anywhere in the world, as long as it can connect out to the internet we can access it, view debug and as we are going to do now make changes to the flow.

I’ve changed the inject to only run every 5 seconds. I can deploy that change but I also want to store the correct snapshot back in FlowFuse. This is really useful where you are running multiple devices with the same instance on them all.

Back in FlowFuse I’ve taken a snapshot, set it as the target snapshot and set the device to no longer be in development mode.

We can now link up the central device to store the data, potentially in SQL or a time series database such as InfluxDB. There are easy to use custom nodes for both. I’m not going to set that up now to save us a little time but it’s something that’s easy to get working.

OK, so finally, let’s look at the HMI instance. We’ll store the latest data on the central server then allow the HMI to request the data as needed.

Again, we’ll use the project link nodes to do that. This time we will make the request from the HMI, grab the data and return it back. This puts the HMI in control of how often it gets new data.

Let’s build a simple dashboard to show the data. We’ll use [node-red-dashboard](https://flows.nodered.org/node/node-red-dashboard) so let’s get that installed.

I’m going to output the current RAM usage onto a graph which shows data for the last hour. This graph will auto update. This system will request new data every 10 seconds. Let’s also output the current value in a gauge.



You can access the HMI yourself now if you want, the URL is…

### End of Demo

Hopefully this demo has given you some good examples of how FlowFuse offers significant value beyond a standard Node-RED installation.

There is a lot I’ve not covered today so we can have a good amount of time for questions. If there are features of FlowFuse I’ve not mentioned that are of interest or if you’d like to ask more about what I have covered today I’d be happy to hear your questions.

### Housekeeping

Once the demo is complete insure you shutdown all devices, delete all instances, and delete all applications within the team you created.
