---
title: "Part 1: Building an Andon Task Manager with FlowFuse"
subtitle: Build a real-time Andon Task Manager with FlowFuse and Node-RED, covering key features, dashboard design, and data storage.
description: Learn how to build a real-time Andon Task Manager using FlowFuse and Node-RED. This step-by-step guide covers request tracking, dashboard design, and data storage with SQLite and context storage.
date: 2025-04-23
authors: ["sumit-shinde"]
image: /blog/2025/04/images/Building-an-Andon-Task-Manager-with-FlowFuse-1.png
keywords: free andon task manager dashboard, andon task manager free, building andon task manager, node-red andon task manager, flowfuse andon task manager
tags:
   - flowfuse
---

Fast issue resolution and clear communication are critical in modern manufacturing and service operations. Andon systems empower frontline workers to signal problems the moment they occur—helping teams respond quickly, reduce downtime, and maintain quality.

<!--more-->

Despite their value, many off-the-shelf Andon solutions lack flexibility or have unnecessary complexity that slows adoption.

This blog series will guide you through building a real-time Andon Task Manager using FlowFuse and Node-RED—tools that offer low-code flexibility, cloud scalability, and built-in security. In Part 1, we break down what an Andon system is and discuss the basic planning needed to start building your own solution.

Let’s get started.

## What is the Andon Task Manager?

The Andon Task Manager is a tool for teams to report, track, and resolve issues in real time. It is based on traditional Andon systems used in lean manufacturing but updated for modern, cloud-based environments.

It provides a fast and transparent way to communicate problems—like machine breakdowns, missing materials, or support requests. Frontline workers can raise a request picked up by the right person or team. Once the issue is resolved, the status is updated so everyone stays informed and the task is closed correctly.

## What Problem Does It Solve?

In a typical manufacturing environment, multiple processes run simultaneously across large factory floors. Each area—or line—has specific machinery, workflows, and potential points of failure. When something goes wrong, quick and precise communication is essential. However, factories are often spread out, and support teams are divided across different departments (e.g., maintenance, quality control, safety, etc.).

Workers often rely on informal or manual systems—such as radio calls, phone messages, or shouting across the floor—to report issues. These methods are inefficient, error-prone, and often delay response times. The lack of a structured, real-time communication system leads to:

- Delayed responses because support staff are unaware of new issues or misinterpreted messages.
- Lack of visibility into the status of reported problems, leading to confusion and a backlog of unresolved issues.
- Unstructured logging, making it difficult to track progress or perform audits. This often leads to missed opportunities for continuous improvement or identifying recurring issues.

The Andon Task Manager solves this as a centralized system where any frontline worker can quickly raise an issue. Once submitted, the request is instantly visible to the relevant department—without needing someone to assign it manually. This enables self-routing and real-time visibility, ensuring the right people take action quickly and efficiently, even when the requester and responder are in entirely different factory parts.

## Planning the Andon Task Manager

### The Request

At the core of the system is the request. Every request represents a task or issue raised by an operator. To ensure traceability and clarity, each request should include key details. This structured format makes it easier for departments to manage and resolve issues efficiently.

**Each request must include the following:**

- `id`: A unique identifier for the request.
- `line`: The line or machine where the issue was raised.
- `department`: The department responsible for resolving the issue.
- `created`: The timestamp when the request was created.
- `acknowledged`: A timestamp indicating when the request was acknowledged. This is initially set to `null`, meaning the request has not been acknowledged yet.
- `resolved`: A timestamp indicating when the issue was resolved. This is also initially set to `null`, indicating the issue has not been resolved yet.
- `note`: Text added by users for context or follow-up.

### Storage Mechanism

To ensure a simple and efficient data management system for the Andon Task Manager, we will use SQLite to store user requests. SQLite is a lightweight, easy-to-manage database well-supported in Node-RED through the `node-red-contrib-sqlite node`. This makes it an ideal choice for local deployments or scenarios where a lightweight database is needed.

For dynamic runtime data—such as the user's selected line or department and the complete list of available lines and departments—FlowFuse’s built-in context storage will be utilized. This solution allows for fast access to real-time data while maintaining a persistent state across sessions without introducing unnecessary database complexity or overhead.

The system remains efficient and easy to maintain by using both SQLite for structured request data and context storage for dynamic, session-based information.

### Defining Key Features

The system must support core operations that reflect how issues are reported and resolved in real-life factory environments. These features help ensure that tasks are handled efficiently and everyone knows the current status.

The essential features include:

- Request creation: Users select the line and department, optionally enter a note, and submit a request.
- Acknowledge requests: A responder can mark a request as acknowledged once they start working on it.
- Resolve requests: After resolving the issue, the responder marks it resolved.
- View filtering: Requests can be filtered by line or department.
- Admin tools: Admins can add and manage the list of departments and lines.
- Status display: Requests display their current state as pending, acknowledged, or resolved.
- Alerts (optional): Visual or sound alerts for unacknowledged requests after a time threshold.

### Dashboard Visualization & UI Design

The goal is to create a user-friendly dashboard for frontline workers and admins. An intuitive interface helps users complete their tasks quickly in fast-paced environments.

There will be two types of users: admins and regular users. Users can submit requests, view them by department or line, and manage tasks. Admins will have additional controls, like creating and managing departments and lines and accessing all request data.

Instead of having separate pages for each department or line (which could get cumbersome with many lines), we’ll update the content on a single page based on the user’s selection. For example, selecting a specific production line will update the request list to show only issues related to that line. This keeps the experience simple and avoids unnecessary page navigation.

Admins will have a dedicated view to create new departments and lines, see all requests in one place, and easily switch between departments and lines.

Regular users will see a simplified version of the dashboard. They can choose their department or line, and the dashboard will update to show only the relevant requests and options, such as the form to submit new requests for that line. This keeps the interface focused and streamlined for each user.

**In summary:**

**For regular users:**

- A menu for easily switching between departments and lines.
- The content will update based on the selected department or line, showing only the relevant information.
- The ability to acknowledge and resolve requests as needed, keeping the workflow straightforward and efficient.
For admins:

**For admins:**

- View all requests in a table on a single page for easy overview and management.
- A menu for quick switching between departments and lines.
- A form to submit new requests, all within the same interface.

Additionally, there will be a “Not Found” page: If a user visits a URL with a department or line parameter that does not exist, they will be redirected to this page. Additionally, if a non-admin tries to access an admin-specific page, they will also be redirected to the “Not Found” page.

![The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager.](./images/dashboard-admin-veiw.png){data-zoomable}
_The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager._

![The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager.](./images/line-menu.png){data-zoomable}
_The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager._

![The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager.](./images/line-page.png){data-zoomable}
_The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager._

![The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager.](./images/department-menu.png){data-zoomable}
_The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager._

![The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager.](./images/department-wise.png){data-zoomable}
_The following dashboard image illustrates the intended design and key objectives of our Andon Task Manager._

## Up Next

In the next part of this series, we will focus on developing the Lines and Departments view for normal users and the navigation menu for selecting lines and departments. Later, we will cover the development of the Admin interface.

But if you can't wait to get started right away, don’t worry! You can [register](https://app.flowfuse.com/account/create) for FlowFuse and get started with our ready-made [Andon Task Manager blueprint](/blueprints/manufacturing/andon-task/), which is pre-configured for easy deployment. Stay tuned for the next installment to continue your journey toward building a comprehensive, real-time Andon Task Manager solution.
