---
title: Instance Protection Mode in FlowFuse
subtitle: How to add a extra layer of protection to those critical applications.
description: How to add a extra layer of protection to those critical applications.
date: 2024-03-19
authors: ["grey-dziuba"]
image: 
video: yjy8KMe1b5Q
tags:
    - posts
    - flowfuse
    - instance protection
    - feature update
---

Have you ever wanted to have an extra layer of protection for your Node-RED instances.  For example being able to prevent it from automatically restarted, code change, or deleted?  We this new feature you able to prevent just that for an extra layer of protection.

<!--more-->


> How many of you have horror stories because of unintentionally shutting down critical business operations? Don't look at me; I've never done that.
> Often times, applications that get deployed end up becoming critical to business operations. With Node-RED, that happens often. You don't want applications restarted, adjusted, or written over without the correct approval. Here at FlowFuse, we've created a second level of protection for those business-critical processes.
> All you have to do is go inside of your instances. You can start from applications and look for that particular instance that you would like to protect. Click on the instance, go to settings, clicked on "Protect Instance," and select "Enable Protection Mode."
> You'll notice, up at the top right, that it says "Protected." To have the privileges to enable Protection Mode, travel over to "Members." If you want to create a new member that has access, they must have a type "Owner" to be able to enable and disable Protection Mode.

## Step 1: Access Your Instances
First, navigate to your list of applications to find the specific instance you wish to protect.

1. Start from the applications overview.
2. Select the Application.
3. Look for the particular instance you're aiming to protect.

## Step 2: Enable Protection Mode
Once you've identified the instance, it's time to enable Protection Mode to safeguard it.

1. Click on the desired instance to view its details.
2. Go to the settings menu.
3. Click on "Protect Instance."
4. Select "Enable Protection Mode."

Upon enabling, you will see a notification at the top right corner indicating that the instance is now "Protected."

## Step 3: Manage Access
Protection Mode restricts access to modifying or disabling the protection settings. If you wish to grant someone access to these settings, you must assign them a specific role.

1. Navigate to the "Members" section.
2. To add a new member with access rights, click on "Create New Member."
3. Assign the member a role with "Owner" privileges.

Owners have the ability to enable and disable Protection Mode, ensuring that only authorized personnel can make changes to the protection settings of your critical business processes.