---
title: "How to Build an Admin Dashboard with Node-RED Dashboard 2.0 (2026)"
subtitle: A guide to building an Admin Dashboard in Node-RED with Dashboard 2.0
description: Discover step-by-step instructions for developing an admin-only page in Node-RED Dashboard 2.0 using the FlowFuse Multiuser addon. Additionally, learn how to secure Dashboard 2.0 and explore the features of the FlowFuse multiuser addon.
lastUpdated: 2026-06-03
date: 2024-04-08
authors: ["sumit-shinde"]
image: /blog/2024/04/images/admin-dashboard.png
keywords: node-red admin dashboard, admin panel node-red dashboard 2, admin-only page node-red, flowfuse multiuser dashboard, role-based access node-red dashboard
tags:
   - posts
   - dashboard 2.0
   - admin dashboard
   - admin-only page
   - how-to
cta:
  type: sign-up
  title: Build Secure Admin Dashboards with Node-RED and FlowFuse
  description: FlowFuse makes it simple to secure Node-RED dashboards with user authentication, role-based access control, and multi-user support, so you can control exactly who sees what in your production dashboards.
meta:
  howto:
    name: "How to Build an Admin Panel in Node-RED with Dashboard 2.0"
    description: "Learn how to create a secure admin-only page in Node-RED Dashboard 2.0 by enabling FlowFuse user authentication, installing the Multiuser Addon, storing an admin list in global context, and dynamically showing or hiding pages based on user role."
    totalTime: "PT30M"
    tool:
      - "Node-RED"
      - "FlowFuse"
      - "Node-RED Dashboard 2.0"
      - "FlowFuse Multiuser Addon"
    steps:
      - name: "Enable FlowFuse user authentication"
        text: "In the FlowFuse instance settings, enable user authentication to add a login page that restricts dashboard access to registered FlowFuse users and exposes logged-in user data."
        url: "enabling-flowfuse-user-authentication"
      - name: "Install and explore the FlowFuse Multiuser Addon"
        text: "Install the FlowFuse Multiuser Addon for Dashboard 2.0 to access logged-in user data such as username on the dashboard."
        url: "exploring-flowfuse-multiuser-addon"
      - name: "Store a list of admin users in global context"
        text: "Use an inject node and a change node to write a JSON array of admin usernames to global.admins in Node-RED's global context."
        url: "storing-a-list-of-admin-users"
      - name: "Build the admin-only page with show/hide logic"
        text: "Add a ui-event node, a switch node that checks if the logged-in username is in the admin list, and two change nodes that set the payload to show or hide the admin page, connected to a ui-control widget."
        url: "building-an-admin-only-page"
      - name: "Hide the admin page by default"
        text: "In the Dashboard 2.0 sidebar layout tab, locate the admin page and set its visibility to hidden so regular users do not see it on first load."
        url: "hidding-admin-only-page-by-default"
      - name: "Deploy the flow and verify access"
        text: "Deploy the flow, navigate to the dashboard URL, log in, and confirm that admin users see the admin page while regular users do not."
        url: "deploying-the-flow"
  faq:
    - question: "How does Node-RED Dashboard 2.0 support role-based page visibility?"
      answer: "Dashboard 2.0 allows you to show or hide entire pages dynamically by sending a JSON payload through a ui-control widget. By checking the logged-in user's role at login (via a ui-event node and switch node), you can show the admin page only to users whose username is in the admin list."
    - question: "What is the FlowFuse Multiuser Addon and why is it needed?"
      answer: "The FlowFuse Multiuser Addon is a Dashboard 2.0 plugin that surfaces the logged-in user's profile data (username, userId, image) in every message emitted by dashboard widgets via msg._client.user. Without it, flows cannot identify who is interacting with the dashboard."
    - question: "How do I store the list of admin usernames in Node-RED?"
      answer: "Use a change node to set global.admins to a JSON array of admin usernames (e.g. ['alice', 'bob']), triggered by an inject node on deploy. The switch node can then check whether msg._client.user.username is contained in that array."
    - question: "Why should the admin page be hidden by default?"
      answer: "Setting the admin page visibility to hidden in the Dashboard 2.0 layout tab ensures that a regular user who loads the dashboard before the ui-event fires does not briefly see the admin page. The show/hide logic then runs on the connection event and grants access only to verified admins."
    - question: "Can I extend this pattern to support more than two roles?"
      answer: "Yes. You can store multiple role lists in global context (e.g. global.admins, global.managers) and add additional outputs to the switch node to show different pages for each role."
    - question: "Does this approach work for devices running Node-RED outside FlowFuse Cloud?"
      answer: "FlowFuse user authentication and the Multiuser Addon require a FlowFuse-managed instance with the FlowFuse user authentication feature enabled. For self-hosted FlowFuse installations the same approach applies as long as the feature is configured."
    - question: "What node triggers the admin check when a user opens the dashboard?"
      answer: "A ui-event node configured for the relevant UI base fires whenever a user connects to or navigates within the dashboard. Its output carries msg._client.user, which the switch node uses to look up the user in the admin list stored in global context."
