---
title: "Part 4: Building an Andon Task Manager with FlowFuse"
subtitle: Step-by-step guide to building a real-time issue reporting and task tracking system using FlowFuse.
description: Learn how to build an Andon Task Manager with FlowFuse in this step-by-step guide. Create real-time issue reporting and task tracking systems using Node-RED and FlowFuse Dashboard. 
date: 2025-05-16
authors: ["sumit-shinde"]
image: 
keywords: free andon task dashboard, andon task manager dashboard free, building andon task manager, node-red andon task manager, flowfuse andon task manager
tags:
   - flowfuse
---

In Part 3, you set up the department and admin views for the Andon Task Manager. Now it is time to make the dashboard more powerful and user-friendly. In this part, you will add audio alerts, apply a clean and consistent theme and layout, and explore how multi-tenancy is used to support multiple departments within the same dashboard. We will also learn how to use the Andon Task Manager dashboard effectively.

<!--more-->

## Adding Audio Alerts

As discussed in Part 1, the Andon Task Manager includes two types of alerts—visual and audio. The visual alerts have already been implemented. Now, in this section, you will add audio alerts that are triggered when a request remains unresolved beyond a specified threshold.

Before we start, let’s define a few configuration settings that will be reused while implementing audio alerts across different pages.

1. Switch to the **configuration** flow tab.
2. Drag an **inject** node onto the canvas and set it to trigger on deploy after 0.1 second.
3. Drag a **change** node onto the canvas and add the following elements:
    - Set `global.alertActivationThreshold` to `0.1`
    - Set `global.alertSoundUrl` to `https://www.soundjay.com/buttons/beep-26.wav`
4. Connect the **change** node to the **inject** node.

This sets the audio alert activation threshold and the default sound URL. You can update these values later based on your requirement or preference.

With the global settings in place, now proceed to create the flow that will check whether an alert should be triggered and play the corresponding sound.

**Steps for Each View Flow (Lines, Departments, and Admin):**

1. Drag a **link in** node onto the canvas and connect it to the **link out** node which is in the flow group (_Format the acknowledged and resolved timestamps_) and connected to the first output of the function node **highlightOldRequests**.
2. Drag a **switch** node onto the canvas, give it the name **"Is it older than the defined duration?"**, and set the property to `msg.payload.alert`. Add the following condition to check against:
    - is true
3. Drag another **switch** node onto the canvas, give it the name **"Is the request acknowledged?"**, and set the property to `msg.payload.acknowledged`. Add the following condition to check against:
    - is null
4. Drag another **switch** node onto the canvas, give it the name **"Is the alert already triggered for this request?"**, set the property to `global.alertsForRequest`, and add the following condition to check against:
    - contains `msg.payload.rowid`
    - otherwise
5. Drag a **change** node onto the canvas, give it the name **"Retrieve Audio Sound URL"**, and add the following element:
    - Set `msg.payload` to `global.alertSoundUrl`
6.  Drag a **function** node, give it the name **"Store the ID of the request for which the alert is triggered"**, and add the following JavaScript:
    ```javascript
    let AlertTriggeredRequest = msg.payload
    let arrayofTriggredAlerts = global.get('alertsForRequest') || []

    arrayofTriggredAlerts.push(AlertTriggeredRequest.rowid);
    global.set('alertsForRequest', arrayofTriggredAlerts)
    return msg;
    ```
7.  Drag a **ui template**, configure the scope to _page_, and add the following code into it:
    ```html
    <template>
      <div>
        <audio ref="audio" :src="msg?.payload" preload="auto"></audio>
      </div>
    </template>

    <script>
      export default {
        name: 'AlertSoundPlayer',
        mounted() {
          this.$socket.on('msg-input:' + this.id, (msg) => {
            this.$refs.audio.play();
          });
        }
      };
    </script>

    <style scoped>
      button {
        margin: 5px;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
      }
    </style>
    ```

8.  Connect the **switch** node (_Is it older than the defined duration?_) to the **link in** node. Then connect that switch node to the next **switch** node (_Is the request acknowledged?_), that one to the next **switch** node (_Is the alert already triggered for this request?_), and from that switch node’s **second output** to the **change** node (_Retrieve Audio Sound URL_) and the **function** node (_Store the ID of the request for which the alert is triggered_). Finally, connect the **change** node (_Retrieve Audio Sound URL_) to the **ui template** widget.

## Modifying the Dashboard Theme and layout

