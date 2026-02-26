---
navTitle: Webinars
navGroup: Sales & Marketing
---

# FlowFuse Webinars

FlowFuse organizes monthly webinars on topics about Node-RED, FlowFuse and the general IoT industry. The topics are typically educational and technical in content. The goal is to become the source of great content for learning about these topics.

The FlowFuse webinar is typically scheduled during the last week of the month. The webinar typically starts at 17:00CET or 11amET, to allow for European and Pacific coast of North America attendees.  All webinars are recorded and the recording is made available on the FlowFuse Youtube channel.

The following are the steps to produce a montly webinar.

## Webinar Preparation

   1. Identify the webinar topic and speaker as close as possible to the previous webinar.
   1. Confirm the date with the speaker and send calendar invites to block time for the event and for a dry run (recommended one week before the event).
   1. The speaker creates the draft title and abstract using [this template](https://docs.google.com/document/d/1Ovh-X87OW5uFFFQXlCob3KMoLybLhL1h3qKLLyIe9FY/edit?usp=sharing) (please duplicate the document and save it in the corresponding folder). The host then reviews it to ensure it aligns with our messaging.
   1. When there's a demo involved, provide the speaker with a non-trial FlowFuse account so they can work on it with an official account
   1. [Create a webinar page](#creating-a-webinar-page) for the website
   1. Create a Zoom webinar page
        * Login to zoom and select the Webinars tab. There is a webinar template that will help getting going.
        * Use the same description and topic that was used for the web page. 
        * Turn on Q&A, Enable Practice Session and Automatically record webinar to the cloud, require registration. 
        * Under Branding, for the banner add the graphic created for the web site.
        * Under Invitations, invite the speaker as a Panelist.
            - Panelist receive a unique url to join the webinar that grants them access before the webinar starts. It is important the speaker knows to use this url.
        * Under Email Setting ensure the following: Confirmation email sent to panelist, Reminder sent 1 hour and 1 day before.  Turn off email for follow-up since we do that inside Hubspot.
        * Under Survey, you can decide if you want to do a survey at the end of the webinar. We ask if someone wants to be contacted by FlowFuse to discuss our services. These become MQLs in Hubspot.
   1. Setup HubSpot to accept webinar registrations.
        * Create a marketing campaign for the webinar. Name it like this: *‘Webinar [year month keyword]’*, resulting in something like *Webinar 2025 11 Rev Pi* and **add every related asset to it**.
        * Create a new static segment (list) called ‘Webinar Registrations [&lt;month> Edition]
        * Create a new form - clone an existing webinar registration form and rename it. Under **options** make sure to update the thank you message with the event date.
        * Edit Workflow called ‘Webinar Registration Integration with Zoom’. Three changes are required:
            * Edit enrollment criteria to the new registration form submission. Make sure to check the box next to the form name under the 'Settings' tab to allow contacts to re-enroll in this workflow, otherwise, previous webinar attendees won’t be able to register.
            * Edit ‘Add Contact to Zoom Webinar’ to update the new Webinar ID. Replace the current number with the number from the webinar you just created for this month. You find the Webinar ID on the main page of the Zoom webinar. NOTE: you need to  hyphens to replace the spaces in the ID number.
            * Edit ‘Add to static list’ to change the list to the new list for this month’s webinar.
            * Remember to Save the changes.
   1. Test the web page for the webinar to see if a new registrant gets added to the Hubspot list.
   1. Page is now ready to be published.
   1. Setting up the survey on HubSpot.  
        * Under **Service > Feedback Surveys**, you'll find the latest one called *‘Webinar Survey - [&lt;month> &lt;year>]’*.  
        * Clone it, update the survey name to match the month and year of the upcoming webinar, and update the header to match the webinar's name.  
        * Publish the survey and copy the shareable link.  
        * Under **Automations > Workflows**, you'll need to update two workflows: *‘Contact Us Request’* and *‘New Contact Us Form Completion - MQLs’*. In both workflows, you need to update the trigger enrollment for contacts.  
        * Look for the group with the criteria: *‘Contact is associated to: Any Feedback submission’* and update the survey name to the one you just created.  
        * Save the change and when it asks *'Do you want to enroll existing contacts?'* click on the button that says **'Save and don't enroll existing contacts'**. You should pay close attention to this step, because if you choose the other option, all of the contacts that have ever requested to be contacted will re-enroll and sales will get notifications and tasks to contact all of them again.  
        * Go to **Zoom**, and in the **Webinars** section, under **Survey**, choose *'Use a 3rd party survey'* and paste the shareable link you obtained when the survey was published.

## Webinar Promotion

* Week 1: Added to the newsletter (note to also promote on-demand version of the previous month's webinar in the newsletter) 
* Week 2: Social media promotion on all channels:
    * LinkedIn, Twitter, Facebook, Node-RED Forum Event category, Redit Node-RED, Node-RED slack. For socials a [promo video](#promo-video) recorded by the speaker is recommended.
    * Encourage FlowFuse employees to promote their network
    * Dedicated email to all in the community outreach list
* Week 3 (1 week before webinar): Email to Hubspot list (Send to those you didn't open previous week's email and new leads in DB. Exclude registered leads) 
    * Typically clone a previous email as the starting point.
* Week 4: Another social media promotion and email.
    * Typically this is sent 1 day before the webinar as a reminder that its not too late to join.

### Promo video

This asset allow us to post on YouTube and it gives the audience a chance to see who's going to present. 

#### Technical specifications
* If the presenter has an interesting background, like a shop floor, or a wall with devices, use that for the video. Otherwise, use a solid, contrasting background to make it easier to crop the video and replace the background in post-production.
* Frame the speaker from the chest up with space around the head and shoulders for both landscape and portrait formats.
![Video framing examples](./images/video-framing.png){ width=600 }
* Ensure the video is in HD quality or higher.
* Keep the video under one minute to allow for YouTube Shorts.

#### Recommended script structure
We encourage the speaker to create their own script for a natural delivery. However, the following points should be covered:
* Speaker's name, job title, and company.
* Webinar date and title.
* Brief description of what the audience will learn or gain.
* A call to action (e.g., "Register now and join me for [what the session will cover]").
* A phrase that encourages engagement, such as "I look forward to having you join us!" or "I hope to see you there!"

Here's a template to help you get started:
```
Hi, I'm [Name], [Job Title] at [Company Name].
I'll be presenting in our upcoming webinar on [Date], titled “[Webinar Title]”.
In this session, we’ll cover [Brief Overview of the Webinar's Focus/Key Topics].
If you're interested in [Relevant Topic or Pain Point], this is the perfect session for you.
Don’t miss out, register now and join me as we dive into [What You’ll Learn or Discuss in the Session].
I look forward to seeing you there!
```

And here are a couple of samples of our past promo videos:

<lite-youtube videoid="mfihdh336bw" params="rel=0" style="width: 100%; height: 315px; margin-bottom: 1.5rem;" title="YouTube video player"></lite-youtube>
<lite-youtube videoid="bgJNk0x_sMs" params="rel=0" style="width: 100%; height: 315px;" title="YouTube video player"></lite-youtube>

## Post Webinar

* Upload webinar recording to FlowFuse Youtube channel
    * Trim out the dead air waiting to start the webinar
* Publish webinar recording
* Social media post with link to webinar recording
* In Hubspot send follow-up email to the registration list created in Hubspot that includes a link to the recording on YouTube.
* Download the attendee list from Zoom and upload it to HubSpot. The filter that captures attendees in HubSpot isn't reliable and might cause non-attendee emails to be sent to actual attendees.
* For those who wanted to be contacted, change Life Cycle Stage property to MQL 

This [webinar prep issue](https://github.com/FlowFuse/customer/issues/271) can be cloned and updated to keep track of activities.

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
| `hosts` | A list of the webinar hosts, the names need to be formatted inline with the file names found [here](https://github.com/FlowFuse/website/tree/main/src/_data/team). If they're not part of the FlowFuse team, then you can find a list of guests in [here](https://github.com/FlowFuse/website/tree/main/src/_data/guests), feel free to add any guest you need and remember to add the headshot image in the images/team [folder](https://github.com/FlowFuse/website/tree/main/src/images/team) following the same name convention as the rest of the files.
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
hosts: ["rob-marcer", "joe-pavitt"]
hubspot:
    formId: <form-id>
---
```
