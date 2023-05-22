## Demo

This document explains the process of delivering a sales demo of the features of FlowForge. It is not intended to cover all features but to give potential customers a good understanding of FlowForge's value.

### Setup (complete before the demo)

Before we begin a sales demo we need to set up an environment.

[Create a coupon](https://flowforge.com/handbook/operations/billing/#coupons) with the value of $50usd, note down the coupon code. 

Make sure you are already logged into your flowforge account (@flowforge.com email) on production, not as an administrator.

Create a new team for this demo, you need to do this before the demo so that you don’t have to show your credit card details on screen. Use the coupon to assign your new team the $50 credit.

Create one instance called ‘central’, leave the rest to be created in the demo.

Make sure you have an example device ready, [install the latest device agent](https://flowforge.com/docs/user/devices/).


Make sure the device agent is running before you start the demo.

The script should not be followed word for word, it's more a suggestion of what to say which fits with what will be displayed. Be natural, use your own words.

### Script

FlowForge makes it easy for teams of developers to collaborate on creating, maintaining, and improving applications built in Node-RED.

It can manage instances of Node-RED running on FlowForge Cloud, a version of FlowForge hosted by yourselves, and on your own hardware, for example devices running sensors on your shop floor.

In this demo we're going to focus on the key features of FlowForge, there is a lot that we're not going to cover to keep this suitably brief but we will have some time after the demo for any questions.

#### Key Concepts

To start, let’s cover some key concepts: which are Teams, Applications, Instances, Devices and Snapshots.

##### Teams

A team is a group of developers who are working together on a Node-RED application. Once a user is invited to a team they can have either read only or full access to all the applications in that team.

##### Applications

An application is one or more Node-RED instances working together to deliver an overall feature or goal.

##### Instances

An instance is one instance of Node-RED running either on FlowForge or a device.

##### Devices

Devices allow you to deploy flow from FlowForge directly to hardware in your premises. Devices are often used with PLCs where an application needs direct access to hardware sensors or needs to be able to show data on a HMI on a shop floor.

##### Snapshots

Snapshots allow you to keep a history of your instances and applications and easily deploy or revert to a given snapshot.

#### Live Demo

Now we’ve covered off some of the key concepts, let's run through some common tasks on how FlowForge makes them easier.

Firstly, we’ll create a new application with 3 instances.

The first instance is going to be a central data processing system.

The second is going to be deployed to PLCs in a factory. Each device has access to hardware sensors on a piece of manufacturing equipment.

The third instance will provide a HMI which would be accessed via installed devices on the shop floor (mounted tablets) as well as via mobile devices carried by managers and engineers.

So, I’ve now spun up three instances with descriptive names. At this time all the instances are running on FlowForge, we’ll look at how to deploy the instance to the PLC once we have a system up and running.

FlowForge has a fantastic feature build in which is called Project Link Nodes. These nodes leverage the MQTT protocol to pass data securely from each of the instances within an application. We are going to be using the project link nodes to pass data from the on-site devices to the central processing system. The HMI will also use this same communication method to pull down the data needed to populate its interface.

I’m going to install [node-red-contrib-os](https://flows.nodered.org/node/node-red-contrib-os), it’s a great node which can pull data from the hardware Node-RED is running on. I’m using that to simulate data coming from the shop floor device. In a real world example we’d usually be collecting data via USB or GPIO sensors but the data from the device is a good proxy.

I’m now going to set the device to poll the device every second and send the payload over the project link to the central server. I’ve added a local debug so we can see the data.

You can map the data from each instance to another as well as giving the data a topic so you can have multiple sets of data flowing from the same device.

Now that’s in place I’m going to configure the central server to receive and output that data to the debug. 

Let’s now move the device instance to the actual device it’s going to run on.

To do that I’m going to take a snapshot of the instance, associate the device with it then set the snapshot as a target.

OK, we can now see the flow being deployed to the device and the data is now coming in from two places, from the instance on FlowForge as well as the device. 

To save on resources I’m going to pause the instance on FlowForge, you can leave an instance paused on FlowForge, you are only charged for the time it is running.

We can now see we are only getting one payload per second.

Maybe once a second is a little too often, let’s make that change directly on the device.

I’m going to put the device into development mode then open up the design interface directly on that device. What’s great about this is, that device can be anywhere in the world, as long as it can connect out to the internet we can access it, view debug and as we are going to do now make changes to the flow.

I’ve changed the inject to only run every 5 seconds. I can deploy that change but I also want to store the correct snapshot back in FlowForge. This is really useful where you are running multiple devices with the same instance on them all.

Back in FlowForge I’ve taken a snapshot, set it as the target snapshot and set the device to no longer be in development mode.

We can now link up the central device to store the data, potentially in SQL or a time series database such as InfluxDB. There are easy to use custom nodes for both. I’m not going to set that up now to save us a little time but it’s something that’s easy to get working.

OK, so finally, let’s look at the HMI instance. We’ll store the latest data on the central server then allow the HMI to request the data as needed.

Again, we’ll use the project link nodes to do that. This time we will make the request from the HMI, grab the data and return it back. This puts the HMI in control of how often it gets new data.

Let’s build a simple dashboard to show the data. We’ll use [node-red-dashboard](https://flows.nodered.org/node/node-red-dashboard) so let’s get that installed.

I’m going to output the current RAM usage onto a graph which shows data for the last hour. This graph will auto update. This system will request new data every 10 seconds. Let’s also output the current value in a gauge.

You can access the HMI yourself now if you want, the URL is…

### End of Demo

Hopefully this demo has given you some good examples of how FlowForge offers significant value beyond a standard Node-RED installation.

There is a lot I’ve not covered today so we can have a good amount of time for questions. If there are features of FlowForge I’ve not mentioned that are of interest or if you’d like to ask more about what I have covered today I’d be happy to hear your questions.

### Housekeeping

Once the demo is complete insure you shutdown all devices, delete all instances, and delete all applications within the team you created.