To improve the usability and visual impact of your Andon Task Manager, it is essential to maintain a consistent theme and well-structured layout across all views. A thoughtful combination of layout and theme ensures that the interface is visually appealing, intuitive, and easy to navigate. This section provides an steps to customize the theme, refine color schemes, and design a clean, user-friendly layout that supports effective interaction.

### Modifying the Dashboard Theme

For our Andon task manager, we chose the following colors:

- **Charcoal Blue (#1A1C24)**: <span style="background-color:#1A1C24; color:white; padding:0 5px; border:2px solid #C7D2FE; display:inline-block;">#1A1C24</span> Used for the header and button backgrounds to create a strong visual presence and maintain consistency across the interface.

- **White (#FFFFFF)**: <span style="background-color:#FFFFFF; color:black; padding:0 5px; border:2px solid #C7D2FE; display:inline-block;">#FFFFFF</span> Applied to group backgrounds and button labels, ensuring readability and clear separation of interface elements.

- **Black (#000000)**: <span style="background-color:#000000; color:white; padding:0 5px; border:2px solid #C7D2FE; display:inline-block;">#000000</span> Used for all primary text to maximize contrast and improve legibility in various lighting conditions.

- **Light Gray (#EEEEEE)**: <span style="background-color:#EEEEEE; color:black; padding:0 5px; border:2px solid #C7D2FE; display:inline-block;">#EEEEEE</span> Serves as the page background, providing a neutral base that helps foreground elements stand out without being visually overwhelming.

To create a dashboard design like this on your own, it's essential to recognize the importance of the theme. A well-designed theme should be appropriate for the environment it's used in, cater to the needs of the users, and set the right tone.

If your brand has a predefined color palette, that’s a great place to start. If not, choose colors that complement both the usability and the mood you wish to convey. A good example is our [OEE dashboard](/blueprints/manufacturing/oee-dashboard/), designed specifically for manufacturing teams that rely on quick interpretation of real-time data. The layout was designed to be clear, with high contrast and minimal distractions, perfect for control rooms where lighting can be limited. The dark theme was chosen to highlight key information and reduce eye strain during prolonged use.

**Modifying the Dashboard Theme for Consistency:**

1. Open the Dashboard 2.0 sidebar from the Node-RED editor.
2. Switch to the Theme tab.
3. In the list of themes (you will likely see only the default one), click the settings (gear) icon next to it.
4. In the theme settings, click any colored rectangle to open the color picker. You can use the wheel or the dropper tool at the bottom to pick exact colors:
5. Set Charcoal Blue (#1A1C24) as the color for the header background, group background, and group outline.
6. Set Black (#000000) as the page background.
7. Click Update and Deploy Changes.

### Modifying the Dashboard Layout

Once the theme colors are in place, the next step is to refine the layout. A well-organized layout ensures that users can quickly access important information and interact with dashboard elements without confusion

To begin, start by setting the correct layout for different pages in the Andon Task Manager dashboard.

- For Lines, Departments, Admin pages, and the Not Found page, make sure to use a Grid Layout.
- For All Lines and All Departments (menu pages), make sure to use a Notebook Layout.

**To update the page layout:**

1. Open the Dashboard 2.0 sidebar from the Node-RED editor.
2. Switch to the Layout tab, where you will see all the pages you have created.
3. Click on the gear (settings) icon next to the page you want to modify. In the configuration dialog that opens, select the layout from the dropdown.
4. Click Update and then Deploy to apply the changes.

### Group Size and Order

The layout for each page—**Lines**, **Department**, and **Admin**—is designed to be simple and easy to navigate. The widgets are logically grouped, and each widget is set to auto-size, ensuring consistent behavior across devices and resolutions.

#### **Lines Page**

For the **Lines page**, all widgets are placed within a single group. The order of components is:

**Group 1 (13×4):**

1. **Markdown widget** – Displays the currently selected line.
2. **UI text widget** – Shows a message when no requests are found for the selected line.
3. **Table widget** – Renders all requests associated with the selected line.
4. **Dropdown** – Allows the user to select a department.
5. **UI text widget** – Used for notes or additional input related to the request.
6. **Button** – Submits a new request.

This structure helps keep the layout simple and functional, with everything needed on one page.

#### **Department Page**

The **Department page** follows the same layout as the Lines page, maintaining simplicity and a streamlined design. It is structured as:

**Group 1 (13×4):**

1. **Markdown widget** – Displays the currently selected line.
2. **UI text widget** – Shows a message when no requests are found.
3. **Table widget** – Renders all requests for the selected line.

Just like the Lines page, all elements are auto-sized for a responsive layout.

#### **Admin Page**

The **Admin page** is organized into three groups, each with specific components:

**Group 1 (8×1):**

- **Menu** – Displays the navigation menu.

**Group 2 (4×1):**

- **Form** – Allows the user to add new lines and departments.

**Group 3 (12×1):**

1. **UI text widget** – Displays a message when no requests are found for the selected line.
2. **Table widget** – Renders all requests associated with the selected line.

## How to Use the Andon Task Manager

**To get started:**

1. Ensure you have at least two accounts in your FlowFuse team—one admin and one user.
2. Add yourself as an admin and navigate to the Admin page.
3. Use the form to add production lines and departments.
4. Once set up, share the dashboard with your team, enabling them to raise requests, which will be displayed in real-time across the relevant dashboards.

Imagine you're from Line T1 and need raw materials like steel. Simply submit a request through the T1 page, and watch it appear instantly on the Stores department's dashboard.

**To submit requst**

1. Navigate to the lines menu page and select the production line for which you want to create a request.
2. Once on the line's page, you will see the selected line name at the top to confirm.
3. Select the department and enter detailed notes that will help address the issue.
4. Click "Request Support."
5. Once clicked, a dialog will appear asking for confirmation on adding the request. Click "Confirm" to submit.

The moment a Stores department member opens their page, they'll see your request in real time. They can quickly acknowledge it, and the status update will sync across all relevant dashboards, including those of admins and the requester. Once the task is completed, the request is marked as resolved, closing the loop.

**To Acknowledge a Request:**

1. Navigate to the request you wish to acknowledge.
2. If the request has not already been acknowledged, you will see an "Acknowledge" button next to it.
3. Click the "Acknowledge" button to confirm that you have reviewed the request.

Once acknowledged, the request status will update to show that it has been acknowledged with timestamp.

**To Resolve a Request:**

1. After acknowledging the request, you can proceed to resolve it.
2. Click the "Resolve" button next to the acknowledged request.

Once resolved, the request will be removed from the table.

But what if the department member is busy and misses your request? No worries—an audio alert will grab their attention. Plus, to ensure nothing slips through the cracks, unacknowledged requests are highlighted, making it easy to spot and address pending tasks swiftly

## Multi-Tenancy in the Andon Task Manager

Now, let’s dive into how the dashboard works. You may be wondering how, with only two pages — one for Lines and one for Departments — the content changes based on what each user selects, without affecting what others see. This is a key feature of multi-tenancy in the Andon Task Manager.

Unlike many dashboards that show the same data to all users, the Andon Task Manager ensures that each user’s actions only impact their own view. This means users can interact with the system, make selections, and navigate pages — all without affecting other users' interfaces. Everyone gets a personalized experience, even though they’re using the same dashboard.

In the previous part, we configured some settings in the Dashboard 2.0 sidebar’s Client Data tab. There, we selected UI widgets that always send messages containing client data. This includes useful details like:

- **Username**
- **Email ID**
- **Name**
- **User ID**
- **Socket ID and IP address**

This data ensures that every action taken by a user is tied to their session, allowing the system to respond in a personalized way

However, there’s a challenge: the dashboard is connected to a centralized database that stores tasks and requests from all users. So how do we keep things separate?

We solve this using filtered queries based on each user’s selection. When a user makes a selection, that selection is stored with its session id in the context store. Then, whenever data is fetched (for example, when viewing Lines or Departments), it’s filtered using that stored selection data — so the user only sees content that matches their own context.

Let’s say two users are interacting with the dashboard at the same time:

- User A selects the line “T1”
- User B selects the line “T2”

When each user clicks on a line in the menu, the system redirects them to the Lines page with the selected line value in the URL — like ?line=T1.

Once the page loads, a UI event is triggered. This event triggers a flow that stores the selected line along with the user’s session ID. This way, the system knows What the user selected and Which session it belongs to?

Now, when User A views the page, they only see data related to Line T1. User B sees data for Line T2 — even though they’re both on the same page. Each session is handled independently, making sure the experience stays personalized and isolated for each user.

For more information refer to [Documentation : Building Multi-Tenant Dashboards](https://dashboard.flowfuse.com/user/multi-tenancy.html) 

## Final Thought

Now that you have your complete Andon task manager dashboard ready for use, feel free to enhance it further! However, if you’ve encountered any challenges or want to skip the setup process and start using it right away, don't worry—we’ve got you covered. We offer a ready-made Andon task manager blueprint that’s built and ready to go.

Register now to get access to the blueprint and start optimizing your tasks immediately!
