---
navTitle: Webinars
navGroup: Sales & Marketing
---

# FlowFuse Webinars

FlowFuse organizes monthly webinars on topics about Node-RED, FlowFuse and the general IoT industry. The topics are typically educational and technical in content. The goal is to become the source of great content for learning about these topics.

The FlowFuse webinar is typically scheduled during the last week of the month. The webinar typically starts at 17:00CET or 11amET, to allow for European and Pacific coast of North America attendees.  All webinars are recorded and the recording is made available on the FlowFuse Youtube channel.

The following are the steps to produce a montly webinar.

## Webinar preparation

   1. Identify the webinar topic and speaker as close as possible to the previous webinar.
   2. Create a draft webinar title and abstract that is reviewed and approved by the speaker. 
   3. Confirm the date with the speaker and send a calendar invite to block calendars
   4. [Create a webinar page](#creating-a-webinar-page) for the website
   5. Create a Zoom webinar page
        * Login to zoom and select the Webinars tab. There is a webinar template that will help getting going.
        *  Use the same description and topic that was used for the web page. 
        * Turn on Q&A, Enable Practice Session and Automatically record webinar to the cloud.
        * Under Invitations, invite the speaker as a Panelist.
            - Panelist receive a unique url to join the webinar that grants them access before the webinar starts. It is important the speaker knows to use this url.
        * Under Email Setting ensure the following: Confirmation email sent to panelist, Reminder sent 1 hour and 1 day before.  Turn off email for follow-up since we do that inside Hubspot.
        * Under Branding, for the banner add the graphic created for the web site.
        * Under Survey, you can decide if you want to do a survey at the end of the webinar. We ask if someone wants to be contacted by FlowFuse to discuss our services. These become MQLs in Hubspot.
   6. Setup HubSpot to accept webinar registrations.
        * Create a new static list called ‘Webinar Registrations [&lt;month> Edition]
        * NOTE: You can only do the following changes once the previous month webinar has passed. You can not accept registrations for multiple webinars at the same time
        * Edit Workflow called ‘Webinar Registration Integration with Zoom’. Two changes are required:
         * Edit ‘Add Contact to Zoom Webinar’ to update the new Webinar ID. Replace the current number with the number from the webinar you just created for this month. You find the Webinar ID on the main page of the Zoom webinar. NOTE: you need to  hyphens to replace the spaces in the ID number.
        * Edit ‘Add to static list’ to change the list to the new list for this month’s webinar.
        * Remember to Save the changes.
   7. Test the web page for the webinar to see if a new registrant gets added to the Hubspot list.
   8. Page is now ready to be published.

## Webinar Promotion

* Week 1: Added to the newsletter
* Week 2: Social media promotion on all channels:
    * LinkedIn, Twitter, Facebook, Node-RED Forum Event category, Redit Node-RED, Node-RED slack
    * Encourage FlowFuse employees to promote their network
* Week 3 (1 week before webinar): Email to Hubspot list
    * Typically clone a previous email as the starting point.
* Week 4: Another social media promotion

## Post Webinar

* Upload webinar recording to FlowFuse Youtube channel
    * Trim out the dead air waiting to start the webinar
* Publish webinar recording
* Social media post with link to webinar recording
* In Hubspot send follow-up email to the registration list created in Hubspot that includes a link to the recording on YouTube.



## Creating a Webinar Page

Webinar pages follow a fixed structure, you can see plenty of examples [here](https://github.com/FlowFuse/website/tree/main/src/webinars) in our website repository. Importantly, they must define the following properties at the top of the `.md` file:

### Properties

| Property | Description
|-|-|
| `title` | The title of the webinar, this will also be what shows as the "title" when shared on socials
| `subtitle` | More context on what the webinar will involve
| `video` | Once you have an available video recording of the session, you can include the videos' YouTube id here to include the recording in the webinar's page
| `image` | Absolute file path to the image to show for the Webinar's tile
| `date` | The date that the webinar will take place
| `time` | The time that the webinar will take place, in both GMT & ET
| `duration` | How long, in minutes with the webinar last for
| `hosts` | A list of the webinar hosts, the names need to be formatted inline with the file names found [here](https://github.com/FlowFuse/website/tree/main/src/_data/team)
| `hubspot.formId` | The formId from HubSpot to handle the event registration

### Example

```yml
---
title: "DevOps for Node-RED: An Introduction to FlowFuse"
subtitle: Join FlowFuse's CTO Nick O'Leary for an introduction to FlowFuse and how it provides DevOps for Node-RED.
video: 47EvfmJji-k
image: /images/webinars/intro-to-node-red-5-minutes-to-your-first-program-webinar-feb-2023.jpg
date: YYYY-MM-DD
time: HH:MM GMT (HH:MM ET) 
duration: MM
hosts: ["rob-marcer"]
hubspot:
    formId: <form-id>
---
```
