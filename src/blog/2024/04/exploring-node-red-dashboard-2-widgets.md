---
title: Exploring Node-RED Dashboard 2.0 widgetes.
subtitle: A guide to using Node-RED 2.0 Widgets for Dashboard Development
description: Learn how to use Node-RED Dashboard 2.0 widgets to build interactive applications and dynamic dashboards effortlessly
date: 2024-04-25
authors: ["sumit-shinde"]
image: 
tags:
    - posts
    - flowfuse
    - node-red
---

This guide delves into Node-RED Dashboard 2.0 widgets, teaching you how to construct applications using them.

<!--more-->

If you're new to Dashboard 2.0, I recommend starting with the "Getting Started with Dashboard 2.0" guide and installing it.

### What Are Widgets?

Widgets are nodes that facilitate building a user interface with Node-RED. They consist of front-end library code blocks and are rendered on the client side. In Node-RED Dashboard 2.0, there's a comprehensive array of widgets, each tailored to create distinct frontend components such as ui-form, ui-template, ui-buttons, and more.

### Building Applications with Dashboard 2.0 Widgets

In this guide, we'll construct a simple application enabling users to input expenses and income for analysis using charts and tables. This application incorporates over half of the Dashboard 2.0 widgets, aiding in a better understanding and confidence in utilizing them.

#### Adding Forms

To enable income and expense submission, we'll incorporate a form using the ui-form widget.

