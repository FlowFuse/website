---
title: Install FlowForge Docker on Google Cloud #9
subtitle: Step my step instructions to get FLowForge Docker running on Google Cloud
description: Step my step instructions to get FLowForge Docker running on Google Cloud
date: 2022-10-24
authors: ["rob-marcer"]
---

As part of our preparation for FlowForge 1.0 we have been testing various real world scenarios to see where we can add to our documentation and where we might be able to improve our releases to make the install process easier for users. As part of that testing we have been able to hone various real world installation processes and we wanted to share one of those with you today.
<!--more-->

In this first of three articles, we are going to run through the process for installing FlowForge on a Google Cloud Platform (GCP) virtual machine (VM) using Docker.

We have set ourselves the goal of delivering a production environment. We want this installation benefit from:

- Email alerts (emails to users when they are added to teams etc),
- HTTPS access to the install,
- FlowForge Device deployment via the included MQTT server that comes in our Docker build.

We will follow up with a second article covering the process of getting HTTPS running and then we will close out the series by covering how to use the Devices features of FlowForge.

# Prerequisites

- A domain name - We've registered flowforge-demo.com to demonstrate these steps.
- A DNS provider - Our Domain registrar provides a basic DNS service for free.
- A GCP account - Google will often give you free service credits on sign up so setting up FlowForge on GCP should not cost you anything for at least a few weeks.
- An email provider which will allow SMTP connections to send email - To manage users on your FlowForge platform you will need to be able to send emails to them. We have used a Google Workspace account for this purpose.

# GCP VM Creation

Create a GCP account, once logged in navigate to Compute Engine then VM Instances. Select Create Instance you should now be [here](https://www.google.com/url?q=https://console.cloud.google.com/compute/instancesAdd?project).

Give your instance a name, select a Region and Zone. I have found that the default Machine configuration works fine but depending on your project you may wish to change the resources.

![]()
