---
title: How to Build An Application With Node-RED Dashboard 2.0
subtitle: A step-by-step guide to building a personalized, secure, and fully functional application with Dashboard 2.0.
description: Create custom applications effortlessly with Node-RED Dashboard 2.0. This step-by-step guide walks you through building personalized, secure, and fully functional apps.
date: 2024-04-11
authors: ["sumit-shinde"]
image: /blog/2024/04/images/telegram_node-red.png
tags:
  - node-red
  - post
---

We started developing Dashboard 2.0 a few months ago to replace the outdated Node-RED Dashboard 1.0. Initially, our goal was simply to replicate the old features. But it is way beyond our expectations. With its powerful features and customizable nature, not only does building dashboards become incredibly easy, but also enables the creation of applications that we use regularly.

<!--more-->

In this guide, we will demonstrate how you can build powerful, customizable, and secure applications with Node-RED Dashboard 2.0.

If you're new to Dashboard 2.0, refer to our blog post [Getting Started with Dashboard 2.0](/blog/2024/03/dashboard-getting-started/) to install and get things started.

## Installing Flowfuse user addon

The FlowFuse User Addon is a plugin developed for Dashboard 2.0, leveraging the FlowFuse API to access logged in user's information at Dashboard 2.0. For detailed information refer to the [Exploring the FlowFuse User Addon](/blog/2024/04/displaying-logged-in-users-on-dashboard/#exploring-the-flowfuse-user-addon) and make sure install it.

## Enabling FlowFuse user authentication

Before beginning the application development process, ensure that FlowFuse user authentication is enabled. This feature adds a layer of security to your application by providing a login page. By combining the FlowFuse user addon with user authentication, we gain access to the logged in user's data within our application. For more information, refer to the [documentation](/docs/user/instance-settings/#flowfuse-user-authentication) and ensure that it is enabled.

## Outlining Approach

!["screenshot of Task management system we will be building"](./images/building-an-application-with-dashboard-2-task-management-system.gif 
"screenshot of Task management system we will be building"){data-zoomable}

In this guide, we are going to build a simple, secure task management application that will allow users to submit and view their own tasks, making the dashboard more personalized. Here's an overview of the steps:

1. Accessing User Data: We have already enabled the application to access user data by installing the FlowFuse User Addon and enabling user authentication.
2. Building a Form to Submit Tasks: We will create a form using Node-RED Dashboard 2.0 to allow users to input task details such as title, description, due date, etc.
3. Storing Tasks in the Global Context: Upon task submission, we'll store this data alongside the associated user object in the global context of Node-RED.
4. Displaying Task Submission Confirmation: After submitting a task, we'll display a notification to confirm the successful submission.
5. Retrieving and Filtering Tasks: We will retrieve the stored tasks from the global context and filter them based on the logged in user. This ensures that users only see their own tasks.
6. Building a Customized Table: Using ui-template and Vuetify components, we will design a customized table on the dashboard to display the filtered tasks in a visually appealing format.

## Building a Form to Submit Tasks

1. Drag an **ui-form** widget onto the canvas.
2. Click on the edit icon next to Page 1 (The default page added when you install Dashboard 2.0) in the Dashboard 2.0 sidebar. While this step is optional, updating the page configurations as shown in the image below ensures that your application aligns with the layout described in this guide.

!["screenshot displaying new task page configuration"](./images/building-an-application-with-dashboard-2-page1-configuration.png "screenshot displaying new task page configuration"){data-zoomable}

3. Click on the **ui-form** widget to add form elements such as title, description, due date, and priority.

!["Screenshot displaying ui widget form configuration"](./images/building-an-application-with-dashboard-2-task-submission-form.png "Screenshot displaying ui widget form configuration"){data-zoomable}

## Storing Tasks in the Global Context

1. Drag a **function** node onto the canvas
2. Paste the below code in the **function** node.

```
// Retrieve the existing tasks from the global context or initialize an empty array if none exists

let tasks = global.get('tasks') || [];

// Push the new task object into the tasks array, including the task details and the user object extracted from the message object, as each payload emitted by the Node-RED Dashboard 2.0 widgets contains user information due to the FlowFuse User Addon.

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

3. Connect the **ui-form** widget’s output to the **function** node’s input.

## Displaying Task Submission Confirmation

1. Drag a **change** node onto the canvas and set `msg.payload` to the confirmation message you want to display on successful task submission.

!["screenshot of the change node setting payload for notification"](./images/building-an-application-with-dashboard-change-node-setting-payload-for-notification.png "screenshot of the change node setting payload for notification"){data-zoomable}

2. Drag an **ui-notification** onto the canvas select **ui-base** and set the position to "center".
3. Connect the **ui-form** widget’s output to the **change** node’s input and the **change** node’s output to the **ui-notifications** input.

## Retrieving and Filtering Tasks

1. Drag a **ui-event** widget onto the canvas and select **ui-base** for it. The **ui-event** will enable us to display updated tasks on the table without the need for polling, as it triggers when the page reloads or changes.
2. Drag a **change** node onto the canvas and set `msg.payload` to `global.tasks`.

!["Screenshot of the change setting retriving global context and setting to msg.payload"](./images/building-an-application-with-dashboard-change-node-retriving-global-context-data.png "Screenshot of the change setting retriving global context and setting to msg.payload"){data-zoomable}

3. Drag a **function** node onto the canvas and paste the below code into it.

```
// Filter the payload array of tasks to include only those tasks associated with the currently logged in user.