1. Drag the ui-form widget onto the canvas.
2. Double-click it to access various widget properties; refer to the [ui-form properties docs](https://dashboard.flowfuse.com/nodes/widgets/ui-form.html#properties) for details.
3. Select the ui-group where it should render.
4. Add form elements for date, description, amount, and note by clicking the "+element" button at the bottom left.

Once you've added the income submission form, repeat the process to add an expense submission form on another ui-page and ui-group.

#### Storing Form Data

The ui-form widget emits a payload object with key-value pairs of form elements upon submission. We'll store this data using a global context.

1. Drag a function node onto the canvas and use the following code:

```js
let income = global.get('income') || [];

income.push({
  ...msg.payload,
  type: "income",
});

global.set('income', income);

msg.payload = "Thank you for submitting income!";

return msg;
```

#### Displaying Notifications

For displaying notifications on the dashboard, we'll utilize the ui-notification widget, which allows showing notifications at different positions on the dashboard. It accepts msg.payload to send string messages or raw HTML/JavaScript for custom formatting.

1. Drag the ui-notification widget onto the canvas.
2. Set the position property to center. You can also adjust colors or notification timeout by modifying the color and timeout properties. Refer to the [ui-notification properties docs](https://dashboard.flowfuse.com/nodes/widgets/ui-notification.html#properties) for more information on ui-notification properties.

#### Listening events 

In Dashboard 2.0, the ui-event widget allows you to listen for user behavior or events. It does not render any content or components on the dashboard. Currently, this widget only listens for page view and leave events.

With this, we can listen for a page view and page leave event and trigger tasks based on those events. For instance, in our application, we will be displaying a table containing income-expense data and a chart that we will update when we add new income or expense and when the user leaves the form page.

1. Drag an ui-event widget onto the canvas.
2. Double-click on it and select the right ui-base of your application.

For more information on ui-event refer to [ui-event docs](https://dashboard.flowfuse.com/nodes/widgets/ui-event.html).


#### Retrieving and Sorting Income-Expense Data

In our income-expense application, we will display the income and expense data sorted by time in a single table.

1. Drag a change node onto the canvas.
2. Set `msg.payload` to the JSON expression below, which first sorts the array containing both income and expense data by time.
3. Connect the output of the ui-event widget to the input of the change node.

```
$sort([$globalContext('income'), $globalContext('expense')], function($a, $b) { $moment($a.date).toDate().getTime() - $moment($b.date).toDate().getTime() })
```

#### Displaying Data on the Table

To display data on the table, we use the ui-table widget in Dashboard 2.0. This widget accepts an array of objects as input. The columns in the table correspond to the properties of the objects within the array, and each row represents a different object with values corresponding to those properties.

1. Drag a ui-table widget onto the canvas.
2. Create a new ui-page and ui-group for it.
3. Connect the output of the change node to the input of the ui-table widget.

For more information on ui-table refer to [ui-table docs](https://dashboard.flowfuse.com/nodes/widgets/ui-table.html)

#### Adding filter selection for chart

In our application, we will display data on the chart for analysis. For better analysis, we will display two charts: one with the total income and total expense, and a second chart with the total of each added category such as entertainment, grocery, education, and more.

For the filter selection, we will add a dropdown using ui-dropdown widget. This widget allows us to add a dropdown on the dashboard with multiple options.

1. Drag ui-dropdown widget onto the canvas.
2. Create new ui-page and ui-group for it.
3. Add two options by clicking on "+option" for financial overview and detailed overview as shown in the below image.

#### Calculating total categorywise 

Now we need to add an javascript which will calculate the total expense based on selected category data.

1. Drag an function node onto canvas.
2. Paste the following code on it. i have added the comments for your understanding.

```javascript
// Get the filter selection from the message payload and if nothing is selected set it as financial-overview
let filterSelection = typeof msg.payload === 'object' ? "financial-overview" : msg.payload;

// Retrieve the global income and expense data
let income = global.get('income');
let expense = global.get('expense');

// Initialize an empty array to store the result
let result = [];

// Clear the chart before showing new data
node.send({ payload: [] });

// Check the filter selection for financial overview or detailed overview

if (filterSelection === "financial-overview") {
    // Calculate total income and push it to the result array
    let totalIncome = income.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    result.push({ category: "Income", amount: totalIncome });

    // Calculate total expense and push it to the result array
    let totalExpense = expense.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    result.push({ category: "Expense", amount: totalExpense });

} else if (filterSelection === "detailed-overview") {
    // Get unique categories from the expense data
    let categories = [...new Set(expense.map(item => item.category))];

    // Iterate through each category and calculate the total amount
    
    categories.forEach(category => {
        let totalByCategory = expense
            .filter(item => item.category === category)
            .reduce((sum, item) => sum + parseFloat(item.amount), 0);

        // Push the category and its total amount to the result array
        
        result.push({ category: category, amount: totalByCategory });
    });
}

// Assign the result array to the message payload
msg.payload = result;

// Return the modified message
return msg;

```

#### Displaying data on the chart 

To display chart on the dashbord, we have to use ui-chart widget which allow us to display diffrent types of chart on a dashboard including linear, bar, scatter etc. this accepts array and object as input.

1. Drag a ui-chart widget onto the canvas.
2. Double-click on the widget and select "Type" as "bar."
3. Configure the series to "category" and the y-axis to "amount." This configuration informs the chart that the "amount" property of the input objects will be plotted on the y-axis of the chart.
4. Connect the output of the ui-dropdown widget to the input of a function node, and then connect the output of the function node to the input of the ui-chart widget.

#### Adding custom footer with ui-template

With ui-template, we add a footer to our app using Vue.js and Vuetify components. It also allows custom CSS for styling Dashboard 2.0 elements. We choose where our custom component renders (ui-group, ui-page, ui-base) and scope the stylesheet (ui-page, ui-base) for targeted styling. For more information refer to [ui-template docs](https://dashboard.flowfuse.com/nodes/widgets/ui-template.html).

Using this widget, we will add a footer to our application.

1. Drag an ui-template widget onto the canvas.
2. Set the type widget( ui scoped ).
3. Insert the following vuetify component code in the template widget. 

```javascript
<template>
  <!-- Footer component -->
  <v-footer class="text-center d-flex flex-column" style="flex-grow: 1;">
    <!-- Social media icons -->
    <div>
      <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
    </div>

    <!-- Footer text -->
    <div class="pt-0">
      Welcome to our comprehensive income expense tracker! Take control of your finances by monitoring your income and
      expenses effortlessly. Our user-friendly interface makes it simple to record transactions, categorize expenses, and
      analyze your financial trends. With real-time insights into your spending habits, you can make smarter financial
      decisions and achieve your money goals faster.
    </div>

    <!-- Divider line -->
    <v-divider></v-divider>

    <!-- Copyright information -->
    <div>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
</template>

<script>
  export default {
  data: () => ({
    // Social media icons array
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>

<style scoped>
  /* Make the footer occupy all available space and other style*/
  .v-footer {
    position:absolute;
    bottom:0;
    background-color:rgb(26,26,26);
    color:rgb(238,238,238);
  }
</style>

```

#### Deploying your application flow

1. Deploy the flow by clicking the top right Deploy button.
2. Locate the 'Open Dashboard' button at the top-right corner of the Dashboard 2.0 sidebar and click on it to navigate to the dashboard.

Now that we've built an income-expense tracker application and gained a better understanding of Dashboard 2.0 widgets for building dashboards, you might notice a difference in the application layout or style from the screenshot above. However, don't worry. In the upcoming guide, we will show you how to set a nice layout and style for your application.

### Up next

If you want to enhance this simple application by adding more features or wanted to make application personlize for users, consider the following resources:

[Webinar](https://flowfuse.com/webinars/2024/node-red-dashboard-multi-user/) - This webinar provides an in-depth discussion of the Personalised Multi-User Dashboards feature and offers guidance on how to get started with it.

[Displaying logged-in users on Dashboard 2.0](https://flowfuse.com/blog/2024/04/displaying-logged-in-users-on-dashboard/) - This detailed guide demonstrates how to display logged-in users on Dashboard 2.0 which using the FlowFuse Multiuser addon and FlowFuse.

[How to Build an Admin Dashboard with Node-RED Dashboard 2.0](https://flowfuse.com/blog/2024/04/building-an-admin-panel-in-node-red-with-dashboard-2/) - This detailed guide demonstrates how to build a secure admin page in Node-RED Dashboard 2.0.

[How to Build An Application With Node-RED Dashboard 2.0](https://flowfuse.com/blog/2024/04/how-to-build-an-application-with-node-red-dashboard-2/) - This guide, covers how you can build personilze multiuser dashboard using flowfuse multi user addon

[Multi-User Dashboard for Ticket/Task Management blueprint](https://flowfuse.com/blueprints/flowfuse-dashboard/multi-user-dashboard/#multi-user-dashboard-for-ticket%2Ftask-management) -  this blueprint allows you to utilize templates to develop a personalized multi-user dashboard quickly. This Task management blueprint has all features such as adding, updating, and deleting tasks, user profiles, and admin dashboard.