tldr: "This guide shows how to build a secure admin-only page in Node-RED Dashboard 2.0 using FlowFuse user authentication and the Multiuser Addon. By storing admin usernames in global context and wiring a ui-event through a switch node to a ui-control widget, you can dynamically show or hide the admin page based on the logged-in user's role, while keeping the page hidden by default for all other users."
---

Managing and analyzing increasing amounts of data becomes crucial for organizations. Dashboard 2.0 and Node-RED help organizations access the data, normalize it, and visualize it. But what about controlling who can access what data? That's where an admin-only page comes in. Now With Node-RED Dashboard 2.0, we can also create robust and secure admin-only pages easily. In this guide, we'll provide you with step-by-step instructions to Build an Admin-only page with Node-RED Dashboard 2.0.

<!--more-->

If you're new to Dashboard 2.0, refer to our blog post [Getting Started with Dashboard 2.0](/blog/2024/03/dashboard-getting-started/) to install and get things started.

## Enabling FlowFuse User Authentication

Before proceeding further, let’s enable FlowFuse user authentication. This step adds an extra layer of protection to our dashboard by adding a login page that restricts access exclusively to registered FlowFuse users. Additionally, it further simplifies the process for the FlowFuse Multiuser addon to track and access logged-in user's data on the dashboard.