msg.payload = msg.payload.filter((task) => task.user.userId === msg._client.user.userId);

// Return the modified message object containing the filtered tasks.

return msg;
```
4. Connect the **ui-event** widget’s output to the **change** node’s input and the **change** nodes’ output to the **function** node’s input.


## Building a Customized Table

### Enabling client constraint for ui-template

Before we begin constructing our table to display tasks, we need to enable access to client constraints for the **ui-template** widget. Access client constraints ensure that messages or actions are specifically targeted to individual clients. For instance, if 100 people are interacting with the same task management dashboard simultaneously and one person submits a task, the notification will only be visible to that person and not to the remaining 99 individuals.

If you have experience with Node-RED Dashboard 1.0, you may recall that these client constraints were only available for **ui-control** and **ui-notification** widgets but in Dashboard 2.0 you can enable it for any widget.

!["Screenshot displaying FF Auth tab"](./images/building-an-application-with-dashboard-2-ff-auth-tab.png "Screenshot displaying FF Auth tab"){data-zoomable}

1. Navigate to the sidebar and select "FF Auth" Tab
2. In the second option "Accept Client Constraints" you'll see dashboard 2.0 widgets where this option is by default enabled for **ui-notification** and **ui-control**, enable it for **ui-template** as well.

### Creating a table and displaying the task

1. Drag an **ui-template** widget onto the canvas
2. Create a new ui-page, ui-group for it. Below, I have provided a screenshot of the page two configurations if you want to replicate the design and layout as it is.

!["Screenshot displaying ui-template widget with code for building table for displaying task"](./images/building-an-application-with-dashboard-template-widget.png "Screenshot displaying ui-template widget with code for building table for displaying task"){data-zoomable}

3. Insert the below code into the widget. We've used [Vuetify components](https://vuetifyjs.com/en/components/all/) in this Vue.js code, All supported by Dashboard 2.0. If you're new to Vue.js, rest assured I've included helpful comments for clarity.

```
` <template>
 <!-- Input field for searching tasks -->
 <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
  hide-details></v-text-field>
 
 <!-- Data table to display tasks -->
 <v-data-table :search="search" :items="msg?.payload">
  <!-- Custom header for the "current" column -->
  <template v-slot:header.current>
   <div class="text-center">Center-Aligned</div>
  </template>

  <!-- Template for the "priority" column -->
  <template v-slot:item.priority="{ item }">
   <!-- Display priority icon if it exists -->
   <v-icon v-if="item.priority" icon="mdi-alert" color="red"></v-icon>
  </template>

  <!-- Template for the "user" column -->
  <template v-slot:item.user="{ item }">
   <!-- Display user avatar and username -->
   <div class="user">
    <!-- User avatar -->
    <img :src="item.user.image" width="24" />
    <!-- Username -->
    {% raw %}<span>{{ item.user.username }}</span>{% endraw %}
   </div>
  </template>

  <!-- Template for the "due" column -->
  <template v-slot:item.due="{ item }">
   <!-- Calculate and display the number of days between due date and current date -->
   {% raw %}{{ daysBetween(item.due, new Date()) }} Days{% endraw %}
  </template>
 </v-data-table>
</template>

<script>
 export default {
  data() {
   return {
    // Search input field model
    search: '',
   }
  },
  methods: {
   // Method to calculate the number of days between two dates
   daysBetween(date1, date2) {
    // Calculate the difference in days
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
   }
  }
 }
</script>

<style scoped>
 /* Styling for user avatar and username */
 .user {
  display: flex;
  gap: 5px; /* Gap between avatar and username */
 }

 /* Styling for user avatar */
 .user img {
  width: 24px; /* Set width of user avatar */
 }
</style>

```
3. Connect the **ui-template** widget's input to the **function** node's output (function node which we have added to filter tasks based on user).

## Deploying the flow 

!["Screenshot displaying Node-RED flow of Task management system"](./images/building-an-application-with-dashboard-task-management-application-flow.png "Screenshot displaying Node-RED flow of Task management system"){data-zoomable}

1. Deploy the flow by clicking the top right Deploy button.
2. Locate the 'Open Dashboard' button at the top-right corner of the Dashboard 2.0 sidebar and click on it to navigate to the dashboard.

Now, we're all set to add tasks. Navigate to the "New Task" page to add tasks. To view tasks, navigate to the "Your Task" page.


## Next step

If you want to enhance this simple application or add more features, consider the following resources:

- [Webinar](https://flowfuse.com/webinars/2024/node-red-dashboard-multi-user/) - This webinar provides an in-depth discussion of the Personalised Multi-User Dashboards feature and offers guidance on how to get started with it.

- [Displaying logged-in users on Dashboard 2.0](/blog/2024/04/displaying-logged-in-users-on-dashboard/) - This detailed guide demonstrates how to display logged-in users on Dashboard 2.0 which using the FlowFuse Multiuser addon and FlowFuse.

- [How to Build an Admin Dashboard with Node-RED Dashboard 2.0](/blog/2024/04/building-an-admin-panel-in-node-red-with-dashboard-2/) - This detailed guide demonstrates how to build a secure admin page in Node-RED Dashboard 2.0.

- [Multi-User Dashboard for Ticket/Task Management](/blueprints/flowfuse-dashboard/multi-user-dashboard/#multi-user-dashboard-for-ticket%2Ftask-management) blueprint, which allows you to utilize templates to develop a personalized multi-user dashboard quickly. This Task management blueprint has all features such as adding, updating, and deleting tasks, user profiles, and admin dashboard.