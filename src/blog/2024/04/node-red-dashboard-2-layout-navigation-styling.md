---
title: "Comprehensive guide: Node-RED Dashboard 2.0 layout, navigation and styling"
subtitle: Explore Dashboard 2.0 Different layouts and navigation. learn how to style Dashboard 2.0 elements effortlessly.
description: Discover Dashboard 2.0's layouts, navigation, and styling features for a seamless user experience.
date: 2024-04-03
authors: ["sumit-shinde"]
image: 
tags:
   - posts
   - dashboard 2.0
---

In this comprehensive guide, we will explore different layouts, and navigation styles. Additionally, we will cover how you can style the dashboard 2.0 element effortlessly.

<!--more-->

If you are new to Dashboard 2.0, refer to [Getting started with Node-RED Dashboard 2.0](https://flowfuse.com/blog/2024/03/dashboard-getting-started/) and make sure you have installed it.

## Understanding Dashboard 2.0 layouts.

A layout in Node-RED Dashboard 2.0 refers to how groups of widgets are organized and arranged on a page. It controls the visual structure and placement of these widget groups to create an organized and easy-to-use interface.

### Exploring Dashboard 2.0 layouts

In Dashboard 2.0, we have three types of layouts: Grid, Notebook, and fixed.

#### Grid layout

Choosing this layout divides your dashboard page into 12 equal-size columns, and you can specify how many columns your group will occupy using the 'size' property. When groups within a row take up all column space of a given screen width, new rows automatically start. Additionally, the height of each row is determined by the tallest widget in that row.

Within this layout, each group creates its internal grid layout based on the columns it occupies.

!["Screenshot of dashboard having grid layout"](./images/node-red-dashboard-2-layout-navigation-styling-grid-layout.jpg "Screenshot of dashboard having grid layout"){data-zoomable}

In the image above, you can see that the first and last widget groups occupy all columns, while in the middle, two groups each take up 6 columns. Notice how the first widget in each group creates its grid layout, utilizing all available column space.

#### Notebook layout

Choosing this layout for your page will give it a Jupyter Notebook-like behavior, where the layout stretches to 100% width (up to a maximum of 1024px) and aligns centrally.

In this layout, groups of pages are arranged sequentially, with each group defaulting to occupying 6 column spaces.

!["Screenshot of dashboard having notebook layout"](./images/node-red-dashboard-2-layout-navigation-styling-notebook-layout.png "Screenshot of dashboard having notebook layout"){data-zoomable}

While the width of groups remains fixed at 6 columns in this layout, you have the option to render a group with up to 12 columns. However, the widgets within the group will only utilize 6 columns of space. This can be seen in the following image, where the width of groups is increased to 12 columns, but the widgets only take up half of the available space, which is 6 columns each.

#### Fixed layout

In Dashboard 1.0, we had a fixed layout where the width of a group was a fixed pixel size, typically 90px. This layout was designed as a flexbox layout 

with a single row. If the groups in a row occupied all available space on the screen, any newly added widget would be placed in a new row.

!["Screenshot of dashboard having fixed layout"](./images/node-red-dashboard-2-layout-navigation-styling-fix-layout.png "Screenshot of dashboard having fixed layout"){data-zoomable}

*Note: Currently this layout is not completely ready to use so it is recommended to use other layouts.*

### Setting page layout

1. Navigate to the page configuration by clicking on the edit button of your page in the Dashboard 2.0 sidebar.
2. In the page configuration, you can select the preferred layout for that page within the layout field.

!["Image showing process of setting page layout"](./images/node-red-dashboard-2-layout-navigation-styling-setting-new-page-layout.gif "Image showing process of setting page layout"){data-zoomable}

## Understanding Dashboard 2.0 Theme 

The theme is a collection of colors that control the look and feel of the widgets, groups, and other elements on the page.

In Dashboard 2.0, while adding a page ( ui-page ) we have to specify which theme it will use. By default, we have one default theme in dashboard 2.0. Additionally, we can add a new theme (ui-theme) where we need to specify colors and sizing.

### Understanding theme properties

In the theme (`ui-theme`) configuration, there are two main sections: colors and sizing. 

Within the color section, you'll need to specify colors for Navigation, primary elements, page background, group backgrounds, and outlines.

In the sizing section, you'll define the gaps between groups, page padding, group outline radius, and gaps between widgets, all in pixels.

For additional information on the `ui-theme` settings, please consult the [ui-theme documentation](https://dashboard.flowfuse.com/nodes/config/ui-theme.html).

### Setting a new page theme

1. Navigate to the Dashboard 2.0 sidebar and switch to the theme tab.
2. Click on the top-right “+theme” button to add a new theme.
3. After specifying colors and sizing click on the top right update button to save the theme.
4. Now switch to the layout tab and click on the edit button next to the page for which you want to set a new theme.
5. In the page config, select the newly added theme in the Theme field.

!["Image showing process of adding new theme"](./images/node-red-dashboard-2-layout-navigation-styling-adding-new-theme.gif "Image showing process of adding new theme"){data-zoomable}

## Dashboard 2.0 Sidebar

In Dashboard 2.0, we have 5 different types of sidebars.

### Exploring different types of Dashboard 2.0 sidebar

#### Collapsing

This is the default sidebar, when it's opened, the page content adjusts to the width of the sidebar.

!["Image showing 'Collapsing' sidebar"](./images/node-red-dashboard-2-layout-navigation-styling-collapsing-sidebar.gif "Image showing Collapsing sidebar"){data-zoomable}

You can see in the image above how the page content automatically adjusts when the sidebar is opened.

#### Fixed

In this type, the sidebar is always visible and fixed on the left side, and the top menu icon is hidden. The page content adjusts to the width of the sidebar.

!["Image showing 'Fixed' sidebar"](./images/node-red-dashboard-2-layout-navigation-styling-fixed-layout.png "Image showing Fixed sidebar"){data-zoomable}

#### Collapse to icon

This type of sidebar is similar to the collapsible one, but when the sidebar is collapsed, you can still navigate through different pages as the page icons become visible.

!["Image showing 'Collapse to icon' sidebar"](./images/node-red-dashboard-2-layout-navigation-styling-collaps-to-icon-sidebar.gif "Image showing Collapse to icon sidebar"){data-zoomable}

#### Apear over content 

When the sidebar is opened, the page is partially covered by a transparent layer, and the sidebar appears on top of this layer

!["Image showing 'Apear over content' sidebar"](./images/node-red-dashboard-2-layout-navigation-styling-appear-over-content.gif "screenshot displaying searching for botFather bot for creating custom bot"){data-zoomable}

In this type of sidebar, you can notice how the sidebar opens without affecting the width of the page content

#### Always hide 

In this type, the sidebar is always hidden, and navigation between different pages can be achieved using the ui-control widget.

!["screenshot displaying searching for botFather bot for creating custom bot"](./images/node-red-dashboard-2-layout-navigation-styling-always-hidden.png "screenshot displaying searching for botFather bot for creating custom bot"){data-zoomable}

### Setting sidebar 

1. Navigate to the Dashboard 2.0 sidebar.
2. Click on the "Edit Settings" button located at the top left side of the Dashboard 2.0 sidebar.
3. Select your preferred sidebar style from the "Style" field in the sidebar options section.

!["Image showing process of changing sidebar style"](./images/node-red-dashboard-2-layout-navigation-styling-setting-sidebar.gif "Image showing process of changing sidebar style"){data-zoomable}

## Styling your Dashboard 2.0 elements
 
In Dashboard 2.0, we can add classes to almost all widgets, pages, and groups and style them using CSS. Applying styles to these classes will inject the CSS inline, giving them an inline scope. This means the specified styles will take precedence over any existing CSS rules.

### Adding classes

1. To add classes to your widget, page, or group, you'll need to open its configuration
2. Find the 'Class' field and enter your class.

### Writing custom CSS

In Dashboard 2.0, the ui-template allows you to write custom CSS for Dashboard 2.0 elements. In the ui-template, you can add CSS for two different scopes: Single page (selecting this allows you to specify CSS for all classes within the selected page) and All pages (selecting this allows you to specify CSS for classes across all pages in a ui-base).

1. Drag an ui-template widget onto the canvas.
2. Double-click on it and select the scope within the type field.
3. If you select the single-page scope, you'll need to select the page to which your element or class belongs for adding styling. If you select the all-page scope, then you'll need to select the ui-base that includes those pages to which you want to add styling.
4. Now you can write your custom CSS within the ui-template.

!["Screenshot of ui-template widget adding CSS for styling elements of all pages of a ui-base"](./images/node-red-dashboard-2-layout-navigation-styling-adding-style-in-ui-template.png "Screenshot of ui-template widget adding CSS for styling elements of all pages of a ui-base"){data-zoomable}










