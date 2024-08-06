---
title: "Node-RED Dashboard 2.0 vs UI-Builder: A Comprehensive Comparison"
subtitle: Understanding the Differences Between Node-RED Dashboard 2.0 and UI-Builder
description: Compare Node-RED Dashboard 2.0 and UI-Builder. Discover their installation ease, customization, performance, and support to find the best solution for your needs. 
date: 2024-08-01
authors: ["sumit-shinde"]
image: /blog/2024/08/images/dashboard-2-vs-ui-builder.png
tags:
    - node-red dashboard
    - ui-builder
    - comparison
    - dashboard

---

When choosing a dashboard solution for Node-RED, two popular options are Node-RED Dashboard 2.0 and UI-Builder. This article compares these tools across several key areas, including installation, ease of use, development activity, and customizability, to help you decide which one best suits your needs.

<!--more-->

## How Easy is it to Install?

### Node-RED Dashboard 2.0

When searching for `flowfuse/node-red-dashboard` on Google, the first result we get to the documentation, which is useful. However, in the Node-RED Palette Manager, finding the correct package can be confusing because there are many community third-party nodes and plugins that work with Node-RED Dashboard 2.0. This can make it bit confusing for new users to locate the right package.

### UI-Builder

Finding UI-Builder is straightforward, as its package name `node-red-ui-builder` is distinct and easily identifiable both on Google and in the Node-RED Palette Manager. This clear naming helps users quickly locate the correct package.

## How Easy is it to Get Started?

## Node-RED Dashboard 2.0

Getting started with Node-RED Dashboard 2.0 is relatively easy due to its low-code approach. It features a sidebar for managing UI widgets, themes, configurations, and settings, with intuitive navigation to the dashboard page. This makes it accessible for users with varying levels of technical expertise.

### UI-Builder

UI-Builder can be more challenging to start with, as it does not follow a low-code approach and lacks a separate sidebar for managing UI elements. Navigating the dashboard built with UI-Builder can be less straightforward, requiring users to have a deeper understanding of coding and UI design principles.

## Migrating from Node-RED Dashboard (Dashboard 1.0)

