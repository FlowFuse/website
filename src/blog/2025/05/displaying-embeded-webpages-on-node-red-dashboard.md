---
title: "How to Embed Webpages in the FlowFuse Dashboard"
subtitle: Learn how to easily embed external content like maps, reports, and widgets into your FlowFuse dashboard.
description:  Learn how to embed external webpages such as maps, reports, and widgets into your FlowFuse dashboard. Follow this guide for easy, step-by-step instructions on improving your dashboard's functionality and collaboration.
date: 2025-05-14
authors: ["sumit-shinde"]
image: 
keywords: FlowFuse, embed webpages, external content, dashboard, maps, reports, widgets, Node-RED, iframe, embedding FlowFuse dashboard, dashboard customization
tags:
   - flowfuse
---

When building a dashboard in FlowFuse, it’s not just about displaying internal data — it’s about centralizing all the resources your team needs. FlowFuse makes it easy to embed external content like live dashboards, maps, PDFs, and videos directly into your dashboard. This helps eliminate switching between tabs and keeps everything in one place. In this guide, we’ll show you how to embed these elements seamlessly into your FlowFuse dashboard for a more efficient and collaborative workspace.

<!--more-->

## Why Embed Webpages in Your Dashboard?

- Less Switching: No more jumping between tabs or apps. Everything you need is right in front of you.

- Use What You Already Have: If you’ve already built a chart, report, or page somewhere else, just embed it—no need to recreate it.

- Faster Decisions: With all your important information in one place, it's easier to understand what’s happening and act quickly.

- Keep Everyone on the Same Page: A shared dashboard ensures your whole team is looking at the same data and updates.

- Save Time, Every Day: Fewer clicks and less back-and-forth means more focus and better use of your time.

## How to Embed Webpages On your FlowFuse Dashboard

Embedding external content into your FlowFuse dashboard is simple and straighforward. 

### Prequastie.

Before you begin embedding webpages on FlowFuse Dashboard make sure you have the following:

- **Running FlowFuse Instance:** Make sure you have a FlowFuse instance set up and running. If you don't have an account, check out our [free trial](https://app.flowfuse.com/account/create).
- **FlowFuse Dashboard:** Ensure you have [FlowFuse Dashboard](https://flows.nodered.org/node/@flowfuse/node-red-dashboard) (also known as Node-RED Dashboard 2.0 in the community) installed and properly configured on your instance.
- **@flowfuse/node-red-dashboard-2-ui-iframe:** Ensure you have [node-red-contrib-sqlite](https://flows.nodered.org/node/@flowfuse/node-red-dashboard-2-ui-iframe) installed.

#### Step 1: Obtain the URL or Embed Code of the Webpage You Want to Embed

The first step is identifying and grabbing the URL of the webpage or external content you want to embed into your FlowFuse dashboard. This could be a live dashboard, report, Google Map, video, or any other type of content.

When embedding content from third-party sources, make sure the following conditions the page or content you're embedding should be publicly accessible or have the proper permissions for embedding. For example, private reports or webpages might require login credentials or an API key, which should be handled securely.

Some websites may restrict embedding through iframes due to [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) policies. If the content doesn’t load properly, check whether the external site allows embedding.

Many platforms, such as YouTube and Google Maps, provide a specific "embed code or URL" that’s more suitable for embedding. Ensure that you’re using the correct embed link or code provided by these platforms to guarantee smooth integration.

Once you have the URL (or embed code) ready, move on to the next step.

#### Step 2: Embedding the Webpage in FlowFuse Dashboard

Now that you’ve gathered the URL or embed code for the external content you want to embed, it’s time to add it to your FlowFuse dashboard. Below are two methods for embedding external content:

##### 2.1 Embed via URL 

The easiest and most straightforward way to embed external content is by using the URL. FlowFuse's ui_iframe node allows you to directly use an external URL. Here’s how to do it:

1. Drag the ui_iframe widget onto the canvas.
2. Double-click the widget to open its configuration dialog.
   - Create a new group for it to render in.
   - Set the size (width and height).
   - Enter the URL you want to embed.

![ui_iframe widget configuration](./images/if_frame-config.png){data-zoomable}
_iframe widget configuration_

3. Click Done and then Deploy.

For quick testing, you can use the weather widget, Google Map embedded URL, or the PDF URL. Below, I’ve included an image of a dashboard with the weather widget, Google Map, and PDF embedded.

<div style="display: flex; justify-content: space-around; align-items: stretch; flex-wrap: wrap;">
  <img src="./images/weather-widget.png" alt="Weather widget embedded in FlowFuse Dashboard" style="height: 200px; width: auto; object-fit: contain;"/>
  <img src="./images/google-map.png" alt="Google Map embedded in FlowFuse Dashboard" style="height: 200px; width: auto; object-fit: contain;"/>
  <img src="./images/pdf.png" alt="PDF embedded in FlowFuse Dashboard" style="height: 200px; width: auto; object-fit: contain;"/>
  <img src="./images/google-calendar.png" alt="Google Calendar embedded in FlowFuse Dashboard" style="height: 200px; width: auto; object-fit: contain;"/>
</div>

<style>
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    div {
      flex-direction: column;
      align-items: center;
    }
    img {
      height: auto; /* Adjust height to maintain aspect ratio */
      width: 100%; /* Ensure images use the full width of the container */
      max-height: 200px; /* Limit max height to avoid distortion */
      margin-bottom: 20px; /* Adds space between images */
      object-fit: contain; /* Ensure images maintain their aspect ratio */
    }
  }
</style>

_Weather widget, Google Map, and PDF embedded in FlowFuse Dashboard_

##### 2.1 Embed via HTML Embed Code

If you have an embed code from third party services you can use this HTML code to embed the content into your FlowFuse dashboard. Here’s how to do it:

1. Drag the ui_template widget onto the canvas.
2. Double-click on it to open its configuration dialog.
   - Create a new group for it to render in.
   - Set the size (width and height).
3. Paste your embed code into the template widget. Most embed codes include both HTML and JavaScript, so follow this structure:

```html
<template>
  <!-- Paste your HTML code here -->
</template>
<script>
  // Paste your JavaScript code here
</script>
```

Some services provide an iframe tag. In this case, all you need to do is copy the URL and use the embedding via the URL method.

4. Once you've added the code, click Done and then Deploy to save your changes.

Following is the image of the dashboard on which we are embedding the animated weather widget on the FlowFuse dashboard using embed code.

![Animated weather widget on the Flowfuse dashboard, embedded with code.](./images/weather-widget.gif){data-zoomable}
_Animated weather widget on the Flowfuse dashboard, embedded with code._

Now that you’ve learned how to embed external content into your FlowFuse dashboard, you might have tried embedding your FlowFuse dashboard into other websites or another FlowFuse dashboard and found that it is not working as expected.

This is actually a security feature designed to protect your data. FlowFuse dashboards, like many other web applications, implement security policies such as Cross-Origin Resource Sharing (CORS) and the X-Frame-Options header. These policies are in place to ensure that your dashboard is only viewed in trusted environments, preventing malicious sites from potentially tampering with your data or exposing it to unauthorized users.

However, if you really need to embed your FlowFuse dashboard into other websites or another FlowFuse dashboard, it is actually possible to do so with some configuration changes. Following is the section on how to enable embedding securely:

### Enabling Embedding of FlowFuse Dashboards

1. Go to your FlowFuse instance settings.
2. Switch to the editor settings and enable the option "Allow Dashboard to be embedded in an iFrame".

![FlowFuse instance settings showing the option to allow dashboard embedding in an iframe.](./images/allow-dashboard-embedding.png){data-zoomable}
_FlowFuse instance settings showing the option to allow dashboard embedding in an iframe._

3. Click Save Settings and restart your instance for the changes to take effect.

![FlowFuse OEE Dashboard embedded in another FlowFuse dashboard.](./images/embedding-flowfuse-oee-dashboard.png){data-zoomable}
_FlowFuse OEE Dashboard embedded in another FlowFuse dashboard._

FlowFuse dashboards offer great flexibility, making it easy to embed external content like weather widgets, maps, and PDFs directly into your workspace. With a few simple steps, you can also embed FlowFuse dashboards into other websites, ensuring everything you need is in one place.


## Up Next 

If you're interested in learning more about embedding webpages or enhancing your FlowFuse dashboards, check out the following blog articles:

- [Mapping Location on Dashboard](/blog/2024/05/mapping-location-on-dashboard-2/): In this article, we dive into how you can embed location maps into your FlowFuse dashboard. Learn how to map locations, track real-time data, and make your dashboards even more interactive and informative.
- [Generating PDF Reports with Node-RED and FlowFuse](#): This guide explains how to generate PDF reports directly with Node-RED and FlowFuse. We also cover how to preview these reports within your FlowFuse dashboards.