---
navTitle: Webinars
navGroup: Sales & Marketing
---

## FlowFuse Webinars

FlowFuse will organize two types of webinars: 1) Ask Me Anything session that is an ope mic for community members to ask questions of Node-RED and FlowFuse experts, and 2) Educational webinars that will educational topics. The current plan is to do an AMA session the second week of each month and an educational webinar the last week of the month.

### Hosting Webinars
FlowFuse will use the Zoom Webinar platform to host each webinar. This platform provides the automated recording, email reminders, calendar entries, Q&A and accommodate up to 500 attendees.

Hubspot will be used to collect attendee registrations. 

### Steps to Schedule a Webinar

1. Select a topic and speaker
   * Create a title and abstract for the webinar and speaker bio
2. Schedule webinar in Zoom
   * Zoom will automatically send a confirmation email and a two reminder emails to all registrants.
3. Create a webinar page for the website
   * Follow the templates from previous months - more details can be found [below](#creating-a-webinar-page).
4. Create a graphic to promote the webinar
   * Follow the templates from previous months.
5. Setup Hubspot for Webinar
   * Create a static list to track the registrations
   * Change the webinar workflow to point to the new static list
   * Change the webinar workflow to point to the new Zoom Webinar ID.  The ID can be found in the Zoom webinar page. NOTE: you need to use hyphens to replace the spaces in the ID number.

### Promoting Webinars

Each webinar should be available for promotion 2-4 weeks before the live date. Channels for promotion include:
* Flowforge newsletter
* Social media
* Slack channels
* Node-RED forums
* FlowFuse website

### Creating a Webinar Page

Webinar pages follow a fixed structure, you can see plenty of examples [here](https://github.com/flowforge/website/tree/main/src/webinars) in our website repository. Importantly, they must define the following properties at the top of the `.md` file:

#### Properties

| Property | Description
|-|-|
| `title` | The title of the webinar, this will also be what shows as the "title" when shared on socials
| `subtitle` | More context on what the webinar will involve
| `video` | Once you have an available video recording of the session, you can include the videos' YouTube id here to include the recording in the webinar's page
| `image` | Absolute file path to the image to show for the Webinar's tile
| `date` | The date that the webinar will take place
| `time` | The time that the webinar will take place, in both GMT & ET
| `duration` | How long, in minutes with the webinar last for
| `hosts` | A list of the webinar hosts, the names need to be formatted inline with the file names found [here](https://github.com/flowforge/website/tree/main/src/_data/team)
| `hubspot.formId` | The formId from HubSpot to handle the event registration

#### Example

```yml
---
title: "DevOps for Node-RED: An Introduction to FlowFuse"
subtitle: Join FlowFuse's CTO Nick O'Leary for an introduction to FlowFuse and how it provides DevOps for Node-RED.
video: 47EvfmJji-k
image: /images/webinars/webinar-nr-5mins.jpg
date: YYYY-MM-DD
time: HH:MM GMT (HH:MM ET) 
duration: MM
hosts: ["rob-marcer"]
hubspot:
    formId: <form-id>
---
```