[Node-RED Dashboard](https://flows.nodered.org/node/node-red-dashboard) is a module that provides a set of nodes in Node-RED to quickly create user interfaces or live data dashboards. It was developed by one of the creators of Node-RED and is the most used and downloaded package in the Node-RED ecosystem. However, it is now deprecated. For more information, refer to [Node-RED Dashboard Formally Deprecated](/blog/2024/06/dashboard-1-deprecated/).

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0 is developed to replace the the deprecated standard Node-RED Dashboard. It retains the core concepts and UI elements but introduces more advanced options and configurations. To facilitate the transition, FlowFuse, the creator of Node-RED Dashboard 2.0, provides a [migration service](/product/dashboard/#migration-service) that simplifies migration of flows or projects from the Node-RED Dashboard to Node-RED Dashboard 2.0. This service helps ensure a smoother migration process with minimal disruption.

### UI-Builder

Migrating from Node-RED Dashboard 1 to UI-Builder is significantly more complex. UI-Builder does not follow the same concepts or provide the same UI elements as the Node-RED Dashboard. Users will need to recreate their dashboards from scratch, as UI-Builder relies on custom coding and frontend frameworks rather than the predefined, low-code widgets of Node-RED Dashboard. This process can be overwhelming and requires a solid understanding of HTML, CSS and the frontend frameworks if you wanted use.

## How Active is the Project's Development?

### Node-RED Dashboard 2.0

[Node-RED Dashboard 2.0](https://github.com/FlowFuse/node-red-dashboard/graphs/contributors), which replaced Node-RED Dashboard 1.0 in 2023, has shown consistent and high development activity. The project benefits from a dedicated team that regularly updates and improves it, ensuring it remains current with user needs and technological advancements.

![Screenshot of the Node-RED Dashboard 2.0 GitHub commit chart](./images/dashboard-2-commits.png)  
_Screenshot of the Node-RED Dashboard 2.0 GitHub commit chart._

### UI-Builder

[UI-Builder](https://github.com/TotallyInformation/node-red-contrib-uibuilder/graphs/contributors) has been an active project for a long time and remains active. However, there has been a noticeable decline in development activity starting in early 2024. While the project continues to be maintained, it does not have a dedicated, full-time team.

![Screenshot of the UI-Builder GitHub commit chart](./images/ui-builder-commits.png)  
_Screenshot of the UI-Builder GitHub commit chart._

## How Extensive is the Collection of Pre-Built UI Elements?

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0 offers an extensive set of UI elements, including forms, dropdowns, tables, charts, and gauges that are super easy to use. These widgets are built with complex Vue.js components, but users are completely shielded from this complexity, allowing them to focus on ease of use. Additionally, if you want to create your own custom widget, you can do so with the ui-template node that accepts complete Vue components. By default, Dashboard 2.0 supports the Vuetify library, which provides an extensive set of UI components.

## UI-Builder

UI-Builder also offers a number of widgets, but these are not as user-friendly as those in Dashboard 2.0. Users must send a JSON config object, which can be complex for new users who lack knowledge of HTML/CSS. Additionally, handling widget data requires using UI-Builder's methods, which can further increase complexity. However, UI-Builder's strength lies in its flexibility, allowing any HTML element to be used as a component, and it also supports the W3C standard web components. Despite this, users need to perform a lot of additional tasks to get everything set up and will have the hassle of writing things.

## How easy it is to Control UI at runtime?

### Node-RED Dashboard

Node-RED Dashboard 2.0 supports dynamic control of the UI via the msg object. Each UI widget supports the `msg.ui_update` property, which allows you to control and update UI components dynamically. For example, you can update form fields based on user input, dynamically insert or update options in a dropdown, or change the appearance of the UI by sending CSS classes or selecting options in dropdowns or radio buttons through msg.

### UI-Builder

UI-Builder also supports dynamic UI updates and control. Similar to Node-RED Dashboard, you can use messages to control the state and content of UI elements.

## Data Visualization

### Node-RED Dashboard 2.0

Monitoring devices is one of the core use cases for Node-RED, and Node-RED Dashboard 2.0 makes it easy to monitor device metrics with its built-in [chart](https://dashboard.flowfuse.com/nodes/widgets/ui-chart.html) and [gauge widgets](https://dashboard.flowfuse.com/nodes/widgets/ui-gauge.html). The chart widgets support various types, including line, bar, scatter, pie, and donut charts, while the gauge widgets offer options like tile, 3/4 gauge, and half gauge. This range of built-in options simplifies the creation of visualizations for monitoring device metrics. Additionally, you can use Vuetify or other third-party libraries in the ui-template node if you need different types of charts.

### UI-Builder

UI-Builder does not provide built-in charting options. However, you can add charts using third-party JavaScript libraries. This approach requires additional effort to integrate and configure the libraries, as well as writing the relevant JavaScript to render the charts. While this increases the complexity of creating visualizations, it offers more control and customization.

## Building Layout

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0 offers a collection of pre-defined layouts to make it easy for users to get started quickly. These are available as a configuration for each "Page" of your application.

These predefined layouts provide a solid foundation for most applications. If you need a different layout, Dashboard 2.0 is limited in it's customization in terms of positioning of elements.

### UI-Builder

UI-Builder does not come with predefined layouts, which can make it more complex for users to get started. it does however, provides the flexibility to completely define your own layout using CSS. This approach allows for complete customization, but it requires users to have a good understanding of HTML and CSS. The lack of predefined layouts means users have to create their own from scratch, which can be time-consuming.

## How Responsive Are They?

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0 is designed with [responsiveness](https://dashboard.flowfuse.com/layouts/) in mind. It ensures that dashboards automatically adapt to different screen sizes and devices, providing a consistent user experience across desktops, tablets, and mobile devices. The dashboard elements are automatically adjusted to fit various resolutions, making it user-friendly for a wide audience.

### UI-Builder

UI-Builder's support for different devices depends on the user's implementation. While it offers the potential for responsive designs, achieving this requires a good understanding of responsive design principles and CSS.

## How Much Customization is Available?

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0, built on Vue.js, offers a range of customization options through its widget configurations and settings. 

While it provides predefined UI elements, users can override CSS and theming using the [ui_template](/blog/2023/12/dashboard-0-10-0/) widget to enhance the dashboard's appearance. 

This same widget also provides functionality to develop custom components or widgets for your Dashboard. These must be built with a VueJS core, but do support the integration of third-party JavaScript libraries.

### UI-Builder

UI-Builder provides extensive customization capabilities, enabling users to build and style UI elements from scratch. This flexibility is advantageous for those with a strong background in frontend development, as it supports any frontend framework or custom design approach. However, achieving the desired results requires significant time and expertise, as users need to handle the coding and styling for each UI element they create.

## Can it be Installed on Mobile?

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0 is built and deployed as a Progressive Web App. This means whilst it's built as a web application, it can be [installed on your mobile device](https://dashboard.flowfuse.com/user/pwa.html#installing-dashboards-on-mobile) and run as a standalone application, behaving as if it was a native app.

### Ui-builder

Dashboards built with UI-Builder, on the other hand, cannot be installed as an app. It is designed as a web-based tool for building custom UIs and does not support installation as a standalone application.

## How About Performance and Speed?

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0 provides reliable performance with efficient real-time updates. Initial page load times might be slower, particularly on mobile, but the overall performance is consistent and effective for dynamic dashboards.

### UI-Builder

UI-Builder provides faster initial load times and smooth performance across customizations, ensuring high-speed interactions.

## How is the Overall User Experience?

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0 offers a user-friendly experience with its low-code approach, intuitive UI, and extensive documentation. Users can quickly create and customize dashboards without needing advanced coding skills, making it accessible to a wide range of users, from beginners to experienced developers. This allows users to focus on solving business problems and IoT tasks rather than getting bogged down by complex coding requirements.

###  UI-Builder

UI-Builder provides a more flexible but complex user experience. While it allows for greater customization and the use of any frontend framework, it requires a solid understanding of coding and design principles. This can be daunting for users without a background in web development, but it offers powerful capabilities for those who are comfortable with custom coding.

## How Active is the User Community?

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0 boasts a large and active user community. Users frequently participate in forums, contribute to discussions, and share custom solutions. The number of weekly downloads is growing rapidly, reflecting its high activity and popularity.

!["Screenshot of the Node-RED Dashboard package's weekly download chart from npm"](./images/dashboard-2-download.png) 
_Screenshot of the Node-RED Dashboard package's weekly download chart from npm_

### UI-Builder

UI-Builder has a smaller but still active user community. While not as large as Node-RED Dashboard 2.0's, it includes dedicated users who also engage in forums, contribute to discussions, and share their use cases and solutions.

!["Screenshot of the Ui-Builder package's weekly download chart from npm"](./images/ui-builder-downloads.png )
_Screenshot of the Ui-Builder package's weekly download chart from npm_

## How Good is the Support and Documentation?

### Node-RED Dashboard 2.0

Support for Node-RED Dashboard 2.0 is robust, with assistance from both the FlowFuse team and the active Node-RED community. The documentation is comprehensive, easy to understand, and regularly updated. The team is also working on an interactive dashboard solution for previewing examples.

### UI-Builder

UI-Builder also has good support, with active contributions from the author and the Node-RED community. The documentation is detailed but can be complex due to extensive use of technical language.

## What are the future development plans?

### Node-RED Dashboard 2.0

Node-RED Dashboard 2.0 is actively working on enhancing its feature set. With extensive functionality already in place, the project also has ambitious plans to introduce more advanced features to better serve its users. You can track these developments on the [Node-RED Dashboard 2.0 GitHub project board](https://github.com/orgs/FlowFuse/projects/15/views/4), where ongoing and upcoming features are documented.

!["Screenshot of the Node-RED Dashboard 2.0 GitHub project board"](./images/dashboard-2-project-plan.png )
_Screenshot of the Node-RED Dashboard 2.0 GitHub project board_

Additionally, updates about new features and enhancements are also provided through social media, blogs, and the Node-RED forums, ensuring that users stay informed about the latest developments.

### UI-Builder

UI-Builder does not have a publicly accessible project roadmap or a dedicated planning board for future updates. While development continues, details about forthcoming features and enhancements are regularly updated on the Node-RED Discourse forums by its author. However, having a project roadmap could provide users with a better understanding of upcoming features and planned improvements, making it easier to plan and adapt their projects accordingly.

## Summary Table


| Feature                                  | Node-RED Dashboard 2.0                          | UI-Builder                                       |
|------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| **Ease of Installation**                 | **Moderately easy**: Search for `flowfuse/node-red-dashboard` can be confusing due to multiple nodes; useful documentation available | **Easy**: Clear package name `node-red-ui-builder` makes it straightforward to find |
| **Ease of Getting Started**              | **Easy**: Low-code interface with a sidebar for managing UI elements; intuitive for users of varying technical skills | **Challenging**: Requires understanding of coding and UI design; lacks a low-code approach |
| **Migration from Node-RED Dashboard**    | **Smooth**: Migration service provided to transition from Node-RED Dashboard 1 to Dashboard 2.0 | **Complex**: Requires rebuilding dashboards from scratch; significant effort needed for migration |
| **Development Activity**                 | **High**: Regular updates and improvements; actively maintained by a dedicated team | **Moderate**: Active but shows a decline in updates; less frequent enhancements |
| **UI Elements Collection**                | **Extensive**: Includes a wide range of widgets like forms, charts, and gauges; built on Vue.js with Vuetify support | **Flexible but complex**: Allows any HTML element; requires custom coding and handling of UI elements |
| **Visualization**                        | **Easy**: Built-in charting options for various types; additional options with third-party libraries | **Complex**: No built-in charts; requires integration of third-party libraries for visualization |
| **Dynamic UI Control**          | **Supported**: Can dynamically control and update UI components using `msg.ui_update` property | **Supported**: Dynamic updates possible, but can be more complex to implement |
|
| **Web Layout Support**                   | **Predefined**: Offers three main layouts with some options for custom styling | **Customizable**: No predefined layouts; users must create their own using CSS |
| **Device and Screen Size Support**       | **Excellent**: Responsive design adapts well to various devices and screen sizes | **Variable**: Responsiveness depends on user's implementation and knowledge of CSS |
| **Customization**                       | **Good**: Offers customization through widget settings and custom CSS and ui-template; supports Vue components and third-party libraries | **High**: Full control over UI design and layout with custom coding; requires expertise in frontend development |
| **App Installation**                     | **Available**: Can be installed as a Progressive Web App (PWA) for use as a standalone application | **Not available**: Designed as a web-based tool; cannot be installed as an app |
| **Performance and Speed**                | **Reliable**: Good performance with consistent updates; may have slower initial load times on mobile | **Good**: Generally good performance on both desktop and mobile |
| **Support and Documentation**            | **Robust**: Comprehensive, regularly updated documentation and active community support | **Good**: Detailed but may be complex; documentation includes technical jargon |
| **Overall User Experience**              | **User-friendly**: Accessible and easy to use with low-code approach; suitable for a wide range of users | **Flexible but complex**: Offers greater customization but requires coding expertise; can be daunting for non-developers |
| **User Community Activity**              | **Large and active**: High engagement in forums and discussions; growing number of downloads | **Smaller but dedicated**: Active users, but less engagement compared to Node-RED Dashboard 2.0 |
| **Future Development Plans**             | **Active**: Continuous enhancements and new features planned; updates tracked on GitHub project board | **Less transparent**: No detailed roadmap; future features are less clearly communicated |

## Conclusion

Node-RED Dashboard 2.0 is well-suited for users seeking a user-friendly, low-code solution with a wide range of pre-built elements and strong community support. Its ease of use and active development make it ideal for quick deployment and minimal technical overhead.

UI-Builder, however, offers nice performance and customization, benefiting users with coding expertise who need highly tailored UIs. Despite its flexibility and faster load times, it requires more complex setup and migration.