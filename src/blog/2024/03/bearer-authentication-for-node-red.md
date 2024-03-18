---
title: How to leverage bearer authentication token in FlowFuse
subtitle: Want to leverage bearer authentication for your applications?
description: Introducing the ability to add bearer authentication in addition to existing security options.
date: 2024-03-19
authors: ["grey-dziuba"]
image: 
video: "nGAlmU-eJKE"
tags:
    - posts
    - flowfuse
    - instance protection
    - feature update
---

Often, when authenticating between machines, bearer authentication is a better choice. In our most recent release, we have added the ability to leverage bearer authentication between your applications in addition to user/password combinations.

<!--more-->


> Here at FlowFuse, security is always top of mind, especially when integrating with HTTP nodes and making API calls. Instead of leveraging the common authentication method with a username and password, we have introduced bearer authentication, often used in web applications. Let me guide you through the steps to set that up.
> Now, the first step we need to do is navigate over to the applications. What we're going to do is select the instance in which we want to create a token for. Go to Settings > Security > Select "FlowFuse User Authentication". From here, we'll click "Add Token". Give it a name, and if you'd like, add an expiry date. Click "Create", then "Copy to Clipboard". Make sure to save this because this will be the only time you see it. Click "Done".
> Now, you have your Bearer token that can be used in your applications.

# Step by Step Guide to Create a bearer Token

## Step 1: Navigate to Your Application

Start by accessing your FlowFuse dashboard. Here, you'll be managing your instances and their security settings.

```Applications > Instance```

## Step 2: Access Security Settings
Once you've selected the appropriate instance for which you want to create a token, navigate to its security settings.

```Settings > Security > FlowFuse User Authentication```

## Step 3: Add a New Token

In the User Authentication section, you're going to:

Click on **Add Token**.
Provide a name for your token. Naming your token helps you identify its use or the application it's associated with.
Optionally, you can set an expiry date for the token. This is useful for temporary access or to enforce periodic token renewal for enhanced security.

## Step 4: Create and Save Your Token
After filling in the details, click **Create**.
Click **Copy to Clipboard**. It’s crucial to save your token securely at this stage, as this is the only opportunity you will have to do so.

Note: Ensure you store the token in a secure location. This is the only time it will be visible.

## Step 5: Completion

Once you've copied and securely stored your token:

Click **Done**.

Congratulations! You now have a Bearer token that can be used with your applications to ensure secure authentication.