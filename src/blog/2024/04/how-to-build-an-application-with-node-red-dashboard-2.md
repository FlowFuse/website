---
title: How to Build An Application With Node-RED Dashboard 2.0
subtitle: A step-by-step guide to building a personalized, secure, and fully functional application with Dashboard 2.0.
description: 
date: 2024-04-11
authors: ["sumit-shinde"]
image: 
tags:
    - posts
    - node-red
    - dashboard
---

We started developing Dashboard 2.0 a few months ago to replace the outdated Node-RED Dashboard 1.0. Initially, our goal was simply to replicate the old features. But today, we're thrilled to introduce Dashboard 2.0, which exceeds our initial expectations. With its powerful features, not only does building dashboards become incredibly easy, but also enables the creation of applications that we use regularly.

In this guide, we will demonstrate how you can build powerful, customizable, and secure applications with Node-RED Dashboard 2.0.

If you're new to Dashboard 2.0, refer to our blog post [Getting Started with Dashboard 2.0](https://flowfuse.com/blog/2024/03/dashboard-getting-started/) to install and get things started.


## Installing Flowfuse user addon

The FlowFuse User Addon is a plugin developed for Dashboard 2.0, leveraging the FlowFuse API to access logged in users information Dashboard 2.0. For detailed information refer to the [Exploring the FlowFuse User Addon](https://flowfuse.com/blog/2024/04/displaying-logged-in-users-on-dashboard/#exploring-the-flowfuse-user-addon) and make sure install it.


## Enabling FlowFuse user authentication

Before beginning the application development process, ensure that FlowFuse user authentication is enabled. This feature adds a layer of security to your application by providing a login page. By combining the FlowFuse user addon with user authentication, we gain access to the logged-in user's data within our application. For further details, For more information, refer to the [documentation](https://flowfuse.com/docs/user/instance-settings/#flowfuse-user-authentication) and ensure that it is enabled.

## Outlining Approach

In this guide, we are going to build a simple, secure task management application that will allow users to submit tasks and view their tasks, making the dashboard more personalized. Here's an overview of the steps:

1. Accessing User Data: We have already enabled the application to access user data by installing and configuring the FlowFuse User Addon and enabling user authentication.
2. Building a Form to Submit Tasks: We will create a form using Node-RED Dashboard nodes to allow users to input task details such as title, description, due date, etc.
3. Storing Tasks in the Global Context: Upon task submission, we'll store this data alongside the associated user object in the global context of Node-RED.
4. Displaying Task Submission Confirmation: After submitting a task, we'll display a notification to confirm the successful submission.
5. Retrieving and Filtering Tasks: We will retrieve the stored tasks from the global context and filter them based on the logged-in user's credentials. This ensures that users only see their tasks.
6. Building a Customized Table: Using ui-template and Vuetify components, we will design a customized table on the dashboard to display the filtered tasks in a visually appealing format.

## Building a Form to Submit Tasks

1.  Drag an **ui-form** widget onto the canvas.
2. Click on the edit icon next to page 1 at the dashboard 2.0 sidebar and update the page configurations as shown in the below image,  to ensure your application design aligns with our intended layout.
3. Click on the **ui-form** widget to add form elements such as title, description, due date, and priority.

## Storing Tasks in the Global Context

1. Drag a **function** node onto the canvas
2. Paste the below code in **function** node.
3. Connect the **ui-form** widget’s output to the **function** node’s input.

```
// Retrieve the existing tasks from the global context or initialize an empty array if none exists

let tasks = global.get('tasks') || [];

// // Push the new task object into the tasks array, including the task details and the user object extracted from the message object, as each payload emitted by the Node-RED Dashboard 2.0 widgets contains user information due to the FlowFuse User Addon.

tasks.push({
    ...msg.payload,
    ...{
        user: msg._client.user // Assign the user object to the task
    }
});

// Update the 'tasks' variable in the global context with the modified tasks array

global.set('tasks', tasks);

return msg;
```
## Displaying Task Submission Confirmation

1. Drag a **change** node onto the canvas and set `msg.payload` to the confirmation message you want to display on successful task submission.
2. Drag an **ui-notification** onto the canvas select **ui-base** where it will shown and set the position to center.
3. Connect the **ui-form** widget’s output to the **change** node’s input and the **change** node’s output to the **ui-notifications** input.

## Retrieving and Filtering Tasks

1. Drag a **ui-event** widget onto the canvas and select **ui-base** for it. The **ui-event** will enable us to display updated tasks on the table without the need for polling, as it triggers when the page reloads or changes.
2. Drag an **change** node onto the canvas and set `msg.payload` to `global.tasks`.
3. Drag a **function** node onto the canvas and paste the below code in it.

```
// Filter the payload array of tasks to include only those tasks associated with the currently logged-in user.

msg.payload = msg.payload.filter((task) => task.user.userId === msg._client.user.userId);

// Return the modified message object 
containing the filtered tasks.

return msg;
```
4. Connect the **ui-event** widget’s output to the **change** node’s input and the **change** nodes’ output to the **function** node’s input.