For more information, refer to the [documentation](/docs/user/instance-settings/#flowfuse-user-authentication) and ensure that it is enabled.

!["Screenshot displaying the configuration settings within the FlowFuse instance, enabling user authentication for enhanced security.
"](./images/building-admin-panel-node-red-dashboard-2-flowfuse-instance-setting.png "Screenshot displaying the configuration settings within the FlowFuse instance, enabling user authentication for enhanced security.
"){data-zoomable}

## Exploring FlowFuse Multiuser Addon 

The FlowFuse Multiuser Addon is a plugin developed for Dashboard 2.0 to access logged-in user data on the dashboard. To install and understand how the FlowFuse Multiuser Addon works, refer to [Exploring the FlowFuse User Addon ](/blog/2024/04/displaying-logged-in-users-on-dashboard/#enabling-flowfuse-user-authentication)

## Storing a list of Admin users

Before we start building the admin-only page We need to store a list of admin users somewhere so that we can later display the admin-only page to those users only, For this guide we will store the admin list in the global context.

1. Drag an inject node onto the canvas.
2. Drag the 'change' node onto the canvas and set `global.admins` to a JSON array containing the usernames of admin users. This will store the created admin list in our Node-RED global context.

!["Screenshot displaying the change node which which stores list of admins username in global context"](./images/building-admin-panel-node-red-dashboard-2-change-node-for-storing-adminlist-to-global-contenxt.png "Screenshot displaying the change node which which stores list of admins username in global context"){data-zoomable}

3. Connect the inject node’s output to the change node’s input.
4. To store the list in a global context, click the inject node’s button once you've deployed the flow.

## Building an Admin-only page

Now, let's proceed with the practical steps to implement the admin-only page:

1. Create a new page in Dashboard 2.0, where we will display sensitive data that we want to hide from regular users, this page will be our admin page.
2. Drag an event node on the canvas, then click on it, and select the UI base that contains your all pages including the admin page 
3. Drag a switch node on the canvas, and add two conditions, one to check whether the user’s username is contained in the admin list or a second for otherwise, see the below image.

!["Screenshot displaying the switch node which checks whether the logged-in user's username is contained in the admin list or not"](./images/building-admin-panel-node-red-dashboard-2-switch-node-checking-page-viewer-isadmin.png "Screenshot displaying the switch node which checks whether the logged-in user's username is contained in the admin list or not"){data-zoomable}

4. Drag two change nodes onto the canvas, Configure the first change node to show the admin page by setting `msg.payload` as `{"pages":{"show":["Admin View"]}}`, and the second change node to hide the admin page by setting the payload as: `{"pages":{"hide":["Admin View"]}}`.

!["Screenshot displaying the change node which contains payload to show admin page"](./images/building-admin-panel-node-red-dashboard-2-change-node-for-showing-page.png "Screenshot displaying the change node which contains payload to show admin page"){data-zoomable}

!["Screenshot displaying the change node which contains payload to hide admin page"](./images/building-admin-panel-node-red-dashboard-2-change-node-for-hidding-page.png "Screenshot displaying the change node which contains payload to display admin page"){data-zoomable}

5. Connect the first change node's input to the switch node's first output and the second change node's input to the switch node's second output.
6. Drag a ui-control widget onto the canvas, then click on it and select ui-base which includes all your pages including the admin page. 
7. Finally, connect both change node’s outputs to the ui-control’s input.

## Hidding Admin only page by default 

To hide an admin-only page by default to ensure regular users don't accidentally land on the admin-only page the following steps are needed.

1. Go to the Dashboard 2.0 sidebar, and select the layout tab.
2. Locate the admin-only page and click on the edit icon next to it.
3. Set visibility as "hidden".

!["Screenshot displaying admin-only page configuration"](./images/building-admin-panel-node-red-dashboard-2-admin-only-page-configuration.png "Screenshot displaying admin-only page configuration"){data-zoomable}

## Deploying the flow

!["Screenshot displaying the FlowFuse Editor with flow of admin-only page"](./images/building-admin-panel-node-red-dashboard-2-flowfuse-editior.png "Screenshot displaying the FlowFuse Editor with flow of admin-only page"){data-zoomable}

1. With your flow updated to include the above, click the "Deploy" button in the top-right of the Node-RED Editor.
2. Navigate to `https://<your-instance-name>.flowfuse.cloud/dashboard`.
3. When you visit the page for the first time, you'll need to log in with your FlowFuse username and password or through Single-Sign on.

Now, if your username is added to the list of admin usernames stored in the global context, you will be able to see the admin-only page.

!["Screenshot displaying the Dashboard view of normal users"](./images/building-admin-panel-node-red-dashboard-2-dashboard-view-for-normal-users.png "Screenshot displaying the Dashboard view of normal users"){data-zoomable}

!["Screenshot displaying the Dashboard view of admin users"](./images/building-admin-panel-node-red-dashboard-2-dashboard-view-for-admin-users.png "Screenshot displaying the Dashboard view of admin users"){data-zoomable}

## Next step

If you want to learn more about FlowFuse multiuser addon and personalize the multiuser dashboard. we do have many other resources, please refer to them to learn more.

- [Webinar](/webinars/2024/node-red-dashboard-multi-user/) - This webinar provides an in-depth discussion of the Personalised Multi-User Dashboards feature and offers guidance on how to get started with it.
- [Personalised Multi-user Dashboards with Node-RED Dashboard 2.0](/blog/2024/01/dashboard-2-multi-user/) - This article explores the process of building multi-user Dashboards secured with FlowFuse Cloud.
- [Displaying logged-in users on Dashboard 2.0](/blog/2024/04/displaying-logged-in-users-on-dashboard/) - This detailed guide demonstrates how to display logged-in users on Dashboard 2.0 which using the FlowFuse Multiuser addon and FlowFuse.
- [Multi-User Dashboard for Ticket/Task Management](/blueprints/flowfuse-dashboard/multi-user-dashboard/) blueprint, which allows you to utilize templates to develop Personalize multi-user dashboard quickly.